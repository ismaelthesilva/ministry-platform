"use client";
import React from "react";
import Navbar from "@/components/Navbar";
import { DeveloperFooter as Footer } from "@/components/Footer";
import About from "@/components/home/About";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-heavenly flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <About />
      </main>
      <Footer />
    </div>
  );
}
