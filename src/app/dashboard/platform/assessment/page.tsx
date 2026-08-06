'use client';

import React from 'react';
import { TransformationAssessmentService } from '@/lib/institutionOS';

export default function TransformationAssessmentPage() {
  const report = TransformationAssessmentService.getAssessmentReport('Sample University');

  const levelColors: Record<string, string> = { BASIC: '#ef4444', DEVELOPING: '#f59e0b', ADVANCED: '#6366f1', TRANSFORMED: '#4ade80' };

  return (
    <div style={{ padding: '32px', minHeight: '100vh' }}>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: 700, color: '#f0f4ff', margin: 0 }}>
          <span style={{ color: '#d4a017' }}>◆</span> Digital Transformation Assessment
        </h1>
        <p style={{ color: 'rgba(240,244,255,0.5)', marginTop: '4px', fontSize: '14px' }}>
          AI-Powered 12-Dimension Institutional Maturity Analysis
        </p>
      </div>

      {/* Overall Score */}
      <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '16px', padding: '32px', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '32px' }}>
        <div style={{ position: 'relative', width: '140px', height: '140px', flexShrink: 0 }}>
          <svg viewBox="0 0 120 120" style={{ width: '100%', height: '100%', transform: 'rotate(-90deg)' }}>
            <circle cx="60" cy="60" r="52" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="8" />
            <circle cx="60" cy="60" r="52" fill="none" stroke="#d4a017" strokeWidth="8" strokeDasharray={`${(report.overallMaturityScore / 100) * 327} 327`} strokeLinecap="round" />
          </svg>
          <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontSize: '32px', fontWeight: 800, color: '#d4a017' }}>{report.overallMaturityScore}</span>
            <span style={{ fontSize: '11px', color: 'rgba(240,244,255,0.4)' }}>/100</span>
          </div>
        </div>
        <div>
          <h2 style={{ fontSize: '20px', fontWeight: 700, color: '#f0f4ff', margin: '0 0 8px 0' }}>{report.institutionName}</h2>
          <span style={{ fontSize: '13px', padding: '4px 12px', borderRadius: '8px', background: 'rgba(212,160,23,0.15)', color: '#d4a017', fontWeight: 600 }}>{report.overallMaturityLevel}</span>
          <div style={{ marginTop: '12px', fontSize: '12px', color: 'rgba(240,244,255,0.5)' }}>
            Assessment Date: {report.assessmentDate} — Estimated Timeline: {report.estimatedTimelineMonths} months to full transformation
          </div>
        </div>
      </div>

      {/* 12 Dimensions Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '24px' }}>
        {report.dimensions.map((dim) => (
          <div key={dim.dimensionName} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '14px', padding: '20px' }}>
            <div style={{ fontSize: '13px', fontWeight: 600, color: '#f0f4ff', marginBottom: '12px' }}>{dim.dimensionName}</div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '8px' }}>
              <span style={{ fontSize: '24px', fontWeight: 700, color: levelColors[dim.maturityLevel] }}>{dim.score}</span>
              <span style={{ fontSize: '10px', padding: '2px 8px', borderRadius: '6px', background: `${levelColors[dim.maturityLevel]}20`, color: levelColors[dim.maturityLevel], fontWeight: 600 }}>{dim.maturityLevel}</span>
            </div>
            <div style={{ width: '100%', height: '5px', background: 'rgba(255,255,255,0.06)', borderRadius: '3px', marginBottom: '10px' }}>
              <div style={{ width: `${dim.score}%`, height: '100%', background: levelColors[dim.maturityLevel], borderRadius: '3px' }} />
            </div>
            <div style={{ fontSize: '11px', color: 'rgba(240,244,255,0.4)' }}>
              <span style={{ color: 'rgba(240,244,255,0.5)' }}>Key Gap:</span> {dim.keyGap}
            </div>
          </div>
        ))}
      </div>

      {/* Priority Recommendations */}
      <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(212,160,23,0.15)', borderRadius: '16px', padding: '24px' }}>
        <h3 style={{ fontSize: '14px', fontWeight: 600, color: '#d4a017', margin: '0 0 16px 0' }}>⚡ PRIORITY RECOMMENDATIONS</h3>
        {report.priorityRecommendations.map((rec, i) => (
          <div key={i} style={{ display: 'flex', gap: '12px', marginBottom: '12px', alignItems: 'flex-start' }}>
            <span style={{ width: '24px', height: '24px', borderRadius: '50%', background: 'rgba(212,160,23,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 700, color: '#d4a017', flexShrink: 0 }}>{i + 1}</span>
            <span style={{ fontSize: '13px', color: 'rgba(240,244,255,0.7)', lineHeight: '1.5' }}>{rec}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
