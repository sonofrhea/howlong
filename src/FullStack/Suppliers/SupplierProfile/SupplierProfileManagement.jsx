import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Link } from 'react-router-dom';


import { fetchSupplierProfiles, fetchSupplierProfileById, createSupplierProfile,
    updateSupplierProfile, deleteSupplierProfile
 } from "../Engines";


 import { fetchChartOfAccounts } from "../../ChartOfAccounts/Engines"
import { fetchCurrencies, fetchAgents } from "../../Core/Engines"

 import { fetchCustomers } from "../../Customers/Engines";


//import SupplierProfileDetails from "./SupplierProfileDetails";
//import SupplierProfileForm from "./SupplierProfileForm";
import SupplierProfileTable from "./SupplierProfileTable";
//import SupplierProfileEdit from "./SupplierProfileEdit";





function SupplierProfileManagement() {
    const queryClient = useQueryClient();
    const [view, setView] = useState('list');
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedSupplierProfileId, setSelectedSupplierProfileId] = useState(null);
    // ------------------------------------------------------------------------------------
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    // ------------------------------------------------------------------------------------
                // DEPENDENCIES
    const { data: customers = [] } = useQuery({
        queryKey: ['customers'],
        queryFn: fetchCustomers
    });

    const { data: currencies = [] } = useQuery({
        queryKey: ['currencies'],
        queryFn: fetchCurrencies
    });

    const { data: accounts = [] } = useQuery({
        queryKey: ['accounts'],
        queryFn: fetchChartOfAccounts
    });

    const { data: agents = [] } = useQuery({
        queryKey: ['agents'],
        queryFn: fetchAgents
    });



    // ------------------------------------------------------------------------------------

                        // QUERIES

    // LIST QUERIES

    const { data: supplierProfiles = [], isLoading: isLoadingSupplierProfiles, error: supplierProfilesError} = useQuery({
        queryKey: ['supplierProfiles'],
        queryFn: fetchSupplierProfiles
    });





    // DETAIL QUERIES

    const { data: selectedSupplierProfile, isLoading: isLoadingSupplierProfile } = useQuery({
        queryKey: ['supplierProfile', selectedSupplierProfileId],
        queryFn: () => fetchSupplierProfileById(selectedSupplierProfileId),
        enabled: !!selectedSupplierProfileId,
    });
    // ------------------------------------------------------------------------------------
                    // MANIPULATIONS


        // CREATIONS - POST

    const createSupplierProfileMutation = useMutation({
        mutationFn: createSupplierProfile,
        onSuccess: (data) => {
        queryClient.invalidateQueries({ queryKey: ['supplierProfiles']});
        setSelectedSupplierProfileId(data.supplier_code);
        setView('details');
        },
        onError: (error) => {
        console.error('Error creating supplier profile:', error.response?.data || error.message || error);
        }
    });





        // UPDATES - PUT

    const updateSupplierProfileMutation = useMutation({
        mutationFn: updateSupplierProfile,
        onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['supplierProfiles'] });
        queryClient.invalidateQueries({ queryKey: ['supplierProfile', selectedSupplierProfileId]});
        setView('details');
        },
        onError: (error) => {
        console.error('Error updating supplier profile:', error.response?.data || error.message);
        }
    });
    // ------------------------------------------------------------------------------------
                // DELETE

    const deleteSupplierProfileMutation = useMutation({
        mutationFn: deleteSupplierProfile,
        onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['supplierProfiles'] });
        }
    });

    // ------------------------------------------------------------------------------------
                    // MUTATION USE

    const toFormData = (obj, form = new FormData(), parentKey = '') => {
        Object.keys(obj).forEach(key => {
        const value = obj[key];
        const field = parentKey ? `${parentKey}.${key}` : key;
        if (value === null || value === undefined) return;
        if (Array.isArray(value)) {
            value.forEach((v, i) => toFormData(v, form, `${field}[${i}]`));
        } else if (value instanceof File) {
            form.append(field, value);
        } else if (typeof value === 'object') {
            toFormData(value, form, field);
        } else {
            form.append(field, value);
        }
        });
        return form;
    };





    const handleAddSupplierProfile = async (supplierProfileData) => {

      
    };





    const handleUpdateSupplierProfile = (supplierProfileData) => {
        updateSupplierProfileMutation.mutate({
        supplier_code: selectedSupplierProfileId,
        supplierProfileData: supplierProfileData
        });
    };





    const handleDeleteSupplierProfile = async (supplierProfileId) => {
        if (window.confirm('Are you sure you want to delete this supplier profile?')) {
        deleteSupplierProfileMutation.mutate(supplierProfileId);
        }
    };
    // ------------------------------------------------------------------------------------


    const handleSupplierProfileClick = (supplierProfileId) => {
        setSelectedSupplierProfileId(supplierProfileId);
        setView('details')
    };
    // ------------------------------------------------------------------------------------


    const handleEditSupplierProfile = (supplierProfileId, supplierProfileData) => {
        setSelectedSupplierProfileId(supplierProfileId);
        setView('edit');
    };
    // ------------------------------------------------------------------------------------

    const handleBackToSupplierProfilesList = () => {
        setView('list');
        setSelectedSupplierProfileId(null);
    };
    // ------------------------------------------------------------------------------------

    const handleEditSupplierProfileButton = () => {
        setView('edit');
    };
    // ------------------------------------------------------------------------------------

    const filteredSupplierProfiles = supplierProfiles.filter(supplierProfile => {
        const supplierCode = String(supplierProfile.supplier_code)?.toLowerCase() || '';
        const supplierName = supplierProfile.supplier_name?.toLowerCase() || '';
        const search = searchTerm.toLowerCase();
        
        return supplierCode.includes(search) ||supplierName.includes(search);
    });

    // ------------------------------------------------------------------------------------
                                // SORTING


    const sortedSupplierProfiles = React.useMemo(() => {
        if (!sortConfig.key) return filteredSupplierProfiles;

        return [...filteredSupplierProfiles].sort((a, b) => {
        const aValue = a[sortConfig.key];
        const bValue = b[sortConfig.key];

        if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
        if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
        });
    }, [filteredSupplierProfiles, sortConfig]);


    // Sort handler
    const handleSort = (key) => {
    setSortConfig(current => ({
        key,
        direction: current.key === key && current.direction === 'asc' ? 'desc' : 'asc'
    }));
    };

    // ------------------------------------------------------------------------------------

    // Pagination calculations for Suppliers Profile Table
    const totalSupplierProfilePages = Math.ceil(sortedSupplierProfiles.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedSupplierProfiles = sortedSupplierProfiles.slice(startIndex, startIndex + itemsPerPage);

    // Page change handler
    const handlePageChange = (page) => {
    setCurrentPage(page);
    };

    // Items per page handler
    const handleItemsPerPageChange = (value) => {
    setItemsPerPage(Number(value));
    setCurrentPage(1); // Reset to first page
    };



    // ------------------------------------------------------------------------------------


    // ERROR DISPLAYS

    if (isLoadingSupplierProfiles) return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading supplier profiles...</p>
        </div>
        </div>
    );

    if (supplierProfilesError) return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-md text-center">
            <svg width="96" height="96" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="text-red-500 mb-4">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15v-2h2v2h-2zm0-4V7h2v6h-2z" fill="currentColor"/>
            </svg>
            <h2 className="text-xl font-bold text-gray-800 mb-2">Error Loading Data</h2>
            <p className="text-gray-600">Failed to load supplier profiles. Please try again.</p>
        </div>
        </div>
    );



    // ------------------------------------------------------------------------------------







    return (
        <div className="min-h-screen bg-white">
        {/* Minimal Header */}
        <div className="border-b border-gray-100">
            <div className="max-w-7xl mx-auto px-4 py-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        <div className="w-2 h-8 bg-gradient-to-b from-blue-500 to-purple-600 rounded-full"></div>
                        <div>
                            <h1 className="text-lg font-semibold text-gray-900">Suppliers Suite</h1>
                            <p className="text-sm text-gray-500">Supplier Profile Management</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <Link 
                        to="/suppliers"
                        className="text-sm text-gray-600 hover:text-blue-600 transition-colors duration-200 flex items-center gap-2"
                        >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Back to Suppliers Dashboard
                        </Link>
                    </div>
                </div>
            </div>
        </div>

        {/* Main Content */}
        <div className="p-8">
            <div className="max-w-7xl mx-auto">
            {/* Elegant Header */}
            <div className="mb-12">
                <div className="flex items-start justify-between mb-8">
                <div className="space-y-4">
                    <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl flex items-center justify-center border border-blue-100">
                        <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                    </div>
                    <div>
                        <h1 className="text-4xl font-light text-gray-900 tracking-tight">Supplier Profiles</h1>
                        <p className="text-gray-500 mt-2">Manage and track your supplier profiles</p>
                    </div>
                    </div>
                </div>
                
                <div className="flex items-center gap-3">
                    {view === 'list' && (
                    <div className="relative">
                        <input
                        type="text"
                        placeholder="Search..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-1 focus:ring-blue-500 focus:border-blue-500 bg-white transition-all duration-200 w-64 focus:shadow-sm"
                        />
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                        </div>
                    </div>
                    )}

                    {view === 'list' && (
                    <button
                        onClick={() => setView('form')}
                        className="bg-white border border-gray-200 hover:border-blue-500 text-gray-700 px-6 py-3 rounded-xl font-medium transition-all duration-200 flex items-center gap-2 hover:shadow-sm hover:bg-blue-50"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                        New Supplier Profile
                    </button>
                    )}

                    {(view === 'form' || view === 'details' || view === 'edit') && (
                    <button
                        onClick={handleBackToSupplierProfilesList}
                        className="bg-white border border-gray-200 hover:border-gray-300 text-gray-700 px-6 py-3 rounded-xl font-medium transition-all duration-200 flex items-center gap-2 hover:shadow-sm"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Back
                    </button>
                    )}
                </div>
                </div>

                {view === 'list' && (
                <div className="flex items-center gap-6">
                    <div className="flex items-center gap-4">
                    <div className="text-center">
                        <div className="text-2xl font-light text-gray-900">{supplierProfiles.length}</div>
                        <div className="text-sm text-gray-500">Total Supplier Profiles</div>
                    </div>
                    <div className="w-px h-8 bg-gray-200"></div>
                    <div className="text-center">
                        <div className="text-2xl font-light text-gray-900">
                        {new Set(supplierProfiles.map(c => c.currency?.currency_code)).size}
                        </div>
                        <div className="text-sm text-gray-500">Currencies</div>
                    </div>
                    </div>
                </div>
                )}
            </div>

            {/* Content Area */}
            {view === 'list' && (
                <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
                <SupplierProfileTable 
                    supplierProfiles={paginatedSupplierProfiles}
                    onSupplierProfileClick={handleSupplierProfileClick}
                    onEditSupplierProfile={handleEditSupplierProfile}
                    onDeleteSupplierProfile={handleDeleteSupplierProfile}
                    sortConfig={sortConfig}
                    onSort={handleSort}
                    currentPage={currentPage}
                    totalSupplierProfilePages={totalSupplierProfilePages}
                    totalItems={sortedSupplierProfiles.length}
                    itemsPerPage={itemsPerPage}
                    onPageChange={handlePageChange}
                    onItemsPerPageChange={handleItemsPerPageChange}
                />
                </div>
            )}

            {view === 'form' && (
                <div className="max-w-4xl mx-auto">
                <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-8">
                    <div className="flex items-center gap-4 mb-8">
                    <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center border border-blue-100">
                        <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v16m8-8H4" />
                        </svg>
                    </div>
                    <div>
                        <h2 className="text-2xl font-light text-gray-900">Create Supplier Profile</h2>
                        <p className="text-gray-500">Add a new supplier profile to your records</p>
                    </div>
                    </div>
                    <SupplierProfileForm 
                    onSubmit={handleAddSupplierProfile} 
                    isSubmitting={createSupplierProfileMutation.isLoading} 
                    onCancel={handleBackToSupplierProfilesList}
                    customers={customers}
                    currencies={currencies}
                    accounts={accounts}
                    agents={agents}
                    />
                    {createSupplierProfileMutation.isError && (
                    <div className="mt-6 p-4 bg-red-50 border border-red-100 rounded-xl text-red-700 text-sm">
                        Error creating supplier profile. Please try again.
                    </div>
                    )}
                </div>
                </div>
            )}

            {view === 'details' && (
                <SupplierProfileDetails 
                supplierProfile={selectedSupplierProfile}
                isLoading={isLoadingSupplierProfile}
                onBack={handleBackToSupplierProfilesList}
                onEdit={handleEditSupplierProfileButton}
                />
            )}

            {view === 'edit' && selectedSupplierProfile && (
                <SupplierProfileEdit 
                supplierProfile={selectedSupplierProfile}
                onSubmit={handleUpdateSupplierProfile}
                isSubmitting={updateSupplierProfileMutation.isLoading}
                onBack={handleBackToSupplierProfilesList}
                onCancel={handleBackToSupplierProfilesList}
                />
            )}
            </div>
        </div>
        </div>
    );

};
export default SupplierProfileManagement;