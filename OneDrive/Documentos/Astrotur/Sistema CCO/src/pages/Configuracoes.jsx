import React from 'react';
import { Settings as SettingsIcon, Users, Bell, Lock, Database } from 'lucide-react';

const Configuracoes = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800">Configurações</h1>
      <p className="text-gray-500 mt-2">Configurações do sistema</p>
      
      <div className="mt-8 space-y-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <div className="flex items-center gap-3 mb-4">
            <Users className="text-red-600" size={24} />
            <h2 className="text-lg font-bold">Papéis e Permissões</h2>
          </div>
          <p className="text-gray-600">Gerenciar permissões de usuários e perfis de acesso</p>
          <button className="mt-4 px-4 py-2 border rounded-lg hover:bg-gray-50 transition">
            Configurar
          </button>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <div className="flex items-center gap-3 mb-4">
            <Bell className="text-red-600" size={24} />
            <h2 className="text-lg font-bold">Notificações</h2>
          </div>
          <p className="text-gray-600">Configurar alertas e notificações do sistema</p>
          <button className="mt-4 px-4 py-2 border rounded-lg hover:bg-gray-50 transition">
            Configurar
          </button>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <div className="flex items-center gap-3 mb-4">
            <Lock className="text-red-600" size={24} />
            <h2 className="text-lg font-bold">SLA por Cliente</h2>
          </div>
          <p className="text-gray-600">Definir tempos de SLA específicos por cliente</p>
          <button className="mt-4 px-4 py-2 border rounded-lg hover:bg-gray-50 transition">
            Configurar
          </button>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <div className="flex items-center gap-3 mb-4">
            <Database className="text-red-600" size={24} />
            <h2 className="text-lg font-bold">Templates</h2>
          </div>
          <p className="text-gray-600">Templates de OS e emails automáticos</p>
          <button className="mt-4 px-4 py-2 border rounded-lg hover:bg-gray-50 transition">
            Configurar
          </button>
        </div>
      </div>
    </div>
  );
};

export default Configuracoes;
