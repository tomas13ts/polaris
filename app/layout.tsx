import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://polaris-enterprises.com"),
  title: "Polaris | AI, Software & Digital Commerce",
  description:
    "A new orbit for your business. Polaris Enterprises Group LLC builds AI, custom software and digital commerce experiences around your business.",
  keywords: [
    "Polaris Enterprises",
    "digital transformation",
    "software development",
    "online store development",
    "workflow automation",
    "artificial intelligence",
    "technology consulting",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "Polaris Enterprises Group LLC",
    title: "Polaris | A new orbit for your business",
    description:
      "Artificial intelligence, custom software and digital commerce. Human ambition meets intelligent possibilities.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Polaris | A new orbit for your business",
    description:
      "Artificial intelligence, custom software and digital commerce, built around your business.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} dark h-full antialiased`}
    >
      <body>{children}</body>
    </html>
  );
}
