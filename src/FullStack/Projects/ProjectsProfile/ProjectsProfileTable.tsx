import React from "react";
import { ProjectProfileTableProps, ProjectsProfileList } from "../constants/Types";


const formatDate = (dateString: string) => {
    return new Date(dateString).toISOString().split("T")[0];
};

const formatNumber = () => {
    const currentYear = new Date().getFullYear();
    return `PZN-${currentYear}-0`;
};










const ProjectsProfileTable: React.FC<ProjectProfileTableProps> = ({
    projects,
    onProjectClick,
    onEditProjectsProfile,
    onDeleteProjectsProfile,
    sortConfig,
    onSort,
    currentPage,
    totalPages,
    totalItems,
    itemsPerPage,
    onPageChange,
    onItemsPerPageChange
 }) => {

    // Sortable header component
    const SortableHeader = ({ label, sortKey }: {label: string, sortKey: string}) => {
        const isSorted = sortConfig.key === sortKey;
        const isAsc = sortConfig.direction === 'asc';

        return (
            <th className="px-2 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider truncate cursor-pointer hover:bg-gray-100 transition-colors"  title={label} onClick={() => onSort(sortKey)}>
                <div className="flex items-center justify-center gap-1">
                    {label}
                    {isSorted && (
                        <span className="text-gray-400">
                            {isAsc ? '↑' : '↓'}
                        </span>
                    )}
                </div>
            </th>
        );
    };


    if (projects.length === 0) {
        return (
            <div className="text-center py-12">
                <div className="flex items-center justify-between p-4 bg-gray-50 border-b">
                    <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600">Show</span>
                    <select value={itemsPerPage} onChange={(e) => onItemsPerPageChange(e.target.value)}
                        className="border border-gray-300 rounded px-3 py-1 text-sm focus:ring-2 focus:ring-blue-500">
                        <option value="10">10</option>
                        <option value="25">25</option>
                        <option value="50">50</option>
                        <option value="100">100</option>
                    </select>
                    <span className="text-sm text-gray-600">entries</span>
                    </div>
                </div>
                <div className="text-gray-400 text-6xl mb-4">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2z" />
                    </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-600 mb-2">No projects found</h3>
                <p className="text-gray-500">Get started by creating your first project.</p>
            </div>
        );
    }

    return (
        <div className="overflow-hidden">
            
            <style>
                {`
                    @import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700;800;900&display=swap");
                `}
            </style>


            {/* Table Header with Items Per Page */}
            <div className="px-4 py-2 bg-linear-to-r from-gray-50 to-gray-100 border-b border-gray-200" style={{ fontFamily: 'Montserrat, system-ui' }}>
                <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-800">Projects List</h3>
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                            <span className="text-sm text-gray-600">Show</span>
                            <select value={itemsPerPage} onChange={(e) => onItemsPerPageChange(e.target.value)} className="border border-gray-300 rounded text-black px-2 py-1 text-xs focus:ring-1 focus:ring-blue-500" >
                                <option value="10">10</option>
                                <option value="25">25</option>
                                <option value="50">50</option>
                                <option value="100">100</option>
                            </select>
                            <span className="text-sm text-gray-600">entries</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Table */}
            <div className="w-full" style={{ fontFamily: 'Montserrat, system-ui' }}>
                <table className="w-full table-fixed divide-y divide-gray-200">
                    <colgroup>
                    {[
                        "w-1/10 text-center",
                        "w-1/10 text-center",
                        "w-1/10 text-center",
                        "w-1/10 text-center",
                        "w-1/10 text-center",
                        "w-1/10 text-center",
                        "w-1/10 text-center",
                        "w-1/10 text-center",
                        "w-1/10 text-center",
                        "w-[5%] text-center",
                    ].map((line, index) => (
                        <col key={index} className={line} />
                    ))}
                    </colgroup>
                    <thead className="bg-gray-50">
                        <tr>
                            <SortableHeader label="Project #" sortKey="project_code" />
                            <SortableHeader label="Date" sortKey="date" />
                            <SortableHeader label="Project Name" sortKey="project_name" />
                            <SortableHeader label="Project Type" sortKey="project_type" />
                            <SortableHeader label="Location" sortKey="city" />
                            <SortableHeader label="Start Date" sortKey="start_date" />
                            <SortableHeader label="Est. End Date" sortKey="estimated_end_date" />
                            <SortableHeader label="Client Details" sortKey="client_details" />
                            <SortableHeader label="Status" sortKey="status" />
                            <th className="px-2 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider truncate">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200 text-center">
                        {projects.map((projectsProfile: ProjectsProfileList) => {
                            const projectsProfileId = projectsProfile.project_code;

                            return (
                                <tr key={projectsProfile.project_code} className="hover:bg-gray-50 transition-colors duration-150 cursor-pointer" 
                                onClick={() => onProjectClick(projectsProfileId)}>
                                    {/* Project Code */}
                                    <td className="px-2 py-2">
                                        <span className="inline-flex items-center px-1.5 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800 truncate" >
                                            {formatNumber()}{projectsProfile.project_code}
                                        </span>
                                    </td>

                                    {/* Date */}
                                    <td className="px-2 py-2 truncate" >
                                        <div className="text-sm font-medium text-black truncate">
                                            {formatDate(projectsProfile.date)}
                                        </div>
                                    </td>

                                    {/* Project Name */}
                                    <td className="px-2 py-2 truncate" >
                                        <div className="text-sm text-black truncate">
                                            {projectsProfile.project_name}
                                        </div>
                                    </td>

                                    {/* Project Type */}
                                    <td className="px-2 py-2 truncate">
                                        <div className="text-sm text-black truncate">
                                            {projectsProfile.project_type}
                                        </div>
                                    </td>

                                    {/* City */}
                                    <td className="px-2 py-2 truncate">
                                        <div className="text-sm text-black truncate">
                                            {projectsProfile.city}
                                        </div>
                                    </td>

                                    {/* Start Date */}
                                    <td className="px-2 py-2 truncate">
                                        <div className="text-sm text-black truncate">
                                            {projectsProfile.start_date}
                                        </div>
                                    </td>
                                    
                                    {/* Estimated End Date */}
                                    <td className="px-2 py-2 truncate">
                                        <div className="text-sm text-black truncate">
                                            {formatDate(projectsProfile.estimated_end_date)}
                                        </div>
                                    </td>

                                    {/* Client Details */}
                                    <td className="px-2 py-2 truncate" >
                                        <div className="text-sm text-black truncate">
                                            {projectsProfile.client_details}
                                        </div>
                                    </td>

                                    {/* Status */}
                                    <td className="px-2 py-2 truncate" >
                                        <div className="text-sm text-black truncate">
                                            {projectsProfile.status}
                                        </div>
                                    </td>

                                    {/* Actions */}
                                    <td className="px-2 py-2">
                                        <div className="flex items-center justify-center gap-1">
                                            <button 
                                                className="text-indigo-600 hover:text-indigo-900 transition-colors duration-200 p-1 hover:scale-110"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    onEditProjectsProfile(projectsProfileId, projectsProfile);
                                                }}
                                                title="Edit Project"
                                            >
                                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                </svg>
                                            </button>
                                            <button 
                                                className="text-red-600 hover:text-red-900 transition-colors duration-200 p-1 hover:scale-110"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    if (window.confirm(`Are you sure you want to delete ${projectsProfile.project_code}?`)) {
                                                        onDeleteProjectsProfile(projectsProfileId);
                                                    }
                                                }}
                                                title="Delete Project"
                                            >
                                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                </svg>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            {/* Table Footer with Working Pagination */}
            <div className="px-4 py-3 bg-gray-50 border-t border-gray-200">
                <div className="flex items-center justify-between text-sm text-gray-600">
                    <div>
                        Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, totalItems)} of {totalItems} projects
                    </div>
                    <div className="flex items-center gap-2">
                        <button className="px-3 py-1 border border-gray-300 rounded text-xs hover:bg-gray-100 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                            onClick={() => onPageChange(currentPage - 1)}
                            disabled={currentPage === 1}>
                                Previous
                        </button>
                        <span className="px-2 text-xs">
                            Page {currentPage} of {totalPages}
                        </span>
                        <button 
                            className="px-3 py-1 border border-gray-300 rounded text-xs hover:bg-gray-100 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                            onClick={() => onPageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}>
                                Next
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
 };

 export default ProjectsProfileTable;
 