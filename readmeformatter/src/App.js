import React, { useState } from "react";

export default function App() {
  const [rawReadme, setRawReadme] = useState("");
  const [formattedReadme, setFormattedReadme] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleFormat() {
    setLoading(true);
    setError("");
    setFormattedReadme("");
    try {
      const res = await fetch("http://localhost:8000/format-readme", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ readme: rawReadme }),
      });
      const data = await res.json();
      if (data.error) setError(data.error);
      else setFormattedReadme(data.formatted_readme);
    } catch (e) {
      setError("Failed to fetch from backend");
    }
    setLoading(false);
  }

  return (
    <div
      style={{
        maxWidth: 900,
        margin: "2rem auto",
        padding: "1rem 2rem",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        color: "#333",
        backgroundColor: "#f7f9fc",
        borderRadius: 8,
        boxShadow: "0 4px 12px rgb(0 0 0 / 0.1)",
      }}
    >
      <h1 style={{ textAlign: "center", color: "#2c3e50" }}>
        GitHub README Formatter
      </h1>

      <label
        htmlFor="raw-readme"
        style={{
          display: "block",
          marginBottom: 6,
          fontWeight: "600",
          fontSize: 16,
          color: "#34495e",
        }}
      >
        Paste Raw README Markdown
      </label>
      <textarea
        id="raw-readme"
        rows={12}
        style={{
          width: "100%",
          fontFamily: "monospace",
          fontSize: 14,
          padding: 12,
          borderRadius: 6,
          border: "1.5px solid #ccc",
          resize: "vertical",
          boxSizing: "border-box",
          marginBottom: 16,
          transition: "border-color 0.3s",
        }}
        placeholder="Paste your unformatted or messy README markdown here..."
        value={rawReadme}
        onChange={(e) => setRawReadme(e.target.value)}
        disabled={loading}
        onFocus={(e) => (e.target.style.borderColor = "#3498db")}
        onBlur={(e) => (e.target.style.borderColor = "#ccc")}
      />

      <button
        onClick={handleFormat}
        disabled={loading || !rawReadme.trim()}
        style={{
          backgroundColor: loading || !rawReadme.trim() ? "#95a5a6" : "#3498db",
          color: "white",
          border: "none",
          borderRadius: 6,
          padding: "12px 24px",
          fontSize: 16,
          fontWeight: "600",
          cursor: loading || !rawReadme.trim() ? "not-allowed" : "pointer",
          width: "100%",
          marginBottom: 20,
          boxShadow:
            loading || !rawReadme.trim()
              ? "none"
              : "0 4px 12px rgb(52 152 219 / 0.5)",
          transition: "background-color 0.3s",
        }}
      >
        {loading ? "Formatting..." : "Format README"}
      </button>

      {error && (
        <div
          style={{
            backgroundColor: "#fdecea",
            color: "#e74c3c",
            padding: "12px 16px",
            borderRadius: 6,
            marginBottom: 20,
            fontWeight: "600",
          }}
        >
          {error}
        </div>
      )}

      {formattedReadme && (
        <>
          <label
            htmlFor="formatted-readme"
            style={{
              display: "block",
              marginBottom: 6,
              fontWeight: "600",
              fontSize: 16,
              color: "#34495e",
            }}
          >
            Formatted README Markdown
          </label>
          <textarea
            id="formatted-readme"
            rows={14}
            style={{
              width: "100%",
              fontFamily: "monospace",
              fontSize: 14,
              padding: 12,
              borderRadius: 6,
              border: "1.5px solid #ccc",
              resize: "vertical",
              boxSizing: "border-box",
              backgroundColor: "#fcfcfc",
            }}
            value={formattedReadme}
            readOnly
          />
        </>
      )}
    </div>
  );
}
