import React, { useState, useEffect } from 'react'
import { Link, useNavigate, Navigate } from 'react-router'
import { useSelector } from 'react-redux'
import { useAuth } from '../hook/useAuth'
import { useTheme } from '../../../context/ThemeContext'


/* ── Icons ───────────────────────────────────────────── */
const MailIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
    <polyline points="22,6 12,13 2,6"/>
  </svg>
)
const LockIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
    <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
  </svg>
)
const EyeIcon = ({ open }) => open ? (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
  </svg>
) : (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
    <line x1="1" y1="1" x2="23" y2="23"/>
  </svg>
)
const SunIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="5"/>
    <line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/>
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
    <line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/>
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
  </svg>
)
const MoonIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
  </svg>
)


const InputField = ({ id, label, type, value, onChange, placeholder, icon, rightSlot }) => (
  <div>
    <label htmlFor={id} style={{ display: 'block', fontSize: '13px', fontWeight: '500', color: 'var(--text-muted)', marginBottom: '6px' }}>
      {label}
    </label>
    <div style={{ position: 'relative' }}>
      <span style={{
        position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)',
        color: 'var(--text-faint)', pointerEvents: 'none',
      }}>{icon}</span>
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required
        style={{
          width: '100%', padding: '12px 42px 12px 40px',
          background: 'var(--bg-base)', border: '1px solid var(--border-muted)',
          borderRadius: 'var(--radius-md)', color: 'var(--text-primary)',
          fontSize: '14.5px', fontFamily: 'var(--font-body)', outline: 'none',
          transition: 'border-color 150ms, box-shadow 150ms',
        }}
        onFocus={e => { e.target.style.borderColor = 'var(--primary)'; e.target.style.boxShadow = '0 0 0 3px var(--primary-glow)' }}
        onBlur={e => { e.target.style.borderColor = 'var(--border-muted)'; e.target.style.boxShadow = 'none' }}
      />
      {rightSlot && (
        <span style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)' }}>
          {rightSlot}
        </span>
      )}
    </div>
  </div>
)


const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const user = useSelector(state => state.auth.user)
  const loading = useSelector(state => state.auth.loading)
  const error = useSelector(state => state.auth.error)
  const { handleLogin, clearError } = useAuth()
  const { theme, toggleTheme } = useTheme()
  const navigate = useNavigate()

  useEffect(() => {
    clearError()
  }, [])

  if (!loading && user) {
    return <Navigate to="/" replace />
  }

  const submitForm = async (event) => {
    event.preventDefault()
    setIsSubmitting(true)
    try {
      await handleLogin({ email, password })
      navigate('/')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: 'var(--bg-base)', fontFamily: 'var(--font-body)', padding: '24px',
      position: 'relative',
    }}>

      {/* Theme toggle */}
      <button
        id="theme-toggle-login"
        onClick={toggleTheme}
        title="Toggle theme"
        style={{
          position: 'absolute', top: '20px', right: '20px',
          width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center',
          background: 'var(--bg-card)', border: '1px solid var(--border-subtle)',
          borderRadius: 'var(--radius-sm)', cursor: 'pointer', color: 'var(--text-muted)',
        }}
      >
        {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
      </button>

      {/* Card */}
      <div style={{
        width: '100%', maxWidth: '420px',
        background: 'var(--bg-card)', border: '1px solid var(--border-subtle)',
        borderRadius: '20px', padding: '40px 36px',
        boxShadow: '0 24px 64px rgba(0,0,0,0.4)',
        backdropFilter: 'blur(12px)',
      }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{
            width: '48px', height: '48px', borderRadius: '12px',
            background: 'linear-gradient(135deg, #31b8c6, #1a7a85)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '22px', fontWeight: '800', color: '#001f23',
            margin: '0 auto 16px',
          }}>Q</div>
          <h1 style={{ fontSize: '24px', fontWeight: '700', letterSpacing: '-0.03em', color: 'var(--text-primary)', marginBottom: '6px' }}>
            Welcome back
          </h1>
          <p style={{ fontSize: '14px', color: 'var(--text-muted)' }}>Sign in to continue to QueryDesk</p>
        </div>

        {error && (
          <div style={{
            background: 'rgba(255, 60, 60, 0.1)', border: '1px solid rgba(255, 60, 60, 0.3)',
            color: '#ff6b6b', padding: '12px', borderRadius: 'var(--radius-md)',
            fontSize: '13px', fontWeight: '500', marginBottom: '16px', textAlign: 'center'
          }}>
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={submitForm} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <InputField
            id="email"
            label="Email"
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="you@example.com"
            icon={<MailIcon />}
          />

          <InputField
            id="password"
            label="Password"
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Enter your password"
            icon={<LockIcon />}
            rightSlot={
              <button
                type="button"
                onClick={() => setShowPassword(s => !s)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-faint)', display: 'flex', alignItems: 'center', padding: '4px' }}
              >
                <EyeIcon open={showPassword} />
              </button>
            }
          />

          <div style={{ textAlign: 'right', marginTop: '-8px' }}>
            <a href="#" style={{ fontSize: '13px', color: 'var(--primary)', textDecoration: 'none', fontWeight: '500' }}>
              Forgot password?
            </a>
          </div>

          <button
            id="login-submit-btn"
            type="submit"
            disabled={isSubmitting || loading}
            className="btn-primary"
            style={{
              width: '100%', padding: '13px',
              fontSize: '15px', fontWeight: '600',
              borderRadius: 'var(--radius-md)', marginTop: '4px',
              boxShadow: '0 0 20px var(--primary-glow)',
            }}
          >
            {isSubmitting ? 'Signing in…' : 'Sign In'}
          </button>
        </form>


        {/* Footer */}
        <p style={{ textAlign: 'center', fontSize: '13.5px', color: 'var(--text-muted)', marginTop: '28px' }}>
          Don&apos;t have an account?{' '}
          <Link to="/register" style={{ color: 'var(--primary)', fontWeight: '600', textDecoration: 'none' }}>
            Register
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Login