"use client";

import { useState } from "react";
import { TenantService } from "@/lib/institutionOS/TenantService";
import { PlatformMetricsService } from "@/lib/institutionOS/PlatformMetricsService";
import { LicenseService } from "@/lib/institutionOS/LicenseService";
import { UsageAnalyticsService } from "@/lib/institutionOS/UsageAnalyticsService";
import { BrandAssetService } from "@/lib/institutionOS/BrandAssetService";
import { TenantProvisioningService } from "@/lib/institutionOS/TenantProvisioningService";
import type { Tenant } from "@/types/tenant";

const tenants = TenantService.getAllTenants();
const metrics = PlatformMetricsService.getSnapshot();
const licenses = LicenseService.getAllLicenses();
const usage = UsageAnalyticsService.getTenantActivity();
const wizardSteps = TenantProvisioningService.getWizardSteps();
const tiers = TenantProvisioningService.getSubscriptionTiers();
const revenueSeries = PlatformMetricsService.getMonthlyRevenueSeries();

type ActiveTab = "tenants" | "metrics" | "licensing" | "usage" | "domains" | "themes" | "features" | "provisioning";

const tabs: { key: ActiveTab; label: string; icon: string }[] = [
  { key: "tenants",      label: "Tenants",       icon: "🏛" },
  { key: "metrics",      label: "Platform Metrics", icon: "📊" },
  { key: "licensing",    label: "Licensing",      icon: "💳" },
  { key: "usage",        label: "Usage",          icon: "📈" },
  { key: "domains",      label: "Domains",        icon: "🌐" },
  { key: "themes",       label: "Themes & Brand", icon: "🎨" },
  { key: "features",     label: "Feature Flags",  icon: "⚡" },
  { key: "provisioning", label: "Provision",      icon: "🚀" },
];

const statusConfig: Record<Tenant["status"], { color: string; bg: string; border: string; label: string }> = {
  active:       { color: "#4ade80", bg: "rgba(74,222,128,0.1)",   border: "rgba(74,222,128,0.25)",  label: "Active" },
  trial:        { color: "#d4a017", bg: "rgba(212,160,23,0.1)",   border: "rgba(212,160,23,0.25)",  label: "Trial" },
  provisioning: { color: "#a78bfa", bg: "rgba(167,139,250,0.1)",  border: "rgba(167,139,250,0.25)", label: "Provisioning" },
  suspended:    { color: "#f87171", bg: "rgba(248,113,113,0.1)",  border: "rgba(248,113,113,0.25)", label: "Suspended" },
  expired:      { color: "#6b7a94", bg: "rgba(255,255,255,0.05)", border: "rgba(255,255,255,0.1)",  label: "Expired" },
};

const tierColor: Record<string, string> = {
  enterprise:   "#d4a017",
  professional: "#4ade80",
  starter:      "#a78bfa",
  unlimited:    "#f0f4ff",
};

function MetricCard({ icon, label, value, sub, color = "#d4a017" }: { icon: string; label: string; value: string | number; sub?: string; color?: string }) {
  return (
    <div style={{ background: "#060f21", border: "1px solid rgba(212,160,23,0.15)", borderRadius: 12, padding: "18px 20px" }}>
      <div style={{ fontSize: 22, marginBottom: 8 }}>{icon}</div>
      <div style={{ color, fontSize: 26, fontWeight: 900, marginBottom: 4, lineHeight: 1 }}>{value}</div>
      <div style={{ color: "#aab4c4", fontSize: 12, fontWeight: 600 }}>{label}</div>
      {sub && <div style={{ color: "#4a5568", fontSize: 11, marginTop: 3 }}>{sub}</div>}
    </div>
  );
}

function MiniBar({ month, usd, max }: { month: string; usd: number; max: number }) {
  const pct = max > 0 ? (usd / max) * 100 : 0;
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
      <div style={{ fontSize: 11, color: "#d4a017", fontWeight: 700 }}>${(usd / 1000).toFixed(1)}k</div>
      <div style={{ height: 80, width: 28, background: "rgba(255,255,255,0.06)", borderRadius: 4, display: "flex", alignItems: "flex-end" }}>
        <div style={{ width: "100%", height: `${pct}%`, background: "linear-gradient(180deg,#d4a017,#b88a0e)", borderRadius: 4, transition: "height 0.5s" }} />
      </div>
      <span style={{ color: "#6b7a94", fontSize: 10 }}>{month}</span>
    </div>
  );
}

// ─── Tab: Tenants ──────────────────────────────────────────────────────────────
function TenantsTab() {
  const [selected, setSelected] = useState<string | null>(null);
  const selectedTenant = selected ? TenantService.getTenantById(selected) : null;

  return (
    <div style={{ display: "grid", gridTemplateColumns: selectedTenant ? "1fr 360px" : "1fr", gap: 20 }}>
      <div>
        <div style={{ marginBottom: 14, display: "flex", justifyContent: "flex-end" }}>
          <span style={{ background: "rgba(212,160,23,0.1)", border: "1px solid rgba(212,160,23,0.3)", borderRadius: 8, padding: "7px 16px", color: "#d4a017", fontSize: 12, fontWeight: 700, cursor: "pointer" }}>+ Provision Institution</span>
        </div>
        <div style={{ background: "#060f21", border: "1px solid rgba(212,160,23,0.15)", borderRadius: 12, overflow: "hidden" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: "#050e1e", borderBottom: "1px solid rgba(212,160,23,0.1)" }}>
                {["Institution", "Type", "Tier", "Status", "Country", "Learners", ""].map((h) => (
                  <th key={h} style={{ padding: "12px 16px", textAlign: "left", color: "#6b7a94", fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", whiteSpace: "nowrap" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {tenants.map((t, i) => {
                const sc = statusConfig[t.status];
                const isActive = selected === t.id;
                return (
                  <tr key={t.id} onClick={() => setSelected(isActive ? null : t.id)} style={{ borderBottom: i < tenants.length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none", background: isActive ? "rgba(212,160,23,0.06)" : "transparent", cursor: "pointer" }}>
                    <td style={{ padding: "14px 16px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <div style={{ width: 36, height: 36, borderRadius: 9, background: `${t.brand.primaryColor}20`, border: `1px solid ${t.brand.primaryColor}40`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 900, color: t.brand.primaryColor, flexShrink: 0 }}>{t.brand.shortName[0]}</div>
                        <div>
                          <div style={{ color: "#f0f4ff", fontSize: 13, fontWeight: 700 }}>{t.name}</div>
                          <div style={{ color: "#4a5568", fontSize: 11 }}>@{t.slug} · {t.brand.shortName}</div>
                        </div>
                      </div>
                    </td>
                    <td style={{ padding: "14px 16px", color: "#aab4c4", fontSize: 12, textTransform: "capitalize" }}>{t.type}</td>
                    <td style={{ padding: "14px 16px" }}><span style={{ color: tierColor[t.tier] ?? "#f0f4ff", fontSize: 12, fontWeight: 700, textTransform: "capitalize" }}>{t.tier}</span></td>
                    <td style={{ padding: "14px 16px" }}><span style={{ background: sc.bg, color: sc.color, border: `1px solid ${sc.border}`, borderRadius: 20, padding: "3px 10px", fontSize: 11, fontWeight: 700 }}>{sc.label}</span></td>
                    <td style={{ padding: "14px 16px", color: "#aab4c4", fontSize: 12 }}>{t.country}</td>
                    <td style={{ padding: "14px 16px", color: "#d4a017", fontSize: 13, fontWeight: 700 }}>{usage.find((u) => u.tenantId === t.id)?.mau ?? "—"}</td>
                    <td style={{ padding: "14px 16px" }}>
                      <div style={{ display: "flex", gap: 6 }}>
                        <button style={actionBtn}>Settings</button>
                        <button style={actionBtn}>Suspend</button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {selectedTenant && (
        <div style={{ background: "#060f21", border: "1px solid rgba(212,160,23,0.2)", borderRadius: 12, overflow: "hidden", position: "sticky", top: 24 }}>
          <div style={{ padding: "16px 20px", borderBottom: "1px solid rgba(212,160,23,0.1)", background: "#050e1e", display: "flex", gap: 12, alignItems: "center" }}>
            <div style={{ width: 40, height: 40, borderRadius: 10, background: `${selectedTenant.brand.primaryColor}20`, border: `1px solid ${selectedTenant.brand.primaryColor}50`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, fontWeight: 900, color: selectedTenant.brand.primaryColor }}>{selectedTenant.brand.shortName[0]}</div>
            <div>
              <div style={{ color: "#f0f4ff", fontWeight: 800, fontSize: 14 }}>{selectedTenant.name}</div>
              <div style={{ color: "#6b7a94", fontSize: 11 }}>@{selectedTenant.slug} · {selectedTenant.id}</div>
            </div>
          </div>
          <div style={{ padding: 20, display: "flex", flexDirection: "column", gap: 16 }}>
            <InfoRow label="Legal Name" value={selectedTenant.legalName} />
            <InfoRow label="Type" value={selectedTenant.type} />
            <InfoRow label="Tier" value={selectedTenant.tier} valueColor={tierColor[selectedTenant.tier]} />
            <InfoRow label="Country" value={`${selectedTenant.country} · ${selectedTenant.region}`} />
            <InfoRow label="Timezone" value={selectedTenant.timezone} />
            <InfoRow label="AI Provider" value={selectedTenant.settings.ai.provider.toUpperCase()} />
            <InfoRow label="AI Model" value={selectedTenant.settings.ai.modelId} />
            <InfoRow label="Payment Provider" value={selectedTenant.settings.payments.provider.toUpperCase()} />
            <InfoRow label="MFA Required" value={selectedTenant.settings.security.mfaRequired ? "Yes" : "No"} />
            <InfoRow label="SSO Enabled" value={selectedTenant.settings.security.ssoEnabled ? "Yes (" + selectedTenant.settings.security.ssoProvider + ")" : "No"} />
            <div style={{ marginTop: 4 }}>
              <div style={{ color: "#6b7a94", fontSize: 11, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 8 }}>Enabled Features</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {Object.entries(selectedTenant.features).filter(([, v]) => v).map(([k]) => (
                  <span key={k} style={{ background: "rgba(74,222,128,0.1)", color: "#4ade80", border: "1px solid rgba(74,222,128,0.2)", borderRadius: 6, padding: "2px 8px", fontSize: 10, fontWeight: 700 }}>{k.replace(/([A-Z])/g, " $1").trim()}</span>
                ))}
              </div>
            </div>
            <div>
              <div style={{ color: "#6b7a94", fontSize: 11, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 8 }}>Domains</div>
              {selectedTenant.domains.length > 0 ? selectedTenant.domains.map((d) => (
                <div key={d.id} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                  <span style={{ color: d.isVerified ? "#4ade80" : "#d4a017", fontSize: 11 }}>{d.isVerified ? "✓" : "⏳"}</span>
                  <span style={{ color: "#aab4c4", fontSize: 12 }}>{d.domain}</span>
                  {d.isPrimary && <span style={{ background: "rgba(212,160,23,0.12)", color: "#d4a017", borderRadius: 20, padding: "1px 7px", fontSize: 9, fontWeight: 700 }}>PRIMARY</span>}
                </div>
              )) : <span style={{ color: "#4a5568", fontSize: 12 }}>No domains configured</span>}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function InfoRow({ label, value, valueColor = "#f0f4ff" }: { label: string; value: string; valueColor?: string }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12 }}>
      <span style={{ color: "#6b7a94", fontSize: 12, fontWeight: 600, flexShrink: 0 }}>{label}</span>
      <span style={{ color: valueColor, fontSize: 12, fontWeight: 600, textAlign: "right", textTransform: "capitalize" }}>{value}</span>
    </div>
  );
}

// ─── Tab: Platform Metrics ─────────────────────────────────────────────────────
function MetricsTab() {
  const maxRevenue = Math.max(...revenueSeries.map((r) => r.usd));
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(150px,1fr))", gap: 14 }}>
        <MetricCard icon="🏛" label="Total Institutions" value={metrics.totalInstitutions} sub={`${metrics.activeInstitutions} active · ${metrics.trialInstitutions} trial`} />
        <MetricCard icon="🎓" label="Total Learners" value={metrics.totalLearners.toLocaleString()} />
        <MetricCard icon="👨‍🏫" label="Total Faculty" value={metrics.totalFaculty} />
        <MetricCard icon="📚" label="Active Courses" value={metrics.activeCourses} />
        <MetricCard icon="🏅" label="Certificates Issued" value={metrics.certificatesIssued.toLocaleString()} />
        <MetricCard icon="🟢" label="Platform Availability" value={`${metrics.platformAvailabilityPercent}%`} color="#4ade80" />
        <MetricCard icon="🤖" label="AI Requests (Month)" value={`${(metrics.aiRequestsThisMonth / 1000).toFixed(0)}k`} />
        <MetricCard icon="💰" label="Revenue (Month)" value={`$${metrics.revenueThisMonthUSD.toLocaleString()}`} sub={`+${metrics.revenueGrowthPercent}% MoM`} color="#4ade80" />
        <MetricCard icon="💾" label="Storage Used" value={`${metrics.storageUsedGB} GB`} sub={`of ${metrics.storageTotalGB} GB`} />
        <MetricCard icon="🔌" label="API Calls Today" value={metrics.apiCallsToday.toLocaleString()} />
        <MetricCard icon="👥" label="Active Sessions" value={metrics.activeSessionsNow} color="#4ade80" />
      </div>

      <div style={{ background: "#060f21", border: "1px solid rgba(212,160,23,0.15)", borderRadius: 12, padding: "20px 24px" }}>
        <div style={{ color: "#aab4c4", fontSize: 12, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 16 }}>Monthly Recurring Revenue (Last 6 Months)</div>
        <div style={{ display: "flex", gap: 18, alignItems: "flex-end" }}>
          {revenueSeries.map((r) => <MiniBar key={r.month} month={r.month} usd={r.usd} max={maxRevenue} />)}
        </div>
      </div>
    </div>
  );
}

// ─── Tab: Licensing ────────────────────────────────────────────────────────────
function LicensingTab() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 14 }}>
        {tiers.map((tier) => (
          <div key={tier.tier} style={{ background: "#060f21", border: `1px solid ${tierColor[tier.tier] ?? "#6b7a94"}30`, borderRadius: 12, padding: "18px 20px" }}>
            <div style={{ color: tierColor[tier.tier] ?? "#f0f4ff", fontSize: 14, fontWeight: 800, textTransform: "capitalize", marginBottom: 4 }}>{tier.name}</div>
            <div style={{ color: "#f0f4ff", fontSize: 24, fontWeight: 900, marginBottom: 12 }}>{tier.priceUSD === 0 ? "Custom" : `$${tier.priceUSD}/mo`}</div>
            {tier.features.map((f) => <div key={f} style={{ color: "#aab4c4", fontSize: 12, marginBottom: 5, display: "flex", gap: 6 }}><span style={{ color: "#4ade80" }}>✓</span>{f}</div>)}
          </div>
        ))}
      </div>

      <div style={{ background: "#060f21", border: "1px solid rgba(212,160,23,0.15)", borderRadius: 12, overflow: "hidden" }}>
        <div style={{ padding: "14px 20px", background: "#050e1e", borderBottom: "1px solid rgba(212,160,23,0.1)", color: "#d4a017", fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase" }}>Active Licenses</div>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead><tr style={{ background: "#050e1e", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
            {["Tenant", "Tier", "Learners", "Monthly Value", "Status", "Expires"].map((h) => (
              <th key={h} style={{ padding: "11px 16px", textAlign: "left", color: "#6b7a94", fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.07em" }}>{h}</th>
            ))}
          </tr></thead>
          <tbody>
            {licenses.map((l, i) => (
              <tr key={l.tenantId} style={{ borderBottom: i < licenses.length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none" }}>
                <td style={{ padding: "13px 16px", color: "#f0f4ff", fontSize: 13, fontWeight: 600 }}>{l.tenantName}</td>
                <td style={{ padding: "13px 16px" }}><span style={{ color: tierColor[l.tier] ?? "#f0f4ff", fontWeight: 700, fontSize: 12, textTransform: "capitalize" }}>{l.tier}</span></td>
                <td style={{ padding: "13px 16px" }}>
                  <div style={{ color: "#aab4c4", fontSize: 12 }}>{l.currentLearners.toLocaleString()} / {l.maxLearners >= 999999 ? "∞" : l.maxLearners.toLocaleString()}</div>
                  <div style={{ height: 3, width: 80, background: "rgba(255,255,255,0.07)", borderRadius: 2, marginTop: 5 }}>
                    <div style={{ height: "100%", width: `${Math.min(100, (l.currentLearners / Math.min(l.maxLearners, 9999)) * 100)}%`, background: "#d4a017", borderRadius: 2 }} />
                  </div>
                </td>
                <td style={{ padding: "13px 16px", color: "#4ade80", fontWeight: 700, fontSize: 13 }}>{l.monthlyValueUSD === 0 ? "Custom" : `$${l.monthlyValueUSD.toLocaleString()}`}</td>
                <td style={{ padding: "13px 16px" }}>
                  <span style={{ background: l.isTrial ? "rgba(212,160,23,0.1)" : "rgba(74,222,128,0.1)", color: l.isTrial ? "#d4a017" : "#4ade80", border: `1px solid ${l.isTrial ? "rgba(212,160,23,0.3)" : "rgba(74,222,128,0.3)"}`, borderRadius: 20, padding: "3px 10px", fontSize: 11, fontWeight: 700 }}>
                    {l.isTrial ? `Trial — ${l.trialDaysRemaining ?? "?"} days` : "Active"}
                  </span>
                </td>
                <td style={{ padding: "13px 16px", color: "#6b7a94", fontSize: 12 }}>{l.expiresAt ? new Date(l.expiresAt).toLocaleDateString() : "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ─── Tab: Usage ────────────────────────────────────────────────────────────────
function UsageTab() {
  const activityData = UsageAnalyticsService.getTenantActivity();
  const dailySeries = UsageAnalyticsService.getDailyUsageSeries();
  const maxSessions = Math.max(...dailySeries.map((d) => d.activeSessions));

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(130px,1fr))", gap: 12 }}>
        <MetricCard icon="👥" label="Platform DAU" value={UsageAnalyticsService.getPlatformDAU()} color="#4ade80" />
        <MetricCard icon="🗓" label="Platform MAU" value={UsageAnalyticsService.getPlatformMAU().toLocaleString()} />
        <MetricCard icon="🤖" label="AI Tokens Today" value={`${((dailySeries.at(-1)?.aiRequests ?? 0) / 1000).toFixed(0)}k`} />
        <MetricCard icon="🔌" label="API Calls Today" value={metrics.apiCallsToday.toLocaleString()} />
      </div>

      <div style={{ background: "#060f21", border: "1px solid rgba(212,160,23,0.15)", borderRadius: 12, padding: "18px 22px" }}>
        <div style={{ color: "#aab4c4", fontSize: 12, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 14 }}>Active Sessions — Last 7 Days</div>
        <div style={{ display: "flex", gap: 14, alignItems: "flex-end" }}>
          {dailySeries.map((d) => {
            const pct = maxSessions > 0 ? (d.activeSessions / maxSessions) * 100 : 0;
            return (
              <div key={d.date} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 5 }}>
                <span style={{ color: "#d4a017", fontSize: 10, fontWeight: 700 }}>{d.activeSessions}</span>
                <div style={{ height: 80, width: 30, background: "rgba(255,255,255,0.06)", borderRadius: 4, display: "flex", alignItems: "flex-end" }}>
                  <div style={{ width: "100%", height: `${pct}%`, background: "linear-gradient(180deg,#d4a017,#b88a0e)", borderRadius: 4 }} />
                </div>
                <span style={{ color: "#6b7a94", fontSize: 9 }}>{d.date}</span>
              </div>
            );
          })}
        </div>
      </div>

      <div style={{ background: "#060f21", border: "1px solid rgba(212,160,23,0.15)", borderRadius: 12, overflow: "hidden" }}>
        <div style={{ padding: "14px 20px", background: "#050e1e", borderBottom: "1px solid rgba(212,160,23,0.1)", color: "#d4a017", fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase" }}>Per-Tenant Usage</div>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead><tr style={{ background: "#050e1e", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
            {["Tenant", "DAU", "MAU", "AI Tokens Used", "Storage", "API Calls Today", "Last Active"].map((h) => (
              <th key={h} style={{ padding: "11px 16px", textAlign: "left", color: "#6b7a94", fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.07em", whiteSpace: "nowrap" }}>{h}</th>
            ))}
          </tr></thead>
          <tbody>
            {activityData.map((a, i) => (
              <tr key={a.tenantId} style={{ borderBottom: i < activityData.length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none" }}>
                <td style={{ padding: "13px 16px", color: "#f0f4ff", fontSize: 13, fontWeight: 600 }}>{a.tenantName}</td>
                <td style={{ padding: "13px 16px", color: "#4ade80", fontWeight: 700, fontSize: 13 }}>{a.dau}</td>
                <td style={{ padding: "13px 16px", color: "#d4a017", fontWeight: 700, fontSize: 13 }}>{a.mau.toLocaleString()}</td>
                <td style={{ padding: "13px 16px", color: "#aab4c4", fontSize: 12 }}>{(a.aiTokensUsed / 1000000).toFixed(2)}M</td>
                <td style={{ padding: "13px 16px", color: "#aab4c4", fontSize: 12 }}>{a.storageGB} GB</td>
                <td style={{ padding: "13px 16px", color: "#aab4c4", fontSize: 12 }}>{a.apiCallsToday.toLocaleString()}</td>
                <td style={{ padding: "13px 16px", color: "#6b7a94", fontSize: 11 }}>{new Date(a.lastActivityAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ─── Tab: Domains ──────────────────────────────────────────────────────────────
function DomainsTab() {
  const allDomains = tenants.flatMap((t) => t.domains.map((d) => ({ ...d, tenantName: t.name, tenantSlug: t.slug })));
  return (
    <div style={{ background: "#060f21", border: "1px solid rgba(212,160,23,0.15)", borderRadius: 12, overflow: "hidden" }}>
      <div style={{ padding: "14px 20px", background: "#050e1e", borderBottom: "1px solid rgba(212,160,23,0.1)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ color: "#d4a017", fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase" }}>Domain Registry</span>
        <span style={{ background: "rgba(212,160,23,0.1)", border: "1px solid rgba(212,160,23,0.3)", borderRadius: 6, padding: "5px 14px", color: "#d4a017", cursor: "pointer", fontSize: 12, fontWeight: 700 }}>+ Add Domain</span>
      </div>
      {allDomains.length === 0 ? (
        <div style={{ padding: 40, textAlign: "center", color: "#4a5568", fontSize: 14 }}>No domains configured.</div>
      ) : (
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead><tr style={{ background: "#050e1e", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
            {["Domain", "Tenant", "Primary", "Verified", "SSL"].map((h) => (
              <th key={h} style={{ padding: "11px 16px", textAlign: "left", color: "#6b7a94", fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.07em" }}>{h}</th>
            ))}
          </tr></thead>
          <tbody>
            {allDomains.map((d, i) => (
              <tr key={d.id} style={{ borderBottom: i < allDomains.length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none" }}>
                <td style={{ padding: "13px 16px", color: "#f0f4ff", fontSize: 13, fontWeight: 600 }}>{d.domain}</td>
                <td style={{ padding: "13px 16px", color: "#aab4c4", fontSize: 12 }}>{d.tenantName}</td>
                <td style={{ padding: "13px 16px" }}>{d.isPrimary ? <span style={{ color: "#d4a017", fontWeight: 700, fontSize: 12 }}>Primary</span> : <span style={{ color: "#4a5568", fontSize: 12 }}>—</span>}</td>
                <td style={{ padding: "13px 16px" }}><span style={{ color: d.isVerified ? "#4ade80" : "#f87171", fontWeight: 700, fontSize: 12 }}>{d.isVerified ? "✓ Verified" : "⚠ Pending"}</span></td>
                <td style={{ padding: "13px 16px" }}><span style={{ color: d.sslEnabled ? "#4ade80" : "#f87171", fontWeight: 700, fontSize: 12 }}>{d.sslEnabled ? "Active" : "None"}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

// ─── Tab: Themes & Brand ───────────────────────────────────────────────────────
function ThemesTab() {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: 16 }}>
      {tenants.map((t) => {
        const assets = BrandAssetService.getAssetsForTenant(t.id);
        return (
          <div key={t.id} style={{ background: "#060f21", border: `1px solid ${t.brand.primaryColor}30`, borderRadius: 12, overflow: "hidden" }}>
            <div style={{ height: 8, background: `linear-gradient(90deg,${t.brand.primaryColor},${t.brand.secondaryColor})` }} />
            <div style={{ padding: "18px 20px" }}>
              <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 14 }}>
                <div style={{ width: 44, height: 44, borderRadius: 10, background: `${t.brand.primaryColor}20`, border: `1px solid ${t.brand.primaryColor}50`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, fontWeight: 900, color: t.brand.primaryColor }}>{t.brand.shortName[0]}</div>
                <div>
                  <div style={{ color: "#f0f4ff", fontWeight: 800, fontSize: 14 }}>{t.brand.shortName}</div>
                  <div style={{ color: "#6b7a94", fontSize: 11 }}>{t.theme.mode} theme</div>
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, marginBottom: 14 }}>
                {[t.brand.primaryColor, t.brand.secondaryColor, t.brand.accentColor, t.brand.neutralColor].map((c, idx) => (
                  <div key={idx} title={c} style={{ width: 28, height: 28, borderRadius: 6, background: c, border: "2px solid rgba(255,255,255,0.1)" }} />
                ))}
              </div>
              <div style={{ color: "#6b7a94", fontSize: 11, marginBottom: 4 }}><strong style={{ color: "#aab4c4" }}>Font:</strong> {t.brand.fontFamily.split(",")[0]}</div>
              <div style={{ color: "#6b7a94", fontSize: 11, marginBottom: 12 }}><strong style={{ color: "#aab4c4" }}>Tagline:</strong> {t.brand.tagline}</div>
              <div style={{ color: "#4a5568", fontSize: 11 }}>{assets.length} brand asset{assets.length !== 1 ? "s" : ""} · {(BrandAssetService.getTotalStorageKB(t.id) / 1024).toFixed(1)} MB</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ─── Tab: Feature Flags ────────────────────────────────────────────────────────
function FeatureFlagsTab() {
  type FeatureKey = keyof typeof tenants[0]["features"];
  const allFeatureKeys = Object.keys(tenants[0].features) as FeatureKey[];
  return (
    <div style={{ background: "#060f21", border: "1px solid rgba(212,160,23,0.15)", borderRadius: 12, overflow: "auto" }}>
      <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 600 }}>
        <thead>
          <tr style={{ background: "#050e1e", borderBottom: "1px solid rgba(212,160,23,0.1)" }}>
            <th style={{ padding: "12px 16px", textAlign: "left", color: "#6b7a94", fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", minWidth: 200 }}>Feature</th>
            {tenants.map((t) => <th key={t.id} style={{ padding: "12px 16px", textAlign: "center", color: tierColor[t.tier] ?? "#6b7a94", fontSize: 12, fontWeight: 700, whiteSpace: "nowrap" }}>{t.brand.shortName}</th>)}
          </tr>
        </thead>
        <tbody>
          {allFeatureKeys.map((key, i) => (
            <tr key={key} style={{ borderBottom: i < allFeatureKeys.length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none" }}>
              <td style={{ padding: "11px 16px", color: "#aab4c4", fontSize: 12 }}>{key.replace(/([A-Z])/g, " $1").trim()}</td>
              {tenants.map((t) => (
                <td key={t.id} style={{ padding: "11px 16px", textAlign: "center" }}>
                  <span style={{ color: t.features[key] ? "#4ade80" : "#3a4558", fontSize: 16 }}>{t.features[key] ? "✓" : "—"}</span>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ─── Tab: Provision ────────────────────────────────────────────────────────────
function ProvisioningTab() {
  const [currentStep, setCurrentStep] = useState(0);
  const steps = wizardSteps;

  return (
    <div style={{ maxWidth: 760, margin: "0 auto" }}>
      <div style={{ background: "#060f21", border: "1px solid rgba(212,160,23,0.2)", borderRadius: 12, overflow: "hidden" }}>
        <div style={{ padding: "20px 24px", borderBottom: "1px solid rgba(212,160,23,0.1)", background: "#050e1e" }}>
          <div style={{ color: "#d4a017", fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 4 }}>Institution Provisioning Wizard</div>
          <div style={{ color: "#f0f4ff", fontSize: 16, fontWeight: 800 }}>Onboard a New Institution</div>
        </div>

        {/* Step Progress */}
        <div style={{ padding: "20px 24px", borderBottom: "1px solid rgba(212,160,23,0.1)" }}>
          <div style={{ display: "flex", gap: 4, alignItems: "center", flexWrap: "wrap" }}>
            {steps.map((s, idx) => (
              <div key={s.step} style={{ display: "flex", alignItems: "center", gap: 4 }}>
                <button
                  onClick={() => setCurrentStep(idx)}
                  style={{ display: "flex", alignItems: "center", gap: 6, padding: "6px 12px", borderRadius: 8, border: `1px solid ${idx === currentStep ? "rgba(212,160,23,0.4)" : idx < currentStep ? "rgba(74,222,128,0.3)" : "rgba(255,255,255,0.08)"}`, background: idx === currentStep ? "rgba(212,160,23,0.12)" : idx < currentStep ? "rgba(74,222,128,0.08)" : "transparent", cursor: "pointer", transition: "all 0.2s" }}
                >
                  <span style={{ fontSize: 14 }}>{idx < currentStep ? "✓" : s.icon}</span>
                  <span style={{ color: idx === currentStep ? "#d4a017" : idx < currentStep ? "#4ade80" : "#6b7a94", fontSize: 11, fontWeight: 700 }}>{s.label}</span>
                </button>
                {idx < steps.length - 1 && <span style={{ color: "#2a3548", fontSize: 12 }}>›</span>}
              </div>
            ))}
          </div>
        </div>

        {/* Active Step Panel */}
        <div style={{ padding: "28px 24px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
            <div style={{ width: 44, height: 44, borderRadius: 12, background: "rgba(212,160,23,0.12)", border: "1px solid rgba(212,160,23,0.3)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22 }}>{steps[currentStep]?.icon}</div>
            <div>
              <div style={{ color: "#f0f4ff", fontSize: 18, fontWeight: 800 }}>{steps[currentStep]?.label}</div>
              <div style={{ color: "#6b7a94", fontSize: 13 }}>{steps[currentStep]?.description}</div>
            </div>
          </div>

          {currentStep === 0 && (
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <FormField label="Institution Name" placeholder="e.g. Lagos Business School" />
              <FormField label="Legal Entity Name" placeholder="e.g. Pan-Atlantic University" />
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                <FormField label="Country" placeholder="Nigeria" />
                <FormField label="Timezone" placeholder="Africa/Lagos" />
              </div>
            </div>
          )}
          {currentStep === 1 && (
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <FormField label="Short Name / Abbreviation" placeholder="e.g. LBS" />
              <FormField label="Institution Tagline" placeholder="e.g. Building Leaders for the African Business World" />
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                <FormField label="Primary Colour" placeholder="#d4a017" type="color" />
                <FormField label="Secondary Colour" placeholder="#4ade80" type="color" />
              </div>
            </div>
          )}
          {currentStep === 5 && (
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
              {tiers.slice(0, 3).map((tier) => (
                <div key={tier.tier} style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(212,160,23,0.2)", borderRadius: 10, padding: "16px 18px", cursor: "pointer" }}>
                  <div style={{ color: tierColor[tier.tier] ?? "#f0f4ff", fontWeight: 800, fontSize: 14, textTransform: "capitalize", marginBottom: 4 }}>{tier.name}</div>
                  <div style={{ color: "#f0f4ff", fontWeight: 900, fontSize: 20, marginBottom: 10 }}>{tier.priceUSD === 0 ? "Custom" : `$${tier.priceUSD}/mo`}</div>
                  {tier.features.slice(0, 3).map((f) => <div key={f} style={{ color: "#6b7a94", fontSize: 11, marginBottom: 4, display: "flex", gap: 5 }}><span style={{ color: "#4ade80" }}>✓</span>{f}</div>)}
                </div>
              ))}
            </div>
          )}
          {![0, 1, 5].includes(currentStep) && (
            <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 10, padding: "24px", textAlign: "center", color: "#6b7a94", fontSize: 13 }}>
              Complete the previous steps first, then configure {steps[currentStep]?.label}.
            </div>
          )}

          <div style={{ display: "flex", gap: 10, marginTop: 24, justifyContent: "flex-end" }}>
            {currentStep > 0 && <button onClick={() => setCurrentStep((s) => s - 1)} style={{ padding: "10px 20px", borderRadius: 8, border: "1px solid rgba(255,255,255,0.1)", background: "transparent", color: "#aab4c4", cursor: "pointer", fontSize: 13, fontWeight: 700 }}>← Back</button>}
            {currentStep < steps.length - 1
              ? <button onClick={() => setCurrentStep((s) => s + 1)} style={{ padding: "10px 22px", borderRadius: 8, border: "none", background: "#d4a017", color: "#030e1f", cursor: "pointer", fontSize: 13, fontWeight: 800 }}>Continue →</button>
              : <button style={{ padding: "10px 24px", borderRadius: 8, border: "none", background: "linear-gradient(135deg,#4ade80,#16a34a)", color: "#030e1f", cursor: "pointer", fontSize: 14, fontWeight: 800 }}>🚀 Provision Institution</button>
            }
          </div>
        </div>
      </div>
    </div>
  );
}

function FormField({ label, placeholder, type = "text" }: { label: string; placeholder: string; type?: string }) {
  return (
    <div>
      <label style={{ display: "block", color: "#6b7a94", fontSize: 12, fontWeight: 700, marginBottom: 6 }}>{label}</label>
      <input type={type} placeholder={placeholder} style={{ width: "100%", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(212,160,23,0.2)", borderRadius: 8, padding: "10px 14px", color: "#f0f4ff", fontSize: 13, outline: "none", boxSizing: "border-box" }} />
    </div>
  );
}

const actionBtn: React.CSSProperties = { background: "transparent", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 6, padding: "5px 10px", color: "#6b7a94", cursor: "pointer", fontSize: 11 };

// ─── Main Page ─────────────────────────────────────────────────────────────────
export default function PlatformAdministrationPage() {
  const [activeTab, setActiveTab] = useState<ActiveTab>("tenants");

  return (
    <div style={{ minHeight: "100vh", background: "#030e1f", color: "#f0f4ff", fontFamily: "'Inter','Outfit',sans-serif", padding: "24px 28px" }}>
      {/* Header */}
      <div style={{ marginBottom: 24 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
          <div style={{ background: "linear-gradient(135deg,#d4a017,#b88a0e)", borderRadius: 10, padding: "8px 14px", fontSize: 13, fontWeight: 900, color: "#030e1f" }}>InstitutionOS v4.0</div>
          <div style={{ background: "rgba(74,222,128,0.12)", border: "1px solid rgba(74,222,128,0.3)", borderRadius: 8, padding: "4px 12px", color: "#4ade80", fontSize: 11, fontWeight: 700 }}>Enterprise Platform</div>
        </div>
        <h1 style={{ fontSize: 24, fontWeight: 900, color: "#f0f4ff", margin: "0 0 4px" }}>Platform Administration Centre</h1>
        <p style={{ color: "#6b7a94", fontSize: 14, margin: 0 }}>Multi-tenant governance, licensing, usage analytics, and institution provisioning.</p>
      </div>

      {/* Quick Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(130px,1fr))", gap: 12, marginBottom: 24 }}>
        <MetricCard icon="🏛" label="Institutions" value={metrics.totalInstitutions} sub={`${metrics.activeInstitutions} active`} />
        <MetricCard icon="🎓" label="Total Learners" value={metrics.totalLearners.toLocaleString()} />
        <MetricCard icon="💰" label="MRR" value={`$${LicenseService.getTotalMonthlyRecurringRevenueUSD().toLocaleString()}`} color="#4ade80" />
        <MetricCard icon="🟢" label="Uptime" value={`${metrics.platformAvailabilityPercent}%`} color="#4ade80" />
        <MetricCard icon="👥" label="Active Now" value={metrics.activeSessionsNow} />
      </div>

      {/* Tab Navigation */}
      <div style={{ display: "flex", gap: 4, marginBottom: 20, background: "rgba(255,255,255,0.03)", borderRadius: 10, padding: 4, flexWrap: "wrap" }}>
        {tabs.map((tab) => (
          <button key={tab.key} onClick={() => setActiveTab(tab.key)} style={{ padding: "9px 16px", borderRadius: 8, border: "none", cursor: "pointer", fontSize: 12, fontWeight: 700, background: activeTab === tab.key ? "#d4a017" : "transparent", color: activeTab === tab.key ? "#030e1f" : "#6b7a94", transition: "all 0.2s", display: "flex", alignItems: "center", gap: 6, whiteSpace: "nowrap" }}>
            <span>{tab.icon}</span>{tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === "tenants"      && <TenantsTab />}
      {activeTab === "metrics"      && <MetricsTab />}
      {activeTab === "licensing"    && <LicensingTab />}
      {activeTab === "usage"        && <UsageTab />}
      {activeTab === "domains"      && <DomainsTab />}
      {activeTab === "themes"       && <ThemesTab />}
      {activeTab === "features"     && <FeatureFlagsTab />}
      {activeTab === "provisioning" && <ProvisioningTab />}
    </div>
  );
}
