IntervuAI – AI-Assisted Interview Skill Analyzer

IntervuAI is a full-stack AI application that evaluates interview answers against required skills using semantic similarity, not keyword matching. It helps candidates understand how well their answers align with expected technical concepts.

🚀 Features

Analyze interview answers against a list of required skills

Uses AI embeddings to understand meaning and context

Skill-wise evaluation: Strong / Partial / Missing

Confidence score with improvement suggestions

Example button for quick demo and better UX

Clean, responsive frontend UI

🧠 How It Works (High Level)

User enters an interview answer and required skills

The backend forwards data to an AI service

The AI service converts text into vector embeddings

Cosine similarity is used to measure semantic match

Results are returned with explanations and confidence

This approach works even if exact keywords are not present.

🏗️ Tech Stack & Why Used
Frontend (Vite + React)

React – Component-based UI and state management

Vite – Fast development server and build tool

Axios – API communication with backend

Backend (Node.js + Express)

Express.js – Lightweight REST API

Axios – Communicates with AI microservice

CORS – Enables frontend-backend communication

AI Service (FastAPI + NLP)

FastAPI – High-performance Python API

Sentence Transformers – Generates semantic embeddings

Scikit-learn – Cosine similarity calculation

PyTorch – Model inference backend

📂 Project Structure
IntervuAI/
├── frontend/        # React + Vite UI
├── backend/         # Node.js API
├── ai-service/      # FastAPI AI service
│   ├── main.py
│   └── requirements.txt
└── .gitignore

▶️ Running the Project Locally
1️⃣ Start AI Service
cd ai-service
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload


Runs at: http://127.0.0.1:8000

2️⃣ Start Backend
cd backend
npm install
node index.js


Runs at: http://localhost:5000

3️⃣ Start Frontend
cd frontend
npm install
npm run dev


Runs at: http://localhost:5173

🧪 Example Use Case

Answer: Explanation of overfitting in machine learning
Skills:

Machine Learning

Overfitting

Regularization

REST

HTTP

Result:

ML concepts → Strong match

REST/HTTP → Missing

Confidence score with targeted suggestions

🔍 Why This Is Better Than Keyword Matching

Understands meaning, not exact words

Works with synonyms and paraphrasing

Handles long, descriptive answers

More realistic for interview evaluation

📌 Future Improvements

User authentication (login/signup)

Voice-based answer input

Resume-skill gap analysis

Deployment using Docker & cloud platforms

👤 Author

Nikhil Verma
GitHub: https://github.com/NikhilVerma2003