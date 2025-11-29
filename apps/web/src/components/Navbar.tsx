"use client";
// ...existing code...
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { cn } from "../lib/utils";
import {
  Menu,
  Sun,
  Moon,
  Book,
  Music,
  MessageSquare,
  Heart,
  User,
} from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { initializeTheme, toggleTheme, getStoredTheme } from "../lib/theme";

const DarkModeToggle: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  useEffect(() => {
    const currentTheme = initializeTheme();
    setIsDarkMode(currentTheme === "dark");
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleSystemChange = (e: MediaQueryListEvent) => {
      const stored = getStoredTheme();
      if (stored === "system") {
        setIsDarkMode(e.matches);
      }
    };
    mediaQuery.addEventListener("change", handleSystemChange);
    return () => mediaQuery.removeEventListener("change", handleSystemChange);
  }, []);
  const handleToggle = () => {
    const newTheme = toggleTheme();
    setIsDarkMode(newTheme === "dark");
  };
  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={handleToggle}
      className="rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
      title={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
    >
      {isDarkMode ? (
        <Sun className="h-5 w-5 text-yellow-500" />
      ) : (
        <Moon className="h-5 w-5 text-gray-700 dark:text-gray-300" />
      )}
    </Button>
  );
};

const LanguageSwitcher: React.FC = () => {
  const { language, setLanguage } = useLanguage();
  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => setLanguage(language === "en" ? "br" : "en")}
      className="rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-sm"
    >
      {language === "en" ? "🇺🇸 EN" : "🇧🇷 PT"}
    </Button>
  );
};

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const { t } = useLanguage();
  const isActive = (path: string) => pathname === path;
  const navigationItems = [
    {
      name: t("navbar.home", "Home"),
      href: "/",
      icon: <Heart className="h-4 w-4" />,
    },
    {
      name: t("navbar.messages", "Messages"),
      href: "#messages",
      icon: <MessageSquare className="h-4 w-4" />,
    },
    {
      name: t("navbar.songs", "Songs"),
      href: "#songs",
      icon: <Music className="h-4 w-4" />,
    },
    {
      name: t("navbar.books", "Books"),
      href: "#books",
      icon: <Book className="h-4 w-4" />,
    },
    {
      name: t("navbar.revelation", "Revelation"),
      href: "/revelation",
      icon: <Book className="h-4 w-4" />,
    },
    {
      name: t("navbar.about", "About"),
      href: "#about",
      icon: <User className="h-4 w-4" />,
    },
    {
      name: t("navbar.contact", "Contact"),
      href: "#contact",
      icon: <Heart className="h-4 w-4" />,
    },
  ];
  const scrollToSection = (sectionId: string) => {
    if (sectionId.startsWith("#")) {
      const element = document.querySelector(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };
  const handleNavClick = (href: string) => {
    if (href.startsWith("#")) {
      scrollToSection(href);
    }
    setIsOpen(false);
  };
  return (
    <nav className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 relative">
              <img
                src="/logo-ministry1.png"
                alt="Ismael Silva Ministry Logo"
                className="w-full h-full object-contain bg-white/10"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-gray-900 dark:text-white text-sm">
                ISMAEL SILVA
              </span>
              <span className="text-xs text-gray-600 dark:text-gray-400">
                {t("navbar.subtitle", "Ministry & Music")}
              </span>
            </div>
          </Link>
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navigationItems.map((item) =>
              item.href.startsWith("#") ? (
                <button
                  key={item.name}
                  onClick={() => handleNavClick(item.href)}
                  className={cn(
                    "flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                    "hover:bg-gray-100 dark:hover:bg-gray-800",
                    "text-gray-700 dark:text-gray-300"
                  )}
                >
                  {item.icon}
                  <span>{item.name}</span>
                </button>
              ) : (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                    "hover:bg-gray-100 dark:hover:bg-gray-800",
                    isActive(item.href)
                      ? "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300"
                      : "text-gray-700 dark:text-gray-300"
                  )}
                >
                  {item.icon}
                  <span>{item.name}</span>
                </Link>
              )
            )}
            <div className="flex items-center space-x-2 ml-4">
              <LanguageSwitcher />
              <DarkModeToggle />
            </div>
          </div>
          {/* Mobile Navigation */}
          <div className="md:hidden flex items-center space-x-2">
            <LanguageSwitcher />
            <DarkModeToggle />
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-72">
                <div className="flex flex-col space-y-1 mt-8">
                  {navigationItems.map((item) =>
                    item.href.startsWith("#") ? (
                      <button
                        key={item.name}
                        onClick={() => handleNavClick(item.href)}
                        className="flex items-center space-x-3 px-4 py-3 rounded-lg text-left hover:bg-gray-100 dark:hover:bg-gray-800 w-full"
                      >
                        {item.icon}
                        <span className="font-medium">{item.name}</span>
                      </button>
                    ) : (
                      <Link
                        key={item.name}
                        href={item.href}
                        onClick={() => setIsOpen(false)}
                        className={cn(
                          "flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800",
                          isActive(item.href) &&
                            "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300"
                        )}
                      >
                        {item.icon}
                        <span className="font-medium">{item.name}</span>
                      </Link>
                    )
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
