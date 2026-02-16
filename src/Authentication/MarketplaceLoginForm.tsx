import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";


import HandleMarketplaceLogin from './HandleMarketplaceLogin';


const formatCurrentYear = () => {
    const currentYear = new Date().getFullYear();
    return `${currentYear}`
}



const MarketplaceLogin = () => {
    const navigate = useNavigate()
    const {handleSubmit, register} = useForm()
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);



    const submission = async (data: any) => {
        if (loading) return
        setLoading(true);
        setError("")

        const toastId = toast.loading('Logging in...', {duration: 8000,});
        try {
            await HandleMarketplaceLogin(data.email, data.password);
            toast.success('Login successful!', {id: toastId});
            navigate(`/marketplace`);
        } catch (error: any) {
            let errorMessage = "";

            if (error.code === "ECONNABORTED") {
                errorMessage = "Network timed out, Please try again. System will wake in 20seconds.";
            }

            else if (error.response?.data?.detail?.[0]) {
                errorMessage = error.response.data.detail[0];
            }

            else if (error.response?.data?.detail) {
                errorMessage = error.response.data.detail;
            }

            else if (error.message) {
                errorMessage = error.message;
            }
            
            else {
                errorMessage = "Invalid email or password";
            }

            setError(errorMessage);
            toast.error(errorMessage, { id: toastId });
            //console.log(errorMessage);
        } finally {
            setLoading(false);
        }
    }




    return(
        <div>
            <title>Login | Urusentra Marketplace · Explore the community of building professionals worldwide</title>
            <meta name="description" content="Secure login to Urusentra Marketplace – modern building industry community" />

            <style>
                {`
                    @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap');

                    * {
                        font-family: 'Poppins', 'sans-serif;
                    }

                    .main-body {
                        font-family: 'Poppins', 'sans-serif;
                    }

                    .logo-text {
                        font-family: 'Montserrat', sans-serif;
                        font-size: 18px;
                    }
                `}
            </style>

            <div className="min-h-screen! bg-white font-poppins! antialiased!">


                <header className="border-b! border-gray-200! bg-white! sticky! top-0! z-50!">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex items-center justify-between h-16">
                            <div className="flex items-center space-x-3">
                                <svg className="w-9 h-9 text-orange-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z"/>
                                </svg>
                                <div>
                                    <h1 className="logo-text text-xl text-left font-bold text-gray-900 leading-none">Urusentra</h1>
                                    <p className="text-[10px] text-gray-500 leading-none">Building & Construction Marketplace</p>
                                </div>
                            </div>
                            
                            <div className="flex items-center space-x-6">
                                <a href="/marketplace-signin" className="text-sm text-gray-600 hover:text-orange-600 font-medium hidden sm:block">Market Homepage</a>
                                <a href="#" className="text-sm text-gray-600 hover:text-orange-600 font-medium hidden sm:block">Help Center</a>
                                <a href="#" className="text-sm text-gray-600 hover:text-orange-600 font-medium">Contact Support</a>
                            </div>
                        </div>
                    </div>
                </header>



                <div className="main-body! max-w-7xl! mx-auto! px-4! sm:px-6! lg:px-8! py-8! lg:py-16!">
                    <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
                        
                        <div
                            className="hidden lg:block! space-y-10! relative! rounded-3xl! overflow-hidden! p-12! max-h-screen!"
                            style={{
                                backgroundImage: `linear-gradient(
                                to bottom,
                                rgba(0, 0, 0, 0.85),
                                rgba(0, 0, 0, 0.75),
                                rgba(0, 0, 0, 0.85)
                                ), url('https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=2070&auto=format&fit=crop')`,
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                            }}
                            >
                            
                            <div className="space-y-6! relative z-10">
                                <p className="text-5xl! font-bold! text-left! text-white! leading-tight! drop-shadow-2xl!">
                                    The Construction Industry's Most Trusted Marketplace
                                </p>
                                <p className="text-xl text-gray-100 text-left leading-relaxed drop-shadow-lg">
                                    Join 50,000+ contractors, suppliers, and builders who source quality materials at competitive prices with reliable delivery.
                                </p>
                            </div>

                            <div className="space-y-6 relative z-10">
                                <div className="flex items-start space-x-4">
                                    <div className="w-12 h-12 rounded-full bg-orange-600 flex items-center justify-center shrink-0 mt-1 shadow-xl">
                                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="text-lg! font-semibold! text-left text-white! mb-2 drop-shadow-lg">Verified Suppliers Only</h3>
                                        <p className="text-white text-left leading-relaxed drop-shadow-md">Every company and contractor is pre-vetted, licensed, and are real users of Urusentra's ERP.</p>
                                    </div>
                                </div>

                                <div className="flex items-start space-x-4">
                                    <div className="w-12 h-12 rounded-full bg-orange-600 flex items-center justify-center shrink-0 mt-1 shadow-xl">
                                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z"/>
                                        </svg>
                                    </div>
                                    <div className='font-poppins!'>
                                        <h3 className="text-lg! font-semibold! text-left! text-white! mb-2! drop-shadow-lg!">Wholesale Pricing</h3>
                                        <p className="text-gray-100! text-left! leading-relaxed! drop-shadow-md!">Save up to 40% with volume discounts and exclusive contractor rates.</p>
                                    </div>
                                </div>

                                <div className="flex items-start space-x-4">
                                    <div className="w-12 h-12 rounded-full bg-orange-600 flex items-center justify-center shrink-0 mt-1 shadow-xl">
                                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold text-left! text-white! mb-2 drop-shadow-lg">Easy real time communication</h3>
                                        <p className="text-gray-100 text-left! leading-relaxed drop-shadow-md">Connect and contact directly and seamlessly with contractors and potential customers in real time.</p>
                                    </div>
                                </div>

                            </div>

                            <div className="bg-white/10! backdrop-blur-sm! mt-16! rounded-2xl! p-8! relative! z-10! border! border-white/20">
                                <p className="text-sm text-gray-200 font-medium mb-6">Trusted by industry leaders:</p>
                                <div className="grid grid-cols-2 gap-8 items-center">
                                    <div className="text-center">
                                        <div className="text-2xl font-bold text-white drop-shadow-lg">50K+</div>
                                        <div className="text-xs text-gray-200 mt-1">Active Users</div>
                                    </div>
                                    <div className="text-center border-l border-white/30">
                                        <div className="text-2xl font-bold text-white drop-shadow-lg">4.8★</div>
                                        <div className="text-xs text-gray-200 mt-1">User Rating</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="w-full max-w-md mx-auto lg:mx-0">
                            
                            {/*-- Mobile Logo -*/}
                            <div className="lg:hidden flex items-center justify-center space-x-3 mb-8">
                                <svg className="w-9 h-9 text-orange-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z"/>
                                </svg>
                                <div>
                                    <h1 className="text-xl font-bold text-gray-900 leading-none">Urusentra</h1>
                                    <p className="text-[10px] text-gray-500 leading-none">Building & Construction Marketplace</p>
                                </div>
                            </div>

                            <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-8 sm:p-10">
                                
                                {/*-- Form Header -*/}
                                <div className="mb-8">
                                    <h3 className="text-2xl text-left! font-bold text-gray-900 mb-2">Sign in to your account</h3>
                                    <p className="text-gray-600 text-left!">Welcome back! Please enter your details.</p>
                                </div>

                                {/*-- Login Form -*/}
                                <form onSubmit={handleSubmit(submission)} className="space-y-5">
                                    
                                    {/*-- Email Input -*/}
                                    <div>
                                        <label htmlFor="email" className="block! text-left text-sm font-medium text-gray-700 mb-2">Email</label>
                                        <input 
                                            type="email" 
                                            {...register('email')}
                                            placeholder="Enter your email"
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all text-gray-900 placeholder-gray-400"
                                        />
                                    </div>

                                    {/*-- Password Input -*/}
                                    <div>
                                        <label htmlFor="password" className="block! text-left text-sm font-medium text-gray-700 mb-2">Password</label>
                                        <div className="relative">
                                            <input 
                                                type={showPassword ? "text" : "password"}
                                                {...register('password')} 
                                                placeholder="Enter your password"
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all text-gray-900 placeholder-gray-400"
                                            />
                                            <button 
                                                type="button"
                                                onClick={() => setShowPassword(!showPassword)}
                                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                                            >
                                                {showPassword ? (
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"/>
                                                    </svg>
                                                ) : (
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"/>
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                                                    </svg>
                                                )}
                                            </button>
                                        </div>
                                    </div>

                                    {/*-- Remember Me & Forgot Password -*/}
                                    <div className="flex items-center justify-between">
                                        <label className="flex items-center cursor-pointer">
                                            <input type="checkbox" className="w-4 h-4 text-orange-600 border-gray-300 rounded focus:ring-orange-500 cursor-pointer"/>
                                            <span className="ml-2 text-sm text-gray-700">Remember me</span>
                                        </label>
                                        <a href="#" className="text-sm font-medium text-orange-600 hover:text-orange-700">Forgot password?</a>
                                    </div>

                                    {/*-- Sign In Button -*/}
                                    <button 
                                        type="submit"
                                        className="w-full bg-orange-600 text-white py-3 rounded-lg font-semibold hover:bg-orange-700 active:bg-orange-800 transition-colors shadow-sm"
                                    >
                                        Sign in
                                    </button>

                                    {/*-- Divider -*/}
                                    <div className="relative my-6">
                                        <div className="absolute inset-0 flex items-center">
                                            <div className="w-full border-t border-gray-200"></div>
                                        </div>
                                    </div>

                                </form>

                                {/*-- Sign Up Link -*/}
                                <p className="mt-8 text-center text-sm text-gray-600">
                                    Don't have an account? 
                                    <a href="/marketplace-register" className="font-medium text-orange-600 hover:text-orange-700"> Sign up for free</a>
                                </p>
                            </div>

                            {/*-- Security Badge -*/}
                            <div className="mt-6 flex items-center justify-center space-x-2 text-gray-500">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"/>
                                </svg>
                                <span className="text-xs">Your information is protected with govt-approved security</span>
                            </div>
                        </div>
                    </div>
                </div>


                <footer className="border-t border-gray-200 bg-gray-50 mt-16">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                        <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
                            <div className="flex items-center space-x-6 text-sm text-gray-600">
                                <a href="#" className="hover:text-orange-600">Privacy Policy</a>
                                <a href="#" className="hover:text-orange-600">Terms of Service</a>
                                <a href="#" className="hover:text-orange-600">Help Center</a>
                            </div>
                            <p className="text-sm text-gray-500">&copy; {formatCurrentYear()} Urusentra Marketplace. All rights reserved.</p>
                        </div>
                    </div>
                </footer>

            </div>
        </div>
    );
};
export default MarketplaceLogin;
