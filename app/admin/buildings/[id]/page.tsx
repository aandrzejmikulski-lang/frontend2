"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useParams } from "next/navigation";

export default function BuildingDetails() {
  const { id } = useParams();

  const [building, setBuilding] = useState<any>(null);
  const [staircases, setStaircases] = useState<any[]>([]);
  const [units, setUnits] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadBuilding();
    loadStaircases();
    loadUnits();
  }, []);

  const loadBuilding = async () => {
    const { data } = await supabase
      .from("community_buildings")
      .select(`
        id,
        name,
        address,
        created_at,
        communities (name)
      `)
      .eq("id", id)
      .single();

    setBuilding(data);
  };

  const loadStaircases = async () => {
    const { data } = await supabase
      .from("community_staircases")
      .select("id, name")
      .eq("building_id", id)
      .order("name", { ascending: true });

    setStaircases(data || []);
  };

  const loadUnits = async () => {
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

  if (loading || !building) return <p>Ładowanie...</p>;

  return (
    <div>
      <h1 style={{ fontSize: 32, marginBottom: 20 }}>
        Budynek: {building.name}
      </h1>

      <div className="glass" style={{ padding: 20, borderRadius: 12 }}>
        <p>
          Adres: <b>{building.address}</b>
        </p>
        <p>
          Wspólnota: <b>{building.communities?.name}</b>
        </p>
        <p style={{ opacity: 0.6, marginTop: 10 }}>
          Utworzono: {new Date(building.created_at).toLocaleString()}
        </p>
      </div>

      <h2 style={{ marginTop: 40 }}>Klatki</h2>

      {staircases.length === 0 && (
        <p style={{ opacity: 0.7 }}>Brak klatek w tym budynku.</p>
      )}

      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {staircases.map((s) => (
          <div
            key={s.id}
            className="glass"
            style={{ padding: 15, borderRadius: 10 }}
          >
            <p>Klatka: <b>{s.name}</b></p>
          </div>
        ))}
      </div>

      <h2 style={{ marginTop: 40 }}>Lokale</h2>

      {units.length === 0 && (
        <p style={{ opacity: 0.7 }}>Brak lokali w tym budynku.</p>
      )}

      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {units.map((u) => (
          <div
            key={u.id}
            className="glass"
            style={{ padding: 15, borderRadius: 10 }}
          >
            <p>
              Lokal <b>{u.number}</b> (piętro {u.floor})
            </p>
            <p style={{ opacity: 0.7 }}>
              Mieszkaniec: {u.profiles?.email || "—"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
