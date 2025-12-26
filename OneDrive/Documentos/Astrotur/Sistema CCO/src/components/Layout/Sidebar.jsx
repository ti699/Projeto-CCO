import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  FileText,
  Users,
  Car,
  AlertTriangle,
  UserCog,
  BarChart3,
  Upload,
  Settings,
  ChevronLeft,
  LogOut
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const Sidebar = ({ isOpen, setIsOpen }) => {
  const { signOut, user } = useAuth();

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
    { icon: FileText, label: 'Ocorrências', path: '/ocorrencias' },
    {
      label: 'Cadastros',
      isGroup: true,
      items: [
        { icon: Users, label: 'Clientes', path: '/cadastros/clientes' },
        { icon: Car, label: 'Veículos', path: '/cadastros/veiculos' },
        { icon: AlertTriangle, label: 'Tipos de Quebra', path: '/cadastros/tipos-quebra' },
        { icon: UserCog, label: 'Usuários', path: '/cadastros/usuarios' },
      ]
    },
    { icon: BarChart3, label: 'Relatórios', path: '/relatorios' },
    { icon: Upload, label: 'Importação', path: '/importacao' },
    { icon: Settings, label: 'Configurações', path: '/configuracoes' },
  ];

  return (
    <aside
      className={`fixed left-0 top-0 h-screen bg-white border-r border-gray-200 transition-all duration-300 z-50 ${
        isOpen ? 'w-64' : 'w-20'
      }`}
    >
      {/* Logo */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-gray-200">
        {isOpen && (
          <span className="text-xl font-bold text-red-600">Sistema CCO</span>
        )}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 rounded-lg hover:bg-gray-100 transition"
        >
          <ChevronLeft
            className={`transition-transform ${!isOpen && 'rotate-180'}`}
            size={20}
          />
        </button>
      </div>

      {/* Menu Items */}
      <nav className="p-4 space-y-2 overflow-y-auto h-[calc(100vh-64px-80px)]">
        {menuItems.map((item, index) => {
          if (item.isGroup) {
            return (
              <div key={index} className="space-y-1">
                {isOpen && (
                  <p className="text-xs font-semibold text-gray-400 uppercase px-3 py-2">
                    {item.label}
                  </p>
                )}
                {item.items.map((subItem, subIndex) => (
                  <NavLink
                    key={subIndex}
                    to={subItem.path}
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-3 py-2.5 rounded-lg transition ${
                        isActive
                          ? 'bg-red-50 text-red-600 font-semibold'
                          : 'text-gray-700 hover:bg-gray-50'
                      } ${!isOpen && 'justify-center'}`
                    }
                  >
                    <subItem.icon size={20} />
                    {isOpen && <span>{subItem.label}</span>}
                  </NavLink>
                ))}
              </div>
            );
          }

          return (
            <NavLink
              key={index}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg transition ${
                  isActive
                    ? 'bg-red-50 text-red-600 font-semibold'
                    : 'text-gray-700 hover:bg-gray-50'
                } ${!isOpen && 'justify-center'}`
              }
            >
              <item.icon size={20} />
              {isOpen && <span>{item.label}</span>}
            </NavLink>
          );
        })}
      </nav>

      {/* User Info */}
      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200">
        {isOpen ? (
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-red-600 flex items-center justify-center text-white font-bold">
                {user?.nome?.charAt(0) || 'U'}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-800 truncate">
                  {user?.nome || 'Usuário'}
                </p>
                <p className="text-xs text-gray-500 truncate">{user?.cargo || 'Monitor'}</p>
              </div>
            </div>
            <button
              onClick={signOut}
              className="p-2 rounded-lg hover:bg-gray-100 transition text-gray-600"
              title="Sair"
            >
              <LogOut size={18} />
            </button>
          </div>
        ) : (
          <button
            onClick={signOut}
            className="w-full p-2 rounded-lg hover:bg-gray-100 transition flex justify-center"
            title="Sair"
          >
            <LogOut size={20} />
          </button>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
