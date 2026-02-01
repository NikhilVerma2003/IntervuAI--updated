from pydantic import BaseModel
from typing import List
from fastapi import FastAPI
from sentence_transformers import SentenceTransformer
from sklearn.metrics.pairwise import cosine_similarity

app = FastAPI()
model = SentenceTransformer("all-MiniLM-L6-v2")

class AnalyzeRequest(BaseModel):
    answer: str
    skills: List[str]


@app.post("/analyze")
def analyze(payload: AnalyzeRequest):
    answer = payload.answer
    skills = payload.skills


    answer_vec = model.encode([answer])
    skill_vecs = model.encode(skills)

    scores = cosine_similarity(answer_vec, skill_vecs)[0]

    skill_analysis = []

    for skill, score in zip(skills, scores):
        score = float(score)

        if score >= 0.6:
            coverage = "strong"
            explanation = f"Your answer clearly explains concepts related to {skill}."
        elif score >= 0.4:
            coverage = "partial"
            explanation = f"You mentioned {skill}, but the explanation lacks depth."
        else:
            coverage = "missing"
            explanation = f"{skill} was not sufficiently covered in your answer."

        skill_analysis.append({
            "skill": skill,
            "score": round(score, 2),
            "coverage": coverage,
            "explanation": explanation
        })

    # confidence calculation (weighted)
    weights = {
        "strong": 1.0,
        "partial": 0.6,
        "missing": 0.2
    }

    confidence = sum(
        weights[item["coverage"]] for item in skill_analysis
    ) / len(skill_analysis)

    # improvement suggestions
    suggestions = [
        f"Revise and practice {item['skill']} concepts."
        for item in skill_analysis
        if item["coverage"] != "strong"
    ]

    return {
        "skill_analysis": skill_analysis,
        "confidence": round(confidence, 2),
        "suggestions": suggestions
    }
