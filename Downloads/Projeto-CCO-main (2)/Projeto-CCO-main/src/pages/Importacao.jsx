import React from 'react';
import { Upload, FileSpreadsheet } from 'lucide-react';

const Importacao = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800">Importação de Dados</h1>
      <p className="text-gray-500 mt-2">Importar dados via planilhas Excel/CSV</p>
      
      <div className="mt-8 bg-white p-12 rounded-xl shadow-sm border">
        <div className="text-center">
          <FileSpreadsheet className="mx-auto text-gray-400 mb-6" size={64} />
          <h2 className="text-2xl font-bold mb-4">Importar Planilha</h2>
          <p className="text-gray-600 mb-8">
            Arraste uma planilha Excel (.xlsx) ou CSV para fazer upload<br />
            ou clique para selecionar um arquivo
          </p>
          
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 hover:border-red-500 transition cursor-pointer">
            <Upload className="mx-auto text-gray-400 mb-4" size={48} />
            <p className="text-gray-600 mb-2">Clique ou arraste arquivos aqui</p>
            <p className="text-sm text-gray-400">Formatos aceitos: .xlsx, .xls, .csv</p>
            <input type="file" accept=".xlsx,.xls,.csv" className="hidden" />
          </div>

          <div className="mt-8 text-left bg-blue-50 border border-blue-200 p-4 rounded-lg">
            <p className="font-semibold text-blue-800 mb-2">📋 Instruções:</p>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• Certifique-se que a planilha contém as colunas necessárias</li>
              <li>• Os dados serão mapeados automaticamente</li>
              <li>• Você poderá revisar antes de confirmar a importação</li>
              <li>• Duplicatas serão identificadas e podem ser ignoradas</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Importacao;
