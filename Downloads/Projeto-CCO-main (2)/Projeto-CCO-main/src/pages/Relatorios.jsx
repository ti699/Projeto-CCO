import React from 'react';
import { Download, FileText } from 'lucide-react';

const Relatorios = () => {
  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800">Relatórios</h1>
      <p className="text-gray-500 mt-2">Relatórios dinâmicos e exportações</p>
      
      <div className="mt-8 grid grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border hover:shadow-md transition cursor-pointer">
          <FileText className="text-red-600 mb-4" size={32} />
          <h3 className="font-bold text-lg mb-2">Relatório de Ocorrências</h3>
          <p className="text-sm text-gray-600 mb-4">Exportar relatório completo de ocorrências com filtros</p>
          <button className="flex items-center gap-2 text-red-600 font-semibold text-sm">
            <Download size={16} />
            Gerar Relatório
          </button>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border hover:shadow-md transition cursor-pointer">
          <FileText className="text-red-600 mb-4" size={32} />
          <h3 className="font-bold text-lg mb-2">Relatório de SLA</h3>
          <p className="text-sm text-gray-600 mb-4">Análise de cumprimento de SLA por cliente</p>
          <button className="flex items-center gap-2 text-red-600 font-semibold text-sm">
            <Download size={16} />
            Gerar Relatório
          </button>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border hover:shadow-md transition cursor-pointer">
          <FileText className="text-red-600 mb-4" size={32} />
          <h3 className="font-bold text-lg mb-2">Relatório de Performance</h3>
          <p className="text-sm text-gray-600 mb-4">Indicadores de performance operacional</p>
          <button className="flex items-center gap-2 text-red-600 font-semibold text-sm">
            <Download size={16} />
            Gerar Relatório
          </button>
        </div>
      </div>

      <div className="mt-8 bg-white p-8 rounded-xl shadow-sm border">
        <h2 className="text-xl font-bold mb-4">Filtros Avançados</h2>
        <p className="text-gray-600">Funcionalidade de filtros avançados em desenvolvimento...</p>
      </div>
    </div>
  );
};

export default Relatorios;
