import React, { useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";


import { PAYMENT_TYPE_OPTIONS } from "../constants/options";


import { SupplierProfileInterface, SupplierPaymentInputs } from "../Interfaces";

import { ControlAccountInterface } from "../../ChartOfAccounts/Interfaces";
import { SupplierInvoiceInterface } from "../Interfaces";
import { CurrencyInterface } from "../../Core/Interfaces"


const formatSupplierNumber = () => {
    const currentYear = new Date().getFullYear();
    return `SUP-${currentYear}-`;
};


const decimalPlaces = (amount: number) => {
    return `${amount.toFixed(2)};`
};


const formatInvoiceNumber = () => {
    const currentYear = new Date().getFullYear();
    return `SI-${currentYear}-`;
};






















const SupplierPaymentForm: React.FC<any> = ({ onSubmit, isSubmitting, onCancel, currencies, 
    accounts, agents, supplierInvoices, supplierProfiles }) => {


        const { register, handleSubmit, watch, setValue, control,
            formState: { errors } } = useForm<SupplierPaymentInputs>({
                defaultValues: {
                    related_payment: [
                        {
                            payment_amount: 0.00,
                            additional_payment: 0.00
                        }
                    ],
                }
        });

        const { fields, append, remove } = useFieldArray({
            name: "related_payment",
            control
        });




        const selectedControlAccount = watch("account_code.account_code");
        useEffect(() => {
            if (selectedControlAccount) {

                const selectedCodeNumber = Number(selectedControlAccount);
                console.log("🔍 Converting:", selectedControlAccount, "→", selectedCodeNumber);

                const selectedAccount = accounts.find((a: ControlAccountInterface) => 
                    a.account_code === selectedCodeNumber
            );
            console.log(" ✅ Found account:", selectedAccount);

                if (selectedAccount) {
                    setValue("account_code.account_name", selectedAccount.account_name);
                    setValue("account_code.account_type", selectedAccount.account_type);
                }   
            }
        }, [selectedControlAccount, accounts, setValue]);



























        return(
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="w-[100%] mx-auto page bg-white shadow-lg rounded-2xl overflow-hidden">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between p-8 gap-6">
                        <div className="flex items-center gap-4">

                            <div className="text-right">
                                <div className="inline-block bg-amber-50 border border-amber-100 px-4 py-2 rounded drop-shadow-md shadow-xl">
                                    <div className="text-xs text-amber-700 uppercase tracking-wide">NEW</div>
                                    <div className="text-lg tracking-[0.0.5em] font-bold text-amber-800">
                                        SUPPLIER PAYMENT
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <hr className="my-6 border-gray-200" />

                    <div className="border-t border-b border-gray-100 p-6 grid grid-cols-2 gap-6">
                        <div>
                            <p className="px-2 py-1 text-center tracking-[0.1em] text-xs font-semibold uppercase">Posted Date</p>
                            <input 
                                type="date"
                                {...register("date_created")}
                                className="px-3 py-2 border hover:cursor-pointer selection:cursor-pointer border-violet-300 drop-shadow-md shadow-inner rounded focus:ring-2 focus:ring-green-500 focus:border-violet-500 transition-colors"
                            />

                            <p className="px-2 py-1 text-center tracking-[0.1em] text-xs font-semibold uppercase mt-4">Account Paid From</p>
                            <select
                                {...register("account_code.account_code")}
                                className="w-[60%] drop-shadow-md shadow-inner rounded cursor-pointer border border-violet-300 px-3 py-2 focus:ring-2 focus:ring-green-300"
                            >
                                <option value=""></option>
                                {accounts.map((account: ControlAccountInterface) => (
                                    <option key={account.account_code} value={account.account_code}>
                                        {account.account_code} ({account.account_name})
                                    </option>
                                ))}
                            </select>

                            <input type="hidden" {...register("account_code.account_name")} />
                            <input type="hidden" {...register("account_code.account_type")} />
                        </div>

                        <div>
                            <p className="px-2 py-1 text-center tracking-[0.1em] text-xs font-semibold uppercase">Supplier</p>
                            <select
                                {...register("supplier")}
                                className="w-[60%] drop-shadow-md shadow-inner rounded cursor-pointer border border-violet-300 px-3 py-2 focus:ring-2 focus:ring-green-300"
                            >
                                <option value=""></option>
                                {supplierProfiles.map((supplier: SupplierProfileInterface) => (
                                    <option key={supplier.supplier_code} value={supplier.supplier_code}>
                                    {formatSupplierNumber()}{supplier.supplier_code} | {supplier.supplier_name}
                                    </option>
                                ))}
                            </select>

                            <p className="px-2 py-1 text-center tracking-[0.1em] text-xs font-semibold uppercase mt-5">Currency</p>
                            <select
                                {...register("currency")}
                                className="w-[60%] drop-shadow-md shadow-inner rounded cursor-pointer border border-violet-300 px-3 py-2 focus:ring-2 focus:ring-green-300"
                            >
                                <option value=""></option>
                                {currencies.map((currency: CurrencyInterface) => (
                                    <option key={currency.currency_code} value={currency.currency_code}>
                                        {currency.currency_code}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <hr className="my-6 border-gray-200" />

                    <div className="p-6">
                        <div className="w-full">
                            <table className="w-full table-fixed divide-y border divide-x divide-gray-200 drop-shadow-md shadow-inner">
                                <colgroup>
                                    {[
                                        'w-1/6 text-center',
                                        'w-1/6 text-center',
                                        'w-1/6 text-center',
                                        'w-1/6 text-center',
                                        'w-1/6 text-center',
                                        'w-1/6 text-center',
                                        'w-[9%] text-center',
                                    ].map((line, index) => (
                                        <col key={index} className={line} />
                                    ))}
                                </colgroup>
                                <thead className="bg-blue-100 drop-shadow-md shadow-lg">
                                    <tr>
                                        <th className="px-4 py-3 text-center tracking-[0.1em] text-xs font-semibold uppercase">Related Invoice</th>
                                        <th className="px-4 py-3 text-center text-xs tracking-[0.1em] font-semibold uppercase">Payment Date</th>
                                        <th className="px-4 py-3 text-center text-xs tracking-[0.1em] font-semibold uppercase">Payment Method</th>
                                        <th className="px-4 py-3 text-center text-xs tracking-[0.1em] font-semibold uppercase">Payment Amount</th>
                                        <th className="px-4 py-3 text-center text-xs tracking-[0.1em] font-semibold uppercase">Additional Payment</th>
                                        <th className="px-4 py-3 text-center text-xs tracking-[0.1em] font-semibold uppercase">Sub-Total</th>
                                        <th></th>
                                    </tr>
                                </thead>

                                <tbody className="bg-white divide-y divide-gray-100">
                                    {fields.map((field, index) => (
                                        <tr key={field.id} className="bg-white divide-y divide-x divide-gray-100">
                                            <td>
                                                <select
                                                    {...register(`related_payment.${index}.related_invoice`)}
                                                    className="w-full drop-shadow-md shadow-inner rounded cursor-pointer border border-violet-300 px-3 py-2 focus:ring-2 focus:ring-green-300"
                                                >
                                                    <option value=""></option>
                                                    {supplierInvoices.map((invoice: SupplierInvoiceInterface) => (
                                                        <option key={invoice.invoice_number} value={invoice.invoice_number}>
                                                            {formatInvoiceNumber()}{invoice.invoice_number} | {invoice.supplier}
                                                        </option>
                                                    ))}
                                                </select>
                                            </td>

                                            <td className="px-4 py-4 text-sm text-gray-600">
                                                <input 
                                                    type="date"
                                                    {...register(`related_payment.${index}.payment_date`)}
                                                    className="px-3 py-2 border hover:cursor-pointer selection:cursor-pointer border-violet-300 drop-shadow-md shadow-inner rounded focus:ring-2 focus:ring-green-500 focus:border-violet-500 transition-colors"
                                                />
                                            </td>

                                            <td className="px-4 py-4 text-sm text-gray-600 items-center">
                                                <select
                                                    {...register(`related_payment.${index}.payment_type`)}
                                                    className="w-[80%] cursor-pointer border drop-shadow-md shadow-inner rounded border-violet-300 px-3 py-2 focus:ring-2 focus:ring-green-300"
                                                >
                                                    <option value=""></option>
                                                    {PAYMENT_TYPE_OPTIONS.map(option => (
                                                        <option key={option.value} value={option.value}>
                                                            {option.label}
                                                        </option>
                                                    ))}
                                                </select>
                                            </td>

                                            <td >
                                                <span className="text-gray-500 mr-1"></span>
                                                <input 
                                                    {...register(`related_payment.${index}.payment_amount`)}
                                                    type="number"
                                                    placeholder="0.00"
                                                    step="0.01" min="0.00" onBlur={(e) => {
                                                        if (e.target.value) {
                                                            e.target.value = parseFloat(e.target.value).toFixed(2);
                                                        }
                                                    }}
                                                    className="w-[100%] border border-gray-300 drop-shadow-md shadow-inner rounded p-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                />
                                            </td>

                                            <td>
                                                <span className="text-gray-500 mr-1"></span>
                                                <input 
                                                    {...register(`related_payment.${index}.additional_payment`)}
                                                    type="number"
                                                    placeholder="0.00"
                                                    step="0.01" min="0.00" onBlur={(e) => {
                                                        if (e.target.value) {
                                                            e.target.value = parseFloat(e.target.value).toFixed(2);
                                                        }
                                                    }}
                                                    className="w-[100%] border border-gray-300 drop-shadow-md shadow-inner rounded p-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                />
                                            </td>
                                            <td className="px-4 py-4 text-sm text-gray-600 whitespace-nowrap">
                                                {decimalPlaces(
                                                    Number(watch(`related_payment.${index}.payment_amount`) || 0.00) +
                                                    Number(watch(`related_payment.${index}.additional_payment`) || 0.00)
                                                )}
                                                
                                            </td>
                                            <td>
                                                <button
                                                    type="button"
                                                    onClick={() => remove(index)}
                                                >
                                                    x Remove
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                    <tr>
                                        <td>
                                            <button
                                                type="button"
                                                onClick={() => append({ 
                                                    related_invoice: "", 
                                                    payment_date: "",
                                                    payment_type: "",
                                                    payment_amount: 0.00, 
                                                    additional_payment: 0.00, 
                                                    })}
                                                className="min-w-full divide-y divide-gray-100"
                                            >
                                                + Add New Line
                                            </button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
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
                                        Creating Payment...
                                    </span>
                                ) : (
                                    'Create Payment'
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        );
    };
    export default SupplierPaymentForm;
