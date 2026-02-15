import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

import '../../App.css';

import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";

import HandleMarketplaceLogin from "../../Authentication/HandleMarketplaceLogin";
import { LoginModalProps } from "./Types";





const MarketplaceLoginModal = ({open, onClose }: LoginModalProps) => {
    const navigate = useNavigate()
    const {handleSubmit, register} = useForm()
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    if (!open) return null;


    const submission = async (data: any) => {
        if (loading) return
        setLoading(true);
        setError("")

        const toastId = toast.loading('Logging in...', {duration: 8000,});
        try {
            await HandleMarketplaceLogin(data.email, data.password);
            toast.success('Login successful!', {id: toastId});
            navigate(`/mainmarket`);
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
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 animate-fadeIn"
            onClick={onClose}
        >
            <div
                className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl transform transition-all animate-scaleIn"
                onClick={(e) => e.stopPropagation()}
            >

                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-gray-900 transition-all hover:rotate-90"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
                    </svg>
                </button>


                <div className="pt-10 pb-6 px-8 border-b border-gray-100">
                    <div className="flex flex-col items-center justify-center mb-8">
                        <div className="flex items-center space-x-2 -ml-10">
                            <svg className="w-9 h-9 text-orange-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z"/>
                            </svg>
                            <div className="text-center">
                                <h1 className="logo-text text-xl font-bold text-gray-900">Urusentra</h1>
                                <p className="text-[9px] text-gray-500 tracking-widest font-medium">Marketplace</p>
                            </div>
                        </div>
                    </div>
                    <p className="text-gray-600 text-center text-sm">Sign in to access your account</p>
                </div>

                <div className="p-8">
                    <form onSubmit={handleSubmit(submission)} className="space-y-5">

                        {error && (
                            <p className="text-amber-800 text-sm">
                                {error}
                            </p>
                        )}

                        <div>
                            <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                            <input 
                                type="email" 
                                {...register('email')}
                                placeholder="Enter your email"
                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all text-gray-900 placeholder-gray-400 hover:border-gray-300"
                            />
                        </div>


                        <div>
                            <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
                            <div className="relative">
                                <input 
                                    type={showPassword ? "text" : "password"}
                                    {...register('password')}
                                    placeholder="Enter your password"
                                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all text-gray-900 placeholder-gray-400 hover:border-gray-300"
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

                        <div className="flex items-center justify-between">
                            <label className="flex items-center cursor-pointer group">
                                <input 
                                    type="checkbox" 
                                    className="w-4 h-4 text-orange-600 border-gray-300 rounded focus:ring-orange-500 cursor-pointer"
                                />
                                <span className="ml-2 text-sm text-gray-700 group-hover:text-gray-900 transition-colors">Remember me</span>
                            </label>
                            <a href="#" className="text-sm font-semibold text-orange-600 hover:text-orange-700 transition-colors">
                                Forgot password?
                            </a>
                        </div>


                        <button 
                            type="submit"
                            disabled={loading}
                            className="w-full bg-linear-to-r from-orange-600 to-orange-700 text-white py-3.5 rounded-xl font-bold hover:from-orange-700 hover:to-orange-800 active:scale-[0.98] transition-all shadow-lg hover:shadow-xl"
                        >
                            Sign in
                        </button>

                    </form>


                    <p className="mt-6 text-center text-sm text-gray-600">
                        Don't have an account?{' '}
                        <a href="/marketplace-register" className="font-bold text-orange-600 hover:text-orange-700 transition-colors">
                            Sign up for free
                        </a>
                    </p>

                </div>

                <div className="px-8 pb-8">
                    <div className="flex items-center justify-center gap-2 text-gray-500 bg-gray-50 rounded-xl py-3 px-4">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"/>
                        </svg>
                        <span className="text-xs font-medium">Your information is protected with bank-level security</span>
                    </div>
                </div>

            </div>

            <style>
                {`

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

                @keyframes fadeIn {
                    from {
                        opacity: 0;
                    }
                    to {
                        opacity: 1;
                    }
                }

                @keyframes scaleIn {
                    from {
                        opacity: 0;
                        transform: scale(0.95);
                    }
                    to {
                        opacity: 1;
                        transform: scale(1);
                    }
                }

                .animate-fadeIn {
                    animation: fadeIn 0.2s ease-out;
                }

                .animate-scaleIn {
                    animation: scaleIn 0.3s ease-out;
                }
            `}
            </style>
        </div>
    );

};
export default MarketplaceLoginModal;
