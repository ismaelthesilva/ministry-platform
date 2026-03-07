"use client";
// ...existing code...
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { cn } from "../lib/utils";
import {
  Menu,
  Book,
  Music,
  MessageSquare,
  Heart,
  User,
  Mail,
  BookOpen,
} from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

const LanguageSwitcher: React.FC = () => {
  const { language, setLanguage } = useLanguage();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => setLanguage(language === "en" ? "br" : "en")}
      className="rounded-full hover:bg-gray-100 text-sm"
    >
      {mounted ? (language === "en" ? "🇺🇸 EN" : "🇧🇷 PT") : "🇺🇸 EN"}
    </Button>
  );
};

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const pathname = usePathname();
  const { t } = useLanguage();
  const [mounted, setMounted] = React.useState(true);

  useEffect(() => {
    const updateActive = () => {
      const path = pathname;
      const hash = window.location.hash;
      if (path === "/") {
        if (hash === "" || hash === "#") {
          setActiveSection("home");
        } else {
          setActiveSection(hash.substring(1)); // remove #
        }
      } else if (path === "/Revelation") {
        setActiveSection("revelation");
      } else {
        setActiveSection("");
      }
    };
    updateActive();
    window.addEventListener("hashchange", updateActive);
    return () => window.removeEventListener("hashchange", updateActive);
  }, [pathname]);

  const isActive = (path: string) => {
    if (path === "/") return activeSection === "home";
    if (path.startsWith("/#")) return activeSection === path.substring(2);
    return pathname === path;
  };
  const navigationItems = [
    {
      name: t("navbar.home", "Home"),
      href: "/",
      icon: <Heart className="h-4 w-4" />,
    },
    {
      name: t("navbar.messages", "Messages"),
      href: "/#messages",
      icon: <MessageSquare className="h-4 w-4" />,
    },
    {
      name: t("navbar.songs", "Songs"),
      href: "/#songs",
      icon: <Music className="h-4 w-4" />,
    },
    {
      name: t("navbar.books", "Books"),
      href: "/#books",
      icon: <Book className="h-4 w-4" />,
    },
    {
      name: t("navbar.revelation", "Revelation"),
      href: "/Revelation",
      icon: <Book className="h-4 w-4" />,
    },
    {
      name: t("navbar.about", "About"),
      href: "/about",
      icon: <User className="h-4 w-4" />,
    },
    {
      name: t("navbar.contact", "Contact"),
      href: "/contact",
      icon: <Mail className="h-4 w-4" />,
    },
  ];
  const scrollToSection = (sectionId: string) => {
    if (sectionId.startsWith("#")) {
      const element = document.querySelector(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
        try {
          window.history.replaceState(null, "", sectionId);
        } catch {
          /* ignore */
        }
        setActiveSection(sectionId.substring(1));
      }
    }
  };
  const handleNavClick = (href: string) => {
    if (href.includes("#")) {
      const hash = href.split("#")[1];
      scrollToSection("#" + hash);
    }
    setIsOpen(false);
  };
  // Observe sections on the homepage to update active nav item while scrolling
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (pathname !== "/") return;

    const ids = ["messages", "songs", "books", "about"];
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];
    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
            try {
              window.history.replaceState(null, "", `#${entry.target.id}`);
            } catch {}
          }
        });
      },
      { root: null, rootMargin: "-40% 0px -40% 0px", threshold: 0 },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [pathname]);
  return (
    <nav className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 relative">
              <Image
                src="/logo-ministry1.png"
                alt="Ismael Silva Ministry Logo"
                fill
                className="object-contain bg-white/10"
                sizes="40px"
                priority
              />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-gray-900 text-sm">
                ISMAEL SILVA
              </span>
              <span className="text-xs text-gray-600">
                {mounted
                  ? t("navbar.subtitle", "Ministry & Music")
                  : "Ministry & Music"}
              </span>
            </div>
          </Link>
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navigationItems.map((item) =>
              item.href.includes("#") ? (
                <button
                  key={item.name}
                  onClick={() => handleNavClick(item.href)}
                  className={cn(
                    "flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                    "hover:bg-gray-100",
                    "text-gray-700",
                  )}
                >
                  {item.icon}
                  <span>{mounted ? item.name : ""}</span>
                </button>
              ) : (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                    "hover:bg-gray-100",
                    isActive(item.href)
                      ? "bg-blue-100 text-blue-700"
                      : "text-gray-700",
                  )}
                >
                  {item.icon}
                  <span>{mounted ? item.name : ""}</span>
                </Link>
              ),
            )}
            <div className="flex items-center space-x-2 ml-4">
              <LanguageSwitcher />
            </div>
            <div className="ml-4">
              <Button
                asChild
                className="bg-green-600 hover:bg-green-700 text-white font-bold px-4 py-2 rounded-lg flex items-center space-x-2"
              >
                <Link href="/dashboard">
                  <BookOpen className="h-4 w-4" />
                  <span>
                    {mounted ? t("navbar.bibleTracker", "Bible Tracker") : ""}
                  </span>
                </Link>
              </Button>
            </div>
          </div>
          {/* Mobile Navigation */}
          <div className="md:hidden flex items-center space-x-2">
            <LanguageSwitcher />
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-72">
                <div className="flex flex-col space-y-1 mt-8">
                  {navigationItems.map((item) =>
                    item.href.includes("#") ? (
                      <button
                        key={item.name}
                        onClick={() => handleNavClick(item.href)}
                        className="flex items-center space-x-3 px-4 py-3 rounded-lg text-left hover:bg-gray-100 w-full"
                      >
                        {item.icon}
                        <span className="font-medium">
                          {mounted ? item.name : ""}
                        </span>
                      </button>
                    ) : (
                      <Link
                        key={item.name}
                        href={item.href}
                        onClick={() => setIsOpen(false)}
                        className={cn(
                          "flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-gray-100",
                          isActive(item.href) && "bg-blue-100 text-blue-700",
                        )}
                      >
                        {item.icon}
                        <span className="font-medium">
                          {mounted ? item.name : ""}
                        </span>
                      </Link>
                    ),
                  )}
                  <div className="pt-4 px-4">
                    <Button
                      asChild
                      className="w-full bg-green-600 hover:bg-green-700 text-white font-bold flex items-center justify-center space-x-2 py-6 rounded-xl"
                      onClick={() => setIsOpen(false)}
                    >
                      <Link href="/dashboard">
                        <BookOpen className="h-5 w-5" />
                        <span className="text-lg">
                          {mounted
                            ? t("navbar.bibleTracker", "Bible Tracker")
                            : ""}
                        </span>
                      </Link>
                    </Button>
                  </div>
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
