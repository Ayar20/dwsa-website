'use client';

import React, { useState } from 'react';
import { ImplementationManagementService, ConsultantManagementService, TransformationRoadmapService } from '@/lib/institutionOS';

export default function ImplementationCommandCentrePage() {
  const [activeTab, setActiveTab] = useState<'projects' | 'team' | 'roadmap'>('projects');
  const projects = ImplementationManagementService.getProjects();
  const consultants = ConsultantManagementService.getConsultants();
  const roadmap = TransformationRoadmapService.getRoadmap('Federal University of Tech, Akure');

  const tabs = [
    { key: 'projects' as const, label: 'Active Projects', icon: '🏗️' },
    { key: 'team' as const, label: 'Consultant Team', icon: '👥' },
    { key: 'roadmap' as const, label: 'Transformation Roadmap', icon: '🗺️' },
  ];

  const phaseStatusColors: Record<string, string> = { COMPLETED: '#4ade80', IN_PROGRESS: '#d4a017', UPCOMING: 'rgba(240,244,255,0.3)' };

  return (
    <div style={{ padding: '32px', minHeight: '100vh' }}>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: 700, color: '#f0f4ff', margin: 0 }}>
          <span style={{ color: '#d4a017' }}>◆</span> Implementation Command Centre
        </h1>
        <p style={{ color: 'rgba(240,244,255,0.5)', marginTop: '4px', fontSize: '14px' }}>
          Project Delivery, Team Management & Transformation Roadmap
        </p>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '24px' }}>
        {tabs.map((tab) => (
          <button key={tab.key} onClick={() => setActiveTab(tab.key)} style={{
            padding: '10px 20px', borderRadius: '10px', border: 'none', cursor: 'pointer', fontSize: '13px', fontWeight: 600,
            background: activeTab === tab.key ? 'rgba(212,160,23,0.15)' : 'rgba(255,255,255,0.03)',
            color: activeTab === tab.key ? '#d4a017' : 'rgba(240,244,255,0.5)',
            transition: 'all 0.2s ease',
          }}>
            {tab.icon} {tab.label}
          </button>
        ))}
      </div>

      {/* Active Projects */}
      {activeTab === 'projects' && (
        <div style={{ display: 'grid', gap: '20px' }}>
          {projects.map((project) => (
            <div key={project.id} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '16px', padding: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
                <div>
                  <h3 style={{ fontSize: '18px', fontWeight: 600, color: '#f0f4ff', margin: 0 }}>{project.institutionName}</h3>
                  <div style={{ display: 'flex', gap: '16px', marginTop: '8px', fontSize: '12px' }}>
                    <span style={{ color: 'rgba(240,244,255,0.5)' }}>PM: <span style={{ color: '#f0f4ff' }}>{project.projectManager}</span></span>
                    <span style={{ color: 'rgba(240,244,255,0.5)' }}>SA: <span style={{ color: '#f0f4ff' }}>{project.solutionArchitect}</span></span>
                  </div>
                  <div style={{ display: 'flex', gap: '16px', marginTop: '4px', fontSize: '12px' }}>
                    <span style={{ color: 'rgba(240,244,255,0.5)' }}>Lead: <span style={{ color: '#f0f4ff' }}>{project.leadEngineer}</span></span>
                    <span style={{ color: 'rgba(240,244,255,0.5)' }}>CSM: <span style={{ color: '#f0f4ff' }}>{project.csm}</span></span>
                  </div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '36px', fontWeight: 800, color: project.goLiveReadinessScore >= 90 ? '#4ade80' : '#d4a017' }}>{project.goLiveReadinessScore}</div>
                  <div style={{ fontSize: '10px', color: 'rgba(240,244,255,0.4)' }}>GO-LIVE READINESS</div>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '16px' }}>
                {[
                  { label: 'Overall', pct: project.overallProgressPercent },
                  { label: 'Configuration', pct: project.configurationProgressPercent },
                  { label: 'Data Migration', pct: project.dataMigrationPercent },
                  { label: 'Testing', pct: project.testingPercent },
                ].map((bar) => (
                  <div key={bar.label}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', marginBottom: '4px' }}>
                      <span style={{ color: 'rgba(240,244,255,0.5)' }}>{bar.label}</span>
                      <span style={{ color: '#d4a017', fontWeight: 600 }}>{bar.pct}%</span>
                    </div>
                    <div style={{ width: '100%', height: '6px', background: 'rgba(255,255,255,0.06)', borderRadius: '3px' }}>
                      <div style={{ width: `${bar.pct}%`, height: '100%', background: bar.pct >= 90 ? '#4ade80' : '#d4a017', borderRadius: '3px', transition: 'width 0.5s ease' }} />
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ display: 'flex', gap: '16px', fontSize: '12px' }}>
                <span style={{ color: 'rgba(240,244,255,0.4)' }}>Target Go-Live: <span style={{ color: '#f0f4ff', fontWeight: 600 }}>{project.targetGoLiveDate}</span></span>
                <span style={{ color: 'rgba(240,244,255,0.4)' }}>Open Risks: <span style={{ color: project.riskCount > 2 ? '#f59e0b' : '#4ade80', fontWeight: 600 }}>{project.riskCount}</span></span>
                <span style={{ color: 'rgba(240,244,255,0.4)' }}>Migration: <span style={{ color: '#f0f4ff' }}>{project.migrationStatus.replace(/_/g, ' ')}</span></span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Consultant Team */}
      {activeTab === 'team' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>
          {consultants.map((c) => (
            <div key={c.id} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '16px', padding: '24px' }}>
              <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#f0f4ff', margin: '0 0 4px 0' }}>{c.name}</h3>
              <span style={{ fontSize: '11px', padding: '2px 8px', borderRadius: '6px', background: 'rgba(212,160,23,0.15)', color: '#d4a017' }}>{c.role}</span>
              <div style={{ marginTop: '16px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', fontSize: '12px' }}>
                <div><span style={{ color: 'rgba(240,244,255,0.4)' }}>Location</span><div style={{ color: '#f0f4ff' }}>{c.location}</div></div>
                <div><span style={{ color: 'rgba(240,244,255,0.4)' }}>Assigned Accounts</span><div style={{ color: '#d4a017', fontWeight: 600 }}>{c.assignedAccountsCount}</div></div>
              </div>
              <div style={{ marginTop: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', marginBottom: '4px' }}>
                  <span style={{ color: 'rgba(240,244,255,0.4)' }}>Utilization Rate</span>
                  <span style={{ color: '#4ade80', fontWeight: 600 }}>{c.utilizationRatePercent}%</span>
                </div>
                <div style={{ width: '100%', height: '6px', background: 'rgba(255,255,255,0.06)', borderRadius: '3px' }}>
                  <div style={{ width: `${c.utilizationRatePercent}%`, height: '100%', background: '#4ade80', borderRadius: '3px' }} />
                </div>
              </div>
              <div style={{ marginTop: '12px', fontSize: '12px' }}>
                <span style={{ color: 'rgba(240,244,255,0.4)' }}>CSAT Rating: </span>
                <span style={{ color: '#d4a017', fontWeight: 600 }}>{'★'.repeat(Math.round(c.csatRating))} {c.csatRating}/5.0</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Transformation Roadmap */}
      {activeTab === 'roadmap' && (
        <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '16px', padding: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
            <div>
              <h3 style={{ fontSize: '18px', fontWeight: 600, color: '#f0f4ff', margin: 0 }}>{roadmap.institutionName}</h3>
              <span style={{ fontSize: '12px', color: 'rgba(240,244,255,0.5)' }}>Phase {roadmap.currentPhase} of {roadmap.totalPhases} — Est. Completion: {roadmap.estimatedCompletionDate}</span>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '28px', fontWeight: 800, color: '#d4a017' }}>{roadmap.overallProgressPercent}%</div>
              <div style={{ fontSize: '10px', color: 'rgba(240,244,255,0.4)' }}>OVERALL</div>
            </div>
          </div>

          <div style={{ width: '100%', height: '8px', background: 'rgba(255,255,255,0.06)', borderRadius: '4px', marginBottom: '32px' }}>
            <div style={{ width: `${roadmap.overallProgressPercent}%`, height: '100%', background: 'linear-gradient(90deg, #d4a017, #4ade80)', borderRadius: '4px' }} />
          </div>

          {roadmap.phases.map((phase) => (
            <div key={phase.phaseNumber} style={{ display: 'flex', gap: '16px', marginBottom: '24px', paddingLeft: '8px', borderLeft: `3px solid ${phaseStatusColors[phase.status]}` }}>
              <div style={{ minWidth: '32px', height: '32px', borderRadius: '50%', background: `${phaseStatusColors[phase.status]}20`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', fontWeight: 700, color: phaseStatusColors[phase.status] }}>
                {phase.phaseNumber}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                  <h4 style={{ fontSize: '14px', fontWeight: 600, color: '#f0f4ff', margin: 0 }}>{phase.phaseName}</h4>
                  <span style={{ fontSize: '10px', padding: '2px 8px', borderRadius: '6px', background: `${phaseStatusColors[phase.status]}20`, color: phaseStatusColors[phase.status], fontWeight: 600 }}>{phase.status.replace(/_/g, ' ')}</span>
                </div>
                <p style={{ fontSize: '12px', color: 'rgba(240,244,255,0.5)', margin: '4px 0 8px 0' }}>{phase.description} — {phase.durationWeeks} weeks</p>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  {phase.deliverables.map((d, i) => (
                    <span key={i} style={{ fontSize: '10px', padding: '2px 8px', borderRadius: '6px', background: 'rgba(255,255,255,0.05)', color: 'rgba(240,244,255,0.6)' }}>✓ {d}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
