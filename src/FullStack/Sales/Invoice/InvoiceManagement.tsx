import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Link, useSearchParams } from 'react-router-dom';

import { fetchCompanyProfile } from "../../Core/Engines";


import { fetchInvoices, fetchInvoiceById, createInvoice,
    updateInvoice, deleteInvoice, 
    fetchQuotations,
    fetchLhdnClassificationCodes} from "../Engines";

import { fetchCurrencies, fetchAgents } from "../../Core/Engines"
import { fetchChartOfAccounts } from "../../ChartOfAccounts/Engines"

import { fetchCustomers } from "../../Customers/Engines";
import { fetchProjects } from "../../Projects/Engines";
import { fetchProductItems } from "../../Products/Engines";



import InvoiceDetails from "./InvoiceDetails";
import InvoiceForm from "./InvoiceForm";
import InvoiceTable from "./InvoiceTable";
import InvoiceEdit from "./InvoiceEdit";


import { InvoiceInputs, InvoiceCreateResponse, 
    EditInvoiceInputs, 
    InvoiceList} from "../Constants/Types";
import { spinningStyles } from "../Constants/Styles";
import { toast } from "react-hot-toast";


interface SortConfig {
  key: string | null;
  direction: 'asc' | 'desc';
}


























function InvoiceManagement() {
    const queryClient = useQueryClient();
    const [searchParams, setSearchParams] = useSearchParams();
    const view = searchParams.get('view') || 'list';
    const [searchTerm, setSearchTerm] = useState("");
    const selectedInvoiceId = searchParams.get('invoice_number') ? Number(searchParams.get('invoice_number')) : null;
    // ------------------------------------------------------------------------------------
    const [sortConfig, setSortConfig] = useState<SortConfig>({ key: null, direction: 'asc' });
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    // ------------------------------------------------------------------------------------

    const navigateToView = (newView: string, invoice_number?: number) => {
        const params = new URLSearchParams(searchParams);
        params.set('view', newView);
        if (invoice_number) {
            params.set('invoice_number', invoice_number.toString());
        } else if (newView === 'list') {
            params.delete('invoice_number');
        }
        setSearchParams(params);
    }

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

    const { data: agents = [] } = useQuery({
        queryKey: ['agents'],
        queryFn: fetchAgents
    });

    const { data: projects = [] } = useQuery({
        queryKey: ['projects'],
        queryFn: fetchProjects
    });

    const { data: productItems = [] } = useQuery({
        queryKey: ['productItems'],
        queryFn: fetchProductItems
    });

    const { data: quotations = [] } = useQuery({
        queryKey: ['quotations'],
        queryFn: fetchQuotations
    });

    const { data: selectedCompany } = useQuery({
        queryKey: ['company'],
        queryFn: fetchCompanyProfile
    })
      
    const { data: lhdnClassificationCodes = [] } = useQuery({
        queryKey: ['lhdnClassificationCodes'],
        queryFn: fetchLhdnClassificationCodes
    });


    // ------------------------------------------------------------------------------------

                        // QUERIES

    // LIST QUERIES

    const { data: invoices = [], isLoading: isLoadingInvoices, error: invoicesError} = useQuery({
        queryKey: ['invoices'],
        queryFn: fetchInvoices
    });





    // DETAIL QUERIES

    const { data: selectedInvoice, isLoading: isLoadingInvoice } = useQuery({
        queryKey: ['invoice', selectedInvoiceId],
        queryFn: () => fetchInvoiceById(selectedInvoiceId!),
        enabled: !!selectedInvoiceId,
    });
    // ------------------------------------------------------------------------------------
                    // MANIPULATIONS


        // CREATIONS - POST

    const createInvoiceMutation = useMutation({
        mutationFn: createInvoice,
        onMutate: () => {
            toast.loading('Creating Invoice...', { id: "Create Invoice" });
        },
        onSuccess: (data: InvoiceCreateResponse) => {
            const newInvoiceId = data.invoice_number
            queryClient.invalidateQueries({ queryKey: ['invoices']});
            navigateToView('details', newInvoiceId);
            toast.success('Invoice successfully created', { id: "Create Invoice" });
        },
        onError: (error: any) => {
            toast.error('Failed to create invoice', { id: "Create Invoice" });
            console.error('Error creating invoice:', error.response?.data || error.message || error);
        }
    });





        // UPDATES - PUT

    const updateInvoiceMutation = useMutation({
        mutationFn: updateInvoice,
        onMutate: () => {
            toast.loading('Updating Invoice...', { id: "Update Invoice" });
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['invoices'] });
            queryClient.invalidateQueries({ queryKey: ['invoice', selectedInvoiceId]});
            toast.success('Invoice successfully updated', { id: "Update Invoice" });
            navigateToView('details', selectedInvoiceId!);
        },
        onError: (error: any) => {
            toast.error('Failed to update invoice', { id: "Update Invoice" });
            console.error('Error updating invoice:', error.response?.data || error.message);
        }
    });
    // ------------------------------------------------------------------------------------
                // DELETE

    const deleteInvoiceMutation = useMutation({
        mutationFn: deleteInvoice,
        onMutate: () => {
            toast.loading('Deleting Invoice...', { id: "Delete Invoice" });
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['invoices'] });
            toast.success('Invoice successfully deleted', { id: "Delete Invoice" });
        },
        onError: (error: any) => {
            toast.error('Failed to delete invoice', { id: "Delete Invoice" });
            console.error('Error updating invoice:', error.response?.data || error.message);
        }
    });

    // ------------------------------------------------------------------------------------
                    // E-INVOICE HANDLING


    const handleEInvoiceSubmitSuccess = () => {
        queryClient.invalidateQueries({ queryKey: ['invoice', selectedInvoiceId] });
        queryClient.invalidateQueries({ queryKey: ['invoices'] });
    };

    const handleEInvoiceCancelSuccess = () => {
        queryClient.invalidateQueries({ queryKey: ['invoice', selectedInvoiceId] });
        queryClient.invalidateQueries({ queryKey: ['invoices'] });
    };








// ------------------------------------------------------------------------------------



    const handleAddInvoice = async (invoiceData: InvoiceInputs) => {

        const cleanedData = {
            ...invoiceData,
            related_invoice:
                invoiceData.related_invoice &&
                invoiceData.related_invoice?.length > 0
                    ? invoiceData.related_invoice
                    : undefined,
        };
        

        console.log("🎯 RAW FORM DATA:", invoiceData);
        await createInvoiceMutation.mutateAsync(cleanedData);
    };



// -------------------------UPDATE-----------------------------------------------------------

    const handleUpdateInvoice = async (invoiceData: InvoiceInputs) => {

        const cleanedData = {
            ...invoiceData,
            related_invoice:
                invoiceData.related_invoice &&
                invoiceData.related_invoice?.length > 0
                    ? invoiceData.related_invoice
                    : undefined,
        };
        await updateInvoiceMutation.mutateAsync({
            invoice_number: selectedInvoiceId!,
            invoiceData: cleanedData
        });
    };


// ---------------------------DELETE---------------------------------------------------------


    const handleDeleteInvoice = async (invoiceId: number) => {
        if (!window.confirm('Are you sure you want to delete this invoice?')) return;
        
        await deleteInvoiceMutation.mutateAsync(invoiceId);
    };
    // --------------------------CLICK----------------------------------------------------------


    const handleInvoiceClick = (invoiceId: number) => {
        navigateToView('details', invoiceId);
    };
    // -------------------------EDIT-----------------------------------------------------------


    const handleEditInvoice = (invoiceId: number) => {
        navigateToView('edit', invoiceId);
    };
    // ------------------------------------------------------------------------------------

    const handleBackToInvoicesList = () => {
        navigateToView('list');
    };

    // ------------------------------------------------------------------------------------


    const handleBackToInvoiceDetails = (invoiceId: number) => {
        navigateToView('details', invoiceId);
    };
    // ------------------------------------------------------------------------------------

    const handleEditInvoiceButton = () => {
        navigateToView('edit');
    };
    // ------------------------------------------------------------------------------------

    const filteredInvoices = invoices.filter((invoice: InvoiceList) => {
        const invoiceNumber = String(invoice.invoice_number)?.toLowerCase() || '';
        const customerName = invoice.customer?.customer_name?.toLowerCase() || '';
        const invoiceDate = invoice.invoice_date?.toLowerCase() || '';
        const invoiceDueDate = invoice.invoice_due_date?.toLowerCase() || '';
        const agentName = invoice.agent?.toLowerCase() || '';
        const status = invoice.payment_status?.toLowerCase() || '';
        const search = searchTerm.toLowerCase();
        
        return invoiceDate.includes(search) || customerName.includes(search) || invoiceDueDate.includes(search) || agentName.includes(search) || invoiceNumber.includes(search) || status.includes(search);
    });

    // ------------------------------------------------------------------------------------
                                // SORTING


    const sortedInvoices = React.useMemo(() => {
        if (!sortConfig.key) return filteredInvoices;

        return [...filteredInvoices].sort((a, b) => {
        const aValue = a[sortConfig.key as keyof typeof a];
        const bValue = b[sortConfig.key as keyof typeof b];

        if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
        if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
        });
    }, [filteredInvoices, sortConfig]);


    // Sort handler
    const handleSort = (key: any) => {
    setSortConfig(current => ({
        key,
        direction: current.key === key && current.direction === 'asc' ? 'desc' : 'asc'
    }));
    };

    // ------------------------------------------------------------------------------------

    // Pagination calculations for Invoice Table
    const totalInvoicePages = Math.ceil(sortedInvoices.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedInvoices = sortedInvoices.slice(startIndex, startIndex + itemsPerPage);

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

    if (isLoadingInvoices) return (
        <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
            <p className="mt-4 text-gray-600">Loading invoices...</p>
        </div>
        </div>
    );

    if (invoicesError) return (
        <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-md text-center">
            <svg width="96" height="96" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-red-500 mb-4">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15v-2h2v2h-2zm0-4V7h2v6h-2z" fill="currentColor"/>
            </svg>
            <h2 className="text-xl font-bold text-gray-800 mb-2">Error Loading Data</h2>
            <p className="text-gray-600">Failed to load invoices. Please try again.</p>
        </div>
        </div>
    );



    // ------------------------------------------------------------------------------------







    return (
            <div className="min-h-screen bg-gray-50">
            {/* Minimal Header */}
            <div className="border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            <span className={spinningStyles.terminalBar.spinner}>⠋</span>
                            <div>
                                <h1 className="text-lg font-semibold text-gray-900">Sales Suite</h1>
                                <p className="text-sm text-gray-500">Invoice Management</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <Link 
                            to="/sales"
                            className="text-sm text-black px-3 py-1 border border-gray-200 rounded-2xl transition-colors duration-200 flex items-center gap-2 hover:bg-purple-50 hover:border-purple-500 hover:shadow-md hover:-translate-y-0.5"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                </svg>
                                Back to Sales Dashboard
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
                    <div className="w-12 h-12 bg-linear-to-br from-blue-50 to-indigo-100 rounded-2xl flex items-center justify-center border border-blue-100">
                        <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                    </div>
                    <div>
                        <h1 className="text-4xl font-light text-gray-900 tracking-tight">Invoices</h1>
                        <p className="text-gray-500 mt-2">Manage and track your invoices</p>
                    </div>
                    </div>
                </div>
                
                <div className="flex items-center gap-3">

                    {(view === 'form' || view === 'details' || view === 'edit') && (
                    <button
                        onClick={handleBackToInvoicesList}
                        className="bg-white border cursor-pointer border-gray-200 hover:border-yellow-300 hover:bg-yellow-50 text-gray-700 px-6 py-3 rounded-xl font-medium transition-all duration-200 flex items-center gap-2 hover:shadow-sm"
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
                        <div className="text-2xl font-light text-gray-900">{invoices.length}</div>
                        <div className="text-sm text-gray-500">Total Invoices</div>
                    </div>

                    <div className="w-px h-8 bg-gray-200"></div>

                    <div className="text-center">
                        <div className="text-2xl font-light text-gray-900">
                        {new Set(invoices.map((c: any) => c.currency).filter(Boolean)).size}
                        </div>
                        <div className="text-sm text-gray-500">Currencies</div>
                    </div>

                    <div className="w-px h-8 bg-gray-200"></div>

                    <div className="text-center">
                        <div className="text-2xl font-light text-gray-900">
                        {invoices.filter((c: InvoiceList) => c.cancelled).length}
                        </div>
                        <div className="text-sm text-gray-500">Cancelled</div>
                    </div>

                    <div className="w-px h-8 bg-gray-200"></div>

                    <div className="text-center">
                        <div className="text-2xl font-light text-red-600!">
                        {invoices.filter((c: InvoiceList) => c.payment_status === 'Unpaid').length}
                        </div>
                        <div className="text-sm text-red-600!">Unpaid</div>
                    </div>

                    <div className="w-px h-8 bg-gray-200"></div>

                    <div className="text-center">
                        <div className="text-2xl font-light text-yellow-600!">
                        {invoices.filter((c: InvoiceList) => c.payment_status === 'Partial').length}
                        </div>
                        <div className="text-sm text-yellow-600!">Partial Paid</div>
                    </div>

                    </div>
                    <div className="flex gap-4">
                        <div className="relative">
                            <input
                            type="text"
                            placeholder="Search Invoices..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10 pr-2 py-1 text-gray-600 border border-gray-200 rounded-xl focus:ring-1 focus:ring-purple-500 focus:border-purple-500 bg-white transition-all duration-200 w-64 focus:shadow-sm"
                            />
                            <div className="absolute cursor-pointer inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                            </div>
                        </div>
                        <button
                            onClick={() => navigateToView('form')}
                            className="bg-white border cursor-pointer border-gray-200 hover:border-purple-500 text-gray-700 px-3 py-1 rounded-xl font-medium transition-all duration-200 flex items-center gap-2 hover:shadow-sm hover:bg-purple-50"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                            New Invoice
                        </button>
                    </div>
                </div>
                )}
            </div>

            {/* Content Area */}
            {view === 'list' && (
                <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
                <InvoiceTable 
                    invoices={paginatedInvoices}
                    onInvoiceClick={handleInvoiceClick}
                    onEditInvoice={handleEditInvoice}
                    onDeleteInvoice={handleDeleteInvoice}
                    sortConfig={sortConfig}
                    onSort={handleSort}
                    currentPage={currentPage}
                    totalPages={totalInvoicePages}
                    totalItems={sortedInvoices.length}
                    itemsPerPage={itemsPerPage}
                    onPageChange={handlePageChange}
                    onItemsPerPageChange={handleItemsPerPageChange}
                />
                </div>
            )}

            {view === 'form' && (
                <div className="w-full bg-gray-50 rounded-2xl shadow-sm border border-gray-200">
                <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-8">
                    <div className="flex items-center gap-4 mb-8 justify-between">
                    <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center border border-blue-100">
                        <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v16m8-8H4" />
                        </svg>
                    </div>
                    <div>
                        <h2 className="text-2xl font-light text-gray-900">Create Invoice</h2>
                        <p className="text-gray-500">Add a new invoice to your records</p>
                    </div>
                    <button 
                        onClick={() => navigateToView('list')}
                        className="bg-black-600 text-blue px-2 py-1 rounded-lg hover:bg-red-800 transition-colors flex items-center gap-1"
                    >
                        <svg className="w-1 h-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}  />
                        </svg>
                        x Cancel
                    </button>
                    </div>
                    <InvoiceForm 
                        onSubmit={handleAddInvoice} 
                        isSubmitting={createInvoiceMutation.isPending} 
                        onCancel={handleBackToInvoicesList}
                        customers={customers}
                        currencies={currencies}
                        agents={agents}
                        projects={projects}
                        productItems={productItems}
                        quotations={quotations}
                        lhdnClassificationCodes={lhdnClassificationCodes}
                    />
                    {createInvoiceMutation.isError && (
                    <div className="mt-6 p-4 bg-red-50 border border-red-100 rounded-xl text-red-700 text-sm">
                        Error creating invoice. Please try again.
                    </div>
                    )}
                </div>
                </div>
            )}

            {view === 'details' && (
                <InvoiceDetails 
                invoice={selectedInvoice}
                isLoading={isLoadingInvoice}
                onBack={handleBackToInvoicesList}
                onEdit={handleEditInvoiceButton}
                einvoiceEnabled={selectedCompany?.einvoice_enabled ?? false}
                onSubmitSuccess={handleEInvoiceSubmitSuccess}
                onCancelSuccess={handleEInvoiceCancelSuccess}
                />
            )}

            {view === 'edit' && selectedInvoice && (
                <InvoiceEdit 
                invoice={selectedInvoice}
                onSubmit={handleUpdateInvoice}
                isSubmitting={updateInvoiceMutation.isPending}
                onCancel={handleBackToInvoiceDetails}
                customers={customers}
                currencies={currencies}
                agents={agents}
                projects={projects}
                productItems={productItems}
                lhdnClassificationCodes={lhdnClassificationCodes}
                />
            )}
            </div>
        </div>
        </div>
    );

};
export default InvoiceManagement;