'use client';

import React from 'react';
import { OpportunityManagementService } from '@/lib/institutionOS';

export default function TransformationPipelinePage() {
  const opportunities = OpportunityManagementService.getOpportunities();
  const totalPipeline = opportunities.reduce((s, o) => s + o.dealValueUSD, 0);
  const weightedForecast = opportunities.reduce((s, o) => s + (o.dealValueUSD * o.probabilityPercent / 100), 0);
  const avgDealSize = Math.round(totalPipeline / opportunities.length);

  const riskColors: Record<string, string> = { LOW: '#4ade80', MEDIUM: '#f59e0b', HIGH: '#ef4444' };
  const countryFlags: Record<string, string> = { Ghana: '🇬🇭', Nigeria: '🇳🇬', 'South Africa': '🇿🇦', Uganda: '🇺🇬', Kenya: '🇰🇪' };

  return (
    <div style={{ padding: '32px', minHeight: '100vh' }}>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: 700, color: '#f0f4ff', margin: 0 }}>
          <span style={{ color: '#d4a017' }}>◆</span> Transformation Pipeline
        </h1>
        <p style={{ color: 'rgba(240,244,255,0.5)', marginTop: '4px', fontSize: '14px' }}>
          Enterprise Deal Pipeline & AI-Powered Opportunity Intelligence
        </p>
      </div>

      {/* Summary Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '32px' }}>
        {[
          { label: 'Total Pipeline', value: `$${(totalPipeline / 1000000).toFixed(2)}M`, icon: '📊' },
          { label: 'Weighted Forecast', value: `$${(weightedForecast / 1000).toFixed(0)}K`, icon: '🎯' },
          { label: 'Average Deal Size', value: `$${(avgDealSize / 1000).toFixed(0)}K`, icon: '💎' },
          { label: 'Active Opportunities', value: opportunities.length.toString(), icon: '🔥' },
        ].map((stat) => (
          <div key={stat.label} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '12px', padding: '20px' }}>
            <div style={{ fontSize: '24px', marginBottom: '8px' }}>{stat.icon}</div>
            <div style={{ fontSize: '24px', fontWeight: 700, color: '#d4a017' }}>{stat.value}</div>
            <div style={{ fontSize: '12px', color: 'rgba(240,244,255,0.5)', marginTop: '4px' }}>{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Pipeline Stage Visualization */}
      <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '16px', padding: '24px', marginBottom: '24px' }}>
        <h3 style={{ fontSize: '14px', fontWeight: 600, color: '#d4a017', marginBottom: '16px', margin: '0 0 16px 0' }}>PIPELINE STAGES</h3>
        <div style={{ display: 'flex', gap: '2px', flexWrap: 'wrap' }}>
          {['Lead', 'Discovery', 'Assessment', 'Proposal', 'Exec Presentation', 'Negotiation', 'Contract Signed', 'Implementation', 'Configuration', 'Migration', 'Training', 'Pilot', 'Go Live', 'Hypercare', 'Optimization', 'Expansion', 'Renewal'].map((stage, i) => {
            const hasDeals = opportunities.some(o => o.stage.toLowerCase().includes(stage.toLowerCase().split(' ')[0]));
            return (
              <div key={stage} style={{
                flex: 1,
                minWidth: '60px',
                padding: '8px 4px',
                background: hasDeals ? 'rgba(212,160,23,0.15)' : 'rgba(255,255,255,0.02)',
                border: hasDeals ? '1px solid rgba(212,160,23,0.3)' : '1px solid rgba(255,255,255,0.04)',
                borderRadius: '6px',
                textAlign: 'center',
              }}>
                <div style={{ fontSize: '9px', color: hasDeals ? '#d4a017' : 'rgba(240,244,255,0.3)', fontWeight: hasDeals ? 600 : 400 }}>{stage}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Deal Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>
        {opportunities.map((opp) => (
          <div key={opp.id} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '16px', padding: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
              <div>
                <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#f0f4ff', margin: 0 }}>
                  {countryFlags[opp.country] || '🌍'} {opp.institutionName}
                </h3>
                <span style={{ fontSize: '12px', color: 'rgba(240,244,255,0.5)' }}>{opp.country}</span>
              </div>
              <span style={{ fontSize: '10px', fontWeight: 600, padding: '4px 10px', borderRadius: '8px', background: 'rgba(99,102,241,0.15)', color: '#818cf8' }}>{opp.stage}</span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px', marginBottom: '16px' }}>
              <div>
                <div style={{ fontSize: '11px', color: 'rgba(240,244,255,0.4)' }}>Deal Value</div>
                <div style={{ fontSize: '18px', fontWeight: 700, color: '#d4a017' }}>${(opp.dealValueUSD / 1000).toFixed(0)}K</div>
              </div>
              <div>
                <div style={{ fontSize: '11px', color: 'rgba(240,244,255,0.4)' }}>Probability</div>
                <div style={{ fontSize: '18px', fontWeight: 700, color: '#f0f4ff' }}>{opp.probabilityPercent}%</div>
              </div>
              <div>
                <div style={{ fontSize: '11px', color: 'rgba(240,244,255,0.4)' }}>Risk</div>
                <div style={{ fontSize: '14px', fontWeight: 600, color: riskColors[opp.riskLevel] }}>● {opp.riskLevel}</div>
              </div>
            </div>

            <div style={{ fontSize: '12px', marginBottom: '12px' }}>
              <span style={{ color: 'rgba(240,244,255,0.4)' }}>Owner: </span>
              <span style={{ color: '#f0f4ff' }}>{opp.assignedOwner}</span>
              <span style={{ color: 'rgba(240,244,255,0.4)', marginLeft: '12px' }}>Close: </span>
              <span style={{ color: '#f0f4ff' }}>{opp.expectedCompletionDate}</span>
            </div>

            {/* AI Recommendation */}
            <div style={{ padding: '12px', borderRadius: '10px', border: '1px solid rgba(212,160,23,0.2)', background: 'rgba(212,160,23,0.05)' }}>
              <div style={{ fontSize: '10px', fontWeight: 600, color: '#d4a017', marginBottom: '4px' }}>🤖 AI RECOMMENDATION</div>
              <div style={{ fontSize: '12px', color: 'rgba(240,244,255,0.7)' }}>{opp.aiRecommendation}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
