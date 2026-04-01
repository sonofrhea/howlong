import CashFlowChart from "../FullStack/Charts/CashFLowChart";
import { Link, useLocation } from "react-router-dom";

import { LogoutButton } from '../Authentication/HandleLogout';
import { CornerDownLeft, MoveRight } from "lucide-react";
import { ComingSoon } from "../App";


function MainPage() {

    return(
        <div className="bg-gray-100">
            <title>Main | Urusentra · ERP for Small & Medium Enterprises</title>
            <meta name="main" content="Urusentra main page – modern ERP for SMEs" />

            <style>
                {`
                    @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;600;700;800;900&display=swap');
                   
                `}
            </style>

            <div className="flex bg-white" style={{ fontFamily: 'Montserrat, system-ui' }}>
                <div className="fixed top-4 left-4 z-50">
                    <LogoutButton />
                </div>
                <Link 
                    to="/customers"
                    className="fixed top-4 right-4 z-50 group flex items-center gap-3 px-3 py-1 bg-white border border-gray-200 rounded-2xl text-sm font-semibold text-gray-600 shadow-sm transition-all duration-300 hover:text-blue-600 hover:shadow-md hover:-translate-y-0.5"
                    style={{ fontFamily: 'Montserrat, system-ui' }}
                >
                    
                    <span>Modules</span>

                    <MoveRight size={16} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                </Link>
            </div>

            <CashFlowChart />
            
            {/* <div className="w-full max-w-7xl mx-auto px-4 md:px-8 pb-24">
                <WhatDoYouNeed />
            </div> */}

            <div className="flex bg-gray-100">
                <Link 
                    to="#"
                    className="fixed bottom-4 left-4 z-50 group flex items-center gap-3 px-3 py-1 bg-white border border-gray-200 rounded-2xl text-sm font-semibold text-gray-600 shadow-sm transition-all duration-300 hover:text-gray-900 hover:shadow-md hover:-translate-y-0.5"
                >

                    <div className="cursor-not-allowed opacity-50 ">
                        
                        <span style={{ fontFamily: 'Montserrat, system-ui' }}>⟵ Connect with suppliers</span>
                    </div>
                </Link>
            </div>
        </div>
    );
}
export default MainPage;