import React, { lazy, Suspense, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

import HandleMarketplaceRegistration from "./HandleMarketplaceRegistration";
import { spinningStyles } from "./Styles";
import { MARKETPLACE_ROLE_OPTIONS } from "./Options";




const FormFallback = () => (
  <div className="whiteBox" style={{ width: 420, maxWidth: '100%', padding: 20 }}>
    <div style={{ height: 400, background: '#f5f5f5', borderRadius: 8, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <span className={spinningStyles.terminalBar.spinner}></span>
    </div>
  </div>
);

const formatCurrentYear = () => {
    const currentYear = new Date().getFullYear();
    return `${currentYear}`
}




const MarketplaceRegister = () => {
    const navigate = useNavigate()
    const {handleSubmit, register} = useForm();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [showPassword1, setShowPassword1] = useState(false);
    const [showPassword2, setShowPassword2] = useState(false);


    const submission = async (data: any) => {
        if (loading) return
        setLoading(true);
        setError("")

        const toastId = toast.loading('Registering...', {duration: 8000,});
        try {
            await HandleMarketplaceRegistration({
                email: data.email,
                password1: data.password1,
                password2: data.password2,
                company: data.company,
                role: data.role
            });
            navigate(`/marketplace-login`);
            toast.success('Registration successful! Login with credentials.', {id: toastId});
        } catch (error: any) {
            let errorMessage = "";
            let errorMessage2 = "";

            if (error.code === "ECONNABORTED") {
                errorMessage = "Request timed out. Please try again. System will wake in 20seconds.";
            }

            else if (error.response?.data?.detail?.[0]) {
                errorMessage = error.response.data.detail[0];
            }

            else if (error.response?.data?.detail) {
                errorMessage = error.response.data.detail;
            }

            else if (error.response?.data?.password1) {
                errorMessage = error.response.data.password1;
            }

            else if (error.message) {
                errorMessage = error.message;
            }
            
            else {
                errorMessage = "Invalid credentials."
            }

            setError(errorMessage);
            toast.error(errorMessage, {id: toastId});
            //console.log(errorMessage);
        } finally {
            setLoading(false);
        }
    }


    const roleOptions = useMemo(() => MARKETPLACE_ROLE_OPTIONS.map(option => (
        <option key={option} value={option}>
            {option}
        </option>
    )), [MARKETPLACE_ROLE_OPTIONS])

    return(
        <>
            <title>Registration | Urusentra Marketplace · Explore the community of building professionals worldwide</title>
            <meta name="description" content="Secure registration to Urusentra Marketplace – modern building industry community" />

            <style>
                {`
                    * { font-family: 'Outfit', sans-serif; }
                    .font-display { font-family: 'Bebas Neue', sans-serif; }
                    
                    /* Step indicator active state */
                    .step-active {
                        background: linear-gradient(135deg, #ea580c 0%, #f97316 100%);
                    }
                    
                    /* Smooth transitions */
                    input:focus, select:focus, textarea:focus {
                        transition: all 0.2s ease;
                    }

                    .logo-text {
                        font-family: 'Montserrat', sans-serif;
                        font-size: 18px;
                    }
                `}
            </style>

            <div className="min-h-screen bg-stone-50 font-body antialiased">


                <header className="border-b border-stone-200 bg-white sticky top-0 z-50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex items-center justify-between h-16">
                            <a className="flex items-center space-x-3" href="/marketplace-login">
                                <svg className="w-9 h-9 text-orange-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z"/>
                                </svg>
                                <div>
                                    <h1 className="logo-text text-xl text-left font-bold text-gray-900 leading-none">Urusentra</h1>
                                    <p className="text-[10px] text-gray-500 leading-none">Building & Construction Marketplace</p>
                                </div>
                            </a>
                            
                            <div className="flex items-center space-x-2">
                                <span className="text-sm text-gray-600">Already have an account?</span>
                                <a href="/marketplace-login" className="text-sm font-semibold text-orange-600 hover:text-orange-700 transition">
                                    Sign In
                                </a>
                            </div>
                        </div>
                    </div>
                </header>



                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
                    <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
                        
                        {/*-- Left Side - Benefits & Trust Signals */}
                        <div className="hidden text-left lg:block space-y-8 sticky top-28">
                            {/*-- Main Headline */}
                            <div>
                                <h2 className="font-display text-6xl! text-gray-900! leading-tight! mb-4! tracking-tight!">
                                    SIGN UP FOR FREE<br/>
                                    <span className="text-orange-600">ADVERTISE YOUR PRODUCTS</span>
                                </h2>
                                <a className="font-display! text-xl! text-gray-600! leading-relaxed!">
                                    Advertise your stock and products to thousands of verified building companies and contractors worldwide.
                                </a>
                            </div>
                            
                            {/*-- Benefits List */}
                            <div className="space-y-6">
                                <div className="flex items-start space-x-4">
                                    <div className="w-12 h-12 rounded-xl bg-orange-600 flex items-center justify-center shrink-0">
                                        <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                        </svg>
                                    </div>
                                    <div>
                                        <a className="text-lg! font-bold! text-gray-900! mb-2!">Verified Contractors Only</a> <br/>
                                        <a className="text-gray-600! leading-relaxed!">Every company and contractor is pre-vetted, licensed, and are real users of Urusentra's ERP.</a>
                                    </div>
                                </div>
                                
                                <div className="flex items-start space-x-4">
                                    <div className="w-12 h-12 rounded-xl bg-orange-600 flex items-center justify-center shrink-0">
                                        <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z"/>
                                        </svg>
                                    </div>
                                    <div>
                                        <a className="text-lg! font-bold! text-gray-900! mb-2!">Profitable Retention</a><br />
                                        <a className="text-gray-600! leading-relaxed!">Guaranteed to get and retain countless customers at once from all around the world.</a>
                                    </div>
                                </div>
                                
                                <div className="flex items-start space-x-4">
                                    <div className="w-12 h-12 rounded-xl bg-orange-600 flex items-center justify-center shrink-0">
                                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <a className="text-lg! font-bold! text-gray-900! mb-2!">Easy real time communication</a><br />
                                        <a className="text-gray-600! leading-relaxed!">Connect and contact directly and seamlessly with contractors and potential customers in real time.</a>
                                    </div>
                                </div>
                            </div>
                            
                            {/*-- Trust Stats */}
                            <div className="bg-white border-2 border-stone-200 rounded-2xl p-8">
                                <p className="text-sm! font-semibold! text-gray-600! uppercase! tracking-wider! mb-6!">Trusted by:</p>
                                <div className="grid grid-cols-2 gap-3">
                                    <div className="text-center">
                                        <div className="text-3xl font-display text-gray-900 mb-1!">50K+</div>
                                        <div className="text-xs! text-gray-600!">Active Users</div>
                                    </div>
                                    <div className="text-center border-l border-stone-200">
                                        <div className="text-3xl font-display text-gray-900 mb-1">4.8★</div>
                                        <div className="text-xs text-gray-600">Avg Rating</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        {/*-- Right Side - Registration Form */}
                        <div className="w-full max-w-xl mx-auto lg:mx-0">
                            
                            <div className="lg:hidden flex items-center justify-center space-x-3 mb-8">
                                <div className="flex items-center space-x-3">
                                    <svg className="w-9 h-9 text-orange-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z"/>
                                    </svg>
                                    <div>
                                        <h1 className="logo-text text-xl text-left font-bold text-gray-900 leading-none">Urusentra</h1>
                                        <p className="text-[10px] text-gray-500 leading-none">Building & Construction Marketplace</p>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="bg-white border-2 border-stone-200 rounded-2xl shadow-sm p-8 sm:p-10">
                                
                                {/*-- Form Header */}
                                <div className="mb-8">
                                    <a className="text-3xl! font-display! font-bold! text-left! text-gray-900! mb-2!">Create Your Account</a><br />
                                    <a className="text-gray-600 font-display! text-left!">Advertise to thousands of builders worldwide looking for suppliers</a>
                                </div>

                                
                                {/*-- Registration Form */}
                                <form onSubmit={handleSubmit(submission)} className="space-y-6">

                                    
                                    {/*-- Email */}
                                    <div>
                                        <label htmlFor="email" className="block text-left text-sm font-semibold text-gray-900 mb-2">Work Email</label>
                                        <input 
                                            type="email" 
                                            {...register("email")}
                                            placeholder="johndoe@domain.com"
                                            className="w-full px-4 py-3 border-2 border-stone-300 rounded-xl text-gray-900 placeholder-gray-400 focus:border-orange-600 focus:ring-4 focus:ring-orange-600/20 outline-none transition-all"
                                            required
                                        />
                                    </div>
                                    
                                    {/*-- Password */}
                                    <div>
                                        <label htmlFor="password1" className="block text-left text-sm font-semibold text-gray-900 mb-2">Password</label>
                                        <div className="relative">
                                            <input 
                                                type={showPassword1 ? "text" : "password"}
                                                {...register("password1")} 
                                                placeholder="Create a strong password"
                                                className="w-full px-4 py-3 border-2 border-stone-300 rounded-xl text-gray-900 placeholder-gray-400 focus:border-orange-600 focus:ring-4 focus:ring-orange-600/20 outline-none transition-all pr-12"
                                                required
                                            />
                                            <button 
                                                type="button"
                                                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                                onClick={() => setShowPassword1(!showPassword1)}
                                                >
                                                {showPassword1 ? (
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
                                        <p className="mt-2 text-xs text-left text-gray-500">Must be at least 8 characters with a number and special character</p>
                                    </div>
                                    
                                    <div>
                                        <label htmlFor="password2" className="block text-left text-sm font-semibold text-gray-900 mb-2">Repeat Password</label>
                                        <div className="relative">
                                            <input 
                                                type={showPassword2 ? "text" : "password"}
                                                {...register("password2")} 
                                                placeholder="Repeat password"
                                                className="w-full px-4 py-3 border-2 border-stone-300 rounded-xl text-gray-900 placeholder-gray-400 focus:border-orange-600 focus:ring-4 focus:ring-orange-600/20 outline-none transition-all pr-12"
                                                required
                                            />
                                            <button 
                                                type="button" 
                                                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                                onClick={() => setShowPassword2(!showPassword2)}
                                            >
                                                {showPassword2 ? (
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
                                        <p className="mt-2 text-xs text-left text-gray-500">Password must match</p>
                                    </div>
                                    
                                    <div>
                                        <label htmlFor="company" className="block text-left text-sm font-semibold text-gray-900 mb-2">Company Name</label>
                                        <input 
                                            type="text" 
                                            {...register("company")} 
                                            placeholder="ABC Construction Supplier LLC"
                                            className="w-full px-4 py-3 border-2 border-stone-300 rounded-xl text-gray-900 placeholder-gray-400 focus:border-orange-600 focus:ring-4 focus:ring-orange-600/20 outline-none transition-all"
                                            required
                                        />
                                    </div>
                                    
                                    {/*-- Role Selection */}
                                    <div>
                                        <label htmlFor="role" className="block text-left text-sm font-semibold text-gray-900 mb-2">Your Role</label>
                                        <div className="relative">
                                            <select 
                                                {...register("role")}
                                                className="w-full px-4 py-3 border-2 border-stone-300 rounded-xl text-gray-900 focus:border-orange-600 focus:ring-4 focus:ring-orange-600/20 outline-none transition-all appearance-none cursor-pointer bg-white"
                                                required
                                            >
                                                {roleOptions}
                                            </select>
                                            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                                                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5"/>
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    {/*-- Terms & Marketing */}
                                    <div className="space-y-3">
                                        <label className="flex items-start cursor-pointer group">
                                            <input type="checkbox" required className="w-5 h-5 mt-0.5 text-orange-600 border-gray-300 rounded focus:ring-orange-500 cursor-pointer"/>
                                            <span className="ml-3 text-sm text-gray-700 leading-relaxed">
                                                I agree to the <a href="#" className="text-orange-600 hover:text-orange-700 font-semibold">Terms of Service</a> and <a href="#" className="text-orange-600 hover:text-orange-700 font-semibold">Privacy Policy</a>
                                            </span>
                                        </label>
                                    </div>
                                    
                                    {/*-- Submit Button */}
                                    <button 
                                        type="submit"
                                        disabled={loading}
                                        className="w-full bg-orange-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-orange-700 active:bg-orange-800 transition-colors shadow-lg hover:shadow-xl"
                                    >
                                        Create Account
                                    </button>
                                    
                                    {/*-- Divider */}
                                    <div className="relative my-6">
                                        <div className="absolute inset-0 flex items-center">
                                            <div className="w-full border-t border-stone-200"></div>
                                        </div>
                                    </div>
                                    
                                    <div>
                                        {error && (
                                            <p className="text-amber-800 text-sm">
                                                {error}
                                            </p>
                                        )}
                                    </div>

                                </form>
                                
                                {/*-- Sign In Link */}
                                <p className="mt-8 text-center text-sm text-gray-600">
                                    Already have an account? 
                                    <a href="/marketplace-login" className="font-semibold text-orange-600 hover:text-orange-700"> Sign in here</a>
                                </p>
                            </div>
                            
                            {/*-- Security Badge */}
                            <div className="mt-6 flex items-center justify-center space-x-2 text-gray-500">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"/>
                                </svg>
                                <span className="text-xs">Your information is protected with 256-bit encryption according to governmental law.</span>
                            </div>
                        </div>
                    </div>
                </div>


                <footer className="border-t border-stone-200 bg-white mt-16">
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
        </>
    );

};
export default MarketplaceRegister;
