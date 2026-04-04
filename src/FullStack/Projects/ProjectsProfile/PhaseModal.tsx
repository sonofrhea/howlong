import React from "react";
import { PhaseModalProps } from "../constants/Types";







const PhaseModal: React.FC<PhaseModalProps> = ({ phase, onClose }) => {
    if (!phase) return null;



    return (
        <>
            {/* Backdrop */}
            <div 
                className="fixed inset-0 bg-black/50 z-40"
                onClick={onClose}
            />
            
            {/* Modal */}
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 font-['Montserrat']! text-left">
                <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[85vh] overflow-hidden border border-slate-200">
                    
                    {/* Header */}
                    <div className="bg-slate-50 border-b border-slate-200 px-6 py-4 flex justify-between items-center">
                        <div>
                            <h2 className="text-xl font-bold text-slate-900" style={{ fontFamily: 'Montserrat, system-ui' }}>
                                Phase Details
                            </h2>
                            <span className="text-sm text-black mt-1! font-normal">
                                {phase.phase_name}
                            </span>
                        </div>
                        <button 
                            onClick={onClose}
                            className="text-slate-400 hover:text-slate-600 transition-colors"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                    
                    {/* Content */}
                    <div className="overflow-y-auto max-h-[calc(85vh-120px)] p-6 space-y-6">
                        
                        {/* Status Badge */}
                        <div className="flex justify-start">
                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                                phase.current_phase === 'Not Started' ? 'bg-gray-100 text-gray-600' :
                                phase.current_phase === 'In Progress' ? 'bg-blue-100 text-blue-700' :
                                phase.current_phase === 'Completed' ? 'bg-emerald-100 text-emerald-700' :
                                phase.current_phase === 'Delayed' ? 'bg-amber-100 text-amber-700' :
                                'bg-gray-100 text-gray-600'
                            }`}>
                                {phase.current_phase || 'Unknown'}
                            </span>
                        </div>
                        
                        {/* Description */}
                        <div>
                            <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 font-['Montserrat']!">
                                Description
                            </h3>
                            <div className="bg-slate-50 rounded-lg p-4 border border-slate-200 ">
                                <p className="text-slate-700 leading-relaxed font-['Montserrat']!">
                                    {phase.phase_description || 'No description provided.'}
                                </p>
                            </div>
                        </div>
                        
                        {/* Date Information */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                                <h3 className="text-xs! font-semibold text-slate-400 uppercase tracking-wider mb-2">
                                    Start Date
                                </h3>
                                <p className="text-lg font-semibold text-black! font-['Montserrat']!">
                                    {phase.start_date || 'Not set'}
                                </p>
                            </div>
                            
                            <div className="bg-slate-50 rounded-lg p-4 border border-slate-200 font-['Montserrat']!">
                                <h3 className="text-xs! font-semibold text-slate-400 uppercase tracking-wider mb-2">
                                    End Date
                                </h3>
                                <p className="text-lg font-semibold text-black font-['Montserrat']!">
                                    {phase.end_date || 'Ongoing...'}
                                </p>
                            </div>
                        </div>
                        
                        {/* Duration */}
                        {phase.duration && (
                            <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                                <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                                    Duration
                                </h3>
                                <p className="text-lg font-semibold text-slate-800">
                                    {phase.duration} {phase.duration === 1 ? 'day' : 'days'}
                                </p>
                            </div>
                        )}
                    </div>
                    
                    {/* Footer */}
                    <div className="border-t border-slate-200 px-6 py-4 bg-slate-50 flex justify-end">
                        <button
                            onClick={onClose}
                            className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 font-medium rounded-lg transition-colors"
                        >
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </>
    );

};
export default PhaseModal;

