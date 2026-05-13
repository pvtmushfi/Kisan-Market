import axios from "axios";

export const chatController = async (req, res) => {
  try {
    const { message, lang } = req.body;

    if (!message) {
      return res.status(400).json({ reply: "Message required" });
    }

    const systemPrompt =
      lang === "hi"
        ? `
You are a Kisan (farmer) AI assistant.

RULES:
- Reply ONLY in Hindi (simple Indian Hindi)
- Do NOT use English words
- Give practical farming advice
- At the end ALWAYS add:
VIDEO: <youtube search keyword in Hindi>

Example:
गेहूं की खेती के लिए...
VIDEO: गेहूं की खेती भारत
`
        : `
You are a farming AI assistant.

RULES:
- Reply ONLY in English
- Simple farming explanation
- At end add:
VIDEO: <youtube search keyword>

Example:
Wheat farming requires...
VIDEO: wheat farming India guide
`;

    const response = await axios.post(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        model: "llama-3.1-8b-instant",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: message },
        ],
        temperature: 0.3,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
          "Content-Type": "application/json",
        },
      },
    );

    const reply = response.data?.choices?.[0]?.message?.content || "";

    return res.json({ reply });
  } catch (err) {
    console.log("CHAT ERROR:", err.response?.data || err.message);
    return res.status(500).json({ reply: "Server error" });
  }
};
