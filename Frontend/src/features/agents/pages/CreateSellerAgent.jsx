import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { createSellerAgent } from '../service/agent.api';

const ArrowLeftIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/>
  </svg>
);

const CreateSellerAgent = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [formData, setFormData] = useState({
        productName: '', category: '', brand: '', productDescription: '',
        sellingPrice: '', minAcceptablePrice: '', originalPurchasePrice: '',
        productCondition: 'New', purchaseDate: '', accessoriesIncluded: '',
        reasonForSelling: '', knownIssues: '', warrantyStatus: '',
        negotiationStyle: 'Balanced', maxDiscountAllowed: '',
        sellerName: '', contactNumber: '', email: '',
        additionalNotes: '', specialNegotiationRules: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            const res = await createSellerAgent(formData);
            // On success, redirect to success page
            navigate('/agents/seller/success', { state: { agent: res.data.agent, url: res.data.publicUrl } });
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to create agent');
        } finally {
            setLoading(false);
        }
    };

    const sectionTitleStyle = {
        fontSize: '14px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.07em', 
        color: 'var(--primary)', marginBottom: '16px', marginTop: '32px', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '8px'
    };

    const inputStyle = {
        width: '100%', padding: '12px 16px', background: 'var(--bg-card-high)',
        border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)',
        color: 'var(--text-primary)', fontSize: '14px', marginBottom: '16px',
        outline: 'none', transition: 'border-color 150ms'
    };

    const labelStyle = {
        display: 'block', fontSize: '13px', fontWeight: '500', color: 'var(--text-muted)', marginBottom: '6px'
    };

    return (
        <main className="app-main" style={{
            display: 'flex', height: '100vh', width: '100%',
            background: 'var(--bg-base)', color: 'var(--text-primary)',
            fontFamily: 'var(--font-body)', overflowY: 'auto',
            padding: '40px 20px', flexDirection: 'column', alignItems: 'center'
        }}>
            <div style={{ maxWidth: '700px', width: '100%' }}>
                
                <button
                    onClick={() => navigate('/profile')}
                    style={{
                        display: 'inline-flex', alignItems: 'center', gap: '8px',
                        padding: '6px 12px 6px 8px', background: 'transparent',
                        border: '1px solid transparent', borderRadius: 'var(--radius-md)',
                        cursor: 'pointer', color: 'var(--text-muted)', fontSize: '13px', fontWeight: '500',
                        marginBottom: '24px', transition: 'all 150ms',
                    }}
                    onMouseEnter={e => { e.currentTarget.style.background = 'var(--bg-card)'; e.currentTarget.style.borderColor = 'var(--border-subtle)'; e.currentTarget.style.color = 'var(--text-primary)' }}
                    onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = 'transparent'; e.currentTarget.style.color = 'var(--text-muted)' }}
                >
                    <ArrowLeftIcon /> Back to Profile
                </button>

                <div style={{
                    background: 'var(--bg-card)', borderRadius: '24px', border: '1px solid var(--border-subtle)',
                    padding: '40px', boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
                }}>
                    <h1 style={{ fontSize: '28px', fontWeight: '700', letterSpacing: '-0.02em', color: 'var(--text-primary)', marginBottom: '8px' }}>
                        Create Seller Agent
                    </h1>
                    <p style={{ fontSize: '15px', color: 'var(--text-muted)', marginBottom: '12px' }}>
                        Create an AI representative that can answer buyer questions and negotiate on your behalf.
                    </p>

                    {error && (
                        <div style={{ padding: '12px', background: 'rgba(255, 60, 60, 0.1)', border: '1px solid #ff6b6b', borderRadius: 'var(--radius-md)', color: '#ff6b6b', marginBottom: '20px', fontSize: '14px' }}>
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit}>
                        {/* Basic Information */}
                        <h3 style={sectionTitleStyle}>Basic Information</h3>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                            <div>
                                <label style={labelStyle}>Product Name *</label>
                                <input style={inputStyle} name="productName" value={formData.productName} onChange={handleChange} required placeholder="e.g. iPhone 13 Pro" />
                            </div>
                            <div>
                                <label style={labelStyle}>Brand *</label>
                                <input style={inputStyle} name="brand" value={formData.brand} onChange={handleChange} required placeholder="e.g. Apple" />
                            </div>
                        </div>
                        <label style={labelStyle}>Category *</label>
                        <input style={inputStyle} name="category" value={formData.category} onChange={handleChange} required placeholder="e.g. Electronics, Furniture" />
                        <label style={labelStyle}>Product Description *</label>
                        <textarea style={{...inputStyle, minHeight: '100px'}} name="productDescription" value={formData.productDescription} onChange={handleChange} required placeholder="Detail the features and condition of the item..."></textarea>

                        {/* Pricing */}
                        <h3 style={sectionTitleStyle}>Pricing Settings</h3>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px' }}>
                            <div>
                                <label style={labelStyle}>Selling Price ($) *</label>
                                <input style={inputStyle} type="number" name="sellingPrice" value={formData.sellingPrice} onChange={handleChange} required placeholder="e.g. 500" />
                            </div>
                            <div>
                                <label style={labelStyle}>Min Acceptable ($) *</label>
                                <input style={inputStyle} type="number" name="minAcceptablePrice" value={formData.minAcceptablePrice} onChange={handleChange} required placeholder="e.g. 450" />
                            </div>
                            <div>
                                <label style={labelStyle}>Original Price ($)</label>
                                <input style={inputStyle} type="number" name="originalPurchasePrice" value={formData.originalPurchasePrice} onChange={handleChange} placeholder="e.g. 999" />
                            </div>
                        </div>

                        {/* Product Details */}
                        <h3 style={sectionTitleStyle}>Product Details</h3>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                            <div>
                                <label style={labelStyle}>Condition *</label>
                                <select style={inputStyle} name="productCondition" value={formData.productCondition} onChange={handleChange} required>
                                    <option value="New">New</option>
                                    <option value="Like New">Like New</option>
                                    <option value="Good">Good</option>
                                    <option value="Fair">Fair</option>
                                    <option value="Poor">Poor</option>
                                </select>
                            </div>
                            <div>
                                <label style={labelStyle}>Purchase Date</label>
                                <input style={inputStyle} type="date" name="purchaseDate" value={formData.purchaseDate} onChange={handleChange} />
                            </div>
                        </div>
                        <label style={labelStyle}>Accessories Included</label>
                        <input style={inputStyle} name="accessoriesIncluded" value={formData.accessoriesIncluded} onChange={handleChange} placeholder="e.g. Charger, Original Box, Case" />

                        {/* Selling Details */}
                        <h3 style={sectionTitleStyle}>Selling Details</h3>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                            <div>
                                <label style={labelStyle}>Reason For Selling</label>
                                <input style={inputStyle} name="reasonForSelling" value={formData.reasonForSelling} onChange={handleChange} placeholder="e.g. Upgrading to new model" />
                            </div>
                            <div>
                                <label style={labelStyle}>Warranty Status</label>
                                <input style={inputStyle} name="warrantyStatus" value={formData.warrantyStatus} onChange={handleChange} placeholder="e.g. 6 months remaining" />
                            </div>
                        </div>
                        <label style={labelStyle}>Known Issues</label>
                        <textarea style={{...inputStyle, minHeight: '60px'}} name="knownIssues" value={formData.knownIssues} onChange={handleChange} placeholder="Be honest about scratches or defects..."></textarea>

                        {/* Negotiation Settings */}
                        <h3 style={sectionTitleStyle}>Negotiation Settings</h3>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                            <div>
                                <label style={labelStyle}>Negotiation Style *</label>
                                <select style={inputStyle} name="negotiationStyle" value={formData.negotiationStyle} onChange={handleChange} required>
                                    <option value="Aggressive">Aggressive (Firm on price)</option>
                                    <option value="Balanced">Balanced (Open to reasonable offers)</option>
                                    <option value="Flexible">Flexible (Willing to make deals)</option>
                                </select>
                            </div>
                            <div>
                                <label style={labelStyle}>Max Discount Allowed (%) *</label>
                                <input style={inputStyle} type="number" name="maxDiscountAllowed" value={formData.maxDiscountAllowed} onChange={handleChange} required placeholder="e.g. 10" />
                            </div>
                        </div>

                        {/* Contact Settings */}
                        <h3 style={sectionTitleStyle}>Contact Settings (Given to serious buyers)</h3>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px' }}>
                            <div>
                                <label style={labelStyle}>Seller Name *</label>
                                <input style={inputStyle} name="sellerName" value={formData.sellerName} onChange={handleChange} required />
                            </div>
                            <div>
                                <label style={labelStyle}>Contact Number *</label>
                                <input style={inputStyle} type="tel" name="contactNumber" value={formData.contactNumber} onChange={handleChange} required />
                            </div>
                            <div>
                                <label style={labelStyle}>Email *</label>
                                <input style={inputStyle} type="email" name="email" value={formData.email} onChange={handleChange} required />
                            </div>
                        </div>

                        {/* AI Instructions */}
                        <h3 style={sectionTitleStyle}>AI Instructions</h3>
                        <label style={labelStyle}>Special Negotiation Rules</label>
                        <textarea style={{...inputStyle, minHeight: '60px'}} name="specialNegotiationRules" value={formData.specialNegotiationRules} onChange={handleChange} placeholder="e.g. Do not negotiate below $400 if they don't want the accessories."></textarea>
                        
                        <label style={labelStyle}>Additional Notes for AI</label>
                        <textarea style={{...inputStyle, minHeight: '60px'}} name="additionalNotes" value={formData.additionalNotes} onChange={handleChange} placeholder="e.g. Emphasize that it's barely been used."></textarea>

                        <button 
                            type="submit" 
                            disabled={loading}
                            style={{
                                width: '100%', padding: '14px', background: 'var(--primary)',
                                color: '#001f23', fontSize: '15px', fontWeight: '700',
                                border: 'none', borderRadius: 'var(--radius-md)', marginTop: '24px',
                                cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.7 : 1,
                                transition: 'all 200ms', boxShadow: '0 4px 14px rgba(49,184,198,0.3)'
                            }}
                        >
                            {loading ? 'Creating...' : 'Generate Seller Agent'}
                        </button>
                    </form>
                </div>
            </div>
        </main>
    );
};

export default CreateSellerAgent;
