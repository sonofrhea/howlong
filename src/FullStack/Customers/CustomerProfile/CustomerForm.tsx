import React, { useMemo } from "react";
import "../CustomerProfile/CustomerCss.css";
import { useForm } from "react-hook-form";

import { CustomerInputs } from "../constants/Types";

import { CurrencyInterface } from "../../Core/constants/Types";
import { BankInterface } from "../../Core/constants/Types";
import { ControlAccountInterface } from "../../ChartOfAccounts/Interfaces";

import { ID_TYPE_CHOICES,
  TAX_ID_CHOICES,
  BANK_TYPE_CHOICES,
  STATUS_CHOICES,
  COUNTRY_OPTIONS,
  //BOOLEAN_OPTIONS,
 } from "../constants/Options"; 
import { controlAccountHandler, currencyHandler, customerControlAccountHandler } from "../../handlers";




 




const CustomerForm: React.FC<any> = ({ onSubmit, isSubmitting, onBack, 
    onCancel, currencies, accounts, banks }) => {

        const { register, handleSubmit, setValue, 
            formState: { errors } } = useForm<CustomerInputs>({
            defaultValues: {
                is_active: false,
                status: 'Active'
            }
        });



const controlAccountChange = customerControlAccountHandler(accounts, setValue);
const currencyChange = currencyHandler(currencies, setValue);















        




        return(
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="w-full bg-yellow rounded-xl border shadow-2xl border-gray-200">
                    {/* Header */}
                    <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between bg-gray-50 rounded-t-xl">
                        <div className="flex items-center gap-4 flex-1">
                            <div className="absolute left-1/2 transform -translate-x-1/2">
                            </div>
                        </div>
                        <div className="flex gap-3">
                            <span className="inline-flex text-black items-center rounded-full text-s ">Status:      
                                <select 
                                    {...register("status")}
                                    className="ml-4 w-25 h-6 text-center bg-transparent cursor-pointer text-black rounded-lg focus:ring-2 focus:ring-green-300 bg-gray border border-gray-300"
                                >
                                    <option value="">select...</option>
                                    {useMemo(() => STATUS_CHOICES.map(option => (
                                        <option key={option.value} value={option.value}>
                                            {option.label}
                                        </option>
                                    )), [STATUS_CHOICES])}
                                    
                                </select>
                            </span>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="p-6 space-y-8 ">
                        {/* Key Information */}
                        <div className="bg-orange-50 rounded-lg p-6 border border-orange-200">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

                                <div>
                                    <div className="text-sm text-black mb-1">Customer Name</div>
                                    <input 
                                        className="w-full text-black rounded-lg border border-gray-300 px-3 py-2" 
                                        {...register("customer_name")} 
                                    />
                                </div>

                                <div>
                                    <div className="text-sm text-black  font-medium mb-1">Date created</div>
                                    <input 
                                        type="date" 
                                        {...register("date_created", {required: "Date is required"})}
                                        className="w-full text-black rounded-lg  cursor-pointer border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500"
                                    />
                                    {errors.date_created && <p className="text-amber-600 text-sm">{errors.date_created?.message}</p>}
                                </div>

                                <div >
                                    <div className="text-sm text-black font-medium mb-1">ID Type</div>
                                    <select 
                                        {...register("id_type")} 
                                        className="w-full text-black cursor-pointer rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500"
                                    >
                                        <option value="">select...</option>
                                        {useMemo(() => ID_TYPE_CHOICES.map(id_type => (
                                            <option key={id_type.value} value={id_type.value}>
                                                {id_type.label}
                                            </option>
                                        )), [ID_TYPE_CHOICES])}
                                    </select>
                                </div>

                                <div>
                                    <div className="text-sm text-black mb-1">ID File</div>
                                    <input 
                                        className="w-full text-black cursor-pointer rounded-lg border border-gray-300 px-3 py-2"
                                        type="file" 
                                        onChange={e => {
                                            const file = e.target.files?.[0] || null;
                                            setValue('id_file', file);
                                        }} 
                                    />
                                </div>
                                <div>
                                    <div className="text-sm text-black font-medium mb-1">Control Account</div>
                                    <select 
                                        {...register("control_account.account_code")}
                                        onChange={controlAccountChange}
                                        className="w-full text-black rounded-lg border border-gray-300 cursor-pointer px-3 py-2 focus:ring-2 focus:ring-green-300"
                                    >
                                        <option value=""></option>
                                        {useMemo(() => accounts.map((account: ControlAccountInterface) => (
                                            <option key={account.account_code} value={account.account_code}>
                                                {account.account_code} ({account.account_name})
                                            </option>
                                        )), [accounts])}
                                    </select>

                                    <input type="hidden" {...register("control_account.account_name")} />
                                    <input type="hidden" {...register("control_account.account_type")} />
                                </div>

                                <div>
                                    <div className="text-sm text-black mb-1">Company Name</div>
                                    <input 
                                        className="w-full text-black rounded-lg border border-gray-300 px-3 py-2" 
                                        {...register("company_name")} 
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Contact Information */}
                        <div className="bg-green-50 rounded-lg p-6 border border-green-200">
                            <h3 className="text-lg font-semibold text-gray-800 mb-4">Contact Information</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <div className="text-sm text-black mb-1">Email</div>
                                    <input 
                                        className="w-full text-black rounded-lg border border-gray-300 px-3 py-2"
                                        {...register("email")} 
                                    />
                                </div>
                                <div>
                                    <div className="text-sm text-black mb-1">Mobile</div>
                                    <input 
                                        className="w-full text-black rounded-lg border border-gray-300 px-3 py-2"
                                        {...register("mobile_number")} 
                                    />
                                </div>
                                <div>
                                    <div className="text-sm text-black mb-1">Home Phone</div>
                                    <input 
                                        className="w-full text-black rounded-lg border border-gray-300 px-3 py-2"
                                        {...register("home_number")} 
                                    />
                                </div>
                                <div>
                                    <div className="text-sm text-black mb-1">Fax</div>
                                    <input 
                                        className="w-full text-black rounded-lg border border-gray-300 px-3 py-2" 
                                        {...register("fax")} 
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Address Information */}
                        <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">

                            <h3 className="text-lg font-semibold text-black mb-4">Address Information</h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="md:col-span-5">
                                    
                                    <div className="text-sm text-black mb-1">Address</div>
                                    <input 
                                        className="w-full text-black rounded-lg border border-gray-300 px-3 py-2" 
                                        {...register("address")} 
                                    />
                                </div>
                                <div className="md:col-span-2">
                                    
                                    <div className="text-sm text-black mb-1">City</div>
                                    <input 
                                        className="w-full text-black rounded-lg border border-gray-300 px-3 py-2"
                                        {...register("city")} 
                                    />
                                </div>
                                <div className="md:col-span-2">
                                    
                                    <div className="text-sm text-black mb-1">State</div>
                                    <input 
                                        className="w-full text-black rounded-lg border border-gray-300 px-3 py-2" 
                                        {...register("state")} 
                                    />
                                </div>
                                <div className="md:col-span-2">
                                    
                                    <div className="text-sm text-black mb-1">Country</div>
                                    <select
                                    {...register("country")}
                                    className="w-full text-black rounded-lg cursor-pointer border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500"
                                    >
                                        <option value="">select...</option>
                                        {useMemo(() => COUNTRY_OPTIONS.map(country => (
                                            <option key={country.value} value={country.value}>
                                                {country.label}
                                            </option>
                                        )), [COUNTRY_OPTIONS])}
                                    </select>
                                </div>
                                <div className="md:col-span-2">
                                    
                                    <div className="text-sm text-black mb-1">Post Code</div>
                                    <input 
                                        className="w-full text-black rounded-lg border border-gray-300 px-3 py-2" 
                                        {...register("post_code")} 
                                    />
                                </div>
                            </div>
                        </div>

                        {/* CURRENCY INFO */}
                        <div className="bg-red-50 text-black rounded-lg p-6 border border-red-200 currency-info">

                            <div className="text-lg font-semibold text-black mb-4">Preferred Currency</div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                                <div>
                                    <div className="text-sm text-black mb-1">Currency code</div>

                                    <select 
                                        {...register("preferred_currency.currency_code")}
                                        onChange={currencyChange}
                                        className="w-full text-black rounded-lg border cursor-pointer border-gray-300 px-3 py-2" 
                                    >
                                        <select value="">Select currency...</select>
                                        {useMemo(() => currencies.map((currency: CurrencyInterface) => (
                                            <option key={currency.currency_code} value={currency.currency_code} >
                                                {currency.currency_code} - {currency.country}
                                            </option>
                                        )), [currencies])}
                                    </select>
                                    <input type="hidden" {...register("preferred_currency.currency_name")} />
                                    <input type="hidden" {...register("preferred_currency.currency_symbol")} />
                                    <input type="hidden" {...register("preferred_currency.country")} />
                                    <input type="hidden" {...register("preferred_currency.buy")} />
                                    <input type="hidden" {...register("preferred_currency.sell")} />
                                </div>
                            </div>
                        </div>

                        {/* BANK INFO */}
                        <div className="bg-violet-50 rounded-lg p-6">
                            <h3 className="text-lg font-semibold text-gray-800 mb-4">Bank Information</h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div>
                                    <div className="text-sm text-black mb-1">Bank Name</div>
                                    <select 
                                        {...register("customer_bank_name")}
                                        className="w-full text-black rounded-lg cursor-pointer border border-gray-300 px-3 py-2"
                                    >
                                        <option value="">select...</option>
                                        {useMemo(() => banks.map((bank: BankInterface) => (
                                            <option key={bank.bank_alias} value={bank.bank_alias}>
                                                {bank.bank_alias} - {bank.swift_code}
                                            </option>
                                        )), [banks])}
                                    </select>
                                </div>

                                <div>
                                    <div className="text-sm text-black mb-1">Bank account number</div>
                                    <input 
                                        className="w-full text-black rounded-lg border border-gray-300 px-3 py-2"
                                        {...register("customer_bank_account_number")} 
                                    />
                                </div>

                                <div>
                                    <div className="text-sm text-black mb-1">Account type</div>
                                    <select 
                                        {...register("bank_account_type")} 
                                        className="w-full text-black rounded-lg border cursor-pointer border-gray-300 px-3 py-2"
                                        >
                                        <option value="">select...</option>
                                        {useMemo(() => BANK_TYPE_CHOICES.map(option => (
                                            <option key={option.value} value={option.value} >
                                                {option.label}
                                            </option>
                                        )), [BANK_TYPE_CHOICES])}
                                    </select>
                                </div>

                                <div>
                                    <div className="text-sm text-black">Swift code</div>
                                    <input 
                                        className="w-full text-black rounded-lg border border-gray-300 px-3 py-2"
                                        {...register("swift_code")} 
                                    />
                                </div>

                                <div>
                                    <div className=" text-black mb-1">Active?</div>
                                    <input 
                                        type="checkbox" 
                                        className="w-5 h-5 cursor-pointer rounded border-gray-300"
                                        {...register("is_active")} 
                                    />
                                </div>

                                <div>
                                    <div className="text-sm text-black mb-1">Remark</div>
                                    <input 
                                        className="w-full text-black rounded-lg border border-gray-300 px-3 py-2"
                                        {...register("remark")} 
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Tax Information */}
                        <div className="bg-orange-50 rounded-lg p-6 border border-orange-200">
                            <h3 className="text-lg font-semibold text-gray-800 mb-4">Tax Information</h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div>
                                    <div className="text-sm text-black mb-1">GST Number</div>
                                    <input 
                                        className="w-full rounded-lg border text-black border-gray-300 px-3 py-2" 
                                        {...register("gst_number")} 
                                    />
                                </div>

                                <div>
                                    <div className="text-sm text-black mb-1">Tax ID Type</div>
                                    <select 
                                        {...register("tax_id_type")}
                                        className="w-full rounded-lg border cursor-pointer text-black border-gray-300 px-3 py-2" 
                                    >
                                        <option value="">select...</option>
                                        {useMemo(() => TAX_ID_CHOICES.map(tax => (
                                            <option key={tax.value} value={tax.value} >
                                                {tax.label}
                                            </option>
                                        )), [TAX_ID_CHOICES])}
                                    </select>
                                </div>

                                <div>
                                    <div className="text-sm text-black mb-1">Tax Number</div>
                                    <input
                                        className="w-full rounded-lg text-black border border-gray-300 px-3 py-2"
                                        {...register("tax_number")} 
                                    />
                                </div>

                                <div>
                                    <div className="text-sm text-black mb-1">Taxpayer's QR Code</div>
                                    <input 
                                        type="file"
                                        onChange={e => {
                                            const file = e.target.files?.[0] || null;
                                            setValue('taxpayers_qr_code', file);
                                        }}
                                        className="w-full text-black rounded-lg cursor-pointer border border-gray-300 px-3 py-2"
                                    />
                                </div>

                                <div>
                                    <div className="text-sm text-black mb-1">Tourism number</div>
                                    <input 
                                        className="w-full text-black rounded-lg border border-gray-300 px-3 py-2"
                                        {...register("tourism_number")} 
                                    />
                                </div>

                                <div>
                                    <div className="text-sm text-black mb-1">Expiration date</div>
                                    <input 
                                        type="date" 
                                        className="w-full text-black rounded-lg cursor-pointer border border-gray-300 px-3 py-2"
                                        {...register("expiration_date")} 
                                    />
                                </div>

                                <div>
                                    <div className="text-sm text-black mb-1">Service tax number</div>
                                    <input 
                                        className="w-full rounded-lg border border-gray-300 px-3 py-2"
                                        {...register("service_tax_number")} 
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-end gap-4 pt-6 border-t border-gray-200">
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="px-6 py-3 bg-green-600 cursor-pointer text-white rounded-lg hover:bg-blue-700 font-medium disabled:opacity-50">
                                {isSubmitting ? (
                                    <span className="flex items-center gap-2">
                                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                        Creating Customer...
                                    </span>
                                ) : (
                                    'Create Customer'
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        );
    };
    export default CustomerForm;
