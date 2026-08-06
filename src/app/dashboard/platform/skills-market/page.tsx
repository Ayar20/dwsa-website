'use client';

import React from 'react';
import { IndustryCompetencyService, SkillsFrameworkService } from '@/lib/institutionOS';

export default function SkillsMarketplacePage() {
  const frameworks = IndustryCompetencyService.getFrameworks();
  const categories = SkillsFrameworkService.getCategories();

  return (
    <div style={{ padding: '32px', minHeight: '100vh' }}>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: 700, color: '#f0f4ff', margin: 0 }}>
          <span style={{ color: '#d4a017' }}>◆</span> Skills Marketplace
        </h1>
        <p style={{ color: 'rgba(240,244,255,0.5)', marginTop: '4px', fontSize: '14px' }}>
          Industry Frameworks, Certification Providers & Learning Partner Ecosystem
        </p>
      </div>

      {/* Featured Frameworks */}
      <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#d4a017', marginBottom: '16px' }}>FEATURED COMPETENCY FRAMEWORKS</h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px', marginBottom: '32px' }}>
        {frameworks.map((fw) => (
          <div key={fw.id} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '16px', padding: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
              <h4 style={{ fontSize: '16px', fontWeight: 600, color: '#f0f4ff', margin: 0 }}>{fw.frameworkName}</h4>
              <span style={{ fontSize: '10px', padding: '3px 8px', borderRadius: '6px', background: 'rgba(212,160,23,0.15)', color: '#d4a017', fontWeight: 600 }}>{fw.version}</span>
            </div>
            <div style={{ fontSize: '12px', color: 'rgba(240,244,255,0.5)', marginBottom: '12px' }}>Governing Body: {fw.governingBody} — Sector: {fw.industrySector}</div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(255,255,255,0.04)', paddingTop: '12px' }}>
              <span style={{ fontSize: '12px', color: '#4ade80', fontWeight: 600 }}>{fw.coreCompetenciesCount} Competencies</span>
              <button style={{ padding: '6px 14px', borderRadius: '8px', background: 'rgba(212,160,23,0.15)', border: 'none', color: '#d4a017', fontSize: '11px', fontWeight: 600, cursor: 'pointer' }}>
                Import Framework →
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Skills Categories Marketplace */}
      <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#d4a017', marginBottom: '16px' }}>SKILLS TAXONOMY PACKS</h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
        {categories.map((cat) => (
          <div key={cat.id} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '14px', padding: '20px' }}>
            <h4 style={{ fontSize: '15px', fontWeight: 600, color: '#f0f4ff', margin: '0 0 4px 0' }}>{cat.name}</h4>
            <p style={{ fontSize: '11px', color: 'rgba(240,244,255,0.5)', margin: '0 0 12px 0' }}>{cat.description}</p>
            <div style={{ fontSize: '16px', fontWeight: 700, color: '#d4a017' }}>{cat.skillsCount} Skills Included</div>
          </div>
        ))}
      </div>
    </div>
  );
}
