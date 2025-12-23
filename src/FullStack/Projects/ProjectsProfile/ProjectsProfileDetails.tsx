import React from "react";
import '../constants/ProjectDetails.css';
import { Building, Calendar1, Clock, NotepadText } from "lucide-react";



const formatNumber = () => {
    const currentYear = new Date().getFullYear();
    return `PZN-${currentYear}-0`;
};

const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
};


















const ProjectsProfileDetails: React.FC<any> = ({ project, isLoading, onBack, onEdit }) => {


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


    return (
        <div className="w-full bg-gray-100 rounded-xl p-4">
            <header>
                <div className="header-top">
                    <div>
                        <h1>{project.project_name}</h1>
                        <div className="flex items-center gap-[8px] my-[8px_0px]">
                            <span className="badge badge-success">
                                ● {project.status || 'N/A'}
                            </span>
                            <span className="badge badge-info">
                                {project.project_type || 'N/A'}
                            </span>
                        </div>
                        <div className="meta">
                            <span className="meta-item">
                                <NotepadText />{formatNumber()}{project.project_code}
                            </span>
                            <span className="meta-item">
                                <Building />{project.client_details || 'N/A'}
                            </span>
                            <span className="meta-item">
                                <Calendar1 />{project.start_date || 'N/A'} → {project.actual_end_date || 'N/A'}
                            </span>
                            <span className="meta-item">
                                <Clock />Duration: {project.duration || 'N/A'} day(s)
                            </span>
                        </div>
                    </div>

                    <div className="controls">
                        <button
                            className="btn-primary btn"
                            onClick={onEdit}
                        >
                            Edit Project
                        </button>
                    </div>
                </div>
            </header>

            {/*<!-- Financial Stats -->*/}
            <div className="stats-grid">
                <div className="card stat-card">
                    <div className="stat-label">Budget</div>
                    <div className="stat-value">{project.project_budget || 'N/A'}</div>
                    <div className="stat-desc">Total allocated</div>
                </div>

                <div className="card stat-card">
                    <div className="stat-label">Actual cost</div>
                    <div className="stat-value">{project.actual_cost || 'N/A'}</div>
                    <div className="stat-desc">Spent to date</div>
                </div>

                <div className="card stat-card">
                    <div className="stat-label">Variance</div>
                    <div className="stat-value">{project.variance || 'N/A'}</div>
                    <div className="stat-desc">{project.final_budget}</div>
                </div>
            </div>

            {/*<!-- Main Content -->*/}
            <div className="main-grid">

                {/*Left Column*/}
                <div className="space-y">


                    {/*<!-- Project Information -->*/}
                    <div className="card">
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
                                <div className="info-label">Est. Completion</div>
                                <div className="info-value">{project.estimated_end_date || 'N/A'}</div>
                            </div>

                            <div className="info-item">
                                <div className="info-label">Duration</div>
                                <div className="info-value">{project.duration || 'N/A'} day(s)</div>
                            </div>

                            <div className="info-item">
                                <div className="info-label">Days Elapsed</div>
                                <div className="info-value">{project.days_elapsed || 'N/A'} days</div>
                            </div>
                        </div>
                    </div>


                    {/*<!-- Location -->*/}
                    <div className="card">
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
                    <div className="card">
                        <div className="section-title">Project Description</div>
                        <p className="description-text">
                            {project.project_description || 'N/A'}
                        </p>
                    </div>
                </div>


                {/*<!-- Right Column -->*/}
                <div className="space-y">

                    {/*<!-- Team -->*/}
                    <div className="card">
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
                    <div className="card">
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

                    {/*!-- Phases -->*/}
                    {project.phases && project.phases.length > 0 && (
                        <div>
                            {project.phases.map((line: any, index: any) => (
                                <div key={index} className="card">
                                    <div key={index} className="section-title">Project Phases Log</div>
                                    <div className="phase-item completed">
                                        <span>
                                            {line.current_phase}
                                        </span>
                                    </div>

                                    <div>
                                        
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>


            {/*<!-- Footer -->*/}
            <div className="footer">
                <div>Created by 
                    <strong>{project.created_by}</strong>
                </div>
                <div>
                    Last Updated
                    <strong>{project.date_updated}</strong> . Version <strong>{project.version}</strong>
                </div>
            </div>
        </div>
    );
};
export default ProjectsProfileDetails;
