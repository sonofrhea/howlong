import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Link } from 'react-router-dom';


import { fetchQuotations, fetchQuotationById, createQuotation,
    updateQuotation, deleteQuotation, sendQuotation
 } from "../Engines";

import { fetchChartOfAccounts } from "../../ChartOfAccounts/Engines"
import { fetchCurrencies, fetchAgents } from "../../Core/Engines"
import { fetchCustomers } from "../../Customers/Engines";



import QuotationDetails from "./QuotationDetails";
import QuotationForm from "./QuotationForm";
import QuotationTable from "./QuotationTable";
import QuotationEdit from "./QuotationEdit";


import { QuotationInputs, QuotationCreateResponse, 
    EditQuotationInputs } from "../Constants/Types";


import { fetchProductItems } from "../../Products/Engines";
import { spinningStyles } from "../Constants/Styles";
import { toast } from "react-hot-toast";


interface SortConfig {
  key: string | null;
  direction: 'asc' | 'desc';
}





























function QuotationManagement() {
    const queryClient = useQueryClient();
    const [view, setView] = useState('list');
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedQuotationId, setSelectedQuotationId] = useState<number | null>(null);
    // ------------------------------------------------------------------------------------
    const [sortConfig, setSortConfig] = useState<SortConfig>({ key: null, direction: 'asc' });
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

    const { data: agents = [] } = useQuery({
        queryKey: ['agents'],
        queryFn: fetchAgents
    });


    const { data: productItems = [] } = useQuery({
        queryKey: ['productItems'],
        queryFn: fetchProductItems
    });

    // ------------------------------------------------------------------------------------

                        // QUERIES

    // LIST QUERIES

    const { data: quotations = [], isLoading: isLoadingQuotations, error: quotationsError} = useQuery({
        queryKey: ['quotations'],
        queryFn: fetchQuotations
    });





    // DETAIL QUERIES

    const { data: selectedQuotation, isLoading: isLoadingQuotation } = useQuery({
        queryKey: ['quotation', selectedQuotationId],
        queryFn: () => fetchQuotationById(selectedQuotationId!),
        enabled: !!selectedQuotationId,
    });
    // ------------------------------------------------------------------------------------
                    // MANIPULATIONS


        // CREATIONS - POST

    const createQuotationMutation = useMutation({
        mutationFn: createQuotation,
        onMutate: () => {
            toast.loading('Creating Quotation...', { id: "Create quotation" });
        },
        onSuccess: (data: QuotationCreateResponse) => {
            const newQuotationId = data.quotation_number;
            queryClient.invalidateQueries({ queryKey: ['quotations']});
            setSelectedQuotationId(newQuotationId);
            toast.success('Quotation successfully created', { id: "Create quotation" });
            setView('details');
        },
        onError: (error: any) => {
            toast.error('Failed to create quotation', { id: "Create quotation" });
            console.error('Error creating quotation:', error.response?.data || error.message || error);
        }
    });





        // UPDATES - PUT

    const updateQuotationMutation = useMutation({
        mutationFn: updateQuotation,
        onMutate: () => {
            toast.loading('Updating Quotation...', { id: "Update quotation" });
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['quotations'] });
            queryClient.invalidateQueries({ queryKey: ['quotation', selectedQuotationId]});
            toast.success('Quotation successfully updated', { id: "Update quotation" });
            setView('details');
        },
        onError: (error: any) => {
            toast.error('Failed to update quotation', { id: "Update quotation" });
            console.error('Error updating quotation:', error.response?.data || error.message);
        }
    });
    // ------------------------------------------------------------------------------------
                // DELETE

    const deleteQuotationMutation = useMutation({
        mutationFn: deleteQuotation,
        onMutate: () => {
            toast.loading('Deleting Quotation...', { id: "Delete quotation" });
        },
        onSuccess: () => {
            console.log("Delete successful, invalidating queries");
            queryClient.invalidateQueries({ queryKey: ['quotations'] });
            toast.success('Quotation successfully deleted', { id: "Delete quotation" });
        },
        onError: (error: any) => {
            toast.error('Failed to delete quotation', { id: "Delete quotation" });
            console.error('Error updating quotation:', error.response?.data || error.message);
        }
    });

    // ------------------------------------------------------------------------------------
                    // MUTATION USE

    //const toFormData = (obj, form = new FormData(), parentKey = '') => {
    //    Object.keys(obj).forEach(key => {
    //    const value = obj[key];
    //    const field = parentKey ? `${parentKey}.${key}` : key;
    //    if (value === null || value === undefined) return;
    //    if (Array.isArray(value)) {
    //        value.forEach((v, i) => toFormData(v, form, `${field}[${i}]`));
    //    } else if (value instanceof File) {
    //        form.append(field, value);
    //    } else if (typeof value === 'object') {
    //        toFormData(value, form, field);
    //    } else {
    //        form.append(field, value);
    //    }
    //    });
    //    return form;
    //};





    const handleAddQuotation = async (quotationData: QuotationInputs) => {

        const cleanedData = {
            ...quotationData,
            related_quotation:
                quotationData.related_quotation &&
                quotationData.related_quotation?.length > 0
                    ? quotationData.related_quotation
                    : undefined
        };

        
        //console.log("🎯 RAW FORM DATA:", cleanedData);

        await createQuotationMutation.mutateAsync(cleanedData); 
    };

        

       // const hasFile = (obj) => {
      //   if (!obj || typeof obj !== 'object') return false;
      //   if (obj instanceof File) return true;
      //   return Object.values(obj).some(v => hasFile(v));
      //   };

       //  if (hasFile(quotations)) {
       //  const fd = toFormData(quotations);
       //  for (const pair of fd.entries()) {
       //      console.log('FormData entry:', pair[0], pair[1]);
       //  }
       //  createQuotationMutation.mutate(fd);
       //  } else {
       //  createQuotationMutation.mutate(quotations);
       //  }
     //};



// ------------------------------------------------------------------------------------

    const handleUpdateQuotation = async (quotationData: QuotationInputs) => {

        const cleanedData = {
            ...quotationData,
            related_quotation:
                quotationData.related_quotation &&
                quotationData.related_quotation?.length > 0
                    ? quotationData.related_quotation
                    : undefined
        };
        
        await updateQuotationMutation.mutateAsync({
                quotation_number: selectedQuotationId!,
                quotationData: cleanedData
            });
    };



// ------------------------------------------------------------------------------------

    const handleDeleteQuotation = async (quotationId: number) => {
        if (!window.confirm('Are you sure you want to delete this customer?')) return;
        
        await deleteQuotationMutation.mutateAsync(quotationId);
    };
    // ------------------------------------------------------------------------------------


    const handleQuotationClick = (quotationId: number) => {
        setSelectedQuotationId(quotationId);
        setView('details')
    };
    // ------------------------------------------------------------------------------------


    const handleEditQuotation = (quotationId: number) => {
        setSelectedQuotationId(quotationId);
        setView('edit');
    };
    // ------------------------------------------------------------------------------------

    const handleBackToQuotationsList = () => {
        setView('list');
        setSelectedQuotationId(null);
    };
    // ------------------------------------------------------------------------------------

    const handleEditQuotationButton = () => {
        if (!selectedQuotationId === null) return;
        setView('edit');
    };

    // ------------------------------------------------------------------------------------


    const handleBackToQuotationDetails = (quotationId: number) => {
        setSelectedQuotationId(quotationId);
        setView('details')
    };


    // ------------------------------------------------------------------------------------


    const handleSendQuotation = async () => {

        if (!selectedQuotation) return;

        const toastId = toast.loading('Sending Quotation...');
        try {
            await sendQuotation(selectedQuotation.quotation_number);
            toast.success('Quotation successfully sent.', { id: "Create quotation" });
        } catch (error) {
            toast.error('Failed to send quotation', { id: "Create quotation" });
            console.error(error);
        }
    }
    // ------------------------------------------------------------------------------------

    const filteredQuotations = quotations.filter((quotation: any) => {
        const quotationNumber = String(quotation.quotation_number)?.toLowerCase() || '';
        const customerName = quotation.customer?.customer_name?.toLowerCase() || '';
        const agentName = quotation.agent?.username?.toLowerCase() || '';
        const search = searchTerm.toLowerCase();
        
        return customerName.includes(search) || agentName.includes(search) || quotationNumber.includes(search);
    });

    // ------------------------------------------------------------------------------------
                                // SORTING


    const sortedQuotations = React.useMemo(() => {
        if (!sortConfig.key) return filteredQuotations;

        return [...filteredQuotations].sort((a, b) => {
        const aValue = a[sortConfig.key as keyof typeof a];
        const bValue = b[sortConfig.key as keyof typeof b];

        if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
        if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
        });
    }, [filteredQuotations, sortConfig]);


    // Sort handler
    const handleSort = (key: any) => {
    setSortConfig(current => ({
        key,
        direction: current.key === key && current.direction === 'asc' ? 'desc' : 'asc'
    }));
    };

    // ------------------------------------------------------------------------------------

    // Pagination calculations for Quotation Table
    const totalQuotationPages = Math.ceil(sortedQuotations.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedQuotations = sortedQuotations.slice(startIndex, startIndex + itemsPerPage);

    // Page change handler
    const handlePageChange = (page: number) => {
    setCurrentPage(page);
    };

    // Items per page handler
    const handleItemsPerPageChange = (value: string) => {
    setItemsPerPage(Number(value));
    setCurrentPage(1); // Reset to first page
    };



    // ------------------------------------------------------------------------------------


    // ERROR DISPLAYS

    if (isLoadingQuotations) return (
        <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
            <span className={spinningStyles.terminalBar.spinner}>⌘</span>
            <p className="mt-4 text-gray-600">fetching quotations...</p>
        </div>
        </div>
    );

    if (quotationsError) return (
        <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-md text-center">
            <svg width="96" height="96" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-red-500 mb-4">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15v-2h2v2h-2zm0-4V7h2v6h-2z" fill="currentColor"/>
            </svg>
            <h2 className="text-xl font-bold text-gray-800 mb-2">Error Loading Data</h2>
            <p className="text-gray-600">Failed to load quotations. Please try again.</p>
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
                        <span className={spinningStyles.terminalBar.spinner}>⠋</span>
                        <div>
                            <h1 className="text-lg font-semibold text-gray-900">Sales Suite</h1>
                            <p className="text-sm text-gray-500">Quotation Management</p>
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
                        <h1 className="text-4xl font-light text-gray-900 tracking-tight">Quotations</h1>
                        <p className="text-gray-500 mt-2">Manage and track your quotations</p>
                    </div>
                    </div>
                </div>
                
                <div className="flex items-center gap-3">

                    {(view === 'form' || view === 'details' || view === 'edit') && (
                    <button
                        onClick={handleBackToQuotationsList}
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
                            <div className="text-2xl font-light text-gray-900">{quotations.length}</div>
                            <div className="text-sm text-gray-500">Total Quotations</div>
                        </div>
                        <div className="w-px h-8 bg-gray-200"></div>
                        <div className="text-center">
                            <div className="text-2xl font-light text-gray-900">
                            {new Set(quotations.map((c: any) => c.cancelled).filter(Boolean)).size}
                            </div>
                            <div className="text-sm text-gray-500">Cancelled</div>
                        </div>
                        <div className="w-px h-8 bg-gray-200"></div>
                    </div>
                    <div className="flex gap-4">
                        <div className="relative">
                            <input
                            type="text"
                            placeholder="Search quotations..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10 pr-2 py-1 border border-gray-200 rounded-xl focus:ring-1 focus:ring-purple-500 focus:border-purple-500 bg-white  transition-all duration-200 w-64 focus:shadow-sm"
                            />
                            <div className="absolute cursor-pointer inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                            </div>
                        </div>
                        <button
                            onClick={() => setView('form')}
                            className="bg-white border border-gray-200 hover:border-purple-500 text-gray-700 px-3 py-1 rounded-xl font-medium transition-all cursor-pointer duration-200 flex items-center gap-2 hover:shadow-sm hover:bg-purple-50"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                            New Quotation
                        </button>
                    </div>
                </div>
                )}
            </div>

            {/* Content Area */}
            {view === 'list' && (
                <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
                <QuotationTable 
                    quotations={paginatedQuotations}
                    onQuotationClick={handleQuotationClick}
                    onEditQuotation={handleEditQuotation}
                    onDeleteQuotation={handleDeleteQuotation}
                    sortConfig={sortConfig}
                    onSort={handleSort}
                    currentPage={currentPage}
                    totalPages={totalQuotationPages}
                    totalItems={sortedQuotations.length}
                    itemsPerPage={itemsPerPage}
                    onPageChange={handlePageChange}
                    onItemsPerPageChange={handleItemsPerPageChange}
                />
                </div>
            )}

            {view === 'form' && (
                <div className="w-full bg-gray-50 rounded-2xl shadow-sm border border-gray-200">
                <div className="bg-white border border-green-100 rounded-2xl shadow-sm p-8">
                    <div className="flex items-center gap-4 mb-8 justify-between">
                    <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center border border-blue-100">
                        <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v16m8-8H4" />
                        </svg>
                    </div>
                    <div>
                        <h2 className="text-2xl font-light text-gray-900">Create Quotation</h2>
                        <p className="text-gray-500">Add a new quotation to your records</p>
                    </div>
                    <button 
                        onClick={() => setView('list')}
                        className="bg-black-600 cursor-pointer text-blue px-2 py-1 rounded-lg hover:bg-red-800 transition-colors flex items-center gap-1"
                    >
                        <svg className="w-1 h-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}  />
                        </svg>
                        x Cancel
                    </button>
                    </div>
                    <QuotationForm 
                    onSubmit={handleAddQuotation} 
                    isSubmitting={createQuotationMutation.isPending}
                    onCancel={handleBackToQuotationsList}
                    customers={customers}
                    currencies={currencies}
                    agents={agents}
                    productItems={productItems}
                    />
                    {createQuotationMutation.isError && (
                    <div className="mt-6 p-4 bg-red-50 border border-red-100 rounded-xl text-red-700 text-sm">
                        Error creating quotation. Please try again.
                    </div>
                    )}
                </div>
                </div>
            )}

            {view === 'details' && (
                <QuotationDetails 
                quotation={selectedQuotation}
                isLoading={isLoadingQuotation}
                onSendQuotation={handleSendQuotation}
                onBack={handleBackToQuotationsList}
                onEdit={handleEditQuotationButton}
                />
            )}

            {view === 'edit' && selectedQuotation && (
                <QuotationEdit 
                quotation={selectedQuotation}
                onSubmit={handleUpdateQuotation}
                isSubmitting={updateQuotationMutation.isPending}
                onCancel={handleBackToQuotationDetails}
                customers={customers}
                currencies={currencies}
                agents={agents}
                productItems={productItems}
                onSendQuotation={handleSendQuotation}
                />
            )}
            </div>
        </div>
        </div>
    );

};
export default QuotationManagement;