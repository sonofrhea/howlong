import React, { useState } from "react";
import '../constants/ProjectDetails.css';
import { Building, Calendar1, Clock,
    MoveRight, NotepadText, SquarePen } from "lucide-react";
import { buttons } from "../constants/Styles";
import { PhaseType, ProjectProfileDetailsProps } from "../constants/Types";
import { details } from "../../Customers/constants/Styles";
import { useNavigate } from "react-router-dom";

import PhaseModal from "./PhaseModal";
import TimelineModal from "./TimelineModal";




const formatDate = (dateString: string) => {
    return new Date(dateString).toISOString().split("T")[0];
};


const formatUpdateDate = (dateString: any) => {
    return new Date(dateString).toLocaleString();
};















const ProjectsProfileDetails: React.FC<ProjectProfileDetailsProps> = ({
    project,
    isLoading,
    onBack,
    onEdit }) => {
        const projectId = project?.project_code;
        const navigate = useNavigate()
        const [selectedPhase, setSelectedPhase] = useState<PhaseType | null>(null);
        const [showTimelineModal, setShowTimelineModal] = useState(false);


        const isEarly = project?.early_completion;
        const days = Math.abs(project?.days_elapsed);

    if (isLoading) {
        return (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                <p className="mt-3 text-gray-600">Loading project details...</p>
            </div>
        );
    }


    if (!project) {
        return (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
                <svg className="w-12 h-12 text-red-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
                <h2 className="text-xl font-semibold text-gray-800 mb-2">Project Not Found</h2>
                <p className="text-gray-600 mb-4">Unable to load project details.</p>
                <button 
                    onClick={onBack}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                    Back to List
                </button>
            </div>
        );
    }

    //console.log("SELECTED PROJECT", project)


    return (
        <div className="min-h-screen bg-slate-50 p-2 md:p-8">
            
            <style>
                {`
                    @import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700;800;900&display=swap");
                `}
            </style>


            <div className="mx-auto max-w-7xl bg-white rounded-xl shadow-sm border border-slate-200 min-w-full" style={{ fontFamily: 'Montserrat, system-ui' }}>
                <div className="bg-gray-50! rounded-lg m-4 shadow-sm border border-slate-200">
                    <div className="px-8 py-6 border-b border-slate-200 bg-slate-50/50">
                        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                            
                            <div className="flex-1 space-y-4">
                                {/* Top Row: Badges and Title */}
                                <div className="space-y-2">
                                    <div className="flex flex-wrap items-center gap-2">
                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800 border border-emerald-200" style={{ fontFamily: 'Montserrat, system-ui' }}>
                                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-1.5"></span>
                                            {project.status || 'N/A'}
                                        </span>
                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 border border-blue-200 uppercase tracking-wider" style={{ fontFamily: 'Montserrat, system-ui' }}>
                                            {project.project_type || 'N/A'}
                                        </span>
                                    </div>
                                    <h1 className="text-3xl text-left font-extrabold text-slate-900 tracking-tight" style={{ fontFamily: 'Montserrat, system-ui' }}>
                                        {project.project_name}
                                    </h1>
                                </div>

                                {/* Bottom Row: Meta Info Grid */}
                                <div className="flex flex-wrap items-center gap-y-3 gap-x-6 text-sm text-slate-600">
                                    <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-md border border-slate-200 shadow-sm">
                                        <NotepadText size={16} className="text-indigo-500" />
                                        <span className="font-mono font-bold text-slate-800" >
                                            {project.formatted_number}
                                        </span>
                                    </div>
                                    
                                    <div 
                                        className="flex items-center gap-2 cursor-pointer hover:text-blue-600 transition-colors" 
                                        onClick={() => navigate(`/customers/customers-profile?view=details&customer_number=${project.client_details}`)}
                                    >
                                        <Building size={18} className="text-slate-400" />
                                        <span className="font-medium hover:underline">
                                            {project.project_client_name || 'N/A'}
                                        </span>
                                    </div>

                                    <div className="flex items-center gap-2 border-l border-slate-300 pl-6 lg:flex" style={{ fontFamily: 'Montserrat, system-ui' }}>
                                        start <Calendar1 size={18} className="text-slate-400" />
                                        <span>{project.start_date}</span>
                                        <span className="text-slate-300"><MoveRight /></span>
                                        end <Calendar1 size={18} className="text-slate-400" />
                                        <span className={project.actual_end_date ? "text-slate-800" : "text-blue-500 font-medium italic"}>
                                            {project.actual_end_date || 'Ongoing'}
                                        </span>
                                    </div>

                                    <div className="flex items-center gap-2 border-l border-slate-300 pl-6 lg:flex" style={{ fontFamily: 'Montserrat, system-ui' }}>
                                        <Clock size={18} className="text-slate-400" />
                                        <span><span className="font-bold text-slate-800">{project.duration || '0'}</span> days</span>
                                    </div>
                                </div>
                            </div>

                            {/* Action Button */}
                            <div className="flex items-center shrink-0">
                                <button 
                                    onClick={() => onEdit(projectId)}
                                    className="flex items-center gap-2 bg-emerald-600 hover:bg-black text-white px-5 py-2.5 rounded-lg font-semibold transition-all shadow-md shadow-emerald-200 active:scale-95 hover:border-black hover:shadow-md hover:shadow-black"
                                >
                                    <SquarePen size={18} />
                                    Edit Project
                                </button>
                            </div>
                        </div>
                    </div>

                    {/*<!-- Financial Stats -->*/}
                    <div className="stats-grid m-4">
                        <div className="card stat-card hover:border-gray-400!">
                            <div className="stat-label">Budget</div>
                            <div className="stat-value">{project.project_budget || 'N/A'}</div>
                            <div className="stat-desc">Total allocated</div>
                        </div>

                        <div className="card stat-card hover:border-gray-400!">
                            <div className="stat-label">Actual cost</div>
                            <div className="stat-value">{project.actual_cost || 'N/A'}</div>
                            <div className="stat-desc">Spent to date</div>
                        </div>

                        <div className="card stat-card hover:border-gray-400!">
                            <div className="stat-label">Variance</div>
                            <div className="stat-value">{project.variance || 'N/A'}</div>
                            <div className="stat-desc">{project.final_budget}</div>
                        </div>
                    </div>

                    {/*<!-- Main Content -->*/}
                    <div className="main-grid m-4">

                        {/*Left Column*/}
                        <div className="space-y">


                            {/*<!-- Project Information -->*/}
                            <div className="card hover:border-gray-400!">
                                <div className="section-title">Project Information</div>
                                <div className="info-grid">
                                    <div className="info-item">
                                        <div className="info-label">Project Type</div>
                                        <div className="info-value">{project.project_type || 'N/A'}</div>
                                    </div>

                                    <div className="info-item">
                                        <div className="info-label">Status</div>
                                        <div className="info-value">{project.status || 'N/A'}</div>
                                    </div>

                                    <div className="info-item">
                                        <div className="info-label">Start Date</div>
                                        <div className="info-value">{project.start_date || 'N/A'}</div>
                                    </div>

                                    <div className="info-item">
                                        <div className="info-label">Estimated Completion date</div>
                                        <div className="info-value">{project.estimated_end_date || 'N/A'}</div>
                                    </div>

                                    <div className="info-item">
                                        <div className="info-label">Actual Completion date</div>
                                        <div className="info-value">{project.actual_end_date || 'Ongoing...'}</div>
                                    </div>

                                    <div className="info-item">
                                        <div className="info-label">Duration</div>
                                        <div className="info-value">{project.duration || '--'} day(s)</div>
                                    </div>

                                    <div className="info-item">
                                        <div className="info-label">Days Elapsed</div>
                                        {days == 0 ? (
                                            <span className="info-value text-ontime">On schedule</span>
                                        ) : isEarly ? (
                                            <span className="info-value text-early">
                                                {days} {days === 1 ? 'day' : 'days'} early
                                            </span>
                                        ) : (
                                            <span className="info-value text-late">
                                                {days} {days === 1 ? 'day' : 'days'} late
                                            </span>
                                        )}
                                    </div>

                                    <div className="info-item">
                                        <div className="info-label">Early Completion</div>
                                        
                                        <div className={`info-value px-4 py-3 text-gray-700 ${
                                            project.early_completion ? 
                                            ' bg-green-50! text-green-700! border border-green-200! w-fit! mx-auto! text-center! p-2 px-3! py-1! text-xs! shadow'
                                            : ' bg-red-50! text-red-700! border border-red-500! w-fit! mx-auto! text-center! p-2 px-3! py-1! text-xs shadow'}`}
                                        >
                                        {project.early_completion ? "Yes": "No"}
                                        </div>
                                    </div>
                                </div>
                            </div>


                            {/*<!-- Location -->*/}
                            <div className="card hover:border-gray-400!">
                                <div className="section-title">Location Details</div>
                                <div className="info-grid">
                                    <div className="info-item col-span-full">
                                        <div className="info-label">Address</div>
                                        <div className="info-value">{project.address || 'N/A'}</div>
                                    </div>

                                    <div className="info-item">
                                        <div className="info-label">City</div>
                                        <div className="info-value">{project.city || 'N/A'}</div>
                                    </div>

                                    <div className="info-item">
                                        <div className="info-label">State</div>
                                        <div className="info-value">{project.state || 'N/A'}</div>
                                    </div>

                                    <div className="info-item">
                                        <div className="info-label">Zip Code</div>
                                        <div className="info-value">{project.zip_code || 'N/A'}</div>
                                    </div>

                                    <div className="info-item">
                                        <div className="info-label">Country</div>
                                        <div className="info-value">{project.country || 'N/A'}</div>
                                    </div>
                                </div>
                            </div>

                            {/*<!-- Description -->*/}
                            <div className="card hover:border-gray-400!">
                                <div className="section-title">Project Description</div>
                                <p className="description-text">
                                    {project.project_description || 'N/A'}
                                </p>
                            </div>

                            {/* Sites */}
                            <div className="card hover:border-gray-400! font-['Montserrat']!">
                                <div className="section-title">Sites</div>
                                {project.sites && project.sites.length > 0 ? (
                                    <div className="overflow-x-auto">
                                        <table className="w-full text-sm">
                                            <thead>
                                                <tr className="border-b border-gray-200 text-left">
                                                    <th className="pb-2 font-semibold text-gray-500 text-xs uppercase  font-['Montserrat']!">
                                                        Site Name
                                                    </th>
                                                    <th className="pb-2 font-semibold text-gray-500 text-xs uppercase  font-['Montserrat']!">
                                                        Site Code
                                                    </th>
                                                    <th className="pb-2 font-semibold text-gray-500 text-xs uppercase text-center font-['Montserrat']!">
                                                        Status
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {project.sites.map((site) => (
                                                    <tr 
                                                        key={site.site_number}
                                                        onClick={() => navigate(`/sites/${site.site_number}`)}
                                                        className="border-b border-gray-100 cursor-pointer hover:bg-blue-50! transition-colors"
                                                    >
                                                        <td className="py-3 font-medium text-slate-700 text-left font-['Montserrat']!">{site.site_name}</td>
                                                        <td className="py-3 text-slate-500 text-left text-xs font-mono!">{site.formatted_number}</td>
                                                        <td className="py-3">
                                                            <span className={`inline-flex px-2 py-0.5 rounded-full text-xs text-left! font-medium ${
                                                                site.is_active ? 'bg-emerald-100 text-left! text-emerald-700' : 'bg-gray-100 text-left! text-gray-500'
                                                            }`}>
                                                                {site.is_active ? 'Active' : 'Inactive'}
                                                            </span>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                ) : (
                                    <div className="card hover:border-gray-400!">
                                        <div className="section-title">Sites</div>
                                        <p className="text-slate-500 text-sm py-4 text-center">No sites added yet.</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        


                        {/*<!-- Right Column -->*/}
                        <div className="space-y">

                            {/*<!-- Team -->*/}
                            <div className="card hover:shadow-xl! hover:cursor-pointer! hover:shadow-gray-200! hover:border-gray-400! hover:border-2!">
                                <div className="section-title">Project Team</div>
                                <div className="team-member">
                                    <div className="member-info">
                                        <div className="member-name">{project.project_manager || 'N/A'}</div>
                                        <div className="member-role">Project Manager</div>
                                    </div>
                                </div>
                                <div className="team-member">
                                    <div className="member-info">
                                        <div className="member-name">{project.superintendent || 'N/A'}</div>
                                        <div className="member-role">Superintendent</div>
                                    </div>
                                </div>
                            </div>


                            {/*<!-- Timeline -->*/}
                            <div className="card hover:shadow-xl! hover:cursor-pointer! hover:shadow-gray-200! hover:border-gray-400! hover:border-2!" onClick={() => setShowTimelineModal(true)}>
                                <div className="section-title">Project Timeline</div>
                                <div className="timeline-item">
                                    <div className="timeline-marker active"></div>
                                    <div className="timeline-content">
                                        <div className="timeline-title">Project Start</div>
                                        <div className="timeline-date">{project.start_date || 'N/A'}</div>
                                        <div className="timeline-desc">Kickoff & site preparation</div>
                                    </div>
                                </div>
                                <div className="timeline-item">
                                    <div className="timeline-marker pending"></div>
                                    <div className="timeline-content">
                                        <div className="timeline-title">Est. Completion</div>
                                        <div className="timeline-date">{project.estimated_end_date || 'N/A'}</div>
                                        <div className="timeline-desc">Project completion</div>
                                    </div>
                                </div>
                            </div>
                            {showTimelineModal && (
                                <TimelineModal 
                                    project={project}
                                    onClose={() => setShowTimelineModal(false)}
                                />
                            )}

                            

                            

                            {/*!-- Phases -->*/}
                            {project.phases && project.phases.length > 0 && (
                                <div>
                                    {project.phases.map((line, index) => (
                                        <div key={index} className="card ">
                                            <div key={index} className="section-title ">Project Phases Log</div>

                                            <div onClick={() => setSelectedPhase(line)} className="group relative bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:border-indigo-300 hover:cursor-pointer! hover:shadow-2xl! hover:shadow-gray-400! transition-all duration-300">

                                                <div className="flex items-center justify-between mb-4">
                                                    <span className="flex items-center text-[10px] font-black text-indigo-600 uppercase tracking-[0.2em]">
                                                        <span className="w-2 h-2 bg-indigo-500 rounded-full mr-2"></span>
                                                        Phase {index + 1}
                                                    </span>
                                                    
                                                    <span className={`px-2.5 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider border ${
                                                        line.current_phase === 'Not Started' ? 'bg-gray-100 text-gray-500 border-gray-200' :
                                                        line.current_phase === 'In Progress' ? 'bg-blue-50 text-blue-700 border-blue-200' :
                                                        line.current_phase === 'Completed' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                                                        line.current_phase === 'Delayed' ? 'bg-amber-50 text-amber-700 border-amber-200' :
                                                        'bg-gray-100 text-gray-600 border-gray-200'
                                                        }`}>
                                                        {line.current_phase}
                                                    </span>
                                                </div>

                                                <h3 className="text-gray-900 font-bold text-xl mb-6 leading-tight" style={{ fontFamily: 'Montserrat, system-ui' }}>{line.phase_name}</h3>

                                                <div className="flex items-center gap-7 border-t border-gray-100 pt-5">
                                                    <div className="flex flex-col">
                                                        <span className="text-[9px] uppercase tracking-widest text-gray-400 font-bold">
                                                            Start Date
                                                        </span>
                                                        <span className="font-mono text-sm text-gray-700 font-semibold">{line.start_date}</span>
                                                    </div>
                                                    <div className="w-px h-8 bg-gray-200 mx-4"></div>
                                                    <div className="flex flex-col">
                                                        <span className="text-[9px] uppercase tracking-widest text-gray-400 font-bold">End Date</span>
                                                        <span className="font-mono text-sm text-gray-700 font-semibold">{line.end_date}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                    {selectedPhase && (
                                        <PhaseModal 
                                            phase={selectedPhase}
                                            onClose={() => setSelectedPhase(null)}
                                        />
                                    )}
                                </div>
                            )}
                        </div>
                    </div>


                    {/*<!-- Footer -->*/}
                    <div className="footer mb-4 m-4">
                        <div className="grid lg:grid-cols-5">

                            <div>
                                <a className={details.extraSmallUppercase}>Date Created</a><br /> 
                                <strong> {formatDate(project.date_created)}</strong>
                            </div>

                            <div>
                                <a className={details.extraSmallUppercase}>Created by</a><br /> 
                                <strong>{project.created_by}</strong>
                            </div>

                            <div>
                                <a className={details.extraSmallUppercase}>Date Updated</a><br /> 
                                <strong> {formatUpdateDate(project.date_updated)}</strong>
                            </div>

                            <div>
                                <a className={details.extraSmallUppercase}>Updated By</a><br /> 
                                <strong> {project.updated_by}</strong>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default ProjectsProfileDetails;
