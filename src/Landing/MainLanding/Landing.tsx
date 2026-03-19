import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from "lucide-react";




const formatCurrentYear = () => {
    const currentYear = new Date().getFullYear();
    return `${currentYear}`
}



function useCountUp(target: number, duration: number = 2000, start: boolean = false): number {
    const [count, setCount] = useState(0);
    useEffect(() => {
        if (!start) return;
        let startTime: number | null = null;
        const step = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            const ease = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(ease * target));
            if (progress < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
    }, [target, duration, start]);
    return count;
}

// ---- INTERSECTION HOOK ----
function useInView(threshold: number = 0.15): [React.RefObject<HTMLDivElement | null>, boolean] {
    const ref = useRef<HTMLDivElement>(null);
    const [inView, setInView] = useState(false);
    useEffect(() => {
        const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
        if (ref.current) obs.observe(ref.current);
        return () => obs.disconnect();
    }, [threshold]);
    return [ref, inView];
}

// ---- STAT CARD ----
interface StatCardProps {
    prefix: string;
    value: number;
    suffix: string;
    label: string;
    color?: string;
    inView: boolean;
}

function StatCard({ prefix, value, suffix, label, color, inView }: StatCardProps) {
    const num = useCountUp(value, 2200, inView);
    return (
        <div style={{ textAlign: 'center', padding: '0 20px' }}>
            <div style={{ fontSize: '62px', fontWeight: 900, lineHeight: 1, letterSpacing: '-3px', color: color || '#0066cc', fontFamily: 'Montserrat, system-ui' }}>
                {prefix}{num.toLocaleString()}{suffix}
            </div>
            <div style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: '#666', marginTop: '8px', fontFamily: 'Montserrat, system-ui' }}>
                {label}
            </div>
        </div>
    );
}

export default function ConstructionERPLanding() {
    const [featuresOpen, setFeaturesOpen] = useState(false);
    const navigate = useNavigate();
    const [statsRef, statsInView] = useInView(0.3);
    const [pipelineRef, pipelineInView] = useInView(0.2);
    const [activeTab, setActiveTab] = useState(0);
    const [scrollY, setScrollY] = useState(0);
    const [activeFaq, setActiveFaq] = useState<number | null>(null);

    useEffect(() => {
        const onScroll = () => setScrollY(window.scrollY);
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    const modules = [
        { label: 'Sales', icon: '📋', color: '#059669', light: '#ecfdf5', border: '#a7f3d0', title: 'Sales Management', desc: 'Quotations → Invoices → Payments → Settlement. The full revenue pipeline, automated from first line item to final ringgit collected.', pills: ['QT-YYYY-XXXX', 'INV-YYYY-XXXX', 'PAY-XXXX', 'Auto-Complete'], accentCol: '#059669', link: '/project-feature' },
        { label: 'Finance', icon: '📊', color: '#4338ca', light: '#f5f3ff', border: '#ddd6fe', title: 'Financial Accounting', desc: 'Double-entry journals, payment & receipt vouchers, income & expenses, cash book, and bank statements — always balanced.', pills: ['Journal Voucher', 'P&L Statement', 'Cash Book', 'Bank Recs'], accentCol: '#4338ca', link: '/accounting-feature' },
        { label: 'Clients', icon: '🤝', color: '#0f766e', light: '#f0fdfa', border: '#99f6e4', title: 'Client Management', desc: 'Full client profiles with debit notes, credit notes, and refund tracking. Encrypted data, 5 status types, version-controlled.', pills: ['DN-YYYY-XXXX', 'CN-YYYY-XXXX', 'REF-YYYY-XXXX', 'Encrypted'], accentCol: '#0f766e', link: '/client-feature' },
        { label: 'Projects', icon: '🏗️', color: '#d97706', light: '#fffbeb', border: '#fde68a', title: 'Project Tracking', desc: 'BOQ estimation, job cost ledger, real-time variance monitoring. Know your budget status before it becomes a problem.', pills: ['BOQ Lines', 'Cost Ledger', 'Variance', 'Real-Time'], accentCol: '#d97706', link: '/project-feature'  },
        { label: 'Reports', icon: '📈', color: '#6d28d9', light: '#f5f3ff', border: '#ddd6fe', title: 'Reports & Receipts', desc: 'Trial balance, income statement, project profitability, client aging — every report generated from live data, not exports.', pills: ['Trial Balance', 'Cash Flow', 'Profitability', 'Receipts'], accentCol: '#6d28d9', link: '/reports-feature'  },
        { label: 'Suppliers', icon: '🌐', color: '#ea580c', light: '#fff7ed', border: '#fed7aa', title: 'Supplier Connection', desc: '2,xxx+ verified suppliers across lumber, steel, concrete, and more. Compare prices, request quotes, and restock faster.', pills: ['2,xxx+ Suppliers', '500+ Contractors', '48h Response', 'Global'], accentCol: '#ea580c', link: '/supplier-feature'  },
    ];

    const faqs = [
        { q: 'Is Urusentra only for the construction industry?', a: 'Urusentra is built specifically for building professionals, but its accounting, sales, and client management modules work for any SME. Several of our users operate in manufacturing and property management.' },
        { q: 'How does the supplier marketplace work?', a: 'Contractors browse verified supplier listings, filter by material category and location, and request quotes directly. Suppliers respond within an average of 48 hours. All pricing is live and competitive.' },
        { q: 'Is my financial data secure?', a: 'Yes. Sensitive fields like client IDs and bank details are encrypted at the field level. Every record is version-controlled, giving you a full audit trail of every change ever made.' },
        { q: 'Can I use Urusentra for multiple companies?', a: 'Urusentra supports multi-company setups. Every financial record — invoices, journals, payments — is scoped to its company, keeping your books completely separate.' },
        { q: 'Does the accounting module handle Malaysian tax (SST/GST)?', a: 'Yes. Tax is handled at both the line level and the header level, with inclusive and exclusive modes. You set the tax rate as a percentage — the system calculates and applies it automatically.' },
        { q: 'What happens to my data if I cancel?', a: "Your data remains accessible for 90 days after cancellation. We'll provide a full export of all your records in standard formats before permanent deletion." },
    ];

    const pipelineSteps = [
        { num: '01', title: 'Quotation', sub: 'Price the job', color: '#059669', code: 'QT-2025-XXXX' },
        { num: '02', title: 'Invoice', sub: 'Bill the client', color: '#2355f5', code: 'INV-2025-XXXX' },
        { num: '03', title: 'Payment', sub: 'Collect in tranches', color: '#7c3aed', code: 'PAY-XXXX' },
        { num: '04', title: 'Settlement', sub: 'Close the loop', color: '#0284c7', code: 'POST-XXXX' },
    ];

    const comparisons = [
        { feature: 'Construction-specific workflows', us: true, generic: false, excel: false },
        { feature: 'Live supplier marketplace', us: true, generic: false, excel: false },
        { feature: 'Automatic job cost variance', us: true, generic: false, excel: false },
        { feature: 'Double-entry accounting', us: true, generic: true, excel: false },
        { feature: 'Per-line tax & discount logic', us: true, generic: true, excel: false },
        { feature: 'Multi-company support', us: true, generic: true, excel: false },
        { feature: 'Version-controlled records', us: true, generic: false, excel: false },
        { feature: 'Encrypted sensitive fields', us: true, generic: false, excel: false },
        { feature: 'Built-in receipts & PDFs', us: true, generic: false, excel: false },
        { feature: 'Project profitability reports', us: true, generic: false, excel: false },
    ];

    return (
        <div className="min-w-full">
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;700;900&display=swap');

                :root {
                    --sky: #e8f4f8;
                    --blue-primary: #0066cc;
                    --blue-light: #e6f2ff;
                    --accent: #ff6b35;
                    --accent-yellow: #ffd166;
                    --text-black: #1a1a1a;
                    --text-white: #ffffff;
                    --text-gray: #666666;
                    --border-gray: rgba(0,0,0,0.1);
                    --blue-box: #e5f2ff;
                }

                *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }

                html, body, #root {
                    margin: 0; padding: 0; height: 100%;
                    font-family: 'Montserrat', Arial, sans-serif;
                    color: var(--text-black);
                    background-color: var(--sky);
                    overflow-x: hidden; overflow-y: auto;
                }

                .app { width: 100%; min-height: 100vh; }

                /* ---- HERO (all original) ---- */
                .hero {
                    position: relative; max-width: 100%; min-height: 100vh;
                    background: linear-gradient(to bottom, var(--sky) 0%, #ffffff 100%);
                    overflow: hidden;
                }

                .background {
                    position: absolute; bottom: 0; left: 0; width: 100%; height: 45%;
                    background: url('IMG_2877.JPG') center/cover no-repeat;
                    z-index: 1;
                }

                .grid-lines {
                    position: absolute; top: 0; left: 0; width: 100%; height: 100%;
                    background-image:
                        linear-gradient(to right, rgba(0,0,0,0.05) 1px, transparent 1px),
                        linear-gradient(to bottom, rgba(0,0,0,0.05) 1px, transparent 1px);
                    background-size: 150px 150px; pointer-events: none; z-index: 2;
                }

                .nav-tag { font-size: 0.67rem; font-weight: 500; letter-spacing: 0.06em; color: var(--muted); }

                .sketch {
                    position: absolute; left: 20%; top: 0; width: 100%; height: 110%;
                    z-index: 3; pointer-events: none; opacity: 0.6; font-size: 50px;
                }
                .sketch svg { position: absolute; left: 0; top: 0; width: 100%; height: 100%; font-family: 'Montserrat', Arial, sans-serif; }

                nav {
                    position: absolute; top: 30px; left: 30px; right: 30px;
                    display: flex; justify-content: space-between; align-items: flex-start; z-index: 10;
                }

                .logo small { font-size: 14px; }
                .top-right { font-size: 14px; font-weight: 700; text-align: right; color: #000; line-height: 1.3; }

                .hero-content { position: relative; z-index: 5; padding: 180px 60px 120px; max-width: 1400px; margin: 0 auto; }

                .cta-group {
                    display: flex; gap: 20px; align-items: center; flex-wrap: wrap;
                    font-family: Montserrat, system-ui; justify-content: center;
                }
                .cta-section .cta-group { justify-content: center; }

                .cta-primary {
                    background: blue; color: var(--text-white); padding: 18px 40px;
                    border-radius: 8px; font-weight: 700; font-size: 16px; text-decoration: none;
                    transition: all 0.3s; box-shadow: 0 4px 15px rgba(0,102,204,0.25); display: inline-block;
                }
                .cta-primary:hover { background: #0052a3; transform: translateY(-3px); box-shadow: 0 8px 25px rgba(0,102,204,0.35); }

                .cta-marketplace {
                    display: inline-flex; align-items: center; justify-content: center;
                    background-color: #ea580c; color: #ffffff; font-weight: 600; font-size: 16px;
                    padding: 14px 36px; border: none; border-radius: 8px; cursor: pointer;
                    transition: all 0.1s ease-in-out; line-height: 1.4; text-align: center; letter-spacing: 1px;
                }
                .cta-marketplace:hover { background-color: #ea580c; box-shadow: 0 8px 25px rgba(135, 48, 1); }

                .arrow-icon { width: 20px; height: 20px; transition: transform 0.3s ease-in-out; }

                @keyframes arrowMove {
                    0%, 20%, 100% { transform: translateX(0); }
                    75% { transform: translateX(10px); }
                }
                .arrow-icon { animation: arrowMove 1s infinite; }

                .cta-secondary {
                    background: transparent; color: black; padding: 18px 40px;
                    border-radius: 8px; font-weight: 600; font-size: 16px; text-decoration: none;
                    border: 2px solid gray; transition: all 0.3s; display: inline-block;
                }
                .cta-secondary:hover { border-color: blue; color: blue; background: rgba(0,102,204,0.05); }

                .logo-photo { left: 0; padding: 10px 90px 40px; font-family: 'Montserrat, system-ui'; }
                .header-logo .logo-text { font-family: 'Montserrat, system-ui'; font-size: 25px; }
                footer .logo-text-lower { font-family: 'Montserrat, system-ui'; font-size: 20px; color: #ffff; }
                footer .logo-photo-lower { margin-bottom: 10px; }

                .headline {
                    position: relative;
                    top: 0;
                    left: 0;
                    width: 100%;
                    padding: 100px 30px 40px;
                    text-align: left;
                    font-weight: 900;
                    font-size: 16px;
                    line-height: 1.2;
                    letter-spacing: -1px;
                    color: var(--text-black);
                    z-index: 5;
                    margin: 0;
                    font-family: 'Montserrat', sans-serif;
                }
                .headline span { 
                    display: block; 
                }
                .headline p { 
                    font-size: 16px; 
                    font-weight: 500; 
                    font-family: 'Montserrat'; 
                    max-width: 100%; 
                    line-height: 1.5; 
                    margin: 15px 0 25px; 
                    padding-right: 20px;
                }
                .subheadline { 
                    font-size: 16px !important; 
                    font-weight: 500; 
                    max-width: 100%; 
                    line-height: 1.5; 
                    margin-bottom: 25px; 
                    font-family: 'Montserrat'; 
                    padding-right: 20px;
                }

                .right-column {
                    display: none;
                }

                .middle-text {
                    display: none;
                }

                .arrow {
                    display: none;
                }

                .section-tag { font-size: 18px; font-weight: 700; color: var(--blue-primary); text-transform: uppercase; letter-spacing: 2px; margin-bottom: 15px; display: block; }
                .section-header { text-align: center; max-width: 800px; margin: 0 auto 80px; }
                .bottom-text { position: absolute; bottom: 8vh; left: 10%; font-weight: 700; font-size: 16px; color: #000; z-index: 5; }
                .logo { left: 10 }

                /* FEATURES */
                .features-section { padding: 10px 10%; background: #ffffff; }
                .section-title-1 p { font-family: 'Montserrat', sans-serif; font-size: clamp(32px, 5vw, 52px); font-weight: 900; line-height: 0.9; margin-bottom: 20px; color: #000; text-align: center; }
                .section-title { font-family: 'Montserrat', sans-serif; font-size: clamp(32px, 5vw, 52px); font-weight: 900; line-height: 0.9; margin-bottom: 20px; color: #000; text-align: center; }
                .feature-title { font-family: Montserrat; font-weight: 700; font-size: 18px; margin-bottom: 12px; color: #000; text-align: left; }
                .feature-description { font-size: 16px; line-height: 1.6; color: var(--text-gray); margin-bottom: 0px; text-align: left; font-family: Montserrat, system-ui; }

                .nav-item.dropdown { position: relative; }
                .dropdown-menu { position: absolute; left: 0; transform: translateX(-50%); background: white; border-radius: 8px; box-shadow: 0 8px 30px rgba(0,0,0,0.15); padding: 12px 0; min-width: 220px; opacity: 0; visibility: hidden; transition: all 0.3s; z-index: 100; top: 100%; margin-top: 10px; }
                .dropdown-menu.open { opacity: 1; visibility: visible; }
                .dropdown-menu a { display: block; padding: 12px 24px; color: var(--text-black); text-decoration: none; font-weight: 500; font-size: 14px; transition: all 0.2s; white-space: nowrap; }
                .dropdown-menu a:hover { background: #e3f2fd; color: #2196f3; }
                .dropdown-menu-item { border-bottom: 1px solid rgba(0,0,0,0.05); }
                .dropdown-menu-item:last-child { border-bottom: none; }

                /* CTA SECTION */
                .cta-section { padding: 120px 60px; background: #004e9c; color: var(--text-white); text-align: center; }
                .cta-section .section-title { color: var(--text-white); margin-bottom: 25px; }
                .cta-section p { font-size: 20px; margin-bottom: 40px; line-height: 1.6; }
                .cta-button { display: inline-block; background: var(--accent); color: #000; padding: 20px 50px; font-size: 18px; font-weight: 900; text-decoration: none; transition: all 0.3s; margin: 10px; }
                .cta-button:hover { background: #fff; transform: translateY(-3px); }
                .cta-button-secondary { background: transparent; color: #fff; border: 3px solid #fff; }
                .cta-button-secondary:hover { background: #fff; color: #000; }
                

                /* FOOTER */
                footer { background: #1a1a1a; color: #999; padding: 60px 60px 30px; font-family: Montserrat !important; }
                .footer-content { max-width: 1400px; margin: 0 auto; display: grid; grid-template-columns: 2fr 1fr 1fr 1fr; gap: 60px; margin-bottom: 40px; font-family: Montserrat !important; }
                .footer-brand { color: var(--text-white); }
                .footer-logo { background: var(--blue-primary); color: white; width: 60px; height: 60px; display: flex; align-items: center; justify-content: center; font-weight: 900; font-size: 20px; margin-bottom: 20px; font-family: Montserrat, system-ui !important; }
                .footer-brand p { line-height: 1.7; margin-bottom: 15px; font-family: Montserrat !important; font-weight: normal; font-size: 16px; text-align: left; }
                .footer-column h4 { color: var(--text-white); font-size: 16px; font-weight: 700; margin-bottom: 20px; font-family: Montserrat !important; font-weight: normal; }
                .footer-column ul { list-style: none; font-family: Montserrat !important; font-weight: normal; }
                .footer-column ul li { margin-bottom: 12px; font-family: Montserrat !important; font-weight: normal; }
                .footer-column a { color: #999; text-decoration: none; transition: color 0.3s; font-family: Montserrat, system-ui !important; font-weight: normal; }
                .footer-column a:hover { color: var(--text-white); font-family: Montserrat !important; font-size: 15px; font-weight: normal; }
                .footer-bottom { border-top: 1px solid #333; padding-top: 30px; text-align: center; font-size: 15px; font-family: Montserrat, system-ui !important; font-weight: normal; }

                .nav-links { display: flex; gap: 40px; align-items: center; font-family: Montserrat; padding: 1px 50px 1px; }
                .nav-links a { color: var(--text-black); text-decoration: none; font-weight: 600; font-size: 14px; letter-spacing: 0.5px; transition: color 0.3s; cursor: pointer; font-family: Montserrat; }
                .nav-links a:hover { color: var(--blue-primary); font-family: Montserrat; }
                .dropdown-toggle { display: flex; align-items: center; gap: 5px; }
                .dropdown-toggle::after { content: "▼"; font-size: 10px; transition: transform 0.3s; }
                .dropdown-toggle.open::after { transform: rotate(180deg); }

                .blue-box {
                    left: 10%; right: 10%; font-size: 1.06vw; max-width: 4000px; font-weight: 500; font-family: 'Montserrat';
                    position: absolute; top: 85vh; background-color: var(--blue-box); padding: 10px 10px; line-height: 1.1;
                    z-index: 5; font-family: 'Montserrat', system-ui; box-shadow: 0 8px 25px rgba(0,102,204,0.35);
                }
                .right-column { display: none; }
                .cta-nav { background: #0052a3; color: #f8fbff !important; padding: 12px 28px; border-radius: 6px; font-weight: 700; }
                .section-description { font-size: 18px; color: var(--text-gray); line-height: 1.7; margin-top: 2px !important; font-family: Montserrat, system-ui; font-weight: normal; }
                .cta-section .section-description { color: rgba(255,255,255,0.9); margin-bottom: 40px; }
                .cta-section .cta-primary { background: black; box-shadow: 0 4px 15px rgba(255,107,53,0.3); }
                .cta-section .cta-primary:hover { transform: translateY(-10px) scale(1.02) !important; border-width: 2px; border-color: white; }
                .cta-section .cta-secondary { background: transparent; color: var(--text-white); border-color: white; }
                .cta-section .cta-secondary:hover { transform: translateY(-10px) scale(1.02) !important; border-color: var(--text-white); background: rgba(255,255,255,0.1); color: var(--text-white); }

                .feature-cards { display: grid !important; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)) !important; gap: 40px !important; max-width: 1400px; margin: 0 auto; }
                .feature-cards, .features-section, .testimonials-section, .cta-section, footer { padding-left: 40px; padding-right: 40px; }
                .feature-card { background: #e4e9ed !important; border-radius: 12px !important; padding: 40px !important; box-shadow: 0 20px 50px rgba(0,0,0,0.08) !important; border: 2px solid rgba(0,0,0,0.08) !important; transition: all 0.3s ease !important; font-family: Montserrat, system-ui; color: #e4e9ed; font-weight: normal; }
                .feature-card:hover { transform: translateY(-10px) scale(1.02) !important; box-shadow: 0 30px 70px rgba(0,0,0,0.15) !important; border-color: #0864bf !important; cursor: pointer; }
                .features-section { padding: 100px 60px; background: #ffffff; position: relative; }
                .features-grid { display: grid !important; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)) !important; gap: 40px !important; max-width: 1400px; margin: 0 auto; }
                .feature-item:hover { transform: translateY(-10px) scale(1.02) !important; box-shadow: 0 30px 70px rgba(0,0,0,0.15) !important; border-color: #0864bf !important; cursor: pointer; }
                .feature-icon { width: 64px !important; height: 64px !important; background: var(--blue-primary); border-radius: 14px !important; display: flex !important; align-items: center !important; justify-content: center !important; margin-bottom: 24px !important; color: var(--text-white); font-size: 30px !important; }
                .cta-group-header { display: flex; gap: 20px; align-items: center; flex-wrap: wrap; font-family: Montserrat, system-ui; letter-spacing: 1px; }
                .cta-group-header .cta-primary { background: var(--blue-primary); color: var(--text-white); padding: 18px 40px; border-radius: 8px; font-weight: 700; font-size: 16px; text-decoration: none; transition: all 0.3s; box-shadow: 0 4px 15px rgba(0,102,204,0.25); display: inline-block; letter-spacing: 1px; }
                .cta-group-header .cta-primary:hover { background: #0052a3; transform: translateY(-3px); box-shadow: 0 8px 25px rgba(0,102,204,0.35); }
                .cta-group-header .cta-secondary { background: transparent; color: var(--text-black); padding: 16px 40px; border-radius: 8px; font-weight: 600; font-size: 16px; text-decoration: none; border: 2px solid var(--border-gray); transition: all 0.3s; display: inline-block; letter-spacing: 1px; }
                .cta-group-header .cta-secondary:hover { border-color: var(--blue-primary); color: var(--blue-primary); background: rgba(0,102,204,0.05); box-shadow: 0 8px 25px rgba(0,102,204,0.35); }
                .cta-nav:hover { transform: translateY(-3px); box-shadow: 0 8px 25px rgba(0,102,204,0.35); }
                .arrow { left: 8%; }

                /* TESTIMONIALS */
                .testimonials-section { padding: 120px 60px; background: linear-gradient(135deg, #f8fbff 0%, #e6f2ff 100%); }
                .testimonials-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 30px; max-width: 1400px; margin: 0 auto; }
                .testimonial { background: white; padding: 35px; border-radius: 12px; box-shadow: 0 4px 20px rgba(0,0,0,0.06); }
                .testimonial-text { font-size: 16px; line-height: 1.7; color: var(--text-black); margin-bottom: 25px; font-style: italic; }
                .testimonial-author { display: flex; align-items: center; gap: 15px; }
                .author-avatar { width: 50px; height: 50px; border-radius: 50%; background: var(--blue-primary); display: flex; align-items: center; justify-content: center; color: white; font-weight: 700; font-size: 18px; }
                .author-info { flex: 1; }
                .author-name { font-weight: 700; font-size: 15px; margin-bottom: 3px; }
                .author-title { font-size: 13px; color: var(--text-gray); }
                .features-explanation { padding: 120px 60px; background: #f8fbff; }
                .feature-detail { max-width: 900px; margin: 0 auto 100px; }
                .feature-detail h2 { font-size: 36px; margin-bottom: 20px; }
                .feature-detail p { font-size: 18px; line-height: 1.7; }

                @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
                @keyframes marquee-reverse { 0% { transform: translateX(-50%); } 100% { transform: translateX(0); } }
                .animate-marquee { animation: marquee 30s linear infinite; }
                .animate-marquee-reverse { animation: marquee-reverse 30s linear infinite; }
                .animate-spin-slow { animation: spin 10s linear infinite; }
                .whitespace-nowrap { white-space: nowrap; }

                /* ===================== NEW ADDITIONS ===================== */

                /* STATS STRIP */
                .stats-strip {
                    background: #ffffff;
                    border-top: 1px solid #e5e7eb;
                    border-bottom: 4px solid #0066cc;
                    padding: 60px 60px;
                    overflow: hidden;
                }
                .stats-inner { max-width: 1400px; margin: 0 auto; display: grid; grid-template-columns: repeat(3,1fr); gap: 2rem; }
                .stat-divider { width: 1px; background: #e5e7eb; height: 80px; margin: auto; }

                /* MODULE TABS */
                .modules-section { padding: 120px 60px; background: #f8fbff; }
                .modules-tabs { display: flex; gap: 8px; flex-wrap: wrap; justify-content: center; margin-bottom: 48px; }
                .mod-tab {
                    padding: 10px 22px; border-radius: 999px; font-size: 13px; font-weight: 700;
                    letter-spacing: .05em; text-transform: uppercase; cursor: pointer;
                    border: 2px solid #e5e7eb; background: white; color: #666;
                    transition: all .25s; font-family: Montserrat, system-ui;
                }
                .mod-tab.active { border-color: var(--tab-color); background: var(--tab-color); color: white; box-shadow: 0 6px 20px rgba(0,0,0,.15); }
                .mod-tab:hover:not(.active) { border-color: var(--tab-color); color: var(--tab-color); }
                .mod-panel {
                    max-width: 1100px; margin: 0 auto;
                    display: grid; grid-template-columns: 1fr 1fr; gap: 60px; align-items: center;
                }
                .mod-text h3 { font-size: clamp(28px,4vw,42px); font-weight: 900; color: #1a1a1a; margin-bottom: 20px; font-family: Montserrat, system-ui; line-height: 1.1; }
                .mod-text p  { font-size: 17px; line-height: 1.8; color: #444; margin-bottom: 24px; font-family: Montserrat, system-ui; }
                .mod-pills  { display: flex; flex-wrap: wrap; gap: 8px; }
                .mod-pill   { padding: 6px 14px; border-radius: 999px; font-size: 12px; font-weight: 700; letter-spacing: .06em; font-family: Montserrat, system-ui; }
                .mod-visual {
                    background: #ffffff; border: 1.5px solid #e5e7eb; border-radius: 20px;
                    padding: 40px; min-height: 280px;
                    box-shadow: 0 12px 40px rgba(0,0,0,.07);
                    display: flex; flex-direction: column; justify-content: center;
                    position: relative; overflow: hidden;
                }
                .mod-visual::before {
                    content: attr(data-label);
                    position: absolute; top: 16px; right: 20px;
                    font-size: 10px; font-weight: 800; letter-spacing: .2em; text-transform: uppercase;
                    color: #ccc; font-family: Montserrat, system-ui;
                }

                /* PIPELINE */
                .pipeline-section { padding: 120px 60px; background: #001a5e; color: white; position: relative; overflow: hidden; }
                .pipeline-section::before { content: ''; position: absolute; inset: 0; background: radial-gradient(ellipse 800px 500px at 50% 50%, rgba(0,102,204,.25) 0%, transparent 70%); pointer-events: none; }
                .pipeline-steps-wrap { display: grid; grid-template-columns: repeat(4,1fr); gap: 0; max-width: 1100px; margin: 60px auto 0; position: relative; }
                .pipeline-steps-wrap::before { content: ''; position: absolute; top: 34px; left: 12%; right: 12%; height: 2px; background: rgba(255,255,255,.15); z-index: 0; }
                .pipe-step { display: flex; flex-direction: column; align-items: center; text-align: center; padding: 0 20px; position: relative; z-index: 1; }
                .pipe-circle { width: 70px; height: 70px; border-radius: 50%; border: 2px solid rgba(255,255,255,.2); background: rgba(255,255,255,.06); display: flex; align-items: center; justify-content: center; margin-bottom: 20px; transition: all .3s; }
                .pipe-step:hover .pipe-circle { border-color: var(--pc); background: rgba(255,255,255,.12); box-shadow: 0 0 0 8px rgba(255,255,255,.04); }
                .pipe-num { font-size: 22px; font-weight: 900; color: var(--pc); font-family: Montserrat, system-ui; }
                .pipe-title { font-size: 16px; font-weight: 800; color: white; margin-bottom: 6px; font-family: Montserrat, system-ui; }
                .pipe-sub { font-size: 13px; color: rgba(255,255,255,.55); margin-bottom: 12px; font-family: Montserrat, system-ui; }
                .pipe-code { font-size: 11px; font-weight: 700; letter-spacing: .1em; padding: 4px 12px; border-radius: 999px; background: rgba(255,255,255,.08); border: 1px solid rgba(255,255,255,.15); color: rgba(255,255,255,.65); font-family: Montserrat, system-ui; }

                /* COMPARISON */
                .compare-section { padding: 120px 60px; background: white; }
                .compare-table-wrap { max-width: 900px; margin: 0 auto; border: 1.5px solid #e5e7eb; border-radius: 16px; overflow: hidden; box-shadow: 0 12px 40px rgba(0,0,0,.06); }
                .compare-header { display: grid; grid-template-columns: 2fr 1fr 1fr 1fr; background: #1a1a1a; padding: 20px 32px; }
                .compare-header span { font-size: 13px; font-weight: 800; letter-spacing: .12em; text-transform: uppercase; text-align: center; font-family: Montserrat, system-ui; color: white; }
                .compare-header span:first-child { text-align: left; color: rgba(255,255,255,.55); }
                .compare-header .uru-head { color: #60a5fa !important; }
                .compare-row { display: grid; grid-template-columns: 2fr 1fr 1fr 1fr; padding: 16px 32px; border-bottom: 1px solid #f3f4f6; align-items: center; transition: background .2s; cursor: pointer }
                .compare-row:last-child { border-bottom: none; }
                .compare-row:hover { background: #f8fbff; }
                .compare-row span:first-child { font-size: 14px; font-weight: 600; color: #1a1a1a; font-family: Montserrat, system-ui; }
                .compare-cell { display: flex; justify-content: center; }
                .check { width: 22px; height: 22px; border-radius: 50%; display: flex; align-items: center; justify-content: center; }
                .check.yes { background: #ecfdf5; }
                .check.no  { background: #fff0f0; }

                /* HOW IT WORKS */
                .hiw-section { padding: 120px 60px; background: #f8fbff; }
                .hiw-steps { max-width: 1000px; margin: 0 auto; display: flex; flex-direction: column; gap: 0; }
                .hiw-step { display: grid; grid-template-columns: 80px 4px 1fr; gap: 0 24px; padding-bottom: 48px; position: relative; }
                .hiw-step:last-child { padding-bottom: 0; }
                .hiw-step:last-child .hiw-line { display: none; }
                .hiw-numcol { display: flex; flex-direction: column; align-items: center; }
                .hiw-bubble { width: 60px; height: 60px; border-radius: 50%; background: #0066cc; color: white; font-size: 20px; font-weight: 900; display: flex; align-items: center; justify-content: center; font-family: Montserrat, system-ui; flex-shrink: 0; box-shadow: 0 6px 20px rgba(0,102,204,.3); }
                .hiw-line { flex: 1; width: 2px; background: #dde1ea; margin-top: 8px; }
                .hiw-content { padding-top: 12px; padding-bottom: 0; }
                .hiw-content h3 { font-size: 22px; font-weight: 800; color: #1a1a1a; margin-bottom: 8px; font-family: Montserrat, system-ui; }
                .hiw-content p  { font-size: 16px; line-height: 1.7; color: #555; font-family: Montserrat, system-ui; }

                /* BUILT FOR STRIP */
                .built-for { padding: 100px 60px; background: #0066cc; color: white; overflow: hidden; position: relative; }
                .built-for::before { content: ''; position: absolute; inset: 0; background: repeating-linear-gradient(45deg, rgba(255,255,255,.03) 0px, rgba(255,255,255,.03) 1px, transparent 1px, transparent 40px); pointer-events: none; }
                .built-for-grid { max-width: 1400px; margin: 0 auto; display: grid; grid-template-columns: repeat(3,1fr); gap: 2px; cursor: pointer}
                .bf-card { background: rgba(255,255,255,.07); padding: 48px 40px; transition: background .3s; position: relative; }
                .bf-card:hover { background: rgba(255,255,255,.12); }
                .bf-card::before { content: ''; position: absolute; top: 0; left: 0; width: 3px; height: 100%; background: rgba(255,255,255,.3); }
                .bf-icon { font-size: 40px; margin-bottom: 20px; }
                .bf-card h3 { font-size: 22px; font-weight: 800; color: white; margin-bottom: 12px; font-family: Montserrat, system-ui; }
                .bf-card p  { font-size: 15px; line-height: 1.7; color: rgba(255,255,255,.65); font-family: Montserrat, system-ui; }

                /* INTEGRATION LOGOS */
                .integrations-section { padding: 80px 60px; background: white; border-bottom: 1px solid #e5e7eb; }
                .int-logos { display: flex; flex-wrap: wrap; gap: 40px; justify-content: center; align-items: center; max-width: 1000px; margin: 0 auto; }
                .int-logo { display: flex; align-items: center; gap: 10px; padding: 14px 28px; border: 1.5px solid #e5e7eb; border-radius: 12px; font-size: 14px; font-weight: 700; color: #555; font-family: Montserrat, system-ui; transition: all .25s; cursor: default; }
                .int-logo:hover { border-color: #0066cc; color: #0066cc; transform: translateY(-3px); box-shadow: 0 8px 24px rgba(0,102,204,.1); }

                /* PRICING TEASER */
                .pricing-section { padding: 120px 60px; background: linear-gradient(135deg, #001a5e 0%, #003399 100%); color: white; position: relative; overflow: hidden; }
                .pricing-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 24px; max-width: 1100px; margin: 60px auto 0; }
                .price-card { background: rgba(255,255,255,.07); border: 1.5px solid rgba(255,255,255,.12); border-radius: 16px; padding: 40px 36px; transition: all .3s; position: relative; overflow: hidden; }
                .price-card.featured { background: rgba(255,255,255,.12); border-color: rgba(255,255,255,.35); transform: scale(1.03); }
                .price-card:hover { background: rgba(255,255,255,.13); transform: translateY(-8px); }
                .price-card.featured:hover { transform: scale(1.03) translateY(-8px); }
                .price-tag { font-size: 10px; font-weight: 800; letter-spacing: .2em; text-transform: uppercase; color: rgba(255,255,255,.5); margin-bottom: 16px; display: block; font-family: Montserrat, system-ui; }
                .price-name { font-size: 24px; font-weight: 900; color: white; margin-bottom: 8px; font-family: Montserrat, system-ui; }
                .price-amount { font-size: 52px; font-weight: 900; color: white; letter-spacing: -3px; line-height: 1; margin: 16px 0 8px; font-family: Montserrat, system-ui; }
                .price-amount span { font-size: 18px; font-weight: 600; letter-spacing: 0; color: rgba(255,255,255,.6); vertical-align: super; margin-right: 4px; }
                .price-period { font-size: 13px; color: rgba(255,255,255,.4); margin-bottom: 32px; font-family: Montserrat, system-ui; }
                .price-features { list-style: none; margin-bottom: 36px; display: flex; flex-direction: column; gap: 12px; }
                .price-features li { font-size: 14px; color: rgba(255,255,255,.75); display: flex; align-items: center; gap: 10px; font-family: Montserrat, system-ui; }
                .price-features li::before { content: '✓'; font-size: 12px; font-weight: 900; color: #4ade80; flex-shrink: 0; }
                .price-btn { display: block; text-align: center; padding: 14px; border-radius: 10px; font-size: 14px; font-weight: 700; text-decoration: none; transition: all .25s; font-family: Montserrat, system-ui; letter-spacing: .04em; cursor: pointer; border: none; }
                .price-btn.outline { background: transparent; color: white; border: 2px solid rgba(255,255,255,.3); }
                .price-btn.outline:hover { background: rgba(255,255,255,.1); border-color: rgba(255,255,255,.6); }
                .price-btn.filled { background: white; color: #001a5e; }
                .price-btn.filled:hover { background: #e6f2ff; transform: translateY(-2px); }
                .popular-badge { position: absolute; top: 16px; right: 16px; background: #ffd166; color: #1a1a1a; font-size: 10px; font-weight: 900; letter-spacing: .1em; text-transform: uppercase; padding: 4px 10px; border-radius: 999px; font-family: Montserrat, system-ui; }

                /* FAQ */
                .faq-section { padding: 120px 60px; background: white; }
                .faq-list { max-width: 800px; margin: 0 auto; display: flex; flex-direction: column; gap: 4px; }
                .faq-item { border: 1.5px solid #e5e7eb; border-radius: 12px; overflow: hidden; transition: border-color .25s; }
                .faq-item.open { border-color: #0066cc; }
                .faq-q { padding: 22px 28px; display: flex; justify-content: space-between; align-items: center; cursor: pointer; font-size: 16px; font-weight: 700; color: #1a1a1a; font-family: Montserrat, system-ui; transition: background .2s; }
                .faq-q:hover { background: #f8fbff; }
                .faq-arrow { font-size: 18px; transition: transform .3s; color: #0066cc; }
                .faq-arrow.open { transform: rotate(45deg); }
                .faq-a { max-height: 0; overflow: hidden; transition: max-height .4s ease, padding .3s; padding: 0 28px; font-size: 15px; line-height: 1.75; color: #555; font-family: Montserrat, system-ui; }
                .faq-a.open { max-height: 200px; padding: 0 28px 22px; }

                /* FINAL BANNER */
                .final-banner { background: #1a1a1a; padding: 120px 60px; text-align: center; position: relative; overflow: hidden; }
                .final-banner::before { content: 'URUSENTRA'; position: absolute; top: 50%; left: 50%; transform: translate(-50%,-50%); font-size: 18vw; font-weight: 900; letter-spacing: -4px; color: rgba(255,255,255,.025); pointer-events: none; white-space: nowrap; font-family: Montserrat, system-ui; }
                .final-banner h2 { font-size: clamp(2.5rem,5vw,5rem); font-weight: 900; color: white; line-height: 1.05; letter-spacing: -3px; margin-bottom: 24px; font-family: Montserrat, system-ui; }
                .final-banner h2 em { font-style: normal; color: #60a5fa; }
                .final-banner p { font-size: 18px; color: rgba(255,255,255,.6); max-width: 600px; margin: 0 auto 48px; line-height: 1.7; font-family: Montserrat, system-ui; }

                /* ANIMATED FLOATING ORBS */
                @keyframes orb1 { 0%,100%{transform:translate(0,0) scale(1)} 33%{transform:translate(30px,-20px) scale(1.05)} 66%{transform:translate(-15px,15px) scale(.97)} }
                @keyframes orb2 { 0%,100%{transform:translate(0,0) scale(1)} 33%{transform:translate(-25px,20px) scale(1.03)} 66%{transform:translate(20px,-10px) scale(.98)} }
                @keyframes orb3 { 0%,100%{transform:translate(0,0)} 50%{transform:translate(15px,25px)} }
                .orb { position: absolute; border-radius: 50%; pointer-events: none; filter: blur(60px); }
                .orb1 { width: 400px; height: 400px; background: rgba(0,102,204,.12); top: -100px; right: -100px; animation: orb1 12s ease-in-out infinite; }
                .orb2 { width: 300px; height: 300px; background: rgba(234,88,12,.1); bottom: 50px; left: -80px; animation: orb2 15s ease-in-out infinite; }
                .orb3 { width: 200px; height: 200px; background: rgba(255,209,102,.12); top: 40%; left: 40%; animation: orb3 9s ease-in-out infinite; }

                /* ANIMATED BARS (module visual) */
                @keyframes barRise { from { transform: scaleY(0); } to { transform: scaleY(1); } }
                .bar-rise { transform-origin: bottom; animation: barRise .7s ease-out both; }

                /* REVEAL ANIMATION */
                @keyframes revealUp { from{opacity:0;transform:translateY(32px)} to{opacity:1;transform:translateY(0)} }
                .reveal-up { animation: revealUp .65s ease both; }

                /* SCROLLING METRIC BAND */
                .metric-band { background: #ffd166; border-top: 3px solid #1a1a1a; border-bottom: 3px solid #1a1a1a; padding: 18px 0; overflow: hidden; }
                .metric-band-inner { display: flex; gap: 0; white-space: nowrap; animation: marquee 20s linear infinite; }
                .mbitem { padding: 0 48px; font-size: 15px; font-weight: 900; letter-spacing: .1em; text-transform: uppercase; color: #1a1a1a; font-family: Montserrat, system-ui; display: inline-flex; align-items: center; gap: 16px; }
                .mbitem::after { content: '●'; color: #0066cc; font-size: 8px; }

                @keyframes spin { to { transform: rotate(360deg); } }

                /* RESPONSIVE */
                @media(max-width:768px) {
                    .stats-inner { grid-template-columns: 1fr 1fr; }
                    .mod-panel { grid-template-columns: 1fr; }
                    .pipeline-steps-wrap { grid-template-columns: 1fr 1fr; }
                    .compare-section { padding: 60px 20px; }
                    .pricing-grid { grid-template-columns: 1fr; }
                    .built-for-grid { grid-template-columns: 1fr; }
                    .hiw-step { grid-template-columns: 60px 4px 1fr; }
                }
                    /* Tablet */
                @media (min-width: 768px) {
                    .headline {
                        padding: 120px 50px 60px;
                        font-size: 48px;
                    }
                    .headline span {
                        font-size: 42px !important;
                    }
                    .headline p {
                        font-size: 18px;
                        max-width: 600px;
                        padding-right: 0;
                    }
                    .subheadline {
                        font-size: 18px !important;
                        padding-right: 0;
                    }
                    .right-column {
                        display: block;
                        position: absolute;
                        top: 28vh;
                        right: 8%;
                    }
                    .middle-text {
                        display: block;
                        position: absolute;
                        top: 50vh;
                        left: 50%;
                        transform: translateX(-50%);
                    }
                    .arrow {
                        display: block;
                    }
                }

                /* Desktop */
                @media (min-width: 1024px) {
                    .headline {
                        padding: 180px 80px 80px;
                        font-size: 20px;
                    }
                    .headline p {
                        font-size: 20px;
                    }
                }

                /* Large Desktop */
                @media (min-width: 1440px) {
                    .headline {
                        padding: 180px 120px 80px;
                    }
                }

                /* MOBILE PHONES */
                @media (max-width: 428px) {
                    nav {
                        padding: 15px 15px !important;
                        flex-wrap: wrap !important;
                        gap: 10px !important;
                    }
                    
                    .nav-links {
                        gap: 8px !important;
                        padding: 0 !important;
                        flex-wrap: wrap !important;
                    }
                    
                    .nav-links a {
                        font-size: 11px !important;
                    }
                    
                    .headline {
                        padding: 70px 15px 25px !important;
                        font-size: 28px !important;
                    }
                    
                    .headline p {
                        font-size: 14px !important;
                        max-width: 100% !important;
                        margin-bottom: 20px !important;
                    }
                    
                    .cta-group-header {
                        flex-wrap: wrap !important;
                        gap: 8px !important;
                    }
                    
                    .cta-group-header .cta-primary,
                    .cta-group-header .cta-secondary {
                        padding: 8px 16px !important;
                        font-size: 12px !important;
                    }
                    
                    .cta-marketplace {
                        padding: 8px 16px !important;
                        font-size: 12px !important;
                    }
                    
                    .right-column,
                    .middle-text,
                    .arrow {
                        display: none !important;
                    }
                }

                

            `}</style>

            {/* ===== HERO (original — untouched) ===== */}
            <section className="hero">
                <div className="background"></div>
                <div className="grid-lines"></div>
                <div className="sketch" aria-hidden="true" style={{ width: '100%' }}>
                    <svg preserveAspectRatio="xMidYMid meet" viewBox="0 0 1200 3200" xmlns="http://www.w3.org/2000/svg">
                        <style>{`
                            @keyframes traceWithLongPause {
                                0% { stroke-dashoffset: 2500; opacity: 0; }
                                2% { opacity: 1; }
                                60% { stroke-dashoffset: 0; opacity: 1; }
                                100% { stroke-dashoffset: 0; opacity: 1; }
                            }
                            @keyframes labelsFade { 0%, 50% { opacity: 0; } 60%, 100% { opacity: 1; } }
                            .bold-draw { stroke: #000 !important; stroke-dasharray: 2500; stroke-dashoffset: 2500; animation: traceWithLongPause 10s ease-in-out infinite; strokeLinecap: round; strokeLinejoin: round; }
                            .grid-line { stroke: rgba(0,0,0,0.05); }
                            .labels { animation: labelsFade 10s ease-in-out infinite; }
                        `}</style>
                        <defs>
                            <marker id="arrowhead" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto" markerUnits="strokeWidth">
                                <path d="M0,0 L8,3 L0,6 z" fill="#000" />
                            </marker>
                        </defs>
                        <g strokeWidth="1">
                            {Array.from({length:20}).map((_,i) => (<line key={`v${i}`} x1={60+i*60} y1="0" x2={60+i*60} y2="3200" className="grid-line" />))}
                            {Array.from({length:54}).map((_,i) => (<line key={`h${i}`} x1="0" y1={40+i*60} x2="1200" y2={40+i*60} className="grid-line" />))}
                        </g>
                        <g strokeWidth="4" fill="none" className="bold-draw">
                            <rect x="70" y="860" width="1060" height="920" />
                            <rect x="460" y="900" width="10" height="840" />
                            <path d="M760 900 L760 1400" strokeDasharray="6 4" />
                        </g>
                        <g strokeWidth="2.5" fill="none" className="bold-draw" style={{animationDelay: '1s'}}>
                            <rect x="120" y="910" width="160" height="160" />
                            <rect x="940" y="910" width="160" height="160" />
                            <rect x="740" y="1300" width="90" height="200" />
                            <path d="M740 1300 A90 90 0 0 1 830 1390" />
                        </g>
                        <g strokeWidth="3" fill="none" className="bold-draw" style={{animationDelay: '2s'}}>
                            <rect x="300" y="1260" width="320" height="120" rx="8" />
                            <circle cx="270" cy="1310" r="18" />
                            <circle cx="640" cy="1310" r="18" />
                        </g>
                        <g transform="translate(80,2000)" strokeWidth="2.5" fill="none" className="bold-draw" style={{animationDelay: '3s'}}>
                            <rect x="0" y="0" width="560" height="360" />
                            <line x1="0" y1="40" x2="560" y2="40" />
                            <line x1="120" y1="0" x2="120" y2="360" />
                        </g>
                        <g fill="#000" className="labels" style={{ fontWeight: 'bold', fontFamily: 'Arial, sans-serif' }}>
                            <text x="610" y="800" fontSize="24" textAnchor="middle">9800 mm</text>
                            <text x="520" y="980" fontSize="25">Open Plan Studio</text>
                            <text x="280" y="2026" fontSize="22" textAnchor="middle">SECTION A-A</text>
                            <text x="460" y="1420" fontSize="20" textAnchor="middle">1800 mm</text>
                        </g>
                        <g stroke="#000" strokeWidth="2" fill="none" className="bold-draw" style={{animationDelay: '4s'}}>
                            <line x1="80" y1="820" x2="1140" y2="820" markerStart="url(#arrowhead)" markerEnd="url(#arrowhead)" />
                            <line x1="1160" y1="880" x2="1160" y2="1780" markerStart="url(#arrowhead)" markerEnd="url(#arrowhead)" />
                        </g>
                    </svg>
                </div>

                <nav>
                    <div className="header-logo">
                        <div className="logo-photo">
                            <a href='/'>
                                <div className="flex items-center space-x-3">
                                    <svg className="w-9 h-9 text-orange-800" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z"/>
                                    </svg>
                                    <div><h1 className="logo-text-lower text-xl font-bold text-gray-900" style={{ fontFamily: 'Montserrat, system-ui' }}>Urusentra</h1></div>
                                </div>
                            </a>
                        </div>
                    </div>
                    <div className="nav-links">
                        <div className="nav-item dropdown" onMouseEnter={() => setFeaturesOpen(true)} onMouseLeave={() => setFeaturesOpen(false)}>
                            <a className={`dropdown-toggle ${featuresOpen ? 'open' : ''}`}>Features</a>
                            <div id='features' className={`dropdown-menu ${featuresOpen ? 'open' : ''}`}>
                                <div className="dropdown-menu-item"><a href="/client-feature">Customer Management</a></div>
                                <div className="dropdown-menu-item"><a href="/project-feature">Project Management</a></div>
                                <div className="dropdown-menu-item"><a href="/accounting-feature">Accounting & Finance</a></div>
                                <div className="dropdown-menu-item"><a href="#estimation">Sales Management</a></div>
                                <div className="dropdown-menu-item"><a href="/reports-feature">Analytics & Reporting</a></div>
                                <div className="dropdown-menu-item"><a href="/supplier-feature">Suppliers Management</a></div>
                            </div>
                        </div>
                        <a href="#section-tag">Solutions</a>
                        <a href="/pricing">Pricing</a>
                        <a href="/login">Login</a>
                        <a href="/pricing" className="cta-nav">Try It Out</a>
                    </div>
                </nav>

                <div className="headline">
                    <span>Manage Your building company.</span>
                    <span className='text-[#002c9c] text-5xl tracking-wide'>Find Suppliers Worldwide.</span>
                    <p className='subheadline'>
                        URUSENTRA is engineered specifically with the building industry in mind, meant to improve your company's operational efficiency and revenue tremendously. 
                    </p>
                    <div className="cta-group-header">
                        <a href="/pricing" className="cta-primary">Try Out ERP</a>
    
                        <button className="cta-marketplace" onClick={() => navigate("/marketplace")}>
                            Try Out Marketplace
                            <ArrowRight className="ml-2 arrow-icon" />
                        </button>
                    </div>
                    <div>
                    </div>
                </div>
            </section>

            {/* ===== NEW: LIVE METRICS BAND ===== */}
            <div className="metric-band">
                <div className="metric-band-inner">
                    {Array.from({length: 6}).map((_, i) => (
                        <React.Fragment key={i}>
                            <span className="mbitem">Auto-Balanced Accounts</span>
                            <span className="mbitem">Job Costing & Estimation</span>
                            <span className="mbitem">Bill Of Quantities</span>
                            <span className="mbitem">Project Phase Management</span>
                            <span className="mbitem">Find Suppliers worldwide</span>
                            <span className="mbitem">Real-Time Variance</span>
                        </React.Fragment>
                    ))}
                </div>
            </div>

            {/* ===== NEW: STATS STRIP ===== */}
            <div className="stats-strip" ref={statsRef}>
                <div className="stats-inner">
                    <StatCard prefix="$" value={100000} suffix="+" label="monthly costing saved" color="#059669" inView={statsInView} />
                    <StatCard prefix="" value={50} suffix="%" label="annual impact on job cost variance" color="#059669" inView={statsInView} />
                    <StatCard prefix="" value={14} suffix=" Day" label="Free Demo, No Card" color="#6d28d9" inView={statsInView} />
                </div>
            </div>

            {/* ===== ORIGINAL: SUPPLIER MARQUEE + BLUE SECTION ===== */}
            <a href='/marketplace'>
                <div className="bg-[#001a5e] border-y border-white/10 py-3 overflow-hidden sticky top-0 z-50">
                    <div className="animate-marquee whitespace-nowrap flex items-center">
                        {Array.from({length: 4}).map((_, i) => (
                            <React.Fragment key={i}>
                                <span className="mx-12 text-[10px] font-mono font-bold uppercase tracking-[0.3em] text-emerald-400">Steel Index / +1.2%</span>
                                <span className="mx-12 text-[10px] font-mono font-bold uppercase tracking-[0.3em] text-yellow-500">Lumber / $540.00/mbf</span>
                                <span className="mx-12 text-[10px] font-mono font-bold uppercase tracking-[0.3em] text-rose-500">Nails / -0.4%</span>
                                <span className="mx-12 text-[10px] font-mono font-bold uppercase tracking-[0.3em] text-yellow-500">Wood / STABLE</span>
                            </React.Fragment>
                        ))}
                    </div>
                </div>

                <section className="relative bg-[#002c9c] text-white py-32 overflow-hidden">
                    <div className="absolute inset-0 opacity-5 pointer-events-none">
                        <svg width="100%" height="100%"><pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse"><path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5"/></pattern><rect width="100%" height="100%" fill="url(#grid)" /></svg>
                    </div>
                    <div className="absolute inset-0 pointer-events-none flex items-start overflow-hidden">
                        <div className="w-full opacity-50 select-none">
                            <div className="animate-marquee whitespace-nowrap flex items-center">
                                {Array.from({length: 4}).map((_, i) => (<span key={i} className="text-[5vw] font-black uppercase tracking-tighter text-white mx-12 italic">DISCOUNTED SUPPLIERS PRICES • </span>))}
                            </div>
                        </div>
                    </div>
                    <div className="absolute inset-0 pointer-events-none flex items-end overflow-hidden">
                        <div className="w-full opacity-50 select-none">
                            <div className="animate-marquee whitespace-nowrap flex items-center">
                                {Array.from({length: 4}).map((_, i) => (<span key={i} className="text-[5vw] font-black uppercase tracking-tighter mx-12 italic text-transparent" style={{ WebkitTextStroke: '2px white' }}>FIND BUILDING SUPPLIERS • WORLDWIDE • </span>))}
                            </div>
                        </div>
                    </div>
                    <div className="absolute inset-0 pointer-events-none flex items-center overflow-hidden">
                        <div className="w-full opacity-50 select-none">
                            <div className="animate-marquee whitespace-nowrap flex items-center gap-32">
                                {Array.from({length: 4}).map((_, i) => (<span key={i} className="text-[2vw] font-black tracking-tighter italic text-white">urusentra.com/marketplace <span className="gap-32 opacity-50">•</span></span>))}
                            </div>
                        </div>
                    </div>
                    <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative">
                        <div className="space-y-48">
                            <div className="group grid grid-cols-1 lg:grid-cols-12 gap-12 items-center scroll-mt-40">
                                <div className="lg:col-span-5 relative flex justify-center">
                                    <div className="w-64 h-64 border-2 border-dashed border-white/20 rounded-full flex items-center justify-center animate-spin-slow">
                                        <div className="w-48 h-48 border border-emerald-400/50 rounded-full flex items-center justify-center">
                                            <div className="w-4 h-4 bg-white animate-ping" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <div id="suppliers" className="bg-emerald-400 py-6 overflow-hidden border-t-4 border-black">
                    <div className="animate-marquee whitespace-nowrap flex items-center font-black text-2xl text-[#002c9c] uppercase tracking-tighter">
                        {Array.from({length: 8}).map((_, i) => (
                            <span key={i} className="mx-10 flex items-center gap-4">
                                5000+ Verified Suppliers Connected <div className="w-3 h-3 bg-[#002c9c] rounded-full animate-ping"/>
                                CHINA <div className="w-3 h-3 bg-[#002c9c] rounded-full animate-ping"/>
                                SOUTH AFRICA <div className="w-3 h-3 bg-[#002c9c] rounded-full animate-ping"/>
                                INDONESIA <div className="w-3 h-3 bg-[#002c9c] rounded-full animate-ping"/>
                                MALAYSIA <div className="w-3 h-3 bg-[#002c9c] rounded-full animate-ping"/>
                            </span>
                        ))}
                    </div>
                </div>
            </a>

            {/* ===== NEW: MODULE DEEP DIVE ===== */}
            <section className="modules-section">
                <div style={{ textAlign: 'center', marginBottom: '16px' }}>
                </div>
                <div className="section-title" style={{ marginBottom: '16px' }}>
                    
                    <span id="section-tag" className="section-tag">Complete Solution</span>
                    <h2 className="section-title-1">
                        <p>Everything You Need To</p>
                        <p>Deliver Faster</p>
                    </h2>
                </div>
                <p style={{ textAlign: 'center', fontSize: '18px', color: '#666', maxWidth: '600px', margin: '0 auto 48px', fontFamily: 'Montserrat, system-ui', lineHeight: 1.7 }}>
                    Six integrated modules. Each one built from real accounting logic and real construction workflows.
                </p>
                <div className="modules-tabs">
                    {modules.map((m, i) => (
                        <button key={i} className={`mod-tab${activeTab === i ? ' active' : ''}`}
                            style={{ '--tab-color': m.color } as React.CSSProperties}
                            onClick={() => setActiveTab(i)}>
                            {m.label}
                        </button>
                    ))}
                </div>
                {(() => {
                    const m = modules[activeTab];
                    const bars = [55,80,40,95,65,75,50,85];
                    return (
                        <div className="mod-panel">
                            <div className="mod-text">
                                <div style={{ display: 'inline-block', padding: '4px 14px', borderRadius: '999px', background: m.light, border: `1px solid ${m.border}`, fontSize: '11px', fontWeight: 800, letterSpacing: '.12em', textTransform: 'uppercase', color: m.color, marginBottom: '16px', fontFamily: 'Montserrat, system-ui' }}>
                                    {m.label}
                                </div>
                                <h3 style={{ color: m.color }}>{m.title}</h3>
                                <p>{m.desc}</p>
                                <div className="mod-pills">
                                    {m.pills.map((p, pi) => (
                                        <span key={pi} className="mod-pill" style={{ background: m.light, border: `1px solid ${m.border}`, color: m.color }}>{p}</span>
                                    ))}
                                </div>
                                <a href={m.link} style={{ display: 'inline-block', marginTop: '28px', padding: '12px 28px', background: m.color, color: 'white', borderRadius: '8px', fontWeight: 700, fontSize: '14px', textDecoration: 'none', fontFamily: 'Montserrat, system-ui', letterSpacing: '.04em', transition: 'all .25s' }}>
                                    Explore {m.label} →
                                </a>
                            </div>
                            <div className="mod-visual" data-label={m.label.toUpperCase()}>
                                <div style={{ display: 'flex', alignItems: 'flex-end', gap: '10px', height: '140px', padding: '0 8px 0' }}>
                                    {bars.map((h, bi) => (
                                        <div key={bi} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px', height: '100%', justifyContent: 'flex-end' }}>
                                            <div className="bar-rise" style={{ width: '100%', height: `${h}%`, background: bi % 2 === 0 ? m.color : m.border, borderRadius: '4px 4px 0 0', animationDelay: `${bi * 0.07}s` }}></div>
                                        </div>
                                    ))}
                                </div>
                                <div style={{ height: '1px', background: '#e5e7eb', margin: '0 8px 16px' }}></div>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                                    {[['Total Records', '1,284'], ['Last Updated', 'Just now'], ['Status', 'Active'], ['Version', 'v2.1.0']].map(([label, val]) => (
                                        <div key={label} style={{ background: '#f7f8fa', borderRadius: '8px', padding: '10px 12px', border: '1px solid #e5e7eb' }}>
                                            <div style={{ fontSize: '10px', fontWeight: 700, color: '#999', letterSpacing: '.1em', textTransform: 'uppercase', marginBottom: '4px', fontFamily: 'Montserrat, system-ui' }}>{label}</div>
                                            <div style={{ fontSize: '14px', fontWeight: 800, color: m.color, fontFamily: 'Montserrat, system-ui' }}>{val}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    );
                })()}
            </section>

            {/* ===== NEW: PIPELINE ===== */}
            <section className="pipeline-section" ref={pipelineRef}>
                <div className="orb orb1"></div>
                <div className="orb orb2"></div>
                <div className="orb orb3"></div>
                <div style={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
                    <span style={{ display: 'block', fontSize: '12px', fontWeight: 700, letterSpacing: '.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,.45)', marginBottom: '16px', fontFamily: 'Montserrat, system-ui' }}>Revenue Pipeline</span>
                    <h2 style={{ fontSize: 'clamp(2rem,4vw,3.8rem)', fontWeight: 900, color: 'white', letterSpacing: '-2px', fontFamily: 'Montserrat, system-ui', lineHeight: 1.05, marginBottom: '16px' }}>Quote it. Invoice it.<br/><span style={{ color: '#60a5fa' }}>Collect it. Close it.</span></h2>
                    <p style={{ fontSize: '18px', color: 'rgba(255,255,255,.55)', maxWidth: '540px', margin: '0 auto', lineHeight: 1.7, fontFamily: 'Montserrat, system-ui' }}>The full sales lifecycle in four connected stages. Every total calculated automatically. Every stage version-controlled.</p>
                </div>
                <div className="pipeline-steps-wrap">
                    {pipelineSteps.map((s, i) => (
                        <div key={i} className="pipe-step" style={{ '--pc': s.color } as React.CSSProperties}>
                            <div className="pipe-circle"><span className="pipe-num">{s.num}</span></div>
                            <div className="pipe-title">{s.title}</div>
                            <div className="pipe-sub">{s.sub}</div>
                            <span className="pipe-code">{s.code}</span>
                        </div>
                    ))}
                </div>
                <div style={{ textAlign: 'center', marginTop: '64px', position: 'relative', zIndex: 1 }}>
                    <a href="" style={{ display: 'inline-block', padding: '16px 40px', background: 'white', color: '#001a5e', borderRadius: '10px', fontWeight: 800, fontSize: '15px', textDecoration: 'none', fontFamily: 'Montserrat, system-ui', letterSpacing: '.04em', transition: 'all .25s' }}>
                        See Sales Management in Full →
                    </a>
                </div>
            </section>

            {/* ===== NEW: HOW IT WORKS ===== */}
            <section className="hiw-section">
                <div style={{ textAlign: 'center', marginBottom: '16px' }}><span className="section-tag">Getting Started</span></div>
                <h2 className="section-title" style={{ marginBottom: '60px' }}>Up and Running in Minutes</h2>
                <div className="hiw-steps">
                    {[
                        { n: '1', title: 'Create Your Company Profile', desc: 'Sign up, add your company details, set your base currency, and configure your Chart of Accounts. The system scaffolds your accounting structure automatically.' },
                        { n: '2', title: 'Add Your Clients & Suppliers', desc: 'Import or manually add your customer profiles and supplier connections. Link bank details, ID documents, and assign status — all encrypted at field level.' },
                        { n: '3', title: 'Create Your First Project', desc: 'Set up a project, attach a Bill of Quantities, and link your Job Cost Ledger. Urusentra starts tracking budget vs actual from the first material entry.' },
                        { n: '4', title: 'Issue Quotations & Invoices', desc: 'Generate professional quotations with itemised pricing, optional discount and tax cascades. Convert accepted quotes to invoices in one click.' },
                        { n: '5', title: 'Create Project, BOQ & Job Cost Ledger', desc: 'Create Project and Record phases and track costing against estimates and budget through every step of the project. The system calculates variances per product and accumulated variance between budget and cost.' },
                        { n: '6', title: 'Collect Payments & Close', desc: 'Record payment tranches across Cash, Card, and Online. The system calculates outstanding balances live and marks invoices complete automatically when fully paid.' },
                        { n: '7', title: 'Run Your Reports', desc: 'Pull a Trial Balance, Income Statement, Project Profitability Report, or Cash Flow statement at any time. All reports are generated from live transaction data.' },
                    ].map((s, i) => (
                        <div key={i} className="hiw-step">
                            <div className="hiw-numcol">
                                <div className="hiw-bubble">{s.n}</div>
                                <div className="hiw-line"></div>
                            </div>
                            <div style={{ width: '4px' }}></div>
                            <div className="hiw-content">
                                <h3>{s.title}</h3>
                                <p>{s.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* ===== NEW: BUILT FOR ===== */}
            <section className="built-for">
                <div style={{ textAlign: 'center', marginBottom: '64px', position: 'relative', zIndex: 1 }}>
                    <span style={{ display: 'block', fontSize: '20px', fontWeight: 700, letterSpacing: '.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,.5)', marginBottom: '16px', fontFamily: 'Montserrat, system-ui' }}>Who It's For</span>
                    <h2 style={{ fontSize: 'clamp(2rem,4vw,3.5rem)', fontWeight: 900, color: 'white', fontFamily: 'Montserrat, system-ui', letterSpacing: '-2px' }}>Built for the People<br/>Who Build the World</h2>
                </div>
                <div className="built-for-grid">
                    {[
                        { icon: '🏗️', title: 'General Contractors', desc: 'Run multiple projects simultaneously with per-project budgets, BOQ estimation, job cost tracking, and real-time variance alerts. Never get caught off-guard by an overrun again.' },
                        { icon: '📐', title: 'Quantity Surveyors & Estimators', desc: 'Build detailed bills of quantities, link material costs to live supplier pricing, and calculate accurate project estimates faster than any spreadsheet.' },
                        { icon: '💼', title: 'SME Directors & CFOs', desc: "Get a full financial picture at any moment — cash flow, P&L, client receivables, outstanding payables. Everything an accountant needs, built into the same system you run your jobs from." },
                        { icon: '🔧', title: 'Site Managers', desc: 'Track project timelines, assign resources, and monitor completion milestones. Keep stakeholders informed with real-time progress reports without leaving the platform.' },
                        { icon: '🏢', title: 'Property Developers', desc: 'Manage client relationships across multiple developments, track invoices and payments per project, and generate professional receipts automatically for every transaction.' },
                        { icon: '🌍', title: 'Supply Chain Teams', desc: "Source materials from 2,935+ verified global suppliers. Compare prices, check availability, and contact suppliers directly — cutting procurement time by up to 40%." },
                    ].map((item, i) => (
                        <div key={i} className="bf-card">
                            <div className="bf-icon">{item.icon}</div>
                            <h3>{item.title}</h3>
                            <p className='text-gray-200!'>{item.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* ===== NEW: COMPARISON TABLE ===== */}
            <section className="compare-section">
                <div style={{ textAlign: 'center', marginBottom: '16px' }}><span className="section-tag">Why Urusentra</span></div>
                <h2 className="section-title" style={{ marginBottom: '16px' }}>How We Stack Up</h2>
                <p className="section-description" style={{ textAlign: 'center', maxWidth: '560px', margin: '0 auto 48px' }}>Construction-specific depth that generic ERPs and spreadsheets simply can't match.</p>
                <div className="compare-table-wrap">
                    <div className="compare-header">
                        <span>Feature</span>
                        <span className="uru-head">Urusentra</span>
                        <span>Generic ERP</span>
                        <span>Spreadsheets</span>
                    </div>
                    {comparisons.map((row, i) => (
                        <div key={i} className="compare-row">
                            <span>{row.feature}</span>
                            <div className="compare-cell"><div className={`check yes`}><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="3"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg></div></div>
                            <div className="compare-cell"><div className={`check ${row.generic ? 'yes' : 'no'}`}>{row.generic ? <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="3"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg> : <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#e8354a" strokeWidth="3"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>}</div></div>
                            <div className="compare-cell"><div className={`check ${row.excel ? 'yes' : 'no'}`}>{row.excel ? <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="3"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg> : <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#e8354a" strokeWidth="3"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>}</div></div>
                        </div>
                    ))}
                </div>
            </section>

            {/* ===== ORIGINAL: TESTIMONIALS ===== */}
            <section className="testimonials-section">
                <div className="section-header">
                    <span className="section-tag">Client Success</span>
                    <h2 className="section-title">A building company's joy!</h2>
                    <p className="section-description">See how building companies are transforming their operations with our ERP platform.</p>
                </div>
                <div className="testimonials-grid">
                    <div className="testimonial">
                        <p className="testimonial-text">"This platform cut our project planning time by 40%. We can now manage twice as many projects with the same team. The ROI was immediate."</p>
                        <div className="testimonial-author"><div className="author-avatar">MR</div><div className="author-info"><div className="author-name">Noor Farhana</div><div className="author-title">VP Operations, Skyline Builders</div></div></div>
                    </div>
                    <div className="testimonial">
                        <p className="testimonial-text">"Finally, a system built for the building industry. The marketplace is a real gem! It helped our company to find and contact suppliers in china with the best prices, I can't believe how helpful it has been!"</p>
                        <div className="testimonial-author"><div className="author-avatar">JC</div><div className="author-info"><div className="author-name">Jennifer Chen</div><div className="author-title">Project Manager, Bintang Builders</div></div></div>
                    </div>
                    <div className="testimonial">
                        <p className="testimonial-text">"Even though we aren't in the building industry, This software is unbelievably useful for us. The cost control features alone saved us over 500K in the first year. We can now spot budget overruns before they become problems."</p>
                        <div className="testimonial-author"><div className="author-avatar">DW</div><div className="author-info"><div className="author-name">David Washington</div><div className="author-title">CFO, Foundation Group</div></div></div>
                    </div>
                </div>
            </section>

            {/* ===== NEW: PRICING TEASER ===== */}
            <section className="pricing-section">
                <div style={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
                    <span style={{ display: 'block', fontSize: '12px', fontWeight: 700, letterSpacing: '.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,.45)', marginBottom: '16px', fontFamily: 'Montserrat, system-ui' }}>Simple Pricing</span>
                    <h2 style={{ fontSize: 'clamp(2rem,4vw,3.8rem)', fontWeight: 900, color: 'white', fontFamily: 'Montserrat, system-ui', letterSpacing: '-2px' }}>One Platform.<br/>Three Plans.</h2>
                    <p style={{ fontSize: '17px', color: 'rgba(255,255,255,.55)', maxWidth: '500px', margin: '16px auto 0', lineHeight: 1.7, fontFamily: 'Montserrat, system-ui' }}>Start free. Scale as your business grows. No hidden fees, no credit card to get started.</p>
                </div>
                <div className="pricing-grid">
                    {[
                        { tag: 'Starter', name: 'Explorer', price: 'Free', period: '14-day trial · No card required', color: '', features: ['Project management', 'Client Management', 'Basic Financial Reports', '1 Company', 'Email Support'], btn: 'outline', btnText: 'Start Free Trial' },
                        { tag: 'Most Popular', name: 'Starter', price: 'xxx', period: 'per month', color: '', featured: true, features: ['Everything in Starter', 'Full Accounting Suite', 'Project & BOQ Tracking', 'Supplier Marketplace Access', '3 Companies', 'Priority Support'], btn: 'filled', btnText: 'Get Started' },
                        { tag: 'Enterprise', name: 'Enterprise', price: 'xxx', period: 'tailored to your team', color: '', features: ['Everything in Professional', 'Unlimited Companies', 'Custom Integrations', 'Dedicated Account Manager', 'On-site Training', 'SLA Guarantee'], btn: 'outline', btnText: 'Contact Sales' },
                    ].map((plan, i) => (
                        <div key={i} className={`price-card${plan.featured ? ' featured' : ''}`}>
                            {plan.featured && <span className="popular-badge">MOST POPULAR</span>}
                            <span className="price-tag">{plan.tag}</span>
                            <div className="price-name">{plan.name}</div>
                            <div className="price-amount">{plan.price === 'Free' || plan.price === 'Custom' ? plan.price : <><span>RM</span>{plan.price.replace('RM ','')}</>}</div>
                            <div className="price-period">{plan.period}</div>
                            <ul className="price-features">
                                {plan.features.map((f, fi) => <li key={fi}>{f}</li>)}
                            </ul>
                            <a href="/pricing" className={`price-btn ${plan.btn}`}>{plan.btnText}</a>
                        </div>
                    ))}
                </div>
            </section>


            {/* ===== NEW: FAQ ===== */}
            <section className="faq-section">
                <div style={{ textAlign: 'center', marginBottom: '16px' }}><span className="section-tag">Got Questions?</span></div>
                <h2 className="section-title" style={{ marginBottom: '60px' }}>Frequently Asked</h2>
                <div className="faq-list">
                    {faqs.map((faq, i) => (
                        <div key={i} className={`faq-item${activeFaq === i ? ' open' : ''}`}>
                            <div className="faq-q" onClick={() => setActiveFaq(activeFaq === i ? null : i)}>
                                <span>{faq.q}</span>
                                <span className={`faq-arrow${activeFaq === i ? ' open' : ''}`}>+</span>
                            </div>
                            <div className={`faq-a${activeFaq === i ? ' open' : ''}`}>{faq.a}</div>
                        </div>
                    ))}
                </div>
            </section>

            {/* ===== NEW: FINAL BANNER ===== */}
            <div className="final-banner">
                <div style={{ position: 'relative', zIndex: 1 }}>
                    <h2>The ERP Built<br/>for <em>Builders.</em></h2>
                    <p>Urusentra is the only platform that combines a full construction ERP with a live global supplier marketplace — built from the ground up for SME building companies.</p>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
                        <a href="/pricing" style={{ display: 'inline-block', padding: '18px 44px', background: '#0066cc', color: 'white', borderRadius: '10px', fontWeight: 800, fontSize: '16px', textDecoration: 'none', fontFamily: 'Montserrat, system-ui', letterSpacing: '.04em', transition: 'all .25s' }}>Start Free Trial</a>
                        <a href="/marketplace" style={{ display: 'inline-block', padding: '18px 44px', background: 'transparent', color: 'white', borderRadius: '10px', fontWeight: 700, fontSize: '16px', textDecoration: 'none', border: '2px solid rgba(255,255,255,.3)', fontFamily: 'Montserrat, system-ui', letterSpacing: '.04em', transition: 'all .25s' }}>Browse Marketplace</a>
                    </div>
                </div>
            </div>

            {/* ===== FOOTER (original — untouched) ===== */}
            <footer>
                <div className="footer-content">
                    <div className="footer-brand">
                        <div className="logo-photo-lower">
                            <div className="logo-lower flex items-center space-x-3">
                                <svg className="w-9 h-9 text-orange-800" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z"/>
                                </svg>
                                <div><h1 className="logo-text-lower text-xl font-bold text-gray-900" style={{ fontFamily: 'Montserrat, system-ui' }}>Urusentra</h1></div>
                            </div>
                        </div>
                        <p style={{ fontFamily: 'Montserrat, system-ui' }} className='font-[Montserrat]!'>The management ERP platform built by builders and accountants, for builders and accountants. Streamline your operations and manage your business better.</p>
                        <p style={{ fontFamily: 'Montserrat, system-ui' }} className='font-[Montserrat]!'>&copy; {formatCurrentYear()} Syafeez Enterprise. All rights reserved.</p>
                    </div>
                    <div className="footer-column" style={{ fontFamily: 'Montserrat, system-ui' }}>
                        <h4 style={{ fontFamily: 'Montserrat, system-ui' }}>Product</h4>
                        <ul style={{ fontFamily: 'Montserrat, system-ui' }}><li style={{ fontFamily: 'Montserrat, system-ui' }}><a href="/pricing" >Pricing</a></li><li><a href="#">Mobile App</a></li></ul>
                    </div>
                    <div className="footer-column">
                        <h4>Resources</h4>
                        <ul><li><a href="#">Documentation</a></li><li><a href="#">Blog</a></li><li><a href="#">Support</a></li></ul>
                    </div>
                    <div className="footer-column">
                        <h4>Company</h4>
                        <ul><li><a href="#">About Us</a></li><li><a href="/contact-us">Contact</a></li><li><a href="#">Privacy</a></li></ul>
                    </div>
                </div>
                <div className="footer-bottom">URUSENTRA. Designed for growth.</div>
            </footer>
        </div>
    );
}