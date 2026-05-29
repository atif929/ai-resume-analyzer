import re

def calculate_ats_score(resume_text: str, job_desc: str):
    resume_words = set(re.findall(r'\w+', resume_text.lower()))
    job_words = set(re.findall(r'\w+', job_desc.lower()))

    if not job_words:
        return 0, ["Add a job description to get ATS score"]

    matched = resume_words.intersection(job_words)
    score = min(int((len(matched) / len(job_words)) * 100), 100)

    suggestions = []

    if score < 50:
        suggestions.append("Add more relevant keywords from the job description")
    if "experience" not in resume_words:
        suggestions.append("Include an experience section")
    if "project" not in resume_words:
        suggestions.append("Add project details to your resume")
    if "skill" not in resume_words and "skills" not in resume_words:
        suggestions.append("Add a dedicated skills section")
    if len(resume_words) < 200:
        suggestions.append("Increase resume content depth")
    if not suggestions:
        suggestions.append("Resume is well optimized for this job")

    return score, suggestions