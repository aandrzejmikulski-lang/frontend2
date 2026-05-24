"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useParams } from "next/navigation";

export default function UnitsPage() {
  const { id } = useParams();

  const [units, setUnits] = useState<any[]>([]);
  const [newNumber, setNewNumber] = useState("");
  const [newFloor, setNewFloor] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUnits();
  }, []);

  const loadUnits = async () => {
    setLoading(true);

    const { data } = await supabase
      .from("community_units")
      .select(`
        id,
        number,
        floor,
        profiles (email)
      `)
      .eq("building_id", id)
      .order("number", { ascending: true });

    setUnits(data || []);
    setLoading(false);
  };

  const addUnit = async () => {
    if (!newNumber.trim()) return;

    await supabase.from("community_units").insert({
      number: newNumber,
      floor: newFloor || null,
      building_id: id,
    });

    setNewNumber("");
    setNewFloor("");
    loadUnits();
  };

  const updateUnit = async (unitId: string, number: string, floor: string) => {
    await supabase
      .from("community_units")
      .update({
        number,
        floor: floor || null,
      })
      .eq("id", unitId);

    loadUnits();
  };

  const deleteUnit = async (unitId: string) => {
    await supabase.from("community_units").delete().eq("id", unitId);
    loadUnits();
  };

  if (loading) return <p>Ładowanie...</p>;

  return (
    <div>
      <h1 style={{ fontSize: 32, marginBottom: 20 }}>Lokale w budynku</h1>

      <div
        className="glass"
        style={{
          padding: 20,
          borderRadius: 12,
          marginBottom: 30,
        }}
      >
        <h3>Dodaj nowy lokal</h3>

        <input
          type="text"
          placeholder="Numer lokalu"
          value={newNumber}
          onChange={(e) => setNewNumber(e.target.value)}
          style={{
            padding: 10,
            borderRadius: 8,
            border: "1px solid #ccc",
            width: 150,
            marginRight: 10,
          }}
        />

        <input
          type="text"
          placeholder="Piętro"
          value={newFloor}
          onChange={(e) => setNewFloor(e.target.value)}
          style={{
            padding: 10,
            borderRadius: 8,
            border: "1px solid #ccc",
            width: 100,
            marginRight: 10,
          }}
        />

        <button
          onClick={addUnit}
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
        {units.map((u) => (
          <div
            key={u.id}
            className="glass"
            style={{
              padding: 20,
              borderRadius: 12,
            }}
          >
            <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
              <input
                type="text"
                defaultValue={u.number}
                onBlur={(e) =>
                  updateUnit(u.id, e.target.value, u.floor)
                }
                style={{
                  padding: 10,
                  borderRadius: 8,
                  border: "1px solid #ccc",
                  width: 120,
                }}
              />

              <input
                type="text"
                defaultValue={u.floor || ""}
                onBlur={(e) =>
                  updateUnit(u.id, u.number, e.target.value)
                }
                style={{
                  padding: 10,
                  borderRadius: 8,
                  border: "1px solid #ccc",
                  width: 80,
                }}
              />

              <button
                onClick={() => deleteUnit(u.id)}
                style={{
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

            <p style={{ opacity: 0.7, marginTop: 10 }}>
              Mieszkaniec: <b>{u.profiles?.email || "—"}</b>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
