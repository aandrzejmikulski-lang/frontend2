"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function UserSidebar() {
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
        width: 220,
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
      <h2 style={{ fontSize: 22, marginBottom: 10 }}>Panel użytkownika</h2>

      <Link href="/user/dashboard" style={linkStyle("/user/dashboard")}>
        Dashboard
      </Link>

      <Link href="/user/tickets" style={linkStyle("/user/tickets")}>
        Moje zgłoszenia
      </Link>

      <Link href="/user/tickets/new" style={linkStyle("/user/tickets/new")}>
        Nowe zgłoszenie
      </Link>
    </div>
  );
}

