import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router'


const Protected = ({ children }) => {
    const user = useSelector(state => state.auth.user)
    const loading = useSelector(state => state.auth.loading)

    if (loading) {
        return (    
            <div style={{
                height: '100vh', width: '100vw',
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                background: 'var(--bg-base)', fontFamily: 'var(--font-body)'
            }}>
                {/* CSS animation inline for simplicity */}
                <style>
                    {`
                    @keyframes qd-pulse {
                        0% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(49, 184, 198, 0.4); }
                        70% { transform: scale(1); box-shadow: 0 0 0 15px rgba(49, 184, 198, 0); }
                        100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(49, 184, 198, 0); }
                    }
                    `}
                </style>
                <div style={{
                    width: '56px', height: '56px', borderRadius: '14px',
                    background: 'linear-gradient(135deg, #31b8c6, #1a7a85)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '26px', fontWeight: '800', color: '#001f23',
                    animation: 'qd-pulse 2s infinite',
                    marginBottom: '24px'
                }}>Q</div>
                <p style={{
                    color: 'var(--text-muted)', fontSize: '14px', fontWeight: '500',
                    letterSpacing: '0.05em', textTransform: 'uppercase'
                }}>
                    Loading QueryDesk...
                </p>
            </div>
        )
    }

    if (!user) {
        return <Navigate to="/login" replace />
    }


    return children
}

export default Protected