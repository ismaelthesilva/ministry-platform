import type { Metadata } from "next";
import Navbar from "../../components/Navbar";
import { bookMeta } from "./content-en/front-matter";
import RevelationLanding from "./_components/RevelationLanding";

export const metadata: Metadata = {
  title: `${bookMeta.title} — Ismael Silva`,
  description: bookMeta.subtitle,
};

export default function RevelationPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <Navbar />
      <RevelationLanding />
    </div>
  );
}
