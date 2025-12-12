import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "../context/LanguageContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
  ),
  title: "Ismael Silva Ministry | Biblical Studies & Revelation Research",
  description:
    "Comprehensive biblical studies, Revelation chapter-by-chapter analysis, and ministry resources in English and Portuguese.",
  keywords: [
    "Bible study",
    "Revelation",
    "Biblical research",
    "Ministry",
    "Christian education",
    "Ismael Silva",
  ],
  authors: [{ name: "Ismael Silva" }],
  creator: "Ismael Silva",
  publisher: "Ismael Silva Ministry",

  icons: {
    icon: [
      { url: "/logo-ministry1.png", sizes: "32x32", type: "image/png" },
      { url: "/logo-512.png", sizes: "192x192", type: "image/png" },
    ],
    apple: "/logo-ministry1.png",
    shortcut: "/logo-ministry1.png",
  },

  // Open Graph (Facebook, LinkedIn)
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://ismaelsilva.org",
    title: "Ismael Silva Ministry",
    description: "Biblical studies and Revelation research platform",
    siteName: "Ismael Silva Ministry",
    images: [
      {
        url: "/logo-ministry1.png",
        width: 1200,
        height: 1200,
        alt: "Ismael Silva Ministry",
      },
    ],
  },

  // Twitter Card
  twitter: {
    card: "summary_large_image",
    title: "Ismael Silva Ministry",
    description: "Biblical studies and Revelation research",
    images: ["/logo-ministry1.png"],
    creator: "@ismaethesilva",
  },

  // Additional SEO
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  verification: {
    google: "RIy2jTk9tPYJDn6IDjhGPR2Z-isCnyB8wt8jyvN7qbg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
