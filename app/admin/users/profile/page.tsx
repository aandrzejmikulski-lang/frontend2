"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function UserProfile() {
  const [profile, setProfile] = useState<any>(null);
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    setLoading(true);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    const { data } = await supabase
      .from("profiles")
      .select("id, email, full_name, phone")
      .eq("id", user.id)
      .single();

    setProfile(data);
    setFullName(data.full_name || "");
    setPhone(data.phone || "");
    setLoading(false);
  };

  const saveProfile = async () => {
    setSaving(true);

    await supabase
      .from("profiles")
      .update({
        full_name: fullName,
        phone: phone,
      })
      .eq("id", profile.id);

    setSaving(false);
  };

  if (loading) return <p>Ładowanie...</p>;

  return (
    <div>
      <h1 style={{ fontSize: 32, marginBottom: 20 }}>Mój profil</h1>

      <div
        className="glass"
        style={{
          padding: 20,
          borderRadius: 12,
          maxWidth: 400,
        }}
      >
        <p style={{ opacity: 0.7 }}>Email (niezmienny):</p>
        <p style={{ marginBottom: 20 }}>
          <b>{profile.email}</b>
        </p>

        <p style={{ opacity: 0.7 }}>Imię i nazwisko:</p>
        <input
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          style={{
            padding: 10,
            borderRadius: 8,
            border: "1px solid #ccc",
            width: "100%",
            marginBottom: 20,
          }}
        />

        <p style={{ opacity: 0.7 }}>Telefon:</p>
        <input
          type="text"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          style={{
            padding: 10,
            borderRadius: 8,
            border: "1px solid #ccc",
            width: "100%",
            marginBottom: 20,
          }}
        />

        <button
          onClick={saveProfile}
          disabled={saving}
          style={{
            padding: "12px 20px",
            borderRadius: 8,
            background: saving ? "#555" : "#222",
            color: "white",
            border: "none",
            cursor: "pointer",
            width: "100%",
          }}
        >
          {saving ? "Zapisywanie..." : "Zapisz zmiany"}
        </button>
      </div>
    </div>
  );
}
