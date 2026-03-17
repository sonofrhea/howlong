import React, { useMemo, useState } from "react";

import { useForm } from "react-hook-form";
import { UserProfileEditProps, UserProfileInputs } from "../constants/Types";

const formatDate = (dateString?: string | null) => {
    if (!dateString) return '--';
    return new Date(dateString).toISOString().split("T")[0];
};

const formatUpdatedDate = (dateString: string) => {
  if (!dateString) return '--';
  return new Date(dateString).toLocaleString();
};







const UserProfileEdit: React.FC<UserProfileEditProps> = ({
    userProfile,
    onSubmit,
    isSubmitting,
    onCancel
}) => {



    const { register, handleSubmit, watch, setValue, reset,
        control, formState: { errors } 
    } = useForm<UserProfileInputs>({
        defaultValues: userProfile
    });


    React.useEffect(() => {
        reset(userProfile);
    }, [userProfile, reset]);





    return(
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

                .inp {
                      width: 100%; background: #fff;
                      border: 1.5px solid #e2e6f0; border-radius: 8px;
                      color: #111827; font-family: 'Montserrat', sans-serif;
                      font-size: 0.86rem; font-weight: 600;
                      padding: 10px 12px; outline: none;
                      transition: border-color .15s, box-shadow .15s;
                      appearance: none; -webkit-appearance: none;
                    }
                
            `}
            </style>


            <div className="bg-[#f0f2f7] min-w-full font-sans text-gray-900 min-h-screen px-4 py-8 pb-16" style={{ fontFamily: 'Montserrat, system-ui' }}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="max-w-4xl mx-auto mb-9 flex items-end text-left justify-between gap-4 flex-wrap" style={{ fontFamily: 'Montserrat, system-ui' }}>
                    <div>
                        <h1 className="text-3xl font-black tracking-tighter leading-none text-[#0a0a0a]" style={{ fontFamily: 'Montserrat, system-ui' }}>Edit <em>Profile</em></h1>
                        </div>

                        <div className="flex gap-2 items-center flex-wrap">

                        </div>
                    </div>

                    <div className="max-w-4xl mx-auto flex flex-col gap-6">

                    
                    
                    <div className="fade-up-1 bg-white border border-[#e2e6f0] rounded-2xl overflow-hidden shadow-sm text-left" style={{ fontFamily: 'Montserrat, system-ui' }}>

                        <div className="flex items-center gap-3 px-6 py-4 bg-[#f8f9fc] border-b border-[#e2e6f0]">
                            <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center shrink-0">
                            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                            </div>
                            <h2 className="flex-1 text-[0.75rem] font-extrabold tracking-widest uppercase text-gray-600" style={{ fontFamily: 'Montserrat, system-ui' }}>Account Details</h2>
                            <span className="text-[0.68rem] text-gray-400 font-medium">Core identity fields</span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" style={{ fontFamily: 'Montserrat, system-ui' }}>


                            <div className="field-wrap px-6 py-5 border-r border-b border-[#e2e6f0] bg-yellow-50 focus-within:bg-[#fffef8] transition-colors" style={{ fontFamily: 'Montserrat, system-ui' }}>
                            <label className="flex items-center gap-1.5 text-[0.65rem] font-extrabold tracking-widest uppercase text-gray-400 mb-2">
                                Name
                            </label>
                            <input 
                                className="inp"
                                {...register("name")}
                            />
                            </div>


                            <div className="px-6 py-5 border-b border-[#e2e6f0] bg-[#fafbfd] hover:bg-[#f5f6fa] transition-colors">
                                <div className="text-[0.65rem] font-extrabold tracking-widest uppercase text-gray-400 mb-1.5">Email</div>
                                <div className="text-[0.88rem] font-semibold text-gray-800 break-all">
                                    {userProfile.email}
                                </div>
                            </div>


                            <div className="px-6 py-5 border-r border-b border-[#e2e6f0] bg-[#fafbfd] hover:bg-[#f5f6fa] transition-colors">
                            <div className="text-[0.65rem] font-extrabold tracking-widest uppercase text-gray-400 mb-1.5">Status</div>

                                <span className={`inline-flex items-center gap-1 text-[0.68rem] font-bold tracking-wide uppercase rounded-full px-2.5 py-0.5 ${userProfile.is_active ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-600'}`}>
                                    <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
                                    {userProfile.is_active ? 'Active' : 'Inactive'}
                                </span>
                            </div>


                            <div className="px-6 py-5 border-r border-b border-[#e2e6f0] bg-[#fafbfd] hover:bg-[#f5f6fa] transition-colors">
                            <div className="text-[0.65rem] font-extrabold tracking-widest uppercase text-gray-400 mb-1.5">Date Joined</div>
                            <div className="text-[0.88rem] font-semibold text-gray-800">
                                {formatDate(userProfile.date_joined)}
                            </div>
                            </div>


                            <div className="px-6 py-5 border-b border-[#e2e6f0] bg-[#fafbfd] hover:bg-[#f5f6fa] transition-colors">
                            <div className="text-[0.65rem] font-extrabold tracking-widest uppercase text-gray-400 mb-1.5">Last Login</div>
                            <div className="text-[0.88rem] font-semibold text-gray-800">
                                {formatUpdatedDate(userProfile.last_login) || '--'}
                            </div>
                            </div>

                        </div>
                    </div>

                    
                    
                    <div className="fade-up-2 bg-white border border-[#e2e6f0] rounded-2xl text-left overflow-hidden shadow-sm">

                    <div className="flex items-center gap-3 px-6 py-4 bg-[#f8f9fc] border-b border-[#e2e6f0]">
                        <div className="w-8 h-8 rounded-lg bg-violet-100 flex items-center justify-center shrink-0">
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#7c3aed" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                        </div>
                        <h2 className="flex-1 text-[0.75rem] font-extrabold tracking-widest uppercase text-gray-600" style={{ fontFamily: 'Montserrat, system-ui' }}>Role</h2>
                        <span className="text-[0.68rem] text-gray-400 font-medium">Permissions &amp; access level</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3">


                        <div className="px-6 py-5 border-r border-b border-[#e2e6f0] bg-[#fafbfd] hover:bg-[#f5f6fa] transition-colors">
                        <div className="text-[0.65rem] font-extrabold tracking-widest uppercase text-gray-400 mb-1.5">Role Name</div>
                        <div className="flex items-center gap-2">
                            <span className="bg-gray-100 text-gray-700 text-[0.72rem] font-bold tracking-widest uppercase rounded-lg px-2.5 py-1">
                                {userProfile.role.name}
                            </span>
                        </div>
                        </div>

                    </div>
                    </div>

                    
                    <div className="fade-up-3 bg-white border border-[#e2e6f0] rounded-2xl text-left overflow-hidden shadow-sm">

                    <div className="flex items-center gap-3 px-6 py-4 bg-[#f8f9fc] border-b border-[#e2e6f0]">
                        <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center shrink-0">
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#d97706" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>
                        </div>
                        <h2 className="flex-1 text-[0.75rem] font-extrabold tracking-widest uppercase text-gray-600" style={{ fontFamily: 'Montserrat, system-ui' }}>
                            Company
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">


                        <div className="px-6 py-5 border-r border-b border-[#e2e6f0] bg-[#fafbfd] hover:bg-[#f5f6fa] transition-colors sm:col-span-2">
                        <div className="text-[0.65rem] font-extrabold tracking-widest uppercase text-gray-400 mb-1.5">Company Name</div>
                        <div className="flex items-center gap-2.5">
                            <div className="w-7 h-7 rounded-lg bg-[#0a0a0a] flex items-center justify-center text-white text-[0.6rem] font-black shrink-0">AC</div>
                            <div className="text-[0.88rem] font-semibold text-gray-800">
                                {userProfile.company.name}
                            </div>
                        </div>
                        </div>


                        <div className="px-6 py-5 border-b border-[#e2e6f0] bg-[#fafbfd] hover:bg-[#f5f6fa] transition-colors">
                        <div className="text-[0.65rem] font-extrabold tracking-widest uppercase text-gray-400 mb-1.5">Registration No.</div>
                        <div className="text-[0.88rem] font-semibold text-gray-800">
                            {userProfile.company.registration_number || '--'}
                        </div>
                        </div>

                        {/* industry */}
                        <div className="px-6 py-5 border-r border-b border-[#e2e6f0] bg-[#fafbfd] hover:bg-[#f5f6fa] transition-colors">
                        <div className="text-[0.65rem] font-extrabold tracking-widest uppercase text-gray-400 mb-1.5">Industry Code</div>
                        <div className="text-[0.88rem] font-semibold text-gray-800">
                            {userProfile.company.industry_code || '--'}
                        </div>
                        </div>


                        <div className="px-6 py-5 border-r border-b border-[#e2e6f0] bg-[#fafbfd] hover:bg-[#f5f6fa] transition-colors">
                        <div className="text-[0.65rem] font-extrabold tracking-widest uppercase text-gray-400 mb-1.5">Country</div>
                        <div className="text-[0.88rem] font-semibold text-gray-800">
                            {userProfile.company.country}
                        </div>
                        </div>

                    </div>
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
                                    <span>Updating user profile...</span>
                                ) : (
                                    'Save Changes'
                                )}
                            </button>
                        </div>
                    </div>

                    </div>

                </form>
            </div>

        </div>
    );

};
export default UserProfileEdit;
