import { SiGithub } from "react-icons/si";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

export function Footer() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    const handleBeforeInstall = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };

    const handleAppInstalled = () => {
      setIsInstalled(true);
      setDeferredPrompt(null);
    };

    if (window.matchMedia("(display-mode: standalone)").matches) {
      setIsInstalled(true);
    }

    window.addEventListener("beforeinstallprompt", handleBeforeInstall);
    window.addEventListener("appinstalled", handleAppInstalled);

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstall);
      window.removeEventListener("appinstalled", handleAppInstalled);
    };
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;
    
    await deferredPrompt.prompt();
    const choice = await deferredPrompt.userChoice;
    
    if (choice.outcome === "accepted") {
      setIsInstalled(true);
    }
    setDeferredPrompt(null);
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border py-12 mt-auto">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col items-center md:items-start gap-2">
            <span className="font-serif font-semibold text-lg">Learning Journal PWA</span>
            <p className="text-sm text-muted-foreground text-center md:text-left">
              Documenting my journey in Mobile Application Development
            </p>
          </div>

          <div className="flex items-center gap-4">
            {deferredPrompt && !isInstalled && (
              <Button
                variant="outline"
                size="sm"
                onClick={handleInstall}
                className="gap-2"
                data-testid="button-install-pwa"
              >
                <Download className="w-4 h-4" />
                Install App
              </Button>
            )}

            {isInstalled && (
              <span 
                className="text-sm text-green-600 dark:text-green-400 flex items-center gap-1"
                data-testid="status-installed"
              >
                <Download className="w-4 h-4" />
                App Installed
              </span>
            )}

            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="View on GitHub"
              data-testid="link-github"
            >
              <SiGithub className="w-6 h-6" />
            </a>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-border text-center">
          <p className="text-sm text-muted-foreground" data-testid="text-copyright">
            {currentYear} Learning Journal. Built for FGCT6021 Mobile Application Development.
          </p>
        </div>
      </div>
    </footer>
  );
}
