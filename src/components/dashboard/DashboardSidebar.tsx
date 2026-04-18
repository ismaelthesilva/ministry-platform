"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Home, BookOpen, List, User, LogOut, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";
import { useLanguage } from "@/context/LanguageContext";

export function DashboardSidebar() {
  const pathname = usePathname();
  const { t, language, setLanguage } = useLanguage();

  const menuItems = [
    {
      href: "/dashboard",
      label: t("dashboard.sidebar.home"),
      icon: Home,
    },
    {
      href: "/dashboard/readings",
      label: t("dashboard.sidebar.readings"),
      icon: BookOpen,
    },
    {
      href: "/dashboard/plans",
      label: t("dashboard.sidebar.plans"),
      icon: List,
    },
    {
      href: "/dashboard/profile",
      label: t("dashboard.sidebar.profile"),
      icon: User,
    },
  ];

  return (
    <aside className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0 bg-gray-50 dark:bg-gray-900 border-r">
      <div className="flex flex-col flex-1 min-h-0">
        <div className="flex items-center h-16 flex-shrink-0 px-4 border-b">
          <h1 className="text-xl font-bold">Ministry Platform</h1>
        </div>
        <nav
          className="flex-1 px-2 py-4 space-y-1"
          aria-label="Primary navigation"
        >
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive =
              pathname === item.href ||
              (item.href !== "/dashboard" && pathname.startsWith(item.href));

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors",
                  isActive
                    ? "bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                    : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-100"
                )}
                aria-current={isActive ? "page" : undefined}
              >
                <Icon className="mr-3 h-5 w-5 flex-shrink-0" />
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="flex-shrink-0 p-4 border-t space-y-2">
          <Button
            variant="ghost"
            className="w-full justify-start text-sm"
            onClick={() => setLanguage(language === "en" ? "br" : "en")}
            aria-label={t("navbar.toggleLanguage")}
          >
            <Globe className="mr-3 h-5 w-5" />
            {language === "en" ? "Português" : "English"}
          </Button>
          <Button
            variant="outline"
            className="w-full justify-start"
            onClick={() => signOut({ callbackUrl: "/login" })}
            aria-label={t("dashboard.sidebar.signOut")}
          >
            <LogOut className="mr-3 h-5 w-5" />
            {t("dashboard.sidebar.signOut")}
          </Button>
        </div>
      </div>
    </aside>
  );
}
