import React, { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { ProductGroupInputs, ControlAccountInterface } from "@/types";

import { BOOLEAN_OPTIONS,
    COSTING_METHOD_OPTIONS
 } from "../constants/options";





const ProductGroupForm = ({ onSubmit, isSubmitting, 
    onBack, onCancel, accounts, agents }) => {

        const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm<ProductGroupInputs>({
            defaultValues: {
                active: true
            }
        });



        return(
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                    {/* Header */}
                    <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
                        <div className="flex items-center gap-4 flex-1">
                            <div className="absolute left-1/2 transform -translate-x-1/2">
                            </div>
                        </div>
                        <div className="flex gap-3">
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ">Status:      
                                <select 
                                    {...register("active")}
                                    className="ml-2 bg-transparent rounded-lg focus:outline-none bg-gray border border-gray-300"
                                >
                                    {BOOLEAN_OPTIONS.map(option => (
                                        <option key={String(option.value)} value={String(option.value)}>
                                            {option.label}
                                        </option>
                                    ))}
                                </select>
                            </span>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="p-6 space-y-6">
                        {/* Key Information */}
                        <fieldset className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-4">

                            <label className="text-sm text-gray-600 mb-1">Group Name:
                            <input 
                                {...register("group_name")} 
                                className="w-full rounded-lg border border-gray-300 px-3 py-2"
                            />
                            </label>

                            <label className="text-sm text-gray-600 mb-1">Description:
                            <input 
                                {...register("description")} 
                                className="w-full rounded-lg border border-gray-300 px-3 py-2"
                            />
                            </label>

                            <label className="text-sm text-gray-600 font-medium mb-1">Costing Method:
                                <select
                                    {...register("costing_method")}
                                    className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500"
                                >
                                    {COSTING_METHOD_OPTIONS.map(option => (
                                        <option key={option.value} value={option.value}>
                                            {option.label}
                                        </option>
                                    ))}
                                </select>
                            </label>

                        </fieldset>


                        {/* STOCK CODES */}  
                        <fieldset>
                            <legend>GL Account Code</legend>
                            <div className="bg-green-50 rounded-lg p-6 border border-green-200">
                                
                                <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-4">
                                    <div className="text-sm text-gray-600 font-medium mb-1">Sales Code:</div>
                                    <select
                                        {...register("sales_code")}
                                        className="w-full rounded-lg border border-gray-300 px-3 py-2"
                                    >
                                        <option value=""></option>
                                        {accounts.map((account: ControlAccountInterface) => (
                                            <option key={account.account_code} value={account.account_code}>
                                                {account.account_code} ({account.account_name})
                                            </option>
                                        ))}
                                    </select>
                                    <div className="text-sm text-gray-600 font-medium mb-1">Purchase Code:</div>
                                    <select
                                        {...register("purchase_code")}
                                        className="w-full rounded-lg border border-gray-300 px-3 py-2"
                                    >
                                        <option value=""></option>
                                        {accounts.map((account: ControlAccountInterface) => (
                                            <option key={account.account_code} value={account.account_code}>
                                                {account.account_code} ({account.account_name})
                                            </option>
                                        ))}
                                    </select>
                                    <div className="text-sm text-gray-600 font-medium mb-1">Cash Sales Code:</div>
                                    <select
                                        {...register("cash_sales_code")}
                                        className="w-full rounded-lg border border-gray-300 px-3 py-2"
                                    >
                                        <option value=""></option>
                                        {accounts.map((account: ControlAccountInterface) => (
                                            <option key={account.account_code} value={account.account_code}>
                                                {account.account_code} ({account.account_name})
                                            </option>
                                        ))}
                                    </select>
                                    <div className="text-sm text-gray-600 font-medium mb-1">Cash Purchase Code:</div>
                                    <select
                                        {...register("cash_purchase_code")}
                                        className="w-full rounded-lg border border-gray-300 px-3 py-2"
                                    >
                                        <option value=""></option>
                                        {accounts.map((account: ControlAccountInterface) => (
                                            <option key={account.account_code} value={account.account_code}>
                                                {account.account_code} ({account.account_name})
                                            </option>
                                        ))}
                                    </select>
                                    <div className="text-sm text-gray-600 font-medium mb-1">Sales Return Code:</div>
                                    <select
                                        {...register("sales_return_code")}
                                        className="w-full rounded-lg border border-gray-300 px-3 py-2"
                                    >
                                        <option value=""></option>
                                        {accounts.map((account: ControlAccountInterface) => (
                                            <option key={account.account_code} value={account.account_code}>
                                                {account.account_code} ({account.account_name})
                                            </option>
                                        ))}
                                    </select>
                                    <div className="text-sm text-gray-600 font-medium mb-1">Purchase Return Code:</div>
                                    <select
                                        {...register("purchase_return_code")}
                                        className="w-full rounded-lg border border-gray-300 px-3 py-2"
                                    >
                                        <option value=""></option>
                                        {accounts.map((account: ControlAccountInterface) => (
                                            <option key={account.account_code} value={account.account_code}>
                                                {account.account_code} ({account.account_name})
                                            </option>
                                        ))}
                                    </select>
                                    <div className="text-sm text-gray-600 font-medium mb-1">Balance Sheet Stock Code:</div>
                                    <select
                                        {...register("balance_sheet_stock")}
                                        className="w-full rounded-lg border border-gray-300 px-3 py-2"
                                    >
                                        <option value=""></option>
                                        {accounts.map((account: ControlAccountInterface) => (
                                            <option key={account.account_code} value={account.account_code}>
                                                {account.account_code} ({account.account_name})
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </fieldset>

                        {/* SUBMIT BUTTON */}
                        <div className="flex justify-end gap-4 pt-6 border-t border-gray-200">
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-blue-700 font-medium disabled:opacity-50">
                                {isSubmitting ? (
                                    <span className="flex items-center gap-2">
                                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                        Creating Customer...
                                    </span>
                                ) : (
                                    'Create Product Group'
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        );
    };
    export default ProductGroupForm;
