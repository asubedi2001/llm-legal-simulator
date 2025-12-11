require("dotenv").config();
const express = require("express");
const cors = require("cors");
const axios = require('axios');
const OpenAI = require('openai')
const fs = require('fs');
const { tsvParse } = require('d3-dsv');

const app = express();

app.use(cors());
app.use(express.json());

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
})

const MODEL_ID = 'ftjob-IfBfUgHYscCplmUgnyiODGfU'

const questions_data = readTSV('./gpt3.5_story_question_101.tsv');
const doctrines_data = readTSV('./legal_doctrines_101.tsv')

function readTSV(filePath) {
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const data = tsvParse(fileContent);
    return data;
}

function getQuestionAndConcept(question) {
    const promptPart = `Concept: ${question.concept}. Summary Text: ${question.intro_text}`;

    let completion = `Story: ${question.story} Question: ${question.ending_question}`;

    completion = completion.replace(/\n\n/g, "\n");

    return [promptPart, completion];
}

const o3mini_prompt = `
You are a legal evaluator. Given a question, the correct response, 
and the user's response, return a score out of 4 points.

Scoring:
- 1 point for the correct letter answer.
- 1 point for mentioning the right doctrines/concepts/keywords.
- 1 point for an okay justification OR 2 points for a good justification.

Always format the output EXACTLY like this:

Score: X
Rationale: <text here>
`;

app.post("/api/evaluate", async(req, res) => {
    try {
        const { question, user_response } = req.body;

        const response = await openai.chat.completions.create({
            model: "o3-mini",
            message: [
                { role: "system", content: o3mini_prompt },
                {
                    role: "user",
                    content: `Question: ${question}\nUser Response: ${user_response}`
                }
            ]
        });

        const text = response.choices[0].message.content;

        const scoreLine = text.split("\n")[0];
        const score = Number(scoreLine.split(" ")[1]);

        const rationale = text.split("Rationale:")[1]?.trim() || "";

        res.json({
            raw: text, score, rationale
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Evaluation Error" })
    }
});

app.post("/api/generate-question", async (req, res) => { 
    try {
        const { phase, story_so_far, doctrine_idx} = req.body;
        console.log(`API CALL: phase ${phase}, !!storySoFar ${story_so_far}!!, doctrine_idx ${doctrine_idx}`)
        
        var topic = doctrines_data[doctrine_idx]
        
        const [ex1in, ex1out] = getQuestionAndConcept(questions_data[0]);
        const [ex2in, ex2out] = getQuestionAndConcept(questions_data[1]);
        const [ex3in, ex3out] = getQuestionAndConcept(questions_data[2]);

        let systemPrompt = "";
        let userPrompt = "";
        if(phase === "initial") {
            systemPrompt = 
                `You are a legal case question generator that creates a multi-step case based on legal concepts. 
                You will produce a multiple-choice question built around a short narrative introduction. 
                The story must introduce characters, a location, and a situation that can be expanded later. 
                You MUST write in this structure:

                1. STORY: A 3–6 sentence narrative introducing the situation.
                2. QUESTION: A single legal question about the concept.
                3. /ANSWER: The correct choice.
                4. RATIONALE: A short explanation.

                Do NOT end the story — leave open threads so the next question can continue it.

                Examples:
                Concept: ${ex1in}
                Question: ${ex1out}
                Concept: ${ex2in}
                Question: ${ex2out}
                Concept: ${ex3in}
                Question: ${ex3out}`;

            userPrompt = `Concept: ${topic.concept}. Summary Text: ${topic.intro_text}`;
        } else if (phase === "middle"){
            systemPrompt = 
                `You are continuing a legal case story. Your job is to write the NEXT question in the same narrative.
                You MUST continue the same characters, same setting, same timeline, and the same story threads.
                Use the previous story as canon and extend it naturally.

                Your structure MUST be:
                1. STORY: 3–6 new sentences that continue the narrative.
                2. QUESTION: A new multiple-choice question about a NEW legal concept.
                3. /ANSWER.
                4. RATIONALE.

                Do not contradict earlier facts. Do not end the story — keep it open.

                Examples:
                Concept: ${ex1in}
                Question: ${ex1out}
                Concept: ${ex2in}
                Question: ${ex2out}
                Concept: ${ex3in}
                Question: ${ex3out}`;
            userPrompt = 
                `Story so far: 
                ${story_so_far}`;
        } else if (phase === "end"){
            systemPrompt = 
            `Write the final question in this legal case. Continue the story from the previous section,
            but this time bring the situation to a conclusion.

            Structure:
            1. STORY: 3–6 sentences resolving the conflict.
            2. QUESTION: A final legal concept question.
            3. /ANSWER.
            4. RATIONALE.

            The story should conclude all major plot threads.

            Examples:
            Concept: ${ex1in}
            Question: ${ex1out}
            Concept: ${ex2in}
            Question: ${ex2out}
            Concept: ${ex3in}
            Question: ${ex3out}`

            userPrompt = 
                `Story so far: 
                ${story_so_far}`;
        }

        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo-0125",
            messages: [
                {role: "system", content: systemPrompt},
                {role: "user", content: userPrompt}
            ],
            temperature: .7,
            max_tokens: 500,
            top_p: 1,
            frequency_penalty: 0,
            presence_penalty: 0,
            stop: ["###"]
        });

        console.log(response.choices[0].message.content)
        const text = response.choices[0].message.content.trim();


        {/* experiencing parsing issues due to llm sometimes dropping our delimiter + variable casing */}
        const withSlash = /\/\s*answer\s*:/i;
        const noSlash = /answer\s*:/i;

        let storyChunk = '';
        let answerChunk = '';

        if (withSlash.test(text)) {
            const split = text.search(withSlash);
            storyChunk = text.substring(0, split)?.trim()
            answerChunk = text.substring(split)?.trim()
        } else if (noSlash.test(text)) {
            const split = text.search(noSlash);
            storyChunk = text.substring(0, split)?.trim()
            answerChunk = text.substring(split)?.trim()
        } else  {
            // in case I cant find any delimiter
            storyChunk = text.trim();
            answerChunk = "No provided Answer/Rationale"
        }
        
        console.log(`-------START STORY-------\n${storyChunk}`)
        console.log(`-------START ANSWER-------\n${answerChunk}`)

        res.json({
            full: text,
            storyChunk,
            answerChunk
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Generation error" });
    }
})

app.listen(4444, () => console.log("Express server running at http://localhost:4444"));