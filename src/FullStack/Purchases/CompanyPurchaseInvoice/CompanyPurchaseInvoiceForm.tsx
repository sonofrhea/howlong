import React, { useMemo } from "react";
import { useForm, useFieldArray } from "react-hook-form";


import { PURCHASE_INVOICE_STATUS } from "../constants/options";

import { forms, buttons, layout, tables, text, utils } from "../constants/styles";

import { CompanyPurchaseInvoiceInputs } from "../constants/Types";

import { AgentInterface } from "../../Core/constants/Types";
import { SupplierProfileResponse } from "../../Suppliers/constants/Types";
import { ProductItemCreateResponse } from "../../Products/constants/Types";

import { Trash2 } from "lucide-react";




const formatSupplierNumber = () => {
    const currentYear = new Date().getFullYear();
    return `SUP-${currentYear}-`;
};


const decimalPlaces = (amount: number) => {
    return `${amount.toFixed(2)};`
};




const CompanyPurchaseInvoiceForm: React.FC<any> = ({ onSubmit, isSubmitting, onCancel, 
    agents, products, suppliers }) => {

        const productOption = useMemo(() => products.map((product: ProductItemCreateResponse) => (
                            <option key={product.item_code} value={product.item_code}>
                                SKU-{product.item_code} - {product.item_description}
                            </option>
                        )), [products])


        const { register, handleSubmit, watch, setValue, 
            control, formState: { errors } } = useForm<CompanyPurchaseInvoiceInputs>({
                defaultValues: {
                    tax: 0.00,
                    status: 'Active' as any,
                    related_invoice: [
                        {
                            quantity: 1,
                            price: 0.00,
                            tax: 0.00,
                        }
                    ],
                }
            });


            const { fields, append, remove } = useFieldArray({
                name: "related_invoice",
                control
            });










            return(
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className={forms.body}>
                        <div className={layout.header}>
                            <div className={layout.tag}>

                                <div className="text-right">
                                    <div className={layout.badge}>
                                        <div className={text.badgeSmall}>NEW</div>
                                        <div className={text.badgeLarge}>
                                            COMPANY PURCHASE INVOICE
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <hr className="my-6 border-gray-200" />

                        <div className={layout.formSectionCol2}>
                            <div>
                                <p className={forms.label}>Date</p>
                                <input 
                                    type="date"
                                    {...register("date", {required: "Date is required"})}
                                    className={forms.input.date}
                                />
                                {errors.date && <p className="text-amber-600 text-sm">{errors.date?.message}</p>}
                            </div>

                            <div>
                                <p className={forms.label}>Related Supplier</p>
                                <select
                                    {...register("supplier")}
                                    className={forms.select.partial}
                                >
                                    <option value="">select...</option>
                                    {useMemo(() => suppliers.map((supplier: SupplierProfileResponse) => (
                                        <option key={supplier.supplier_code} value={supplier.supplier_code}>
                                            {formatSupplierNumber()}{supplier.supplier_code} | {supplier.supplier_name}
                                        </option>
                                    )), [suppliers])}
                                </select>
                            </div>

                            <div>
                                <p className={forms.label}>Agent</p>
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

                            <div>
                                <p className={forms.label}>Status</p>
                                <select
                                    {...register("status")}
                                    className={forms.select.partial}
                                >
                                    <option value="">select...</option>
                                    {useMemo(() => PURCHASE_INVOICE_STATUS.map(option => (
                                        <option key={option.value} value={option.value}>
                                            {option.label}
                                        </option>
                                    )), [PURCHASE_INVOICE_STATUS])}
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

                        <div className="p-6">
                            <div className="w-full">
                                <table className="w-full table-fixed divide-y border divide-x divide-gray-200 drop-shadow-md shadow-inner">
                                    <colgroup>
                                        {[
                                            'w-1/11 text-center',
                                            'w-1/11 text-center',
                                            'w-1/11 text-center',
                                            'w-1/11 text-center',
                                            'w-1/11 text-center',
                                            'w-1/11 text-center',
                                            'w-1/11 text-center',
                                            'w-1/11 text-center',
                                            'w-1/11 text-center',
                                            'w-1/11 text-center',
                                            'w-[9%] text-center',
                                        ].map((line, index) => (
                                            <col key={index} className={line} />
                                        ))}
                                    </colgroup>
                                    <thead className={tables.header}>
                                        <tr>
                                            <th className={tables.headerCell}>Item</th>
                                            <th className={tables.headerCell}>Description</th>
                                            <th className={tables.headerCell}>Quantity</th>
                                            <th className={tables.headerCell}>Base UOM</th>
                                            <th className={tables.headerCell}>Price</th>
                                            <th className={tables.headerCell}>Gross Total</th>
                                            <th className={tables.headerCell}>Tax Inclusive</th>
                                            <th className={tables.headerCell}>Tax %</th>
                                             <th className={tables.headerCell}>Cancelled</th>
                                            <th className={tables.headerCell}>SubTotal</th>
                                            <th></th>
                                        </tr>
                                    </thead>

                                    <tbody className={tables.body}>
                                        {fields.map((field, index) => (
                                            <tr key={field.id} className={tables.row}>
                                                <td>
                                                    <select
                                                        {...register(`related_invoice.${index}.product_item`)}
                                                        className={forms.select.full}
                                                    >
                                                        <option value="">select...</option>
                                                        {productOption}
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
                                                        type="number"
                                                        className={forms.input.number}
                                                    />
                                                </td>

                                                <td className={tables.cell}>
                                                    <input 
                                                        {...register(`related_invoice.${index}.base_unit_of_measure`)}
                                                        className={tables.text}
                                                    />
                                                </td>

                                                <td className={text.numbers}>
                                                    <input 
                                                        {...register(`related_invoice.${index}.price`)}
                                                        type="number"
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
                                                        Number(watch(`related_invoice.${index}.quantity`) || 1) *
                                                        Number(watch(`related_invoice.${index}.price`) || 0.00)
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
                                                        {...register(`related_invoice.${index}.tax`)}
                                                        type="number"
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
                                                    {(() => {
                                                        const quantity = watch(`related_invoice.${index}.quantity`) || 0.00;
                                                        const price_per_unit = watch(`related_invoice.${index}.price`) || 0.00;
                                                        let tax_amount = watch(`related_invoice.${index}.tax`) || 0.00;
                                                        const tax_inclusive = watch(`related_invoice.${index}.tax_inclusive`) || false;

                                                        let total = quantity * price_per_unit;

                                                        if (!tax_inclusive) {
                                                            tax_amount = 0.00;
                                                        }

                                                        total *= 1 + (tax_amount / 100);

                                                        return decimalPlaces(total);
                                                    })()}
                                                </td>

                                                <td className={tables.cell}>
                                                    <input 
                                                        type="checkbox"
                                                        {...register(`related_invoice.${index}.cancelled`)}
                                                    />
                                                </td>

                                                <td>
                                                    <button
                                                        type="button"
                                                        title="remove"
                                                        onClick={() => remove(index)}
                                                    >
                                                        <Trash2 size={16} strokeWidth={1.5} />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                        <tr>
                                            <td className={tables.headerCell}>
                                                <button
                                                     type="button"
                                                     onClick={() => append({
                                                        product_item: "",
                                                        description: "",
                                                        quantity: 1,
                                                        base_unit_of_measure: "",
                                                        price: 0.00,
                                                        cancelled: false,
                                                        tax_inclusive: true,
                                                        tax: 0.00
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
                                            <div>Tax Amount</div>
                                            <input 
                                                type="number"
                                                {...register("tax")}
                                                className={forms.input.smallNumber}
                                                placeholder="0.00"
                                                step="0.01" min="0.00" onBlur={(e) => {
                                                    if (e.target.value) {
                                                        e.target.value = parseFloat(e.target.value).toFixed(2);
                                                    }
                                                }}
                                                
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
                                            Creating Purchase Invoice...
                                        </span>
                                    ) : (
                                        'Create Purchase Invoice'
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            );
    };
    export default CompanyPurchaseInvoiceForm;