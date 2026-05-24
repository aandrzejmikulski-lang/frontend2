export default function AdminCommunities() {
  return (
    <div>
      <h1 style={{ fontSize: 32, marginBottom: 20 }}>Wspólnoty mieszkaniowe</h1>

      <p style={{ opacity: 0.7, marginBottom: 20 }}>
        Tutaj administrator zarządza wszystkimi wspólnotami.
      </p>

      <div
        className="glass"
        style={{
          padding: 20,
          borderRadius: 12,
          marginBottom: 20,
        }}
      >
        <p>Brak wspólnot do wyświetlenia.</p>
      </div>
    </div>
  );
}
