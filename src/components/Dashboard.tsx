import { Link } from 'react-router-dom';

import { DASHBOARD_APPS } from './constants/businessApps';

import { dashboardStyles } from './constants/classStyles';

import { BusinessAppInterface } from './constants/LayoutTypes';

import { APP_ICONS } from "./constants/appIcons";


import { LogoutButton } from '../Authentication/HandleLogout';
import { CornerDownLeft, MoveRight } from 'lucide-react';





function Dashboard() {


    return(
        <div className={dashboardStyles.main}>

            <style>
                {`
                    @import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700;800;900&display=swap");
                `}
            </style>

            <div className="max-w-6xl mx-auto">
                {/* header */}
                <div className="text-center mb-12">
                    <h1 className="text-3xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'Montserrat, system-ui' }}>
                        Business Management
                    </h1>
                    <p className="text-gray-600" style={{ fontFamily: 'Montserrat, system-ui' }}>
                        Choose a module to get started...
                    </p>
                </div>

                <div className="flex" style={{ fontFamily: 'Montserrat, system-ui' }}>
                    <div className="fixed top-4 left-4 z-50">
                        <LogoutButton />
                    </div>
                    
                    <Link
                        to="/mainpage"
                        className="fixed top-4 right-4 z-50 group flex items-center gap-3 px-3 py-1 bg-white border border-gray-200 rounded-2xl text-sm font-semibold text-gray-600 shadow-sm transition-all duration-300 hover:text-blue-600 hover:shadow-md hover:-translate-y-0.5"
                    >

                        <div className="p-2 bg-gray-50 rounded-lg group-hover:bg-blue-50 transition-colors duration-300">
                            <CornerDownLeft size={14} className="text-gray-400 group-hover:text-blue-500" />
                        </div>

                        <span>Back to Main Page...</span>
                    </Link>
                </div>

            

                <div className={dashboardStyles.gridStyle3}>
                    {DASHBOARD_APPS.map(app => (
                        <Link
                            key={app.id}
                            to={app.available ? app.path : '#'}
                            className={`${dashboardStyles.availability}
                                ${app.available ? dashboardStyles.yes : dashboardStyles.no}`}
                            >
                                <div 
                                className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${
                                    app.available ? 
                                    ' bg-green-50 text-[#088F03]' :
                                    'bg-gray-100 text-gray-400'}`}>
                                        <AppIcon appId={app.id} />
                                </div>

                                <h3 className="app-Name mb-2 font-[Montserrat]!" style={{ fontFamily: 'Montserrat, system-ui' }}>
                                    {app.name}
                                </h3>
                                <p className="text-gray-600 text-s mb-4" style={{ fontFamily: 'Montserrat, system-ui' }}>
                                    {app.description}
                                </p>

                                <div className={`text-xs ${
                                    app.available ? 
                                    'text-black hover:text-blue-700' : 
                                    'text-gray-500'}`}>
                                        {app.available ? 
                                        '➤' :
                                        '↺'}
                                </div>
                        </Link>
                    ))}
                </div>
            </div>
            
        </div>
    );
}

const AppIcon = ({ appId }: {appId: keyof typeof APP_ICONS} ) => {

    return APP_ICONS[appId] || null;
}

export default Dashboard;
