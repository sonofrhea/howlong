import React, { useMemo, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";

import { QuotationFormProps, QuotationInputs } from "../Constants/Types";

import { AgentInterface,CurrencyInterface } from "../../Core/constants/Types"
import { CustomerCreateResponse } from "../../Customers/constants/Types";
import { ProductItemCreateResponse } from "../../Products/constants/Types"
import { buttons, forms, layout, tables, text, utils } from "../Constants/Styles";
import { Plus, Trash2 } from "lucide-react";

import CustomerProfileModal from "../../Customers/CustomerProfile/CustomerProfileModal";
import { fetchBanks } from "../../Core/Engines";





const decimalPlaces = (amount: number) => {
    return `${amount.toFixed(2)}`;
};







const QuotationForm: React.FC<QuotationFormProps> = ({
    onSubmit,
    isSubmitting,
    onCancel,
    customers,
    currencies,
    agents,
    productItems,
    banks,
    onCreateCustomer, isCreatingCustomer
}) => {
    const [isCustomerOpen, setIsCustomerOpen] = useState(false);

        const productOptions = useMemo(() => 
            productItems.map((product: ProductItemCreateResponse) => (
            <option key={product.item_code} value={product.item_code}>
                SKU-{product.item_code} | {product.item_description}
            </option>
        )), [productItems])
        
        const { register, handleSubmit, watch, setValue,
             control, formState: { errors } } = useForm<QuotationInputs>({
            defaultValues: {
                cancelled: false,
                related_quotation: [
                    {
                        quantity: 1.00,
                        price_per_unit: 0.00,
                        cancelled: false,
                        taxable: false,
                        sst_percent: 0.00
                    }
                ],
                taxable: false,
                tax_percent: 0.00,
                discount_percent: 0.00,
                discount: false,
            }
        });


        const { fields, append, remove } = useFieldArray({
            name: "related_quotation",
            control
        });














        return(
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className={forms.body}>
                    <div className={layout.header}>
                        <div className={layout.tag}>

                            <div className="text-right">
                                <div className={layout.badge}>
                                    <div className={text.badgeExtraLarge}>NEW</div>
                                    <div className={text.badgeLarge}>
                                        CUSTOMER QUOTATION
                                    </div>
                                </div>
                                <div className="mt-10 border-t border-b border-gray-100 grid-cols-2 gap-6">
                                    <div className={forms.label} style={{ fontFamily: 'Montserrat, system-ui', fontSize: '12px' }}>
                                        <div>
                                            <strong >Valid until:  </strong>
                                            <span>
                                                <input 
                                                    type="date"
                                                    {...register("valid_until", {required: "Date is required"})}
                                                    className={forms.input.date}
                                                />
                                                {errors?.valid_until && <p className="text-amber-800 text-sm">{errors?.valid_until?.message}</p>}
                                            </span>
                                        </div>
                                    </div>

                                    <div className={forms.label} style={{ fontFamily: 'Montserrat, system-ui', fontSize: '12px' }}>
                                        <div>
                                            <strong >Cancelled:  </strong>
                                            <span>
                                                <input 
                                                    type="checkbox"
                                                    {...register("cancelled")}
                                                    className="text-black cursor-pointer"
                                                />
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <hr className="my-6 border-gray-200" />

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6 m-10 items-end">
                        {/* Bill To Column */}
                        <div className="flex flex-col w-full">
                        <label className="block text-xs font-bold text-gray-500 uppercase mb-1 ml-1">
                            Bill To
                        </label>
                        
                        <div className="flex items-center group">
                            {/* The Plus Button - Positioned exactly in front */}
                            <button
                            type="button"
                            onClick={() => setIsCustomerOpen(true)}
                            className="flex items-center justify-center h-10 px-3 bg-purple-600 hover:bg-purple-700 text-white rounded-l-md border-y border-l border-purple-600 transition-colors shadow-sm"
                            title="Add New Customer"
                            >
                            <Plus size={18} strokeWidth={2.5} />
                            </button>

                            {/* The Select - Rounded only on the right to merge with the button */}
                            <select
                            {...register("customer")}
                            className="flex-1 h-10 block w-full px-3 bg-white border border-gray-300 rounded-r-md border-l-0 focus:ring-1 focus:ring-purple-500 focus:border-purple-500 outline-none text-sm transition-all"
                            >
                            <option value="">Select customer...</option>
                            {useMemo(() => customers.map((customer: CustomerCreateResponse) => (
                                <option key={customer.customer_number} value={customer.customer_number}>
                                {customer.formatted_number} | {customer.customer_name || '--'}
                                </option>
                            )), [customers])}
                            </select>
                        </div>
                        </div>

                        {/* Project Description Column - Kept for alignment check */}
                        <div className="flex flex-col w-full">
                        <label className="block text-xs font-bold text-gray-500 uppercase mb-1 ml-1">
                            Project Description
                        </label>
                        <input 
                            type="text"
                            {...register("project_description")}
                            className="h-10 w-full px-3 bg-white border border-gray-300 rounded-md focus:ring-1 focus:ring-purple-500 focus:border-purple-500 outline-none text-sm"
                        />
                        </div>

                        {/* Prepared By Column - Kept for alignment check */}
                        <div className="flex flex-col w-full">
                        <label className="block text-xs font-bold text-gray-500 uppercase mb-1 ml-1">
                            Prepared By
                        </label>
                        <select
                            {...register("agent")}
                            className="h-10 w-full px-3 bg-white border border-gray-300 rounded-md focus:ring-1 focus:ring-purple-500 focus:border-purple-500 outline-none text-sm"
                        >
                            <option value="">Select agent...</option>
                            {useMemo(() => agents.map((agent: AgentInterface) => (
                            <option key={agent.email} value={agent.email}>
                                {agent.name}
                            </option>
                            )), [agents])}
                        </select>
                        </div>
                    </div>

                    <div>
                        <p className={forms.label} style={{ fontFamily: 'Montserrat, system-ui', fontSize: '12px' }}>Customer additional Details...</p>
                        <textarea 
                            rows={4}
                            {...register("customer_details")}
                            className={forms.description}
                        />
                    </div>

                    {/* LINES */}
                    <div className="p-6">
                        <div className="w-full">
                            <table className="w-full table-fixed divide-y border divide-x divide-gray-200 drop-shadow-md shadow-inner">
                                <colgroup>
                                    {[
                                        'w-1/13 text-center',
                                        'w-1/13 text-center',
                                        'w-1/13 text-center',
                                        'w-1/13 text-center',
                                        'w-1/13 text-center',
                                        'w-1/13 text-center',
                                        'w-1/13 text-center',
                                        'w-1/13 text-center',
                                        'w-1/13 text-center',
                                        'w-1/13 text-center',
                                        'w-1/13 text-center',
                                        'w-1/13 text-center',
                                        'w-[5%] text-center',
                                    ].map((line, index) => (
                                        <col key={index} className={line} />
                                    ))}
                                </colgroup>
                                <thead className={tables.header}>
                                <tr>
                                    <th className={tables.headerCell}>Item</th>
                                    <th className={tables.headerCell}>Description</th>
                                    <th className={tables.headerCell}>Qty</th>
                                    <th className={tables.headerCell}>UOM</th>
                                    <th className={tables.headerCell}>Price Per Unit</th>
                                    <th className={tables.headerCell}>Currency</th>
                                    <th className={tables.headerCell}>Sub-Total</th>
                                    <th className={tables.headerCell}>Taxable?</th>
                                    <th className={tables.headerCell}>SST %</th>
                                    <th className={tables.headerCell}>SST Amount</th>
                                    <th className={tables.headerCell}>Total</th>
                                    <th className={tables.headerCell}>Cancelled</th>
                                    <th></th>
                                </tr>
                                </thead>

                                <tbody className={tables.body}>
                                    {fields.map((field, index) => {

                                    const quantity = watch(`related_quotation.${index}.quantity`) || 0.00;
                                    const price_per_unit = watch(`related_quotation.${index}.price_per_unit`) || 0.00;
                                    let tax_amount = watch(`related_quotation.${index}.sst_percent`) || 0.00;
                                    const tax_inclusive = watch(`related_quotation.${index}.taxable`) || false;

                                    let total = quantity * price_per_unit;

                                    if (!tax_inclusive) {
                                        tax_amount = 0.00;
                                    }
                                    
                                    const amount = quantity * price_per_unit
                                    const tax = tax_amount / 100
                                    const sstAmount = total * tax
                                    const fullTotal = amount + sstAmount



                                        return(
                                            <tr key={field.id} className={tables.row}>
                                                <td>
                                                    <select
                                                        {...register(`related_quotation.${index}.item`)}
                                                        className={forms.select.full}
                                                    >
                                                        <option value="">select...</option>
                                                        {productOptions}
                                                    </select>
                                                </td>
                                                <td className={tables.cell}>
                                                    <input 
                                                        {...register(`related_quotation.${index}.description`)}
                                                        className={tables.text}
                                                    />
                                                </td>
                                                <td className={text.numbers}>
                                                    <input 
                                                        {...register(`related_quotation.${index}.quantity`)}
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
                                                <td className={tables.cell}>
                                                    <input 
                                                        {...register(`related_quotation.${index}.unit_of_measure`)}
                                                        className={tables.text}
                                                    />
                                                </td>
                                                <td className={tables.cell}>
                                                    <input 
                                                        {...register(`related_quotation.${index}.price_per_unit`)}
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
                                                <td className={tables.cell}>
                                                    <select
                                                        {...register(`related_quotation.${index}.currency`)}
                                                        className={forms.select.full}
                                                    >
                                                        <option value="">select...</option>
                                                        {currencies.map((currency: CurrencyInterface) => (
                                                            <option key={currency.currency_code} value={currency.currency_code}>
                                                                {currency.currency_code}
                                                            </option>
                                                        ))}
                                                    </select>
                                                </td>
                                                <td className={tables.autoCalculate}>
                                                    {decimalPlaces(amount)}
                                                    
                                                </td>
                                                
                                                <td className={tables.cell}>
                                                    <input 
                                                        type="checkbox"
                                                        {...register(`related_quotation.${index}.taxable`)}
                                                        className="text-black cursor-pointer"
                                                    />
                                                </td>

                                                <td className={tables.cell}>
                                                    <input 
                                                        {...register(`related_quotation.${index}.sst_percent`)}
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
                                                    {decimalPlaces(sstAmount)}
                                                </td>

                                                <td className={tables.autoCalculate}>
                                                    {decimalPlaces(fullTotal)}
                                                </td>
                                                
                                                <td className={tables.cell}>
                                                    <input 
                                                        type="checkbox"
                                                        {...register(`related_quotation.${index}.cancelled`)}
                                                        className="text-black cursor-pointer"
                                                    />
                                                </td>
                                                <td>
                                                    <button
                                                        type="button"
                                                        title="remove"
                                                        onClick={() => remove(index)}
                                                    >
                                                        <Trash2 size={20} color="#000000" strokeWidth={1} />
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
                                                    item: undefined, 
                                                    description: undefined,
                                                    quantity: 0, 
                                                    unit_of_measure: undefined, 
                                                    price_per_unit: 0.00, 
                                                    currency: undefined,
                                                    taxable: false,
                                                    sst_percent: 0.00,
                                                    cancelled: false 
                                                    })}
                                                className="min-w-full divide-y divide-gray-100"
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

                                    <div className="flex justify-between text-sm text-gray-600 mt-2">
                                        <div>Discount %</div>
                                        <input 
                                            type="number"
                                            {...register("discount")}
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
                                        <div>Cancelled? </div>
                                        <input 
                                            type="checkbox"
                                            {...register("cancelled")}
                                            className="text-black cursor-pointer"
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
                                        Creating Quotation...
                                    </span>
                                ) : (
                                    'Create Quotation'
                                )}
                            </button>
                        </div>
                    </div>
                </div>
                <CustomerProfileModal 
                    isOpen={isCustomerOpen}
                    onClose={() => setIsCustomerOpen(false)}
                    onCreate={onCreateCustomer}
                    banks={banks}
                    currencies={currencies}
                />
            </form>
        );
    };
    export default QuotationForm;
