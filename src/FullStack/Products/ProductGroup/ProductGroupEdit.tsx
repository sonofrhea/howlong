import React, { useMemo } from "react";
import { useForm } from "react-hook-form";
import { ControlAccountInterface } from "../../ChartOfAccounts/Interfaces";
import { ProductGroupInputs, ProductGroupProps } from "../constants/Types";

import { BOOLEAN_OPTIONS,
    COSTING_METHOD_OPTIONS
 } from "../constants/options";
import { buttons } from "../constants/Styles";






const ProductGroupEdit: React.FC<ProductGroupProps> = ({
    productGroup,
    onSubmit,
    isSubmitting, 
    onCancel,
    accounts, agents
}) => {
    const productGroupId = productGroup?.group_code;

    const { register, handleSubmit, formState: { errors } } = useForm<ProductGroupInputs>({
        defaultValues: productGroup
    });

    




    return(
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="bg-white rounded-xl shadow-2xl border border-gray-200">
                {/* Header */}
                <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
                    <div className="flex items-center gap-4 flex-1">

                        <div className="flex gap-3">
                            <span className="inline-flex text-black items-center rounded-full text-s ">Date created: 
                            <input 
                                type="date"
                                {...register("date_created")}
                                className="ml-4 w-34 h-6 text-center bg-transparent cursor-pointer text-black rounded-lg focus:ring-2 focus:ring-green-300 bg-gray border border-gray-300"
                                />
                            </span>
                            {errors.date_created && <p className="text-amber-600 text-sm">{errors.date_created?.message}</p>}
                        </div>

                    </div>
                    <div className="flex gap-3">
                        <span className="inline-flex text-black items-center rounded-full text-s ">Status:      
                            <select 
                                {...register("active")}
                                className="ml-4 w-25 h-6 text-center bg-transparent cursor-pointer text-black rounded-lg focus:ring-2 focus:ring-green-300 bg-gray border border-gray-300"
                            >
                                <option value="">select...</option>
                                {useMemo(() => BOOLEAN_OPTIONS.map(option => (
                                    <option key={String(option.value)} value={String(option.value)}>
                                        {option.label}
                                    </option>
                                )), [BOOLEAN_OPTIONS])}
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
                                <option value="">select...</option>
                                {useMemo(() => COSTING_METHOD_OPTIONS.map(option => (
                                    <option key={option} value={option}>
                                        {option}
                                    </option>
                                )), [COSTING_METHOD_OPTIONS])}
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
                                        <option value="">select...</option>
                                        {useMemo(() => accounts.map((account: ControlAccountInterface) => (
                                            <option key={account.account_code} value={account.account_code}>
                                                {account.account_code} ({account.account_name} - {account.account_type})
                                            </option>
                                        )), [accounts])}
                                    </select>


                                <div className="text-sm text-gray-600 font-medium mb-1">Purchase Code:</div>
                                <select
                                    {...register("purchase_code")}
                                    className="w-full rounded-lg border border-gray-300 px-3 py-2"
                                >
                                    <option value="">select...</option>
                                        {useMemo(() => accounts.map((account: ControlAccountInterface) => (
                                            <option key={account.account_code} value={account.account_code}>
                                                {account.account_code} ({account.account_name} - {account.account_type})
                                            </option>
                                        )), [accounts])}
                                </select>
                                <div className="text-sm text-gray-600 font-medium mb-1">Cash Sales Code:</div>
                                <select
                                    {...register("cash_sales_code")}
                                    className="w-full rounded-lg border border-gray-300 px-3 py-2"
                                >
                                    <option value="">select...</option>
                                        {useMemo(() => accounts.map((account: ControlAccountInterface) => (
                                            <option key={account.account_code} value={account.account_code}>
                                                {account.account_code} ({account.account_name} - {account.account_type})
                                            </option>
                                        )), [accounts])}
                                </select>
                                <div className="text-sm text-gray-600 font-medium mb-1">Cash Purchase Code:</div>
                                <select
                                    {...register("cash_purchase_code")}
                                    className="w-full rounded-lg border border-gray-300 px-3 py-2"
                                >
                                    <option value="">select...</option>
                                        {useMemo(() => accounts.map((account: ControlAccountInterface) => (
                                            <option key={account.account_code} value={account.account_code}>
                                                {account.account_code} ({account.account_name} - {account.account_type})
                                            </option>
                                        )), [accounts])}
                                </select>
                                <div className="text-sm text-gray-600 font-medium mb-1">Sales Return Code:</div>
                                <select
                                    {...register("sales_return_code")}
                                    className="w-full rounded-lg border border-gray-300 px-3 py-2"
                                >
                                    <option value="">select...</option>
                                        {useMemo(() => accounts.map((account: ControlAccountInterface) => (
                                            <option key={account.account_code} value={account.account_code}>
                                                {account.account_code} ({account.account_name} - {account.account_type})
                                            </option>
                                        )), [accounts])}
                                </select>
                                <div className="text-sm text-gray-600 font-medium mb-1">Purchase Return Code:</div>
                                <select
                                    {...register("purchase_return_code")}
                                    className="w-full rounded-lg border border-gray-300 px-3 py-2"
                                >
                                    <option value="">select...</option>
                                        {useMemo(() => accounts.map((account: ControlAccountInterface) => (
                                            <option key={account.account_code} value={account.account_code}>
                                                {account.account_code} ({account.account_name} - {account.account_type})
                                            </option>
                                        )), [accounts])}
                                </select>
                                <div className="text-sm text-gray-600 font-medium mb-1">Balance Sheet Stock Code:</div>
                                <select
                                    {...register("balance_sheet_stock")}
                                    className="w-full rounded-lg border border-gray-300 px-3 py-2"
                                >
                                    <option value="">select...</option>
                                        {useMemo(() => accounts.map((account: ControlAccountInterface) => (
                                            <option key={account.account_code} value={account.account_code}>
                                                {account.account_code} ({account.account_name} - {account.account_type})
                                            </option>
                                        )), [accounts])}
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
                                    Updating Product Group...
                                </span>
                            ) : (
                                'Update Product Group'
                            )}
                        </button>
                        <button
                            type="button"
                            onClick={() => onCancel(productGroupId)}
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
export default ProductGroupEdit;