import React, { useState } from 'react';
import MarketplaceLoginModal from "../components/Modals/MarketplaceLoginModal";
import { useNavigate } from 'react-router-dom';







export default function MarketplaceLanding() {
    const [loginOpen, setLoginOpen] = useState(true);
    const navigate = useNavigate()

    const openLogin = () => setLoginOpen(true);
    const closeLogin = () => setLoginOpen(false);


    return (
        <div className="app">
            <title>Market Homepage | Urusentra · Explore the community of building professionals worldwide</title>
            <meta name="description" content="Urusentra Marketplace – modern building industry community" />

            <style>
                {` 
                    @import url("https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Outfit:wght@300;400;500;600;700;800&display=swap");
                
                    * { font-family: 'Outfit', sans-serif; }

                    .font-display { 
                        font-family: 'Bebas Neue', sans-serif; 
                        }
                
                    .supplier-card {
                        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                    }
                    .supplier-card:hover {
                        transform: translateY(-4px);
                        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.12);
                    }



                    .logo-text {
                        font-family: 'Montserrat', sans-serif;
                        font-size: 18px;
                    }
                `}
            </style>

            <div className="bg-stone-50 font-body antialiased">

                <nav className="sticky top-0 z-50 bg-white border-b border-stone-200">
                    <div className="max-w-400 mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex items-center justify-between h-16">
                            <div className="flex items-center space-x-3">
                                <svg className="w-9 h-9 text-orange-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z"/>
                                </svg>
                                <div>
                                    <h1 className="logo-text text-xl font-bold text-gray-900">Urusentra</h1>
                                    <p className="text-[9px] text-gray-500 uppercase tracking-widest font-medium">Marketplace</p>
                                </div>
                            </div>
                            
                            <div className="hidden md:block flex-1 max-w-2xl mx-8">
                                <div className="relative">
                                    <input 
                                        type="text" 
                                        placeholder="Search suppliers, specialities, locations..."
                                        className="w-full px-5 py-2.5 bg-stone-50 border border-stone-300 rounded-lg text-gray-900 placeholder-gray-400 focus:border-orange-600 focus:ring-2 focus:ring-orange-600/20 outline-none transition-all"
                                    />
                                    <button className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-1.5 bg-orange-600 text-white text-sm font-semibold rounded-md hover:bg-orange-700 transition"
                                    onClick={openLogin}
                                    >
                                        Search
                                    </button>
                                </div>
                            </div>
                            
                            <div className="flex items-center space-x-6">
                                <a href="/" className="hidden sm:block text-sm font-semibold text-gray-700 hover:text-orange-600 transition">Home</a>
                                <a href="/marketplace-login" className="hidden sm:block text-sm font-semibold text-gray-700 hover:text-orange-600 transition">Login</a>
                                <a href="/marketplace-register" className="hidden sm:block text-sm font-semibold text-gray-700 hover:text-orange-600 transition">Register</a>
                                <button onClick={openLogin}
                                    className="text-gray-600 hover:text-orange-600 transition"
                                >
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"/>
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </nav>



                <div className="bg-white border-b border-stone-200">
                    <div className="max-w-400 mx-auto px-4 sm:px-6 lg:px-8 py-3">
                        <div className="flex items-center space-x-2 text-sm">
                            <a onClick={openLogin} className="text-gray-500 hover:text-orange-600 transition cursor-pointer">Home</a>
                            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5"/>
                            </svg>
                            <a onClick={openLogin} className="text-gray-500 hover:text-orange-600 transition cursor-pointer">Find Suppliers</a>
                            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5"/>
                            </svg>
                            <span className="text-gray-900 font-semibold">Lumber & Wood Suppliers</span>
                        </div>
                    </div>
                </div>


                <div className="max-w-400 mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="flex gap-8">
                        
                        <aside className="hidden lg:block w-80 shrink-0">
                            <div className="sticky top-24 space-y-6">
                                
                                <div className="bg-white border border-stone-200 rounded-xl p-6">
                                    <div className="flex items-center justify-between mb-6">
                                        <h2 className="text-lg font-bold text-gray-900">Filters</h2>
                                        <button onClick={openLogin} className="text-sm text-orange-600 hover:text-orange-700 font-semibold">Clear All</button>
                                    </div>
                                    
                                    <div className="mb-6 pb-6 border-b border-stone-200">
                                        <h3 className="text-sm font-bold text-gray-900 mb-3 uppercase tracking-wider">Location</h3>
                                        <input type="text" placeholder="City or Zip Code" className="w-full px-4 py-2 border border-stone-300 rounded-lg text-sm focus:border-orange-600 focus:ring-2 focus:ring-orange-600/20 outline-none mb-3"/>
                                        <div className="space-y-2">
                                            <label className="flex items-center cursor-pointer group">
                                                <input type="checkbox" className="w-4 h-4 text-orange-600 border-gray-300 rounded focus:ring-orange-500"/>
                                                <span className="ml-3 text-sm text-gray-700 group-hover:text-orange-600 transition">Within 50 miles</span>
                                            </label>
                                            <label className="flex items-center cursor-pointer group">
                                                <input type="checkbox" className="w-4 h-4 text-orange-600 border-gray-300 rounded focus:ring-orange-500"/>
                                                <span className="ml-3 text-sm text-gray-700 group-hover:text-orange-600 transition">Within 100 miles</span>
                                            </label>
                                            <label className="flex items-center cursor-pointer group">
                                                <input type="checkbox" className="w-4 h-4 text-orange-600 border-gray-300 rounded focus:ring-orange-500"/>
                                                <span className="ml-3 text-sm text-gray-700 group-hover:text-orange-600 transition">Worldwide Shipping</span>
                                            </label>
                                        </div>
                                    </div>
                                    
                                    <div className="mb-6 pb-6 border-b border-stone-200">
                                        <h3 className="text-sm font-bold text-gray-900 mb-3 uppercase tracking-wider">Specialities</h3>
                                        <div className="space-y-2 max-h-48 overflow-y-auto pr-2">
                                            <label className="flex items-center cursor-pointer group">
                                                <input type="checkbox" checked className="w-4 h-4 text-orange-600 border-gray-300 rounded focus:ring-orange-500"/>
                                                <span className="ml-3 text-sm text-gray-700 group-hover:text-orange-600 transition">Framing Lumber</span>
                                                <span className="ml-auto text-xs text-gray-400">(245)</span>
                                            </label>
                                            <label className="flex items-center cursor-pointer group">
                                                <input type="checkbox" className="w-4 h-4 text-orange-600 border-gray-300 rounded focus:ring-orange-500"/>
                                                <span className="ml-3 text-sm text-gray-700 group-hover:text-orange-600 transition">Hardwood</span>
                                                <span className="ml-auto text-xs text-gray-400">(189)</span>
                                            </label>
                                            <label className="flex items-center cursor-pointer group">
                                                <input type="checkbox" className="w-4 h-4 text-orange-600 border-gray-300 rounded focus:ring-orange-500"/>
                                                <span className="ml-3 text-sm text-gray-700 group-hover:text-orange-600 transition">Plywood & Panels</span>
                                                <span className="ml-auto text-xs text-gray-400">(156)</span>
                                            </label>
                                            <label className="flex items-center cursor-pointer group">
                                                <input type="checkbox" className="w-4 h-4 text-orange-600 border-gray-300 rounded focus:ring-orange-500"/>
                                                <span className="ml-3 text-sm text-gray-700 group-hover:text-orange-600 transition">Treated Lumber</span>
                                                <span className="ml-auto text-xs text-gray-400">(132)</span>
                                            </label>
                                            <label className="flex items-center cursor-pointer group">
                                                <input type="checkbox" className="w-4 h-4 text-orange-600 border-gray-300 rounded focus:ring-orange-500"/>
                                                <span className="ml-3 text-sm text-gray-700 group-hover:text-orange-600 transition">Decking Materials</span>
                                                <span className="ml-auto text-xs text-gray-400">(98)</span>
                                            </label>
                                            <label className="flex items-center cursor-pointer group">
                                                <input type="checkbox" className="w-4 h-4 text-orange-600 border-gray-300 rounded focus:ring-orange-500"/>
                                                <span className="ml-3 text-sm text-gray-700 group-hover:text-orange-600 transition">Custom Milling</span>
                                                <span className="ml-auto text-xs text-gray-400">(67)</span>
                                            </label>
                                        </div>
                                    </div>
                                    
                                    <div className="mb-6 pb-6 border-b border-stone-200">
                                        <h3 className="text-sm font-bold text-gray-900 mb-3 uppercase tracking-wider">Supplier Rating</h3>
                                        <div className="space-y-2">
                                            <label className="flex items-center cursor-pointer group">
                                                <input type="checkbox" className="w-4 h-4 text-orange-600 border-gray-300 rounded focus:ring-orange-500"/>
                                                <span className="ml-3 text-sm text-gray-700 group-hover:text-orange-600 transition flex items-center">
                                                    <span className="text-yellow-400 text-base">★★★★★</span>
                                                    <span className="ml-2">5.0</span>
                                                </span>
                                            </label>
                                            <label className="flex items-center cursor-pointer group">
                                                <input type="checkbox" className="w-4 h-4 text-orange-600 border-gray-300 rounded focus:ring-orange-500"/>
                                                <span className="ml-3 text-sm text-gray-700 group-hover:text-orange-600 transition flex items-center">
                                                    <span className="text-yellow-400 text-base">★★★★</span>
                                                    <span className="ml-2">4.0+</span>
                                                </span>
                                            </label>
                                            <label className="flex items-center cursor-pointer group">
                                                <input type="checkbox" className="w-4 h-4 text-orange-600 border-gray-300 rounded focus:ring-orange-500"/>
                                                <span className="ml-3 text-sm text-gray-700 group-hover:text-orange-600 transition flex items-center">
                                                    <span className="text-yellow-400 text-base">★★★</span>
                                                    <span className="ml-2">3.0+</span>
                                                </span>
                                            </label>
                                        </div>
                                    </div>
                                    
                                    <div className="mb-6 pb-6 border-b border-stone-200">
                                        <h3 className="text-sm font-bold text-gray-900 mb-3 uppercase tracking-wider">Certifications</h3>
                                        <div className="space-y-2">
                                            <label className="flex items-center cursor-pointer group">
                                                <input type="checkbox" className="w-4 h-4 text-orange-600 border-gray-300 rounded focus:ring-orange-500"/>
                                                <span className="ml-3 text-sm text-gray-700 group-hover:text-orange-600 transition">ISO 9001</span>
                                            </label>
                                            <label className="flex items-center cursor-pointer group">
                                                <input type="checkbox" className="w-4 h-4 text-orange-600 border-gray-300 rounded focus:ring-orange-500"/>
                                                <span className="ml-3 text-sm text-gray-700 group-hover:text-orange-600 transition">FSC Certified</span>
                                            </label>
                                            <label className="flex items-center cursor-pointer group">
                                                <input type="checkbox" className="w-4 h-4 text-orange-600 border-gray-300 rounded focus:ring-orange-500"/>
                                                <span className="ml-3 text-sm text-gray-700 group-hover:text-orange-600 transition">Licensed & Insured</span>
                                            </label>
                                            <label className="flex items-center cursor-pointer group">
                                                <input type="checkbox" className="w-4 h-4 text-orange-600 border-gray-300 rounded focus:ring-orange-500"/>
                                                <span className="ml-3 text-sm text-gray-700 group-hover:text-orange-600 transition">LEED Certified</span>
                                            </label>
                                        </div>
                                    </div>
                                    
                                    <div className="mb-6">
                                        <h3 className="text-sm font-bold text-gray-900 mb-3 uppercase tracking-wider">Company Size</h3>
                                        <div className="space-y-2">
                                            <label className="flex items-center cursor-pointer group">
                                                <input type="checkbox" className="w-4 h-4 text-orange-600 border-gray-300 rounded focus:ring-orange-500"/>
                                                <span className="ml-3 text-sm text-gray-700 group-hover:text-orange-600 transition">Small (1-50)</span>
                                            </label>
                                            <label className="flex items-center cursor-pointer group">
                                                <input type="checkbox" className="w-4 h-4 text-orange-600 border-gray-300 rounded focus:ring-orange-500"/>
                                                <span className="ml-3 text-sm text-gray-700 group-hover:text-orange-600 transition">Medium (51-200)</span>
                                            </label>
                                            <label className="flex items-center cursor-pointer group">
                                                <input type="checkbox" className="w-4 h-4 text-orange-600 border-gray-300 rounded focus:ring-orange-500"/>
                                                <span className="ml-3 text-sm text-gray-700 group-hover:text-orange-600 transition">Large (200+)</span>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="bg-linear-to-br from-orange-600 to-orange-500 rounded-xl p-6 text-white">
                                    <h3 className="font-display text-2xl mb-2 tracking-wider">LIST YOUR COMPANY</h3>
                                    <p className="text-orange-50 text-sm mb-4">Connect with 50K+ contractors nationwide</p>
                                    <button onClick={() => navigate("/marketplace-register")} className="w-full px-4 py-2 bg-white text-orange-600 font-semibold text-sm rounded-lg hover:bg-orange-50 transition">Become a Supplier</button>
                                </div>
                            </div>
                        </aside>
                        
                        <main className="flex-1">
                            
                            <div className="bg-white border border-stone-200 rounded-xl p-4 mb-6">
                                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                                    <div className="flex items-center space-x-4">
                                        <span className="text-sm text-gray-600">Showing <span className="font-semibold text-gray-900">2935</span> suppliers</span>
                                        <span className="text-gray-300">|</span>
                                        <button onClick={openLogin} className="lg:hidden text-sm text-orange-600 font-semibold flex items-center">
                                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75"/>
                                            </svg>
                                            Filters
                                        </button>
                                    </div>
                                    
                                    <div className="flex items-center space-x-3">
                                        <span className="text-sm text-gray-600">Sort by:</span>
                                        <select className="px-4 py-2 border border-stone-300 rounded-lg text-sm font-medium text-gray-900 focus:border-orange-600 focus:ring-2 focus:ring-orange-600/20 outline-none cursor-pointer">
                                            <option>Best Match</option>
                                            <option>Highest Rated</option>
                                            <option>Most Reviews</option>
                                            <option>Nearest to Me</option>
                                            <option>Years in Business</option>
                                            <option>Response Time</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="space-y-5">
                                
                                <div className="supplier-card bg-white border-2 border-orange-200 rounded-xl overflow-hidden cursor-pointer">
                                    <div className="p-6">
                                        <div className="flex items-start gap-6">

                                            <div className="shrink-0">
                                                <div className="w-24 h-24 bg-linear-to-br from-orange-100 to-orange-50 rounded-xl flex items-center justify-center border-2 border-orange-200">
                                                    <span className="font-display text-3xl text-orange-600 tracking-wider">TC</span>
                                                </div>
                                                <div className="mt-2 flex items-center justify-center">
                                                    <span className="px-2 py-1 bg-orange-600 text-white text-xs font-bold rounded uppercase tracking-wider">Featured</span>
                                                </div>
                                            </div>
                                            
                                            <div className="flex-1">
                                                <div className="flex items-start justify-between mb-3">
                                                    <div>
                                                        <div className="flex items-center space-x-2 mb-1">
                                                            <h3 className="text-2xl font-bold text-gray-900">TimberCraft Lumber Sdn Bhd.</h3>
                                                            <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                                                                <path d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"/>
                                                            </svg>
                                                        </div>
                                                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                                                            <span className="flex items-center">
                                                                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                                                                    <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"/>
                                                                    <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"/>
                                                                </svg>
                                                                Kajang, Kuala Lumpur
                                                            </span>
                                                            <span className="text-gray-300">|</span>
                                                            <span>Est. 1982 · 42 years in business</span>
                                                        </div>
                                                    </div>
                                                    
                                                    <div className="text-right">
                                                        <div className="flex items-center space-x-1 mb-1">
                                                            <span className="text-yellow-400 text-xl">★★★★★</span>
                                                            <span className="text-2xl font-bold text-gray-900">4.9</span>
                                                        </div>
                                                        <p className="text-sm text-gray-600">1,247 reviews</p>
                                                    </div>
                                                </div>
                                                
                                                <p className="text-gray-700 leading-relaxed mb-4">
                                                    Premium lumber supplier specializing in sustainably-sourced framing lumber, hardwoods, and custom milling services. Serving contractors and builders across Southeast Asia since 1982.
                                                </p>
                                                
                                                <div className="flex flex-wrap gap-2 mb-4">
                                                    <span className="px-3 py-1 bg-stone-100 text-gray-700 text-xs font-semibold rounded-full">Framing Lumber</span>
                                                    <span className="px-3 py-1 bg-stone-100 text-gray-700 text-xs font-semibold rounded-full">Hardwood</span>
                                                    <span className="px-3 py-1 bg-stone-100 text-gray-700 text-xs font-semibold rounded-full">Custom Milling</span>
                                                    <span className="px-3 py-1 bg-stone-100 text-gray-700 text-xs font-semibold rounded-full">FSC Certified</span>
                                                </div>
                                                
                                                <div className="flex items-center justify-between pt-4 border-t border-stone-200">
                                                    <div className="flex items-center space-x-6 text-sm">
                                                        <div className="flex items-center text-gray-600">
                                                            <svg className="w-4 h-4 mr-1.5 text-green-600" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                                                                <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                                            </svg>
                                                            <span className="font-semibold">Avg Response:</span>
                                                            <span className="ml-1">2 hours</span>
                                                        </div>
                                                        <div className="flex items-center text-gray-600">
                                                            <svg className="w-4 h-4 mr-1.5 text-blue-600" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                                                                <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"/>
                                                            </svg>
                                                            <span className="font-semibold">Ships to:</span>
                                                            <span className="ml-1">Southeast Asia</span>
                                                        </div>
                                                        <div className="flex items-center text-gray-600">
                                                            <span className="font-semibold">Min Order:</span>
                                                            <span className="ml-1">RM500</span>
                                                        </div>
                                                    </div>
                                                    
                                                    <div className="flex items-center space-x-3">
                                                        <button onClick={openLogin} className="px-5 py-2.5 border-2 border-orange-600 text-orange-600 font-semibold rounded-lg hover:bg-orange-50 transition">
                                                            Contact Supplier
                                                        </button>
                                                        <button onClick={openLogin} className="px-5 py-2.5 bg-orange-600 text-white font-semibold rounded-lg hover:bg-orange-700 transition">
                                                            View Products
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="supplier-card bg-white border border-stone-200 rounded-xl overflow-hidden cursor-pointer">
                                    <div className="p-6">
                                        <div className="flex items-start gap-6">
                                            <div className="shrink-0">
                                                <div className="w-24 h-24 bg-linear-to-br from-gray-100 to-gray-50 rounded-xl flex items-center justify-center border border-stone-200">
                                                    <span className="font-display text-3xl text-gray-900 tracking-wider">PW</span>
                                                </div>
                                            </div>
                                            
                                            <div className="flex-1">
                                                <div className="flex items-start justify-between mb-3">
                                                    <div>
                                                        <div className="flex items-center space-x-2 mb-1">
                                                            <h3 className="text-2xl font-bold text-gray-900">Yangtze WoodWorks</h3>
                                                            <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                                                                <path d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"/>
                                                            </svg>
                                                        </div>
                                                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                                                            <span className="flex items-center">
                                                                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                                                                    <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"/>
                                                                    <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"/>
                                                                </svg>
                                                                Shandong, China
                                                            </span>
                                                            <span className="text-gray-300">|</span>
                                                            <span>Est. 1995 · 29 years in business</span>
                                                        </div>
                                                    </div>
                                                    
                                                    <div className="text-right">
                                                        <div className="flex items-center space-x-1 mb-1">
                                                            <span className="text-yellow-400 text-xl">★★★★★</span>
                                                            <span className="text-2xl font-bold text-gray-900">4.8</span>
                                                        </div>
                                                        <p className="text-sm text-gray-600">892 reviews</p>
                                                    </div>
                                                </div>
                                                
                                                <p className="text-gray-700 leading-relaxed mb-4">
                                                    Wholesale distributor of quality plywood, engineered lumber, and treated materials. We pride ourselves on competitive pricing and same-day delivery within 100 miles.
                                                </p>
                                                
                                                <div className="flex flex-wrap gap-2 mb-4">
                                                    <span className="px-3 py-1 bg-stone-100 text-gray-700 text-xs font-semibold rounded-full">Plywood</span>
                                                    <span className="px-3 py-1 bg-stone-100 text-gray-700 text-xs font-semibold rounded-full">Treated Lumber</span>
                                                    <span className="px-3 py-1 bg-stone-100 text-gray-700 text-xs font-semibold rounded-full">Same-Day Delivery</span>
                                                    <span className="px-3 py-1 bg-stone-100 text-gray-700 text-xs font-semibold rounded-full">ISO 9001</span>
                                                </div>
                                                
                                                <div className="flex items-center justify-between pt-4 border-t border-stone-200">
                                                    <div className="flex items-center space-x-6 text-sm">
                                                        <div className="flex items-center text-gray-600">
                                                            <svg className="w-4 h-4 mr-1.5 text-green-600" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                                                                <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                                            </svg>
                                                            <span className="font-semibold">Avg Response:</span>
                                                            <span className="ml-1">4 hours</span>
                                                        </div>
                                                        <div className="flex items-center text-gray-600">
                                                            <svg className="w-4 h-4 mr-1.5 text-blue-600" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                                                                <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"/>
                                                            </svg>
                                                            <span className="font-semibold">Ships to:</span>
                                                            <span className="ml-1">Worldwide</span>
                                                        </div>
                                                        <div className="flex items-center text-gray-600">
                                                            <span className="font-semibold">Min Order:</span>
                                                            <span className="ml-1">¥300</span>
                                                        </div>
                                                    </div>
                                                    
                                                    <div className="flex items-center space-x-3">
                                                        <button onClick={openLogin} className="px-5 py-2.5 border-2 border-orange-600 text-orange-600 font-semibold rounded-lg hover:bg-orange-50 transition">
                                                            Contact Supplier
                                                        </button>
                                                        <button onClick={openLogin} className="px-5 py-2.5 bg-orange-600 text-white font-semibold rounded-lg hover:bg-orange-700 transition">
                                                            View Products
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="supplier-card bg-white border border-stone-200 rounded-xl overflow-hidden cursor-pointer">
                                    <div className="p-6">
                                        <div className="flex items-start gap-6">
                                            <div className="shrink-0">
                                                <div className="w-24 h-24 bg-linear-to-br from-blue-100 to-blue-50 rounded-xl flex items-center justify-center border border-blue-200">
                                                    <span className="font-display text-3xl text-blue-600 tracking-wider">HH</span>
                                                </div>
                                            </div>
                                            
                                            <div className="flex-1">
                                                <div className="flex items-start justify-between mb-3">
                                                    <div>
                                                        <div className="flex items-center space-x-2 mb-1">
                                                            <h3 className="text-2xl font-bold text-gray-900">Heritage Hardwoods Ltd.</h3>
                                                        </div>
                                                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                                                            <span className="flex items-center">
                                                                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                                                                    <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"/>
                                                                    <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"/>
                                                                </svg>
                                                                Pretoria, South Africa
                                                            </span>
                                                            <span className="text-gray-300">|</span>
                                                            <span>Est. 2008 · 16 years in business</span>
                                                        </div>
                                                    </div>
                                                    
                                                    <div className="text-right">
                                                        <div className="flex items-center space-x-1 mb-1">
                                                            <span className="text-yellow-400 text-xl">★★★★★</span>
                                                            <span className="text-2xl font-bold text-gray-900">5.0</span>
                                                        </div>
                                                        <p className="text-sm text-gray-600">456 reviews</p>
                                                    </div>
                                                </div>
                                                
                                                <p className="text-gray-700 leading-relaxed mb-4">
                                                    Premium domestic and exotic hardwoods for custom woodworking, cabinetry, and high-end construction projects. Expert milling and finishing services available.
                                                </p>
                                                
                                                <div className="flex flex-wrap gap-2 mb-4">
                                                    <span className="px-3 py-1 bg-stone-100 text-gray-700 text-xs font-semibold rounded-full">Exotic Hardwood</span>
                                                    <span className="px-3 py-1 bg-stone-100 text-gray-700 text-xs font-semibold rounded-full">Custom Milling</span>
                                                    <span className="px-3 py-1 bg-stone-100 text-gray-700 text-xs font-semibold rounded-full">Premium Quality</span>
                                                    <span className="px-3 py-1 bg-stone-100 text-gray-700 text-xs font-semibold rounded-full">FSC Certified</span>
                                                </div>
                                                
                                                <div className="flex items-center justify-between pt-4 border-t border-stone-200">
                                                    <div className="flex items-center space-x-6 text-sm">
                                                        <div className="flex items-center text-gray-600">
                                                            <svg className="w-4 h-4 mr-1.5 text-green-600" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                                                                <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                                            </svg>
                                                            <span className="font-semibold">Avg Response:</span>
                                                            <span className="ml-1">1 hour</span>
                                                        </div>
                                                        <div className="flex items-center text-gray-600">
                                                            <svg className="w-4 h-4 mr-1.5 text-blue-600" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                                                                <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"/>
                                                            </svg>
                                                            <span className="font-semibold">Ships to:</span>
                                                            <span className="ml-1">Worldwide</span>
                                                        </div>
                                                        <div className="flex items-center text-gray-600">
                                                            <span className="font-semibold">Min Order:</span>
                                                            <span className="ml-1">R750</span>
                                                        </div>
                                                    </div>
                                                    
                                                    <div className="flex items-center space-x-3">
                                                        <button onClick={openLogin} className="px-5 py-2.5 border-2 border-orange-600 text-orange-600 font-semibold rounded-lg hover:bg-orange-50 transition">
                                                            Contact Supplier
                                                        </button>
                                                        <button onClick={openLogin} className="px-5 py-2.5 bg-orange-600 text-white font-semibold rounded-lg hover:bg-orange-700 transition">
                                                            View Products
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                                
                            </div>
                            
                            <div className="mt-12 flex items-center justify-center">
                                <nav className="flex items-center space-x-2">
                                    <button onClick={openLogin} className="px-4 py-2 border border-stone-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-stone-50 transition">
                                        Previous
                                    </button>
                                    <button onClick={openLogin} className="px-4 py-2 bg-orange-600 text-white rounded-lg text-sm font-medium">1</button>
                                    <button onClick={openLogin} className="px-4 py-2 border border-stone-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-stone-50 transition">2</button>
                                    <button onClick={openLogin} className="px-4 py-2 border border-stone-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-stone-50 transition">3</button>
                                    <span className="px-2 text-gray-400">...</span>
                                    <button onClick={openLogin} className="px-4 py-2 border border-stone-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-stone-50 transition">12</button>
                                    <button onClick={openLogin} className="px-4 py-2 border border-stone-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-stone-50 transition">
                                        Next
                                    </button>
                                </nav>
                            </div>
                        </main>
                    </div>
                </div>
                
        </div>
        <MarketplaceLoginModal open={loginOpen} onClose={closeLogin} />
    </div>
    );
}
