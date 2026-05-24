"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError("Nieprawidłowy email lub hasło");
    } else {
      window.location.href = "/user/dashboard";
    }
  };

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        gap: 20,
      }}
    >
      <h1 style={{ fontSize: 28 }}>Logowanie</h1>

      <form
        onSubmit={handleLogin}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 12,
          width: 300,
        }}
      >
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ padding: 10, borderRadius: 8, border: "1px solid #ccc" }}
        />

        <input
          type="password"
          placeholder="Hasło"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ padding: 10, borderRadius: 8, border: "1px solid #ccc" }}
        />

        {error && <p style={{ color: "red" }}>{error}</p>}

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
          Zaloguj
        </button>
      </form>
    </div>
  );
}
