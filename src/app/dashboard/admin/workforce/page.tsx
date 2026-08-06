'use client';

import React from 'react';
import { WorkforceIntelligenceService, SkillsAnalyticsService } from '@/lib/institutionOS';

export default function ExecutiveWorkforceDashboardPage() {
  const trends = WorkforceIntelligenceService.getTrends();
  const analytics = SkillsAnalyticsService.getInstitutionalAnalytics();

  return (
    <div style={{ padding: '32px', minHeight: '100vh' }}>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: 700, color: '#f0f4ff', margin: 0 }}>
          <span style={{ color: '#d4a017' }}>◆</span> Executive Workforce Dashboard
        </h1>
        <p style={{ color: 'rgba(240,244,255,0.5)', marginTop: '4px', fontSize: '14px' }}>
          Graduate Employability, Industry Alignment & Labor Market Forecasts
        </p>
      </div>

      {/* Summary KPI Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '32px' }}>
        {[
          { label: 'Graduate Employability Rate', value: '94.2%', icon: '🎓' },
          { label: 'Avg Time to Employment', value: '38 Days', icon: '⚡' },
          { label: 'Industry Alignment Score', value: `${analytics.programmeAlignmentPercent}%`, icon: '🎯' },
          { label: 'Avg Graduate Starting Salary', value: '$48,500', icon: '💰' },
        ].map((stat) => (
          <div key={stat.label} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '14px', padding: '20px' }}>
            <div style={{ fontSize: '24px', marginBottom: '8px' }}>{stat.icon}</div>
            <div style={{ fontSize: '24px', fontWeight: 700, color: '#d4a017' }}>{stat.value}</div>
            <div style={{ fontSize: '11px', color: 'rgba(240,244,255,0.5)', marginTop: '4px' }}>{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Labor Market Trends */}
      <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#d4a017', marginBottom: '16px' }}>LABOUR MARKET DEMAND FORECAST</h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
        {trends.map((t) => (
          <div key={t.skillOrRole} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '16px', padding: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
              <div>
                <h4 style={{ fontSize: '16px', fontWeight: 600, color: '#f0f4ff', margin: 0 }}>{t.skillOrRole}</h4>
                <span style={{ fontSize: '12px', color: 'rgba(240,244,255,0.5)' }}>{t.category}</span>
              </div>
              <span style={{ fontSize: '10px', padding: '3px 8px', borderRadius: '6px', background: 'rgba(74,222,128,0.15)', color: '#4ade80', fontWeight: 600 }}>
                +{t.demandGrowthPercent}% YoY Growth
              </span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', fontSize: '12px', marginBottom: '12px' }}>
              <div><span style={{ color: 'rgba(240,244,255,0.4)' }}>Open Postings</span><div style={{ color: '#d4a017', fontWeight: 600 }}>{t.openPostingsCount.toLocaleString()}</div></div>
              <div><span style={{ color: 'rgba(240,244,255,0.4)' }}>Avg Salary</span><div style={{ color: '#f0f4ff', fontWeight: 600 }}>${t.averageSalaryUSD.toLocaleString()}</div></div>
            </div>
            <div style={{ fontSize: '11px', color: 'rgba(240,244,255,0.4)' }}>
              Top Hiring Hubs: <span style={{ color: 'rgba(240,244,255,0.7)' }}>{t.topHiringRegions.join(', ')}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
