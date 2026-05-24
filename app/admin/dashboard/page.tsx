export default function AdminDashboard() {
  return (
    <div>
      <h1 style={{ fontSize: 32, marginBottom: 20 }}>Dashboard administratora</h1>

      <div
        style={{
          display: "flex",
          gap: 20,
          flexWrap: "wrap",
        }}
      >
        <div
          className="glass"
          style={{
            padding: 20,
            width: 250,
            borderRadius: 12,
          }}
        >
          <h3>Wspólnoty</h3>
          <p style={{ opacity: 0.7 }}>Liczba wspólnot: —</p>
        </div>

        <div
          className="glass"
          style={{
            padding: 20,
            width: 250,
            borderRadius: 12,
          }}
        >
          <h3>Zgłoszenia</h3>
          <p style={{ opacity: 0.7 }}>Nowe zgłoszenia: —</p>
        </div>

        <div
          className="glass"
          style={{
            padding: 20,
            width: 250,
            borderRadius: 12,
          }}
        >
          <h3>Użytkownicy</h3>
          <p style={{ opacity: 0.7 }}>Aktywni użytkownicy: —</p>
        </div>
      </div>
    </div>
  );
}

