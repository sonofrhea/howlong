import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Link } from 'react-router-dom';

import { Plus } from "lucide-react";

import { fetchCompanyPurchaseInvoices, fetchCompanyPurchaseInvoiceById, createCompanyPurchaseInvoice, 
    updateCompanyPurchaseInvoice, deleteCompanyPurchaseInvoice
} from "../Engines";


import { fetchAgents } from "../../Core/Engines"
import { fetchProductItems } from "../../Products/Engines";

import { fetchSupplierProfiles } from "../../Suppliers/Engines";


import { management } from "../constants/styles";

import { CompanyPurchaseInvoiceInputs, CompanyPurchaseInvoiceResponse, EditCompanyPurchaseInvoiceInputs } from "../Interfaces";


import CompanyPurchaseInvoiceDetails from "./CompanyPurchaseInvoiceDetails";
import CompanyPurchaseInvoiceForm from "./CompanyPurchaseInvoiceForm";
import CompanyPurchaseInvoiceTable from "./CompanyPurchaseInvoiceTable";
//import CompanyPurchaseInvoiceEdit from "./CompanyPurchaseInvoiceEdit";


interface SortConfig {
  key: string | null;
  direction: 'asc' | 'desc';
}






















function CompanyPurchaseInvoiceManagement() {
    const queryClient = useQueryClient();
    const [view, setView] = useState('list');
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCompanyPurchaseInvoiceId, setSelectedCompanyPurchaseInvoiceId] = useState<number | null>(null);
    // ------------------------------------------------------------------------------------
    const [sortConfig, setSortConfig] = useState<SortConfig>({ key: null, direction: 'asc' });
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    // ------------------------------------------------------------------------------------
            // DEPENDENCIES

    const { data: agents = [] } = useQuery({
        queryKey: ['agents'],
        queryFn: fetchAgents
    });

    const { data: products = [] } = useQuery({
        queryKey: ['products'],
        queryFn: fetchProductItems
    });

    const { data: suppliers = [] } = useQuery({
        queryKey: ['suppliers'],
        queryFn: fetchSupplierProfiles
    });

    // ------------------------------------------------------------------------------------

                        // QUERIES

    // LIST QUERIES

    const { data: companyPurchaseInvoices = [], isLoading: isLoadingCompanyPurchaseInvoices, error: companyPurchaseInvoiceError} = useQuery({
        queryKey: ['companyPurchaseInvoices'],
        queryFn: fetchCompanyPurchaseInvoices
    });





    // DETAIL QUERIES

    const { data: selectedCompanyPurchaseInvoice, isLoading: isLoadingCompanyPurchaseInvoice } = useQuery({
        queryKey: ['companyPurchaseInvoice', selectedCompanyPurchaseInvoiceId],
        queryFn: () => fetchCompanyPurchaseInvoiceById(selectedCompanyPurchaseInvoiceId!),
        enabled: !!selectedCompanyPurchaseInvoiceId,
    });
    // ------------------------------------------------------------------------------------
                    // MANIPULATIONS


        // CREATIONS - POST

    const createCompanyPurchaseInvoiceMutation = useMutation({
        mutationFn: createCompanyPurchaseInvoice,
        onSuccess: (data: CompanyPurchaseInvoiceResponse) => {
            const newCompanyPurchaseInvoice = data.purchase_invoice_number
            queryClient.invalidateQueries({ queryKey: ['companyPurchaseInvoices']});
            setSelectedCompanyPurchaseInvoiceId(newCompanyPurchaseInvoice);
            setView('details');
        },
        onError: (error: any) => {
        console.error('Error creating companyPurchaseInvoice:', error.response?.data || error.message || error);
        }
    });





        // UPDATES - PUT

    const updateCompanyPurchaseInvoiceMutation = useMutation({
        mutationFn: updateCompanyPurchaseInvoice,
        onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['companyPurchaseInvoices'] });
        queryClient.invalidateQueries({ queryKey: ['companyPurchaseInvoice', selectedCompanyPurchaseInvoiceId]});
        setView('details');
        },
        onError: (error: any) => {
        console.error('Error updating companyPurchaseInvoice:', error.response?.data || error.message);
        }
    });
    // ------------------------------------------------------------------------------------
                // DELETE

    const deleteCompanyPurchaseInvoiceMutation = useMutation({
        mutationFn: deleteCompanyPurchaseInvoice,
        onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['companyPurchaseInvoices'] });
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





    const handleAddCompanyPurchaseInvoice = async (companyPurchaseInvoiceData: CompanyPurchaseInvoiceInputs) => {
        console.log("🎯 RAW FORM DATA:", companyPurchaseInvoiceData)

        createCompanyPurchaseInvoiceMutation.mutate(companyPurchaseInvoiceData);
    };





    const handleUpdateCompanyPurchaseInvoice = (companyPurchaseInvoiceData: CompanyPurchaseInvoiceInputs) => {
        updateCompanyPurchaseInvoiceMutation.mutate({
        purchase_invoice_number: selectedCompanyPurchaseInvoiceId!,
        companyPurchaseInvoiceData: companyPurchaseInvoiceData
        });
    };





    const handleDeleteCompanyPurchaseInvoice = async (companyPurchaseInvoiceId: number) => {
        if (window.confirm('Are you sure you want to delete this Purchase Invoice?')) {
        deleteCompanyPurchaseInvoiceMutation.mutate(companyPurchaseInvoiceId);
        }
    };
    // ------------------------------------------------------------------------------------


    const handleCompanyPurchaseInvoiceClick = (companyPurchaseInvoiceId: number) => {
        setSelectedCompanyPurchaseInvoiceId(companyPurchaseInvoiceId);
        setView('details')
    };
    // ------------------------------------------------------------------------------------


    const handleEditCompanyPurchaseInvoice = (
        {companyPurchaseInvoiceId, companyPurchaseInvoiceData}: EditCompanyPurchaseInvoiceInputs) => {
        setSelectedCompanyPurchaseInvoiceId(companyPurchaseInvoiceId!);
        setView('edit');
    };
    // ------------------------------------------------------------------------------------

    const handleBackToCompanyPurchaseInvoicesList = () => {
        setView('list');
        setSelectedCompanyPurchaseInvoiceId(null);
    };
    // ------------------------------------------------------------------------------------

    const handleEditCompanyPurchaseInvoiceButton = () => {
        setView('edit');
    };
    // ------------------------------------------------------------------------------------

    const filteredCompanyPurchaseInvoices = companyPurchaseInvoices.filter((companyPurchaseInvoice: any) =>
        String(companyPurchaseInvoice.purchase_invoice_number)?.toLowerCase().includes(searchTerm.toLocaleLowerCase())
    );

    // ------------------------------------------------------------------------------------
                                // SORTING


    const sortedCompanyPurchaseInvoices = React.useMemo(() => {
        if (!sortConfig.key) return filteredCompanyPurchaseInvoices;

        return [...filteredCompanyPurchaseInvoices].sort((a, b) => {
        const aValue = a[sortConfig.key as keyof typeof a];
        const bValue = b[sortConfig.key as keyof typeof b];

        if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
        if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
        });
    }, [filteredCompanyPurchaseInvoices, sortConfig]);


    // Sort handler
    const handleSort = (key: any) => {
    setSortConfig(current => ({
        key,
        direction: current.key === key && current.direction === 'asc' ? 'desc' : 'asc'
    }));
    };

    // ------------------------------------------------------------------------------------

    // Pagination calculations for Company Purchases Table
    const totalCompanyPurchaseInvoicePages = Math.ceil(sortedCompanyPurchaseInvoices.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedCompanyPurchaseInvoices = sortedCompanyPurchaseInvoices.slice(startIndex, startIndex + itemsPerPage);

    // Page change handler
    const handlePageChange = (page: any) => {
    setCurrentPage(page);
    };

    // Items per page handler
    const handleItemsPerPageChange = (value: any) => {
    setItemsPerPage(Number(value));
    setCurrentPage(1); // Reset to first page
    };



    // ------------------------------------------------------------------------------------


    // ERROR DISPLAYS

    if (isLoadingCompanyPurchaseInvoices) return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading Company Purchase Invoices...</p>
        </div>
        </div>
    );

    if (companyPurchaseInvoiceError) return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-md text-center">
            <svg width="96" height="96" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-red-500 mb-4">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15v-2h2v2h-2zm0-4V7h2v6h-2z" fill="currentColor"/>
            </svg>
            <h2 className="text-xl font-bold text-gray-800 mb-2">Error Loading Data</h2>
            <p className="text-gray-600">Failed to load Company Purchase Invoices. Please try again.</p>
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
                            <h1 className="text-lg font-semibold text-gray-900">Purchases Suite</h1>
                            <p className="text-sm text-gray-500">Company Purchase Invoice Management</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <Link 
                        to="/purchases"
                        className="text-sm text-gray-600 hover:text-blue-600 transition-colors duration-200 flex items-center gap-2"
                        >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Back to Purchase Invoice Dashboard
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
                        <div className="w-12 h-12 bg-gradient-to-br from-green-50 to-emerald-100 rounded-2xl flex items-center justify-center border border-green-100">
                        <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        </div>
                        <div>
                        <h1 className="text-4xl font-light text-gray-900 tracking-tight">Company Purchase Invoices</h1>
                        <p className="text-gray-500 mt-2">Manage and track your Purchase Invoice transactions</p>
                        </div>
                    </div>
                    </div>
                    
                    <div className="flex items-center gap-3">

                    {(view === 'form' || view === 'details' || view === 'edit') && (
                        <button
                        onClick={handleBackToCompanyPurchaseInvoicesList}
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
                    <div className="flex items-center gap-6 justify-between">
                    <div className="flex items-center gap-4">
                        <div className="text-center">
                        <div className="text-2xl font-light text-gray-900">{companyPurchaseInvoices.length}</div>
                        <div className="text-sm text-gray-500">Total Purchase Invoices</div>
                        </div>
                        <div className="w-px h-8 bg-gray-200"></div>
                        <div className="text-center">
                        <div className="text-2xl font-light text-gray-900">
                            {new Set(companyPurchaseInvoices.map(c => c.suppliers?.supplier_code)).size}
                        </div>
                        <div className="text-sm text-gray-500">Suppliers</div>
                        </div>
                    </div>
                    <div className="flex gap-4">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className={management.searchSize}
                            />
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </div>
                        </div>
                        <button
                        onClick={() => setView('form')}
                        className={management.newButton}
                        >
                        <Plus size={16} />
                        New Purchase Invoice
                        </button>
                    </div>
                    </div>
                )}
                </div>

                {/* Content Area */}
                {view === 'list' && (
                <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
                    <CompanyPurchaseInvoiceTable 
                    companyPurchaseInvoices={paginatedCompanyPurchaseInvoices}
                    onCompanyPurchaseInvoiceClick={handleCompanyPurchaseInvoiceClick}
                    onEditCompanyPurchaseInvoice={handleEditCompanyPurchaseInvoice}
                    onDeleteCompanyPurchaseInvoice={handleDeleteCompanyPurchaseInvoice}
                    sortConfig={sortConfig}
                    onSort={handleSort}
                    currentPage={currentPage}
                    totalPages={totalCompanyPurchaseInvoicePages}
                    totalItems={sortedCompanyPurchaseInvoices.length}
                    itemsPerPage={itemsPerPage}
                    onPageChange={handlePageChange}
                    onItemsPerPageChange={handleItemsPerPageChange}
                    />
                </div>
                )}

                {view === 'form' && (
                <div className="w-[100%] bg-gray-50 rounded-2xl shadow-sm border border-gray-200">
                    <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-8">
                    <div className="flex items-center gap-4 mb-8 justify-between">
                        <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center border border-green-100">
                        <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v16m8-8H4" />
                        </svg>
                        </div>
                        <div>
                        <h2 className="text-2xl font-light text-gray-900">Create Purchase Invoice</h2>
                        <p className="text-gray-500">Add a new Purchase Invoice to your records</p>
                        </div>
                        <button 
                            onClick={() => setView('list')}
                            className="bg-black-600 text-blue px-2 py-1 rounded-lg hover:bg-red-800 transition-colors flex items-center gap-1"
                        >
                            x Cancel
                        </button>
                    </div>
                    <CompanyPurchaseInvoiceForm 
                        onSubmit={handleAddCompanyPurchaseInvoice} 
                        isSubmitting={createCompanyPurchaseInvoiceMutation.isPending} 
                        onCancel={handleBackToCompanyPurchaseInvoicesList}
                        agents={agents}
                        products={products}
                        suppliers={suppliers}
                    />
                    {createCompanyPurchaseInvoiceMutation.isError && (
                        <div className="mt-6 p-4 bg-red-50 border border-red-100 rounded-xl text-red-700 text-sm">
                        Error creating Purchase Invoice. Please try again.
                        </div>
                    )}
                    </div>
                </div>
                )}

                {view === 'details' && (
                <CompanyPurchaseInvoiceDetails 
                    companyPurchaseInvoice={selectedCompanyPurchaseInvoice}
                    isLoading={isLoadingCompanyPurchaseInvoice}
                    onBack={handleBackToCompanyPurchaseInvoicesList}
                    onEdit={handleEditCompanyPurchaseInvoiceButton}
                />
                )}

                {view === 'edit' && selectedCompanyPurchaseInvoice && (
                <CompanyPurchaseInvoiceEdit 
                    companyPurchaseInvoice={selectedCompanyPurchaseInvoice}
                    onSubmit={handleUpdateCompanyPurchaseInvoice}
                    isSubmitting={updateCompanyPurchaseInvoiceMutation.isPending}
                    onBack={handleBackToCompanyPurchaseInvoicesList}
                    onCancel={handleBackToCompanyPurchaseInvoicesList}
                />
                )}
            </div>
            </div>
        </div>
    );
}
export default CompanyPurchaseInvoiceManagement;
