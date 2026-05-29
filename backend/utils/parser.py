from pdfminer.high_level import extract_text

def extract_resume_text(file_path: str) -> str:
    try:
        text = extract_text(file_path)
        return text.strip()
    except Exception as e:
        print(f"Parser error: {e}")
        return ""