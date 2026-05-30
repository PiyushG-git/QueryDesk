import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router';

const CopyIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
  </svg>
);

const ExternalLinkIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
  </svg>
);

const CheckCircleIcon = () => (
  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#31b8c6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
  </svg>
);

const AgentSuccess = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [copied, setCopied] = useState(false);
    
    const urlPath = location.state?.url || '/';
    const fullUrl = `${window.location.origin}${urlPath}`;

    const handleCopy = () => {
        navigator.clipboard.writeText(fullUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    if (!location.state?.agent) {
        return (
            <div style={{ display: 'flex', height: '100vh', alignItems: 'center', justifyContent: 'center', color: 'var(--text-primary)', background: 'var(--bg-base)' }}>
                <p>No agent data found. <button onClick={() => navigate('/profile')} style={{ color: 'var(--primary)', background: 'transparent', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}>Go back</button></p>
            </div>
        );
    }

    return (
        <main className="app-main" style={{
            display: 'flex', height: '100vh', width: '100%',
            background: 'var(--bg-base)', color: 'var(--text-primary)',
            fontFamily: 'var(--font-body)', justifyContent: 'center', alignItems: 'center',
            padding: '20px'
        }}>
            <div style={{
                background: 'var(--bg-card)', borderRadius: '24px', border: '1px solid var(--border-subtle)',
                padding: '48px', boxShadow: '0 8px 32px rgba(0,0,0,0.4)', textAlign: 'center',
                maxWidth: '500px', width: '100%'
            }}>
                <div style={{ marginBottom: '24px' }}>
                    <CheckCircleIcon />
                </div>
                
                <h1 style={{ fontSize: '26px', fontWeight: '700', letterSpacing: '-0.02em', color: 'var(--text-primary)', marginBottom: '12px' }}>
                    Agent Created Successfully
                </h1>
                <p style={{ fontSize: '15px', color: 'var(--text-muted)', marginBottom: '32px' }}>
                    Your AI Seller Agent is now live and ready to answer questions and negotiate on your behalf.
                </p>

                <div style={{ marginBottom: '32px', textAlign: 'left' }}>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: 'var(--text-muted)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                        Public URL
                    </label>
                    <div style={{ 
                        display: 'flex', alignItems: 'center', gap: '8px',
                        background: 'var(--bg-card-high)', border: '1px solid var(--border-subtle)',
                        borderRadius: 'var(--radius-md)', padding: '4px'
                    }}>
                        <input 
                            readOnly 
                            value={fullUrl}
                            style={{
                                flex: 1, background: 'transparent', border: 'none', color: 'var(--primary)',
                                fontSize: '14px', padding: '8px 12px', outline: 'none',
                                whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'
                            }}
                        />
                        <button 
                            onClick={handleCopy}
                            style={{
                                display: 'flex', alignItems: 'center', gap: '6px',
                                padding: '8px 14px', background: 'var(--bg-sidebar)',
                                border: '1px solid var(--border-subtle)', borderRadius: '6px',
                                color: 'var(--text-primary)', fontSize: '13px', cursor: 'pointer',
                                transition: 'background 150ms'
                            }}
                            onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}
                            onMouseLeave={e => e.currentTarget.style.background = 'var(--bg-sidebar)'}
                        >
                            <CopyIcon /> {copied ? 'Copied!' : 'Copy'}
                        </button>
                    </div>
                </div>

                <div style={{ display: 'flex', gap: '16px' }}>
                    <button 
                        onClick={() => navigate('/profile')}
                        style={{
                            flex: 1, padding: '12px', background: 'transparent',
                            border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)',
                            color: 'var(--text-primary)', fontSize: '14px', fontWeight: '500',
                            cursor: 'pointer', transition: 'all 150ms'
                        }}
                        onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--text-muted)'; }}
                        onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border-subtle)'; }}
                    >
                        Back to Profile
                    </button>
                    <a 
                        href={urlPath}
                        target="_blank"
                        rel="noreferrer"
                        style={{
                            flex: 1, padding: '12px', background: 'var(--primary)',
                            border: 'none', borderRadius: 'var(--radius-md)',
                            color: '#001f23', fontSize: '14px', fontWeight: '700',
                            cursor: 'pointer', textDecoration: 'none',
                            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                            transition: 'all 150ms', boxShadow: '0 4px 14px rgba(49,184,198,0.3)'
                        }}
                    >
                        Open Agent <ExternalLinkIcon />
                    </a>
                </div>
            </div>
        </main>
    );
};

export default AgentSuccess;
