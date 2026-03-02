"use client";
import React from "react";
import Navbar from "@/components/Navbar";
import { DeveloperFooter as Footer } from "@/components/Footer";
import About from "@/components/home/About";
import { useLanguage } from "@/context/LanguageContext";

export default function AboutPage() {
  const { t } = useLanguage();

  const aboutContent: string[] = [
    t(
      "home.about.content.0",
      "Embracing the Christian faith is both a profound privilege and a weighty responsibility..."
    ),
    t(
      "home.about.content.1",
      "Partnering with God, these seasons are ordinary yet may I reflect on my journey..."
    ),
    t(
      "home.about.content.2",
      "My life's path led me to Brazil and New Zealand with my beloved wife, Jandai..."
    ),
    t(
      "home.about.content.3",
      "Following Jesus's command in Matthew 28:19-20, we're committed to spreading the gospel..."
    ),
    t(
      "home.about.content.4",
      'As Theodore Roosevelt wisely said, "People don\'t care how much you know..."',
    ),
    t(
      "home.about.content.5",
      'In summation, I declare, "God is love" (1 John 4:8)...',
    ),
  ];

  return (
    <div className="min-h-screen bg-heavenly flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <About aboutContent={aboutContent} />
      </main>
      <Footer />
    </div>
  );
}
