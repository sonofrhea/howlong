import React, { useEffect } from "react";






function ReportsFeature() {


    useEffect(() => {
      const options = { threshold: 0.2 };

      const observer = new IntersectionObserver((entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;

          // 1. General Reveal
          if (e.target.classList.contains('reveal')) {
            e.target.classList.add('visible');
          }

          // 2. Financial Layout Bars (Income vs Expense)
          if (e.target.classList.contains('fin-layout')) {
            setTimeout(() => {
              const bars = {
                'ive-inc-jan': '53%', 'ive-exp-jan': '31%',
                'ive-inc-feb': '73%', 'ive-exp-feb': '44%',
                'ive-inc-mar': '100%', 'ive-exp-mar': '54%'
              };
              Object.entries(bars).forEach(([id, val]) => {
                const el = document.getElementById(id);
                if (el) el.style.width = val;
              });
            }, 300);
          }

          // 3. Project Progress Fills
          if (e.target.classList.contains('proj-grid')) {
            setTimeout(() => {
              ['pf1', 'pf2', 'pf3'].forEach((id, i) => {
                const el = document.getElementById(id);
                const widths = ['68%', '89%', '100%'];
                if (el) el.style.width = widths[i];
              });
            }, 300);
          }

          // 4. Dashboard Height Bars
          if (e.target.classList.contains('perf-panel')) {
            setTimeout(() => {
              const data = {
                'rb-jan-i': '54%', 'rb-jan-e': '31%',
                'rb-feb-i': '73%', 'rb-feb-e': '44%',
                'rb-mar-i': '100%', 'rb-mar-e': '54%',
                'rb-apr-i': '82%', 'rb-apr-e': '48%',
              };
              Object.entries(data).forEach(([id, h]) => {
                const el = document.getElementById(id);
                if (el) el.style.height = h;
              });
            }, 300);
          }
        });
      }, options);

      // Tell the observer what to watch
      const targets = document.querySelectorAll('.reveal, .fin-layout, .proj-grid, .perf-panel');
      targets.forEach((t) => observer.observe(t));

      return () => observer.disconnect();
    }, []);






    return (
        <div className="min-w-full">


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

                      --pu:        #6d28d9;
                      --pu-mid:    #8b5cf6;
                      --pu-light:  #f5f3ff;
                      --pu-border: #ddd6fe;

                      --em:        #059669;
                      --em-light:  #ecfdf5;
                      --em-border: #a7f3d0;

                      --blue:        #2355f5;
                      --blue-light:  #eef1ff;
                      --blue-border: #bfdbfe;

                      --sky:         #0284c7;
                      --sky-light:   #f0f9ff;
                      --sky-border:  #bae6fd;

                      --amber:       #d97706;
                      --amber-light: #fffbeb;
                      --amber-border:#fde68a;

                      --red:         #e8354a;
                      --red-light:   #fff0f2;
                      --red-border:  #fecaca;

                      --teal:        #0f766e;
                      --teal-light:  #f0fdfa;
                      --teal-border: #99f6e4;

                      --rose:        #be185d;
                      --rose-light:  #fdf2f8;
                      --rose-border: #fbcfe8;
                    }

                    *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
                    html{scroll-behavior:smooth}
                    body{background:var(--off);color:var(--text);font-family:'Montserrat',sans-serif;overflow-x:hidden}
                    .wrapper{max-width:1080px;margin:0 auto;padding:0 2.5rem}

                    /* NAV */
                    nav{ font-family: 'Montserrat', system-ui; position:sticky;top:0;z-index:100;background:rgba(255,255,255,.94);backdrop-filter:blur(14px);border-bottom:1px solid var(--border);padding:0 2.5rem;display:flex;align-items:center;justify-content:space-between;height:64px;animation:slideDown .55s ease forwards}
                    @keyframes slideDown{from{transform:translateY(-100%);opacity:0}to{transform:translateY(0);opacity:1}}
                    .nav-brand{display:flex;align-items:center;gap:.65rem}
                    .nav-icon{width:34px;height:34px;border-radius:8px;display:flex;align-items:center;justify-content:center}
                    .nav-titles h1{ text-align: left; font-family: 'Montserrat', system-ui; font-size:1.05rem;font-weight:800;letter-spacing:-.01em;color:var(--dark);line-height:1.1}
                    .nav-titles p{ font-family: 'Montserrat', system-ui; font-size:.58rem;font-weight:600;letter-spacing:.2em;text-transform:uppercase;color:var(--muted)}
                    .nav-links{ font-family: 'Montserrat', system-ui; display:flex;align-items:center;gap:1.75rem}
                    .nav-links a{ font-family: 'Montserrat', system-ui; font-size:.8rem;font-weight:600;color:#4b5563;text-decoration:none;transition:color .2s}
                    .nav-links a:hover,.nav-links a.active{color:var(--pu)}
                    .nav-dot{width:8px;height:8px;border-radius:50%;background:#00b87a;animation:blink 1.8s ease-in-out infinite}
                    @keyframes blink{0%,100%{opacity:1;box-shadow:0 0 7px #00b87a}50%{opacity:.2;box-shadow:none}}

                    /* BREADCRUMB */
                    .breadcrumb{ font-family: 'Montserrat', system-ui; background:var(--white);border-bottom:1px solid var(--border);padding:.75rem 2.5rem;display:flex;align-items:center;gap:.5rem;font-size:.78rem}
                    .breadcrumb a{color:var(--muted);text-decoration:none;font-weight:500;transition:color .2s}
                    .breadcrumb a:hover{color:var(--pu)}
                    .breadcrumb span{color:var(--dark);font-weight:700}

                    /* HERO */
                    .hero{ font-family: 'Montserrat', system-ui; background:var(--white);border-bottom:1px solid var(--border);padding:5.5rem 0 5rem;position:relative;overflow:hidden}
                    .hero::before{content:'';position:absolute;inset:0;background:radial-gradient(ellipse 900px 440px at 66% 50%,rgba(109,40,217,.05) 0%,transparent 70%);pointer-events:none}
                    .hero-inner{ font-family: 'Montserrat', system-ui;display:grid;grid-template-columns:1fr 1fr;gap:5rem;align-items:center}
                    @media(max-width:768px){.hero-inner{ font-family: 'Montserrat', system-ui; grid-template-columns:1fr;gap:3rem}}

                    .hero-eyebrow{ font-family: 'Montserrat', system-ui; font-size:.67rem;font-weight:700;letter-spacing:.24em;text-transform:uppercase;color:var(--pu);margin-bottom:1.1rem;display:flex;align-items:center;gap:.6rem;opacity:0;animation:fadeUp .65s .2s forwards}
                    .hero-eyebrow::before{ font-family: 'Montserrat', system-ui; content:'';display:block;width:1.8rem;height:2px;background:var(--pu);border-radius:2px}
                    .hero h1{ text-align: left; font-family: 'Montserrat', system-ui; font-size:clamp(2.5rem,5vw,4.2rem);font-weight:900;line-height:1.05;letter-spacing:-.025em;color:var(--dark);opacity:0;animation:fadeUp .65s .32s forwards}
                    .hero h1 em{ text-align: left; font-family: 'Montserrat', system-ui; font-style:normal;color:var(--pu)}
                    .hero-body{ text-align: left; font-family: 'Montserrat', system-ui; margin-top:1.8rem;font-size:1rem;font-weight:400;line-height:1.85;color:var(--text);opacity:0;animation:fadeUp .65s .46s forwards}
                    .hero-body strong{color:var(--dark);font-weight:700}
                    .hero-stats{margin-top:2.5rem;display:flex;gap:2.5rem;opacity:0;animation:fadeUp .65s .6s forwards}
                    .stat-num{font-size:1.8rem;font-weight:900;color:var(--dark);line-height:1;letter-spacing:-.03em}
                    .stat-num span{color:var(--pu)}
                    .stat-label{font-size:.72rem;font-weight:600;letter-spacing:.08em;text-transform:uppercase;color:var(--muted);margin-top:.2rem}
                    @keyframes fadeUp{from{opacity:0;transform:translateY(22px)}to{opacity:1;transform:translateY(0)}}

                    /* HERO CHART */
                    .hero-chart{display:flex;justify-content:center;align-items:center;opacity:0;animation:fadeUp .9s .65s forwards}

                    /* DIVIDER */
                    hr.divider{border:none;height:1px;background:linear-gradient(90deg,transparent,var(--border) 30%,var(--border) 70%,transparent)}

                    /* SECTION CHROME */
                    .section-label{ text-align: left; font-family: 'Montserrat', system-ui; font-size:.65rem;font-weight:700;letter-spacing:.22em;text-transform:uppercase;color:var(--muted);margin-bottom:.9rem;display:flex;align-items:center;gap:.6rem}
                    .section-label::before{content:'';display:block;width:1.5rem;height:2px;background:var(--border);border-radius:2px}
                    .section-title{ font-family: 'Montserrat', system-ui; text-align: left; font-size:clamp(1.9rem,3.5vw,2.8rem);font-weight:800;line-height:1.1;letter-spacing:-.02em;color:var(--dark);margin-bottom:1.2rem}
                    .section-body{ text-align: left; font-family: 'Montserrat', system-ui; font-size:1rem;line-height:1.8;max-width:640px;color:var(--text);margin-bottom:2.5rem;font-weight:400}
                    .section-body strong{ text-align: left; font-family: 'Montserrat', system-ui; color:var(--dark);font-weight:700}

                    /* REPORT CATEGORIES */
                    section.categories{ font-family: 'Montserrat', system-ui; padding:6rem 0;background:var(--white)}
                    .cat-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1.25rem}
                    @media(max-width:900px){.cat-grid{grid-template-columns:1fr 1fr}}
                    @media(max-width:500px){.cat-grid{grid-template-columns:1fr}}

                    .cat-card{background:var(--off);border:1px solid var(--border);border-radius:1.1rem;padding:2rem 1.75rem;position:relative;overflow:hidden;transition:all .3s;cursor:default}
                    .cat-card::before{content:'';position:absolute;top:0;left:0;right:0;height:4px;border-radius:4px 4px 0 0}
                    .cat-card:hover{transform:translateY(-6px);box-shadow:0 16px 40px rgba(0,0,0,.08);border-color:var(--mc)}
                    .cat-card.pu    {--mc:var(--pu);    --ml:var(--pu-light);    --mb:var(--pu-border)}
                    .cat-card.blue  {--mc:var(--blue);  --ml:var(--blue-light);  --mb:var(--blue-border)}
                    .cat-card.em    {--mc:var(--em);    --ml:var(--em-light);    --mb:var(--em-border)}
                    .cat-card.amber {--mc:var(--amber); --ml:var(--amber-light); --mb:var(--amber-border)}
                    .cat-card.sky   {--mc:var(--sky);   --ml:var(--sky-light);   --mb:var(--sky-border)}
                    .cat-card.teal  {--mc:var(--teal);  --ml:var(--teal-light);  --mb:var(--teal-border)}
                    .cat-card::before{background:var(--mc)}
                    .cat-icon{width:52px;height:52px;border-radius:1rem;background:var(--ml);border:1px solid var(--mb);display:flex;align-items:center;justify-content:center;margin-bottom:1.2rem}
                    .cat-card h3{ font-family: 'Montserrat', system-ui; font-size:.95rem;font-weight:800;color:var(--mc);margin-bottom:.6rem}
                    .cat-pills{display:flex;flex-wrap:wrap;gap:.4rem;margin-top:.9rem}
                    .cat-pill{padding:.22rem .65rem;background:var(--ml);border:1px solid var(--mb);border-radius:999px;font-size:.62rem;font-weight:700;color:var(--mc);letter-spacing:.04em}
                    .cat-card p{font-size:.82rem;line-height:1.65;font-weight:400}

                    /* FINANCIAL REPORTS LIVE */
                    section.financial{padding:6rem 0;background:var(--off)}
                    .fin-layout{display:grid;grid-template-columns:1fr 1.1fr;gap:2.5rem;align-items:start}
                    @media(max-width:768px){.fin-layout{grid-template-columns:1fr}}

                    /* TRIAL BALANCE */
                    .report-panel{background:var(--white);border:1px solid var(--border);border-radius:1.25rem;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,.05)}
                    .rp-header{background:var(--white);border-bottom:1px solid var(--border);padding:.9rem 1.5rem;display:flex;align-items:center;justify-content:space-between}
                    .rp-title-block{display:flex;align-items:center;gap:.8rem}
                    .rp-dots{display:flex;gap:.4rem}
                    .dot{width:11px;height:11px;border-radius:50%}
                    .dot.r{background:#ff5f57}.dot.y{background:#febc2e}.dot.g{background:#28c840}
                    .rp-name{font-size:.72rem;font-weight:700;letter-spacing:.1em;color:var(--muted);text-transform:uppercase}
                    .rp-period{font-size:.68rem;font-weight:700;color:var(--pu);background:var(--pu-light);border:1px solid var(--pu-border);border-radius:6px;padding:.2rem .6rem}

                    .rp-body{padding:1.25rem 1.5rem}
                    table.fin-table{width:100%;border-collapse:collapse}
                    table.fin-table th{font-size:.6rem;font-weight:800;letter-spacing:.14em;text-transform:uppercase;color:var(--muted);padding:.6rem .75rem;text-align:left;border-bottom:1px solid var(--border);background:var(--off)}
                    table.fin-table th:last-child,table.fin-table th:nth-last-child(2){text-align:right}
                    table.fin-table td{font-size:.8rem;font-weight:500;color:var(--text);padding:.6rem .75rem;border-bottom:1px solid var(--off);vertical-align:middle}
                    table.fin-table td:last-child,table.fin-table td:nth-last-child(2){text-align:right}
                    table.fin-table tr:hover td{background:var(--pu-light)}
                    .fin-acc-code{font-size:.68rem;font-weight:700;color:var(--pu);letter-spacing:.06em}
                    .fin-acc-name{font-size:.8rem;font-weight:600;color:var(--dark)}
                    .fin-dr{font-weight:800;color:var(--red)}
                    .fin-cr{font-weight:800;color:var(--em)}
                    .fin-total-row td{background:var(--pu-light)!important;font-weight:800;color:var(--dark);border-top:2px solid var(--pu-border)}
                    .fin-balance-check{padding:.85rem 1.5rem;display:flex;align-items:center;justify-content:space-between;background:var(--pu-light);border-top:1px solid var(--pu-border)}
                    .fbc-item{display:flex;align-items:center;gap:.5rem;font-size:.78rem;font-weight:700}

                    /* CHART PANEL */
                    .chart-panel{display:flex;flex-direction:column;gap:1.25rem}

                    .cp-card{background:var(--white);border:1px solid var(--border);border-radius:1.1rem;overflow:hidden}
                    .cp-card-header{padding:1rem 1.25rem;border-bottom:1px solid var(--border);display:flex;align-items:center;justify-content:space-between}
                    .cp-card-title{font-size:.78rem;font-weight:800;color:var(--dark)}
                    .cp-card-sub{font-size:.65rem;font-weight:600;color:var(--muted)}
                    .cp-card-body{padding:1.25rem}

                    /* BAR CHART */
                    .bar-chart{display:flex;align-items:flex-end;gap:.5rem;height:80px}
                    .bar-col{display:flex;flex-direction:column;align-items:center;gap:.35rem;flex:1}
                    .bar-fill{width:100%;border-radius:4px 4px 0 0;transition:height 1.2s cubic-bezier(.4,0,.2,1);min-height:3px}
                    .bar-label{font-size:.58rem;font-weight:700;color:var(--muted);text-transform:uppercase;letter-spacing:.04em}
                    .bar-val{font-size:.62rem;font-weight:800;color:var(--dark)}

                    /* DONUT */
                    .donut-wrap{display:flex;align-items:center;gap:1.5rem}
                    .donut-legend{flex:1}
                    .legend-item{display:flex;align-items:center;gap:.6rem;margin-bottom:.5rem;font-size:.78rem;font-weight:600;color:var(--text)}
                    .legend-dot{width:10px;height:10px;border-radius:50%;flex-shrink:0}

                    /* INCOME VS EXPENSE bars */
                    .ive-bars{display:flex;flex-direction:column;gap:.75rem}
                    .ive-row{display:flex;align-items:center;gap.75rem}
                    .ive-label{font-size:.72rem;font-weight:700;color:var(--muted);min-width:70px}
                    .ive-track{flex:1;height:8px;background:var(--off);border:1px solid var(--border);border-radius:999px;overflow:hidden;margin:0 .75rem}
                    .ive-fill{height:100%;border-radius:999px}
                    .ive-val{font-size:.72rem;font-weight:800;min-width:65px;text-align:right}

                    /* PROJECT SECTION */
                    section.project-sec{padding:6rem 0;background:var(--white)}
                    .proj-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1.25rem;margin-bottom:1.5rem}
                    @media(max-width:700px){.proj-grid{grid-template-columns:1fr}}

                    .proj-card{background:var(--off);border:1px solid var(--border);border-radius:1.1rem;padding:1.5rem;position:relative;overflow:hidden;transition:all .3s}
                    .proj-card:hover{border-color:var(--pu);transform:translateY(-5px);box-shadow:0 12px 32px rgba(0,0,0,.07)}
                    .proj-card-top{display:flex;align-items:flex-start;justify-content:space-between;margin-bottom:1rem}
                    .proj-tag{padding:.22rem .65rem;border-radius:999px;font-size:.62rem;font-weight:800;letter-spacing:.04em}
                    .proj-tag.active    {background:var(--em-light);color:var(--em);border:1px solid var(--em-border)}
                    .proj-tag.complete  {background:var(--blue-light);color:var(--blue);border:1px solid var(--blue-border)}
                    .proj-tag.onhold    {background:var(--amber-light);color:var(--amber);border:1px solid var(--amber-border)}
                    .proj-name{font-size:.9rem;font-weight:800;color:var(--dark);margin-bottom:.3rem}
                    .proj-client{font-size:.72rem;font-weight:600;color:var(--muted)}
                    .proj-progress-label{display:flex;justify-content:space-between;font-size:.68rem;font-weight:700;color:var(--muted);margin:.85rem 0 .4rem}
                    .proj-track{height:7px;background:var(--border);border-radius:999px;overflow:hidden}
                    .proj-fill{height:100%;border-radius:999px;background:linear-gradient(90deg,var(--pu),var(--pu-mid))}
                    .proj-fill.done{background:linear-gradient(90deg,var(--em),#34d399)}
                    .proj-metrics{display:grid;grid-template-columns:1fr 1fr;gap:.6rem;margin-top:.9rem}
                    .proj-metric{background:var(--white);border:1px solid var(--border);border-radius:.625rem;padding:.65rem .75rem}
                    .proj-metric-label{font-size:.58rem;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:var(--muted);margin-bottom:.2rem}
                    .proj-metric-val{font-size:.88rem;font-weight:900;color:var(--dark);letter-spacing:-.01em}

                    /* RECEIPTS */
                    section.receipts{padding:6rem 0;background:var(--off)}
                    .receipt-layout{display:grid;grid-template-columns:1fr 1fr;gap:2rem;align-items:start}
                    @media(max-width:768px){.receipt-layout{grid-template-columns:1fr}}

                    .receipt-doc{background:var(--white);border:1.5px solid var(--border);border-radius:1.25rem;overflow:hidden;box-shadow:0 8px 40px rgba(0,0,0,.07);position:relative}
                    .receipt-doc::before{content:'RECEIPT';position:absolute;top:50%;left:50%;transform:translate(-50%,-50%) rotate(-35deg);font-size:4.5rem;font-weight:900;letter-spacing:.2em;color:var(--pu);opacity:.04;pointer-events:none;white-space:nowrap}

                    .rec-header{background:linear-gradient(135deg,var(--pu) 0%,var(--pu-mid) 100%);padding:2rem;display:flex;justify-content:space-between;align-items:flex-start;position:relative;overflow:hidden}
                    .rec-header::before{content:'';position:absolute;top:-40px;right:-30px;width:140px;height:140px;border-radius:50%;background:rgba(255,255,255,.07)}
                    .rec-header::after{content:'';position:absolute;bottom:-30px;left:30%;width:90px;height:90px;border-radius:50%;background:rgba(255,255,255,.05)}
                    .rec-brand{display:flex;align-items:center;gap:.7rem}
                    .rec-logo{width:38px;height:38px;background:rgba(255,255,255,.2);border-radius:9px;display:flex;align-items:center;justify-content:center;border:1px solid rgba(255,255,255,.3)}
                    .rec-brand-name{font-size:1rem;font-weight:900;color:white}
                    .rec-brand-sub{font-size:.6rem;font-weight:600;letter-spacing:.14em;text-transform:uppercase;color:rgba(255,255,255,.6)}
                    .rec-ref-block{text-align:right}
                    .rec-ref{font-size:.95rem;font-weight:900;color:white;letter-spacing:.04em}
                    .rec-date{font-size:.68rem;font-weight:600;color:rgba(255,255,255,.65);margin-top:.2rem}
                    .rec-paid-stamp{margin-top:.8rem;display:inline-flex;align-items:center;gap:.4rem;background:rgba(255,255,255,.15);border:1px solid rgba(255,255,255,.3);border-radius:999px;padding:.3rem .9rem;font-size:.68rem;font-weight:800;color:white;letter-spacing:.08em}

                    .rec-body{padding:1.5rem 2rem}
                    .rec-row{display:flex;align-items:flex-start;justify-content:space-between;padding:.55rem 0;border-bottom:1px solid var(--off);font-size:.82rem}
                    .rec-row:last-child{border-bottom:none}
                    .rec-row .rl{font-weight:600;color:var(--muted)}
                    .rec-row .rr{font-weight:700;color:var(--dark);text-align:right}

                    .rec-amount-box{margin:1.25rem 2rem;background:var(--pu-light);border:1px solid var(--pu-border);border-radius:.875rem;padding:1.25rem;text-align:center}
                    .rab-label{font-size:.62rem;font-weight:700;letter-spacing:.16em;text-transform:uppercase;color:var(--pu);margin-bottom:.4rem}
                    .rab-amount{font-size:2.4rem;font-weight:900;color:var(--pu);letter-spacing:-.03em;line-height:1}
                    .rab-amount span{font-size:1rem;font-weight:600;color:var(--pu-mid);vertical-align:super;margin-right:3px}
                    .rab-inv{font-size:.72rem;font-weight:600;color:var(--muted);margin-top:.4rem}

                    .rec-footer{padding:.85rem 2rem;background:var(--off);border-top:1px solid var(--border);font-size:.72rem;font-weight:600;color:var(--muted);text-align:center}

                    /* RECEIPT TYPES GRID */
                    .rec-types{display:grid;grid-template-columns:1fr;gap:1rem}
                    .rec-type-card{background:var(--white);border:1px solid var(--border);border-radius:1rem;padding:1.25rem 1.5rem;display:flex;gap:1rem;align-items:flex-start;transition:all .3s}
                    .rec-type-card:hover{border-color:var(--pu);transform:translateX(6px);box-shadow:0 8px 28px rgba(109,40,217,.09)}
                    .rtc-icon{width:42px;height:42px;border-radius:.75rem;display:flex;align-items:center;justify-content:center;flex-shrink:0}
                    .rtc-icon.pu    {background:var(--pu-light);border:1px solid var(--pu-border)}
                    .rtc-icon.em    {background:var(--em-light);border:1px solid var(--em-border)}
                    .rtc-icon.blue  {background:var(--blue-light);border:1px solid var(--blue-border)}
                    .rtc-icon.amber {background:var(--amber-light);border:1px solid var(--amber-border)}
                    .rec-type-card h4{ font-family: 'Montserrat', system-ui; font-size:.88rem;font-weight:700;color:var(--dark);margin-bottom:.2rem}
                    .rec-type-card p{font-size:.8rem;line-height:1.6;font-weight:400}

                    /* PERFORMANCE SECTION */
                    section.performance{padding:6rem 0;background:var(--white)}
                    .perf-panel{background:var(--white);border:1px solid var(--border);border-radius:1.25rem;overflow:hidden;box-shadow:0 8px 40px rgba(0,0,0,.06)}
                    .perf-header{background:var(--white);border-bottom:1px solid var(--border);padding:.9rem 1.5rem;display:flex;align-items:center;gap:.45rem}
                    .perf-title{font-size:.7rem;font-weight:600;letter-spacing:.06em;color:var(--muted);margin-left:.6rem}

                    .perf-metrics{padding:1.5rem;display:grid;grid-template-columns:repeat(5,1fr);gap:1rem;border-bottom:1px solid var(--border)}
                    @media(max-width:700px){.perf-metrics{grid-template-columns:repeat(2,1fr)}}
                    .pfm{background:var(--off);border:1px solid var(--border);border-radius:.875rem;padding:1rem;position:relative;overflow:hidden}
                    .pfm::before{content:'';position:absolute;bottom:0;left:0;height:3px;width:100%}
                    .pfm.pu     {--pfmc:var(--pu)}
                    .pfm.em     {--pfmc:var(--em)}
                    .pfm.blue   {--pfmc:var(--blue)}
                    .pfm.amber  {--pfmc:var(--amber)}
                    .pfm.red    {--pfmc:var(--red)}
                    .pfm::before{background:var(--pfmc)}
                    .pfm-label{font-size:.58rem;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:var(--muted);margin-bottom:.45rem}
                    .pfm-val{font-size:1.4rem;font-weight:900;line-height:1;letter-spacing:-.02em;color:var(--pfmc)}
                    .pfm-prefix{font-size:.75rem;font-weight:600;color:var(--muted);vertical-align:super;margin-right:2px}
                    .pfm-delta{font-size:.65rem;font-weight:800;margin-top:.3rem}
                    .pfm-delta.up{color:var(--em)}
                    .pfm-delta.dn{color:var(--red)}

                    .perf-charts{padding:1.5rem;display:grid;grid-template-columns:1.4fr 1fr;gap:1.5rem}
                    @media(max-width:700px){.perf-charts{grid-template-columns:1fr}}

                    /* SVG BAR CHART BIG */
                    .chart-box{background:var(--off);border:1px solid var(--border);border-radius:.875rem;padding:1.25rem}
                    .chart-box-title{font-size:.65rem;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:var(--muted);margin-bottom:1rem}

                    /* BENEFITS */
                    section.benefits{padding:6rem 0;background:var(--off)}
                    .benefits-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:1.25rem}
                    @media(max-width:600px){.benefits-grid{grid-template-columns:1fr}}
                    .ben-card{background:var(--white);border:1px solid var(--border);border-radius:1.1rem;padding:1.75rem;display:flex;gap:1.25rem;align-items:flex-start;transition:transform .3s,box-shadow .3s,border-color .3s}
                    .ben-card:hover{transform:translateX(6px);border-color:var(--pu);box-shadow:0 8px 28px rgba(109,40,217,.09)}
                    .ben-icon{width:48px;height:48px;border-radius:.875rem;background:var(--pu-light);border:1px solid var(--pu-border);display:flex;align-items:center;justify-content:center;flex-shrink:0}
                    .ben-card:nth-child(2) .ben-icon{background:var(--em-light);border-color:var(--em-border)}
                    .ben-card:nth-child(3) .ben-icon{background:var(--blue-light);border-color:var(--blue-border)}
                    .ben-card:nth-child(4) .ben-icon{background:var(--amber-light);border-color:var(--amber-border)}
                    .ben-card h3{ font-family: 'Montserrat', system-ui; font-size:.95rem;font-weight:700;color:var(--dark);margin-bottom:.35rem}
                    .ben-card p{font-size:.88rem;line-height:1.65;font-weight:400}

                    /* FINAL */
                    section.final-section{padding:8rem 0 9rem;text-align:center;background:var(--white);position:relative;overflow:hidden}
                    section.final-section::before{content:'';position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:700px;height:700px;border-radius:50%;background:radial-gradient(circle,rgba(109,40,217,.055) 0%,transparent 70%);pointer-events:none}
                    .final-title{ font-family: 'Montserrat', system-ui; font-size:clamp(2.6rem,5.5vw,4.8rem);font-weight:900;line-height:1.05;letter-spacing:-.03em;color:var(--dark);margin-bottom:2rem}
                    .final-title span{ font-family: 'Montserrat', system-ui; background:linear-gradient(120deg,var(--pu) 0%,var(--pu-mid) 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;background-size:200%;animation:gradShift 4s ease-in-out infinite alternate}
                    @keyframes gradShift{from{background-position:0% 50%}to{background-position:100% 50%}}
                    .final-body{font-family: 'Montserrat', system-ui; font-size:1.05rem;line-height:1.85;max-width:600px;margin:0 auto 3rem;color:var(--text);font-weight:400}
                    .final-cta{display:flex;justify-content:center;gap:1rem;flex-wrap:wrap}
                    .btn-primary{padding:.9rem 2rem;background:var(--pu);color:white;font-family:'Montserrat',sans-serif;font-size:.88rem;font-weight:800;border:none;border-radius:.625rem;cursor:pointer;transition:all .2s;letter-spacing:.02em}
                    .btn-primary:hover{background:#5b21b6;transform:translateY(-2px);box-shadow:0 8px 24px rgba(109,40,217,.25)}
                    .btn-secondary{padding:.9rem 2rem;background:transparent;color:var(--dark);font-family:'Montserrat',sans-serif;font-size:.88rem;font-weight:700;border:1.5px solid var(--border);border-radius:.625rem;cursor:pointer;transition:all .2s}
                    .btn-secondary:hover{border-color:var(--pu);color:var(--pu)}

                    /* REVEAL */
                    .reveal{opacity:0;transform:translateY(28px);transition:opacity .65s ease,transform .65s ease}
                    .reveal.visible{opacity:1;transform:translateY(0)}
                `}
            </style>





            <nav>
              <div className="nav-brand">
                <div className="nav-icon">
                <svg className="w-9 h-9 text-orange-800" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z"/>
                </svg>
                </div>
                <div className="nav-titles"><h1>Urusentra</h1><p style={{ fontFamily: 'Montserrat, system-ui' }}>Reports, Analytics &amp; Receipts</p></div>
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
                  <p className="hero-eyebrow">Insight-Driven Decision Making</p>
                  <h1>Reports &amp;<br/><em>Receipts</em></h1>
                  <p className="hero-body">
                    Get <strong>charted insights</strong> into company performance, financial health, project profitability, and team productivity — all visualised in real-time. From <strong>Trial Balance</strong> to <strong>Cash Flow</strong>, from supplier summaries to payment receipts, every report you need is one click away.
                  </p>
                  <div className="hero-stats">
                    <div>
                      <div className="stat-num">5<span>+</span></div>
                      <div className="stat-label">Financial Reports</div>
                    </div>
                    <div>
                      <div className="stat-num">6<span>+</span></div>
                      <div className="stat-label">Report Categories</div>
                    </div>
                    <div>
                      <div className="stat-num">Live<span> </span></div>
                      <div className="stat-label">Chart Rendering</div>
                    </div>
                  </div>
                </div>


                <div className="hero-chart">
                  <svg viewBox="0 0 380 280" width="100%" style={{ maxWidth: '400px' }}>
                    <defs>
                      <filter id="sh-card"><feDropShadow dx="0" dy="4" stdDeviation="8" flood-color="#6d28d9" flood-opacity=".12"/></filter>
                      <linearGradient id="grad-pu" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stop-color="#6d28d9" stop-opacity=".9"/>
                        <stop offset="100%" stop-color="#8b5cf6" stop-opacity=".7"/>
                      </linearGradient>
                      <linearGradient id="grad-em" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stop-color="#059669" stop-opacity=".9"/>
                        <stop offset="100%" stop-color="#34d399" stop-opacity=".7"/>
                      </linearGradient>
                      <linearGradient id="grad-am" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stop-color="#d97706" stop-opacity=".9"/>
                        <stop offset="100%" stop-color="#fbbf24" stop-opacity=".7"/>
                      </linearGradient>
                      <linearGradient id="grad-bl" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stop-color="#2355f5" stop-opacity=".9"/>
                        <stop offset="100%" stop-color="#60a5fa" stop-opacity=".7"/>
                      </linearGradient>
                    </defs>


                    <rect x="10" y="10" width="360" height="260" rx="20" fill="white" stroke="#dde1ea" strokeWidth="1.5" filter="url(#sh-card)"/>


                    <rect x="10" y="10" width="360" height="52" rx="20" fill="#6d28d9"/>
                    <rect x="10" y="42" width="360" height="20" fill="#6d28d9"/>
                    <text x="30" y="38" fill="white" font-family="Montserrat,sans-serif" font-size="9" font-weight="800" letter-spacing="1.5">COMPANY PERFORMANCE</text>
                    <text x="300" y="38" fill="rgba(255,255,255,.6)" font-family="Montserrat,sans-serif" font-size="8" font-weight="600">Q1 2025</text>



                    <rect x="42"  y="170" width="28" height="58" rx="4" fill="url(#grad-pu)" className="hero-bar"/>
                    <rect x="42"  y="130" width="28" height="40" rx="4" fill="url(#grad-em)" className="hero-bar"/>

                    <rect x="94"  y="155" width="28" height="73" rx="4" fill="url(#grad-pu)" className="hero-bar"/>
                    <rect x="94"  y="115" width="28" height="40" rx="4" fill="url(#grad-em)" className="hero-bar"/>

                    <rect x="146" y="140" width="28" height="88" rx="4" fill="url(#grad-pu)" className="hero-bar"/>
                    <rect x="146" y="105" width="28" height="35" rx="4" fill="url(#grad-em)" className="hero-bar"/>

                    <rect x="198" y="150" width="28" height="78" rx="4" fill="url(#grad-pu)" className="hero-bar"/>
                    <rect x="198" y="112" width="28" height="38" rx="4" fill="url(#grad-em)" className="hero-bar"/>

                    <rect x="250" y="128" width="28" height="100" rx="4" fill="url(#grad-pu)" className="hero-bar"/>
                    <rect x="250" y="95"  width="28" height="33" rx="4" fill="url(#grad-em)" className="hero-bar"/>

                    <rect x="302" y="112" width="28" height="116" rx="4" fill="url(#grad-pu)" className="hero-bar"/>
                    <rect x="302" y="82"  width="28" height="30" rx="4" fill="url(#grad-em)" className="hero-bar"/>

                    <line x1="28" y1="228" x2="352" y2="228" stroke="#dde1ea" strokeWidth="1"/>

                    <text x="56"  y="240" text-anchor="middle" fill="#8892a4" font-family="Montserrat,sans-serif" font-size="7.5" font-weight="700">JAN</text>
                    <text x="108" y="240" text-anchor="middle" fill="#8892a4" font-family="Montserrat,sans-serif" font-size="7.5" font-weight="700">FEB</text>
                    <text x="160" y="240" text-anchor="middle" fill="#8892a4" font-family="Montserrat,sans-serif" font-size="7.5" font-weight="700">MAR</text>
                    <text x="212" y="240" text-anchor="middle" fill="#8892a4" font-family="Montserrat,sans-serif" font-size="7.5" font-weight="700">APR</text>
                    <text x="264" y="240" text-anchor="middle" fill="#8892a4" font-family="Montserrat,sans-serif" font-size="7.5" font-weight="700">MAY</text>
                    <text x="316" y="240" text-anchor="middle" fill="#8892a4" font-family="Montserrat,sans-serif" font-size="7.5" font-weight="700">JUN</text>

                    <rect x="28"  y="255" width="9" height="9" rx="2" fill="#6d28d9"/>
                    <text x="42"  y="263" fill="#3d4658" font-family="Montserrat,sans-serif" font-size="7.5" font-weight="700">Revenue</text>
                    <rect x="115" y="255" width="9" height="9" rx="2" fill="#059669"/>
                    <text x="129" y="263" fill="#3d4658" font-family="Montserrat,sans-serif" font-size="7.5" font-weight="700">Expenses</text>
                    <rect x="210" y="255" width="9" height="9" rx="2" fill="#d97706"/>
                    <text x="224" y="263" fill="#3d4658" font-family="Montserrat,sans-serif" font-size="7.5" font-weight="700">Profit</text>

                    <polyline points="56,148 108,133 160,118 212,126 264,108 316,95" fill="none" stroke="#d97706" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" stroke-dasharray="4 3"/>
                    <circle cx="56"  cy="148" r="3" fill="#d97706"/>
                    <circle cx="108" cy="133" r="3" fill="#d97706"/>
                    <circle cx="160" cy="118" r="3" fill="#d97706"/>
                    <circle cx="212" cy="126" r="3" fill="#d97706"/>
                    <circle cx="264" cy="108" r="3" fill="#d97706"/>
                    <circle cx="316" cy="95"  r="3.5" fill="#d97706"/>
                  </svg>
                </div>
              </div>
            </div>

            <hr className="divider"/>

            <section className="categories">
              <div className="wrapper">
                <div className="reveal">
                  <div className="section-label">Report Library</div>
                  <h2 className="section-title">Every Report. One Place.</h2>
                  <p className="section-body">Six categories of reports cover every corner of your business — from double-entry financials to project profitability, client aging, and supplier spend analysis.</p>
                </div>
                <div className="cat-grid">

                  <div className="cat-card pu reveal">
                    <div className="cat-icon"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#6d28d9" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z"/></svg></div>
                    <h3>Financial Reports</h3>
                    <p style={{ fontFamily: 'Montserrat, system-ui' }}>Core accounting statements generated directly from your live transaction data. Always up-to-date, always balanced.</p>
                    <div className="cat-pills">
                      <span className="cat-pill">Trial Balance</span>
                      <span className="cat-pill">General Ledger</span>
                      <span className="cat-pill">Balance Sheet</span>
                      <span className="cat-pill">Income Statement</span>
                      <span className="cat-pill">Cash Flow</span>
                    </div>
                  </div>

                  <div className="cat-card blue reveal" style={{ transitionDelay: '.08s' }}>
                    <div className="cat-icon"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2355f5" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"/></svg></div>
                    <h3>Customer Reports</h3>
                    <p style={{ fontFamily: 'Montserrat, system-ui' }}>Understand your client base — outstanding balances, payment history, aging analysis, and revenue per client.</p>
                    <div className="cat-pills">
                      <span className="cat-pill">Aging Analysis</span>
                      <span className="cat-pill">Payment History</span>
                      <span className="cat-pill">Revenue by Client</span>
                      <span className="cat-pill">Outstanding</span>
                    </div>
                  </div>

                  <div className="cat-card em reveal" style={{ transitionDelay: '.16s' }}>
                    <div className="cat-icon"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"/></svg></div>
                    <h3>Supplier Reports</h3>
                    <p style={{ fontFamily: 'Montserrat, system-ui' }}>Track purchase volumes, outstanding payables, payment compliance, and supplier performance across all projects.</p>
                    <div className="cat-pills">
                      <span className="cat-pill">Payables Aging</span>
                      <span className="cat-pill">Purchase Volume</span>
                      <span className="cat-pill">Payment Status</span>
                      <span className="cat-pill">Spend by Supplier</span>
                    </div>
                  </div>

                  <div className="cat-card amber reveal" style={{ transitionDelay: '.24s' }}>
                    <div className="cat-icon"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#d97706" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z"/></svg></div>
                    <h3>Project Reports</h3>
                    <p style={{ fontFamily: 'Montserrat, system-ui' }}>Profitability, budget vs actual, timeline adherence, and cost-per-project breakdowns across your entire portfolio.</p>
                    <div className="cat-pills">
                      <span className="cat-pill">Profitability</span>
                      <span className="cat-pill">Budget vs Actual</span>
                      <span className="cat-pill">Cost Breakdown</span>
                      <span className="cat-pill">Progress Tracking</span>
                    </div>
                  </div>

                  <div className="cat-card sky reveal" style={{ transitionDelay: '.32s' }}>
                    <div className="cat-icon"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0284c7" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 2.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125m0 4.5c0 2.278 3.694 4.125 8.25 4.125s8.25-1.847 8.25-4.125"/></svg></div>
                    <h3>Product Reports</h3>
                    <p style={{ fontFamily: 'Montserrat, system-ui' }}>Inventory usage, top-selling items, price history, and stock movement tied to purchase orders and project consumption.</p>
                    <div className="cat-pills">
                      <span className="cat-pill">Usage Summary</span>
                      <span className="cat-pill">Top Items</span>
                      <span className="cat-pill">Price History</span>
                      <span className="cat-pill">Stock Movement</span>
                    </div>
                  </div>

                  <div className="cat-card teal reveal" style={{ transitionDelay: '.4s' }}>
                    <div className="cat-icon"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0f766e" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z"/></svg></div>
                    <h3>Purchases Reports</h3>
                    <p style={{ fontFamily: 'Montserrat, system-ui' }}>Purchase order totals, supplier invoice matching, payment voucher summaries, and procurement spend by period.</p>
                    <div className="cat-pills">
                      <span className="cat-pill">PO Summary</span>
                      <span className="cat-pill">Invoice Matching</span>
                      <span className="cat-pill">Spend by Period</span>
                      <span className="cat-pill">Voucher Totals</span>
                    </div>
                  </div>

                </div>
              </div>
            </section>

            <hr className="divider"/>



            <section className="financial">
              <div className="wrapper">
                <div className="reveal">
                  <div className="section-label">Financial Reports — Live Preview</div>
                  <h2 className="section-title" style={{ color: 'var(--pu)' }}>Trial Balance &amp; Visual Insights</h2>
                  <p className="section-body">Financial reports pull directly from your live Chart of Accounts, Journal Entries, and Income &amp; Expenses records. Every figure reconciles with your accounting data automatically.</p>
                </div>
                <div className="fin-layout reveal">


                  <div className="report-panel">
                    <div className="rp-header">
                      <div className="rp-title-block">
                        <div className="rp-dots"><span className="dot r"></span><span className="dot y"></span><span className="dot g"></span></div>
                        <span className="rp-name">Trial Balance</span>
                      </div>
                      <span className="rp-period">March 2025</span>
                    </div>
                    <div className="rp-body">
                      <table className="fin-table">
                        <thead><tr><th>Code</th><th>Account</th><th>Debit</th><th>Credit</th></tr></thead>
                        <tbody>
                          <tr>
                            <td><span className="fin-acc-code">1000</span></td>
                            <td><span className="fin-acc-name">Cash &amp; Bank</span></td>
                            <td className="fin-dr">62,400</td><td>—</td>
                          </tr>
                          <tr>
                            <td><span className="fin-acc-code">1200</span></td>
                            <td><span className="fin-acc-name">Accounts Receivable</span></td>
                            <td className="fin-dr">91,250</td><td>—</td>
                          </tr>
                          <tr>
                            <td><span className="fin-acc-code">2100</span></td>
                            <td><span className="fin-acc-name">Accounts Payable</span></td>
                            <td>—</td><td className="fin-cr">38,600</td>
                          </tr>
                          <tr>
                            <td><span className="fin-acc-code">3000</span></td>
                            <td><span className="fin-acc-name">Owner's Equity</span></td>
                            <td>—</td><td className="fin-cr">85,000</td>
                          </tr>
                          <tr>
                            <td><span className="fin-acc-code">4001</span></td>
                            <td><span className="fin-acc-name">Project Revenue</span></td>
                            <td>—</td><td className="fin-cr">148,200</td>
                          </tr>
                          <tr>
                            <td><span className="fin-acc-code">5001</span></td>
                            <td><span className="fin-acc-name">Cost of Materials</span></td>
                            <td className="fin-dr">68,150</td><td>—</td>
                          </tr>
                          <tr>
                            <td><span className="fin-acc-code">5100</span></td>
                            <td><span className="fin-acc-name">Labour &amp; Wages</span></td>
                            <td className="fin-dr">50,000</td><td>—</td>
                          </tr>
                          <tr className="fin-total-row">
                            <td colSpan={2}><strong>Totals</strong></td>
                            <td><strong>271,800</strong></td>
                            <td><strong>271,800</strong></td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <div className="fin-balance-check">
                      <div className="fbc-item"><span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--red)', display: 'inline-block' }}></span>Total Debit: <strong style={{ color: 'var(--red)' }}>RM 271,800</strong></div>
                      <div className="fbc-item"><span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--em)', display: 'inline-block' }}></span>Total Credit: <strong style={{ color: 'var(--em)' }}>RM 271,800</strong></div>
                      <div className="fbc-item" style={{ color: 'var(--pu)' }}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                        <strong>Balanced</strong>
                      </div>
                    </div>
                  </div>


                  <div className="chart-panel">


                    <div className="cp-card">
                      <div className="cp-card-header">
                        <div>
                          <div className="cp-card-title">Income vs Expenses</div>
                          <div className="cp-card-sub">Q1 2025 · Monthly Breakdown</div>
                        </div>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#6d28d9" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941"/></svg>
                      </div>
                      <div className="cp-card-body">
                        <div className="ive-bars">
                          <div style={{ display: 'flex', alignItems: 'center', gap: '.5rem' }}>
                            <span className="ive-label">Jan</span>
                            <div className="ive-track"><div className="ive-fill" id="ive-inc-jan" style={{ width: '0%', background: 'var(--pu)', height: '100%', borderRadius: '999px' }}></div></div>
                            <span className="ive-val" style={{ color: 'var(--pu)' }}>RM 38K</span>
                          </div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '.5rem' }}>
                            <span className="ive-label" style={{ minWidth: '70px', fontSize: '.72rem', fontWeight: 700, color: 'var(--muted)' }}></span>
                            <div className="ive-track"><div className="ive-fill" id="ive-exp-jan" style={{ width: '0%', background: 'var(--red)', height: '100%', borderRadius: '999px' }}></div></div>
                            <span className="ive-val" style={{ color: 'var(--red)' }}>RM 22K</span>
                          </div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '.5rem' }}>
                            <span className="ive-label">Feb</span>
                            <div className="ive-track"><div className="ive-fill" id="ive-inc-feb" style={{ width: '0%', background: 'var(--pu)', height: '100%', borderRadius: '999px' }}></div></div>
                            <span className="ive-val" style={{ color: 'var(--pu)' }}>RM 52K</span>
                          </div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '.5rem' }}>
                            <span className="ive-label" style={{ minWidth: '70px', fontSize: '.72rem', fontWeight: 700, color: 'var(--muted)' }}></span>
                            <div className="ive-track"><div className="ive-fill" id="ive-exp-feb" style={{ width: '0%', background: 'var(--red)', height: '100%', borderRadius: '999px' }}></div></div>
                            <span className="ive-val" style={{ color: 'var(--red)' }}>RM 31K</span>
                          </div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '.5rem' }}>
                            <span className="ive-label">Mar</span>
                            <div className="ive-track"><div className="ive-fill" id="ive-inc-mar" style={{ width: '0%', background: 'var(--pu)', height: '100%', borderRadius: '999px' }}></div></div>
                            <span className="ive-val" style={{ color: 'var(--pu)' }}>RM 71K</span>
                          </div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '.5rem' }}>
                            <span className="ive-label" style={{ minWidth: '70px', fontSize: '.72rem', fontWeight: 700, color: 'var(--muted)' }}></span>
                            <div className="ive-track"><div className="ive-fill" id="ive-exp-mar" style={{ width: '0%', background: 'var(--red)', height: '100%', borderRadius: '999px' }}></div></div>
                            <span className="ive-val" style={{ color: 'var(--red)' }}>RM 38K</span>
                          </div>
                        </div>
                      </div>
                    </div>


                    <div className="cp-card">
                      <div className="cp-card-header">
                        <div>
                          <div className="cp-card-title">Revenue by Category</div>
                          <div className="cp-card-sub">March 2025 · Total: RM 148,200</div>
                        </div>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#6d28d9" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6a7.5 7.5 0 107.5 7.5h-7.5V6z"/><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 10.5H21A7.5 7.5 0 0013.5 3v7.5z"/></svg>
                      </div>
                      <div className="cp-card-body">
                        <div className="donut-wrap">
                          <svg viewBox="0 0 80 80" width="80" height="80" style={{ flexShrink: 0 }}>
                            <circle cx="40" cy="40" r="28" fill="none" stroke="#eef1ff" strokeWidth="14"/>
                            <circle cx="40" cy="40" r="28" fill="none" stroke="#6d28d9" strokeWidth="14" stroke-dasharray="88 88" stroke-dashoffset="0" strokeLinecap="round" transform="rotate(-90 40 40)"/>
                            <circle cx="40" cy="40" r="28" fill="none" stroke="#059669" strokeWidth="14" stroke-dasharray="53 123" stroke-dashoffset="-88" strokeLinecap="round" transform="rotate(-90 40 40)"/>
                            <circle cx="40" cy="40" r="28" fill="none" stroke="#d97706" strokeWidth="14" stroke-dasharray="28 148" stroke-dashoffset="-141" strokeLinecap="round" transform="rotate(-90 40 40)"/>
                            <circle cx="40" cy="40" r="28" fill="none" stroke="#0284c7" strokeWidth="14" stroke-dasharray="7 169" stroke-dashoffset="-169" strokeLinecap="round" transform="rotate(-90 40 40)"/>
                          </svg>
                          <div className="donut-legend">
                            <div className="legend-item"><span className="legend-dot" style={{ background: 'var(--pu)' }}></span>Project Billing <strong style={{ marginLeft: 'auto', color: 'var(--dark)' }}>59%</strong></div>
                            <div className="legend-item"><span className="legend-dot" style={{ background: 'var(--em)' }}></span>Material Sales <strong style={{ marginLeft: 'auto', color: 'var(--dark)' }}>36%</strong></div>
                            <div className="legend-item"><span className="legend-dot" style={{ background: 'var(--amber)' }}></span>Consultation <strong style={{ marginLeft: 'auto', color: 'var(--dark)' }}>19%</strong></div>
                            <div className="legend-item"><span className="legend-dot" style={{ background: 'var(--sky)' }}></span>Other <strong style={{ marginLeft: 'auto', color: 'var(--dark)' }}>5%</strong></div>
                          </div>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            </section>

            <hr className="divider"/>



            <section className="project-sec">
              <div className="wrapper">
                <div className="reveal">
                  <div className="section-label">Project Intelligence</div>
                  <h2 className="section-title" style={{ color: 'var(--amber)' }}>Project Performance Reports</h2>
                  <p className="section-body">Know exactly which projects are profitable, which are on track, and where costs are running over. Real-time budget vs actual comparison for every project in your portfolio.</p>
                </div>
                <div className="proj-grid reveal">

                  <div className="proj-card">
                    <div className="proj-card-top">
                      <div>
                        <div className="proj-name">Taman Impian — Block A</div>
                        <div className="proj-client">Binaan Maju Sdn Bhd.</div>
                      </div>
                      <span className="proj-tag active">Active</span>
                    </div>
                    <div className="proj-progress-label"><span>Budget Utilisation</span><span style={{ color: 'var(--pu)', fontWeight: 800 }}>68%</span></div>
                    <div className="proj-track"><div className="proj-fill" id="pf1" style={{ width: '0%' }}></div></div>
                    <div className="proj-metrics">
                      <div className="proj-metric"><div className="proj-metric-label">Budget</div><div className="proj-metric-val">RM 420K</div></div>
                      <div className="proj-metric"><div className="proj-metric-label">Spent</div><div className="proj-metric-val" style={{ color: 'var(--pu)' }}>RM 286K</div></div>
                      <div className="proj-metric"><div className="proj-metric-label">Revenue</div><div className="proj-metric-val" style={{ color: 'var(--em)' }}>RM 318K</div></div>
                      <div className="proj-metric"><div className="proj-metric-label">Margin</div><div className="proj-metric-val" style={{ color: 'var(--em)' }}>+11.2%</div></div>
                    </div>
                  </div>

                  <div className="proj-card">
                    <div className="proj-card-top">
                      <div>
                        <div className="proj-name">Kuala Lumpur Highway Extension</div>
                        <div className="proj-client">JKR Malaysia</div>
                      </div>
                      <span className="proj-tag active">Active</span>
                    </div>
                    <div className="proj-progress-label"><span>Budget Utilisation</span><span style={{ color: 'var(--amber)', fontWeight: 800 }}>89%</span></div>
                    <div className="proj-track"><div className="proj-fill" id="pf2" style={{ width: '0%', background: 'linear-gradient(90deg,var(--amber),#fbbf24)' }}></div></div>
                    <div className="proj-metrics">
                      <div className="proj-metric"><div className="proj-metric-label">Budget</div><div className="proj-metric-val">RM 1.2M</div></div>
                      <div className="proj-metric"><div className="proj-metric-label">Spent</div><div className="proj-metric-val" style={{ color: 'var(--amber)' }}>RM 1.07M</div></div>
                      <div className="proj-metric"><div className="proj-metric-label">Revenue</div><div className="proj-metric-val" style={{ color: 'var(--em)' }}>RM 1.15M</div></div>
                      <div className="proj-metric"><div className="proj-metric-label">Margin</div><div className="proj-metric-val" style={{ color: 'var(--amber)' }}>+7.5%</div></div>
                    </div>
                  </div>

                  <div className="proj-card">
                    <div className="proj-card-top">
                      <div>
                        <div className="proj-name">Setia Alam Commercial Block</div>
                        <div className="proj-client">Setia Group Bhd.</div>
                      </div>
                      <span className="proj-tag complete">Complete</span>
                    </div>
                    <div className="proj-progress-label"><span>Budget Utilisation</span><span style={{ color: 'var(--em)', fontWeight: 800 }}>100%</span></div>
                    <div className="proj-track"><div className="proj-fill done" id="pf3" style={{ width: '0%' }}></div></div>
                    <div className="proj-metrics">
                      <div className="proj-metric"><div className="proj-metric-label">Budget</div><div className="proj-metric-val">RM 680K</div></div>
                      <div className="proj-metric"><div className="proj-metric-label">Spent</div><div className="proj-metric-val" style={{ color: 'var(--em)' }}>RM 648K</div></div>
                      <div className="proj-metric"><div className="proj-metric-label">Revenue</div><div className="proj-metric-val" style={{ color: 'var(--em)' }}>RM 720K</div></div>
                      <div className="proj-metric"><div className="proj-metric-label">Margin</div><div className="proj-metric-val" style={{ color: 'var(--em)' }}>+11.1%</div></div>
                    </div>
                  </div>

                </div>
              </div>
            </section>

            <hr className="divider"/>



            <section className="receipts">
              <div className="wrapper">
                <div className="reveal">
                  <div className="section-label">Payment Receipts</div>
                  <h2 className="section-title" style={{ color: 'var(--pu)' }}>Instant, Branded Receipts</h2>
                  <p className="section-body">Every payment collected generates a professional, printable receipt — linked to the original invoice, stamped with payment method and date, and ready to share with your client.</p>
                </div>
                <div className="receipt-layout reveal">


                  <div className="receipt-doc">
                    <div className="rec-header">
                      <div className="rec-brand">
                        <div className="rec-logo"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg></div>
                        <div><div className="rec-brand-name">Urusentra</div><div className="rec-brand-sub">Payment Receipt</div></div>
                      </div>
                      <div className="rec-ref-block">
                        <div className="rec-ref">PAY-0081</div>
                        <div className="rec-date">11 March 2025 · 14:32</div>
                        <div style={{ marginTop: '.5rem' }}>
                          <span className="rec-paid-stamp">
                            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                            PAYMENT RECEIVED
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="rec-amount-box">
                      <div className="rab-label">Amount Received</div>
                      <div className="rab-amount"><span>RM</span><span id="rec-amt">20,000.00</span></div>
                      <div className="rab-inv">Against Invoice: <strong style={{ color: 'var(--pu)' }}>INV-2025-0028</strong> · Total: RM 63,038.20</div>
                    </div>

                    <div className="rec-body">
                      <div className="rec-row"><span className="rl">Received From</span><span className="rr">Ahmad Lutfi Bin Razak<br/><span style={{ fontSize: '.7rem', color: 'var(--pu)', fontWeight: 600 }}>CV-2025-00142</span></span></div>
                      <div className="rec-row"><span className="rl">Company</span><span className="rr">Binaan Maju Sdn Bhd.</span></div>
                      <div className="rec-row"><span className="rl">Project</span><span className="rr">PRJ-2025-007 — Block A</span></div>
                      <div className="rec-row"><span className="rl">Payment Method</span><span className="rr"><span style={{ padding: '.2rem .6rem', background: 'var(--em-light)', border: '1px solid var(--em-border)', borderRadius: '999px', fontSize: '.68rem', fontWeight: 800, color: 'var(--em)' }}>Cash</span></span></div>
                      <div className="rec-row"><span className="rl">Received In</span><span className="rr">1000 — Main Bank Account</span></div>
                      <div className="rec-row"><span className="rl">Outstanding After</span><span className="rr" style={{ color: 'var(--red)', fontWeight: 800 }}>RM 43,038.20</span></div>
                      <div className="rec-row"><span className="rl">Agent</span><span className="rr">Hakim Razali</span></div>
                    </div>
                    <div className="rec-footer">This receipt is system-generated and valid without a signature · Urusentra ERP · urusentra.com</div>
                  </div>


                  <div className="rec-types">
                    <div className="rec-type-card">
                      <div className="rtc-icon pu"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#6d28d9" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z"/></svg></div>
                      <div>
                        <h4>Invoice Payment Receipt</h4>
                        <p style={{ fontFamily: 'Montserrat, system-ui' }}>Auto-generated on every payment collected. Shows amount paid, method, balance outstanding, and the originating invoice reference.</p>
                      </div>
                    </div>
                    <div className="rec-type-card">
                      <div className="rtc-icon em"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"/></svg></div>
                      <div>
                        <h4>Refund Receipt</h4>
                        <p style={{ fontFamily: 'Montserrat, system-ui' }}>Issued when a customer credit note triggers a refund. Records amount returned, payment type, and outstanding balance after refund.</p>
                      </div>
                    </div>
                    <div className="rec-type-card">
                      <div className="rtc-icon blue"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2355f5" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21"/></svg></div>
                      <div>
                        <h4>Receipt Voucher Copy</h4>
                        <p style={{ fontFamily: 'Montserrat, system-ui' }}>A formatted copy of the Receipt Voucher for the customer file — including special treatment discount breakdown and tax calculation.</p>
                      </div>
                    </div>
                    <div className="rec-type-card">
                      <div className="rtc-icon amber"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#d97706" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"/></svg></div>
                      <div>
                        <h4>Settlement Confirmation</h4>
                        <p style={{ fontFamily: 'Montserrat, system-ui' }}>Issued automatically when a Post Customer Payment hits zero outstanding — confirming full settlement of the invoice to the client.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <hr className="divider"/>



            <section className="performance">
              <div className="wrapper">
                <div className="reveal">
                  <div className="section-label">Company Performance Dashboard</div>
                  <h2 className="section-title" style={{ color: 'var(--pu)' }}>Your Business. At a Glance.</h2>
                  <p className="section-body">The performance dashboard aggregates data across every module — sales, purchases, projects, and cash flow — into a single real-time view that updates with every transaction saved.</p>
                </div>
                <div className="perf-panel reveal">
                  <div className="perf-header">
                    <span className="dot r"></span><span className="dot y"></span><span className="dot g"></span>
                    <span className="perf-title">COMPANY_DASHBOARD — Syarikat Bina Jaya — Live · March 2025</span>
                  </div>
                  <div className="perf-metrics">
                    <div className="pfm pu">
                      <div className="pfm-label">Total Revenue</div>
                      <div className="pfm-val"><span className="pfm-prefix">RM</span><span id="d-rev">148,200</span></div>
                      <div className="pfm-delta up">▲ +24% vs Feb</div>
                    </div>
                    <div className="pfm em">
                      <div className="pfm-label">Net Profit</div>
                      <div className="pfm-val"><span className="pfm-prefix">RM</span><span id="d-profit">32,450</span></div>
                      <div className="pfm-delta up">▲ +18% vs Feb</div>
                    </div>
                    <div className="pfm blue">
                      <div className="pfm-label">Collected</div>
                      <div className="pfm-val"><span className="pfm-prefix">RM</span><span id="d-col">91,250</span></div>
                      <div className="pfm-delta up">▲ +31% vs Feb</div>
                    </div>
                    <div className="pfm amber">
                      <div className="pfm-label">Outstanding</div>
                      <div className="pfm-val"><span className="pfm-prefix">RM</span><span id="d-os">56,950</span></div>
                      <div className="pfm-delta dn">▼ Receivables</div>
                    </div>
                    <div className="pfm red">
                      <div className="pfm-label">Total Expenses</div>
                      <div className="pfm-val"><span className="pfm-prefix">RM</span><span id="d-exp">115,750</span></div>
                      <div className="pfm-delta dn">▼ Outflow</div>
                    </div>
                  </div>

                  <div className="perf-charts">

                    <div className="chart-box">
                      <div className="chart-box-title">Monthly Revenue vs Expenses — 2025</div>
                      <div style={{ flex: 1, background: '#f3f4f6', borderRadius: '3px 3px 0 0', height: '10%' }}>
                        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '.35rem' }}>
                          <span style={{ fontSize: '.6rem', fontWeight: 800, color: 'var(--pu)' }}>38K</span>
                          <div style={{ width: '100%', display: 'flex', gap: '2px', alignItems: 'flex-end', height: '80px' }}>
                            <div id="rb-jan-i" style={{ flex: 1, background: 'var(--pu)', borderRadius: '3px 3px 0 0', height: '0%', transition: 'height 1.2s .2s cubic-bezier(.4,0,.2,1)' }}></div>
                            <div id="rb-jan-e" style={{ flex: 1, background: 'var(--red-border)', borderRadius: '3px 3px 0 0', height: '0%', transition: 'height 1.2s .2s cubic-bezier(.4,0,.2,1)' }}></div>
                          </div>
                          <span style={{ fontSize: '.6rem', fontWeight: 700, color: 'var(--muted)' }}>JAN</span>
                        </div>
                        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '.35rem' }}>
                          <span style={{ fontSize: '.6rem', fontWeight: 800, color: 'var(--pu)' }}>52K</span>
                          <div style={{ width: '100%', display: 'flex', gap: '2px', alignItems: 'flex-end', height: '80px' }}>
                            <div id="rb-feb-i" style={{ flex: 1, background: 'var(--pu)', borderRadius: '3px 3px 0 0', height: '0%', transition: 'height 1.2s .35s cubic-bezier(.4,0,.2,1)' }}></div>
                            <div id="rb-feb-e" style={{ flex: 1, background: 'var(--red-border)', borderRadius: '3px 3px 0 0', height: '0%', transition: 'height 1.2s .35s cubic-bezier(.4,0,.2,1)' }}></div>
                          </div>
                          <span style={{ fontSize: '.6rem', fontWeight: 700, color: 'var(--muted)' }}>FEB</span>
                        </div>
                        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '.35rem' }}>
                          <span style={{ fontSize: '.6rem', fontWeight: 800, color: 'var(--pu)' }}>71K</span>
                          <div style={{ width: '100%', display: 'flex', gap: '2px', alignItems: 'flex-end', height: '80px' }}>
                            <div id="rb-mar-i" style={{ flex: 1, background: 'var(--pu)', borderRadius: '3px 3px 0 0', height: '0%', transition: 'height 1.2s .5s cubic-bezier(.4,0,.2,1)' }}></div>
                            <div id="rb-mar-e" style={{ flex: 1, background: 'var(--red-border)', borderRadius: '3px 3px 0 0', height: '0%', transition: 'height 1.2s .5s cubic-bezier(.4,0,.2,1)' }}></div>
                          </div>
                          <span style={{ fontSize: '.6rem', fontWeight: 700, color: 'var(--muted)' }}>MAR</span>
                        </div>
                        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '.35rem' }}>
                          <span style={{ fontSize: '.6rem', fontWeight: 800, color: 'var(--pu)' }}>58K</span>
                          <div style={{ width: '100%', display: 'flex', gap: '2px', alignItems: 'flex-end', height: '80px' }}>
                            <div id="rb-apr-i" style={{ flex: 1, background: 'var(--pu)', borderRadius: '3px 3px 0 0', height: '0%', transition: 'height 1.2s .65s cubic-bezier(.4,0,.2,1)' }}></div>
                            <div id="rb-apr-e" style={{ flex: 1, background: '#f3f4f6', borderRadius: '3px 3px 0 0', height: '0%', transition: 'height 1.2s .65s cubic-bezier(.4,0,.2,1)' }}></div>
                          </div>
                          <span style={{ fontSize: '.6rem', fontWeight: 700, color: 'var(--muted)' }}>APR</span>
                        </div>
                        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '.35rem' }}>
                          <span style={{ fontSize: '.6rem', fontWeight: 800, color: 'var(--muted)' }}>—</span>
                          <div style={{ width: '100%', display: 'flex', gap: '2px', alignItems: 'flex-end', height: '80px' }}>
                            <div style={{ fontSize: '.6rem', fontWeight: 800, color: 'var(--muted)' }}></div>
                            <div style={{ fontSize: '.6rem', fontWeight: 800, color: 'var(--muted)' }}></div>
                          </div>
                          <span style={{ fontSize: '.6rem', fontWeight: 700, color: 'var(--muted)' }}>MAY</span>
                        </div>
                        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '.35rem' }}>
                          <span style={{ fontSize: '.6rem', fontWeight: 800, color: 'var(--muted)' }}>—</span>
                          <div style={{ width: '100%', display: 'flex', gap: '2px', alignItems: 'flex-end', height: '80px' }}>
                            <div style={{ fontSize: '.6rem', fontWeight: 800, color: 'var(--muted)' }}></div>
                            <div style={{ fontSize: '.6rem', fontWeight: 800, color: 'var(--muted)' }}></div>
                          </div>
                          <span style={{ fontSize: '.6rem', fontWeight: 700, color: 'var(--muted)' }}>JUN</span>
                        </div>
                      </div>
                      <div style={{ display: 'flex', gap: '1rem', marginTop: '.85rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '.4rem', fontSize: '.68rem', fontWeight: 700, color: 'var(--pu)' }}><div style={{ width: '10px', height: '10px', background: 'var(--pu)', borderRadius: '2px' }}></div>Revenue</div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '.4rem', fontSize: '.68rem', fontWeight: 700, color: 'var(--red)' }}><div style={{ width: '10px', height: '10px', background: 'var(--red-border)', borderRadius: '2px' }}></div>Expenses</div>
                      </div>
                    </div>


                    <div className="chart-box">
                      <div className="chart-box-title">Cash Flow Summary</div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '.6rem' }}>
                        <div style={{ background: 'var(--em-light)', border: '1px solid var(--em-border)', borderRadius: '.75rem', padding: '1rem' }}>
                          <div style={{ fontSize: '.6rem', fontWeight: 700, letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--em)', marginBottom: '.3rem' }}>Inflows</div>
                          <div style={{ fontSize: '1.5rem', fontWeight: 900, color: 'var(--em)', letterSpacing: '-.02em' }}>RM 91,250</div>
                          <div style={{ fontSize: '.7rem', fontWeight: 600, color: 'var(--muted)', marginTop: '.2rem' }}>Receipts · Deposits · Collections</div>
                        </div>
                        
                        <div style={{ background: 'var(--red-light)', border: '1px solid var(--red-border)', borderRadius: '.75rem', padding: '1rem' }}>
                          <div style={{ fontSize: '.6rem', fontWeight: 700, letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--red)', marginBottom: '.3rem' }}>Outflows</div>
                          <div style={{ fontSize: '1.5rem', fontWeight: 900, color: 'var(--red)', letterSpacing: '-.02em' }}>RM 58,800</div>
                          <div style={{ fontSize: '.7rem', fontWeight: 600, color: 'var(--muted)', marginTop: '.2rem' }}>Payments · Vouchers · Refunds</div>
                        </div>
                        
                        <div style={{ background: 'var(--pu-light)', border: '1px solid var(--pu-border)', borderRadius: '.75rem', padding: '1rem' }}>
                          <div style={{ fontSize: '.6rem', fontWeight: 700, letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--pu)', marginBottom: '.3rem' }}>Net Cash Flow</div>
                          <div style={{ fontSize: '1.8rem', fontWeight: 900, color: 'var(--pu)', letterSpacing: '-.03em' }}>RM 32,450</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <hr className="divider"/>



            <section className="benefits">
              <div className="wrapper reveal">
                <div className="section-label">Why Reports &amp; Receipts</div>
                <h2 className="section-title" style={{ color: 'var(--pu)' }}>Industry Benefits</h2>
                <div className="benefits-grid">
                  <div className="ben-card reveal">
                    <div className="ben-icon"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#6d28d9" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z"/></svg></div>
                    <div>
                      <h3>Decisions Backed by Live Data</h3>
                      <p style={{ fontFamily: 'Montserrat, system-ui' }}>Every chart and table pulls from live transaction data — not cached exports. Your reports are always current, down to the last posted payment.</p>
                    </div>
                  </div>
                  <div className="ben-card reveal" style={{ transitionDelay: '.1s' }}>
                    <div className="ben-icon"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"/></svg></div>
                    <div>
                      <h3>Audit-Ready Financial Statements</h3>
                      <p style={{ fontFamily: 'Montserrat, system-ui' }}>Trial Balance, General Ledger, and Balance Sheet all reconcile automatically against your journal entries — always balanced, always audit-ready.</p>
                    </div>
                  </div>
                  <div className="ben-card reveal" style={{ transitionDelay: '.2s' }}>
                    <div className="ben-icon"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#2355f5" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z"/></svg></div>
                    <div>
                      <h3>Project Profitability in Real Time</h3>
                      <p style={{ fontFamily: 'Montserrat, system-ui' }}>See budget vs actual, revenue vs cost, and margin percentage for every active project — so you can intervene before overruns happen.</p>
                    </div>
                  </div>
                  <div className="ben-card reveal" style={{ transitionDelay: '.3s' }}>
                    <div className="ben-icon"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#d97706" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m.75 12l3 3m0 0l3-3m-3 3v-6m-1.5-9H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"/></svg></div>
                    <div>
                      <h3>Instant, Printable Receipts</h3>
                      <p style={{ fontFamily: 'Montserrat, system-ui' }}>Every collected payment generates a branded, client-ready receipt in seconds — no manual formatting, no Excel templates, no delays.</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>


            <section className="final-section reveal">
              <div className="wrapper">
                <h2 className="final-title">See Everything.<br/><span>Know Everything.</span></h2>
                <p className="final-body">Reports &amp; Receipts in Urusentra turns your raw transaction data into clear, actionable intelligence. From a balanced trial balance to a full project profitability report — everything you need to run a smarter construction business.</p>
                <div className="final-cta">
                  <button className="btn-primary">
                    <a href="/pricing">Open Report Suite</a>
                  </button>
                  <button className="btn-secondary">
                    <a href="/pricing">View Financial Statements</a>
                  </button>
                </div>
              </div>
            </section>


        </div>
    );
};
export default ReportsFeature;


