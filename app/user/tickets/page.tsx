"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function UserTicketsBasic() {
  const [tickets, setTickets] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTickets();
  }, []);

  const loadTickets = async () => {
    setLoading(true);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    const { data } = await supabase
      .from("community_tickets")
      .select("id, title, status, created_at")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    setTickets(data || []);
    setLoading(false);
  };

  if (loading) return <p>Ładowanie...</p>;

  return (
    <div>
      <h1 style={{ fontSize: 32, marginBottom: 20 }}>Moje zgłoszenia</h1>

      {tickets.length === 0 && (
        <p style={{ opacity: 0.7 }}>Nie masz jeszcze żadnych zgłoszeń.</p>
      )}

      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        {tickets.map((t) => (
          <div
            key={t.id}
            className="glass"
            style={{
              padding: 20,
              borderRadius: 12,
            }}
          >
            <h3>{t.title}</h3>

            <p style={{ opacity: 0.7 }}>
              Status: <b>{t.status}</b>
            </p>

            <p style={{ opacity: 0.6 }}>
              {new Date(t.created_at).toLocaleString()}
            </p>

            <a
              href={`/user/tickets/${t.id}`}
              style={{
                marginTop: 10,
                display: "inline-block",
                padding: "10px 16px",
                borderRadius: 8,
                background: "#222",
                color: "white",
                textDecoration: "none",
              }}
            >
              Otwórz zgłoszenie
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
