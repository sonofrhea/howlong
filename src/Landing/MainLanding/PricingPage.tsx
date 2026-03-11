import React, { useState, useEffect, useRef } from 'react';
import { Mail, X } from "lucide-react";
import { BillingCycle } from '../Types';
import { BILLING_OPTIONS } from '../Options';

// ─── animated counter ───────────────────────────────────────────────────────
function useCountUp(target: number, start: boolean): number {
    const [n, setN] = useState(0);
    useEffect(() => {
        if (!start) return;
        let t0: number | null = null;
        const tick = (ts: number) => {
            if (!t0) t0 = ts;
            const p = Math.min((ts - t0) / 1400, 1);
            setN(Math.round((1 - Math.pow(1 - p, 3)) * target));
            if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
    }, [target, start]);
    return n;
}

// ─── intersection observer ───────────────────────────────────────────────────
function useInView(threshold = 0.2): [React.RefObject<HTMLDivElement | null>, boolean] {
    const ref = useRef<HTMLDivElement>(null);
    const [seen, setSeen] = useState(false);
    useEffect(() => {
        const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setSeen(true); }, { threshold });
        if (ref.current) obs.observe(ref.current);
        return () => obs.disconnect();
    }, [threshold]);
    return [ref, seen];
}

// ─── tiny check icon ────────────────────────────────────────────────────────
const Check = ({ color = '#0066cc' }: { color?: string }) => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" style={{ flexShrink: 0, marginTop: 2 }}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
);

// ─── floating construction blueprint nodes (hero bg decoration) ─────────────
const BlueprintBg = () => (
    <svg
        aria-hidden="true"
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.045, pointerEvents: 'none' }}
        viewBox="0 0 1200 520"
        preserveAspectRatio="xMidYMid slice"
    >
        <defs>
            <pattern id="bp-grid" width="60" height="60" patternUnits="userSpaceOnUse">
                <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#0066cc" strokeWidth="0.8" />
            </pattern>
        </defs>
        <rect width="1200" height="520" fill="url(#bp-grid)" />
        {/* dimension lines */}
        <line x1="80" y1="260" x2="460" y2="260" stroke="#0066cc" strokeWidth="1.2" strokeDasharray="8 4" />
        <line x1="460" y1="260" x2="460" y2="120" stroke="#0066cc" strokeWidth="1.2" strokeDasharray="8 4" />
        <rect x="200" y="120" width="260" height="140" fill="none" stroke="#0066cc" strokeWidth="1.5" />
        <rect x="560" y="80" width="400" height="360" rx="4" fill="none" stroke="#0066cc" strokeWidth="1.5" />
        <line x1="560" y1="200" x2="960" y2="200" stroke="#0066cc" strokeWidth="0.8" />
        <line x1="760" y1="80" x2="760" y2="440" stroke="#0066cc" strokeWidth="0.8" />
        <circle cx="200" cy="120" r="4" fill="#0066cc" />
        <circle cx="460" cy="120" r="4" fill="#0066cc" />
        <circle cx="460" cy="260" r="4" fill="#0066cc" />
    </svg>
);

// ─── animated SVG bar chart for the "why pay" section ───────────────────────
const BarChart = ({ active }: { active: boolean }) => {
    const bars = [
        { h: 40, color: '#e5e7eb', label: 'Excel' },
        { h: 62, color: '#bfdbfe', label: 'Generic' },
        { h: 95, color: '#0066cc', label: 'Urusentra' },
    ];
    return (
        <svg viewBox="0 0 200 130" style={{ width: '100%', maxWidth: 220 }}>
            {bars.map((b, i) => {
                const x = 24 + i * 58;
                const barH = active ? b.h : 0;
                return (
                    <g key={i}>
                        <rect
                            x={x} y={120 - barH} width={40} height={barH} rx="4"
                            fill={b.color}
                            style={{ transition: `height 0.9s ${i * 0.18}s cubic-bezier(.4,0,.2,1), y 0.9s ${i * 0.18}s cubic-bezier(.4,0,.2,1)` }}
                        />
                        <text x={x + 20} y={127} textAnchor="middle" fontSize="9" fill="#999" fontFamily="Montserrat,sans-serif" fontWeight="600">{b.label}</text>
                        {b.color === '#0066cc' && (
                            <text x={x + 20} y={116 - barH} textAnchor="middle" fontSize="9" fill="#0066cc" fontFamily="Montserrat,sans-serif" fontWeight="800">
                                {active ? '95%' : ''}
                            </text>
                        )}
                    </g>
                );
            })}
            <line x1="12" y1="120" x2="188" y2="120" stroke="#e5e7eb" strokeWidth="1" />
            <text x="100" y="10" textAnchor="middle" fontSize="8.5" fill="#999" fontFamily="Montserrat,sans-serif" fontWeight="700" letterSpacing="1">EFFICIENCY SCORE</text>
        </svg>
    );
};

// ─── MAIN ────────────────────────────────────────────────────────────────────
function PricingPage() {
    const [cycle, setCycle] = useState<BillingCycle>("6 months");
    const [contactOpen, setContactOpen] = useState(false);
    const [chartRef, chartInView] = useInView(0.3);
    const c1 = useCountUp(2935, chartInView);
    const c2 = useCountUp(40, chartInView);
    const c3 = useCountUp(500, chartInView);

    const billingLabel: Record<string, Record<BillingCycle, string>> = {
        Starter: {
            "6 months": " MYR/ month (billed every 6 months)",
            "Yearly":   " MYR/ month (billed yearly)",
        },
        Enterprise: {
            "6 months": " MYR/ month (billed every 6 months)",
            "Yearly":   " MYR/ month (billed yearly)",
        },
    };

    const pricingLabel: Record<string, Record<BillingCycle, number | string>> = {
        Starter:    { "6 months": 95.98,  "Yearly": 79.99  },
        Enterprise: { "6 months": 190.89, "Yearly": 159.99 },
    };

    // shared contact modal
    const ContactModal = () => (
        <div
            style={{ position: 'fixed', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.45)', zIndex: 9999, backdropFilter: 'blur(4px)' }}
            onClick={() => setContactOpen(false)}
        >
            <div
                style={{ background: 'white', borderRadius: 16, width: 360, padding: '36px 32px', position: 'relative', boxShadow: '0 24px 60px rgba(0,0,0,.18)', animation: 'popIn .25s ease' }}
                onClick={e => e.stopPropagation()}
            >
                <button onClick={() => setContactOpen(false)} aria-label="Close" style={{ position: 'absolute', top: 14, right: 14, background: '#f3f4f6', border: 'none', borderRadius: '50%', width: 30, height: 30, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                    <X style={{ width: 14, height: 14 }} />
                </button>
                <div style={{ width: 44, height: 44, borderRadius: 12, background: '#e6f2ff', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
                    <Mail style={{ width: 20, height: 20, color: '#0066cc' }} />
                </div>
                <h3 style={{ fontSize: 18, fontWeight: 800, color: '#1a1a1a', marginBottom: 8, fontFamily: 'Montserrat,sans-serif' }}>Contact Sales</h3>
                <p style={{ fontSize: 14, lineHeight: 1.65, color: '#555', marginBottom: 24, fontFamily: 'Helvetica,sans-serif' }}>
                    Click on Email and send us a message or send us a message at subscription@urusentra.com and we will get back to you within 45 minutes.
                </p>
                <button
                    onClick={() => { window.location.href = "mailto:subscription@urusentra.com?subject=SOFTWARE INQUIRY"; }}
                    style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, background: '#0066cc', color: 'white', border: 'none', borderRadius: 10, padding: '13px 0', fontSize: 14, fontWeight: 700, cursor: 'pointer', fontFamily: 'Montserrat,sans-serif', letterSpacing: '.04em', transition: 'background .2s' }}
                    onMouseOver={e => (e.currentTarget.style.background = '#0052a3')}
                    onMouseOut={e => (e.currentTarget.style.background = '#0066cc')}
                >
                    <Mail style={{ width: 16, height: 16 }} />
                    Email
                </button>
            </div>
        </div>
    );

    const sty: Record<string, React.CSSProperties> = {
        page:          { background: '#f7f8fa', minHeight: '100vh', fontFamily: 'Montserrat,sans-serif', color: '#1a1a1a', overflowX: 'hidden' },
        closeBtn:      { position: 'fixed', top: 20, right: 20, zIndex: 200, background: 'white', border: '1.5px solid #e5e7eb', borderRadius: '50%', width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 2px 12px rgba(0,0,0,.08)', transition: 'all .2s' },

        // hero
        hero:          { position: 'relative', background: 'linear-gradient(160deg, #e8f4f8 0%, #ffffff 60%)', borderBottom: '1px solid #dde1ea', padding: '100px 40px 80px', textAlign: 'center', overflow: 'hidden' },
        heroEyebrow:   { display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: 11, fontWeight: 700, letterSpacing: '.22em', textTransform: 'uppercase' as const, color: '#0066cc', marginBottom: 20 },
        heroTitle:     { fontSize: 'clamp(2.8rem,6vw,5.2rem)', fontWeight: 900, lineHeight: 1.0, letterSpacing: '-3px', color: '#1a1a1a', marginBottom: 20 },
        heroSub:       { fontSize: 18, fontWeight: 400, color: '#555', lineHeight: 1.75, maxWidth: 560, margin: '0 auto 40px', fontFamily: 'Helvetica,sans-serif' },

        // toggle
        toggleWrap:    { display: 'inline-flex', background: 'white', border: '1.5px solid #dde1ea', borderRadius: 999, padding: 4, gap: 4, boxShadow: '0 2px 8px rgba(0,0,0,.06)' },
        toggleActive:  { padding: '9px 22px', borderRadius: 999, fontWeight: 700, fontSize: 13, background: '#1a1a1a', color: 'white', border: 'none', cursor: 'pointer', fontFamily: 'Montserrat,sans-serif', letterSpacing: '.04em', transition: 'all .25s' },
        toggleInact:   { padding: '9px 22px', borderRadius: 999, fontWeight: 600, fontSize: 13, background: 'transparent', color: '#666', border: 'none', cursor: 'pointer', fontFamily: 'Montserrat,sans-serif', letterSpacing: '.04em', transition: 'all .25s' },

        // cards section
        cardsWrap:     { maxWidth: 1160, margin: '0 auto', padding: '80px 40px', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24, alignItems: 'start' },

        // individual card
        card:          { background: 'white', border: '1.5px solid #dde1ea', borderRadius: 20, padding: '40px 36px', display: 'flex', flexDirection: 'column', transition: 'all .3s', cursor: 'default', position: 'relative', overflow: 'hidden' },
        cardFeatured:  { background: '#1a2035', border: '1.5px solid #2a3560', borderRadius: 20, padding: '40px 36px', display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden', boxShadow: '0 24px 60px rgba(0,26,94,.25)', transform: 'scale(1.025)' },

        // card inner
        planEyebrow:   { fontSize: 10, fontWeight: 800, letterSpacing: '.2em', textTransform: 'uppercase' as const, color: '#0066cc', marginBottom: 10 },
        planEyebrowDk: { fontSize: 10, fontWeight: 800, letterSpacing: '.2em', textTransform: 'uppercase' as const, color: '#60a5fa', marginBottom: 10 },
        planName:      { fontSize: 22, fontWeight: 900, color: '#1a1a1a', marginBottom: 6, letterSpacing: '-.02em' },
        planNameDk:    { fontSize: 22, fontWeight: 900, color: 'white', marginBottom: 6, letterSpacing: '-.02em' },
        planDesc:      { fontSize: 14, color: '#777', lineHeight: 1.55, marginBottom: 24, fontFamily: 'Helvetica,sans-serif' },
        planDescDk:    { fontSize: 14, color: 'rgba(255,255,255,.5)', lineHeight: 1.55, marginBottom: 24, fontFamily: 'Helvetica,sans-serif' },
        priceBig:      { fontSize: 'clamp(2.4rem,4vw,3.4rem)', fontWeight: 900, color: '#1a1a1a', letterSpacing: '-.04em', lineHeight: 1 },
        priceBigDk:    { fontSize: 'clamp(2.4rem,4vw,3.4rem)', fontWeight: 900, color: 'white', letterSpacing: '-.04em', lineHeight: 1 },
        pricePeriod:   { fontSize: 13, color: '#999', fontFamily: 'Helvetica,sans-serif', fontWeight: 400, marginTop: 4 },
        pricePeriodDk: { fontSize: 13, color: 'rgba(255,255,255,.4)', fontFamily: 'Helvetica,sans-serif', fontWeight: 400, marginTop: 4 },
        divider:       { height: 1, background: '#f0f0f0', margin: '28px 0' },
        dividerDk:     { height: 1, background: 'rgba(255,255,255,.1)', margin: '28px 0' },
        sectionHead:   { fontSize: 11, fontWeight: 800, letterSpacing: '.16em', textTransform: 'uppercase' as const, color: '#aaa', marginBottom: 12, marginTop: 24 },
        sectionHeadDk: { fontSize: 11, fontWeight: 800, letterSpacing: '.16em', textTransform: 'uppercase' as const, color: 'rgba(255,255,255,.3)', marginBottom: 12, marginTop: 24 },
        featureItem:   { display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: 14, color: '#333', lineHeight: 1.5, marginBottom: 10, fontFamily: 'Helvetica,sans-serif' },
        featureItemDk: { display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: 14, color: 'rgba(255,255,255,.75)', lineHeight: 1.5, marginBottom: 10, fontFamily: 'Helvetica,sans-serif' },
        fine:          { fontSize: 11, color: '#bbb', lineHeight: 1.6, marginTop: 16, fontFamily: 'Helvetica,sans-serif' },
        fineDk:        { fontSize: 11, color: 'rgba(255,255,255,.25)', lineHeight: 1.6, marginTop: 16, fontFamily: 'Helvetica,sans-serif' },

        // buttons
        btnOutline:    { width: '100%', padding: '13px 0', borderRadius: 10, fontWeight: 700, fontSize: 14, background: 'transparent', color: '#1a1a1a', border: '1.5px solid #dde1ea', cursor: 'pointer', fontFamily: 'Montserrat,sans-serif', letterSpacing: '.04em', transition: 'all .25s', marginBottom: 4 },
        btnPrimary:    { width: '100%', padding: '13px 0', borderRadius: 10, fontWeight: 700, fontSize: 14, background: '#0066cc', color: 'white', border: 'none', cursor: 'pointer', fontFamily: 'Montserrat,sans-serif', letterSpacing: '.04em', transition: 'all .25s', marginBottom: 4 },
        btnDark:       { width: '100%', padding: '13px 0', borderRadius: 10, fontWeight: 700, fontSize: 14, background: 'white', color: '#1a2035', border: 'none', cursor: 'pointer', fontFamily: 'Montserrat,sans-serif', letterSpacing: '.04em', transition: 'all .25s', marginBottom: 4 },

        // why section
        whySection:    { background: 'white', borderTop: '1px solid #e5e7eb', borderBottom: '1px solid #e5e7eb', padding: '100px 40px' },
        whyInner:      { maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center' },
        whyStat:       { textAlign: 'center' as const, padding: '0 16px' },

        // faq
        faqSection:    { padding: '100px 40px', background: '#f7f8fa' },
        faqInner:      { maxWidth: 760, margin: '0 auto' },
        faqItem:       { border: '1.5px solid #e5e7eb', borderRadius: 12, overflow: 'hidden', marginBottom: 6, background: 'white', transition: 'border-color .25s' },
        faqQ:          { padding: '18px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', fontSize: 15, fontWeight: 700, color: '#1a1a1a', fontFamily: 'Montserrat,sans-serif' },
        faqA:          { padding: '0 24px 18px', fontSize: 14, lineHeight: 1.75, color: '#555', fontFamily: 'Helvetica,sans-serif' },

        // footer note
        footerNote:    { padding: '40px', textAlign: 'center' as const, fontSize: 12, color: '#bbb', lineHeight: 1.7, fontFamily: 'Helvetica,sans-serif', maxWidth: 760, margin: '0 auto' },
    };

    const [faqOpen, setFaqOpen] = useState<number | null>(null);
    const faqs = [
        { q: 'Can I switch plans at any time?', a: "Yes. You can upgrade, downgrade, or cancel at any time. If you upgrade mid-cycle, you'll only be charged the prorated difference." },
        { q: 'Does the 14-day trial include the marketplace?', a: 'The Exploration plan gives you access to core platform features. Marketplace access and full supplier connections are included in Starter and Enterprise plans.' },
        { q: 'What happens to my data if I cancel?', a: 'Your data remains accessible for 90 days after cancellation. We provide a full export of all records in standard formats before permanent deletion.' },
        { q: 'Is the pricing exclusive of tax?', a: 'Yes. Pricing shown is exclusive of applicable taxes including SST. Final billing will reflect any applicable tax based on your location.' },
        { q: 'How many companies can I manage on Enterprise?', a: 'Enterprise supports single company under one account with multiple users. Company has fully isolated financial records, separate Charts of Accounts, and independent reporting.' },
    ];

    return (
        <div style={sty.page}>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;600;700;800;900&display=swap');
                @keyframes popIn { from{opacity:0;transform:scale(.94)} to{opacity:1;transform:scale(1)} }
                @keyframes fadeUp { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
                @keyframes slideDown { from{opacity:0;transform:translateY(-10px)} to{opacity:1;transform:translateY(0)} }
                @keyframes blink { 0%,100%{opacity:1} 50%{opacity:.3} }
                @keyframes orb1 { 0%,100%{transform:translate(0,0)} 50%{transform:translate(30px,-20px)} }
                @keyframes orb2 { 0%,100%{transform:translate(0,0)} 50%{transform:translate(-20px,18px)} }
                @keyframes gradShift { from{background-position:0% 50%} to{background-position:100% 50%} }
                .price-card-hover:hover { border-color: #0066cc !important; box-shadow: 0 16px 48px rgba(0,102,204,.12) !important; transform: translateY(-6px) !important; }
                .toggle-btn:hover { background: #f3f4f6 !important; }
                .close-btn:hover { border-color: #0066cc !important; box-shadow: 0 4px 16px rgba(0,102,204,.15) !important; }
                .faq-item-hover:hover { border-color: #0066cc !important; }
                .int-chip:hover { border-color: #0066cc !important; color: #0066cc !important; transform: translateY(-3px) !important; }
                .cta-row-btn:hover { transform: translateY(-3px) !important; box-shadow: 0 8px 24px rgba(0,102,204,.25) !important; }
                @media(max-width:900px) {
                    .cards-grid { grid-template-columns: 1fr !important; }
                    .why-inner  { grid-template-columns: 1fr !important; }
                }
            `}</style>

            {/* ── CLOSE BUTTON ── */}
            <a href="/home" aria-label="Close pricing page" style={sty.closeBtn} className="close-btn">
                <X style={{ width: 16, height: 16 }} />
            </a>

            {/* ── HERO ── */}
            <div style={sty.hero}>
                <BlueprintBg />
                {/* floating orbs */}
                <div style={{ position: 'absolute', top: -80, right: -80, width: 360, height: 360, borderRadius: '50%', background: 'rgba(0,102,204,.07)', filter: 'blur(60px)', animation: 'orb1 12s ease-in-out infinite', pointerEvents: 'none' }} />
                <div style={{ position: 'absolute', bottom: -40, left: -60, width: 280, height: 280, borderRadius: '50%', background: 'rgba(255,107,53,.06)', filter: 'blur(50px)', animation: 'orb2 15s ease-in-out infinite', pointerEvents: 'none' }} />

                <div style={{ position: 'relative', zIndex: 2, animation: 'fadeUp .7s ease both' }}>
                    <div style={sty.heroEyebrow}>
                        <div style={{ width: 28, height: 2, background: '#0066cc', borderRadius: 2 }} />
                        Simple, Transparent Pricing
                        <div style={{ width: 7, height: 7, borderRadius: '50%', background: '#0066cc', animation: 'blink 1.8s ease-in-out infinite' }} />
                    </div>
                    <h1 style={sty.heroTitle}>Pricing</h1>
                    <p style={sty.heroSub}>
                        Choose a plan that fits your needs. Upgrade, downgrade, or cancel anytime.
                    </p>

                    {/* billing toggle */}
                    <div style={{ display: 'flex', justifyContent: 'center', animation: 'fadeUp .7s .15s ease both' }}>
                        <div style={sty.toggleWrap}>
                            {BILLING_OPTIONS.map(option => (
                                <button
                                    key={option}
                                    onClick={() => setCycle(option)}
                                    aria-pressed={cycle === option}
                                    className="toggle-btn"
                                    style={cycle === option ? sty.toggleActive : sty.toggleInact}
                                >
                                    {option}
                                    {option === 'Yearly' && (
                                        <span style={{ marginLeft: 6, fontSize: 10, fontWeight: 800, background: '#0066cc', color: 'white', borderRadius: 999, padding: '2px 7px', letterSpacing: '.06em' }}>
                                            SAVE 17%
                                        </span>
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* ── PRICING CARDS ── */}
            <div style={sty.cardsWrap} className="cards-grid">

                {/* ─ FREE TRIAL ─ */}
                <div style={sty.card} className="price-card-hover" onMouseOver={e => {}} onMouseOut={e => {}}>
                    {/* top accent */}
                    <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 4, borderRadius: '20px 20px 0 0', background: '#e5e7eb' }} />

                    <div style={sty.planEyebrow}>Exploration</div>
                    <div style={sty.planName}>Exploration</div>
                    <div style={sty.planDesc}>For exploring core functionality</div>

                    <div style={{ marginBottom: 28 }}>
                        <span style={sty.priceBig}>0</span>
                        <div style={sty.pricePeriod}>MYR / 14 days</div>
                    </div>

                    <button
                        style={sty.btnOutline}
                        onClick={() => window.location.href = "/register"}
                        aria-label="Registration page"
                        onMouseOver={e => { e.currentTarget.style.borderColor = '#0066cc'; e.currentTarget.style.color = '#0066cc'; }}
                        onMouseOut={e => { e.currentTarget.style.borderColor = '#dde1ea'; e.currentTarget.style.color = '#1a1a1a'; }}
                    >
                        Get Started
                    </button>

                    <div style={sty.divider} />

                    <div style={sty.sectionHead}>Access</div>
                    {['Core platform features', '14 days usage', 'Support'].map(f => (
                        <div key={f} style={sty.featureItem}><Check />{f}</div>
                    ))}

                    <div style={sty.sectionHead}>Limits</div>
                    {['1 user', '5 GB storage', 'Standard performance'].map(f => (
                        <div key={f} style={{ ...sty.featureItem, color: '#999' }}>
                            <span style={{ width: 15, flexShrink: 0, color: '#ccc', fontWeight: 700, fontSize: 16, lineHeight: 1 }}>•</span>{f}
                        </div>
                    ))}
                    <div style={sty.fine}>Usage limits apply and may change over time.</div>
                </div>

                {/* ─ STARTER ─ */}
                <div style={sty.card} className="price-card-hover">
                    <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 4, borderRadius: '20px 20px 0 0', background: '#0066cc' }} />

                    <div style={sty.planEyebrow}>Starter</div>
                    <div style={sty.planName}>Starter</div>
                    <div style={sty.planDesc}>For individuals and teams doing production work</div>

                    <div style={{ marginBottom: 28 }}>
                        <span style={sty.priceBig}>{pricingLabel["Starter"][cycle]}</span>
                        <div style={sty.pricePeriod}>{billingLabel["Starter"][cycle]}</div>
                    </div>

                    <button
                        style={sty.btnPrimary}
                        onClick={() => setContactOpen(true)}
                        onMouseOver={e => { e.currentTarget.style.background = '#0052a3'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                        onMouseOut={e => { e.currentTarget.style.background = '#0066cc'; e.currentTarget.style.transform = 'none'; }}
                    >
                        Contact sales
                    </button>

                    <div style={sty.divider} />

                    {['Urusentra Marketplace', 'Unlimited Management access', 'Unlimited projects', 'Higher usage limits', 'Priority support'].map(f => (
                        <div key={f} style={sty.featureItem}><Check />{f}</div>
                    ))}

                    <div style={sty.sectionHead}>Collaboration</div>
                    {['Up to 3 users', 'Shared workspaces', 'Role-based permissions'].map(f => (
                        <div key={f} style={sty.featureItem}><Check />{f}</div>
                    ))}

                    <div style={sty.sectionHead}>Usage &amp; performance</div>
                    {['100 GB storage', 'Extended API limits', 'Faster processing'].map(f => (
                        <div key={f} style={sty.featureItem}><Check />{f}</div>
                    ))}
                    <div style={sty.fine}>Fair-use policy applies. Excessive usage may be rate-limited.</div>
                </div>

                {/* ─ ENTERPRISE ─ */}
                <div style={sty.cardFeatured}>
                    {/* shimmer top bar */}
                    <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 4, borderRadius: '20px 20px 0 0', background: 'linear-gradient(90deg, #0066cc, #60a5fa, #0066cc)', backgroundSize: '200%', animation: 'gradShift 3s linear infinite' }} />

                    <div style={{ position: 'absolute', top: 16, right: 16, background: '#ffd166', color: '#1a1a1a', fontSize: 10, fontWeight: 900, letterSpacing: '.1em', textTransform: 'uppercase' as const, padding: '4px 10px', borderRadius: 999 }}>
                        Most popular
                    </div>

                    <div style={sty.planEyebrowDk}>Enterprise</div>
                    <div style={sty.planNameDk}>Enterprise</div>
                    <div style={sty.planDescDk}>For organizations with advanced needs</div>

                    <div style={{ marginBottom: 28 }}>
                        <span style={sty.priceBigDk}>{pricingLabel["Enterprise"][cycle]}</span>
                        <div style={sty.pricePeriodDk}>{billingLabel["Enterprise"][cycle]}</div>
                    </div>

                    <button
                        style={sty.btnDark}
                        onClick={() => setContactOpen(true)}
                        onMouseOver={e => { e.currentTarget.style.background = '#e6f2ff'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                        onMouseOut={e => { e.currentTarget.style.background = 'white'; e.currentTarget.style.transform = 'none'; }}
                    >
                        Contact sales
                    </button>

                    <div style={sty.dividerDk} />

                    <div style={sty.sectionHeadDk}>Platform</div>
                    {['Urusentra Marketplace', 'After-sales service', 'Full Financial reports', 'Cloud Access', 'Client Server Database', 'Unlimited Management access', 'Unlimited projects', 'Custom integrations', 'Suppliers connection'].map(f => (
                        <div key={f} style={sty.featureItemDk}><Check color="#60a5fa" />{f}</div>
                    ))}

                    <div style={sty.sectionHeadDk}>Collaboration</div>
                    {['Up to 5 users', 'Shared workspaces', 'Role-based permissions'].map(f => (
                        <div key={f} style={sty.featureItemDk}><Check color="#60a5fa" />{f}</div>
                    ))}

                    <div style={sty.sectionHeadDk}>Security &amp; compliance</div>
                    {['SSO & SAML', 'Audit logs', 'SOC 2 / ISO alignment'].map(f => (
                        <div key={f} style={sty.featureItemDk}><Check color="#60a5fa" />{f}</div>
                    ))}

                    <div style={sty.sectionHeadDk}>Support &amp; SLA</div>
                    {['Dedicated account manager', '24/7 priority support', 'Custom SLA'].map(f => (
                        <div key={f} style={sty.featureItemDk}><Check color="#60a5fa" />{f}</div>
                    ))}
                    <div style={sty.fineDk}>Contract terms and pricing vary based on usage and requirements.</div>
                </div>
            </div>

            {/* ── WHY PAY — animated stats + bar chart ── */}
            <div style={sty.whySection} ref={chartRef}>
                <div style={sty.whyInner} className="why-inner">
                    {/* left: stats */}
                    <div>
                        <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: '.2em', textTransform: 'uppercase' as const, color: '#0066cc', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
                            <div style={{ width: 24, height: 2, background: '#0066cc', borderRadius: 2 }} />
                            Why it pays for itself
                        </div>
                        <h2 style={{ fontSize: 'clamp(1.8rem,3.5vw,2.8rem)', fontWeight: 900, color: '#1a1a1a', lineHeight: 1.1, letterSpacing: '-2px', marginBottom: 40 }}>
                            Real numbers from<br />real building companies.
                        </h2>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 24 }}>
                            {[
                                { n: c1, suffix: '+', label: 'Verified Suppliers', color: '#0066cc' },
                                { n: c2, suffix: '%', label: 'Faster Procurement', color: '#ea580c' },
                                { n: c3, suffix: 'K+', label: 'MYR Saved / Year', color: '#059669' },
                            ].map((s, i) => (
                                <div key={i} style={{ background: '#f7f8fa', border: '1.5px solid #e5e7eb', borderRadius: 14, padding: '20px 16px', textAlign: 'center' as const }}>
                                    <div style={{ fontSize: 'clamp(1.8rem,3vw,2.8rem)', fontWeight: 900, letterSpacing: '-2px', color: s.color, lineHeight: 1 }}>
                                        {s.n.toLocaleString()}{s.suffix}
                                    </div>
                                    <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase' as const, color: '#999', marginTop: 6 }}>
                                        {s.label}
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div style={{ marginTop: 36, padding: '20px 24px', background: '#e6f2ff', border: '1px solid #bfdbfe', borderRadius: 14, borderLeft: '4px solid #0066cc' }}>
                            <div style={{ fontSize: 14, fontWeight: 700, color: '#0066cc', marginBottom: 6, fontFamily: 'Montserrat,sans-serif' }}>"The cost control features alone saved us over 500K in the first year."</div>
                            <div style={{ fontSize: 12, color: '#666', fontFamily: 'Helvetica,sans-serif' }}>Noor Farhana · VP Operations, Skyline Builders</div>
                        </div>
                    </div>

                    {/* right: bar chart */}
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 32 }}>
                        <BarChart active={chartInView} />

                        {/* feature comparison mini-table */}
                        <div style={{ width: '100%', background: '#f7f8fa', border: '1.5px solid #e5e7eb', borderRadius: 14, overflow: 'hidden' }}>
                            {[
                                { label: 'Construction workflows',  us: true,  them: false },
                                { label: 'Live supplier marketplace', us: true,  them: false },
                                { label: 'Auto job cost variance',  us: true,  them: false },
                                { label: 'Double-entry accounting', us: true,  them: true  },
                                { label: 'Version-controlled records', us: true, them: false },
                            ].map((row, i) => (
                                <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr 60px 60px', padding: '11px 16px', borderBottom: i < 4 ? '1px solid #e5e7eb' : 'none', fontSize: 13, fontFamily: 'Helvetica,sans-serif', background: i % 2 === 0 ? 'white' : '#f7f8fa' }}>
                                    <span style={{ color: '#333', fontWeight: 500 }}>{row.label}</span>
                                    <span style={{ textAlign: 'center' as const }}>
                                        {row.us
                                            ? <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>
                                            : <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#e8354a" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>}
                                    </span>
                                    <span style={{ textAlign: 'center' as const }}>
                                        {row.them
                                            ? <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>
                                            : <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#e8354a" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>}
                                    </span>
                                </div>
                            ))}
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 60px 60px', padding: '8px 16px', background: '#f0f0f0', fontSize: 10, fontWeight: 600, wordSpacing: '2.5rem', letterSpacing: '.12em', textTransform: 'lowercase' as const, color: '#999', fontFamily: 'Montserrat,sans-serif' }}>
                                <span>Feature</span><span style={{ textAlign: 'center' as const, color: '#0066cc' }}>Urusentra</span><span style={{ textAlign: 'center' as const }}>Others</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* ── SCROLLING TRUST BAND ── */}
            <div style={{ background: '#1a2035', padding: '18px 0', overflow: 'hidden', borderTop: '3px solid #0066cc' }}>
                <div style={{ display: 'flex', gap: 0, whiteSpace: 'nowrap' as const, animation: 'gradShift 0s, none', width: 'max-content' }}>
                    <div style={{ display: 'flex', animation: 'slideDown 0s', whiteSpace: 'nowrap' as const }}>
                        {Array.from({ length: 4 }).map((_, i) => (
                            <React.Fragment key={i}>
                                {['14-Day Free Trial', 'No Credit Card Required', 'Cancel Anytime', 'Malaysian Tax Compliant', '2,935+ Suppliers', 'Priority Support'].map(t => (
                                    <span key={t} style={{ padding: '0 48px', fontSize: 11, fontWeight: 800, letterSpacing: '.18em', textTransform: 'uppercase' as const, color: 'rgba(255,255,255,.5)', fontFamily: 'Montserrat,sans-serif', display: 'inline-flex', alignItems: 'center', gap: 20 }}>
                                        {t}
                                        <span style={{ color: '#0066cc', fontSize: 7 }}>●</span>
                                    </span>
                                ))}
                            </React.Fragment>
                        ))}
                    </div>
                </div>
            </div>

            {/* ── FAQ ── */}
            <div style={sty.faqSection}>
                <div style={sty.faqInner}>
                    <div style={{ textAlign: 'center' as const, marginBottom: 56 }}>
                        <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: '.2em', textTransform: 'uppercase' as const, color: '#0066cc', marginBottom: 14 }}>Got questions?</div>
                        <h2 style={{ fontSize: 'clamp(1.8rem,3.5vw,2.6rem)', fontWeight: 900, color: '#1a1a1a', letterSpacing: '-2px', lineHeight: 1.1 }}>Frequently Asked</h2>
                    </div>
                    {faqs.map((faq, i) => (
                        <div key={i} style={{ ...sty.faqItem, borderColor: faqOpen === i ? '#0066cc' : '#e5e7eb' }} className="faq-item-hover">
                            <div style={sty.faqQ} onClick={() => setFaqOpen(faqOpen === i ? null : i)}>
                                <span>{faq.q}</span>
                                <span style={{ fontSize: 20, color: '#0066cc', transition: 'transform .3s', transform: faqOpen === i ? 'rotate(45deg)' : 'none', display: 'inline-block' }}>+</span>
                            </div>
                            {faqOpen === i && (
                                <div style={{ ...sty.faqA, animation: 'fadeUp .3s ease' }}>{faq.a}</div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* ── FINAL CTA BAND ── */}
            <div style={{ background: '#0066cc', padding: '80px 40px', textAlign: 'center' as const, position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', inset: 0, opacity: .04, backgroundImage: 'repeating-linear-gradient(45deg,white 0,white 1px,transparent 0,transparent 50%)', backgroundSize: '30px 30px', pointerEvents: 'none' }} />
                <div style={{ position: 'relative', zIndex: 1 }}>
                    <h2 style={{ fontSize: 'clamp(1.8rem,4vw,3.2rem)', fontWeight: 900, color: 'white', letterSpacing: '-2px', marginBottom: 16, fontFamily: 'Montserrat,sans-serif' }}>
                        Ready to Transform Your SME<br/>to a higher level?
                    </h2>
                    <p style={{ fontSize: 16, color: 'rgba(255,255,255,.7)', maxWidth: 500, margin: '0 auto 36px', lineHeight: 1.7, fontFamily: 'Helvetica,sans-serif' }}>
                        Join hundreds of building companies already building smarter. Explore our platform with a 14-day trial today—no credit card required.
                    </p>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: 16, flexWrap: 'wrap' as const }}>
                        <button
                            className="cta-row-btn"
                            onClick={() => window.location.href = '/register'}
                            style={{ padding: '14px 36px', background: 'white', color: '#0066cc', border: 'none', borderRadius: 10, fontWeight: 800, fontSize: 14, cursor: 'pointer', fontFamily: 'Montserrat,sans-serif', letterSpacing: '.04em', transition: 'all .25s' }}
                        >
                            Start Free Trial
                        </button>
                        <button
                            className="cta-row-btn"
                            onClick={() => setContactOpen(true)}
                            style={{ padding: '14px 36px', background: 'transparent', color: 'white', border: '2px solid rgba(255,255,255,.4)', borderRadius: 10, fontWeight: 700, fontSize: 14, cursor: 'pointer', fontFamily: 'Montserrat,sans-serif', letterSpacing: '.04em', transition: 'all .25s' }}
                        >
                            Talk to Sales
                        </button>
                    </div>
                </div>
            </div>

            {/* ── FINE PRINT ── */}
            <div style={sty.footerNote}>
                Pricing shown is exclusive of applicable taxes. Features and limits are subject to change. Certain advanced
                capabilities may be gated or rolled out gradually. See terms of service for full details.
            </div>

            {/* ── CONTACT MODAL (shared) ── */}
            {contactOpen && <ContactModal />}
        </div>
    );
}

export default PricingPage;