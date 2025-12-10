require("dotenv").config();
const express = require("express");
const cors = require("cors");
const axios = require('axios');
const OpenAI = require('openai')

const app = express();

app.use(cors());
app.use(express.json());

const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
})

const MODEL_ID = 'ftjob-IfBfUgHYscCplmUgnyiODGfU'

function getQuestionAndConcept(question) {
    const promptPart = 'Concept: ${question.concept}. Summary Text: ${question.intro_text}';

    let completion = 'Story: ${question.story} Question: ${question.ending_question}';

    completion = completion.replace(/\n\n/g, "\n");

    return [promptPart, completion];
}

// rest api example for backend team
app.get("/api_example/randomnum", (req, res) => {
    //  obtain value as per request (use axios for external call later)
    const randNum = Math.floor(Math.random() * 100);

    // respond with value
    res.json({ randNum: randNum })
});

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

        const response = await client.chat.completions.create({
            model: "o3-mini",
            message: [
                { role: "system", content: o3mini_prompt },
                {
                    role: "user",
                    content: 'Question: ${question}\nUser Response: ${user_response}'
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
        const { phase, story_so_far, doctrines_data, questions_data } = req.body;

        const topic = doctrines_data[Math.floor(Math.random() * doctrines_data.length)];

        const [ex1in, ex1out] = getQuestionAndConcept(questions_data[0]);
        const [ex2in, ex2out] = getQuestionAndConcept(questions_data[1]);
        const [ex3in, ex3out] = getQuestionAndConcept(questions_data[2]);

        let prompt = "";
        if(phase === "initial") {
            prompt = `You are a legal case question generator that creates a multi-step case based on legal concepts.
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
                Question: ${ex3out}

                Concept: ${topic.concept}. Summary Text: ${topic.intro_text}
            `;
        } else if (phase === "middle"){
            prompt = `
                You are continuing a legal case story. Your job is to write the NEXT question in the same narrative.
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
                Question: ${ex3out}

                Story so far:
                ${story_so_far}
            `;
        } else if (phase === "end"){
            prompt = `
            Write the final question in this legal case. Continue the story from the previous section,
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
            Question: ${ex3out}

            Story so far:
            ${story_so_far}
            `;
        }

        const response = await client.chat.completions.create({
            model: "gpt-3.5-turbo-0125",
            message: [
                {role: "system", content: "You generate legal case questions."},
                {role: "user", content: prompt}
            ],
            temperature: .7,
            max_token: 500
        });

        const text = response.choices[0].message.content;

        const storyChunk = text.split("/")[0]?.trim();
        const questionPart = text.split("/")[1]?.trim();

        res.json({
            full: text,
            storyChunk,
            question: questionPart
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Generation error" });
    }
})

app.listen(4444, () => console.log("Express server running at http://localhost:4444"));