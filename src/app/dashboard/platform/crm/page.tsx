'use client';

import React, { useState } from 'react';
import { EnterpriseCRMService } from '@/lib/institutionOS';

export default function EnterpriseCRMPage() {
  const accounts = EnterpriseCRMService.getAllAccounts();
  const [selectedAccount, setSelectedAccount] = useState<string | null>(null);

  const totalPipelineValue = accounts.reduce((s, a) => s + a.expectedValueUSD, 0);
  const activeCustomers = accounts.filter(a => a.currentStatus === 'ACTIVE_CUSTOMER').length;
  const implementing = accounts.filter(a => a.currentStatus === 'IMPLEMENTATION').length;

  const statusColors: Record<string, string> = {
    PROSPECT: '#f59e0b',
    ACTIVE_CUSTOMER: '#4ade80',
    IMPLEMENTATION: '#6366f1',
    PILOT: '#a855f7',
    EXPANSION: '#d4a017',
  };

  return (
    <div style={{ padding: '32px', minHeight: '100vh' }}>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: 700, color: '#f0f4ff', margin: 0 }}>
          <span style={{ color: '#d4a017' }}>◆</span> Enterprise CRM
        </h1>
        <p style={{ color: 'rgba(240,244,255,0.5)', marginTop: '4px', fontSize: '14px' }}>
          Institution Account Management & Relationship Intelligence
        </p>
      </div>

      {/* Summary Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '32px' }}>
        {[
          { label: 'Total Accounts', value: accounts.length.toString(), icon: '🏛️' },
          { label: 'Active Customers', value: activeCustomers.toString(), icon: '✅' },
          { label: 'In Implementation', value: implementing.toString(), icon: '⚙️' },
          { label: 'Pipeline Value', value: `$${(totalPipelineValue / 1000000).toFixed(2)}M`, icon: '💰' },
        ].map((stat) => (
          <div key={stat.label} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '12px', padding: '20px' }}>
            <div style={{ fontSize: '24px', marginBottom: '8px' }}>{stat.icon}</div>
            <div style={{ fontSize: '24px', fontWeight: 700, color: '#d4a017' }}>{stat.value}</div>
            <div style={{ fontSize: '12px', color: 'rgba(240,244,255,0.5)', marginTop: '4px' }}>{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Account Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>
        {accounts.map((account) => (
          <div
            key={account.id}
            onClick={() => setSelectedAccount(selectedAccount === account.id ? null : account.id)}
            style={{
              background: 'rgba(255,255,255,0.03)',
              border: `1px solid ${selectedAccount === account.id ? '#d4a017' : 'rgba(255,255,255,0.06)'}`,
              borderRadius: '16px',
              padding: '24px',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
              <div>
                <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#f0f4ff', margin: 0 }}>{account.name}</h3>
                <div style={{ display: 'flex', gap: '8px', marginTop: '8px', flexWrap: 'wrap' }}>
                  <span style={{ fontSize: '11px', padding: '2px 8px', borderRadius: '6px', background: 'rgba(212,160,23,0.15)', color: '#d4a017' }}>{account.type}</span>
                  <span style={{ fontSize: '11px', padding: '2px 8px', borderRadius: '6px', background: 'rgba(255,255,255,0.05)', color: 'rgba(240,244,255,0.7)' }}>{account.country}</span>
                  <span style={{ fontSize: '11px', padding: '2px 8px', borderRadius: '6px', background: 'rgba(255,255,255,0.05)', color: 'rgba(240,244,255,0.7)' }}>{account.stateProvince}</span>
                </div>
              </div>
              <span style={{
                fontSize: '10px',
                fontWeight: 600,
                padding: '4px 10px',
                borderRadius: '8px',
                background: `${statusColors[account.currentStatus]}20`,
                color: statusColors[account.currentStatus],
                whiteSpace: 'nowrap',
              }}>
                {account.currentStatus.replace(/_/g, ' ')}
              </span>
            </div>

            {/* Health Score */}
            <div style={{ marginBottom: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '4px' }}>
                <span style={{ color: 'rgba(240,244,255,0.5)' }}>Health Score</span>
                <span style={{ color: '#4ade80', fontWeight: 600 }}>{account.healthScore}%</span>
              </div>
              <div style={{ width: '100%', height: '6px', background: 'rgba(255,255,255,0.06)', borderRadius: '3px' }}>
                <div style={{ width: `${account.healthScore}%`, height: '100%', background: 'linear-gradient(90deg, #4ade80, #22c55e)', borderRadius: '3px' }} />
              </div>
            </div>

            {/* Details */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', fontSize: '12px', marginBottom: '12px' }}>
              <div>
                <span style={{ color: 'rgba(240,244,255,0.4)' }}>Expected Value</span>
                <div style={{ color: '#d4a017', fontWeight: 600 }}>${account.expectedValueUSD.toLocaleString()}</div>
              </div>
              <div>
                <span style={{ color: 'rgba(240,244,255,0.4)' }}>Support Status</span>
                <div style={{ color: account.supportStatus === 'HEALTHY' ? '#4ade80' : '#f59e0b', fontWeight: 600 }}>
                  {account.supportStatus === 'HEALTHY' ? '● ' : '⚠ '}{account.supportStatus.replace(/_/g, ' ')}
                </div>
              </div>
              <div style={{ gridColumn: '1 / -1' }}>
                <span style={{ color: 'rgba(240,244,255,0.4)' }}>Account Manager</span>
                <div style={{ color: '#f0f4ff' }}>{account.assignedAccountManager}</div>
              </div>
            </div>

            {/* Notes Timeline */}
            {selectedAccount === account.id && (
              <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '12px', marginTop: '8px' }}>
                <div style={{ fontSize: '11px', fontWeight: 600, color: '#d4a017', marginBottom: '8px' }}>ACTIVITY TIMELINE</div>
                {account.notesTimeline.map((note, i) => (
                  <div key={i} style={{ marginBottom: '8px', paddingLeft: '12px', borderLeft: '2px solid rgba(212,160,23,0.3)' }}>
                    <div style={{ fontSize: '10px', color: 'rgba(240,244,255,0.4)' }}>{note.date} — {note.author}</div>
                    <div style={{ fontSize: '12px', color: 'rgba(240,244,255,0.7)', marginTop: '2px' }}>{note.note}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
