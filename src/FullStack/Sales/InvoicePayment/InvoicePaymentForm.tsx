import React, { useMemo } from "react";
import { useForm } from "react-hook-form";
import { useFieldArray } from "react-hook-form";

import { InvoiceInterface, InvoicePaymentFormProps, InvoicePaymentInputs } from "../Constants/Types";

import { PAYMENT_TYPE_OPTIONS } from "../Constants/Options";


import { forms, buttons, layout, tables, text, utils } from "../Constants/Styles";

import { Trash2 } from "lucide-react";
import { ControlAccountInterface } from "../../ChartOfAccounts/Interfaces";
import { CustomerCreateResponse } from "../../Customers/constants/Types";
import { AgentInterface, CurrencyInterface } from "../../Core/constants/Types";
import { controlAccountHandler, invoiceHandler } from "../../handlers";

const decimalPlaces = (amount: number) => {
    return `${amount.toFixed(2)}`
};

function formatCustomerNumber(): React.ReactNode {
        const currentYear = new Date().getFullYear();
        return `CV-${currentYear}-`;
    };

function formatInvoiceNumber(): React.ReactNode {
    const currentYear = new Date().getFullYear();
    return `INV-${currentYear}-`
};

const formatPaymentNumber = () => {
    return "PAY-";
};






const InvoicePaymentForm: React.FC<InvoicePaymentFormProps> = ({
    onSubmit,
    isSubmitting,
    onCancel, 
    currencies, accounts, agents, invoices, customers }) => {

        const { register, handleSubmit, watch, setValue, control, 
            formState: { errors }} = useForm<InvoicePaymentInputs>({
                defaultValues: {
                    taxable: false,
                    tax_percent: 0.00,
                    related_invoice_total: 0.00,
                    cancelled: false,
                    related_invoice_payment: [
                        {
                            payment_date: undefined,
                            payment_type: undefined,
                            total: 0.00,
                            taxable: false,
                            sst_percent: 0.00,
                            cancelled: false
                        }
                    ],
                }
            })

            const { fields, append, remove } = useFieldArray({
                name: "related_invoice_payment",
                control
            });
        
        
        



        

const controlAccountChange = controlAccountHandler(accounts, setValue);
const invoiceChange = invoiceHandler(invoices, setValue);
        

    








        
        

    

        return (
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className={forms.body}>
                    <div className={layout.header}>
                        <div className={layout.tag}>
    
                            <div className="text-right">
                                <div className={layout.badge}>
                                    <div className={text.badgeSmall}>NEW</div>
                                    <div className={text.badgeLarge}>
                                        INVOICE PAYMENT
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <hr className="my-6 border-gray-200" />

                    <div className={layout.formSectionCol3}>
                        <div>
                            <p className={forms.label} style={{ fontFamily: 'Montserrat, system-ui', fontSize: '12px' }}>Date</p>
                            <input 
                                type="date"
                                {...register("date_created", {required: "Date is required"})}
                                className={forms.input.date}
                            />
                            {errors.date_created && <p className="text-amber-600 text-sm">{errors.date_created?.message}</p>}
                        </div>

                        <div>
                            <p className={forms.label} style={{ fontFamily: 'Montserrat, system-ui', fontSize: '12px' }}>Paid By...</p>
                            <select
                                {...register("paid_by")}
                                className={forms.select.partial}
                            >
                                <option value="">select...</option>
                                {useMemo(() => customers.map((customer: CustomerCreateResponse) => (
                                    <option key={customer.customer_number} value={customer.customer_number}>
                                        {formatCustomerNumber()}{customer.customer_number} | {customer.customer_name || '--'}
                                    </option>
                                )), [customers])}
                            </select>
                        </div>
                        
                        <div>
                            <p className={forms.label} style={{ fontFamily: 'Montserrat, system-ui', fontSize: '12px' }}>Account Received In</p>
                            <select
                                {...register("account_received_in.account_code")}
                                className={forms.select.partial}
                                onChange={controlAccountChange}
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
                            <p className={forms.label} style={{ fontFamily: 'Montserrat, system-ui', fontSize: '12px' }}>Related Invoice</p>
                            <select
                                {...register("related_invoice")}
                                className={forms.select.partial}
                                onChange={invoiceChange}
                            >
                                <option value="">select...</option>
                                {useMemo(() => invoices.map((invoice: InvoiceInterface) => (
                                    <option key={invoice.invoice_number} value={invoice.invoice_number}>
                                        {formatInvoiceNumber()}{invoice.invoice_number} | Total: {invoice.net_total}
                                    </option>
                                )), [invoices])}
                            </select>
                        </div>

                        <div>
                            <p className={forms.label} style={{ fontFamily: 'Montserrat, system-ui', fontSize: '12px' }}>Related Invoice Total</p>
                            <input 
                                {...register("related_invoice_total")}
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
                            <p className={forms.label} style={{ fontFamily: 'Montserrat, system-ui', fontSize: '12px' }}>Outstanding amount</p>
                            <input 
                                {...register("outstanding_amount")}
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
                            <p className={forms.label} style={{ fontFamily: 'Montserrat, system-ui', fontSize: '12px' }}>Currency</p>
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
                            <p className={forms.label} style={{ fontFamily: 'Montserrat, system-ui', fontSize: '12px' }}>Cancelled</p>
                            <input 
                                {...register("cancelled")}
                                type="checkbox"
                            />
                        </div>
                        
                        <div>
                            <p className={forms.label} style={{ fontFamily: 'Montserrat, system-ui', fontSize: '12px' }}>Agent</p>
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
                                        'w-1/9 text-center',
                                        'w-1/9 text-center',
                                        'w-1/9 text-center',
                                        'w-1/9 text-center',
                                        'w-1/9 text-center',
                                        'w-1/9 text-center',
                                        'w-1/9 text-center',
                                        'w-1/9 text-center',
                                        'w-[7%] text-center',
                                    ].map((line, index) => (
                                        <col key={index} className={line} />
                                    ))}
                                </colgroup>
                                <thead className={tables.header}>
                                    <tr>
                                        <th className={tables.headerCell}>Date</th>
                                        <th className={tables.headerCell}>Payment Type</th>
                                        <th className={tables.headerCell}>Amount</th>
                                        <th className={tables.headerCell}>Taxable?</th>
                                        <th className={tables.headerCell}>SST %</th>
                                        <th className={tables.headerCell}>SST Amount</th>
                                        <th className={tables.headerCell}>Current Total</th>
                                        <th className={tables.headerCell}>Cancelled</th>
                                        <th className={tables.headerCell}></th>
                                    </tr>
                                </thead>

                                <tbody className={tables.body}>
                                    {fields.map((field, index) => {
                                
                                        const total = Number(watch(`related_invoice_payment.${index}.total`) || 0.00);
                                        const taxAmount = Number(watch(`related_invoice_payment.${index}.sst_percent`) || 0.00);
                                        const taxPercentage = taxAmount / 100;
                                        const taxRate = total * taxPercentage;
                                        const currentTotal = total + taxRate;
                                        
                                        return(
                                            <tr key={field.id} className={tables.row}>
                                                <td>
                                                    <input 
                                                        type="date"
                                                        {...register(`related_invoice_payment.${index}.payment_date`)}
                                                        className={forms.select.full}
                                                    />
                                                </td>

                                                <td className={tables.cell}>
                                                    <select
                                                        {...register(`related_invoice_payment.${index}.payment_type`)}
                                                        className={forms.select.small}
                                                    >
                                                        <option value="">select...</option>
                                                        {PAYMENT_TYPE_OPTIONS.map(option => (
                                                            <option key={option} value={option}>
                                                                {option}
                                                            </option>
                                                        ))}
                                                    </select>
                                                </td>
                                                
                                                <td className={text.numbers}>
                                                    <input 
                                                        {...register(`related_invoice_payment.${index}.total`)}
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
                                                
                                                <td className={tables.cell}>
                                                    <input 
                                                        {...register(`related_invoice_payment.${index}.taxable`)}
                                                        type="checkbox"
                                                    />
                                                </td>
                                                
                                                <td className={text.numbers}>
                                                    <input 
                                                        {...register(`related_invoice_payment.${index}.sst_percent`)}
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
                                                
                                                <td className={tables.autoCalculate}>
                                                    {decimalPlaces(taxRate)}
                                                </td>
                                                
                                                <td className={tables.autoCalculate}>
                                                    {decimalPlaces(currentTotal)}
                                                </td>

                                                <td className={tables.cell}>
                                                    <input 
                                                        {...register(`related_invoice_payment.${index}.cancelled`)}
                                                        type="checkbox"
                                                    />
                                                </td>
                                                
                                                <td>
                                                    <button
                                                        type="button"
                                                        title="remove"
                                                        onClick={() => remove(index)}
                                                    >
                                                        <Trash2 size={16} strokeWidth={1.5}
                                                        className="text-black cursor-pointer" />
                                                    </button>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                    <tr>
                                        <td className={tables.headerCell}>
                                            <button
                                                type="button"
                                                onClick={() => append({
                                                    payment_date: undefined,
                                                    payment_type: undefined,
                                                    total: 0.00,
                                                    taxable: false,
                                                    sst_percent: 0.00,
                                                    cancelled: false
                                                })}
                                                className={buttons.addLine}
                                            >
                                                ++ New Line
                                            </button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <div className="mt-6 sm:flex sm:items-center sm:justify-end">
                            <div className="w-full sm:w-1/2 lg:w-1/3">
                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <div className="bg-gray-100 p-4 rounded-lg drop-shadow-md shadow-gray-300 shadow-lg">

                                        <div className="flex justify-between text-sm text-gray-600 mt-2">
                                            <div>Taxable?</div>
                                            <input 
                                            {...register("taxable")}
                                            type="checkbox"
                                            className="ml-2 forced-colors:bg-green-300"
                                            />
                                        </div>

                                        <div className="flex justify-between text-sm text-gray-600 mt-2">
                                            <div>Tax %</div>
                                            <input 
                                                type="number"
                                                {...register("tax_percent")}
                                                placeholder="0.00"
                                                className={forms.input.smallNumber}
                                                step="0.01" min="0.00" onBlur={(e) => {
                                                    if (e.target.value) {
                                                        e.target.value = decimalPlaces(Number(e.target.value));
                                                    }
                                                }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className={layout.submitSection}>
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className={buttons.primary}
                            >
                                {isSubmitting ? (
                                    <span className="flex  items-center gap-2">
                                        <div className={utils.spinner}></div>
                                        Creating Invoice Payment...
                                    </span>
                                ) : (
                                    'Create Invoice Payment'
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        );
    };
    export default InvoicePaymentForm;
