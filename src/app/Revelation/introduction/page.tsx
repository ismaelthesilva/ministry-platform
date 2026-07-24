import type { Metadata } from "next";
import Navbar from "../../../components/Navbar";
import { bookMeta } from "../content-en/front-matter";
import IntroductionContent from "../_components/IntroductionContent";

export const metadata: Metadata = {
  title: `Introduction — ${bookMeta.title}`,
  description: `Introduction to ${bookMeta.title}, by ${bookMeta.author}.`,
};

export default function RevelationIntroductionPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <Navbar />
      <IntroductionContent />
    </div>
  );
}
