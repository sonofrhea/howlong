import React, { useMemo } from "react";
import { useForm, useFieldArray } from "react-hook-form";

import { ProjectProfileResponse } from "../../Projects/constants/Types";
import { CustomerCreateResponse } from "../../Customers/constants/Types"
import { InvoiceInputs } from "../Constants/Types";
import { CurrencyInterface, AgentInterface } from "../../Core/constants/Types"
import { ProductItemCreateResponse } from "../../Products/constants/Types"


import { Trash2 } from "lucide-react";
import { buttons, forms, layout, tables, text, utils } from "../Constants/Styles";


const formatCustomerNumber = () => {
    const currentYear = new Date().getFullYear();
    return `CV-${currentYear}-`;
};

const decimalPlaces = (amount: number) => {
    return `${amount.toFixed(2)}`;
};


const formatProjectNumber = () => {
    const currentYear = new Date().getFullYear();
    return `PZN-${currentYear}-`;
};






const InvoiceForm: React.FC<any> = ({ onSubmit, isSubmitting, onCancel, customers, 
    currencies, agents, projects, productItems }) => {

        

        const { register, handleSubmit, watch, setValue, 
            control, formState: { errors } } = useForm<InvoiceInputs>({
                defaultValues: {
                    tax_inclusive: false,
                    tax_amount: 0.00,
                    related_invoice: [
                       {
                        price_per_unit: 0.00,
                        quantity: 0.00,
                        cancelled: false,
                        tax_inclusive: false,
                        tax_amount: 0.00,
                       } 
                    ],
                    discount: false,
                    discount_amount: 0.00,
                    cancelled: false
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
                                        CUSTOMER INVOICE
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <hr className="my-6 border-gray-200" />
                                                        
                    <div className={layout.formSectionCol3}>
                        <div>
                            <p className={forms.label}>Due Date</p>
                            <input 
                                type="date"
                                {...register("invoice_due_date", {required: "Due date is required"})}
                                className={forms.input.date}
                            />
                            {errors.invoice_due_date && <p className="text-amber-600 text-sm">{errors.invoice_due_date?.message}</p>}
                        </div>
                    
                        <div>
                            <p className={forms.label}>Customer</p>
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
                            <p className={forms.label}>Customer Details</p>
                                <input 
                                    type="text"
                                    {...register("customer_details")}
                                    className={forms.description}
                                />
                        </div>

                        <div>
                            <p className={forms.label}>Description</p>
                                <input 
                                    type="text"
                                    {...register("description")}
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

                    <hr className="my-6 border-gray-200" />

                    <div className={layout.formSectionCol3}>
                        <div >
                            <p className={forms.label}>Project</p>
                            <select
                                {...register("project")}
                                className={forms.select.partial}
                            >
                                <option value="">select...</option>
                                {useMemo(() => projects.map((project: ProjectProfileResponse) => (
                                    <option key={project.project_code} value={project.project_code}>
                                        {project.project_name} - {formatProjectNumber()}{project.project_code}
                                    </option>
                                )), [projects])}
                            </select>
                        </div>
                        
                        
                        <div>
                            <p className={forms.label}>Currency...</p>
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
                            <p className={forms.label}>Cancelled</p>
                            <input 
                                type="checkbox"
                                {...register("cancelled")}
                            />
                        </div>
                    </div>
                    
                    {/* LINES */}
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
                                    <th className={tables.headerCell}>Unit of Measure</th>
                                    <th className={tables.headerCell}>Price/Per Unit</th>
                                    <th className={tables.headerCell}>Sub-Total</th>
                                    <th className={tables.headerCell}>SST Inclusive?</th>
                                    <th className={tables.headerCell}>SST %</th>
                                    <th className={tables.headerCell}>Total</th>
                                    <th className={tables.headerCell}>Cancelled</th>
                                    <th className={tables.headerCell}></th>
                                </tr>
                                </thead>

                                <tbody className={tables.body}>
                                    {fields.map((field, index) => {
                                        
                                        const quantity = Number(watch(`related_invoice.${index}.quantity`) || 0.00);
                                        const price_per_unit = Number(watch(`related_invoice.${index}.price_per_unit`) || 0.00);
                                        let tax_amount = Number(watch(`related_invoice.${index}.tax_amount`) || 0.00);
                                        const tax_inclusive = Number(watch(`related_invoice.${index}.tax_inclusive`) || false);

                                        let total = quantity * price_per_unit;

                                        if (!tax_inclusive) {
                                            tax_amount = 0.00;
                                        }

                                        total *= 1 + (tax_amount / 100);


                                        const productOptions = useMemo(() => 
                                            productItems.map((product: ProductItemCreateResponse) => (
                                            <option key={product.item_code} value={product.item_code}>
                                                SKU-{product.item_code} | {product.item_description}
                                            </option>
                                        )), [productItems])

                                        return(
                                            <tr key={field.id} className={tables.row}>
                                                <td>
                                                    <select
                                                        {...register(`related_invoice.${index}.item`)}
                                                        className={forms.select.small}
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
                                                        {...register(`related_invoice.${index}.unit_of_measure`)}
                                                        className={tables.text}
                                                    />
                                                </td>

                                                <td className={text.numbers}>
                                                    <input 
                                                        {...register(`related_invoice.${index}.price_per_unit`)}
                                                        type="number"
                                                        placeholder="0.00"
                                                        step="0.01" min="0.00" onBlur={(e) => {
                                                            if (e.target.value) {
                                                                e.target.value = parseFloat(e.target.value).toFixed(2);
                                                            }
                                                        }}
                                                        className={forms.input.number}
                                                    />
                                                </td>

                                                <td className={tables.autoCalculate}>
                                                    {decimalPlaces(
                                                        (watch(`related_invoice.${index}.quantity`) || 0.00) *
                                                        (watch(`related_invoice.${index}.price_per_unit`) || 0.00)
                                                    )}
                                                    
                                                </td>

                                                <td className={tables.cell}>
                                                    <input 
                                                        {...register(`related_invoice.${index}.tax_inclusive`)}
                                                        type="checkbox"
                                                        className={forms.input.base}
                                                    />
                                                </td>

                                                <td className={text.numbers}>
                                                    <input 
                                                        {...register(`related_invoice.${index}.tax_amount`)}
                                                        type="number"
                                                        placeholder="0.00"
                                                        step="0.01" min="0.00" onBlur={(e) => {
                                                            if (e.target.value) {
                                                                e.target.value = parseFloat(e.target.value).toFixed(2);
                                                            }
                                                        }}
                                                        className={forms.input.number}
                                                    />
                                                </td>

                                                <td className={tables.autoCalculate}>
                                                    {decimalPlaces(total)}
                                                </td>

                                                <td className={tables.cell}>
                                                    <input 
                                                        {...register(`related_invoice.${index}.cancelled`)}
                                                        type="checkbox"
                                                        className={forms.input.base}
                                                    />
                                                </td>
                                                <td>
                                                    <button
                                                        type="button"
                                                        title="remove"
                                                        onClick={() => remove(index)}
                                                    >
                                                        <Trash2 size={16}
                                                        className="text-black cursor-pointer" />
                                                        
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
                                                    cancelled: false,
                                                    tax_inclusive: false, 
                                                    tax_amount: 0.00
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
                                        <div>Discount?</div>
                                        <input 
                                        {...register("discount")}
                                        type="checkbox"
                                        className="ml-2 forced-colors:bg-green-300"
                                        />
                                    </div>

                                    <div className="flex justify-between text-sm text-gray-600 mt-2">
                                        <div>Discount %</div>
                                        <input 
                                            type="number"
                                            {...register("discount_amount")}
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
                                    'Create Invoice'
                                )}
                            </button>
                        </div>
                    </div>               
                </div>
            </form>
        );

    };
    export default InvoiceForm;
