'use client';

import React from 'react';
import { SkillsAnalyticsService } from '@/lib/institutionOS';

export default function FacultySkillsIntelligencePage() {
  const analytics = SkillsAnalyticsService.getInstitutionalAnalytics();

  return (
    <div style={{ padding: '32px', minHeight: '100vh' }}>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: 700, color: '#f0f4ff', margin: 0 }}>
          <span style={{ color: '#d4a017' }}>◆</span> Faculty Skills Intelligence
        </h1>
        <p style={{ color: 'rgba(240,244,255,0.5)', marginTop: '4px', fontSize: '14px' }}>
          Class Competency Heatmaps, Skill Gaps & Industry Alignment
        </p>
      </div>

      {/* Summary Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '32px' }}>
        <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '16px', padding: '24px' }}>
          <div style={{ fontSize: '32px', fontWeight: 800, color: '#4ade80' }}>{analytics.graduateWorkforceReadinessPercent}%</div>
          <div style={{ fontSize: '12px', color: 'rgba(240,244,255,0.5)', marginTop: '4px' }}>Class Workforce Readiness</div>
        </div>
        <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '16px', padding: '24px' }}>
          <div style={{ fontSize: '32px', fontWeight: 800, color: '#d4a017' }}>{analytics.facultyCapabilityIndex}/100</div>
          <div style={{ fontSize: '12px', color: 'rgba(240,244,255,0.5)', marginTop: '4px' }}>Faculty Teaching Index</div>
        </div>
        <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '16px', padding: '24px' }}>
          <div style={{ fontSize: '32px', fontWeight: 800, color: '#4ade80' }}>{analytics.programmeAlignmentPercent}%</div>
          <div style={{ fontSize: '12px', color: 'rgba(240,244,255,0.5)', marginTop: '4px' }}>Industry Curriculum Alignment</div>
        </div>
      </div>

      {/* Top Competencies */}
      <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#d4a017', marginBottom: '16px' }}>CLASS TOP COMPETENCIES</h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px', marginBottom: '32px' }}>
        {analytics.topCompetencies.map((comp) => (
          <div key={comp.name} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '14px', padding: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
              <div>
                <h4 style={{ fontSize: '15px', fontWeight: 600, color: '#f0f4ff', margin: 0 }}>{comp.name}</h4>
                <div style={{ fontSize: '12px', color: 'rgba(240,244,255,0.5)', marginTop: '4px' }}>{comp.learnerCount} Proficient Learners</div>
              </div>
              <span style={{ fontSize: '20px', fontWeight: 800, color: '#4ade80' }}>{comp.avgScore}%</span>
            </div>
            <div style={{ width: '100%', height: '6px', background: 'rgba(255,255,255,0.06)', borderRadius: '3px' }}>
              <div style={{ width: `${comp.avgScore}%`, height: '100%', background: '#4ade80', borderRadius: '3px' }} />
            </div>
          </div>
        ))}
      </div>

      {/* Skill Gaps */}
      <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#d4a017', marginBottom: '16px' }}>IDENTIFIED SKILL GAPS & INTERVENTIONS</h3>
      <div style={{ display: 'grid', gap: '12px' }}>
        {analytics.skillGaps.map((gap) => (
          <div key={gap.name} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '14px', padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h4 style={{ fontSize: '15px', fontWeight: 600, color: '#f0f4ff', margin: '0 0 4px 0' }}>{gap.name}</h4>
              <div style={{ fontSize: '12px', color: 'rgba(240,244,255,0.5)' }}>Affects {gap.affectedLearnersPercent}% of cohort — Intervention required</div>
            </div>
            <span style={{ fontSize: '10px', padding: '4px 10px', borderRadius: '6px', background: gap.gapSeverity === 'HIGH' ? 'rgba(239,68,68,0.15)' : 'rgba(245,158,11,0.15)', color: gap.gapSeverity === 'HIGH' ? '#ef4444' : '#f59e0b', fontWeight: 600 }}>
              ● {gap.gapSeverity} SEVERITY
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
