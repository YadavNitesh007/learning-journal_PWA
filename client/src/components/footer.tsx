import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Download, Check, Heart } from "lucide-react";
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
      <div className="max-w-6xl mx-auto px-4 md:px-8 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col sm:flex-row items-center gap-4 text-sm text-muted-foreground">
            <span className="font-medium text-foreground" data-testid="text-footer-student">
              Nitesh Kumar Yadav • 2313244
            </span>
            <span className="hidden sm:inline text-muted-foreground/40">|</span>
            <span className="flex items-center gap-1.5" data-testid="text-footer-tagline">
              Made with <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" /> for FGCT6021
            </span>
            <span className="hidden sm:inline text-muted-foreground/40">|</span>
            <span data-testid="text-footer-copyright">{currentYear} Learning Journal</span>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button 
                variant="ghost" 
                size="sm" 
                className="gap-2"
                data-testid="link-footer-github"
              >
                <SiGithub className="w-4 h-4" />
                GitHub
              </Button>
            </a>

            {isInstalled ? (
              <Button 
                variant="outline" 
                size="sm" 
                disabled 
                className="gap-2"
                data-testid="button-installed"
              >
                <Check className="w-4 h-4" />
                Installed
              </Button>
            ) : deferredPrompt ? (
              <Button 
                variant="default" 
                size="sm" 
                onClick={handleInstall}
                className="gap-2"
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
                className="gap-2 opacity-60"
                data-testid="button-pwa-unavailable"
              >
                <Download className="w-4 h-4" />
                PWA Ready
              </Button>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}
