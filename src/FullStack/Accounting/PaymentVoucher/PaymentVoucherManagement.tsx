import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Link } from 'react-router-dom';


import { fetchPaymentVouchers, fetchPaymentVoucherById, createPaymentVoucher,
    updatePaymentVoucher, deletePaymentVoucher
 } from "../Engines";



import { fetchChartOfAccounts,  } from "../../ChartOfAccounts/Engines";
import { fetchCurrencies, fetchAgents } from "../../Core/Engines"
import { fetchCustomers } from "../../Customers/Engines"


//import PaymentVoucherDetails from "./PaymentVoucherDetails";
//import PaymentVoucherForm from "./PaymentVoucherForm";
import PaymentVoucherTable from "./PaymentVoucherTable";
//import PaymentVoucherEdit from "./PaymentVoucherEdit";





function PaymentVoucherManagement() {
    const queryClient = useQueryClient();
    const [view, setView] = useState('list');
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedPaymentVoucherId, setSelectedPaymentVoucherId] = useState(null);
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

    const { data: paymentVouchers = [], isLoading: isLoadingPaymentVouchers, error: paymentVouchersError} = useQuery({
        queryKey: ['paymentVouchers'],
        queryFn: fetchPaymentVouchers
    });





    // DETAIL QUERIES

    const { data: selectedPaymentVoucher, isLoading: isLoadingPaymentVoucher } = useQuery({
        queryKey: ['paymentVoucher', selectedPaymentVoucherId],
        queryFn: () => fetchPaymentVoucherById(selectedPaymentVoucherId),
        enabled: !!selectedPaymentVoucherId,
    });
    // ------------------------------------------------------------------------------------
                    // MANIPULATIONS


        // CREATIONS - POST

    const createPaymentVoucherMutation = useMutation({
        mutationFn: createPaymentVoucher,
        onSuccess: (data) => {
        queryClient.invalidateQueries({ queryKey: ['paymentVouchers']});
        setSelectedPaymentVoucherId(data.reference_number);
        setView('details');
        },
        onError: (error) => {
        console.error('Error creating payment voucher:', error.response?.data || error.message || error);
        }
    });





        // UPDATES - PUT

    const updatePaymentVoucherMutation = useMutation({
        mutationFn: updatePaymentVoucher,
        onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['paymentVouchers'] });
        queryClient.invalidateQueries({ queryKey: ['paymentVoucher', selectedPaymentVoucherId]});
        setView('details');
        },
        onError: (error) => {
        console.error('Error updating payment voucher:', error.response?.data || error.message);
        }
    });
    // ------------------------------------------------------------------------------------
                // DELETE

    const deletePaymentVoucherMutation = useMutation({
        mutationFn: deletePaymentVoucher,
        onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['paymentVouchers'] });
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





    const handleAddPaymentVoucher = async (paymentVoucherData) => {

      
    };





    const handleUpdatePaymentVoucher = (paymentVoucherData) => {
        updatePaymentVoucherMutation.mutate({
        reference_number: selectedPaymentVoucherId,
        paymentVoucherData: paymentVoucherData
        });
    };





    const handleDeletePaymentVoucher = async (paymentVoucherId) => {
        if (window.confirm('Are you sure you want to delete this voucher?')) {
        deletePaymentVoucherMutation.mutate(paymentVoucherId);
        }
    };
    // ------------------------------------------------------------------------------------


    const handlePaymentVoucherClick = (paymentVoucherId) => {
        setSelectedPaymentVoucherId(paymentVoucherId);
        setView('details')
    };
    // ------------------------------------------------------------------------------------


    const handleEditPaymentVoucher = (paymentVoucherId, paymentVoucherData) => {
        setSelectedPaymentVoucherId(paymentVoucherId);
        setView('edit');
    };
    // ------------------------------------------------------------------------------------

    const handleBackToPaymentVouchersList = () => {
        setView('list');
        setSelectedPaymentVoucherId(null);
    };
    // ------------------------------------------------------------------------------------

    const handleEditPaymentVoucherButton = () => {
        setView('edit');
    };
    // ------------------------------------------------------------------------------------

    const filteredPaymentVouchers = paymentVouchers.filter(paymentVoucher => {
        const voucherNumber = paymentVoucher.reference_number?.toLowerCase() || '';
        const search = searchTerm.toLowerCase();
        
        return voucherNumber.includes(search);
    });

    // ------------------------------------------------------------------------------------
                                // SORTING


    const sortedPaymentVouchers = React.useMemo(() => {
        if (!sortConfig.key) return filteredPaymentVouchers;

        return [...filteredPaymentVouchers].sort((a, b) => {
        const aValue = a[sortConfig.key];
        const bValue = b[sortConfig.key];

        if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
        if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
        });
    }, [filteredPaymentVouchers, sortConfig]);


    // Sort handler
    const handleSort = (key) => {
    setSortConfig(current => ({
        key,
        direction: current.key === key && current.direction === 'asc' ? 'desc' : 'asc'
    }));
    };

    // ------------------------------------------------------------------------------------

    // Pagination calculations for Payment Voucher Table
    const totalPaymentVouchers = Math.ceil(sortedPaymentVouchers.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedPaymentVouchers = sortedPaymentVouchers.slice(startIndex, startIndex + itemsPerPage);

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

    if (isLoadingPaymentVouchers) return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading Payment Vouchers...</p>
        </div>
        </div>
    );

    if (paymentVouchersError) return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-md text-center">
            <svg width="96" height="96" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-red-500 mb-4">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15v-2h2v2h-2zm0-4V7h2v6h-2z" fill="currentColor"/>
            </svg>
            <h2 className="text-xl font-bold text-gray-800 mb-2">Error Loading Data</h2>
            <p className="text-gray-600">Failed to load payment vouchers. Please try again.</p>
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
                            <h1 className="text-lg font-semibold text-gray-900">Accounting Suite</h1>
                            <p className="text-sm text-gray-500">Payment Voucher Management</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <Link 
                        to="/accounting"
                        className="text-sm text-gray-600 hover:text-blue-600 transition-colors duration-200 flex items-center gap-2"
                        >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Back to Accounting Dashboard
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
                        <h1 className="text-4xl font-light text-gray-900 tracking-tight">Payment Vouchers</h1>
                        <p className="text-gray-500 mt-2">Manage and track your payment voucher</p>
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
                        New Payment Voucher
                    </button>
                    )}

                    {(view === 'form' || view === 'details' || view === 'edit') && (
                    <button
                        onClick={handleBackToPaymentVouchersList}
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
                        <div className="text-2xl font-light text-gray-900">{paymentVouchers.length}</div>
                        <div className="text-sm text-gray-500">Total Payment Voucher</div>
                    </div>
                    <div className="w-px h-8 bg-gray-200"></div>
                    <div className="text-center">
                        <div className="text-2xl font-light text-gray-900">
                        {new Set(paymentVouchers.map(c => c.currency?.currency_code)).size}
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
                <PaymentVoucherTable 
                    paymentVouchers={paginatedPaymentVouchers}
                    onPaymentVoucherClick={handlePaymentVoucherClick}
                    onEditPaymentVoucher={handleEditPaymentVoucher}
                    onDeletePaymentVoucher={handleDeletePaymentVoucher}
                    sortConfig={sortConfig}
                    onSort={handleSort}
                    currentPage={currentPage}
                    totalPaymentVouchers={totalPaymentVouchers}
                    totalItems={sortedPaymentVouchers.length}
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
                        <h2 className="text-2xl font-light text-gray-900">Create Payment Voucher</h2>
                        <p className="text-gray-500">Add a new payment voucher to your records</p>
                    </div>
                    </div>
                    <PaymentVoucherForm 
                    onSubmit={handleAddPaymentVoucher} 
                    isSubmitting={createPaymentVoucherMutation.isLoading} 
                    onCancel={handleBackToPaymentVouchersList}
                    customers={customers}
                    currencies={currencies}
                    accounts={accounts}
                    agents={agents}
                    />
                    {createPaymentVoucherMutation.isError && (
                    <div className="mt-6 p-4 bg-red-50 border border-red-100 rounded-xl text-red-700 text-sm">
                        Error creating payment voucher. Please try again.
                    </div>
                    )}
                </div>
                </div>
            )}

            {view === 'details' && (
                <PaymentVoucherDetails 
                paymentVoucher={selectedPaymentVoucher}
                isLoading={isLoadingPaymentVoucher}
                onBack={handleBackToPaymentVouchersList}
                onEdit={handleEditPaymentVoucherButton}
                />
            )}

            {view === 'edit' && selectedPaymentVoucher && (
                <PaymentVoucherEdit 
                paymentVoucher={selectedPaymentVoucher}
                onSubmit={handleUpdatePaymentVoucher}
                isSubmitting={updatePaymentVoucherMutation.isLoading}
                onBack={handleBackToPaymentVouchersList}
                onCancel={handleBackToPaymentVouchersList}
                />
            )}
            </div>
        </div>
        </div>
    );

};
export default PaymentVoucherManagement;