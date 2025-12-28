import React, { useState } from "react";


import { BusinessAppInterface, DashboardInterface } from "./LayoutTypes";

export const BUSINESS_APPS: BusinessAppInterface[] = [
    { id: 'customers', name: 'Customers', path: '/customers', available: true },
    { id: 'products', name: 'Products', path: '/products', available: true },
    { id: 'sales', name: 'Sales', path: '/sales', available: true },
    { id: 'suppliers', name: 'Suppliers', path: '/suppliers', available: true },
    { id: 'accounting', name: 'Accounting', path: '/accounting', available: true },
    { id: 'projects', name: 'Projects', path: '/projects', available: true },
    { id: 'purchases', name: 'Purchases', path: '/purchases', available: true },
    { id: 'reports', name: 'Reports', path: '/reports', available: false },
    { id: 'core', name: 'HR & Workers', path: '/core', available: false },
];



export const DASHBOARD_APPS: DashboardInterface[] = [
    { 
      id: 'customers', 
      name: 'Customer Management', 
      description: 'Manage customer database', 
      path: '/customers',
      available: true
    },
    { 
      id: 'products',
      name: 'Product Management', 
      description: 'Manage products database', 
      path: '/products',
      available: true
    },
    { 
      id: 'sales', 
      name: 'Sales Management', 
      description: 'Manage sales database', 
      path: '/sales',
      available: true
    },
    { 
      id: 'suppliers', 
      name: 'Supplier Management', 
      description: 'Manage suppliers database', 
      path: '/suppliers',
      available: true
    },
    { 
      id: 'accounting', 
      name: 'Accounting & Finance', 
      description: 'Manage company accounting & finance', 
      path: '/accounting',
      available: true
    },
    { 
      id: 'projects', 
      name: 'Project Management', 
      description: 'Manage company projects database', 
      path: '/projects',
      available: true
    },
    { 
      id: 'purchases', 
      name: 'Purchases Management', 
      description: 'Manage company purchases database', 
      path: '/purchases',
      available: true
    },
    { 
      id: 'reports', 
      name: 'Reports & Analytics', 
      description: 'Access all company reports', 
      path: '/reports',
      available: false
    },
    { 
      id: 'core', 
      name: 'HR & Workforce', 
      description: 'Access company workforce', 
      path: '/core',
      available: false
    },
  ]