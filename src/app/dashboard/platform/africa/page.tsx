'use client';

import React, { useState } from 'react';
import { CountryRegistryService, RegionalOperationsService, ExpansionPlanningService } from '@/lib/institutionOS';

export default function AfricaExpansionCentrePage() {
  const [activeTab, setActiveTab] = useState<'countries' | 'regions' | 'expansion'>('countries');
  const countries = CountryRegistryService.getCountries();
  const regions = RegionalOperationsService.getRegions();
  const expansions = ExpansionPlanningService.getExpansionOpportunities();

  const tabs = [
    { key: 'countries' as const, label: 'Country Intelligence', icon: '🌍' },
    { key: 'regions' as const, label: 'Regional Operations', icon: '🗺️' },
    { key: 'expansion' as const, label: 'Expansion Opportunities', icon: '🚀' },
  ];

  const flags: Record<string, string> = { NG: '🇳🇬', GH: '🇬🇭', KE: '🇰🇪', ZA: '🇿🇦', RW: '🇷🇼', UG: '🇺🇬' };
  const priorityColors: Record<string, string> = { TIER_1_CRITICAL: '#d4a017', TIER_2_HIGH_GROWTH: '#4ade80', TIER_3_EMERGING: 'rgba(240,244,255,0.4)' };

  return (
    <div style={{ padding: '32px', minHeight: '100vh' }}>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: 700, color: '#f0f4ff', margin: 0 }}>
          <span style={{ color: '#d4a017' }}>◆</span> Africa Expansion Centre
        </h1>
        <p style={{ color: 'rgba(240,244,255,0.5)', marginTop: '4px', fontSize: '14px' }}>
          Continental Intelligence, Regional Operations & Market Expansion Strategy
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

      {activeTab === 'countries' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
          {countries.map((c) => (
            <div key={c.countryCode} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '14px', padding: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                <div>
                  <h3 style={{ fontSize: '18px', fontWeight: 600, color: '#f0f4ff', margin: 0 }}>
                    {flags[c.countryCode] || '🌍'} {c.countryName}
                  </h3>
                  <span style={{ fontSize: '11px', color: 'rgba(240,244,255,0.5)' }}>{c.region}</span>
                </div>
                <span style={{ fontSize: '9px', fontWeight: 600, padding: '3px 8px', borderRadius: '6px', background: `${priorityColors[c.strategicPriority]}20`, color: priorityColors[c.strategicPriority] }}>
                  {c.strategicPriority.replace(/_/g, ' ')}
                </span>
              </div>

              <div style={{ marginBottom: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', marginBottom: '4px' }}>
                  <span style={{ color: 'rgba(240,244,255,0.4)' }}>Readiness Score</span>
                  <span style={{ color: '#4ade80', fontWeight: 600 }}>{c.readinessScore}%</span>
                </div>
                <div style={{ width: '100%', height: '5px', background: 'rgba(255,255,255,0.06)', borderRadius: '3px' }}>
                  <div style={{ width: `${c.readinessScore}%`, height: '100%', background: '#4ade80', borderRadius: '3px' }} />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', fontSize: '12px', marginBottom: '12px' }}>
                <div><span style={{ color: 'rgba(240,244,255,0.4)' }}>Active Institutions</span><div style={{ color: '#d4a017', fontWeight: 600 }}>{c.activeInstitutionsCount}</div></div>
                <div><span style={{ color: 'rgba(240,244,255,0.4)' }}>Pipeline Deals</span><div style={{ color: '#f0f4ff', fontWeight: 600 }}>{c.pipelineDealsCount}</div></div>
              </div>
              <div style={{ fontSize: '12px', marginBottom: '8px' }}>
                <span style={{ color: 'rgba(240,244,255,0.4)' }}>Market Value: </span>
                <span style={{ color: '#d4a017', fontWeight: 600 }}>${(c.totalMarketValueUSD / 1000000).toFixed(1)}M</span>
              </div>
              <div style={{ fontSize: '10px', color: 'rgba(240,244,255,0.4)', borderTop: '1px solid rgba(255,255,255,0.04)', paddingTop: '8px' }}>
                {c.ministryContact}
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'regions' && (
        <div style={{ display: 'grid', gap: '20px' }}>
          {regions.map((r) => (
            <div key={r.id} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '16px', padding: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                <div>
                  <h3 style={{ fontSize: '18px', fontWeight: 600, color: '#f0f4ff', margin: 0 }}>{r.regionName}</h3>
                  <div style={{ fontSize: '12px', color: 'rgba(240,244,255,0.5)', marginTop: '4px' }}>{r.headOfRegion} — {r.headquartersCity}</div>
                  <div style={{ display: 'flex', gap: '6px', marginTop: '8px', flexWrap: 'wrap' }}>
                    {r.countriesCovered.map((country) => (
                      <span key={country} style={{ fontSize: '10px', padding: '2px 8px', borderRadius: '6px', background: 'rgba(255,255,255,0.05)', color: 'rgba(240,244,255,0.6)' }}>{country}</span>
                    ))}
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '22px', fontWeight: 700, color: '#d4a017' }}>${(r.totalPipelineValueUSD / 1000000).toFixed(1)}M</div>
                  <div style={{ fontSize: '10px', color: 'rgba(240,244,255,0.4)' }}>Pipeline Value</div>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '16px', fontSize: '12px' }}>
                <div><span style={{ color: 'rgba(240,244,255,0.4)' }}>Active Deals</span><div style={{ color: '#f0f4ff', fontWeight: 600 }}>{r.activeDealsCount}</div></div>
                <div><span style={{ color: 'rgba(240,244,255,0.4)' }}>Attainment</span><div style={{ color: r.attainmentPercent >= 85 ? '#4ade80' : '#d4a017', fontWeight: 600 }}>{r.attainmentPercent}%</div></div>
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', marginBottom: '4px' }}>
                  <span style={{ color: 'rgba(240,244,255,0.4)' }}>Q3 Target: ${(r.quarterlyTargetUSD / 1000).toFixed(0)}K</span>
                  <span style={{ color: '#d4a017', fontWeight: 600 }}>${(r.quarterlyAchievedUSD / 1000).toFixed(0)}K achieved</span>
                </div>
                <div style={{ width: '100%', height: '8px', background: 'rgba(255,255,255,0.06)', borderRadius: '4px' }}>
                  <div style={{ width: `${r.attainmentPercent}%`, height: '100%', background: 'linear-gradient(90deg, #d4a017, #4ade80)', borderRadius: '4px' }} />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'expansion' && (
        <div style={{ display: 'grid', gap: '16px' }}>
          {expansions.map((e) => (
            <div key={e.id} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '14px', padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h3 style={{ fontSize: '15px', fontWeight: 600, color: '#f0f4ff', margin: '0 0 6px 0' }}>{e.institutionName}</h3>
                <span style={{ fontSize: '12px', color: 'rgba(240,244,255,0.5)' }}>Target Module: <span style={{ color: '#d4a017' }}>{e.targetModule}</span></span>
                <div style={{ marginTop: '8px' }}>
                  <span style={{ fontSize: '10px', padding: '3px 10px', borderRadius: '6px', background: e.pitchStage === 'PROPOSAL_SENT' ? 'rgba(99,102,241,0.15)' : 'rgba(255,255,255,0.05)', color: e.pitchStage === 'PROPOSAL_SENT' ? '#818cf8' : 'rgba(240,244,255,0.5)', fontWeight: 600 }}>
                    {e.pitchStage.replace(/_/g, ' ')}
                  </span>
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '20px', fontWeight: 700, color: '#4ade80' }}>+${(e.estimatedAdditionalARRUSD / 1000).toFixed(0)}K</div>
                <div style={{ fontSize: '10px', color: 'rgba(240,244,255,0.4)' }}>Additional ARR</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
