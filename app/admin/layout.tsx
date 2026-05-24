import AdminSidebar from "@/components/AdminSidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div style={{ display: "flex" }}>
      <AdminSidebar />

      <div
        style={{
          marginLeft: 260,
          padding: 40,
          width: "100%",
        }}
      >
        {children}
      </div>
    </div>
  );
}

