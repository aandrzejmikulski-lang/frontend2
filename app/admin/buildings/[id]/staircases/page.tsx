"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useParams } from "next/navigation";

export default function StaircasesPage() {
  const { id } = useParams();

  const [staircases, setStaircases] = useState<any[]>([]);
  const [newName, setNewName] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStaircases();
  }, []);

  const loadStaircases = async () => {
    setLoading(true);

    const { data } = await supabase
      .from("community_staircases")
      .select("id, name")
      .eq("building_id", id)
      .order("name", { ascending: true });

    setStaircases(data || []);
    setLoading(false);
  };

  const addStaircase = async () => {
    if (!newName.trim()) return;

    await supabase.from("community_staircases").insert({
      name: newName,
      building_id: id,
    });

    setNewName("");
    loadStaircases();
  };

  const updateStaircase = async (staircaseId: string, name: string) => {
    await supabase
      .from("community_staircases")
      .update({ name })
      .eq("id", staircaseId);

    loadStaircases();
  };

  const deleteStaircase = async (staircaseId: string) => {
    await supabase
      .from("community_staircases")
      .delete()
      .eq("id", staircaseId);

    loadStaircases();
  };

  if (loading) return <p>Ładowanie...</p>;

  return (
    <div>
      <h1 style={{ fontSize: 32, marginBottom: 20 }}>Klatki budynku</h1>

      <div
        className="glass"
        style={{
          padding: 20,
          borderRadius: 12,
          marginBottom: 30,
        }}
      >
        <h3>Dodaj nową klatkę</h3>

        <input
          type="text"
          placeholder="Nazwa klatki (np. A)"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          style={{
            padding: 10,
            borderRadius: 8,
            border: "1px solid #ccc",
            width: 200,
            marginRight: 10,
          }}
        />

        <button
          onClick={addStaircase}
          style={{
            padding: "10px 16px",
            borderRadius: 8,
            background: "#222",
            color: "white",
            border: "none",
            cursor: "pointer",
          }}
        >
          Dodaj
        </button>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        {staircases.map((s) => (
          <div
            key={s.id}
            className="glass"
            style={{
              padding: 20,
              borderRadius: 12,
            }}
          >
            <input
              type="text"
              defaultValue={s.name}
              onBlur={(e) => updateStaircase(s.id, e.target.value)}
              style={{
                padding: 10,
                borderRadius: 8,
                border: "1px solid #ccc",
                width: 200,
              }}
            />

            <button
              onClick={() => deleteStaircase(s.id)}
              style={{
                marginLeft: 10,
                padding: "10px 16px",
                borderRadius: 8,
                background: "#aa0000",
                color: "white",
                border: "none",
                cursor: "pointer",
              }}
            >
              Usuń
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
