import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/lib/theme-provider";
import { Home, BookOpen, User, FolderOpen, Sun, Moon, Menu, X, Wifi, WifiOff } from "lucide-react";
import { useState, useEffect } from "react";

const navItems = [
  { path: "/", label: "Home", icon: Home },
  { path: "/journal", label: "Journal", icon: BookOpen },
  { path: "/projects", label: "Projects", icon: FolderOpen },
  { path: "/about", label: "About", icon: User },
];

export function Navigation() {
  const [location] = useLocation();
  const { theme, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {!isOnline && (
        <div 
          className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-amber-500 to-orange-500 text-white px-4 py-2.5 text-center text-sm font-medium flex items-center justify-center gap-2"
          data-testid="banner-offline"
        >
          <WifiOff className="w-4 h-4" />
          You're offline. Changes will sync when connected.
        </div>
      )}
      <nav 
        className={`fixed left-0 right-0 z-40 h-16 transition-all duration-300 ${
          scrolled 
            ? 'bg-background/95 backdrop-blur-xl border-b border-border shadow-sm' 
            : 'bg-background/80 backdrop-blur-lg border-b border-transparent'
        } ${!isOnline ? 'top-10' : 'top-0'}`}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="max-w-6xl mx-auto px-4 md:px-8 h-full flex items-center justify-between gap-4">
          <Link href="/">
            <span 
              className="font-serif font-bold text-xl tracking-tight cursor-pointer hover:text-primary transition-colors flex items-center gap-2"
              data-testid="link-logo"
            >
              <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-violet-500 flex items-center justify-center text-white text-sm font-bold shadow-lg shadow-primary/25">
                LJ
              </span>
              <span className="hidden sm:inline">Learning Journal</span>
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-1 bg-muted/50 rounded-full p-1">
            {navItems.map((item) => {
              const isActive = location === item.path;
              const Icon = item.icon;
              return (
                <Link key={item.path} href={item.path}>
                  <Button
                    variant={isActive ? "secondary" : "ghost"}
                    size="sm"
                    className={`gap-2 rounded-full ${isActive ? 'shadow-sm' : ''}`}
                    data-testid={`link-nav-${item.label.toLowerCase()}`}
                  >
                    <Icon className="w-4 h-4" />
                    {item.label}
                  </Button>
                </Link>
              );
            })}
          </div>

          <div className="flex items-center gap-2">
            <div 
              className="hidden sm:flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full bg-muted/50"
              data-testid="status-connection"
            >
              {isOnline ? (
                <>
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-muted-foreground">Online</span>
                </>
              ) : (
                <>
                  <span className="w-2 h-2 rounded-full bg-amber-500" />
                  <span className="text-muted-foreground">Offline</span>
                </>
              )}
            </div>
            
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
              className="rounded-full"
              data-testid="button-theme-toggle"
            >
              {theme === "light" ? (
                <Moon className="w-[18px] h-[18px]" />
              ) : (
                <Sun className="w-[18px] h-[18px]" />
              )}
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="md:hidden rounded-full"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
              data-testid="button-mobile-menu"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </Button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden absolute top-16 left-0 right-0 bg-background/98 backdrop-blur-xl border-b border-border shadow-lg">
            <div className="flex flex-col p-4 gap-1">
              {navItems.map((item) => {
                const isActive = location === item.path;
                const Icon = item.icon;
                return (
                  <Link key={item.path} href={item.path}>
                    <Button
                      variant={isActive ? "secondary" : "ghost"}
                      className="w-full justify-start gap-3 h-12"
                      onClick={() => setMobileMenuOpen(false)}
                      data-testid={`link-mobile-nav-${item.label.toLowerCase()}`}
                    >
                      <Icon className="w-5 h-5" />
                      {item.label}
                    </Button>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </nav>
    </>
  );
}
