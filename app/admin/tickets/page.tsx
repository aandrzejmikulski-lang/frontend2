"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function AdminTickets() {
  const [tickets, setTickets] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTickets();
  }, []);

  const loadTickets = async () => {
    setLoading(true);

    const { data, error } = await supabase
      .from("community_tickets")
      .select(`
        id,
        title,
        description,
        status,
        created_at,
        community_members (
          profiles (email)
        ),
        communities (name)
      `)
      .order("created_at", { ascending: false });

    if (error) console.error(error);
    setTickets(data || []);
    setLoading(false);
  };

  const updateStatus = async (id: string, status: string) => {
    const { error } = await supabase
      .from("community_tickets")
      .update({ status })
      .eq("id", id);

    if (error) {
      alert("Błąd podczas zmiany statusu");
      return;
    }

    loadTickets();
  };

  return (
    <div>
      <h1 style={{ fontSize: 32, marginBottom: 20 }}>Zgłoszenia mieszkańców</h1>

      {loading && <p>Ładowanie danych...</p>}

      {!loading && tickets.length === 0 && (
        <p style={{ opacity: 0.7 }}>Brak zgłoszeń do wyświetlenia.</p>
      )}

      {tickets.map((t) => (
        <div
          key={t.id}
          className="glass"
          style={{
            padding: 20,
            borderRadius: 12,
            marginBottom: 20,
          }}
        >
          <h3>{t.title}</h3>
          <p style={{ opacity: 0.7 }}>{t.description}</p>

          <p style={{ marginTop: 10 }}>
            Status: <b>{t.status}</b>
          </p>

          <select
            value={t.status}
            onChange={(e) => updateStatus(t.id, e.target.value)}
            style={{
              marginTop: 10,
              padding: 8,
              borderRadius: 8,
              border: "1px solid #ccc",
            }}
          >
            <option value="new">Nowe</option>
            <option value="in_progress">W trakcie</option>
            <option value="done">Zakończone</option>
          </select>

          <p style={{ marginTop: 10, opacity: 0.6 }}>
            Użytkownik: {t.community_members?.profiles?.email || "—"}
          </p>

          <p style={{ marginTop: 4, opacity: 0.6 }}>
            Wspólnota: {t.communities?.name || "—"}
          </p>
        </div>
      ))}
    </div>
  );
}
