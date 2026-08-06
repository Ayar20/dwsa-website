'use client';

import React, { useState } from 'react';
import { SalesAnalyticsService, ExecutiveForecastService } from '@/lib/institutionOS';

export default function SalesIntelligencePage() {
  const [activeTab, setActiveTab] = useState<'kpis' | 'forecast' | 'trends'>('kpis');
  const kpis = SalesAnalyticsService.getKPIs();
  const forecast = ExecutiveForecastService.getCurrentForecast();
  const trends = ExecutiveForecastService.getQuarterlyTrend();

  const tabs = [
    { key: 'kpis' as const, label: 'Sales KPIs', icon: '📈' },
    { key: 'forecast' as const, label: 'Executive Forecast', icon: '🎯' },
    { key: 'trends' as const, label: 'Revenue Trends', icon: '📊' },
  ];

  const formatValue = (val: number, unit: string) => {
    if (unit === 'USD') return val >= 1000000 ? `$${(val / 1000000).toFixed(1)}M` : `$${(val / 1000).toFixed(0)}K`;
    if (unit === '%') return `${val}%`;
    if (unit === 'x') return `${val}x`;
    if (unit === 'days') return `${val} days`;
    return val.toString();
  };

  const trendIcons: Record<string, { icon: string; color: string }> = {
    UP: { icon: '▲', color: '#4ade80' },
    DOWN: { icon: '▼', color: '#ef4444' },
    STABLE: { icon: '►', color: 'rgba(240,244,255,0.5)' },
  };

  return (
    <div style={{ padding: '32px', minHeight: '100vh' }}>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: 700, color: '#f0f4ff', margin: 0 }}>
          <span style={{ color: '#d4a017' }}>◆</span> Sales Intelligence
        </h1>
        <p style={{ color: 'rgba(240,244,255,0.5)', marginTop: '4px', fontSize: '14px' }}>
          Revenue Analytics, Executive Forecasting & Performance Intelligence
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

      {activeTab === 'kpis' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
          {kpis.map((kpi) => {
            const pct = Math.min((kpi.currentValue / kpi.targetValue) * 100, 100);
            return (
              <div key={kpi.metricName} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '14px', padding: '20px' }}>
                <div style={{ fontSize: '11px', color: 'rgba(240,244,255,0.5)', marginBottom: '8px' }}>{kpi.metricName}</div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '4px' }}>
                  <span style={{ fontSize: '24px', fontWeight: 700, color: '#d4a017' }}>{formatValue(kpi.currentValue, kpi.unit)}</span>
                  <span style={{ fontSize: '12px', color: trendIcons[kpi.trend].color }}>
                    {trendIcons[kpi.trend].icon} {kpi.changePercent > 0 ? '+' : ''}{kpi.changePercent}%
                  </span>
                </div>
                <div style={{ fontSize: '11px', color: 'rgba(240,244,255,0.4)', marginBottom: '8px' }}>Target: {formatValue(kpi.targetValue, kpi.unit)}</div>
                <div style={{ width: '100%', height: '5px', background: 'rgba(255,255,255,0.06)', borderRadius: '3px' }}>
                  <div style={{ width: `${pct}%`, height: '100%', background: pct >= 90 ? '#4ade80' : '#d4a017', borderRadius: '3px' }} />
                </div>
              </div>
            );
          })}
        </div>
      )}

      {activeTab === 'forecast' && (
        <div style={{ display: 'grid', gap: '20px' }}>
          <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '16px', padding: '24px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#d4a017', margin: '0 0 20px 0' }}>📊 {forecast.quarter} Executive Forecast</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '16px', marginBottom: '24px' }}>
              {[
                { label: 'Total Pipeline', value: `$${(forecast.totalPipelineValueUSD / 1000000).toFixed(1)}M` },
                { label: 'Weighted Forecast', value: `$${(forecast.weightedForecastUSD / 1000000).toFixed(1)}M` },
                { label: 'Best Case', value: `$${(forecast.bestCaseUSD / 1000000).toFixed(1)}M` },
                { label: 'Committed', value: `$${(forecast.committedUSD / 1000000).toFixed(1)}M` },
                { label: 'Closed Won', value: `$${(forecast.closedWonUSD / 1000000).toFixed(1)}M` },
              ].map((item) => (
                <div key={item.label} style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '22px', fontWeight: 700, color: '#f0f4ff' }}>{item.value}</div>
                  <div style={{ fontSize: '11px', color: 'rgba(240,244,255,0.4)', marginTop: '4px' }}>{item.label}</div>
                </div>
              ))}
            </div>

            <div style={{ marginBottom: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '6px' }}>
                <span style={{ color: 'rgba(240,244,255,0.5)' }}>Quarterly Target Attainment</span>
                <span style={{ color: '#d4a017', fontWeight: 600 }}>{forecast.attainmentPercent}% of ${(forecast.quarterlyTargetUSD / 1000000).toFixed(1)}M</span>
              </div>
              <div style={{ width: '100%', height: '10px', background: 'rgba(255,255,255,0.06)', borderRadius: '5px' }}>
                <div style={{ width: `${forecast.attainmentPercent}%`, height: '100%', background: 'linear-gradient(90deg, #d4a017, #4ade80)', borderRadius: '5px' }} />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginTop: '20px' }}>
              <div style={{ background: 'rgba(255,255,255,0.03)', borderRadius: '10px', padding: '16px', textAlign: 'center' }}>
                <div style={{ fontSize: '20px', fontWeight: 700, color: '#f0f4ff' }}>{forecast.newLogosAchieved}/{forecast.newLogosTarget}</div>
                <div style={{ fontSize: '11px', color: 'rgba(240,244,255,0.4)' }}>New Logos</div>
              </div>
              <div style={{ background: 'rgba(255,255,255,0.03)', borderRadius: '10px', padding: '16px', textAlign: 'center' }}>
                <div style={{ fontSize: '20px', fontWeight: 700, color: '#4ade80' }}>${(forecast.expansionRevenueUSD / 1000).toFixed(0)}K</div>
                <div style={{ fontSize: '11px', color: 'rgba(240,244,255,0.4)' }}>Expansion Revenue</div>
              </div>
              <div style={{ background: 'rgba(255,255,255,0.03)', borderRadius: '10px', padding: '16px', textAlign: 'center' }}>
                <div style={{ fontSize: '20px', fontWeight: 700, color: '#4ade80' }}>${(forecast.renewalRevenueUSD / 1000).toFixed(0)}K</div>
                <div style={{ fontSize: '11px', color: 'rgba(240,244,255,0.4)' }}>Renewal Revenue</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'trends' && (
        <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '16px', padding: '24px' }}>
          <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#d4a017', margin: '0 0 20px 0' }}>📈 Quarterly Revenue Growth</h3>
          {trends.map((t, i) => {
            const maxRev = Math.max(...trends.map(tr => tr.revenueUSD));
            const barWidth = (t.revenueUSD / maxRev) * 100;
            return (
              <div key={t.quarter} style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '12px' }}>
                <div style={{ width: '160px', fontSize: '13px', color: i === trends.length - 1 ? '#d4a017' : 'rgba(240,244,255,0.7)', fontWeight: i === trends.length - 1 ? 600 : 400 }}>{t.quarter}</div>
                <div style={{ flex: 1, height: '24px', background: 'rgba(255,255,255,0.04)', borderRadius: '6px', overflow: 'hidden' }}>
                  <div style={{ width: `${barWidth}%`, height: '100%', background: i === trends.length - 1 ? 'linear-gradient(90deg, #d4a017, #4ade80)' : 'rgba(212,160,23,0.4)', borderRadius: '6px', display: 'flex', alignItems: 'center', paddingLeft: '8px' }}>
                    <span style={{ fontSize: '11px', fontWeight: 600, color: '#f0f4ff' }}>${(t.revenueUSD / 1000000).toFixed(1)}M</span>
                  </div>
                </div>
                <div style={{ width: '80px', fontSize: '12px', color: 'rgba(240,244,255,0.5)', textAlign: 'right' }}>{t.dealsWon} deals</div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
