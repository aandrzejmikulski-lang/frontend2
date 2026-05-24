"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AdminSidebar() {
  const pathname = usePathname();

  const linkStyle = (path: string) => ({
    padding: "12px 20px",
    borderRadius: 8,
    background: pathname.startsWith(path) ? "rgba(255,255,255,0.2)" : "transparent",
    fontWeight: pathname.startsWith(path) ? "bold" : "normal",
    cursor: "pointer",
  });

  return (
    <div
      style={{
        width: 240,
        height: "100vh",
        position: "fixed",
        left: 0,
        top: 0,
        padding: 20,
        background: "rgba(0,0,0,0.85)",
        color: "white",
        display: "flex",
        flexDirection: "column",
        gap: 20,
      }}
    >
      <h2 style={{ fontSize: 22, marginBottom: 10 }}>Panel Admina</h2>

      <Link href="/admin/dashboard" style={linkStyle("/admin/dashboard")}>
        Dashboard
      </Link>

      <Link href="/admin/tickets" style={linkStyle("/admin/tickets")}>
        Zgłoszenia
      </Link>

      <Link href="/admin/users" style={linkStyle("/admin/users")}>
        Użytkownicy
      </Link>

      <Link href="/admin/buildings" style={linkStyle("/admin/buildings")}>
        Budynki
      </Link>

      <Link href="/admin/communities" style={linkStyle("/admin/communities")}>
        Wspólnoty
      </Link>
    </div>
  );
}
