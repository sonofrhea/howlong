import { useNavigate } from "react-router-dom";
import { UserProfileDetailsProps } from "../constants/Types";


const formatDate = (dateString?: string | null) => {
    if (!dateString) return '--';
    return new Date(dateString).toISOString().split("T")[0];
};


const formatUpdatedDate = (dateString: string) => {
  if (!dateString) return '--';
  return new Date(dateString).toLocaleString();
};









const UserProfileDetails: React.FC<UserProfileDetailsProps> = ({
    userProfile,
    isLoading,
    onEdit
}) => {
    const navigate = useNavigate();


    if (isLoading) {
        return (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                <p className="mt-3 text-gray-600">fetching user profile...</p>
            </div>
        );
    }


    if (!userProfile) {
        return (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
                <svg className="w-12 h-12 text-red-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
                <h2 className="text-xl font-semibold text-gray-800 mb-2">User Not Found</h2>
                <p className="text-gray-600 mb-4">Unable to load user profile.</p>
                <button 
                    onClick={() => navigate("/core")}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                    Back to Dashboard
                </button>
            </div>
        );
    }





    return(
        <div className="min-w-full">

            <style>
                {`
                    @import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700;800;900&display=swap");

                    @keyframes fadeUp {
                    from { opacity: 0; transform: translateY(14px); }
                    to   { opacity: 1; transform: translateY(0); }
                    }
                    .fade-up   { animation: fadeUp .35s ease both; }
                    .fade-up-1 { animation: fadeUp .35s ease .05s both; }
                    .fade-up-2 { animation: fadeUp .35s ease .10s both; }
                    .fade-up-3 { animation: fadeUp .35s ease .15s both; }
                    em { font-style: normal; border-bottom: 3.5px solid #f59e0b; padding-bottom: 1px; }
                `}
            </style>


            <div className="bg-[#f0f2f7] font-sans text-gray-900 min-h-screen px-4 py-8 pb-16" style={{ fontFamily: 'Montserrat, system-ui' }}>

                <div className="max-w-4xl mx-auto mb-9 flex items-end text-left justify-between gap-4 flex-wrap" style={{ fontFamily: 'Montserrat, system-ui' }}>
                    <div>
                    <h1 className="text-3xl font-black tracking-tighter leading-none text-[#0a0a0a]" style={{ fontFamily: 'Montserrat, system-ui' }}>User <em>Profile</em></h1>
                    <p className="text-[0.7rem] text-gray-400 mt-2 font-semibold tracking-widest uppercase" style={{ fontFamily: 'Montserrat, system-ui' }}>Account overview &amp; details</p>
                    </div>

                    <div className="flex gap-2 items-center flex-wrap">

                    <button onClick={onEdit}
                        className="inline-flex items-center gap-2 bg-[#0a0a0a] text-white text-[0.75rem] font-bold tracking-widest uppercase px-5 py-2.5 rounded-lg shadow-sm hover:bg-white hover:text-black hover:-translate-y-px active:translate-y-0 transition-all cursor-pointer border-0">
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                        Edit Profile
                    </button>

                    </div>
                </div>

                <div className="max-w-4xl mx-auto flex flex-col gap-6">

                
                
                <div className="fade-up bg-white border border-[#e2e6f0] border-l-[5px] border-l-[#0a0a0a] rounded-2xl p-7 shadow-sm flex items-center gap-6 flex-wrap relative overflow-hidden">

                  <div className="absolute top-0 right-0 h-full w-44 pointer-events-none"
                    style={{ background: 'repeating-linear-gradient(-45deg,transparent,transparent 6px,rgba(0,0,0,.025) 6px,rgba(0,0,0,.025) 7px)' }}></div>


                  

                  {/* info */}
                  <div className="flex-1 min-w-45 relative z-10 text-left">
                    <div className="flex items-center gap-3 flex-wrap mb-1">
                        <div className="text-xl font-extrabold tracking-tight text-[#0a0a0a] leading-tight">
                            {userProfile.name || 'Add your name'}
                        </div>

                        <span className={`inline-flex items-center gap-1 text-[0.68rem] font-bold tracking-wide uppercase rounded-full px-2.5 py-0.5 ${userProfile.is_active ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-600'}`}>
                            <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
                            {userProfile.is_active ? 'Active' : 'Inactive'}
                        </span>
                    </div>
                    <div className="text-[0.8rem] text-gray-400 font-medium mb-3">
                        {userProfile.email}
                    </div>


                    <div className="flex items-center gap-4 flex-wrap">

                      <span className="inline-flex items-center gap-1.5 bg-gray-100 text-gray-600 text-[0.68rem] font-bold tracking-widest uppercase rounded-lg px-2.5 py-1">
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                        {userProfile.role.name || '--'}
                      </span>
                    </div>
                  </div>


                  <div className="relative z-10 flex flex-col items-end gap-1 text-right shrink-0">
                    <div className="text-[0.65rem] font-extrabold tracking-widest uppercase text-gray-400 mb-0.5">Company</div>
                    <div className="flex items-center gap-2">
                      <span className="text-[0.85rem] font-bold text-gray-800">
                        {userProfile.company.name}
                      </span>
                    </div>
                    <div className="text-[0.7rem] text-gray-400 font-medium">
                        Reg No: {userProfile.company.registration_number || '--'}
                    </div>
                  </div>
                </div>

                
                
                <div className="fade-up-1 bg-white border border-[#e2e6f0] rounded-2xl overflow-hidden shadow-sm text-left" style={{ fontFamily: 'Montserrat, system-ui' }}>

                  <div className="flex items-center gap-3 px-6 py-4 bg-[#f8f9fc] border-b border-[#e2e6f0]">
                    <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center shrink-0">
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                    </div>
                    <h2 className="flex-1 text-[0.75rem] font-extrabold tracking-widest uppercase text-gray-600" style={{ fontFamily: 'Montserrat, system-ui' }}>Account Details</h2>
                    <span className="text-[0.68rem] text-gray-400 font-medium">Core identity fields</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">


                    <div className="px-6 py-5 border-r border-b border-[#e2e6f0] bg-[#fafbfd] hover:bg-[#f5f6fa] transition-colors">
                      <div className="text-[0.65rem] font-extrabold tracking-widest uppercase text-gray-400 mb-1.5">Name</div>
                      <div className="text-[0.88rem] font-semibold text-gray-800">
                        {userProfile.name || 'Add your name'}
                      </div>
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

              </div>

            </div>

        </div>
    );

};
export default UserProfileDetails;
