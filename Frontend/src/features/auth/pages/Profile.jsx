import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router'
import { setUser } from '../auth.slice'
import { useAuth } from '../hook/useAuth'
import { useChat } from '../../chat/hooks/useChat'
import { useTheme } from '../../../context/ThemeContext'


/* ── Icons ───────────────────────────────────────────── */
const PlusIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
  </svg>
)
const ChatIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
  </svg>
)
const SunIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="5"/>
    <line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/>
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
    <line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/>
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
  </svg>
)
const MoonIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
  </svg>
)
const ArrowLeftIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/>
  </svg>
)
const CalendarIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
  </svg>
)
const TrashIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>
  </svg>
)
const LogOutIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>
  </svg>
)
const HamburgerIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>
  </svg>
)
const CloseIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
)


const SettingRow = ({ label, value, isPassword }) => (
  <div style={{
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    padding: '14px 0',
    borderBottom: '1px solid var(--border-subtle)',
  }}>
    <div>
      <p style={{ fontSize: '12px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--text-faint)', marginBottom: '3px' }}>
        {label}
      </p>
      <p style={{ fontSize: '14.5px', color: 'var(--text-primary)', fontFamily: isPassword ? 'var(--font-code)' : 'inherit', letterSpacing: isPassword ? '0.1em' : 'inherit' }}>
        {isPassword ? '••••••••••' : value}
      </p>
    </div>
  </div>
)


const Profile = () => {
  const user = useSelector(state => state.auth.user)
  const chats = useSelector(state => state.chat.chats)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const chat = useChat()
  const { theme, toggleTheme } = useTheme()
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const getInitials = () => {
    if (!user?.username) return 'U'
    const parts = user.username.split('_')
    if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase()
    return user.username.slice(0, 2).toUpperCase()
  }

  const formatJoinDate = () => {
    if (!user?.createdAt) return 'May 2026'
    return new Date(user.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
  }

  const { handleLogout: authLogout, handleDeleteAccount: authDelete } = useAuth()

  const handleLogout = async () => {
    await authLogout()
    navigate('/login')
  }

  const handleDeleteAccountConfirm = async () => {
    await authDelete()
    navigate('/register')
  }

  const handleNewChat = () => {
    navigate('/')
  }

  const openChat = (chatId) => {
    chat.handleOpenChat(chatId, chats)
    setSidebarOpen(false)
    navigate('/')
  }

  return (
    <main className="app-main" style={{
      display: 'flex', height: '100vh', width: '100%',
      background: 'var(--bg-base)', color: 'var(--text-primary)',
      fontFamily: 'var(--font-body)', overflow: 'hidden',
    }}>

      {/* ── Mobile overlay ─────────────────────────────── */}
      <div
        className={`sidebar-overlay${sidebarOpen ? ' open' : ''}`}
        onClick={() => setSidebarOpen(false)}
      />

      {/* ── Sidebar ──────────────────────────────────── */}
      <aside className={`app-sidebar${sidebarOpen ? ' open' : ''}`} style={{
        width: 'var(--sidebar-width)', minWidth: 'var(--sidebar-width)',
        height: '100vh', background: 'var(--bg-sidebar)',
        borderRight: '1px solid var(--border-subtle)',
        display: 'flex', flexDirection: 'column',
        padding: '20px 14px', gap: '8px',
      }}>
        {/* Logo + mobile close */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: '16px', paddingLeft: '4px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: '32px', height: '32px', borderRadius: '8px',
              background: 'linear-gradient(135deg, #31b8c6, #1a7a85)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontWeight: '700', fontSize: '14px', color: '#001f23', flexShrink: 0,
            }}>Q</div>
            <span style={{ fontSize: '18px', fontWeight: '700', letterSpacing: '-0.03em', color: 'var(--text-primary)' }}>QueryDesk</span>
          </div>
          <button className="mobile-menu-btn" onClick={() => setSidebarOpen(false)} style={{ marginLeft: 'auto' }}>
            <CloseIcon />
          </button>
        </div>

        {/* New Chat */}
        <button
          onClick={handleNewChat}
          style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
            width: '100%', padding: '10px 16px',
            background: 'var(--primary)', color: '#001f23', border: 'none',
            borderRadius: 'var(--radius-md)', fontSize: '14px', fontWeight: '600', cursor: 'pointer',
            marginBottom: '8px',
          }}
          onMouseEnter={e => { e.currentTarget.style.background = 'var(--primary-dim)'; e.currentTarget.style.boxShadow = '0 0 20px var(--primary-glow)' }}
          onMouseLeave={e => { e.currentTarget.style.background = 'var(--primary)'; e.currentTarget.style.boxShadow = 'none' }}
        >
          <PlusIcon /> New Chat
        </button>

        {/* Chat History */}
        {Object.keys(chats).length > 0 && (
          <p style={{ fontSize: '11px', fontWeight: '600', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-faint)', padding: '4px 4px 2px' }}>
            Recent
          </p>
        )}
        <div className="chat-list" style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '2px' }}>
          {Object.values(chats).map((c) => (
            <button key={c.id} onClick={() => openChat(c.id)} style={{
              display: 'flex', alignItems: 'center', gap: '8px',
              width: '100%', padding: '9px 10px',
              background: 'transparent', border: '1px solid transparent',
              borderRadius: 'var(--radius-sm)', cursor: 'pointer',
              textAlign: 'left', color: 'var(--text-muted)',
              fontSize: '13.5px', transition: 'all 120ms',
              whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
            }}
              onMouseEnter={e => { e.currentTarget.style.background = 'var(--bg-card)'; e.currentTarget.style.color = 'var(--text-primary)' }}
              onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--text-muted)' }}
            >
              <span style={{ flexShrink: 0, opacity: 0.5 }}><ChatIcon /></span>
              <span style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>{c.title}</span>
            </button>
          ))}
        </div>

        {/* Footer */}
        <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button onClick={toggleTheme} title="Toggle theme" style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            width: '36px', height: '36px', background: 'var(--bg-card)',
            border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-sm)',
            cursor: 'pointer', color: 'var(--text-muted)', flexShrink: 0,
          }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--primary)'; e.currentTarget.style.color = 'var(--primary)' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border-subtle)'; e.currentTarget.style.color = 'var(--text-muted)' }}
          >
            {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
          </button>

          {/* Active profile button */}
          <button style={{
            display: 'flex', alignItems: 'center', gap: '9px',
            flex: 1, padding: '6px 10px',
            background: 'rgba(49,184,198,0.1)', border: '1px solid var(--primary-border)',
            borderRadius: 'var(--radius-sm)', cursor: 'default', color: 'var(--primary)',
            fontSize: '13px', fontWeight: '600', textAlign: 'left',
            overflow: 'hidden',
          }}>
            <div style={{
              width: '24px', height: '24px', borderRadius: '50%',
              background: 'linear-gradient(135deg, #31b8c6, #1a7a85)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '10px', fontWeight: '700', color: '#001f23', flexShrink: 0,
            }}>{getInitials()}</div>
            <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {user?.username || 'Profile'}
            </span>
          </button>
        </div>
      </aside>

      {/* ── Main Content ────────────────────────────────── */}
      <section style={{
        flex: 1, overflowY: 'auto',
        display: 'flex', flexDirection: 'column', alignItems: 'center',
      }}>

        {/* ── Mobile Top Bar ─────────────────────────────── */}
        <div className="mobile-topbar">
          <button className="mobile-menu-btn" onClick={() => setSidebarOpen(true)}>
            <HamburgerIcon />
          </button>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flex: 1 }}>
            <div style={{
              width: '24px', height: '24px', borderRadius: '6px',
              background: 'linear-gradient(135deg, #31b8c6, #1a7a85)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontWeight: '700', fontSize: '11px', color: '#001f23', flexShrink: 0,
            }}>Q</div>
            <span style={{ fontSize: '15px', fontWeight: '700', letterSpacing: '-0.02em', color: 'var(--text-primary)' }}>QueryDesk</span>
          </div>
          <button onClick={toggleTheme} className="mobile-menu-btn">
            {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
          </button>
        </div>

        <div style={{ maxWidth: '600px', width: '100%', padding: '16px' }}>

          {/* Back button */}
          <button
            id="back-to-chat-btn"
            onClick={() => navigate('/')}
            style={{
              display: 'flex', alignItems: 'center', gap: '8px',
              background: 'none', border: 'none', cursor: 'pointer',
              color: 'var(--text-muted)', fontSize: '14px', fontWeight: '500',
              padding: '4px 0', marginBottom: '28px',
              transition: 'color 150ms',
            }}
            onMouseEnter={e => e.currentTarget.style.color = 'var(--text-primary)'}
            onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}
          >
            <ArrowLeftIcon /> Back to chat
          </button>

          {/* Profile Card */}
          <div style={{
            background: 'var(--bg-card)', border: '1px solid var(--border-subtle)',
            borderRadius: '20px', overflow: 'hidden',
            boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
          }}>

            {/* Card Header (avatar + info) */}
            <div className="profile-card-header" style={{
              padding: '36px 36px 28px',
              background: 'linear-gradient(135deg, rgba(49,184,198,0.08) 0%, transparent 60%)',
              borderBottom: '1px solid var(--border-subtle)',
              display: 'flex', alignItems: 'center', gap: '24px',
            }}>
              {/* Avatar */}
              <div style={{
                width: '80px', height: '80px', borderRadius: '50%', flexShrink: 0,
                background: 'linear-gradient(135deg, #31b8c6 0%, #1a7a85 100%)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '28px', fontWeight: '700', color: '#001f23',
                boxShadow: '0 0 0 3px rgba(49,184,198,0.3)',
              }}>
                {getInitials()}
              </div>

              <div style={{ flex: 1, minWidth: 0 }}>
                <h2 style={{ fontSize: '22px', fontWeight: '700', letterSpacing: '-0.02em', color: 'var(--text-primary)', marginBottom: '4px' }}>
                  {user?.username || 'User'}
                </h2>
                <p style={{ fontSize: '14px', color: 'var(--text-muted)', marginBottom: '10px', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {user?.email || ''}
                </p>
                <span style={{
                  display: 'inline-flex', alignItems: 'center', gap: '5px',
                  background: 'rgba(49,184,198,0.1)', border: '1px solid rgba(49,184,198,0.25)',
                  borderRadius: 'var(--radius-full)', padding: '3px 10px',
                  fontSize: '12px', fontWeight: '500', color: 'var(--primary)',
                }}>
                  <CalendarIcon /> Joined {formatJoinDate()}
                </span>
              </div>
            </div>

            {/* Account Settings */}
            <div className="profile-settings-section" style={{ padding: '28px 36px' }}>
              <h3 style={{ fontSize: '13px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.07em', color: 'var(--text-faint)', marginBottom: '4px' }}>
                Account Settings
              </h3>

              <SettingRow label="Username" value={user?.username || '—'} />
              <SettingRow label="Email Address" value={user?.email || '—'} />

              {/* Theme Setting */}
              <div style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '14px 0', borderBottom: '1px solid var(--border-subtle)',
              }}>
                <div>
                  <p style={{ fontSize: '12px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--text-faint)', marginBottom: '3px' }}>
                    Appearance
                  </p>
                  <p style={{ fontSize: '14.5px', color: 'var(--text-primary)' }}>
                    {theme === 'dark' ? 'Dark Mode' : 'Light Mode'}
                  </p>
                </div>
                <button
                  id="profile-theme-toggle"
                  onClick={toggleTheme}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '8px',
                    padding: '8px 14px', background: 'var(--bg-card-high)',
                    border: '1px solid var(--border-muted)', borderRadius: 'var(--radius-md)',
                    cursor: 'pointer', color: 'var(--text-muted)', fontSize: '13px', fontWeight: '500',
                    fontFamily: 'var(--font-body)', transition: 'all 150ms',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--primary)'; e.currentTarget.style.color = 'var(--primary)' }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border-muted)'; e.currentTarget.style.color = 'var(--text-muted)' }}
                >
                  {theme === 'dark' ? <><SunIcon /> Switch to Light</> : <><MoonIcon /> Switch to Dark</>}
                </button>
              </div>
            </div>

            {/* Danger Zone */}
            <div className="profile-danger-zone" style={{
              padding: '20px 36px 28px',
              borderTop: '1px solid var(--border-subtle)',
              background: 'rgba(255, 60, 60, 0.02)',
            }}>
              <h3 style={{ fontSize: '13px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.07em', color: '#ff6b6b', marginBottom: '16px' }}>
                Danger Zone
              </h3>

              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <button
                  id="logout-btn"
                  onClick={handleLogout}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '8px',
                    padding: '10px 18px', background: 'transparent',
                    border: '1px solid var(--border-muted)', borderRadius: 'var(--radius-md)',
                    cursor: 'pointer', color: 'var(--text-muted)', fontSize: '14px', fontWeight: '500',
                    fontFamily: 'var(--font-body)', transition: 'all 150ms',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--primary)'; e.currentTarget.style.color = 'var(--primary)' }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border-muted)'; e.currentTarget.style.color = 'var(--text-muted)' }}
                >
                  <LogOutIcon /> Sign Out
                </button>

                {!showDeleteConfirm ? (
                  <button
                    id="delete-account-btn"
                    onClick={() => setShowDeleteConfirm(true)}
                    style={{
                      display: 'flex', alignItems: 'center', gap: '8px',
                      padding: '10px 18px', background: 'transparent',
                      border: '1px solid rgba(255,80,80,0.4)', borderRadius: 'var(--radius-md)',
                      cursor: 'pointer', color: '#ff6b6b', fontSize: '14px', fontWeight: '500',
                      fontFamily: 'var(--font-body)', transition: 'all 150ms',
                    }}
                    onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,80,80,0.08)'; e.currentTarget.style.borderColor = 'rgba(255,80,80,0.7)' }}
                    onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = 'rgba(255,80,80,0.4)' }}
                  >
                    <TrashIcon /> Delete Account
                  </button>
                ) : (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ fontSize: '13px', color: '#ff6b6b' }}>Are you sure?</span>
                    <button onClick={() => setShowDeleteConfirm(false)} style={{
                      padding: '8px 14px', background: 'transparent',
                      border: '1px solid var(--border-muted)', borderRadius: 'var(--radius-md)',
                      cursor: 'pointer', color: 'var(--text-muted)', fontSize: '13px', fontFamily: 'var(--font-body)',
                    }}>
                      Cancel
                    </button>
                    <button onClick={handleDeleteAccountConfirm} style={{
                      padding: '8px 14px', background: 'rgba(255,80,80,0.15)',
                      border: '1px solid rgba(255,80,80,0.5)', borderRadius: 'var(--radius-md)',
                      cursor: 'pointer', color: '#ff6b6b', fontSize: '13px', fontWeight: '600', fontFamily: 'var(--font-body)',
                    }}>
                      Confirm Delete
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

export default Profile
