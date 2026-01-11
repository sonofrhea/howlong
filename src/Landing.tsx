import React, { useState } from 'react';


export default function ConstructionERPLanding() {
    const [featuresOpen, setFeaturesOpen] = useState(false);

    
    return (
        <div className="app">
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Helvetica:wght@300;400;700;900&family=Montserrat:wght@300;400;700;900&display=swap');

                :root {
                --sky: #cdeaf6;
                --blue-box: #c9ebff;
                --accent: #f8e94d;
                --text-black: #000;
                --text-white: #fff;
                }

                * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
                }

                html, body, #root {
                margin: 0;
                padding: 0;
                height: 100%;
                font-family: 'Montserrat', Arial, sans-serif;
                color: var(--text-black);
                background-color: var(--sky);
                overflow-x: hidden;
                overflow-y: auto;
                }

                .app {
                width: 100%;
                min-height: 100vh;
                }

                /* HERO SECTION */
                .hero {
                position: relative;
                width: 100%;
                min-height: 100vh;
                background: linear-gradient(to bottom, var(--sky) 0%, #ffffff 100%);
                overflow: hidden;
                }

                .background {
                position: absolute;
                bottom: 0;
                left: 0;
                width: 100%;
                height: 45%;
                background: url('IMG_2877.JPG') center/cover no-repeat;
                z-index: 1;
                }

                .grid-lines {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-image: 
                    linear-gradient(to right, rgba(0,0,0,0.05) 1px, transparent 1px),
                    linear-gradient(to bottom, rgba(0,0,0,0.05) 1px, transparent 1px);
                background-size: 150px 150px;
                pointer-events: none;
                z-index: 2;
                }

                /* Construction Sketch */
                .sketch {
                position: absolute;
                left: 0;
                top: 0;
                width: 100%;
                height: 100%;
                z-index: 3;
                pointer-events: none;
                opacity: 0.6;
                }

                .sketch svg {
                    position: absolute;
                    left: 0;
                    top: 0;
                    width: 100%;
                    height: 100%;
                    font-family: 'Montserrat', Arial, sans-serif;
                }

                /* Navigation */
                nav {
                position: absolute;
                top: 30px;
                left: 30px;
                right: 30px;
                display: flex;
                justify-content: space-between;
                align-items: flex-start;
                z-index: 10;
                }

                .logo small {
                font-size: 14px;
                }

                .top-right {
                font-size: 14px;
                font-weight: 700;
                text-align: right;
                color: #000;
                line-height: 1.3;
                }

                /* Hero Content */
                .hero-content {
                position: relative;
                z-index: 5;
                padding: 180px 60px 120px;
                max-width: 1400px;
                margin: 0 auto;
                }

                .hero-content {
                    padding: 150px 40px 100px;
                }

                .hero-content {
                    padding: 140px 30px 80px;
                }

                .cta-group {
                display: flex;
                gap: 20px;
                align-items: center;
                font-family: Helvetica;
                }

                .cta-section .cta-group {
                justify-content: center;
                }

                .cta-primary {
                background: blue;
                color: var(--text-white);
                padding: 18px 40px;
                border-radius: 8px;
                font-weight: 700;
                font-size: 16px;
                text-decoration: none;
                transition: all 0.3s;
                box-shadow: 0 4px 15px rgba(0,102,204,0.25);
                display: inline-block;
                }

                .cta-primary:hover {
                background: #0052a3;
                transform: translateY(-3px);
                box-shadow: 0 8px 25px rgba(0,102,204,0.35);
                }

                .cta-secondary {
                background: transparent;
                color: black;
                padding: 18px 40px;
                border-radius: 8px;
                font-weight: 600;
                font-size: 16px;
                text-decoration: none;
                border: 2px solid gray;
                transition: all 0.3s;
                display: inline-block;
                }

                .cta-secondary:hover {
                border-color: blue;
                color: blue;
                background: rgba(0,102,204,0.05);
                }


                .headline {
                position: absolute;
                top: 20vh;
                left: 2%;
                text-align: left;
                font-weight: 900;
                font-size: 4vw;
                line-height: 1;
                letter-spacing: -2px;
                color: var(--text-black);
                z-index: 5;
                margin-bottom: 30px;
                font-family: 'Montserrat', sans-serif;
                }

                .headline span {
                display: block;
                }

                .headline p {
                    font-size: 20px;
                    font-weight: 600;
                    font-family: Montserrat;
                    letter-spacing: 10%;
                    color: gray;
                    max-width: 600px;
                    line-height: 1.6;
                    margin-bottom: 50px;
                }

                .right-column {
                position: absolute;
                top: 28vh;
                right: 10%;
                text-align: left;
                font-size: 14px;
                font-weight: 700;
                line-height: 1.2;
                color: #000;
                z-index: 5;
                }

                .right-column::after {
                content: "";
                display: block;
                width: 40px;
                height: 4px;
                background: #000;
                margin-top: 8px;
                }

                .middle-text {
                position: absolute;
                top: 50vh;
                left: 50%;
                transform: translateX(-50%);
                font-size: 16px;
                font-weight: 600;
                letter-spacing: 0.5px;
                color: #000;
                z-index: 5;
                text-align: center;
                }

                .arrow {
                position: absolute;
                top: 55vh;
                left: 10%;
                width: 90px;
                height: 90px;
                background: var(--accent);
                clip-path: polygon(0 60%, 60% 60%, 60% 100%, 100% 100%, 100% 0, 40% 0, 40% 40%, 0 40%);
                z-index: 4;
                }

                .blue-box {
                position: absolute;
                top: 70vh;
                left: 25%;
                background-color: var(--blue-box);
                padding: 20px 30px;
                color: #000;
                font-weight: 700;
                font-size: 2.5vw;
                line-height: 1.1;
                z-index: 5;
                font-family: 'Montserrat', sans-serif;
                }

                .blue-box span {
                display: block;
                }

                .bottom-text {
                position: absolute;
                bottom: 8vh;
                left: 10%;
                font-weight: 700;
                font-size: 16px;
                color: #000;
                z-index: 5;
                }

                /* FEATURES SECTION */
                .features-section {
                padding: 100px 10%;
                background: #ffffff;
                }

                .section-title {
                font-family: 'Montserrat', sans-serif;
                font-size: clamp(32px, 5vw, 52px);
                font-weight: 900;
                line-height: 1.1;
                margin-bottom: 60px;
                color: #000;
                text-align: center;
                }

                .features-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
                gap: 30px;
                max-width: 1400px;
                margin: 0 auto;
                }

                .feature-item {
                padding: 40px;
                background: #fafafa;
                border: 3px solid #000;
                transition: all 0.3s;
                }

                .feature-item:hover {
                background: var(--accent);
                transform: translateY(-5px);
                }

                .feature-icon {
                font-size: 48px;
                margin-bottom: 20px;
                }

                .feature-title {
                font-weight: 900;
                font-size: 20px;
                margin-bottom: 15px;
                color: #000;
                }

                .feature-description {
                font-size: 16px;
                line-height: 1.6;
                color: #000;
                }

                .dropdown-menu {
                position: absolute;
                left: 50%;
                background: white;
                border-radius: 8px;
                box-shadow: 0 8px 30px rgba(0,0,0,0.15);
                padding: 12px 0;
                min-width: 220px;
                opacity: 0;
                visibility: hidden;
                transition: all 0.3s;
                z-index: 100;
                }

                .dropdown-menu.open {
                opacity: 1;
                visibility: visible;
                }

                .dropdown-menu a {
                display: block;
                padding: 12px 24px;
                color: var(--text-black);
                text-decoration: none;
                font-weight: 500;
                font-size: 14px;
                transition: all 0.2s;
                }

                .dropdown-menu a:hover {
                background: var(--blue-light);
                color: var(--blue-primary);
                }

                .dropdown-menu-item {
                border-bottom: 1px solid rgba(0,0,0,0.05);
                }

                .dropdown-menu-item:last-child {
                border-bottom: none;
                }

                /* CTA SECTION */
                .cta-section {
                padding: 100px 10%;
                background: #000;
                color: #fff;
                text-align: center;
                }

                .cta-section .section-title {
                color: #fff;
                }

                .cta-section p {
                font-size: 20px;
                margin-bottom: 40px;
                line-height: 1.6;
                }

                .cta-button {
                display: inline-block;
                background: var(--accent);
                color: #000;
                padding: 20px 50px;
                font-size: 18px;
                font-weight: 900;
                text-decoration: none;
                transition: all 0.3s;
                margin: 10px;
                }

                .cta-button:hover {
                background: #fff;
                transform: translateY(-3px);
                }

                .cta-button-secondary {
                background: transparent;
                color: #fff;
                border: 3px solid #fff;
                }

                .cta-button-secondary:hover {
                background: #fff;
                color: #000;
                }

                /* FOOTER */
                footer {
                background: #000;
                color: #fff;
                padding: 60px 10%;
                text-align: center;
                }

                footer p {
                margin: 10px 0;
                font-size: 14px;
                }

                .nav-links {
                display: flex;
                gap: 40px;
                align-items: center;
                font-family: Helvetica;
                }

                .nav-links a {
                color: var(--text-black);
                text-decoration: none;
                font-weight: 600;
                font-size: 14px;
                letter-spacing: 0.5px;
                transition: color 0.3s;
                cursor: pointer;
                font-family: Helvetica;
                }

                .nav-links a:hover {
                color: var(--blue-primary);
                font-family: Helvetica;
                }

                .dropdown-toggle {
                display: flex;
                align-items: center;
                gap: 5px;
                }

                .dropdown-toggle::after {
                content: "▼";
                font-size: 10px;
                transition: transform 0.3s;
                }

                .dropdown-toggle.open::after {
                transform: rotate(180deg);
                }

                /* RESPONSIVE */
                @media (max-width: 900px) {
                .headline {
                    font-size: 9vw;
                    top: 15vh;
                    left: 8%;
                }

                .blue-box {
                    left: 15%;
                    font-size: 6vw;
                }

                .right-column {
                    display: none;
                }

                .cta-nav {
                background: #ff6b35;
                color: #ffffff;
                padding: 12px 28px;
                border-radius: 6px;
                font-weight: 700;
                }

                .cta-nav:hover {
                background: #e85a2a;
                box-shadow: 0 6px 20px rgba(255,107,53,0.3);
                }

                .arrow {
                    left: 8%;
                }
                }
            `}</style>

        {/* HERO SECTION */}
        <section className="hero">
            <div className="background"></div>
            <div className="grid-lines"></div>

            {/* CONSTRUCTION SKETCH */}
            <div className="sketch" aria-hidden="true">
            <svg preserveAspectRatio="xMidYMid meet" viewBox="0 0 1200 3200" xmlns="http://www.w3.org/2000/svg">
                <defs>
                <marker id="arrowhead" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto" markerUnits="strokeWidth">
                    <path d="M0,0 L8,3 L0,6 z" fill="rgba(0,0,0,0.24)" />
                </marker>
                <linearGradient id="hatch" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="rgba(0,0,0,0.06)" />
                    <stop offset="100%" stopColor="rgba(0,0,0,0.02)" />
                </linearGradient>
                </defs>

                {/* fine construction grid */}
                <g stroke="rgba(0,0,0,0.03)" strokeWidth="1">
                <g>
                    {/* verticals every 60px */}
                    {Array.from({length:20}).map((_,i) => (
                    <line key={`v${i}`} x1={60+i*60} y1="0" x2={60+i*60} y2="3200" />
                    ))}
                </g>
                <g>
                    {/* horizontals every 60px */}
                    {Array.from({length:54}).map((_,i) => (
                    <line key={`h${i}`} x1="0" y1={40+i*60} x2="1200" y2={40+i*60} />
                    ))}
                </g>
                </g>

                {/* main room boundary with wall thickness */}
                <g stroke="rgba(0,0,0,0.28)" strokeWidth="3" fill="none">
                <rect x="70" y="860" width="1060" height="920" strokeLinejoin="round" />
                </g>

                {/* detailed partition walls with insulation hatch */}
                <g stroke="rgba(0,0,0,0.22)" strokeWidth="2" fill="none">
                <rect x="460" y="900" width="10" height="840" />
                {/* hatch for the partition */}
                <g transform="translate(480,920)">
                    {Array.from({length:14}).map((_,i) => (
                    <line key={`hatch${i}`} x1="0" y1={i*18} x2="180" y2={i*18} stroke="url(#hatch)" strokeWidth="1" transform={`rotate(-25 90 ${i*18})`} />
                    ))}
                </g>

                {/* double-layer drywall indicated */}
                <path d="M760 900 L760 1400" strokeDasharray="6 4" />
                </g>

                {/* windows with glazing detail */}
                <g stroke="rgba(0,0,0,0.26)" strokeWidth="1.8" fill="none">
                <rect x="120" y="910" width="160" height="160" />
                <line x1="120" y1="990" x2="280" y2="990" strokeDasharray="4 4" />

                <rect x="940" y="910" width="160" height="160" />
                <line x1="940" y1="990" x2="1100" y2="990" strokeDasharray="4 4" />

                <text x="180" y="1088" fontSize="18" fill="rgba(0,0,0,0.22)" textAnchor="middle">1500 mm</text>
                <text x="1000" y="1088" fontSize="18" fill="rgba(0,0,0,0.22)" textAnchor="middle">1500 mm</text>
                </g>

                {/* door with swing and frame detail */}
                <g stroke="rgba(0,0,0,0.26)" strokeWidth="1.8" fill="none">
                <rect x="740" y="1300" width="90" height="200" />
                <path d="M740 1300 A90 90 0 0 1 830 1390" strokeLinecap="round" />
                <line x1="770" y1="1300" x2="770" y2="1500" strokeDasharray="3 3" />
                <text x="785" y="1488" fontSize="16" fill="rgba(0,0,0,0.2)">900 mm</text>
                </g>

                {/* built-in joinery: cabinet elevation with shelves and annotations */}
                <g stroke="rgba(0,0,0,0.3)" strokeWidth="1.6" fill="none">
                <rect x="860" y="980" width="180" height="320" />
                <line x1="860" y1="1060" x2="1040" y2="1060" strokeDasharray="6 6" />
                <line x1="860" y1="1220" x2="1040" y2="1220" strokeDasharray="6 6" />
                <text x="950" y="1320" fontSize="18" fill="rgba(0,0,0,0.22)" textAnchor="middle">Built-in Shelving</text>
                <text x="950" y="1340" fontSize="14" fill="rgba(0,0,0,0.18)" textAnchor="middle">Plywood / White Lacquer</text>
                </g>

                {/* central working table plan with chairs and dimensions */}
                <g stroke="rgba(0,0,0,0.28)" strokeWidth="1.6" fill="none">
                <rect x="300" y="1260" width="320" height="120" rx="8" />
                <circle cx="270" cy="1310" r="18" />
                <circle cx="640" cy="1310" r="18" />

                {/* dimension line for table length */}
                <line x1="300" y1="1400" x2="620" y2="1400" stroke="rgba(0,0,0,0.22)" markerEnd="url(#arrowhead)" markerStart="url(#arrowhead)" />
                <text x="460" y="1420" fontSize="18" fill="rgba(0,0,0,0.24)" textAnchor="middle">1800 mm</text>
                </g>

                {/* kitchen island style counter with sink schematic */}
                <g stroke="rgba(0,0,0,0.26)" strokeWidth="1.6" fill="none">
                <rect x="240" y="1000" width="480" height="180" rx="6" />
                <rect x="360" y="1040" width="120" height="60" rx="4" />
                <line x1="240" y1="1188" x2="720" y2="1188" strokeDasharray="4 6" />
                <text x="480" y="1198" fontSize="16" fill="rgba(0,0,0,0.2)" textAnchor="middle">Countertop 40mm</text>
                </g>

                {/* elevation sketch: sectional cut with finish notes on left side */}
                <g transform="translate(80,2000)" stroke="rgba(0,0,0,0.22)" strokeWidth="1.4" fill="none">
                <rect x="0" y="0" width="560" height="360" />
                <line x1="0" y1="40" x2="560" y2="40" strokeDasharray="6 4" />
                <line x1="120" y1="0" x2="120" y2="360" strokeDasharray="3 3" />
                <text x="280" y="26" fontSize="20" fill="rgba(0,0,0,0.22)" textAnchor="middle">SECTION A-A</text>
                <text x="20" y="40" fontSize="16" fill="rgba(0,0,0,0.18)">Floor</text>
                <text x="20" y="300" fontSize="16" fill="rgba(0,0,0,0.18)">Ceiling</text>

                {/* material hatch for flooring */}
                {Array.from({length:40}).map((_,i) => (
                    <line key={`floor${i}`} x1="10" y1="320" x2="540" y2="320" stroke="rgba(0,0,0,0.04)" transform={`translate(0,-${i*6}) rotate(-20 275 320)`} />
                ))}
                </g>

                {/* scale bar and north arrow */}
                <g stroke="rgba(0,0,0,0.22)" fill="none">
                <line x1="90" y1="3000" x2="290" y2="3000" strokeWidth="2" markerEnd="url(#arrowhead)" markerStart="url(#arrowhead)" />
                <text x="190" y="3020" fontSize="18" fill="rgba(0,0,0,0.22)" textAnchor="middle">Scale 1:50</text>
                <text x="1100" y="60" fontSize="18" fill="rgba(0,0,0,0.22)" textAnchor="end">N</text>
                <path d="M1100 80 L1100 20 L1130 44 Z" fill="rgba(0,0,0,0.2)" />
                </g>

                {/* comprehensive dimensioning: wall lengths and heights */}
                <g stroke="rgba(0,0,0,0.22)" strokeWidth="1.2" fill="none">
                {/* overall room width */}
                <line x1="80" y1="820" x2="1140" y2="820" markerStart="url(#arrowhead)" markerEnd="url(#arrowhead)" />
                <text x="610" y="800" fontSize="20" fill="rgba(0,0,0,0.24)" textAnchor="middle">9800 mm</text>

                {/* room height */}
                <line x1="1160" y1="880" x2="1160" y2="1780" markerStart="url(#arrowhead)" markerEnd="url(#arrowhead)" />
                <text x="1180" y="1330" fontSize="20" fill="rgba(0,0,0,0.24)" transform="rotate(90 1180,1330)" textAnchor="middle">2800 mm</text>
                </g>

                {/* annotation callouts */}
                <g fill="rgba(0,0,0,0.28)">
                <text x="520" y="980" fontSize="18">Open Plan Studio</text>
                <text x="520" y="1004" fontSize="14" fill="rgba(0,0,0,0.18)">Acoustic ceiling 50mm</text>

                <text x="300" y="1240" fontSize="14" fill="rgba(0,0,0,0.24)">Work Table</text>
                <text x="920" y="1150" fontSize="14" fill="rgba(0,0,0,0.24)">Storage Wall</text>
                </g>

                {/* hand-sketched rough strokes to suggest in-progress design */}
                <g stroke="rgba(0,0,0,0.08)" strokeWidth="2" strokeLinecap="round" fill="none">
                {['M180 960 q40 -30 120 -10','M380 1100 q60 -30 120 0','M600 1150 q80 -40 160 10','M920 1020 q30 -20 80 -10'].map((path, i) => (
                    <path key={`sketch${i}`} d={path} strokeDasharray="3 7" />
                ))}
                </g>
            </svg>
            </div>

            <nav>
            <div className="logo flex">
                <div>
                    <img src='./public/logo.svg' alt='logo' height="80" width="100" />
                </div>
                <div>
                    <img src='./public/URUSENTRA_LOGO.png' height="150" width="150" />
                </div>
            </div>
            <div className="nav-links">
                <div
                    className="nav-item dropdown"
                    onMouseEnter={() => setFeaturesOpen(true)}
                    onMouseLeave={() => setFeaturesOpen(false)}
                >
                    <a className={`dropdown-toggle ${featuresOpen ? 'open' : ''}`}>
                        Features
                    </a>
                    <div className={`dropdown-menu ${featuresOpen ? 'open' : ''}`}>
                        <div className="dropdown-menu-item">
                            <a href="#estimation">Customer Management</a>
                        </div>
                        <div className="dropdown-menu-item">
                            <a href="#estimation">Job Cost & BOQ Estimations</a>
                        </div>
                        <div className="dropdown-menu-item">
                            <a href="#scheduling">Project Scheduling & Management</a>
                        </div>
                        <div className="dropdown-menu-item">
                            <a href="#materials">Products & Materials Management</a>
                        </div>
                        <div className="dropdown-menu-item">
                            <a href="#equipment">Accounting & Finance</a>
                        </div>
                            <div className="dropdown-menu-item">
                        <a href="#quality">Sales Management</a>
                        </div>
                        <div className="dropdown-menu-item">
                            <a href="#analytics">Analytics & Reporting</a>
                        </div>
                    </div>
                </div>
                <a href="#solutions">Solutions</a>
                <a href="#pricing">Pricing</a>
                <a href="#resources">Resources</a>
                <a href="/login">Login</a>
                <a href="/register" className="cta-nav">Try It Out</a>
            </div>
            </nav>

            <div className="headline">
            Manage Smarter.<br />
            <span className='text-blue-700'>Build Faster & Better.</span>
            <p className='subheadline'>
                The all-in-one ERP platform designed specifically with construction and building professionals in mind.
                Streamline projects, manage teams, and control costs and accounting
                from one powerful system.
            </p>

            <div className="cta-group">
                <a href="#demo" className="cta-primary">Try It Out</a>
                <a href="#features" className="cta-secondary">Learn More</a>
            </div>
            </div>
            


            <div className="blue-box">
                <span>ALL-INCLUSIVE ERP</span>
                <span>FOR SMALL AND MEDIUM BUSINESSES</span>
                <span>USED BY THE CONSTRUCTION INDUSTRY,</span>
                <span>INTERIOR & EXTERIOR BUILDERS.</span>
            </div>
        </section>

        {/* FEATURES SECTION */}
        <section className="features-section">
            <h2 className="section-title">
            EVERYTHING YOU NEED TO BUILD SUCCESS
            </h2>

            <div className="features-grid">
            <div className="feature-item">
                <div className="feature-icon">📐</div>
                <h3 className="feature-title">ESTIMATION & BIDDING</h3>
                <p className="feature-description">
                Create accurate estimates quickly with historical data, material costs, and labor rates. Win more bids with competitive proposals.
                </p>
            </div>

            <div className="feature-item">
                <div className="feature-icon">🏗️</div>
                <h3 className="feature-title">PROJECT SCHEDULING</h3>
                <p className="feature-description">
                Build detailed schedules, assign resources, and track progress in real-time. Keep every stakeholder informed.
                </p>
            </div>

            <div className="feature-item">
                <div className="feature-icon">📦</div>
                <h3 className="feature-title">MATERIAL MANAGEMENT</h3>
                <p className="feature-description">
                Track inventory, automate procurement, and ensure materials arrive exactly when needed. Reduce waste.
                </p>
            </div>

            <div className="feature-item">
                <div className="feature-icon">⚙️</div>
                <h3 className="feature-title">EQUIPMENT TRACKING</h3>
                <p className="feature-description">
                Monitor equipment location, maintenance schedules, and utilization. Maximize ROI on your machinery.
                </p>
            </div>

            <div className="feature-item">
                <div className="feature-icon">📋</div>
                <h3 className="feature-title">QUALITY & SAFETY</h3>
                <p className="feature-description">
                Digitize inspections, track compliance, and maintain safety standards. Ensure regulatory compliance.
                </p>
            </div>

            <div className="feature-item">
                <div className="feature-icon">📈</div>
                <h3 className="feature-title">ANALYTICS & REPORTING</h3>
                <p className="feature-description">
                Get instant insights into project performance, profitability, and productivity. Make informed decisions.
                </p>
            </div>
            </div>
        </section>

        {/* CTA SECTION */}
        <section className="cta-section">
            <h2 className="section-title">
            READY TO TRANSFORM YOUR CONSTRUCTION BUSINESS?
            </h2>
            <p>
            Join hundreds of construction companies already building smarter.<br />
            Start your free 30-day trial today—no credit card required.
            </p>

            <div>
            <a href="#" className="cta-button">START FREE TRIAL</a>
            <a href="#" className="cta-button cta-button-secondary">SCHEDULE A DEMO</a>
            </div>
        </section>

        {/* FOOTER */}
        <footer>
            <p>BUILD ERP - The construction platform built by builders, for builders.</p>
            <p>&copy; 2026 BuildERP. All rights reserved.</p>
        </footer>
        </div>
    );
}