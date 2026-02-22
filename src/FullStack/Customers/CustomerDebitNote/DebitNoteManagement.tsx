import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Link } from 'react-router-dom';


import { fetchDebitNotes, createDebitNote, fetchDebitNoteById,
  updateDebitNote, deleteDebitNote, fetchCustomers
} from "../Engines";


import { fetchChartOfAccounts } from "../../ChartOfAccounts/Engines"
import { fetchCurrencies, fetchAgents } from "../../Core/Engines"
import { fetchCustomerPayments } from "../../Sales/Engines";


import DebitNoteDetails from "./DebitNoteDetails";
import DebitNoteForm from "./DebitNoteForm";
import DebitNoteTable from "./DebitNoteTable";
import DebitNoteEdit from "./DebitNoteEdit";


import { DebitNoteInputs, DebitNoteCreateResponse,
  EditDebitNoteInputs
 } from "../constants/Types";
import { spinningStyles } from "../constants/Styles";
import toast from "react-hot-toast";
import { createJournalEntry } from "../../Accounting/Engines";






interface SortConfig {
  key: string | null;
  direction: 'asc' | 'desc';
}
















function DebitNoteManagement() {
  const queryClient = useQueryClient();
  const [view, setView] = useState('list');
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDebitNoteId, setSelectedDebitNoteId] = useState<number | null>(null);
// ------------------------------------------------------------------------------------
  const [sortConfig, setSortConfig] = useState<SortConfig>({ key: null, direction: 'asc' });
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
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

  const { data: customerPayments = [] } = useQuery({
    queryKey: ['customerPayments'],
    queryFn: fetchCustomerPayments
  });

// ------------------------------------------------------------------------------------

                    // QUERIES

// LIST QUERIES

  const { data: debitNotes = [], isLoading: isLoadingDebitNotes, error: debitNotesError} = useQuery({
    queryKey: ['debitNotes'],
    queryFn: fetchDebitNotes
  });





// DETAIL QUERIES

  const { data: selectedDebitNote, isLoading: isLoadingDebitNote } = useQuery({
    queryKey: ['debitNote', selectedDebitNoteId],
    queryFn: () => fetchDebitNoteById(selectedDebitNoteId!),
    enabled: !!selectedDebitNoteId,
  });
// ------------------------------------------------------------------------------------
                  // MANIPULATIONS


      // CREATIONS - POST

  const createDebitNoteMutation = useMutation({
    mutationFn: createDebitNote,
    onMutate: () => {
        toast.loading('Creating Debit Note...', { id: "Create Debit Note" });
    },
    onSuccess: (data: DebitNoteCreateResponse) => {
        queryClient.invalidateQueries({ queryKey: ['debitNotes'] });
        setSelectedDebitNoteId(data.debit_note_number);
        toast.success('Debit Note Created', { id: "Create Debit Note" });
        setView('details');
    },
    onError: (error: any) => {
        toast.error('Failed to create debit note', { id: "Create Debit Note" });
        console.error(
            'Error creating debit note:',
            error.response?.data || error.message || error
        );
    }
  });





    // UPDATES - PUT

  const updateDebitNoteMutation = useMutation({
    mutationFn: updateDebitNote,
    onMutate: () => {
        toast.loading('Updating Debit Note...', { id: "Update Debit Note" });
    },
    onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['debitNotes'] });
        queryClient.invalidateQueries({
            queryKey: ['debitNote', selectedDebitNoteId]
        });
        toast.success('Debit Note Updated', { id: "Update Debit Note" });
        setView('details');
    },
    onError: (error: any) => {
        toast.error('Failed to update debit note', { id: "Update Debit Note" });
        console.error(
            'Error updating debit note:',
            error.response?.data || error.message
        );
    }
  });
// ------------------------------------------------------------------------------------
              // DELETE

  const deleteDebitNoteMutation = useMutation({
    mutationFn: deleteDebitNote,
    onMutate: () => {
        toast.loading('Deleting Debit Note...', { id: "Delete Debit Note" });
    },
    onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['debitNotes'] });

        toast.success('Debit Note Deleted', { id: "Delete Debit Note" });
    },
    onError: (error: any) => {
        toast.error('Failed to delete debit note', { id: "Delete Debit Note" });
        console.error(
            'Error deleting debit note:',
            error.response?.data || error.message
        );
    }
  });

// ------------------------------------------------------------------------------------
                // MUTATION USE
  
  //const toFormData = (obj: any, form = new FormData(), parentKey = '') => {
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





  const handleAddDebitNote = async (debitNoteData: DebitNoteInputs) => {

    const cleanedData = {
      ...debitNoteData,
      account: debitNoteData.account ?? undefined,
      debit_note_details:
        debitNoteData.debit_note_details &&
        debitNoteData.debit_note_details?.length > 0
          ? debitNoteData.debit_note_details
          : undefined
    };
    
    //console.log("🎯 RAW FORM DATA:", cleanedData);
      await createDebitNoteMutation.mutateAsync(cleanedData);
    };

    

    
    const handleUpdateDebitNote = async (debitNoteData: DebitNoteInputs) => {

    const cleanedData = {
      ...debitNoteData,
      account: debitNoteData.account ?? undefined,
      debit_note_details:
        debitNoteData.debit_note_details &&
        debitNoteData.debit_note_details?.length > 0
          ? debitNoteData.debit_note_details
          : undefined
    };

    
      await updateDebitNoteMutation.mutateAsync({
        debit_note_number: selectedDebitNoteId!,
        debitNoteData: cleanedData
      });
  };




  const handleDeleteDebitNote = async (debitNoteId: number) => {
    if (!window.confirm('Are you sure you want to delete this customer?')) return;
    
    await deleteDebitNoteMutation.mutateAsync(debitNoteId);
  };


    



  const handleEditDebitNote = (debitNoteId: number) => {
    setSelectedDebitNoteId(debitNoteId);
    setView('edit');
  };


// ------------------------------------------------------------------------------------


  const handleDebitNoteClick = (debitNoteId: number) => {
    setSelectedDebitNoteId(debitNoteId);
    setView('details')
  };
// ------------------------------------------------------------------------------------


  const handleBackToDebitNoteDetails = (debitNoteId: number) => {
    setSelectedDebitNoteId(debitNoteId);
    setView('details')
  };

// ------------------------------------------------------------------------------------

  const handleBackToDebitNotesList = () => {
    setView('list');
    setSelectedDebitNoteId(null);
  };
// ------------------------------------------------------------------------------------

  const handleEditDebitNoteButton = () => {
    setView('edit');
  };
// ------------------------------------------------------------------------------------

  const filteredDebitNotes = debitNotes.filter((debitNote: any) => {
    const debitNoteNumber = String(debitNote.debit_note_number)?.toLowerCase() || '';
    const customerName = debitNote.customer?.customer_name?.toLowerCase() || '';
    const agentName = debitNote.agent?.username?.toLowerCase() || '';
    const search = searchTerm.toLowerCase();
    
    return debitNoteNumber.includes(search) || customerName.includes(search) || agentName.includes(search);
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


  const sortedDebitNotes = React.useMemo(() => {
    if (!sortConfig.key) return filteredDebitNotes;

    return [...filteredDebitNotes].sort((a, b) => {
      const aValue = a[sortConfig.key as keyof typeof a];
      const bValue = b[sortConfig.key as keyof typeof b];

      if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });
  }, [filteredDebitNotes, sortConfig]);


// Sort handler
const handleSort = (key: any) => {
  setSortConfig(current => ({
    key,
    direction: current.key === key && current.direction === 'asc' ? 'desc' : 'asc'
  }));
};

// ------------------------------------------------------------------------------------

// Pagination calculations for Debit Note Table
const totalDebitNotePages = Math.ceil(sortedDebitNotes.length / itemsPerPage);
const startIndex = (currentPage - 1) * itemsPerPage;
const paginatedDebitNotes = sortedDebitNotes.slice(startIndex, startIndex + itemsPerPage);

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

  if (isLoadingDebitNotes) return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
      <div className="text-center">
        <span className={spinningStyles.terminalBar.spinner}></span>
        <p className="mt-4 text-gray-600">fetching debit notes...</p>
      </div>
    </div>
  );

  if (debitNotesError) return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
      <div className="bg-white rounded-xl shadow-lg p-8 max-w-md text-center">
        <svg width="96" height="96" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-red-500 mb-4">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15v-2h2v2h-2zm0-4V7h2v6h-2z" fill="currentColor"/>
        </svg>
        <h2 className="text-xl font-bold text-gray-800 mb-2">Error Loading Data</h2>
        <p className="text-gray-600">Failed to load debit notes. Please try again.</p>
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
                          <h1 className="text-lg font-semibold text-gray-900">Customers Suite</h1>
                          <p className="text-sm text-gray-500">Debit Note Management</p>
                      </div>
                  </div>
                  <div className="flex items-center gap-3">
                            <Link 
                                to="/customers"
                                className="text-sm text-black px-3 py-1 border border-gray-200 rounded-2xl transition-colors duration-200 flex items-center gap-2 hover:bg-purple-50 hover:border-purple-500 hover:shadow-md hover:-translate-y-0.5"
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
                  <div className="w-12 h-12 bg-linear-to-br from-blue-50 to-indigo-100 rounded-2xl flex items-center justify-center border border-blue-100">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <div>
                    <h1 className="text-4xl font-light text-gray-900 tracking-tight">Debit Notes</h1>
                    <p className="text-gray-500 mt-2">Manage and track your debit note transactions</p>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-3">

                {(view === 'form' || view === 'details' || view === 'edit') && (
                  <button
                    onClick={handleBackToDebitNotesList}
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
                    <div className="text-2xl font-light text-gray-900">{debitNotes.length}</div>
                    <div className="text-sm text-gray-500">Total Notes</div>
                  </div>
                  <div className="w-px h-8 bg-gray-200"></div>
                  <div className="text-center">
                    <div className="text-2xl font-light text-gray-900">
                      {new Set(debitNotes.map((c: any) => c.currency?.currency_code)).size}
                    </div>
                    <div className="text-sm text-gray-500">Currencies</div>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search debit notes..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 text-gray-600 pr-2 py-1 border border-gray-200 rounded-xl focus:ring-1 focus:ring-purple-500 focus:border-purple-500 cursor-pointer bg-white transition-all duration-200 w-64 focus:shadow-sm"
                    />
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </div>
                  </div>
                  <button
                    onClick={() => setView('form')}
                    className="bg-white cursor-pointer border border-gray-200 hover:border-purple-500 text-gray-700 px-3 py-1 rounded-xl font-medium transition-all duration-200 flex items-center gap-2 hover:shadow-sm hover:bg-purple-50"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    New Debit Note
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Content Area */}
          {view === 'list' && (
            <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
              <DebitNoteTable 
                debitNotes={paginatedDebitNotes}
                onDebitNoteClick={handleDebitNoteClick}
                onEditDebitNote={handleEditDebitNote}
                onDeleteDebitNote={handleDeleteDebitNote}
                sortConfig={sortConfig}
                onSort={handleSort}
                currentPage={currentPage}
                totalPages={totalDebitNotePages}
                totalItems={sortedDebitNotes.length}
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
                    <h2 className="text-2xl font-light text-gray-900">Create Debit Note</h2>
                    <p className="text-gray-500">Add a new debit note to your records</p>
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
                <DebitNoteForm 
                  onSubmit={handleAddDebitNote} 
                  isSubmitting={createDebitNoteMutation.isPending} 
                  onCancel={handleBackToDebitNotesList}
                  customers={customers}
                  currencies={currencies}
                  accounts={accounts}
                  agents={agents}
                  customerPayments={customerPayments}
                />
                {createDebitNoteMutation.isError && (
                  <div className="mt-6 p-4 bg-red-50 border border-red-100 rounded-xl text-red-700 text-sm">
                    Error creating debit note. Please try again.
                  </div>
                )}
              </div>
            </div>
          )}

          {view === 'details' && (
            <DebitNoteDetails 
              debitNote={selectedDebitNote}
              isLoading={isLoadingDebitNote}
              onBack={handleBackToDebitNotesList}
              onEdit={handleEditDebitNoteButton}
              onCancel={handleBackToDebitNotesList}
              accounts={accounts}
              onCreateJournalEntry={(data) => createJournalEntryMutation.mutate(data)}
              isCreatingJournalEntry={createJournalEntryMutation.isPending}
            />
          )}

          {view === 'edit' && selectedDebitNote && (
            <DebitNoteEdit 
              debitNote={selectedDebitNote}
              onSubmit={handleUpdateDebitNote}
              isSubmitting={updateDebitNoteMutation.isPending}
              onBack={handleBackToDebitNotesList}
              onCancel={handleBackToDebitNoteDetails}
              customers={customers}
              currencies={currencies}
              accounts={accounts}
              agents={agents}
              customerPayments={customerPayments}
              onCreateJournalEntry={(data) => createJournalEntryMutation.mutate(data)}
              isCreatingJournalEntry={createJournalEntryMutation.isPending}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default DebitNoteManagement;