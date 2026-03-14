    import React, { useEffect, useState } from "react"; // Import useState






function ContactUs() {
    const [showSuccess, setShowSuccess] = useState(false);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        

        setShowSuccess(true);
        
        console.log("Routing logic initialized...");
        console.log("Sender: contactpage@urusentra.com");
        console.log("Recipient: inquiries@urusentra.com");


        const form = e.currentTarget;

        setTimeout(() => {
          setShowSuccess(false);
          form.reset(); 
        }, 5000);
    };





    return(

        <div className="min-w-full">

            <style>
                {`
                    @import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700;800;900&display=swap");
                    
                    :root {
                        --white: #ffffff;
                        --off: #f7f8fa;
                        --stone: #f4f5f7;
                        --border: #dde1ea;
                        --muted: #8892a4;
                        --text: #3d4658;
                        --dark: #1a2035;

                        --teal: #0f766e;
                        --teal-mid: #14b8a6;
                        --teal-light: #f0fdfa;
                        --teal-border: #99f6e4;

                        --blue: #2355f5;
                        --blue-light: #eef1ff;

                        --violet: #7c3aed;
                        --violet-light: #f5f3ff;

                        --amber: #d97706;
                        --amber-light: #fffbeb;
                        --amber-border: #fde68a;

                        --red: #e8354a;
                        --red-light: #fff0f2;
                        --red-border: #fecaca;

                        --green: #00b87a;
                        --green-light: #e6f9f2;
                    }

                    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
                    html { scroll-behavior: smooth; }

                    body {
                        background: var(--off);
                        color: var(--text);
                        font-family: 'Montserrat', sans-serif;
                        overflow-x: hidden;
                        line-height: 1.6;
                    }

                    .wrapper { max-width: 1080px; margin: 0 auto; padding: 0 2.5rem; }

                    /* ---- NAV ---- */
                    nav {
                    font-family: 'Montserrat', system-ui;
                        position: sticky; top: 0; z-index: 100;
                        background: rgba(255,255,255,0.94);
                        backdrop-filter: blur(14px);
                        border-bottom: 1px solid var(--border);
                        padding: 0 2.5rem;
                        display: flex; align-items: center; justify-content: space-between;
                        height: 64px;
                    }
                    .nav-brand { font-family: 'Montserrat', system-ui; display: flex; align-items: center; gap: 0.65rem; }
                    .nav-icon { font-family: 'Montserrat', system-ui;
                        width: 34px; height: 34px;
                        background: var(--teal);
                        border-radius: 8px;
                        display: flex; align-items: center; justify-content: center;
                    }
                    .nav-titles h1 { font-family: 'Montserrat', system-ui; text-align: left; font-size: 1.05rem; font-weight: 800; letter-spacing: -0.01em; color: var(--dark); line-height: 1.1; }
                    .nav-titles p { font-family: 'Montserrat', system-ui; font-size: 0.58rem; font-weight: 600; letter-spacing: 0.2em; text-transform: uppercase; color: var(--muted); }
                    .nav-links { font-family: 'Montserrat', system-ui; display: flex; align-items: center; gap: 1.75rem; }
                    .nav-links a { font-family: 'Montserrat', system-ui; font-size: 0.8rem; font-weight: 600; color: #4b5563; text-decoration: none; transition: color 0.2s; }
                    .nav-links a:hover, .nav-links a.active { color: var(--teal); }

                    /* ---- HERO ---- */
                    .contact-hero {
                    font-family: 'Montserrat', system-ui;
                        background: var(--white);
                        border-bottom: 1px solid var(--border);
                        padding: 5rem 0;
                        text-align: center;
                        position: relative;
                        overflow: hidden;
                    }
                    .contact-hero::before {
                    font-family: 'Montserrat', system-ui;
                        content:''; position:absolute; inset:0;
                        background: radial-gradient(circle at 50% 50%, rgba(15,118,110,0.04) 0%, transparent 70%);
                        pointer-events:none;
                    }
                    .hero-eyebrow {
                    font-family: 'Montserrat', system-ui;
                        font-size: 0.67rem; font-weight: 700;
                        letter-spacing: 0.24em; text-transform: uppercase;
                        color: var(--teal); margin-bottom: 1.1rem;
                        display: inline-flex; align-items: center; gap: 0.6rem;
                    }
                    .hero-eyebrow::before, .hero-eyebrow::after {
                    font-family: 'Montserrat', system-ui;
                        content:''; display:block; width:1.5rem; height:2px;
                        background: var(--teal); border-radius:2px;
                    }
                    .contact-hero h1 {
                    font-family: 'Montserrat', system-ui;
                        font-size: clamp(2.5rem, 5vw, 3.8rem);
                        font-weight: 900; line-height: 1.1; letter-spacing: -0.025em;
                        color: var(--dark);
                    }
                    .contact-hero h1 em { font-style: normal; color: var(--teal); }

                    /* ---- MAIN CONTENT ---- */
                    .main-grid {
                    font-family: 'Montserrat', system-ui;
                        display: grid;
                        grid-template-columns: 1.2fr 0.8fr;
                        gap: 4rem;
                        padding: 5rem 0;
                        align-items: start;
                    }
                    @media(max-width: 900px) { .main-grid { grid-template-columns: 1fr; gap: 3rem; } }

                    /* ---- CONTACT FORM ---- */
                    .form-container {
                    font-family: 'Montserrat', system-ui;
                        background: var(--white);
                        border: 1px solid var(--border);
                        border-radius: 1.5rem;
                        padding: 3rem;
                        box-shadow: 0 10px 40px rgba(0,0,0,0.03);
                    }
                    .form-header { font-family: 'Montserrat', system-ui; margin-bottom: 2.5rem; }
                    .form-header h2 { font-family: 'Montserrat', system-ui; font-size: 1.5rem; font-weight: 800; color: var(--dark); margin-bottom: 0.5rem; }
                    .form-header p { font-family: 'Montserrat', system-ui; font-size: 0.9rem; color: var(--muted); }

                    .form-group { font-family: 'Montserrat', system-ui; margin-bottom: 1.5rem; }
                    .form-label {
                    font-family: 'Montserrat', system-ui;
                        display: block; font-size: 0.7rem; font-weight: 700;
                        letter-spacing: 0.08em; text-transform: uppercase;
                        color: var(--muted); margin-bottom: 0.6rem;
                    }
                    .form-input, .form-select, .form-textarea {
                    font-family: 'Montserrat', system-ui;
                        width: 100%;
                        background: var(--off);
                        border: 1px solid var(--border);
                        border-radius: 0.75rem;
                        padding: 1rem 1.2rem;
                        font-family: 'Montserrat', sans-serif;
                        font-size: 0.9rem;
                        color: var(--dark);
                        transition: all 0.2s ease;
                    }
                    .form-input:focus, .form-select:focus, .form-textarea:focus {
                    font-family: 'Montserrat', system-ui;
                        outline: none;
                        border-color: var(--teal);
                        background: var(--white);
                        box-shadow: 0 0 0 4px var(--teal-light);
                    }
                    .form-textarea { font-family: 'Montserrat', system-ui; resize: vertical; min-height: 120px; }

                    .btn-send {
                    font-family: 'Montserrat', system-ui;
                        width: 100%;
                        padding: 1.1rem;
                        background: var(--teal);
                        color: white;
                        border: none;
                        border-radius: 0.75rem;
                        font-family: 'Montserrat', sans-serif;
                        font-weight: 800;
                        font-size: 0.9rem;
                        letter-spacing: 0.02em;
                        cursor: pointer;
                        transition: all 0.3s;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        gap: 0.75rem;
                    }
                    .btn-send:hover {
                        background: #0d5c55;
                        transform: translateY(-2px);
                        box-shadow: 0 12px 24px rgba(15,118,110,0.2);
                    }

                    /* ---- SIDEBAR INFO ---- */
                    .sidebar-section { margin-bottom: 3rem; }
                    .sidebar-label {
                        font-size: 0.65rem; font-weight: 700;
                        letter-spacing: 0.22em; text-transform: uppercase;
                        color: var(--muted); margin-bottom: 1.5rem;
                        display: flex; align-items: center; gap: 0.6rem;
                    }
                    .sidebar-label::before {
                        content:''; display:block; width:1.5rem; height:2px;
                        background: var(--border); border-radius:2px;
                    }

                    .contact-card {
                        background: var(--white);
                        border: 1px solid var(--border);
                        border-radius: 1.1rem;
                        padding: 1.5rem;
                        margin-bottom: 1rem;
                        display: flex;
                        gap: 1.25rem;
                        align-items: center;
                        transition: all 0.3s ease;
                        text-decoration: none;
                    }
                    .contact-card:hover {
                        border-color: var(--teal);
                        transform: translateX(6px);
                        box-shadow: 0 8px 20px rgba(0,0,0,0.04);
                    }
                    .card-icon {
                        width: 44px; height: 44px;
                        border-radius: 0.75rem;
                        background: var(--teal-light);
                        display: flex; align-items: center; justify-content: center;
                        flex-shrink: 0;
                        color: var(--teal);
                    }
                    .card-info h4 { font-family: 'Montserrat', system-ui; font-size: 0.65rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; color: var(--muted); margin-bottom: 0.2rem; }
                    .card-info p { font-family: 'Montserrat', system-ui; font-size: 0.95rem; font-weight: 700; color: var(--dark); }

                    /* Social Icons Row */
                    .social-grid {
                        display: grid;
                        grid-template-columns: repeat(3, 1fr);
                        gap: 0.75rem;
                    }
                    .social-btn {
                        background: var(--white);
                        border: 1px solid var(--border);
                        border-radius: 0.75rem;
                        padding: 1rem;
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        gap: 0.5rem;
                        text-decoration: none;
                        transition: all 0.2s;
                    }
                    .social-btn:hover {
                        border-color: var(--teal);
                        background: var(--teal-light);
                    }
                    .social-btn span { font-size: 0.65rem; font-weight: 700; color: var(--dark); text-transform: uppercase; }

                    /* Status Modal */
                    #success-msg {
                        display: none;
                        background: var(--green-light);
                        border: 1px solid #a7f3d0;
                        color: var(--green);
                        padding: 1rem;
                        border-radius: 0.75rem;
                        font-size: 0.85rem;
                        font-weight: 700;
                        margin-bottom: 1.5rem;
                        text-align: center;
                    }
                `}
            </style>



            <nav>
                <div className="nav-brand">
                    <div className="nav-icon">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z"/>
                        </svg>
                    </div>
                    <div className="nav-titles">
                        <h1>Urusentra</h1>
                        <p>Client Management</p>
                    </div>
                </div>
                <div className="nav-links">
                    <a href="/">Home</a>
                </div>
            </nav>

            <header className="contact-hero">
                <div className="wrapper">
                    <p className="hero-eyebrow">Direct Channel</p>
                    <h1>Let's Start a<br/><em>Conversation</em></h1>
                </div>
            </header>

            <main className="wrapper">
                <div className="main-grid">
                    

                    <section className="form-container">
                        <div id="success-msg">Message sent successfully to inquiries@urusentra.com</div>
                        
                        <div className="form-header">
                            <h2>Send an Inquiry</h2>
                            <p>Fill out the form below and our team will get back to you within 24 hours.</p>
                        </div>

                        <form id="contactForm" onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label className="form-label">Full Name</label>
                                <input type="text" className="form-input" placeholder="e.g. Muhammad Alex" required/>
                            </div>

                            <div className="form-group">
                                <label className="form-label">Email Address</label>
                                <input type="email" className="form-input" placeholder="alex@company.com" required/>
                            </div>

                            <div className="form-group">
                                <label className="form-label">Subject / Department</label>
                                <select className="form-select" style={{ fontFamily: 'Montserrat, system-ui' }}>
                                    <option value="inquiries">General Enquiries</option>
                                    <option value="support">Technical Support</option>
                                    <option value="features">Feature Request</option>
                                    <option value="complaints">Complaints</option>
                                    <option value="subscribe">Subscription Inquiry</option>
                                </select>
                            </div>

                            <div className="form-group">
                                <label className="form-label">Your Message</label>
                                <textarea className="form-textarea" placeholder="Tell us how we can help..."></textarea>
                            </div>

                            <button type="submit" className="btn-send">
                                <span>Deliver Message</span>
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                                </svg>
                            </button>
                        </form>
                    </section>


                    <aside>
                        <div className="sidebar-section">
                            <div className="sidebar-label">Global Support</div>
                            
                            <a href="mailto:inquiries@urusentra.com" className="contact-card">
                                <div className="card-icon">
                                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>
                                </div>
                                <div className="card-info">
                                    <h4>General Enquiries</h4>
                                    <p>inquiries@urusentra.com</p>
                                </div>
                            </a>

                            <a href="mailto:support@urusentra.com" className="contact-card">
                                <div className="card-icon" style={{ background: 'var(--blue-light)', color: 'var(--blue)' }}>
                                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>
                                </div>
                                <div className="card-info">
                                    <h4>Technical Support</h4>
                                    <p>support@urusentra.com</p>
                                </div>
                            </a>

                            <a href="mailto:features@urusentra.com" className="contact-card">
                                <div className="card-icon" style={{ background: 'var(--violet-light)', color: 'var(--violet)' }}>
                                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>
                                </div>
                                <div className="card-info">
                                    <h4>Feature Requests</h4>
                                    <p>features@urusentra.com</p>
                                </div>
                            </a>

                            <a href="mailto:complaints@urusentra.com" className="contact-card">
                                <div className="card-icon" style={{ background: 'var(--red-light)', color: 'var(--red)' }}>
                                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                                </div>
                                <div className="card-info">
                                    <h4>Complaints</h4>
                                    <p>complaints@urusentra.com</p>
                                </div>
                            </a>

                            <a href="mailto:subscribe@urusentra.com" className="contact-card">
                                <div className="card-icon" style={{ background: 'var(--green-light)', color: 'var(--green)' }}>
                                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                                </div>
                                <div className="card-info">
                                    <h4>Subscriptions</h4>
                                    <p>subscribe@urusentra.com</p>
                                </div>
                            </a>
                        </div>

                        <div className="sidebar-section">
                            <div className="sidebar-label">Direct Line</div>
                            <a href="https://wa.me/601137091393" className="contact-card">
                                <div className="card-icon" style={{ background: '#e6fcf5', color: '#099268' }}>
                                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                                </div>
                                <div className="card-info">
                                    <h4>Phone & WhatsApp</h4>
                                    <p>+601137091393</p>
                                </div>
                            </a>
                        </div>

                        <div className="sidebar-section">
                            <div className="sidebar-label">Socials</div>
                            <div className="social-grid">
                                <a href="https://x.com/urusentra" className="social-btn">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                                    <span>X.com</span>
                                </a>
                                <a href="https://instagram.com/urusentra" className="social-btn">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                                    <span>Insta</span>
                                </a>
                                <a href="https://facebook.com/urusentra" className="social-btn">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
                                    <span>FB</span>
                                </a>
                            </div>
                        </div>
                    </aside>

                </div>
            </main>

        </div>
    );

  


};
export default ContactUs;
