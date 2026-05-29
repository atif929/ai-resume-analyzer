import { useState } from "react";

export default function UploadBox({ onFileSelect }) {
  const [dragging, setDragging] = useState(false);
  const [fileName, setFileName] = useState("");

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);

    const file = e.dataTransfer.files[0];
    setFileName(file.name);
    onFileSelect(file);
  };

  const handleChange = (e) => {
    const file = e.target.files[0];
    setFileName(file.name);
    onFileSelect(file);
  };

  return (
    <div
      onDragOver={(e) => {
        e.preventDefault();
        setDragging(true);
      }}
      onDragLeave={() => setDragging(false)}
      onDrop={handleDrop}
      className={`border-2 border-dashed p-6 rounded-xl text-center cursor-pointer transition
        ${dragging ? "border-white bg-gray-800" : "border-gray-600"}`}
    >
      <p className="text-gray-300">
        Drag & Drop Resume here
      </p>

      <p className="text-sm text-gray-500 mt-1">
        or click to browse
      </p>

      {fileName && (
        <p className="mt-2 text-green-400 text-sm">
          {fileName}
        </p>
      )}

      <input
        type="file"
        accept=".pdf,.doc,.docx"
        onChange={handleChange}
        className="hidden"
        id="fileUpload"
      />

      <label htmlFor="fileUpload" className="block mt-3 underline cursor-pointer">
        Browse File
      </label>
    </div>
  );
}