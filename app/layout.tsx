"use client";

import { useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { setCookie } from "cookies-next";

export default function RootLayout({ children }) {
  useEffect(() => {
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

      if (data?.role) {
        setCookie("role", data.role);
      }
    };

    loadRole();
  }, []);

  return (
    <html lang="pl">
      <body>{children}</body>
    </html>
  );
}
