import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Link } from 'react-router-dom';

import { Plus } from 'lucide-react';


import { fetchSupplierCreditNotes, fetchSupplierCreditNoteById, 
    createSupplierCreditNote,
    updateSupplierCreditNote, 
    deleteSupplierCreditNote, fetchSupplierInvoices, 
    fetchSupplierProfiles
 } from "../Engines";

import { fetchCurrencies, fetchAgents } from "../../Core/Engines";
import { fetchProductItems } from "../../Products/Engines";


import { fetchChartOfAccounts } from "../../ChartOfAccounts/Engines";


import { EditSupplierCreditNoteInputs,
     SupplierCreditNoteInputs,
      SupplierCreditNoteList,
      SupplierCreditNoteResponse } from "../constants/Types";


import SupplierCreditNoteDetails from "./SupplierCreditNoteDetails";
import SupplierCreditNoteForm from "./SupplierCreditNoteForm";
import SupplierCreditNoteTable from "./SupplierCreditNoteTable";
import SupplierCreditNoteEdit from "./SupplierCreditNoteEdit";

import { management } from "../constants/Styles";
import { createJournalEntry } from "../../Accounting/Engines";
import { toast } from "react-hot-toast";
import { JournalHeaderInputs } from "../../Accounting/Constants/Types";


interface SortConfig {
  key: string | null;
  direction: 'asc' | 'desc';
}














function SupplierCreditNoteManagement() {
    const queryClient = useQueryClient();
    const [view, setView] = useState('list');
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedSupplierCreditNoteId, setSelectedSupplierCreditNoteId] = useState<number | null>(null);
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

    const { data: productItems = [] } = useQuery({
        queryKey: ['productItems'],
        queryFn: fetchProductItems
    });

    // ------------------------------------------------------------------------------------

                        // QUERIES

    // LIST QUERIES

    const { data: supplierCreditNotes = [], isLoading: isLoadingSupplierCreditNotes, error: supplierCreditNotesError} = useQuery({
        queryKey: ['supplierCreditNotes'],
        queryFn: fetchSupplierCreditNotes
    });





    // DETAIL QUERIES

    const { data: selectedSupplierCreditNote, isLoading: isLoadingSupplierCreditNote } = useQuery({
        queryKey: ['supplierCreditNote', selectedSupplierCreditNoteId],
        queryFn: () => fetchSupplierCreditNoteById(selectedSupplierCreditNoteId!),
        enabled: !!selectedSupplierCreditNoteId,
    });
    // ------------------------------------------------------------------------------------
                    // MANIPULATIONS


        // CREATIONS - POST

    const createSupplierCreditNoteMutation = useMutation({
        mutationFn: createSupplierCreditNote,
        onMutate: () => {
            toast.loading('Creating Supplier Credit Note...', { id: "Create Supplier Credit Note" });
        },
        onSuccess: (data: SupplierCreditNoteResponse) => {
            const newSupplierCreditNote = data.credit_note_number
            queryClient.invalidateQueries({ queryKey: ['supplierCreditNotes']});
            setSelectedSupplierCreditNoteId(newSupplierCreditNote);
            toast.success('Supplier Credit Note successfully created!', { id: "Create Supplier Credit Note" });
            setView('details');
        },
        onError: (error: any) => {
            toast.error('Failed to create Supplier Credit Note', { id: "Create Supplier Credit Note" });
            console.error('Error creating supplierCreditNote:', error.response?.data || error.message || error);
        }
    });





        // UPDATES - PUT

    const updateSupplierCreditNoteMutation = useMutation({
        mutationFn: updateSupplierCreditNote,
        onMutate: () => {
            toast.loading('Updating Supplier Credit Note...', { id: "Update Supplier Credit Note" });
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['supplierCreditNotes'] });
            queryClient.invalidateQueries({ queryKey: ['supplierCreditNote', selectedSupplierCreditNoteId]});
            toast.success('Supplier Credit Note successfully updated!', { id: "Update Supplier Credit Note" });
            setView('details');
        },
        onError: (error: any) => {
            toast.error('Failed to update Supplier Credit Note', { id: "Update Supplier Credit Note" });
            console.error('Error updating supplierCreditNote:', error.response?.data || error.message);
        }
    });
    // ------------------------------------------------------------------------------------
                // DELETE

    const deleteSupplierCreditNoteMutation = useMutation({
        mutationFn: deleteSupplierCreditNote,
        onMutate: () => {
            toast.loading('Deleting Supplier Credit Note...', { id: "Delete Supplier Credit Note" });
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['supplierCreditNotes'] });
            toast.success('Supplier Credit Note successfully deleted!', { id: "Delete Supplier Credit Note" });
        },
        onError: (error: any) => {
            toast.error('Failed to delete Supplier Credit Note', { id: "Delete Supplier Credit Note" });
            console.error('Error updating supplierCreditNote:', error.response?.data || error.message);
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





    const handleAddSupplierCreditNote = async (supplierCreditNoteData: SupplierCreditNoteInputs) => {

        const cleanedData = {
            ...supplierCreditNoteData,
            account: supplierCreditNoteData.account ?? undefined,

            related_credit_note:
                supplierCreditNoteData.related_credit_note &&
                supplierCreditNoteData.related_credit_note?.length > 0
                    ? supplierCreditNoteData.related_credit_note
                    : undefined
        }
        

        //console.log("🎯 RAW FORM DATA:", cleanedData)

        await createSupplierCreditNoteMutation.mutateAsync(cleanedData);
    };





    const handleUpdateSupplierCreditNote = async (supplierCreditNoteData: SupplierCreditNoteInputs) => {

        const cleanedData = {
            ...supplierCreditNoteData,
            account: supplierCreditNoteData.account ?? undefined,

            related_credit_note:
                supplierCreditNoteData.related_credit_note &&
                supplierCreditNoteData.related_credit_note?.length > 0
                    ? supplierCreditNoteData.related_credit_note
                    : undefined
        }

        await updateSupplierCreditNoteMutation.mutateAsync({
            credit_note_number: selectedSupplierCreditNoteId!,
            supplierCreditNoteData: cleanedData
        });
    };





    const handleDeleteSupplierCreditNote = async (supplierCreditNoteId: number) => {
        if (!window.confirm('Are you sure you want to delete this credit note?')) return;
        
        await deleteSupplierCreditNoteMutation.mutateAsync(supplierCreditNoteId);
    };
    // ------------------------------------------------------------------------------------


    const handleSupplierCreditNoteClick = (supplierCreditNoteId: number) => {
        setSelectedSupplierCreditNoteId(supplierCreditNoteId);
        setView('details')
    };
    // ------------------------------------------------------------------------------------


    const handleEditSupplierCreditNote = (supplierCreditNoteId: number) => {
        setSelectedSupplierCreditNoteId(supplierCreditNoteId);
        setView('edit');
    };
    // ------------------------------------------------------------------------------------

    const handleBackToSupplierCreditNotesList = () => {
        setView('list');
        setSelectedSupplierCreditNoteId(null);
    };

    // ------------------------------------------------------------------------------------


    const handleBackToSupplierCreditNoteDetails = (supplierCreditNoteId: number) => {
        setSelectedSupplierCreditNoteId(supplierCreditNoteId);
        setView('details')
    };
    // ------------------------------------------------------------------------------------

    const handleEditSupplierCreditNoteButton = () => {
        setView('edit');
    };
    // ------------------------------------------------------------------------------------

    const filteredSupplierCreditNotes = supplierCreditNotes.filter((supplierCreditNote: SupplierCreditNoteList) => {
        const creditNoteNumber = String(supplierCreditNote.credit_note_number)?.toLowerCase() || '';
        const search = searchTerm.toLowerCase();
        
        return creditNoteNumber.includes(search);
    });

    // ------------------------------------------------------------------------------------


            // JOURNAL ENTRY



    const formatJournalNumber = () => {
      const currentYear = new Date().getFullYear();
      return `JV-${currentYear}-`
    };


    const createJournalEntryMutation = useMutation({
        mutationFn: createJournalEntry,
          onMutate: () => {
              toast.loading('Creating Journal Entry...', { id: "Create Journal Entry" });
          },
        onSuccess: (data: JournalHeaderInputs) => {
            queryClient.invalidateQueries({ queryKey: ['journalEntries']});

            toast.success(`Journal Entry ${formatJournalNumber()}${data.journal_number} created successfully!`, { id: "Create Journal Entry" });
            setIsJournalEntryOpen(false);
        },
        onError: (error: any) => {
          toast.error('Failed to create Journal Entry.');
          console.error('Error creating journal entry:', error.response?.data || error.message || error);
        }
    });


    const handleAddJournalEntry = async (journalEntryData: JournalHeaderInputs) => {
        //console.log("RAW FORM DATA:", journalEntryData)

        await createJournalEntryMutation.mutateAsync(journalEntryData);
    };

  // ------------------------------------------------------------------------------------

                                // SORTING


    const sortedSupplierCreditNotes = React.useMemo(() => {
        if (!sortConfig.key) return filteredSupplierCreditNotes;

        return [...filteredSupplierCreditNotes].sort((a, b) => {
        const aValue = a[sortConfig.key as keyof typeof a];
        const bValue = b[sortConfig.key as keyof typeof b];

        if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
        if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
        });
    }, [filteredSupplierCreditNotes, sortConfig]);


    // Sort handler
    const handleSort = (key: any) => {
    setSortConfig(current => ({
        key,
        direction: current.key === key && current.direction === 'asc' ? 'desc' : 'asc'
    }));
    };

    // ------------------------------------------------------------------------------------

    // Pagination calculations for Supplier credit notes Table
    const totalSupplierCreditNotePages = Math.ceil(sortedSupplierCreditNotes.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedSupplierCreditNotes = sortedSupplierCreditNotes.slice(startIndex, startIndex + itemsPerPage);

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

    if (isLoadingSupplierCreditNotes) return (
        <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
            <p className="mt-4 text-gray-600">fetching credit notes...</p>
        </div>
        </div>
    );

    if (supplierCreditNotesError) return (
        <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-md text-center">
            <svg width="96" height="96" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-red-500 mb-4">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15v-2h2v2h-2zm0-4V7h2v6h-2z" fill="currentColor"/>
            </svg>
            <h2 className="text-xl font-bold text-gray-800 mb-2">Error Loading Data</h2>
            <p className="text-gray-600">Failed to load supplier credit note. Please try again.</p>
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
                        <div className="w-2 h-8 bg-linear-to-b from-blue-500 to-purple-600 rounded-full"></div>
                        <div>
                            <h1 className="text-lg font-semibold text-gray-900">Suppliers Suite</h1>
                            <p className="text-sm text-gray-500">Supplier Credit Note Management</p>
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
                        <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                    </div>
                    <div>
                        <h1 className="text-4xl font-light text-gray-900 tracking-tight">Supplier Credit Notes</h1>
                        <p className="text-gray-500 mt-2">Manage and track your credit notes</p>
                    </div>
                    </div>
                </div>
                
                <div className="flex items-center gap-3">

                    {(view === 'form' || view === 'details' || view === 'edit') && (
                    <button
                        onClick={handleBackToSupplierCreditNotesList}
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
                        <div className="text-2xl font-light text-gray-900">{supplierCreditNotes.length}</div>
                        <div className="text-sm text-gray-500">Total Suppliers Credit Notes</div>
                    </div>
                    <div className="w-px h-8 bg-gray-200"></div>
                    <div className="text-center">
                        <div className="text-2xl font-light text-gray-900">
                        {new Set(supplierCreditNotes.map((c: any) => c.currency?.currency_code)).size}
                        </div>
                        <div className="text-sm text-gray-500">Currencies</div>
                    </div>
                    </div>
                    <div className="flex gap-4">
                        <div className="relative">
                            <input
                            type="text"
                            placeholder="Search credit notes..."
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
                            className="bg-white border border-gray-200 hover:border-purple-500 text-gray-700 px-3 py-1 rounded-xl font-medium transition-all duration-200 flex items-center gap-2 hover:shadow-sm hover:bg-purple-50"
                        >
                            <Plus size={16}/>
                            New Supplier Credit Note
                        </button>
                    </div>
                </div>
                )}
            </div>

            {/* Content Area */}
            {view === 'list' && (
                <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
                <SupplierCreditNoteTable 
                    supplierCreditNotes={paginatedSupplierCreditNotes}
                    onSupplierCreditNoteClick={handleSupplierCreditNoteClick}
                    onEditSupplierCreditNote={handleEditSupplierCreditNote}
                    onDeleteSupplierCreditNote={handleDeleteSupplierCreditNote}
                    sortConfig={sortConfig}
                    onSort={handleSort}
                    currentPage={currentPage}
                    totalPages={totalSupplierCreditNotePages}
                    totalItems={sortedSupplierCreditNotes.length}
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
                        <h2 className="text-2xl font-light text-gray-900">Create Supplier credit note</h2>
                        <p className="text-gray-500">Add a new supplier credit note to your records</p>
                    </div>
                    <button 
                        onClick={() => setView('list')}
                        className="bg-black-600 text-blue px-2 py-1 rounded-lg hover:bg-red-800 transition-colors flex items-center gap-1"
                    >
                        x Cancel
                    </button>
                    </div>
                    <SupplierCreditNoteForm 
                    onSubmit={handleAddSupplierCreditNote} 
                    isSubmitting={createSupplierCreditNoteMutation.isPending} 
                    onCancel={handleBackToSupplierCreditNotesList}
                    supplierInvoices={supplierInvoices}
                    currencies={currencies}
                    accounts={accounts}
                    agents={agents}
                    productItems={productItems}
                    supplierProfiles={supplierProfiles}
                    />
                    {createSupplierCreditNoteMutation.isError && (
                    <div className="mt-6 p-4 bg-red-50 border border-red-100 rounded-xl text-red-700 text-sm">
                        Error creating supplierCreditNote. Please try again.
                    </div>
                    )}
                </div>
                </div>
            )}

            {view === 'details' && (
                <SupplierCreditNoteDetails 
                supplierCreditNote={selectedSupplierCreditNote}
                isLoading={isLoadingSupplierCreditNote}
                onBack={handleBackToSupplierCreditNotesList}
                onEdit={handleEditSupplierCreditNoteButton}
                accounts={accounts}
                onCreateJournalEntry={handleAddJournalEntry}
                isCreatingJournalEntry={createJournalEntryMutation.isPending}
                />
            )}

            {view === 'edit' && selectedSupplierCreditNote && (
                <SupplierCreditNoteEdit 
                supplierCreditNote={selectedSupplierCreditNote}
                onSubmit={handleUpdateSupplierCreditNote}
                isSubmitting={updateSupplierCreditNoteMutation.isPending}
                onCancel={handleBackToSupplierCreditNoteDetails}
                supplierInvoices={supplierInvoices}
                currencies={currencies}
                accounts={accounts}
                agents={agents}
                productItems={productItems}
                supplierProfiles={supplierProfiles}
                onCreateJournalEntry={handleAddJournalEntry}
                isCreatingJournalEntry={createJournalEntryMutation.isPending}
                />
            )}
            </div>
        </div>
        </div>
    );

};
export default SupplierCreditNoteManagement;