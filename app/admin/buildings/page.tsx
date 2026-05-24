export default function AdminBuildings() {
  return (
    <div>
      <h1 style={{ fontSize: 32, marginBottom: 20 }}>Budynki</h1>

      <p style={{ opacity: 0.7, marginBottom: 20 }}>
        Tutaj administrator zarządza wszystkimi budynkami przypisanymi do wspólnot.
      </p>

      <div
        className="glass"
        style={{
          padding: 20,
          borderRadius: 12,
          marginBottom: 20,
        }}
      >
        <p>Brak budynków do wyświetlenia.</p>
      </div>
    </div>
  );
}
