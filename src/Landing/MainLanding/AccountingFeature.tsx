import React, { useEffect } from "react";






function AccountingFeature() {


    useEffect(() => {
        // ---- SPARKLINE ----
        const history = Array.from({ length: 20 }, (_, i) => 8000 + Math.sin(i * 0.7) * 6000 + Math.random() * 3000);
        
        function renderSpark() {
            const max = Math.max(...history) * 1.12, W = 400, H = 60;
            const pts = history.map((v, i) => [(i / (history.length - 1)) * W, H - (v / max) * H]);
            const d = pts.map((p, i) => (i === 0 ? `M${p[0]},${p[1]}` : `L${p[0]},${p[1]}`)).join(' ');
            const df = d + ` L${W},${H} L0,${H} Z`;
            
            const pathEl = document.getElementById('spark-path');
            const fillEl = document.getElementById('spark-fill');
            
            if (pathEl) pathEl.setAttribute('d', d);
            if (fillEl) fillEl.setAttribute('d', df);
        }

        const sparkInterval = setInterval(() => { 
            history.shift(); 
            history.push(5000 + Math.random() * 25000); 
            renderSpark(); 
        }, 1100);
        
        renderSpark();

        // ---- SCROLL REVEAL ----
        const obs = new IntersectionObserver(entries => {
            entries.forEach(e => { 
                if (e.isIntersecting) e.target.classList.add('visible'); 
            });
        }, { threshold: 0.1 });

        document.querySelectorAll('.reveal').forEach(el => obs.observe(el));

        // Cleanup on unmount
        return () => {
            clearInterval(sparkInterval);
            obs.disconnect();
        };
    }, []);




    return (
        <div className="min-w-full">
                <title>Accounting Feature | Urusentra · Modern ERP solution for the building industry</title>
                <meta name="accounting" content="Learn more about Urusentra's account feature – modern building industry ERP" />

            <style>
                {`

                @import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700;800;900&display=swap");

                :root {
                --white:  #ffffff;
                --off:    #f7f8fa;
                --border: #dde1ea;
                --muted:  #8892a4;
                --text:   #3d4658;
                --dark:   #1a2035;

                --indigo:        #4338ca;
                --indigo-mid:    #6366f1;
                --indigo-light:  #eef2ff;
                --indigo-border: #c7d2fe;

                --slate:         #334155;
                --slate-light:   #f1f5f9;

                --green:         #00b87a;
                --green-light:   #e6f9f2;
                --green-border:  #a7f3d0;

                --red:           #e8354a;
                --red-light:     #fff0f2;
                --red-border:    #fecaca;

                --amber:         #d97706;
                --amber-light:   #fffbeb;
                --amber-border:  #fde68a;

                --violet:        #7c3aed;
                --violet-light:  #f5f3ff;
                --violet-border: #ddd6fe;

                --sky:           #0284c7;
                --sky-light:     #f0f9ff;
                --sky-border:    #bae6fd;

                --teal:          #0f766e;
                --teal-light:    #f0fdfa;
                --teal-border:   #99f6e4;
                }

                *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
                html { scroll-behavior: smooth; }

                body {
                background: var(--off);
                color: var(--text);
                font-family: 'Montserrat', system-ui;
                overflow-x: hidden;
                }

                .wrapper { max-width: 1080px; margin: 0 auto; padding: 0 2.5rem; }

                /* ---- NAV ---- */
                nav {
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
                border-radius: 8px; display: flex; align-items: center; justify-content: center;
                }
                .nav-titles h1 { font-family: 'Montserrat', system-ui; font-size: 1.05rem; font-weight: 800; letter-spacing: -0.01em; color: var(--dark); line-height: 1.1; }
                .nav-titles p  { font-family: 'Montserrat', system-ui; font-size: 0.58rem; font-weight: 600; letter-spacing: 0.2em; text-transform: uppercase; color: var(--muted); }
                .nav-links { display: flex; align-items: center; gap: 1.75rem; }
                .nav-links a { font-size: 0.8rem; font-weight: 600; color: #4b5563; text-decoration: none; transition: color 0.2s; }
                .nav-links a:hover, .nav-links a.active { color: var(--indigo); }
                .nav-dot { width: 8px; height: 8px; border-radius: 50%; background: var(--green); animation: blink 1.8s ease-in-out infinite; }
                @keyframes blink {
                0%,100%{ opacity:1; box-shadow:0 0 7px var(--green); }
                50%    { opacity:0.2; box-shadow:none; }
                }

                /* ---- BREADCRUMB ---- */
                .breadcrumb {
                background: var(--white); border-bottom: 1px solid var(--border);
                padding: 0.75rem 2.5rem;
                display: flex; align-items: center; gap: 0.5rem; font-size: 0.78rem;
                }
                .breadcrumb a { color: var(--muted); text-decoration: none; font-weight: 500; transition: color 0.2s; }
                .breadcrumb a:hover { color: var(--indigo); }
                .breadcrumb span { color: var(--dark); font-weight: 700; }

                /* ---- HERO ---- */
                .hero {
                font-family: 'Montserrat', system-ui;
                background: var(--white); border-bottom: 1px solid var(--border);
                padding: 5.5rem 0 5rem; position: relative; overflow: hidden;
                }
                .hero::before {
                content:''; position:absolute; inset:0;
                background: radial-gradient(ellipse 860px 420px at 68% 50%, rgba(67,56,202,0.055) 0%, transparent 70%);
                pointer-events:none;
                }
                .hero-inner { display: grid; grid-template-columns: 1fr 1fr; gap: 5rem; align-items: center; }
                @media(max-width:768px){ .hero-inner{ grid-template-columns:1fr; gap:3rem; } }

                .hero-eyebrow {
                font-size: 0.67rem; font-weight: 700; letter-spacing: 0.24em; text-transform: uppercase;
                color: var(--indigo); margin-bottom: 1.1rem;
                display: flex; align-items: center; gap: 0.6rem;
                opacity: 0; animation: fadeUp 0.65s 0.2s forwards;
                }
                .hero-eyebrow::before { content:''; display:block; width:1.8rem; height:2px; background: var(--indigo); border-radius:2px; }
                .hero h1 {
                font-family: 'Montserrat', system-ui;
                font-size: clamp(2.5rem, 5vw, 4.2rem); font-weight: 900; line-height: 1.05;
                letter-spacing: -0.025em; color: var(--dark);
                opacity: 0; animation: fadeUp 0.65s 0.32s forwards;
                }
                .hero h1 em { font-family: 'Montserrat', system-ui; font-style: normal; color: var(--indigo); }
                .hero-body {
                font-family: 'Montserrat', system-ui;
                margin-top: 1.8rem; font-size: 1rem; font-weight: 400; line-height: 1.85; color: var(--text);
                opacity: 0; animation: fadeUp 0.65s 0.46s forwards;
                }
                .hero-body strong { font-family: 'Montserrat', system-ui; color: var(--dark); font-weight: 700; }
                .hero-stats {
                margin-top: 2.5rem; display: flex; gap: 2.5rem;
                opacity: 0; animation: fadeUp 0.65s 0.6s forwards;
                }
                .stat-num { font-size: 1.8rem; font-weight: 900; color: var(--dark); line-height: 1; letter-spacing: -0.03em; }
                .stat-num span { color: var(--indigo); }
                .stat-label { font-size: 0.72rem; font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase; color: var(--muted); margin-top: 0.2rem; }

                @keyframes fadeUp {
                from { opacity:0; transform:translateY(22px); }
                to   { opacity:1; transform:translateY(0); }
                }

                /* ---- HERO DIAGRAM ---- */
                .hero-diagram { font-family: 'Montserrat', system-ui; display: flex; justify-content: center; align-items: center; opacity: 0; animation: fadeUp 0.9s 0.65s forwards; }
                .diagram-svg { font-family: 'Montserrat', system-ui; width: 100%; max-width: 400px; }

                .node-a { animation: floatNode 7s ease-in-out infinite; }
                .node-b { animation: floatNode 7s ease-in-out 0.5s infinite; }
                .node-c { animation: floatNode 7s ease-in-out 1s infinite; }
                .node-d { animation: floatNode 7s ease-in-out 1.5s infinite; }
                .node-e { animation: floatNode 7s ease-in-out 2s infinite; }
                .node-f { animation: floatNode 7s ease-in-out 2.5s infinite; }
                @keyframes floatNode { 0%,100%{ transform:translateY(0); } 50%{ transform:translateY(-8px); } }

                .edge-flow { stroke-dasharray: 6 4; animation: dashFlow 2s linear infinite; }
                .edge-flow.d1{ animation-delay:.25s; } .edge-flow.d2{ animation-delay:.5s; }
                .edge-flow.d3{ animation-delay:.75s; } .edge-flow.d4{ animation-delay:1s; }
                .edge-flow.d5{ animation-delay:1.25s; }
                @keyframes dashFlow { to { stroke-dashoffset: -30; } }

                /* ---- DIVIDER ---- */
                hr.divider { border:none; height:1px; background:linear-gradient(90deg,transparent,var(--border) 30%,var(--border) 70%,transparent); }

                /* ---- SECTION CHROME ---- */
                .section-label {
                font-size: 0.65rem; font-weight: 700; letter-spacing: 0.22em; text-transform: uppercase;
                color: var(--muted); margin-bottom: 0.9rem;
                display: flex; align-items: center; gap: 0.6rem;
                }
                .section-label::before { font-family: 'Montserrat', system-ui; content:''; display:block; width:1.5rem; height:2px; background:var(--border); border-radius:2px; }
                .section-title { font-family: 'Montserrat', system-ui; text-align: left; font-size: clamp(1.9rem,3.5vw,2.8rem); font-weight:800; line-height:1.1; letter-spacing:-0.02em; color:var(--dark); margin-bottom:1.2rem; }
                .section-body { font-family: 'Montserrat', system-ui; font-size:1rem; line-height:1.8; max-width:640px; color:var(--text); margin-bottom:2.5rem; font-weight:400; }
                .section-body strong { font-family: 'Montserrat', system-ui; color:var(--dark); font-weight:700; }

                /* ---- MODULES OVERVIEW ---- */
                section.modules { padding: 6rem 0; background: var(--white); }

                .modules-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 1.25rem; }
                @media(max-width:768px){ .modules-grid{ grid-template-columns:1fr 1fr; } }
                @media(max-width:480px){ .modules-grid{ grid-template-columns:1fr; } }

                .mod-card {
                background: var(--off); border: 1px solid var(--border);
                border-radius: 1.1rem; padding: 2rem 1.75rem;
                position: relative; overflow: hidden;
                transition: all 0.3s ease; cursor: default;
                }
                .mod-card::before { content:''; position:absolute; top:0; left:0; right:0; height:4px; border-radius:4px 4px 0 0; }
                .mod-card.indigo { --mc: var(--indigo); --ml: var(--indigo-light); --mb: var(--indigo-border); }
                .mod-card.violet { --mc: var(--violet); --ml: var(--violet-light); --mb: var(--violet-border); }
                .mod-card.sky    { --mc: var(--sky);    --ml: var(--sky-light);    --mb: var(--sky-border); }
                .mod-card.green  { --mc: var(--green);  --ml: var(--green-light);  --mb: var(--green-border); }
                .mod-card.amber  { --mc: var(--amber);  --ml: var(--amber-light);  --mb: var(--amber-border); }
                .mod-card.teal   { --mc: var(--teal);   --ml: var(--teal-light);   --mb: var(--teal-border); }
                .mod-card::before { background: var(--mc); }
                .mod-card:hover { border-color: var(--mc); transform: translateY(-6px); box-shadow: 0 16px 40px rgba(0,0,0,0.08); }
                .mod-icon {
                width: 48px; height: 48px; border-radius: 0.875rem;
                background: var(--ml); border: 1px solid var(--mb);
                display: flex; align-items: center; justify-content: center; margin-bottom: 1.1rem;
                }
                .mod-code {
                font-family: 'Montserrat', system-ui;
                display: inline-block; padding: 0.22rem 0.6rem;
                background: var(--ml); border: 1px solid var(--mb);
                border-radius: 6px; font-size: 0.62rem; font-weight: 800;
                letter-spacing: 0.1em; color: var(--mc); margin-bottom: 0.85rem;
                }
                .mod-card h3 { font-family: 'Montserrat', system-ui; font-size: 0.95rem; font-weight: 800; color: var(--dark); margin-bottom: 0.5rem; }
                .mod-card p  { font-family: 'Montserrat', system-ui; font-size: 0.83rem; line-height: 1.65; font-weight: 400; }

                /* ---- JOURNAL ---- */
                section.journal { font-family: 'Montserrat', system-ui; padding: 6rem 0; background: var(--off); }

                .journal-layout { font-family: 'Montserrat', system-ui; display: grid; grid-template-columns: 1fr 1fr; gap: 2.5rem; align-items: start; }
                @media(max-width:768px){ .journal-layout{ grid-template-columns:1fr; } }

                .journal-entry-demo {
                font-family: 'Montserrat', system-ui;
                background: var(--white); border: 1px solid var(--border);
                border-radius: 1.25rem; overflow: hidden;
                box-shadow: 0 4px 24px rgba(0,0,0,0.05);
                }
                .je-header {
                font-family: 'Montserrat', system-ui;
                background: var(--indigo-light); border-bottom: 1px solid var(--indigo-border);
                padding: 1.1rem 1.5rem;
                display: flex; align-items: center; justify-content: space-between;
                }
                .je-ref { font-family: 'Montserrat', system-ui; font-size: 0.8rem; font-weight: 800; color: var(--indigo); letter-spacing: 0.05em; }
                .je-date { font-family: 'Montserrat', system-ui; font-size: 0.72rem; font-weight: 600; color: var(--muted); }
                .je-desc { font-family: 'Montserrat', system-ui; padding: 1rem 1.5rem; font-size: 0.83rem; font-weight: 600; color: var(--text); border-bottom: 1px solid var(--border); }

                table.je-table { font-family: 'Montserrat', system-ui; width: 100%; border-collapse: collapse; }
                table.je-table th {
                font-family: 'Montserrat', system-ui;
                font-size: 0.62rem; font-weight: 800; letter-spacing: 0.14em; text-transform: uppercase;
                color: var(--muted); padding: 0.75rem 1.5rem; text-align: left;
                border-bottom: 1px solid var(--border); background: var(--off);
                }
                table.je-table th:last-child, table.je-table th:nth-last-child(2) { font-family: 'Montserrat', system-ui; text-align: right; }
                table.je-table td {
                font-family: 'Montserrat', system-ui;
                font-size: 0.82rem; font-weight: 500; color: var(--text);
                padding: 0.75rem 1.5rem; border-bottom: 1px solid var(--off);
                }
                table.je-table td:last-child, table.je-table td:nth-last-child(2) { font-family: 'Montserrat', system-ui; text-align: right; }
                table.je-table tr:hover td { font-family: 'Montserrat', system-ui; background: var(--indigo-light); }
                .je-debit  { font-family: 'Montserrat', system-ui; font-weight: 800; color: var(--red); }
                .je-credit { font-family: 'Montserrat', system-ui; font-weight: 800; color: var(--green); }
                .je-total-row td { font-family: 'Montserrat', system-ui; background: var(--indigo-light) !important; font-weight: 800; color: var(--dark); border-top: 2px solid var(--indigo-border); }
                .je-balance {
                font-family: 'Montserrat', system-ui;
                padding: 1rem 1.5rem;
                display: flex; align-items: center; justify-content: space-between;
                }
                .je-balance-item { display: flex; align-items: center; gap: 0.5rem; font-size: 0.78rem; font-weight: 700; }
                .balance-dot { width: 8px; height: 8px; border-radius: 50%; }

                .je-explainer { }
                .je-step {
                display: flex; gap: 1rem; margin-bottom: 1.5rem; align-items: flex-start;
                }
                .je-step-num {
                width: 32px; height: 32px; border-radius: 50%; flex-shrink: 0;
                background: var(--indigo-light); border: 1px solid var(--indigo-border);
                display: flex; align-items: center; justify-content: center;
                font-size: 0.72rem; font-weight: 900; color: var(--indigo);
                }
                .je-step h4 { font-family: 'Montserrat', system-ui; font-size: 0.88rem; font-weight: 700; color: var(--dark); margin-bottom: 0.3rem; }
                .je-step p  { font-family: 'Montserrat', system-ui; font-size: 0.82rem; line-height: 1.65; color: var(--text); }

                /* ---- INCOME & EXPENSES ---- */
                section.income { font-family: 'Montserrat', system-ui; padding: 6rem 0; background: var(--white); }

                .ie-grid { font-family: 'Montserrat', system-ui; display: grid; grid-template-columns: 1fr 1fr; gap: 2.5rem; align-items: start; }
                @media(max-width:768px){ .ie-grid{ grid-template-columns:1fr; } }

                .ie-panel {
                font-family: 'Montserrat', system-ui;
                background: var(--white); border: 1px solid var(--border);
                border-radius: 1.25rem; overflow: hidden;
                box-shadow: 0 4px 24px rgba(0,0,0,0.05);
                }
                .ie-panel-header {
                padding: 1rem 1.5rem; border-bottom: 1px solid var(--border);
                display: flex; align-items: center; justify-content: space-between;
                }
                .ie-panel-header h3 { font-family: 'Montserrat', system-ui; font-size: 0.88rem; font-weight: 800; color: var(--dark); }
                .ie-panel-header .ie-total { font-family: 'Montserrat', system-ui; font-size: 1.1rem; font-weight: 900; letter-spacing: -0.02em; }
                .ie-panel-header .ie-total.inc { font-family: 'Montserrat', system-ui; color: var(--green); }
                .ie-panel-header .ie-total.exp { font-family: 'Montserrat', system-ui; color: var(--red); }

                table.ie-table { font-family: 'Montserrat', system-ui; width: 100%; border-collapse: collapse; }
                table.ie-table th {
                font-family: 'Montserrat', system-ui;
                font-size: 0.6rem; font-weight: 800; letter-spacing: 0.14em; text-transform: uppercase;
                color: var(--muted); padding: 0.65rem 1.25rem; text-align: left;
                border-bottom: 1px solid var(--border); background: var(--off);
                }
                table.ie-table th:last-child { text-align: right; }
                table.ie-table td { font-size: 0.8rem; font-weight: 500; color: var(--text); padding: 0.7rem 1.25rem; border-bottom: 1px solid var(--off); }
                table.ie-table td:last-child { text-align: right; }
                table.ie-table tr:hover td { background: var(--off); }
                .ie-ref  { font-family: monospace; font-size: 0.72rem; font-weight: 700; color: var(--indigo); }
                .ie-amt-pos { font-weight: 800; color: var(--green); }
                .ie-amt-neg { font-weight: 800; color: var(--red); }
                .ie-tax-badge {
                display: inline-block; padding: 0.18rem 0.55rem;
                background: var(--amber-light); border: 1px solid var(--amber-border);
                border-radius: 999px; font-size: 0.6rem; font-weight: 800; color: var(--amber);
                }

                .ie-formula {
                background: var(--off); border: 1px solid var(--border);
                border-radius: 1rem; padding: 1.75rem;
                }
                .ie-formula-title { font-size: 0.65rem; font-weight: 700; letter-spacing: 0.18em; text-transform: uppercase; color: var(--muted); margin-bottom: 1.1rem; }
                .formula-row {
                display: flex; align-items: center; justify-content: space-between;
                padding: 0.6rem 0; border-bottom: 1px solid var(--border);
                font-size: 0.83rem;
                }
                .formula-row:last-child { border-bottom: none; }
                .formula-row .fl { font-weight: 600; color: var(--text); }
                .formula-row .fr { font-weight: 800; color: var(--dark); font-size: 0.78rem; font-family: monospace; background: var(--indigo-light); padding: 0.2rem 0.6rem; border-radius: 4px; color: var(--indigo); }

                /* ---- VOUCHERS ---- */
                section.vouchers { padding: 6rem 0; background: var(--off); }

                .voucher-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; }
                @media(max-width:700px){ .voucher-grid{ grid-template-columns:1fr; } }

                .v-card {
                background: var(--white); border: 1px solid var(--border);
                border-radius: 1.1rem; overflow: hidden;
                transition: all 0.3s;
                }
                .v-card:hover { border-color: var(--mc); transform: translateY(-5px); box-shadow: 0 16px 40px rgba(0,0,0,0.08); }
                .v-card.pv { --mc: var(--violet); --ml: var(--violet-light); --mb: var(--violet-border); }
                .v-card.rv { --mc: var(--sky);    --ml: var(--sky-light);    --mb: var(--sky-border); }

                .v-card-top {
                background: var(--ml); border-bottom: 1px solid var(--mb);
                padding: 1.5rem;
                display: flex; align-items: flex-start; justify-content: space-between;
                }
                .v-card-top-left { }
                .v-prefix {
                display: inline-block; padding: 0.25rem 0.65rem;
                background: var(--white); border: 1px solid var(--mb);
                border-radius: 6px; font-size: 0.62rem; font-weight: 800;
                letter-spacing: 0.1em; color: var(--mc); margin-bottom: 0.65rem;
                }
                .v-card-top h3 { font-family: 'Montserrat', system-ui; font-size: 1.1rem; font-weight: 900; color: var(--dark); margin-bottom: 0.3rem; }
                .v-card-top p  { font-family: 'Montserrat', system-ui; font-size: 0.82rem; font-weight: 400; color: var(--text); max-width: 240px; }
                .v-amount { font-family: 'Montserrat', system-ui; font-size: 2rem; font-weight: 900; color: var(--mc); letter-spacing: -0.03em; line-height: 1; }
                .v-amount-label { font-family: 'Montserrat', system-ui; font-size: 0.65rem; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: var(--muted); margin-top: 0.2rem; text-align: right; }

                .v-body { padding: 1.5rem; }
                .v-row {
                display: flex; align-items: center; justify-content: space-between;
                padding: 0.55rem 0; border-bottom: 1px solid var(--off); font-size: 0.8rem;
                }
                .v-row:last-child { border-bottom: none; }
                .v-row .vl { font-weight: 600; color: var(--muted); }
                .v-row .vr { font-weight: 700; color: var(--dark); }
                .v-row .vr.highlight { color: var(--mc); }

                .v-feature-tag {
                margin-top: 1.1rem; padding: 0.7rem 1rem;
                background: var(--ml); border: 1px solid var(--mb);
                border-radius: 0.5rem;
                display: flex; align-items: center; gap: 0.6rem;
                font-size: 0.78rem; font-weight: 600; color: var(--mc);
                }

                /* ---- CASH BOOK ---- */
                section.cashbook { padding: 6rem 0; background: var(--white); }

                .cb-panel {
                background: var(--white); border: 1px solid var(--border);
                border-radius: 1.25rem; overflow: hidden;
                box-shadow: 0 8px 40px rgba(0,0,0,0.06);
                }
                .cb-header {
                background: var(--white); border-bottom: 1px solid var(--border);
                padding: 0.9rem 1.5rem; display: flex; align-items: center; gap: 0.45rem;
                }
                .dot { width:11px; height:11px; border-radius:50%; }
                .dot.r{background:#ff5f57;} .dot.y{background:#febc2e;} .dot.g{background:#28c840;}
                .cb-title { font-size: 0.7rem; font-weight: 600; letter-spacing: 0.06em; color: var(--muted); margin-left: 0.6rem; }

                .cb-tabs {
                display: flex; border-bottom: 1px solid var(--border);
                padding: 0 1.5rem; gap: 0;
                }
                .cb-tab {
                padding: 0.85rem 1.25rem;
                font-size: 0.72rem; font-weight: 700; letter-spacing: 0.06em;
                color: var(--muted); cursor: pointer;
                border-bottom: 2px solid transparent;
                transition: all 0.2s; text-transform: uppercase;
                }
                .cb-tab.active { color: var(--indigo); border-bottom-color: var(--indigo); }

                .cb-metrics {
                padding: 1.5rem; display: grid; grid-template-columns: repeat(4,1fr); gap: 1rem;
                border-bottom: 1px solid var(--border);
                }
                @media(max-width:600px){ .cb-metrics{ grid-template-columns:repeat(2,1fr); } }

                .cbm {
                background: var(--off); border: 1px solid var(--border);
                border-radius: 0.875rem; padding: 1.1rem;
                position: relative; overflow: hidden;
                }
                .cbm::before { content:''; position:absolute; bottom:0; left:0; height:3px; width:100%; }
                .cbm.indigo::before { background: var(--indigo); }
                .cbm.green::before  { background: var(--green); }
                .cbm.red::before    { background: var(--red); }
                .cbm.amber::before  { background: var(--amber); }
                .cbm-label { font-size: 0.62rem; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase; color: var(--muted); margin-bottom: 0.5rem; }
                .cbm-val   { font-size: 1.5rem; font-weight: 900; line-height: 1; letter-spacing: -0.02em; }
                .cbm.indigo .cbm-val { color: var(--indigo); }
                .cbm.green  .cbm-val { color: var(--green); }
                .cbm.red    .cbm-val { color: var(--red); }
                .cbm.amber  .cbm-val { color: var(--amber); }
                .cbm-prefix { font-size: 0.8rem; font-weight: 600; color: var(--muted); vertical-align: super; margin-right: 2px; }
                .cbm-tag  { font-size: 0.6rem; font-weight: 700; margin-top: 0.35rem; text-transform: uppercase; letter-spacing: 0.06em; }

                table.cb-table { width: 100%; border-collapse: collapse; }
                table.cb-table th {
                font-size: 0.62rem; font-weight: 800; letter-spacing: 0.12em; text-transform: uppercase;
                color: var(--muted); padding: 0.7rem 1.25rem; text-align: left;
                border-bottom: 1px solid var(--border); background: var(--off);
                }
                table.cb-table th:last-child, table.cb-table th:nth-last-child(2), table.cb-table th:nth-last-child(3) { text-align: right; }
                table.cb-table td { font-size: 0.8rem; font-weight: 500; color: var(--text); padding: 0.7rem 1.25rem; border-bottom: 1px solid var(--off); }
                table.cb-table td:last-child, table.cb-table td:nth-last-child(2), table.cb-table td:nth-last-child(3) { text-align: right; font-weight: 700; }
                table.cb-table tr:hover td { background: var(--indigo-light); }
                .cb-type {
                display: inline-block; padding: 0.2rem 0.6rem;
                border-radius: 999px; font-size: 0.65rem; font-weight: 800; letter-spacing: 0.04em;
                }
                .cb-type.receipts { background: var(--green-light); color: var(--green); border: 1px solid var(--green-border); }
                .cb-type.payments { background: var(--red-light);   color: var(--red);   border: 1px solid var(--red-border); }
                .cb-type.deposit  { background: var(--indigo-light);color: var(--indigo);border: 1px solid var(--indigo-border); }
                .cb-type.cheque   { background: var(--amber-light); color: var(--amber); border: 1px solid var(--amber-border); }
                .cb-dr { color: var(--red); }
                .cb-cr { color: var(--green); }
                .cb-running { color: var(--indigo); font-weight: 800 !important; }

                .cb-chart-wrap { padding: 1.25rem 1.5rem; }
                .chart-track { background: var(--off); border: 1px solid var(--border); border-radius: 0.75rem; padding: 1.25rem; }
                .chart-label { font-size: 0.65rem; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; color: var(--muted); margin-bottom: 0.9rem; }
                svg.sparkline { width:100%; height:60px; overflow:visible; }
                .spark-path { fill:none; stroke:var(--indigo); strokeWidth:2; vector-effect:non-scaling-stroke; strokeLinejoin:round; strokeLinecap:round; }
                .spark-path.neg { stroke: var(--red); }

                /* ---- BANK STATEMENTS ---- */
                section.bank { padding: 6rem 0; background: var(--off); }

                .bank-layout { display: grid; grid-template-columns: 1fr 1fr; gap: 2.5rem; align-items: start; }
                @media(max-width:768px){ .bank-layout{ grid-template-columns:1fr; } }

                .bank-card {
                background: var(--white); border: 1px solid var(--border);
                border-radius: 1.25rem; overflow: hidden;
                box-shadow: 0 4px 24px rgba(0,0,0,0.05);
                }
                .bank-card-top {
                background: linear-gradient(135deg, var(--indigo) 0%, var(--indigo-mid) 100%);
                padding: 2rem 1.75rem;
                position: relative; overflow: hidden;
                }
                .bank-card-top::before {
                content:''; position:absolute; top:-30px; right:-30px;
                width:120px; height:120px; border-radius:50%;
                background: rgba(255,255,255,0.07);
                }
                .bank-card-top::after {
                content:''; position:absolute; bottom:-20px; left: 40%;
                width:90px; height:90px; border-radius:50%;
                background: rgba(255,255,255,0.05);
                }
                .bank-label { font-size: 0.62rem; font-weight: 700; letter-spacing: 0.2em; text-transform: uppercase; color: rgba(255,255,255,0.6); margin-bottom: 0.5rem; }
                .bank-name  { font-size: 1.1rem; font-weight: 800; color: white; margin-bottom: 1.5rem; }
                .bank-balance-label { font-size: 0.65rem; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; color: rgba(255,255,255,0.55); }
                .bank-balance { font-size: 2.4rem; font-weight: 900; color: white; line-height: 1; letter-spacing: -0.03em; }
                .bank-balance span { font-size: 1rem; font-weight: 600; opacity: 0.7; vertical-align: super; margin-right: 2px; }

                .bank-body { padding: 1.5rem; }
                table.bs-table { width: 100%; border-collapse: collapse; }
                table.bs-table th {
                font-size: 0.6rem; font-weight: 800; letter-spacing: 0.14em; text-transform: uppercase;
                color: var(--muted); padding: 0.6rem 0.75rem; text-align: left;
                border-bottom: 1px solid var(--border); background: var(--off);
                }
                table.bs-table th:last-child { text-align: right; }
                table.bs-table td { font-size: 0.8rem; font-weight: 500; color: var(--text); padding: 0.65rem 0.75rem; border-bottom: 1px solid var(--off); }
                table.bs-table td:last-child { text-align: right; font-weight: 800; }
                table.bs-table tr:hover td { background: var(--indigo-light); }
                .bs-dep { color: var(--green); }
                .bs-with { color: var(--red); }
                .bs-id { font-size: 0.68rem; font-weight: 700; color: var(--indigo); }

                .bank-features { }
                .bf-item {
                background: var(--white); border: 1px solid var(--border);
                border-radius: 1rem; padding: 1.5rem; margin-bottom: 1rem;
                display: flex; gap: 1rem; align-items: flex-start;
                transition: all 0.3s;
                }
                .bf-item:hover { border-color: var(--indigo); transform: translateX(6px); box-shadow: 0 8px 28px rgba(67,56,202,0.09); }
                .bf-icon {
                width: 44px; height: 44px; border-radius: 0.75rem;
                background: var(--indigo-light); border: 1px solid var(--indigo-border);
                display: flex; align-items: center; justify-content: center; flex-shrink: 0;
                }
                .bf-item:nth-child(2) .bf-icon { background: var(--green-light);  border-color: var(--green-border); }
                .bf-item:nth-child(3) .bf-icon { background: var(--violet-light); border-color: var(--violet-border); }
                .bf-item h4 { font-family: 'Montserrat', system-ui; font-size: 0.88rem; font-weight: 700; color: var(--dark); margin-bottom: 0.3rem; }
                .bf-item p  { font-family: 'Montserrat', system-ui; font-size: 0.82rem; line-height: 1.6; font-weight: 400; }

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
                .ben-card:hover { transform: translateX(6px); border-color: var(--indigo); box-shadow: 0 8px 28px rgba(67,56,202,0.09); }
                .ben-icon {
                width: 48px; height: 48px; border-radius: 0.875rem;
                background: var(--indigo-light); border: 1px solid var(--indigo-border);
                display: flex; align-items: center; justify-content: center; flex-shrink: 0;
                }
                .ben-card:nth-child(2) .ben-icon { background: var(--green-light);  border-color: var(--green-border); }
                .ben-card:nth-child(3) .ben-icon { background: var(--violet-light); border-color: var(--violet-border); }
                .ben-card:nth-child(4) .ben-icon { background: var(--amber-light);  border-color: var(--amber-border); }
                .ben-card h3 { font-family: 'Montserrat', system-ui; font-size: 0.95rem; font-weight: 700; color: var(--dark); margin-bottom: 0.35rem; }
                .ben-card p  { font-family: 'Montserrat', system-ui; font-size: 0.88rem; line-height: 1.65; font-weight: 400; }

                /* ---- FINAL ---- */
                section.final-section { padding: 8rem 0 9rem; text-align: center; background: var(--white); position: relative; overflow: hidden; }
                section.final-section::before {
                content:''; position:absolute; top:50%; left:50%; transform:translate(-50%,-50%);
                width:700px; height:700px; border-radius:50%;
                background: radial-gradient(circle, rgba(67,56,202,0.055) 0%, transparent 70%);
                pointer-events:none;
                }
                .final-title { font-family: 'Montserrat', system-ui; font-size: clamp(2.6rem,5.5vw,4.8rem); font-weight:900; line-height:1.05; letter-spacing:-0.03em; color:var(--dark); margin-bottom:2rem; }
                .final-title span {
                font-family: 'Montserrat', system-ui;
                background: linear-gradient(120deg, var(--indigo) 0%, var(--indigo-mid) 100%);
                -webkit-background-clip:text; -webkit-text-fill-color:transparent;
                background-clip:text; background-size:200%;
                animation: gradShift 4s ease-in-out infinite alternate;
                }
                @keyframes gradShift { from{background-position:0% 50%} to{background-position:100% 50%} }
                .final-body { font-family: 'Montserrat', system-ui; font-size:1.05rem; line-height:1.85; max-width:600px; margin:0 auto 3rem; color:var(--text); font-weight:400; }
                .final-cta { display:flex; justify-content:center; gap:1rem; flex-wrap:wrap; }
                .btn-primary {
                padding: 0.9rem 2rem; background: var(--indigo); color: white;
                font-family: 'Montserrat', sans-serif; font-size: 0.88rem; font-weight: 800;
                border: none; border-radius: 0.625rem; cursor: pointer; transition: all 0.2s; letter-spacing: 0.02em;
                }
                .btn-primary:hover { background: #3730a3; transform: translateY(-2px); box-shadow: 0 8px 24px rgba(67,56,202,0.25); }
                .btn-secondary {
                padding: 0.9rem 2rem; background: transparent; color: var(--dark);
                font-family: 'Montserrat', sans-serif; font-size: 0.88rem; font-weight: 700;
                border: 1.5px solid var(--border); border-radius: 0.625rem; cursor: pointer; transition: all 0.2s;
                }
                .btn-secondary:hover { border-color: var(--indigo); color: var(--indigo); }

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
                <div className="nav-titles text-left"><h1>Urusentra</h1><p className='text-left'>Accounting & Finance</p></div>
              </div>
              <div className="nav-links">
                <a href="/">Home</a>
                <a href="/pricing">Try it out</a>
              </div>
            </nav>


            <div className="hero">
              <div className="wrapper hero-inner">
                <div>
                  <p className="hero-eyebrow">Complete Accounting Suite</p>
                  <h1 className="text-left">Financial<br/><em>Accounting</em></h1>
                  <p className="hero-body text-left">
                    The <strong>Financial Accounting</strong> module is the backbone of Urusentra's financial engine. It brings together <strong>journal entries</strong>, <strong>income &amp; expenses</strong>, <strong>payment &amp; receipt vouchers</strong>, a live <strong>cash book</strong>, and <strong>bank statement reconciliation</strong> — all automatically calculated, version-controlled, and audit-ready.
                  </p>
                  <div className="hero-stats">
                    <div>
                      <div className="stat-num">6<span> Modules</span></div>
                      <div className="stat-label">Core Instruments</div>
                    </div>
                    <div>
                      <div className="stat-num">100<span>%</span></div>
                      <div className="stat-label">Auto-Calculated</div>
                    </div>
                    <div>
                      <div className="stat-num">∞<span> </span></div>
                      <div className="stat-label">Version History</div>
                    </div>
                  </div>
                </div>


                {/*<!-- DIAGRAM -->*/}
                <div className="hero-diagram">
                  <svg className="diagram-svg" viewBox="0 0 400 350">
                    <defs>
                      <filter id="sh-i"><feDropShadow dx="0" dy="4" stdDeviation="7" flood-color="#4338ca" flood-opacity="0.18"/></filter>
                      <filter id="sh-v"><feDropShadow dx="0" dy="4" stdDeviation="7" flood-color="#7c3aed" flood-opacity="0.16"/></filter>
                      <filter id="sh-s"><feDropShadow dx="0" dy="4" stdDeviation="7" flood-color="#0284c7" flood-opacity="0.16"/></filter>
                      <filter id="sh-g"><feDropShadow dx="0" dy="4" stdDeviation="7" flood-color="#00b87a" flood-opacity="0.14"/></filter>
                      <filter id="sh-a"><feDropShadow dx="0" dy="4" stdDeviation="7" flood-color="#d97706" flood-opacity="0.14"/></filter>
                      <marker id="arr" markerWidth="7" markerHeight="7" refX="5" refY="3.5" orient="auto">
                        <path d="M0,0 L7,3.5 L0,7 Z" fill="#c7d2fe"/>
                      </marker>
                    </defs>

                    <line x1="200" y1="88"  x2="80"  y2="165" stroke="#c7d2fe" strokeWidth="1.5" className="edge-flow d1" marker-end="url(#arr)"/>
                    <line x1="200" y1="88"  x2="160" y2="165" stroke="#c7d2fe" strokeWidth="1.5" className="edge-flow d2" marker-end="url(#arr)"/>
                    <line x1="200" y1="88"  x2="240" y2="165" stroke="#c7d2fe" strokeWidth="1.5" className="edge-flow d3" marker-end="url(#arr)"/>
                    <line x1="200" y1="88"  x2="320" y2="165" stroke="#c7d2fe" strokeWidth="1.5" className="edge-flow d4" marker-end="url(#arr)"/>
                    <line x1="200" y1="88"  x2="200" y2="270" stroke="#c7d2fe" strokeWidth="1.5" className="edge-flow d5" marker-end="url(#arr)"/>

                    <g className="node-a" filter="url(#sh-i)">
                      <rect x="130" y="24" width="140" height="64" rx="14" fill="#eef2ff" stroke="#4338ca" strokeWidth="2"/>
                      <text x="200" y="52"  text-anchor="middle" fill="#4338ca" font-family="Montserrat,sans-serif" font-size="10" font-weight="800" letter-spacing="1.2">ACCOUNTING</text>
                      <text x="200" y="68"  text-anchor="middle" fill="#4338ca" font-family="Montserrat,sans-serif" font-size="10" font-weight="800" letter-spacing="1.2">HUB</text>
                    </g>

                    <g className="node-b" filter="url(#sh-i)">
                      <rect x="30"  y="165" width="100" height="48" rx="10" fill="#eef2ff" stroke="#4338ca" strokeWidth="1.5"/>
                      <text x="80"  y="185" text-anchor="middle" fill="#4338ca" font-family="Montserrat,sans-serif" font-size="8" font-weight="800" letter-spacing="1">JOURNAL</text>
                      <text x="80"  y="200" text-anchor="middle" fill="#8892a4" font-family="Montserrat,sans-serif" font-size="6.5" font-weight="500">JV-2025-XX</text>
                    </g>

                    <g className="node-c" filter="url(#sh-g)">
                      <rect x="108" y="165" width="104" height="48" rx="10" fill="#e6f9f2" stroke="#00b87a" strokeWidth="1.5"/>
                      <text x="160" y="183" text-anchor="middle" fill="#00b87a" font-family="Montserrat,sans-serif" font-size="8" font-weight="800" letter-spacing="1">INCOME &amp;</text>
                      <text x="160" y="196" text-anchor="middle" fill="#00b87a" font-family="Montserrat,sans-serif" font-size="8" font-weight="800" letter-spacing="1">EXPENSES</text>
                      <text x="160" y="208" text-anchor="middle" fill="#8892a4" font-family="Montserrat,sans-serif" font-size="6.5" font-weight="500">IE-2025-XX</text>
                    </g>

                    <g className="node-d" filter="url(#sh-v)">
                      <rect x="190" y="165" width="100" height="48" rx="10" fill="#f5f3ff" stroke="#7c3aed" strokeWidth="1.5"/>
                      <text x="240" y="183" text-anchor="middle" fill="#7c3aed" font-family="Montserrat,sans-serif" font-size="8" font-weight="800" letter-spacing="1">VOUCHERS</text>
                      <text x="240" y="196" text-anchor="middle" fill="#7c3aed" font-family="Montserrat,sans-serif" font-size="7" font-weight="500">PV / RV</text>
                      <text x="240" y="208" text-anchor="middle" fill="#8892a4" font-family="Montserrat,sans-serif" font-size="6.5" font-weight="500">2025-XX</text>
                    </g>

                    <g className="node-e" filter="url(#sh-s)">
                      <rect x="268" y="165" width="104" height="48" rx="10" fill="#f0f9ff" stroke="#0284c7" strokeWidth="1.5"/>
                      <text x="320" y="183" text-anchor="middle" fill="#0284c7" font-family="Montserrat,sans-serif" font-size="8" font-weight="800" letter-spacing="1">BANK</text>
                      <text x="320" y="196" text-anchor="middle" fill="#0284c7" font-family="Montserrat,sans-serif" font-size="8" font-weight="800" letter-spacing="1">STATEMENTS</text>
                      <text x="320" y="208" text-anchor="middle" fill="#8892a4" font-family="Montserrat,sans-serif" font-size="6.5" font-weight="500">BS-2025-XXXXXX</text>
                    </g>

                    <g className="node-f" filter="url(#sh-a)">
                      <rect x="140" y="270" width="120" height="48" rx="10" fill="#fffbeb" stroke="#d97706" strokeWidth="1.5"/>
                      <text x="200" y="289" text-anchor="middle" fill="#d97706" font-family="Montserrat,sans-serif" font-size="8" font-weight="800" letter-spacing="1">CASH BOOK</text>
                      <text x="200" y="304" text-anchor="middle" fill="#8892a4" font-family="Montserrat,sans-serif" font-size="6.5" font-weight="500">CASH-2025-XX</text>
                    </g>
                  </svg>
                </div>
              </div>
            </div>

            <hr className="divider"/>


            <section className="modules">
              <div className="wrapper">
                <div className="reveal">
                  <div className="section-label">What's Inside</div>
                  <h2 className="section-title">Six Financial Instruments. One Unified System.</h2>
                  <p className="section-body text-left">Every module is connected, auto-calculated, and version-controlled. Together they give you a complete picture of every ringgit that moves through your business.</p>
                </div>
                <div className="modules-grid">
                  <div className="mod-card indigo reveal">
                    <div className="mod-icon"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#4338ca" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"/></svg></div>
                    <span className="mod-code">JV-YYYY-XX</span>
                    <h3>Journal Voucher</h3>
                    <p>Double-entry journal with aggregate debit/credit auto-sum. Full cancellation support and version history on every header and line.</p>
                  </div>
                  <div className="mod-card green reveal" style={{ transitionDelay: '.08s' }}>
                    <div className="mod-icon"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#00b87a" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941"/></svg></div>
                    <span className="mod-code">IE-YYYY-XX</span>
                    <h3>Income &amp; Expenses</h3>
                    <p>Categorised income and expense entries with tax-inclusive/exclusive calculation, running balance tracking, and multi-currency support.</p>
                  </div>
                  <div className="mod-card violet reveal" style={{ transitionDelay: '.16s' }}>
                    <div className="mod-icon"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#7c3aed" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 010 3.75H5.625a1.875 1.875 0 010-3.75z"/></svg></div>
                    <span className="mod-code">PV-YYYY-XX</span>
                    <h3>Payment Voucher</h3>
                    <p>Issued to suppliers with project linkage and per-line tax calculation. Aggregate totals flow up automatically from every line saved.</p>
                  </div>
                  <div className="mod-card sky reveal" style={{ transitionDelay: '.24s' }}>
                    <div className="mod-icon"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#0284c7" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z"/></svg></div>
                    <span className="mod-code">RV-YYYY-XX</span>
                    <h3>Receipt Voucher</h3>
                    <p>Received from customers with optional special treatment (discount) per line before tax. Aggregate totals calculated on every line save.</p>
                  </div>
                  <div className="mod-card amber reveal" style={{ transitionDelay: '.32s' }}>
                    <div className="mod-icon"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#d97706" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z"/></svg></div>
                    <span className="mod-code">CASH-YYYY-XX</span>
                    <h3>Cash Book</h3>
                    <p>Four transaction types — Cash Receipts, Cash Payments, Deposits, and Cheques — with debit/credit columns and a live running balance.</p>
                  </div>
                  <div className="mod-card teal reveal" style={{ transitionDelay: '.4s' }}>
                    <div className="mod-icon"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#0f766e" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21"/></svg></div>
                    <span className="mod-code">BS-YYYY-XXXXXX</span>
                    <h3>Bank Statements</h3>
                    <p>Deposits and withdrawals linked to chart of accounts. Unique transaction IDs prevent duplicates and enable full reconciliation.</p>
                  </div>
                </div>
              </div>
            </section>

            <hr className="divider"/>


            <section className="journal">
              <div className="wrapper">
                <div className="reveal">
                  <div className="section-label">Double-Entry Accounting</div>
                  <h2 className="section-title" style={{ color: 'var(--indigo)' }}>Journal Voucher</h2>
                  <p className="section-body text-left">Every financial event is recorded as a balanced journal entry. Debits must equal credits. The system aggregates both sides automatically and zeroes everything on cancellation.</p>
                </div>
                <div className="journal-layout reveal">
                  <div className="journal-entry-demo">
                    <div className="je-header">
                      <span className="je-ref">JV-2025-0041</span>
                      <span className="je-date">11 March 2025 · 09:14</span>
                    </div>
                    <div className="je-desc">Monthly supplier settlement — Q1 material costs</div>
                    <table className="je-table">
                      <thead>
                        <tr>
                          <th>Account</th>
                          <th>Description</th>
                          <th>Debit</th>
                          <th>Credit</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>5001 — Cost of Materials</td>
                          <td>Lumber purchase</td>
                          <td className="je-debit">RM 8,400.00</td>
                          <td>—</td>
                        </tr>
                        <tr>
                          <td>5002 — Cost of Materials</td>
                          <td>Steel &amp; rebar</td>
                          <td className="je-debit">RM 12,600.00</td>
                          <td>—</td>
                        </tr>
                        <tr>
                          <td>2100 — Accounts Payable</td>
                          <td>TimberCraft settlement</td>
                          <td>—</td>
                          <td className="je-credit">RM 8,400.00</td>
                        </tr>
                        <tr>
                          <td>2101 — Accounts Payable</td>
                          <td>MetaSteel settlement</td>
                          <td>—</td>
                          <td className="je-credit">RM 12,600.00</td>
                        </tr>
                        <tr className="je-total-row">
                          <td colSpan={2}><strong>Aggregate Totals</strong></td>
                          <td>RM 21,000.00</td>
                          <td>RM 21,000.00</td>
                        </tr>
                      </tbody>
                    </table>
                    <div className="je-balance">
                      <div className="je-balance-item"><span className="balance-dot" style={{ background: 'var(--red)' }}></span> Total Debit: <strong style={{ color: 'var(--indigo)' }}>RM 21,000.00</strong></div>
                      <div className="je-balance-item"><span className="balance-dot" style={{ background: 'var(--green)' }}></span> Total Credit: <strong style={{ color: 'var(--indigo)' }}>RM 21,000.00</strong></div>
                      <div className="je-balance-item"><span className="balance-dot" style={{ background: 'var(--indigo)' }}></span> <strong style={{ color: 'var(--indigo)' }}>✓ Balanced</strong></div>
                    </div>
                  </div>

                  <div className="je-explainer">
                    <div className="je-step">
                      <div className="je-step-num">1</div>
                      <div>
                        <h4>Create a Journal Header</h4>
                        <p style={{ fontFamily: 'Montserrat, system-ui' }}>Each journal gets a unique <code style={{ fontSize: '0.72rem', background: 'var(--indigo-light)', padding: '1px 5px', borderRadius: '3px', color: 'var(--indigo)' }}>JV-YYYY-XX</code> reference, a description, and is tied to a company. All aggregate totals start at zero.</p>
                      </div>
                    </div>
                    <div className="je-step">
                      <div className="je-step-num">2</div>
                      <div>
                        <h4>Add Journal Entry Lines</h4>
                        <p>Each line links to a Chart of Accounts code and carries a debit or credit amount. Cancelled lines automatically zero out both values.</p>
                      </div>
                    </div>
                    <div className="je-step">
                      <div className="je-step-num">3</div>
                      <div>
                        <h4>Aggregate Totals Auto-Calculate</h4>
                        <p>Calling <code style={{ fontSize: '0.72rem', background: 'var(--indigo-light)', padding: '1px 5px', borderRadius: '3px', color: 'var(--indigo)' }}>calculate_aggregates()</code> sums all net debits and credits from every entry line into the header — instantly.</p>
                      </div>
                    </div>
                    <div className="je-step">
                      <div className="je-step-num">4</div>
                      <div>
                        <h4>Immutable Audit Trail</h4>
                        <p>Every save increments the version counter on both header and line. A complete history of every change is preserved for compliance.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <hr className="divider"/>


            <section className="income">
              <div className="wrapper">
                <div className="reveal">
                  <div className="section-label">P&amp;L Tracking</div>
                  <h2 className="section-title" style={{ color: 'var(--green)' }}>Income &amp; Expenses</h2>
                  <p className="section-body text-left">Every transaction is categorised as INCOME or EXPENSES, tax-adjusted on the fly, and contributes to a running balance — giving you a live Profit &amp; Loss view at any moment.</p>
                </div>
                <div className="ie-grid reveal">
                  <div>
                    <div className="ie-panel" style={{ marginBottom: '1.25rem' }}>
                      <div className="ie-panel-header">
                        <h3>Income Entries</h3>
                        <span className="ie-total inc">+ RM 48,200</span>
                      </div>
                      <table className="ie-table">
                        <thead><tr><th>Ref</th><th>Account</th><th>Tax</th><th>Net Credit</th></tr></thead>
                        <tbody>
                          <tr><td><span className="ie-ref">IE-2025-01</span></td><td>Project Billing — Block A</td><td><span className="ie-tax-badge">6%</span></td><td className="ie-amt-pos">RM 28,600</td></tr>
                          <tr><td><span className="ie-ref">IE-2025-04</span></td><td>Consultation Revenue</td><td>—</td><td className="ie-amt-pos">RM 12,400</td></tr>
                          <tr><td><span className="ie-ref">IE-2025-07</span></td><td>Material Sales</td><td><span className="ie-tax-badge">8%</span></td><td className="ie-amt-pos">RM 7,200</td></tr>
                        </tbody>
                      </table>
                    </div>
                    <div className="ie-panel">
                      <div className="ie-panel-header">
                        <h3>Expense Entries</h3>
                        <span className="ie-total exp">− RM 19,850</span>
                      </div>
                      <table className="ie-table">
                        <thead><tr><th>Ref</th><th>Account</th><th>Tax</th><th>Net Debit</th></tr></thead>
                        <tbody>
                          <tr><td><span className="ie-ref">IE-2025-02</span></td><td>Supplier Payments — Lumber</td><td><span className="ie-tax-badge">6%</span></td><td className="ie-amt-neg">RM 8,400</td></tr>
                          <tr><td><span className="ie-ref">IE-2025-05</span></td><td>Site Labour Wages</td><td>—</td><td className="ie-amt-neg">RM 7,250</td></tr>
                          <tr><td><span className="ie-ref">IE-2025-09</span></td><td>Equipment Rental</td><td><span className="ie-tax-badge">8%</span></td><td className="ie-amt-neg">RM 4,200</td></tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <div>
                    <div className="ie-formula">
                      <div className="ie-formula-title">Tax Calculation Logic</div>
                      <div className="formula-row">
                        <span className="fl">Debit with tax</span>
                        <span className="fr">gross − (gross × rate)</span>
                      </div>
                      <div className="formula-row">
                        <span className="fl">Credit with tax</span>
                        <span className="fr">gross + (gross × rate)</span>
                      </div>
                      <div className="formula-row">
                        <span className="fl">Cancelled entry</span>
                        <span className="fr">net_debit = net_credit = 0</span>
                      </div>
                      <div className="formula-row">
                        <span className="fl">Running balance</span>
                        <span className="fr">Σ credits − Σ debits</span>
                      </div>
                      <div className="formula-row">
                        <span className="fl">Multi-currency</span>
                        <span className="fr">FK → Currencies model</span>
                      </div>
                    </div>

                    <div style={{ marginTop: '1.25rem', background: 'var(--white)', border: '1px solid var(--border)', borderRadius: '1rem', padding: '1.5rem' }}>
                      <div className="section-label" style={{ marginBottom: '0.85rem' }}>Live P&amp;L Snapshot</div>
                      <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '1rem' }}>
                        <div style={{ flex: 1, background: 'var(--green-light)', border: '1px solid var(--green-border)', borderRadius: '0.75rem', padding: '1rem', textAlign: 'center' }}>
                          <div style={{ fontSize: '0.62rem', fontWeight: '700', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--green)', marginBottom: '0.35rem' }}>Total Income</div>
                          <div style={{ fontSize: '1.6rem', fontWeight: 900, color: 'var(--green)', letterSpacing: '-0.02em' }}>RM 48,200</div>
                        </div>
                        <div style={{ flex: 1, background: 'var(--red-light)', border: '1px solid var(--red-border)', borderRadius: '0.75rem', padding: '1rem', textAlign: 'center' }}>
                          <div style={{ fontSize: '0.62rem', fontWeight: '700', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--red)', marginBottom: '0.35rem' }}>Total Expenses</div>
                          <div style={{ fontSize: '1.6rem', fontWeight: 900, color: 'var(--red)', letterSpacing: '-0.02em' }}>RM 19,850</div>
                        </div>
                      </div>
                      <div style={{ background: 'var(--indigo-light)', border: '1px solid var(--indigo-border)', borderRadius: '0.75rem', padding: '1rem', textAlign: 'center' }}>
                        <div style={{ fontSize: '0.62rem', fontWeight: '700', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--indigo)', marginBottom: '0.35rem' }}>Net Profit</div>
                        <div style={{ fontSize: '2rem', fontWeight: '900', color: 'var(--indigo)', letterSpacing: '-0.03em' }}>RM 28,350</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <hr className="divider"/>

            <section className="vouchers">
              <div className="wrapper">
                <div className="reveal">
                  <div className="section-label">Payment &amp; Receipt</div>
                  <h2 className="section-title" style={{ color: 'var(--violet)' }}>Vouchers</h2>
                  <p className="section-body text-left">Payment Vouchers go out to suppliers. Receipt Vouchers come in from customers. Both support project linkage, per-line tax, and automatic aggregate calculation.</p>
                </div>
                <div className="voucher-grid reveal">
                    
                  <div className="v-card pv">
                    <div className="v-card-top">
                      <div className="v-card-top-left">
                        <span className="v-prefix">PV-2025-0028</span>
                        <h3>Payment Voucher</h3>
                        <p>Issued to supplier for project material costs. Tax and aggregates auto-calculated from line items.</p>
                      </div>
                      <div>
                        <div className="v-amount" id="pv-amount">18,480</div>
                        <div className="v-amount-label">Aggregate Total</div>
                      </div>
                    </div>
                    <div className="v-body">
                      <div className="v-row"><span className="vl">Payment To</span><span className="vr">TimberCraft Lumber Sdn Bhd.</span></div>
                      <div className="v-row"><span className="vl">Project</span><span className="vr highlight">PRJ-2025-007 — Block A</span></div>
                      <div className="v-row"><span className="vl">Account Paid By</span><span className="vr">4100 — Operating Cash</span></div>
                      <div className="v-row"><span className="vl">Gross Total</span><span className="vr">RM 17,400.00</span></div>
                      <div className="v-row"><span className="vl">Tax (6% inclusive)</span><span className="vr">RM 1,044.00</span></div>
                      <div className="v-row"><span className="vl">Aggregate Total</span><span className="vr highlight">RM 18,444.00</span></div>
                      <div className="v-feature-tag">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#7c3aed" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"/></svg>
                        Line totals aggregate automatically on every save
                      </div>
                    </div>
                  </div>

                  <div className="v-card rv">
                    <div className="v-card-top">
                      <div className="v-card-top-left">
                        <span className="v-prefix">RV-2025-0019</span>
                        <h3>Receipt Voucher</h3>
                        <p>Received from customer. Supports special treatment (discount) per line before tax is applied.</p>
                      </div>
                      <div>
                        <div className="v-amount" id="rv-amount">32,760</div>
                        <div className="v-amount-label">Aggregate Total</div>
                      </div>
                    </div>
                    <div className="v-body">
                      <div className="v-row"><span className="vl">Received From</span><span className="vr">Ahmad Lutfi — CV-2025-00142</span></div>
                      <div className="v-row"><span className="vl">Project</span><span className="vr highlight">PRJ-2025-007 — Block A</span></div>
                      <div className="v-row"><span className="vl">Account Received In</span><span className="vr">1000 — Main Bank Account</span></div>
                      <div className="v-row"><span className="vl">Gross Total</span><span className="vr">RM 31,200.00</span></div>
                      <div className="v-row"><span className="vl">Special Treatment (5%)</span><span className="vr">− RM 1,560.00</span></div>
                      <div className="v-row"><span className="vl">After Discount</span><span className="vr">RM 29,640.00</span></div>
                      <div className="v-row"><span className="vl">Tax (6% inclusive)</span><span className="vr">RM 1,778.40</span></div>
                      <div className="v-row"><span className="vl">Aggregate Total</span><span className="vr highlight">RM 31,418.40</span></div>
                      <div className="v-feature-tag" style={{ '--mc': 'var(--sky)', '--ml': 'var(--sky-light)', '--mb': 'var(--sky-border)' } as React.CSSProperties}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0284c7" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9 14.25l6-6m4.5-3.493V21.75l-3.75-1.5-3.75 1.5-3.75-1.5-3.75 1.5V4.757c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0c1.1.128 1.907 1.077 1.907 2.185z"/></svg>
                        Special treatment discount applied before tax
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <hr className="divider"/>


            <section className="cashbook">
              <div className="wrapper">
                <div className="reveal">
                  <div className="section-label">Live Financial Feed</div>
                  <h2 className="section-title" style={{ color: 'var(--amber)' }}>Cash Book &amp; Bank Statements</h2>
                  <p className="section-body text-left">The Cash Book records every cash movement in real‑time with a running balance. Bank Statements capture deposits and withdrawals tied to Chart of Accounts for full reconciliation.</p>
                </div>
                <div className="cb-panel reveal">
                  <div className="cb-header">
                    <span className="dot r"></span><span className="dot y"></span><span className="dot g"></span>
                    <span className="cb-title">CASH_BOOK — Company A — Live Running Balance</span>
                  </div>
                  <div className="cb-tabs">
                    <div className="cb-tab active">Cash Book</div>
                    <div className="cb-tab">Bank Statements</div>
                    <div className="cb-tab">Reconciliation</div>
                  </div>
                  <div className="cb-metrics">
                    <div className="cbm indigo">
                      <div className="cbm-label">Total Entries</div>
                      <div className="cbm-val"><span id="cb-entries">48</span></div>
                      <div className="cbm-tag" style={{ color: 'var(--indigo)' }}>● ALL TIME</div>
                    </div>
                    <div className="cbm green">
                      <div className="cbm-label">Total Receipts</div>
                      <div className="cbm-val"><span className="cbm-prefix">RM</span><span id="cb-rec">62,400</span></div>
                      <div className="cbm-tag" style={{ color: 'var(--green)' }}>▲ INFLOW</div>
                    </div>
                    <div className="cbm red">
                      <div className="cbm-label">Total Payments</div>
                      <div className="cbm-val"><span className="cbm-prefix">RM</span><span id="cb-pay">38,250</span></div>
                      <div className="cbm-tag" style={{ color: 'var(--red)' }}>▼ OUTFLOW</div>
                    </div>
                    <div className="cbm amber">
                      <div className="cbm-label">Running Balance</div>
                      <div className="cbm-val"><span className="cbm-prefix">RM</span><span id="cb-bal">24,150</span></div>
                      <div className="cbm-tag" id="cb-bal-tag" style={{ color: 'var(--amber)' }}>● NET BALANCE</div>
                    </div>
                  </div>

                  <div style={{ padding: '0 1.5rem 0' }}>
                    <table className="cb-table">
                      <thead>
                        <tr>
                          <th>Reference</th>
                          <th>To / From</th>
                          <th>Type</th>
                          <th>Account</th>
                          <th>Debit</th>
                          <th>Credit</th>
                          <th>Balance</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td><span style={{ fontSize: '0.7rem', fontWeight: '700', color: 'var(--indigo)' }}>CASH-2025-48</span></td>
                          <td>Ahmad Lutfi</td>
                          <td><span className="cb-type receipts">Cash Receipts</span></td>
                          <td>1000 — Main Bank</td>
                          <td>—</td>
                          <td className="cb-cr">RM 12,000</td>
                          <td className="cb-running" id="row-bal-1">RM 24,150</td>
                        </tr>
                        <tr>
                          <td><span style={{ fontSize: '0.7rem', fontWeight: '700', color: 'var(--indigo)' }}>CASH-2025-47</span></td>
                          <td>TimberCraft Sdn Bhd.</td>
                          <td><span className="cb-type payments">Cash Payments</span></td>
                          <td>2100 — Accounts Payable</td>
                          <td className="cb-dr">RM 8,400</td>
                          <td>—</td>
                          <td className="cb-running">RM 12,150</td>
                        </tr>
                        <tr>
                          <td><span style={{ fontSize: '0.7rem', fontWeight: '700', color: 'var(--indigo)' }}>CASH-2025-46</span></td>
                          <td>Binaan Maju Sdn Bhd.</td>
                          <td><span className="cb-type deposit">Deposit</span></td>
                          <td>1000 — Main Bank</td>
                          <td>—</td>
                          <td className="cb-cr">RM 20,550</td>
                          <td className="cb-running">RM 20,550</td>
                        </tr>
                        <tr>
                          <td><span style={{ fontSize: '0.7rem', fontWeight: '700', color: 'var(--indigo)' }}>CASH-2025-45</span></td>
                          <td>MetaSteel Industries</td>
                          <td><span className="cb-type cheque">Cheque</span></td>
                          <td>2101 — Accounts Payable</td>
                          <td className="cb-dr">RM 12,600</td>
                          <td>—</td>
                          <td className="cb-running">RM 0</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <div className="cb-chart-wrap">
                    <div className="chart-track">
                      <div className="chart-label">Running balance — last 20 transactions</div>
                      <svg className="sparkline" viewBox="0 0 400 60" preserveAspectRatio="none">
                        <defs>
                          <linearGradient id="sg-i" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stop-color="#4338ca" stop-opacity="0.14"/>
                            <stop offset="100%" stop-color="#4338ca" stop-opacity="0"/>
                          </linearGradient>
                        </defs>
                        <line x1="0" y1="30" x2="400" y2="30" stroke="#d97706" strokeWidth="1" stroke-dasharray="4 4" opacity="0.4"/>
                        <path id="spark-fill" fill="url(#sg-i)"/>
                        <path className="spark-path" id="spark-path"/>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <hr className="divider"/>


            <section className="bank">
              <div className="wrapper">
                <div className="reveal">
                  <div className="section-label">Bank Reconciliation</div>
                  <h2 className="section-title" style={{ color: 'var(--sky)' }}>Bank Statements</h2>
                  <p className="section-body text-left">Every bank transaction is captured with a unique transaction ID, linked to a Chart of Accounts, and stored with full version history — making reconciliation fast and provable.</p>
                </div>
                <div className="bank-layout reveal">
                  <div className="bank-card">
                    <div className="bank-card-top">
                      <div className="bank-label">Primary Account</div>
                      <div className="bank-name">Maybank — 5014 XXXX XXXX</div>
                      <div className="bank-balance-label">Current Balance</div>
                      <div className="bank-balance"><span>RM</span><span id="bank-bal">24,150.00</span></div>
                    </div>
                    <div className="bank-body">
                      <table className="bs-table">
                        <thead><tr><th>ID</th><th>Description</th><th>Date</th><th>Amount</th></tr></thead>
                        <tbody>
                          <tr>
                            <td><span className="bs-id">BS-2025-000048</span></td>
                            <td>Client deposit — Ahmad Lutfi</td>
                            <td>11 Mar</td>
                            <td className="bs-dep">+ RM 12,000</td>
                          </tr>
                          <tr>
                            <td><span className="bs-id">BS-2025-000047</span></td>
                            <td>Supplier payment — TimberCraft</td>
                            <td>10 Mar</td>
                            <td className="bs-with">− RM 8,400</td>
                          </tr>
                          <tr>
                            <td><span className="bs-id">BS-2025-000046</span></td>
                            <td>Project billing receipt</td>
                            <td>09 Mar</td>
                            <td className="bs-dep">+ RM 20,550</td>
                          </tr>
                          <tr>
                            <td><span className="bs-id">BS-2025-000045</span></td>
                            <td>Cheque — MetaSteel Industries</td>
                            <td>07 Mar</td>
                            <td className="bs-with">− RM 12,600</td>
                          </tr>
                          <tr>
                            <td><span className="bs-id">BS-2025-000044</span></td>
                            <td>Site labour wages disbursement</td>
                            <td>05 Mar</td>
                            <td className="bs-with">− RM 7,250</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <div className="bank-features">
                    <div className="bf-item">
                      <div className="bf-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#4338ca" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M7.864 4.243A7.5 7.5 0 0119.5 10.5c0 2.92-.556 5.709-1.568 8.268M5.742 6.364A7.465 7.465 0 004.5 10.5a7.464 7.464 0 01-1.15 3.993m1.989 3.559A11.209 11.209 0 008.25 10.5a3.75 3.75 0 117.5 0c0 .527-.021 1.049-.064 1.565M12 10.5a14.94 14.94 0 01-3.6 9.75m6.633-4.596a18.666 18.666 0 01-2.485 5.33"/></svg></div>
                      <div>
                        <h4>Unique Transaction IDs</h4>
                        <p>Each bank statement entry has a unique <code style={{ fontSize:' 0.72rem', background: 'var(--sky-light)', padding:' 1px 5px', borderRadius:' 3px;color:var(--sky)' }}>BS-YYYY-XXXXXX</code> reference, preventing duplicate imports and enabling precise reconciliation.</p>
                      </div>
                    </div>
                    <div className="bf-item">
                      <div className="bf-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#00b87a" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6"/></svg></div>
                      <div>
                        <h4>Chart of Accounts Linkage</h4>
                        <p>Every bank statement is tied to a CoA account via <code style={{ fontSize:' 0.72rem', background: 'var(--green-light)', padding:' 1px 5px', borderRadius:' 3px;color:var(--green)' }}>related_account</code>, enabling automatic GL posting and balance sheet updates.</p>
                      </div>
                    </div>
                    <div className="bf-item">
                      <div className="bf-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#7c3aed" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"/></svg></div>
                      <div>
                        <h4>Deposit &amp; Withdrawal Types</h4>
                        <p>Transactions are classified as Deposits or Withdrawals, keeping inflows and outflows cleanly separated for reporting and reconciliation workflows.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <hr className="divider"/>

            <section className="benefits">
              <div className="wrapper reveal">
                <div className="section-label">Why Financial Accounting</div>
                <h2 className="section-title" style={{ color: 'var(--indigo)' }}>Industry Benefits</h2>
                <div className="benefits-grid">
                  <div className="ben-card reveal">
                    <div className="ben-icon"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#4338ca" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg></div>
                    <div>
                      <h3>Always-Balanced Entries</h3>
                      <p>Double-entry journal vouchers ensure debits always equal credits. Aggregates recalculate on every save, eliminating manual reconciliation.</p>
                    </div>
                  </div>
                  <div className="ben-card reveal" style={{ transitionDelay:'.1s' }}>
                    <div className="ben-icon"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#00b87a" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941"/></svg></div>
                    <div>
                      <h3>Real‑Time P&amp;L Visibility</h3>
                      <p>Income and expense entries update your running profit &amp; loss position instantly — no waiting for end-of-month reports to know where you stand.</p>
                    </div>
                  </div>
                  <div className="ben-card reveal" style={{ transitionDelay:'.2s' }}>
                    <div className="ben-icon"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#7c3aed" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z"/></svg></div>
                    <div>
                      <h3>Complete Audit Trail</h3>
                      <p>Every record — from journal headers to voucher lines — increments a version counter on each save, creating a tamper-evident history for compliance.</p>
                    </div>
                  </div>
                  <div className="ben-card reveal" style={{ transitionDelay:'.3s' }}>
                    <div className="ben-icon"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#d97706" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253"/></svg></div>
                    <div>
                      <h3>Multi-Currency &amp; Multi-Company</h3>
                      <p>Every voucher, cash book entry, and bank statement carries a currency foreign key and a company scope, supporting complex group accounting structures.</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section className="final-section reveal">
              <div className="wrapper">
                <h2 className="final-title">Every Entry.<br/><span>Always Balanced.</span></h2>
                <p className="final-body">Financial Accounting in Urusentra removes the guesswork from construction finance. From the first journal entry to bank reconciliation, every number is calculated, tracked, and auditable — in real time.</p>
                <div className="final-cta">
                  <button className="btn-primary">
                    <a href="/pricing">Open Accounting Suite</a>
                  </button>
                  <button className="btn-secondary">View Chart of Accounts</button>
                </div>
              </div>
            </section>

        </div>
    );
};
export default AccountingFeature;
