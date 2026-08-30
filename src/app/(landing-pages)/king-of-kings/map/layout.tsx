export default function MapLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-screen overflow-hidden bg-[#0a0e1a] dark">{children}</div>
  );
}
