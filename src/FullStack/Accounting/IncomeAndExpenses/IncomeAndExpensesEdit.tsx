import React, { useMemo, useState } from "react";
import { useForm } from "react-hook-form";

import { incomeExpensesAccountHandler } from "../../handlers";
import { ControlAccountInterface } from "../../ChartOfAccounts/Interfaces";
import { CurrencyInterface } from "../../Core/constants/Types";
import { buttons, layout, utils } from "../Constants/Styles";

import { IncomeAndExpensesInputs, IncomeAndExpensesProps } from "../Constants/Types";
import JournalEntryModal from "../JournalEntry/JournalEntryModal";







const IncomeAndExpensesEdit: React.FC<IncomeAndExpensesProps> = ({
    incomeAndExpense,
    onSubmit,
    isSubmitting,
    onCancel,
    currencies, accounts,
    onCreateJournalEntry, isCreatingJournalEntry
}) => {
    const [isJournalEntryOpen, setIsJournalEntryOpen] = useState(false);

    const { register, setValue, handleSubmit, watch, control, 
        reset, formState: { errors } } = useForm<IncomeAndExpensesInputs>({
            defaultValues: incomeAndExpense
        });

    const onAccountChange = incomeExpensesAccountHandler(accounts, setValue)
    






    return(
        <form onSubmit={handleSubmit(onSubmit)} className="p-10 space-y-9">

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                        Date
                    </label>
                    <input 
                        type="date"
                        {...register("date", {required: "Due date required"})}
                        className="w-full px-4 py-3 bg-white border border-slate-300 rounded-md text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    {errors.date && <p className="text-amber-600 text-sm">{errors.date?.message}</p>}
                </div>

                <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                        Cancelled?
                    </label>
                    <input 
                        {...register("cancelled")}
                        type="checkbox"
                    />
                </div>
            </div>
            <button
                onClick={() => setIsJournalEntryOpen(true)}
                className="bg-purple-900 text-white px-4 py-2 hover:bg-amber-900 rounded-lg flex items-center gap-2"
            >
                + Create Journal Entry
            </button>

            {/* <!-- Transaction Type --> */}
            <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-stone-600 mb-4 letterspacing-wide">
                    Transaction Type
                </label>

                <div className="grid grid-cols-2 gap-4">
                    <label className="cursor-pointer group">
                        <input 
                            type="radio"
                            value="INCOME"
                            {...register("category")}
                            defaultChecked
                            className="peer sr-only"
                        />
                        <div className="border border-stone-300 bg-white py-5 text-center transition-all duration-200 peer-checked:border-emerald-600 peer-checked:bg-emerald-50 group-hover:border-stone-400">
                            <span className="text-base font-semibold text-stone-700 peer-checked:text-emerald-700">
                                Income
                            </span>
                        </div>
                    </label>

                    <label className="cursor-pointer group">
                        <input 
                            type="radio"
                            value="EXPENSES"
                            {...register("category")}
                            className="peer sr-only"
                        />
                        <div className="border border-stone-300 bg-white py-5 text-center transition-all duration-200 peer-checked:border-rose-600 peer-checked:bg-rose-50 group-hover:border-stone-400">
                            <span className="text-base font-semibold text-stone-700 peer-checked:text-rose-700">
                                Expenses
                            </span>
                        </div>
                    </label>
                </div>
            </div>

            {/* <!-- Account & Currency --> */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
                <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-stone-600 mb-3">
                        Account
                    </label>
                    <select
                            className="w-full px-4 py-3.5 bg-white border border-stone-300 text-stone-900 focus:outline-none focus:ring-2 focus:ring-stone-900 focus:border-transparent transition-all"
                        {...register("account.account_code")}
                        onChange={onAccountChange}
                    >
                        <option value="">Select account</option>
                        {useMemo(() => accounts.map((account: ControlAccountInterface) => (
                            <option key={account.account_code} value={account.account_code}>
                                {account.account_code} - ({account.account_name}) - {account.account_type}
                            </option>
                        )), [accounts])}
                    </select>

                    <input type="hidden" {...register("account.account_name")} />
                    <input type="hidden" {...register("account.account_type")} />
                </div>

                <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-stone-600 mb-3">
                        Preferred Currency
                    </label>
                    <select
                        className="w-full px-4 py-3.5 bg-white border border-stone-300 text-stone-900 focus:outline-none focus:ring-2 focus:ring-stone-900 focus:border-transparent transition-all"
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

            <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-stone-600 mb-3">
                    Description
                </label>
                <textarea 
                    {...register("description")}
                    rows={4}
                    placeholder="Enter transaction details..."
                    className="w-full px-4 py-3.5 bg-white border border-stone-300 text-stone-900 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-stone-900 focus:border-transparent resize-none transition-all"
                />
                <p className="mt-2 text-xs text-stone-500">Maximum 200 characters</p>
            </div>

            {/* <!-- Amounts --> */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
                <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-stone-600 mb-3">
                        Debit(IN)
                    </label>
                    <div className="relative">
                        <input 
                            className="w-full pl-9 pr-4 py-3.5 bg-white border border-stone-300 text-stone-900 font-medium focus:outline-none focus:ring-2 focus:ring-stone-900 focus:border-transparent transition-all"
                            {...register("gross_debit")}
                            type="number"
                            placeholder="0.00"
                            step="0.01" min="0.00" onBlur={(e) => {
                                if (e.target.value) {
                                    e.target.value = parseFloat(e.target.value).toFixed(2);
                                }
                            }}
                        />
                    </div>
                </div>
                <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-stone-600 mb-3">
                        Credit(OUT)
                    </label>
                    <div className="relative">
                        <input 
                            className="w-full pl-9 pr-4 py-3.5 bg-white border border-stone-300 text-stone-900 font-medium focus:outline-none focus:ring-2 focus:ring-stone-900 focus:border-transparent transition-all"
                            {...register("gross_credit")}
                            type="number"
                            placeholder="0.00"
                            step="0.01" min="0.00" onBlur={(e) => {
                                if (e.target.value) {
                                    e.target.value = parseFloat(e.target.value).toFixed(2);
                                }
                            }}
                        />
                    </div>
                </div>
                <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-stone-600 mb-3">
                        Tax(%)
                    </label>
                    <div className="relative">
                        <input 
                            className="w-full pl-9 pr-4 py-3.5 bg-white border border-stone-300 text-stone-900 font-medium focus:outline-none focus:ring-2 focus:ring-stone-900 focus:border-transparent transition-all"
                            {...register("tax")}
                            type="number"
                            placeholder="0.00"
                            step="0.01" min="0.00" onBlur={(e) => {
                                if (e.target.value) {
                                    e.target.value = parseFloat(e.target.value).toFixed(2);
                                }
                            }}
                        />
                        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-400 font-medium">
                            %
                        </span>
                    </div>
                </div>
            </div>
            
            {/* <!-- Info Notice --> */}
            <div className="border-l-4 border-stone-900 bg-stone-50 px-5 py-4">
                <p className="text-sm text-stone-700 leading-relaxed">
                    Net amounts and running balance are calculated automatically. Enter either debit or credit amount, not both.
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
                            Updating Transaction...
                        </span>
                    ) : (
                        'Create Transaction'
                    )}
                </button>
                <button
                    type="button"
                    onClick={onCancel}
                    className={buttons.secondary}
                >
                    Cancel
                </button>
                <JournalEntryModal
                    isOpen={isJournalEntryOpen}
                    onClose={() => setIsJournalEntryOpen(false)}
                    onCreate={onCreateJournalEntry}
                    isSubmitting={isCreatingJournalEntry}
                    accounts={accounts}
                />
            </div>
        </form>
    );
};
export default IncomeAndExpensesEdit;