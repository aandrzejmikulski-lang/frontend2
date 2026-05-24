import UserSidebar from "@/components/UserSidebar";

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div style={{ display: "flex" }}>
      <UserSidebar />

      <div
        style={{
          marginLeft: 240,
          padding: 40,
          width: "100%",
        }}
      >
        {children}
      </div>
    </div>
  );
}

