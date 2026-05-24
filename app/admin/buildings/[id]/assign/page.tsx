"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useParams } from "next/navigation";

export default function AssignResidents() {
  const { id } = useParams();

  const [units, setUnits] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUnits();
    loadUsers();
  }, []);

  const loadUnits = async () => {
    const { data } = await supabase
      .from("community_units")
      .select(`
        id,
        number,
        floor,
        user_id,
        profiles (email)
      `)
      .eq("building_id", id)
      .order("number", { ascending: true });

    setUnits(data || []);
    setLoading(false);
  };

  const loadUsers = async () => {
    const { data } = await supabase
      .from("profiles")
      .select("id, email")
      .order("email", { ascending: true });

    setUsers(data || []);
  };

  const assignUser = async (unitId: string, userId: string) => {
    await supabase
      .from("community_units")
      .update({ user_id: userId })
      .eq("id", unitId);

    loadUnits();
  };

  const unassignUser = async (unitId: string) => {
    await supabase
      .from("community_units")
      .update({ user_id: null })
      .eq("id", unitId);

    loadUnits();
  };

  if (loading) return <p>Ładowanie...</p>;

  return (
    <div>
      <h1 style={{ fontSize: 32, marginBottom: 20 }}>
        Przypisania mieszkańców do lokali
      </h1>

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
            <h3>
              Lokal {u.number} (piętro {u.floor})
            </h3>

            <p style={{ opacity: 0.7 }}>
              Mieszkaniec:{" "}
              <b>{u.profiles?.email || "— brak przypisanego mieszkańca"}</b>
            </p>

            <div style={{ marginTop: 10 }}>
              <select
                value={u.user_id || ""}
                onChange={(e) => assignUser(u.id, e.target.value)}
                style={{
                  padding: 8,
                  borderRadius: 8,
                  border: "1px solid #ccc",
                  width: 250,
                }}
              >
                <option value="">— wybierz mieszkańca —</option>
                {users.map((usr) => (
                  <option key={usr.id} value={usr.id}>
                    {usr.email}
                  </option>
                ))}
              </select>

              {u.user_id && (
                <button
                  onClick={() => unassignUser(u.id)}
                  style={{
                    marginLeft: 10,
                    padding: "8px 12px",
                    borderRadius: 8,
                    background: "#aa0000",
                    color: "white",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  Usuń przypisanie
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
