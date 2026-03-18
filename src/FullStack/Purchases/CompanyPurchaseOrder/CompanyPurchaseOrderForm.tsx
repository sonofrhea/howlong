import React, { useMemo } from "react";
import { useForm, useFieldArray } from "react-hook-form";



import { PURCHASE_ORDER_STATUS } from "../constants/options";
import { forms, buttons, layout, tables, text, utils } from "../constants/styles";

import { CompanyPurchaseOrderFormProps, CompanyPurchaseOrderInputs } from "../constants/Types";
import { SupplierProfileResponse } from "../../Suppliers/constants/Types";

import { ControlAccountInterface } from "../../ChartOfAccounts/Interfaces";
import { AgentInterface } from "../../Core/constants/Types";
import { CompanyPurchaseInvoiceResponse } from "../constants/Types";
import { companyPurchaseAccountHandler, companyPurchaseInvoiceTotal } from "../../handlers";

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
    return `${amount.toFixed(2)}`;
};














const CompanyPurchaseOrderForm: React.FC<CompanyPurchaseOrderFormProps> = ({
    onSubmit,
    isSubmitting,
    onCancel, 
    accounts,
    agents,
    supplierProfiles,
    purchaseInvoices,
 }) => {


        const { register, handleSubmit, watch, setValue, 
            control, formState: { errors } } = useForm<CompanyPurchaseOrderInputs>({
                defaultValues: {
                    related_purchase: [
                        {
                            total_paid: 0.00,
                            tax_inclusive: false,
                            tax_amount: 0.00,
                            cancelled: false
                        }
                    ],
                    tax_inclusive: false,
                    tax_amount: 0.00,
                    status: 'Unpaid' as any
                }
            });


            const { fields, append, remove } = useFieldArray({
                name: "related_purchase",
                control
            });



const accountChange = companyPurchaseAccountHandler(accounts, setValue);
const invoiceChange = companyPurchaseInvoiceTotal(purchaseInvoices, setValue);






            





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
                                <a className={forms.label} style={{ fontFamily: 'Montserrat, system-ui', fontSize: '12px' }}>Date</a><br />
                                <input 
                                    type="date"
                                    {...register("date", {required: "Date is required"})}
                                    className={forms.input.date}
                                />
                                {errors.date && <p className="text-amber-600 text-sm">{errors.date?.message}</p>}
                            </div>
                            
                            <div>
                                <a className={forms.label} style={{ fontFamily: 'Montserrat, system-ui', fontSize: '12px' }}>Related Supplier</a><br />
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
                                <a className={forms.label} style={{ fontFamily: 'Montserrat, system-ui', fontSize: '12px' }}>Purchase Account</a><br />
                                <select
                                    {...register("account.account_code")}
                                    className={forms.select.partial}
                                    onChange={accountChange}
                                >
                                    <option value="">select...</option>
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
                                <a className={forms.label} style={{ fontFamily: 'Montserrat, system-ui', fontSize: '12px' }}>Related Invoice</a><br />
                                <select
                                    {...register("related_invoice")}
                                    className={forms.select.partial}
                                    onChange={invoiceChange}
                                >
                                    <option value="">select...</option>
                                    {useMemo(() => purchaseInvoices.map((invoice: CompanyPurchaseInvoiceResponse) => (
                                        <option key={invoice.purchase_invoice_number} value={invoice.purchase_invoice_number}>
                                            {formatPurchaseInvoiceNumber()}{invoice.purchase_invoice_number} | Total: {invoice.net_total}
                                        </option>
                                    )), [purchaseInvoices])}
                                </select>
                            </div>
        
                            <div>
                                <a className={forms.label} style={{ fontFamily: 'Montserrat, system-ui', fontSize: '12px' }}>Related Invoice Total</a><br />
                                <input 
                                    {...register("invoice_total")}
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
                                <a className={forms.label} style={{ fontFamily: 'Montserrat, system-ui', fontSize: '12px' }}>Status</a><br />
                                <select
                                    {...register("status")}
                                    className={forms.select.partial}
                                >
                                    <option value="">select...</option>
                                    {useMemo(() => PURCHASE_ORDER_STATUS.map(option => (
                                        <option key={option} value={option} >
                                            {option}
                                        </option>
                                    )), [agents])}
                                </select>
                            </div>
        
                            <div>
                                <a className={forms.label} style={{ fontFamily: 'Montserrat, system-ui', fontSize: '12px' }}>Agent</a><br />
                                <select
                                    {...register("agent")}
                                    className={forms.select.partial}
                                >
                                    <option value="">select...</option>
                                    {useMemo(() => agents.map((agent: AgentInterface) => (
                                        <option key={agent.email} value={agent.email}>
                                            {agent.email} | {agent.name}
                                        </option>
                                    )), [agents])}
                                </select>
                            </div>
        
                            <div>
                                <a className={forms.label} style={{ fontFamily: 'Montserrat, system-ui', fontSize: '12px' }}>Cancelled</a><br />
                                <input 
                                {...register("cancelled")}
                                type="checkbox"
                                className="mt-3 forced-colors:bg-green-300"
                                />
                            </div>
                        </div>

                        <div>
                            <p className={forms.label} style={{ fontFamily: 'Montserrat, system-ui', fontSize: '12px' }}>Address</p>
                            <textarea 
                                {...register("address")}
                                className={forms.description}
                                rows={2}
                            />
                        </div>

                        <div>
                            <p className={forms.label} style={{ fontFamily: 'Montserrat, system-ui', fontSize: '12px' }}>Description</p>
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
                                            'w-1/6 text-center',
                                            'w-1/6 text-center',
                                            'w-1/6 text-center',
                                            'w-1/6 text-center',
                                            'w-1/6 text-center',
                                            'w-1/6 text-center',
                                            'w-[7%] text-center',
                                        ].map((line, index) => (
                                            <col key={index} className={line} />
                                        ))}
                                    </colgroup>
                                    <thead className={tables.header}>
                                        <tr>
                                            <th className={tables.headerCell}>Date</th>
                                            <th className={tables.headerCell}>Total Paid</th>
                                            <th className={tables.headerCell}>Tax Inclusive</th>
                                            <th className={tables.headerCell}>SST %</th>
                                            <th className={tables.headerCell}>Cancelled</th>
                                            <th className={tables.headerCell}>SubTotal<br></br>(After SST)</th>
                                            <th className={tables.headerCell}></th>
                                        </tr>
                                    </thead>

                                    <tbody className={tables.body}>
                                        {fields.map((field, index) => {

                                            let total_paid = Number(watch(`related_purchase.${index}.total_paid`)) || 0.00;
                                            let tax_amt = Number(watch(`related_purchase.${index}.tax_amount`)) || 0.00;
                                            let tax_inclusive = watch(`related_purchase.${index}.tax_inclusive`) || false;

                                            let tax_rate = tax_amt / 100;

                                            if (!tax_inclusive) {
                                                tax_amt = Number(0.00);
                                            }

                                            const sub_total = total_paid + (total_paid * tax_rate);


                                            return(
                                                <tr key={field.id} className={tables.row}>
                                                    <td className={tables.cell}> 
                                                        <input 
                                                            type="date"
                                                            {...register(`related_purchase.${index}.payment_date`)}
                                                            className={forms.input.number}
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
                                                                    e.target.value = decimalPlaces(Number(e.target.value));
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
                                                            {...register(`related_purchase.${index}.tax_amount`)}
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
                                                            {...register(`related_purchase.${index}.cancelled`)}
                                                            type="checkbox"
                                                        />
                                                    </td>

                                                    <td className={tables.autoCalculate}>
                                                        {decimalPlaces(sub_total)}
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
                                            );
                                        })}
                                        <tr>
                                            <td className={tables.headerCell}>
                                                <button
                                                    type="button"
                                                    onClick={() => append({
                                                        payment_date: "",
                                                        total_paid: 0.00,
                                                        tax_inclusive: true,
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
