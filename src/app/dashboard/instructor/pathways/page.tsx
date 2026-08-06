'use client';

import React from 'react';
import { IndustryCompetencyService, SkillsFrameworkService } from '@/lib/institutionOS';

export default function ProgrammeSkillsMappingPage() {
  const frameworks = IndustryCompetencyService.getFrameworks();
  const skills = SkillsFrameworkService.getSkills();

  return (
    <div style={{ padding: '32px', minHeight: '100vh' }}>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: 700, color: '#f0f4ff', margin: 0 }}>
          <span style={{ color: '#d4a017' }}>◆</span> Programme Skills Mapping
        </h1>
        <p style={{ color: 'rgba(240,244,255,0.5)', marginTop: '4px', fontSize: '14px' }}>
          Curriculum Competency Matrix & Industry Standard Mapping
        </p>
      </div>

      {/* Framework Mapping List */}
      <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#d4a017', marginBottom: '16px' }}>INDUSTRY COMPETENCY STANDARDS</h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px', marginBottom: '32px' }}>
        {frameworks.map((fw) => (
          <div key={fw.id} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '16px', padding: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
              <h4 style={{ fontSize: '16px', fontWeight: 600, color: '#f0f4ff', margin: 0 }}>{fw.frameworkName}</h4>
              <span style={{ fontSize: '10px', padding: '2px 8px', borderRadius: '6px', background: 'rgba(212,160,23,0.15)', color: '#d4a017', fontWeight: 600 }}>{fw.version}</span>
            </div>
            <div style={{ fontSize: '12px', color: 'rgba(240,244,255,0.5)', marginBottom: '12px' }}>Sector: {fw.industrySector} — {fw.governingBody}</div>
            <div style={{ fontSize: '12px', color: '#4ade80', fontWeight: 600 }}>✓ {fw.coreCompetenciesCount} Mapped Competencies</div>
          </div>
        ))}
      </div>

      {/* Mapped Skills Matrix */}
      <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#d4a017', marginBottom: '16px' }}>LESSON & ASSIGNMENT COMPETENCY MATRIX</h3>
      <div style={{ display: 'grid', gap: '12px' }}>
        {skills.map((sk) => (
          <div key={sk.id} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '14px', padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h4 style={{ fontSize: '15px', fontWeight: 600, color: '#f0f4ff', margin: '0 0 4px 0' }}>{sk.name}</h4>
              <div style={{ fontSize: '12px', color: 'rgba(240,244,255,0.5)' }}>Category: {sk.category} — {sk.description}</div>
            </div>
            <span style={{ fontSize: '10px', padding: '4px 10px', borderRadius: '6px', background: 'rgba(74,222,128,0.15)', color: '#4ade80', fontWeight: 600 }}>100% COVERED</span>
          </div>
        ))}
      </div>
    </div>
  );
}
