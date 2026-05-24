"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    tickets: 0,
    newTickets: 0,
    doneTickets: 0,
    communities: 0,
    users: 0,
  });

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    const [tickets, newTickets, doneTickets, communities, users] = await Promise.all([
      supabase.from("community_tickets").select("id", { count: "exact" }),
      supabase.from("community_tickets").select("id", { count: "exact" }).eq("status", "new"),
      supabase.from("community_tickets").select("id", { count: "exact" }).eq("status", "done"),
      supabase.from("communities").select("id", { count: "exact" }),
      supabase.from("profiles").select("id", { count: "exact" }),
    ]);

    setStats({
      tickets: tickets.count || 0,
      newTickets: newTickets.count || 0,
      doneTickets: doneTickets.count || 0,
      communities: communities.count || 0,
      users: users.count || 0,
    });
  };

  return (
    <div>
      <h1 style={{ fontSize: 32, marginBottom: 20 }}>Panel administratora</h1>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
        <div className="glass" style={{ padding: 20, borderRadius: 12 }}>
          <h3>Wszystkie zgłoszenia</h3>
          <p style={{ fontSize: 24 }}>{stats.tickets}</p>
        </div>

        <div className="glass" style={{ padding: 20, borderRadius: 12 }}>
          <h3>Nowe zgłoszenia</h3>
          <p style={{ fontSize: 24 }}>{stats.newTickets}</p>
        </div>

        <div className="glass" style={{ padding: 20, borderRadius: 12 }}>
          <h3>Zakończone zgłoszenia</h3>
          <p style={{ fontSize: 24 }}>{stats.doneTickets}</p>
        </div>

        <div className="glass" style={{ padding: 20, borderRadius: 12 }}>
          <h3>Wspólnoty</h3>
          <p style={{ fontSize: 24 }}>{stats.communities}</p>
        </div>

        <div className="glass" style={{ padding: 20, borderRadius: 12 }}>
          <h3>Użytkownicy</h3>
          <p style={{ fontSize: 24 }}>{stats.users}</p>
        </div>
      </div>
    </div>
  );
}
