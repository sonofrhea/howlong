import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import LoginForm from './FullStack/Core/LoginForm';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';











// -------------------begin---------CUSTOMERS--------------------------------------------

import CustomerDashboard from './FullStack/Customers/CustomerDashboard';
import CustomerManagement from "./FullStack/Customers/CustomerProfile/CustomerManagement";
import RefundManagement from './FullStack/Customers/CustomerRefund/RefundManagement';
import DebitNoteManagement from './FullStack/Customers/CustomerDebitNote/DebitNoteManagement';
import CreditNoteManagement from './FullStack/Customers/CustomerCreditNote/CreditNoteManagement';

// -------------------end---------CUSTOMERS--------------------------------------------
///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////
// -------------------begin---------PURCHASES--------------------------------------------

import PurchasesDashboard from './FullStack/Purchases/PurchasesDashboard';
import CompanyPurchaseOrderManagement from './FullStack/Purchases/CompanyPurchaseOrder/CompanyPurchaseOrderManagement';
import CompanyPurchaseInvoiceManagement from './FullStack/Purchases/CompanyPurchaseInvoice/CompanyPurchaseInvoiceManagement';


// -------------------end---------PURCHASES--------------------------------------------
///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////
// -------------------begin---------SALES--------------------------------------------

import SalesDashboard from './FullStack/Sales/SalesDashboard';
import QuotationManagement from './FullStack/Sales/Quotation/QuotationManagement';
import InvoiceManagement from './FullStack/Sales/Invoice/InvoiceManagement';
import InvoicePaymentManagement from './FullStack/Sales/InvoicePayment/InvoicePaymentManagement';
import CustomerPaymentManagement from './FullStack/Sales/CustomerPayment/CustomerPaymentManagement';

// -------------------end---------SALES--------------------------------------------
///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////
// -------------------begin---------ACCOUNTING--------------------------------------------

import AccountingDashboard from './FullStack/Accounting/AccountingDashboard';
import ReceiptVoucherManagement from './FullStack/Accounting/ReceiptVoucher/ReceiptVoucherManagement';
//import JournalManagement from './FullStack/Accounting/Journal/JournalManagement';
import BankStatementManagement from './FullStack/Accounting/BankStatement/BankStatementManagement';
import PaymentVoucherManagement from './FullStack/Accounting/PaymentVoucher/PaymentVoucherManagement';
import IncomeAndExpensesManagement from './FullStack/Accounting/IncomeAndExpenses/IncomeAndExpensesManagement';
import CashBookManagement from './FullStack/Accounting/CashBook/CashBookManagement';

// -------------------end---------ACCOUNTING--------------------------------------------
///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////
// -------------------begin---------PROJECTS--------------------------------------------

import ProjectsDashboard from './FullStack/Projects/ProjectsDashboard';
import ProjectsProfileManagement from './FullStack/Projects/ProjectsProfile/ProjectsProfileManagement';
import ProjectDocumentsManagement from './FullStack/Projects/ProjectDocuments/ProjectDocumentsManagement';
import JobCostLedgerManagement from './FullStack/Projects/JobCostLedger/JobCostLedgerManagement';
import BillOfQuantitiesManagement from './FullStack/Projects/BillOfQuantities/BillOfQuantitiesManagement';

// -------------------end---------PROJECTS--------------------------------------------
///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////
// -------------------begin---------CORE--------------------------------------------


// -------------------end---------CORE--------------------------------------------
///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////
// -------------------begin---------PRODUCTS--------------------------------------------

import ProductsDashboard from './FullStack/Products/ProductsDashboard';
import ProductGroupManagement from './FullStack/Products/ProductGroup/ProductGroupManagement';
import ProductItemManagement from './FullStack/Products/ProductItem/ProductItemManagement';

// -------------------end---------PRODUCTS--------------------------------------------
///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////
// -------------------begin---------SUPPLIERS--------------------------------------------

import SuppliersDashboard from './FullStack/Suppliers/SuppliersDashboard';
import SupplierPaymentManagement from './FullStack/Suppliers/SupplierPayment/SupplierPaymentManagement';
import SupplierInvoiceManagement from './FullStack/Suppliers/SupplierInvoice/SupplierInvoiceManagement';
import SupplierProfileManagement from './FullStack/Suppliers/SupplierProfile/SupplierProfileManagement';
import SupplierDebitNoteManagement from './FullStack/Suppliers/SupplierDebitNote/SupplierDebitNoteManagement';
import SupplierCreditNoteManagement from './FullStack/Suppliers/SupplierCreditNote/SupplierCreditNoteManagement';
import SupplierCategoryManagement from './FullStack/Suppliers/SupplierCategory/SupplierCategoryManagement';

// -------------------end---------SUPPLIERS--------------------------------------------
///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////
// -------------------begin---------REPORTS--------------------------------------------

import ReportsAndReceiptsDashboard from './FullStack/Reports/ReportsAndRecordsDashboard';
import GeneralLedgerManagement from './FullStack/Reports/Reports/GeneralLedger/GeneralLedgerManagement';

// -------------------end---------REPORTS--------------------------------------------




































function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Default route */}
          <Route path="/" element={<Navigate to="/login" replace />} />

          {/* Login route */}
          <Route path='/login' element={<LoginForm />} />
          
          {/* Dashboard route - no layout  */}
          <Route path="/dashboard" element={<Dashboard />} />
          
          
          {/* ALL OTHER ROUTES - WITH layout */}




          {/* CUSTOMERS */}

          <Route path="/customers" element={
            <Layout>
              <CustomerDashboard />
            </Layout>
          } />

          <Route path="/customers/customers-profile" element={
            <Layout>
              <CustomerManagement />
            </Layout>
          } />

          <Route path="/customers/debit-note" element={
            <Layout>
              <DebitNoteManagement />
            </Layout>
          } />

          <Route path='/customers/credit-note' element={
            <Layout>
              <CreditNoteManagement />
            </Layout>
          } />

          <Route path="/customers/refund" element={
            <Layout>
              <RefundManagement />
            </Layout>
          } />










              {/* PRODUCTS */}

          
          <Route path="/products" element={
            <Layout>
              <ProductsDashboard title="Product Management" />
            </Layout>
          } />

          <Route path="/products/product-group" element={
            <Layout>
              <ProductGroupManagement />
            </Layout>
          } />

          <Route path="/products/product-item" element={
            <Layout>
              <ProductItemManagement />
            </Layout>
          } />









                        {/* SALES */}

          
          <Route path="/sales" element={
            <Layout>
              <SalesDashboard title="Sales Management" />
            </Layout>
          } />

          <Route path="/sales/quotations" element={
            <Layout>
              <QuotationManagement />
            </Layout>
          } />

          <Route path="/sales/invoices" element={
            <Layout>
              <InvoiceManagement />
            </Layout>
          } />

          <Route path="/sales/invoice-payments" element={
            <Layout>
              <InvoicePaymentManagement />
            </Layout>
          } />

          <Route path="/sales/customer-payments" element={
            <Layout>
              <CustomerPaymentManagement />
            </Layout>
          } />














          {/* PURCHASES */}

          <Route path="/purchases" element={
            <Layout>
              <PurchasesDashboard title="Company Purchases Management" />
            </Layout>
          } />

          <Route path="/purchases/company-purchase-invoice" element={
            <Layout>
              <CompanyPurchaseInvoiceManagement />
            </Layout>
          } />

          <Route path="/purchases/company-purchase-order" element={
            <Layout>
              <CompanyPurchaseOrderManagement />
            </Layout>
          } />














            {/* PROJECTS */}
          
          <Route path="/projects" element={
            <Layout>
              <ProjectsDashboard title="Project Management" />
            </Layout>
          } />

          <Route path="/projects/project" element={
            <Layout>
              <ProjectsProfileManagement />
            </Layout>
          } />

          <Route path="/projects/project-documents" element={
            <Layout>
              <ProjectDocumentsManagement />
            </Layout>
          } />

          <Route path="/projects/job-cost-ledger" element={
            <Layout>
              <JobCostLedgerManagement />
            </Layout>
          } />

          <Route path="/projects/bill-of-quantities" element={
            <Layout>
              <BillOfQuantitiesManagement />
            </Layout>
          } />














            {/* SUPPLIERS */}

          <Route path="/suppliers" element={
            <Layout>
              <SuppliersDashboard title="Suppliers Management" />
            </Layout>
          } />

          <Route path="/suppliers/suppliers-categories" element={
            <Layout>
              <SupplierCategoryManagement />
            </Layout>
          } />

          <Route path="/suppliers/supplier-profiles" element={
            <Layout>
              <SupplierProfileManagement />
            </Layout>
          } />

          <Route path="/suppliers/supplier-invoices" element={
            <Layout>
              <SupplierInvoiceManagement />
            </Layout>
          } />

          <Route path="/suppliers/supplier-payments" element={
            <Layout>
              <SupplierPaymentManagement />
            </Layout>
          } />

          <Route path="/suppliers/supplier-debit-notes" element={
            <Layout>
              <SupplierDebitNoteManagement />
            </Layout>
          } />

          <Route path="/suppliers/supplier-credit-notes" element={
            <Layout>
              <SupplierCreditNoteManagement />
            </Layout>
          } />














            {/* ACCOUNTING */}

          <Route path="/accounting" element={
            <Layout>
              <AccountingDashboard title="Accounting & Finance Management" />
            </Layout>
          } />


          <Route path="/accounting/income-and-expenses" element={
            <Layout>
              <IncomeAndExpensesManagement />
            </Layout>
          } />

          <Route path="/accounting/cashbook" element={
            <Layout>
              <CashBookManagement />
            </Layout>
          } />

          <Route path="/accounting/payment-vouchers" element={
            <Layout>
              <PaymentVoucherManagement />
            </Layout>
          } />

          <Route path="/accounting/receipt-vouchers" element={
            <Layout>
              <ReceiptVoucherManagement />
            </Layout>
          } />

          <Route path="/accounting/bank-statements" element={
            <Layout>
              <BankStatementManagement />
            </Layout>
          } />














            {/* REPORTS AND RECEIPTS */}

          <Route path="/reports" element={
            <Layout>
              <ReportsAndReceiptsDashboard title="Reports & Receipts" />
            </Layout>
          } />

          <Route path="/reports/general-ledger" element={
            <Layout>
              <GeneralLedgerManagement />
            </Layout>
          } />

          <Route path="/reports/trial-balance" element={
            <Layout>
              <ComingSoon />
            </Layout>
          } />

          <Route path="/reports/income-statement" element={
            <Layout>
              <ComingSoon />
            </Layout>
          } />

          <Route path="/reports/balance-sheet" element={
            <Layout>
              <ComingSoon />
            </Layout>
          } />

          <Route path="/reports/cashflow" element={
            <Layout>
              <ComingSoon />
            </Layout>
          } />

          <Route path="/reports/receipt-records" element={
            <Layout>
              <ComingSoon />
            </Layout>
          } />














          
          {/* Add more routes with Layout wrapper */}
        </Routes>
      </div>
    </Router>
  );
}




function ComingSoon() {
  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Coming Soon!</h1>
        <p className="text-gray-600">This feature is under development</p>
      </div>
    </div>
  );
}

export default App;




