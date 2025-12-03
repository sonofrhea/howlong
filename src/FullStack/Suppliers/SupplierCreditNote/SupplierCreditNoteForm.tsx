import React, { useEffect } from "react";
import { useForm, SubmitHandler, useFieldArray } from "react-hook-form";
import { forms, buttons, layout, tables, text, utils } from "../constants/Styles";


import { Trash2 } from 'lucide-react';

import { SupplierCreditNoteInputs,
    allSupplierInvoiceInputs,
    SupplierProfileInterface
 } from "../Interfaces";

import { ProductItemInterface } from "../../Products/Interfaces"
import { ControlAccountInterface } from "../../ChartOfAccounts/Interfaces"

import { CurrencyInterface, AgentInterface } from "../../Core/Interfaces"



const formatSupplierNumber = () => {
    const currentYear = new Date().getFullYear();
    return `SUP-${currentYear}-`;
};

const formatProductItemCode = () => {
    return `SKU`;
};


const formatSupplierInvoiceNumber = () => {
    const currentYear = new Date().getFullYear();
    return `SI-${currentYear}-`;
};


const decimalPlaces = (amount: number) => {
    return `${amount.toFixed(2)};`
};







const SupplierCreditNoteForm: React.FC<any> = ({ onSubmit, isSubmitting, onCancel, supplierInvoices, 
    currencies, accounts, agents, supplierProfiles, productItems }) => {

        const { register, handleSubmit, watch, setValue, control, 
            formState: { errors } } = useForm<SupplierCreditNoteInputs>({
                defaultValues: {
                    related_credit_note: [
                        {
                            amount: 0.00,
                            tax_amount: 0.00
                        }
                    ]
                }
            });

            const { fields, append, remove } = useFieldArray({
                name: "related_credit_note",
                control
            });


            const selectedControlAccount = watch("account.account_code");
            useEffect(() => {
                if (selectedControlAccount) {

                    const selectedCodeNumber = Number(selectedControlAccount);
                    console.log("🔍 Converting:", selectedControlAccount, "→", selectedCodeNumber);

                    const selectedAccount = accounts.find((a: ControlAccountInterface) => 
                        a.account_code === selectedCodeNumber);

                    console.log(" ✅ Found account:", selectedAccount);

                    if (selectedAccount) {
                        setValue("account.account_name", selectedAccount.account_name);
                        setValue("account.account_type", selectedAccount.account_type);
                    }
                }
            }, [selectedControlAccount, accounts, setValue])



            return(
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className={forms.body}>
                        <div className={layout.header}>
                            <div className={layout.tag}>

                                <div className="text-right">
                                    <div className={layout.badge}>
                                        <div className={text.badgeSmall}>NEW</div>
                                        <div className={text.badgeLarge}>
                                            SUPPLIER CREDIT NOTE
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
                                >
                                    <option value=""></option>
                                    {accounts.map((account: ControlAccountInterface) => (
                                        <option key={account.account_code} value={account.account_code}>
                                            {account.account_code} ({account.account_name})
                                        </option>
                                    ))}
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
                                    <option value=""></option>
                                    {supplierProfiles.map((supplier: SupplierProfileInterface) => (
                                        <option key={supplier.supplier_code} value={supplier.supplier_code}>
                                            {formatSupplierNumber()}{supplier.supplier_code} | {supplier.supplier_name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            
                            <div>
                                <p className={forms.label}>Related Invoice</p>
                                <select
                                    {...register("related_invoice")}
                                    className={forms.select.partial}
                                >
                                    <option value=""></option>
                                    {supplierInvoices.map((invoice: allSupplierInvoiceInputs) => (
                                        <option key={invoice.invoice_number} value={invoice.invoice_number}>
                                            {formatSupplierInvoiceNumber()}{invoice.invoice_number} | {invoice.supplierInvoiceData.supplier_details}
                                        </option>
                                    ))}
                                </select>
                            </div>
                                                        
                            <div>
                                <p className={forms.label}>Currency</p>
                                <select
                                    {...register("currency")}
                                    className={forms.select.partial}
                                >
                                    <option value=""></option>
                                    {currencies.map((currency: CurrencyInterface) => (
                                        <option key={currency.currency_code} value={currency.currency_code}>
                                            {currency.currency_code}
                                        </option>
                                    ))}
                                </select>
                            </div>
                                                        
                            <div>
                                <p className={forms.label}>Agent</p>
                                <select
                                    {...register("agent")}
                                    className={forms.select.partial}
                                >
                                    <option value=""></option>
                                    {agents.map((agent: AgentInterface) => (
                                        <option key={agent.username} value={agent.username}>
                                            {agent.username}
                                        </option>
                                    ))}
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
                                    <thead className={tables.header}>
                                        <tr>
                                            <th className={tables.headerCell}>Item</th>
                                            <th className={tables.headerCell}>Amount</th>
                                            <th className={tables.headerCell}>Tax Inclusive</th>
                                            <th className={tables.headerCell}>Tax Amount</th>
                                            <th className={tables.headerCell}>SubTotal(After Tax)</th>
                                            <th></th>
                                        </tr>
                                    </thead>

                                    <tbody className={tables.body}>
                                        {fields.map((field, index) => (
                                            <tr key={field.id} className={tables.row}>
                                                <td>
                                                    <select 
                                                        {...register(`related_credit_note.${index}.credit_note_item_name`)}
                                                        className={forms.select.small}
                                                    >
                                                        <option value=""></option>
                                                        {productItems.map((productItem: ProductItemInterface) => (
                                                            <option key={productItem.item_code} value={productItem.item_code}>
                                                                {formatProductItemCode()}{productItem.item_code} | {productItem.item_description}
                                                            </option>
                                                        ))}
                                                    </select>
                                                </td>

                                                <td className={text.numbers}>
                                                    <input 
                                                        type="number"
                                                        {...register(`related_credit_note.${index}.amount`)}
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
                                                        {...register(`related_credit_note.${index}.tax_inclusive`)} 
                                                    />
                                                </td>
                                                
                                                <td className={text.numbers}>
                                                    <input 
                                                        type="number"
                                                        {...register(`related_credit_note.${index}.tax_amount`)}
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
                                                        Number(watch(`related_credit_note.${index}.amount`) || 0.00) +
                                                        Number(watch(`related_credit_note.${index}.tax_amount`) || 0.00)
                                                    )}
                                                </td>
                                                
                                                <td>
                                                    <button 
                                                        type="button"
                                                        title="remove"
                                                        onClick={() => remove(index)}
                                                    >
                                                        <Trash2 size={16} strokeWidth={2}/>
                                                    </button> 
                                                    
                                                </td>
                                            </tr>
                                        ))}
                                        <tr>
                                            <td>
                                                <button
                                                    type="button"
                                                    onClick={() => append({
                                                        credit_note_item_name: "",
                                                        amount: 0.00,
                                                        tax_inclusive: false,
                                                        tax_amount: 0.00
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
                                            Creating Supplier Credit Note...
                                        </span>
                                    ) : (
                                        'Create Supplier Credit Note'
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            );
    };
    export default SupplierCreditNoteForm;
