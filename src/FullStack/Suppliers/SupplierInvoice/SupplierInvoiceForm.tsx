import React, { useEffect } from "react";
import { useForm, SubmitHandler, useFieldArray } from "react-hook-form";
import { forms, buttons, layout, tables, text, utils } from "../constants/Styles"


import { Trash2 } from 'lucide-react';

import {SupplierProfileInterface, SupplierInvoiceInputs } from "../Interfaces";


import { ControlAccountInterface } from "../../ChartOfAccounts/Interfaces";
import { SupplierInvoiceInterface } from "";

import { AgentInterface, CurrencyInterface } from "../../Core/Interfaces"
import { ProductItemInterface } from "../../Products/Interfaces"



const formatSupplierNumber = () => {
    const currentYear = new Date().getFullYear();
    return `SUP-${currentYear}-`;
};


const decimalPlaces = (amount: number) => {
    return `${amount.toFixed(2)};`
};



















const SupplierInvoiceForm: React.FC<any> = ({ onSubmit, isSubmitting, onCancel, currencies, 
    accounts, agents, supplierProfiles, productItems }) => {


        const { register, handleSubmit, watch, setValue, control, 
            formState: { errors } } = useForm<SupplierInvoiceInputs>({
                defaultValues: {
                    related_invoice: [
                        {
                            quantity: 0,
                            unit_per_price: 0.00,
                            tax_amount: 0.00
                        }
                    ]
                }
            });
            
            const { fields, append, remove } = useFieldArray({
                name: "related_invoice",
                control
            });



            const selectedControlAccount = watch("purchase_account.account_code");
            useEffect(() => {
                if (selectedControlAccount) {

                    const selectedCodeNumber = Number(selectedControlAccount);
                    console.log("🔍 Converting:", selectedControlAccount, "→", selectedCodeNumber);

                    const selectedAccount = accounts.find((a: ControlAccountInterface) => 
                        a.account_code === selectedCodeNumber
                    );
                    console.log(" ✅ Found account:", selectedAccount);

                    if (selectedAccount) {
                        setValue("purchase_account.account_name", selectedAccount.account_name);
                        setValue("purchase_account.account_type", selectedAccount.account_type);
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
                                            SUPPLIER INVOICE
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <hr className="my-6 border-gray-200" />

                        <div className={layout.formSectionCol2}>
                            <div>
                                <p className={forms.label}>Invoice Due Date</p>
                                <input 
                                    type="date"
                                    {...register("invoice_due_date")}
                                    className={forms.input.date}
                                />
                            </div>

                            <div>
                                <p className={forms.nextLevelLabel}>Purchase Account</p>
                                <select
                                    {...register("purchase_account.account_code")}
                                    className={forms.select.partial}
                                >
                                    <option value=""></option>
                                    {accounts.map((account: ControlAccountInterface) => (
                                        <option key={account.account_code} value={account.account_code}>
                                            {account.account_code} ({account.account_name})
                                        </option>
                                    ))}
                                </select>

                                <input type="hidden" {...register("purchase_account.account_name")} />
                                <input type="hidden" {...register("purchase_account.account_type")} />
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
                                <p className={forms.secondLevelLabel}>Currency</p>
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
                                <p className={forms.secondLevelLabel}>Agent</p>
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
                            
                            <div>
                                <p className={forms.secondLevelLabel}>Product</p>
                                <select
                                    {...register("product")}
                                    className={forms.select.partial}
                                >
                                    <option value=""></option>
                                    {productItems.map((product: ProductItemInterface) => (
                                        <option key={product.item_code} value={product.item_code}>
                                            {product.item_code} {product.item_description}
                                        </option>
                                    ))}
                                </select>
                            </div>
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
                                            <th className={tables.headerCell}>Item name</th>
                                            <th className={tables.headerCell}>description</th>
                                            <th className={tables.headerCell}>Quantity</th>
                                            <th className={tables.headerCell}>Unit of measure</th>
                                            <th className={tables.headerCell}>price per unit</th>
                                            <th className={tables.headerCell}>tax inclusive</th>
                                            <th className={tables.headerCell}>tax amount</th>
                                            <th className={tables.headerCell}>sub-total</th>
                                            <th></th>
                                        </tr>
                                    </thead>

                                    <tbody className={tables.body}>
                                        {fields.map((field, index) => (
                                            <tr key={field.id} className={tables.row}>
                                                <td>
                                                    <select
                                                        {...register(`related_invoice.${index}.item_name`)}
                                                        className={forms.select.full}
                                                    >
                                                        <option value=""></option>
                                                        {productItems.map((product: ProductItemInterface) => (
                                                            <option key={product.item_code} value={product.item_code}>
                                                                {product.item_code} | {product.item_description}
                                                            </option>
                                                        ))}
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
                                                        {...register(`related_invoice.${index}.unit_per_price`)}
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

                                                <td className={tables.autoCalculate}>
                                                    {decimalPlaces(
                                                        Number(watch(`related_invoice.${index}.quantity`) || 0.00) *
                                                        Number(watch(`related_invoice.${index}.unit_per_price`) || 0.00)
                                                    )}
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
                                        ))}
                                        <tr>
                                            <td>
                                                <button
                                                    type="button"
                                                    onClick={() => append({ 
                                                        item_name: "", 
                                                        description: "",
                                                        quantity: 0,
                                                        unit_of_measure: "",
                                                        unit_per_price: 0.00,
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