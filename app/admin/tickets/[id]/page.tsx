"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useParams } from "next/navigation";

export default function TicketDetails() {
  const { id } = useParams();
  const [ticket, setTicket] = useState<any>(null);
  const [comments, setComments] = useState<any[]>([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    loadTicket();
    loadComments();
  }, []);

  const loadTicket = async () => {
    const { data } = await supabase
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
      .eq("id", id)
      .single();

    setTicket(data);
  };

  const loadComments = async () => {
    const { data } = await supabase
      .from("community_ticket_comments")
      .select(`
        id,
        message,
        created_at,
        profiles (email)
      `)
      .eq("ticket_id", id)
      .order("created_at", { ascending: true });

    setComments(data || []);
  };

  const addComment = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    await supabase.from("community_ticket_comments").insert({
      ticket_id: id,
      user_id: user.id,
      message,
    });

    setMessage("");
    loadComments();
  };

  if (!ticket) return <p>Ładowanie...</p>;

  return (
    <div>
      <h1 style={{ fontSize: 32, marginBottom: 20 }}>{ticket.title}</h1>

      <div className="glass" style={{ padding: 20, borderRadius: 12 }}>
        <p>{ticket.description}</p>
        <p style={{ marginTop: 10 }}>
          Status: <b>{ticket.status}</b>
        </p>
        <p style={{ opacity: 0.6 }}>
          Użytkownik: {ticket.community_members?.profiles?.email}
        </p>
        <p style={{ opacity: 0.6 }}>
          Wspólnota: {ticket.communities?.name}
        </p>
      </div>

      <h2 style={{ marginTop: 40 }}>Komentarze</h2>

      {comments.map((c) => (
        <div
          key={c.id}
          className="glass"
          style={{
            padding: 15,
            borderRadius: 10,
            marginTop: 15,
          }}
        >
          <p>{c.message}</p>
          <p style={{ opacity: 0.6, marginTop: 5 }}>
            {c.profiles?.email} — {new Date(c.created_at).toLocaleString()}
          </p>
        </div>
      ))}

      <div style={{ marginTop: 30 }}>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Dodaj komentarz..."
          style={{
            width: "100%",
            padding: 12,
            borderRadius: 8,
            border: "1px solid #ccc",
            minHeight: 80,
          }}
        />

        <button
          onClick={addComment}
          style={{
            marginTop: 10,
            padding: 12,
            borderRadius: 8,
            background: "#222",
            color: "white",
            border: "none",
            cursor: "pointer",
          }}
        >
          Dodaj komentarz
        </button>
      </div>
    </div>
  );
}
