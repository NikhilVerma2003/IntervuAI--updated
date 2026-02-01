import { useState } from "react";
import axios from "axios";

const EXAMPLE_ANSWER = `
Overfitting occurs when a machine learning model learns patterns that are too specific to the training data,
including noise and outliers. As a result, the model performs very well on the training dataset but fails to
generalize to unseen data.

This usually happens when the model is overly complex relative to the amount of training data available.
Techniques such as regularization help control model complexity by penalizing large weights. Cross-validation
is another effective approach that helps evaluate how well the model generalizes to different subsets of data.

Additionally, early stopping can be used during training to prevent the model from learning unnecessary
details. Ensuring a balanced dataset and using simpler models when appropriate also help reduce overfitting
and improve overall model performance.
`;

const EXAMPLE_SKILLS =
  "Machine Learning, Overfitting, Regularization, Cross Validation";


export default function App() {
  const [answer, setAnswer] = useState("");
  const [skills, setSkills] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const analyzeAnswer = async () => {
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:5000/api/analyze", {
        answer,
        skills: skills.split(",").map((s) => s.trim()),
      });
      setResult(res.data);
    } catch (err) {
      console.error(err);
      alert("Something went wrong. Check backend is running.");
    }
    setLoading(false);
  };
  const loadExample = () => {
  setAnswer(EXAMPLE_ANSWER);
  setSkills(EXAMPLE_SKILLS);
  setResult(null); // clear old results
};

const resetForm = () => {
  setAnswer("");
  setSkills("");
  setResult(null);
  setLoading(false);
};


  return (
    /* PAGE WRAPPER (NEW) */
    <div
      style={{
        minHeight: "100vh",
        background: "#121212",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "40px 16px",
      }}
    >
      {/* MAIN CARD (YOUR EXISTING DIV) */}
      <div
        style={{
          width: "100%",
          maxWidth: 900,
          fontFamily: "Inter, Arial, sans-serif",
          background: "#1e1e1e",
          padding: 30,
          borderRadius: 12,
          color: "#f5f5f5",
          boxShadow: "0 10px 40px rgba(0,0,0,0.6)",
        }}
      >
        <h1 style={{ marginBottom: 10 }}>
          AI-Assisted Interview Skill Analyzer
        </h1>

        <p style={{ color: "#bbb", marginBottom: 15 }}>
          Evaluate how well your interview answer aligns with the required skill
          set.
        </p>

        <div
          style={{
            background: "#2a2a2a",
            padding: 15,
            borderRadius: 8,
            marginBottom: 20,
            fontSize: 14,
            color: "#ccc",
          }}
        >
          <b>How to use:</b>
          <ul style={{ marginTop: 8 }}>
            <li>Enter the Interview Answer.</li>
            <li>
              Enter the Skills you want the Answer to be evaluated against.
            </li>
          </ul>
          <i>
            Example: Overfitting → Machine Learning, Overfitting, Generalization
          </i>
        </div>

        <label style={{ fontWeight: "bold" }}>Interview Answer</label>
        <textarea
          rows="5"
          style={{
            width: "100%",
            padding: 12,
            marginTop: 6,
            marginBottom: 20,
            background: "#333",
            color: "#fff",
            borderRadius: 6,
            border: "1px solid #444",
          }}
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          placeholder="Type your interview answer here..."
        />

        <label style={{ fontWeight: "bold" }}>
          Skills to Evaluate (comma-separated)
        </label>
        <input
          style={{
            width: "100%",
            padding: 10,
            marginTop: 6,
            background: "#333",
            color: "#fff",
            borderRadius: 6,
            border: "1px solid #444",
          }}
          value={skills}
          onChange={(e) => setSkills(e.target.value)}
          placeholder="e.g. REST, HTTP, API Design"
        />

        <div style={{ marginTop: 20, display: "flex", gap: 12 }}>
  <button
    onClick={analyzeAnswer}
    disabled={loading}
    style={{
      padding: "12px 25px",
      background: "#4f46e5",
      border: "none",
      borderRadius: 6,
      color: "#fff",
      fontWeight: "bold",
      cursor: "pointer"
    }}
  >
    {loading ? "Analyzing..." : "Analyze Answer"}
  </button>

  <button
    onClick={loadExample}
    style={{
      padding: "12px 20px",
      background: "#2a2a2a",
      border: "1px solid #444",
      borderRadius: 6,
      color: "#ddd",
      cursor: "pointer"
    }}
  >
    Use Example
  </button>

  <button
    onClick={resetForm}
    style={{
      padding: "12px 20px",
      background: "#1f2937",
      border: "1px solid #374151",
      borderRadius: 6,
      color: "#9ca3af",
      cursor: "pointer"
    }}
  >
    Reset
  </button>
</div>



        {result && (
          <div style={{ marginTop: 30 }}>
            <h2>Evaluation Summary</h2>

            <div
              style={{
                background: "#2a2a2a",
                padding: 15,
                borderRadius: 8,
                marginBottom: 20,
              }}
            >
              <b>Overall Confidence:</b>{" "}
              <span
                style={{
                  color:
                    result.confidence >= 0.6
                      ? "#22c55e"
                      : result.confidence >= 0.4
                      ? "#facc15"
                      : "#ef4444",
                }}
              >
                {result.confidence}
              </span>

              {result.confidence < 0.4 && (
                <p style={{ color: "#facc15", marginTop: 8 }}>
                  Low confidence indicates weak alignment between the answer and
                  selected skills.
                </p>
              )}
            </div>

            <h3>Skill-by-Skill Analysis</h3>

            {result.skill_analysis.map((item, index) => (
              <div
                key={index}
                style={{
                  background: "#2a2a2a",
                  padding: 15,
                  borderRadius: 8,
                  marginBottom: 12,
                  borderLeft:
                    item.coverage === "strong"
                      ? "5px solid #22c55e"
                      : item.coverage === "partial"
                      ? "5px solid #facc15"
                      : "5px solid #ef4444",
                }}
              >
                <b>{item.skill}</b> —{" "}
                <span style={{ textTransform: "capitalize" }}>
                  {item.coverage}
                </span>

                <p style={{ marginTop: 6 }}>{item.explanation}</p>

                <small style={{ color: "#aaa" }}>
                  Similarity score: {item.score}
                </small>
              </div>
            ))}

            <h3>Improvement Suggestions</h3>
            <ul>
              {result.suggestions.map((s, i) => (
                <li key={i}>{s}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
