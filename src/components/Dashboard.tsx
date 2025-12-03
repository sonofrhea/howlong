import React from 'react';
import { Link } from 'react-router-dom';

import { DASHBOARD_APPS } from './constants/businessApps';

import { dashboardStyles } from './constants/classStyles';

import { BusinessAppInterface } from './constants/LayoutTypes';

import { APP_ICONS } from "./constants/appIcons";




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
                        Choose a module to get started
                    </p>
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
                                    'bg-green-100 text-blue-300 hover:text-blue-600' :
                                    'bg-gray-100 text-gray-400'}`}>
                                        <AppIcon appId={app.id} />
                                </div>

                                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                    {app.name}
                                </h3>
                                <p className="text-gray-600 text-sm mb-4">
                                    {app.description}
                                </p>

                                <div className={`text-sm font-medium ${
                                    app.available ? 
                                    'text-blue-600' : 
                                    'text-gray-500'}`}>
                                        {app.available ? 
                                        'Open App →' :
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
