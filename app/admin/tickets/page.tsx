export default function AdminTickets() {
  return (
    <div>
      <h1 style={{ fontSize: 32, marginBottom: 20 }}>Zgłoszenia mieszkańców</h1>

      <p style={{ opacity: 0.7, marginBottom: 20 }}>
        Tutaj administrator widzi wszystkie zgłoszenia od użytkowników.
      </p>

      <div
        className="glass"
        style={{
          padding: 20,
          borderRadius: 12,
          marginBottom: 20,
        }}
      >
        <p>Brak zgłoszeń do wyświetlenia.</p>
      </div>
    </div>
  );
}
