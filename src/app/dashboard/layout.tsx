import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { MobileNav } from "@/components/dashboard/MobileNav";
import { DeveloperFooter } from "@/components/Footer";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen overflow-hidden">
      {/* Desktop Sidebar */}
      <DashboardSidebar />

      {/* Main Content */}
      <div className="flex flex-col flex-1 w-0 md:pl-64">
        {/* Mobile Header */}
        <div className="flex items-center h-16 px-4 border-b md:hidden">
          <MobileNav />
          <h1 className="ml-4 text-xl font-bold">Ministry Platform</h1>
        </div>

        {/* Page Content */}
        <main className="flex-1 relative overflow-y-auto focus:outline-none">
          {children}
          <DeveloperFooter />
        </main>
      </div>
    </div>
  );
}
