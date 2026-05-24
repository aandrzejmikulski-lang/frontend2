export default function AdminUsers() {
  return (
    <div>
      <h1 style={{ fontSize: 32, marginBottom: 20 }}>Użytkownicy systemu</h1>

      <p style={{ opacity: 0.7, marginBottom: 20 }}>
        Lista wszystkich użytkowników pojawi się tutaj.
      </p>

      <div
        className="glass"
        style={{
          padding: 20,
          borderRadius: 12,
          marginBottom: 20,
        }}
      >
        <p>Brak użytkowników do wyświetlenia.</p>
      </div>
    </div>
  );
}
