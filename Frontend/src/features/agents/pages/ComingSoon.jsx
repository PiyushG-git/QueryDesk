import React from 'react';
import { useNavigate, useLocation } from 'react-router';

const ArrowLeftIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/>
  </svg>
);

const ComingSoon = () => {
    const navigate = useNavigate();
    const location = useLocation();

    // Determine content based on URL path
    const isAppointment = location.pathname.includes('appointment');
    
    const title = isAppointment ? "Appointment Agent Coming Soon" : "Customer Support Agent Coming Soon";
    const description = isAppointment 
        ? "Manage bookings, calendar scheduling, and appointment requests using AI."
        : "Provide automated customer support and business assistance 24/7.";

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
                maxWidth: '500px', width: '100%', position: 'relative'
            }}>
                <button
                    onClick={() => navigate('/profile')}
                    style={{
                        position: 'absolute', top: '24px', left: '24px',
                        display: 'inline-flex', alignItems: 'center', gap: '8px',
                        padding: '6px 12px 6px 8px', background: 'transparent',
                        border: '1px solid transparent', borderRadius: 'var(--radius-md)',
                        cursor: 'pointer', color: 'var(--text-muted)', fontSize: '13px', fontWeight: '500',
                        transition: 'all 150ms',
                    }}
                    onMouseEnter={e => { e.currentTarget.style.background = 'var(--bg-card-high)'; e.currentTarget.style.borderColor = 'var(--border-subtle)'; e.currentTarget.style.color = 'var(--text-primary)' }}
                    onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = 'transparent'; e.currentTarget.style.color = 'var(--text-muted)' }}
                >
                    <ArrowLeftIcon /> Back
                </button>

                <div style={{
                    width: '64px', height: '64px', borderRadius: '16px', margin: '32px auto 24px',
                    background: 'rgba(49,184,198,0.1)', color: 'var(--primary)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    border: '1px solid rgba(49,184,198,0.2)'
                }}>
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
                    </svg>
                </div>
                
                <h1 style={{ fontSize: '24px', fontWeight: '700', letterSpacing: '-0.02em', color: 'var(--text-primary)', marginBottom: '12px' }}>
                    {title}
                </h1>
                <p style={{ fontSize: '15px', color: 'var(--text-muted)', marginBottom: '32px', lineHeight: '1.5' }}>
                    {description}
                </p>

                <button 
                    onClick={() => alert("You're on the list! We'll notify you when this is ready.")}
                    style={{
                        width: '100%', padding: '14px', background: 'var(--primary)',
                        border: 'none', borderRadius: 'var(--radius-md)',
                        color: '#001f23', fontSize: '15px', fontWeight: '700',
                        cursor: 'pointer', transition: 'all 150ms',
                        boxShadow: '0 4px 14px rgba(49,184,198,0.3)'
                    }}
                >
                    Notify Me
                </button>
            </div>
        </main>
    );
};

export default ComingSoon;
