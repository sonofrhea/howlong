import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

import LogoutButton from "../Authentication/HandleLogout";

import { BusinessAppInterface, LayoutPropsInterface } from "./constants/LayoutTypes";

import { BUSINESS_APPS } from "./constants/businessApps";

import { APP_ICONS } from "./constants/appIcons";

import { BeakerIcon, HomeIcon } from "@heroicons/react/16/solid";

import { Users, PackageOpen,
    ChartColumnIncreasing, Hotel,
    Landmark, Pickaxe,
    ShoppingCart, SquarePen, Cpu,
    SidebarClose, SquareArrowLeft,
    Menu, LayoutGrid,
    LeafyGreen,
    X,
    MoveLeft
 } from "lucide-react";

import { appMenuStyle, dashboardStyles, iconStyles, menuClick, sideBarStyles,
    textStyles
 } from "./constants/classStyles";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome' 









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
                                 `Go to ${app.name}` : 'Coming Soon') : ''}
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
                                            (Soon)
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
                                Quick Access
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
                                className={sideBarStyles.dashboard}
                            >
                                <MoveLeft />
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
                <div className={appMenuStyle.inset}>
                    <div className={appMenuStyle.whiteBackground}>
                        <div className="p-6 border-b border-gray-100">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h2 className="text-xl font-light text-gray-900">
                                        All Applications
                                    </h2>
                                    <p className="text-gray-500 text-sm mt-1">
                                        Navigate between business tools
                                    </p>
                                </div>
                                <button
                                    onClick={() => setShowAppsMenu(false)}
                                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                                >
                                    <X />
                                </button>
                            </div>
                        </div>

                        <div className={dashboardStyles.gridStyle3}>
                            {BUSINESS_APPS.map(app => (
                                <Link
                                    key={app.id}
                                    to={app.available ? app.path : '#'}
                                    onClick={() => setShowAppsMenu(false)}
                                    className={`${menuClick.onClick} ${
                                        app.available ?
                                        menuClick.onClick.yes :
                                        menuClick.onClick.no
                                    } ${app.path === location.pathname ?
                                        menuClick.onClick.pathname :
                                        ''
                                    }`}
                                >
                                    <div className="flex items-center gap-3">
                                        <div className={`${menuClick.unavailable.justify}
                                        ${app.available ? 'bg-blue-100' : 'bg-gray-200'}`}>
                                            <AppIcon appId={app.id} />
                                        </div>
                                        <div>
                                            <div className="font-medium text-gray-900">
                                                {app.name}
                                            </div>
                                            <div className="text-sm text-gray-500">
                                                {app.available ? 'Available' : 'Coming soon'}
                                            </div>
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
