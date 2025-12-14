import { Link } from 'react-router-dom';

import { DASHBOARD_APPS } from './constants/businessApps';

import { dashboardStyles } from './constants/classStyles';

import { BusinessAppInterface } from './constants/LayoutTypes';

import { APP_ICONS } from "./constants/appIcons";


import { LogoutAllbutton } from '../Authentication/HandleLogout';





function Dashboard() {


    return(
        <div className={dashboardStyles.main}>
            <div className="max-w-6xl mx-auto">
                {/* header */}
                <div className="text-center mb-12">
                    <h1 className="text-3xl font-bold text-gray-900 mb-4">
                        Business Management
                    </h1>
                    <p className="text-gray-600">
                        Choose a module to get started...
                    </p>
                </div>
                <div className="fixed top-4 left-4 z-50">
                    <LogoutAllbutton />
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
                                    'bg-black text-white hover:text-blue-400' :
                                    'bg-gray-100 text-gray-400'}`}>
                                        <AppIcon appId={app.id} />
                                </div>

                                <h3 className="app-Name mb-2">
                                    {app.name}
                                </h3>
                                <p className="text-gray-600 text-s mb-4">
                                    {app.description}
                                </p>

                                <div className={`text-sm font-medium ${
                                    app.available ? 
                                    'text-blue-200 hover:text-blue-700' : 
                                    'text-gray-500'}`}>
                                        {app.available ? 
                                        'Open App ⟶' :
                                        'Coming soon'}
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
