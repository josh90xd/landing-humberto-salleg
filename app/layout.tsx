import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Dr. Humberto Salleg | Ortodoncia Premium en Barranquilla",
  description:
    "Sitio profesional del Dr. Humberto Daniel Salleg Blanco, odontologo y ortodoncista con formacion internacional y practica clinica en Barranquilla.",
  openGraph: {
    title: "Dr. Humberto Salleg | Ortodoncia Premium",
    description:
      "Ortodoncia especializada con criterio academico, atencion personalizada y enfoque estetico.",
    type: "website",
    images: ["/dental-studio.png"],
  },
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
      <body className={`${jakarta.variable} antialiased`}>{children}</body>
    </html>
  );
}
