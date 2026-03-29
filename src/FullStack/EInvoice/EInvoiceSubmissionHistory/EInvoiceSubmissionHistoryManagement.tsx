import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchEInvoiceSubmissions, fetchEInvoiceSubmissionById } from "../Engines";
import { EInvoiceSubmission } from "../constants/Types";
import EInvoiceSubmissionHistoryTable from "./EInvoiceSubmissionHistoryTable";
import EInvoiceSubmissionHistoryDetails from "./EInvoiceSubmissionHistoryDetails";

import { Link, useSearchParams } from 'react-router-dom';
























function EInvoiceSubmissionHistoryManagement() {
    const [searchParams, setSearchParams] = useSearchParams();
    const view = (searchParams.get('view') as 'list' | 'details') || 'list';
    const selectedId = searchParams.get('id') ? Number(searchParams.get('id')) : null;
    const [searchTerm, setSearchTerm] = useState('');

    const navigateToView = (newView: string, id?: number) => {
        const params = new URLSearchParams(searchParams);
        params.set('view', newView);
        if (id) {
            params.set('id', id.toString());
        } else if (newView === 'list') {
            params.delete('id');
        }
        setSearchParams(params);
    }



    const { data: submissions = [], isLoading, error } = useQuery({
        queryKey: ['einvoice-submissions'],
        queryFn: fetchEInvoiceSubmissions,
    });

    const { data: selectedSubmission, isLoading: isLoadingDetail } = useQuery({
        queryKey: ['einvoice-submission', selectedId],
        queryFn: () => fetchEInvoiceSubmissionById(selectedId!),
        enabled: !!selectedId,
    });

    const handleSubmissionClick = (id: number) => {
        navigateToView('details', id);
    };

    const handleBackToList = () => {
        navigateToView('list');
    };

    const filteredSubmissions = submissions.filter((s: EInvoiceSubmission) => {
        const ref = s.internal_document_reference?.toLowerCase() || '';
        const type = s.document_type?.toLowerCase() || '';
        const status = s.status?.toLowerCase() || '';
        const uuid = s.lhdn_uuid?.toLowerCase() || '';
        const search = searchTerm.toLowerCase();
        return ref.includes(search) || type.includes(search) || status.includes(search) || uuid.includes(search);
    });

    if (isLoading) return (
        <div className="min-h-screen bg-white flex items-center justify-center">
            <p className="text-gray-500 text-sm" style={{ fontFamily: 'Montserrat, system-ui' }}>Loading submission history...</p>
        </div>
    );

    if (error) return (
        <div className="min-h-screen bg-white flex items-center justify-center">
            <p className="text-red-500 text-sm" style={{ fontFamily: 'Montserrat, system-ui' }}>Failed to load submission history.</p>
        </div>
    );

    return (
        <div className="min-h-screen bg-white">
            <div className="border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            <div>
                                <h1 className="text-lg font-semibold text-gray-900" style={{ fontFamily: 'Montserrat, system-ui' }}>E-Invois Suite</h1>
                                <p className="text-sm text-gray-500" style={{ fontFamily: 'Montserrat, system-ui' }}>Submission History</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                        <Link 
                            to="/core"
                            className="text-sm text-black px-3 py-1 border border-gray-300 rounded-2xl transition-colors duration-200 flex items-center gap-2 hover:bg-purple-50 hover:border-purple-500 hover:shadow-md hover:-translate-y-0.5"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                            Back to Company Dashboard
                        </Link>
                        </div>
                        {view === 'details' && (
                            <button
                                onClick={handleBackToList}
                                className="text-sm text-black px-3 py-1 border border-gray-200 rounded-2xl transition-colors duration-200 flex items-center gap-2 hover:bg-purple-50 hover:border-purple-500 hover:shadow-md hover:-translate-y-0.5 cursor-pointer"
                                style={{ fontFamily: 'Montserrat, system-ui' }}
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                </svg>
                                Back
                            </button>
                        )}
                    </div>
                </div>
            </div>

            <div className="p-8">
                <div className="max-w-7xl mx-auto">
                    <div className="mb-8">
                        <div className="flex items-start justify-between mb-6">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-linear-to-br from-blue-50 to-indigo-100 rounded-2xl flex items-center justify-center border border-blue-100">
                                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                    </svg>
                                </div>
                                <div>
                                    <h1 className="text-4xl font-light text-gray-900 tracking-tight" style={{ fontFamily: 'Montserrat, system-ui' }}>Submission History</h1>
                                    <p className="text-gray-500 mt-1" style={{ fontFamily: 'Montserrat, system-ui' }}>All LHDN MyInvois submissions for your company</p>
                                </div>
                            </div>
                        </div>

                        {view === 'list' && (
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-6">
                                    <div className="text-center">
                                        <div className="text-2xl font-light text-gray-900">{submissions.length}</div>
                                        <div className="text-sm text-gray-500" style={{ fontFamily: 'Montserrat, system-ui' }}>Total</div>
                                    </div>
                                    <div className="w-px h-8 bg-gray-200" />
                                    <div className="text-center">
                                        <div className="text-2xl font-light text-green-600">
                                            {submissions.filter((s: EInvoiceSubmission) => s.status === 'Valid').length}
                                        </div>
                                        <div className="text-sm text-gray-500" style={{ fontFamily: 'Montserrat, system-ui' }}>Valid</div>
                                    </div>
                                    <div className="w-px h-8 bg-gray-200" />
                                    <div className="text-center">
                                        <div className="text-2xl font-light text-blue-600">
                                            {submissions.filter((s: EInvoiceSubmission) => s.status === 'Submitted').length}
                                        </div>
                                        <div className="text-sm text-gray-500" style={{ fontFamily: 'Montserrat, system-ui' }}>Pending</div>
                                    </div>
                                    <div className="w-px h-8 bg-gray-200" />
                                    <div className="text-center">
                                        <div className="text-2xl font-light text-red-500">
                                            {submissions.filter((s: EInvoiceSubmission) => s.status === 'Invalid').length}
                                        </div>
                                        <div className="text-sm text-gray-500" style={{ fontFamily: 'Montserrat, system-ui' }}>Invalid</div>
                                    </div>
                                </div>

                                <div className="relative">
                                    <input
                                        type="text"
                                        placeholder="Search submissions..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="pl-10 pr-4 py-1 text-gray-600 border border-gray-200 rounded-xl focus:ring-1 focus:ring-purple-500 focus:border-purple-500 bg-white transition-all duration-200 w-64"
                                        style={{ fontFamily: 'Montserrat, system-ui' }}
                                    />
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {view === 'list' && (
                        <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
                            <EInvoiceSubmissionHistoryTable
                                submissions={filteredSubmissions}
                                onSubmissionClick={handleSubmissionClick}
                            />
                        </div>
                    )}

                    {view === 'details' && (
                        <EInvoiceSubmissionHistoryDetails
                            submission={selectedSubmission}
                            isLoading={isLoadingDetail}
                            onBack={handleBackToList}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}

export default EInvoiceSubmissionHistoryManagement;

