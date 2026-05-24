"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useParams } from "next/navigation";

export default function AdminTicketDetailsBasic() {
  const { id } = useParams();

  const [ticket, setTicket] = useState<any>(null);
  const [comments, setComments] = useState<any[]>([]);
  const [attachments, setAttachments] = useState<any[]>([]);
  const [message, setMessage] = useState("");

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTicket();
    loadComments();
    loadAttachments();
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
        profiles (email),
        communities (name),
        community_buildings (name)
      `)
      .eq("id", id)
      .single();

    setTicket(data);
    setLoading(false);
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

  const loadAttachments = async () => {
    const { data } = await supabase
      .from("community_ticket_attachments")
      .select(`
        id,
        file_url,
        created_at,
        profiles (email)
      `)
      .eq("ticket_id", id)
      .order("created_at", { ascending: true });

    setAttachments(data || []);
  };

  const addComment = async () => {
    if (!message.trim()) return;

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

  if (loading || !ticket) return <p>Ładowanie...</p>;

  return (
    <div>
      <h1 style={{ fontSize: 32, marginBottom: 20 }}>
        {ticket.title}
      </h1>

      {/* DANE ZGŁOSZENIA */}
      <div className="glass" style={{ padding: 20, borderRadius: 12 }}>
        <p><b>Status:</b> {ticket.status}</p>
        <p><b>Wspólnota:</b> {ticket.communities?.name}</p>
        <p><b>Budynek:</b> {ticket.community_buildings?.name}</p>
        <p><b>Zgłaszający:</b> {ticket.profiles?.email}</p>

        <p style={{ marginTop: 10 }}>
          <b>Opis:</b><br />
          {ticket.description}
        </p>

        <p style={{ opacity: 0.6, marginTop: 10 }}>
          Utworzono: {new Date(ticket.created_at).toLocaleString()}
        </p>
      </div>

      {/* ZAŁĄCZNIKI */}
      <h2 style={{ marginTop: 40 }}>Załączniki</h2>

      {attachments.length === 0 && (
        <p style={{ opacity: 0.7 }}>Brak załączników.</p>
      )}

      <div style={{ display: "flex", flexDirection: "column", gap: 15 }}>
        {attachments.map((a) => (
          <div
            key={a.id}
            className="glass"
            style={{ padding: 15, borderRadius: 10 }}
          >
            <a
              href={a.file_url}
              target="_blank"
              style={{ color: "white" }}
            >
              Pobierz załącznik
            </a>

            <p style={{ opacity: 0.6 }}>
              {a.profiles?.email} — {new Date(a.created_at).toLocaleString()}
            </p>
          </div>
        ))}
      </div>

      {/* KOMENTARZE */}
      <h2 style={{ marginTop: 40 }}>Komentarze</h2>

      {comments.length === 0 && (
        <p style={{ opacity: 0.7 }}>Brak komentarzy.</p>
      )}

      <div style={{ display: "flex", flexDirection: "column", gap: 15 }}>
        {comments.map((c) => (
          <div
            key={c.id}
            className="glass"
            style={{ padding: 15, borderRadius: 10 }}
          >
            <p>{c.message}</p>
            <p style={{ opacity: 0.6 }}>
              {c.profiles?.email} — {new Date(c.created_at).toLocaleString()}
            </p>
          </div>
        ))}
      </div>

      {/* DODAWANIE KOMENTARZA */}
      <div style={{ marginTop: 20 }}>
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
