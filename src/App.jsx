import { useState, Suspense, lazy } from 'react'
import './App.css'
import { spinningStyles } from "./Authentication/Styles";
import { Toaster } from 'react-hot-toast';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

const ProtectedRoute = lazy(() => import('./components/ProtectedRoutes'));

const MarketplaceUnderDevelopment = lazy(() => import('./Landing/MarketplaceUnderDevelopment'))

const LoginForm = lazy(() => import('./Authentication/LoginForm'))
const RegistrationPage = lazy(() => import('./Authentication/RegistrationForm'))


const MarketplaceRegister = lazy(() => import('./Authentication/MarketplaceRegistrationForm'))
const MarketplaceLogin = lazy(() => import('./Authentication/MarketplaceLoginForm'))




const MarketplaceLanding = lazy(() => import('./Landing/MarketplaceLanding'))
const Landing = lazy(() => import('./Landing/MainLanding/Landing'))
import Layout from './components/Layout';
const PricingPage = lazy(() => import('./Landing/MainLanding/PricingPage'))
const ProjectFeature = lazy(() => import('./Landing/MainLanding/ProjectFeature'))
const ClientFeature = lazy(() => import('./Landing/MainLanding/ClientFeature'))
const AccountingFeature = lazy(() => import('./Landing/MainLanding/AccountingFeature'))
const SupplierFeature = lazy(() => import('./Landing/MainLanding/SupplierFeature'))
const ReportsFeature = lazy(() => import('./Landing/MainLanding/ReportsFeature'))
const ContactUs = lazy(() => import('./Landing/MainLanding/ContactUs'))



import { useSessionTimeout } from './Authentication/UseSessionTimeout';
import SessionTimeoutModal from './components/Modals/SessionTimeoutModal';






const Dashboard = lazy(() => import('./components/Dashboard'))
const MainPage = lazy(() => import('../src/components/MainPage'))

// -------------------begin---------CUSTOMERS--------------------------------------------

const CustomerDashboard = lazy(() => import('./FullStack/Customers/CustomerDashboard'))
const CustomerManagement = lazy(() => import('./FullStack/Customers/CustomerProfile/CustomerManagement'))
const RefundManagement = lazy(() => import('./FullStack/Customers/CustomerRefund/RefundManagement'))
const DebitNoteManagement = lazy(() => import('./FullStack/Customers/CustomerDebitNote/DebitNoteManagement'))
const CreditNoteManagement = lazy(() => import('./FullStack/Customers/CustomerCreditNote/CreditNoteManagement'))

// -------------------end---------CUSTOMERS--------------------------------------------
///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////
// -------------------begin---------PURCHASES--------------------------------------------

const PurchasesDashboard = lazy(() => import('./FullStack/Purchases/PurchasesDashboard'))
const CompanyPurchaseOrderManagement = lazy(() => import('./FullStack/Purchases/CompanyPurchaseOrder/CompanyPurchaseOrderManagement'))
const CompanyPurchaseInvoiceManagement = lazy(() => import('./FullStack/Purchases/CompanyPurchaseInvoice/CompanyPurchaseInvoiceManagement'))

// -------------------end---------PURCHASES--------------------------------------------
///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////
// -------------------begin---------SALES--------------------------------------------

const SalesDashboard = lazy(() => import('./FullStack/Sales/SalesDashboard'))
const QuotationManagement = lazy(() => import('./FullStack/Sales/Quotation/QuotationManagement'))
const InvoiceManagement = lazy(() => import('./FullStack/Sales/Invoice/InvoiceManagement'))
const InvoicePaymentManagement = lazy(() => import('./FullStack/Sales/InvoicePayment/InvoicePaymentManagement'))
const CustomerPaymentManagement = lazy(() => import('./FullStack/Sales/CustomerPayment/CustomerPaymentManagement'))

// -------------------end---------SALES--------------------------------------------
///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////
// -------------------begin---------ACCOUNTING--------------------------------------------

const AccountingDashboard = lazy(() => import('./FullStack/Accounting/AccountingDashboard'))
const ReceiptVoucherManagement = lazy(() => import('./FullStack/Accounting/ReceiptVoucher/ReceiptVoucherManagement'))
const JournalEntryManagement = lazy(() => import('./FullStack/Accounting/JournalEntry/JournalEntryManagement'))
const BankStatementManagement = lazy(() => import('./FullStack/Accounting/BankStatement/BankStatementManagement'))
const PaymentVoucherManagement = lazy(() => import('./FullStack/Accounting/PaymentVoucher/PaymentVoucherManagement'))
const IncomeAndExpensesManagement = lazy(() => import('./FullStack/Accounting/IncomeAndExpenses/IncomeAndExpensesManagement'))
const CashBookManagement = lazy(() => import('./FullStack/Accounting/CashBook/CashBookManagement'))

// -------------------end---------ACCOUNTING--------------------------------------------
///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////
// -------------------begin---------PROJECTS--------------------------------------------

const ProjectsDashboard = lazy(() => import('./FullStack/Projects/ProjectsDashboard'))
const ProjectsProfileManagement = lazy(() => import('./FullStack/Projects/ProjectsProfile/ProjectsProfileManagement'))
const ProjectDocumentsManagement = lazy(() => import('./FullStack/Projects/ProjectDocuments/ProjectDocumentsManagement'))
const JobCostLedgerManagement = lazy(() => import('./FullStack/Projects/JobCostLedger/JobCostLedgerManagement'))
const BillOfQuantitiesManagement = lazy(() => import('./FullStack/Projects/BillOfQuantities/BillOfQuantitiesManagement'))

// -------------------end---------PROJECTS--------------------------------------------
///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////
// -------------------begin---------CORE--------------------------------------------

const CoreDashboard = lazy(() => import('./FullStack/Core/CoreDashboard'))
const CompanyManagement = lazy(() => import('./FullStack/Core/CompanyProfile/CompanyManagement'))
//const UsersManagement = lazy(() => import('./FullStack/Core/Users/UsersManagement'))
const UserProfileManagement = lazy(() => import('./FullStack/Core/UserProfile/UserProfileManagement'))

// -------------------end---------CORE--------------------------------------------
///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////
// -------------------begin---------PRODUCTS--------------------------------------------

const ProductsDashboard = lazy(() => import('./FullStack/Products/ProductsDashboard'))
const ProductGroupManagement = lazy(() => import('./FullStack/Products/ProductGroup/ProductGroupManagement'))
const ProductItemManagement = lazy(() => import('./FullStack/Products/ProductItem/ProductItemManagement'))

// -------------------end---------PRODUCTS--------------------------------------------
///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////
// -------------------begin---------SUPPLIERS--------------------------------------------

const SuppliersDashboard = lazy(() => import('./FullStack/Suppliers/SuppliersDashboard'))
const SupplierPaymentManagement = lazy(() => import('./FullStack/Suppliers/SupplierPayment/SupplierPaymentManagement'))
const SupplierInvoiceManagement = lazy(() => import('./FullStack/Suppliers/SupplierInvoice/SupplierInvoiceManagement'))
const SupplierProfileManagement = lazy(() => import('./FullStack/Suppliers/SupplierProfile/SupplierProfileManagement'))
const SupplierDebitNoteManagement = lazy(() => import('./FullStack/Suppliers/SupplierDebitNote/SupplierDebitNoteManagement'))
const SupplierCreditNoteManagement = lazy(() => import('./FullStack/Suppliers/SupplierCreditNote/SupplierCreditNoteManagement'))
const SupplierCategoryManagement = lazy(() => import('./FullStack/Suppliers/SupplierCategory/SupplierCategoryManagement'))

// -------------------end---------SUPPLIERS--------------------------------------------
///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////
// -------------------begin---------REPORTS--------------------------------------------

const ReportsAndReceiptsDashboard = lazy(() => import('./FullStack/Reports/ReportsAndRecordsDashboard'))
const GeneralLedgerManagement = lazy(() => import('./FullStack/Reports/Reports/GeneralLedger/GeneralLedgerManagement'))
const TrialBalanceManagement = lazy(() => import('./FullStack/Reports/Reports/TrialBalance/TrialBalanceManagement'))
const IncomeStatementManagement = lazy(() => import('./FullStack/Reports/Reports/IncomeStatement/IncomeStatementManagement'))
const BalanceSheetManagement = lazy(() => import('./FullStack/Reports/Reports/BalanceSheet/BalanceSheetManagement'))
const CashFlowManagement = lazy(() => import('./FullStack/Reports/Reports/CashFlow/CashFlowManagement'))

// -------------------end---------REPORTS--------------------------------------------
///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////
// -------------------begin---------CHARTS--------------------------------------------


// -------------------end---------REPORTS--------------------------------------------



























function SessionHandler() {
  const timeoutProps = useSessionTimeout();
  if (!timeoutProps) return null;
  return <SessionTimeoutModal {...timeoutProps} />;
}








function App() {
  return (
    <>
    <Toaster position="top-center" />
      <Router>
        <div className="App">
          <SessionHandler />

          <Routes>
            {/* Default route */}
            <Route path="/" element={<Navigate to="/home" replace />} />


            <Route path='/home' element={
              <Suspense fallback={<div></div>}>
                <Landing />
              </Suspense>
            } />


            {/* Marketplace landing page */}
            <Route path='/marketplace' element={
              <Suspense fallback={<div></div>}>
                <MarketplaceLanding />
              </Suspense>
            } />



            <Route path='/pricing' element={
              <Suspense fallback={<div></div>}>
                <PricingPage />
              </Suspense>
            } />


            <Route path='/project-feature' element={
              <Suspense fallback={<div></div>}>
                <ProjectFeature />
              </Suspense>
            } />


            <Route path='/client-feature' element={
              <Suspense fallback={<div></div>}>
                <ClientFeature />
              </Suspense>
            } />


            <Route path='/accounting-feature' element={
              <Suspense fallback={<div></div>}>
                <AccountingFeature />
              </Suspense>
            } />


            <Route path='/supplier-feature' element={
              <Suspense fallback={<div></div>}>
                <SupplierFeature />
              </Suspense>
            } />


            <Route path='/reports-feature' element={
              <Suspense fallback={<div></div>}>
                <ReportsFeature />
              </Suspense>
            } />


            <Route path='/contact-us' element={
              <Suspense fallback={<div></div>}>
                <ContactUs />
              </Suspense>
            } />









            {/* Login route */}
            <Route path='/login' element={
              <Suspense fallback={<div></div>}>
                <LoginForm />
              </Suspense>
            } />


            {/* Marketplace login */}
            <Route path='/marketplace-login' element={
              <Suspense fallback={<div></div>}>
                <MarketplaceLogin />
              </Suspense>
            } />
            

            
            {/* Registration route */}
            <Route path='/register' element={
              <Suspense fallback={<div></div>}>
                <RegistrationPage />
              </Suspense>
            } />





            {/* Marketplace Registration */}
            <Route path='marketplace-register' element={
              <Suspense fallback={<div></div>}>
                <MarketplaceRegister />
              </Suspense>
            } />


            <Route path='/marketplace/home' element={
              <Suspense fallback={<div></div>}>
                <MarketplaceUnderDevelopment />
              </Suspense>
            } />
            


          
            
            
            
            
            {/* ALL OTHER ROUTES - WITH layout */}
            

              
            <Route element={
              <Suspense fallback={<div>Checking authorization...</div>}>
                <ProtectedRoute />
              </Suspense>
              } >




                {/* MAIN PAGE */}
              <Route path='/mainpage' element={
                <Suspense fallback={<div>fetching...</div>}>
                  <MainPage />
                </Suspense>
              } />

                {/* DASHBOARD */}
              <Route path='/dashboard' element={
                <Suspense fallback={<div>Authorizing...</div>}>
                  <Dashboard />
                </Suspense>
              } />





              {/* CORE */}
              <Route path='/core' element={
                <Suspense fallback={<div>fetching...</div>}>
                  <Layout>
                    <CoreDashboard />
                  </Layout>
                </Suspense>
              } />

              <Route path="/core/company/profile" element={
                <Suspense fallback={<div>fetching...</div>}>
                  <Layout>
                  <CompanyManagement />
                </Layout>
                </Suspense>
                
              }/>

              <Route path="/core/users/profile" element={
                <Suspense fallback={<div>fetching...</div>}>
                  <Layout>
                  <UserProfileManagement />
                </Layout>
                </Suspense>
                
              }/>



              




              {/* CUSTOMERS */}
              <Route path="/customers" element={
                <Suspense fallback={<div>fetching...</div>}>
                  <Layout>
                    <CustomerDashboard />
                  </Layout>
                </Suspense>
              } />

              <Route path="/customers/customers-profile" element={
                <Suspense fallback={<div>fetching...</div>} >
                  <Layout>
                    <CustomerManagement />
                  </Layout>
                </Suspense>
                
              } />

              <Route path="/customers/debit-note" element={
                <Suspense fallback={<div>fetching...</div>}>
                  <Layout>
                    <DebitNoteManagement />
                  </Layout>
                </Suspense>
                
              } />

              <Route path='/customers/credit-note' element={
                <Suspense fallback={<div>fetching...</div>}>
                  <Layout>
                    <CreditNoteManagement />
                  </Layout>
                </Suspense>
                
              } />

              <Route path="/customers/refund" element={
                <Suspense fallback={<div>fetching...</div>}>
                  <Layout>
                    <RefundManagement />
                  </Layout>
                </Suspense>
                
              } />








                  {/* PRODUCTS */}

              
              <Route path="/products" element={
                <Suspense fallback={<div>fetching...</div>}>
                  <Layout>
                    <ProductsDashboard title="Product Management" />
                  </Layout>
                </Suspense>
              } />

              <Route path="/products/product-group" element={
                <Suspense fallback={<div>fetching...</div>}>
                  <Layout>
                    <ProductGroupManagement />
                  </Layout>
                </Suspense>
              } />

              <Route path="/products/product-item" element={
                <Suspense fallback={<div>fetching...</div>}>
                  <Layout>
                    <ProductItemManagement />
                  </Layout>
                </Suspense>
              } />









                            {/* SALES */}

              
              <Route path="/sales" element={
                <Suspense fallback={<div>fetching...</div>}>
                  <Layout>
                    <SalesDashboard title="Sales Management" />
                  </Layout>
                </Suspense>
              } />

              <Route path="/sales/quotations" element={
                <Suspense fallback={<div>fetching...</div>}>
                  <Layout>
                    <QuotationManagement />
                  </Layout>
                </Suspense>
              } />

              <Route path="/sales/invoices" element={
                <Suspense fallback={<div>fetching...</div>} >
                  <Layout>
                    <InvoiceManagement />
                  </Layout>
                </Suspense>
              } />

              <Route path="/sales/invoice-payments" element={
                <Suspense fallback={<div>fetching...</div>} >
                  <Layout>
                    <InvoicePaymentManagement />
                  </Layout>
                </Suspense>
              } />

              <Route path="/sales/customer-payments" element={
                <Suspense fallback={<div>fetching...</div>} >
                  <Layout>
                    <CustomerPaymentManagement />
                  </Layout>
                </Suspense>
              } />














              {/* PURCHASES */}

              <Route path="/purchases" element={
                <Suspense fallback={<div>fetching...</div>} >
                  <Layout>
                    <PurchasesDashboard title="Company Purchases Management" />
                  </Layout>
                </Suspense>
              } />

              <Route path="/purchases/company-purchase-invoice" element={
                <Suspense fallback={<div>fetching...</div>} >
                  <Layout>
                    <CompanyPurchaseInvoiceManagement />
                  </Layout>
                </Suspense>
              } />

              <Route path="/purchases/company-purchase-order" element={
                <Suspense fallback={<div>fetching...</div>} >
                  <Layout>
                    <CompanyPurchaseOrderManagement />
                  </Layout>
                </Suspense>
              } />














                {/* PROJECTS */}
              
              <Route path="/projects" element={
                <Suspense fallback={<div>fetching...</div>}>
                  <Layout>
                    <ProjectsDashboard title="Project Management" />
                  </Layout>
                </Suspense>
                
              } />

              <Route path="/projects/project" element={
                <Suspense fallback={<div>fetching...</div>} >
                  <Layout>
                    <ProjectsProfileManagement />
                  </Layout>
                </Suspense>
              } />

              <Route path="/projects/project-documents" element={
                <Suspense fallback={<div>fetching...</div>} >
                  <Layout>
                    <ProjectDocumentsManagement />
                  </Layout>
                </Suspense>
              } />

              <Route path="/projects/job-cost-ledger" element={
                <Suspense fallback={<div>fetching...</div>} >
                  <Layout>
                    <JobCostLedgerManagement />
                  </Layout>
                </Suspense>
              } />

              <Route path="/projects/bill-of-quantities" element={
                <Suspense fallback={<div>fetching...</div>}>
                  <Layout>
                    <BillOfQuantitiesManagement />
                  </Layout>
                </Suspense>
              } />














                {/* SUPPLIERS */}

              <Route path="/suppliers" element={
                <Suspense fallback={<div>fetching...</div>} >
                  <Layout>
                    <SuppliersDashboard title="Suppliers Management" />
                  </Layout>
                </Suspense>
              } />

              <Route path="/suppliers/suppliers-categories" element={
                <Suspense fallback={<div>fetching...</div>} >
                  <Layout>
                    <SupplierCategoryManagement />
                  </Layout>
                </Suspense>
              } />

              <Route path="/suppliers/supplier-profiles" element={
                <Suspense fallback={<div>fetching...</div>} >
                  <Layout>
                    <SupplierProfileManagement />
                  </Layout>
                </Suspense>
              } />

              <Route path="/suppliers/supplier-invoices" element={
                <Suspense fallback={<div>fetching...</div>} >
                  <Layout>
                    <SupplierInvoiceManagement />
                  </Layout>
                </Suspense>
              } />

              <Route path="/suppliers/supplier-payments" element={
                <Suspense fallback={<div>fetching...</div>}>
                  <Layout>
                    <SupplierPaymentManagement />
                  </Layout>
                </Suspense>
              } />

              <Route path="/suppliers/supplier-debit-notes" element={
                <Suspense fallback={<div>fetching...</div>}>
                  <Layout>
                    <SupplierDebitNoteManagement />
                  </Layout>
                </Suspense>
              } />

              <Route path="/suppliers/supplier-credit-notes" element={
                <Suspense fallback={<div>fetching...</div>}>
                  <Layout>
                    <SupplierCreditNoteManagement />
                  </Layout>
                </Suspense>
                
              } />














                {/* ACCOUNTING */}

              <Route path="/accounting" element={
                <Suspense fallback={<div>fetching...</div>}>
                  <Layout>
                    <AccountingDashboard title="Accounting & Finance Management" />
                  </Layout>
                </Suspense>
              } />


              <Route path="/accounting/journal-entries" element={
                <Suspense fallback={<div>fetching...</div>}>
                  <Layout>
                    <JournalEntryManagement />
                  </Layout>
                </Suspense>
                
              } />


              <Route path="/accounting/income-and-expenses" element={
                <Suspense fallback={<div>fetching...</div>}>
                  <Layout>
                    <IncomeAndExpensesManagement />
                  </Layout>
                </Suspense>
                
              } />

              <Route path="/accounting/cashbook" element={
                <Suspense fallback={<div>fetching...</div>}>
                  <Layout>
                    <CashBookManagement />
                  </Layout>
                </Suspense>
                
              } />

              <Route path="/accounting/payment-vouchers" element={
                <Suspense fallback={<div>fetching...</div>}>
                  <Layout>
                    <PaymentVoucherManagement />
                  </Layout>
                </Suspense>
                
              } />

              <Route path="/accounting/receipt-vouchers" element={
                <Suspense fallback={<div>fetching...</div>}>
                  <Layout>
                    <ReceiptVoucherManagement />
                  </Layout>
                </Suspense>
                
              } />

              <Route path="/accounting/bank-statements" element={
                <Suspense fallback={<div>fetching...</div>}>
                  <Layout>
                    <BankStatementManagement />
                  </Layout>
                </Suspense>
              } />














                {/* REPORTS AND RECEIPTS */}

              <Route path="/reports" element={
                <Suspense fallback={<div>fetching...</div>}>
                  <Layout>
                    <ReportsAndReceiptsDashboard title="Reports & Receipts" />
                  </Layout>
                </Suspense>
              } />

              <Route path="/reports/general-ledger" element={
                <Suspense fallback={<div>fetching...</div>}>
                  <Layout>
                    <GeneralLedgerManagement />
                  </Layout>
                </Suspense>
              } />

              <Route path="/reports/trial-balance" element={
                <Suspense fallback={<div>fetching...</div>}>
                   <Layout>
                    <TrialBalanceManagement />
                  </Layout>
                </Suspense>
               
              } />

              <Route path="/reports/income-statement" element={
                <Suspense fallback={<div>fetching...</div>}>
                  <Layout>
                    <IncomeStatementManagement />
                  </Layout>
                </Suspense>
              } />

              <Route path="/reports/balance-sheet" element={
                <Suspense fallback={<div>fetching...</div>}>
                  <Layout>
                    <BalanceSheetManagement />
                  </Layout>
                </Suspense>
                
              } />

              <Route path="/reports/cashflow" element={
                <Suspense fallback={<div>fetching...</div>}>
                <Layout>
                  <CashFlowManagement />
                </Layout>
                </Suspense>
              } />

              <Route path="/reports/receipt-records" element={
                <Suspense fallback={<div>fetching...</div>}>
                <Layout>
                  <ComingSoon />
                </Layout>
                </Suspense>
              } />




            </Route>









            
          </Routes>
        </div>
      </Router>
    </>
  );
}




export function ComingSoon() {
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




