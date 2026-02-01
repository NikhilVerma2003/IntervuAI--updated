import express from "express";
import axios from "axios";
import cors from "cors";


const app = express();
app.use(cors());
app.use(express.json());

app.post("/api/analyze", async (req, res) => {
  try {
    const { answer, skills } = req.body;

    if (!answer || !skills || !Array.isArray(skills)) {
      return res.status(400).json({
        error: "Invalid input. 'answer' must be a string and 'skills' an array."
      });
    }

    const aiResponse = await axios.post(
      "http://127.0.0.1:8000/analyze",
      { answer, skills }
    );

    // Forward AI response as-is
    res.json({
      skill_analysis: aiResponse.data.skill_analysis,
      confidence: aiResponse.data.confidence,
      suggestions: aiResponse.data.suggestions
    });

  } catch (error) {
    console.error("Backend error:", error.message);
    res.status(500).json({ error: "AI service unavailable" });
  }
});

app.listen(5000, () => {
  console.log("Backend running on http://localhost:5000");
});
