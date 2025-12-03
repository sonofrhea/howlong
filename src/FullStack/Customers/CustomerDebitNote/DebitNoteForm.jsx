import React from "react";
import { useFieldArray, useForm } from "react-hook-form";
import './debitnote.css';



const DebitNoteForm = ({ onSubmit, isSubmitting, onClick, onCancel, customers, currencies, accounts, agents, invoices }) => {
    // ensure top-level selects exist and field array starts as empty array
    const { register, handleSubmit, watch, control, formState: { errors } } = useForm({
        defaultValues: {
            customer: "",
            currency: "",
            agent: "",
            debit_note_header: []
        }
    });
    const { fields, append, remove } = useFieldArray({ control, name: "debit_note_header" });

    // ------------------------------------------------------------------------------------
                // GENERIC REUSE-ABLE TAILWIND

    const inputStyles = "w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white";
    const selectStyles = "w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white cursor-pointer";
    const errorStyles = "border-red-500 focus:ring-red-500";
    const labelStyles = "block text-sm font-medium text-gray-700 mb-2";

    const smallSelectStyles ="w-[10vw] px-2 py-1 text-sm border rounded-md focus:ring-2 focus:ring-blue-500"
    

    // ------------------------------------------------------------------------------------


    return (
        <div className="bg-gray-100 min-h-screen p-6">
            <div className="mx-auto bg-white shadow-lg rounded-2xl overflow-hidden min-h-screen">
                <div className="p-6 md:p-8">
                    <div className="flex items-center justify-between mb-6">
                        <button onClick={onCancel} type="button" className="flex items-center gap-2 text-gray-500 hover:text-gray-700 transition-colors">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                            <span className="text-sm font-bold text-gray-800">Cancel</span>
                        </button>
                        <h2 className="text-2xl font-semibold text-gray-800 absolute left-1/2 transform -translate-x-1/2">
                            New Debit Note
                        </h2>
                    </div>
                    <div>
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                            <div className="flex items-center gap-4">
                                <div className="px-6 py-4 border-b border-gray-200 flex items-center gap-2">
                                    <label className="text-sm font-medium text-gray-700">Customer:</label>
                                    <select {...register('customer', { required: false })} className="w-[30vw] px-2 py-1 text-sm border rounded-md focus:ring-2 focus:ring-blue-500">
                                        <option value="">select customer...</option>
                                        {customers.map(customer => (
                                            <option key={customer.customer_number} value={customer.customer_number}>
                                                {customer.formatted_customer_number} - {customer.customer_name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="px-6 py-4 border-b border-gray-200 flex items-center gap-2">
                                    <label className="text-sm font-medium text-gray-700">Currency:</label>
                                    <select {...register('currency', { required: false })} className="w-[8vw] px-2 py-1 text-sm border rounded-md focus:ring-2 focus:ring-blue-500">
                                        <option value="">select...</option>
                                        {currencies.map(currency => (
                                            <option key={currency.currency_symbol} value={currency.currency_symbol}>
                                                {currency.currency_symbol}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="px-6 py-4 border-b border-gray-200 flex items-center gap-2">
                                    <label className="text-sm font-medium text-gray-700">Agent:</label>
                                    <select {...register('agent', { required: false })} className="w-[10vw] px-2 py-1 text-sm border rounded-md focus:ring-2 focus:ring-blue-500">
                                        <option value="">select agent...</option>
                                        {agents.map(agent => (
                                            <option key={agent.username} value={agent.username}>
                                                {agent.username}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div className="overflow-x-auto">
                                <h3>Debit note lines</h3>
                                <table className="w-full text-sm table-auto border-collapse">
                                    <thead>
                                        <tr className="text-left text-xs text-gray-500 uppercase border-b">
                                            <th className="pb-3 text-center">Date</th>
                                            <th className="pb-3 text-center">Account code</th>
                                            <th className="pb-3 text-center">Related invoice</th>
                                            <th className="pb-3 text-center">Description</th>
                                            <th className="pb-3 text-center">Debit note gross total</th>
                                            <th className="pb-3 text-center">Tax inclusive?</th>
                                            <th className="pb-3 text-center">Tax amount</th>
                                            <th className="pb-3 text-center">Debit note net total</th>
                                            <th className="pb-3 text-center">Invoice paid amount</th>
                                            <th className="pb-3 text-center">Outstanding note</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {fields.map((field, index) => (
                                            <tr key={field.id} className="hover:bg-gray-50">

                                                <td className={smallSelectStyles}>
                                                    <input type="date" {...register(`debit_note_header.${index}.date`, {required: true})} className="px-1 py-1 text-sm border rounded-md focus:ring-2 focus:ring-blue-500" />
                                                </td>
                                                <td>
                                                    <select {...register(`debit_note_header.${index}.account`)} className={smallSelectStyles}>
                                                        <option value="">select account...</option>
                                                        {accounts.map(account => (
                                                            <option key={account.account_code} value={account.account_code}>
                                                                {account.account_code} - {account.account_name}
                                                            </option>
                                                        ))}
                                                    </select>
                                                </td>
                                                <td>
                                                    {/* use invoice_number as the option value so lookup is deterministic */}
                                                    <select {...register(`debit_note_header.${index}.related_invoice_payments`)} className={smallSelectStyles}>
                                                        <option value="">select...</option>
                                                        {invoices.map(inv => (
                                                            <option key={inv.invoice_number} value={inv.invoice_number}>
                                                                {inv.formatted_invoice_number} - {inv.customer_details}
                                                            </option>
                                                        ))}
                                                    </select>
                                                </td>
                                                <td>
                                                    <input {...register(`debit_note_header.${index}.description`)} type="text" className={inputStyles} />
                                                </td>
                                                <td>
                                                    <input {...register(`debit_note_header.${index}.amount`, {required: true, min: 0.01, valueAsNumber: true})} type="number" placeholder="0.00" className={inputStyles} step="0.01" min="0" onBlur={(e) => {
                                                        if (e.target.value) {
                                                            e.target.value = parseFloat(e.target.value).toFixed(2);
                                                        }
                                                    }} />
                                                </td>
                                                <td>
                                                    <input {...register(`debit_note_header.${index}.tax_inclusive`)} type="checkbox"  className="h-4 w-4" />
                                                </td>
                                                <td>
                                                    <input {...register(`debit_note_header.${index}.tax_amount`, {required: false, min: 0.01, valueAsNumber: true})} type="number" placeholder="0.00" className={inputStyles} step="0.01" min="0" onBlur={(e) => {
                                                        if (e.target.value) {
                                                            e.target.value = parseFloat(e.target.value).toFixed(2);
                                                        }
                                                    }} />
                                                </td>
                                                <td className="text-center p-2">
                                                    <div className="bg-gray-100 rounded px-3 py-2 text-gray-500 text-sm">
                                                        System Calculated
                                                    </div>
                                                </td>
                                                <td className="text-center p-2">
                                                    <div className="bg-gray-100 rounded px-3 py-2 text-gray-500 text-sm">
                                                        System Calculated
                                                    </div>
                                                </td>
                                                <td className="text-center p-2">
                                                    <div className="bg-gray-100 rounded px-3 py-2 text-gray-500 text-sm">
                                                        System Calculated
                                                    </div>
                                                </td>
                                                <td>
                                                    <button type="button" onClick={() => remove(index)} className="text-red-600 ">
                                                        Remove
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                <div className="mt-4">
                                    <button type="button" onClick={() => append({
                                        date: "",
                                        account: "",
                                        related_invoice_payments: "",
                                        description: "",
                                        amount: "",
                                        tax_inclusive: false,
                                        tax_amount: "",
                                    })} className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-green-700">

                                        + Add another line...
                                    </button>
                                </div>
                                <div className="flex justify-end gap-4 pt-6 border-t">
                                    <button type="button" onClick={onCancel} className="px-4 py-2 bg-gray-200 rounded-lg text-gray-700 hover:bg-gray-300">
                                        Cancel
                                    </button>
                                    <button type="submit" disabled={isSubmitting} className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                                        {isSubmitting ? "Submitting..." : "Submit"}
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )



};

export default DebitNoteForm;