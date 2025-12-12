# LLM Legal Simulator

An interactive legal learning simulation built using a GPT model fine tuned on the LegalStories dataset. Users progress through llm generated legal scenarios and answer doctrine-based questions. Correct answers will progress the user through the scenario, and incorrect answers provide explanations. A fine-tuned GPT-3.5 model provides story generation, doctrine based questioning, and the GPTo3-mini model provides informative feedback for responses.

As of now, the Front-End does not fully work with the LLM and it would be recommended for testing and grading purposes to run the Jupyter Notebook file in Google Colab, which is shown below.

If you have any concerns or questions please reach out to any of us on the team and we can respond asap.

### Jupyter Notebook Demo: Google Colab (RECOMMENDED TO USE)

If you want to instead run the demo, please open the file below, and then run every block of code. 
The simulation can be played by running the cell below the "Play the Demo" section at the very bottom of the notebook.

```
LegalSim.ipynb
```

## Installation

Requirement: Node.js, npm (bundled with Node)

### Clone Repository

```
git clone https://github.com/asubedi2001/llm-legal-simulator.git
cd llm-legal-simulator
```

### Front-End (Not fully functioning)

Just due to time limitations and conversion from the collab to JS the front end does not fully work and would recommend if you want to test please use the google collab for testing.

### Install Dependencies and Necessary File

```
cd backend
npm install
wget https://raw.githubusercontent.com/hjian42/LegalStories/main/data/101-doctrines/legal_doctrines_101.tsv
wget https://raw.githubusercontent.com/hjian42/LegalStories/main/data/101-doctrines/gpt3.5_story_question_101.tsv

cd ../frontend
npm install
```

## Run Project

### Running Backend

Navigate to the project directory and issue these commands:

```
cd backend
node server.js
```

### Running Frontend

Open a **new terminal** and navigate to the project directory. \
Once inside project directory, issue these commands:

```
cd frontend
npm run dev
```

