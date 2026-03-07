import React, { useMemo, useState } from "react";
import { useForm } from "react-hook-form";


import { CurrencyInterface, AgentInterface} from "../../Core/constants/Types";
import { ControlAccountInterface } from "../../ChartOfAccounts/Interfaces";
import { CustomerPaymentInputs, 
    CustomerPaymentProps, InvoicePaymentInterface } from "../Constants/Types";
import { ProjectProfileResponse } from "../../Projects/constants/Types";
import { buttons, forms, labelStyles, layout, tables, text, utils } from "../Constants/Styles";
import { CustomerCreateResponse } from "../../Customers/constants/Types";


import { controlAccountHandler, invoicePaymentHandler } from "../../handlers";
import JournalEntryModal from "../../Accounting/JournalEntry/JournalEntryModal";


const decimalPlaces = (amount: number) => {
    return `${amount.toFixed(2)}`;
};


const formatPaymentNumber = () => {
    return `PAY-`;
};

const formatCustomerNumber = () => {
    const currentYear = new Date().getFullYear();
    return `CV-${currentYear}-`;
};

const formatProjectNumber = () => {
    const currentYear = new Date().getFullYear();
    return `PZN-${currentYear}-`;
};











const CustomerPaymentEdit: React.FC<CustomerPaymentProps> = ({
    customerPayment,
    onSubmit,
    isSubmitting,
    onCancel,
    currencies, accounts, agents, customers, invoicePayments, projects,
    onCreateJournalEntry, isCreatingJournalEntry
}) => {
    const [isJournalEntryOpen, setIsJournalEntryOpen] = useState(false);
    const customerPaymentId = customerPayment?.payment_number;


    const { register, handleSubmit, watch, setValue, control, 
        reset, formState: { errors } } = useForm<CustomerPaymentInputs>({
            defaultValues: customerPayment
        });

    
    React.useEffect(() => {

        const updated = {
            ...customerPayment,
            date: customerPayment.date
                ? new Date(customerPayment.date).toISOString().split("T")[0]
                : "",
        }

        reset(updated);
    }, [customerPayment, reset]);







    
    const controlAccountChange = controlAccountHandler(accounts, setValue);
    const invoicePaymentChange = invoicePaymentHandler(invoicePayments, setValue);
    
            
    
    
    
    
    
    
    
    
    
    
    
            
    
            
    
    
    
    
    return(
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className={forms.body}>
                <div className={layout.header}>
                    <div className={layout.tag}>

                        <div className="text-right">
                            <div>
                                <h1 className={text.badgeExtraLargeBlack}>CUSTOMER PAYMENT</h1>
                                <p className="text-sm text-gray-500 mt-1">Official Record of Payment Already Posted</p>
                            </div>
                            <div className={layout.badge}>
                                <p className={text.badgeLarge}>
                                    PAYMENT DETAILS
                                </p>
                                <p className={labelStyles}>
                                    POST-{customerPayment.payment_number}
                                </p>
                            </div>
                        </div>
                    </div>
                    <button
                        onClick={() => setIsJournalEntryOpen(true)}
                        className="bg-purple-900 text-white px-4 py-2 hover:bg-amber-900 rounded-lg flex items-center gap-2"
                    >
                        + Create Journal Entry
                    </button>
                </div>

                <hr className="my-6 border-gray-200" />

                <div className={layout.formSectionCol3}>
                    <div>
                        <p className={forms.label}>Date</p>
                        <input 
                            type="date"
                            {...register("date", {required: "Date is required"})}
                            className={forms.input.date}
                        />
                        {errors.date && <p className="text-amber-600 text-sm">{errors.date?.message}</p>}
                    </div>
                

                    <div>
                        <p className={forms.label}>Related Project</p>
                        <select
                            {...register("project")}
                            className={forms.select.partial}
                        >
                            <option value="">select...</option>
                            {useMemo(() => projects.map((project: ProjectProfileResponse) => (
                                <option key={project.project_code} value={project.project_code}>
                                    {formatProjectNumber()}{project.project_code} | {project.project_name}
                                </option>
                            )), [projects])}
                        </select>
                    </div>
                                            
                    <div>
                        <p className={forms.label}>Account Received In</p>
                        <select
                            {...register("account_received_in.account_code")}
                            onChange={controlAccountChange}
                            className={forms.select.partial}
                        >
                            <option value="">select...</option>
                            {useMemo(() => accounts.map((account: ControlAccountInterface) => (
                                <option key={account.account_code} value={account.account_code}>
                                {account.account_code} ({account.account_name})
                                </option>
                            )), [accounts])}
                        </select>

                        <input type="hidden" {...register("account_received_in.account_name")} />
                        <input type="hidden" {...register("account_received_in.account_type")} />
                    </div>
                                        
                    <div>
                        <p className={forms.label}>Customer</p>
                        <select
                            {...register("customer")}
                            className={forms.select.partial}
                        >
                            <option value="">select...</option>
                            {useMemo(() => customers.map((customer: CustomerCreateResponse) => (
                                <option key={customer.customer_number} value={customer.customer_number}>
                                    {formatCustomerNumber()}{customer.customer_number} | {customer.customer_name}
                                </option>
                            )), [customers])}
                        </select>
                    </div>

                    <div>
                        <p className={forms.label}>Related Invoice Payment</p>
                        <select
                            {...register("related_payment")}
                            onChange={invoicePaymentChange}
                            className={forms.select.partial}
                        >
                            <option value="">select...</option>
                            {useMemo(() => invoicePayments.map((invoicePayment: InvoicePaymentInterface) => (
                                <option key={invoicePayment.invoice_payment_code} value={invoicePayment.invoice_payment_code}>
                                    {formatPaymentNumber()}{invoicePayment.invoice_payment_code} | Total: {invoicePayment.related_invoice_total}
                                </option>
                            )), [invoicePayments])}
                        </select>
                    </div>

                    <div>
                        <p className={forms.label}>Related Invoice Payment Total</p>
                        <input 
                            {...register("related_payment_paid_amount")}
                            type="number"
                            readOnly
                            className={forms.input.midNumber}
                            placeholder="0.00"
                            step="0.01" min="0.00" onBlur={(e) => {
                                if (e.target.value) {
                                    e.target.value = decimalPlaces(Number(e.target.value));
                                }
                            }}
                        />
                    </div>

                    <div>
                        <p className={forms.label}>Related Invoice Payment Outstanding</p>
                        <input 
                            {...register("related_payment_outstanding")}
                            type="number"
                            readOnly
                            className={forms.input.midNumber}
                            placeholder="0.00"
                            step="0.01" min="0.00" onBlur={(e) => {
                                if (e.target.value) {
                                    e.target.value = decimalPlaces(Number(e.target.value));
                                }
                            }}
                        />
                    </div>
                    
                    <div>
                        <p className={forms.label}>Cancelled</p>
                        <input 
                            {...register("cancelled")}
                            type="checkbox"
                            defaultValue="false"
                        />
                    </div>
                    
                    <div>
                        <p className={forms.label}>Completed</p>
                        <input 
                            {...register("completed")}
                            type="checkbox"
                        />
                    </div>
                                            
                    <div>
                        <p className={forms.label}>Currency</p>
                        <select 
                            {...register("currency")}
                            className={forms.select.partial}
                        >
                            <option value="">select...</option>
                            {useMemo(() => currencies.map((currency: CurrencyInterface) => (
                                <option key={currency.currency_code} value={currency.currency_code}>
                                    {currency.currency_code}
                                </option>
                            )), [currencies])}
                        </select>
                    </div>
                                            
                    <div>
                        <p className={forms.label}>Agent</p>
                        <select className={forms.select.partial}
                            {...register("agent")}>
                                <option value="">select...</option>
                                {useMemo(() => agents.map((agent: AgentInterface) => (
                                    <option key={agent.email} value={agent.email}>
                                        {agent.name} | {agent.email}
                                    </option>
                                )), [agents])}
                        </select>
                    </div>
                </div>

                <hr className="my-6 border-gray-200" />

                <div className="p-6">
                    <div className="w-full">
                        <table className={tables.base}>
                            <colgroup>
                                {[
                                    'w-1/4 text-center',
                                    'w-1/4 text-center',
                                    'w-1/4 text-center',
                                    'w-1/4 text-center',
                                    'w-[9%] text-center',
                                ].map((line, index) => (
                                    <col key={index} className={line} />
                                ))}
                            </colgroup>
                            <thead className={tables.header}>
                                <tr>
                                    <th className={tables.headerCell}>Paid Amount</th>
                                    <th className={tables.headerCell}>Description</th>
                                    <th className={tables.headerCell}>Additional Charges</th>
                                    <th className={tables.headerCell}>Outstanding</th>
                                    <th className={tables.headerCell}></th>
                                </tr>
                            </thead>

                            <tbody className={tables.body}>

                                <tr>
                                    <td className={text.numbers}>
                                        <input 
                                            {...register("paid_amount")}
                                            type="number"
                                            readOnly
                                            className={forms.input.number}
                                            placeholder="0.00"
                                            step="0.01" min="0.00" onBlur={(e) => {
                                                if (e.target.value) {
                                                    e.target.value = decimalPlaces(Number(e.target.value));
                                                }
                                            }} 
                                        />
                                        
                                    </td>

                                    <td className={tables.cell}>
                                        <input 
                                            {...register("description")}
                                            className={tables.text}
                                        />
                                    </td>

                                    <td className={text.numbers}>
                                        <input 
                                            {...register("additional_bank_charges")}
                                            type="number"
                                            className={forms.input.number}
                                            placeholder="0.00"
                                            step="0.01" min="0.00" onBlur={(e) => {
                                                if (e.target.value) {
                                                    e.target.value = decimalPlaces(Number(e.target.value));
                                                }
                                            }} 
                                        />
                                        
                                    </td>

                                    <td className={text.numbers}>
                                        <input 
                                            {...register("outstanding")}
                                            type="number"
                                            readOnly
                                            className={forms.input.number}
                                            placeholder="0.00"
                                            step="0.01" min="0.00" onBlur={(e) => {
                                                if (e.target.value) {
                                                    e.target.value = decimalPlaces(Number(e.target.value));
                                                }
                                            }} 
                                        />
                                        
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    
                    {/* SUBMIT BUTTON */}
                    <div className={layout.submitSection}>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className={buttons.primary}
                        >
                            {isSubmitting ? (
                                <span className="flex items-center gap-2">
                                    <div className={utils.spinner}></div>
                                    Updating Payment Record...
                                </span>
                            ) : (
                                'Update Payment Record'
                            )}
                        </button>
                        <button
                            type="button"
                            onClick={() => onCancel(customerPaymentId)}
                            className={buttons.secondary}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
                <JournalEntryModal
                    isOpen={isJournalEntryOpen}
                    onClose={() => setIsJournalEntryOpen(false)}
                    onCreate={onCreateJournalEntry}
                    isSubmitting={isCreatingJournalEntry}
                    accounts={accounts}
                />
            </div>
        </form>
    );
};
export default CustomerPaymentEdit;