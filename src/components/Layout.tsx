import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

import { BusinessAppInterface, LayoutPropsInterface } from "./constants/LayoutTypes";

import { BUSINESS_APPS } from "./constants/businessApps";

import { APP_ICONS } from "./constants/appIcons";

import { HomeIcon } from "@heroicons/react/16/solid";

import {  LayoutGrid,
    X,
    CornerDownLeft
 } from "lucide-react";

import { sideBarStyles, textStyles } from "./constants/classStyles";


import { LogoutButton } from "../Authentication/HandleLogout";











function Layout({ children }: LayoutPropsInterface) {

    const location = useLocation();
    const [showAppsMenu, setShowAppsMenu] = useState<boolean>(false);
    const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);

    const currentApp = BUSINESS_APPS.find(app => app.path === location.pathname);

    const AppIcon = ({ appId }: {appId: keyof typeof APP_ICONS} ) => {
        return APP_ICONS[appId] || null;
    };

    return(
        <div className={sideBarStyles.background}>
            <div 
            className={`${sideBarStyles.expansion} ${sidebarOpen ? sideBarStyles.open : sideBarStyles.closed}`}
            onClick={() => setSidebarOpen(true)}
            onMouseLeave={() => setSidebarOpen(false)}
            >
                <div className={sideBarStyles.menu}>
                    <div className={sideBarStyles.menu2}>
                        <span className="text-white font-bold text-sm">BS</span>
                    </div>
                    {sidebarOpen && (
                        <div className="ml-3">
                            <div className={textStyles.semiBoldGray}>Business</div>
                            <div className="text-xs text-gray-500">Suite</div>
                        </div>
                    )}
                </div>

                <div className="py-4 overflow-y-auto h-[calc(100vh-5rem)]">
                    <Link
                        to="/dashboard"
                        className={`${sideBarStyles.dashboardLink}
                            ${location.pathname === '/dashboard' ? sideBarStyles.transition.open : 
                                sideBarStyles.transition.closed} transition-all duration-200`}
                        onClick={(e) => sidebarOpen ? null : e.preventDefault()}
                        >
                            <div className={sideBarStyles.justify}>
                                <HomeIcon />
                            </div>
                            {sidebarOpen && (
                                <span className={sideBarStyles.expandedFont}>
                                    Dashboard
                                </span>
                            )}
                    </Link>

                    {currentApp && (
                        <div className={sideBarStyles.current}>
                            <div className={sideBarStyles.justify}>
                                <AppIcon appId={currentApp.id} />
                            </div>
                            {sidebarOpen && (
                                <span className="ml-4 text-sm font-semibold whitespace-nowrap">
                                    {currentApp.name}
                                </span>
                            )}
                        </div>
                    )}

                    {sidebarOpen && (
                        <div className="px-6 py-2">
                            <div className={sideBarStyles.expanded.open}>
                                Applications
                            </div>
                        </div>
                    )}


                    {BUSINESS_APPS.filter(app => app.path !== location.pathname).map(app => (
                        <Link 
                            key={app.id}
                            to={app.available ? app.path : '#'}
                            className={`${sideBarStyles.availability.duration} 
                            ${app.available ? 
                                sideBarStyles.availability.yes :
                                sideBarStyles.availability.no
                             }`}
                            title={!sidebarOpen ? (app.available ?
                                 `Go to ${app.name}` : 'Update...') : ''}
                            onClick={(e) => {
                                if (!sidebarOpen) {
                                    e.preventDefault();
                                    setSidebarOpen(true);
                                }
                            }}
                        >
                            <div className={sideBarStyles.justify}>
                                <AppIcon appId={app.id} />
                            </div>
                            {sidebarOpen && (
                                <span className={sideBarStyles.expandedFont}>
                                    {app.name}
                                    {!app.available && (
                                        <span className="ml-2 text-xs text-gray-400">
                                            (Update...)
                                        </span>
                                    )}
                                </span>
                            )}
                        </Link>
                    ))}
                </div>

                <div className="absolute bottom-4 left-0 right-0 px-6">

                        {/* hide the ugly little grid shit */}
                    {sidebarOpen ? (
                        <>  
                            <div className={textStyles.smallGrayMb2}>
                                <LogoutButton />
                            </div>
                            <button
                                onClick={() => setShowAppsMenu(!showAppsMenu)}
                                className={sideBarStyles.availability.fullDuration}
                            >
                                <div className={sideBarStyles.justify}>
                                    <LayoutGrid />
                                </div>
                                <span className="ml-4 text-sm font-medium">All Apps</span>
                            </button>
                        </>
                    ) : null}  {/*  */}
                </div>
            </div>

            <div className={`transition-all duration-300 ml-${sidebarOpen ? '64' : '16'}`}>
                {currentApp && (
                    <div className={sideBarStyles.backdrop}>
                        <div className="flex items-center gap-4">
                            <div className={sideBarStyles.sidebarBackground}>
                                <AppIcon appId={currentApp.id} />
                            </div>
                            <div>
                                <h1 className={textStyles.lightFont}>
                                    {currentApp.name}
                                </h1>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <Link 
                                to="/dashboard"
                                className="fixed top-4 right-4 z-50 group flex items-center gap-3 px-3 py-1 bg-white border border-gray-200 rounded-2xl text-sm font-semibold text-gray-600 shadow-sm transition-all duration-300 hover:text-blue-600 hover:shadow-md hover:-translate-y-0.5"
                            >
                                <CornerDownLeft />
                                Back to Main Dashboard
                            </Link>
                        </div>
                    </div>
                )}

                <div className="flex-1">
                    {children}
                </div>
            </div>

            {showAppsMenu && (
                <div className="fixed inset-0 z-50 bg-black/30 flex items-start justify-center pt-20">
                    <div className="w-full max-w-2xl bg-white rounded-xl shadow-xl overflow-hidden">

                    {/* HEADER */}
                    <div className="px-6 py-4 border-b border-gray-200">
                        <div className="flex items-center justify-between">
                        <div>
                            <h2 className="text-base font-semibold text-gray-900">
                            All Applications
                            </h2>
                            <p className="text-sm text-gray-500">
                            Navigate between business tools
                            </p>
                        </div>

                        <button
                            onClick={() => setShowAppsMenu(false)}
                            aria-label="Close"
                            className="p-1.5 rounded-md text-gray-400 hover:text-gray-700 hover:bg-gray-100"
                        >
                            <X className="w-5 h-5 cursor-pointer" />
                        </button>
                        </div>
                    </div>

                    {/* GRID */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4">
                        {BUSINESS_APPS.map(app => (
                        <Link
                            key={app.id}
                            to={app.available ? app.path : "#"}
                            onClick={() => setShowAppsMenu(false)}
                            className={`
                            flex items-center
                            px-4 py-3
                            rounded-lg
                            border
                            transition
                            ${
                                app.available
                                ? "bg-white border-gray-200 hover:bg-gray-50 hover:border-green-300"
                                : "bg-white border-gray-200 opacity-50 cursor-not-allowed"
                            }
                            ${
                                app.path === location.pathname
                                ? "border-gray-400"
                                : ""
                            }
                            `}
                        >
                            {/* ICON */}
                            <div
                            className={`
                                flex items-center justify-center
                                w-10 h-10
                                rounded-md
                                ${app.available ? "bg-gray-100" : "bg-gray-200"}
                            `}
                            >
                            <AppIcon appId={app.id} />
                            </div>

                            {/* TEXT */}
                            <div className="ml-3">
                            <div className="text-sm font-medium text-gray-900 leading-tight">
                                {app.name}
                            </div>
                            <div className="text-xs text-gray-400 hover:text-green-500">
                                {app.available ? "Available" : "Update..."}
                            </div>
                            </div>
                        </Link>
                        ))}
                    </div>

                    </div>
                </div>
                )}
        </div>
    );

};
export default Layout;
