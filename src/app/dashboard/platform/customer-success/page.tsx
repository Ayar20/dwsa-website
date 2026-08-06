'use client';

import React, { useState } from 'react';
import { CustomerSuccessOperationsService, RenewalManagementService, PortfolioManagementService } from '@/lib/institutionOS';

export default function CustomerSuccessPage() {
  const [activeTab, setActiveTab] = useState<'health' | 'portfolio' | 'renewals'>('health');
  const healthChecks = CustomerSuccessOperationsService.getHealthChecks();
  const renewals = RenewalManagementService.getUpcomingRenewals();
  const portfolio = PortfolioManagementService.getPortfolio();
  const summary = PortfolioManagementService.getPortfolioSummary();

  const tabs = [
    { key: 'health' as const, label: 'Health Dashboard', icon: '💚' },
    { key: 'portfolio' as const, label: 'Portfolio Overview', icon: '🏛️' },
    { key: 'renewals' as const, label: 'Renewals', icon: '🔄' },
  ];

  const avgHealth = Math.round(healthChecks.reduce((s, h) => s + h.overallHealthScore, 0) / healthChecks.length);

  return (
    <div style={{ padding: '32px', minHeight: '100vh' }}>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: 700, color: '#f0f4ff', margin: 0 }}>
          <span style={{ color: '#d4a017' }}>◆</span> Customer Success Operations
        </h1>
        <p style={{ color: 'rgba(240,244,255,0.5)', marginTop: '4px', fontSize: '14px' }}>
          Institution Health Monitoring, Portfolio Management & Renewal Intelligence
        </p>
      </div>

      <div style={{ display: 'flex', gap: '8px', marginBottom: '24px' }}>
        {tabs.map((tab) => (
          <button key={tab.key} onClick={() => setActiveTab(tab.key)} style={{
            padding: '10px 20px', borderRadius: '10px', border: 'none', cursor: 'pointer', fontSize: '13px', fontWeight: 600,
            background: activeTab === tab.key ? 'rgba(212,160,23,0.15)' : 'rgba(255,255,255,0.03)',
            color: activeTab === tab.key ? '#d4a017' : 'rgba(240,244,255,0.5)',
          }}>
            {tab.icon} {tab.label}
          </button>
        ))}
      </div>

      {activeTab === 'health' && (
        <>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '24px' }}>
            {[
              { label: 'Average Health', value: `${avgHealth}%`, icon: '💚' },
              { label: 'Total Institutions', value: healthChecks.length.toString(), icon: '🏛️' },
              { label: 'Average NPS', value: `${summary.averageNPS}`, icon: '⭐' },
            ].map((stat) => (
              <div key={stat.label} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '12px', padding: '20px' }}>
                <div style={{ fontSize: '24px', marginBottom: '8px' }}>{stat.icon}</div>
                <div style={{ fontSize: '26px', fontWeight: 700, color: '#4ade80' }}>{stat.value}</div>
                <div style={{ fontSize: '12px', color: 'rgba(240,244,255,0.5)', marginTop: '4px' }}>{stat.label}</div>
              </div>
            ))}
          </div>

          <div style={{ display: 'grid', gap: '20px' }}>
            {healthChecks.map((hc) => (
              <div key={hc.institutionId} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '16px', padding: '24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
                  <div>
                    <h3 style={{ fontSize: '18px', fontWeight: 600, color: '#f0f4ff', margin: 0 }}>{hc.institutionName}</h3>
                    <span style={{ fontSize: '10px', padding: '3px 10px', borderRadius: '6px', background: hc.riskLevel === 'LOW' ? 'rgba(74,222,128,0.15)' : 'rgba(245,158,11,0.15)', color: hc.riskLevel === 'LOW' ? '#4ade80' : '#f59e0b', fontWeight: 600, marginTop: '4px', display: 'inline-block' }}>
                      ● {hc.riskLevel} RISK
                    </span>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '40px', fontWeight: 800, color: hc.overallHealthScore >= 95 ? '#4ade80' : '#d4a017' }}>{hc.overallHealthScore}</div>
                    <div style={{ fontSize: '10px', color: 'rgba(240,244,255,0.4)' }}>HEALTH SCORE</div>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '12px', marginBottom: '16px' }}>
                  {[
                    { label: 'Faculty Adoption', value: `${hc.facultyAdoptionPercent}%`, pct: hc.facultyAdoptionPercent },
                    { label: 'Student Adoption', value: `${hc.studentAdoptionPercent}%`, pct: hc.studentAdoptionPercent },
                    { label: 'AI Utilization', value: hc.aiUtilizationCount.toLocaleString(), pct: 100 },
                    { label: 'Training', value: `${hc.trainingCompletionPercent}%`, pct: hc.trainingCompletionPercent },
                    { label: 'Renewal Prob.', value: `${hc.renewalProbabilityPercent}%`, pct: hc.renewalProbabilityPercent },
                  ].map((m) => (
                    <div key={m.label}>
                      <div style={{ fontSize: '11px', color: 'rgba(240,244,255,0.4)', marginBottom: '4px' }}>{m.label}</div>
                      <div style={{ fontSize: '16px', fontWeight: 700, color: '#f0f4ff', marginBottom: '4px' }}>{m.value}</div>
                      <div style={{ width: '100%', height: '4px', background: 'rgba(255,255,255,0.06)', borderRadius: '2px' }}>
                        <div style={{ width: `${m.pct}%`, height: '100%', background: m.pct >= 90 ? '#4ade80' : '#d4a017', borderRadius: '2px' }} />
                      </div>
                    </div>
                  ))}
                </div>

                <div style={{ fontSize: '12px', marginBottom: '8px' }}>
                  <span style={{ color: 'rgba(240,244,255,0.4)' }}>Open Support Tickets: </span>
                  <span style={{ color: hc.openSupportTickets === 0 ? '#4ade80' : '#f59e0b', fontWeight: 600 }}>{hc.openSupportTickets}</span>
                </div>

                <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '12px' }}>
                  <div style={{ fontSize: '11px', fontWeight: 600, color: '#d4a017', marginBottom: '6px' }}>RECOMMENDED ACTIONS</div>
                  {hc.recommendedActions.map((action, i) => (
                    <div key={i} style={{ fontSize: '12px', color: 'rgba(240,244,255,0.6)', marginBottom: '4px' }}>→ {action}</div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {activeTab === 'portfolio' && (
        <>
          <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(212,160,23,0.15)', borderRadius: '16px', padding: '24px', marginBottom: '24px' }}>
            <h3 style={{ fontSize: '14px', fontWeight: 600, color: '#d4a017', margin: '0 0 16px 0' }}>PORTFOLIO SUMMARY</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '16px' }}>
              {[
                { label: 'Institutions', value: summary.totalInstitutions },
                { label: 'Total Students', value: summary.totalStudents.toLocaleString() },
                { label: 'Total Faculty', value: summary.totalFaculty.toLocaleString() },
                { label: 'Total ARR', value: `$${(summary.totalARRUSD / 1000).toFixed(0)}K` },
                { label: 'Avg Health', value: `${summary.averageHealthScore}%` },
                { label: 'Avg NPS', value: summary.averageNPS.toString() },
              ].map((item) => (
                <div key={item.label} style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '20px', fontWeight: 700, color: '#f0f4ff' }}>{item.value}</div>
                  <div style={{ fontSize: '11px', color: 'rgba(240,244,255,0.4)' }}>{item.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ display: 'grid', gap: '16px' }}>
            {portfolio.map((p) => (
              <div key={p.id} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '14px', padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h3 style={{ fontSize: '15px', fontWeight: 600, color: '#f0f4ff', margin: '0 0 4px 0' }}>{p.institutionName}</h3>
                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    <span style={{ fontSize: '10px', padding: '2px 8px', borderRadius: '6px', background: 'rgba(255,255,255,0.05)', color: 'rgba(240,244,255,0.6)' }}>{p.country}</span>
                    <span style={{ fontSize: '10px', padding: '2px 8px', borderRadius: '6px', background: 'rgba(212,160,23,0.15)', color: '#d4a017' }}>{p.deployedVersion}</span>
                    <span style={{ fontSize: '10px', color: 'rgba(240,244,255,0.4)' }}>MAU: {p.monthlyActiveUsers.toLocaleString()} | NPS: {p.npsScore} | Last: {p.lastCheckIn}</span>
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '18px', fontWeight: 700, color: '#d4a017' }}>${p.arrUSD.toLocaleString()}</div>
                  <div style={{ fontSize: '10px', color: 'rgba(240,244,255,0.4)' }}>ARR</div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {activeTab === 'renewals' && (
        <div style={{ display: 'grid', gap: '16px' }}>
          {renewals.map((r) => (
            <div key={r.id} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '14px', padding: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                <div>
                  <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#f0f4ff', margin: '0 0 6px 0' }}>{r.institutionName}</h3>
                  <span style={{ fontSize: '12px', color: 'rgba(240,244,255,0.5)' }}>Contract End: {r.contractEndDate}</span>
                  <div style={{ marginTop: '8px' }}>
                    <span style={{ fontSize: '10px', padding: '3px 10px', borderRadius: '6px', fontWeight: 600, background: r.status === 'RENEWED' ? 'rgba(74,222,128,0.15)' : r.status === 'IN_TALKS' ? 'rgba(99,102,241,0.15)' : 'rgba(245,158,11,0.15)', color: r.status === 'RENEWED' ? '#4ade80' : r.status === 'IN_TALKS' ? '#818cf8' : '#f59e0b' }}>{r.status.replace(/_/g, ' ')}</span>
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '12px', color: 'rgba(240,244,255,0.4)' }}>Current ARR</div>
                  <div style={{ fontSize: '18px', fontWeight: 700, color: '#f0f4ff' }}>${r.currentARRUSD.toLocaleString()}</div>
                  <div style={{ fontSize: '12px', color: 'rgba(240,244,255,0.4)', marginTop: '4px' }}>Expansion Target</div>
                  <div style={{ fontSize: '16px', fontWeight: 700, color: '#4ade80' }}>${r.expansionTargetARRUSD.toLocaleString()}</div>
                </div>
              </div>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', marginBottom: '4px' }}>
                  <span style={{ color: 'rgba(240,244,255,0.4)' }}>Renewal Probability</span>
                  <span style={{ color: '#4ade80', fontWeight: 600 }}>{r.renewalProbabilityPercent}%</span>
                </div>
                <div style={{ width: '100%', height: '6px', background: 'rgba(255,255,255,0.06)', borderRadius: '3px' }}>
                  <div style={{ width: `${r.renewalProbabilityPercent}%`, height: '100%', background: 'linear-gradient(90deg, #d4a017, #4ade80)', borderRadius: '3px' }} />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
