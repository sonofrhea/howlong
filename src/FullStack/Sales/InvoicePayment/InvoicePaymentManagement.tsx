import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Link } from 'react-router-dom';



import { fetchInvoicePayments, fetchInvoicePaymentById, createInvoicePayment,
    fetchInvoices, updateInvoicePayment, deleteInvoicePayment
 } from "../Engines";

import { fetchChartOfAccounts } from "../../ChartOfAccounts/Engines"
import { fetchCurrencies, fetchAgents } from "../../Core/Engines"
import { fetchCustomers } from "../../Customers/Engines";



import { InvoicePaymentInputs,
  EditInvoicePaymentInputs,
  InvoicePaymentResponse
 } from "../Constants/Types";





import InvoicePaymentDetails from "./InvoicePaymentDetails";
import InvoicePaymentForm from "./InvoicePaymentForm";
import InvoicePaymentTable from "./InvoicePaymentTable";
import { spinningStyles } from "../Constants/Styles";
import InvoicePaymentEdit from "./InvoicePaymentEdit";
import { toast } from "react-hot-toast";
import { createJournalEntry } from "../../Accounting/Engines";




interface SortConfig {
  key: string | null;
  direction: 'asc' | 'desc';
}























function InvoicePaymentManagement() {
  const queryClient = useQueryClient();
  const [view, setView] = useState('list');
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedInvoicePaymentId, setSelectedInvoicePaymentId] = useState<number | null>(null);
// ------------------------------------------------------------------------------------
  const [sortConfig, setSortConfig] = useState<SortConfig>({ key: null, direction: 'asc' });
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
// ------------------------------------------------------------------------------------
  const [isJournalEntryOpen, setIsJournalEntryOpen] = useState(false);
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

  const { data: invoices = [] } = useQuery({
    queryKey: ['invoices'],
    queryFn: fetchInvoices
  });



// ------------------------------------------------------------------------------------

                    // QUERIES

// LIST QUERIES

  const { data: invoicePayment = [], isLoading: isLoadingInvoicePayments, error: invoicePaymentsError} = useQuery({
    queryKey: ['invoicePayment'],
    queryFn: fetchInvoicePayments
  });





// DETAIL QUERIES

  const { data: selectedInvoicePayment, isLoading: isLoadingInvoicePayment } = useQuery({
    queryKey: ['invoicePayment', selectedInvoicePaymentId],
    queryFn: () => fetchInvoicePaymentById(selectedInvoicePaymentId!),
    enabled: !!selectedInvoicePaymentId,
  });
// ------------------------------------------------------------------------------------
                  // MANIPULATIONS


      // CREATIONS - POST

  const createInvoicePaymentMutation = useMutation({
    mutationFn: createInvoicePayment,
    onSuccess: (data: InvoicePaymentResponse) => {
      queryClient.invalidateQueries({ queryKey: ['invoicePayment']});
      setSelectedInvoicePaymentId(data.invoice_payment_code);
      setView('details');
    },
    onError: (error: any) => {
      console.error('Error creating invoice payment:', error.response?.data || error.message || error);
    }
  });





    // UPDATES - PUT

  const updateInvoicePaymentMutation = useMutation({
    mutationFn: updateInvoicePayment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['invoicePayment'] });
      queryClient.invalidateQueries({ queryKey: ['invoicePayment', selectedInvoicePaymentId]});
      setView('details');
    },
    onError: (error: any) => {
      console.error('Error updating invoice payment:', error.response?.data || error.message);
    }
  });
// ------------------------------------------------------------------------------------
              // DELETE

  const deleteInvoicePaymentMutation = useMutation({
    mutationFn: deleteInvoicePayment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['invoicePayment'] });
    }
  });

// ------------------------------------------------------------------------------------
                // MUTATION USE
  
  //const toFormData = (obj, form = new FormData(), parentKey = '') => {
  //  Object.keys(obj).forEach(key => {
  //    const value = obj[key];
  //    const field = parentKey ? `${parentKey}.${key}` : key;
  //    if (value === null || value === undefined) return;
  //    if (Array.isArray(value)) {
  //      value.forEach((v, i) => toFormData(v, form, `${field}[${i}]`));
  //    } else if (value instanceof File) {
  //      form.append(field, value);
  //    } else if (typeof value === 'object') {
  //      toFormData(value, form, field);
  //    } else {
  //      form.append(field, value);
  //    }
  //  });
  //  return form;
  //};





  const handleAddInvoicePayment = async (invoicePaymentData: InvoicePaymentInputs) => {
    if (!invoicePaymentData.account_received_in?.account_code) {
      delete invoicePaymentData.account_received_in;
    }
    if (invoicePaymentData.related_invoice_payment) {
      invoicePaymentData.related_invoice_payment = invoicePaymentData.related_invoice_payment?.filter(item =>
        item.payment_date
      );
      if (invoicePaymentData.related_invoice_payment?.length === 0) {
        delete invoicePaymentData.related_invoice_payment;
    }
    }
    //console.log("RAW FORM DATA:", invoicePaymentData);

    const toastId = toast.loading('Creating Invoice Payment...');
    try {
      await createInvoicePaymentMutation.mutateAsync(invoicePaymentData);
      toast.success('Invoice Payment Successful!', { id: toastId });
    } catch (error) {
        toast.error('Failed to Invoice Payment', { id: toastId });
        console.error(error);
    }
    
  };





  const handleUpdateInvoicePayment = (invoicePaymentData: InvoicePaymentInputs) => {
    updateInvoicePaymentMutation.mutate({
      invoice_payment_code: selectedInvoicePaymentId!,
      invoicePaymentData: invoicePaymentData
    });
  };





  const handleDeleteInvoicePayment = async (invoicePaymentId: number) => {
    if (window.confirm('Are you sure you want to delete this invoice payment?')) {
      deleteInvoicePaymentMutation.mutate(invoicePaymentId);
    }
  };
// ------------------------------------------------------------------------------------


  const handleInvoicePaymentClick = (invoicePaymentId: number) => {
    setSelectedInvoicePaymentId(invoicePaymentId);
    setView('details')
  };
// ------------------------------------------------------------------------------------


  const handleEditInvoicePayment = (invoicePaymentId: number) => {
    setSelectedInvoicePaymentId(invoicePaymentId);
    setView('edit');
  };
// ------------------------------------------------------------------------------------

  const handleBackToInvoicePaymentList = () => {
    setView('list');
    setSelectedInvoicePaymentId(null);
  };
// ------------------------------------------------------------------------------------

  const handleEditInvoicePaymentButton = () => {
    setView('edit');
  };
// ------------------------------------------------------------------------------------

  const filteredInvoicePayments = invoicePayment.filter((invoicePayment: any) => {
    const invoicePaymentNumber = String(invoicePayment.invoice_payment_code)?.toLowerCase() || '';
    const invoicePaymentDate = invoicePayment.date_created?.toLowerCase() || '';
    const search = searchTerm.toLowerCase();
    
    return invoicePaymentNumber.includes(search) || invoicePaymentDate.includes(search);
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


  const sortedInvoicePayments = React.useMemo(() => {
    if (!sortConfig.key) return filteredInvoicePayments;

    return [...filteredInvoicePayments].sort((a, b) => {
      const aValue = a[sortConfig.key as keyof typeof a];
      const bValue = b[sortConfig.key as keyof typeof b];

      if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });
  }, [filteredInvoicePayments, sortConfig]);


// Sort handler
const handleSort = (key: any) => {
  setSortConfig(current => ({
    key,
    direction: current.key === key && current.direction === 'asc' ? 'desc' : 'asc'
  }));
};

// ------------------------------------------------------------------------------------

// Pagination calculations for Invoice Payment Table
const totalInvoicePayments = Math.ceil(sortedInvoicePayments.length / itemsPerPage);
const startIndex = (currentPage - 1) * itemsPerPage;
const paginatedInvoicePayments = sortedInvoicePayments.slice(startIndex, startIndex + itemsPerPage);

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

  if (isLoadingInvoicePayments) return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
      <div className="text-center">
        <span className={spinningStyles.terminalBar.spinner}>𐬽</span>
        <p className="mt-4 text-gray-600">Loading Invoice Payments...</p>
      </div>
    </div>
  );

  if (invoicePaymentsError) return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
      <div className="bg-white rounded-xl shadow-lg p-8 max-w-md text-center">
        <svg width="96" height="96" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-red-500 mb-4">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15v-2h2v2h-2zm0-4V7h2v6h-2z" fill="currentColor"/>
        </svg>
        <h2 className="text-xl font-bold text-gray-800 mb-2">Error Loading Data</h2>
        <p className="text-gray-600">Failed to load invoice payments. Please try again.</p>
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
                              <p className="text-sm text-gray-500">Invoice Payments Management</p>
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
                    <h1 className="text-4xl font-light text-gray-900 tracking-tight">Invoice Payments</h1>
                    <p className="text-gray-500 mt-2">Manage and track your invoice payment transactions</p>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-3">

                {(view === 'form' || view === 'details' || view === 'edit') && (
                  <button
                    onClick={handleBackToInvoicePaymentList}
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
                    <div className="text-2xl font-light text-gray-900">{invoicePayment.length}</div>
                    <div className="text-sm text-gray-500">Total Invoice Payments</div>
                  </div>
                  <div className="w-px h-8 bg-gray-200"></div>
                  <div className="text-center">
                    <div className="text-2xl font-light text-gray-900">
                      {new Set(invoicePayment.map((c: any) => c.currency?.currency_code)).size}
                    </div>
                    <div className="text-sm text-gray-500">Currencies</div>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search invoice payments..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 pr-2 text-gray-600 py-1 border border-gray-200 rounded-xl focus:ring-1 focus:ring-purple-500 focus:border-purple-500 bg-white transition-all duration-200 w-64 focus:shadow-sm"
                    />
                    <div className="absolute cursor-pointer inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </div>
                  </div>
                  <button
                    onClick={() => setView('form')}
                    className="bg-white border border-gray-200 hover:border-purple-500 text-gray-700 px-3 py-1 rounded-xl font-medium transition-all duration-200 flex cursor-pointer items-center gap-2 hover:shadow-sm hover:bg-purple-50"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    New Invoice Payment
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Content Area */}
          {view === 'list' && (
            <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
              <InvoicePaymentTable 
                invoicePayments={paginatedInvoicePayments}
                onInvoicePaymentClick={handleInvoicePaymentClick}
                onEditInvoicePayment={handleEditInvoicePayment}
                ondeleteInvoicePayment={handleDeleteInvoicePayment}
                sortConfig={sortConfig}
                onSort={handleSort}
                currentPage={currentPage}
                totalInvoicePayments={totalInvoicePayments}
                totalItems={sortedInvoicePayments.length}
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
                    <h2 className="text-2xl font-light text-gray-900">Create Invoice Payment</h2>
                    <p className="text-gray-500">Add a new invoice payment to your records</p>
                  </div>
                    <button 
                        onClick={() => setView('list')}
                        className="bg-white text-black cursor-pointer px-2 py-1 rounded-lg hover:bg-red-800 transition-colors flex items-center gap-1"
                    >
                        <svg className="w-1 h-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}  />
                        </svg>
                        x Cancel
                    </button>
                </div>
                <InvoicePaymentForm 
                  onSubmit={handleAddInvoicePayment} 
                  isSubmitting={createInvoicePaymentMutation.isPending} 
                  onCancel={handleBackToInvoicePaymentList}
                  currencies={currencies}
                  accounts={accounts}
                  agents={agents}
                  invoices={invoices}
                  customers={customers}
                />
                {createInvoicePaymentMutation.isError && (
                  <div className="mt-6 p-4 bg-red-50 border border-red-100 rounded-xl text-red-700 text-sm">
                    Error creating invoice payment. Please try again.
                  </div>
                )}
              </div>
            </div>
          )}

          {view === 'details' && (
            <InvoicePaymentDetails 
              invoicePayment={selectedInvoicePayment}
              isLoading={isLoadingInvoicePayment}
              onBack={handleBackToInvoicePaymentList}
              onEdit={handleEditInvoicePaymentButton}
              accounts={accounts}
              onCreateJournalEntry={(data) => createJournalEntryMutation.mutate(data)}
              isCreatingJournalEntry={createJournalEntryMutation.isPending}
            />
          )}

          {view === 'edit' && selectedInvoicePayment && (
            <InvoicePaymentEdit 
              invoicePayment={selectedInvoicePayment}
              onSubmit={handleUpdateInvoicePayment}
              isSubmitting={updateInvoicePaymentMutation.isPending}
              onCancel={handleBackToInvoicePaymentList}
              currencies={currencies}
              accounts={accounts}
              agents={agents}
              invoices={invoices}
              customers={customers}
              onCreateJournalEntry={(data) => createJournalEntryMutation.mutate(data)}
              isCreatingJournalEntry={createJournalEntryMutation.isPending}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default InvoicePaymentManagement;
