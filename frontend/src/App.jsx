import { useState } from "react";

export default function App() {
  const [resume, setResume] = useState(null);
  const [jobDesc, setJobDesc] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!resume) return alert("Upload resume first");

    const formData = new FormData();
    formData.append("file", resume);
    formData.append("job_description", jobDesc);

    setLoading(true);

    try {
      const res = await fetch("http://localhost:8000/analyze", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      setResult(data);
    } catch (err) {
      console.error(err);
      alert("Error connecting to backend");
    }

    setLoading(false);
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>AI Resume Analyzer</h1>

      <div style={styles.card}>
        <input
          type="file"
          accept=".pdf,.doc,.docx"
          onChange={(e) => setResume(e.target.files[0])}
          style={styles.input}
        />

        <textarea
          placeholder="Paste Job Description..."
          value={jobDesc}
          onChange={(e) => setJobDesc(e.target.value)}
          style={styles.textarea}
        />

        <button onClick={handleSubmit} style={styles.button}>
          {loading ? "Analyzing..." : "Analyze Resume"}
        </button>
      </div>

      {result && (
        <div style={styles.resultCard}>
          <h2>Results</h2>
          <p><strong>ATS Score:</strong> {result.ats_score}%</p>
          <p><strong>Match Score:</strong> {result.match_score}%</p>

          <div>
            <h3>Suggestions:</h3>
            <ul>
              {result.suggestions.map((s, i) => (
                <li key={i}>{s}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    backgroundColor: "#000",
    color: "#fff",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "40px",
    fontFamily: "Arial, sans-serif",
  },
  heading: {
    fontSize: "32px",
    marginBottom: "20px",
  },
  card: {
    backgroundColor: "#111",
    padding: "20px",
    borderRadius: "10px",
    width: "400px",
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  input: {
    padding: "10px",
    backgroundColor: "#000",
    color: "#fff",
    border: "1px solid #444",
  },
  textarea: {
    padding: "10px",
    height: "120px",
    backgroundColor: "#000",
    color: "#fff",
    border: "1px solid #444",
  },
  button: {
    padding: "12px",
    backgroundColor: "#fff",
    color: "#000",
    border: "none",
    cursor: "pointer",
    fontWeight: "bold",
  },
  resultCard: {
    marginTop: "30px",
    backgroundColor: "#111",
    padding: "20px",
    borderRadius: "10px",
    width: "400px",
  },
};