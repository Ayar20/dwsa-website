"use client";

import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import PrideModal from "@/components/PrideModal";
import PWAInstallBanner from "@/components/PWAInstallBanner";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [showPrideModal, setShowPrideModal] = useState(false);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    } else if (status === "authenticated" && session?.user) {
      if (session.user.role === "STUDENT" && !session.user.prideAccepted) {
        setShowPrideModal(true);
      } else {
        setShowPrideModal(false);
      }
    }
  }, [session, status, router]);

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-[#030e1f] flex items-center justify-center text-[#8899b4] text-sm">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-[#d4a017] border-t-transparent rounded-full animate-spin" />
          <span className="text-xs font-semibold tracking-wide">Loading DWSA Academy Workspace...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#030e1f] text-[#f0f4ff] flex flex-col font-sans">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {children}
      </main>

      <PrideModal
        isOpen={showPrideModal}
        onAccepted={() => setShowPrideModal(false)}
      />

      {/* PWA Install Banner — shown to authenticated users */}
      <PWAInstallBanner />
    </div>
  );
}
