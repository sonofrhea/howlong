import React, { useState } from 'react';
import logo from "../assets/logo.svg";
import logoWhite from "../assets/logoWhite.svg";
import Ruler from "lucide-react";
import { useNavigate } from 'react-router-dom';

import { ArrowRight } from "lucide-react";



const formatCurrentYear = () => {
    const currentYear = new Date().getFullYear();
    return `${currentYear}`
}




export default function ConstructionERPLanding() {
    const [featuresOpen, setFeaturesOpen] = useState(false);
    const navigate = useNavigate() 


    
    return (
        <div className="app">
            <style>
                {`
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

                    .cta-marketplace {
                        display: inline-flex;
                        align-items: center;
                        justify-content: center;
                        background-color: #ea580c;
                        color: #ffffff;
                        font-weight: 600;
                        font-size: 16px;
                        padding: 14px 36px;
                        border: none;
                        border-radius: 8px;
                        cursor: pointer;
                        transition: all 0.2s ease-in-out;
                        line-height: 1.4;
                        text-align: center;
                        letter-spacing: 1px;
                    }

                    .cta-marketplace:hover {
                        background-color: #ff7a3c;
                        transform: translateY(-2px);
                    }

                    .arrow-icon {
                        width: 20px;
                        height: 20px;
                        transition: transform 0.3s ease-in-out;
                    }

                    /* Animate arrow moving slightly to the right every second */
                    @keyframes arrowMove {
                        0%, 50%, 100% { transform: translateX(0); }
                        95% { transform: translateX(40px); }
                        95% { transform: translateX(20px); }
                    }

                    .arrow-icon {
                        animation: arrowMove 1s infinite;
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
                    padding: 1px 70px 1px;
                    font-family: 'Montserrat', sans-serif;
                    }



                    .header-logo .logo-text {
                        font-family: 'Montserrat', sans-serif;
                        font-size: 25px;
                    }

                    footer .logo-text-lower {
                        font-family: 'Montserrat', sans-serif;
                        font-size: 20px;
                        color: #ffff;
                    }

                    footer .logo-photo-lower {
                        margin-bottom: 10px;
                    }



                    .headline {
                    position: relative;
                    top: 25vh;
                    left: 4%;
                    text-align: left;
                    font-weight: 900;
                    font-size: 4vw;
                    line-height: 1;
                    padding: 10px 30px 1px;
                    letter-spacing: -2px;
                    color: var(--text-black);
                    z-index: 5;
                    margin-bottom: 10px;
                    font-family: 'Montserrat', sans-serif;
                    }

                    .headline span {
                    display: block;
                    }

                    .headline p {
                        font-size: 20px;
                        font-weight: 500;
                        font-family: 'Montserrat';
                        letter-spacing: 10%;
                        max-width: 600px;
                        line-height: 1.6;
                        margin-bottom: 50px;
                        margin-top: 20px;
                    }
                    
                    .subheadline {
                        font-size: clamp(1px, 2vw, 24px);
                        font-weight: 500;
                        max-width: 600px;
                        line-height: 1.6;
                        margin-bottom: 50px;
                        font-family: 'Montserrat';
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
                        left: 10%;
                        right: 10%;
                        font-size: 1.1vw;
                        max-width: 4000px;
                        font-weight: 500;
                        font-family: 'Montserrat';
                        position: absolute;
                        top: 85vh;
                        background-color: var(--blue-box);
                        padding: 10px 10px;
                        line-height: 1.1;
                        z-index: 5;
                        font-family: 'Montserrat', sans-serif;
                        box-shadow: 0 8px 25px rgba(0,102,204,0.35);
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

                    .features-explanation {
                        padding: 120px 60px;
                        background: #f8fbff;
                    }

                    .feature-detail {
                        max-width: 900px;
                        margin: 0 auto 100px;
                    }

                    .feature-detail h2 {
                        font-size: 36px;
                        margin-bottom: 20px;
                    }

                    .feature-detail p {
                        font-size: 18px;
                        line-height: 1.7;
                    }
                        
                    @keyframes marquee {
                        0% { transform: translateX(0); }
                        100% { transform: translateX(-50%); }
                    }

                    @keyframes marquee-reverse {
                        0% { transform: translateX(-50%); }
                        100% { transform: translateX(0); }
                    }

                    .animate-marquee {
                        animation: marquee 30s linear infinite;
                    }

                    .animate-marquee-reverse {
                        animation: marquee-reverse 30s linear infinite;
                    }

                    .animate-spin-slow {
                        animation: spin 10s linear infinite;
                    }

                    /* Ensure the tickers stay fluid */
                        .whitespace-nowrap {
                        white-space: nowrap;
                    }
                                                
            `}
            </style>

        {/* HERO SECTION */}
        <section className="hero">
            <div className="background"></div>
            <div className="grid-lines"></div>

            {/* CONSTRUCTION SKETCH */}
            <div className="sketch" aria-hidden="true" style={{ width: '1900px' }}>
                <svg preserveAspectRatio="xMidYMid meet" viewBox="0 0 1200 3200" xmlns="http://www.w3.org/2000/svg">
                    <style>{`
                        /* 10 SECOND TOTAL DURATION */
                        @keyframes traceWithLongPause {
                            0% { stroke-dashoffset: 2500; opacity: 0; }
                            2% { opacity: 1; }
                            /* Finishes drawing at 6 seconds (60% of 10s) */
                            60% { stroke-dashoffset: 0; opacity: 1; }
                            /* Stays put/frozen from 6s to 10s */
                            100% { stroke-dashoffset: 0; opacity: 1; }
                        }

                        @keyframes labelsFade {
                            0%, 50% { opacity: 0; }
                            60%, 100% { opacity: 1; }
                        }

                        .bold-draw {
                            stroke: #000 !important;
                            stroke-dasharray: 2500;
                            stroke-dashoffset: 2500;
                            animation: traceWithLongPause 10s ease-in-out infinite;
                            strokeLinecap: round;
                            strokeLinejoin: round;
                        }

                        .grid-line {
                            stroke: rgba(0,0,0,0.05);
                        }
                        
                        .labels { 
                            animation: labelsFade 10s ease-in-out infinite; 
                        }
                    `}</style>

                    <defs>
                        <marker id="arrowhead" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto" markerUnits="strokeWidth">
                            <path d="M0,0 L8,3 L0,6 z" fill="#000" />
                        </marker>
                    </defs>

                    {/* Construction Grid (Static) */}
                    <g strokeWidth="1">
                        {Array.from({length:20}).map((_,i) => (
                            <line key={`v${i}`} x1={60+i*60} y1="0" x2={60+i*60} y2="3200" className="grid-line" />
                        ))}
                        {Array.from({length:54}).map((_,i) => (
                            <line key={`h${i}`} x1="0" y1={40+i*60} x2="1200" y2={40+i*60} className="grid-line" />
                        ))}
                    </g>

                    {/* Main Structures - BOLD DRAWING */}
                    <g strokeWidth="4" fill="none" className="bold-draw">
                        {/* Outer Walls */}
                        <rect x="70" y="860" width="1060" height="920" />
                        
                        {/* Interior Partitions */}
                        <rect x="460" y="900" width="10" height="840" />
                        <path d="M760 900 L760 1400" strokeDasharray="6 4" />
                    </g>

                    {/* Windows and Doors */}
                    <g strokeWidth="2.5" fill="none" className="bold-draw" style={{animationDelay: '1s'}}>
                        <rect x="120" y="910" width="160" height="160" />
                        <rect x="940" y="910" width="160" height="160" />
                        <rect x="740" y="1300" width="90" height="200" />
                        <path d="M740 1300 A90 90 0 0 1 830 1390" />
                    </g>

                    {/* Furniture - Table and Chairs */}
                    <g strokeWidth="3" fill="none" className="bold-draw" style={{animationDelay: '2s'}}>
                        <rect x="300" y="1260" width="320" height="120" rx="8" />
                        <circle cx="270" cy="1310" r="18" />
                        <circle cx="640" cy="1310" r="18" />
                    </g>

                    {/* Sectional Cut - BOLD */}
                    <g transform="translate(80,2000)" strokeWidth="2.5" fill="none" className="bold-draw" style={{animationDelay: '3s'}}>
                        <rect x="0" y="0" width="560" height="360" />
                        <line x1="0" y1="40" x2="560" y2="40" />
                        <line x1="120" y1="0" x2="120" y2="360" />
                    </g>

                    {/* Dimensions & Labels - Only appear after drawing */}
                    <g fill="#000" className="labels" style={{ fontWeight: 'bold', fontFamily: 'Arial, sans-serif' }}>
                        <text x="610" y="800" fontSize="24" textAnchor="middle">9800 mm</text>
                        <text x="520" y="980" fontSize="25">Open Plan Studio</text>
                        <text x="280" y="2026" fontSize="22" textAnchor="middle">SECTION A-A</text>
                        <text x="460" y="1420" fontSize="20" textAnchor="middle">1800 mm</text>
                    </g>

                    {/* Dimension Lines with Arrowheads */}
                    <g stroke="#000" strokeWidth="2" fill="none" className="bold-draw" style={{animationDelay: '4s'}}>
                        <line x1="80" y1="820" x2="1140" y2="820" markerStart="url(#arrowhead)" markerEnd="url(#arrowhead)" />
                        <line x1="1160" y1="880" x2="1160" y2="1780" markerStart="url(#arrowhead)" markerEnd="url(#arrowhead)" />
                    </g>
                </svg>
            </div>

            <nav>
            <div className="header-logo">
                <div className="logo-photo"> 
                    <div className="flex items-center space-x-3">
                        <svg className="w-9 h-9 text-orange-800" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z"/>
                        </svg>
                        <div>
                            <h1 className="logo-text-lower text-xl font-bold text-gray-900">Urusentra</h1>
                        </div>
                    </div>
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
                            <a href="#materials">Project Management</a>
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
                <a href="/pricing">Pricing</a>
                <a href="#resources">Resources</a>
                <a href="/login">Login</a>
                <a href="/pricing" className="cta-nav">Try It Out</a>
            </div>
            </nav>

            <div className="headline">
            Manage Easier.<br />
            <span className='text-[#002c9c]'>Build Faster & Better.</span>
            
            <p className='subheadline'>
                URUSENTRA is an all-in-one ERP software and marketplace engineered specifically with building professionals in mind
            </p>

            <div className="cta-group-header">
                <a href="#demo" className="cta-primary">Try It Out</a>
                <a href="#features" className="cta-secondary">Learn More</a>
            </div>
            <div>
                <button className="cta-marketplace" onClick={() => navigate("/marketplace-signin")}>
                    Enter Marketplace
                    <ArrowRight className="ml-2 arrow-icon" />
                </button>
            </div>
            </div>
            


            <div className="blue-box">
                <span>Trusted by accountants. Designed for Small and Medium Businesses in the building industry to improve management and productivity</span>
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
                Create accurate estimates, material costs, and labor rates quickly with bill of quantities and calculate actual cost with Job cost ledger. Keep track of project variance accurately.
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
                <h3 className="feature-title">PROJECT TRACKING</h3>
                <p className="feature-description">
                Monitor projects and project duration, maintenance schedules, and utilization. maximize ROI on your projects, build detailed schedules, assign resources, and track progress in real-time. Keep every stakeholder informed.
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
                            strokeWidth="5"
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
                            strokeWidth="6"
                            strokeLinecap="round"
                        />

                        <circle cx="80" cy="52" r="7" fill="#FFC107"/>
                        <path
                            d="M92 72c0-6.6-5.4-12-12-12"
                            stroke="#FFC107"
                            strokeWidth="6"
                            strokeLinecap="round"
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
                    <rect x="18" y="10" width="84" height="100" rx="8" fill="#FFFFFF" stroke="#4A90E2" strokeWidth="5"/>

                    <rect x="26" y="18" width="68" height="12" rx="4" fill="#4A90E2"/>

                    <rect x="32" y="78" width="10" height="20" fill="#4CAF50"/>
                    <rect x="50" y="66" width="10" height="32" fill="#FFC107"/>
                    <rect x="68" y="54" width="10" height="44" fill="#2196F3"/>

                    <polyline points="32,84 55,62 75,48 90,34" fill="none" stroke="#E53935" strokeWidth="4"/>

                    </svg>
                </div>
                <h3 className="feature-title">ACCOUNTING & FINANCE</h3>
                <p className="feature-description">
                    Generate all important financial accounting reports from records all used by accountants and bookkeepers. Get instant insights into company performance, profitability, and productivity. Make informed decisions.
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
                <h3 className="feature-title">SUPPLIER RELATIONSHIP</h3>
                <p className="feature-description">
                    Connect with suppliers across country through listings and get to see available products and materials. Get instant restock of products by eliminating time looking for suppliers by getting to see hundreds of suppliers and their available products all in one place.
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
                Get instant insights into company performance, financial performance, project performance, profitability, and productivity. Make informed decisions.
                </p>
            </div>
            </div>
        </section>

        <div className="bg-[#001a5e] border-y border-white/10 py-3 overflow-hidden sticky top-0 z-50">
            <div className="animate-marquee whitespace-nowrap flex items-center">
                {Array.from({length: 4}).map((_, i) => (
                    <React.Fragment key={i}>
                        <span className="mx-12 text-[10px] font-mono font-bold uppercase tracking-[0.3em] text-emerald-400">Steel Index / +1.2%</span>
                        <span className="mx-12 text-[10px] font-mono font-bold uppercase tracking-[0.3em] text-white/40">Lumber / $540.00/mbf</span>
                        <span className="mx-12 text-[10px] font-mono font-bold uppercase tracking-[0.3em] text-rose-500">Nails / -0.4%</span>
                        <span className="mx-12 text-[10px] font-mono font-bold uppercase tracking-[0.3em] text-white/40">Wood / STABLE</span>
                    </React.Fragment>
                ))}
            </div>
        </div>

        <section className="relative bg-[#002c9c] text-white py-32 overflow-hidden">
            {/* Background Geometry - Stays behind everything */}
            <div className="absolute inset-0 opacity-5 pointer-events-none">
                <svg width="100%" height="100%">
                    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5"/>
                    </pattern>
                    <rect width="100%" height="100%" fill="url(#grid)" />
                </svg>
            </div>

            <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative">
                <div className="space-y-48">
                    <div id="estimation" className="group grid grid-cols-1 lg:grid-cols-12 gap-12 items-center scroll-mt-40">
                        
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

        {/* FULL WIDTH TICKER AT BOTTOM */}
        <div id="suppliers" className="bg-emerald-400 py-6 overflow-hidden border-t-4 border-black">
            <div className="animate-marquee whitespace-nowrap flex items-center font-black text-2xl text-[#002c9c] uppercase tracking-tighter">
                {Array.from({length: 8}).map((_, i) => (
                    <span key={i} className="mx-10 flex items-center gap-4">
                        500+ Verified Suppliers Connected <div className="w-3 h-3 bg-[#002c9c] rounded-full animate-ping"/> Procurement Streamlined
                    </span>
                ))}
            </div>
        </div>
        
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
                Join hundreds of building companies already building smarter with our platform. <br />
                Explore our platform with out 14-day trial today—no credit card required.
            </p>
            </div>

            <div className="cta-group">
            <a href="/pricing" className="cta-secondary">Click For Pricing</a>
            </div>
        </section>

        {/* FOOTER */}
        <footer>
            <div className="footer-content">
                <div className="footer-brand">
                    <div className="logo-photo-lower"> 
                        <div className="logo-lower flex items-center space-x-3">
                            <svg className="w-9 h-9 text-orange-800" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z"/>
                            </svg>
                            <div>
                                <h1 className="logo-text-lower text-xl font-bold text-gray-900">Urusentra</h1>
                            </div>
                        </div>
                    </div>
                    <p>The management ERP platform built by builders and accountants, for builders and accountants. Streamline your operations and manage your business better.</p>
                    <p>&copy; {formatCurrentYear()} URUSENTRA. All rights reserved.</p>
                </div>

                <div className="footer-column">
                    <h4>Product</h4>
                    <ul>
                    <li><a href="#">Features</a></li>
                    <li><a href="/pricing">Pricing</a></li>
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