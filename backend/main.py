from fastapi import FastAPI, UploadFile, Form
from fastapi.middleware.cors import CORSMiddleware
import shutil
from utils.parser import extract_resume_text
from utils.matcher import calculate_similarity
from utils.scorer import calculate_ats_score

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {"status": "AI Resume Analyzer API is running"}

@app.post("/analyze")
async def analyze(file: UploadFile, job_description: str = Form(...)):

    temp_file = "temp.pdf"
    with open(temp_file, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    resume_text = extract_resume_text(temp_file)

    if not resume_text:
        return {"error": "Could not extract text from resume. Make sure it is a text-based PDF."}

    ats_score, suggestions = calculate_ats_score(resume_text, job_description)
    match_score = int(calculate_similarity(resume_text, job_description) * 100)

    return {
        "ats_score": ats_score,
        "match_score": match_score,
        "suggestions": suggestions
    }