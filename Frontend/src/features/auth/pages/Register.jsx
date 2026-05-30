import React, { useState, useEffect } from 'react'
import { Link } from 'react-router'
import { useAuth } from '../hook/useAuth'
import { useTheme } from '../../../context/ThemeContext'


/* ── Icons ───────────────────────────────────────────── */
const UserIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
  </svg>
)
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
const ShieldIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
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
const CheckIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"/>
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


const Register = () => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const { handleRegister, clearError } = useAuth()
  const { theme, toggleTheme } = useTheme()

  useEffect(() => {
    clearError()
  }, [])

  const submitForm = async (event) => {
    event.preventDefault()
    setError('')

    if (password !== confirmPassword) {
      setError('Passwords do not match.')
      return
    }

    setIsSubmitting(true)
    try {
      await handleRegister({ username, email, password })
      setSuccess(true)
    } catch (err) {
      setError('Registration failed. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (success) {
    return (
      <div style={{
        minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: 'var(--bg-base)', fontFamily: 'var(--font-body)', padding: '24px',
      }}>
        <div style={{
          maxWidth: '420px', width: '100%', textAlign: 'center',
          background: 'var(--bg-card)', border: '1px solid var(--border-subtle)',
          borderRadius: '20px', padding: '48px 36px',
          boxShadow: '0 24px 64px rgba(0,0,0,0.4)',
        }}>
          <div style={{
            width: '56px', height: '56px', borderRadius: '50%',
            background: 'rgba(49,184,198,0.15)', border: '1px solid var(--primary)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: 'var(--primary)', margin: '0 auto 20px',
          }}>
            <CheckIcon />
          </div>
          <h2 style={{ fontSize: '22px', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '10px' }}>Check your email</h2>
          <p style={{ fontSize: '14px', color: 'var(--text-muted)', lineHeight: '1.6', marginBottom: '24px' }}>
            We sent a verification link to <strong style={{ color: 'var(--text-primary)' }}>{email}</strong>. Please verify your email to log in.
          </p>
          <Link to="/login" style={{
            display: 'inline-block', padding: '11px 28px',
            background: 'var(--primary)', color: '#001f23',
            borderRadius: 'var(--radius-md)', fontSize: '14px', fontWeight: '600',
            textDecoration: 'none',
          }}>Go to Login</Link>
        </div>
      </div>
    )
  }

  return (
    <div style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: 'var(--bg-base)', fontFamily: 'var(--font-body)', padding: '24px',
      position: 'relative',
    }}>

      {/* Theme toggle */}
      <button
        id="theme-toggle-register"
        onClick={toggleTheme}
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
        width: '100%', maxWidth: '440px',
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
            Create account
          </h1>
          <p style={{ fontSize: '14px', color: 'var(--text-muted)' }}>Join QueryDesk and start exploring</p>
        </div>

        {/* Error */}
        {error && (
          <div style={{
            background: 'rgba(255, 80, 80, 0.1)', border: '1px solid rgba(255, 80, 80, 0.3)',
            borderRadius: 'var(--radius-md)', padding: '10px 14px',
            fontSize: '13.5px', color: '#ff6b6b', marginBottom: '16px',
          }}>
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={submitForm} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <InputField
            id="username"
            label="Username"
            type="text"
            value={username}
            onChange={e => setUsername(e.target.value)}
            placeholder="Choose a username"
            icon={<UserIcon />}
          />
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
            placeholder="Create a password"
            icon={<LockIcon />}
            rightSlot={
              <button type="button" onClick={() => setShowPassword(s => !s)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-faint)', display: 'flex', alignItems: 'center', padding: '4px' }}>
                <EyeIcon open={showPassword} />
              </button>
            }
          />
          <InputField
            id="confirm-password"
            label="Confirm Password"
            type={showConfirm ? 'text' : 'password'}
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
            placeholder="Repeat your password"
            icon={<ShieldIcon />}
            rightSlot={
              <button type="button" onClick={() => setShowConfirm(s => !s)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-faint)', display: 'flex', alignItems: 'center', padding: '4px' }}>
                <EyeIcon open={showConfirm} />
              </button>
            }
          />

          <button
            id="register-submit-btn"
            type="submit"
            disabled={isSubmitting}
            className="btn-primary"
            style={{
              width: '100%', padding: '13px',
              fontSize: '15px', fontWeight: '600',
              borderRadius: 'var(--radius-md)', marginTop: '6px',
              boxShadow: '0 0 20px var(--primary-glow)',
            }}
          >
            {isSubmitting ? 'Creating account…' : 'Create Account'}
          </button>
        </form>

        {/* Footer */}
        <p style={{ textAlign: 'center', fontSize: '13.5px', color: 'var(--text-muted)', marginTop: '28px' }}>
          Already have an account?{' '}
          <Link to="/login" style={{ color: 'var(--primary)', fontWeight: '600', textDecoration: 'none' }}>
            Sign In
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Register