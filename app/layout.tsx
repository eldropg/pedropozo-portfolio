import type { Metadata } from "next";
import { Geist, Geist_Mono, Playfair_Display } from "next/font/google";
import "./globals.css";
import SmoothScroll from "../components/SmoothScroll";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

export const metadata = {
  title: 'Pedro Pozo | Developer', 
  description: 'Portafolio profesional de Pedro Pozo. Desarrollo de software de alto rendimiento, arquitecturas escalables y diseño UI/UX High-End.',
  icons: {
    icon: '/favicon.ico', 
  },
  openGraph: {
    title: 'Pedro Pozo | Software Engineer',
    description: 'Explora mis proyectos y conoce soluciones innovadoras en desarrollo de software y arquitecturas web de alto nivel.',
    url: 'https://pedropozo.dev',
    siteName: 'Pedro Pozo Portfolio',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Pedro Pozo Portfolio Preview',
      },
    ],
    locale: 'es_CL',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} antialiased`}
      >
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}