import React, { useState, useEffect, useRef } from 'react';
import { Search, Bell, User, Menu } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import api from '../../services/api';

const Topbar = ({ sidebarOpen, setSidebarOpen }) => {
  const { user } = useAuth();
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [loadingNotifications, setLoadingNotifications] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    if (!showNotifications) return;

    let cancelled = false;

    const fetchNotifications = async () => {
      setLoadingNotifications(true);
      try {
        const res = await api.get('/notifications');
        if (!cancelled) setNotifications(res.data || []);
      } catch (err) {
        // Se endpoint não existir, manter lista vazia
        if (!cancelled) setNotifications([]);
      } finally {
        if (!cancelled) setLoadingNotifications(false);
      }
    };

    fetchNotifications();

    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowNotifications(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      cancelled = true;
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showNotifications]);

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
        <div className="relative">
          <button
            onClick={() => setShowNotifications(v => !v)}
            className="relative p-2 rounded-lg hover:bg-red-700 transition text-white"
            aria-label="Notificações"
          >
            <Bell size={20} />
            <span className="absolute top-1 right-1 w-2 h-2 bg-yellow-400 rounded-full"></span>
          </button>

          {showNotifications && (
            <div ref={dropdownRef} className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg overflow-hidden z-50">
              <div className="p-3 border-b">
                <strong>Notificações</strong>
              </div>
              <div className="max-h-60 overflow-auto">
                {loadingNotifications ? (
                  <div className="p-3 text-sm text-gray-500">Carregando...</div>
                ) : notifications.length === 0 ? (
                  <div className="p-3 text-sm text-gray-500">Sem notificações</div>
                ) : (
                  notifications.map((n) => (
                    <div key={n.id || n.timestamp} className="p-3 border-b text-sm">
                      <div className="font-medium">{n.title || 'Notificação'}</div>
                      <div className="text-xs text-gray-500">{n.message || n.body}</div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

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
