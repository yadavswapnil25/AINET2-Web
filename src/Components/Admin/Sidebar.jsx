import React from 'react';
import { Home, Users, Settings, X } from 'lucide-react';

const Sidebar = ({ activeNav, setActiveNav, sidebarOpen, setSidebarOpen }) => {
    return (
        <>
            {/* Sidebar */}
            <div className={`sidebar fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-200 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}>
                <div className="flex items-center justify-between h-16 px-6 border-b">
                    <h1 className="text-xl font-bold text-gray-800">Admin Panel</h1>
                    <button
                        onClick={() => setSidebarOpen(false)}
                        className="lg:hidden p-2 rounded-md hover:bg-gray-100"
                    >
                        <X size={20} />
                    </button>
                </div>
                <nav className="mt-8">
                    <div className="px-4 space-y-2">
                        <button
                            onClick={() => setActiveNav('dashboard')}
                            className={`w-full flex items-center px-4 py-3 text-left rounded-lg transition-colors ${activeNav === 'dashboard' ? 'bg-teal-50 text-teal-700' : 'text-gray-600 hover:bg-gray-50'}`}
                        >
                            <Home size={20} className="mr-3" />
                            Dashboard
                        </button>
                        <button
                            onClick={() => setActiveNav('users')}
                            className={`w-full flex items-center px-4 py-3 text-left rounded-lg transition-colors ${activeNav === 'users' ? 'bg-teal-50 text-teal-700' : 'text-gray-600 hover:bg-gray-50'}`}
                        >
                            <Users size={20} className="mr-3" />
                            Users
                        </button>
                        <button
                            onClick={() => setActiveNav('settings')}
                            className={`w-full flex items-center px-4 py-3 text-left rounded-lg transition-colors ${activeNav === 'settings' ? 'bg-teal-50 text-teal-700' : 'text-gray-600 hover:bg-gray-50'}`}
                        >
                            <Settings size={20} className="mr-3" />
                            Settings
                        </button>
                    </div>
                </nav>
            </div>

            {/* Mobile overlay */}
            {sidebarOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)}></div>
            )}
        </>
    );
};

export default Sidebar;
