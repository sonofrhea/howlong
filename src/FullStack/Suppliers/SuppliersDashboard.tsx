import React from 'react';
import { Link } from 'react-router-dom';

import { SUPPLIERS_ICONS } from './constants/ModuleIcons';

import { SuppliersModulesInterface } from './constants/Types';



function SuppliersDashboard() {
    const SuppliersModules: SuppliersModulesInterface[] = [
        {
            id: 'suppliersCategory',
            name: 'Supplier Category',
            description: 'Manage Supplier Category',
            path: '/suppliers/suppliers-categories',
            available: true
        },
        {
            id: 'suppliersProfile',
            name: 'Supplier Profile',
            description: 'Manage Supplier Profile',
            path: '/suppliers/supplier-profiles',
            available: true
        },
        {
            id: 'suppliersInvoice',
            name: 'Supplier Invoice',
            description: 'Manage Supplier Invoices',
            path: '/suppliers/supplier-invoices',
            available: true
        },
        {
            id: 'suppliersPayment',
            name: 'Supplier Payments',
            description: 'Manage Supplier Payments',
            path: '/suppliers/supplier-payments',
            available: true
        },
        {
            id: 'suppliersDebitNote',
            name: 'Supplier Debit Note',
            description: 'Manage Supplier Debit Notes',
            path: '/suppliers/supplier-debit-notes',
            available: true
        },
        {
            id: 'suppliersCreditNote',
            name: 'Supplier Credit Note',
            description: 'Manage Supplier Credit Notes',
            path: '/suppliers/supplier-credit-notes',
            available: true
        },
    ];

    return (
        <div className="min-h-screen bg-gray-50 p-4">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-3xl font-bold text-gray-900 mb-4">
                        Suppliers Management
                    </h1>
                    <p className="text-gray-600">
                        Choose a module to get started
                    </p>
                </div>

                {/* Modules Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                    {SuppliersModules.map(module => (
                        <Link
                            key={module.id}
                            to={module.available ? module.path : '#'}
                            className={`bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200 ${
                                module.available ? 'cursor-pointer' : 'cursor-not-allowed opacity-50'
                            }`}
                        >
                            {/* Icon */}
                            <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${
                                module.available ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-400'
                            }`}>
                                <ModuleIcon moduleId={module.id} />
                            </div>

                            {/* Content */}
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                {module.name}
                            </h3>
                            <p className="text-gray-600 text-sm mb-4">
                                {module.description}
                            </p>

                            {/* Status */}
                            <div className={`text-sm font-medium ${
                                module.available ? 'text-blue-600' : 'text-gray-500'
                            }`}>
                                {module.available ? 'Open Module ⟶' : 'Coming Soon'}
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}

const ModuleIcon = ({ moduleId }: {moduleId: keyof typeof SUPPLIERS_ICONS}) => {

    return SUPPLIERS_ICONS[moduleId] || null;
}
        
export default SuppliersDashboard;
