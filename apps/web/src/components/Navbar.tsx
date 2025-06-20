import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { 
  Menu, 
  Sun, 
  Moon, 
  Book,
  Music,
  MessageSquare,
  Heart,
  User
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const DarkModeToggle: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    
    if (newMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleDarkMode}
      className="rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
    >
      {isDarkMode ? (
        <Sun className="h-5 w-5 text-yellow-500" />
      ) : (
        <Moon className="h-5 w-5 text-gray-700" />
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
      onClick={() => setLanguage(language === 'en' ? 'br' : 'en')}
      className="rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-sm"
    >
      {language === 'en' ? '🇺🇸 EN' : '🇧🇷 PT'}
    </Button>
  );
};

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { t } = useLanguage();

  const isActive = (path: string) => location.pathname === path;

  const navigationItems = [
    { name: t('navbar.home'), href: '/', icon: <Heart className="h-4 w-4" /> },
    { name: t('navbar.messages'), href: '#messages', icon: <MessageSquare className="h-4 w-4" /> },
    { name: t('navbar.songs'), href: '#songs', icon: <Music className="h-4 w-4" /> },
    { name: t('navbar.books'), href: '#books', icon: <Book className="h-4 w-4" /> },
    { name: t('navbar.about'), href: '#about', icon: <User className="h-4 w-4" /> },
    { name: t('navbar.contact'), href: '#contact', icon: <Heart className="h-4 w-4" /> },
  ];

  const scrollToSection = (sectionId: string) => {
    if (sectionId.startsWith('#')) {
      const element = document.querySelector(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  const handleNavClick = (href: string) => {
    if (href.startsWith('#')) {
      scrollToSection(href);
    }
    setIsOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo Section */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-3">
              <div className="relative">
                <div className="h-10 w-10 rounded-full overflow-hidden flex items-center justify-center bg-gradient-to-r from-blue-600 to-purple-600">
                  <span className="text-white font-bold text-lg">IS</span>
                </div>
              </div>
              <div className="hidden sm:block">
                <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Ismael Silva
                </span>
                <p className="text-xs text-muted-foreground font-medium">{t('navbar.subtitle', 'Ministry')}</p>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center justify-center flex-1 px-8">
            <div className="flex space-x-8">
              {navigationItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => handleNavClick(item.href)}
                  className={cn(
                    "text-sm font-medium transition-colors hover:text-primary",
                    isActive(item.href) ? "text-primary" : "text-muted-foreground"
                  )}
                >
                  {item.name}
                </button>
              ))}
            </div>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-3">
            <LanguageSwitcher />
            <DarkModeToggle />

            {/* Mobile menu trigger */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="lg:hidden">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80">
                <div className="flex flex-col space-y-4 mt-6">
                  {/* Mobile Logo */}
                  <Link 
                    to="/" 
                    className="flex items-center space-x-3 mb-4" 
                    onClick={() => setIsOpen(false)}
                  >
                    <div className="h-8 w-8 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center">
                      <span className="text-white font-bold text-sm">IS</span>
                    </div>
                    <span className="text-lg font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                      Ismael Silva Ministry
                    </span>
                  </Link>

                  <Separator />

                  {/* Mobile Navigation */}
                  <div className="space-y-2">
                    {navigationItems.map((item) => (
                      <Button
                        key={item.name}
                        variant="ghost"
                        className="w-full justify-start h-auto py-3"
                        onClick={() => handleNavClick(item.href)}
                      >
                        <div className="flex items-center space-x-3">
                          {item.icon}
                          <span className="font-medium">{item.name}</span>
                        </div>
                      </Button>
                    ))}
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
