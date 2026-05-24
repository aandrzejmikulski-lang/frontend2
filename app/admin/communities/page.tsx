"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function AdminCommunities() {
  const [communities, setCommunities] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCommunities();
  }, []);

  const loadCommunities = async () => {
    setLoading(true);

    const { data, error } = await supabase
      .from("communities")
      .select(`
        id,
        name,
        created_at,
        community_buildings (id),
        community_members (id)
      `)
      .order("created_at", { ascending: false });

    if (error) console.error(error);

    setCommunities(data || []);
    setLoading(false);
  };

  return (
    <div>
      <h1 style={{ fontSize: 32, marginBottom: 20 }}>Wspólnoty</h1>

      {loading && <p>Ładowanie danych...</p>}

      {!loading && communities.length === 0 && (
        <p style={{ opacity: 0.7 }}>Brak wspólnot do wyświetlenia.</p>
      )}

      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        {communities.map((c) => (
          <div
            key={c.id}
            className="glass"
            style={{
              padding: 20,
              borderRadius: 12,
            }}
          >
            <h3>{c.name}</h3>

            <p style={{ opacity: 0.7 }}>
              Budynki: <b>{c.community_buildings?.length || 0}</b>
            </p>

            <p style={{ opacity: 0.7 }}>
              Mieszkańcy: <b>{c.community_members?.length || 0}</b>
            </p>

            <p style={{ opacity: 0.6, marginTop: 10 }}>
              Utworzono: {new Date(c.created_at).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
