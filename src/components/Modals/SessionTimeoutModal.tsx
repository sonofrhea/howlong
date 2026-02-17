import React from 'react';
import { SessionTimeoutModalProps } from './Types';

export default function SessionTimeoutModal({
    showPrompt,
    countdown,
    handleStayLoggedInValidation
}: SessionTimeoutModalProps) {
    if (!showPrompt) return null;








    
    const INITIAL_TIME = 60;
    const radius = 58;
    const circumference = radius * 2 * Math.PI;
    const strokeDashoffset = circumference - (countdown / INITIAL_TIME) * circumference;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Direct injection of the exact CSS styles provided */}
            <style>
                {`
                @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
                
                .session-timeout-body {
                    font-family: 'Inter', sans-serif;
                }

                .modal-overlay-custom {
                    background-color: rgba(0, 0, 0, 0.6);
                    backdrop-filter: blur(4px);
                    transition: opacity 0.3s ease;
                }

                .progress-ring__circle {
                    transition: stroke-dashoffset 0.35s;
                    transform: rotate(-90deg);
                    transform-origin: 50% 50%;
                }

                .animate-in {
                    animation: modalIn 0.4s cubic-bezier(0.16, 1, 0.3, 1);
                }

                @keyframes modalIn {
                    from { opacity: 0; transform: scale(0.95) translateY(10px); }
                    to { opacity: 1; transform: scale(1) translateY(0); }
                }
                `}
            </style>

            {/* Inactivity Modal Wrapper (The Overlay) */}
            <div className="fixed inset-0 modal-overlay-custom" />
            
            {/* Modal Content - Exact structure from the provided HTML */}
            <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden animate-in relative z-10 session-timeout-body">
                
                {/* Header */}
                <div className="px-8 pt-10 pb-4 text-center">
                    <a className="text-2xl font-bold text-gray-900 leading-tight">Session Timeout</a><br /><br />
                    <a className="text-gray-500 mt-3 text-lg text-center">
                        You've been idle for more than 50mins. <br/>
                        <span className="text-sm">Please validate to resume your session.</span>
                    </a>
                </div>

                <div className="flex flex-col items-center justify-center py-6">
                    <div className="relative flex items-center justify-center">
                        <svg className="w-32 h-32">
                            <circle className="text-gray-100" strokeWidth="6" stroke="currentColor" fill="transparent" r="58" cx="64" cy="64"/>
                            <circle 
                                className="text-blue-600 progress-ring__circle" 
                                strokeWidth="6" 
                                strokeDasharray={circumference} 
                                style={{ strokeDashoffset: strokeDashoffset }} 
                                strokeLinecap="round" 
                                stroke="currentColor" 
                                fill="transparent" 
                                r="58" 
                                cx="64" 
                                cy="64"
                            />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <span className="text-3xl font-bold text-gray-800 tabular-nums">{countdown}</span>
                            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Seconds</span>
                        </div>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="px-8 pb-10 pt-2 flex flex-col gap-3">
                    <button 
                        onClick={handleStayLoggedInValidation} 
                        className="w-full py-4 bg-blue-600 hover:bg-green-700 text-white font-semibold rounded-xl transition-all shadow-lg shadow-blue-100 active:scale-[0.98]"
                    >
                        Still Here
                    </button>
                    <button 
                        onClick={() => {
                            localStorage.removeItem('Token');
                            window.location.href = '/login?reason=idle_timeout';
                        }} 
                        className="w-full py-4 bg-white hover:bg-gray-50 text-gray-600 font-semibold border border-gray-200 rounded-xl transition-all active:scale-[0.98]"
                    >
                        Login
                    </button>
                </div>

                {/* Progress Info */}
                <div className="bg-gray-50 px-6 py-3 border-t border-gray-100 flex justify-center">
                    <a className="text-[11px] text-gray-400 font-medium uppercase tracking-tight">Security Protocol Active</a>
                </div>
            </div>
        </div>
    );
}