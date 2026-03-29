import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Link, useSearchParams } from 'react-router-dom';


import { fetchIncomeAndExpenses, fetchIncomeAndExpenseById, createIncomeAndExpense,
    updateIncomeAndExpense, deleteIncomeAndExpense,
    createJournalEntry
 } from "../Engines";




import { fetchChartOfAccounts,  } from "../../ChartOfAccounts/Engines";
import { fetchCurrencies, fetchAgents } from "../../Core/Engines"
import { fetchCustomers } from "../../Customers/Engines"



import { IncomeAndExpensesInputs, AllIncomeAndExpenses, 
    EditIncomeAndExpenses, 
    IncomeAndExpensesList,
    JournalHeaderInputs} from "../Constants/Types";


import { spinningStyles } from "../Constants/Styles";


import IncomeAndExpensesDetails from "./IncomeAndExpensesDetails";
import IncomeAndExpensesForm from "./IncomeAndExpensesForm";
import IncomeAndExpensesTable from "./IncomeAndExpensesTable";
import IncomeAndExpensesEdit from "./IncomeAndExpensesEdit";
import { toast } from "react-hot-toast";


interface SortConfig {
  key: string | null;
  direction: 'asc' | 'desc';
}


const decimalPlaces = (amount: number) => {
    return `${amount.toFixed(2)}`;
};










function IncomeAndExpensesManagement() {
    const queryClient = useQueryClient();
    const [searchParams, setSearchParams] = useSearchParams();
    const view = searchParams.get('view') || 'list';
    const [searchTerm, setSearchTerm] = useState("");
    const selectedIncomeAndExpenseId = searchParams.get('reference_number') ? Number(searchParams.get('reference_number')) : null;
    // ------------------------------------------------------------------------------------
    const [sortConfig, setSortConfig] = useState<SortConfig>({ key: null, direction: 'asc' });
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    // ------------------------------------------------------------------------------------
    const [isJournalEntryOpen, setIsJournalEntryOpen] = useState(false);
    // ------------------------------------------------------------------------------------

    const navigateToView = (newView: string, reference_number?: number) => {
        const params = new URLSearchParams(searchParams)
        params.set('view', newView)
        if (reference_number) {
            params.set('reference_number', reference_number.toString());
        } else if (newView === 'list') {
            params.delete('reference_number');
        }
        setSearchParams(params);
    }

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


    // ------------------------------------------------------------------------------------

                        // QUERIES

    // LIST QUERIES

    const { data: incomeAndExpenses = [], isLoading: isLoadingIncomeAndExpenses, error: incomeAndExpensesError} = useQuery({
        queryKey: ['incomeAndExpenses'],
        queryFn: fetchIncomeAndExpenses
    });





    // DETAIL QUERIES

    const { data: selectedIncomeAndExpense, isLoading: isLoadingIncomeAndExpense } = useQuery({
        queryKey: ['incomeAndExpense', selectedIncomeAndExpenseId],
        queryFn: () => fetchIncomeAndExpenseById(selectedIncomeAndExpenseId!),
        enabled: !!selectedIncomeAndExpenseId,
    });
    // ------------------------------------------------------------------------------------
                    // MANIPULATIONS


        // CREATIONS - POST

    const createIncomeAndExpenseMutation = useMutation({
        mutationFn: createIncomeAndExpense,
        onMutate: () => {
            toast.loading('Creating Income & Expense...', { id: "Create Income & Expense" });
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ['incomeAndExpenses'] });

            navigateToView('details', data.reference_number);
            toast.success('Income & Expense Created', { id: "Create Income & Expense" });
        },
        onError: (error: any) => {
            toast.error('Failed to create Income & Expense', { id: "Create Income & Expense" });
            console.error(
                'Error creating income and expense:',
                error.response?.data || error.message || error
            );
        }
    });





        // UPDATES - PUT

    const updateIncomeAndExpenseMutation = useMutation({
        mutationFn: updateIncomeAndExpense,
        onMutate: () => {
            toast.loading('Updating Income & Expense...', { id: "Update Income & Expense" });
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['incomeAndExpenses'] });
            queryClient.invalidateQueries({
                queryKey: ['incomeAndExpense', selectedIncomeAndExpenseId]
            });
            toast.success('Income & Expense Updated', { id: "Update Income & Expense" });
            navigateToView('details', selectedIncomeAndExpenseId!);
        },
        onError: (error: any) => {
            toast.error('Failed to update Income & Expense', { id: "Update Income & Expense" });
            console.error(
                'Error updating income and expenses:',
                error.response?.data || error.message
            );
        }
    });

    // ------------------------------------------------------------------------------------
                // DELETE

    const deleteIncomeAndExpenseMutation = useMutation({
        mutationFn: deleteIncomeAndExpense,
        onMutate: () => {
            toast.loading('Deleting Income & Expense...', { id: "Delete Income & Expense" });
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['incomeAndExpenses'] });
            toast.success('Income & Expense Deleted', { id: "Delete Income & Expense" });
        },
        onError: (error: any) => {
            toast.error('Failed to delete Income & Expense', { id: "Delete Income & Expense" });
            console.error(
                'Error deleting income and expense:',
                error.response?.data || error.message
            );
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





    const handleAddIncomeAndExpense = async (incomeAndExpensesData: IncomeAndExpensesInputs) => {
        //console.log("RAW FORM DATA: ", incomeAndExpensesData);
      
        await createIncomeAndExpenseMutation.mutateAsync(incomeAndExpensesData);
    };





    const handleUpdateIncomeAndExpense = async (incomeAndExpensesData: IncomeAndExpensesInputs) => {

        
        await updateIncomeAndExpenseMutation.mutateAsync({
            reference_number: selectedIncomeAndExpenseId!,
            incomeAndExpensesData: incomeAndExpensesData
        });
    };





    const handleDeleteIncomeAndExpense = async (incomeAndExpenseId: number) => {
        if (!window.confirm('Are you sure you want to delete this entry?')) return;
        
        await deleteIncomeAndExpenseMutation.mutateAsync(incomeAndExpenseId);
    };
    // ------------------------------------------------------------------------------------


    const handleIncomeAndExpenseClick = (incomeAndExpenseId: number) => {
        navigateToView('details', incomeAndExpenseId);
    };
    // ------------------------------------------------------------------------------------


    const handleEditIncomeAndExpense = (incomeAndExpenseId: number) => {
        navigateToView('edit', incomeAndExpenseId);
    };
    // ------------------------------------------------------------------------------------

    const handleBackToIncomeAndExpensesList = () => {
        navigateToView('list');
    };

    // ------------------------------------------------------------------------------------

    const handleBackToIncomeAndExpenseDetails = (incomeAndExpenseId: number) => {
        navigateToView('details', incomeAndExpenseId);
    };
    // ------------------------------------------------------------------------------------

    const handleEditIncomeAndExpenseButton = () => {
        navigateToView('edit');
    };
    // ------------------------------------------------------------------------------------

    const filteredIncomeAndExpenses = incomeAndExpenses.filter((incomeAndExpense: any) => {
        const incomeAndExpensesNumber = String(incomeAndExpense.reference_number)?.toLowerCase() || '';
        const search = searchTerm.toLowerCase();
        
        return incomeAndExpensesNumber.includes(search);
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


    const sortedIncomeAndExpenses = React.useMemo(() => {
        if (!sortConfig.key) return filteredIncomeAndExpenses;

        return [...filteredIncomeAndExpenses].sort((a, b) => {
        const aValue = a[sortConfig.key as keyof typeof a];
        const bValue = b[sortConfig.key as keyof typeof b];

        if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
        if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
        });
    }, [filteredIncomeAndExpenses, sortConfig]);


    // Sort handler
    const handleSort = (key: any) => {
    setSortConfig(current => ({
        key,
        direction: current.key === key && current.direction === 'asc' ? 'desc' : 'asc'
    }));
    };

    // ------------------------------------------------------------------------------------

    // Pagination calculations for income and expenses Table
    const totalIncomeAndExpenses = Math.ceil(sortedIncomeAndExpenses.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedIncomeAndExpenses = sortedIncomeAndExpenses.slice(startIndex, startIndex + itemsPerPage);

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

    if (isLoadingIncomeAndExpenses) return (
        <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
            <p className="mt-4 text-gray-600">Loading Income and Expenses...</p>
        </div>
        </div>
    );

    if (incomeAndExpensesError) return (
        <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-md text-center">
            <svg width="96" height="96" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-red-500 mb-4">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15v-2h2v2h-2zm0-4V7h2v6h-2z" fill="currentColor"/>
            </svg>
            <h2 className="text-xl font-bold text-gray-800 mb-2">Error Loading Data</h2>
            <p className="text-gray-600">Failed to load Income and Expenses. Please try again.</p>
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
                            <h1 className="text-lg font-semibold text-gray-900">Accounting Suite</h1>
                            <p className="text-sm text-gray-500">Income and Expenses Management</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <Link 
                            to="/accounting"
                            className="text-sm text-black px-3 py-1 border border-gray-200 rounded-2xl transition-colors duration-200 flex items-center gap-2 hover:bg-purple-50 hover:border-purple-500 hover:shadow-md hover:-translate-y-0.5"
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
                    <div className="w-12 h-12 bg-linear-to-br from-blue-50 to-indigo-100 rounded-2xl flex items-center justify-center border border-blue-100">
                        <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                    </div>
                    <div>
                        <h1 className="text-4xl font-light text-gray-900 tracking-tight">Income And Expenses</h1>
                        <p className="text-gray-500 mt-2">Manage and track your income and expenses entries</p>
                    </div>
                    </div>
                </div>
                
                <div className="flex items-center gap-3">

                    {(view === 'form' || view === 'details' || view === 'edit') && (
                    <button
                        onClick={handleBackToIncomeAndExpensesList}
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
                        <div className="text-2xl font-light text-gray-900">{incomeAndExpenses.length}</div>
                        <div className="text-sm text-gray-500">Total Transactions</div>
                    </div>
                    <div className="w-px h-8 bg-gray-200"></div>
                    <div className="text-center">
                        <div className="text-2xl font-light text-gray-900">
                        {incomeAndExpenses.filter((row: IncomeAndExpensesInputs) => row.category === "INCOME").length}
                        </div>
                        <div className="text-sm text-gray-500">Income</div>
                    </div>
                    <div className="w-px h-8 bg-gray-200"></div>
                    <div className="text-center">
                        <div className="text-2xl font-light text-gray-900">
                        {incomeAndExpenses.filter((row: IncomeAndExpensesInputs) => row.category === "EXPENSES").length}
                        </div>
                        <div className="text-sm text-gray-500">Expenses</div>
                    </div>
                    <div className="w-px h-8 bg-gray-200"></div>
                    <div className="text-center">
                        <div className="text-2xl font-light text-gray-900">
                        {decimalPlaces(incomeAndExpenses.reduce((sum: number, row: IncomeAndExpensesList) => sum + Number(row.net_debit ?? 0.00), 0.00))}
                        </div>
                        <div className="text-sm text-gray-500">Total Income</div>
                    </div>
                    <div className="w-px h-8 bg-gray-200"></div>
                    <div className="text-center">
                        <div className="text-2xl font-light text-gray-900">
                        {decimalPlaces(incomeAndExpenses.reduce((sum: number, row: IncomeAndExpensesList) => sum + Number(row.net_credit ?? 0),0))}
                        </div>
                        <div className="text-sm text-gray-500">Total Expenses</div>
                    </div>
                    </div>
                    <div className="flex gap-4">
                        <div className="relative">
                            <input
                            type="text"
                            placeholder="Search income and expenses..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10 pr-2 py-1 border border-gray-200 rounded-xl focus:ring-1 focus:ring-purple-500 focus:border-purple-500 bg-white transition-all duration-200 w-64 focus:shadow-sm"
                            />
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                            </div>
                        </div>
                        <button
                            onClick={() => navigateToView('form')}
                            className="bg-white border border-gray-200 hover:border-purple-500 text-gray-700 px-3 py-1 rounded-xl font-medium transition-all duration-200 flex items-center cursor-pointer gap-2 hover:shadow-sm hover:bg-purple-50"
                            >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                            New Income And Expense
                        </button>
                    </div>
                </div>
                )}
            </div>

            {/* Content Area */}
            {view === 'list' && (
                <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
                <IncomeAndExpensesTable 
                    incomeAndExpenses={paginatedIncomeAndExpenses}
                    onIncomeAndExpenseClick={handleIncomeAndExpenseClick}
                    onEditIncomeAndExpense={handleEditIncomeAndExpense}
                    onDeleteIncomeAndExpense={handleDeleteIncomeAndExpense}
                    sortConfig={sortConfig}
                    onSort={handleSort}
                    currentPage={currentPage}
                    totalPages={totalIncomeAndExpenses}
                    totalItems={sortedIncomeAndExpenses.length}
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
                        <h2 className="text-2xl font-light text-gray-900">Create Transaction Entry</h2>
                        <p className="text-gray-500">Add a new income and expenses entry to your records</p>
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
                    <IncomeAndExpensesForm 
                    onSubmit={handleAddIncomeAndExpense} 
                    isSubmitting={createIncomeAndExpenseMutation.isPending} 
                    onCancel={handleBackToIncomeAndExpensesList}
                    currencies={currencies}
                    accounts={accounts}
                    />
                    {createIncomeAndExpenseMutation.isError && (
                    <div className="mt-6 p-4 bg-red-50 border border-red-100 rounded-xl text-red-700 text-sm">
                        Error creating income and expenses entry. Please try again.
                    </div>
                    )}
                </div>
                </div>
            )}

            {view === 'details' && (
                <IncomeAndExpensesDetails 
                incomeAndExpense={selectedIncomeAndExpense}
                isLoading={isLoadingIncomeAndExpense}
                onBack={handleBackToIncomeAndExpensesList}
                onEdit={handleEditIncomeAndExpenseButton}
                accounts={accounts}
                onCreateJournalEntry={handleAddJournalEntry}
                isCreatingJournalEntry={createJournalEntryMutation.isPending}
                />
            )}

            {view === 'edit' && selectedIncomeAndExpense && (
                <IncomeAndExpensesEdit 
                incomeAndExpense={selectedIncomeAndExpense}
                onSubmit={handleUpdateIncomeAndExpense}
                isSubmitting={updateIncomeAndExpenseMutation.isPending}
                onCancel={handleBackToIncomeAndExpenseDetails}
                accounts={accounts}
                currencies={currencies}
                onCreateJournalEntry={handleAddJournalEntry}
                isCreatingJournalEntry={createJournalEntryMutation.isPending}
                />
            )}
            </div>
        </div>
        </div>
    );

};
export default IncomeAndExpensesManagement;