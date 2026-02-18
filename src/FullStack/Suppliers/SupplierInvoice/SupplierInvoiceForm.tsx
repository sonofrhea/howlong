import React, { useMemo } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { forms, buttons, layout, tables, text, utils } from "../constants/Styles";


import { Trash2 } from 'lucide-react';

import {SupplierProfileResponse, SupplierInvoiceInputs, SupplierInvoiceFormProps } from "../constants/Types";


import { ControlAccountInterface } from "../../ChartOfAccounts/Interfaces";
import { SupplierInvoiceResponse } from "../constants/Types";

import { AgentInterface, CurrencyInterface } from "../../Core/constants/Types"
import { ProductItemCreateResponse } from "../../Products/constants/Types"
import { purchaseAccountHandler } from "../../handlers";



const formatSupplierNumber = () => {
    const currentYear = new Date().getFullYear();
    return `SUP-${currentYear}-`;
};


const decimalPlaces = (amount: number) => {
    return `${amount.toFixed(2)}`
};



















const SupplierInvoiceForm: React.FC<SupplierInvoiceFormProps> = ({
    onSubmit,
    isSubmitting,
    onCancel,
    currencies, 
    accounts, agents, supplierProfiles, productItems }) => {
                                        
        const productOptions = useMemo(() => 
            productItems.map((product: ProductItemCreateResponse) => (
            <option key={product.item_code} value={product.item_code}>
                SKU-{product.item_code} | {product.item_description}
            </option>
        )), [productItems])


        const { register, handleSubmit, watch, setValue, control, 
            formState: { errors } } = useForm<SupplierInvoiceInputs>({
                defaultValues: {
                    tax_inclusive: false,
                    tax_amount: 0.00,
                    cancelled: false,
                    related_invoice: [
                        {
                            quantity: 0,
                            price_per_unit: 0.00,
                            tax_inclusive: false,
                            tax_amount: 0.00,
                            cancelled: false
                        }
                    ]
                }
            });
            
            const { fields, append, remove } = useFieldArray({
                name: "related_invoice",
                control
            });



const controlAccountChange = purchaseAccountHandler(accounts, setValue);









            return(
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className={forms.body}>
                        <div className={layout.header}>
                            <div className={layout.tag}>

                                <div className="text-right">
                                    <div className={layout.badge}>
                                        <div className={text.badgeSmall}>NEW</div>
                                        <div className={text.badgeLarge}>
                                            SUPPLIER INVOICE
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <hr className="my-6 border-gray-200" />

                        <div className={layout.formSectionCol3}>
                            <div>
                                <p className={forms.secondLevelLabel}>Invoice Due Date</p>
                                <input 
                                    type="date"
                                    {...register("invoice_due_date", {required: "Due date required"})}
                                    className={forms.input.date}
                                />
                                {errors.invoice_due_date && <p className="text-amber-600 text-sm">{errors.invoice_due_date?.message}</p>}
                            </div>

                            <div>
                                <p className={forms.secondLevelLabel}>Purchase Account</p>
                                <select
                                    {...register("purchase_account.account_code")}
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

                                <input type="hidden" {...register("purchase_account.account_name")} />
                                <input type="hidden" {...register("purchase_account.account_type")} />
                            </div>

                            <div>
                                <p className={forms.secondLevelLabel}>Currency</p>
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
                                <p className={forms.secondLevelLabel}>Related Supplier</p>
                                <select
                                    {...register("supplier")}
                                    className={forms.select.partial}
                                >
                                    <option value="">select...</option>
                                    {useMemo(() => supplierProfiles.map((supplier: SupplierProfileResponse) => (
                                        <option key={supplier.supplier_code} value={supplier.supplier_code}>
                                            {formatSupplierNumber()}{supplier.supplier_code} | {supplier.supplier_name}
                                        </option>
                                    )), [supplierProfiles])}
                                </select>
                            </div>

                            <div>
                                <p className={forms.secondLevelLabel}>Supplier Extra Details</p>
                                <textarea 
                                    rows={3}
                                    {...register("supplier_details")}
                                    className="w-full border border-gray-300"
                                />
                            </div>
                            
                            <div>
                                <p className={forms.secondLevelLabel}>Agent</p>
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
                            
                            <div>
                                <p className={forms.secondLevelLabel}>Product</p>
                                <textarea 
                                    {...register("product")}
                                    className="w-[70%] border border-gray-300"
                                    
                                />
                            </div>
                        </div>

                        <hr className="my-6 border-gray-200" />

                        <div className="p-6">
                            <div className="w-full">
                                <table className="w-full table-fixed divide-y border divide-x divide-gray-200 drop-shadow-md shadow-inner">
                                    <colgroup>
                                        {[
                                            'w-1/10 text-center',
                                            'w-1/10 text-center',
                                            'w-1/10 text-center',
                                            'w-1/10 text-center',
                                            'w-1/10 text-center',
                                            'w-1/10 text-center',
                                            'w-1/10 text-center',
                                            'w-1/10 text-center',
                                            'w-1/10 text-center',
                                            'w-1/10 text-center',
                                            'w-[7%] text-center',
                                        ].map((line, index) => (
                                            <col key={index} className={line} />
                                        ))}
                                    </colgroup>
                                    <thead className={tables.header}>
                                        <tr>
                                            <th className={tables.headerCell}>Item name</th>
                                            <th className={tables.headerCell}>description</th>
                                            <th className={tables.headerCell}>Quantity</th>
                                            <th className={tables.headerCell}>Unit of measure</th>
                                            <th className={tables.headerCell}>price per unit</th>
                                            <th className={tables.headerCell}>Sub-Total</th>
                                            <th className={tables.headerCell}>SST inclusive</th>
                                            <th className={tables.headerCell}>SST %</th>
                                            <th className={tables.headerCell}>cancelled</th>
                                            <th className={tables.headerCell}>Total</th>
                                            <th className={tables.headerCell}></th>
                                        </tr>
                                    </thead>

                                    <tbody className={tables.body}>
                                        {fields.map((field, index) => {
        
        
                                            const quantity = watch(`related_invoice.${index}.quantity`) || 0.00;
                                            const price_per_unit = watch(`related_invoice.${index}.price_per_unit`) || 0.00;
                                            let tax_amount = watch(`related_invoice.${index}.tax_amount`) || 0.00;
                                            const tax_inclusive = watch(`related_invoice.${index}.tax_inclusive`) || false;
        
                                            let total = quantity * price_per_unit;
        
                                            if (!tax_inclusive) {
                                                tax_amount = 0.00;
                                            }
        
                                            total *= 1 + (tax_amount / 100);
        
        
                                            return(
                                            <tr key={field.id} className={tables.row}>
                                                <td>
                                                    <select
                                                        {...register(`related_invoice.${index}.item_name`)}
                                                        className={forms.select.full}
                                                    >
                                                        <option value="">select...</option>
                                                        {productOptions}
                                                    </select>
                                                </td>
        
                                                <td className={tables.cell}>
                                                    <input 
                                                        {...register(`related_invoice.${index}.description`)}
                                                        className={tables.text}
                                                    />
                                                </td>
        
                                                <td className={text.numbers}>
                                                    <input 
                                                        {...register(`related_invoice.${index}.quantity`)}
                                                        className={forms.input.number}
                                                        type="number"
                                                    />
                                                </td>
        
                                                <td className={tables.cell}>
                                                    <input 
                                                        {...register(`related_invoice.${index}.unit_of_measure`)}
                                                        className={tables.text}
                                                    />
                                                </td>
        
                                                <td className={text.numbers}>
                                                    <input 
                                                        {...register(`related_invoice.${index}.price_per_unit`)}
                                                        className={forms.input.number}
                                                        type="number"
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
                                                        Number(watch(`related_invoice.${index}.quantity`) || 0.00) *
                                                        Number(watch(`related_invoice.${index}.price_per_unit`) || 0.00)
                                                    )}
                                                </td>
        
                                                <td className={tables.cell}>
                                                    <input 
                                                        type="checkbox"
                                                        {...register(`related_invoice.${index}.tax_inclusive`)}
                                                    />
                                                </td>
        
                                                <td className={text.numbers}>
                                                    <input 
                                                        {...register(`related_invoice.${index}.tax_amount`)}
                                                        className={forms.input.number}
                                                        type="number"
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
                                                        {...register(`related_invoice.${index}.cancelled`)}
                                                    />
                                                </td>
                                                
                                                <td className={tables.autoCalculate}>
                                                    {decimalPlaces(total)}
                                                </td>
                                                <td>
                                                    <button
                                                        type="button"
                                                        title="remove"
                                                        onClick={() => remove(index)}
                                                    >
                                                        <Trash2 size={16}/>
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
                                                        item_name: "", 
                                                        description: "",
                                                        quantity: 0,
                                                        unit_of_measure: "",
                                                        price_per_unit: 0.00,
                                                        tax_inclusive: false,
                                                        tax_amount: 0.00,
                                                        cancelled: false 
                                                        })}
                                                    className={buttons.addLine}
                                                >
                                                    + Add New Line
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
                                            Creating Invoice...
                                        </span>
                                    ) : (
                                        'Create Invoice'
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            );
    };
    export default SupplierInvoiceForm;