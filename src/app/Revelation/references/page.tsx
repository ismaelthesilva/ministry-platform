import type { Metadata } from "next";
import Navbar from "../../../components/Navbar";
import { bookMeta } from "../content-en/front-matter";
import ReferencesContent from "../_components/ReferencesContent";

export const metadata: Metadata = {
  title: `References — ${bookMeta.title}`,
  description: `Sources and references cited in ${bookMeta.title}, Volume ${bookMeta.volume} of The Cosmic Conflict series.`,
};

export default function RevelationReferencesPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <Navbar />
      <ReferencesContent />
    </div>
  );
}
