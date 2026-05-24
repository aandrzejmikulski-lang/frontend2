export default function UserTickets() {
  return (
    <div>
      <h1 style={{ fontSize: 32, marginBottom: 20 }}>Twoje zgłoszenia</h1>

      <p style={{ opacity: 0.7, marginBottom: 20 }}>
        Tutaj pojawią się wszystkie zgłoszenia, które dodałeś.
      </p>

      <div
        className="glass"
        style={{
          padding: 20,
          borderRadius: 12,
        }}
      >
        <p>Brak zgłoszeń do wyświetlenia.</p>
      </div>
    </div>
  );
}
