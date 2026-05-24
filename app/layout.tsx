import "./globals.css";

export const metadata = {
  title: "Zarządzanie Wspólnotą",
  description: "System administracji budynkami i zgłoszeniami mieszkańców",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pl">
      <body>{children}</body>
    </html>
  );
}
