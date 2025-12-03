import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useForm } from "react-hook-form";
import { STATUS_CHOICES, ID_TYPE_CHOICES, 
    TAX_ID_CHOICES, COUNTRY_OPTIONS, CURRENCY_OPTIONS } from '../constants/options';
import { fetchCustomers, fetchCustomerById, updateCustomer , fetchCurrencies, fetchChartOfAccounts, fetchBanks } from '../../api/customerEngines';







//function appendNestedFormData(formData, key, value) {
  //  if (value === null) return;
    //if (Array.isArray(value)) {
      //  value.forEach((item, index) => {
        //    appendNestedFormData(formData, `${key}[${index}]`, item);
   //     });
  //  } else if (typeof value === 'object' && value != null) {
   //     Object.keys(value).forEach(subKey => {
 //           appendNestedFormData(formData, `${key}.${subKey}`, value[subKey]);
  //      });
 //   } else {
   //     formData.append(key, value);
   // }
//}

const CustomerEdit = ({ customer, onSubmit, isSubmitting, onBack, onCancel, customer_number }) => {
    const { register, handleSubmit, setValue, getValues, formState: { errors } } = useForm();
    const [options, setOptions] = useState({
        statusOptions: STATUS_CHOICES,
        idTypeOptions: ID_TYPE_CHOICES,
        taxIdTypeOptions: TAX_ID_CHOICES,
        currencyOptions: CURRENCY_OPTIONS,
        countryOptions: COUNTRY_OPTIONS,
        bankNameOptions: [],
        controlAccountOptions: []
    });

    const [fetchedCustomer, setFetchedCustomer] = useState(null);
    const displayCustomer = customer || fetchedCustomer;

    const inputStyles = "w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white";
    const selectStyles = "w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white cursor-pointer";
    const errorStyles = "border-red-500 focus:ring-red-500";
    const labelStyles = "block text-sm font-medium text-gray-700 mb-2";

    useEffect(() => {
        if (!displayCustomer) return;

        const isFileLike = (v) => {
            if (typeof File !== 'undefined' && v instanceof File) return true;
            return v && typeof v === 'object' && ('name' in v) && ('size' in v);
        };

        const safeSet = (name, val) => {
            if (val === undefined || val === null) return;
            try {
                const current = getValues(name);

                // handle File objects (or file-like) specially since JSON.stringify won't work
                if (isFileLike(val)) {
                    const currIsFile = isFileLike(current);
                    const differs = !currIsFile
                        || current.name !== val.name
                        || String(current.size) !== String(val.size)
                        || String(current.lastModified) !== String(val.lastModified);
                    if (differs) setValue(name, val);
                    return;
                }

                // normal comparison for primitives and simple objects
                const equal = (typeof current === 'object' && current !== null)
                    ? JSON.stringify(current) === JSON.stringify(val)
                    : String(current) === String(val);
                if (!equal) setValue(name, val);
            } catch (e) {
                // fallback: attempt to set if comparison fails
                setValue(name, val);
            }
        };

        const mainFields = [
            'customer_name','company_name',
            'address','country','post_code','city','state','mobile_number',
            'home_number','fax','email','id_type','status','remark'
        ];

        mainFields.forEach(f => safeSet(f, displayCustomer[f]));

        safeSet('id_file', displayCustomer.id_file);

        if (displayCustomer.control_account) {
            safeSet('account_code', displayCustomer.control_account.account_code);
            safeSet('account_name', displayCustomer.control_account.account_name);
        }

        if (displayCustomer.currency) {
            safeSet('currency', displayCustomer.currency.currency_symbol);
        }

        if (displayCustomer.tax_details?.[0]) {
            const tax = displayCustomer.tax_details[0];
            safeSet('tax_details.0.gst_number', tax.gst_number);
            safeSet('tax_details.0.tax_id_type', tax.tax_id_type);
            safeSet('tax_details.0.tax_number', tax.tax_number);
            safeSet('tax_details.0.tourism_number', tax.tourism_number);
            safeSet('tax_details.0.expiration_date', tax.expiration_date);
            safeSet('tax_details.0.service_tax_number', tax.service_tax_number);
            safeSet('tax_details.0.taxpayers_qr_code', tax.taxpayers_qr_code);
        }

        if (displayCustomer.bank_accounts?.[0]) {
            const bank = displayCustomer.bank_accounts[0];
            const alias = bank.customer_bank_name && typeof bank.customer_bank_name === 'object'
                ? bank.customer_bank_name.bank_alias
                : bank.customer_bank_name;
            safeSet('bank_accounts.0.customer_bank_name', alias || '');
            safeSet('bank_accounts.0.customer_bank_account_number', bank.customer_bank_account_number || '');
            safeSet('bank_accounts.0.bank_account_type', bank.bank_account_type || '');
            safeSet('bank_accounts.0.is_active', !!bank.is_active);
        }
    }, [displayCustomer, setValue, getValues]);

    useEffect(() => {
        // Also fetch if the supplied customer looks "shallow" (missing nested relations).
        const needsFetch = !customer
            || (!customer.control_account && !customer.bank_accounts); // adjust checks as needed

        const id = customer?.customer_number || customer_number;
        if (!needsFetch || !id) {
            if (customer && customer.control_account) setFetchedCustomer(null);
            return;
        }

        let mounted = true;
        const load = async () => {
            try {
                const res = await fetchCustomerById(id);
                const data = res?.data ?? res;
                if (mounted) setFetchedCustomer(data);
            } catch (e) {
                console.error('Failed to fetch customer by id', e);
            }
        };
        load();
        return () => { mounted = false; };
    }, [customer, customer_number]);

    useEffect(() => {
        const fetchOptions = async () => {
            try {
                const [currencies, banks, chartofaccounts] = await Promise.all([
                    fetchCurrencies(),
                    fetchBanks(),
                    fetchChartOfAccounts(),
                ]);
                setOptions(prev => ({
                    ...prev,
                    currencyOptions: Array.isArray(currencies) ? currencies : [],
                    bankNameOptions: Array.isArray(banks) ? banks : [],
                    controlAccountOptions: Array.isArray(chartofaccounts) ? chartofaccounts : []
                }));
            } catch (e) { console.error(e); }
        };
        fetchOptions();
    }, []);

    const onFormSubmit = async (data) => {
        const formData = new FormData();

        const taxpayers_qr_codeIsFile = !!(data.tax_details?.[0]?.taxpayers_qr_code && data.tax_details[0].taxpayers_qr_code instanceof File);
        const selectedControlAccount = options.controlAccountOptions?.find(acc => String(acc.account_code) === String(data.account_code));

        const payload = {
            customer_name: data.customer_name || null,
            company_name: data.company_name || null,
            control_account: {
                account_code: data.account_code || null,
                account_name: selectedControlAccount?.account_name || null
            },
            address: data.address || null,
            country: data.country || null,
            post_code: data.post_code || null,
            city: data.city || null,
            state: data.state || null,
            mobile_number: data.mobile_number || null,
            home_number: data.home_number || null,
            fax: data.fax || null,
            email: data.email || null,
            id_type: data.id_type || null,
            currency: data.currency ? { currency_symbol: data.currency } : null,
            status: data.status || null,
            remark: data.remark || null,
            tax_details: Array.isArray(data.tax_details) ? data.tax_details.map(tax =>({
                gst_number: tax.gst_number || null,
                tax_id_type: tax.tax_id_type || null,
                tax_number: tax.tax_number || null,
                tourism_number: tax.tourism_number || null,
                expiration_date: tax.expiration_date ? new Date(tax.expiration_date).toISOString().slice(0,10) : null,
                service_tax_number: tax.service_tax_number || null,
                taxpayers_qr_code: (taxpayers_qr_codeIsFile ? null : (tax?.taxpayers_qr_code || null))
            })) : [],
            bank_accounts: Array.isArray(data.bank_accounts) ? data.bank_accounts.map(account => {
                const alias = account.customer_bank_name || null;
                const found = options.bankNameOptions?.find(b => b.bank_alias === alias);
                return {
                    customer_bank_name: {
                    bank_alias: alias || null,
                    bank_name: found?.bank_name || null,
                    swift_code: found?.swift_code || null,
                },
                customer_bank_account_number: account.customer_bank_account_number || null, 
                bank_account_type: account.bank_account_type || null,
                is_active: !!account.is_active
                };
            }) : []
        };

   
        if (data.id_file instanceof File) {
            formData.append('id_file', data.id_file);
        }

        // taxpayers_qr_code may be uploaded as a File in tax_details[0]
        const uploadedTaxQr = data.tax_details?.[0]?.taxpayers_qr_code;
        if (uploadedTaxQr instanceof File) {
            formData.append('taxpayers_qr_code', uploadedTaxQr);
        }
        console.log('JSON Payload:', payload);
        formData.append('data', JSON.stringify(payload));
        console.log('JSON Payload AFTER STRINGIFY:', payload);


        try {
            const customerId = displayCustomer?.formatted_customer_number;
            if (!customerId) {
                console.error("Error: Customer ID (customer_number) is missing. Cannot perform update.");
                return; 
            }
            const res = await updateCustomer({ customer_number: displayCustomer.customer_number, customerData: formData });
            console.log("Customer updated successfully");

            const updated = res?.data ?? res;
            // update local state so UI can use the updated record immediately
            setFetchedCustomer(updated);

            if (typeof onSubmit === 'function') {
                onSubmit(updated);
            }

            // refresh the page to ensure everything (parent/state) reflects the updated profile
            window.location.reload();
            
            return;
        } catch (err) {
            console.error(err);
            console.log("Failed to update customer");
        }

        const debugPayload = {};
        formData.forEach((value, key) => {
            debugPayload[key] = value;
        });
        console.log("Payload being sent:", debugPayload);

    };

    return (
        <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl border border-white/20">
            <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <button onClick={onBack} className="text-gray-500 hover:text-gray-700 transition-colors">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                    </button>
                    <div>
                        <h2 className="text-2xl font-bold text-gray-800">Edit Customer</h2>
                        <p className="text-gray-600">{displayCustomer?.customer_name} - {displayCustomer?.formatted_customer_number}</p>
                    </div>
                </div>
                                                            {/* CONTROL CHART OF ACCOUNT */}
                <div className="flex items-center gap-2">
                    <label className="text-sm font-medium text-gray-700">Control Account:</label>
                    <select {...register("account_code")}
                    className="w-[30vw] px-2 py-1 text-sm border rounded-md focus:ring-2 focus:ring-blue-500">
                        <option value="">Select</option>
                        {options.controlAccountOptions.map((account, index) => (
                            <option key={`${account.account_code}-${index}`} value={account.account_code}>
                                {account.account_code} - {account.account_name}
                            </option>
                        ))}
                    </select>
                </div>
                                                        {/* CUSTOMER STATUS */}
                <div className="flex items-center gap-2">
                    <label className="text-sm font-medium text-gray-700">Status:</label>
                    <select 
                        {...register("status", { required: "Status required" })} 
                        className={`w-32 px-2 py-1 text-sm border rounded-md focus:ring-2 focus:ring-blue-500 ${errors.status ? 'border-red-500' : 'border-gray-300'}`}
                    >
                        <option value="">Select</option>
                        {options.statusOptions.map(o => (
                            <option key={o.value} value={o.value}>{o.label}</option>
                        ))}
                    </select>
                    {errors.status && <p className="text-red-500 text-xs">{errors.status.message}</p>}
                </div>
            </div>

            <form onSubmit={handleSubmit(onFormSubmit)} className="p-6 space-y-6">
                {/* PERSONAL INFO */}
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">
                        Basic Information
                        </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                                           {/* CUSTOMER NAME */}
                        <div>
                            <label htmlFor="customer_name" className={labelStyles}>Customer Name <span className="text-red-500">*</span></label>
                            <input id="customer_name" {...register("customer_name", { required: "Customer name is required" })} className={`${inputStyles} ${errors.customer_name ? errorStyles : ''}`} />
                            {errors.customer_name && <p className="text-red-500 text-xs mt-1">{errors.customer_name.message}</p>}
                        </div>
                                                                    {/* COMPANY NAME */}
                        <div>
                            <label htmlFor="company_name" className={labelStyles}>Company Name</label>
                            <input id="company_name" {...register("company_name")} className={inputStyles} />
                        </div>
                                        {/* Mobile Number */}
                        <div>
                            <label htmlFor="mobile_number" className={labelStyles}>Mobile Number</label>
                             <input id="mobile_number" {...register("mobile_number")} className={inputStyles} />
                        </div>
                                        {/* Email */}
                        <div>
                            <label htmlFor="email" className={labelStyles}>Email</label>
                            <input id="email" {...register("email")} className={inputStyles} />
                        </div>
                                        
                        
                    </div>
                </div>

                {/* ADDRESS */}
                <div className="bg-gradient-to-r from-green-50 to-green-50 rounded-xl p-6 border border-green-100">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Address Information</h3>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                            {/* Address */}
                        <div className="md:col-span-3">
                        <label htmlFor="address" className={labelStyles}>Address</label>
                        <textarea
                            id="address"
                            {...register("address")}
                            rows="2"
                            className={`${inputStyles} w-full`}
                        ></textarea>
                        </div>

                                            {/* Country */}
                        <div>
                            <label htmlFor="country" className={labelStyles}>Country</label>
                            <select {...register("country")} className={selectStyles}>
                                <option value="">Select</option>
                                {options.countryOptions.map(co => (
                                    <option key={co.value} value={co.value}>{co.label}</option>
                                ))}
                            </select>
                        </div>

                                        {/* Post Code */}
                        <div>
                        <label htmlFor="post_code" className={labelStyles}>Post Code</label>
                        <input id="post_code" {...register("post_code")} className={inputStyles} />
                        </div>

                                            {/* City */}
                        <div>
                        <label htmlFor="city" className={labelStyles}>City</label>
                        <input id="city" {...register("city")} className={inputStyles} />
                        </div>

                                            {/* State */}
                        <div>
                        <label htmlFor="state" className={labelStyles}>State</label>
                        <input id="state" {...register("state")} className={inputStyles} />
                        </div>

                                        {/* Home Number */}
                        <div>
                        <label htmlFor="home_number" className={labelStyles}>Home Number</label>
                        <input id="home_number" {...register("home_number")} className={inputStyles} />
                        </div>

                                            {/* Fax */}
                        <div>
                        <label htmlFor="fax" className={labelStyles}>Fax</label>
                        <input id="fax" {...register("fax")} className={inputStyles} />
                        </div>
                    </div>
                </div>

                {/* EXTRA INFO */}
                <div className="bg-gradient-to-r from-purple-50 to-violet-50 rounded-xl p-6 border border-purple-100">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Extra Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        
                                                {/* Id type */}
                        <div>
                            <label htmlFor="id_type" className="text-sm font-medium text-gray-700">ID Type</label>
                            <select id="id_type" {...register("id_type")}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                                <option value=""></option>
                                {options.idTypeOptions.map(o => (
                                <option key={o.value} value={o.value}>{o.label}</option>
                                ))}
                            </select>
                        </div>
                                                {/* Id Upload */}
                        <div>
                            <label className={labelStyles}>ID File (Upload)</label>
                            <input 
                                id="id_file"
                                type="file" 
                                accept=".pdf,.jpg,.jpeg,.png"
                                onChange={(e) => {
                                    const file = e.target.files?.[0];
                                    if (file) setValue('id_file', file);
                                }}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                            />
                            {displayCustomer?.id_file && (
                                <p className="text-sm text-gray-600 mt-1">
                                    Current: <a href={displayCustomer.id_file} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">View File</a>
                                </p>
                            )}
                        </div>
                                            {/* Currency */}
                        <div>
                            <label className={labelStyles}>Currency</label>
                            <select {...register("currency")} className={selectStyles}>
                                <option value="">Select</option>
                                {options.currencyOptions.map(c => (
                                    <option key={c.value} value={c.value}>{c.label}</option>
                                    ))}
                            </select>
                        </div>
                                            {/* Remark */}
                        <div className="md:col-span-2">
                            <label className={labelStyles}>Remark</label>
                            <textarea rows="2" className={`${inputStyles} w-full`} {...register("remark")}></textarea>
                        </div>
                    </div>
                </div>

                {/* TAX */}
                <div className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-xl p-6 border border-orange-100">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Tax Information</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                           {/* TAX INFO */}
                            <div>
                                <label className={labelStyles}>GST Number</label>
                                <input type="text" {...register('tax_details.0.gst_number')} className={inputStyles} />
                            </div>

                            <div>
                                <label className={labelStyles}>Tax Number</label>
                                <input type="text" {...register('tax_details.0.tax_number')} className={inputStyles} />
                            </div>

                            <div>
                                <label className={labelStyles}>Tourism Number</label>
                                <input type="text" {...register('tax_details.0.tourism_number')} className={inputStyles} />
                            </div>

                            <div>
                                <label className={labelStyles}>Service Tax Number</label>
                                <input type="text" {...register('tax_details.0.service_tax_number')} className={inputStyles} />
                            </div>

                            <div>
                                <label className={labelStyles}>Expiration Date</label>
                                <input type="date" {...register('tax_details.0.expiration_date')} className={inputStyles} />
                            </div>

                            <div>
                                <label className={labelStyles}>Tax ID Type</label>
                                <select {...register('tax_details.0.tax_id_type')} className={selectStyles}>
                                    <option value="">Choose</option>
                                    {options.taxIdTypeOptions.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                                </select>
                            </div>

                            <div className="md:col-span-1">
                                <label className={labelStyles}>Taxpayers QR Code (Upload)</label>
                                <input
                                    type="file"
                                    accept=".png,.jpg,.jpeg,.pdf"
                                    onChange={(e) => {
                                        const file = e.target.files?.[0];
                                        if (file) setValue('tax_details.0.taxpayers_qr_code', file);
                                    }}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                />

                                {displayCustomer?.tax_details?.[0]?.taxpayers_qr_code && typeof displayCustomer.tax_details[0].taxpayers_qr_code === 'string' && (
                                    <p className="text-sm text-gray-600 mt-1">
                                        Current: <a href={displayCustomer.tax_details[0].taxpayers_qr_code} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">View QR</a>
                                    </p>
                                )}
                            </div>
                        </div>
                </div>

                {/* BANK */}
                <div className="bg-gradient-to-r from-cyan-50 to-blue-50 rounded-xl p-6 border border-cyan-100">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Bank Accounts</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className={labelStyles}>Bank Name</label>
                            <select {...register("bank_accounts.0.customer_bank_name")} className={selectStyles}>
                                <option value="">Select</option>
                                {options.bankNameOptions.map(bank => <option key={`${bank.bank_alias} - ${bank.bank_name}`} value={bank.bank_alias}>
                                    {`${bank.bank_alias} - ${bank.bank_name} (${bank.swift_code})`}
                                </option>)}
                            </select>
                        </div>
                        <div>
                            <label className={labelStyles}>Account Type</label>
                            <select {...register("bank_accounts.0.bank_account_type")} className={selectStyles}>
                                <option value="">Select</option>
                                {options.bankAccountTypeOptions.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
                            </select>
                        </div>
                        <div>
                            <label className={labelStyles}>Account Number</label>
                            <input {...register("bank_accounts.0.customer_bank_account_number")} className={inputStyles} />
                        </div>
                        <div className="flex items-center">
                            <input type="checkbox" {...register("bank_accounts.0.is_active")} className="w-4 h-4" />
                            <label className="ml-2">Active</label>
                        </div>
                    </div>
                </div>

                <div className="flex justify-end gap-4 pt-6 border-t border-gray-200">
                    <button type="button" onClick={onCancel} disabled={isSubmitting} className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium">
                        Cancel
                    </button>
                    <button type="submit" disabled={isSubmitting} className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium disabled:opacity-50">
                        {isSubmitting ? 'Saving...' : 'Save'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CustomerEdit;