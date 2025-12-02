# LLM Legal Simulator

An interactive legal learning simulation built using a GPT model fine tuned on the LegalStories dataset. Users progress through llm generated legal scenarios and answer doctrine-based questions. Correct answers will progress the user through the scenario, and incorrect answers provide explanations. A fine-tuned GPT-3.5 model provides story generation, doctrine based questioning, and informative feedback.

## Installation

Requirement: Node.js, npm (bundled with Node)

### Clone Repository

```
git clone https://github.com/asubedi2001/llm-legal-simulator.git
cd llm-legal-simulator
```

### Install Dependencies

```
cd backend
npm install
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