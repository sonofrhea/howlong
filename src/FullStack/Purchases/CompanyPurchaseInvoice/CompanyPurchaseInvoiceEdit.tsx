import React, { useMemo } from "react";
import { useForm, useFieldArray } from "react-hook-form";


import { PURCHASE_INVOICE_STATUS } from "../constants/options";

import { forms, buttons, layout, tables, text, utils, labelStyles } from "../constants/styles";

import { CompanyPurchaseInvoiceInputs, CompanyPurchaseInvoiceProps } from "../constants/Types";

import { AgentInterface } from "../../Core/constants/Types";
import { SupplierProfileResponse } from "../../Suppliers/constants/Types";
import { ProductItemCreateResponse } from "../../Products/constants/Types";

import { Trash2 } from "lucide-react";





const decimalPlaces = (amount: number) => {
    return `${amount.toFixed(2)}`
};








const CompanyPurchaseInvoiceEdit: React.FC<CompanyPurchaseInvoiceProps> = ({
    companyPurchaseInvoice,
    onSubmit,
    isSubmitting,
    onCancel, 
    agents, products, suppliers
}) => {
    const companyPurchaseInvoiceId = companyPurchaseInvoice?.purchase_invoice_number;

    const productOption = useMemo(() => products.map((product: ProductItemCreateResponse) => (
        <option key={product.item_code} value={product.item_code}>
            SKU-{product.item_code} - {product.item_description}
        </option>
    )), [products])


    const { register, handleSubmit, watch, setValue, 
        reset, control, formState: { errors } } = useForm<CompanyPurchaseInvoiceInputs>({
            defaultValues: companyPurchaseInvoice
        });

    
    React.useEffect(() => {
        if (!companyPurchaseInvoice) return;

        const updated = {
            ...companyPurchaseInvoice,
            date: companyPurchaseInvoice.date
                ? new Date(companyPurchaseInvoice.date).toISOString().split("T")[0]
                : "",
        }
        reset(updated)
    }, [companyPurchaseInvoice, reset]);


    
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
                            <div className={layout.redBadge}>
                                <p className={text.badgeLarge}>
                                    COMPANY PURCHASE INVOICE
                                </p>
                                <p className={labelStyles}>
                                    {companyPurchaseInvoice.formatted_number}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <hr className="my-6 border-gray-200" />

                <div className={layout.formSectionCol2}>
                    <div>
                        <p className={forms.label} style={{ fontFamily: 'Montserrat, system-ui', fontSize: '12px' }}>Date</p>
                        <input 
                            type="date"
                            {...register("date", {required: "Date is required"})}
                            className={forms.input.date}
                        />
                        {errors.date && <p className="text-amber-600 text-sm">{errors.date?.message}</p>}
                    </div>

                    <div>
                        <p className={forms.label} style={{ fontFamily: 'Montserrat, system-ui', fontSize: '12px' }}>Related Supplier</p>
                        <select
                            {...register("supplier")}
                            className={forms.select.partial}
                        >
                            <option value="">select...</option>
                            {useMemo(() => suppliers.map((supplier: SupplierProfileResponse) => (
                                <option key={supplier.supplier_code} value={supplier.supplier_code}>
                                    {supplier.formatted_number} | {supplier.supplier_name}
                                </option>
                            )), [suppliers])}
                        </select>
                    </div>

                    <div>
                        <p className={forms.label} style={{ fontFamily: 'Montserrat, system-ui', fontSize: '12px' }}>Agent</p>
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
                        <p className={forms.label} style={{ fontFamily: 'Montserrat, system-ui', fontSize: '12px' }}>Status</p>
                        <select
                            {...register("status")}
                            className={forms.select.partial}
                        >
                            <option value="">select...</option>
                            {useMemo(() => PURCHASE_INVOICE_STATUS.map(option => (
                                <option key={option} value={option}>
                                    {option}
                                </option>
                            )), [PURCHASE_INVOICE_STATUS])}
                        </select>
                    </div>
                </div>

                <hr className="my-6 border-gray-200" />

                <div>
                    <p className={forms.label} style={{ fontFamily: 'Montserrat, system-ui', fontSize: '12px' }}>Description</p>
                    <textarea 
                        {...register("description")}
                        className={forms.description}
                        rows={2}
                    />
                </div>

                <hr className="my-6 border-gray-200" />

                <div>
                    <p className={forms.label} style={{ fontFamily: 'Montserrat, system-ui', fontSize: '12px' }}>Address</p>
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
                                    'w-1/12 text-center',
                                    'w-1/12 text-center',
                                    'w-1/12 text-center',
                                    'w-1/12 text-center',
                                    'w-1/12 text-center',
                                    'w-1/12 text-center',
                                    'w-1/12 text-center',
                                    'w-1/12 text-center',
                                    'w-1/12 text-center',
                                    'w-1/12 text-center',
                                    'w-1/12 text-center',
                                    'w-[5%] text-center',
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
                                    <th className={tables.headerCell}>Taxable</th>
                                    <th className={tables.headerCell}>SST %</th>
                                    <th className={tables.headerCell}>SST Amount</th>
                                    <th className={tables.headerCell}>Cancelled</th>
                                    <th className={tables.headerCell}>SubTotal</th>
                                    <th></th>
                                </tr>
                            </thead>

                            <tbody className={tables.body}>
                                {fields.map((field, index) => {

                                    const quantity = Number(watch(`related_invoice.${index}.quantity`) || 0.00);
                                    const price_per_unit = Number(watch(`related_invoice.${index}.price`) || 0.00);
                                    let tax_amount = Number(watch(`related_invoice.${index}.sst_percent`) || 0.00);
                                    const tax_inclusive = watch(`related_invoice.${index}.taxable`) || false;

                                    const totalAmount = quantity * price_per_unit;
                                    const taxPercent = tax_amount / 100.00

                                    if (!tax_inclusive) {
                                        tax_amount = 0.00;
                                    }

                                    const taxAmount = totalAmount * taxPercent
                                    const TOTAL = totalAmount + taxAmount;

                                    return(
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
                                                            e.target.value = decimalPlaces(Number(e.target.value));
                                                        }
                                                    }}
                                                />
                                            </td>

                                            <td className={tables.autoCalculate}>
                                                {decimalPlaces(totalAmount)}
                                            </td>

                                            <td className={tables.cell}>
                                                <input 
                                                    type="checkbox"
                                                    {...register(`related_invoice.${index}.taxable`)}
                                                />
                                            </td>

                                            <td className={text.numbers}>
                                                <input 
                                                    {...register(`related_invoice.${index}.sst_percent`)}
                                                    type="number"
                                                    className={forms.input.number}
                                                    placeholder="0.00"
                                                    step="0.01" min="0.00" onBlur={(e) => {
                                                        if (e.target.value) {
                                                            e.target.value = decimalPlaces(Number(e.target.value));
                                                        }
                                                    }}
                                                />
                                            </td>

                                            <td className={tables.autoCalculate}>
                                                {decimalPlaces(taxAmount)}
                                            </td>

                                            <td className={tables.cell}>
                                                <input 
                                                    type="checkbox"
                                                    {...register(`related_invoice.${index}.cancelled`)}
                                                />
                                            </td>

                                            <td className={tables.autoCalculate}>
                                                {decimalPlaces(TOTAL)}
                                            </td>

                                            <td>
                                                <button
                                                    type="button"
                                                    title="remove"
                                                    onClick={() => remove(index)}
                                                >
                                                    <Trash2 size={14} strokeWidth={1.5} />
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
                                                    product_item: undefined,
                                                    description: undefined,
                                                    quantity: 1,
                                                    base_unit_of_measure: undefined,
                                                    price: 0.00,
                                                    cancelled: false,
                                                    taxable: false,
                                                    sst_percent: 0.00
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
                                    Updating Purchase Invoice...
                                </span>
                            ) : (
                                'Update Purchase Invoice'
                            )}
                        </button>
                        <button
                            onClick={() => onCancel(companyPurchaseInvoiceId)}
                            type="button"
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
export default CompanyPurchaseInvoiceEdit;
