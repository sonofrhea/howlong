import React, { useEffect } from 'react';






function ClientFeature() {

    useEffect(() => {
    const history = Array.from({length:20}, (_,i) => 1200 + Math.sin(i*0.6)*400 + Math.random()*200);

    function renderSpark(){
        const max = Math.max(...history) * 1.1;
        const W = 400, H = 60;
        
        const pathEl = document.getElementById('spark-path');
        const fillEl = document.getElementById('spark-fill');

        if (!pathEl || !fillEl) return;

        const pts = history.map((v,i) => [(i/(history.length-1))*W, H-(v/max)*H]);
        const d  = pts.map((p,i)=>(i===0?`M${p[0]},${p[1]}`:`L${p[0]},${p[1]}`)).join(' ');
        const df = d + ` L${W},${H} L0,${H} Z`;
        
        pathEl.setAttribute('d', d);
        fillEl.setAttribute('d', df);
    }

    const interval = setInterval(()=>{
        history.shift();
        history.push(900 + Math.random()*1200);
        renderSpark();
    }, 1100);
    
    renderSpark();

    // ---- SCROLL REVEAL ----
    const obs = new IntersectionObserver(entries => {
        entries.forEach(e => { 
        if(e.isIntersecting) e.target.classList.add('visible'); 
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal').forEach(el => obs.observe(el));

    return () => {
        clearInterval(interval);
        obs.disconnect();
    };
    }, []);



    return (
        <div className="min-w-full">
                <title>Client Feature | Urusentra · Modern ERP solution for the building industry</title>
                <meta name="client" content="Learn more about Client features – modern building industry ERP" />

            <style>
                
                {`

                @import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700;800;900&display=swap");

                :root {
                --white:  #ffffff;
                --off:    #f7f8fa;
                --stone:  #f4f5f7;
                --border: #dde1ea;
                --muted:  #8892a4;
                --text:   #3d4658;
                --dark:   #1a2035;

                --teal:        #0f766e;
                --teal-mid:    #14b8a6;
                --teal-light:  #f0fdfa;
                --teal-border: #99f6e4;

                --blue:        #2355f5;
                --blue-light:  #eef1ff;

                --violet:      #7c3aed;
                --violet-light:#f5f3ff;

                --amber:       #d97706;
                --amber-light: #fffbeb;
                --amber-border:#fde68a;

                --red:         #e8354a;
                --red-light:   #fff0f2;
                --red-border:  #fecaca;

                --green:       #00b87a;
                --green-light: #e6f9f2;
                }

                *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
                html { scroll-behavior: smooth; }

                body {
                background: var(--off);
                color: var(--text);
                font-family: 'Montserrat', sans-serif;
                overflow-x: hidden;
                }

                .wrapper { max-width: 1080px; margin: 0 auto; padding: 0 2.5rem; }

                /* ---- NAV ---- */
                nav {
                font-family: 'Montserrat', sans-serif;
                position: sticky; top: 0; z-index: 100;
                background: rgba(255,255,255,0.94);
                backdrop-filter: blur(14px);
                border-bottom: 1px solid var(--border);
                padding: 0 2.5rem;
                display: flex; align-items: center; justify-content: space-between;
                height: 64px;
                animation: slideDown 0.55s ease forwards;
                }
                @keyframes slideDown {
                from { transform: translateY(-100%); opacity: 0; }
                to   { transform: translateY(0); opacity: 1; }
                }
                .nav-brand { display: flex; align-items: center; gap: 0.65rem; }
                .nav-icon {
                width: 34px; height: 34px;
                border-radius: 8px;
                display: flex; align-items: center; justify-content: center;
                }
                .nav-titles h1 { font-family: 'Montserrat', sans-serif; font-size: 1.05rem; font-weight: 800; letter-spacing: -0.01em; color: var(--dark); line-height: 1.1; }
                .nav-titles p  { font-size: 0.58rem; font-weight: 600; letter-spacing: 0.2em; text-transform: uppercase; color: var(--muted); }
                .nav-links { display: flex; align-items: center; gap: 1.75rem; }
                .nav-links a { font-size: 0.8rem; font-weight: 600; color: #4b5563; text-decoration: none; transition: color 0.2s; }
                .nav-links a:hover { color: var(--teal); }
                .nav-links a.active { color: var(--teal); }
                .nav-dot { width: 8px; height: 8px; border-radius: 50%; background: var(--green); animation: blink 1.8s ease-in-out infinite; }
                @keyframes blink {
                0%,100%{ opacity:1; box-shadow:0 0 7px var(--green); }
                50%    { opacity:0.2; box-shadow:none; }
                }

                /* ---- BREADCRUMB ---- */
                .breadcrumb {
                background: var(--white);
                border-bottom: 1px solid var(--border);
                padding: 0.75rem 2.5rem;
                display: flex; align-items: center; gap: 0.5rem;
                font-size: 0.78rem;
                
                }
                .breadcrumb a { color: var(--muted); text-decoration: none; font-weight: 500; transition: color 0.2s; }
                .breadcrumb a:hover { color: var(--teal); }
                .breadcrumb span { color: var(--dark); font-weight: 700; }

                /* ---- HERO ---- */
                .hero {
                background: var(--white);
                border-bottom: 1px solid var(--border);
                padding: 5.5rem 0 5rem;
                position: relative; overflow: hidden;
                }
                .hero::before {
                content:''; position:absolute; inset:0;
                background: radial-gradient(ellipse 800px 400px at 65% 50%, rgba(15,118,110,0.05) 0%, transparent 70%);
                pointer-events:none;
                }
                .hero-inner {
                display: grid; grid-template-columns: 1fr 1fr;
                gap: 5rem; align-items: center;
                }
                @media(max-width:768px){ .hero-inner{ grid-template-columns:1fr; gap:3rem; } }

                .hero-eyebrow {
                font-size: 0.67rem; font-weight: 700;
                letter-spacing: 0.24em; text-transform: uppercase;
                color: var(--teal); margin-bottom: 1.1rem;
                display: flex; align-items: center; gap: 0.6rem;
                opacity: 0; animation: fadeUp 0.65s 0.2s forwards;
                }
                .hero-eyebrow::before {
                content:''; display:block; width:1.8rem; height:2px;
                background: var(--teal); border-radius:2px;
                }
                .hero h1 {
                font-family: 'Montserrat', sans-serif;
                font-size: clamp(2.5rem, 5vw, 4.2rem);
                font-weight: 900; line-height: 1.05; letter-spacing: -0.025em;
                color: var(--dark);
                opacity: 0; animation: fadeUp 0.65s 0.32s forwards;
                }
                .hero h1 em { font-family: 'Montserrat', sans-serif; font-style: normal; color: var(--teal); }
                .hero-body {
                font-family: 'Montserrat', sans-serif;
                margin-top: 1.8rem; font-size: 1rem; font-weight: 400;
                line-height: 1.85; color: var(--text);
                opacity: 0; animation: fadeUp 0.65s 0.46s forwards;
                }
                .hero-body strong { font-family: 'Montserrat', sans-serif; color: var(--dark); font-weight: 700; }
                .hero-stats {
                font-family: 'Montserrat', sans-serif;
                margin-top: 2.5rem; display: flex; gap: 2.5rem;
                opacity: 0; animation: fadeUp 0.65s 0.6s forwards;
                }
                .stat-num { font-size: 1.8rem; font-weight: 900; color: var(--dark); line-height: 1; letter-spacing: -0.03em; }
                .stat-num span { color: var(--teal); }
                .stat-label { font-size: 0.72rem; font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase; color: var(--muted); margin-top: 0.2rem; }

                @keyframes fadeUp {
                from { opacity:0; transform:translateY(22px); }
                to   { opacity:1; transform:translateY(0); }
                }

                /* ---- HERO DIAGRAM ---- */
                .hero-diagram {
                font-family: 'Montserrat', sans-serif;
                display: flex; justify-content: center; align-items: center;
                opacity: 0; animation: fadeUp 0.9s 0.65s forwards;
                }
                .diagram-svg { width: 100%; max-width: 380px; }

                .node-a { animation: floatNode 7s ease-in-out infinite; }
                .node-b { animation: floatNode 7s ease-in-out 0.6s infinite; }
                .node-c { animation: floatNode 7s ease-in-out 1.2s infinite; }
                .node-d { animation: floatNode 7s ease-in-out 1.8s infinite; }
                .node-e { animation: floatNode 6s ease-in-out 0.3s infinite; }
                @keyframes floatNode {
                0%,100%{ transform:translateY(0); }
                50%    { transform:translateY(-8px); }
                }
                .edge-flow {
                stroke-dasharray: 6 4;
                animation: dashFlow 2.2s linear infinite;
                }
                .edge-flow.d1{ animation-delay:0.3s; }
                .edge-flow.d2{ animation-delay:0.6s; }
                .edge-flow.d3{ animation-delay:0.9s; }
                .edge-flow.d4{ animation-delay:1.2s; }
                @keyframes dashFlow { to { stroke-dashoffset: -30; } }

                /* ---- DIVIDER ---- */
                hr.divider {
                border: none; height: 1px;
                background: linear-gradient(90deg, transparent, var(--border) 30%, var(--border) 70%, transparent);
                }

                /* ---- SECTION CHROME ---- */
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
                font-family: 'Montserrat', sans-serif;
                font-size: clamp(1.9rem, 3.5vw, 2.8rem);
                font-weight: 800; line-height: 1.1; letter-spacing: -0.02em;
                color: var(--dark); margin-bottom: 1.2rem;
                }
                .section-body {
                font-family: 'Montserrat', sans-serif;
                font-size: 1rem; line-height: 1.8; max-width: 640px;
                color: var(--text); margin-bottom: 2.5rem; font-weight: 400;
                }
                .section-body strong { color: var(--dark); font-weight: 700; }

                /* ---- LIFECYCLE SECTION ---- */
                section.lifecycle { font-family: 'Montserrat', sans-serif; padding: 6rem 0; background: var(--white); }

                .lifecycle-grid {
                font-family: 'Montserrat', sans-serif;
                display: grid; grid-template-columns: repeat(4,1fr); gap: 1.25rem;
                }
                @media(max-width:800px){ .lifecycle-grid{ grid-template-columns:repeat(2,1fr); } }
                @media(max-width:480px){ .lifecycle-grid{ grid-template-columns:1fr; } }

                .lc-card {
                background: var(--off);
                border: 1px solid var(--border);
                border-radius: 1.1rem;
                padding: 1.75rem 1.5rem;
                position: relative; overflow: hidden;
                transition: all 0.3s ease;
                cursor: default;
                }
                .lc-card::before {
                content:''; position:absolute; top:0; left:0; right:0; height:4px;
                border-radius:4px 4px 0 0;
                }
                .lc-card.teal   { --lc: var(--teal);   --lcl: var(--teal-light);   --lcb: var(--teal-border); }
                .lc-card.violet { --lc: var(--violet); --lcl: var(--violet-light); --lcb: #ddd6fe; }
                .lc-card.amber  { --lc: var(--amber);  --lcl: var(--amber-light);  --lcb: var(--amber-border); }
                .lc-card.red    { --lc: var(--red);    --lcl: var(--red-light);    --lcb: var(--red-border); }
                .lc-card::before { background: var(--lc); }
                .lc-card:hover {
                border-color: var(--lc);
                transform: translateY(-6px);
                box-shadow: 0 16px 40px rgba(0,0,0,0.08);
                }
                .lc-icon {
                width: 48px; height: 48px;
                border-radius: 0.875rem;
                background: var(--lcl);
                border: 1px solid var(--lcb);
                display: flex; align-items: center; justify-content: center;
                margin-bottom: 1.1rem;
                }
                .lc-num {
                font-size: 2.5rem; font-weight: 900; line-height: 1;
                color: var(--lc); opacity: 0.12; margin-bottom: 0.4rem; letter-spacing: -0.03em;
                }
                .lc-card h3 { font-family: 'Montserrat', sans-serif; font-size: 0.92rem; font-weight: 800; color: var(--lc); margin-bottom: 0.5rem; }
                .lc-card p { font-size: 0.83rem; line-height: 1.65; font-weight: 400; }

                /* ---- CLIENT PROFILE ---- */
                section.profile { font-family: 'Montserrat', sans-serif; padding: 6rem 0; background: var(--off); }

                .profile-layout {
                font-family: 'Montserrat', sans-serif;
                display: grid; grid-template-columns: 1fr 1fr; gap: 3rem; align-items: start;
                }
                @media(max-width:768px){ .profile-layout{ grid-template-columns:1fr; } }

                .profile-card {
                font-family: 'Montserrat', sans-serif;
                background: var(--white);
                border: 1px solid var(--border);
                border-radius: 1.25rem;
                overflow: hidden;
                box-shadow: 0 4px 24px rgba(0,0,0,0.05);
                }
                .profile-card-header {
                font-family: 'Montserrat', sans-serif;
                padding: 1.5rem;
                background: var(--teal-light);
                border-bottom: 1px solid var(--teal-border);
                display: flex; align-items: center; gap: 1rem;
                }
                .profile-avatar {
                font-family: 'Montserrat', sans-serif;
                width: 56px; height: 56px;
                border-radius: 50%;
                background: var(--teal);
                display: flex; align-items: center; justify-content: center;
                flex-shrink: 0;
                }
                .profile-avatar span { font-size: 1.1rem; font-weight: 900; color: white; letter-spacing: 0.02em; }
                .profile-name { font-size: 1.05rem; font-weight: 800; color: var(--dark); }
                .profile-id {
                font-family: 'Montserrat', sans-serif;
                font-size: 0.68rem; font-weight: 700;
                letter-spacing: 0.12em; color: var(--teal);
                margin-top: 0.2rem;
                }
                .status-badge {
                margin-left: auto;
                padding: 0.3rem 0.75rem;
                border-radius: 999px;
                font-size: 0.65rem; font-weight: 800;
                letter-spacing: 0.08em; text-transform: uppercase;
                }
                .status-badge.active { background: var(--green-light); color: var(--green); border: 1px solid #a7f3d0; }
                .status-badge.prospect { background: var(--teal-light); color: var(--teal); border: 1px solid var(--teal-border); }
                .status-badge.pending { background: var(--amber-light); color: var(--amber); border: 1px solid var(--amber-border); }

                .profile-body { padding: 1.5rem; }
                .profile-row {
                font-family: 'Montserrat', sans-serif;
                display: flex; align-items: flex-start; gap: 0.75rem;
                padding: 0.7rem 0;
                border-bottom: 1px solid var(--border);
                font-size: 0.83rem;
                }
                .profile-row:last-child { font-family: 'Montserrat', sans-serif; border-bottom: none; }
                .profile-row-label { font-family: 'Montserrat', sans-serif; font-weight: 700; color: var(--muted); min-width: 110px; font-size: 0.72rem; letter-spacing: 0.06em; text-transform: uppercase; }
                .profile-row-value { font-family: 'Montserrat', sans-serif; font-weight: 500; color: var(--dark); }

                /* STATUS CHOICES visual */
                .status-grid {
                display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem;
                }
                .status-item {
                background: var(--off);
                border: 1px solid var(--border);
                border-radius: 0.75rem;
                padding: 1rem 1.1rem;
                display: flex; align-items: center; gap: 0.75rem;
                }
                .status-dot { width: 10px; height: 10px; border-radius: 50%; flex-shrink: 0; }
                .status-dot.active   { background: var(--green); }
                .status-dot.inactive { background: var(--muted); }
                .status-dot.suspended{ background: var(--red); }
                .status-dot.prospect { background: var(--teal); }
                .status-dot.pending  { background: var(--amber); }
                .status-item-label { font-size: 0.8rem; font-weight: 700; color: var(--dark); }
                .status-item-desc  { font-size: 0.72rem; color: var(--muted); font-weight: 400; margin-top: 0.1rem; }

                /* ---- FINANCIAL WORKFLOW ---- */
                section.workflow { padding: 6rem 0; background: var(--white); }

                .workflow-flow {
                display: grid; grid-template-columns: repeat(3,1fr);
                gap: 1.5rem; position: relative;
                }
                @media(max-width:700px){ .workflow-flow{ grid-template-columns:1fr; } }

                .workflow-flow::before {
                content:''; position:absolute;
                top: 50%; left: 16.5%; right: 16.5%;
                height: 1px;
                background: linear-gradient(90deg, var(--teal-border), var(--teal-border));
                z-index:0;
                }
                @media(max-width:700px){ .workflow-flow::before{ display:none; } }

                .wf-card {
                background: var(--white);
                border: 1px solid var(--border);
                border-radius: 1.1rem;
                padding: 2.5rem 2rem;
                position: relative; z-index:1;
                overflow: hidden;
                transition: all 0.3s;
                }
                .wf-card::before {
                content:''; position:absolute; top:0; left:0; right:0; height:4px;
                }
                .wf-card.dn  { --wc: var(--violet); }
                .wf-card.cn  { --wc: var(--teal); }
                .wf-card.ref { --wc: var(--amber); }
                .wf-card::before { background: var(--wc); }
                .wf-card:hover { border-color: var(--wc); transform: translateY(-8px); box-shadow: 0 20px 48px rgba(0,0,0,0.08); }

                .wf-num {
                font-size: 2.8rem; font-weight: 900; line-height: 1;
                color: var(--wc); opacity: 0.12; margin-bottom: 0.4rem; letter-spacing: -0.03em;
                }
                .wf-prefix {
                display: inline-block;
                padding: 0.25rem 0.65rem;
                background: rgba(0,0,0,0.04);
                border-radius: 6px;
                font-size: 0.65rem; font-weight: 800;
                letter-spacing: 0.1em;
                color: var(--wc);
                margin-bottom: 0.9rem;
                border: 1px solid rgba(0,0,0,0.06);
                }
                .wf-card h3 { font-family: 'Montserrat', sans-serif; font-size: 1.1rem; font-weight: 800; color: var(--dark); margin-bottom: 0.7rem; }
                .wf-card p  { font-size: 0.88rem; line-height: 1.7; font-weight: 400; }

                .wf-fields { margin-top: 1.25rem; padding-top: 1.1rem; border-top: 1px solid var(--border); }
                .wf-field-row {
                display: flex; align-items: center; justify-content: space-between;
                padding: 0.4rem 0;
                font-size: 0.78rem;
                border-bottom: 1px solid var(--off);
                }
                .wf-field-row:last-child { border-bottom: none; }
                .wf-field-row span:first-child { color: var(--muted); font-weight: 600; }
                .wf-field-row span:last-child  { color: var(--dark); font-weight: 700; font-size: 0.72rem; }

                /* ---- LIVE LEDGER ---- */
                section.ledger { padding: 6rem 0; background: var(--off); }

                .ledger-panel {
                background: var(--white);
                border: 1px solid var(--border);
                border-radius: 1.25rem;
                overflow: hidden;
                box-shadow: 0 8px 40px rgba(0,0,0,0.06);
                }
                .ledger-header {
                background: var(--white);
                border-bottom: 1px solid var(--border);
                padding: 0.9rem 1.5rem;
                display: flex; align-items: center; gap: 0.45rem;
                }
                .dot { width:11px; height:11px; border-radius:50%; }
                .dot.r{background:#ff5f57;} .dot.y{background:#febc2e;} .dot.g{background:#28c840;}
                .ledger-title { font-size: 0.7rem; font-weight: 600; letter-spacing: 0.06em; color: var(--muted); margin-left: 0.6rem; }

                .ledger-meta {
                padding: 1.5rem 2rem;
                display: flex; align-items: center; justify-content: space-between;
                border-bottom: 1px solid var(--border);
                flex-wrap: wrap; gap: 1rem;
                }
                .ledger-client { display: flex; align-items: center; gap: 0.9rem; }
                .ledger-avatar {
                width: 42px; height: 42px; border-radius: 50%;
                background: var(--teal);
                display: flex; align-items: center; justify-content: center;
                }
                .ledger-avatar span { font-size: 0.8rem; font-weight: 900; color: white; }
                .ledger-client-name { font-size: 0.95rem; font-weight: 800; color: var(--dark); }
                .ledger-client-id   { font-size: 0.68rem; font-weight: 600; color: var(--teal); letter-spacing: 0.06em; }
                .ledger-status-row  { display: flex; align-items: center; gap: 0.75rem; }

                .ledger-metrics {
                padding: 1.5rem 2rem;
                display: grid; grid-template-columns: repeat(4,1fr);
                gap: 1.1rem;
                border-bottom: 1px solid var(--border);
                }
                @media(max-width:600px){ .ledger-metrics{ grid-template-columns:repeat(2,1fr); } }

                .lm {
                background: var(--off);
                border: 1px solid var(--border);
                border-radius: 0.875rem;
                padding: 1.2rem;
                position: relative; overflow: hidden;
                }
                .lm::before {
                content:''; position:absolute; bottom:0; left:0;
                height:3px; width:100%;
                }
                .lm.teal   .lm-val { color: var(--teal); }
                .lm.violet .lm-val { color: var(--violet); }
                .lm.amber  .lm-val { color: var(--amber); }
                .lm.green  .lm-val { color: var(--green); }
                .lm.teal::before   { background: var(--teal); }
                .lm.violet::before { background: var(--violet); }
                .lm.amber::before  { background: var(--amber); }
                .lm.green::before  { background: var(--green); }
                .lm-label { font-size: 0.62rem; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase; color: var(--muted); margin-bottom: 0.55rem; }
                .lm-val   { font-size: 1.5rem; font-weight: 900; line-height: 1; letter-spacing: -0.02em; transition: color 0.4s; }
                .lm-prefix { font-size: 0.8rem; font-weight: 600; color: var(--muted); vertical-align: super; margin-right: 2px; }
                .lm-tag   { font-size: 0.62rem; font-weight: 700; margin-top: 0.4rem; letter-spacing: 0.06em; text-transform: uppercase; }

                .ledger-table { padding: 1.5rem 2rem; }
                .table-title  { font-size: 0.65rem; font-weight: 700; letter-spacing: 0.15em; text-transform: uppercase; color: var(--muted); margin-bottom: 1rem; }

                table.tx-table { width: 100%; border-collapse: collapse; }
                table.tx-table th {
                font-size: 0.65rem; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase;
                color: var(--muted); padding: 0 0.75rem 0.75rem; text-align: left; border-bottom: 1px solid var(--border);
                }
                table.tx-table td {
                font-size: 0.82rem; font-weight: 500; color: var(--text);
                padding: 0.75rem; border-bottom: 1px solid var(--off);
                vertical-align: middle;
                }
                table.tx-table tr:last-child td { border-bottom: none; }
                table.tx-table tr { transition: background 0.2s; }
                table.tx-table tr:hover td { background: var(--teal-light); }

                .tx-type {
                display: inline-flex; align-items: center; gap: 0.4rem;
                padding: 0.25rem 0.65rem;
                border-radius: 999px;
                font-size: 0.68rem; font-weight: 800;
                letter-spacing: 0.04em;
                }
                .tx-type.dn  { background: var(--violet-light); color: var(--violet); border: 1px solid #ddd6fe; }
                .tx-type.cn  { background: var(--teal-light);   color: var(--teal);   border: 1px solid var(--teal-border); }
                .tx-type.ref { background: var(--amber-light);  color: var(--amber);  border: 1px solid var(--amber-border); }
                .tx-type.inv { background: var(--blue-light);   color: var(--blue);   border: 1px solid #bfdbfe; }

                .tx-amount { font-weight: 800; color: var(--dark); }
                .tx-amount.positive { color: var(--green); }
                .tx-amount.negative { color: var(--red); }

                .tx-status {
                display: inline-block;
                padding: 0.2rem 0.55rem;
                border-radius: 999px;
                font-size: 0.62rem; font-weight: 800;
                letter-spacing: 0.06em; text-transform: uppercase;
                }
                .tx-status.settled  { background: var(--green-light);  color: var(--green);  border:1px solid #a7f3d0; }
                .tx-status.pending  { background: var(--amber-light);  color: var(--amber);  border:1px solid var(--amber-border); }
                .tx-status.open     { background: var(--teal-light);   color: var(--teal);   border:1px solid var(--teal-border); }
                .tx-status.cancelled{ background: #f3f4f6;             color: var(--muted);  border:1px solid var(--border); }

                .ledger-chart { padding: 0 2rem 1.75rem; }
                .chart-track {
                background: var(--off);
                border: 1px solid var(--border);
                border-radius: 0.75rem;
                padding: 1.25rem;
                }
                .chart-label { font-size: 0.65rem; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; color: var(--muted); margin-bottom: 0.9rem; }
                svg.sparkline { width:100%; height:60px; overflow:visible; }
                .spark-path { fill:none; stroke:var(--teal); strokeWidth:2; vector-effect:non-scaling-stroke; strokeLinejoin:round; strokeLinecap:round; }

                /* ---- BENEFITS ---- */
                section.benefits { padding: 6rem 0; background: var(--white); }

                .benefits-grid { display: grid; grid-template-columns: repeat(2,1fr); gap: 1.25rem; }
                @media(max-width:600px){ .benefits-grid{ grid-template-columns:1fr; } }

                .ben-card {
                background: var(--off); border: 1px solid var(--border);
                border-radius: 1.1rem; padding: 1.75rem;
                display: flex; gap: 1.25rem; align-items: flex-start;
                transition: transform 0.3s, box-shadow 0.3s, border-color 0.3s;
                }
                .ben-card:hover { transform: translateX(6px); border-color: var(--teal); box-shadow: 0 8px 28px rgba(15,118,110,0.09); }
                .ben-icon {
                width: 48px; height: 48px; border-radius: 0.875rem;
                background: var(--teal-light); border: 1px solid var(--teal-border);
                display: flex; align-items: center; justify-content: center; flex-shrink: 0;
                }
                .ben-card:nth-child(2) .ben-icon { background: var(--violet-light); border-color: #ddd6fe; }
                .ben-card:nth-child(3) .ben-icon { background: var(--amber-light);  border-color: var(--amber-border); }
                .ben-card:nth-child(4) .ben-icon { background: var(--blue-light);   border-color: #bfdbfe; }
                .ben-card h3 { font-family: 'Montserrat', sans-serif; font-size: 0.95rem; font-weight: 700; color: var(--dark); margin-bottom: 0.35rem; }
                .ben-card p  { font-size: 0.88rem; line-height: 1.65; font-weight: 400; }

                /* ---- FINAL ---- */
                section.final-section {
                padding: 8rem 0 9rem; text-align: center;
                background: var(--white); position: relative; overflow: hidden;
                }
                section.final-section::before {
                content:''; position:absolute; top:50%; left:50%;
                transform:translate(-50%,-50%);
                width:700px; height:700px; border-radius:50%;
                background: radial-gradient(circle, rgba(15,118,110,0.05) 0%, transparent 70%);
                pointer-events:none;
                }
                .final-title {
                font-family: 'Montserrat', system-ui;
                font-size: clamp(2.6rem, 5.5vw, 4.8rem);
                font-weight: 900; line-height: 1.05; letter-spacing: -0.03em;
                color: var(--dark); margin-bottom: 2rem;
                }
                .final-title span {
                font-family: 'Montserrat', system-ui;
                background: linear-gradient(120deg, var(--teal) 0%, var(--teal-mid) 100%);
                -webkit-background-clip: text; -webkit-text-fill-color: transparent;
                background-clip: text; background-size: 200%;
                animation: gradShift 4s ease-in-out infinite alternate;
                }
                @keyframes gradShift { from{background-position:0% 50%} to{background-position:100% 50%} }
                .final-body { font-family: 'Montserrat', system-ui; font-size: 1.05rem; line-height: 1.85; max-width: 600px; margin: 0 auto 3rem; color: var(--text); font-weight: 400; }
                .final-cta { font-family: 'Montserrat', system-ui; display: flex; justify-content: center; gap: 1rem; flex-wrap: wrap; }
                .btn-primary {
                padding: 0.9rem 2rem;
                background: var(--teal); color: white;
                font-family: 'Montserrat', sans-serif; font-size: 0.88rem; font-weight: 800;
                border: none; border-radius: 0.625rem; cursor: pointer; transition: all 0.2s; letter-spacing: 0.02em;
                }
                .btn-primary:hover { background: #0d5c55; transform: translateY(-2px); box-shadow: 0 8px 24px rgba(15,118,110,0.25); }
                .btn-secondary {
                padding: 0.9rem 2rem;
                background: transparent; color: var(--dark);
                font-family: 'Montserrat', sans-serif; font-size: 0.88rem; font-weight: 700;
                border: 1.5px solid var(--border); border-radius: 0.625rem; cursor: pointer; transition: all 0.2s;
                }
                .btn-secondary:hover { border-color: var(--teal); color: var(--teal); }

                /* ---- SCROLL REVEAL ---- */
                .reveal { opacity:0; transform:translateY(28px); transition:opacity 0.65s ease,transform 0.65s ease; }
                .reveal.visible { opacity:1; transform:translateY(0); }
                
                `}
            
            </style>


            <nav>
            <div className="nav-brand">
                <div className="nav-icon">
                <svg className="w-9 h-9 text-orange-800" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z"/>
                </svg>
                </div>
                <div className="nav-titles">
                <h1 className='text-left'>Urusentra</h1>
                <p>Customer Management</p>
                </div>
            </div>
            <div className="nav-links">
                <span className="nav-dot"></span>
                <a href="/">Home</a>
                <a href="/pricing">Try it out</a>
            </div>
            </nav>

            <div className="hero">
                <div className="wrapper hero-inner">
                    <div>
                        <p className="hero-eyebrow">360° Client Intelligence</p>
                        <h1 className='text-left'>Client<br/><em>Management</em></h1>
                        <p className="hero-body text-left">
                            The <strong>Client Management</strong> module is the complete financial relationship engine for your clients. It handles the full transaction lifecycle — from <strong>client profiles</strong> and <strong>debit notes</strong> to <strong>credit notes</strong> and <strong>refunds</strong> — with every figure calculated automatically and tracked in real‑time.
                        </p>
                        <div className="hero-stats">
                            <div>
                            <div className="stat-num">5<span> States</span></div>
                            <div className="stat-label">Client Status Types</div>
                            </div>
                            <div>
                            <div className="stat-num">3<span> Doc</span></div>
                            <div className="stat-label">Financial Instruments</div>
                            </div>
                            <div>
                            <div className="stat-num">100<span>%</span></div>
                            <div className="stat-label">Auto-Calculated</div>
                            </div>
                        </div>
                    </div>


                    <div className="hero-diagram">
                      <svg className="diagram-svg" viewBox="0 0 360 340">
                        <defs>
                          <filter id="sh-t"><feDropShadow dx="0" dy="4" stdDeviation="7" flood-color="#0f766e" flood-opacity="0.18"/></filter>
                          <filter id="sh-v"><feDropShadow dx="0" dy="4" stdDeviation="7" flood-color="#7c3aed" flood-opacity="0.16"/></filter>
                          <filter id="sh-a"><feDropShadow dx="0" dy="4" stdDeviation="7" flood-color="#d97706" flood-opacity="0.16"/></filter>
                          <filter id="sh-g"><feDropShadow dx="0" dy="4" stdDeviation="7" flood-color="#00b87a" flood-opacity="0.14"/></filter>
                          <marker id="arr" markerWidth="7" markerHeight="7" refX="5" refY="3.5" orient="auto">
                            <path d="M0,0 L7,3.5 L0,7 Z" fill="#99f6e4"/>
                          </marker>
                        </defs>

                        <line x1="180" y1="78"  x2="180" y2="148" stroke="#99f6e4" strokeWidth="1.5" className="edge-flow"    marker-end="url(#arr)"/>
                        <line x1="157" y1="192" x2="68"  y2="258" stroke="#99f6e4" strokeWidth="1.5" className="edge-flow d1" marker-end="url(#arr)"/>
                        <line x1="180" y1="192" x2="180" y2="258" stroke="#99f6e4" strokeWidth="1.5" className="edge-flow d2" marker-end="url(#arr)"/>
                        <line x1="203" y1="192" x2="292" y2="258" stroke="#99f6e4" strokeWidth="1.5" className="edge-flow d3" marker-end="url(#arr)"/>

                        <g className="node-a" filter="url(#sh-t)">
                          <rect x="118" y="24" width="124" height="54" rx="12" fill="#f0fdfa" stroke="#0f766e" strokeWidth="1.8"/>
                          <text x="180" y="47"  text-anchor="middle" fill="#0f766e"  font-family="Montserrat,sans-serif" font-size="9" font-weight="800" letter-spacing="1.5">CLIENT PROFILE</text>
                          <text x="180" y="62"  text-anchor="middle" fill="#8892a4" font-family="Montserrat,sans-serif" font-size="7" font-weight="500">CV-2025-XXXX</text>
                        </g>

                        <g className="node-b" filter="url(#sh-t)">
                          <rect x="118" y="148" width="124" height="54" rx="12" fill="#f0fdfa" stroke="#0f766e" strokeWidth="2"/>
                          <text x="180" y="170" text-anchor="middle" fill="#0f766e"  font-family="Montserrat,sans-serif" font-size="9" font-weight="800" letter-spacing="1.5">FINANCE HUB</text>
                          <text x="180" y="185" text-anchor="middle" fill="#8892a4" font-family="Montserrat,sans-serif" font-size="7" font-weight="500">Auto-Calculated Totals</text>
                        </g>

                        <g className="node-c" filter="url(#sh-v)">
                          <rect x="18"  y="258" width="100" height="50" rx="10" fill="#f5f3ff" stroke="#7c3aed" strokeWidth="1.5"/>
                          <text x="68"  y="278" text-anchor="middle" fill="#7c3aed"  font-family="Montserrat,sans-serif" font-size="8" font-weight="800" letter-spacing="1">DEBIT NOTE</text>
                          <text x="68"  y="293" text-anchor="middle" fill="#8892a4" font-family="Montserrat,sans-serif" font-size="7" font-weight="500">DN-2025-XXXX</text>
                        </g>

                        <g className="node-d" filter="url(#sh-t)">
                          <rect x="130" y="258" width="100" height="50" rx="10" fill="#f0fdfa" stroke="#0f766e" strokeWidth="1.5"/>
                          <text x="180" y="278" text-anchor="middle" fill="#0f766e"  font-family="Montserrat,sans-serif" font-size="8" font-weight="800" letter-spacing="1">CREDIT NOTE</text>
                          <text x="180" y="293" text-anchor="middle" fill="#8892a4" font-family="Montserrat,sans-serif" font-size="7" font-weight="500">CN-2025-XXXX</text>
                        </g>

                        <g className="node-e" filter="url(#sh-a)">
                          <rect x="242" y="258" width="100" height="50" rx="10" fill="#fffbeb" stroke="#d97706" strokeWidth="1.5"/>
                          <text x="292" y="278" text-anchor="middle" fill="#d97706"  font-family="Montserrat,sans-serif" font-size="8" font-weight="800" letter-spacing="1">REFUND</text>
                          <text x="292" y="293" text-anchor="middle" fill="#8892a4" font-family="Montserrat,sans-serif" font-size="7" font-weight="500">REF-2025-XXXX</text>
                        </g>
                      </svg>
                    </div>
                </div>
            </div>

            <hr className="divider"/>


            <section className="lifecycle">
              <div className="wrapper">
                <div className="reveal">
                  <div className="section-label">Client Lifecycle</div>
                  <h2 className="section-title text-left">Four Stages of a Client Relationship</h2>
                  <p className="section-body text-left">Every client moves through a defined lifecycle — from prospect to active to settled. The system tracks status, financials, and history at every stage.</p>
                </div>
                <div className="lifecycle-grid">
                  <div className="lc-card teal reveal">
                    <div className="lc-icon">
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#0f766e" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"/>
                      </svg>
                    </div>
                    <div className="lc-num">01</div>
                    <h3>Profile Creation</h3>
                    <p style={{ fontFamily: 'Montserrat, system-ui' }}>
                        Client registered with full identity, contact, banking, and tax information. 
                        Assigned a unique 
                        <code style={{ 
                            fontFamily: 'Montserrat',
                            fontSize: '0.7rem', 
                            background: 'var(--off)', 
                            padding: '1px 4px', 
                            borderRadius: '3px' 
                        }}>
                            CV-YYYY-XXXX
                        </code> 
                        reference.
                    </p>
                  </div>
                  <div className="lc-card violet reveal" style={{ transitionDelay:'0.1s' }}>
                    <div className="lc-icon">
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#7c3aed" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"/>
                      </svg>
                    </div>
                    <div className="lc-num">02</div>
                    <h3>Debit Notes Issued</h3>
                    <p style={{ fontFamily: 'Montserrat, system-ui' }}>
                      Charges raised against the client and linked to payments. Outstanding balances auto-calculated and updated on every save.
                    </p>
                  </div>
                  <div className="lc-card amber reveal" style={{ transitionDelay:'0.2s' }}>
                    <div className="lc-icon">
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#d97706" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 14.25l6-6m4.5-3.493V21.75l-3.75-1.5-3.75 1.5-3.75-1.5-3.75 1.5V4.757c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0c1.1.128 1.907 1.077 1.907 2.185zM9.75 9h.008v.008H9.75V9zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm4.125 4.5h.008v.008h-.008V13.5zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"/>
                      </svg>
                    </div>
                    <div className="lc-num">03</div>
                    <h3>Credit Notes Applied</h3>
                    <p style={{ fontFamily: 'Montserrat, system-ui' }}>
                      Overpayments or adjustments captured as credit notes, linked to the original payment, with live outstanding tracking.
                    </p>
                  </div>
                  <div className="lc-card red reveal" style={{ transitionDelay:'0.3s' }}>
                    <div className="lc-icon">
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#e8354a" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"/>
                      </svg>
                    </div>
                    <div className="lc-num">04</div>
                    <h3>Refunds Processed</h3>
                    <p style={{ fontFamily: 'Montserrat, system-ui' }}>
                      When credit notes carry a positive outstanding, a refund is issued. Expected, paid, and outstanding amounts all reconciled automatically.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <hr className="divider"/>



            <section className="profile">
              <div className="wrapper">
                <div className="reveal">
                  <div className="section-label">Client Profile</div>
                  <h2 className="section-title text-left" style={{ color: 'var(--teal)' }}>Complete Client Records</h2>
                  <p className="section-body text-left">Every client profile captures the full picture — personal identity, contact details, preferred currency, banking information, and tax registration — all encrypted and version-controlled.</p>
                </div>

                <div className="profile-layout reveal">
                  <div>
                    <div className="profile-card">
                      <div className="profile-card-header">
                        <div className="profile-avatar"><span>AL</span></div>
                        <div>
                          <div className="profile-name">Ahmad Lutfi Bin Razak</div>
                          <div className="profile-id">CV-2025-00142</div>
                        </div>
                        <span className="status-badge active">Active</span>
                      </div>
                      <div className="profile-body">
                        <div className="profile-row">
                          <span className="profile-row-label">Company</span>
                          <span className="profile-row-value">Binaan Maju Sdn Bhd.</span>
                        </div>
                        <div className="profile-row">
                          <span className="profile-row-label">Location</span>
                          <span className="profile-row-value">Petaling Jaya, Selangor</span>
                        </div>
                        <div className="profile-row">
                          <span className="profile-row-label">Email</span>
                          <span className="profile-row-value" style={{ color: 'var(--teal)' }}>a.lutfi@binaanmaju.com</span>
                        </div>
                        <div className="profile-row">
                          <span className="profile-row-label">Currency</span>
                          <span className="profile-row-value">MYR — Malaysian Ringgit</span>
                        </div>
                        <div className="profile-row">
                          <span className="profile-row-label">Tax ID</span>
                          <span className="profile-row-value" style={{ fontSize: '0.75rem' }}>BRN(New) · ••••••••••</span>
                        </div>
                        <div className="profile-row">
                          <span className="profile-row-label">Account Since</span>
                          <span className="profile-row-value">14 March 2022</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="section-label" style={{ marginBottom: '1rem' }}>Client Status Types</div>
                    <div className="status-grid">
                      <div className="status-item">
                        <span className="status-dot active"></span>
                        <div>
                          <div className="status-item-label">Active</div>
                          <div className="status-item-desc">Ongoing relationship</div>
                        </div>
                      </div>
                      <div className="status-item">
                        <span className="status-dot prospect"></span>
                        <div>
                          <div className="status-item-label">Prospect</div>
                          <div className="status-item-desc">In negotiation</div>
                        </div>
                      </div>
                      <div className="status-item">
                        <span className="status-dot pending"></span>
                        <div>
                          <div className="status-item-label">Pending</div>
                          <div className="status-item-desc">Awaiting verification</div>
                        </div>
                      </div>
                      <div className="status-item">
                        <span className="status-dot inactive"></span>
                        <div>
                          <div className="status-item-label">Inactive</div>
                          <div className="status-item-desc">No current activity</div>
                        </div>
                      </div>
                      <div className="status-item">
                        <span className="status-dot suspended"></span>
                        <div>
                          <div className="status-item-label">Suspended</div>
                          <div className="status-item-desc">Account on hold</div>
                        </div>
                      </div>
                      <div className="status-item" style={{ background: 'var(--teal-light)', borderColor: 'var(--teal-border)' }}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0f766e" strokeWidth="2" style={{ flexShrink: '0' }}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"/>
                        </svg>
                        <div>
                          <div className="status-item-label" style={{ color: 'var(--teal)' }}>Encrypted Fields</div>
                          <div className="status-item-desc">All sensitive data</div>
                        </div>
                      </div>
                    </div>

                    <div style={{ marginTop: '1.5rem', background: 'var(--white)', border: '1px solid var(--border)', borderRadius: '1rem', padding: '1.5rem' }}>
                      <div className="section-label" style={{ marginBottom: '0.85rem' }}>Supported ID &amp; Bank Types</div>

                      <div style={{ display:'flex', flexWrap:'wrap', gap: '0.5rem' }}>

                        <span style={{ padding: '0.25rem 0.75rem', background: 'var(--off)', border: '1px solid var(--border)', borderRadius: '999px', fontSize: '0.7rem', fontWeight: '700', color: 'var(--text)' }}>
                            BRN (New)
                        </span>

                        <span style={{ padding: '0.25rem 0.75rem', background: 'var(--off)', border: '1px solid var(--border)', borderRadius: '999px', fontSize: '0.7rem', fontWeight: '700', color: 'var(--text)' }}>NRIC</span>
                        <span style={{ padding: '0.25rem 0.75rem', background: 'var(--off)', border: '1px solid var(--border)', borderRadius: '999px', fontSize: '0.7rem', fontWeight: '700', color: 'var(--text)' }}>Passport</span>
                        <span style={{ padding: '0.25rem 0.75rem', background: 'var(--off)', border: '1px solid var(--border)', borderRadius: '999px', fontSize: '0.7rem', fontWeight: '700', color: 'var(--text)' }}>Army ID</span>
                        <span style={{ padding: '0.25rem 0.75rem', background: 'var(--teal-light)', border: '1px solid var(--teal-border)', borderRadius: '999px', fontSize: '0.7rem', fontWeight: '700', color: 'var(--teal)' }}>Bank Transfer</span>
                        <span style={{ padding: '0.25rem 0.75rem', background: 'var(--teal-light)', border: '1px solid var(--teal-border)', borderRadius: '999px', fontSize: '0.7rem', fontWeight: '700', color: 'var(--teal)' }}>JoinPAY</span>
                        <span style={{ padding: '0.25rem 0.75rem', background: 'var(--teal-light)', border: '1px solid var(--teal-border)', borderRadius: '999px', fontSize: '0.7rem', fontWeight: '700', color: 'var(--teal)' }}>DualPay</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <hr className="divider"/>


            <section className="workflow">
              <div className="wrapper">
                <div className="reveal">
                  <div className="section-label">Financial Instruments</div>
                  <h2 className="section-title text-left">Three Documents. One Workflow.</h2>
                  <p className="section-body text-left">Debit notes, credit notes, and refunds are interconnected. Each document links to a payment, calculates its own totals, and updates the outstanding balance in real‑time.</p>
                </div>
                <div className="workflow-flow reveal">

                  {/* <!-- DEBIT NOTE --> */}
                  <div className="wf-card dn">
                    <div className="wf-num">DN</div>
                    <span className="wf-prefix">DN-2025-XXXX</span>
                    <h3>Debit Note</h3>
                    <p style={{ fontFamily: 'Montserrat, system-ui' }}>Raised to record additional charges against a client. Linked to a Post Customer Payment and calculates an outstanding balance automatically.</p>
                    <div className="wf-fields">
                      <div className="wf-field-row"><span>Gross Total</span><span>Sum of all lines</span></div>
                      <div className="wf-field-row"><span>Tax</span><span>Inclusive or exclusive</span></div>
                      <div className="wf-field-row"><span>Amount Owed</span><span>From linked payment</span></div>
                      <div className="wf-field-row"><span>Outstanding</span><span>Owed − Net Total</span></div>
                    </div>
                  </div>

                  {/* <!-- CREDIT NOTE --> */}
                  <div className="wf-card cn">
                    <div className="wf-num">CN</div>
                    <span className="wf-prefix">CN-2025-XXXX</span>
                    <h3>Credit Note</h3>
                    <p style={{ fontFamily: 'Montserrat, system-ui' }}>Issued when a client has overpaid or is owed an adjustment. Pulls paid amount from the linked payment and calculates the credit outstanding.</p>
                    <div className="wf-fields">
                      <div className="wf-field-row"><span>Gross Total</span><span>Sum of note lines</span></div>
                      <div className="wf-field-row"><span>Tax</span><span>Inclusive or exclusive</span></div>
                      <div className="wf-field-row"><span>Paid Amount</span><span>From linked payment</span></div>
                      <div className="wf-field-row"><span>Outstanding</span><span>Paid − Aggregate</span></div>
                    </div>
                  </div>

                  {/* <!-- REFUND --> */}
                  <div className="wf-card ref">
                    <div className="wf-num">RF</div>
                    <span className="wf-prefix">REF-2025-XXXX</span>
                    <h3>Refund</h3>
                    <p style={{ fontFamily: 'Montserrat, system-ui' }}>Triggered when a credit note carries a positive outstanding. Tracks expected refund, amounts returned (Cash / Cheque / Bank Transfer), and net outstanding.</p>
                    <div className="wf-fields">
                      <div className="wf-field-row"><span>Expected Refund</span><span>Credit note outstanding</span></div>
                      <div className="wf-field-row"><span>Net Refunded</span><span>Sum of refund lines</span></div>
                      <div className="wf-field-row"><span>Payment Types</span><span>Cash · Cheque · Transfer</span></div>
                      <div className="wf-field-row"><span>Outstanding</span><span>Expected − Refunded</span></div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <hr className="divider"/>



            <section className="ledger">
              <div className="wrapper">
                <div className="reveal">
                  <div className="section-label">Live Client Ledger</div>
                  <h2 className="section-title text-left" style={{ color: 'var(--teal)' }}>Real‑Time Transaction View</h2>
                  <p className="section-body text-left">Every debit note, credit note, and refund appears instantly in the client ledger — with live balance calculations, cancellation support, and full version history.</p>
                </div>

                <div className="ledger-panel reveal">
                  <div className="ledger-header">
                    <span className="dot r"></span><span className="dot y"></span><span className="dot g"></span>
                    <span className="ledger-title">CLIENT_LEDGER — CV-2025-00142 — Live</span>
                  </div>

                  <div className="ledger-meta">
                    <div className="ledger-client">
                      <div className="ledger-avatar"><span>AL</span></div>
                      <div>
                        <div className="ledger-client-name">Ahmad Lutfi Bin Razak</div>
                        <div className="ledger-client-id">CV-2025-00142 · Binaan Maju Sdn Bhd.</div>
                      </div>
                    </div>
                    <div className="ledger-status-row">
                        <span className="tx-status settled">Active</span>
                        <span style={{ fontSize: '0.72rem', color: 'var(--muted)', fontWeight: '600' }}>
                            Since 14 Mar 2022
                        </span>
                    </div>
                  </div>

                  <div className="ledger-metrics">
                    <div className="lm teal">
                      <div className="lm-label">Total Invoiced</div>
                      <div className="lm-val"><span className="lm-prefix">RM</span><span id="v-inv">24,850</span></div>
                      <div className="lm-tag" style={{ color: 'var(--teal)' }}>● BILLED</div>
                    </div>
                    <div className="lm violet">
                      <div className="lm-label">Debit Notes</div>
                      <div className="lm-val"><span className="lm-prefix">RM</span><span id="v-dn">3,200</span></div>
                      <div className="lm-tag" style={{ color: 'var(--violet)' }}>▲ CHARGES</div>
                    </div>
                    <div className="lm amber">
                      <div className="lm-label">Credit Notes</div>
                      <div className="lm-val"><span className="lm-prefix">RM</span><span id="v-cn">1,800</span></div>
                      <div className="lm-tag" style={{ color: 'var(--amber)' }}>▼ CREDITS</div>
                    </div>
                    <div className="lm green">
                      <div className="lm-label">Outstanding</div>
                      <div className="lm-val"><span className="lm-prefix">RM</span><span id="v-os">1,400</span></div>
                      <div className="lm-tag" id="os-tag" style={{ color: 'var(--green)' }}>● BALANCE</div>
                    </div>
                  </div>

                  <div className="ledger-table">
                    <div className="table-title">Recent Transactions</div>
                    <table className="tx-table">
                      <thead>
                        <tr>
                          <th>Reference</th>
                          <th>Type</th>
                          <th>Date</th>
                          <th>Amount</th>
                          <th>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td><strong>DN-2025-0041</strong></td>
                          <td><span className="tx-type dn">Debit Note</span></td>
                          <td>02 Mar 2025</td>
                          <td><span className="tx-amount negative">− RM 1,200.00</span></td>
                          <td><span className="tx-status open">Open</span></td>
                        </tr>
                        <tr>
                          <td><strong>CN-2025-0018</strong></td>
                          <td><span className="tx-type cn">Credit Note</span></td>
                          <td>28 Feb 2025</td>
                          <td><span className="tx-amount positive">+ RM 1,800.00</span></td>
                          <td><span className="tx-status settled">Settled</span></td>
                        </tr>
                        <tr>
                          <td><strong>REF-2025-0007</strong></td>
                          <td><span className="tx-type ref">Refund</span></td>
                          <td>25 Feb 2025</td>
                          <td><span className="tx-amount positive">+ RM 600.00</span></td>
                          <td><span className="tx-status settled">Settled</span></td>
                        </tr>
                        <tr>
                          <td><strong>DN-2025-0039</strong></td>
                          <td><span className="tx-type dn">Debit Note</span></td>
                          <td>20 Feb 2025</td>
                          <td><span className="tx-amount negative">− RM 2,000.00</span></td>
                          <td><span className="tx-status settled">Settled</span></td>
                        </tr>
                        <tr>
                          <td><strong>CN-2025-0012</strong></td>
                          <td><span className="tx-type cn">Credit Note</span></td>
                          <td>14 Feb 2025</td>
                          <td><span className="tx-amount positive">+ RM 450.00</span></td>
                          <td><span className="tx-status pending">Pending</span></td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </section>

            <hr className="divider"/>


            <section className="benefits">
              <div className="wrapper reveal">
                <div className="section-label">Why Client Management</div>
                <h2 className="section-title text-left" style={{ color: 'var(--teal)' }}>Industry Benefits</h2>
                <div className="benefits-grid">
                  <div className="ben-card reveal">
                    <div className="ben-icon">
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#0f766e" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6"/>
                      </svg>
                    </div>
                    <div>
                      <h3>Auto-Calculated Financials</h3>
                      <p style={{ fontFamily: 'Montserrat, system-ui' }}>Gross totals, tax, outstanding balances, and aggregates are all computed automatically — no manual arithmetic, no errors.</p>
                    </div>
                  </div>
                  <div className="ben-card reveal" style={{ transitionDelay: '0.1s' }}>
                    <div className="ben-icon">
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#7c3aed" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"/>
                      </svg>
                    </div>
                    <div>
                      <h3>Encrypted &amp; Secure by Design</h3>
                      <p style={{ fontFamily: 'Montserrat, system-ui' }}>All sensitive fields — bank accounts, tax numbers, ID numbers, and contact details — are encrypted at the field level.</p>
                    </div>
                  </div>
                  <div className="ben-card reveal" style={{ transitionDelay: '0.2s' }}>
                    <div className="ben-icon">
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#d97706" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"/>
                      </svg>
                    </div>
                    <div>
                      <h3>Real‑Time Outstanding Tracking</h3>
                      <p style={{ fontFamily: 'Montserrat, system-ui' }}>Every debit note, credit note, and refund line updates the client's outstanding balance the moment a record is saved.</p>
                    </div>
                  </div>
                  <div className="ben-card reveal" style={{ transitionDelay: '0.3s' }}>
                    <div className="ben-icon">
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#2355f5" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z"/>
                      </svg>
                    </div>
                    <div>
                      <h3>Full Version History</h3>
                      <p style={{ fontFamily: 'Montserrat, system-ui' }}>Every save increments the version counter — a complete, immutable audit trail across all documents for compliance and dispute resolution.</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>


            <section className="final-section reveal">
              <div className="wrapper">
                <h2 className="final-title">Every Client.<br/><span>Fully in Control.</span></h2>
                <p className="final-body">
                  Client Management transforms scattered financial records into a single, intelligent system. Know exactly what every client owes, what they're owed, and where every ringgit stands — at any point in time.
                </p>
                <div className="final-cta">
                  <button className="btn-primary"><a href='/pricing'>View Customer Profiles</a></button>
                  <button className="btn-secondary"><a href='/pricing'>Explore ERP</a></button>
                </div>
              </div>
            </section>

        </div>
    );
};
export default ClientFeature;
