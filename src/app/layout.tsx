import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Pandilla - Taller de Sanguchitos",
  description: "Pandilla - Taller de Sanguchitos del Barrio. Los deliciosos sanguchitos para niños de 2 a 4 años.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}

