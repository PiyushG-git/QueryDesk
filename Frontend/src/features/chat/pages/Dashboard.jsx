import React, { useEffect, useRef, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import { useChat } from '../hooks/useChat'
import { useTheme } from '../../../context/ThemeContext'
import remarkGfm from 'remark-gfm'


/* ── Icons ──────────────────────────────────────────── */
const PlusIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
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
const SendIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
  </svg>
)
const UserIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
  </svg>
)
const ChatIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
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


const Dashboard = () => {
  const chat = useChat()
  const navigate = useNavigate()
  const { theme, toggleTheme } = useTheme()
  const [chatInput, setChatInput] = useState('')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const messagesEndRef = useRef(null)

  const chats = useSelector((state) => state.chat.chats)
  const currentChatId = useSelector((state) => state.chat.currentChatId)
  const user = useSelector((state) => state.auth.user)

  const currentMessages = chats[currentChatId]?.messages || []

  useEffect(() => {
    chat.initializeSocketConnection()
    chat.handleGetChats()

    return () => {
      chat.disconnectSocket()
    }
  }, [])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [currentMessages])

  const handleSubmitMessage = (event) => {
    event.preventDefault()
    const trimmedMessage = chatInput.trim()
    if (!trimmedMessage) return
    chat.handleSendMessage({ message: trimmedMessage, chatId: currentChatId })
    setChatInput('')
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmitMessage(e)
    }
  }

  const handleNewChat = () => {
    // Clear current chat to show empty state
    chat.handleOpenChat(null, chats)
  }

  const openChat = (chatId) => {
    chat.handleOpenChat(chatId, chats)
    setSidebarOpen(false) // close drawer on mobile after selecting chat
  }

  // Get user initials for avatar
  const getInitials = () => {
    if (!user?.username) return 'U'
    return user.username.slice(0, 2).toUpperCase()
  }

  return (
    <main className="app-main" style={{
      display: 'flex',
      height: '100vh',
      width: '100%',
      background: 'var(--bg-base)',
      color: 'var(--text-primary)',
      fontFamily: 'var(--font-body)',
      overflow: 'hidden',
    }}>

      {/* ── Mobile overlay ─────────────────────────────── */}
      <div
        className={`sidebar-overlay${sidebarOpen ? ' open' : ''}`}
        onClick={() => setSidebarOpen(false)}
      />

      {/* ── Sidebar ────────────────────────────────────── */}
      <aside
        className={`app-sidebar${sidebarOpen ? ' open' : ''}`}
        style={{
        width: 'var(--sidebar-width)',
        minWidth: 'var(--sidebar-width)',
        height: '100vh',
        background: 'var(--bg-sidebar)',
        borderRight: '1px solid var(--border-subtle)',
        display: 'flex',
        flexDirection: 'column',
        padding: '20px 14px',
        gap: '8px',
      }}>

        {/* Logo + mobile close button */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: '16px', paddingLeft: '4px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: '32px', height: '32px', borderRadius: '8px',
              background: 'linear-gradient(135deg, #31b8c6, #1a7a85)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontWeight: '700', fontSize: '14px', color: '#001f23', flexShrink: 0,
            }}>Q</div>
            <span style={{ fontSize: '18px', fontWeight: '700', letterSpacing: '-0.03em', color: 'var(--text-primary)' }}>
              QueryDesk
            </span>
          </div>
          {/* Close button – only visible on mobile via CSS */}
          <button
            className="mobile-menu-btn"
            onClick={() => setSidebarOpen(false)}
            style={{ marginLeft: 'auto' }}
          >
            <CloseIcon />
          </button>
        </div>

        {/* New Chat Button */}
        <button
          id="new-chat-btn"
          onClick={handleNewChat}
          style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
            width: '100%', padding: '10px 16px',
            background: 'var(--primary)', color: '#001f23',
            border: 'none', borderRadius: 'var(--radius-md)',
            fontSize: '14px', fontWeight: '600', cursor: 'pointer',
            transition: 'background 150ms ease, box-shadow 150ms ease',
            marginBottom: '8px',
          }}
          onMouseEnter={e => { e.currentTarget.style.background = 'var(--primary-dim)'; e.currentTarget.style.boxShadow = '0 0 20px var(--primary-glow)' }}
          onMouseLeave={e => { e.currentTarget.style.background = 'var(--primary)'; e.currentTarget.style.boxShadow = 'none' }}
        >
          <PlusIcon /> New Chat
        </button>

        {/* Chat History Label */}
        {Object.keys(chats).length > 0 && (
          <p style={{ fontSize: '11px', fontWeight: '600', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-faint)', padding: '4px 4px 2px' }}>
            Recent
          </p>
        )}

        {/* Chat List */}
        <div className="chat-list" style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '2px' }}>
          {Object.values(chats).map((c) => (
            <button
              key={c.id}
              onClick={() => openChat(c.id)}
              style={{
                display: 'flex', alignItems: 'center', gap: '8px',
                width: '100%', padding: '9px 10px',
                background: currentChatId === c.id ? 'var(--bg-card)' : 'transparent',
                border: currentChatId === c.id ? '1px solid var(--border-muted)' : '1px solid transparent',
                borderRadius: 'var(--radius-sm)', cursor: 'pointer',
                textAlign: 'left', color: currentChatId === c.id ? 'var(--text-primary)' : 'var(--text-muted)',
                fontSize: '13.5px', fontWeight: '400',
                transition: 'background 120ms, border-color 120ms, color 120ms',
                whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
              }}
              onMouseEnter={e => { if (currentChatId !== c.id) { e.currentTarget.style.background = 'var(--bg-card)'; e.currentTarget.style.color = 'var(--text-primary)' } }}
              onMouseLeave={e => { if (currentChatId !== c.id) { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--text-muted)' } }}
            >
              <span style={{ flexShrink: 0, opacity: 0.5 }}><ChatIcon /></span>
              <span style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>{c.title}</span>
            </button>
          ))}
        </div>

        {/* Sidebar Footer */}
        <div style={{
          borderTop: '1px solid var(--border-subtle)',
          paddingTop: '12px', display: 'flex', alignItems: 'center', gap: '8px',
        }}>
          {/* Dark/Light Toggle */}
          <button
            id="theme-toggle-btn"
            onClick={toggleTheme}
            title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              width: '36px', height: '36px',
              background: 'var(--bg-card)', border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-sm)', cursor: 'pointer',
              color: 'var(--text-muted)', flexShrink: 0,
              transition: 'background 150ms, color 150ms, border-color 150ms',
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--primary)'; e.currentTarget.style.color = 'var(--primary)' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border-subtle)'; e.currentTarget.style.color = 'var(--text-muted)' }}
          >
            {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
          </button>

          {/* User Profile Button */}
          <button
            id="profile-btn"
            onClick={() => navigate('/profile')}
            title="View profile"
            style={{
              display: 'flex', alignItems: 'center', gap: '9px',
              flex: 1, padding: '6px 10px',
              background: 'var(--bg-card)', border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-sm)', cursor: 'pointer', color: 'var(--text-muted)',
              fontSize: '13px', fontWeight: '500', textAlign: 'left',
              transition: 'background 150ms, border-color 150ms, color 150ms',
              overflow: 'hidden',
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--primary)'; e.currentTarget.style.color = 'var(--text-primary)' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border-subtle)'; e.currentTarget.style.color = 'var(--text-muted)' }}
          >
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

      {/* ── Main Chat Area ─────────────────────────────── */}
      <section style={{
        flex: 1, display: 'flex', flexDirection: 'column',
        height: '100vh', overflow: 'hidden', position: 'relative',
      }}>

        {/* ── Mobile Top Bar ─────────────────────────────── */}
        <div className="mobile-topbar">
          <button
            className="mobile-menu-btn"
            onClick={() => setSidebarOpen(true)}
          >
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

        {/* Empty State */}
        {!currentChatId || currentMessages.length === 0 ? (
          <div style={{
            flex: 1, display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center', gap: '16px',
            padding: '40px',
          }}>
            <div style={{
              width: '56px', height: '56px', borderRadius: '14px',
              background: 'linear-gradient(135deg, #31b8c6, #1a7a85)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '26px', fontWeight: '800', color: '#001f23',
            }}>Q</div>
            <h1 style={{ fontSize: '26px', fontWeight: '700', letterSpacing: '-0.03em', color: 'var(--text-primary)' }}>
              How can I help you today?
            </h1>
            <p style={{ fontSize: '15px', color: 'var(--text-muted)', textAlign: 'center', maxWidth: '400px', lineHeight: '1.6' }}>
              Ask me anything — code, concepts, analysis, or creative writing.
            </p>
          </div>
        ) : (
          /* Messages */
          <div className="messages" style={{
            flex: 1, overflowY: 'auto', padding: '32px 24px 120px',
            display: 'flex', flexDirection: 'column', gap: '16px',
          }}>
            <div style={{ maxWidth: '720px', width: '100%', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {currentMessages.map((message, idx) => (
                <div
                  key={idx}
                  style={{
                    display: 'flex',
                    justifyContent: message.role === 'user' ? 'flex-end' : 'flex-start',
                  }}
                >
                  <div style={{
                    maxWidth: '82%',
                    padding: '12px 16px',
                    borderRadius: message.role === 'user'
                      ? '16px 16px 4px 16px'
                      : '16px 16px 16px 4px',
                    background: message.role === 'user'
                      ? 'var(--bg-user-bubble)'
                      : 'var(--bg-ai-bubble)',
                    border: message.role === 'user'
                      ? '1px solid rgba(49,184,198,0.25)'
                      : '1px solid var(--border-subtle)',
                    fontSize: '15px',
                    lineHeight: '1.65',
                    color: 'var(--text-primary)',
                  }}>
                    {message.role === 'user' ? (
                      <p>{message.content}</p>
                    ) : (
                      <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        components={{
                          p: ({ children }) => <p style={{ marginBottom: '8px' }}>{children}</p>,
                          ul: ({ children }) => <ul style={{ marginBottom: '8px', paddingLeft: '20px' }}>{children}</ul>,
                          ol: ({ children }) => <ol style={{ marginBottom: '8px', paddingLeft: '20px' }}>{children}</ol>,
                          li: ({ children }) => <li style={{ marginBottom: '4px' }}>{children}</li>,
                          strong: ({ children }) => <strong style={{ color: 'var(--text-primary)', fontWeight: '600' }}>{children}</strong>,
                          code: ({ inline, children }) => inline
                            ? <code style={{ background: 'rgba(49,184,198,0.12)', color: 'var(--primary)', padding: '2px 6px', borderRadius: '4px', fontFamily: 'var(--font-code)', fontSize: '13px' }}>{children}</code>
                            : <code style={{ fontFamily: 'var(--font-code)', fontSize: '13px' }}>{children}</code>,
                          pre: ({ children }) => (
                            <pre style={{
                              background: '#0b0e15', border: '1px solid var(--border-subtle)',
                              borderRadius: '10px', padding: '14px 16px',
                              overflowX: 'auto', marginBottom: '10px',
                              fontFamily: 'var(--font-code)', fontSize: '13px', lineHeight: '1.6',
                            }}>{children}</pre>
                          ),
                        }}
                      >
                        {message.content}
                      </ReactMarkdown>
                    )}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          </div>
        )}

        {/* ── Input Bar ─────────────────────────────────── */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0,
          padding: '16px 24px 20px',
          background: 'linear-gradient(to top, var(--bg-base) 70%, transparent)',
          backdropFilter: 'blur(8px)',
        }}>
          <form
            onSubmit={handleSubmitMessage}
            style={{
              maxWidth: '720px', margin: '0 auto',
              display: 'flex', gap: '10px', alignItems: 'flex-end',
              background: 'var(--bg-card)', border: '1px solid var(--border-muted)',
              borderRadius: 'var(--radius-xl)', padding: '10px 10px 10px 18px',
              boxShadow: '0 4px 24px rgba(0,0,0,0.3)',
              transition: 'border-color 150ms',
            }}
            onFocus={e => e.currentTarget.style.borderColor = 'var(--border-active)'}
            onBlur={e => e.currentTarget.style.borderColor = 'var(--border-muted)'}
          >
            <textarea
              id="chat-input"
              rows={1}
              value={chatInput}
              onChange={(e) => { setChatInput(e.target.value); e.target.style.height = 'auto'; e.target.style.height = Math.min(e.target.scrollHeight, 160) + 'px' }}
              onKeyDown={handleKeyDown}
              placeholder="Ask anything..."
              style={{
                flex: 1, background: 'transparent', border: 'none', outline: 'none',
                resize: 'none', color: 'var(--text-primary)', fontSize: '15px',
                lineHeight: '1.55', fontFamily: 'var(--font-body)',
                minHeight: '24px', maxHeight: '160px', overflow: 'hidden',
              }}
            />
            <button
              id="send-btn"
              type="submit"
              disabled={!chatInput.trim()}
              className="btn-primary"
              style={{
                width: '40px', height: '40px', flexShrink: 0,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                borderRadius: '10px',
              }}
            >
              <SendIcon />
            </button>
          </form>
          <p style={{ textAlign: 'center', fontSize: '11px', color: 'var(--text-faint)', marginTop: '8px' }}>
            QueryDesk can make mistakes. Verify important information.
          </p>
        </div>
      </section>
    </main>
  )
}

export default Dashboard