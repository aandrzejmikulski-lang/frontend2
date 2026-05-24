"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function AdminBuildings() {
  const [buildings, setBuildings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadBuildings();
  }, []);

  const loadBuildings = async () => {
    setLoading(true);

    const { data, error } = await supabase
      .from("community_buildings")
      .select(`
        id,
        name,
        address,
        created_at,
        communities (name),
        community_staircases (id),
        community_units (id)
      `)
      .order("created_at", { ascending: false });

    if (error) console.error(error);

    setBuildings(data || []);
    setLoading(false);
  };

  return (
    <div>
      <h1 style={{ fontSize: 32, marginBottom: 20 }}>Budynki</h1>

      {loading && <p>Ładowanie danych...</p>}

      {!loading && buildings.length === 0 && (
        <p style={{ opacity: 0.7 }}>Brak budynków do wyświetlenia.</p>
      )}

      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        {buildings.map((b) => (
          <div
            key={b.id}
            className="glass"
            style={{
              padding: 20,
              borderRadius: 12,
            }}
          >
            <h3>{b.name}</h3>

            <p style={{ opacity: 0.7 }}>
              Adres: <b>{b.address || "Brak adresu"}</b>
            </p>

            <p style={{ opacity: 0.7 }}>
              Wspólnota: <b>{b.communities?.name || "Nie przypisano"}</b>
            </p>

            <p style={{ opacity: 0.7 }}>
              Klatki: <b>{b.community_staircases?.length || 0}</b>
            </p>

            <p style={{ opacity: 0.7 }}>
              Lokale: <b>{b.community_units?.length || 0}</b>
            </p>

            <p style={{ opacity: 0.6, marginTop: 10 }}>
              Utworzono: {new Date(b.created_at).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
