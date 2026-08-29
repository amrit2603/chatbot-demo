// Simple Express server that proxies a chat request to an OpenAI-compatible API.
// Set OPENAI_API_KEY in environment (see .env.example).
import express from "express";
import axios from "axios";
import dotenv from "dotenv";
import path from "path";
dotenv.config();

const app = express();
app.use(express.json());
app.use(express.static("public"));

app.post("/api/chat", async (req, res) => {
  try {
    const { message } = req.body;
    if (!message) return res.status(400).json({ error: "message is required" });

    const resp = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: message }]
      },
      {
        headers: {
          "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
          "Content-Type": "application/json"
        }
      }
    );

    const reply = resp.data.choices?.[0]?.message?.content ?? "";
    res.json({ reply });
  } catch (err) {
    console.error(err?.response?.data ?? err.message);
    res.status(500).json({ error: "chat failed", details: err?.response?.data ?? err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
