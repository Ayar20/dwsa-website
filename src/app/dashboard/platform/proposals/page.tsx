'use client';

import React, { useState } from 'react';
import { ProposalGenerationService, QuoteManagementService, ContractLifecycleService } from '@/lib/institutionOS';

export default function ProposalCentrePage() {
  const [activeTab, setActiveTab] = useState<'proposals' | 'quotes' | 'contracts'>('proposals');
  const proposals = ProposalGenerationService.getGeneratedProposals();
  const quotes = QuoteManagementService.getActiveQuotes();
  const contracts = ContractLifecycleService.getContracts();

  const tabs = [
    { key: 'proposals' as const, label: 'Proposals', icon: '📄' },
    { key: 'quotes' as const, label: 'Commercial Quotes', icon: '💰' },
    { key: 'contracts' as const, label: 'Contracts', icon: '📋' },
  ];

  const statusColors: Record<string, string> = { DRAFT: '#f59e0b', READY_FOR_REVIEW: '#6366f1', FINALIZED: '#4ade80', ACTIVE: '#4ade80', RENEWAL_DUE: '#f59e0b', PENDING_SIGNATURE: '#a855f7' };

  return (
    <div style={{ padding: '32px', minHeight: '100vh' }}>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: 700, color: '#f0f4ff', margin: 0 }}>
          <span style={{ color: '#d4a017' }}>◆</span> Proposal Centre
        </h1>
        <p style={{ color: 'rgba(240,244,255,0.5)', marginTop: '4px', fontSize: '14px' }}>
          AI-Generated Proposals, Commercial Quotes & Contract Lifecycle Management
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

      {activeTab === 'proposals' && (
        <>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '24px' }}>
            {[
              { label: 'Total Proposals', value: proposals.length, icon: '📄' },
              { label: 'Draft', value: proposals.filter(p => p.status === 'DRAFT').length, icon: '✏️' },
              { label: 'Ready for Review', value: proposals.filter(p => p.status === 'READY_FOR_REVIEW').length, icon: '👁️' },
              { label: 'Finalized', value: proposals.filter(p => p.status === 'FINALIZED').length, icon: '✅' },
            ].map((stat) => (
              <div key={stat.label} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '12px', padding: '16px' }}>
                <div style={{ fontSize: '20px', marginBottom: '4px' }}>{stat.icon}</div>
                <div style={{ fontSize: '22px', fontWeight: 700, color: '#d4a017' }}>{stat.value}</div>
                <div style={{ fontSize: '11px', color: 'rgba(240,244,255,0.5)' }}>{stat.label}</div>
              </div>
            ))}
          </div>
          <div style={{ display: 'grid', gap: '16px' }}>
            {proposals.map((p) => (
              <div key={p.id} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '14px', padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h3 style={{ fontSize: '15px', fontWeight: 600, color: '#f0f4ff', margin: '0 0 6px 0' }}>{p.title}</h3>
                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    <span style={{ fontSize: '10px', padding: '2px 8px', borderRadius: '6px', background: 'rgba(212,160,23,0.15)', color: '#d4a017' }}>{p.type}</span>
                    <span style={{ fontSize: '10px', padding: '2px 8px', borderRadius: '6px', background: 'rgba(255,255,255,0.05)', color: 'rgba(240,244,255,0.6)' }}>{p.estimatedPages} pages</span>
                    <span style={{ fontSize: '10px', color: 'rgba(240,244,255,0.4)' }}>Generated: {p.generatedDate}</span>
                  </div>
                </div>
                <span style={{ fontSize: '10px', fontWeight: 600, padding: '4px 12px', borderRadius: '8px', background: `${statusColors[p.status]}20`, color: statusColors[p.status], whiteSpace: 'nowrap' }}>{p.status.replace(/_/g, ' ')}</span>
              </div>
            ))}
          </div>
        </>
      )}

      {activeTab === 'quotes' && (
        <div style={{ display: 'grid', gap: '16px' }}>
          {quotes.map((q) => (
            <div key={q.id} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '14px', padding: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                <div>
                  <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#f0f4ff', margin: 0 }}>{q.institutionName}</h3>
                  <span style={{ fontSize: '12px', color: 'rgba(240,244,255,0.5)' }}>Quote #{q.quoteNumber}</span>
                </div>
                <span style={{ fontSize: '11px', padding: '4px 10px', borderRadius: '8px', background: 'rgba(212,160,23,0.15)', color: '#d4a017', fontWeight: 600 }}>{q.baseTier}</span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px', fontSize: '12px' }}>
                <div><span style={{ color: 'rgba(240,244,255,0.4)' }}>Annual License</span><div style={{ color: '#f0f4ff', fontWeight: 600 }}>${q.annualLicenseUSD.toLocaleString()}</div></div>
                <div><span style={{ color: 'rgba(240,244,255,0.4)' }}>Implementation</span><div style={{ color: '#f0f4ff', fontWeight: 600 }}>${q.implementationServicesUSD.toLocaleString()}</div></div>
                <div><span style={{ color: 'rgba(240,244,255,0.4)' }}>Custom Connectors</span><div style={{ color: '#f0f4ff', fontWeight: 600 }}>${q.customConnectorsUSD.toLocaleString()}</div></div>
                <div><span style={{ color: 'rgba(240,244,255,0.4)' }}>Total Contract Value</span><div style={{ color: '#d4a017', fontWeight: 700, fontSize: '16px' }}>${q.totalContractValueUSD.toLocaleString()}</div></div>
              </div>
              <div style={{ marginTop: '12px', fontSize: '11px', color: 'rgba(240,244,255,0.4)' }}>Valid Until: <span style={{ color: '#f0f4ff' }}>{q.validUntil}</span></div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'contracts' && (
        <div style={{ display: 'grid', gap: '16px' }}>
          {contracts.map((c) => (
            <div key={c.id} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '14px', padding: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#f0f4ff', margin: '0 0 6px 0' }}>{c.institutionName}</h3>
                <div style={{ fontSize: '12px', color: 'rgba(240,244,255,0.5)' }}>{c.contractNumber} — {c.startDate} to {c.endDate}</div>
                <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
                  <span style={{ fontSize: '10px', padding: '2px 8px', borderRadius: '6px', background: 'rgba(212,160,23,0.15)', color: '#d4a017' }}>{c.slaTier}</span>
                  <span style={{ fontSize: '10px', padding: '2px 8px', borderRadius: '6px', background: `${statusColors[c.status]}20`, color: statusColors[c.status] }}>{c.status.replace(/_/g, ' ')}</span>
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '22px', fontWeight: 700, color: '#d4a017' }}>${c.annualValueUSD.toLocaleString()}</div>
                <div style={{ fontSize: '11px', color: 'rgba(240,244,255,0.4)' }}>Annual Value</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
