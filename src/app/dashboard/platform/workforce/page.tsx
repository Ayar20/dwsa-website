'use client';

import React from 'react';
import { WorkforceIntelligenceService, CountryRegistryService } from '@/lib/institutionOS';

export default function AfricaWorkforceIntelligencePage() {
  const trends = WorkforceIntelligenceService.getTrends();
  const countries = CountryRegistryService.getCountries();

  return (
    <div style={{ padding: '32px', minHeight: '100vh' }}>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: 700, color: '#f0f4ff', margin: 0 }}>
          <span style={{ color: '#d4a017' }}>◆</span> Africa Workforce Intelligence
        </h1>
        <p style={{ color: 'rgba(240,244,255,0.5)', marginTop: '4px', fontSize: '14px' }}>
          Continental Skills Demand, Regional Workforce Forecasts & Emerging Tech Trends
        </p>
      </div>

      {/* Continental Summary Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '32px' }}>
        {[
          { label: 'African Tech Workforce Pool', value: '1.4M', icon: '🌍' },
          { label: 'Active Graduate Pipeline', value: '240,000', icon: '🎓' },
          { label: 'Annual Skill Demand Growth', value: '+118%', icon: '📈' },
          { label: 'Top Emerging Sector', value: 'AI Agents & Cloud', icon: '🤖' },
        ].map((stat) => (
          <div key={stat.label} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '14px', padding: '20px' }}>
            <div style={{ fontSize: '24px', marginBottom: '8px' }}>{stat.icon}</div>
            <div style={{ fontSize: '24px', fontWeight: 700, color: '#d4a017' }}>{stat.value}</div>
            <div style={{ fontSize: '11px', color: 'rgba(240,244,255,0.5)', marginTop: '4px' }}>{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Country Comparison */}
      <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#d4a017', marginBottom: '16px' }}>REGIONAL SKILLS PIPELINE BY COUNTRY</h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '32px' }}>
        {countries.map((c) => (
          <div key={c.countryCode} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '16px', padding: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
              <h4 style={{ fontSize: '16px', fontWeight: 600, color: '#f0f4ff', margin: 0 }}>{c.countryName}</h4>
              <span style={{ fontSize: '10px', padding: '2px 8px', borderRadius: '6px', background: 'rgba(74,222,128,0.15)', color: '#4ade80' }}>{c.region}</span>
            </div>
            <div style={{ fontSize: '12px', color: 'rgba(240,244,255,0.5)', marginBottom: '8px' }}>Readiness Score: <span style={{ color: '#d4a017', fontWeight: 600 }}>{c.readinessScore}%</span></div>
            <div style={{ fontSize: '12px', color: 'rgba(240,244,255,0.5)' }}>Market Size: <span style={{ color: '#f0f4ff', fontWeight: 600 }}>${(c.totalMarketValueUSD / 1000000).toFixed(1)}M</span></div>
          </div>
        ))}
      </div>

      {/* Labour Demand Trends */}
      <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#d4a017', marginBottom: '16px' }}>HIGH DEMAND ROLES IN AFRICA</h3>
      <div style={{ display: 'grid', gap: '12px' }}>
        {trends.map((t) => (
          <div key={t.skillOrRole} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '14px', padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h4 style={{ fontSize: '16px', fontWeight: 600, color: '#f0f4ff', margin: '0 0 4px 0' }}>{t.skillOrRole}</h4>
              <div style={{ fontSize: '12px', color: 'rgba(240,244,255,0.5)' }}>Category: {t.category} — Top Hubs: {t.topHiringRegions.join(', ')}</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '18px', fontWeight: 700, color: '#4ade80' }}>+{t.demandGrowthPercent}% Growth</div>
              <div style={{ fontSize: '11px', color: 'rgba(240,244,255,0.4)' }}>{t.openPostingsCount.toLocaleString()} Postings</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
