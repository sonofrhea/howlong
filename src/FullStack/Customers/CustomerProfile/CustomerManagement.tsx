
import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router-dom";




import { 
  fetchCustomers, createCustomer, 
  fetchCustomerById, updateCustomer, 
  deleteCustomer
 } from "../Engines";



import { fetchChartOfAccounts } from "../../ChartOfAccounts/Engines"
import { fetchCurrencies, fetchAgents, fetchBanks } from "../../Core/Engines"








import CustomerTable from "./CustomerTable";
import CustomerForm from "./CustomerForm";
import CustomerDetails from "./CustomerDetails";
//import CustomerEdit from "./CustomerEdit";



import { CustomerInputs, CustomerCreateResponse,
   EditCustomerInputs, AllCustomerInputs } from "../constants/Types";





interface SortConfig {
  key: string | null;
  direction: 'asc' | 'desc';
}



function CustomerManagement() {
  const queryClient = useQueryClient();
  const [view, setView] = useState('list');
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCustomerId, setSelectedCustomerId] = useState<number | null>(null);
// ------------------------------------------------------------------------------------
  const [sortConfig, setSortConfig] = useState<SortConfig>({ key: null, direction: 'asc' });
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);


  
// --------------------------------------------------------------------------------
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

  const { data: banks = [] } = useQuery({
    queryKey: ['banks'],
    queryFn: fetchBanks
  });


// ------------------------------------------------------------------------------------
                    // QUERIES

// LIST QUERIES 

  const { data: customers = [], isLoading: isLoadingCustomers, error: customersError } = useQuery({
    queryKey: ['customers'],
    queryFn: fetchCustomers
  });


  

// DETAIL QUERIES

  const { data: selectedCustomer, isLoading: isLoadingCustomer } = useQuery({
    queryKey: ['customer', selectedCustomerId],
    queryFn: () => fetchCustomerById(selectedCustomerId!),
    enabled: !!selectedCustomerId,
  });

// ------------------------------------------------------------------------------------
                  // MANIPULATIONS


      // CREATIONS - POST
  const createCustomersMutation = useMutation({
    mutationFn: createCustomer,
    onSuccess: (data: CustomerCreateResponse) => {
      const newCustomerId = data.customer_number;
      queryClient.invalidateQueries({ queryKey: ['customers'] });
      setSelectedCustomerId(newCustomerId);
      setView('details');
    },
    onError: (error: any) => {
      console.error('Error updating customer profile.', error.response?.data || error.message);
    }
  });





    // UPDATES - PUT

  const updateCustomersMutation = useMutation({
    mutationFn: updateCustomer,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['customers'] });
      queryClient.invalidateQueries({ queryKey: ['customer', selectedCustomerId] });
      setView('details');
    },
    onError: (error: any) => {
      console.error('Error updating customer profile.', error.response?.data || error.message);
    }
  });

// ------------------------------------------------------------------------------------
              // DELETE

  const deleteCustomersMutation = useMutation({
    mutationFn: deleteCustomer,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['customers'] });
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




  const handleAddCustomer = async (customerData: CustomerInputs) => {
    const newCustomerData = new FormData();

    Object.entries(customerData).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        if (value instanceof File) {
          //console.log(File.name);
          newCustomerData.append(key, value);
        } else {
          newCustomerData.append(key, String(value));
        }
      }
    });

    console.log("🎯 RAW FORM DATA:", newCustomerData);

    createCustomersMutation.mutate(newCustomerData);
  };








  const handleUpdateCustomer = (customerData: CustomerInputs) => {
    updateCustomersMutation.mutate({
      customer_number: selectedCustomerId!,
      customerData: customerData
    });
  };



  




  const handleDeleteCustomer = async (customerId: number) => {
    if (window.confirm('Are you sure you want to delete this customer?')) {
      deleteCustomersMutation.mutate(customerId);
    }
  };

// ------------------------------------------------------------------------------------
  const handleCustomerClick = (customerId: number) => {
    console.log('Customer ID being passed:', customerId);
    setSelectedCustomerId(customerId);
    setView('details');
  };

// ------------------------------------------------------------------------------------
  const handleEditCustomer = ({customerId, customerData}: EditCustomerInputs) => {
    setSelectedCustomerId(customerId);
    setView('edit');
  };

// ------------------------------------------------------------------------------------
  const handleBackToCustomersList = () => {
    setView('list');
    setSelectedCustomerId(null);
  };

// ------------------------------------------------------------------------------------
  const handleEditCustomerButton = () => {
    setView('edit');
  };

// ------------------------------------------------------------------------------------

  const filteredCustomers = customers.filter((customer: any) =>
    customer.customer_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.company_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // ------------------------------------------------------------------------------------
                              // SORTING

  // ----- CUSTOMER PROFILE
  const sortedCustomers = React.useMemo(() => {
  if (!sortConfig.key) return filteredCustomers;
  
  return [...filteredCustomers].sort((a, b) => {
    const aValue = a[sortConfig.key as keyof typeof a];
    const bValue = b[sortConfig.key as keyof typeof b];
    
    if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
    if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
    return 0;
  });
}, [filteredCustomers, sortConfig]);


// Sort handler
const handleSort = (key: any) => {
  setSortConfig(current => ({
    key,
    direction: current.key === key && current.direction === 'asc' ? 'desc' : 'asc'
  }));
};

// ------------------------------------------------------------------------------------

  // Pagination calculations for CustomerTable
  const totalCustomerPages = Math.ceil(sortedCustomers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedCustomers = sortedCustomers.slice(startIndex, startIndex + itemsPerPage);

  // Page change handler
  const handlePageChange = (page: any) => {
    setCurrentPage(page);
  };

  // Items per page handler
  const handleItemsPerPageChange = (value: any) => {
    setItemsPerPage(Number(value));
    setCurrentPage(1); // Reset to first page
  };

  // console.log('First customer object:', paginatedCustomers[0]);

// ------------------------------------------------------------------------------------


// ERROR DISPLAYS

  if (isLoadingCustomers) return (
    <div className="min-h-screen bg-white flex items-center justify-center">
    <div className="w-64">
      <div className="text-green-400 font-mono mb-2">Fetching customers...</div>

      <div className="w-full h-3 bg-gray-800 rounded overflow-hidden">
        <div className="h-full bg-green-500 animate-terminal-bar"></div>
      </div>
    </div>
  </div>
  );

  if (customersError) return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
      <div className="bg-white rounded-xl shadow-lg p-8 max-w-md text-center">
        <svg width="96" height="96" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-red-500 mb-4">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15v-2h2v2h-2zm0-4V7h2v6h-2z" fill="currentColor"/>
        </svg>
        <h2 className="text-xl font-bold text-gray-800 mb-2">Error Loading Data</h2>
        <p className="text-gray-600">Failed to load customers. Please try again.</p>
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
                          <h1 className="text-lg font-semibold text-gray-900">Customers Suite</h1>
                          <p className="text-sm text-gray-500">Customer Management</p>
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
                  <div className="w-12 h-12 bg-linear-to-br from-purple-50 to-indigo-100 rounded-2xl flex items-center justify-center border border-purple-100">
                    <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <div>
                    <h1 className="text-4xl font-medium text-gray-900 tracking-tight">Customers</h1>
                    <p className="text-gray-500 mt-2">Manage and track your customer relationships</p>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-3">

                {(view === 'form' || view === 'details' || view === 'edit') && (
                  <button
                    onClick={handleBackToCustomersList}
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
                    <div className="text-2xl font-light text-gray-900">{customers.length}</div>
                    <div className="text-sm text-gray-500">Total Customers</div>
                  </div>
                  <div className="w-px h-8 bg-gray-200"></div>
                  <div className="text-center">
                    <div className="text-2xl font-light text-gray-900">
                      {customers.filter((c: any) => c.status === 'Active').length}
                    </div>
                    <div className="text-sm text-gray-500">Active</div>
                  </div>
                  <div className="w-px h-8 bg-gray-200"></div>
                  <div className="text-center">
                    <div className="text-2xl font-light text-gray-900">
                      {new Set(customers.map((c: any) => c.currency?.currency_code)).size}
                    </div>
                    <div className="text-sm text-gray-500">Currencies</div>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search customers..."
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
                    New Customer
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Content Area */}
          {view === 'list' && (
            <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
              <CustomerTable 
                customers={paginatedCustomers}
                onCustomerClick={handleCustomerClick}
                onEditCustomer={handleEditCustomer}
                onDeleteCustomer={handleDeleteCustomer}
                sortConfig={sortConfig}
                onSort={handleSort}
                currentPage={currentPage}
                totalPages={totalCustomerPages}
                totalItems={sortedCustomers.length}
                itemsPerPage={itemsPerPage}
                onPageChange={handlePageChange}
                onItemsPerPageChange={handleItemsPerPageChange}
              />
            </div>
          )}

          {view === 'form' && (
            <div className="w-full bg-green-50 rounded-2xl shadow-sm border border-gray-200">
              <div className="bg-gray-50 border border-green-100 rounded-2xl shadow-sm p-8">
                <div className="flex items-center gap-4 mb-8 justify-between">
                  <div className="w-6 h-6 bg-green-50 rounded-xl flex items-center justify-center border border-green-100">
                    <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v16m8-8H4" />
                    </svg>
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-gray-600">Create Customer</h2>
                    <p className="text-gray-500">Add a new customer to your records</p>
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
                <CustomerForm 
                  onSubmit={handleAddCustomer} 
                  isSubmitting={createCustomersMutation.isPending}
                  onBack={handleBackToCustomersList}
                  onCancel={() => setView('list')}
                  currencies={currencies}
                  accounts={accounts}
                  agents={agents}
                  banks={banks}
                />
                {createCustomersMutation.isError && (
                  <div className="mt-6 p-4 bg-red-50 border border-red-100 rounded-xl text-red-700 text-sm">
                    Error creating customer. Please try again.
                  </div>
                )}
              </div>
            </div>
          )}

          {view === 'details' && (
            <CustomerDetails 
              customer={selectedCustomer}
              isLoading={isLoadingCustomer}
              onBack={handleBackToCustomersList}
              onEdit={handleEditCustomerButton}
            />
          )}

          {view === 'edit' && selectedCustomer && (
            <CustomerEdit 
              customer={selectedCustomer}
              onSubmit={handleUpdateCustomer}
              isSubmitting={updateCustomersMutation.isPending}
              onBack={() => setView('details')}
              onCancel={() => setView('list')}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default CustomerManagement;