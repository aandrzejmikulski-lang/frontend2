"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function UserDashboard() {
  const [stats, setStats] = useState({
    total: 0,
    new: 0,
    inProgress: 0,
    done: 0,
  });

  const [recent, setRecent] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    setLoading(true);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    const [total, newT, inProgress, done, recent] = await Promise.all([
      supabase
        .from("community_tickets")
        .select("id", { count: "exact" })
        .eq("user_id", user.id),

      supabase
        .from("community_tickets")
        .select("id", { count: "exact" })
        .eq("user_id", user.id)
        .eq("status", "new"),

      supabase
        .from("community_tickets")
        .select("id", { count: "exact" })
        .eq("user_id", user.id)
        .eq("status", "in_progress"),

      supabase
        .from("community_tickets")
        .select("id", { count: "exact" })
        .eq("user_id", user.id)
        .eq("status", "done"),

      supabase
        .from("community_tickets")
        .select("id, title, status, created_at")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })
        .limit(5),
    ]);

    setStats({
      total: total.count || 0,
      new: newT.count || 0,
      inProgress: inProgress.count || 0,
      done: done.count || 0,
    });

    setRecent(recent.data || []);
    setLoading(false);
  };

  if (loading) return <p>Ładowanie...</p>;

  return (
    <div>
      <h1 style={{ fontSize: 32, marginBottom: 20 }}>Panel mieszkańca</h1>

      <div
        style={{
          display: "flex",
          gap: 20,
          flexWrap: "wrap",
        }}
      >
        <div className="glass" style={{ padding: 20, width: 250, borderRadius: 12 }}>
          <h3>Wszystkie zgłoszenia</h3>
          <p style={{ fontSize: 24 }}>{stats.total}</p>
        </div>

        <div className="glass" style={{ padding: 20, width: 250, borderRadius: 12 }}>
          <h3>Nowe</h3>
          <p style={{ fontSize: 24 }}>{stats.new}</p>
        </div>

        <div className="glass" style={{ padding: 20, width: 250, borderRadius: 12 }}>
          <h3>W trakcie</h3>
          <p style={{ fontSize: 24 }}>{stats.inProgress}</p>
        </div>

        <div className="glass" style={{ padding: 20, width: 250, borderRadius: 12 }}>
          <h3>Zakończone</h3>
          <p style={{ fontSize: 24 }}>{stats.done}</p>
        </div>
      </div>

      <h2 style={{ marginTop: 40 }}>Ostatnie zgłoszenia</h2>

      {recent.length === 0 && (
        <p style={{ opacity: 0.7 }}>Brak zgłoszeń do wyświetlenia.</p>
      )}

      <div style={{ display: "flex", flexDirection: "column", gap: 15 }}>
        {recent.map((t) => (
          <div
            key={t.id}
            className="glass"
            style={{ padding: 15, borderRadius: 10 }}
          >
            <h3>{t.title}</h3>
            <p style={{ opacity: 0.7 }}>Status: {t.status}</p>
            <p style={{ opacity: 0.6 }}>
              {new Date(t.created_at).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
