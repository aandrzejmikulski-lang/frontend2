"use client";

import { useState } from "react";

export default function NewTicket() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Zgłoszenie zostało wysłane (mock).");
  };

  return (
    <div>
      <h1 style={{ fontSize: 32, marginBottom: 20 }}>Nowe zgłoszenie</h1>

      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 12,
          width: 400,
        }}
      >
        <input
          type="text"
          placeholder="Tytuł zgłoszenia"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{
            padding: 12,
            borderRadius: 8,
            border: "1px solid #ccc",
          }}
        />

        <textarea
          placeholder="Opis zgłoszenia"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          style={{
            padding: 12,
            borderRadius: 8,
            border: "1px solid #ccc",
            minHeight: 120,
          }}
        />

        <button
          type="submit"
          style={{
            padding: 12,
            borderRadius: 8,
            background: "#222",
            color: "white",
            border: "none",
            cursor: "pointer",
          }}
        >
          Wyślij zgłoszenie
        </button>
      </form>
    </div>
  );
}

