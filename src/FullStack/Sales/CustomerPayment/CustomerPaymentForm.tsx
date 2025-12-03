import React, { useEffect } from "react";
import { useForm, SubmitHandler, useFieldArray } from "react-hook-form";


import { CustomerPaymentInputs, CurrencyInterface,
    ProjectInterface, AgentInterface, 
    CustomerInterface, ControlAccountInterface
 } from "@/types";



const decimalPlaces = (amount: number) => {
    return `${amount.toFixed(2)};`
};


const formatPaymentNumber = () => {
    return `POST-`;
};

const formatCustomerNumber = () => {
    const currentYear = new Date().getFullYear();
    return `CV-${currentYear}-`;
};

const formatProjectNumber = () => {
    const currentYear = new Date().getFullYear();
    return `PZN-${currentYear}-`;
};





const CustomerPaymentForm = ({ onSubmit, isSubmitting, onCancel, currencies, 
    accounts, agents, customers, invoices, projects }) => {

        const { register, handleSubmit, watch, setValue, control, 
            formState: { errors } } = useForm<CustomerPaymentInputs>({
                defaultValues: {
                    paid_amount: 0.00,
                    additional_bank_charges: 0.00,
                    outstanding: 0.00,
                    completed: true,
                    cancelled: false
                }
            });




            return(
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="w-[100%] mx-auto page bg-white shadow-lg rounded-2xl overflow-hidden">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between p-8 gap-6">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h1 className="text-2xl font-bold text-gray-800 tracking-wide">CUSTOMER PAYMENT</h1>
                                    <p className="text-sm text-gray-500 mt-1">Official Record of Payment Already Posted</p>
                                </div>
                            </div>
                        </div>

                        <hr className="my-6 border-gray-200" />

                        <div className="border-t border-b border-gray-100 p-6 grid grid-cols-3 gap-6">
                            <div>
                                <p className="text-xs uppercase">Posted Date</p>
                                <input 
                                    type="date"
                                    {...register("date")}
                                    className="px-3 py-2 border hover:cursor-pointer selection:cursor-pointer border-violet-300 drop-shadow-md shadow-inner rounded focus:ring-2 focus:ring-green-500 focus:border-violet-500 transition-colors"
                                />

                                <p className="text-xs uppercase mt-4">Account Received in</p>
                                <select
                                    {...register("account_received_in")}
                                    className="w-[60%] drop-shadow-md shadow-inner rounded cursor-pointer border border-violet-300 px-3 py-2 focus:ring-2 focus:ring-green-300"
                                >
                                    <option value=""></option>
                                    {accounts.map((account: ControlAccountInterface) => (
                                        <option key={account.account_code} value={account.account_code}>
                                            {account.account_code} ({account.account_name})
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <p className="text-xs uppercase">Customer</p>
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

                                <p className="text-xs uppercase mt-4">Project</p>
                                <select
                                    {...register("project")}
                                    className="w-[60%] drop-shadow-md shadow-inner rounded cursor-pointer border border-violet-300 px-3 py-2 focus:ring-2 focus:ring-green-300"
                                >
                                    <option value=""></option>
                                    {projects.map((project: ProjectInterface) => (
                                        <option key={project.project_code} value={project.project_code}>
                                            {formatProjectNumber()}{project.project_code} | {project.project_name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <p className="text-xs uppercase">Agent</p>
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


                                <p className="text-xs uppercase mt-4">Currency</p>
                                <select
                                    {...register("currency")}
                                    className="w-[60%] drop-shadow-md shadow-inner rounded cursor-pointer border border-violet-300 px-3 py-2 focus:ring-2 focus:ring-green-300"
                                >
                                    <option value=""></option>
                                    {currencies.map((currency: CurrencyInterface) => (
                                        <option key={currency.currency_code} value={currency.currency_code}>
                                            {currency.currency_code}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <hr className="my-6 border-gray-200" />
                        <div>
                            <p>completed ?</p>
                            <input 
                                type="checkbox"
                                {...register("completed")}
                            />
                        </div>
                        <hr className="my-6 border-gray-200" />

                        <div className="p-6">
                            <div className="w-full">
                                <table className="w-full table-fixed divide-y border divide-x divide-gray-200 drop-shadow-md shadow-inner">
                                    <colgroup>
                                        {[
                                            'w-1/8 text-center',
                                            'w-1/8 text-center',
                                            'w-1/8 text-center',
                                        ].map((line, index) => (
                                            <col key={index} className={line} />
                                        ))}
                                    </colgroup>
                                    <thead className="bg-blue-100 drop-shadow-md shadow-lg">
                                        <tr>
                                            <th className="px-4 py-3 text-center text-xs font-medium uppercase">Description</th>
                                            <th className="px-4 py-3 text-center text-xs font-medium uppercase">Cancelled</th>
                                            <th className="px-4 py-3 text-center text-xs font-medium uppercase">Paid Amount</th>
                                        </tr>
                                    </thead>

                                    <tbody className="bg-white divide-y divide-gray-100">
                                        <tr className="bg-white divide-y divide-gray-100">
                                            <td>
                                                <input 
                                                    {...register("description")}
                                                    className="w-[100%] border border-gray-300 drop-shadow-md shadow-inner rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                />
                                            </td>
                                            <td>
                                                <input 
                                                    type="checkbox"
                                                    {...register("cancelled")}
                                                    className="w-[100%] border border-gray-300 drop-shadow-md shadow-inner rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                />
                                            </td>
                                            <td>
                                                <input 
                                                    type="number"
                                                    {...register("paid_amount")}
                                                    placeholder="0.00"
                                                    step="0.01" min="0.00" onBlur={(e) => {
                                                        if (e.target.value) {
                                                            e.target.value = parseFloat(e.target.value).toFixed(2);
                                                        }
                                                    }}
                                                    className="w-[100%] border border-gray-300 drop-shadow-md shadow-inner rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                />
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            <div className="mt-6 sm:flex sm:items-center sm:justify-end drop-shadow-md shadow-inner">
                                <div className="w-full sm:w-1/2 lg:w-1/3">
                                    <div className="bg-gray-50 p-4 rounded-lg">
                                        <div className="flex justify-between text-sm text-gray-600 mt-2">
                                            <span>Amount Posted</span>
                                            <span>
                                                <input 
                                                    type="number"
                                                    {...register("paid_amount")}
                                                    placeholder="0.00"
                                                    step="0.01" min="0.00" onBlur={(e) => {
                                                        if (e.target.value) {
                                                            e.target.value = parseFloat(e.target.value).toFixed(2);
                                                        }
                                                    }}
                                                />
                                            </span>
                                        </div>

                                        <div className="flex justify-between text-sm text-gray-600 mt-2">
                                            <span>Additional bank charges</span>
                                            <span>
                                                <input 
                                                    type="number"
                                                    {...register("additional_bank_charges")}
                                                    placeholder="0.00"
                                                    step="0.01" min="0.00" onBlur={(e) => {
                                                        if (e.target.value) {
                                                            e.target.value = parseFloat(e.target.value).toFixed(2);
                                                        }
                                                    }}
                                                />
                                            </span>
                                        </div>

                                        <div className="border-t border-dashed border-blue-300 mt-3 pt-3 flex justify-between items-center">
                                            <span>Outstanding</span>
                                            <span>
                                                <input 
                                                    type="number"
                                                    {...register("outstanding")}
                                                    placeholder="0.00"
                                                    step="0.01" min="0.00" onBlur={(e) => {
                                                        if (e.target.value) {
                                                            e.target.value = parseFloat(e.target.value).toFixed(2);
                                                        }
                                                    }}
                                                />
                                            </span>
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
                                            Creating Payment...
                                        </span>
                                    ) : (
                                        'Create Payment'
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            );
    };
    export default CustomerPaymentForm;