import { CompanyProfileDetailsProps } from "../constants/Types";
import { useNavigate } from 'react-router-dom';


const formatDate = (dateString?: string | null) => {
    if (!dateString) return '--';
    return new Date(dateString).toISOString().split("T")[0];
};

const formatUpdatedDate = (dateString: string) => {
  if (!dateString) return '--';
  return new Date(dateString).toLocaleString();
};






const CompanyProfileDetails: React.FC<CompanyProfileDetailsProps> = ({
    company,
    isLoading,
    onEdit,
    onTestCredentials,
    isTestingCredentials
}) => {
    const navigate = useNavigate();


    if (isLoading) {
        return (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                <p className="mt-3 text-gray-600">fetching company profile...</p>
            </div>
        );
    }


    if (!company) {
        return (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
                <svg className="w-12 h-12 text-red-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
                <h2 className="text-xl font-semibold text-gray-800 mb-2">Company Not Found</h2>
                <p className="text-gray-600 mb-4">Unable to load company profile.</p>
                <button 
                    onClick={() => navigate("/core")}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                    Back to Dashboard
                </button>
            </div>
        );
    }




    return (
      <div className="min-w-full">

        <style>
          {`
            @import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700;800;900&display=swap");

            @keyframes fadeUp {
              from { opacity: 0; transform: translateY(14px); }
              to   { opacity: 1; transform: translateY(0); }
            }
            .fade-up { animation: fadeUp .35s ease both; }
            .fade-up-1 { animation: fadeUp .35s ease .05s both; }
            .fade-up-2 { animation: fadeUp .35s ease .10s both; }
            .fade-up-3 { animation: fadeUp .35s ease .15s both; }
            .fade-up-4 { animation: fadeUp .35s ease .20s both; }
            .fade-up-5 { animation: fadeUp .35s ease .25s both; }
            em { font-style: normal; border-bottom: 3.5px solid #f59e0b; padding-bottom: 1px; }
            
          `}
        </style>

          
          


        <div className="bg-[#f0f2f7] min-w-full font-sans text-gray-900 min-h-screen px-4 py-8 pb-16" style={{ fontFamily: 'Montserrat, system-ui' }}>


          <div className="max-w-4xl mx-auto mb-9 flex items-end justify-between gap-4 flex-wrap">

            <div style={{ fontFamily: 'Montserrat, system-ui' }}>
              <h1 className="text-3xl font-black tracking-tighter leading-none text-[#0a0a0a]" style={{ fontFamily: 'Montserrat, system-ui' }}>
                Company Profile
              </h1>
              <p className="text-[0.7rem] text-gray-400 mt-2 font-semibold tracking-widest uppercase" style={{ fontFamily: 'Montserrat, system-ui' }}>
                Organisation overview &amp; settings
              </p>
            </div>

            <div className="flex gap-2 items-center flex-wrap">

              <button onClick={onEdit}
                className="inline-flex items-center gap-2 bg-[#0a0a0a] text-white text-[0.75rem] font-bold tracking-widest uppercase px-5 py-2.5 rounded-lg shadow-sm hover:bg-white hover:text-black hover:-translate-y-px active:translate-y-0 transition-all cursor-pointer border-0">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                Edit Company
              </button>

            </div>
          </div>


          
          <div className="max-w-4xl mx-auto flex flex-col gap-6">

            <div className="fade-up bg-white border border-[#e2e6f0] border-l-[5px] border-l-[#0a0a0a] rounded-2xl p-7 shadow-sm flex items-center gap-5 flex-wrap relative overflow-hidden">

              <div className="absolute top-0 right-0 h-full w-44 pointer-events-none"
                style={{ background: 'repeating-linear-gradient(-45deg,transparent,transparent 6px,rgba(0,0,0,.025) 6px,rgba(0,0,0,.025) 7px)' }}>
              </div>

              <div className="w-24 h-20 rounded-2xl flex items-center justify-content-center shadow-md">
                <img
                  src={company.company_logo}
                  alt="company_logo"
                  className="w-24 h-20 rounded-2xl flex items-center justify-content-center shadow-md"
              />
              </div>

              <div className="flex-1 min-w-40 relative z-10">
                <div id="heroName" className="text-xl font-extrabold tracking-tight text-[#0a0a0a] leading-tight mb-1 text-left">
                  {company.name || '--'}
                </div>

                <div id="heroReg" className="text-[0.72rem] text-gray-400 font-semibold tracking-wider uppercase mb-3 text-left">
                  Reg No: {company.registration_number || '--'} · Industry: {company.industry_code || '--'}
                </div>

                <div className="flex gap-2 flex-wrap">

                  <span className={`inline-flex items-center gap-1 text-[0.68rem] font-bold tracking-wide uppercase rounded-full px-2.5 py-0.5 ${company.is_active ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-600'}`}>
                    <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
                    {company.is_active ? 'Active' : 'Inactive'}
                  </span>

                  <span className={`inline-flex items-center gap-1 text-[0.68rem] font-bold tracking-wide uppercase rounded-full px-2.5 py-0.5 ${company.is_paid ? 'bg-blue-100 text-blue-700' : 'bg-red-100 text-red-600'}`}>
                    <svg width="9" height="9" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                    {company.is_paid ? 'Paid' : 'Unpaid'}
                  </span>
                  
                </div>
              </div>
            </div>

            
            
            <div className="fade-up-1 bg-white border border-[#e2e6f0] rounded-2xl overflow-hidden shadow-sm text-left hover:cursor-pointer">

              <div className="flex items-center gap-3 px-6 py-4 bg-[#f8f9fc] border-b border-[#e2e6f0]">
                <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center shrink-0">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>
                </div>
                <h2 className="text-[0.75rem] font-extrabold tracking-widest uppercase text-gray-600" style={{ fontFamily: 'Montserrat, system-ui' }}>
                  Basic Information
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">


                <div className="px-6 py-5 border-r border-b border-[#e2e6f0] hover:bg-[#f8f9fc] transition-colors col-span-full sm:col-span-2 lg:col-span-2">

                  <div className="text-[0.65rem] font-extrabold tracking-widest uppercase text-gray-400 mb-1.5">Company Name</div>
                  <div id="disp_name" className="disp text-[0.88rem] font-semibold text-gray-800 leading-snug">
                    {company.name || '--'}
                  </div>
                </div>


                <div className="px-6 py-5 border-r border-b border-[#e2e6f0] hover:bg-[#f8f9fc] transition-colors hover:cursor-pointer">

                  <div className="text-[0.65rem] font-extrabold tracking-widest uppercase text-gray-400 mb-1.5">Registration Number</div>
                  <div id="disp_reg" className="disp text-[0.88rem] font-semibold text-gray-800">
                    {company.registration_number || '--'}
                  </div>

                </div>


                <div className="px-6 py-5 border-r border-b border-[#e2e6f0] hover:bg-[#f8f9fc] transition-colors hover:cursor-pointer">
                  <div className="text-[0.65rem] font-extrabold tracking-widest uppercase text-gray-400 mb-1.5">Industry Code</div>
                  <div id="disp_industry" className="disp text-[0.88rem] font-semibold text-gray-800">
                    {company.industry_code || '--'} - {company.industry_description || '--'} - {company.msic_category_reference || '--'}
                  </div>
                </div>


                <div className="px-6 py-5 border-r border-b border-[#e2e6f0] hover:bg-[#f8f9fc] transition-colors hover:cursor-pointer">

                  <div className="text-[0.65rem] font-extrabold tracking-widest uppercase text-gray-400 mb-1.5">Email</div>
                  <div id="disp_email" className="disp text-[0.88rem] font-semibold text-gray-800">
                    {company.email || '--'}
                  </div>
                  
                </div>


                <div className="px-6 py-5 border-r border-b border-[#e2e6f0] hover:bg-[#f8f9fc] transition-colors">
                  <div className="text-[0.65rem] font-extrabold tracking-widest uppercase text-gray-400 mb-1.5">Mobile Number</div>
                  <div id="disp_mobile" className="disp text-[0.88rem] font-semibold text-gray-800">
                    {company.mobile_number || '--'}
                  </div>
                </div>


                <div className="px-6 py-5 border-b border-[#e2e6f0] hover:bg-[#f8f9fc] transition-colors col-span-full">
                  <div className="text-[0.65rem] font-extrabold tracking-widest uppercase text-gray-400 mb-1.5">Remark</div>
                  <div id="disp_remark" className="disp text-[0.88rem] font-semibold text-gray-800 leading-snug">
                    {company.remark || '--'}
                  </div>
                </div>

              </div>
            </div>

            
            
            <div className="fade-up-2 bg-white border border-[#e2e6f0] rounded-2xl hover:cursor-pointer text-left overflow-hidden shadow-sm" style={{ fontFamily: 'Montserrat, system-ui' }}>

              <div className="flex items-center gap-3 px-6 py-4 bg-[#f8f9fc] border-b border-[#e2e6f0]">
                <div className="w-8 h-8 rounded-lg bg-violet-100 flex items-center justify-center shrink-0">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#7c3aed" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                </div>
                <h2 className="text-[0.75rem] font-extrabold tracking-widest uppercase text-gray-600" style={{ fontFamily: 'Montserrat, system-ui' }}>Address</h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">


                <div className="px-6 py-5 border-r border-b border-[#e2e6f0] hover:bg-[#f8f9fc] transition-colors col-span-full">

                  <div className="text-[0.65rem] font-extrabold tracking-widest uppercase text-gray-400 mb-1.5">Street Address</div>
                  <div id="disp_address" className="disp text-[0.88rem] font-semibold text-gray-800">
                    {company.address || '--'}
                  </div>

                </div>


                <div className="px-6 py-5 border-r border-b border-[#e2e6f0] hover:bg-[#f8f9fc] transition-colors">
                  <div className="text-[0.65rem] font-extrabold tracking-widest uppercase text-gray-400 mb-1.5">City</div>
                  <div id="disp_city" className="disp text-[0.88rem] font-semibold text-gray-800">
                    {company.city || '--'}
                  </div>
                </div>


                <div className="px-6 py-5 border-r border-b border-[#e2e6f0] hover:bg-[#f8f9fc] transition-colors">
                  <div className="text-[0.65rem] font-extrabold tracking-widest uppercase text-gray-400 mb-1.5">State</div>
                  <div id="disp_state" className="disp text-[0.88rem] font-semibold text-gray-800">
                    {company.state || '--'}
                  </div>
                </div>


                <div className="px-6 py-5 border-r border-b border-[#e2e6f0] hover:bg-[#f8f9fc] transition-colors">
                  <div className="text-[0.65rem] font-extrabold tracking-widest uppercase text-gray-400 mb-1.5">Post Code</div>
                  <div id="disp_postcode" className="disp text-[0.88rem] font-semibold text-gray-800">
                    {company.post_code || '--'}
                  </div>
                </div>


                <div className="px-6 py-5 border-b border-[#e2e6f0] hover:bg-[#f8f9fc] transition-colors">
                  <div className="text-[0.65rem] font-extrabold tracking-widest uppercase text-gray-400 mb-1.5">Country</div>
                  <div id="disp_country" className="disp text-[0.88rem] font-semibold text-gray-800">
                    {company.country || '--'}
                  </div>
                </div>

              </div>
            </div>

            
            
            <div className="fade-up-2 bg-white border border-[#e2e6f0] rounded-2xl text-left overflow-hidden shadow-sm hover:cursor-pointer" style={{ fontFamily: 'Montserrat, system-ui' }}>
              <div className="flex items-center gap-3 px-6 py-4 bg-[#f8f9fc] border-b border-[#e2e6f0]">
                <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center shrink-0">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#d97706" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
                </div>
                <h2 className="text-[0.75rem] font-extrabold tracking-widest uppercase text-gray-600" style={{ fontFamily: 'Montserrat, system-ui' }}>Tax &amp; Currency</h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3">


                <div className="px-6 py-5 border-b border-[#e2e6f0] hover:bg-[#f8f9fc] transition-colors">
                  <div className="text-[0.65rem] font-extrabold tracking-widest uppercase text-gray-400 mb-1.5">E-invois environment</div>
                  <div id="disp_currency" className="disp text-[0.88rem] font-semibold text-gray-800">
                    {company.einvoice_environment || '--'}
                  </div>
                </div>


                <div className="px-6 py-5 border-r border-b border-[#e2e6f0] hover:bg-[#f8f9fc] transition-colors">
                  <div className="text-[0.65rem] font-extrabold tracking-widest uppercase text-gray-400 mb-1.5">TIN Number</div>
                  <div id="disp_tin" className="disp text-[0.88rem] font-semibold text-gray-800">
                    {company.tin_number || '--'}
                  </div>
                </div>


                <div className="px-6 py-5 border-r border-b border-[#e2e6f0] hover:bg-[#f8f9fc] transition-colors">
                  <div className="text-[0.65rem] font-extrabold tracking-widest uppercase text-gray-400 mb-1.5">Tax ID Type</div>
                  <div id="disp_taxtype" className="disp text-[0.88rem] font-semibold text-gray-800">
                    {company.tax_id_type || '--'}
                  </div>
                </div>


                <div className="px-6 py-5 border-b border-[#e2e6f0] hover:bg-[#f8f9fc] transition-colors">
                  <div className="text-[0.65rem] font-extrabold tracking-widest uppercase text-gray-400 mb-1.5">Preferred Currency</div>
                  <div id="disp_currency" className="disp text-[0.88rem] font-semibold text-gray-800">
                    {company.preferred_currency?.currency_code || '--'}
                  </div>
                </div>

              </div>
            </div>

            <div className="fade-up-3 bg-white border border-[#e2e6f0] rounded-2xl text-left overflow-hidden shadow-sm" style={{ fontFamily: 'Montserrat, system-ui' }}>

                {/* Section Header */}
                <div className="flex items-center gap-3 px-6 py-4 bg-[#f8f9fc] border-b border-[#e2e6f0]">
                    <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center shrink-0">
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
                            <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                    </div>
                    <h2 className="flex-1 text-[0.75rem] font-extrabold tracking-widest uppercase text-gray-600" style={{ fontFamily: 'Montserrat, system-ui' }}>
                        e-Invoice / MyInvois
                    </h2>
                    {/* Status badge */}
                    <span className={`inline-flex items-center gap-1 text-[0.68rem] font-bold tracking-wide uppercase rounded-full px-2.5 py-0.5 ${
                        company.einvoice_enabled
                            ? 'bg-emerald-100 text-emerald-700'
                            : 'bg-gray-100 text-gray-500'
                    }`}>
                        <span className="w-1.5 h-1.5 rounded-full bg-current" />
                        {company.einvoice_enabled ? 'Enabled' : 'Disabled'}
                    </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">

                    {/* Environment */}
                    <div className="px-6 py-5 border-r border-b border-[#e2e6f0] hover:bg-[#f8f9fc] transition-colors">
                        <div className="text-[0.65rem] font-extrabold tracking-widest uppercase text-gray-400 mb-1.5">Environment</div>
                        <span className={`inline-flex items-center gap-1 text-[0.68rem] font-bold tracking-wide uppercase rounded-full px-2.5 py-0.5 ${
                            company.einvoice_environment === 'Production'
                                ? 'bg-green-100 text-green-700'
                                : 'bg-yellow-100 text-yellow-700'
                        }`}>
                            {company.einvoice_environment || '--'}
                        </span>
                    </div>

                    {/* SST Registration Number */}
                    <div className="px-6 py-5 border-r border-b border-[#e2e6f0] hover:bg-[#f8f9fc] transition-colors">
                        <div className="text-[0.65rem] font-extrabold tracking-widest uppercase text-gray-400 mb-1.5">SST Registration No.</div>
                        <div className="text-[0.88rem] font-semibold text-gray-800">
                            {company.sst_registration_number || 'NA'}
                        </div>
                    </div>

                    {/* Tourism Tax Number */}
                    <div className="px-6 py-5 border-b border-[#e2e6f0] hover:bg-[#f8f9fc] transition-colors">
                        <div className="text-[0.65rem] font-extrabold tracking-widest uppercase text-gray-400 mb-1.5">Tourism Tax No. (TTX)</div>
                        <div className="text-[0.88rem] font-semibold text-gray-800">
                            {company.tourism_tax_number || 'NA'}
                        </div>
                    </div>

                    {/* Client ID */}
                    <div className="px-6 py-5 border-r border-b border-[#e2e6f0] hover:bg-[#f8f9fc] transition-colors">
                        <div className="text-[0.65rem] font-extrabold tracking-widest uppercase text-gray-400 mb-1.5">MyInvois Client ID</div>
                        <div className="text-[0.88rem] font-semibold text-gray-800 font-mono">
                            {company.myinvois_client_id
                                ? `${company.myinvois_client_id.substring(0, 8)}••••••••`
                                : '--'
                            }
                        </div>
                    </div>

                    {/* Certificate */}
                    <div className="px-6 py-5 border-r border-b border-[#e2e6f0] hover:bg-[#f8f9fc] transition-colors">
                        <div className="text-[0.65rem] font-extrabold tracking-widest uppercase text-gray-400 mb-1.5">Digital Certificate</div>
                        <div className="text-[0.88rem] font-semibold text-gray-800">
                            {company.einvoice_certificate
                                ? <span className="inline-flex items-center gap-1 text-emerald-700 text-[0.78rem]">
                                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                                    Certificate uploaded
                                  </span>
                                : <span className="text-gray-400 text-[0.78rem] italic">No certificate uploaded</span>
                            }
                        </div>
                    </div>

                    {/* Test Credentials Button */}
                    <div className="px-6 py-5 border-b border-[#e2e6f0] hover:bg-[#f8f9fc] transition-colors flex items-end">
                        <button
                            onClick={onTestCredentials}
                            disabled={isTestingCredentials || !company.myinvois_client_id || !company.einvoice_enabled}
                            className="inline-flex items-center gap-2 bg-[#0a0a0a] text-white text-[0.72rem] font-bold tracking-widest uppercase px-4 py-2 rounded-lg shadow-sm hover:bg-white hover:text-black hover:border-[#0a0a0a] border border-transparent hover:border hover:-translate-y-px active:translate-y-0 transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                            style={{ fontFamily: 'Montserrat, system-ui' }}
                        >
                            {isTestingCredentials ? (
                                <>
                                    <svg className="w-3.5 h-3.5 animate-spin" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                    </svg>
                                    Testing...
                                </>
                            ) : (
                                <>
                                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                    </svg>
                                    Test Credentials
                                </>
                            )}
                        </button>
                    </div>

                </div>
            </div>

            
            
            <div className="fade-up-3 bg-white border border-[#e2e6f0] rounded-2xl text-left overflow-hidden shadow-sm" style={{ fontFamily: 'Montserrat, system-ui' }}>

              <div className="flex items-center gap-3 px-6 py-4 bg-[#f8f9fc] border-b border-[#e2e6f0]">

                <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center shrink-0">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/></svg>
                </div>
                <h2 className="text-[0.75rem] font-extrabold tracking-widest uppercase text-gray-600" style={{ fontFamily: 'Montserrat, system-ui' }}>Banking Details</h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3">


                <div className="px-6 py-5 border-r border-b border-[#e2e6f0] hover:bg-[#f8f9fc] transition-colors hover:cursor-pointer">
                  <div className="text-[0.65rem] font-extrabold tracking-widest uppercase text-gray-400 mb-1.5">Bank Name</div>
                  <div id="disp_bank" className="disp text-[0.88rem] font-semibold text-gray-800">
                    {company.company_bank_name || '--'}
                  </div>
                </div>


                <div className="px-6 py-5 border-r border-b border-[#e2e6f0] hover:bg-[#f8f9fc] transition-colors hover:cursor-pointer">
                  <div className="text-[0.65rem] font-extrabold tracking-widest uppercase text-gray-400 mb-1.5">Account Number</div>
                  <div id="disp_bankaccount" className="disp text-[0.88rem] font-semibold text-gray-800">
                    {company.company_bank_account_number || '--'}
                  </div>
                </div>


                <div className="px-6 py-5 border-b border-[#e2e6f0] hover:bg-[#f8f9fc] transition-colors hover:cursor-pointer">
                  <div className="text-[0.65rem] font-extrabold tracking-widest uppercase text-gray-400 mb-1.5">Account Type</div>
                  <div id="disp_banktype" className="disp text-[0.88rem] font-semibold text-gray-800">
                    {company.bank_account_type || '--'}
                  </div>
                </div>
              </div>
            </div>

            
            
            <div className="fade-up-4 bg-white border border-[#e2e6f0] rounded-2xl overflow-hidden text-left shadow-sm" style={{ fontFamily: 'Montserrat, system-ui' }}>

              <div className="flex items-center gap-3 px-6 py-4 bg-[#f8f9fc] border-b border-[#e2e6f0]">
                <div className="w-8 h-8 rounded-lg bg-red-100 flex items-center justify-center shrink-0">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#dc2626" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                </div>
                <h2 className="text-[0.75rem] font-extrabold tracking-widest uppercase text-gray-600" style={{ fontFamily: 'Montserrat, system-ui' }}>Status &amp; Subscription</h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">


                <div className="px-6 py-5 border-r border-b border-[#e2e6f0] bg-[#fafbfd] hover:cursor-pointer">
                  <div className="text-[0.65rem] font-extrabold tracking-widest uppercase text-gray-400 mb-1.5">Account Status</div>

                  <span className={`inline-flex items-center gap-1 text-[0.68rem] font-bold tracking-wide uppercase rounded-full px-2.5 py-0.5 ${company.is_active ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-600'}`}>
                    <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
                    {company.is_active ? 'Active' : 'Inactive'}
                  </span>

                </div>


                <div className="px-6 py-5 border-r border-b border-[#e2e6f0] bg-[#fafbfd] hover:cursor-pointer">
                  <div className="text-[0.65rem] font-extrabold tracking-widest uppercase text-gray-400 mb-1.5">Payment Status</div>

                  <span className={`inline-flex items-center gap-1 text-[0.68rem] font-bold tracking-wide uppercase rounded-full px-2.5 py-0.5 ${company.is_paid ? 'bg-blue-100 text-blue-700' : 'bg-red-100 text-red-600'}`}>
                    <svg width="9" height="9" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                    {company.is_paid ? 'Paid' : 'Unpaid'}
                  </span>

                </div>


                <div className="px-6 py-5 border-r border-b border-[#e2e6f0] bg-[#fafbfd] hover:cursor-pointer">
                  <div className="text-[0.65rem] font-extrabold tracking-widest uppercase text-gray-400 mb-1.5">Created At</div>
                  <div className="text-[0.88rem] font-semibold text-gray-800">
                    {formatDate(company.created_at)}
                  </div>
                </div>


                <div className="px-6 py-5 border-r border-b border-[#e2e6f0] bg-[#fafbfd] hover:cursor-pointer">
                  <div className="text-[0.65rem] font-extrabold tracking-widest uppercase text-gray-400 mb-1.5">Subscription Started</div>
                  <div className="text-[0.88rem] font-semibold text-gray-800">
                    {formatDate(company.subscription_started_at)}
                  </div>
                </div>


                <div className="px-6 py-5 border-r border-b border-[#e2e6f0] bg-[#fafbfd] hover:cursor-pointer">
                  <div className="text-[0.65rem] font-extrabold tracking-widest uppercase text-gray-400 mb-1.5">Subscription Ends</div>
                  <div className="text-[0.88rem] text-gray-300 italic font-normal">
                    {formatDate(company.subscription_ends_at)}
                  </div>
                </div>


                <div className="px-6 py-5 border-r border-b border-[#e2e6f0] bg-[#fafbfd] hover:cursor-pointer">
                  <div className="text-[0.65rem] font-extrabold tracking-widest uppercase text-gray-400 mb-1.5">Trial Started</div>
                  <div className="text-[0.88rem] text-gray-300 italic font-normal">
                    {formatDate(company.trial_started_at)}
                  </div>
                </div>


                <div className="px-6 py-5 border-b border-[#e2e6f0] bg-[#fafbfd] hover:cursor-pointer">
                  <div className="text-[0.65rem] font-extrabold tracking-widest uppercase text-gray-400 mb-1.5">Trial Ends</div>
                  <div className="text-[0.88rem] text-gray-300 italic font-normal">
                    {formatDate(company.trial_ends_at)}
                  </div>
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
                    <thead>
                      <tr className="bg-[#f8f9fc]">
                        <th className="px-5 py-3 text-center text-[0.65rem] font-extrabold tracking-[0.09em] uppercase text-gray-400 border-b border-[#e2e6f0]">Name</th>
                        <th className="px-5 py-3 text-center text-[0.65rem] font-extrabold tracking-[0.09em] uppercase text-gray-400 border-b border-[#e2e6f0]">Email</th>
                        <th className="px-5 py-3 text-center text-[0.65rem] font-extrabold tracking-[0.09em] uppercase text-gray-400 border-b border-[#e2e6f0]">Role</th>
                        <th className="px-5 py-3 text-center text-[0.65rem] font-extrabold tracking-[0.09em] uppercase text-gray-400 border-b border-[#e2e6f0]">Status</th>
                        <th className="px-5 py-3 text-center text-[0.65rem] font-extrabold tracking-[0.09em] uppercase text-gray-400 border-b border-[#e2e6f0]">Date Joined</th>
                        <th className="px-5 py-3 text-center text-[0.65rem] font-extrabold tracking-[0.09em] uppercase text-gray-400 border-b border-[#e2e6f0]">Last Login</th>
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

          </div>

        </div>
      </div>
    );


};
export default CompanyProfileDetails;
