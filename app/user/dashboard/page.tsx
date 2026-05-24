export default function UserDashboard() {
  return (
    <div>
      <h1 style={{ fontSize: 32, marginBottom: 20 }}>Witaj w panelu mieszkańca</h1>

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
          <h3>Twoje zgłoszenia</h3>
          <p style={{ opacity: 0.7 }}>Liczba zgłoszeń: —</p>
        </div>

        <div
          className="glass"
          style={{
            padding: 20,
            width: 250,
            borderRadius: 12,
          }}
        >
          <h3>Nowe zgłoszenie</h3>
          <p style={{ opacity: 0.7 }}>Dodaj nowe zgłoszenie</p>
        </div>
      </div>
    </div>
  );
}

