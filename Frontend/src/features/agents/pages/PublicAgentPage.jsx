import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { getAgentBySlug, chatWithAgent } from '../service/agent.api';

const SendIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
  </svg>
);

const BotIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="10" rx="2"/><circle cx="12" cy="5" r="2"/><path d="M12 7v4"/><line x1="8" y1="16" x2="8" y2="16"/><line x1="16" y1="16" x2="16" y2="16"/>
  </svg>
);

const PublicAgentPage = () => {
    const { slug } = useParams();
    const [agent, setAgent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    
    const messagesEndRef = useRef(null);

    useEffect(() => {
        const fetchAgent = async () => {
            try {
                const res = await getAgentBySlug(slug);
                setAgent(res.data.agent);
                // Add initial greeting
                setMessages([{
                    id: Date.now().toString(),
                    role: 'ai',
                    content: `Hi there! I am the AI representative for the ${res.data.agent.productName}. How can I help you today?`
                }]);
            } catch (err) {
                setError('Agent not found or unavailable.');
            } finally {
                setLoading(false);
            }
        };
        fetchAgent();
    }, [slug]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, isTyping]);

    const handleSend = async (e) => {
        e.preventDefault();
        if (!input.trim() || isTyping) return;

        const userMsg = input.trim();
        setInput('');
        const newMessages = [...messages, { id: Date.now().toString(), role: 'user', content: userMsg }];
        setMessages(newMessages);
        setIsTyping(true);

        try {
            // Only send the array of { role, content } expected by AI service
            const apiMessages = newMessages.map(m => ({ role: m.role, content: m.content }));
            const res = await chatWithAgent(slug, apiMessages);
            
            setMessages([...newMessages, {
                id: Date.now().toString() + 'ai',
                role: 'ai',
                content: res.data.response
            }]);
        } catch (err) {
            setMessages([...newMessages, {
                id: Date.now().toString() + 'err',
                role: 'ai',
                content: 'Sorry, I am having trouble connecting right now. Please try again.'
            }]);
        } finally {
            setIsTyping(false);
        }
    };

    if (loading) {
        return <div style={{ display: 'flex', height: '100vh', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-base)', color: 'var(--text-primary)' }}>Loading agent...</div>;
    }

    if (error) {
        return <div style={{ display: 'flex', height: '100vh', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-base)', color: '#ff6b6b' }}>{error}</div>;
    }

    return (
        <div style={{
            display: 'flex', height: '100vh', width: '100%',
            background: 'var(--bg-base)', color: 'var(--text-primary)',
            fontFamily: 'var(--font-body)', overflow: 'hidden'
        }}>
            
            {/* Product Details Sidebar */}
            <aside style={{
                width: '320px', minWidth: '320px', height: '100vh',
                background: 'var(--bg-sidebar)', borderRight: '1px solid var(--border-subtle)',
                padding: '32px 24px', overflowY: 'auto'
            }}>
                <div style={{
                    display: 'inline-flex', alignItems: 'center', gap: '6px',
                    padding: '4px 10px', background: 'rgba(49,184,198,0.1)',
                    border: '1px solid rgba(49,184,198,0.2)', borderRadius: 'var(--radius-full)',
                    color: 'var(--primary)', fontSize: '11px', fontWeight: '600', textTransform: 'uppercase',
                    letterSpacing: '0.05em', marginBottom: '24px'
                }}>
                    <BotIcon /> AI Seller Representative
                </div>
                
                <h1 style={{ fontSize: '24px', fontWeight: '700', letterSpacing: '-0.02em', marginBottom: '8px' }}>
                    {agent.productName}
                </h1>
                
                <p style={{ fontSize: '20px', color: 'var(--primary)', fontWeight: '600', marginBottom: '24px' }}>
                    ${agent.sellingPrice}
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <div>
                        <h4 style={{ fontSize: '12px', textTransform: 'uppercase', color: 'var(--text-faint)', marginBottom: '4px' }}>Brand</h4>
                        <p style={{ fontSize: '14px', color: 'var(--text-primary)' }}>{agent.brand}</p>
                    </div>
                    <div>
                        <h4 style={{ fontSize: '12px', textTransform: 'uppercase', color: 'var(--text-faint)', marginBottom: '4px' }}>Condition</h4>
                        <p style={{ fontSize: '14px', color: 'var(--text-primary)' }}>{agent.productCondition}</p>
                    </div>
                    <div>
                        <h4 style={{ fontSize: '12px', textTransform: 'uppercase', color: 'var(--text-faint)', marginBottom: '4px' }}>Accessories</h4>
                        <p style={{ fontSize: '14px', color: 'var(--text-primary)' }}>{agent.accessoriesIncluded || 'None'}</p>
                    </div>
                    <div>
                        <h4 style={{ fontSize: '12px', textTransform: 'uppercase', color: 'var(--text-faint)', marginBottom: '4px' }}>Description</h4>
                        <p style={{ fontSize: '14px', color: 'var(--text-muted)', lineHeight: '1.5' }}>{agent.productDescription}</p>
                    </div>
                </div>
                
                <div style={{ marginTop: '40px', paddingTop: '20px', borderTop: '1px solid var(--border-subtle)' }}>
                    <p style={{ fontSize: '12px', color: 'var(--text-faint)' }}>
                        Sold by <span style={{ color: 'var(--text-primary)', fontWeight: '500' }}>{agent.sellerName}</span>
                    </p>
                </div>
            </aside>

            {/* Chat Area */}
            <main style={{ flex: 1, display: 'flex', flexDirection: 'column', height: '100vh', background: 'var(--bg-base)' }}>
                {/* Header */}
                <header style={{
                    padding: '20px 32px', borderBottom: '1px solid var(--border-subtle)',
                    background: 'rgba(10, 13, 20, 0.7)', backdropFilter: 'blur(10px)',
                    display: 'flex', alignItems: 'center'
                }}>
                    <h2 style={{ fontSize: '16px', fontWeight: '600' }}>Chat with Agent</h2>
                </header>

                {/* Messages */}
                <div style={{ flex: 1, overflowY: 'auto', padding: '32px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
                    {messages.map((msg) => {
                        const isUser = msg.role === 'user';
                        return (
                            <div key={msg.id} style={{
                                display: 'flex', gap: '16px', maxWidth: '80%',
                                alignSelf: isUser ? 'flex-end' : 'flex-start',
                                flexDirection: isUser ? 'row-reverse' : 'row'
                            }}>
                                <div style={{
                                    width: '32px', height: '32px', borderRadius: '8px', flexShrink: 0,
                                    background: isUser ? 'var(--bg-card-high)' : 'linear-gradient(135deg, #31b8c6, #1a7a85)',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    color: isUser ? 'var(--text-muted)' : '#001f23', fontSize: '14px', fontWeight: '700'
                                }}>
                                    {isUser ? 'U' : <BotIcon />}
                                </div>
                                <div className="markdown-body" style={{
                                    background: isUser ? 'var(--bg-card)' : 'transparent',
                                    border: isUser ? '1px solid var(--border-subtle)' : 'none',
                                    padding: isUser ? '12px 16px' : '6px 0',
                                    borderRadius: '12px', color: 'var(--text-primary)',
                                    fontSize: '15px', lineHeight: '1.6'
                                }}>
                                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                        {msg.content}
                                    </ReactMarkdown>
                                </div>
                            </div>
                        );
                    })}
                    {isTyping && (
                        <div style={{ display: 'flex', gap: '16px', maxWidth: '80%' }}>
                            <div style={{
                                width: '32px', height: '32px', borderRadius: '8px', flexShrink: 0,
                                background: 'linear-gradient(135deg, #31b8c6, #1a7a85)',
                                display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#001f23'
                            }}>
                                <BotIcon />
                            </div>
                            <div style={{ padding: '6px 0', color: 'var(--text-muted)', fontSize: '14px', fontStyle: 'italic' }}>
                                Agent is typing...
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                {/* Input box */}
                <div style={{ padding: '0 32px 32px' }}>
                    <form onSubmit={handleSend} style={{
                        display: 'flex', alignItems: 'center', gap: '12px',
                        background: 'var(--bg-card)', border: '1px solid var(--border-subtle)',
                        borderRadius: '16px', padding: '12px 16px',
                        boxShadow: '0 4px 20px rgba(0,0,0,0.2)'
                    }}>
                        <input
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Ask a question or make an offer..."
                            disabled={isTyping}
                            style={{
                                flex: 1, background: 'transparent', border: 'none', color: 'var(--text-primary)',
                                fontSize: '15px', outline: 'none'
                            }}
                        />
                        <button type="submit" disabled={!input.trim() || isTyping} style={{
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            width: '36px', height: '36px', borderRadius: '10px',
                            background: input.trim() && !isTyping ? 'var(--primary)' : 'var(--bg-card-high)',
                            color: input.trim() && !isTyping ? '#001f23' : 'var(--text-muted)',
                            border: 'none', cursor: input.trim() && !isTyping ? 'pointer' : 'not-allowed',
                            transition: 'all 150ms'
                        }}>
                            <SendIcon />
                        </button>
                    </form>
                </div>
            </main>
        </div>
    );
};

export default PublicAgentPage;
