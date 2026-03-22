import React, { useMemo, useState } from "react";
import { BankInterface, CompanyProfileEditProps, CompanyProfileInputs, CurrencyInterface, IndustryCodesInterface } from "../constants/Types";
import { useForm } from "react-hook-form";
import { COUNTRY_OPTIONS, TAX_ID_CHOICES } from "../../Customers/constants/Options";
import { BANK_TYPE_CHOICES, E_INVOICE_ENVIRONMENT_CHOICES } from "../constants/Options";
import { companyCurrencyHandler } from "../../handlers";




const formatDate = (dateString?: string | null) => {
    if (!dateString) return '--';
    return new Date(dateString).toISOString().split("T")[0];
};

const formatUpdatedDate = (dateString: string) => {
  if (!dateString) return '--';
  return new Date(dateString).toLocaleString();
};










const CompanyProfileEdit: React.FC<CompanyProfileEditProps> = ({
    company,
    onSubmit,
    isSubmitting,
    onCancel,
    currencies,
    banks,
    industryCodes
}) => {


  const { register, handleSubmit, watch, setValue, reset,
      control, formState: { errors }
    } = useForm<CompanyProfileInputs>({
      defaultValues: company
    });


    React.useEffect(() => {
      reset(company);
    }, [company, reset]);



    function updateCC(id: string, ccId: string, max: number): void {

      const inputEl = document.getElementById(id) as HTMLInputElement | null;
      const displayEl = document.getElementById(ccId) as HTMLElement | null;

      if (inputEl && displayEl) {
          const len = inputEl.value.length;
          
          displayEl.textContent = `${max - len} / ${max}`;
          
          displayEl.style.color = len > max * 0.9 ? '#dc2626' : '#d1d5db';
      }
      }

      updateCC('remark', 'cc_remark', 300);


    const onCurrencyChange = companyCurrencyHandler(currencies, setValue);




    const industrycodes = useMemo(() => industryCodes.map((code: IndustryCodesInterface) => (
                            <option key={code.industry_code} value={code.industry_code}>
                              {code.industry_code} - {code.industry_description} - {code.msic_category_reference}
                            </option>
                          )), [industryCodes])






    return (
        <div className="min-w-full">

            <style>
                {`
                    @import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700;800;900&display=swap");
                        
                    @keyframes fadeUp {
                      from { opacity: 0; transform: translateY(14px); }
                      to   { opacity: 1; transform: translateY(0); }
                    }
                    .fade-up   { animation: fadeUp .35s ease both; }
                    .fade-up-1 { animation: fadeUp .35s ease .04s both; }
                    .fade-up-2 { animation: fadeUp .35s ease .08s both; }
                    .fade-up-3 { animation: fadeUp .35s ease .12s both; }
                    .fade-up-4 { animation: fadeUp .35s ease .16s both; }
                    .fade-up-5 { animation: fadeUp .35s ease .20s both; }
                    .fade-up-6 { animation: fadeUp .35s ease .24s both; }
                    em { font-style: normal; border-bottom: 3.5px solid #f59e0b; padding-bottom: 1px; }
                    /* reusable input style — Tailwind can't do :focus ring + border combo inline */
                    .inp {
                      width: 100%; background: #fff;
                      border: 1.5px solid #e2e6f0; border-radius: 8px;
                      color: #111827; font-family: 'Montserrat', sans-serif;
                      font-size: 0.86rem; font-weight: 600;
                      padding: 10px 12px; outline: none;
                      transition: border-color .15s, box-shadow .15s;
                      appearance: none; -webkit-appearance: none;
                    }
                    .inp::placeholder { color: #d1d5db; font-weight: 400; }
                    .inp:hover:not(:focus) { border-color: #c4cad6; }
                    .inp:focus { border-color: #0a0a0a; box-shadow: 0 0 0 3px rgba(10,10,10,.08); }
                    textarea.inp { resize: vertical; min-height: 80px; line-height: 1.5; }
                    /* error state */
                    .field-wrap.err .inp  { border-color: #dc2626; box-shadow: 0 0 0 3px rgba(220,38,38,.08); }
                    .field-wrap .errmsg   { display: none; }
                    .field-wrap.err .errmsg { display: block; }
                    /* select chevron */
                    .sel-wrap { position: relative; }
                    .sel-wrap::after {
                      content: ''; position: absolute; right: 12px; top: 50%;
                      transform: translateY(-50%); pointer-events: none;
                      border-left: 4px solid transparent; border-right: 4px solid transparent;
                      border-top: 5px solid #6b7280;
                    }
                    .sel-wrap select { padding-right: 32px; cursor: pointer; }
                `}
            </style>


            <form onSubmit={handleSubmit(onSubmit)}>

                <div className="bg-[#f0f2f7] font-sans text-gray-900 min-h-screen px-4 py-8 pb-20">

                  <div className="max-w-4xl mx-auto mb-9 flex items-end justify-between gap-4 flex-wrap">
                    <div>
                        <h1 className="text-3xl text-left font-black tracking-tighter leading-none text-[#0a0a0a]" style={{ fontFamily: 'Montserrat, system-ui' }}>
                            Edit <em>Profile</em>
                        </h1>
                      <p className="text-[0.7rem] text-left text-gray-400 mt-2 font-semibold tracking-widest uppercase" style={{ fontFamily: 'Montserrat, system-ui' }}>
                        Update your organisation details
                      </p>
                    </div>
                  </div>

                  
                  <div className="max-w-4xl mx-auto flex flex-col gap-6">

                    
                    
                    <div className="fade-up bg-white border border-[#e2e6f0] rounded-2xl overflow-hidden shadow-sm">


                      <div className="flex items-center gap-3 px-6 py-4 bg-[#f8f9fc] border-b border-[#e2e6f0]">
                        <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center shrink-0">
                          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>
                        </div>
                        <h2 className="flex-1 text-[0.75rem] font-extrabold tracking-widest uppercase text-gray-600" style={{ fontFamily: 'Montserrat, system-ui' }}>
                            Basic Information
                        </h2>
                        <span className="text-[0.68rem] text-gray-400 font-medium" style={{ fontFamily: 'Montserrat, system-ui' }}>
                            Core company identity
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" style={{ fontFamily: 'Montserrat, system-ui' }}>


                        <div className="col-span-full px-6 py-5 border-b border-[#e2e6f0] bg-[#fafbfd] hover:bg-[#f5f6fa] transition-colors text-left" style={{ fontFamily: 'Montserrat, system-ui' }}>
                          <div className="flex items-center gap-2 text-[0.65rem] font-extrabold tracking-widest uppercase text-gray-400 mb-1.5">
                            Email
                            <svg className="ml-auto opacity-30" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                          </div>
                          <div className="text-[0.88rem] font-semibold text-gray-800">
                            {company.email}
                          </div>
                        </div>


                        <div id="ff_email" className="field-wrap px-6 py-5 border-r border-b border-[#e2e6f0] bg-white focus-within:bg-[#fffef8] transition-colors">
                          <label className="flex items-center gap-1.5 text-[0.65rem] font-extrabold tracking-widest uppercase text-gray-400 mb-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-red-500 shrink-0 mt-px"></span>
                            Company Name
                          </label>
                          <input 
                            className="inp"
                            {...register("name")}
                          />
                        </div>


                        <div id="ff_reg" className="field-wrap px-6 py-5 border-r border-b border-[#e2e6f0] bg-white focus-within:bg-[#fffef8] transition-colors">
                          <label className="flex items-center gap-1.5 text-[0.65rem] font-extrabold tracking-widest uppercase text-gray-400 mb-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-red-500 shrink-0 mt-px"></span>
                            Registration Number
                          </label>
                          <input
                            placeholder="e.g. 202301012345" className="inp"
                            {...register("registration_number")}
                            />
                        </div>


                        <div className="px-6 py-5 border-r border-b border-[#e2e6f0] bg-white focus-within:bg-[#fffef8] transition-colors">
                          <label className="flex items-center gap-1.5 text-[0.65rem] font-extrabold tracking-widest uppercase text-gray-400 mb-2">
                            Industry Code
                            <span className="text-[0.6rem] font-normal text-gray-400 bg-gray-100 rounded px-1.5 py-px italic"></span>
                          </label>
                          <div className="sel-wrap">
                            <select 
                             className="inp"
                             {...register("industry_code")}
                             >
                                <option value="">select...</option>
                                {industrycodes}
                            </select>
                          </div>
                       
                          <p className="text-[0.65rem] text-gray-400 mt-1.5 font-medium">MSIC / NACE industry code</p>
                        </div>


                        <div id="ff_mobile" className="field-wrap px-6 py-5 border-r border-b border-[#e2e6f0] bg-white focus-within:bg-[#fffef8] transition-colors">
                          <label className="flex items-center gap-1.5 text-[0.65rem] font-extrabold tracking-widest uppercase text-gray-400 mb-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-red-500 shrink-0 mt-px"></span>
                            Mobile Number
                          </label>
                          <input 
                            className="inp"
                            {...register("mobile_number")}
                          />
                        </div>


                        <div className="field-wrap px-6 py-5 border-r border-b border-[#e2e6f0] bg-white focus-within:bg-[#fffef8] transition-colors">
                          <label className="flex items-center gap-1.5 text-[0.65rem] font-extrabold tracking-widest uppercase text-gray-400 mb-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-red-500 shrink-0 mt-px"></span>
                            Company Logo
                          </label>
                          {typeof company.company_logo === "string" && (
                            <div className="w-16 h-12 rounded-2xl flex items-center justify-content-center shadow-md">
                                <img 
                                    src={company.company_logo}
                                    className="w-16 h-12 rounded-2xl flex items-center justify-content-center shadow-md"
                                    alt="existing"
                                />
                            </div>
                          )}
                            <input 
                                className="inp"
                                type="file"
                                placeholder="upload product photo"
                                onChange={e => {
                                    const file = e.target.files?.[0] || undefined;
                                    setValue('company_logo', file);
                                }}
                            />
                        </div>


                        <div className="col-span-full px-6 py-5 border-b border-[#e2e6f0] bg-white focus-within:bg-[#fffef8] transition-colors relative">
                          <label className="text-[0.65rem] font-extrabold tracking-widest uppercase text-gray-400 mb-2 block">Remark</label>
                          <textarea maxLength={225} onInput={() => updateCC('remark','cc_remark',225)}
                            placeholder="Internal notes about this company…"
                            {...register("remark")}
                            className="inp"/>
                          <span id="cc_remark" className="absolute bottom-6 right-7 text-[0.6rem] font-semibold text-gray-300 pointer-events-none"></span>
                        </div>

                      </div>
                    </div>

                    
                    
                    <div className="fade-up-1 bg-white border border-[#e2e6f0] rounded-2xl overflow-hidden shadow-sm" style={{ fontFamily: 'Montserrat, system-ui' }}>

                      <div className="flex items-center gap-3 px-6 py-4 bg-[#f8f9fc] border-b border-[#e2e6f0]">
                        <div className="w-8 h-8 rounded-lg bg-violet-100 flex items-center justify-center shrink-0">
                          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#7c3aed" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                        </div>
                        <h2 className="flex-1 text-[0.75rem] font-extrabold tracking-widest uppercase text-gray-600" style={{ fontFamily: 'Montserrat, system-ui' }}>
                            Address
                        </h2>
                        <span className="text-[0.68rem] text-gray-400 font-medium">Registered business address</span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">


                        <div id="ff_address" className="field-wrap col-span-full px-6 py-5 border-b border-[#e2e6f0] bg-white focus-within:bg-[#fffef8] transition-colors">
                          <label className="flex items-center gap-1.5 text-[0.65rem] font-extrabold tracking-widest uppercase text-gray-400 mb-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-red-500 shrink-0 mt-px"></span>
                            Street Address
                          </label>
                          <input 
                            type="text"
                            placeholder="Street, building, suite…"
                            className="inp"
                            {...register("address")}
                          />
                        </div>


                        <div id="ff_city" className="field-wrap px-6 py-5 border-r border-b border-[#e2e6f0] bg-white focus-within:bg-[#fffef8] transition-colors">
                          <label  className="flex items-center gap-1.5 text-[0.65rem] font-extrabold tracking-widest uppercase text-gray-400 mb-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-red-500 shrink-0 mt-px"></span>City
                          </label>
                          <input type="text"
                          placeholder="City"
                          className="inp"
                          {...register("city")}
                          />
                        </div>


                        <div id="ff_state" className="field-wrap px-6 py-5 border-r border-b border-[#e2e6f0] bg-white focus-within:bg-[#fffef8] transition-colors">
                          <label  className="flex items-center gap-1.5 text-[0.65rem] font-extrabold tracking-widest uppercase text-gray-400 mb-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-red-500 shrink-0 mt-px"></span>State
                          </label>
                          <input 
                            type="text"
                            placeholder="State / Province" 
                            className="inp"
                            {...register("state")}
                            />
                        </div>

                        <div id="ff_postcode" className="field-wrap px-6 py-5 border-r border-b border-[#e2e6f0] bg-white focus-within:bg-[#fffef8] transition-colors">
                          <label  className="flex items-center gap-1.5 text-[0.65rem] font-extrabold tracking-widest uppercase text-gray-400 mb-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-red-500 shrink-0 mt-px"></span>Post Code
                          </label>
                          <input 
                            type="text" 
                            className="inp"
                            {...register("post_code")}
                            />
                        </div>

                        <div className="px-6 py-5 border-b border-[#e2e6f0] bg-white focus-within:bg-[#fffef8] transition-colors">
                          <label className="flex items-center gap-1.5 text-[0.65rem] font-extrabold tracking-widest uppercase text-gray-400 mb-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-red-500 shrink-0 mt-px"></span>Country
                          </label>
                          <div className="sel-wrap">
                            <select className="inp"
                                {...register("country")}
                            >
                                <option value="">select...</option>
                                {useMemo(() => COUNTRY_OPTIONS.map(option => (
                                    <option key={option} value={option}>
                                        {option}
                                    </option>
                                )), [COUNTRY_OPTIONS])}
                            </select>
                          </div>
                        </div>

                      </div>
                    </div>

                    
                    
                    <div className="fade-up-2 bg-white border border-[#e2e6f0] rounded-2xl overflow-hidden shadow-sm">

                      <div className="flex items-center gap-3 px-6 py-4 bg-[#f8f9fc] border-b border-[#e2e6f0]">
                        <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center shrink-0">
                          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#d97706" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
                        </div>
                        <h2 className="flex-1 text-[0.75rem] font-extrabold tracking-widest uppercase text-gray-600" style={{ fontFamily: 'Montserrat, system-ui' }}>
                            Tax &amp; Currency
                        </h2>
                        <span className="text-[0.68rem] text-gray-400 font-medium">Financial identifiers</span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3">


                        <div className="px-6 py-5 border-r border-b border-[#e2e6f0] bg-white focus-within:bg-[#fffef8] transition-colors">
                          <label className="flex items-center gap-1.5 text-[0.65rem] font-extrabold tracking-widest uppercase text-gray-400 mb-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-red-500 shrink-0 mt-px"></span>E-invois environment
                          </label>
                          <div className="sel-wrap">
                            <select 
                             className="inp"
                             {...register("einvoice_environment")}
                             >
                                {useMemo(() => E_INVOICE_ENVIRONMENT_CHOICES.map(option => (
                                    <option key={option} value={option}>
                                        {option}
                                    </option>
                                )), [E_INVOICE_ENVIRONMENT_CHOICES])}
                            </select>
                          </div>
                        </div>


                        <div id="ff_tin" className="field-wrap px-6 py-5 border-r border-b border-[#e2e6f0] bg-white focus-within:bg-[#fffef8] transition-colors">
                          <label className="flex items-center gap-1.5 text-[0.65rem] font-extrabold tracking-widest uppercase text-gray-400 mb-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-red-500 shrink-0 mt-px"></span>TIN Number
                          </label>
                          <input type="text"
                            className="inp"
                            {...register("tin_number")}
                          />
                        </div>


                        <div className="px-6 py-5 border-r border-b border-[#e2e6f0] bg-white focus-within:bg-[#fffef8] transition-colors">
                          <label className="flex items-center gap-1.5 text-[0.65rem] font-extrabold tracking-widest uppercase text-gray-400 mb-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-red-500 shrink-0 mt-px"></span>Tax ID Type
                          </label>
                          <div className="sel-wrap">
                            <select 
                             className="inp"
                             {...register("tax_id_type")}
                             >
                                <option value="">select...</option>
                                {useMemo(() => TAX_ID_CHOICES.map(option => (
                                    <option key={option} value={option}>
                                        {option}
                                    </option>
                                )), [TAX_ID_CHOICES])}
                            </select>
                          </div>
                        </div>


                        <div className="px-6 py-5 border-b border-[#e2e6f0] bg-white focus-within:bg-[#fffef8] transition-colors">
                          <label className="flex items-center gap-1.5 text-[0.65rem] font-extrabold tracking-widest uppercase text-gray-400 mb-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-red-500 shrink-0 mt-px"></span>Preferred Currency
                          </label>
                          <div className="sel-wrap">
                            <select 
                             className="inp"
                             {...register("preferred_currency.currency_code")}
                             onChange={onCurrencyChange}
                             >
                              <option value="">select...</option>
                              {useMemo(() => currencies.map((code: CurrencyInterface) => (
                                <option key={code.currency_code} value={code.currency_code}>
                                    {code.currency_code} - {code.currency_name}
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
                    </div>

                    <div className="fade-up-3 bg-white border border-[#e2e6f0] rounded-2xl overflow-hidden shadow-sm">

                        <div className="flex items-center gap-3 px-6 py-4 bg-[#f8f9fc] border-b border-[#e2e6f0]">
                            <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center shrink-0">
                                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                </svg>
                            </div>
                            <h2 className="flex-1 text-[0.75rem] font-extrabold tracking-widest uppercase text-gray-600" style={{ fontFamily: 'Montserrat, system-ui' }}>
                                e-Invoice / MyInvois
                            </h2>
                            <span className="text-[0.68rem] text-gray-400 font-medium">LHDN MyInvois API credentials</span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">

                            {/* e-Invoice Enabled Toggle */}
                            <div className="px-6 py-5 border-r border-b border-[#e2e6f0] bg-white focus-within:bg-[#fffef8] transition-colors">
                                <label className="flex items-center gap-1.5 text-[0.65rem] font-extrabold tracking-widest uppercase text-gray-400 mb-3">
                                    e-Invoice Enabled
                                </label>
                                <label className="inline-flex items-center gap-3 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        {...register("einvoice_enabled")}
                                        className="w-4 h-4 rounded border-gray-300 text-[#0a0a0a] focus:ring-[#0a0a0a]"
                                    />
                                    <span className="text-[0.82rem] font-semibold text-gray-700" style={{ fontFamily: 'Montserrat, system-ui' }}>
                                        Enable LHDN e-Invoice submission
                                    </span>
                                </label>
                                <p className="text-[0.65rem] text-gray-400 mt-2 font-medium">
                                    Must be enabled before any document can be submitted to LHDN.
                                </p>
                            </div>

                            {/* Environment */}
                            <div className="px-6 py-5 border-r border-b border-[#e2e6f0] bg-white focus-within:bg-[#fffef8] transition-colors">
                                <label className="flex items-center gap-1.5 text-[0.65rem] font-extrabold tracking-widest uppercase text-gray-400 mb-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-red-500 shrink-0 mt-px" />
                                    Environment
                                </label>
                                <div className="sel-wrap">
                                    <select className="inp" {...register("einvoice_environment")}>
                                        {E_INVOICE_ENVIRONMENT_CHOICES.map(option => (
                                            <option key={option} value={option}>{option}</option>
                                        ))}
                                    </select>
                                </div>
                                <p className="text-[0.65rem] text-gray-400 mt-1.5 font-medium">
                                    Use Sandbox for testing. Switch to Production when ready to go live.
                                </p>
                            </div>

                            {/* SST Registration Number */}
                            <div className="px-6 py-5 border-b border-[#e2e6f0] bg-white focus-within:bg-[#fffef8] transition-colors">
                                <label className="flex items-center gap-1.5 text-[0.65rem] font-extrabold tracking-widest uppercase text-gray-400 mb-2">
                                    SST Registration No.
                                </label>
                                <input
                                    type="text"
                                    placeholder="e.g. W10-1808-32000001 or NA"
                                    className="inp"
                                    {...register("sst_registration_number")}
                                />
                                <p className="text-[0.65rem] text-gray-400 mt-1.5 font-medium">
                                    Enter 'NA' if not registered for SST.
                                </p>
                            </div>

                            {/* Tourism Tax Number */}
                            <div className="px-6 py-5 border-r border-b border-[#e2e6f0] bg-white focus-within:bg-[#fffef8] transition-colors">
                                <label className="flex items-center gap-1.5 text-[0.65rem] font-extrabold tracking-widest uppercase text-gray-400 mb-2">
                                    Tourism Tax No. (TTX)
                                </label>
                                <input
                                    type="text"
                                    placeholder="e.g. TTX-12345 or NA"
                                    className="inp"
                                    {...register("tourism_tax_number")}
                                />
                                <p className="text-[0.65rem] text-gray-400 mt-1.5 font-medium">
                                    Enter 'NA' if not applicable.
                                </p>
                            </div>

                            {/* Client ID */}
                            <div className="px-6 py-5 border-r border-b border-[#e2e6f0] bg-white focus-within:bg-[#fffef8] transition-colors">
                                <label className="flex items-center gap-1.5 text-[0.65rem] font-extrabold tracking-widest uppercase text-gray-400 mb-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-red-500 shrink-0 mt-px" />
                                    MyInvois Client ID
                                </label>
                                <input
                                    type="text"
                                    placeholder="Obtained from MyInvois Portal"
                                    className="inp"
                                    {...register("myinvois_client_id")}
                                />
                            </div>

                            {/* Client Secret 1 */}
                            <div className="px-6 py-5 border-b border-[#e2e6f0] bg-white focus-within:bg-[#fffef8] transition-colors">
                                <label className="flex items-center gap-1.5 text-[0.65rem] font-extrabold tracking-widest uppercase text-gray-400 mb-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-red-500 shrink-0 mt-px" />
                                    Client Secret 1
                                </label>
                                <input
                                    type="password"
                                    placeholder="••••••••••••"
                                    className="inp"
                                    {...register("myinvois_client_secret_1")}
                                />
                                <p className="text-[0.65rem] text-gray-400 mt-1.5 font-medium">
                                    Leave blank to keep existing secret.
                                </p>
                            </div>

                            {/* Client Secret 2 */}
                            <div className="px-6 py-5 border-r border-b border-[#e2e6f0] bg-white focus-within:bg-[#fffef8] transition-colors">
                                <label className="flex items-center gap-1.5 text-[0.65rem] font-extrabold tracking-widest uppercase text-gray-400 mb-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-red-500 shrink-0 mt-px" />
                                    Client Secret 2
                                </label>
                                <input
                                    type="password"
                                    placeholder="••••••••••••"
                                    className="inp"
                                    {...register("myinvois_client_secret_2")}
                                />
                                <p className="text-[0.65rem] text-gray-400 mt-1.5 font-medium">
                                    Backup secret — both expire simultaneously.
                                </p>
                            </div>

                            {/* Certificate Upload */}
                            <div className="px-6 py-5 border-r border-b border-[#e2e6f0] bg-white focus-within:bg-[#fffef8] transition-colors">
                                <label className="flex items-center gap-1.5 text-[0.65rem] font-extrabold tracking-widest uppercase text-gray-400 mb-2">
                                    Digital Certificate (.p12 / .pfx)
                                </label>
                                {typeof company.einvoice_certificate === 'string' && company.einvoice_certificate && (
                                    <div className="mb-2 flex items-center gap-1.5 text-[0.72rem] text-emerald-700 font-semibold">
                                        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                                        Certificate already uploaded
                                    </div>
                                )}
                                <input
                                    type="file"
                                    accept=".p12,.pfx"
                                    className="inp"
                                    onChange={e => {
                                        const file = e.target.files?.[0] || null;
                                        setValue('einvoice_certificate', file);
                                    }}
                                />
                                <p className="text-[0.65rem] text-gray-400 mt-1.5 font-medium">
                                    X.509 certificate from a Malaysia-approved CA. Leave blank to keep existing.
                                </p>
                            </div>

                            {/* Certificate Password */}
                            <div className="px-6 py-5 border-b border-[#e2e6f0] bg-white focus-within:bg-[#fffef8] transition-colors">
                                <label className="flex items-center gap-1.5 text-[0.65rem] font-extrabold tracking-widest uppercase text-gray-400 mb-2">
                                    Certificate Password
                                </label>
                                <input
                                    type="password"
                                    placeholder="••••••••••••"
                                    className="inp"
                                    {...register("einvoice_certificate_password")}
                                />
                                <p className="text-[0.65rem] text-gray-400 mt-1.5 font-medium">
                                    Password for the .p12/.pfx file. Leave blank to keep existing.
                                </p>
                            </div>

                        </div>
                    </div>

                    
                    
                    <div className="fade-up-3 bg-white border border-[#e2e6f0] rounded-2xl overflow-hidden shadow-sm">

                      <div className="flex items-center gap-3 px-6 py-4 bg-[#f8f9fc] border-b border-[#e2e6f0]">
                        <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center shrink-0">
                          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/></svg>
                        </div>
                        <h2 className="flex-1 text-[0.75rem] font-extrabold tracking-widest uppercase text-gray-600" style={{ fontFamily: 'Montserrat, system-ui' }}>
                            Banking Details
                        </h2>
                        <span className="text-[0.68rem] text-gray-400 font-medium">Payout &amp; remittance info</span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3">


                        <div className="px-6 py-5 border-r border-b border-[#e2e6f0] bg-white focus-within:bg-[#fffef8] transition-colors">
                          <label className="flex items-center gap-1.5 text-[0.65rem] font-extrabold tracking-widest uppercase text-gray-400 mb-2">
                            Bank Name
                            <span className="text-[0.6rem] font-normal text-gray-400 bg-gray-100 rounded px-1.5 py-px italic">nullable</span>
                          </label>
                          
                          <div className="sel-wrap">
                            <select 
                             className="inp"
                             {...register("company_bank_name")}
                             >
                              <option value="">select...</option>
                              {useMemo(() => banks.map((bank: BankInterface) => (
                                <option key={bank.bank_alias} value={bank.bank_alias}>
                                    {bank.bank_alias}
                                </option>
                              )), [banks])}
                            </select>
                          </div>

                        </div>


                        <div className="px-6 py-5 border-r border-b border-[#e2e6f0] bg-white focus-within:bg-[#fffef8] transition-colors">
                          <label className="flex items-center gap-1.5 text-[0.65rem] font-extrabold tracking-widest uppercase text-gray-400 mb-2">
                            Account Number
                            <span className="text-[0.6rem] font-normal text-gray-400 bg-gray-100 rounded px-1.5 py-px italic">nullable</span>
                          </label>
                          <input type="text" 
                            className="inp"
                            {...register("company_bank_account_number")}
                          />
                          <p className="text-[0.65rem] text-gray-400 mt-1.5 font-medium">Spaces allowed for readability</p>
                        </div>


                        <div className="px-6 py-5 border-b border-[#e2e6f0] bg-white focus-within:bg-[#fffef8] transition-colors">
                          <label className="flex items-center gap-1.5 text-[0.65rem] font-extrabold tracking-widest uppercase text-gray-400 mb-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-red-500 shrink-0 mt-px"></span>Account Type
                          </label>
                          <div className="sel-wrap">
                            <select {...register("bank_account_type")} className="inp">
                                <option value="">select...</option>
                                {useMemo(() => BANK_TYPE_CHOICES.map(option => (
                                    <option key={option} value={option}>
                                        {option}
                                    </option>
                                )), [BANK_TYPE_CHOICES])}
                            </select>
                          </div>
                        </div>

                      </div>
                    </div>

                    
                    
                    <div className="fade-up-4 bg-white border border-[#e2e6f0] rounded-2xl overflow-hidden shadow-sm">

                      <div className="flex items-center gap-3 px-6 py-4 bg-[#f8f9fc] border-b border-[#e2e6f0]">
                        <div className="w-8 h-8 rounded-lg bg-red-100 flex items-center justify-center shrink-0">
                          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#dc2626" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                        </div>
                        <h2 className="flex-1 text-[0.75rem] font-extrabold tracking-widest uppercase text-gray-600" style={{ fontFamily: 'Montserrat, system-ui' }}>
                            Status &amp; Subscription
                        </h2>
                        <span className="flex items-center gap-1 text-[0.68rem] text-gray-400 font-medium">
                          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                          Read-only
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">


                        <div className="px-6 py-5 border-r border-b border-[#e2e6f0] bg-[#fafbfd] hover:bg-[#f5f6fa] transition-colors">
                          <div className="flex items-center gap-2 text-[0.65rem] font-extrabold tracking-widest uppercase text-gray-400 mb-2">
                            Account Status
                            <svg className="ml-auto opacity-30" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                          </div>

                            <span className={`inline-flex items-center gap-1 text-[0.68rem] font-bold tracking-wide uppercase rounded-full px-2.5 py-0.5 ${company.is_active ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-600'}`}>
                                <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
                                {company.is_active ? 'Active' : 'Inactive'}
                            </span>
                        </div>


                        <div className="px-6 py-5 border-r border-b border-[#e2e6f0] bg-[#fafbfd] hover:bg-[#f5f6fa] transition-colors">
                          <div className="flex items-center gap-2 text-[0.65rem] font-extrabold tracking-widest uppercase text-gray-400 mb-2">
                            Payment Status
                            <svg className="ml-auto opacity-30" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                          </div>

                            <span className={`inline-flex items-center gap-1 text-[0.68rem] font-bold tracking-wide uppercase rounded-full px-2.5 py-0.5 ${company.is_paid ? 'bg-blue-100 text-blue-700' : 'bg-red-100 text-red-600'}`}>
                                <svg width="9" height="9" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                                {company.is_paid ? 'Paid' : 'Unpaid'}
                            </span>
                        </div>


                        <div className="px-6 py-5 border-r border-b border-[#e2e6f0] bg-[#fafbfd] hover:bg-[#f5f6fa] transition-colors">
                          <div className="flex items-center gap-2 text-[0.65rem] font-extrabold tracking-widest uppercase text-gray-400 mb-2">
                            Created At
                            <svg className="ml-auto opacity-30" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                          </div>
                          
                            <div className="text-[0.88rem] font-semibold text-gray-800">
                                {formatDate(company.created_at)}
                            </div>
                        </div>


                        <div className="px-6 py-5 border-r border-b border-[#e2e6f0] bg-[#fafbfd] hover:bg-[#f5f6fa] transition-colors">
                          <div className="flex items-center gap-2 text-[0.65rem] font-extrabold tracking-widest uppercase text-gray-400 mb-2">
                            Subscription Started
                            <svg className="ml-auto opacity-30" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                          </div>
                            <div className="text-[0.88rem] font-semibold text-gray-800">
                                {formatDate(company.subscription_started_at)}
                            </div>
                        </div>


                        <div className="px-6 py-5 border-r border-b border-[#e2e6f0] bg-[#fafbfd] hover:bg-[#f5f6fa] transition-colors">
                          <div className="flex items-center gap-2 text-[0.65rem] font-extrabold tracking-widest uppercase text-gray-400 mb-2">
                            Subscription Ends
                            <svg className="ml-auto opacity-30" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                          </div>
                            <div className="text-[0.88rem] text-gray-300 italic font-normal">
                                {formatDate(company.subscription_ends_at)}
                            </div>
                        </div>


                        <div className="px-6 py-5 border-r border-b border-[#e2e6f0] bg-[#fafbfd] hover:bg-[#f5f6fa] transition-colors">
                          <div className="flex items-center gap-2 text-[0.65rem] font-extrabold tracking-widest uppercase text-gray-400 mb-2">
                            Trial Started
                            <svg className="ml-auto opacity-30" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                            </div>
                                {formatDate(company.trial_started_at)}
                            </div>
                        </div>


                        <div className="px-6 py-5 border-b border-[#e2e6f0] bg-[#fafbfd] hover:bg-[#f5f6fa] transition-colors">
                          <div className="flex items-center gap-2 text-[0.65rem] font-extrabold tracking-widest uppercase text-gray-400 mb-2">
                            Trial Ends
                            <svg className="ml-auto opacity-30" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                          </div>
                            <div className="text-[0.88rem] text-gray-300 italic font-normal">
                                {formatDate(company.trial_ends_at)}
                            </div>
                        </div>

                    </div>

            
            
                    <div className="fade-up-5 bg-white border border-[#e2e6f0] rounded-2xl hover:cursor-pointer text-left overflow-hidden shadow-sm" style={{ fontFamily: 'Montserrat, system-ui' }}>

                        <div className="flex items-center gap-3 px-6 py-4 bg-[#f8f9fc] border-b border-[#e2e6f0]">
                            <div className="w-8 h-8 rounded-lg bg-violet-100 flex items-center justify-center shrink-0">
                            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#7c3aed" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                            </div>
                            <h2 className="text-[0.75rem] font-extrabold tracking-widest uppercase text-gray-600" style={{ fontFamily: 'Montserrat, system-ui' }}>
                            Users
                            </h2>
                            <span className="text-[0.72rem] text-gray-400 font-medium ml-1">{company?.user_set?.length} members</span>
                        </div>

                        {company.user_set && company.user_set?.length > 0 && (

                            <div className="overflow-x-auto">
                                <table className="w-full text-[0.82rem] border-collapse">
                                    <thead >
                                    <tr className="bg-[#f8f9fc]" >
                                        <th className="px-5 py-3 text-center text-[0.65rem] font-extrabold tracking-[0.09em] uppercase text-gray-400 border-b border-[#e2e6f0]" style={{ fontFamily: 'Montserrat, system-ui' }}>Name</th>
                                        <th className="px-5 py-3 text-center text-[0.65rem] font-extrabold tracking-[0.09em] uppercase text-gray-400 border-b border-[#e2e6f0]" style={{ fontFamily: 'Montserrat, system-ui' }}>Email</th>
                                        <th className="px-5 py-3 text-center text-[0.65rem] font-extrabold tracking-[0.09em] uppercase text-gray-400 border-b border-[#e2e6f0]" style={{ fontFamily: 'Montserrat, system-ui' }}>Role</th>
                                        <th className="px-5 py-3 text-center text-[0.65rem] font-extrabold tracking-[0.09em] uppercase text-gray-400 border-b border-[#e2e6f0]" style={{ fontFamily: 'Montserrat, system-ui' }}>Status</th>
                                        <th className="px-5 py-3 text-center text-[0.65rem] font-extrabold tracking-[0.09em] uppercase text-gray-400 border-b border-[#e2e6f0]" style={{ fontFamily: 'Montserrat, system-ui' }}>Date Joined</th>
                                        <th className="px-5 py-3 text-center text-[0.65rem] font-extrabold tracking-[0.09em] uppercase text-gray-400 border-b border-[#e2e6f0]" style={{ fontFamily: 'Montserrat, system-ui' }}>Last Login</th>
                                    </tr>
                                    </thead>
                                    
                                    <tbody>
                                    {company.user_set?.map((line, index) => (

                                        <tr key={index} className="border-b border-[#e2e6f0] hover:bg-[#f8f9fc] transition-colors text-center">

                                        <td className="px-4! py-4! font-medium text-gray-800 whitespace-nowrap">
                                            {line.name || '--'}
                                        </td>

                                        <td className="px-5 py-3 text-gray-500 text-[0.8rem]">
                                            {line.email}
                                        </td>

                                        <td className="px-5 py-3">
                                            <span className="bg-gray-100 text-gray-600 text-[0.65rem] font-bold tracking-wider uppercase rounded px-2 py-0.5">
                                            {line.role}
                                            </span>
                                        </td>

                                        <td className="px-5 py-3">
                                            <span className={`inline-flex items-center gap-1 text-[0.65rem] font-bold tracking-wide uppercase rounded-full px-2 py-0.5 ${line.is_active ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-600'}`}>
                                            <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
                                            {line.is_active ? 'Active' : 'Inactive'}
                                            </span>
                                        </td>

                                        <td className="px-5 py-3 text-gray-400 text-[0.78rem]">
                                            {formatDate(line.date_joined)}
                                        </td>
                                        <td className="px-5 py-3 text-gray-400 text-[0.78rem]">
                                            {formatUpdatedDate(line.last_login)}
                                        </td>
                                        </tr>

                                    ))}

                                    </tbody>
                                </table>
                            </div> 
                        )}
                    </div>

                    
                    
                    <div className="fade-up-6 bg-white border border-[#e2e6f0] border-l-[5px] border-l-[#0a0a0a] rounded-2xl px-6 py-5 shadow-sm flex items-center justify-between gap-4 flex-wrap">

                        <div>
                            <p className="text-[0.72rem] text-gray-400 font-medium" style={{ fontFamily: 'Montserrat, system-ui' }}>Changes will take effect immediately after saving.</p>
                        </div>

                        <div className="flex gap-2 items-center">
                            <button
                            className="inline-flex items-center gap-2 bg-white text-gray-500 text-[0.75rem] font-bold tracking-widest uppercase px-5 py-2.5 rounded-lg border border-[#e2e6f0] hover:border-gray-400 hover:text-gray-800 hover:-translate-y-px active:translate-y-0 transition-all cursor-pointer"
                            onClick={onCancel}
                            style={{ fontFamily: 'Montserrat, system-ui' }}
                            >
                            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                            Discard
                            </button>

                            <button
                            className="inline-flex items-center gap-2 bg-emerald-600 text-white text-[0.75rem] font-bold tracking-widest uppercase px-5 py-2.5 rounded-lg shadow-sm hover:bg-emerald-700 hover:-translate-y-px active:translate-y-0 transition-all cursor-pointer border-0"
                            type="submit"
                            disabled={isSubmitting}
                            style={{ fontFamily: 'Montserrat, system-ui' }}
                            >
                            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>

                                {isSubmitting ? (
                                    <span>Updating company profile...</span>
                                ) : (
                                    'Save Changes'
                                )}
                            </button>
                        </div>
                    </div>
                   
                    </div>
                </div>
            </form>
        </div>
    );

};
export default CompanyProfileEdit;

