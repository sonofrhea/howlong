import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Link } from 'react-router-dom';


import { fetchCreditNotes, createCreditNote, fetchCreditNoteById, fetchInvoices,
  updateCreditNote, deleteCreditNote, fetchCustomers
} from "../Engines"


import { fetchChartOfAccounts } from "../../ChartOfAccounts/Engines"
import { fetchCurrencies, fetchAgents } from "../../Core/Engines"



//import CreditNoteDetails from "./CreditNoteDetails";
//import CreditNoteForm from "./CreditNoteForm";
import CreditNoteTable from "./CreditNoteTable";
//import CreditNoteEdit from "./CreditNoteEdit";




function CreditNoteManagement() {
  const queryClient = useQueryClient();
  const [view, setView] = useState('list');
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCreditNoteId, setSelectedCreditNoteId] = useState(null);
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

  const { data: invoices = [] } = useQuery({
    queryKey: ['invoices'],
    queryFn: fetchInvoices
  });

// ------------------------------------------------------------------------------------

                    // QUERIES

// LIST QUERIES

  const { data: creditNotes = [], isLoading: isLoadingCreditNotes, error: creditNoteError} = useQuery({
    queryKey: ['creditNotes'],
    queryFn: fetchCreditNotes
  });





// DETAIL QUERIES

  const { data: selectedCreditNote, isLoading: isLoadingCreditNote } = useQuery({
    queryKey: ['creditNote', selectedCreditNoteId],
    queryFn: () => fetchCreditNoteById(selectedCreditNoteId),
    enabled: !!selectedCreditNoteId,
  });
// ------------------------------------------------------------------------------------
                  // MANIPULATIONS


      // CREATIONS - POST

  const createCreditNoteMutation = useMutation({
    mutationFn: createCreditNote,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['creditNotes']});
      setSelectedCreditNoteId(data.credit_note_number);
      setView('details');
    },
    onError: (error) => {
      console.error('Error creating credit note:', error.response?.data || error.message || error);
    }
  });





    // UPDATES - PUT

  const updateCreditNoteMutation = useMutation({
    mutationFn: updateCreditNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['creditNotes'] });
      queryClient.invalidateQueries({ queryKey: ['creditNote', selectedCreditNoteId]});
      setView('details');
    },
    onError: (error) => {
      console.error('Error updating credit note:', error.response?.data || error.message);
    }
  });
// ------------------------------------------------------------------------------------
              // DELETE

  const deleteCreditNoteMutation = useMutation({
    mutationFn: deleteCreditNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['creditNotes'] });
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





  const handleAddCreditNote = async (creditNoteData) => {

    const customer = customers.find(c => String(c.customer_number) === String(creditNoteData.customer));
    const currency = currencies.find(c => String(c.currency_symbol) === String(creditNoteData.currency));
    const agent = agents.find(a => String(a.username) === String(creditNoteData.agent));

    if (!customer || !currency || !agent) {
      console.log("customer or currency or agent data missing, Please select before submitting");
      return;
    }

    const apiData = {
      date: creditNoteData.date,
      customer: {
        formatted_customer_number: customer.formatted_customer_number,
        customer_name: customer.customer_name
      },
      agent: {
        username: agent.username
      },
      currency: {
        currency: currency.currency_symbol
      },
      credit_note_header: (creditNoteData.credit_note_header || []).map(item => {
        const account = accounts.find(a => String(a.account_code) === String(item.account));

        const rawInvoiceValue = String(item.related_invoice_payments || '');
        const invoiceKey = rawInvoiceValue.split(' - ')[0];
        const related_invoice_payments = invoices.find(i =>
          String(i.formatted_invoice_number) === invoiceKey ||
          String(i.invoice_number) === invoiceKey ||
          String(i.invoice_number) === rawInvoiceValue
        );

        if (!related_invoice_payments || !account) {
          console.log("Invoice or account data unavailable.", { account, related_invoice_payments, item });
          return null;
        }
        return {
          account: {
            account_code: account.account_code,
            account_name: account.account_name
          },
          related_invoice_payments: [
            {
              related_invoice: {
                formatted_invoice_number: related_invoice_payments.formatted_invoice_number,
                customer_details: related_invoice_payments.customer_details,
                date_created: related_invoice_payments.date_created,
              }
            }
          ],
          description: item.description || creditNoteData.description,
          amount: String(Number(item.amount) || 0),
          tax_inclusive: !!item.tax_inclusive,
          tax_amount: String(Number(item.tax_amount) || 0),
        }
      }).filter(item => item !== null)
    };

    console.log("Data being sent (apiData):", apiData);

    

    const hasFile = (obj) => {
      if (!obj || typeof obj !== 'object') return false;
      if (obj instanceof File) return true;
      return Object.values(obj).some(v => hasFile(v));
    };

    if (hasFile(apiData)) {
      const fd = toFormData(apiData);
      for (const pair of fd.entries()) {
        console.log('FormData entry:', pair[0], pair[1]);
      }
      createCreditNoteMutation.mutate(fd);
    } else {
      createCreditNoteMutation.mutate(apiData);
    }
  };





  const handleUpdateCreditNote = (creditNoteData) => {
    updateCreditNoteMutation.mutate({
      credit_note_number: selectedCreditNoteId,
      creditNoteData: creditNoteData
    });
  };





  const handleDeleteCreditNote = async (creditNoteId) => {
    if (window.confirm('Are you sure you want to delete this customer?')) {
      deleteCreditNoteMutation.mutate(creditNoteId);
    }
  };
// ------------------------------------------------------------------------------------


  const handleCreditNoteClick = (creditNoteId) => {
    setSelectedCreditNoteId(creditNoteId);
    setView('details')
  };
// ------------------------------------------------------------------------------------


  const handleEditCreditNote = (creditNoteId, creditNoteData) => {
    setSelectedCreditNoteId(creditNoteId);
    setView('edit');
  };
// ------------------------------------------------------------------------------------

  const handleBackToCreditNotesList = () => {
    setView('list');
    setSelectedCreditNoteId(null);
  };
// ------------------------------------------------------------------------------------

  const handleEditCreditNoteButton = () => {
    setView('edit');
  };
// ------------------------------------------------------------------------------------

  const filteredCreditNotes = creditNotes.filter(creditNote => {
  const customerName = creditNote.customer.toLowerCase() || '';
  const agentName = creditNote.agent.toLowerCase() || '';
  const search = searchTerm.toLowerCase();
  
  return customerName.includes(search) || agentName.includes(search);
});

  // ------------------------------------------------------------------------------------
                              // SORTING


  const sortedCreditNotes = React.useMemo(() => {
    if (!sortConfig.key) return filteredCreditNotes;

    return [...filteredCreditNotes].sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];

      if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });
  }, [filteredCreditNotes, sortConfig]);


// Sort handler
const handleSort = (key) => {
  setSortConfig(current => ({
    key,
    direction: current.key === key && current.direction === 'asc' ? 'desc' : 'asc'
  }));
};

// ------------------------------------------------------------------------------------

// Pagination calculations for Credit Note Table
const totalCreditNotePages = Math.ceil(sortedCreditNotes.length / itemsPerPage);
const startIndex = (currentPage - 1) * itemsPerPage;
const paginatedCreditNotes = sortedCreditNotes.slice(startIndex, startIndex + itemsPerPage);

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

  if (isLoadingCreditNotes) return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
        <p className="mt-4 text-gray-600">Loading credit notes...</p>
      </div>
    </div>
  );

  if (creditNoteError) return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
      <div className="bg-white rounded-xl shadow-lg p-8 max-w-md text-center">
        <svg width="96" height="96" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-red-500 mb-4">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15v-2h2v2h-2zm0-4V7h2v6h-2z" fill="currentColor"/>
        </svg>
        <h2 className="text-xl font-bold text-gray-800 mb-2">Error Loading Data</h2>
        <p className="text-gray-600">Failed to load credit notes. Please try again.</p>
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
                            <h1 className="text-lg font-semibold text-gray-900">Customers Suite</h1>
                            <p className="text-sm text-gray-500">Credit Note Management</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <Link 
                        to="/customers"
                        className="text-sm text-gray-600 hover:text-blue-600 transition-colors duration-200 flex items-center gap-2"
                        >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Back to Customers Dashboard
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
                    <h1 className="text-4xl font-light text-gray-900 tracking-tight">Credit Notes</h1>
                    <p className="text-gray-500 mt-2">Manage and track your credit note transactions</p>
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
                        className="pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-1 focus:ring-green-500 focus:border-green-500 bg-white transition-all duration-200 w-64 focus:shadow-sm"
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
                    className="bg-white border border-gray-200 hover:border-green-500 text-gray-700 px-6 py-3 rounded-xl font-medium transition-all duration-200 flex items-center gap-2 hover:shadow-sm hover:bg-green-50"
                    >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    New Note
                    </button>
                )}

                {(view === 'form' || view === 'details' || view === 'edit') && (
                    <button
                    onClick={handleBackToCreditNotesList}
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
                    <div className="text-2xl font-light text-gray-900">{creditNotes.length}</div>
                    <div className="text-sm text-gray-500">Total Notes</div>
                    </div>
                    <div className="w-px h-8 bg-gray-200"></div>
                    <div className="text-center">
                    <div className="text-2xl font-light text-gray-900">
                        {new Set(creditNotes.map(c => c.currency?.currency_code)).size}
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
                <CreditNoteTable 
                creditNotes={paginatedCreditNotes}
                onCreditNoteClick={handleCreditNoteClick}
                onEditCreditNote={handleEditCreditNote}
                onDeleteCreditNote={handleDeleteCreditNote}
                sortConfig={sortConfig}
                onSort={handleSort}
                currentPage={currentPage}
                totalCreditNotePages={totalCreditNotePages}
                totalItems={sortedCreditNotes.length}
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
                    <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center border border-green-100">
                    <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v16m8-8H4" />
                    </svg>
                    </div>
                    <div>
                    <h2 className="text-2xl font-light text-gray-900">Create Credit Note</h2>
                    <p className="text-gray-500">Add a new credit note to your records</p>
                    </div>
                </div>
                <CreditNoteForm 
                    onSubmit={handleAddCreditNote} 
                    isSubmitting={createCreditNoteMutation.isLoading} 
                    onCancel={handleBackToCreditNotesList}
                    customers={customers}
                    currencies={currencies}
                    accounts={accounts}
                    agents={agents}
                    invoices={invoices}
                />
                {createCreditNoteMutation.isError && (
                    <div className="mt-6 p-4 bg-red-50 border border-red-100 rounded-xl text-red-700 text-sm">
                    Error creating credit note. Please try again.
                    </div>
                )}
                </div>
            </div>
            )}

            {view === 'details' && (
            <CreditNoteDetails 
                creditNote={selectedCreditNote}
                isLoading={isLoadingCreditNote}
                onBack={handleBackToCreditNotesList}
                onEdit={handleEditCreditNoteButton}
            />
            )}

            {view === 'edit' && selectedCreditNote && (
            <CreditNoteEdit 
                creditNote={selectedCreditNote}
                onSubmit={handleUpdateCreditNote}
                isSubmitting={updateCreditNoteMutation.isLoading}
                onBack={handleBackToCreditNotesList}
                onCancel={handleBackToCreditNotesList}
            />
            )}
        </div>
        </div>
    </div>
    );
}

export default CreditNoteManagement;