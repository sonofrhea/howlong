import React from "react";


const formatNumber = () => {
    const currentYear = new Date().getFullYear();
    return `${currentYear}-`;
};

const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
};


const ProjectDocumentsDetails = ({ projectDocument, isLoading, onBack, onEdit }) => {


    if (isLoading) {
        return (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                <p className="mt-3 text-gray-600">Loading project documents...</p>
            </div>
        );
    }

    if (!projectDocument) {
        return (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
                <svg className="w-12 h-12 text-red-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
                <h2 className="text-xl font-semibold text-gray-800 mb-2">Project document Not Found</h2>
                <p className="text-gray-600 mb-4">Unable to load project documents.</p>
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
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            {/* Header */}
            <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
                <div className="flex items-center gap-4 flex-1">
                    <button 
                        onClick={onBack}
                        className="text-gray-500 hover:text-gray-700 transition-colors p-2 hover:bg-gray-100 rounded-lg"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                    </button>
                    <div>
                        <h2 className="text-xl font-semibold text-gray-800">DOC-{formatNumber()}{projectDocument.document_number}</h2>
                    </div>

                    <div className="absolute left-1/2 transform -translate-x-1/2">
                        <div className="text-sm text-gray-500">Document provided details</div>
                    </div>
                </div>
                <div className="flex gap-3">
                    <button 
                        onClick={onEdit}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                        Edit
                    </button>
                </div>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6">
                {/* Key Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="bg-blue-50 rounded-lg p-4">
                        <div className="text-sm text-blue-600 font-medium">Document Number</div>

                        <div className="text-lg font-semibold text-gray-800">
                            DOC-{formatNumber()}{projectDocument.document_number}
                        </div>
                    </div>

                    <div className="bg-green-50 rounded-lg p-4">
                        <div className="text-sm text-green-600 font-medium">Related Project</div>

                        <div className="text-lg font-semibold text-gray-800">
                            {projectDocument.project.project_code || 'Not provided'}
                        </div>
                    </div>

                    <div className="bg-orange-50 rounded-lg p-4">
                        <div className="text-sm text-orange-600 font-medium">Uploaded By</div>

                        <div className="text-lg font-semibold text-gray-800">
                            {projectDocument.uploaded_by}
                        </div>
                    </div>

                    <div className="bg-purple-50 rounded-lg p-4">
                        <div className="text-sm text-purple-600 font-medium">Date Uploaded</div>

                        <div className="text-lg font-semibold text-gray-800">
                            {formatDate(projectDocument.date_uploaded)}
                        </div>
                    </div>
                </div>

                {/* Document Main info */}
                {projectDocument.document_lines && projectDocument.document_lines.length > 0 && (
                    <div className="bg-amber-50 rounded-lg p-6">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">Documents</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                            {projectDocument.document_lines[0]?.document_type && (
                                <div>
                                    <div className="text-sm text-gray-500">Document type</div>
                                    <div className="text-gray-800">
                                        {projectDocument.document_lines[0].document_type || 'Not provided'}
                                    </div>
                                </div>
                            )}

                            {projectDocument.document_lines[0]?.document_file && (
                                <div>
                                    <div className="text-sm text-gray-500">Document file</div>
                                    <div className="text-gray-800">
                                        {projectDocument.document_lines[0].document_file || 'Not provided'}
                                    </div>
                                </div>
                            )}

                            {projectDocument.document_lines[0]?.description && (
                                <div>
                                    <div className="text-sm text-gray-500">Document description</div>
                                    <div className="text-gray-800">
                                        {projectDocument.document_lines[0].description || 'Not provided'}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
export default ProjectDocumentsDetails;
