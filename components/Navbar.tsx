"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function NavBar() {
  const [role, setRole] = useState<"admin" | "user" | null>(null);

  useEffect(() => {
    loadRole();
  }, []);

  const loadRole = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    const { data } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .single();

    setRole(data?.role || "user");
  };

  return (
    <nav
      className="glass"
      style={{
        padding: 15,
        borderRadius: 12,
        marginBottom: 30,
        display: "flex",
        gap: 20,
      }}
    >
      <Link href="/" style={{ color: "white" }}>
        Strona główna
      </Link>

      {role === "user" && (
        <>
          <Link href="/user/dashboard" style={{ color: "white" }}>
            Panel
          </Link>
          <Link href="/user/tickets" style={{ color: "white" }}>
            Moje zgłoszenia
          </Link>
          <Link href="/user/tickets/new" style={{ color: "white" }}>
            Nowe zgłoszenie
          </Link>
          <Link href="/user/profile" style={{ color: "white" }}>
            Profil
          </Link>
        </>
      )}

      {role === "admin" && (
        <>
          <Link href="/admin/tickets" style={{ color: "white" }}>
            Zgłoszenia
          </Link>
          <Link href="/admin/communities" style={{ color: "white" }}>
            Wspólnoty
          </Link>
          <Link href="/admin/users" style={{ color: "white" }}>
            Użytkownicy
          </Link>
        </>
      )}

      <Link href="/logout" style={{ marginLeft: "auto", color: "white" }}>
        Wyloguj
      </Link>
    </nav>
  );
}
