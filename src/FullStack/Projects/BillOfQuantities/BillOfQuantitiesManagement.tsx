import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Link } from 'react-router-dom';


import { fetchBillOfQuantities, fetchBillOfQuantityById, createBillOfQuantity, 
    updateBillOfQuantity, deleteBillOfQuantity
} from "../Engines";


import { fetchAgents } from "../../Core/Engines"


import { fetchProjects } from "../Engines";
import { fetchProductItems } from "../../Products/Engines";


import { BillOfQuantitiesInputs, AllBillOfQuantitiesInputs,
    EditBillOfQuantities
 } from "../constants/Types";



import BillOfQuantitiesDetails from "./BillOfQuantitiesDetails";
import BillOfQuantitiesForm from "./BillOfQuantitiesForm";
import BillOfQuantitiesTable from "./BillOfQuantitiesTable";
import { spinningStyles } from "../constants/Styles";
import BillOfQuantitiesEdit from "./BillOfQuantitiesEdit";





interface SortConfig {
  key: string | null;
  direction: 'asc' | 'desc';
}













function BillOfQuantitiesManagement() {
    const queryClient = useQueryClient();
    const [view, setView] = useState('list');
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedBillOfQuantityId, setSelectedBillOfQuantityId] = useState<number | null>(null);
    // ------------------------------------------------------------------------------------
    const [sortConfig, setSortConfig] = useState<SortConfig>({ key: null, direction: 'asc' });
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    // ------------------------------------------------------------------------------------
            // DEPENDENCIES

    const { data: projects = [] } = useQuery({
        queryKey: ['projects'],
        queryFn: fetchProjects
    });

    const { data: products = [] } = useQuery({
        queryKey: ['products'],
        queryFn: fetchProductItems
    })

    const { data: agents = [] } = useQuery({
        queryKey: ['agents'],
        queryFn: fetchAgents
    });


    // ------------------------------------------------------------------------------------

                        // QUERIES

    // LIST QUERIES

    const { data: billOfQuantities = [], isLoading: isLoadingBillOfQuantities, error: billOfQuantityError} = useQuery({
        queryKey: ['billOfQuantities'],
        queryFn: fetchBillOfQuantities
    });





    // DETAIL QUERIES

    const { data: selectedBillOfQuantity, isLoading: isLoadingBillOfQuantity } = useQuery({
        queryKey: ['billOfQuantity', selectedBillOfQuantityId],
        queryFn: () => fetchBillOfQuantityById(selectedBillOfQuantityId!),
        enabled: !!selectedBillOfQuantityId,
    });
    // ------------------------------------------------------------------------------------
                    // MANIPULATIONS


        // CREATIONS - POST

    const createBillOfQuantityMutation = useMutation({
        mutationFn: createBillOfQuantity,
        onSuccess: (data) => {
        queryClient.invalidateQueries({ queryKey: ['billOfQuantities']});
        setSelectedBillOfQuantityId(data.boq_number);
        setView('details');
        },
        onError: (error: any) => {
        console.error('Error creating bill of quantity:', error.response?.data || error.message || error);
        }
    });





        // UPDATES - PUT

    const updateBillOfQuantityMutation = useMutation({
        mutationFn: updateBillOfQuantity,
        onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['billOfQuantities'] });
        queryClient.invalidateQueries({ queryKey: ['billOfQuantity', selectedBillOfQuantityId]});
        setView('details');
        },
        onError: (error: any) => {
        console.error('Error updating billOfQuantity:', error.response?.data || error.message);
        }
    });
    // ------------------------------------------------------------------------------------
                // DELETE

    const deleteBillOfQuantityMutation = useMutation({
        mutationFn: deleteBillOfQuantity,
        onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['billOfQuantities'] });
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





    const handleAddBillOfQuantity = async (billOfQuantitiesData: BillOfQuantitiesInputs) => {
        if (billOfQuantitiesData.boq?.length === 0) {
            delete billOfQuantitiesData.boq;
        }
        console.log("🎯 RAW FORM DATA:", billOfQuantitiesData)

        createBillOfQuantityMutation.mutate(billOfQuantitiesData);
    };





    const handleUpdateBillOfQuantity = (billOfQuantitiesData: BillOfQuantitiesInputs) => {
        updateBillOfQuantityMutation.mutate({
        boq_number: selectedBillOfQuantityId!,
        billOfQuantitiesData: billOfQuantitiesData
        });
    };





    const handleDeleteBillOfQuantity = async (billOfQuantityId: number) => {
        if (window.confirm('Are you sure you want to delete this Bill Of Quantities?')) {
        deleteBillOfQuantityMutation.mutate(billOfQuantityId);
        }
    };
    // ------------------------------------------------------------------------------------


    const handleBillOfQuantityClick = (billOfQuantityId: number) => {
        setSelectedBillOfQuantityId(billOfQuantityId);
        setView('details')
    };
    // ------------------------------------------------------------------------------------


    const handleEditBillOfQuantity = (billOfQuantityId: number) => {
        setSelectedBillOfQuantityId(billOfQuantityId);
        setView('edit');
    };
    // ------------------------------------------------------------------------------------

    const handleBackToBillOfQuantitiesList = () => {
        setView('list');
        setSelectedBillOfQuantityId(null);
    };
    // ------------------------------------------------------------------------------------

    const handleEditBillOfQuantityButton = () => {
        setView('edit');
    };
    // ------------------------------------------------------------------------------------

    const filteredBillOfQuantities = billOfQuantities.filter((billOfQuantity: any) =>
        String(billOfQuantity.boq_number)?.toLowerCase().includes(searchTerm.toLocaleLowerCase())
    );

    // ------------------------------------------------------------------------------------
                                // SORTING


    const sortedBillOfQuantities = React.useMemo(() => {
        if (!sortConfig.key) return filteredBillOfQuantities;

        return [...filteredBillOfQuantities].sort((a, b) => {
        const aValue = a[sortConfig.key as keyof typeof a];
        const bValue = b[sortConfig.key as keyof typeof b];

        if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
        if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
        });
    }, [filteredBillOfQuantities, sortConfig]);


    // Sort handler
    const handleSort = (key: any) => {
    setSortConfig(current => ({
        key,
        direction: current.key === key && current.direction === 'asc' ? 'desc' : 'asc'
    }));
    };

    // ------------------------------------------------------------------------------------

    // Pagination calculations for Bill of Quantities Table
    const totalBillOfQuantitiesPages = Math.ceil(sortedBillOfQuantities.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedBillOfQuantities = sortedBillOfQuantities.slice(startIndex, startIndex + itemsPerPage);

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

    if (isLoadingBillOfQuantities) return (
        <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">fetching Bill Of Quantities...</p>
        </div>
        </div>
    );

    if (billOfQuantityError) return (
        <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-md text-center">
            <svg width="96" height="96" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-red-500 mb-4">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15v-2h2v2h-2zm0-4V7h2v6h-2z" fill="currentColor"/>
            </svg>
            <h2 className="text-xl font-bold text-gray-800 mb-2">Error Loading Data</h2>
            <p className="text-gray-600">Failed to load bill of quantities. Please try again.</p>
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
                                <h1 className="text-lg font-semibold text-gray-900">Projects Suite</h1>
                                <p className="text-sm text-gray-500">Bill Of Quantities Management</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <Link 
                            to="/projects"
                            className="text-sm text-gray-600 hover:text-blue-600 transition-colors duration-200 flex items-center gap-2"
                            >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                            Back to Projects Dashboard
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
                        <div className="w-12 h-12 bg-linear-to-br from-green-50 to-emerald-100 rounded-2xl flex items-center justify-center border border-green-100">
                        <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        </div>
                        <div>
                        <h1 className="text-4xl font-light text-gray-900 tracking-tight">Bill Of Quantities</h1>
                        <p className="text-gray-500 mt-2">Manage and track your bill of quantities</p>
                        </div>
                    </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                    {(view === 'form' || view === 'details' || view === 'edit') && (
                        <button
                        onClick={handleBackToBillOfQuantitiesList}
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
                        <div className="text-2xl font-light text-gray-900">{billOfQuantities.length}</div>
                        <div className="text-sm text-gray-500">Total Bill Of Quantities</div>
                        </div>
                        <div className="w-px h-8 bg-gray-200"></div>
                        <div className="text-center">
                        <div className="text-2xl font-light text-gray-900">
                            {new Set(billOfQuantities.map((c: any) => c.currency?.currency_code)).size}
                        </div>
                        <div className="text-sm text-gray-500">Currencies</div>
                        </div>
                    </div>
                        <div className="flex gap-4">
                            <div className="relative">
                            <input
                                type="text"
                                placeholder="Search bill of quantities..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-10 pr-2 py-1 text-black border border-gray-200 rounded-xl focus:ring-1 focus:ring-purple-500 focus:border-purple-500 bg-white transition-all duration-200 w-64 focus:shadow-sm"
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
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                            New BOQ
                            </button>
                        </div>
                    </div>
                )}
                </div>

                {/* Content Area */}
                {view === 'list' && (
                <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
                    <BillOfQuantitiesTable 
                    billOfQuantities={paginatedBillOfQuantities}
                    onBillOfQuantityClick={handleBillOfQuantityClick}
                    onEditBillOfQuantity={handleEditBillOfQuantity}
                    onDeleteBillOfQuantity={handleDeleteBillOfQuantity}
                    sortConfig={sortConfig}
                    onSort={handleSort}
                    currentPage={currentPage}
                    totalPages={totalBillOfQuantitiesPages}
                    totalItems={sortedBillOfQuantities.length}
                    itemsPerPage={itemsPerPage}
                    onPageChange={handlePageChange}
                    onItemsPerPageChange={handleItemsPerPageChange}
                    />
                </div>
                )}

                {view === 'form' && (
                <div className="w-full bg-green-50 rounded-2xl shadow-sm border border-gray-200">
                    <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-8">
                    <div className="flex items-center gap-4 mb-8 justify-between">
                        <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center border border-green-100">
                        <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v16m8-8H4" />
                        </svg>
                        </div>
                        <div>
                        <h2 className="text-2xl font-light text-gray-900">Create Bill Of Quantities</h2>
                        <p className="text-gray-500">Add a new bill of quantities to your records</p>
                        </div>
                        <button 
                            onClick={() => setView('list')}
                            className="bg-white text-black px-2 py-1 rounded-lg hover:bg-red-700 transition-colors flex items-center gap-1"
                        >
                            <svg className="w-1 h-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}  />
                            </svg>
                            x Cancel
                        </button>
                    </div>
                    <BillOfQuantitiesForm 
                        onSubmit={handleAddBillOfQuantity} 
                        isSubmitting={createBillOfQuantityMutation.isPending} 
                        onCancel={handleBackToBillOfQuantitiesList}
                        agents={agents}
                        projects={projects}
                        products={products}
                    />
                    {createBillOfQuantityMutation.isError && (
                        <div className="mt-6 p-4 bg-red-50 border border-red-100 rounded-xl text-red-700 text-sm">
                        Error creating Bill Of Quantities. Please try again.
                        </div>
                    )}
                    </div>
                </div>
                )}

                {view === 'details' && (
                <BillOfQuantitiesDetails 
                    billOfQuantity={selectedBillOfQuantity}
                    isLoading={isLoadingBillOfQuantity}
                    onBack={handleBackToBillOfQuantitiesList}
                    onEdit={handleEditBillOfQuantityButton}
                />
                )}

                {view === 'edit' && selectedBillOfQuantity && (
                <BillOfQuantitiesEdit 
                    billOfQuantity={selectedBillOfQuantity}
                    onSubmit={handleUpdateBillOfQuantity}
                    isSubmitting={updateBillOfQuantityMutation.isPending}
                    onCancel={handleBackToBillOfQuantitiesList}
                    agents={agents}
                    projects={projects}
                    products={products}
                />
                )}
            </div>
            </div>
        </div>
    );
}
export default BillOfQuantitiesManagement;
