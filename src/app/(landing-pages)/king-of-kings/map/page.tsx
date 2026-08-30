import type { Metadata } from "next";
import { MapPage } from "@/components/map/MapPage";

export const metadata: Metadata = {
  title: "Prophetic Map — The Return of the King of Kings",
  description:
    "An interactive timeline of biblical prophecy from Revelation — the complete prophetic framework of The Cosmic Conflict Series by Ismael Silva.",
  openGraph: {
    title: "Prophetic Map — The Return of the King of Kings",
    description:
      "Explore the complete prophetic timeline: seven churches, seven seals, seven trumpets, seven feasts, and the final events sequence — all in one interactive map.",
    url: "https://ismaelsilva.org/king-of-kings/map",
  },
};

export default function MapRoute() {
  return <MapPage />;
}
