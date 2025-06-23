const express = require("express")
const express = require('express');
const router = express.Router();
const axios = require("axios");
const asyncHandler = require('express-async-handler');
 
router.post("/", asyncHandler(async (req, res) => {
  const { message } = req.body
  const OPENAI_KEY = process.env.OPENAI_API_KEY
 
  try {
    const result = await axios.post("https://api.openai.com/v1/chat/completions", {
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: message }]
    }, {
      headers: {
        "Authorization": `Bearer ${OPENAI_KEY}`,
        "Content-Type": "application/json"
      }
    })
 
    const reply = result.data.choices[0].message.content
    res.json({ reply })
  }
}));
 
module.exports = router