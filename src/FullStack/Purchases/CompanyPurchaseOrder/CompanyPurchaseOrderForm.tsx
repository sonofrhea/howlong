import React, { useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";



import { PURCHASE_ORDER_STATUS } from "../constants/options";
import { forms, buttons, layout, tables, text, utils } from "../constants/styles";

import { CompanyPurchaseOrderInputs, ControlAccountInterface,
    AgentInterface, CompanyPurchaseInvoiceInterface,
    SupplierProfileInterface
 } from "@/types";

import { Trash2 } from "lucide-react";


const formatSupplierNumber = () => {
    const currentYear = new Date().getFullYear();
    return `SUP-${currentYear}-`;
};


const formatPurchaseInvoiceNumber = () => {
    const currentYear = new Date().getFullYear();
    return `PI-${currentYear}-`;
};


const decimalPlaces = (amount: number) => {
    return `${amount.toFixed(2)};`
};




const CompanyPurchaseOrderForm = ({ onSubmit, isSubmitting, onCancel, 
    accounts, agents, supplierProfiles, purchaseInvoices }) => {


        const { register, handleSubmit, watch, setValue, 
            control, formState: { errors } } = useForm<CompanyPurchaseOrderInputs>({
                defaultValues: {
                    related_purchase: [
                        {
                            total_paid: 0.00,
                            tax_inclusive: true,
                            tax: 0.00
                        }
                    ],
                }
            });


            const { fields, append, remove } = useFieldArray({
                name: "related_purchase",
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



            const selectedPurchaseInvoice = watch("related_invoice");
            useEffect(() => {
                if (selectedPurchaseInvoice) {

                    const selectedInvoiceNumber = Number(selectedPurchaseInvoice)
                    console.log("🔍 Converting:", selectedPurchaseInvoice, "→", selectedInvoiceNumber);

                    const selectedInvoice = purchaseInvoices.find((invoice: CompanyPurchaseInvoiceInterface) =>
                        invoice.purchase_invoice_number === selectedInvoiceNumber);

                    console.log(" ✅ Found invoice:", selectedInvoice);

                    if (selectedInvoice) {
                        setValue("related_invoice_total", selectedInvoice.net_total);
                    }
                }
            }, [selectedPurchaseInvoice, purchaseInvoices, setValue])






            





            return(
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className={forms.body}>
                        <div className={layout.header}>
                            <div className={layout.tag}>

                                <div className="text-right justify-between">
                                    <div className={layout.redBadge}>
                                        <div className={text.badgeSmall}>NEW</div>
                                        <div className={text.badgeLarge}>
                                            COMPANY PURCHASE ORDER
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
                                <p className={forms.label}>Purchase Account</p>
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
                                <p className={forms.label}>Related Invoice</p>
                                <select
                                    {...register("related_invoice")}
                                    className={forms.select.partial}
                                >
                                    <option value=""></option>
                                    {purchaseInvoices.map((invoice: CompanyPurchaseInvoiceInterface) => (
                                        <option key={invoice.purchase_invoice_number} value={invoice.purchase_invoice_number}>
                                            {formatPurchaseInvoiceNumber()}{invoice.purchase_invoice_number} - {invoice.net_total}
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

                            <div>
                                <p className={forms.label}>Status</p>
                                <select
                                    {...register("status")}
                                    className={forms.select.partial}
                                >
                                    <option value=""></option>
                                    {PURCHASE_ORDER_STATUS.map(option => (
                                        <option key={option.value} value={option.value} >
                                            {option.label}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <hr className="my-6 border-gray-200" />

                        <div>
                            <p className={forms.label}>Address</p>
                            <textarea 
                                {...register("address")}
                                className={forms.description}
                                rows={2}
                            />
                        </div>

                        <hr className="my-6 border-gray-200" />

                        <div>
                            <p className={forms.label}>Description</p>
                            <textarea 
                                {...register("description")}
                                className={forms.description}
                                rows={2}
                            />
                        </div>

                        <hr className="my-6 border-gray-200" />

                        <div className="p-6">
                            <div className="w-full">
                                <table className={tables.base}>
                                    <colgroup>
                                        {[
                                            'w-1/5 text-center',
                                            'w-1/5 text-center',
                                            'w-1/5 text-center',
                                            'w-1/5 text-center',
                                            'w-1/5 text-center',
                                            'w-1/5 text-center',
                                            'w-[9%] text-center',
                                        ].map((line, index) => (
                                            <col key={index} className={line} />
                                        ))}
                                    </colgroup>
                                    <thead className={tables.header}>
                                        <tr>
                                            <th>Related Invoice Total</th>
                                            <th className={tables.headerCell}>Payment Date</th>
                                            <th className={tables.headerCell}>Total Paid</th>
                                            <th className={tables.headerCell}>Tax Inclusive</th>
                                            <th className={tables.headerCell}>Tax</th>
                                            <th className={tables.headerCell}>SubTotal<br></br>(After Tax)</th>
                                            <th></th>
                                        </tr>
                                    </thead>

                                    <tbody className={tables.body}>
                                        {fields.map((field, index) => (
                                            <tr key={field.id} className={tables.row}>
                                                <td className={tables.cell}>RM 
                                                    <input 
                                                        {...register("related_invoice_total")}
                                                        className={forms.input.midNumber}
                                                        readOnly
                                                    />
                                                </td>
                                                <td className={tables.cell}>
                                                    <input 
                                                        {...register(`related_purchase.${index}.payment_date`)}
                                                        type="date"
                                                        className={forms.input.date}
                                                    />
                                                </td>

                                                <td className={text.numbers}>
                                                    <input 
                                                        type="number"
                                                        {...register(`related_purchase.${index}.total_paid`)}
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
                                                        {...register(`related_purchase.${index}.tax_inclusive`)}
                                                        type="checkbox"
                                                    />
                                                </td>

                                                <td className={text.numbers}>
                                                    <input 
                                                        type="number"
                                                        {...register(`related_purchase.${index}.tax`)}
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
                                                        Number(watch(`related_purchase.${index}.total_paid`) || 0.00) +
                                                        Number(watch(`related_purchase.${index}.tax`) || 0.00)
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
                                                        payment_date: "",
                                                        total_paid: 0.00,
                                                        tax_inclusive: true,
                                                        tax: 0.00
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
                                            Creating Supplier Purchase Order
                                        </span>
                                    ) : (
                                        'Create Supplier Purchase Order'
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            );
    };
    export default CompanyPurchaseOrderForm;
