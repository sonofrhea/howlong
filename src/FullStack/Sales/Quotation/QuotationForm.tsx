import React, { useMemo } from "react";
import { useForm, useFieldArray } from "react-hook-form";

import { QuotationFormProps, QuotationInputs } from "../Constants/Types";

import { AgentInterface,CurrencyInterface } from "../../Core/constants/Types"
import { CustomerCreateResponse } from "../../Customers/constants/Types";
import { ProductItemCreateResponse } from "../../Products/constants/Types"
import { buttons, forms, layout, tables, text, utils } from "../Constants/Styles";
import { Trash2 } from "lucide-react";



 const formatCustomerNumber = () => {
    const currentYear = new Date().getFullYear();
    return `CV-${currentYear}-`;
};



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
    productItems
}) => {

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
                    }
                ],
                tax_inclusive: false,
                tax_amount: 0.00,
                discount_amount: 0.00,
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
                                    <div className={forms.label}>
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

                                    <div className={forms.label}>
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

                    <div className={layout.formSectionCol3}>
                        <div>
                        <p className={forms.label}>Bill To</p>
                        <select
                            {...register("customer")}
                            className={forms.select.partial}
                        >
                            <option value="">select...</option>
                            {useMemo(() => customers.map((customer: CustomerCreateResponse) => (
                                <option key={customer.customer_number} value={customer.customer_number}>
                                    {formatCustomerNumber()}{customer.customer_number} | {customer.customer_name || '--'}
                                </option>
                            )), [customers])}
                        </select>
                        </div>

                        <div>
                            <p className={forms.label}>Project Description</p>
                            <input 
                                type="text"
                                {...register("project_description")}
                                className={forms.description}
                            />
                        </div>

                        <div>
                            <p className={forms.label}>Prepared By</p>
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
                    </div>
                        <div>
                            <p className={forms.label}>Customer additional Details...</p>
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
                                        'w-1/11 text-center',
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
                                    <th className={tables.headerCell}>SST Inclusive?</th>
                                    <th className={tables.headerCell}>SST %</th>
                                    <th className={tables.headerCell}>Total</th>
                                    <th className={tables.headerCell}>Cancelled</th>
                                    <th></th>
                                </tr>
                                </thead>

                                <tbody className={tables.body}>
                                    {fields.map((field, index) => {

                                        const quantity = watch(`related_quotation.${index}.quantity`) || 0.00;
                                        const price_per_unit = watch(`related_quotation.${index}.price_per_unit`) || 0.00;
                                        let tax_amount = watch(`related_quotation.${index}.tax_amount`) || 0.00;
                                        const tax_inclusive = watch(`related_quotation.${index}.tax_inclusive`) || false;

                                        let total = quantity * price_per_unit;

                                        if (!tax_inclusive) {
                                            tax_amount = 0.00;
                                        }

                                        total *= 1 + (tax_amount / 100);

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
                                                    {decimalPlaces(
                                                        (watch(`related_quotation.${index}.quantity`) || 0.00) *
                                                        (watch(`related_quotation.${index}.price_per_unit`) || 0.00)
                                                    )}
                                                    
                                                </td>
                                                
                                                <td className={tables.cell}>
                                                    <input 
                                                        type="checkbox"
                                                        {...register(`related_quotation.${index}.tax_inclusive`)}
                                                        className="text-black cursor-pointer"
                                                    />
                                                </td>

                                                <td className={tables.cell}>
                                                    <input 
                                                        {...register(`related_quotation.${index}.tax_amount`)}
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
                                                    {decimalPlaces(total)}
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
                                                    item: "", 
                                                    description: "",
                                                    quantity: 0, 
                                                    unit_of_measure: "", 
                                                    price_per_unit: 0.00, 
                                                    currency: "",
                                                    tax_inclusive: false,
                                                    tax_amount: 0.00,
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
            </form>
        );
    };
    export default QuotationForm;
