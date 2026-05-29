from sentence_transformers import SentenceTransformer
from sklearn.metrics.pairwise import cosine_similarity

model = SentenceTransformer('all-MiniLM-L6-v2')

def calculate_similarity(resume_text: str, job_desc: str) -> float:
    try:
        embeddings = model.encode([resume_text, job_desc])
        score = cosine_similarity([embeddings[0]], [embeddings[1]])[0][0]
        return float(score)
    except Exception as e:
        print(f"Matcher error: {e}")
        return 0.0