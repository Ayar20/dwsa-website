"use client";

import React, { useEffect, useState } from "react";
import { Download, X, Smartphone, Share } from "lucide-react";

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

export default function PWAInstallBanner() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showBanner, setShowBanner] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [installing, setInstalling] = useState(false);

  useEffect(() => {
    // Don't show if already installed (running in standalone)
    const isStandalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      (window.navigator as any).standalone === true;

    if (isStandalone) return;

    // Don't show if user already dismissed
    const dismissed = localStorage.getItem("dwsa-pwa-dismissed");
    if (dismissed) return;

    // Detect iOS
    const ua = window.navigator.userAgent;
    const ios = /iphone|ipad|ipod/i.test(ua);
    setIsIOS(ios);

    if (ios) {
      // On iOS, we show a manual "Add to Home Screen" tip
      const timer = setTimeout(() => setShowBanner(true), 3000);
      return () => clearTimeout(timer);
    }

    // Android / Desktop: capture beforeinstallprompt
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setShowBanner(true);
    };

    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;
    setInstalling(true);
    await deferredPrompt.prompt();
    const choice = await deferredPrompt.userChoice;
    if (choice.outcome === "accepted") {
      setShowBanner(false);
    }
    setDeferredPrompt(null);
    setInstalling(false);
  };

  const handleDismiss = () => {
    setShowBanner(false);
    localStorage.setItem("dwsa-pwa-dismissed", "1");
  };

  if (!showBanner) return null;

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 px-4 pb-4 sm:pb-6 sm:px-6 pointer-events-none"
      style={{ animation: "slideUp 0.4s cubic-bezier(0.22,1,0.36,1) forwards" }}
    >
      <div
        className="pointer-events-auto max-w-lg mx-auto rounded-2xl border p-4 flex items-center gap-4 shadow-2xl"
        style={{
          background: "linear-gradient(135deg, rgba(6,20,40,0.97) 0%, rgba(15,34,61,0.97) 100%)",
          borderColor: "rgba(212,160,23,0.35)",
          backdropFilter: "blur(24px)",
          boxShadow: "0 -4px 40px rgba(212,160,23,0.12), 0 20px 60px rgba(0,0,0,0.6)",
        }}
      >
        {/* Top gold line */}
        <div
          className="absolute top-0 left-8 right-8 h-px rounded-full"
          style={{ background: "linear-gradient(90deg, transparent, #d4a017, #00d2ff, transparent)" }}
        />

        {/* Icon */}
        <div
          className="shrink-0 w-12 h-12 rounded-xl flex items-center justify-center border"
          style={{
            background: "rgba(212,160,23,0.12)",
            borderColor: "rgba(212,160,23,0.3)",
          }}
        >
          {isIOS ? (
            <Share className="w-5 h-5 text-[#d4a017]" />
          ) : (
            <Smartphone className="w-5 h-5 text-[#d4a017]" />
          )}
        </div>

        {/* Text */}
        <div className="flex-1 min-w-0">
          <p className="text-sm font-extrabold text-white leading-tight">
            Install DWSA Academy
          </p>
          {isIOS ? (
            <p className="text-[11px] text-[#8899b4] mt-0.5 leading-snug">
              Tap <span className="text-[#00d2ff] font-bold">Share</span> then{" "}
              <span className="text-[#00d2ff] font-bold">"Add to Home Screen"</span> to install
            </p>
          ) : (
            <p className="text-[11px] text-[#8899b4] mt-0.5 leading-snug">
              Install for offline access & a faster, app-like experience
            </p>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 shrink-0">
          {!isIOS && (
            <button
              onClick={handleInstall}
              disabled={installing}
              className="px-4 py-2 rounded-xl text-xs font-extrabold flex items-center gap-1.5 transition-all disabled:opacity-60 hover:scale-105"
              style={{
                background: "linear-gradient(135deg, #d4a017, #e5b520)",
                color: "#030e1f",
                boxShadow: "0 4px 16px rgba(212,160,23,0.3)",
              }}
            >
              <Download className="w-3.5 h-3.5" />
              {installing ? "Installing…" : "Install"}
            </button>
          )}
          <button
            onClick={handleDismiss}
            className="p-2 rounded-xl transition-all text-[#8899b4] hover:text-white hover:bg-[#0f223d]"
            aria-label="Dismiss install banner"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      <style>{`
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(100%); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
