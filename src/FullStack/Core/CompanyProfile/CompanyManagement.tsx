import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Link } from 'react-router-dom';

import { toast } from "react-hot-toast";


import { fetchBanks, fetchCompanyProfile, fetchCurrencies,
    patchCompanyProfile, fetchIndustryCodes } from "../Engines";


import CompanyProfileDetails from "./CompanyProfileDetails";
import CompanyProfileEdit from "./CompanyProfileEdit";


import { CompanyProfileInputs } from "../constants/Types";
import { spinningStyles } from "../constants/Styles";
import { testEInvoiceCredentials } from "../../EInvoice/Engines";
import { TestCredentialsResponse } from "../../EInvoice/constants/Types";






function CompanyManagement() {
    const queryClient = useQueryClient();
    const [view, setView] = useState('details');


    const { data: currencies = [] } = useQuery({
        queryKey: ['currencies'],
        queryFn: fetchCurrencies
    });
    const { data: banks = [] } = useQuery({
        queryKey: ['banks'],
        queryFn: fetchBanks
    });
    const { data: industryCodes = [] } = useQuery({
        queryKey: ['industryCodes'],
        queryFn: fetchIndustryCodes
    })













    const { data: selectedCompany, isLoading: isLoadingCompany, error: companyError } = useQuery({
        queryKey: ['company'],
        queryFn: fetchCompanyProfile,
    });


    // ------------------------------------------------------------------------------------
            //UPDATE

    const updateCompanyMutation = useMutation({
        mutationFn: patchCompanyProfile,
        onMutate: () => {
            toast.loading('Updating Company profile...', { id: "Update Company profile" });
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['company'] });
            toast.success('Company profile Updated', { id: "Update Company profile" });
            setView('details');
        },
        onError: (error: any) => {
            toast.error('Failed to update Company profile', { id: "Update Company profile" });
            console.error(
                'Error updating Company profile:',
                error.response?.data || error.message
            );
        }
    });

    // ------------------------------------------------------------------------------------
            //TEST CREDENTIALS

    const testCredentialsMutation = useMutation({
        mutationFn: testEInvoiceCredentials,
        onMutate: () => {
            toast.loading('Testing MyInvois credentials...', { id: 'test-credentials' });
        },
        onSuccess: (data: TestCredentialsResponse) => {
            toast.success(data.message || 'Credentials are valid!', { id: 'test-credentials', duration: 5000 });
        },
        onError: (error: any) => {
            const msg = error?.response?.data?.error || 'Credentials test failed.';
            toast.error(msg, { id: 'test-credentials', duration: 8000 });
            console.log(msg);
        }
    });


    // ------------------------------------------------------------------------------------


    const handleUpdateCompanyProfile = async (companyData: CompanyProfileInputs) => {

        if (!companyData.preferred_currency?.currency_code) {
            delete companyData.preferred_currency;
        }

        const formData = new FormData();

        Object.entries(companyData).forEach(([key, value]) => {
            if (
                key === 'company_logo' ||
                value === undefined ||
                key === 'preferred_currency' ||
                value === null
            ) return;

            formData.append(key, String(value));
        })

        if (companyData.company_logo instanceof File) {
            formData.append('company_logo', companyData.company_logo);
        };
        
        if (companyData.einvoice_certificate instanceof File) {
            formData.append('einvoice_certificate', companyData.einvoice_certificate);
        };

        if (companyData.preferred_currency?.currency_code) {
            formData.append('preferred_currency.currency_code', companyData.preferred_currency.currency_code);
            formData.append('preferred_currency.currency_name', companyData.preferred_currency.currency_name);
            formData.append('preferred_currency.currency_symbol', companyData.preferred_currency.currency_symbol);
            formData.append('preferred_currency.country', companyData.preferred_currency.country);
            formData.append('preferred_currency.buy', (companyData.preferred_currency.buy));
            formData.append('preferred_currency.sell', companyData.preferred_currency.sell);
        }

        await updateCompanyMutation.mutateAsync(formData);
    };

    // ------------------------------------------------------------------------------------

    const handleBackToCompanyDetails = () => {
        setView('details');
    };

    // ------------------------------------------------------------------------------------

        const handleBackToDashboard = () => {
        setView('/core');
    };

    // ------------------------------------------------------------------------------------


    const handleEditCompanyButton = () => {
        setView('edit');
    };

    // ------------------------------------------------------------------------------------

    const handleTestCredentials = () => {
        testCredentialsMutation.mutate();
    }

    // ------------------------------------------------------------------------------------



    // ERROR DISPLAYS

    if (isLoadingCompany) return (
        <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">fetching Company...</p>
        </div>
        </div>
    );

    if (companyError) return (
        <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
            <div className="bg-white rounded-xl shadow-lg p-8 max-w-md text-center">
                <svg width="96" height="96" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-red-500 mb-4">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15v-2h2v2h-2zm0-4V7h2v6h-2z" fill="currentColor"/>
                </svg>
                <h2 className="text-xl font-bold text-gray-800 mb-2">Error Loading Data</h2>
                <p className="text-gray-600">Failed to company data. Please try again.</p>
            </div>
        </div>
    );

    


    return(
        <div className="min-h-screen bg-[#f0f2f7]">

            <style>
                {`
                    @import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700;800;900&display=swap");
                `}
            </style>

            <div className="border-b border-gray-100" style={{ fontFamily: 'Montserrat, system-ui' }}>
                <div className="max-w-7xl mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            <span className={spinningStyles.terminalBar.spinner}>⠋</span>
                            <div>
                                <h1 className="text-lg font-semibold text-gray-900" style={{ fontFamily: 'Montserrat, system-ui' }}>
                                    Core Suite
                                </h1>
                                <p className="text-sm text-gray-500" style={{ fontFamily: 'Montserrat, system-ui' }}>
                                    Company Profile
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                        <Link 
                            to="/core"
                            className="text-sm text-black px-3 py-1 border border-gray-300 rounded-2xl transition-colors duration-200 flex items-center gap-2 hover:bg-purple-50 hover:border-purple-500 hover:shadow-md hover:-translate-y-0.5"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                            Back to Company Dashboard
                        </Link>
                        </div>
                    </div>
                </div>
            </div>

            

            {view === 'details' && (
                <CompanyProfileDetails
                    company={selectedCompany}
                    isLoading={isLoadingCompany}
                    onEdit={handleEditCompanyButton}
                    onTestCredentials={handleTestCredentials}
                    isTestingCredentials={testCredentialsMutation.isPending}
                />
            )}

            {view === 'edit' && selectedCompany && (
                <CompanyProfileEdit
                    company={selectedCompany}
                    onSubmit={handleUpdateCompanyProfile}
                    isSubmitting={updateCompanyMutation.isPending}
                    onCancel={handleBackToCompanyDetails}
                    currencies={currencies}
                    banks={banks}
                    industryCodes={industryCodes}
                />
            )}
        </div>
    );

};

export default CompanyManagement;











