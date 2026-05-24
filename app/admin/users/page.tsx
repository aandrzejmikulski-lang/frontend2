"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function AdminUsers() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    setLoading(true);

    const { data, error } = await supabase
      .from("profiles")
      .select(`
        id,
        email,
        full_name,
        phone,
        created_at,
        community_members (
          communities (name)
        )
      `)
      .order("created_at", { ascending: false });

    if (error) console.error(error);

    setUsers(data || []);
    setLoading(false);
  };

  return (
    <div>
      <h1 style={{ fontSize: 32, marginBottom: 20 }}>Użytkownicy</h1>

      {loading && <p>Ładowanie danych...</p>}

      {!loading && users.length === 0 && (
        <p style={{ opacity: 0.7 }}>Brak użytkowników.</p>
      )}

      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        {users.map((u) => (
          <div
            key={u.id}
            className="glass"
            style={{
              padding: 20,
              borderRadius: 12,
            }}
          >
            <h3>{u.full_name || "Bez nazwy"}</h3>
            <p style={{ opacity: 0.7 }}>{u.email}</p>
            <p style={{ opacity: 0.7 }}>{u.phone || "Brak telefonu"}</p>

            <p style={{ marginTop: 10 }}>
              Wspólnota:{" "}
              <b>
                {u.community_members?.communities?.name || "Nie przypisano"}
              </b>
            </p>

            <p style={{ opacity: 0.6, marginTop: 10 }}>
              Utworzono: {new Date(u.created_at).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
