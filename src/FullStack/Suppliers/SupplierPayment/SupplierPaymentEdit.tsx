import React, { useMemo, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";


import { PAYMENT_TYPE_OPTIONS } from "../constants/options";


import { SupplierProfileResponse, 
    SupplierPaymentInputs, SupplierPaymentProps } from "../constants/Types";

import { ControlAccountInterface } from "../../ChartOfAccounts/Interfaces";
import { SupplierInvoiceResponse } from "../constants/Types";
import { AgentInterface, CurrencyInterface } from "../../Core/constants/Types"
import { SupplierAccountHandler } from "../../handlers";
import { buttons, forms, labelStyles, layout, tables, text } from "../constants/Styles";
import { supplierRelatedInvoice } from "../../handlers";
import { Trash2 } from "lucide-react";
import JournalEntryModal from "../../Accounting/JournalEntry/JournalEntryModal";




const decimalPlaces = (amount: number) => {
    return `${amount.toFixed(2)}`
};













const SupplierPaymentEdit: React.FC<SupplierPaymentProps> = ({
    supplierPayment,
    onSubmit,
    isSubmitting,
    onCancel,
    currencies, accounts, agents, supplierInvoices, supplierProfiles,
    onCreateJournalEntry, isCreatingJournalEntry
}) => {
    const [isJournalEntryOpen, setIsJournalEntryOpen] = useState(false);
    const supplierPaymentId = supplierPayment?.payment_code;


    const { register, handleSubmit, watch, setValue, control,
        reset, formState: { errors } } = useForm<SupplierPaymentInputs>({
            defaultValues: supplierPayment
        });

    
    React.useEffect(() => {

        const updated = {
            ...supplierPayment,
            date_created:
                supplierPayment.date_created
                    ? new Date(supplierPayment.date_created).toISOString().split("T")[0]
                    : "",
        };
        
        reset(updated);
    }, [supplierPayment, reset]);
        
        
    
    const { fields, append, remove } = useFieldArray({
        name: "related_payment",
        control
    });



const controlAccountChange = SupplierAccountHandler(accounts, setValue);
const invoicePaymentChange = supplierRelatedInvoice(supplierInvoices, setValue);







    return(
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="w-full mx-auto page bg-white shadow-lg rounded-2xl overflow-hidden">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between p-8 gap-6">
                    <div className="flex items-center gap-4">
                    
                        <div className="text-center space-y-6 px-6 py-3 gap-4">
                            <div className={layout.badge}>
                                <p className={text.badgeLarge}>
                                    SUPPLIER PAYMENT
                                </p>
                                <p className={labelStyles}>
                                    {supplierPayment.formatted_number}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <hr className="my-6 border-gray-200" />

                <div className={layout.formSectionCol3}>
                    <div>
                        <p className="px-2 py-1 text-center tracking-widest text-xs font-semibold uppercase">Posted Date</p>
                        <input 
                            type="date"
                            {...register("date_created", {required: "Date is required"})}
                            className="px-3 py-2 border hover:cursor-pointer selection:cursor-pointer border-violet-300 drop-shadow-md shadow-inner rounded focus:ring-2 focus:ring-green-500 focus:border-violet-500 transition-colors"
                        />
                        {errors.date_created && <p className="text-amber-600 text-sm">{errors.date_created?.message}</p>}
                    </div>

                    <div>
                        <p className="px-2 py-1 text-center tracking-widest text-xs font-semibold uppercase mt-4">Account Paid From</p>
                        <select
                            {...register("account_code.account_code")}
                            onChange={controlAccountChange}
                            className="w-[60%] drop-shadow-md shadow-inner rounded cursor-pointer border border-violet-300 px-3 py-2 focus:ring-2 focus:ring-green-300"
                        >
                            <option value="">select...</option>
                            {useMemo(() => accounts.map((account: ControlAccountInterface) => (
                                <option key={account.account_code} value={account.account_code}>
                                    {account.account_code} ({account.account_name})
                                </option>
                            )), [accounts])}
                        </select>

                        <input type="hidden" {...register("account_code.account_name")} />
                        <input type="hidden" {...register("account_code.account_type")} />
                    </div>
                    
                    <div>
                        <p className="px-2 py-1 text-center tracking-widest text-xs font-semibold uppercase mt-5">Currency</p>
                        <select
                            {...register("currency")}
                            className="w-[60%] drop-shadow-md shadow-inner rounded cursor-pointer border border-violet-300 px-3 py-2 focus:ring-2 focus:ring-green-300"
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
                        <p className="px-2 py-1 text-center tracking-widest text-xs font-semibold uppercase">Payment To</p>
                        <select
                            {...register("supplier")}
                            className="w-[60%] drop-shadow-md shadow-inner rounded cursor-pointer border border-violet-300 px-3 py-2 focus:ring-2 focus:ring-green-300"
                        >
                            <option value="">select...</option>
                            {useMemo(() => supplierProfiles.map((supplier: SupplierProfileResponse) => (
                                <option key={supplier.supplier_code} value={supplier.supplier_code}>
                                {supplier.formatted_number} | {supplier.supplier_name}
                                </option>
                            )), [supplierProfiles])}
                        </select>
                    </div>

                    <div>
                        <p className={forms.label} style={{ fontFamily: 'Montserrat, system-ui', fontSize: '12px' }}>Related Invoice</p>
                        <select
                            {...register("related_invoice")}
                            onChange={invoicePaymentChange}
                            className={forms.select.partial}
                        >
                            <option value="">select...</option>
                            {useMemo(() => supplierInvoices.map((invoice: SupplierInvoiceResponse) => (
                                <option key={invoice.invoice_number} value={invoice.invoice_number}>
                                    {invoice.formatted_number} | Total: {invoice.aggregate_total}
                                </option>
                            )), [supplierInvoices])}
                        </select>
                    </div>

                    <div>
                        <p className={forms.label} style={{ fontFamily: 'Montserrat, system-ui', fontSize: '12px' }}>Related Invoice Total</p>
                        <input 
                            {...register("invoice_amount")}
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
                </div>

                <hr className="my-6 border-gray-200" />

                <div className="p-6">
                    <div className="w-full">
                        <table className="w-full table-fixed divide-y border divide-x divide-gray-200 drop-shadow-md shadow-inner">
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
                                    'w-[5%] text-center',
                                ].map((line, index) => (
                                    <col key={index} className={line} />
                                ))}
                            </colgroup>
                            <thead className="bg-blue-100 drop-shadow-md shadow-lg">
                                <tr>
                                    <th className={tables.headerCell}>Payment Date</th>
                                    <th className={tables.headerCell}>Payment Method</th>
                                    <th className={tables.headerCell}>Payment Amount</th>
                                    <th className={tables.headerCell}>Taxable?</th>
                                    <th className={tables.headerCell}>SST %</th>
                                    <th className={tables.headerCell}>SST Amount</th>
                                    <th className={tables.headerCell}>Cancelled</th>
                                    <th className={tables.headerCell}>Sub-Total</th>
                                    <th className={tables.headerCell}></th>
                                </tr>
                            </thead>

                            <tbody className={tables.body}>
                                {fields.map((field, index) => {
                                    const SST = Number(watch(`related_payment.${index}.payment_date`)) || 0.00
                                    const Amount = Number(watch(`related_payment.${index}.payment_amount`)) || 0.00

                                    const sstPercent = SST / 100.00
                                    const sstAmount = Amount * sstPercent
                                    const total = Amount + sstAmount;



                                    return(
                                    <tr key={field.id} className={tables.row}>

                                        <td className={tables.cell}>
                                            <input 
                                                type="date"
                                                {...register(`related_payment.${index}.payment_date`)}
                                                className={forms.select.full}
                                            />
                                        </td>

                                        <td className={tables.cell}>
                                            <select
                                                {...register(`related_payment.${index}.payment_method`, {
                                                    setValueAs: (value) => value === "" ? undefined : value
                                                })}
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

                                        <td className={tables.cell}>
                                            <input 
                                                {...register(`related_payment.${index}.payment_amount`)}
                                                type="number"
                                                placeholder="0.00"
                                                step="0.01" min="0.00" onBlur={(e) => {
                                                    if (e.target.value) {
                                                        e.target.value = decimalPlaces(Number(e.target.value));
                                                    }
                                                }}
                                                className={forms.input.number}
                                            />
                                        </td>

                                        <td className={tables.cell}>
                                            <input 
                                                {...register(`related_payment.${index}.taxable`)}
                                                type="checkbox"
                                                className={forms.input.base}
                                            />
                                        </td>

                                        <td className={tables.cell}>
                                            <input 
                                                {...register(`related_payment.${index}.sst_percent`)}
                                                type="number"
                                                placeholder="0.00"
                                                step="0.01" min="0.00" onBlur={(e) => {
                                                    if (e.target.value) {
                                                        e.target.value = decimalPlaces(Number(e.target.value));
                                                    }
                                                }}
                                                className={forms.input.number}
                                            />
                                        </td>

                                        <td className={tables.autoCalculate}>
                                            {decimalPlaces(sstAmount)}
                                            
                                        </td>

                                        <td className={tables.cell}>
                                            <input 
                                                {...register(`related_payment.${index}.cancelled`)}
                                                type="checkbox"
                                                className={forms.input.base}
                                            />
                                        </td>

                                        <td className={tables.autoCalculate}>
                                            {decimalPlaces(total)}
                                            
                                        </td>
                                                                                    
                                        <td>
                                            <button
                                                type="button"
                                                onClick={() => remove(index)}
                                            >
                                                <Trash2 size={16}
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
                                                payment_method: undefined,
                                                payment_amount: 0.00, 
                                                cancelled: false,
                                                taxable: false,
                                                sst_percent: 0.00
                                                })}
                                            className="min-w-full divide-y divide-gray-100"
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
                                        className={forms.input.smallNumber}
                                        placeholder="0.00"
                                        step="0.01" min="0.00" onBlur={(e) => {
                                            if (e.target.value) {
                                                e.target.value = decimalPlaces(Number(e.target.value));
                                            }
                                        }}
                                    
                                    />
                                </div>

                                <div className="flex justify-between text-sm text-gray-600 mt-2">
                                    <div>Cancelled?</div>
                                    <input 
                                    {...register("cancelled")}
                                    type="checkbox"
                                    className="ml-2 forced-colors:bg-green-300"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    </div>



                    {/* SUBMIT BUTTON */}
                    <div className="flex justify-end gap-4 pt-6 border-t border-gray-200">
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="px-6 py-3 bg-amber-900 text-white rounded drop-shadow-md shadow-xl hover:bg-green-700 font-medium disabled:opacity-50"
                        >
                            {isSubmitting ? (
                                <span className="flex items-center gap-2">
                                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                    Updating Payment...
                                </span>
                            ) : (
                                'Update Payment'
                            )}
                        </button>
                        <button
                            type="button"
                            onClick={() => onCancel(supplierPaymentId)}
                            className={buttons.secondary}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </form>
    );
};
export default SupplierPaymentEdit;