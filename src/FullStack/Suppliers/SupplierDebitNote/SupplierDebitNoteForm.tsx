import React, { useMemo, useState } from "react";
import { useForm, SubmitHandler, useFieldArray } from "react-hook-form";


import { forms, buttons, layout, tables, text, utils, 
    management, listTable } from "../constants/Styles";


import { Trash2 } from 'lucide-react';

import { SupplierDebitNoteInputs, SupplierInvoiceResponse, 
    SupplierProfileResponse, 
 } from "../constants/Types";

import { CurrencyInterface, AgentInterface } from "../../Core/constants/Types"

import { ControlAccountInterface } from "../../ChartOfAccounts/Interfaces"
import { supplierDebitNoteAccountHandler, supplierDebitNoteInvoiceTotal } from "../../handlers";
import { ProductItemCreateResponse } from "../../Products/constants/Types";


const formatSupplierNumber = () => {
    const currentYear = new Date().getFullYear();
    return `SUP-${currentYear}-`;
};


const formatSupplierInvoiceNumber = () => {
    const currentYear = new Date().getFullYear();
    return `SI-${currentYear}-`;
};


const decimalPlaces = (amount: number) => {
    return `${amount.toFixed(2)}`;
};













const SupplierDebitNoteForm: React.FC<any> = ({
    onSubmit,
    isSubmitting,
    onCancel,
    currencies, 
    accounts, agents, SupplierInvoices, SupplierProfiles, productItems,
    onCreateJournalEntry, isCreatingJournalEntry
}) => {
    const [isJournalEntryOpen, setIsJournalEntryOpen] = useState(false);
    
        const productOptions = useMemo(() => 
            productItems.map((product: ProductItemCreateResponse) => (
            <option key={product.item_code} value={product.item_code}>
                SKU-{product.item_code} | {product.item_description}
            </option>
        )), [productItems])

        
        const { register, handleSubmit, watch, setValue, control,
            formState: { errors } } = useForm<SupplierDebitNoteInputs>({
                defaultValues: {
                    related_debit_note: [
                        {
                            amount: 0.00,
                            tax_inclusive: false,
                            tax_amount: 0.00,
                            cancelled: false
                        }
                    ],
                    tax_inclusive: false,
                    tax_amount: 0.00,
                    cancelled: false
                }
            });

            const { fields, append, remove } = useFieldArray({
                name: "related_debit_note",
                control
            });

            
const accountChange = supplierDebitNoteAccountHandler(accounts, setValue);
const invoiceTotalChange = supplierDebitNoteInvoiceTotal(SupplierInvoices, setValue);






            return(
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className={forms.body}>
                        <div className={layout.header}>
                            <div className={layout.tag}>

                                <div className="text-right">
                                    <div className={layout.badge}>
                                        <div className={text.badgeLarge}>NEW</div>
                                        <div className={text.badgeLarge1x}>
                                            SUPPLIER DEBIT NOTE
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <hr className="my-6 border-gray-200" />

                        <div className={layout.formSectionCol3}>
                            <div>
                                <p className={forms.label}>Date</p>
                                <input 
                                    type="date"
                                    {...register("date")}
                                    className={forms.input.date}
                                />
                            </div>
                            
                            <div>
                                <p className={forms.label}>Account</p>
                                <select
                                    {...register("account.account_code")}
                                    className={forms.select.partial}
                                    onChange={accountChange}
                                >
                                    <option value="">Select...</option>
                                    {useMemo(() => accounts.map((account: ControlAccountInterface) => (
                                        <option key={account.account_code} value={account.account_code}>
                                            {account.account_code} ({account.account_name})
                                        </option>
                                    )), [accounts])}
                                </select>

                                <input type="hidden" {...register("account.account_name")} />
                                <input type="hidden" {...register("account.account_type")} />
                            </div>
                            
                            <div>
                                <p className={forms.label}>Related Supplier</p>
                                <select
                                    {...register("supplier")}
                                    className={forms.select.partial}
                                >
                                    <option value="">Select...</option>
                                    {useMemo(() => SupplierProfiles.map((supplier: SupplierProfileResponse) => (
                                        <option key={supplier.supplier_code} value={supplier.supplier_code}>
                                            {formatSupplierNumber()}{supplier.supplier_code} | {supplier.supplier_name}
                                        </option>
                                    )), [SupplierProfiles])}
                                </select>
                            </div>

                            <div>
                                <p className={forms.label}>Related Invoice</p>
                                <select
                                    {...register("related_invoice")}
                                    className={forms.select.partial}
                                    onChange={invoiceTotalChange}
                                >
                                    <option value="">Select...</option>
                                    {useMemo(() => SupplierInvoices.map((invoice: SupplierInvoiceResponse) => (
                                        <option key={invoice.invoice_number} value={invoice.invoice_number}>
                                            {formatSupplierInvoiceNumber()}{invoice.invoice_number} | Total:  {invoice.aggregate_total}
                                        </option>
                                    )), [SupplierInvoices])}
                                </select>
                            </div>

                            <div>
                                <p className={forms.label}>Related Invoice Total</p>
                                <input 
                                    type="number"
                                    {...register("related_invoice_total")}
                                    className={forms.input.midNumber}
                                    placeholder="0.00"
                                    step="0.01" min="0.00" onBlur={(e) => {
                                        if (e.target.value) {
                                            e.target.value = parseFloat(e.target.value).toFixed(2);
                                        }
                                    }}
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
                                <select
                                    {...register("agent")}
                                    className={forms.select.partial}
                                >
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

                        <div>
                            <p className={forms.label}>Description</p>
                            <textarea 
                                {...register("description")}
                                className={forms.description}
                                rows={2}
                            />

                            <p className={forms.secondLevelLabel}>Cancelled</p>
                            <input 
                                type="checkbox"
                                {...register("cancelled")}
                            />
                        </div>

                        <hr className="my-6 border-gray-200" />

                        <div className="p-6">
                            <div className="w-full">
                                <table className={tables.base}>
                                    <colgroup>
                                        {[
                                            'w-1/7 text-center',
                                            'w-1/7 text-center',
                                            'w-1/7 text-center',
                                            'w-1/7 text-center',
                                            'w-1/7 text-center',
                                            'w-1/7 text-center',
                                            'w-1/7 text-center',
                                            'w-[7%] text-center',
                                        ].map((line, index) => (
                                            <col key={index} className={line} />
                                        ))}
                                    </colgroup>
                                    <thead className={tables.header}>
                                        <tr>
                                            <th className={tables.headerCell}>Item</th>
                                            <th className={tables.headerCell}>Description</th>
                                            <th className={tables.headerCell}>Amount</th>
                                            <th className={tables.headerCell}>Tax Inclusive</th>
                                            <th className={tables.headerCell}>Tax Amount</th>
                                            <th className={tables.headerCell}>SubTotal(After Tax)</th>
                                            <th className={tables.headerCell}>Cancelled</th>
                                            <th className={tables.headerCell}></th>
                                        </tr>
                                    </thead>

                                    <tbody className={tables.body}>
                                        {fields.map((field, index) => {
        
                                            return(
                                                <tr key={field.id} className={tables.row}>
                                                    <td>
                                                        <select
                                                            {...register(`related_debit_note.${index}.debit_note_item`)}
                                                            className={forms.select.full}
                                                        >
                                                            <option value="">select...</option>
                                                            {productOptions}
                                                        </select>
                                                    </td>
        
                                                    <td className={tables.cell}>
                                                        <input 
                                                            type="text"
                                                            {...register(`related_debit_note.${index}.description`)}
                                                            className={tables.text}
                                                        />
                                                    </td>
        
                                                    <td className={text.numbers}>
                                                        <input 
                                                            type="number"
                                                            {...register(`related_debit_note.${index}.amount`)}
                                                            className={forms.input.number}
                                                            placeholder="0.00"
                                                            step="0.01" min="0.00" onBlur={(e) => {
                                                                if (e.target.value) {
                                                                    e.target.value = parseFloat(e.target.value).toFixed(2);
                                                                }
                                                            }}
                                                        />
                                                    </td>
        
                                                    <td className={tables.cell}>
                                                        <input
                                                            type="checkbox"
                                                            {...register(`related_debit_note.${index}.tax_inclusive`)} 
                                                        />
                                                    </td>
        
                                                    <td className={text.numbers}>
                                                        <input 
                                                            type="number"
                                                            {...register(`related_debit_note.${index}.tax_amount`)}
                                                            className={forms.input.number}
                                                            placeholder="0.00"
                                                            step="0.01" min="0.00" onBlur={(e) => {
                                                                if (e.target.value) {
                                                                    e.target.value = parseFloat(e.target.value).toFixed(2);
                                                                }
                                                            }}
                                                        />
                                                    </td>
        
                                                    <td className={tables.autoCalculate}>
                                                        {decimalPlaces(
                                                            Number(watch(`related_debit_note.${index}.amount`) || 0.00) *
                                                            (1 + (Number(watch(`related_debit_note.${index}.tax_amount`) || 0.00)/100))
                                                        )}
                                                    </td>
        
                                                    <td className={tables.cell}>
                                                        <input
                                                            type="checkbox"
                                                            {...register(`related_debit_note.${index}.cancelled`)} 
                                                        />
                                                    </td>
        
                                                    <td>
                                                        <button 
                                                            type="button"
                                                            title="remove"
                                                            onClick={() => remove(index)}
                                                        >
                                                            <Trash2 size={16} strokeWidth={1.5}
                                                            className="text-black cursor-pointer"/>
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
                                                        debit_note_item: "",
                                                        description: "",
                                                        amount: 0.00,
                                                        tax_inclusive: false,
                                                        tax_amount: 0.00,
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
                                            <div>Tax Inclusive?</div>
                                            <input 
                                            {...register("tax_inclusive")}
                                            type="checkbox"
                                            className="ml-2 forced-colors:bg-green-300"
                                            />
                                        </div>
    
                                        <div className="flex justify-between text-sm text-gray-600 mt-2">
                                            <div>Tax %</div>
                                            <input 
                                                type="number"
                                                {...register("tax_amount")}
                                                className={forms.input.smallNumber}
                                                placeholder="0.00"
                                                step="0.01" min="0.00" onBlur={(e) => {
                                                    if (e.target.value) {
                                                        e.target.value = parseFloat(e.target.value).toFixed(2);
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
                            <div className={layout.submitSection}>
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className={buttons.primary}
                                >
                                    {isSubmitting ? (
                                        <span className="flex items-center gap-2">
                                            <div className={utils.spinner}></div>
                                            Creating Debit Note...
                                        </span>
                                    ) : (
                                        'Create Debit Note'
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            );
    };
    export default SupplierDebitNoteForm;