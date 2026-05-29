import { useState } from "react";
import UploadBox from "./components/UploadBox";

export default function App() {
  const [file, setFile] = useState(null);
  const [jobDesc, setJobDesc] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!file) {
      alert("Please upload a resume");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
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
      alert("Backend connection error");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center p-10">

      <h1 className="text-4xl font-bold mb-6">
        AI Resume Analyzer
      </h1>

      <div className="bg-neutral-900 p-6 rounded-2xl w-[420px] space-y-4">

        <UploadBox onFileSelect={setFile} />

        <textarea
          placeholder="Paste Job Description..."
          value={jobDesc}
          onChange={(e) => setJobDesc(e.target.value)}
          className="w-full p-3 bg-black border border-gray-600 rounded-lg focus:outline-none"
        />

        <button
          onClick={handleSubmit}
          className="w-full bg-white text-black py-2 rounded-lg font-semibold hover:opacity-80 transition"
        >
          {loading ? "Analyzing..." : "Analyze Resume"}
        </button>
      </div>

      {result && (
        <div className="mt-6 bg-neutral-900 p-6 rounded-2xl w-[420px]">
          <h2 className="text-xl mb-2 font-semibold">Results</h2>

          <p>ATS Score: {result.ats_score}%</p>
          <p>Match Score: {result.match_score}%</p>

          <div className="mt-3">
            <h3 className="font-semibold mb-1">Suggestions:</h3>
            <ul className="list-disc ml-5 text-gray-300">
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