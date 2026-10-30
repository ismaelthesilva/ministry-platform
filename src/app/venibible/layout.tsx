import { Source_Serif_4 } from "next/font/google";
import "./reader.css";

const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  weight: ["400", "600"],
  style: ["normal", "italic"],
  variable: "--font-source-serif",
  display: "swap",
});

export default function VeniBibleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className={sourceSerif.variable}>{children}</div>;
}
