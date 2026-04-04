import React, { useEffect } from "react";






function SupplierFeature() {


    useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll(".reveal");
    elements.forEach((el) => obs.observe(el));

    // Cleanup observer on component unmount
    return () => obs.disconnect();
  }, []);







    return (
        <div className="min-w-full">
            <title>Suppliers Feature | Urusentra · Modern ERP solution for the building industry</title>
            <meta name="suppliers" content="Learn more about Urusentra Suppliers feature – modern ERP for SMEs" />


            <style>

                {`

                    @import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700;800;900&display=swap");


                    :root {
                    --white:  #ffffff;
                    --off:    #f7f8fa;
                    --stone:  #f5f4f1;
                    --border: #dde1ea;
                    --muted:  #8892a4;
                    --text:   #3d4658;
                    --dark:   #1a2035;
                    --blue:   #2355f5;
                    --blue-light: #eef1ff;
                    --orange: #ea580c;
                    --orange-mid: #f97316;
                    --orange-light: #fff7ed;
                    --orange-border: #fed7aa;
                    --green:  #00b87a;
                    --green-light: #e6f9f2;
                    --red:    #e8354a;
                    --red-light: #fff0f2;
                    --amber:  #f59e0b;
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
                  .nav-brand {
                    display: flex; align-items: center; gap: 0.65rem;
                  }
                  .nav-icon {
                    width: 34px; height: 34px;
                    border-radius: 8px;
                    display: flex; align-items: center; justify-content: center;
                  }
                  .nav-titles h1 {
                  font-family: 'Montserrat', system-ui;
                    font-size: 1.05rem; font-weight: 800;
                    letter-spacing: -0.01em; color: var(--dark); line-height: 1.1;
                  }
                  .nav-titles p {
                    font-size: 0.58rem; font-weight: 600;
                    letter-spacing: 0.2em; text-transform: uppercase;
                    color: var(--muted);
                  }
                  .nav-links { display: flex; align-items: center; gap: 1.75rem; }
                  .nav-links a {
                    font-size: 0.8rem; font-weight: 600;
                    color: #4b5563; text-decoration: none;
                    transition: color 0.2s;
                  }
                  .nav-links a:hover { color: var(--orange); }
                  .nav-links a.active { color: var(--orange); }
                  .nav-dot {
                    width: 8px; height: 8px; border-radius: 50%;
                    background: var(--green);
                    animation: blink 1.8s ease-in-out infinite;
                  }
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
                  .breadcrumb a:hover { color: var(--orange); }
                  .breadcrumb span { color: var(--dark); font-weight: 700; }

                  /* ---- HERO ---- */
                  .hero {
                    background: var(--white);
                    border-bottom: 1px solid var(--border);
                    padding: 5.5rem 0 5rem;
                    position: relative;
                    overflow: hidden;
                  }
                  .hero::before {
                    content:'';
                    position:absolute; inset:0;
                    background: radial-gradient(ellipse 800px 400px at 70% 50%, rgba(234,88,12,0.055) 0%, transparent 70%);
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
                    color: var(--orange); margin-bottom: 1.1rem;
                    display: flex; align-items: center; gap: 0.6rem;
                    opacity: 0; animation: fadeUp 0.65s 0.2s forwards;
                  }
                  .hero-eyebrow::before {
                    content:''; display:block; width:1.8rem; height:2px;
                    background: var(--orange); border-radius:2px;
                  }
                  .hero h1 {
                  font-family: 'Montserrat', system-ui;
                    font-size: clamp(2.5rem, 5vw, 4.2rem);
                    font-weight: 900; line-height: 1.05; letter-spacing: -0.025em;
                    color: var(--dark);
                    opacity: 0; animation: fadeUp 0.65s 0.32s forwards;
                  }
                  .hero h1 em { font-family: 'Montserrat', system-ui; font-style: normal; color: var(--orange); }
                  .hero-body {
                  font-family: 'Montserrat', system-ui;
                    margin-top: 1.8rem; font-size: 1rem; font-weight: 400;
                    line-height: 1.85; color: var(--text);
                    opacity: 0; animation: fadeUp 0.65s 0.46s forwards;
                  }
                  .hero-body strong { font-family: 'Montserrat', system-ui; color: var(--dark); font-weight: 700; }
                  .hero-stats {
                    margin-top: 2.5rem;
                    display: flex; gap: 2.5rem;
                    opacity: 0; animation: fadeUp 0.65s 0.6s forwards;
                  }
                  .stat-item { }
                  .stat-num {
                    font-size: 1.8rem; font-weight: 900;
                    color: var(--dark); line-height: 1;
                    letter-spacing: -0.03em;
                  }
                  .stat-num span { color: var(--orange); }
                  .stat-label {
                    font-size: 0.72rem; font-weight: 600;
                    letter-spacing: 0.08em; text-transform: uppercase;
                    color: var(--muted); margin-top: 0.2rem;
                  }

                  @keyframes fadeUp {
                    from { opacity:0; transform:translateY(22px); }
                    to   { opacity:1; transform:translateY(0); }
                  }

                  /* ---- HERO DIAGRAM ---- */
                  .hero-diagram {
                    display: flex; justify-content: center; align-items: center;
                    opacity: 0; animation: fadeUp 0.9s 0.65s forwards;
                  }
                  .diagram-svg { width: 100%; max-width: 400px; }

                  .node-contractor { animation: floatNode 7s ease-in-out infinite; }
                  .node-platform   { animation: floatNode 6s ease-in-out 0.5s infinite; }
                  .node-s1 { animation: floatNode 7s ease-in-out 0.3s infinite; }
                  .node-s2 { animation: floatNode 7s ease-in-out 0.9s infinite; }
                  .node-s3 { animation: floatNode 7s ease-in-out 1.5s infinite; }
                  .node-s4 { animation: floatNode 7s ease-in-out 2.1s infinite; }
                  @keyframes floatNode {
                    0%,100%{ transform:translateY(0); }
                    50%    { transform:translateY(-8px); }
                  }
                  .edge-pulse {
                    stroke-dasharray: 6 4;
                    animation: dashFlow 2.2s linear infinite;
                  }
                  @keyframes dashFlow { to { stroke-dashoffset: -30; } }
                  .edge-pulse.delay1 { animation-delay: 0.3s; }
                  .edge-pulse.delay2 { animation-delay: 0.6s; }
                  .edge-pulse.delay3 { animation-delay: 0.9s; }
                  .edge-pulse.delay4 { animation-delay: 1.2s; }

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
                  font-family: 'Montserrat', system-ui;
                    font-size: clamp(1.9rem, 3.5vw, 2.8rem);
                    font-weight: 800; line-height: 1.1; letter-spacing: -0.02em;
                    color: var(--dark); margin-bottom: 1.2rem;
                  }
                  .section-body {
                  font-family: 'Montserrat', system-ui;
                    font-size: 1rem; line-height: 1.8; max-width: 620px;
                    color: var(--text); margin-bottom: 2.5rem; font-weight: 400;
                  }
                  .section-body strong { font-family: 'Montserrat', system-ui; color: var(--dark); font-weight: 700; }

                  /* ---- HOW IT WORKS ---- */
                  section.how { padding: 6rem 0; background: var(--white); }

                  .steps-grid {
                    display: grid; grid-template-columns: repeat(4,1fr); gap: 0;
                    position: relative;
                  }
                  @media(max-width:768px){ .steps-grid{ grid-template-columns:1fr 1fr; gap:1.5rem; } }
                  @media(max-width:480px){ .steps-grid{ grid-template-columns:1fr; } }

                  .steps-grid::before {
                    content:'';
                    position:absolute; top: 2.4rem; left: 12.5%; right: 12.5%;
                    height: 1px;
                    background: linear-gradient(90deg, var(--orange-border), var(--orange-border));
                    z-index: 0;
                  }
                  @media(max-width:768px){ .steps-grid::before{ display:none; } }

                  .step {
                    text-align: center; padding: 0 1.5rem;
                    position: relative; z-index: 1;
                  }
                  .step-circle {
                    width: 48px; height: 48px; border-radius: 50%;
                    background: var(--white);
                    border: 2px solid var(--orange-border);
                    display: flex; align-items: center; justify-content: center;
                    margin: 0 auto 1.25rem;
                    transition: all 0.3s;
                    position: relative;
                  }
                  .step:hover .step-circle {
                    background: var(--orange);
                    border-color: var(--orange);
                    box-shadow: 0 0 0 6px rgba(234,88,12,0.1);
                  }
                  .step:hover .step-circle svg { stroke: white; }
                  .step-num {
                    position:absolute; top:-8px; right:-8px;
                    width:20px; height:20px; border-radius:50%;
                    background: var(--orange); color: white;
                    font-size: 0.6rem; font-weight: 800;
                    display:flex; align-items:center; justify-content:center;
                  }
                  .step h3 {
                  font-family: 'Montserrat', system-ui;
                    font-size: 0.9rem; font-weight: 700;
                    color: var(--dark); margin-bottom: 0.5rem;
                  }
                  .step p { font-size: 0.82rem; line-height: 1.65; color: var(--text); }

                  /* ---- SUPPLIER DEMO ---- */
                  section.demo { padding: 6rem 0; background: var(--off); }

                  .demo-layout {
                    display: grid; grid-template-columns: 280px 1fr; gap: 2rem; align-items: start;
                  }
                  @media(max-width:900px){ .demo-layout{ grid-template-columns:1fr; } }

                  /* Filter Panel */
                  .filter-panel {
                    background: var(--white);
                    border: 1px solid var(--border);
                    border-radius: 1rem;
                    overflow: hidden;
                    position: sticky; top: 80px;
                  }
                  .filter-header {
                    padding: 1.25rem 1.5rem;
                    border-bottom: 1px solid var(--border);
                    display: flex; justify-content: space-between; align-items: center;
                  }
                  .filter-header h2 { font-family: 'Montserrat', system-ui; font-size: 0.9rem; font-weight: 800; color: var(--dark); }
                  .filter-header button { font-family: 'Montserrat', system-ui; font-size: 0.75rem; font-weight: 700; color: var(--orange); background: none; border: none; cursor: pointer; }
                  .filter-section { font-family: 'Montserrat', system-ui; padding: 1.25rem 1.5rem; border-bottom: 1px solid var(--border); }
                  .filter-section:last-child { font-family: 'Montserrat', system-ui; border-bottom: none; }
                  .filter-section-title {
                  font-family: 'Montserrat', system-ui;
                    font-size: 0.62rem; font-weight: 800;
                    letter-spacing: 0.18em; text-transform: uppercase;
                    color: var(--muted); margin-bottom: 0.85rem;
                  }
                  .filter-row {
                  font-family: 'Montserrat', system-ui;
                    display: flex; align-items: center; gap: 0.65rem;
                    margin-bottom: 0.55rem; cursor: pointer;
                  }
                  .filter-row label { font-family: 'Montserrat', system-ui; font-size: 0.82rem; font-weight: 500; color: var(--text); cursor: pointer; flex:1; }
                  .filter-row label:hover { font-family: 'Montserrat', system-ui; color: var(--orange); }
                  .filter-row .count { font-family: 'Montserrat', system-ui; font-size: 0.7rem; color: var(--muted); font-weight: 500; }
                  .cb {
                  font-family: 'Montserrat', system-ui;
                    width: 16px; height: 16px;
                    border: 1.5px solid var(--border);
                    border-radius: 4px;
                    flex-shrink:0;
                    background: var(--white);
                    display:flex; align-items:center; justify-content:center;
                    transition: all 0.2s;
                  }
                  .cb.checked {
                  font-family: 'Montserrat', system-ui;
                    background: var(--orange);
                    border-color: var(--orange);
                  }
                  .filter-cta {
                    margin: 1.25rem 1.5rem 1.5rem;
                    background: linear-gradient(135deg, var(--orange) 0%, var(--orange-mid) 100%);
                    border-radius: 0.875rem;
                    padding: 1.5rem;
                    color: white;
                    text-align: center;
                  }
                  .filter-cta h3 { font-family: 'Montserrat', system-ui; font-size: 1rem; font-weight: 900; letter-spacing: -0.01em; margin-bottom: 0.35rem; }
                  .filter-cta p { font-family: 'Montserrat', system-ui; font-size: 0.78rem; opacity: 0.85; margin-bottom: 1rem; font-weight: 400; }
                  .filter-cta button {
                    width: 100%; padding: 0.6rem 1rem;
                    background: white; color: var(--orange);
                    font-family: 'Montserrat', sans-serif;
                    font-size: 0.8rem; font-weight: 800;
                    border: none; border-radius: 0.5rem;
                    cursor: pointer; transition: background 0.2s;
                  }
                  .filter-cta button:hover { background: #fff7ed; }

                  /* Supplier Cards Area */
                  .cards-area { }
                  .cards-toolbar {
                    background: var(--white);
                    border: 1px solid var(--border);
                    border-radius: 0.875rem;
                    padding: 1rem 1.25rem;
                    margin-bottom: 1.25rem;
                    display: flex; align-items: center; justify-content: space-between; gap: 1rem;
                  }
                  .cards-toolbar-left { font-size: 0.82rem; color: var(--text); }
                  .cards-toolbar-left strong { color: var(--dark); font-weight: 700; }
                  .sort-select {
                    font-family: 'Montserrat', sans-serif;
                    font-size: 0.8rem; font-weight: 600;
                    color: var(--dark);
                    padding: 0.5rem 0.9rem;
                    border: 1px solid var(--border);
                    border-radius: 0.5rem;
                    outline: none;
                    cursor: pointer;
                    background: var(--white);
                  }
                  .sort-select:focus { border-color: var(--orange); }

                  /* Supplier Card */
                  .supplier-card {
                    background: var(--white);
                    border: 1.5px solid var(--border);
                    border-radius: 1rem;
                    padding: 1.5rem;
                    margin-bottom: 1.1rem;
                    transition: all 0.3s ease;
                    cursor: pointer;
                    position: relative;
                    overflow: hidden;
                  }
                  .supplier-card::before {
                    content:''; position:absolute;
                    left:0; top:0; bottom:0; width:3px;
                    background: transparent;
                    transition: background 0.3s;
                  }
                  .supplier-card:hover {
                    border-color: var(--orange-border);
                    box-shadow: 0 8px 32px rgba(234,88,12,0.08);
                    transform: translateY(-3px);
                  }
                  .supplier-card:hover::before { background: var(--orange); }
                  .supplier-card.featured { border-color: var(--orange-border); }
                  .supplier-card.featured::before { background: var(--orange); }

                  .card-inner { display: flex; gap: 1.25rem; align-items: flex-start; }

                  .card-logo {
                    width: 72px; height: 72px; flex-shrink: 0;
                    background: linear-gradient(135deg, var(--orange-light), #fef3e2);
                    border: 1.5px solid var(--orange-border);
                    border-radius: 0.875rem;
                    display: flex; align-items: center; justify-content: center;
                  }
                  .card-logo span {
                    font-size: 1.4rem; font-weight: 900;
                    color: var(--orange); letter-spacing: 0.05em;
                  }

                  .card-body { flex: 1; }
                  .card-top {
                    display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 0.5rem;
                  }
                  .card-name-row { display: flex; align-items: center; gap: 0.5rem; flex-wrap: wrap; }
                  .card-name {
                    font-size: 1.05rem; font-weight: 800;
                    color: var(--dark); letter-spacing: -0.01em;
                  }
                  .badge-featured {
                    padding: 0.2rem 0.55rem;
                    background: var(--orange); color: white;
                    font-size: 0.58rem; font-weight: 800;
                    letter-spacing: 0.1em; text-transform: uppercase;
                    border-radius: 4px;
                  }
                  .badge-verified {
                    display: flex; align-items: center;
                  }
                  .card-meta {
                    display: flex; align-items: center; gap: 0.75rem;
                    font-size: 0.78rem; color: var(--muted); margin-bottom: 0.7rem;
                    flex-wrap: wrap;
                  }
                  .card-meta span { display: flex; align-items: center; gap: 0.3rem; font-weight: 500; }
                  .card-meta .sep { color: var(--border); }
                  .card-rating { text-align: right; }
                  .stars { color: #f59e0b; font-size: 1rem; letter-spacing: -1px; }
                  .rating-num { font-size: 1.4rem; font-weight: 900; color: var(--dark); line-height: 1; }
                  .review-count { font-size: 0.72rem; color: var(--muted); font-weight: 500; }

                  .card-desc { font-family: 'Montserrat', system-ui; font-size: 0.85rem; line-height: 1.7; color: var(--text); margin-bottom: 0.85rem; font-weight: 400; }

                  .card-tags { display: flex; flex-wrap: wrap; gap: 0.4rem; margin-bottom: 0.85rem; }
                  .tag {
                    padding: 0.25rem 0.7rem;
                    background: #f3f4f6;
                    color: #374151;
                    font-size: 0.7rem; font-weight: 700;
                    border-radius: 999px;
                    letter-spacing: 0.02em;
                  }

                  .card-footer {
                    border-top: 1px solid var(--border);
                    padding-top: 0.85rem;
                    display: flex; align-items: center; justify-content: space-between;
                    flex-wrap: wrap; gap: 0.75rem;
                  }
                  .card-details {
                    display: flex; align-items: center; gap: 1.25rem;
                    font-size: 0.78rem; color: var(--text); flex-wrap: wrap;
                  }
                  .card-details span { display: flex; align-items: center; gap: 0.3rem; }
                  .card-details strong { font-weight: 700; color: var(--dark); }
                  .card-action {
                    padding: 0.5rem 1.2rem;
                    background: var(--orange); color: white;
                    font-family: 'Montserrat', sans-serif;
                    font-size: 0.78rem; font-weight: 700;
                    border: none; border-radius: 0.5rem;
                    cursor: pointer; transition: background 0.2s, transform 0.15s;
                  }
                  .card-action:hover { background: #c2410c; transform: scale(1.03); }

                  /* ---- BENEFITS ---- */
                  section.benefits { font-family: 'Montserrat', system-ui; padding: 6rem 0; background: var(--white); }

                  .benefits-grid {
                    display: grid; grid-template-columns: repeat(2,1fr); gap: 1.25rem;
                  }
                  @media(max-width:600px){ .benefits-grid{ grid-template-columns:1fr; } }

                  .ben-card {
                    background: var(--off);
                    border: 1px solid var(--border);
                    border-radius: 1.1rem;
                    padding: 1.75rem;
                    display: flex; gap: 1.25rem; align-items: flex-start;
                    transition: transform 0.3s, box-shadow 0.3s, border-color 0.3s;
                  }
                  .ben-card:hover {
                    transform: translateX(6px);
                    border-color: var(--orange);
                    box-shadow: 0 8px 28px rgba(234,88,12,0.08);
                  }
                  .ben-icon {
                    width: 48px; height: 48px; border-radius: 0.875rem;
                    background: var(--orange-light);
                    border: 1px solid var(--orange-border);
                    display: flex; align-items: center; justify-content: center; flex-shrink: 0;
                  }
                  .ben-card:nth-child(2) .ben-icon { background: var(--green-light); border-color: #a7f3d0; }
                  .ben-card:nth-child(3) .ben-icon { background: var(--blue-light); border-color: #bfdbfe; }
                  .ben-card:nth-child(4) .ben-icon { background: #faf5ff; border-color: #e9d5ff; }
                  .ben-card h3 { font-family: 'Montserrat', system-ui; font-size: 0.95rem; font-weight: 700; color: var(--dark); margin-bottom: 0.35rem; }
                  .ben-card p { font-size: 0.88rem; line-height: 1.65; font-weight: 400; }

                  /* ---- CATEGORIES ---- */
                  section.categories { padding: 6rem 0; background: var(--off); }

                  .cat-grid {
                    display: grid; grid-template-columns: repeat(4,1fr); gap: 1rem;
                  }
                  @media(max-width:768px){ .cat-grid{ grid-template-columns:repeat(2,1fr); } }
                  @media(max-width:480px){ .cat-grid{ grid-template-columns:1fr; } }

                  .cat-card {
                    background: var(--white);
                    border: 1px solid var(--border);
                    border-radius: 1rem;
                    padding: 1.5rem 1.25rem;
                    text-align: center;
                    cursor: pointer;
                    transition: all 0.3s;
                    position: relative; overflow: hidden;
                  }
                  .cat-card::before {
                    content:''; position:absolute;
                    bottom:0; left:0; right:0; height:3px;
                    background: transparent;
                    transition: background 0.3s;
                  }
                  .cat-card:hover {
                    border-color: var(--orange-border);
                    box-shadow: 0 12px 32px rgba(234,88,12,0.08);
                    transform: translateY(-5px);
                  }
                  .cat-card:hover::before { background: var(--orange); }
                  .cat-icon {
                    width: 52px; height: 52px;
                    background: var(--orange-light);
                    border: 1px solid var(--orange-border);
                    border-radius: 0.875rem;
                    display: flex; align-items: center; justify-content: center;
                    margin: 0 auto 1rem;
                  }
                  .cat-name { font-size: 0.85rem; font-weight: 700; color: var(--dark); margin-bottom: 0.25rem; }
                  .cat-count { font-size: 0.72rem; color: var(--muted); font-weight: 500; }

                  /* ---- FINAL ---- */
                  section.final-section {
                    padding: 8rem 0 9rem;
                    text-align: center;
                    background: var(--white);
                    position: relative; overflow: hidden;
                  }
                  section.final-section::before {
                    content:''; position:absolute; top:50%; left:50%;
                    transform:translate(-50%,-50%);
                    width:700px; height:700px; border-radius:50%;
                    background: radial-gradient(circle, rgba(234,88,12,0.055) 0%, transparent 70%);
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
                    background: linear-gradient(120deg, var(--orange) 0%, var(--amber) 100%);
                    -webkit-background-clip: text; -webkit-text-fill-color: transparent;
                    background-clip: text; background-size: 200%;
                    animation: gradShift 4s ease-in-out infinite alternate;
                  }
                  @keyframes gradShift {
                    from { background-position: 0% 50%; }
                    to   { background-position: 100% 50%; }
                  }
                  .final-body {
                  font-family: 'Montserrat', system-ui;
                    font-size: 1.05rem; line-height: 1.85; max-width: 600px;
                    margin: 0 auto 3rem; color: var(--text); font-weight: 400;
                  }
                  .final-cta {
                    display: flex; justify-content: center; gap: 1rem; flex-wrap: wrap;
                  }
                  .btn-primary {
                    padding: 0.9rem 2rem;
                    background: var(--orange); color: white;
                    font-family: 'Montserrat', sans-serif;
                    font-size: 0.88rem; font-weight: 800;
                    border: none; border-radius: 0.625rem;
                    cursor: pointer; transition: all 0.2s;
                    letter-spacing: 0.02em;
                  }
                  .btn-primary:hover { background: #c2410c; transform: translateY(-2px); box-shadow: 0 8px 24px rgba(234,88,12,0.25); }
                  .btn-secondary {
                    padding: 0.9rem 2rem;
                    background: transparent; color: var(--dark);
                    font-family: 'Montserrat', sans-serif;
                    font-size: 0.88rem; font-weight: 700;
                    border: 1.5px solid var(--border); border-radius: 0.625rem;
                    cursor: pointer; transition: all 0.2s;
                  }
                  .btn-secondary:hover { border-color: var(--orange); color: var(--orange); }

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
                  <h1>Urusentra</h1>
                  <p>Marketplace</p>
                </div>
              </div>
              <div className="nav-links">
                <a href="/">Home</a>
                <a href="/pricing">Try it out</a>
              </div>
            </nav>


          <div className="hero">
            <div className="wrapper hero-inner">
              <div>
                <p className="hero-eyebrow">Global Supplier Network</p>
                <h1 className="text-left">Supplier<br/><em>Connection</em></h1>
                <p className="hero-body text-left">
                  Connect with <strong>suppliers worldwide</strong> through listings in our marketplace and get to see available products and materials. Get <strong>instant restock</strong> of products by eliminating time and cost of production — see <strong>hundreds of suppliers</strong> and their availability with the most <strong>competitive prices</strong> all in one place.
                </p>
                <div className="hero-stats">
                  <div className="stat-item">
                    <div className="stat-num">2,935<span>+</span></div>
                    <div className="stat-label">Active Suppliers</div>
                  </div>
                  <div className="stat-item">
                    <div className="stat-num">50<span>K+</span></div>
                    <div className="stat-label">Contractors Connected</div>
                  </div>
                  <div className="stat-item">
                    <div className="stat-num">48<span>h</span></div>
                    <div className="stat-label">Avg. Response Time</div>
                  </div>
                </div>
              </div>

              <div className="hero-diagram">
                <svg className="diagram-svg" viewBox="0 0 400 340">
                  <defs>
                    <filter id="sh-o"><feDropShadow dx="0" dy="4" stdDeviation="7" flood-color="#ea580c" flood-opacity="0.18"/></filter>
                    <filter id="sh-g"><feDropShadow dx="0" dy="4" stdDeviation="7" flood-color="#00b87a" flood-opacity="0.18"/></filter>
                    <filter id="sh-b"><feDropShadow dx="0" dy="4" stdDeviation="7" flood-color="#2355f5" flood-opacity="0.14"/></filter>
                    <marker id="arr" markerWidth="7" markerHeight="7" refX="5" refY="3.5" orient="auto">
                      <path d="M0,0 L7,3.5 L0,7 Z" fill="#fed7aa"/>
                    </marker>
                  </defs>

                  <line x1="200" y1="80" x2="200" y2="148" stroke="#fed7aa" strokeWidth="1.5" className="edge-pulse" marker-end="url(#arr)"/>

                  <line x1="174" y1="192" x2="60"  y2="258" stroke="#fed7aa" strokeWidth="1.5" className="edge-pulse delay1" marker-end="url(#arr)"/>
                  <line x1="185" y1="192" x2="138" y2="258" stroke="#fed7aa" strokeWidth="1.5" className="edge-pulse delay2" marker-end="url(#arr)"/>
                  <line x1="215" y1="192" x2="262" y2="258" stroke="#fed7aa" strokeWidth="1.5" className="edge-pulse delay3" marker-end="url(#arr)"/>
                  <line x1="226" y1="192" x2="340" y2="258" stroke="#fed7aa" strokeWidth="1.5" className="edge-pulse delay4" marker-end="url(#arr)"/>

                  <g className="node-contractor" filter="url(#sh-b)">
                    <rect x="138" y="24" width="124" height="56" rx="12" fill="#eef1ff" stroke="#2355f5" strokeWidth="1.5"/>
                    <text x="200" y="47" text-anchor="middle" fill="#2355f5" font-family="Montserrat,sans-serif" font-size="9" font-weight="800" letter-spacing="1.2">CONTRACTOR</text>
                    <text x="200" y="63" text-anchor="middle" fill="#8892a4" font-family="Montserrat,sans-serif" font-size="7" font-weight="500">Your Project Needs</text>
                  </g>

                  <g className="node-platform" filter="url(#sh-o)">
                    <rect x="130" y="148" width="140" height="56" rx="12" fill="#fff7ed" stroke="#ea580c" strokeWidth="2"/>
                    <text x="200" y="171" text-anchor="middle" fill="#ea580c" font-family="Montserrat,sans-serif" font-size="9" font-weight="800" letter-spacing="1.2">URUSENTRA</text>
                    <text x="200" y="187" text-anchor="middle" fill="#8892a4" font-family="Montserrat,sans-serif" font-size="7" font-weight="500">Supplier Marketplace</text>
                  </g>

                  <g className="node-s1" filter="url(#sh-g)">
                    <rect x="18" y="258" width="84" height="50" rx="10" fill="#e6f9f2" stroke="#00b87a" strokeWidth="1.5"/>
                    <text x="60" y="278" text-anchor="middle" fill="#00b87a" font-family="Montserrat,sans-serif" font-size="8" font-weight="800">LUMBER</text>
                    <text x="60" y="293" text-anchor="middle" fill="#8892a4" font-family="Montserrat,sans-serif" font-size="7" font-weight="500">245 suppliers</text>
                  </g>
                  <g className="node-s2" filter="url(#sh-g)">
                    <rect x="118" y="258" width="84" height="50" rx="10" fill="#e6f9f2" stroke="#00b87a" strokeWidth="1.5"/>
                    <text x="160" y="278" text-anchor="middle" fill="#00b87a" font-family="Montserrat,sans-serif" font-size="8" font-weight="800">STEEL</text>
                    <text x="160" y="293" text-anchor="middle" fill="#8892a4" font-family="Montserrat,sans-serif" font-size="7" font-weight="500">189 suppliers</text>
                  </g>
                  <g className="node-s3" filter="url(#sh-g)">
                    <rect x="218" y="258" width="84" height="50" rx="10" fill="#e6f9f2" stroke="#00b87a" strokeWidth="1.5"/>
                    <text x="260" y="278" text-anchor="middle" fill="#00b87a" font-family="Montserrat,sans-serif" font-size="8" font-weight="800">CONCRETE</text>
                    <text x="260" y="293" text-anchor="middle" fill="#8892a4" font-family="Montserrat,sans-serif" font-size="7" font-weight="500">156 suppliers</text>
                  </g>
                  <g className="node-s4" filter="url(#sh-g)">
                    <rect x="318" y="258" width="84" height="50" rx="10" fill="#e6f9f2" stroke="#00b87a" strokeWidth="1.5"/>
                    <text x="360" y="278" text-anchor="middle" fill="#00b87a" font-family="Montserrat,sans-serif" font-size="8" font-weight="800">MORE</text>
                    <text x="360" y="293" text-anchor="middle" fill="#8892a4" font-family="Montserrat,sans-serif" font-size="7" font-weight="500">2,300+ more</text>
                  </g>
                </svg>
              </div>
            </div>
          </div>

          <hr className="divider"/>

          <section className="how">
            <div className="wrapper">
              <div className="reveal">
                <div className="section-label">Process</div>
                <h2 className="section-title text-left">How Supplier Connection Works</h2>
                <p className="section-body text-left">From search to restock — the entire procurement workflow lives in one place, eliminating back-and-forth and reducing lead times dramatically.</p>
              </div>
              <div className="steps-grid reveal">
                <div className="step">
                  <div className="step-circle">
                    <span className="step-num">1</span>
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#ea580c" strokeWidth="2">
                      <circle cx="11" cy="11" r="8"/><path strokeLinecap="round" d="M21 21l-4.35-4.35"/>
                    </svg>
                  </div>
                  <h3>Search & Discover</h3>
                  <p style={{ fontFamily: 'Montserrat, system-ui' }}>Filter hundreds of suppliers by category, location, rating, and certifications.</p>
                </div>
                <div className="step">
                  <div className="step-circle">
                    <span className="step-num">2</span>
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#ea580c" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
                    </svg>
                  </div>
                  <h3>Compare Listings</h3>
                  <p style={{ fontFamily: 'Montserrat, system-ui' }}>View available products, pricing, minimum orders, and delivery coverage.</p>
                </div>
                <div className="step">
                  <div className="step-circle">
                    <span className="step-num">3</span>
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#ea580c" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
                    </svg>
                  </div>
                  <h3>Connect Instantly</h3>
                  <p style={{ fontFamily: 'Montserrat, system-ui' }}>Reach out directly with average supplier response times under 2 hours.</p>
                </div>
                <div className="step">
                  <div className="step-circle">
                    <span className="step-num">4</span>
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#ea580c" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                  </div>
                  <h3>Instant Restock</h3>
                  <p style={{ fontFamily: 'Montserrat, system-ui' }}>Place orders and track deliveries — materials arrive when your project needs them.</p>
                </div>
              </div>
            </div>
          </section>

          <hr className="divider"/>

          <section className="demo">
            <div className="wrapper">
              <div className="reveal">
                <div className="section-label">Live Marketplace</div>
                <h2 className="section-title text-left" style={{ color: 'var(--orange)' }}>Browse Suppliers</h2>
                <p className="section-body text-left">A live preview of how suppliers appear inside the Urusentra marketplace — filter, compare, and connect with the right partner for your project.</p>
              </div>

              <div className="demo-layout reveal">
                <aside>
                  <div className="filter-panel">
                    <div className="filter-header">
                      <h2>Filters</h2>
                      <button>Clear All</button>
                    </div>

                    <div className="filter-section">
                      <div className="filter-section-title">Category</div>
                      <div className="filter-row"><div className="cb checked"><svg width="10" height="10" viewBox="0 0 12 12"><path d="M2 6l3 3 5-5" stroke="white" strokeWidth="1.8" fill="none" strokeLinecap="round"/></svg></div><label>Lumber &amp; Wood</label><span className="count">(245)</span></div>
                      <div className="filter-row"><div className="cb"></div><label>Steel &amp; Metal</label><span className="count">(189)</span></div>
                      <div className="filter-row"><div className="cb"></div><label>Concrete &amp; Masonry</label><span className="count">(156)</span></div>
                      <div className="filter-row"><div className="cb"></div><label>Electrical</label><span className="count">(132)</span></div>
                      <div className="filter-row"><div className="cb"></div><label>Plumbing</label><span className="count">(98)</span></div>
                    </div>

                    <div className="filter-section">
                      <div className="filter-section-title">Location</div>
                      <div className="filter-row"><div className="cb checked"><svg width="10" height="10" viewBox="0 0 12 12"><path d="M2 6l3 3 5-5" stroke="white" strokeWidth="1.8" fill="none" strokeLinecap="round"/></svg></div><label>Within 50 miles</label></div>
                      <div className="filter-row"><div className="cb"></div><label>Within 100 miles</label></div>
                      <div className="filter-row"><div className="cb checked"><svg width="10" height="10" viewBox="0 0 12 12"><path d="M2 6l3 3 5-5" stroke="white" strokeWidth="1.8" fill="none" strokeLinecap="round"/></svg></div><label>Worldwide Shipping</label></div>
                    </div>

                    <div className="filter-section">
                      <div className="filter-section-title">Supplier Rating</div>
                      <div className="filter-row"><div className="cb"></div><label>★★★★★ 5.0</label></div>
                      <div className="filter-row"><div className="cb checked"><svg width="10" height="10" viewBox="0 0 12 12"><path d="M2 6l3 3 5-5" stroke="white" strokeWidth="1.8" fill="none" strokeLinecap="round"/></svg></div><label>★★★★ 4.0+</label></div>
                      <div className="filter-row"><div className="cb"></div><label>★★★ 3.0+</label></div>
                    </div>

                    <div className="filter-section">
                      <div className="filter-section-title">Certifications</div>
                      <div className="filter-row"><div className="cb"></div><label>ISO 9001</label></div>
                      <div className="filter-row"><div className="cb checked"><svg width="10" height="10" viewBox="0 0 12 12"><path d="M2 6l3 3 5-5" stroke="white" strokeWidth="1.8" fill="none" strokeLinecap="round"/></svg></div><label>FSC Certified</label></div>
                      <div className="filter-row"><div className="cb"></div><label>Licensed &amp; Insured</label></div>
                      <div className="filter-row"><div className="cb"></div><label>LEED Certified</label></div>
                    </div>

                    <div className="filter-cta">
                      <h3>LIST YOUR COMPANY</h3>
                      <p style={{ fontFamily: 'Montserrat, system-ui' }}>Connect with 50K+ contractors nationwide</p>
                      <button>Become a Supplier</button>
                    </div>
                  </div>
                </aside>

                <main className="cards-area">
                  <div className="cards-toolbar">
                    <div className="cards-toolbar-left">Showing <strong>2,935</strong> suppliers</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                      <span style={{ fontSize: '0.8rem', color: 'var(--muted)', fontWeight: 500 }}>Sort by:</span>
                      <select className="sort-select">
                        <option>Best Match</option>
                        <option>Highest Rated</option>
                        <option>Most Reviews</option>
                        <option>Nearest to Me</option>
                        <option>Competitive Price</option>
                      </select>
                    </div>
                  </div>

                  <div className="supplier-card featured">
                    <div className="card-inner">
                      <div className="card-logo"><span>TC</span></div>
                      <div className="card-body">
                        <div className="card-top">
                          <div>
                            <div className="card-name-row">
                              <span className="card-name">TimberCraft Lumber Sdn Bhd.</span>
                              <span className="badge-featured">Featured</span>
                              <span className="badge-verified">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="#2563eb">
                                  <path d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"/>
                                </svg>
                              </span>
                            </div>
                            <div className="card-meta">
                              <span>
                                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"/><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"/></svg>
                                Kajang, Kuala Lumpur
                              </span>
                              <span className="sep">|</span>
                              <span>Est. 1982 · 42 years in business</span>
                            </div>
                          </div>
                          <div className="card-rating">
                            <div className="stars">★★★★★</div>
                            <div className="rating-num">4.9</div>
                            <div className="review-count">1,247 reviews</div>
                          </div>
                        </div>
                        <p className="card-desc">Premium lumber supplier specializing in sustainably-sourced framing lumber, hardwoods, and custom milling services. Serving contractors and builders across Southeast Asia since 1982.</p>
                        <div className="card-tags">
                          <span className="tag">Framing Lumber</span>
                          <span className="tag">Hardwood</span>
                          <span className="tag">Custom Milling</span>
                          <span className="tag">FSC Certified</span>
                        </div>
                        <div className="card-footer">
                          <div className="card-details">
                            <span>
                              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#00b87a" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                              <strong>Response:</strong> 2 hours
                            </span>
                            <span>
                              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#2355f5" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"/></svg>
                              <strong>Ships to:</strong> Southeast Asia
                            </span>
                            <span><strong>Min Order:</strong> RM500</span>
                          </div>
                          <button className="card-action">View Supplier</button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="supplier-card">
                    <div className="card-inner">
                      <div className="card-logo" style={{ background: 'linear-gradient(135deg,#eff6ff,#dbeafe)', borderColor: '#bfdbfe' }}><span style={{ color: '#2355f5' }}>MS</span></div>
                      <div className="card-body">
                        <div className="card-top">
                          <div>
                            <div className="card-name-row">
                              <span className="card-name">MetaSteel Industries Bhd.</span>
                              <span className="badge-verified">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="#2563eb"><path d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"/></svg>
                              </span>
                            </div>
                            <div className="card-meta">
                              <span>
                                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"/><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"/></svg>
                                Shah Alam, Selangor
                              </span>
                              <span className="sep">|</span>
                              <span>Est. 1997 · 27 years in business</span>
                            </div>
                          </div>
                          <div className="card-rating">
                            <div className="stars">★★★★★</div>
                            <div className="rating-num">4.7</div>
                            <div className="review-count">892 reviews</div>
                          </div>
                        </div>
                        <p className="card-desc">Leading steel and structural metal supplier with nationwide delivery. Specialising in structural beams, rebar, roofing sheets, and custom fabrication for large-scale construction.</p>
                        <div className="card-tags">
                          <span className="tag">Structural Steel</span>
                          <span className="tag">Rebar</span>
                          <span className="tag">Custom Fabrication</span>
                          <span className="tag">ISO 9001</span>
                        </div>
                        <div className="card-footer">
                          <div className="card-details">
                            <span>
                              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#00b87a" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                              <strong>Response:</strong> 4 hours
                            </span>
                            <span>
                              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#2355f5" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"/></svg>
                              <strong>Ships to:</strong> Malaysia-wide
                            </span>
                            <span><strong>Min Order:</strong> RM1,200</span>
                          </div>
                          <button className="card-action">View Supplier</button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="supplier-card">
                    <div className="card-inner">
                      <div className="card-logo" style={{ background: 'linear-gradient(135deg,#f0fdf4,#dcfce7)', borderColor: '#a7f3d0' }}><span style={{ color: '#00b87a' }}>CP</span></div>
                      <div className="card-body">
                        <div className="card-top">
                          <div>
                            <div className="card-name-row">
                              <span className="card-name">ConcretePro Supply Co.</span>
                            </div>
                            <div className="card-meta">
                              <span>
                                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"/><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"/></svg>
                                Johor Bahru, Johor
                              </span>
                              <span className="sep">|</span>
                              <span>Est. 2005 · 19 years in business</span>
                            </div>
                          </div>
                          <div className="card-rating">
                            <div className="stars">★★★★</div>
                            <div className="rating-num">4.3</div>
                            <div className="review-count">514 reviews</div>
                          </div>
                        </div>
                        <p className="card-desc">Concrete and masonry supply specialists with same-day delivery available in Johor. Competitive bulk pricing for contractors, ready-mix concrete, blocks, and mortar systems.</p>
                        <div className="card-tags">
                          <span className="tag">Ready-Mix Concrete</span>
                          <span className="tag">Masonry Blocks</span>
                          <span className="tag">Bulk Pricing</span>
                        </div>
                        <div className="card-footer">
                          <div className="card-details">
                            <span>
                              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#00b87a" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                              <strong>Response:</strong> Same day
                            </span>
                            <span>
                              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#2355f5" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"/></svg>
                              <strong>Ships to:</strong> Johor region
                            </span>
                            <span><strong>Min Order:</strong> RM300</span>
                          </div>
                          <button className="card-action">View Supplier</button>
                        </div>
                      </div>
                    </div>
                  </div>

                </main>
              </div>
            </div>
          </section>

          <hr className="divider"/>

          <section className="categories">
            <div className="wrapper reveal">
              <div className="section-label">Browse by Category</div>
              <h2 className="section-title text-left">Find Suppliers by Material</h2>
              <p className="section-body text-left">Hundreds of verified suppliers organised across every construction material category — all with real-time product availability.</p>

              <div className="cat-grid">
                <div className="cat-card">
                  <div className="cat-icon">
                    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#ea580c" strokeWidth="1.8">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 9.776c.112-.017.227-.026.344-.026h15.812c.117 0 .232.009.344.026m-16.5 0a2.25 2.25 0 00-1.883 2.542l.857 6a2.25 2.25 0 002.227 1.932H19.05a2.25 2.25 0 002.227-1.932l.857-6a2.25 2.25 0 00-1.883-2.542m-16.5 0V6A2.25 2.25 0 016 3.75h3.879a1.5 1.5 0 011.06.44l2.122 2.12a1.5 1.5 0 001.06.44H18A2.25 2.25 0 0120.25 9v.776"/>
                    </svg>
                  </div>
                  <div className="cat-name">Lumber &amp; Wood</div>
                  <div className="cat-count">245 suppliers</div>
                </div>
                <div className="cat-card">
                  <div className="cat-icon">
                    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#ea580c" strokeWidth="1.8">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z"/>
                    </svg>
                  </div>
                  <div className="cat-name">Steel &amp; Metal</div>
                  <div className="cat-count">189 suppliers</div>
                </div>
                <div className="cat-card">
                  <div className="cat-icon">
                    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#ea580c" strokeWidth="1.8">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z"/>
                    </svg>
                  </div>
                  <div className="cat-name">Concrete &amp; Masonry</div>
                  <div className="cat-count">156 suppliers</div>
                </div>
                <div className="cat-card">
                  <div className="cat-icon">
                    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#ea580c" strokeWidth="1.8">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"/>
                    </svg>
                  </div>
                  <div className="cat-name">Electrical</div>
                  <div className="cat-count">132 suppliers</div>
                </div>
                <div className="cat-card">
                  <div className="cat-icon">
                    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#ea580c" strokeWidth="1.8">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.042 21.672L13.684 16.6m0 0l-2.51 2.225.569-9.47 5.227 7.917-3.286-.672zm-7.518-.267A8.25 8.25 0 1120.25 10.5M8.288 14.212A5.25 5.25 0 1117.25 10.5"/>
                    </svg>
                  </div>
                  <div className="cat-name">Plumbing</div>
                  <div className="cat-count">98 suppliers</div>
                </div>
                <div className="cat-card">
                  <div className="cat-icon">
                    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#ea580c" strokeWidth="1.8">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"/>
                    </svg>
                  </div>
                  <div className="cat-name">Roofing</div>
                  <div className="cat-count">87 suppliers</div>
                </div>
                <div className="cat-card">
                  <div className="cat-icon">
                    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#ea580c" strokeWidth="1.8">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z"/>
                    </svg>
                  </div>
                  <div className="cat-name">Finishing &amp; Paint</div>
                  <div className="cat-count">74 suppliers</div>
                </div>
                <div className="cat-card">
                  <div className="cat-icon">
                    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#ea580c" strokeWidth="1.8">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                  </div>
                  <div className="cat-name">View All Categories</div>
                  <div className="cat-count">2,935 total suppliers</div>
                </div>
              </div>
            </div>
          </section>

          <hr className="divider"/>

          <section className="benefits">
            <div className="wrapper reveal">
              <div className="section-label">Why Supplier Connection</div>
              <h2 className="section-title text-left" style={{ color: 'var(--orange)' }}>Industry Benefits</h2>
              <div className="benefits-grid">
                <div className="ben-card reveal">
                  <div className="ben-icon">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#ea580c" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253"/>
                    </svg>
                  </div>
                  <div>
                    <h3>Connect with Suppliers Worldwide</h3>
                    <p style={{ fontFamily: 'Montserrat, system-ui' }}>Access thousands of verified suppliers globally through a single marketplace, with real-time product and availability data.</p>
                  </div>
                </div>
                <div className="ben-card reveal" style={{ transitionDelay: '0.1s' }}>
                  <div className="ben-icon">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#00b87a" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"/>
                    </svg>
                  </div>
                  <div>
                    <h3>Instant Restock of Products</h3>
                    <p style={{ fontFamily: 'Montserrat, system-ui' }}>Eliminate production delays by connecting directly with suppliers for fast, competitive restocking of construction materials.</p>
                  </div>
                </div>
                <div className="ben-card reveal" style={{ transitionDelay: '0.2s' }}>
                  <div className="ben-icon">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#2355f5" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 14.25l6-6m4.5-3.493V21.75l-3.75-1.5-3.75 1.5-3.75-1.5-3.75 1.5V4.757c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0c1.1.128 1.907 1.077 1.907 2.185zM9.75 9h.008v.008H9.75V9zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm4.125 4.5h.008v.008h-.008V13.5zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"/>
                    </svg>
                  </div>
                  <div>
                    <h3>Most Competitive Prices</h3>
                    <p style={{ fontFamily: 'Montserrat, system-ui' }}>Compare pricing across hundreds of suppliers simultaneously to ensure you are always getting the best deal on every material.</p>
                  </div>
                </div>
                <div className="ben-card reveal" style={{ transitionDelay: '0.3s' }}>
                  <div className="ben-icon">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#7c3aed" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6"/>
                    </svg>
                  </div>
                  <div>
                    <h3>Eliminate Time &amp; Production Costs</h3>
                    <p style={{ fontFamily: 'Montserrat, system-ui' }}>Cut procurement overhead dramatically — no more manual sourcing, negotiating blindly, or waiting on callbacks from unknown vendors.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="final-section reveal">
            <div className="wrapper">
              <h2 className="final-title">One Platform.<br/><span>Hundreds of Suppliers.</span></h2>
              <p className="final-body">
                Supplier Connection transforms how contractors source materials — from reactive, time-consuming procurement into a streamlined, competitive, and intelligent supply chain. Find the right supplier, at the right price, at the right time.
              </p>
              <div className="final-cta">
                <button className="btn-primary">
                    <a href="/marketplace">Browse All Suppliers</a>
                </button>
                <button className="btn-secondary">
                    <a href="/marketplace">List Your Company</a>
                </button>
              </div>
            </div>
          </section>

        </div>
    );

};
export default SupplierFeature;

