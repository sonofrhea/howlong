import React, { useState } from "react";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import { Link } from 'react-router-dom';


import { fetchSupplierPayments, fetchSupplierPaymentById, 
    createSupplierPayment,
    updateSupplierPayment, deleteSupplierPayment
 } from "../Engines";
 

import { fetchCurrencies, fetchAgents } from "../../Core/Engines";

import { fetchChartOfAccounts } from "../../ChartOfAccounts/Engines";

import { EditSupplierPayment
    , SupplierPaymentInputs, SupplierPaymentResponse } from "../constants/Types";
 
import { fetchSupplierInvoices, fetchSupplierProfiles } from "../Engines";


import { management, spinningStyles } from "../constants/Styles";
import { TriangleAlert, HandCoins,
    Plus
 } from "lucide-react";









import SupplierPaymentDetails from "./SupplierPaymentDetails";
import SupplierPaymentForm from "./SupplierPaymentForm";
import SupplierPaymentTable from "./SupplierPaymentTable";
import SupplierPaymentEdit from "./SupplierPaymentEdit";
import { toast } from "react-hot-toast";
import { createJournalEntry } from "../../Accounting/Engines";


interface SortConfig {
  key: string | null;
  direction: 'asc' | 'desc';
}





function SupplierPaymentManagement() {
    const queryClient = useQueryClient();
    const [view, setView] = useState('list');
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedSupplierPaymentId, setSelectedSupplierPaymentId] = useState<number | null>(null);
    // ------------------------------------------------------------------------------------
    const [sortConfig, setSortConfig] = useState<SortConfig>({ key: null, direction: 'asc' });
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    // ------------------------------------------------------------------------------------
    const [isJournalEntryOpen, setIsJournalEntryOpen] = useState(false);
    // ------------------------------------------------------------------------------------


                // DEPENDENCIES

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

    const { data: supplierInvoices = [] } = useQuery({
        queryKey: ['supplierInvoices'],
        queryFn: fetchSupplierInvoices
    });

    const { data: supplierProfiles = [] } = useQuery({
        queryKey: ['supplierProfiles'],
        queryFn: fetchSupplierProfiles
    });


    // ------------------------------------------------------------------------------------

                        // QUERIES

    // LIST QUERIES

    const { data: supplierPayments = [], isLoading: isLoadingSupplierPayments, error: supplierPaymentsError} = useQuery({
        queryKey: ['supplierPayments'],
        queryFn: fetchSupplierPayments
    });
    console.log(supplierPayments);





    // DETAIL QUERIES

    const { data: selectedSupplierPayment, isLoading: isLoadingSupplierPayment } = useQuery({
        queryKey: ['supplierPayment', selectedSupplierPaymentId],
        queryFn: () => fetchSupplierPaymentById(selectedSupplierPaymentId!),
        enabled: !!selectedSupplierPaymentId,
    });
    // ------------------------------------------------------------------------------------
                    // MANIPULATIONS


        // CREATIONS - POST

    const createSupplierPaymentMutation = useMutation({
        mutationFn: createSupplierPayment,
        onSuccess: (data: SupplierPaymentResponse) => {
            const newSupplierPayment = data.payment_code
            queryClient.invalidateQueries({ queryKey: ['supplierPayments']});
            setSelectedSupplierPaymentId(newSupplierPayment);
            setView('details');
        },
        onError: (error: any) => {
        console.error('Error creating supplier payment:', error.response?.data || error.message || error);
        }
    });





        // UPDATES - PUT

    const updateSupplierPaymentMutation = useMutation({
        mutationFn: updateSupplierPayment,
        onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['supplierPayments'] });
        queryClient.invalidateQueries({ queryKey: ['supplierPayment', selectedSupplierPaymentId]});
        setView('details');
        },
        onError: (error: any) => {
        console.error('Error updating supplier payment:', error.response?.data || error.message);
        }
    });
    // ------------------------------------------------------------------------------------
                // DELETE

    const deleteSupplierPaymentMutation = useMutation({
        mutationFn: deleteSupplierPayment,
        onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['supplierPayments'] });
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





    const handleAddSupplierPayment = async (supplierPaymentData: SupplierPaymentInputs) => {
        if (!supplierPaymentData.account_code?.account_code) {
            delete supplierPaymentData.account_code;
        }
        if (supplierPaymentData.related_payment) {
            supplierPaymentData.related_payment = supplierPaymentData.related_payment?.filter(
                item => item.payment_date
            );
            if (supplierPaymentData.related_payment?.length === 0) {
                delete supplierPaymentData.related_payment;
            }
            }
        //console.log("🎯 RAW FORM DATA:", supplierPaymentData);

        const toastId = toast.loading('Creating Supplier Payment...');
        try {
            await createSupplierPaymentMutation.mutateAsync(supplierPaymentData);
            toast.success('Supplier Payment created successfully!', { id: toastId });
        } catch (error) {
            toast.error('Failed to create Supplier Payment', { id: toastId });
            console.error(error);
        }
    };





    const handleUpdateSupplierPayment = (supplierPaymentData: SupplierPaymentInputs) => {
        updateSupplierPaymentMutation.mutate({
        payment_code: selectedSupplierPaymentId!,
        supplierPaymentData: supplierPaymentData
        });
    };





    const handleDeleteSupplierPayment = async (supplierPaymentId: number) => {
        if (window.confirm('Are you sure you want to delete this supplier payment?')) {
        deleteSupplierPaymentMutation.mutate(supplierPaymentId);
        }
    };
    // ------------------------------------------------------------------------------------


    const handleSupplierPaymentClick = (supplierPaymentId: number) => {
        setSelectedSupplierPaymentId(supplierPaymentId);
        setView('details')
    };
    // ------------------------------------------------------------------------------------


    const handleEditSupplierPayment = (supplierPaymentId: number) => {
        setSelectedSupplierPaymentId(supplierPaymentId);
        setView('edit');
    };

    // ------------------------------------------------------------------------------------

    const handleBackToSupplierPaymentsList = () => {
        setView('list');
        setSelectedSupplierPaymentId(null);
    };
    // ------------------------------------------------------------------------------------

    const handleEditSupplierPaymentButton = () => {
        if (!selectedSupplierPaymentId === null) return;
        setView('edit');
    };
    // ------------------------------------------------------------------------------------

    const filteredSupplierPayments = supplierPayments.filter((supplierPayment: any) => {
        const paymentNumber = String(supplierPayment.payment_code)?.toLowerCase() || '';
        const supplierName = supplierPayment.supplier?.supplier_name?.toLowerCase() || '';
        const agentName = supplierPayment.agent?.username?.toLowerCase() || '';
        const search = searchTerm.toLowerCase();
        
        return paymentNumber.includes(search) || agentName.includes(search) || supplierName.includes(search);
    });

    // ------------------------------------------------------------------------------------

            // JOURNAL ENTRY


    const createJournalEntryMutation = useMutation({
        mutationFn: createJournalEntry,
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ['journalEntries']});

            toast.success(`Journal Entry #${data.journal_number} created successfully!`);
            setIsJournalEntryOpen(false);
        },
        onError: (error: any) => {
          toast.error('Failed to create Journal Entry.');
          console.error('Error creating journal entry:', error.response?.data || error.message || error);
        }
    });

  // ------------------------------------------------------------------------------------

                                // SORTING


    const sortedSupplierPayments = React.useMemo(() => {
        if (!sortConfig.key) return filteredSupplierPayments;

        return [...filteredSupplierPayments].sort((a, b) => {
        const aValue = a[sortConfig.key as keyof typeof a];
        const bValue = b[sortConfig.key as keyof typeof b];

        if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
        if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
        });
    }, [filteredSupplierPayments, sortConfig]);


    // Sort handler
    const handleSort = (key: any) => {
    setSortConfig(current => ({
        key,
        direction: current.key === key && current.direction === 'asc' ? 'desc' : 'asc'
    }));
    };

    // ------------------------------------------------------------------------------------

    // Pagination calculations for Supplier Payment Table
    const totalSupplierPaymentPages = Math.ceil(sortedSupplierPayments.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedSupplierPayments = sortedSupplierPayments.slice(startIndex, startIndex + itemsPerPage);

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

    if (isLoadingSupplierPayments) return (
            <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
            <div className="text-center">
               <span className={spinningStyles.terminalBar.spinner}>↺</span> 
                <p className="mt-4 text-gray-600">fetching payments...</p>
            </div>
            </div>
    );

    if (supplierPaymentsError) return (
        <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-md text-center">
            <TriangleAlert />
            <h2 className="text-xl font-bold text-gray-800 mb-2">Error Loading Data</h2>
            <p className="text-gray-600">Failed to load supplier payments. Please try again.</p>
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
                            <h2 className="text-m font-semibold text-gray-900">Suppliers Suite</h2>
                            <p className="text-xs text-gray-500">Supplier Payment Management</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <Link 
                        to="/suppliers"
                        className="text-sm text-black px-3 py-1 border border-gray-200 rounded-2xl transition-colors duration-200 flex items-center gap-2 hover:bg-purple-50 hover:border-purple-500 hover:shadow-md hover:-translate-y-0.5"
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
                    <div className="w-12 h-12 bg-linear-to-br from-blue-50 to-indigo-100 rounded-2xl flex items-center justify-center border border-blue-100">
                        𑿠
                    </div>
                    <div>
                        <h2 className="text-3xl font-light text-gray-900 tracking-tight">Supplier Payments</h2>
                        <p className="text-gray-500 mt-2">Manage and track your supplier payments</p>
                    </div>
                    </div>
                </div>
                
                <div className="flex items-center gap-3">
                    {(view === 'form' || view === 'details' || view === 'edit') && (
                    <button
                        onClick={handleBackToSupplierPaymentsList}
                        className="bg-white border border-gray-200 hover:border-yellow-300 text-gray-700 px-6 py-3 rounded-xl font-medium transition-all duration-200 flex items-center gap-2 hover:shadow-sm"
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
                        <div className="text-2xl font-light text-gray-900">{supplierPayments.length}</div>
                        <div className="text-sm text-gray-500">Total Supplier Payments</div>
                    </div>
                    <div className="w-px h-8 bg-gray-200"></div>
                    <div className="text-center">
                        <div className="text-2xl font-light text-gray-900">
                        {new Set(supplierPayments.map((c: any) => c.currency?.currency_code)).size}
                        </div>
                        <div className="text-sm text-gray-500">Currencies</div>
                    </div>
                    </div>
                    <div className="flex gap-4">
                        <div className="relative">
                            <input
                            type="text"
                            placeholder="Search payments..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10 pr-2 py-1 text-gray-600 border border-gray-200 rounded-xl focus:ring-1 focus:ring-purple-500 focus:border-purple-500 bg-white transition-all duration-200 w-64 focus:shadow-sm"
                            />
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                            </div>
                        </div>
                        <button
                            onClick={() => setView('form')}
                            className="bg-white border cursor-pointer border-gray-200 hover:border-purple-500 text-gray-700 px-3 py-1 rounded-xl font-medium transition-all duration-200 flex items-center gap-2 hover:shadow-sm hover:bg-purple-50"
                        >
                           ++ New Supplier Payment
                        </button>
                    </div>
                </div>
                )}
            </div>

            {/* Content Area */}
            {view === 'list' && (
                <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
                <SupplierPaymentTable 
                    supplierPayments={paginatedSupplierPayments}
                    onSupplierPaymentClick={handleSupplierPaymentClick}
                    onEditSupplierPayment={handleEditSupplierPayment}
                    onDeleteSupplierPayment={handleDeleteSupplierPayment}
                    sortConfig={sortConfig}
                    onSort={handleSort}
                    currentPage={currentPage}
                    totalSupplierPaymentPages={totalSupplierPaymentPages}
                    totalItems={sortedSupplierPayments.length}
                    itemsPerPage={itemsPerPage}
                    onPageChange={handlePageChange}
                    onItemsPerPageChange={handleItemsPerPageChange}
                />
                </div>
            )}

            {view === 'form' && (
                <div className="min-w-full bg-gray-50 rounded-2xl shadow-sm border border-gray-200">
                <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-8">
                    <div className="flex items-center gap-4 mb-8 justify-between">
                    <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center border border-blue-100">
                        <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v16m8-8H4" />
                        </svg>
                    </div>
                    <div>
                        <h2 className="text-2xl font-light text-gray-900">Create Supplier Payment</h2>
                        <p className="text-gray-500">Add a new supplier payment to your records</p>
                    </div>
                    <button 
                        onClick={() => setView('list')}
                        className="bg-black-600 text-blue px-2 py-1 rounded-lg hover:bg-red-800 transition-colors flex items-center gap-1"
                    >
                        <svg className="w-1 h-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}  />
                        </svg>
                        x Cancel
                    </button>
                    </div>
                    <SupplierPaymentForm 
                    onSubmit={handleAddSupplierPayment} 
                    isSubmitting={createSupplierPaymentMutation.isPending} 
                    onCancel={handleBackToSupplierPaymentsList}
                    currencies={currencies}
                    accounts={accounts}
                    agents={agents}
                    supplierInvoices={supplierInvoices}
                    supplierProfiles={supplierProfiles}
                    />
                    {createSupplierPaymentMutation.isError && (
                    <div className="mt-6 p-4 bg-red-50 border border-red-100 rounded-xl text-red-700 text-sm">
                        Error creating supplier payment. Please try again.
                    </div>
                    )}
                </div>
                </div>
            )}

            {view === 'details' && (
                <SupplierPaymentDetails 
                supplierPayment={selectedSupplierPayment}
                isLoading={isLoadingSupplierPayment}
                onBack={handleBackToSupplierPaymentsList}
                onEdit={handleEditSupplierPaymentButton}
                accounts={accounts}
                onCreateJournalEntry={(data) => createJournalEntryMutation.mutate(data)}
                isCreatingJournalEntry={createJournalEntryMutation.isPending}
                />
            )}

            {view === 'edit' && selectedSupplierPayment && (
                <SupplierPaymentEdit 
                supplierPayment={selectedSupplierPayment}
                onSubmit={handleUpdateSupplierPayment}
                isSubmitting={updateSupplierPaymentMutation.isPending}
                onCancel={handleBackToSupplierPaymentsList}
                currencies={currencies}
                accounts={accounts}
                agents={agents}
                supplierInvoices={supplierInvoices}
                supplierProfiles={supplierProfiles}
                onCreateJournalEntry={(data) => createJournalEntryMutation.mutate(data)}
                isCreatingJournalEntry={createJournalEntryMutation.isPending}
                />
            )}
            </div>
        </div>
        </div>
    );

};
export default SupplierPaymentManagement;
