import React from 'react';
import { Search, Bell, User, Menu } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const Topbar = ({ sidebarOpen, setSidebarOpen }) => {
  const { user } = useAuth();

  return (
    <header className="h-16 bg-red-600 flex items-center justify-between px-6 shadow-md">
      {/* Left Side */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 rounded-lg hover:bg-red-700 transition text-white lg:hidden"
        >
          <Menu size={20} />
        </button>

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Buscar ocorrências, clientes, veículos..."
            className="w-96 pl-10 pr-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/50"
          />
        </div>
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-4">
        {/* Notifications */}
        <button className="relative p-2 rounded-lg hover:bg-red-700 transition text-white">
          <Bell size={20} />
          <span className="absolute top-1 right-1 w-2 h-2 bg-yellow-400 rounded-full"></span>
        </button>

        {/* User Profile */}
        <div className="flex items-center gap-3 bg-white/20 px-3 py-2 rounded-lg cursor-pointer hover:bg-white/30 transition">
          <div className="w-8 h-8 rounded-full bg-white/30 flex items-center justify-center text-white font-bold">
            {user?.nome?.charAt(0) || 'U'}
          </div>
          <span className="text-white font-medium hidden lg:block">
            {user?.nome || 'Usuário'}
          </span>
        </div>
      </div>
    </header>
  );
};

export default Topbar;
