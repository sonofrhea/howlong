import React from "react";
import { Calendar1, Clock } from "lucide-react";
import { TimelineModalProps, PhaseType } from "../constants/Types";




const TimelineModal: React.FC<TimelineModalProps> = ({ project, onClose }) => {
    if (!project) return null;

    const isEarly = project.early_completion;
    const days = Math.abs(project.days_elapsed || 0);

    return (
        <>
            {/* Backdrop */}
            <div 
                className="fixed inset-0 bg-black/50 z-40"
                onClick={onClose}
            />
            
            {/* Modal */}
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 font-['Montserrat']! text-left">
                <div className="bg-white rounded-xl shadow-2xl max-w-3xl w-full max-h-[95vh] overflow-hidden border border-slate-200">
                    
                    {/* Header */}
                    <div className="bg-slate-50 border-b border-slate-200 px-6 py-4 flex justify-between items-center">
                        <div>
                            <h2 className="text-xl font-bold text-slate-900 text-left" style={{ fontFamily: 'Montserrat, system-ui' }}>
                                Project Timeline
                            </h2>
                            <p className="text-sm text-slate-500 mt-1 font-['Montserrat']!">
                                Complete project schedule and phase breakdown
                            </p>
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
                        
                        {/* Timeline Stats Cards */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 font-['Montserrat']!">
                            <div className="bg-slate-50 rounded-lg p-4 border border-slate-200 text-center">
                                <div className="flex items-center justify-center gap-1 text-slate-400 mb-2">
                                    <Calendar1 size={14} />
                                    <span className="text-xs uppercase tracking-wider font-semibold">Start</span>
                                </div>
                                <p className="text-sm font-semibold text-black! font-['Montserrat']!">
                                    {project.start_date || 'N/A'}
                                </p>
                            </div>
                            
                            <div className="bg-slate-50 rounded-lg p-4 border border-slate-200 text-center">
                                <div className="flex items-center justify-center gap-1 text-slate-400 mb-2">
                                    <Calendar1 size={14} />
                                    <span className="text-xs uppercase tracking-wider font-semibold">Est. Completion</span>
                                </div>
                                <p className="text-sm font-semibold text-black! font-['Montserrat']!">
                                    {project.estimated_end_date || 'N/A'}
                                </p>
                            </div>
                            
                            <div className="bg-slate-50 rounded-lg p-4 border border-slate-200 text-center">
                                <div className="flex items-center justify-center gap-1 text-slate-400 mb-2">
                                    <Calendar1 size={14} />
                                    <span className="text-xs uppercase tracking-wider font-semibold">Actual Completion</span>
                                </div>
                                <p className="text-sm font-semibold text-black! font-['Montserrat']!">
                                    {project.actual_end_date || 'Ongoing...'}
                                </p>
                            </div>
                            
                            <div className="bg-slate-50 rounded-lg p-4 border border-slate-200 text-center">
                                <div className="flex items-center justify-center gap-1 text-slate-400 mb-2">
                                    <Clock size={14} />
                                    <span className="text-xs uppercase tracking-wider font-semibold">Duration</span>
                                </div>
                                <p className="text-sm font-semibold text-black! font-['Montserrat']!">
                                    {project.duration || 0} days
                                </p>
                            </div>
                        </div>
                        
                        {/* Days Elapsed Status */}
                        <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-semibold text-slate-600">Days Elapsed</span>
                                {days === 0 ? (
                                    <span className="text-sm font-bold text-blue-600">On schedule</span>
                                ) : isEarly ? (
                                    <span className="text-sm font-bold text-emerald-600">
                                        {days} {days === 1 ? 'day' : 'days'} early
                                    </span>
                                ) : (
                                    <span className="text-sm font-bold text-amber-600">
                                        {days} {days === 1 ? 'day' : 'days'} late
                                    </span>
                                )}
                            </div>
                        </div>
                        
                        {/* Phases Timeline */}
                        {project.phases && project.phases.length > 0 && (
                            <div>
                                <h3 className="text-sm font-bold text-slate-700 mb-4 pb-2 border-b border-slate-200 font-['Montserrat']!">
                                    Phase Timeline
                                </h3>
                                <div className="space-y-4">
                                    {(project.phases ?? []).map((phase, index) => (
                                        <div key={index} className="relative pl-6 pb-4 last:pb-0">
                                            {/* Timeline line */}
                                            {index !== (project.phases?.length ?? 0) - 1 && (
                                                <div className="absolute left-2.25 top-6 bottom-0 w-0.5 bg-slate-200"></div>
                                            )}
                                            
                                            {/* Timeline dot */}
                                            <div className={`absolute left-0 top-1 w-4 h-4 rounded-full border-2 ${
                                                phase.current_phase === 'Completed' ? 'bg-emerald-500 border-emerald-500' :
                                                phase.current_phase === 'In Progress' ? 'bg-blue-500 border-blue-500 animate-pulse' :
                                                phase.current_phase === 'Delayed' ? 'bg-amber-500 border-amber-500' :
                                                'bg-gray-300 border-gray-300'
                                            }`}></div>
                                            
                                            {/* Phase content */}
                                            <div className="bg-white rounded-lg p-4 border border-slate-200 hover:border-slate-300 transition-colors">
                                                <div className="flex flex-wrap items-center justify-between gap-2 mb-2 font-['Montserrat']!">
                                                    <h4 className="font-bold text-slate-800 font-['Montserrat']!">
                                                        {phase.phase_name || `Phase ${index + 1}`}
                                                    </h4>
                                                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                                                        phase.current_phase === 'Not Started' ? 'bg-gray-100 text-gray-600' :
                                                        phase.current_phase === 'In Progress' ? 'bg-blue-100 text-blue-700' :
                                                        phase.current_phase === 'Completed' ? 'bg-emerald-100 text-emerald-700' :
                                                        phase.current_phase === 'Delayed' ? 'bg-amber-100 text-amber-700' :
                                                        'bg-gray-100 text-gray-600'
                                                    }`}>
                                                        {phase.current_phase || 'Not Started'}
                                                    </span>
                                                </div>
                                                
                                                {phase.phase_description && (
                                                    <p className="text-sm text-slate-500 mb-3 font-['Montserrat']! text-left">
                                                        {phase.phase_description}
                                                    </p>
                                                )}
                                                
                                                <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500">
                                                    <div className="flex items-center gap-1">
                                                        <Calendar1 size={12} />
                                                        <span>Start: {phase.start_date || 'N/A'}</span>
                                                    </div>
                                                    <div className="flex items-center gap-1">
                                                        <Calendar1 size={12} />
                                                        <span>End: {phase.end_date || 'Ongoing'}</span>
                                                    </div>
                                                    {phase.duration && (
                                                        <div className="flex items-center gap-1">
                                                            <Clock size={12} />
                                                            <span>Duration: {phase.duration} days</span>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
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

export default TimelineModal;

