import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Edit, 
  FileText, 
  Clock, 
  User, 
  Car, 
  AlertCircle,
  Calendar,
  CheckCircle2,
  XCircle,
  Loader2
} from 'lucide-react';
import api from '../../services/api';
import { toast } from 'sonner';

const DetalhesOcorrencia = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [ocorrencia, setOcorrencia] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    carregarOcorrencia();
  }, [id]);

  const carregarOcorrencia = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/ocorrencias/${id}`);
      setOcorrencia(response.data);
    } catch (error) {
      console.error('Erro ao carregar ocorrência:', error);
      toast.error('Erro ao carregar detalhes da ocorrência');
      navigate('/ocorrencias');
    } finally {
      setLoading(false);
    }
  };

  const finalizarOcorrencia = async () => {
    try {
      await api.put(`/ocorrencias/${id}`, {
        ...ocorrencia,
        status: 'concluido'
      });
      toast.success('Ocorrência finalizada com sucesso!');
      carregarOcorrencia(); // Recarrega os dados atualizados
    } catch (error) {
      console.error('Erro ao finalizar ocorrência:', error);
      toast.error('Erro ao finalizar ocorrência');
    }
  };

  const formatarData = (dataString) => {
    if (!dataString) return 'N/A';
    const data = new Date(dataString);
    return data.toLocaleDateString('pt-BR', { 
      day: '2-digit', 
      month: '2-digit', 
      year: 'numeric'
    });
  };

  const formatarDataHora = (dataString) => {
    if (!dataString) return 'N/A';
    const data = new Date(dataString);
    return data.toLocaleString('pt-BR', { 
      day: '2-digit', 
      month: '2-digit', 
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatarDataCurta = (dataString) => {
    if (!dataString) return 'N/A';
    const data = new Date(dataString);
    return data.toLocaleDateString('pt-BR', { 
      day: '2-digit', 
      month: '2-digit'
    });
  };

  const formatarHora = (dataString) => {
    if (!dataString) return 'N/A';
    
    // Se já for uma string de hora simples (HH:MM), retorna diretamente
    if (typeof dataString === 'string' && dataString.match(/^\d{2}:\d{2}(:\d{2})?$/)) {
      return dataString.substring(0, 5); // Retorna apenas HH:MM
    }
    
    // Se for uma data ISO, formata
    try {
      const data = new Date(dataString);
      if (isNaN(data.getTime())) return dataString; // Se não for data válida, retorna original
      return data.toLocaleTimeString('pt-BR', { 
        hour: '2-digit', 
        minute: '2-digit'
      });
    } catch (error) {
      return dataString;
    }
  };

  const calcularTempoAtendimento = (inicio, fim) => {
    if (!inicio || !fim) return 'N/A';
    
    try {
      const dataInicio = new Date(inicio);
      const dataFim = new Date(fim);
      const diffMs = dataFim - dataInicio;
      const diffMinutos = Math.floor(diffMs / 60000);
      
      const horas = Math.floor(diffMinutos / 60);
      const minutos = diffMinutos % 60;
      
      return `${horas}h ${minutos}min`;
    } catch (error) {
      return 'N/A';
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      'pendente': 'bg-yellow-100 text-yellow-800',
      'em_andamento': 'bg-blue-100 text-blue-800',
      'concluido': 'bg-green-100 text-green-800'
    };
    return colors[status?.toLowerCase()] || 'bg-gray-100 text-gray-800';
  };

  const getStatusTexto = (status) => {
    const textos = {
      'pendente': 'Pendente',
      'em_andamento': 'Em Andamento',
      'concluido': 'Concluído'
    };
    return textos[status?.toLowerCase()] || status;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-red-600" />
      </div>
    );
  }

  if (!ocorrencia) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <XCircle className="w-16 h-16 text-gray-400 mb-4" />
        <p className="text-gray-500">Ocorrência não encontrada</p>
        <button 
          onClick={() => navigate('/ocorrencias')}
          className="mt-4 text-red-600 hover:text-red-700"
        >
          Voltar para lista
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      {/* Cabeçalho */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={() => navigate('/ocorrencias')}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800"
          >
            <ArrowLeft className="w-5 h-5" />
            Voltar
          </button>
          
          <div className="flex gap-3">
            <button
              onClick={() => navigate(`/ocorrencias/editar/${id}`)}
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition"
            >
              <Edit className="w-4 h-4" />
              Editar
            </button>
            <button
              className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
            >
              <FileText className="w-4 h-4" />
              Gerar PDF
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-800 mb-2">
              Ocorrência #{ocorrencia.numero_ocorrencia}
            </h1>
            <div className="flex items-center gap-3">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(ocorrencia.status)}`}>
                {getStatusTexto(ocorrencia.status)}
              </span>
              <span className="text-gray-500">
                {ocorrencia.tipo_ocorrencia}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* Coluna Principal */}
        <div className="col-span-12 lg:col-span-7 space-y-6">
          {/* Informações Gerais */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Informações Gerais
            </h2>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-gray-500 mb-1 block">Cliente</label>
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-gray-400" />
                  <span className="font-medium">{ocorrencia.cliente_nome || 'N/A'}</span>
                </div>
              </div>

              <div>
                <label className="text-sm text-gray-500 mb-1 block">SLA Atribuído</label>
                <div className="flex items-center gap-2">
                  {ocorrencia.cliente_sla ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-green-500" />
                      <span className="font-medium text-green-700">Sim</span>
                    </>
                  ) : (
                    <>
                      <XCircle className="w-4 h-4 text-gray-400" />
                      <span className="font-medium text-gray-500">Não</span>
                    </>
                  )}
                </div>
              </div>

              <div>
                <label className="text-sm text-gray-500 mb-1 block">Veículo</label>
                <div className="flex items-center gap-2">
                  <Car className="w-4 h-4 text-gray-400" />
                  <span className="font-medium">{ocorrencia.veiculo_placa || 'N/A'}</span>
                </div>
              </div>

              <div>
                <label className="text-sm text-gray-500 mb-1 block">Monitor</label>
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-gray-400" />
                  <span className="font-medium">{ocorrencia.monitor_nome || 'N/A'}</span>
                </div>
              </div>

              {ocorrencia.houve_troca_veiculo === 'sim' && (
                <div>
                  <label className="text-sm text-gray-500 mb-1 block">Veículo Substituto</label>
                  <div className="flex items-center gap-2">
                    <Car className="w-4 h-4 text-gray-400" />
                    <span className="font-medium">{ocorrencia.veiculo_substituto_placa || 'N/A'}</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Horários */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Horários e Atendimento
            </h2>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-gray-500 mb-1 block">Horário Socorro</label>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-gray-400" />
                  <span className="font-medium">{formatarHora(ocorrencia.horario_socorro)}</span>
                </div>
              </div>

              <div>
                <label className="text-sm text-gray-500 mb-1 block">Horário Saída</label>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-gray-400" />
                  <span className="font-medium">{formatarHora(ocorrencia.horario_saida)}</span>
                </div>
              </div>

              <div className="col-span-2">
                <label className="text-sm text-gray-500 mb-1 block">Tempo de Atendimento</label>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-gray-400" />
                  <span className="font-medium text-lg">
                    {calcularTempoAtendimento(ocorrencia.horario_socorro, ocorrencia.horario_saida)}
                  </span>
                </div>
              </div>

              {ocorrencia.houve_atraso === 'sim' && (
                <div className="col-span-2 bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                  <div className="flex items-start gap-2">
                    <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
                    <div>
                      <p className="font-medium text-yellow-800">Houve Atraso</p>
                      <p className="text-sm text-yellow-700">
                        Tempo de atraso: {ocorrencia.tempo_atraso || 'Não especificado'}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Descrição */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Descrição
            </h2>
            <p className="text-gray-700 whitespace-pre-wrap">
              {ocorrencia.descricao || 'Nenhuma descrição fornecida'}
            </p>
          </div>

          {/* Anexos */}
          {ocorrencia.anexos && ocorrencia.anexos.length > 0 && (
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">
                Anexos
              </h2>
              <div className="grid grid-cols-2 gap-3">
                {ocorrencia.anexos.map((anexo, index) => (
                  <div key={index} className="border rounded-lg p-3 hover:bg-gray-50 cursor-pointer">
                    <div className="flex items-center gap-2">
                      <FileText className="w-5 h-5 text-gray-400" />
                      <span className="text-sm text-gray-700 truncate">{anexo.nome}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Coluna Lateral */}
        <div className="col-span-12 lg:col-span-5 space-y-6">
          {/* Status Card */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Status Atual
            </h2>
            
            <div className="space-y-3">
              <div className={`p-4 rounded-lg ${getStatusColor(ocorrencia.status)}`}>
                <div className="flex items-center gap-2 mb-2">
                  {ocorrencia.status === 'concluido' ? (
                    <CheckCircle2 className="w-5 h-5" />
                  ) : (
                    <Clock className="w-5 h-5" />
                  )}
                  <span className="font-semibold">{getStatusTexto(ocorrencia.status)}</span>
                </div>
                <p className="text-sm opacity-90">
                  {ocorrencia.status === 'pendente' && 'Aguardando início do atendimento'}
                  {ocorrencia.status === 'em_andamento' && 'Atendimento em progresso'}
                  {ocorrencia.status === 'concluido' && 'Atendimento finalizado'}
                </p>
              </div>
            </div>
          </div>

          {/* Histórico */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Histórico
            </h2>
            
            <div className="space-y-3">
              <div className="border-l-2 border-green-400 pl-4 pb-3">
                <div className="flex items-center gap-2 mb-1">
                  <Calendar className="w-4 h-4 text-green-600" />
                  <span className="text-sm text-gray-500">Criada em</span>
                </div>
                <p className="font-medium">{formatarDataHora(ocorrencia.created_at)}</p>
              </div>

              {ocorrencia.updated_at && ocorrencia.updated_at !== ocorrencia.created_at && (
                <div className="border-l-2 border-blue-400 pl-4 pb-3">
                  <div className="flex items-center gap-2 mb-1">
                    <Calendar className="w-4 h-4 text-blue-600" />
                    <span className="text-sm text-gray-500">Editada em</span>
                  </div>
                  <p className="font-medium">{formatarDataHora(ocorrencia.updated_at)}</p>
                </div>
              )}
            </div>
          </div>

          {/* Informações do Sistema */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Informações do Sistema
            </h2>
            <div className="space-y-3 text-sm">
              <div>
                <span className="text-gray-500 block mb-1">ID da Ocorrência</span>
                <span className="font-mono font-semibold text-base">{ocorrencia.numero_ocorrencia}</span>
              </div>
              
              <div className="border-t pt-3">
                <span className="text-gray-500 block mb-1">Data de Criação</span>
                <span className="font-medium">{formatarData(ocorrencia.created_at)}</span>
              </div>
              
              <div>
                <span className="text-gray-500 block mb-1">Hora de Criação</span>
                <span className="font-medium">{formatarHora(ocorrencia.created_at)}</span>
              </div>
              
              {ocorrencia.updated_at && ocorrencia.updated_at !== ocorrencia.created_at && (
                <div className="border-t pt-3">
                  <span className="text-gray-500 block mb-1">Última Atualização</span>
                  <span className="font-medium">{formatarDataHora(ocorrencia.updated_at)}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* SLA do Cliente */}
      <div className="mt-6 bg-white rounded-lg shadow-sm border p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Acordo de Nível de Serviço (SLA)
        </h2>
        <div className="flex items-center gap-3">
          {ocorrencia.cliente_sla ? (
            <>
              <CheckCircle2 className="w-6 h-6 text-green-500" />
              <div>
                <p className="font-semibold text-green-700">Cliente possui SLA atribuído</p>
                <p className="text-sm text-gray-600">Este cliente tem acordo de nível de serviço ativo</p>
              </div>
            </>
          ) : (
            <>
              <XCircle className="w-6 h-6 text-gray-400" />
              <div>
                <p className="font-semibold text-gray-700">Cliente sem SLA atribuído</p>
                <p className="text-sm text-gray-600">Este cliente não possui acordo de nível de serviço</p>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Botão Finalizar */}
      {(ocorrencia.status === 'pendente' || ocorrencia.status === 'em_andamento') && (
        <div className="mt-6">
          <button 
            onClick={finalizarOcorrencia}
            className="w-full bg-green-600 text-white py-4 rounded-lg hover:bg-green-700 transition font-semibold text-lg shadow-lg"
          >
            Finalizar ocorrência
          </button>
        </div>
      )}
    </div>
  );
};

export default DetalhesOcorrencia;
