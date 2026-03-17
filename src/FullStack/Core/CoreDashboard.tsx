import { Link } from 'react-router-dom';



import { coreModuleInterface } from './constants/Types';


import { CORE_ICONS } from './constants/ModuleIcons';







function CoreDashboard() {


    const coreModules: coreModuleInterface[] = [
        {
            id: 'companyProfile',
            name: 'Company Profile',
            description: 'Manage company workers and employees',
            path: '/core/company/profile',
            available: true
        },
        {
            id: 'userProfile',
            name: 'Users',
            description: 'Manage company workers and employees',
            path: '/core/users/profile',
            available: true
        },
        {
            id: 'banks',
            name: 'Banks',
            description: 'View List of Banks',
            path: '/core/banks',
            available: true
        },
        {
            id: 'currencies',
            name: 'Currencies',
            description: 'View available currencies',
            path: '/core/currencies',
            available: true
        },
    ];



    return(
        <div className="min-h-screen bg-gray-50 p-4">
            <div className="max-w-6xl mx-auto">
                {/* HEADER */}
                <div className="text-center mb-12">
                    <h1 className="text-3xl font-bold text-gray-900 mb-4">
                        User Management
                    </h1>
                    <p className="text-gray-600">
                        Choose a module to get started
                    </p>
                </div>

                {/* GRIDS */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                    {coreModules.map(module => (
                        <Link
                            key={module.id}
                            to={module.available ? module.path : '#'}
                            className={`bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200 ${
                                module.available ? 'cursor-pointer' : 'cursor-not-allowed opacity-50'
                            }`}
                        >
                            {/* IconS */}
                            <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${
                                module.available ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-400'
                            }`}>
                                <ModuleIcon moduleId={module.id} />
                            </div>

                            {/* Content */}
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                {module.name}
                            </h3>
                            <p className="text-gray-600 text-sm mb-4">
                                {module.description}
                            </p>

                            {/* Status */}
                            <div className={`text-sm font-medium ${
                                module.available ? 'text-green-700' : 'text-gray-500'
                            }`}>
                                {module.available ? 'Open Module ⟶' : 'Coming Soon'}
                            </div>                            
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}

const ModuleIcon = ({ moduleId }: {moduleId: keyof typeof CORE_ICONS}) => {

    return CORE_ICONS[moduleId] || null;
};
export default CoreDashboard;
