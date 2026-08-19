import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Puntazo · Mapa de arquitectura",
  description: "Fuente visual y navegable de la arquitectura de Puntazo.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
