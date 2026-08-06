"use client";

import React from "react";
import { MarketplaceFinanceService } from "@/lib/institutionOS/MarketplaceFinanceService";
import { MarketplaceRevenueService } from "@/lib/institutionOS/MarketplaceRevenueService";
import {
  DollarSign, CreditCard, ArrowUpRight, CheckCircle2, Clock, Activity
} from "lucide-react";

export default function MarketplaceFinancePage() {
  const payoutLedger = MarketplaceFinanceService.getPayoutLedger();
  const revenueSummary = MarketplaceRevenueService.getRevenueSummary();

  return (
    <div className="min-h-screen space-y-6 pb-8">
      <div className="rounded-2xl bg-[#040f20] border border-[#d4a017]/20 p-6 space-y-2">
        <h1 className="text-xl font-black text-white flex items-center gap-2">
          <DollarSign className="w-5 h-5 text-[#4ade80]" /> Marketplace Financial Operations & Payouts
        </h1>
        <p className="text-xs text-[#8899b4]">Developer earnings (80%), platform commission (20%), monthly payout ledger, and subscription volume.</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-[#040f20] border border-[#1a2f4a] text-center">
          <div className="text-xl font-black text-[#4ade80]">${revenueSummary.grossMarketplaceVolumeUSD.toLocaleString()}</div>
          <div className="text-[10px] text-[#6b7a94]">Gross GMV</div>
        </div>
        <div className="p-4 rounded-2xl bg-[#040f20] border border-[#1a2f4a] text-center">
          <div className="text-xl font-black text-[#4ade80]">${revenueSummary.developerEarningsUSD.toLocaleString()}</div>
          <div className="text-[10px] text-[#6b7a94]">Developer Payouts (80%)</div>
        </div>
        <div className="p-4 rounded-2xl bg-[#040f20] border border-[#1a2f4a] text-center">
          <div className="text-xl font-black text-[#d4a017]">${revenueSummary.platformCommissionUSD.toLocaleString()}</div>
          <div className="text-[10px] text-[#6b7a94]">Platform Commission (20%)</div>
        </div>
        <div className="p-4 rounded-2xl bg-[#040f20] border border-[#1a2f4a] text-center">
          <div className="text-xl font-black text-white">${revenueSummary.pendingPayoutsUSD.toLocaleString()}</div>
          <div className="text-[10px] text-[#6b7a94]">Pending Payouts</div>
        </div>
      </div>

      <div className="rounded-2xl bg-[#040f20] border border-[#1a2f4a] p-6 space-y-4">
        <h2 className="text-sm font-black text-white">Monthly Developer Payout Ledger</h2>
        <div className="space-y-3">
          {payoutLedger.map((row) => (
            <div key={row.id} className="p-4 rounded-xl bg-[#061428] border border-[#1a2f4a] flex items-center justify-between gap-4">
              <div>
                <h3 className="text-xs font-black text-white">{row.developerOrgName}</h3>
                <p className="text-[10px] text-[#6b7a94]">Payout Date: {row.payoutDate}</p>
              </div>
              <div className="text-right">
                <div className="text-xs font-black text-[#4ade80]">${row.developerPayoutUSD.toLocaleString()} (Gross: ${row.grossAmountUSD.toLocaleString()})</div>
                <span className={`text-[9px] font-black uppercase ${row.status === "PAID" ? "text-[#4ade80]" : "text-[#d4a017]"}`}>{row.status}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
