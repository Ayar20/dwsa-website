'use client';

import React from 'react';
import { SkillsFrameworkService, SkillsAnalyticsService } from '@/lib/institutionOS';

export default function InstitutionSkillsIntelligencePage() {
  const categories = SkillsFrameworkService.getCategories();
  const analytics = SkillsAnalyticsService.getInstitutionalAnalytics();

  return (
    <div style={{ padding: '32px', minHeight: '100vh' }}>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: 700, color: '#f0f4ff', margin: 0 }}>
          <span style={{ color: '#d4a017' }}>◆</span> Institution Skills Intelligence
        </h1>
        <p style={{ color: 'rgba(240,244,255,0.5)', marginTop: '4px', fontSize: '14px' }}>
          Institutional Competency Heatmap & Programme Capacity Audit
        </p>
      </div>

      {/* Categories Grid */}
      <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#d4a017', marginBottom: '16px' }}>SKILLS TAXONOMY COVERAGE</h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '32px' }}>
        {categories.map((cat) => (
          <div key={cat.id} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '16px', padding: '20px' }}>
            <h4 style={{ fontSize: '15px', fontWeight: 600, color: '#f0f4ff', margin: '0 0 4px 0' }}>{cat.name}</h4>
            <div style={{ fontSize: '12px', color: 'rgba(240,244,255,0.5)', marginBottom: '12px' }}>{cat.description}</div>
            <div style={{ fontSize: '18px', fontWeight: 700, color: '#d4a017' }}>{cat.skillsCount} Defined Skills</div>
          </div>
        ))}
      </div>

      {/* Institution Capability Report */}
      <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(212,160,23,0.3)', borderRadius: '20px', padding: '28px' }}>
        <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#d4a017', margin: '0 0 16px 0' }}>INSTITUTIONAL COMPETENCY AUDIT</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
          <div>
            <div style={{ fontSize: '12px', color: 'rgba(240,244,255,0.5)' }}>Graduate Readiness Index</div>
            <div style={{ fontSize: '28px', fontWeight: 800, color: '#4ade80', marginTop: '4px' }}>{analytics.graduateWorkforceReadinessPercent}%</div>
          </div>
          <div>
            <div style={{ fontSize: '12px', color: 'rgba(240,244,255,0.5)' }}>Faculty Capability Score</div>
            <div style={{ fontSize: '28px', fontWeight: 800, color: '#d4a017', marginTop: '4px' }}>{analytics.facultyCapabilityIndex}/100</div>
          </div>
          <div>
            <div style={{ fontSize: '12px', color: 'rgba(240,244,255,0.5)' }}>Curriculum Coverage</div>
            <div style={{ fontSize: '28px', fontWeight: 800, color: '#4ade80', marginTop: '4px' }}>{analytics.programmeAlignmentPercent}%</div>
          </div>
        </div>
      </div>
    </div>
  );
}
