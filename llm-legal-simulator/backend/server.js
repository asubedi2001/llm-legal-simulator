const express = require("express");
const cors = require("cors");
const axios = require('axios');
const app = express();

app.use(cors());
app.use(express.json());

// rest api example for backend team
app.get("/api_example/randomnum", (req, res) => {
    //  obtain value as per request (use axios for external call later)
    const randNum = Math.floor(Math.random() * 100);

    // respond with value
    res.json({ randNum: randNum })
});

app.listen(4444, () => console.log("Express server running at http://localhost:4444"));