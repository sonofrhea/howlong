import React from "react";
import { useForm, useFieldArray } from "react-hook-form";

import { QuotationInputs } from "../Constants/Types";

import { AgentInterface,CurrencyInterface } from "../../Core/Interfaces"
import { CustomerCreateResponse } from "../../Customers/constants/Types";
import { ProductItemCreateResponse } from "../../Products/constants/Types"
import { buttons, forms, layout, tables, text, utils } from "../Constants/Styles";
import { Trash2 } from "lucide-react";



 const formatCustomerNumber = () => {
    const currentYear = new Date().getFullYear();
    return `CV-${currentYear}-`;
};



const decimalPlaces = (amount: number) => {
    return `${amount.toFixed(2)};`
};







const QuotationForm: React.FC<any> = ({ onSubmit, isSubmitting, onBack, onCancel, customers,
    currencies, accounts, agents, invoices, productItems }) => {
        
        const { register, handleSubmit, watch, setValue,
             control, formState: { errors } } = useForm<QuotationInputs>({
            defaultValues: {
                cancelled: false,
                related_quotation: [
                    {
                       price_per_unit: 0.00,
                       cancelled: false, 
                    }
                ],
                tax_inclusive: false,
                tax_amount: 0.00,
                discount: 0.00,
                
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
                                                    {...register("valid_until")}
                                                    className={forms.input.date}
                                                />
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
                            <option value=""></option>
                            {customers.map((customer: CustomerCreateResponse) => (
                                <option key={customer.customer_number} value={customer.customer_number}>
                                    {formatCustomerNumber()}{customer.customer_number} | {customer.customer_name}
                                </option>
                            ))}
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
                                <option value=""></option>
                                {agents.map((agent: AgentInterface) => (
                                    <option key={agent.name} value={agent.name}>
                                        {agent.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                        <div>
                            <p className={forms.label}>Additional Details...</p>
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
                                        'w-1/8 text-center',
                                        'w-1/8 text-center',
                                        'w-1/8 text-center',
                                        'w-1/8 text-center',
                                        'w-1/8 text-center',
                                        'w-1/8 text-center',
                                        'w-1/8 text-center',
                                        'w-[9%] text-center',
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
                                    <th className={tables.headerCell}>Amount</th>
                                    <th className={tables.headerCell}></th>
                                </tr>
                                </thead>

                                <tbody className={tables.body}>
                                    {fields.map((field, index) => (
                                        <tr key={field.id} className={tables.row}>
                                            <td>
                                                <select
                                                    {...register(`related_quotation.${index}.item`)}
                                                    className={forms.select.partial}
                                                >
                                                    <option value=""></option>
                                                    {productItems.map((product: ProductItemCreateResponse) => (
                                                        <option key={product.item_code} value={product.item_code}>
                                                            SKU-{product.item_code} | {product.item_description}
                                                        </option>
                                                    ))}
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
                                                            e.target.value = parseFloat(e.target.value).toFixed(2);
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
                                                            e.target.value = parseFloat(e.target.value).toFixed(2);
                                                        }
                                                    }}
                                                />
                                            </td>
                                            <td className={tables.cell}>
                                                <select
                                                    {...register(`related_quotation.${index}.currency`)}
                                                    className={forms.select.partial}
                                                >
                                                    <option value=""></option>
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
                                    ))}
                                    <button
                                        type="button"
                                        onClick={() => append({ 
                                            item: "", 
                                            description: "",
                                            quantity: 0, 
                                            unit_of_measure: "", 
                                            price_per_unit: 0.00, 
                                            currency: "",
                                            cancelled: false 
                                            })}
                                        className="min-w-full divide-y divide-gray-100"
                                    >
                                        + Add New Line
                                    </button>
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
                                                className={forms.input.number}
                                                placeholder="0.00"
                                                step="0.01" min="0.00" onBlur={(e) => {
                                                    if (e.target.value) {
                                                        e.target.value = parseFloat(e.target.value).toFixed(2);
                                                    }
                                                }}
                                                
                                            />
                                        </div>

                                        <div className="flex justify-between text-sm text-gray-600 mt-2">
                                            <div>Discount %</div>
                                            <input 
                                                type="number"
                                                {...register("discount")}
                                                className={forms.input.number}
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
