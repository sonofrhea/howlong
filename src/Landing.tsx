import React, { useState } from 'react';
import logo from "./assets/logo.svg";
import Ruler from "lucide-react";

export default function ConstructionERPLanding() {
    const [featuresOpen, setFeaturesOpen] = useState(false);

    
    return (
        <div className="app">
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
                --blue-box: #e3f5ff;
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
                max-width: 100%;
                min-height: 100vh;
                background: linear-gradient(to bottom, var(--sky) 0%, #ffffff 100%);
                overflow: hidden;
                align: center;
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
                left: 20%;
                top: 0;
                width: 100%;
                height: 110%;
                z-index: 3;
                pointer-events: none;
                opacity: 0.6;
                font-size: 50px;
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
                    flex-wrap: wrap;
                font-family: Helvetica;
                justify-content: center
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

                .logo-photo {
                left: 10%;
                padding: 1px 50px 1px;
                }


                .headline {
                position: relative;
                top: 20vh;
                left: 4%;
                text-align: left;
                font-weight: 900;
                font-size: 4vw;
                line-height: 1;
                padding: 10px 30px 1px;
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
                
                .subheadline {
                    font-size: clamp(18px, 2vw, 24px);
                    font-weight: 100;
                    color: var(--text-gray);
                    max-width: 600px;
                    line-height: 1.6;
                    margin-bottom: 50px;
                    font-family: 'Arial';
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
                top: 85vh;
                left: 65%;
                background-color: var(--blue-box);
                padding: 10px 30px;
                color: #515151;
                font-weight: 700;
                font-size: 2.5vw;
                line-height: 1.1;
                z-index: 5;
                font-family: 'Montserrat', sans-serif;
                box-shadow: 0 8px 25px rgba(0,102,204,0.35);
                }

                .blue-box span {
                display: block;
                }

                .section-tag {
                font-size: 18px;
                font-weight: 700;
                color: var(--blue-primary);
                text-transform: uppercase;
                letter-spacing: 2px;
                margin-bottom: 15px;
                display: block;
                }

                .section-header {
                text-align: center;
                max-width: 800px;
                margin: 0 auto 80px;
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

                .logo {
                    left: 10
                }

                /* FEATURES SECTION */
                .features-section {
                padding: 10px 10%;
                background: #ffffff;
                }

                .feature-title {
                }

                .section-title-1 p {
                font-family: 'Montserrat', sans-serif;
                font-size: clamp(32px, 5vw, 52px);
                font-weight: 900;
                line-height: 0.9;
                margin-bottom: 20px;
                color: #000;
                text-align: center;
                }

                .section-title {
                font-family: 'Montserrat', sans-serif;
                font-size: clamp(32px, 5vw, 52px);
                font-weight: 900;
                line-height: 0.9;
                margin-bottom: 20px;
                color: #000;
                text-align: center;
                }

                .feature-title {
                font-family: Montserrat;
                font-weight: 700;
                font-size: 18px;
                margin-bottom: 12px;
                color: #000;
                text-align: left;
                }

                .feature-description {
                    font-size: 16px;
                    line-height: 1.6;
                    color: var(--text-gray);
                    margin-bottom: 0px;
                    text-align: left;
                    font-family: Helvetica;
                }
                .nav-item.dropdown {
                    position: relative;
                }

                .dropdown-menu {
                position: absolute;
                left: 0;
                transform: translateX(-50%);
                background: white;
                border-radius: 8px;
                box-shadow: 0 8px 30px rgba(0,0,0,0.15);
                padding: 12px 0;
                min-width: 220px;
                opacity: 0;
                visibility: hidden;
                transition: all 0.3s;
                z-index: 100;
                top: 100%;
                margin-top: 10px;
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
                white-space: nowrap;
                }

                .dropdown-menu a:hover {
                background: #e3f2fd;
                color: #2196f3;
                }

                .dropdown-menu-item {
                border-bottom: 1px solid rgba(0,0,0,0.05);
                }

                .dropdown-menu-item:last-child {
                border-bottom: none;
                }

                /* CTA SECTION */
                .cta-section {
                    padding: 120px 60px;
                    background: #004e9c;;
                    color: var(--text-white);
                    text-align: center;
                }

                .cta-section .section-title {
                    color: var(--text-white);
                    margin-bottom: 25px;
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
                background: #1a1a1a;
                color: #999;
                padding: 60px 60px 30px;
                font-family: Helvetica !important;
                }

                .footer-content {
                max-width: 1400px;
                margin: 0 auto;
                display: grid;
                grid-template-columns: 2fr 1fr 1fr 1fr;
                gap: 60px;
                margin-bottom: 40px;
                font-family: Helvetica !important;
                }

                .footer-brand {
                color: var(--text-white);
                }


                .footer-logo {
                background: var(--blue-primary);
                color: white;
                width: 60px;
                height: 60px;
                display: flex;
                align-items: center;
                justify-content: center;
                font-weight: 900;
                font-size: 20px;
                margin-bottom: 20px;
                font-family: Helvetica !important;
                }

                .footer-brand p {
                line-height: 1.7;
                margin-bottom: 15px;
                font-family: Helvetica !important;
                font-weight: normal;
                font-size: 16px;
                text-align: left;
                }

                .footer-column h4 {
                color: var(--text-white);
                font-size: 16px;
                font-weight: 700;
                margin-bottom: 20px;
                font-family: Helvetica !important;
                font-weight: normal;
                }

                .footer-column ul {
                list-style: none;
                font-family: Helvetica !important;
                font-weight: normal;
                }

                .footer-column ul li {
                margin-bottom: 12px;
                font-family: Helvetica !important;
                font-weight: normal;
                }

                .footer-column a {
                color: #999;
                text-decoration: none;
                transition: color 0.3s;
                font-family: Helvetica !important;
                font-weight: normal;
                }

                .footer-column a:hover {
                color: var(--text-white);
                font-family: Helvetica !important;
                font-size: 15px;
                font-weight: normal;
                }

                .footer-bottom {
                border-top: 1px solid #333;
                padding-top: 30px;
                text-align: center;
                font-size: 15px;
                font-family: Helvetica !important;
                font-weight: normal;
                }

                .nav-links {
                display: flex;
                gap: 40px;
                align-items: center;
                font-family: Helvetica;

                padding: 1px 50px 1px;
                
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


                .blue-box {
                    left: 30%;
                    font-size: 1.5vw;
                    max-width: 4000px;
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

                .section-description {
                    font-size: 18px;
                    color: var(--text-gray);
                    line-height: 1.7;
                    margin-top: 2px !important;
                    font-family: Helvetica;
                    font-weight: normal;
                }

                .cta-section .section-description {
                    color: rgba(255,255,255,0.9);
                    margin-bottom: 40px;
                }

                .cta-section .cta-primary {
                background: black;
                box-shadow: 0 4px 15px rgba(255,107,53,0.3);
                }

                .cta-section .cta-primary:hover {
                transform: translateY(-10px) scale(1.02) !important;
                border-width: 2px;
                border-color: white;
                }

                .cta-section .cta-secondary {
                background: transparent;
                color: var(--text-white);
                border-color: white;
                }

                .cta-section .cta-secondary:hover {
                transform: translateY(-10px) scale(1.02) !important;
                border-color: var(--text-white);
                background: rgba(255,255,255,0.1);
                color: var(--text-white);
                }

                .cta-section .cta-secondary:hover {
                background: transparent;
                color: var(--text-white);
                border-color: rgba(255,255,255,0.3);
                }


                .feature-cards {
                display: grid !important;
                grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)) !important;
                gap: 40px !important;
                max-width: 1400px;
                margin: 0 auto;
                }

                .feature-cards,
                .features-section,
                .testimonials-section,
                .cta-section,
                footer {
                    padding-left: 40px;
                    padding-right: 40px;
                }


                .feature-cards {
                    grid-template-columns: 1fr;
                    padding: 0 30px;
                }




                .feature-card {
                background: #e4e9ed !important;
                border-radius: 12px !important;
                padding: 40px !important;
                box-shadow: 0 20px 50px rgba(0,0,0,0.08) !important;
                border: 2px solid rgba(0,0,0,0.08) !important;
                transition: all 0.3s ease !important;
                font-family: Helvetica;
                color: #e4e9ed;
                font-weight: normal;
                }

                .feature-card:hover {
                transform: translateY(-10px) scale(1.02) !important;
                box-shadow: 0 30px 70px rgba(0,0,0,0.15) !important;
                border-color: #0864bf !important;
                cursor: pointer;
                }





                .features-section {
                    padding: 100px 60px;
                    background: #ffffff;
                    position: relative;
                }

                .features-grid {
                display: grid !important;
                grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)) !important;
                gap: 40px !important;
                max-width: 1400px;
                margin: 0 auto;
                }

                .features-grid,
                .testimonials-grid {
                    grid-template-columns: 1fr;
                }

                .feature-item {
                }

                .feature-item:hover {
                transform: translateY(-10px) scale(1.02) !important;
                box-shadow: 0 30px 70px rgba(0,0,0,0.15) !important;
                border-color: #0864bf !important;
                cursor: pointer;
                }

                .feature-icon {
                width: 64px !important;
                height: 64px !important;
                background: var(--blue-primary);
                border-radius: 14px !important;
                display: flex !important;
                align-items: center !important;
                justify-content: center !important;
                margin-bottom: 24px !important;
                color: var(--text-white);
                font-size: 30px !important;
                }

                .cta-group-header {
                    display: flex;
                    gap: 20px;
                    align-items: center;
                    flex-wrap: wrap;
                    font-family: Helvetica;
                    letter-spacing: 1px;
                }

                .cta-group-header .cta-primary {
                    background: var(--blue-primary);
                    color: var(--text-white);
                    padding: 18px 40px;
                    border-radius: 8px;
                    font-weight: 700;
                    font-size: 16px;
                    text-decoration: none;
                    transition: all 0.3s;
                    box-shadow: 0 4px 15px rgba(0,102,204,0.25);
                    display: inline-block;
                    letter-spacing: 1px;
                }

                .cta-group-header .cta-primary:hover {
                    background: #0052a3;
                    transform: translateY(-3px);
                    box-shadow: 0 8px 25px rgba(0,102,204,0.35);
                }

                .cta-group-header .cta-secondary {
                    background: transparent;
                    color: var(--text-black);
                    padding: 18px 40px;
                    border-radius: 8px;
                    font-weight: 600;
                    font-size: 16px;
                    text-decoration: none;
                    border: 2px solid var(--border-gray);
                    transition: all 0.3s;
                    display: inline-block;
                    letter-spacing: 1px;
                }

                .cta-group-header .cta-secondary:hover {
                    border-color: var(--blue-primary);
                    color: var(--blue-primary);
                    background: rgba(0,102,204,0.05);
                }


                .cta-nav:hover {
                    color: #f8fbff !important;
                    background: #0052a3;
                    transform: translateY(-3px);
                    box-shadow: 0 8px 25px rgba(0,102,204,0.35);
                }

                .arrow {
                    left: 8%;
                }

                /* TESTIMONIALS SECTION */

                .testimonials-section {
                padding: 120px 60px;
                background: linear-gradient(135deg, #f8fbff 0%, #e6f2ff 100%);
                }

                .testimonials-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
                gap: 30px;
                max-width: 1400px;
                margin: 0 auto;
                }

                .testimonial {
                background: white;
                padding: 35px;
                border-radius: 12px;
                box-shadow: 0 4px 20px rgba(0,0,0,0.06);
                }

                .testimonial-text {
                font-size: 16px;
                line-height: 1.7;
                color: var(--text-black);
                margin-bottom: 25px;
                font-style: italic;
                }

                .testimonial-author {
                display: flex;
                align-items: center;
                gap: 15px;
                }

                .author-avatar {
                width: 50px;
                height: 50px;
                border-radius: 50%;
                background: var(--blue-primary);
                display: flex;
                align-items: center;
                justify-content: center;
                color: white;
                font-weight: 700;
                font-size: 18px;
                }

                .author-info {
                flex: 1;
                }

                .author-name {
                font-weight: 700;
                font-size: 15px;
                margin-bottom: 3px;
                }

                .author-title {
                font-size: 13px;
                color: var(--text-gray);
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
            <div className="header-logo">
                <div className="logo-photo">
                    <img src={logo} alt='logo' height="80" width="100" />
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
                        <div className="dropdown-menu-item">
                            <a href="#analytics">Suppliers Management</a>
                        </div>
                    </div>
                </div>
                <a href="#solutions">Solutions</a>
                <a href="#pricing">Pricing</a>
                <a href="#resources">Resources</a>
                <a href="/login">Login</a>
                <a href="#demo" className="cta-nav">Try It Out</a>
            </div>
            </nav>

            <div className="headline">
            Manage Easier.<br />
            <span className='text-blue-700'>Build Faster & Better.</span>
            
            <p className='subheadline'><br />
                URUSENTRA is an all-in-one ERP software engineered specifically with building professionals in mind.
                Built to enhance company's productivity and production speed by streamlining projects, managing customers, teams, products and control costs, accounting with a powerful platform to connect with suppliers, all from one powerful system.
            </p>

            <div className="cta-group-header">
                <a href="#demo" className="cta-primary">Try It Out</a>
                <a href="#features" className="cta-secondary">Learn More</a>
            </div>
            </div>
            


            <div className="blue-box">
                <span>USED BY SMALL AND MEDIUM BUSINESSES</span>
                <span>IN THE BUILDING INDUSTRY INCLUDING</span>
                <span>INTERIOR & EXTERIOR BUILDERS.</span>
                <span>LOVED BY ACCOUNTANTS.</span>
            </div>
        </section>

        {/* FEATURES SECTION */}
        <section className="features-section">
            <div className="section-header">
                <span className="section-tag">Complete Solution</span>
                <h2 className="section-title-1">
                    <p>Everything You Need To</p>
                    <p>Manage Easier</p>
                </h2>
                <p className="section-description">
                    From estimation to completion, our comprehensive ERP system covers every aspect of your building business.
                </p>
            </div>

            <div className="feature-cards">
            <div className="feature-card">
                <div className="feature-icon">
                    <svg width="42" height="24" viewBox="0 0 210 120" xmlns="http://www.w3.org/2000/svg">
                        <rect x="2" y="20" width="206" height="80" rx="10" fill="#F5C16C" stroke="#C9973F" strokeWidth="6"/>

                        <g stroke="#6B4F1D" strokeWidth="5">
                            <line x1="20" y1="20" x2="20" y2="70"/>
                            <line x1="60" y1="20" x2="60" y2="70"/>
                            <line x1="100" y1="20" x2="100" y2="70"/>
                            <line x1="140" y1="20" x2="140" y2="70"/>
                            <line x1="180" y1="20" x2="180" y2="70"/>
                        </g>

                        <g stroke="#6B4F1D" strokeWidth="3">
                            <line x1="40" y1="20" x2="40" y2="55"/>
                            <line x1="80" y1="20" x2="80" y2="55"/>
                            <line x1="120" y1="20" x2="120" y2="55"/>
                            <line x1="160" y1="20" x2="160" y2="55"/>
                        </g>
                    </svg>
                </div>
                <h3 className="feature-title">JOB COST & BOQ ESTIMATION</h3>
                <p className="feature-description">
                Create accurate estimates quickly with historical data, material costs, and labor rates. Win more bids with competitive proposals.
                </p>
            </div>

            <div className="feature-card">
                <div className="feature-icon">
                    <svg width="42" height="42" viewBox="0 0 120 120">
                    <rect x="10" y="90" width="100" height="15" fill="#555"/>
                    <rect x="55" y="15" width="10" height="75" fill="#FFB000"/>
                    <rect x="20" y="25" width="60" height="10" fill="#FFB000"/>
                    <line x1="80" y1="30" x2="105" y2="55" stroke="#FFB000" strokeWidth="6"/>
                    <rect x="98" y="55" width="10" height="20" fill="#777"/>
                    </svg>
                </div>
                <h3 className="feature-title">PROJECT SCHEDULING</h3>
                <p className="feature-description">
                Build detailed schedules, assign resources, and track progress in real-time. Keep every stakeholder informed.
                </p>
            </div>

            <div className="feature-card">
                <div className="feature-icon">
                    <svg width="42" height="42" viewBox="0 0 120 120">
                    <polygon points="20,40 60,20 100,40 60,60" fill="#E8A55A"/>
                    <polygon points="20,40 60,60 60,100 20,80" fill="#D18B47"/>
                    <polygon points="100,40 60,60 60,100 100,80" fill="#C47C3A"/>
                    </svg>
                </div>
                <h3 className="feature-title">MATERIAL MANAGEMENT</h3>
                <p className="feature-description">
                Track inventory, automate procurement, and ensure materials arrive exactly when needed. Reduce waste.
                </p>
            </div>

            <div className="feature-card">
                <div className="feature-icon">
                    <svg width="42" height="42" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
  
                        <rect
                            x="18"
                            y="10"
                            width="84"
                            height="100"
                            rx="8"
                            fill="#FFFFFF"
                            stroke="#4A90E2"
                            stroke-width="5"
                        />

                        <rect
                            x="26"
                            y="18"
                            width="68"
                            height="12"
                            rx="4"
                            fill="#4A90E2"
                        />

                        <circle cx="60" cy="48" r="10" fill="#2196F3"/>
                        <path
                            d="M44 72c0-8.8 7.2-16 16-16s16 7.2 16 16"
                            fill="#2196F3"
                        />

                        <circle cx="40" cy="52" r="7" fill="#4CAF50"/>
                        <path
                            d="M28 72c0-6.6 5.4-12 12-12"
                            stroke="#4CAF50"
                            stroke-width="6"
                            stroke-linecap="round"
                        />

                        <circle cx="80" cy="52" r="7" fill="#FFC107"/>
                        <path
                            d="M92 72c0-6.6-5.4-12-12-12"
                            stroke="#FFC107"
                            stroke-width="6"
                            stroke-linecap="round"
                        />

                    </svg>

                </div>
                <h3 className="feature-title">CLIENT MANAGEMENT</h3>
                <p className="feature-description">
                Track customers and potential customers, automate client & company relationships, and ensure client/company integrity.
                </p>
            </div>

            <div className="feature-card">
                <div className="feature-icon">
                    <svg width="42" height="42" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">

                    <circle cx="60" cy="60" r="38" fill="#9E9E9E"/>

                    <g fill="#7D7D7D">
                        <rect x="56" y="2" width="8" height="20"/>
                        <rect x="56" y="98" width="8" height="20"/>
                        <rect x="2" y="56" width="20" height="8"/>
                        <rect x="98" y="56" width="20" height="8"/>

                        <rect x="18" y="18" width="14" height="14" transform="rotate(45 25 25)"/>
                        <rect x="88" y="18" width="14" height="14" transform="rotate(45 95 25)"/>
                        <rect x="18" y="88" width="14" height="14" transform="rotate(45 25 95)"/>
                        <rect x="88" y="88" width="14" height="14" transform="rotate(45 95 95)"/>
                    </g>

                    <circle cx="60" cy="60" r="16" fill="#555555"/>
                    <circle cx="60" cy="60" r="6" fill="#2F2F2F"/>

                    </svg>
                </div>
                <h3 className="feature-title">EQUIPMENT TRACKING</h3>
                <p className="feature-description">
                Monitor equipment location, maintenance schedules, and utilization. Maximize ROI on your machinery.
                </p>
            </div>

            <div className="feature-card">
                <div className="feature-icon">
                    <svg width="42" height="42" viewBox="0 0 120 120">
                    <rect x="25" y="20" width="70" height="90" rx="6" fill="#4A90E2"/>
                    <rect x="35" y="10" width="50" height="20" rx="5" fill="#2D6FB8"/>
                    <polyline points="40,55 55,70 85,40" fill="none" stroke="#FFFFFF" strokeWidth="8"/>
                    </svg>

                </div>
                <h3 className="feature-title">QUALITY & SAFETY</h3>
                <p className="feature-description">
                Digitize inspections, track compliance, and maintain safety standards. Ensure regulatory compliance.
                </p>
            </div>

            <div className="feature-card">
                <div className="feature-icon">
                    <svg width="42" height="42" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
                    <rect x="18" y="10" width="84" height="100" rx="8" fill="#FFFFFF" stroke="#4A90E2" strokeWidth="5"/>

                    <rect x="26" y="18" width="68" height="12" rx="4" fill="#4A90E2"/>

                    <rect x="32" y="78" width="10" height="20" fill="#4CAF50"/>
                    <rect x="50" y="66" width="10" height="32" fill="#FFC107"/>
                    <rect x="68" y="54" width="10" height="44" fill="#2196F3"/>

                    <polyline points="32,84 55,62 75,48 90,34" fill="none" stroke="#E53935" strokeWidth="4"/>

                    </svg>
                </div>
                <h3 className="feature-title">ANALYTICS & REPORTING</h3>
                <p className="feature-description">
                Get instant insights into project performance, profitability, and productivity. Make informed decisions.
                </p>
            </div>
            </div>
        </section>
  <section className="testimonials-section">
    <div className="section-header">
      <span className="section-tag">Client Success</span>
      <h2 className="section-title">How does this work?</h2>
      <p className="section-description">
        See how building companies are transforming their operations with our ERP platform.
      </p>
    </div>

    <div className="testimonials-grid">
      <div className="testimonial">
        <p className="testimonial-text">
          "This platform cut our project planning time by 40%. We can now manage twice as many projects with the same team. The ROI was immediate."
        </p>
        <div className="testimonial-author">
          <div className="author-avatar">MR</div>
          <div className="author-info">
            <div className="author-name">Michael Rodriguez</div>
            <div className="author-title">VP Operations, Skyline Builders</div>
          </div>
        </div>
      </div>

      <div className="testimonial">
        <p className="testimonial-text">
          "Finally, a system built for the building industry. No more juggling spreadsheets, emails and suppliers stress. Everything we need is in one place, accessible from the field."
        </p>
        <div className="testimonial-author">
          <div className="author-avatar">JC</div>
          <div className="author-info">
            <div className="author-name">Jennifer Chen</div>
            <div className="author-title">Project Manager, Metro Construction</div>
          </div>
        </div>
      </div>

      <div className="testimonial">
        <p className="testimonial-text">
          "The cost control features alone saved us over $500K in the first year. We can now spot budget overruns before they become problems."
        </p>
        <div className="testimonial-author">
          <div className="author-avatar">DW</div>
          <div className="author-info">
            <div className="author-name">David Washington</div>
            <div className="author-title">CFO, Foundation Group</div>
          </div>
        </div>
      </div>
    </div>
  </section>

        {/* CTA SECTION */}
        <section id="demo" className="cta-section">
            <div className="section-header">
            <h2 className="section-title">Ready to Transform Your SME?</h2>
            <p className="section-description">
                Join hundreds of building companies already building smarter with our platform.
                Start your free 3-day trial today—no credit card required.
            </p>
            </div>

            <div className="cta-group">
            <a href="/register" className="cta-primary">Start Free Trial</a>
            <a href="#" className="cta-secondary">Click For Pricing</a>
            </div>
        </section>

        {/* FOOTER */}
        <footer>
            <div className="footer-content">
                <div className="footer-brand">
                    <div className="footer logo">
                        <img src={logo} alt='logo' height="80" width="100" />
                    </div>
                    <p>The management ERP platform built by builders and accountants, for builders and accountants. Streamline your operations and manage your business better.</p>
                    <p>&copy; 2026 URUSENTRA. All rights reserved.</p>
                </div>

                <div className="footer-column">
                    <h4>Product</h4>
                    <ul>
                    <li><a href="#">Features</a></li>
                    <li><a href="#">Pricing</a></li>
                    <li><a href="#">Mobile App</a></li>
                    </ul>
                </div>

                <div className="footer-column">
                    <h4>Resources</h4>
                    <ul>
                    <li><a href="#">Documentation</a></li>
                    <li><a href="#">Blog</a></li>
                    <li><a href="#">Support</a></li>
                    </ul>
                </div>

                <div className="footer-column">
                    <h4>Company</h4>
                    <ul>
                    <li><a href="#">About Us</a></li>
                    <li><a href="#">Contact</a></li>
                    <li><a href="#">Privacy</a></li>
                    </ul>
                </div>
            </div>

            <div className="footer-bottom">
            URUSENTRA. Designed for growth.
            </div>
        </footer>
        </div>
    );
}