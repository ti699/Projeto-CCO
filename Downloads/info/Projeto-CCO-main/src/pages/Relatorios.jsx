import React, { useState, useEffect } from 'react';
import { Download, FileText, ArrowLeft, Loader } from 'lucide-react';
import { toast } from 'sonner';
import api from '../services/api';
import { gerarRelatorioTexto, baixarRelatorioTexto, formatarDataBR } from '../services/relatorioUtils';

const Relatorios = () => {
  const [ocorrencias, setOcorrencias] = useState([]);
  const [loading, setLoading] = useState(false);
  const [nomeMonitor, setNomeMonitor] = useState('Monitor CCO');
  const [dataFiltro, setDataFiltro] = useState(new Date().toISOString().slice(0, 10));

  useEffect(() => {
    carregarOcorrencias();
  }, []);

  const carregarOcorrencias = async () => {
    try {
      setLoading(true);
      const response = await api.get('/ocorrencias');
      console.log('📋 Ocorrências carregadas:', response.data);
      setOcorrencias(response.data || []);
    } catch (error) {
      console.error('❌ Erro ao carregar ocorrências:', error);
      toast.error('Erro ao carregar ocorrências');
      setOcorrencias([]);
    } finally {
      setLoading(false);
    }
  };

  const handleGerarRelatorioTexto = () => {
    if (!nomeMonitor.trim()) {
      toast.error('Digite o nome do monitor');
      return;
    }

    // Filtrar ocorrências pelo dia selecionado
    const ocorrenciasFilteradas = ocorrencias.filter(o => {
      const dataOcorrencia = new Date(o.created_at).toISOString().slice(0, 10);
      return dataOcorrencia === dataFiltro;
    });

    const relatorio = gerarRelatorioTexto(ocorrenciasFilteradas, nomeMonitor);
    baixarRelatorioTexto(relatorio, nomeMonitor);
    
    // Também mostrar no console para visualização
    console.log('📄 Relatório gerado:\n', relatorio);
    toast.success('Relatório gerado com sucesso!');
  };

  const handleExibirRelatorioTexto = () => {
    if (!nomeMonitor.trim()) {
      toast.error('Digite o nome do monitor');
      return;
    }

    // Filtrar ocorrências pelo dia selecionado
    const ocorrenciasFilteradas = ocorrencias.filter(o => {
      const dataOcorrencia = new Date(o.created_at).toISOString().slice(0, 10);
      return dataOcorrencia === dataFiltro;
    });

    const relatorio = gerarRelatorioTexto(ocorrenciasFilteradas, nomeMonitor);
    
    // Exibir em modal ou alert
    alert(relatorio);
  };

  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800">Relatórios</h1>
      <p className="text-gray-500 mt-2">Relatórios dinâmicos e exportações</p>
      
      {/* Filtros */}
      <div className="mt-8 bg-white p-6 rounded-xl shadow-sm border mb-8">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Configurações de Relatório</h2>
        
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Nome do Monitor
            </label>
            <input
              type="text"
              value={nomeMonitor}
              onChange={(e) => setNomeMonitor(e.target.value)}
              placeholder="Digite o nome do monitor"
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Data do Plantão
            </label>
            <input
              type="date"
              value={dataFiltro}
              onChange={(e) => setDataFiltro(e.target.value)}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
            />
          </div>

          <div className="flex items-end gap-2">
            <button
              onClick={handleGerarRelatorioTexto}
              disabled={loading}
              className="flex-1 bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition font-semibold flex items-center justify-center gap-2 disabled:bg-gray-400"
            >
              {loading ? <Loader size={18} className="animate-spin" /> : <Download size={18} />}
              Baixar Relatório
            </button>
          </div>
        </div>

        <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <p className="text-sm text-blue-800">
            <strong>Total de ocorrências no período:</strong> {
              ocorrencias.filter(o => {
                const dataOcorrencia = new Date(o.created_at).toISOString().slice(0, 10);
                return dataOcorrencia === dataFiltro;
              }).length
            }
          </p>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border hover:shadow-md transition cursor-pointer">
          <FileText className="text-red-600 mb-4" size={32} />
          <h3 className="font-bold text-lg mb-2">Relatório de Ocorrências</h3>
          <p className="text-sm text-gray-600 mb-4">Exportar relatório completo de ocorrências com filtros</p>
          <button 
            onClick={handleGerarRelatorioTexto}
            className="flex items-center gap-2 text-red-600 font-semibold text-sm hover:text-red-700 transition"
          >
            <Download size={16} />
            Gerar Relatório
          </button>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border hover:shadow-md transition cursor-pointer">
          <FileText className="text-red-600 mb-4" size={32} />
          <h3 className="font-bold text-lg mb-2">Visualizar em Texto</h3>
          <p className="text-sm text-gray-600 mb-4">Visualizar relatório formatado em texto antes de enviar</p>
          <button 
            onClick={handleExibirRelatorioTexto}
            className="flex items-center gap-2 text-red-600 font-semibold text-sm hover:text-red-700 transition"
          >
            <FileText size={16} />
            Visualizar
          </button>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border hover:shadow-md transition cursor-pointer">
          <FileText className="text-red-600 mb-4" size={32} />
          <h3 className="font-bold text-lg mb-2">Relatório de Performance</h3>
          <p className="text-sm text-gray-600 mb-4">Indicadores de performance operacional</p>
          <button className="flex items-center gap-2 text-red-600 font-semibold text-sm hover:text-red-700 transition">
            <Download size={16} />
            Gerar Relatório
          </button>
        </div>
      </div>

      <div className="mt-8 bg-white p-8 rounded-xl shadow-sm border">
        <h2 className="text-xl font-bold mb-4">Informações sobre Relatórios</h2>
        <div className="space-y-3 text-sm text-gray-600">
          <p>
            <strong>Relatório de Fechamento de Plantão:</strong> Contém estatísticas completas do turno, incluindo ocorrências críticas, atrasos e pendências.
          </p>
          <p>
            <strong>Formato:</strong> Texto formatado pronto para envio por WhatsApp ou Email, com cabeçalho, indicadores e resumo detalhado.
          </p>
          <p>
            <strong>Como usar:</strong> Selecione a data do plantão e o nome do monitor, depois clique em "Baixar Relatório" ou "Visualizar" para ver antes de enviar.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Relatorios;
