import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { SmoothScrollProvider } from "@/components/smooth-scroll-provider";
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
  title: "Polaris Enterprises Group LLC | Technology Solutions for the Future",
  description:
    "Polaris Enterprises builds custom software, cloud infrastructure and artificial intelligence solutions that transform businesses. Results-driven technology consulting.",
  keywords: [
    "Polaris Enterprises",
    "digital transformation",
    "software development",
    "cloud",
    "DevOps",
    "artificial intelligence",
    "technology consulting",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "Polaris Enterprises Group LLC",
    title: "Polaris Enterprises Group LLC | Technology Solutions for the Future",
    description:
      "Custom software, cloud infrastructure and AI applied to business — from strategy to execution, focused on measurable results.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Polaris Enterprises Group LLC | Technology Solutions for the Future",
    description:
      "Custom software, cloud infrastructure and AI applied to business.",
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
      {/* CSS scroll-smooth is intentionally omitted — Lenis (in
          SmoothScrollProvider) owns smooth scrolling and the two conflict */}
      <body className="min-h-full flex flex-col bg-black">
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
      </body>
    </html>
  );
}
