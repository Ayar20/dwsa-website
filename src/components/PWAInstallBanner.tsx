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
      <div className="pointer-events-auto max-w-lg mx-auto rounded-3xl border border-slate-200 p-4 flex items-center gap-4 bg-white shadow-2xl text-[#0F172A]">
        {/* Top Emerald border highlight */}
        <div className="absolute top-0 left-8 right-8 h-0.5 rounded-full bg-[#15803D]" />

        {/* Icon */}
        <div className="shrink-0 w-12 h-12 rounded-2xl bg-[#F0FDF4] border border-[#15803D]/20 flex items-center justify-center">
          {isIOS ? (
            <Share className="w-5 h-5 text-[#15803D]" />
          ) : (
            <Smartphone className="w-5 h-5 text-[#15803D]" />
          )}
        </div>

        {/* Text */}
        <div className="flex-1 min-w-0">
          <p className="text-sm font-extrabold text-[#0F172A] leading-tight">
            Install DWSA Digital Campus
          </p>
          {isIOS ? (
            <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">
              Tap <span className="text-[#15803D] font-extrabold">Share</span> then{" "}
              <span className="text-[#15803D] font-extrabold">&quot;Add to Home Screen&quot;</span> to install
            </p>
          ) : (
            <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">
              Install for offline access &amp; a faster, app-like experience
            </p>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 shrink-0">
          {!isIOS && (
            <button
              onClick={handleInstall}
              disabled={installing}
              className="px-4 py-2 rounded-xl text-xs font-extrabold flex items-center gap-1.5 transition-all bg-[#15803D] text-white hover:bg-[#166534] shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#15803D]"
            >
              <Download className="w-3.5 h-3.5" />
              {installing ? "Installing…" : "Install"}
            </button>
          )}
          <button
            onClick={handleDismiss}
            className="p-1.5 rounded-xl text-slate-400 hover:text-[#0F172A] hover:bg-slate-100 transition-colors"
            aria-label="Dismiss banner"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
