import React, { useState, useEffect, useRef } from 'react';





function ProjectFeature() {

        const BUDGET = 45000;
        const [actual, setActual] = useState(0);
        const [history, setHistory] = useState(Array(20).fill(0));

        const over = actual > BUDGET;
        const variance = BUDGET - actual;
        const pct = Math.min(actual / BUDGET, 1.5) * 100;
        const vpct = Math.min(Math.abs(variance) / BUDGET * 100, 100);
        const fmt = (n: number) => Math.floor(n).toLocaleString();

        const max = Math.max(...history, BUDGET * 1.1);
        const W = 400, H = 60;
        const pts = history.map((v, i) => [(i / (history.length - 1)) * W, H - (v / max) * H]);
        const d = pts.map((p, i) => (i === 0 ? `M${p[0]},${p[1]}` : `L${p[0]},${p[1]}`)).join(' ');
        const df = d + ` L${W},${H} L0,${H} Z`;

        useEffect(() => {
            const timer = setInterval(() => {
                setActual(prev => {
                    const next = prev + Math.random() * 900;
                    const final = next > 62000 ? 0 : next;
                    
                    setHistory(prevHist => {
                        const newHist = [...prevHist];
                        newHist.shift();
                        newHist.push(final);
                        return newHist;
                    });
                    
                    return final;
                });
            }, 900);
            return () => clearInterval(timer);
        }, []);

        useEffect(() => {
            const obs = new IntersectionObserver(entries => {
                entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
            }, { threshold: 0.1 });
            document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
            return () => obs.disconnect();
        }, []);


    return (
        <div className="min-w-full">

            <style>
                {`

                    @import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700;800;900&display=swap");
                    
                    :root {
                    --white: #ffffff;
                    --off:   #f7f8fa;
                    --border: #dde1ea;
                    --muted:  #8892a4;
                    --text:   #3d4658;
                    --dark:   #1a2035;
                    --blue:   #2355f5;
                    --blue-light: #eef1ff;
                    --green:  #00b87a;
                    --green-light: #e6f9f2;
                    --amber:  #f59e0b;
                    --amber-light: #fff8e6;
                    --red:    #e8354a;
                    --red-light: #fff0f2;
                    }

                    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
                    html { scroll-behavior: smooth; }

                    body {
                    background: var(--white);
                    color: var(--text);
                    font-family: 'Montserrat', system-ui;
                    overflow-x: hidden;
                    }

                    .wrapper { font-family: 'Montserrat', sans-serif; max-width: 1080px; margin: 0 auto; padding: 0 2.5rem; }

                    /* NAV */
                    nav {
                    position: sticky; top: 0; z-index: 100;
                    background: rgba(255,255,255,0.92);
                    backdrop-filter: blur(14px);
                    border-bottom: 1px solid var(--border);
                    padding: 1.1rem 2.5rem;
                    display: flex; align-items: center; justify-content: space-between;
                    animation: slideDown 0.55s ease forwards;
                    }
                    @keyframes slideDown {
                    from { transform: translateY(-100%); opacity: 0; }
                    to   { transform: translateY(0); opacity: 1; }
                    }
                    .nav-logo {
                    font-weight: 800; font-size: 0.82rem;
                    letter-spacing: 0.14em; text-transform: uppercase;
                    color: var(--dark);
                    display: flex; align-items: center; gap: 0.6rem;
                    }
                    .nav-dot {
                    width: 8px; height: 8px; border-radius: 50%;
                    background: var(--green);
                    animation: blink 1.8s ease-in-out infinite;
                    }
                    @keyframes blink {
                    0%,100%{ opacity:1; box-shadow:0 0 7px var(--green); }
                    50%    { opacity:0.2; box-shadow:none; }
                    }
                    .nav-tag { font-size: 0.67rem; font-weight: 500; letter-spacing: 0.06em; color: var(--muted); }

                    /* HERO */
                    .hero {
                    display: grid; grid-template-columns: 1fr 1fr;
                    gap: 5rem; align-items: center;
                    padding: 7rem 0 6rem;
                    }
                    @media(max-width:768px){ .hero{ grid-template-columns:1fr; gap:3rem; padding:4rem 0; } }

                    .hero-eyebrow {
                    font-size: 0.67rem; font-weight: 700;
                    letter-spacing: 0.24em; text-transform: uppercase;
                    color: var(--blue); margin-bottom: 1.1rem;
                    opacity: 0; animation: fadeUp 0.65s 0.2s forwards;
                    display: flex; align-items: center; gap: 0.6rem;
                    font-family: 'Montserrat', sans-serif;
                    }
                    .hero-eyebrow::before {
                    content:''; display:block; width:1.8rem; height:2px;
                    background: var(--blue); border-radius:2px;
                    }
                    .hero h1 {
                    font-size: clamp(2.6rem, 5.5vw, 4.4rem);
                    font-weight: 900; line-height: 1.05; letter-spacing: -0.02em;
                    color: var(--dark); opacity: 0; animation: fadeUp 0.65s 0.32s forwards;
                    font-family: 'Montserrat', sans-serif;
                    }
                    .hero h1 em { font-style: normal; color: var(--blue); }
                    .hero-body {
                    margin-top: 1.8rem; font-size: 1rem; font-weight: 400;
                    line-height: 1.85; color: var(--text);
                    opacity: 0; animation: fadeUp 0.65s 0.46s forwards;
                    font-family: 'Montserrat', sans-serif;
                    }
                    .hero-body strong { color: var(--dark); font-weight: 700; }
                    .hero-sub {
                    margin-top: 1.1rem; font-size: 0.97rem; line-height: 1.8;
                    color: var(--text); opacity: 0; animation: fadeUp 0.65s 0.6s forwards;
                    font-family: 'Montserrat', sans-serif;
                    }
                    .hero-sub strong { color: var(--green); font-weight: 700; }

                    @keyframes fadeUp {
                    from { opacity:0; transform:translateY(22px); }
                    to   { opacity:1; transform:translateY(0); }
                    }

                    /* DIAGRAM */
                    .diagram-wrap {
                    display: flex; justify-content: center; align-items: center;
                    opacity: 0; animation: fadeUp 0.9s 0.65s forwards;
                    font-family: 'Montserrat', sans-serif;
                    }
                    .diagram-svg { width: 100%; max-width: 360px; }
                    .node-project { animation: floatNode 7s ease-in-out infinite; }
                    .node-boq     { animation: floatNode 7s ease-in-out 0.9s infinite; }
                    .node-ledger  { animation: floatNode 7s ease-in-out 1.8s infinite; }
                    .node-variance{ animation: floatNode 5s ease-in-out 0.5s infinite; }
                    @keyframes floatNode {
                    0%,100%{ transform:translateY(0); }
                    50%    { transform:translateY(-9px); }
                    font-family: 'Montserrat', sans-serif;
                    }
                    .edge-line {
                    stroke-dasharray: 7 4;
                    animation: dashFlow 2s linear infinite;
                    }
                    @keyframes dashFlow { to { stroke-dashoffset: -33; } }

                    /* DIVIDER */
                    hr.divider {
                    border: none; height: 1px;
                    background: linear-gradient(90deg, transparent, var(--border) 30%, var(--border) 70%, transparent);
                    }

                    /* SECTION CHROME */
                    .section-label {
                    font-size: 0.65rem; font-weight: 700;
                    letter-spacing: 0.22em; text-transform: uppercase;
                    color: var(--muted); margin-bottom: 0.9rem;
                    display: flex; align-items: center; gap: 0.6rem;
                    }
                    .section-label::before {
                    content:''; display:block; width:1.5rem; height:2px;
                    background: var(--border); border-radius:2px;
                    }
                    .section-title {
                    font-size: clamp(1.9rem, 3.5vw, 2.8rem);
                    font-weight: 800; line-height: 1.1; letter-spacing: -0.02em;
                    color: var(--dark); margin-bottom: 1.2rem;
                    text-align: left;
                    font-family: 'Montserrat', sans-serif;
                    }
                    .section-body {
                    font-size: 1rem; line-height: 1.8; max-width: 620px;
                    color: var(--text); margin-bottom: 2.5rem; font-weight: 400;
                    text-align: left;
                    font-family: 'Montserrat', sans-serif;
                    }
                    .section-body strong { color: var(--dark); font-weight: 700; }

                    /* PROBLEM */
                    section.problem { padding: 6rem 0; }
                    .problem-grid { display: grid; grid-template-columns: repeat(auto-fit,minmax(260px,1fr)); gap: 1.25rem; }
                    .problem-card {
                    border-radius: 1.1rem; padding: 2rem 1.75rem;
                    position: relative; overflow: hidden;
                    border: 1px solid transparent;
                    transition: transform 0.3s ease, box-shadow 0.3s ease;
                    font-family: 'Montserrat', sans-serif;
                    }
                    .problem-card:hover { font-family: 'Montserrat', sans-serif; transform: translateY(-6px); box-shadow: 0 16px 40px rgba(0,0,0,0.08); }
                    .problem-card.red    { font-family: 'Montserrat', sans-serif; background: var(--red-light);   border-color: #fbc0c8; }
                    .problem-card.amber  { font-family: 'Montserrat', sans-serif; background: var(--amber-light); border-color: #fde9a6; }
                    .problem-card.yellow { font-family: 'Montserrat', sans-serif; background: #fffbeb;            border-color: #fde68a; }
                    .problem-card::before {
                     font-family: 'Montserrat', sans-serif; content:''; position:absolute; top:0; left:0; right:0; height:3px; border-radius:4px 4px 0 0;
                    }
                    .problem-card.red::before    { font-family: 'Montserrat', sans-serif; background: var(--red); }
                    .problem-card.amber::before  { font-family: 'Montserrat', sans-serif; background: var(--amber); }
                    .problem-card.yellow::before { background: #f59e0b; }
                    .problem-icon { font-family: 'Montserrat', sans-serif; margin-bottom: 1rem; display: block; }
                    .problem-card h3 { font-family: 'Montserrat', sans-serif; font-size: 0.95rem; font-weight: 700; margin-bottom: 0.6rem; }
                    .problem-card.red h3    { font-family: 'Montserrat', sans-serif; color: var(--red); }
                    .problem-card.amber h3  { font-family: 'Montserrat', sans-serif; color: #b45309; }
                    .problem-card.yellow h3 { font-family: 'Montserrat', sans-serif; color: #92400e; }
                    .problem-card p { font-family: 'Montserrat', sans-serif; font-size: 0.88rem; line-height: 1.65; font-weight: 400; }

                    /* SOLUTION */
                    section.solution { padding: 6rem 0; background: var(--off); }
                    .solution-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 1.5rem; }
                    @media(max-width:700px){ .solution-grid{ grid-template-columns:1fr; } }
                    .sol-card {
                    background: var(--white); border: 1px solid var(--border);
                    border-radius: 1.1rem; padding: 2.5rem 2rem;
                    position: relative; overflow: hidden;
                    transition: transform 0.3s, box-shadow 0.3s;
                    font-family: 'Montserrat', sans-serif;
                    }
                    .sol-card::before {
                    content:''; position:absolute; top:0; left:0; right:0; height:4px;
                    font-family: 'Montserrat', sans-serif;
                    }
                    .sol-card.blue  { --c:#2355f5; }
                    .sol-card.green { --c:#00b87a; }
                    .sol-card.amber { --c:#f59e0b; }
                    .sol-card::before { background: var(--c); }
                    .sol-card:hover { transform: translateY(-8px); box-shadow: 0 20px 48px rgba(0,0,0,0.09); }
                    .sol-num {
                    font-size: 3rem; font-weight: 900; line-height: 1;
                    color: var(--c); opacity: 0.15; margin-bottom: 0.5rem; letter-spacing: -0.03em;
                    font-family: 'Montserrat', sans-serif;
                    }
                    .sol-card h3 { font-family: 'Montserrat', sans-serif; font-size: 1.05rem; font-weight: 700; color: var(--c); margin-bottom: 0.7rem; }
                    .sol-card p { font-family: 'Montserrat', sans-serif; font-size: 0.9rem; line-height: 1.7; font-weight: 400; }

                    /* VARIANCE MONITOR */
                    section.variance-section { padding: 6rem 0; }
                    .monitor {
                    background: var(--off); border: 1px solid var(--border);
                    border-radius: 1.25rem; overflow: hidden;
                    box-shadow: 0 8px 40px rgba(0,0,0,0.06);
                    }
                    .monitor-header {
                    background: var(--white); border-bottom: 1px solid var(--border);
                    padding: 0.9rem 1.5rem; display: flex; align-items: center; gap: 0.45rem;
                    }
                    .dot { width:11px; height:11px; border-radius:50%; }
                    .dot.r{background:#ff5f57;} .dot.y{background:#febc2e;} .dot.g{background:#28c840;}
                    .monitor-title { font-size: 0.7rem; font-weight: 600; letter-spacing: 0.06em; color: var(--muted); margin-left: 0.6rem; }
                    .monitor-body { padding: 2rem; display: grid; grid-template-columns: repeat(3,1fr); gap: 1.25rem; }
                    @media(max-width:600px){ .monitor-body{ grid-template-columns:1fr; } }
                    .metric {
                    background: var(--white); border: 1px solid var(--border);
                    border-radius: 1rem; padding: 1.6rem;
                    position: relative; overflow: hidden;
                    }
                    .metric-label { font-size: 0.65rem; font-weight: 700; letter-spacing: 0.15em; text-transform: uppercase; color: var(--muted); margin-bottom: 0.7rem; }
                    .metric-value { font-size: 2.4rem; font-weight: 800; line-height: 1; letter-spacing: -0.03em; color: var(--dark); transition: color 0.4s; }
                    .metric-prefix { font-size: 1rem; font-weight: 600; color: var(--muted); vertical-align: super; margin-right: 2px; }
                    .metric-tag { font-size: 0.65rem; font-weight: 700; margin-top: 0.5rem; letter-spacing: 0.07em; text-transform: uppercase; }
                    .metric-bar { position: absolute; bottom: 0; left: 0; height: 3px; transition: width 0.85s cubic-bezier(0.25,0.8,0.25,1), background 0.4s; }
                    .monitor-chart { padding: 0 2rem 2rem; }
                    .chart-track { background: var(--white); border: 1px solid var(--border); border-radius: 0.75rem; padding: 1.25rem; }
                    .chart-label { font-size: 0.65rem; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; color: var(--muted); margin-bottom: 0.9rem; }
                    svg.sparkline { width:100%; height:60px; overflow:visible; }
                    .spark-path { fill:none; stroke:var(--blue); stroke-width:2; vector-effect:non-scaling-stroke; stroke-linejoin:round; stroke-linecap:round; }
                    .spark-path.over { stroke: var(--red); }

                    /* BENEFITS */
                    section.benefits { padding: 6rem 0; background: var(--off); }
                    .benefits-grid { display: grid; grid-template-columns: repeat(2,1fr); gap: 1.25rem; }
                    @media(max-width:600px){ .benefits-grid{ grid-template-columns:1fr; } }
                    .ben-card {
                    background: var(--white); border: 1px solid var(--border);
                    border-radius: 1.1rem; padding: 1.75rem;
                    display: flex; gap: 1.25rem; align-items: flex-start;
                    transition: transform 0.3s, box-shadow 0.3s, border-color 0.3s;
                    font-family: 'Montserrat', sans-serif;
                    }
                    .ben-card:hover { font-family: 'Montserrat', sans-serif; transform: translateX(6px); border-color: var(--blue); box-shadow: 0 8px 28px rgba(35,85,245,0.09); }
                    .ben-icon {
                    width:48px; height:48px; border-radius:0.875rem;
                    background: var(--blue-light);
                    display:flex; align-items:center; justify-content:center; flex-shrink:0;
                    }
                    .ben-card:nth-child(2) .ben-icon { font-family: 'Montserrat', sans-serif; background: var(--green-light); }
                    .ben-card:nth-child(3) .ben-icon { font-family: 'Montserrat', sans-serif; background: var(--amber-light); }
                    .ben-card:nth-child(4) .ben-icon { font-family: 'Montserrat', sans-serif; background: #f3eeff; }
                    .ben-card h3 { font-family: 'Montserrat', sans-serif; font-size: 0.95rem; font-weight: 700; color: var(--dark); margin-bottom: 0.35rem; }
                    .ben-card p { font-family: 'Montserrat', sans-serif; font-size: 0.88rem; line-height: 1.65; font-weight: 400; }


                    footer .logo-text-lower { font-family: 'Montserrat', sans-serif; font-size: 20px; color: #ffff; }

                    /* FINAL */
                    section.final-section {
                    padding: 8rem 0 9rem; text-align: center;
                    background: var(--white); position: relative; overflow: hidden;
                    font-family: 'Montserrat', sans-serif;
                    }
                    section.final-section::before {
                    content:''; position:absolute; top:50%; left:50%;
                    transform:translate(-50%,-50%);
                    width:700px; height:700px; border-radius:50%;
                    background: radial-gradient(circle, rgba(35,85,245,0.055) 0%, transparent 70%);
                    pointer-events:none;
                    font-family: 'Montserrat', sans-serif;
                    }
                    .final-title {
                    font-size: clamp(2.6rem, 5.5vw, 4.8rem);
                    font-weight: 900; line-height: 1.05; letter-spacing: -0.03em;
                    color: var(--dark); margin-bottom: 2rem;
                    font-family: 'Montserrat', sans-serif;
                    }
                    .final-title span {
                    background: linear-gradient(120deg, var(--blue) 0%, var(--green) 100%);
                    -webkit-background-clip: text; -webkit-text-fill-color: transparent;
                    background-clip: text; background-size: 200%;
                    animation: gradShift 4s ease-in-out infinite alternate;
                    font-family: 'Montserrat', sans-serif;
                    }
                    @keyframes gradShift {
                    from { background-position: 0% 50%; }
                    to   { background-position: 100% 50%; }
                    }
                    .final-body { font-family: 'Montserrat', sans-serif; font-size: 1.05rem; line-height: 1.85; max-width: 600px; margin: 0 auto; color: var(--text); font-weight: 400; }

                    /* SCROLL REVEAL */
                    .reveal { opacity:0; transform:translateY(28px); transition:opacity 0.65s ease,transform 0.65s ease; }
                    .reveal.visible { opacity:1; transform:translateY(0); }

                `}

            </style>



            <nav className='flex-3'>
                <div className="logo-photo">
                    <a href='/'>
                        <div className="flex items-center space-x-3">
                            <svg className="w-9 h-9 text-orange-800" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z"/>
                            </svg>
                            <div><h1 className="logo-text-lower text-xl font-bold text-gray-900">Urusentra</h1></div>
                        </div>
                    </a>
                </div>

                <div className="nav-logo">
                </div>
                <span className="nav-tag">
                    <a href="/pricing">Try it out</a>
                </span>
            </nav>

            <div className="wrapper">

            <section className="hero">

                <div>
                <p className="hero-eyebrow">Financial Intelligence System</p>
                <h1 className='text-left'>Project<br/><em>Management</em></h1>
                <p className="hero-body">
                    The <strong>Project Manager</strong> is the financial intelligence system of a construction project. It includes the very valuable <strong>Bill of Quantities</strong> and <strong>Job Cost Ledger</strong>. The Job Cost Ledger continuously monitors the <strong>real money being spent</strong> while comparing it to the <strong>original budget</strong> defined in the Bill of Quantities.
                </p>
                <p className="hero-sub">
                    Because the ledger connects directly to the <strong>Project</strong> and to the <strong>BOQ</strong>, contractors can monitor costs in <strong>real‑time</strong>, detect overspending instantly, and calculate <strong>variance</strong> automatically.
                </p>
                </div>

                <div className="diagram-wrap">
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

                    <svg className="diagram-svg" viewBox="0 0 300 330">
                        <defs>
                            <filter id="sh-b"><feDropShadow dx="0" dy="4" stdDeviation="7" floodColor="#2355f5" floodOpacity="0.16"/></filter>
                            <filter id="sh-g"><feDropShadow dx="0" dy="4" stdDeviation="7" floodColor="#00b87a" floodOpacity="0.16"/></filter>
                            <filter id="sh-a"><feDropShadow dx="0" dy="4" stdDeviation="7" floodColor="#f59e0b" floodOpacity="0.16"/></filter>
                            <filter id="sh-r"><feDropShadow dx="0" dy="4" stdDeviation="7" floodColor="#e8354a" floodOpacity="0.16"/></filter>
                            <marker id="arr" markerWidth="7" markerHeight="7" refX="5" refY="3.5" orient="auto">
                                <path d="M0,0 L7,3.5 L0,7 Z" fill="#c4cad8"/>
                            </marker>
                        </defs>
                        
                        <line x1="150" y1="78" x2="74" y2="152" stroke="#dde1ea" strokeWidth="1.5" className="edge-line" markerEnd="url(#arr)"/>
                        <line x1="150" y1="78" x2="226" y2="152" stroke="#dde1ea" strokeWidth="1.5" className="edge-line" markerEnd="url(#arr)" style={{ animationDelay: '0.4s' }}/>
                        <line x1="74" y1="192" x2="148" y2="258" stroke="#dde1ea" strokeWidth="1.5" className="edge-line" markerEnd="url(#arr)" style={{ animationDelay: '0.8s' }}/>
                        <line x1="226" y1="192" x2="152" y2="258" stroke="#dde1ea" strokeWidth="1.5" className="edge-line" markerEnd="url(#arr)" style={{ animationDelay: '1.2s' }}/>

                        <g className="node-project" filter="url(#sh-b)">
                            <rect x="108" y="28" width="84" height="50" rx="12" fill="#eef1ff" stroke="#2355f5" strokeWidth="1.5"/>
                            <text x="150" y="50" textAnchor="middle" fill="#2355f5" fontFamily="Montserrat,sans-serif" fontSize="9" fontWeight="800" letterSpacing="1.5">PROJECT</text>
                            <text x="150" y="65" textAnchor="middle" fill="#8892a4" fontFamily="Montserrat,sans-serif" fontSize="7" fontWeight="500">MASTER BUDGET</text>
                        </g>
                        <g className="node-boq" filter="url(#sh-g)">
                            <rect x="28" y="152" width="92" height="50" rx="12" fill="#e6f9f2" stroke="#00b87a" strokeWidth="1.5"/>
                            <text x="74" y="174" textAnchor="middle" fill="#00b87a" fontFamily="Montserrat,sans-serif" fontSize="9" fontWeight="800" letterSpacing="1.5">BOQ</text>
                            <text x="74" y="189" textAnchor="middle" fill="#8892a4" fontFamily="Montserrat,sans-serif" fontSize="7" fontWeight="500">ESTIMATED COST</text>
                        </g>
                        <g className="node-ledger" filter="url(#sh-a)">
                            <rect x="180" y="152" width="92" height="50" rx="12" fill="#fff8e6" stroke="#f59e0b" strokeWidth="1.5"/>
                            <text x="226" y="174" textAnchor="middle" fill="#d97706" fontFamily="Montserrat,sans-serif" fontSize="9" fontWeight="800" letterSpacing="1.5">LEDGER</text>
                            <text x="226" y="189" textAnchor="middle" fill="#8892a4" fontFamily="Montserrat,sans-serif" fontSize="7" fontWeight="500">ACTUAL SPEND</text>
                        </g>
                        <g className="node-variance" filter="url(#sh-r)">
                            <rect x="108" y="258" width="84" height="50" rx="12" fill="#fff0f2" stroke="#e8354a" strokeWidth="1.5"/>
                            <text x="150" y="280" textAnchor="middle" fill="#e8354a" fontFamily="Montserrat,sans-serif" fontSize="9" fontWeight="800" letterSpacing="1.5">VARIANCE</text>
                            <text x="150" y="295" textAnchor="middle" fill="#8892a4" fontFamily="Montserrat,sans-serif" fontSize="7" fontWeight="500">REAL-TIME DELTA</text>
                        </g>
                    </svg>
                </div>

            </section>

            </div>

            <hr className="divider"/>


            <section className="problem">
                <div className="wrapper reveal">
                    <div className="section-label">Industry Challenge</div>
                    <h2 className="section-title" style={{ color: "var(--red)" }}>The Construction Industry Problem</h2>
                    <p className="section-body">Construction projects frequently suffer from <strong>budget overruns</strong>. The reason is simple: most companies only discover cost problems <strong>after the money has already been spent</strong>.</p>
                    <div className="problem-grid">
                    <div className="problem-card red reveal">
                        <span className="problem-icon">
                        <svg width="38" height="38" viewBox="0 0 38 38" fill="none">
                            <circle cx="19" cy="19" r="16" stroke="#e8354a" stroke-width="1.8"/>
                            <path d="M19 11v10" stroke="#e8354a" stroke-width="2.5" stroke-linecap="round"/>
                            <circle cx="19" cy="26" r="1.8" fill="#e8354a"/>
                        </svg>
                        </span>
                        <h3>Delayed Cost Visibility</h3>
                        <p>Many companies rely on monthly reports instead of live data.</p>
                    </div>
                    <div className="problem-card amber reveal" style={{ transitionDelay: '0.14s' }}>
                        <span className="problem-icon">
                        <svg width="38" height="38" viewBox="0 0 38 38" fill="none">
                            <rect x="7" y="11" width="24" height="19" rx="3" stroke="#b45309" stroke-width="1.8"/>
                            <path d="M13 11V8M25 11V8" stroke="#b45309" stroke-width="1.8" stroke-linecap="round"/>
                            <path d="M12 19h14M12 24h9" stroke="#b45309" stroke-width="1.8" stroke-linecap="round"/>
                        </svg>
                        </span>
                        <h3>Uncontrolled Supplier Costs</h3>
                        <p>Material prices change and projects overspend without warning.</p>
                    </div>
                    <div className="problem-card yellow reveal" style={{ transitionDelay: "0.28s" }}>
                        <span className="problem-icon">
                        <svg width="38" height="38" viewBox="0 0 38 38" fill="none">
                            <polyline points="7,28 15,17 21,23 31,11" stroke="#92400e" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>
                            <polyline points="26,11 31,11 31,16" stroke="#92400e" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                        </span>
                        <h3>Profit Loss</h3>
                        <p>Small overruns on many BOQ lines destroy total project profit.</p>
                    </div>
                    </div>
                </div>
            </section>

            <hr className="divider"/>

            <section className="solution">
                <div className="wrapper reveal">
                    <div className="section-label">How It Works</div>
                    <h2 className="section-title" style={{ color: "var(--green)" }}>The Job Cost Ledger Solution</h2>
                    <p className="section-body">The Job Cost Ledger solves this problem by linking three financial layers of a project together.</p>
                    <div className="solution-grid">
                    <div className="sol-card blue reveal">
                        <div className="sol-num">01</div>
                        <h3>Project</h3>
                        <p>Defines the overall budget, schedule, phases and cost targets.</p>
                    </div>
                    <div className="sol-card green reveal" style={{ transitionDelay: "0.14s" }}>
                        <div className="sol-num">02</div>
                        <h3>BOQ</h3>
                        <p>Defines the estimated cost for every material, item and activity.</p>
                    </div>
                    <div className="sol-card amber reveal" style={{ transitionDelay: "0.28s" }}>
                        <div className="sol-num">03</div>
                        <h3>Ledger</h3>
                        <p>Records the real financial transactions happening during construction.</p>
                    </div>
                    </div>
                </div>
            </section>

            <hr className="divider"/>


            <section className="variance-section">
                <div className="wrapper">
                    <div className="monitor reveal">
                        <div className="monitor-header">
                            <div className="dot r"></div><div className="dot y"></div><div className="dot g"></div>
                            <div className="monitor-title">LIVE JOB COST LEDGER</div>
                        </div>
                        
                        <div className="monitor-body">
                            {/* BUDGET CARD */}
                            <div className="metric">
                                <div className="metric-label">Original Budget</div>
                                <div className="metric-value"><span className="metric-prefix">$</span>{fmt(BUDGET)}</div>
                                <div className="metric-tag" style={{ color: 'var(--muted)' }}>Projected Cost</div>
                                <div className="metric-bar" style={{ width: '100%', background: 'var(--border)' }}></div>
                            </div>

                            {/* ACTUAL CARD */}
                            <div className="metric">
                                <div className="metric-label">Actual Spend</div>
                                <div className="metric-value" style={{ color: over ? 'var(--red)' : 'var(--green)' }}>
                                    <span className="metric-prefix">$</span>{fmt(actual)}
                                </div>
                                <div className="metric-tag" style={{ color: over ? 'var(--red)' : 'var(--green)' }}>
                                    {over ? '▲ OVER BUDGET' : '● WITHIN BUDGET'}
                                </div>
                                <div className="metric-bar" style={{ width: `${Math.min(pct, 100)}%`, background: over ? 'var(--red)' : 'var(--green)' }}></div>
                            </div>

                            {/* VARIANCE CARD */}
                            <div className="metric">
                                <div className="metric-label">Variance</div>
                                <div className="metric-value">
                                    <span className="metric-prefix">$</span>{fmt(Math.abs(variance))}
                                </div>
                                <div className="metric-tag" style={{ color: over ? 'var(--red)' : 'var(--green)' }}>
                                    {over ? '▼ DEFICIT' : '▲ SAVINGS'}
                                </div>
                                <div className="metric-bar" style={{ width: `${vpct}%`, background: over ? 'var(--red)' : 'var(--green)' }}></div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <hr className="divider"/>


            <section className="benefits">
                <div className="wrapper reveal">
                    <div className="section-label">Value Proposition</div>
                    <h2 className="section-title" style={{ color: "var(--blue)" }}>Industry Benefits</h2>
                    <div className="benefits-grid">
                    <div className="ben-card reveal">
                        <div className="ben-icon">
                        <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                            <circle cx="11" cy="11" r="3" fill="#2355f5"/>
                            <path d="M11 2v2M11 18v2M2 11h2M18 11h2" stroke="#2355f5" stroke-width="1.7" stroke-linecap="round"/>
                            <path d="M4.5 4.5l1.5 1.5M16 16l1.5 1.5M4.5 17.5l1.5-1.5M16 6l1.5-1.5" stroke="#2355f5" stroke-width="1.5" stroke-linecap="round"/>
                        </svg>
                        </div>
                        <div>
                        <h3>Real‑Time Cost Monitoring</h3>
                        <p>Track spending while construction is happening.</p>
                        </div>
                    </div>
                    <div className="ben-card reveal" style={{ transitionDelay: "0.1s" }}>
                        <div className="ben-icon">
                        <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                            <path d="M11 2L2 6.5l9 4.5 9-4.5L11 2z" stroke="#00b87a" stroke-width="1.7" stroke-linejoin="round"/>
                            <path d="M2 15.5l9 4.5 9-4.5M2 11l9 4.5 9-4.5" stroke="#00b87a" stroke-width="1.7" stroke-linejoin="round"/>
                        </svg>
                        </div>
                        <div>
                        <h3>Reduce Production Costs</h3>
                        <p>Detect wasteful spending immediately.</p>
                        </div>
                    </div>
                    <div className="ben-card reveal" style={{ transitionDelay: "0.2s" }}>
                        <div className="ben-icon">
                        <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                            <path d="M12 2L3 13h8l-1 7 10-11h-8l1-7z" stroke="#d97706" stroke-width="1.7" stroke-linejoin="round" stroke-linecap="round"/>
                        </svg>
                        </div>
                        <div>
                        <h3>Faster Decisions</h3>
                        <p>Managers react instantly to cost problems.</p>
                        </div>
                    </div>
                    <div className="ben-card reveal" style={{ transitionDelay: "0.3s" }}>
                        <div className="ben-icon">
                        <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                            <path d="M11 2L3 6v5c0 4.5 3.5 8 8 9 4.5-1 8-4.5 8-9V6l-8-4z" stroke="#7c3aed" stroke-width="1.7" stroke-linejoin="round"/>
                            <path d="M8 11l2 2 4-4" stroke="#7c3aed" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                        </div>
                        <div>
                        <h3>Protect Profit</h3>
                        <p>Prevent small cost overruns from destroying margins.</p>
                        </div>
                    </div>
                    </div>
                </div>
            </section>


            <section className="final-section reveal">
                <div className="wrapper">
                    <h2 className="final-title">Real‑Time<br/><span>Financial Control</span></h2>
                    <p className="final-body">The Job Cost Ledger transforms construction management from reactive accounting into proactive financial intelligence. Builders and interior designers gain the power to monitor budgets, detect cost overruns instantly, and maintain profitability throughout the life of a project.</p>
                </div>
            </section>

        </div>
    );
};
export default ProjectFeature;