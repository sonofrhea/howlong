import React, { useEffect } from "react";
import { useForm, SubmitHandler, useFieldArray } from "react-hook-form";

import { InvoiceInputs, ProjectInterface, CurrencyInterface,
    ProductItemInterface, CustomerInterface, AgentInterface
 } from "@/types";
import { Trash2 } from "lucide-react";


const formatCustomerNumber = () => {
    const currentYear = new Date().getFullYear();
    return `CV-${currentYear}-`;
};

const decimalPlaces = (amount: number) => {
    return `${amount.toFixed(2)};`
};


const formatProjectNumber = () => {
    const currentYear = new Date().getFullYear();
    return `PZN-${currentYear}-`;
};






const InvoiceForm = ({ onSubmit, isSubmitting, onCancel, customers, 
    currencies, accounts, agents, invoices, projects, productItems }) => {

        const { register, handleSubmit, watch, setValue, 
            control, formState: { errors } } = useForm<InvoiceInputs>({
                defaultValues: {
                    tax_inclusive: true,
                    tax_amount: 0.00,
                    related_invoice: [
                       {
                        unit_per_price: 0.00,
                        discount: 0.00
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
                <div className="w-[100%] mx-auto page bg-white shadow-lg rounded-2xl overflow-hidden">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between p-8 gap-6">
                        <div className="flex items-center gap-4">

                            <div className="text-right">
                                <div className="inline-block bg-amber-50 border border-amber-100 px-4 py-2 rounded drop-shadow-md shadow-xl">
                                    <div className="text-xs text-amber-700 uppercase tracking-wide">NEW</div>
                                    <div className="text-lg font-bold text-amber-800">
                                        CUSTOMER INVOICE
                                    </div>
                                </div>
                                <div className="mt-10 text-sm">
                                    <div>
                                        <strong >Due Date:  </strong>
                                        <span>
                                            <input 
                                                type="date"
                                                {...register("invoice_due_date")}
                                                className="px-3 py-2 border hover:cursor-pointer selection:cursor-pointer border-violet-300 drop-shadow-md shadow-inner rounded focus:ring-2 focus:ring-green-500 focus:border-violet-500 transition-colors"
                                            />
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="border-t border-b border-gray-100 p-6 grid grid-cols-1 sm:grid-cols-3 gap-6">
                        <div>
                        <h3 className="text-m uppercase">Customer</h3>
                        <p className="mt-2 text-gray-800 font-medium">
                            <select
                                {...register("customer")}
                                className="w-[60%] drop-shadow-md shadow-inner rounded cursor-pointer border border-violet-300 px-3 py-2 focus:ring-2 focus:ring-green-300"
                            >
                                <option value=""></option>
                                {customers.map((customer: CustomerInterface) => (
                                    <option key={customer.customer_number} value={customer.customer_number}>
                                        {formatCustomerNumber()}{customer.customer_number} | {customer.customer_name}
                                    </option>
                                ))}
                            </select>
                        </p>
                        </div>

                        <div>
                            <h3 className="text-m uppercase">Description</h3>
                            <p className="mt-2 text-gray-800 font-medium">
                                <input 
                                    type="text"
                                    {...register("description")}
                                    className="w-[100%] border border-gray-300 drop-shadow-md shadow-inner rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </p>
                        </div>

                        <div>
                            <h3 className="text-m uppercase">Prepared By</h3>
                            <p className="mt-2 text-gray-800 font-medium">
                                <select
                                    {...register("agent")}
                                    className="w-[60%] drop-shadow-md shadow-inner rounded cursor-pointer border border-violet-300 px-3 py-2 focus:ring-2 focus:ring-green-300"
                                >
                                    <option value=""></option>
                                    {agents.map((agent: AgentInterface) => (
                                        <option key={agent.username} value={agent.username}>
                                            {agent.username}
                                        </option>
                                    ))}
                                </select>
                            </p>
                        </div>
                    </div>

                    <div className="mt-3">
                        <h3 className="text-m uppercase">Project</h3>
                        <p className="mt-2 text-gray-800 font-medium">
                            <select
                                {...register("project")}
                                className="w-[60%] drop-shadow-md shadow-inner rounded cursor-pointer border border-violet-300 px-3 py-2 focus:ring-2 focus:ring-green-300"
                            >
                                <option value=""></option>
                                {projects.map((project: ProjectInterface) => (
                                    <option key={project.project_code} value={project.project_code}>
                                        {project.project_name} - {formatProjectNumber()}{project.project_code}
                                    </option>
                                ))}
                            </select>
                        </p>
                    </div>
                    
                    <div className="mt-6">
                        <h4 className="uppercase">Customer Extra Details...</h4>
                        <p className="mt-2 text-gray-800 font-medium">
                            <textarea 
                                rows={2}
                                {...register("customer_details")}
                                className="w-[50%] border border-gray-300 drop-shadow-md shadow-inner rounded p-1 focus:outline-none focus:ring-1 focus:ring-green-500"
                            />
                        </p>
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
                                        'w-1/8 text-center',
                                        'w-[9%] text-center',
                                    ].map((line, index) => (
                                        <col key={index} className={line} />
                                    ))}
                                </colgroup>
                                <thead className="bg-blue-100 drop-shadow-md shadow-lg">
                                <tr>
                                    <th className="px-4 py-3 text-center text-xs font-medium uppercase">Item</th>
                                    <th className="px-4 py-3 text-center text-xs font-medium uppercase">Description</th>
                                    <th className="px-4 py-3 text-center text-xs font-medium uppercase">Qty</th>
                                    <th className="px-4 py-3 text-center text-xs font-medium uppercase">UOM</th>
                                    <th className="px-4 py-3 text-center text-xs font-medium uppercase">Price Per Unit</th>
                                    <th className="px-4 py-3 text-center text-xs font-medium uppercase">Currency</th>
                                    <th className="px-4 py-3 text-center text-xs font-medium uppercase">Discount</th>
                                    <th className="px-4 py-3 text-center text-xs font-medium uppercase">Sub Total</th>
                                    <th className="px-4 py-3 text-center text-xs font-medium uppercase"></th>
                                </tr>
                                </thead>

                                <tbody className="bg-white divide-y divide-gray-100">
                                    {fields.map((field, index) => (
                                        <tr key={field.id} className="bg-white divide-y divide-x divide-gray-100">
                                            <td>
                                                <select
                                                    {...register(`related_invoice.${index}.item`)}
                                                    className="w-full drop-shadow-md shadow-inner rounded cursor-pointer border border-violet-300 px-3 py-2 focus:ring-2 focus:ring-green-300"
                                                >
                                                    <option value=""></option>
                                                    {productItems.map((product: ProductItemInterface) => (
                                                        <option key={product.item_code} value={product.item_code}>
                                                            SKU-{product.item_code} | {product.item_description}
                                                        </option>
                                                    ))}
                                                </select>
                                            </td>
                                            <td className="px-4 py-4 text-sm text-gray-600 items-center">
                                                <input 
                                                    {...register(`related_invoice.${index}.description`)}
                                                    className="w-[100%] border border-gray-300 drop-shadow-md shadow-inner rounded p-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                />
                                            </td>
                                            <td className="px-4 py-4 text-sm text-gray-600 items-center">
                                                <input 
                                                    {...register(`related_invoice.${index}.quantity`)}
                                                    type="number"
                                                    className="w-[100%] border border-gray-300 drop-shadow-md shadow-inner rounded p-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                />
                                            </td>
                                            <td className="px-4 py-4 text-sm text-gray-600 items-center">
                                                <input 
                                                    {...register(`related_invoice.${index}.unit_of_measure`)}
                                                    className="w-[100%] border border-gray-300 drop-shadow-md shadow-inner rounded p-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                />
                                            </td>
                                            <td className="px-4 py-4 text-sm text-gray-600 flex items-center">
                                                <span className="text-gray-500 mr-1"></span>
                                                <input 
                                                    {...register(`related_invoice.${index}.unit_per_price`)}
                                                    type="number"
                                                    placeholder="0.00"
                                                    step="0.01" min="0.00" onBlur={(e) => {
                                                        if (e.target.value) {
                                                            e.target.value = parseFloat(e.target.value).toFixed(2);
                                                        }
                                                    }}
                                                    className="w-[100%] border border-gray-300 drop-shadow-md shadow-inner rounded p-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                />
                                            </td>
                                            <td className="">
                                                <select
                                                    {...register(`related_invoice.${index}.currency`)}
                                                    className="w-[80%] cursor-pointer border drop-shadow-md shadow-inner rounded border-violet-300 px-3 py-2 focus:ring-2 focus:ring-green-300"
                                                >
                                                    <option value=""></option>
                                                    {currencies.map((currency: CurrencyInterface) => (
                                                        <option key={currency.currency_code} value={currency.currency_code}>
                                                            {currency.currency_code}
                                                        </option>
                                                    ))}
                                                </select>
                                            </td>
                                            <td className="px-4 py-4 text-sm text-gray-600 ">
                                                <input 
                                                    {...register(`related_invoice.${index}.discount`)}
                                                    className="w-[100%] border border-gray-300 drop-shadow-md shadow-inner rounded p-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                />
                                            </td>
                                            <td className="px-4 py-4 text-sm text-gray-600 whitespace-nowrap">
                                                {decimalPlaces(
                                                    (watch(`related_invoice.${index}.quantity`) || 0.00) *
                                                    (watch(`related_invoice.${index}.unit_per_price`) || 0.00)
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
                                    <button
                                        type="button"
                                        onClick={() => append({ 
                                            item: "", 
                                            description: "",
                                            quantity: 0, 
                                            unit_of_measure: "", 
                                            unit_per_price: 0.00, 
                                            currency: "",
                                            discount: 0.00 
                                            })}
                                        className="min-w-full divide-y divide-gray-100"
                                    >
                                        + Add New Line
                                    </button>
                                </tbody>
                            </table>
                        </div>

                        <div className="mt-6 sm:flex sm:items-center sm:justify-end drop-shadow-md shadow-inner">
                        <div className="w-full sm:w-1/2 lg:w-1/3">
                            <div className="bg-gray-50 p-4 rounded-lg">
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
                                        {...register("tax_amount")}
                                        placeholder="0.00"
                                        step="0.01" min="0.00" onBlur={(e) => {
                                            if (e.target.value) {
                                                e.target.value = parseFloat(e.target.value).toFixed(2);
                                            }
                                        }}
                                        
                                    />
                                </div>

                                <div className="flex justify-between text-sm text-gray-600 mt-2">
                                    <div>Discount</div>
                                    <input 
                                        type="number"
                                        {...register("tax_amount")}
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

                        {/* SUBMIT BUTTON */}
                        <div className="flex justify-end gap-4 pt-6 border-t border-gray-200">
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="px-6 py-3 bg-amber-900 text-white rounded drop-shadow-md shadow-xl hover:bg-green-700 font-medium disabled:opacity-50"
                            >
                                {isSubmitting ? (
                                    <span className="flex items-center gap-2">
                                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
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
