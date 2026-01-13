import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Download, Check, Heart, Sparkles } from "lucide-react";
import { SiGithub } from "react-icons/si";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

export function Footer() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };

    window.addEventListener("beforeinstallprompt", handler);

    if (window.matchMedia("(display-mode: standalone)").matches) {
      setIsInstalled(true);
    }

    return () => {
      window.removeEventListener("beforeinstallprompt", handler);
    };
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;

    if (outcome === "accepted") {
      setIsInstalled(true);
    }

    setDeferredPrompt(null);
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-muted/30">
      <div className="max-w-6xl mx-auto px-4 md:px-8 py-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex flex-col items-center md:items-start gap-3">
            <div className="flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-violet-500 flex items-center justify-center text-white text-sm font-bold shadow-lg shadow-primary/25">
                LJ
              </span>
              <span className="font-serif font-bold text-lg">Learning Journal</span>
            </div>
            <div className="text-sm text-muted-foreground text-center md:text-left">
              <p className="font-medium text-foreground mb-1" data-testid="text-footer-student">
                Nitesh Kumar Yadav • Student ID: 2313244
              </p>
              <p data-testid="text-footer-course">FGCT6021 Mobile App Development</p>
            </div>
          </div>

          <div className="flex flex-col items-center gap-4">
            <div className="flex items-center gap-3">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="gap-2 rounded-full"
                  data-testid="link-footer-github"
                >
                  <SiGithub className="w-4 h-4" />
                  GitHub
                </Button>
              </a>

              {isInstalled ? (
                <Button 
                  variant="secondary" 
                  size="sm" 
                  disabled 
                  className="gap-2 rounded-full"
                  data-testid="button-installed"
                >
                  <Check className="w-4 h-4 text-emerald-500" />
                  Installed
                </Button>
              ) : deferredPrompt ? (
                <Button 
                  size="sm" 
                  onClick={handleInstall}
                  className="gap-2 rounded-full shadow-lg shadow-primary/25"
                  data-testid="button-install-pwa"
                >
                  <Download className="w-4 h-4" />
                  Install App
                </Button>
              ) : (
                <Button 
                  variant="outline" 
                  size="sm" 
                  disabled 
                  className="gap-2 rounded-full"
                  data-testid="button-pwa-unavailable"
                >
                  <Sparkles className="w-4 h-4" />
                  PWA Ready
                </Button>
              )}
            </div>

            <p className="text-sm text-muted-foreground flex items-center gap-1.5" data-testid="text-footer-tagline">
              Made with <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" /> for FGCT6021 • {currentYear}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
