"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { v4 as uuidv4 } from "uuid";

export default function NewTicket() {
  const [communities, setCommunities] = useState<any[]>([]);
  const [buildings, setBuildings] = useState<any[]>([]);
  const [units, setUnits] = useState<any[]>([]);

  const [communityId, setCommunityId] = useState("");
  const [buildingId, setBuildingId] = useState("");
  const [unitId, setUnitId] = useState("");

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [files, setFiles] = useState<FileList | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadCommunities();
  }, []);

  const loadCommunities = async () => {
    const { data } = await supabase
      .from("communities")
      .select("id, name")
      .order("name", { ascending: true });

    setCommunities(data || []);
  };

  const loadBuildings = async (communityId: string) => {
    const { data } = await supabase
      .from("community_buildings")
      .select("id, name")
      .eq("community_id", communityId)
      .order("name", { ascending: true });

    setBuildings(data || []);
  };

  const loadUnits = async (buildingId: string) => {
    const { data } = await supabase
      .from("community_units")
      .select("id, number")
      .eq("building_id", buildingId)
      .order("number", { ascending: true });

    setUnits(data || []);
  };

  const submitTicket = async () => {
    if (!title.trim() || !description.trim()) return;

    setSaving(true);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    // 1. Tworzymy zgłoszenie
    const { data: ticket } = await supabase
      .from("community_tickets")
      .insert({
        user_id: user.id,
        community_id: communityId,
        building_id: buildingId,
        unit_id: unitId || null,
        title,
        description,
        status: "new",
      })
      .select()
      .single();

    // 2. Upload załączników
    if (files && files.length > 0) {
      for (const file of Array.from(files)) {
        const ext = file.name.split(".").pop();
        const fileName = `${uuidv4()}.${ext}`;
        const filePath = `tickets/${ticket.id}/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from("attachments")
          .upload(filePath, file);

        if (!uploadError) {
          const publicUrl = supabase.storage
            .from("attachments")
            .getPublicUrl(filePath).data.publicUrl;

          await supabase.from("community_ticket_attachments").insert({
            ticket_id: ticket.id,
            user_id: user.id,
            file_url: publicUrl,
          });
        }
      }
    }

    setSaving(false);
    window.location.href = "/user/tickets";
  };

  return (
    <div>
      <h1 style={{ fontSize: 32, marginBottom: 20 }}>Nowe zgłoszenie</h1>

      <div
        className="glass"
        style={{
          padding: 20,
          borderRadius: 12,
          maxWidth: 600,
        }}
      >
        <p>Wspólnota:</p>
        <select
          value={communityId}
          onChange={(e) => {
            setCommunityId(e.target.value);
            setBuildingId("");
            setUnitId("");
            loadBuildings(e.target.value);
          }}
          style={{
            padding: 10,
            borderRadius: 8,
            border: "1px solid #ccc",
            width: "100%",
            marginBottom: 20,
          }}
        >
          <option value="">— wybierz wspólnotę —</option>
          {communities.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>

        <p>Budynek:</p>
        <select
          value={buildingId}
          onChange={(e) => {
            setBuildingId(e.target.value);
            setUnitId("");
            loadUnits(e.target.value);
          }}
          style={{
            padding: 10,
            borderRadius: 8,
            border: "1px solid #ccc",
            width: "100%",
            marginBottom: 20,
          }}
        >
          <option value="">— wybierz budynek —</option>
          {buildings.map((b) => (
            <option key={b.id} value={b.id}>
              {b.name}
            </option>
          ))}
        </select>

        <p>Lokal (opcjonalnie):</p>
        <select
          value={unitId}
          onChange={(e) => setUnitId(e.target.value)}
          style={{
            padding: 10,
            borderRadius: 8,
            border: "1px solid #ccc",
            width: "100%",
            marginBottom: 20,
          }}
        >
          <option value="">— brak / nie dotyczy —</option>
          {units.map((u) => (
            <option key={u.id} value={u.id}>
              Lokal {u.number}
            </option>
          ))}
        </select>

        <p>Tytuł zgłoszenia:</p>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{
            padding: 10,
            borderRadius: 8,
            border: "1px solid #ccc",
            width: "100%",
            marginBottom: 20,
          }}
        />

        <p>Opis:</p>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={{
            padding: 10,
            borderRadius: 8,
            border: "1px solid #ccc",
            width: "100%",
            minHeight: 120,
            marginBottom: 20,
          }}
        />

        <p>Załączniki (opcjonalnie):</p>
        <input
          type="file"
          multiple
          onChange={(e) => setFiles(e.target.files)}
          style={{ marginBottom: 20 }}
        />

        <button
          onClick={submitTicket}
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
          {saving ? "Wysyłanie..." : "Wyślij zgłoszenie"}
        </button>
      </div>
    </div>
  );
}
