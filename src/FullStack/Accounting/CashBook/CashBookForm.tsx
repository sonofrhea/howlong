import React, { useMemo } from "react";
import { useForm, useFieldArray } from "react-hook-form";

import { CashBookInputs } from "../Constants/Types";
import { cashBookAccountHandler } from "../../handlers";
import { ControlAccountInterface } from "../../ChartOfAccounts/Interfaces";
import { CurrencyInterface } from "../../Core/constants/Types";
import { buttons, layout, utils } from "../Constants/Styles";








const decimalPlaces = (amount: number) => {
    return `${amount.toFixed(2)}`
};







const CashBookForm: React.FC<any> = ({ onSubmit, isSubmitting, onCancel, currencies, accounts, agents }) => {


    const { register, formState: { errors }, setValue, control, 
    watch, handleSubmit } = useForm<CashBookInputs>({
        defaultValues: {
            net_debit: 0.00,
            net_credit: 0.00
        }
    });


const onAccountChange = cashBookAccountHandler(accounts, setValue);    





    return(
        <form onSubmit={handleSubmit(onSubmit)} className="p-8 space-y-8">

            {/* <!-- Date */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                        Date
                    </label>
                    <input 
                        type="date"
                        {...register("date", {required: "Date is required"})}
                        className="w-full px-4 py-3 bg-white border border-slate-300 rounded-md text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    {errors.date && <p className="text-amber-600 text-sm">{errors.date?.message}</p>}
                </div>
            </div>

            {/* <!-- Transaction Type --> */}
            <div>
                <label className="block text-sm font-semibold text-slate-700 mb-3">
                    Transaction Type
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">

                    <label className="cursor-pointer">
                        <input 
                            type="radio"
                            value="Cash Receipts"
                            defaultChecked
                            className="peer sr-only"
                            {...register("transaction_type")}
                        />
                        <div className="border-2 border-slate-300 bg-white rounded-md py-3 px-4 text-center transition-all peer-checked:border-emerald-500 peer-checked:bg-emerald-50 hover:border-slate-400">
                            <span className="text-sm font-semibold text-slate-700 peer-checked:text-emerald-700">
                                Cash Receipts
                            </span>
                        </div>
                    </label>

                    <label className="cursor-pointer">
                        <input 
                            type="radio"
                            value="Cash Payments"
                            className="peer sr-only"
                            {...register("transaction_type")}
                        />
                        <div className="border-2 border-slate-300 bg-white rounded-md py-3 px-4 text-center transition-all peer-checked:border-emerald-500 peer-checked:bg-emerald-50 hover:border-slate-400">
                            <span className="text-sm font-semibold text-slate-700 peer-checked:text-emerald-700">
                                Cash Payments
                            </span>
                        </div>
                    </label>

                    <label className="cursor-pointer">
                        <input 
                            type="radio"
                            value="Deposit"
                            className="peer sr-only"
                            {...register("transaction_type")}
                        />
                        <div className="border-2 border-slate-300 bg-white rounded-md py-3 px-4 text-center transition-all peer-checked:border-emerald-500 peer-checked:bg-emerald-50 hover:border-slate-400">
                            <span className="text-sm font-semibold text-slate-700 peer-checked:text-emerald-700">
                                Deposit
                            </span>
                        </div>
                    </label>

                    <label className="cursor-pointer">
                        <input 
                            type="radio"
                            value="Cheque"
                            className="peer sr-only"
                            {...register("transaction_type")}
                        />
                        <div className="border-2 border-slate-300 bg-white rounded-md py-3 px-4 text-center transition-all peer-checked:border-emerald-500 peer-checked:bg-emerald-50 hover:border-slate-400">
                            <span className="text-sm font-semibold text-slate-700 peer-checked:text-emerald-700">
                                Cheque
                            </span>
                        </div>
                    </label>
                </div>
            </div>

            {/* <!-- Payment To/From --> */}
            <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Payment To / From
                </label>
                <input 
                    placeholder="Enter payee or payer name..."
                    {...register("payment_to_or_from")}
                    className="w-full px-4 py-3 bg-white border border-slate-300 rounded-md text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <p className="mt-1 text-xs text-slate-500">Maximum 225 characters</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                        Account
                    </label>
                    <select
                        {...register("account.account_code")}
                        onChange={onAccountChange}
                        className="w-full px-4 py-3 bg-white border border-slate-300 rounded-md text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                        <option value="">Select account...</option>
                        {useMemo(() => accounts.map((account: ControlAccountInterface) => (
                            <option key={account.account_code} value={account.account_code}>
                                {account.account_code} - ({account.account_name}) - {account.account_type}
                            </option>
                        )), [accounts])}
                    </select>

                    <input type="hidden" {...register("account.account_name")} />
                    <input type="hidden" {...register("account.account_type")} />
                </div>

                <div >
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                        Currency
                    </label>
                    <select
                        className="w-full px-4 py-3 bg-white border border-slate-300 rounded-md text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        {...register("currency")}
                    >
                        <option value="">Select currency...</option>
                        {useMemo(() => currencies.map((currency: CurrencyInterface) => (
                            <option key={currency.currency_code} value={currency.currency_code}>
                                {currency.currency_code}
                            </option>
                        )), [currencies])}
                    </select>
                </div>
            </div>

            {/* <!-- Description --> */}
            <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Description
                </label>
                <textarea 
                    {...register("description")}
                    rows={3}
                    placeholder="Transaction description..."
                    className="w-full px-4 py-3 bg-white border border-slate-300 rounded-md text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                />
                <p className="mt-1 text-xs text-slate-500">Maximum 300 characters</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                        Net Debit
                    </label>
                    <div className="relative">
                        <input 
                            {...register("net_debit")}
                            type="number"
                            placeholder="0.00"
                            step="0.01" min="0.00" onBlur={(e) => {
                                if (e.target.value) {
                                    e.target.value = parseFloat(e.target.value).toFixed(2);
                                }
                            }}
                            className="w-full pl-9 pr-4 py-3 bg-white border border-slate-300 rounded-md text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                        Net Credit
                    </label>
                    <div className="relative">
                        <input 
                            {...register("net_credit")}
                            type="number"
                            placeholder="0.00"
                            step="0.01" min="0.00" onBlur={(e) => {
                                if (e.target.value) {
                                    e.target.value = parseFloat(e.target.value).toFixed(2);
                                }
                            }}
                            className="w-full pl-9 pr-4 py-3 bg-white border border-slate-300 rounded-md text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>
                </div>
            </div>
                
                {/* <!-- Remark --> */}
            <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Remark
                </label>
                <input 
                    type="text"
                    {...register("remark")}
                    placeholder="Additional notes or remarks..."
                    className="w-full px-4 py-3 bg-white border border-slate-300 rounded-md text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <p className="mt-1 text-xs text-slate-500">Maximum 200 characters</p>
            </div>

            <div className="border-l-4 border-blue-500 bg-blue-50 px-5 py-4">
                    <p className="text-sm text-blue-900">
                    Enter either debit or credit amount, not both. Running balance will be calculated based on transaction history.
                    </p>
            </div>

            <div className={layout.submitSection}>
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className={buttons.primary}
                >
                    {isSubmitting ? (
                        <span className="flex items-center gap-2">
                            <div className={utils.spinner}></div>
                            Creating Cash Transaction...
                        </span>
                    ) : (
                        'Create Cash Transaction'
                    )}
                </button>
            </div>
        </form>
    );        
};
export default CashBookForm;
