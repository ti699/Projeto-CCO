import React, { useState } from 'react';
import { Search, Filter, X, Calendar, Clock, User, Truck, MapPin, FileText, Download, ChevronUp, ChevronDown, Building2, Plus, Eye, Edit, Trash } from 'lucide-react';

// Dados da frota baseados na planilha fornecida
const frotaData = [
  { prefixo: "306", cliente: "MONTE RODOVIAS", tipo: "VAN", motorista: "MONTE" },
  { prefixo: "306", cliente: "MONTE RODOVIAS", tipo: "VAN", motorista: "JOSÉ ELIAS" },
  { prefixo: "304", cliente: "MONTE RODOVIAS", tipo: "VAN", motorista: "CARLOS ALBERTO MAX" },
  { prefixo: "402", cliente: "VIVA+SOLAR", tipo: "VAN", motorista: "ROBSON FIGELES" },
  { prefixo: "424", cliente: "VIVA+SOLAR", tipo: "VAN", motorista: "ALLAN JOSÉ" },
  { prefixo: "426", cliente: "VILA GALÉ", tipo: "VAN", motorista: "CARLOS JORGE" },
  { prefixo: "966", cliente: "CARREFOUR", tipo: "VAN", motorista: "LUIZ CARLOS" },
  { prefixo: "1003", cliente: "CARREFOUR", tipo: "MICRO", motorista: "CARLOS PAULO" },
  { prefixo: "1504", cliente: "PREFEITURA IPO", tipo: "MICRO", motorista: "LUIZ CARLOS" },
  { prefixo: "1322", cliente: "81 MULLER", tipo: "MICRO", motorista: "SILVIO WILLIAM LEMOS" },
  { prefixo: "1349", cliente: "JCPM", tipo: "ÔNIBUS", motorista: "HUGO LININS" },
  { prefixo: "1373", cliente: "HDH", tipo: "ÔNIBUS", motorista: "MANOEL ARAÚJO VICENTE C SAÍDA A 8 30" },
  { prefixo: "1379", cliente: "HDH", tipo: "ÔNIBUS", motorista: "HÉLIO / SÉRGIO LIMA" },
  { prefixo: "1379", cliente: "JEEP", tipo: "ÔNIBUS", motorista: "ADRIANO / JOSÉ IVANILDO" },
  { prefixo: "1397", cliente: "JEEP", tipo: "ÔNIBUS", motorista: "JUCA" },
  { prefixo: "1405", cliente: "PURETTA", tipo: "ÔNIBUS", motorista: "SILVANO" },
  { prefixo: "1817", cliente: "RETIDO", tipo: "ÔNIBUS", motorista: "RETIDO" },
  { prefixo: "1702", cliente: "CARREFOUR", tipo: "MICRO", motorista: "LOURENÇO / ADRIANO JOAQUIM" },
  { prefixo: "1704", cliente: "RESERVA", tipo: "MICRO", motorista: "" },
  { prefixo: "1948", cliente: "CRISTAL PET", tipo: "MICRO", motorista: "GLEYDSON / MARCOS PAULO" },
  { prefixo: "1948", cliente: "CRISTAL PET", tipo: "MICRO", motorista: "GLEYDSON / MARCOS PAULO" },
  { prefixo: "2002", cliente: "CBA", tipo: "ÔNIBUS", motorista: "WILSON JORIVALDO" },
  { prefixo: "2004", cliente: "TECON", tipo: "ÔNIBUS", motorista: "CLAYTON" },
  { prefixo: "2006", cliente: "CBA", tipo: "ÔNIBUS", motorista: "CRIAR NOVO MOTORISTA" },
  { prefixo: "2008", cliente: "TECON", tipo: "ÔNIBUS", motorista: "CLODOMIR" },
  { prefixo: "2018", cliente: "JCPM", tipo: "VAN", motorista: "EDVALDO" },
  { prefixo: "2020", cliente: "RESERVA", tipo: "VAN", motorista: "" },
  { prefixo: "2024", cliente: "CRISTAL PET", tipo: "MICRO", motorista: "CARLOS ALBERTO SIMÃO" },
  { prefixo: "2026", cliente: "CRISTAL PET", tipo: "MICRO", motorista: "PAULO DOMINGOS" },
  { prefixo: "2028", cliente: "MARELLI", tipo: "MICRO", motorista: "EDUARDO GONÇALVES" },
  { prefixo: "2030", cliente: "MARELLI", tipo: "MICRO", motorista: "GILSON LOURENÇO" },
  { prefixo: "2032", cliente: "CAMPARI", tipo: "MICRO", motorista: "VALDIENIR" },
  { prefixo: "2034", cliente: "CAMPARI", tipo: "MICRO", motorista: "ALEXANDRE" },
  { prefixo: "2036", cliente: "MOURA", tipo: "MICRO", motorista: "WANILSON" },
  { prefixo: "2038", cliente: "MARELLI", tipo: "MICRO", motorista: "ALEXANDRE GILBERTO / ANTÔNIO RODRIGUES" },
  { prefixo: "2102", cliente: "81 MULLER", tipo: "MICRO", motorista: "JOSÉ JOSINALDO" },
  { prefixo: "2104", cliente: "AMANCO", tipo: "MICRO", motorista: "JOSÉ ARINALDO SILVA DO UBER" },
  { prefixo: "2202", cliente: "ACHE", tipo: "MICRO", motorista: "PAULO FEITOSA" },
  { prefixo: "2204", cliente: "ACHE", tipo: "MICRO", motorista: "LEANDRO MARQUES/SILVIO SALUSTIANO" },
  { prefixo: "2206", cliente: "ACHE", tipo: "MICRO", motorista: "ALEX FREITAS CORDEIRO" },
  { prefixo: "2208", cliente: "PIACENTINI", tipo: "MICRO", motorista: "LUCIANO XAVIER" },
  { prefixo: "2210", cliente: "CAMPARI", tipo: "MICRO", motorista: "GILBERTO" },
  { prefixo: "2212", cliente: "CAMPARI", tipo: "MICRO", motorista: "MARCOS PAULO" },
  { prefixo: "2214", cliente: "CBA", tipo: "MICRO", motorista: "EDUARDO PEREIRA HUMBERTO/GEORGE" },
  { prefixo: "2216", cliente: "AMANCO", tipo: "MICRO", motorista: "MARCOS DE SOUZA / WILLAMS ANDERSON" },
  { prefixo: "2218", cliente: "CAMPARI", tipo: "MICRO", motorista: "VALDENIR" },
  { prefixo: "2220", cliente: "CAMPARI", tipo: "MICRO", motorista: "CLAUDEMIR ANDRADE" },
  { prefixo: "2302", cliente: "TURISMO", tipo: "ÔNIBUS", motorista: "EDGAR/MAURINHO" },
  { prefixo: "2404", cliente: "MOURA", tipo: "MICRO", motorista: "JAILSON ARIMARTEIO" },
  { prefixo: "2406", cliente: "CBA", tipo: "MICRO", motorista: "ALTEVIR / JOSÉ GENIVALDO" },
  { prefixo: "2408", cliente: "CBA", tipo: "MICRO", motorista: "WAGNER" },
  { prefixo: "2410", cliente: "DECAL", tipo: "MICRO", motorista: "CRISTIANO" },
  { prefixo: "101321", cliente: "81 MULLER", tipo: "ÔNIBUS", motorista: "" },
  { prefixo: "101318", cliente: "JEEP", tipo: "ÔNIBUS", motorista: "JARDI SON MARCOS / PEDRO LINS OSCAR" },
  { prefixo: "101344", cliente: "JEEP", tipo: "ÔNIBUS", motorista: "JAMILSON / HUMBERTO" },
  { prefixo: "101240", cliente: "JEEP", tipo: "ÔNIBUS", motorista: "PAULO CÉZAR/ OSVALDO/JOSÉ JOVI" },
  { prefixo: "101248", cliente: "OMSP", tipo: "ÔNIBUS", motorista: "LUCIANO XAVIER / CHARLES FABIANO" },
  { prefixo: "101250", cliente: "JEEP", tipo: "ÔNIBUS", motorista: "GILBERTO / WILSON OLIVEIRA" },
  { prefixo: "101252", cliente: "JEEP", tipo: "ÔNIBUS", motorista: "CARLOS DOS ANJOS / ALCIDES FILHO" },
  { prefixo: "101256", cliente: "JEEP", tipo: "ÔNIBUS", motorista: "VICENTE / EDNALDO BARBOSA" },
  { prefixo: "101310", cliente: "RESERVA", tipo: "ÔNIBUS", motorista: "" },
  { prefixo: "101320", cliente: "RESERVA", tipo: "ÔNIBUS", motorista: "" },
  { prefixo: "101716", cliente: "JEEP", tipo: "ÔNIBUS", motorista: "" },
  { prefixo: "102010", cliente: "MERCADO LIVRE", tipo: "ÔNIBUS", motorista: "PAULO D ALHO GREYDSON" },
  { prefixo: "102012", cliente: "MERCADO LIVRE", tipo: "ÔNIBUS", motorista: "WILSON J P CH SOLANO ALEXANDRE" },
  { prefixo: "102102", cliente: "CBA", tipo: "ÔNIBUS", motorista: "PETRÔNIO / JAELSON" },
  { prefixo: "101504", cliente: "JEEP", tipo: "ÔNIBUS", motorista: "PAULO SÉRGIO SOARES BARBOSA" },
  { prefixo: "102204", cliente: "PIACENTINI", tipo: "ÔNIBUS", motorista: "" },
  { prefixo: "102206", cliente: "CCO RESORT", tipo: "ÔNIBUS", motorista: "JOÃO G WELLINGTON ANDRADE" },
  { prefixo: "102208", cliente: "PIACENTINI", tipo: "ÔNIBUS", motorista: "JAILSON P H A PAULISTA MARCOS" },
  { prefixo: "102208", cliente: "PIACENTINI", tipo: "ÔNIBUS", motorista: "JOSÉ RENATO" },
  { prefixo: "102210", cliente: "CONRAD", tipo: "ÔNIBUS", motorista: "JOÃO SARAIVA/ODSON" },
  { prefixo: "102212", cliente: "MERCADO LIVRE", tipo: "ÔNIBUS", motorista: "JOÃO P CARLOS ALESSANDRO ELDER" },
  { prefixo: "102304", cliente: "CONRAD", tipo: "ÔNIBUS", motorista: "JAILSON JOÃO" },
  { prefixo: "102306", cliente: "JEEP", tipo: "ÔNIBUS", motorista: "AUGUSTO / NICOLA ADENILSON" },
  { prefixo: "102308", cliente: "RESERVA", tipo: "ÔNIBUS", motorista: "" },
  { prefixo: "102310", cliente: "VIVA+SOLAR", tipo: "ÔNIBUS", motorista: "WALMIR HENRIQUE / GENIVAL BATISTA" },
  { prefixo: "102602", cliente: "ACHE", tipo: "ÔNIBUS", motorista: "EDSTON" },
  { prefixo: "102604", cliente: "CBA", tipo: "ÔNIBUS", motorista: "RODOGUEIRO LUIS" },
  { prefixo: "102606", cliente: "JEEP", tipo: "ÔNIBUS", motorista: "LUCIANO" },
  { prefixo: "102608", cliente: "81 MULLER", tipo: "ÔNIBUS", motorista: "SANDRO SEVERINO" },
  { prefixo: "102610", cliente: "ACHE", tipo: "ÔNIBUS", motorista: "EDVALDO" },
  { prefixo: "102612", cliente: "JEEP", tipo: "ÔNIBUS", motorista: "PAULO LOPES / LINO ALVES" },
  { prefixo: "102614", cliente: "AMCON", tipo: "ÔNIBUS", motorista: "CARLOS FABIANO / CARLOS HENRIQUE" },
  { prefixo: "102616", cliente: "JEEP", tipo: "ÔNIBUS", motorista: "PETRONIO" },
  { prefixo: "102618", cliente: "AMCON", tipo: "ÔNIBUS", motorista: "GERSONARIO" },
  { prefixo: "102620", cliente: "TECON", tipo: "ÔNIBUS", motorista: "JOSÉ APARECIDO CARLOS / (FOLGUISTA)" },
  { prefixo: "121914", cliente: "RETIDO", tipo: "ÔNIBUS", motorista: "RETIDO" },
  { prefixo: "121015", cliente: "HDH", tipo: "ÔNIBUS", motorista: "LEANDRO MARQUES / ANTÔNIO RODRIGUES" },
  { prefixo: "121910", cliente: "JEEP", tipo: "ÔNIBUS", motorista: "LINO ALVES / JOAQUIM" },
  { prefixo: "121302", cliente: "VILA GALÉ", tipo: "ÔNIBUS", motorista: "SEVERINO GUEDES" },
  { prefixo: "121604", cliente: "CONRAD", tipo: "ÔNIBUS", motorista: "JOÃO SOUZA DE ALENIO" },
  { prefixo: "121602", cliente: "CONRAD", tipo: "ÔNIBUS", motorista: "KLÉBSON" },
  { prefixo: "121604", cliente: "MERCADO LIVRE", tipo: "ÔNIBUS", motorista: "ANTÔNIO" },
  { prefixo: "121608", cliente: "CBA", tipo: "ÔNIBUS", motorista: "OZIVAJ / EDNALDO P" },
  { prefixo: "121802", cliente: "JEEP", tipo: "ÔNIBUS", motorista: "PAULO HENRIQUE DIAS GERSON" },
  { prefixo: "121804", cliente: "JEEP", tipo: "ÔNIBUS", motorista: "ANTÔNIO JOSÉ GOMES / CARLOS EDUARDO" },
  { prefixo: "121806", cliente: "JEEP", tipo: "ÔNIBUS", motorista: "ADRIANO / LOURENÇO/HELIO" },
  { prefixo: "121808", cliente: "RESERVA", tipo: "ÔNIBUS", motorista: "" },
  { prefixo: "121810", cliente: "JEEP", tipo: "ÔNIBUS", motorista: "IRAJACY / JAILSON CARVALHO" },
  { prefixo: "121812", cliente: "JEEP", tipo: "ÔNIBUS", motorista: "WILSON OLIVEIRA / TIAGO ALVES" },
  { prefixo: "121814", cliente: "JEEP", tipo: "ÔNIBUS", motorista: "TIAGO JORGE" },
  { prefixo: "121816", cliente: "JEEP", tipo: "ÔNIBUS", motorista: "FLINIO / VALÉRIO" },
  { prefixo: "121818", cliente: "JEEP", tipo: "ÔNIBUS", motorista: "WDA" },
  { prefixo: "121916", cliente: "JEEP", tipo: "ÔNIBUS", motorista: "NILDO" },
  { prefixo: "121922", cliente: "RESERVA", tipo: "ÔNIBUS", motorista: "" },
  { prefixo: "121924", cliente: "JEEP", tipo: "ÔNIBUS", motorista: "MARCOS LIRA/ JAILSON CARVALHO" },
  { prefixo: "121926", cliente: "JEEP", tipo: "ÔNIBUS", motorista: "CARLOS FABRIANO ERIVALDO / LINO ALVES" },
  { prefixo: "121930", cliente: "JEEP", tipo: "ÔNIBUS", motorista: "JAELSON" },
  { prefixo: "121932", cliente: "CBA", tipo: "ÔNIBUS", motorista: "IRANILDO ALVES DE OLIVEIRA/ANTON" },
  { prefixo: "121934", cliente: "CBA", tipo: "ÔNIBUS", motorista: "NEILSON MARIANO" },
  { prefixo: "121940", cliente: "JEEP", tipo: "ÔNIBUS", motorista: "RUILIAM MARCOS PAULO JULIU NACIMENTO" },
  { prefixo: "121942", cliente: "JEEP", tipo: "ÔNIBUS", motorista: "JOSE MARCOS" },
  { prefixo: "121632", cliente: "CBA", tipo: "ÔNIBUS", motorista: "MARCOS LIRA / LINO ANTON" },
  { prefixo: "121934", cliente: "JEEP", tipo: "ÔNIBUS", motorista: "SÉRGIO GOMES" },
  { prefixo: "121936", cliente: "JEEP", tipo: "ÔNIBUS", motorista: "ERIVALDO SÉRGIO JOSÉ / EDWIN SON" },
  { prefixo: "121938", cliente: "JEEP", tipo: "ÔNIBUS", motorista: "IVANILDO" },
  { prefixo: "122110", cliente: "JEEP", tipo: "ÔNIBUS", motorista: "PAULO NACIMENTO / GEORGE" },
  { prefixo: "122112", cliente: "VIVA+SOLAR", tipo: "ÔNIBUS", motorista: "GENIVAL / BATISTA / WILSON LISMAR" },
  { prefixo: "122214", cliente: "ACHE", tipo: "ÔNIBUS", motorista: "SEVERINO OLIVEIRA RAFAEL SILVANO" },
  { prefixo: "122414", cliente: "ACHE", tipo: "ÔNIBUS", motorista: "SEVERINO OLIVEIRA RAFAEL SILVANO" },
  { prefixo: "122418", cliente: "VIVA+SOLAR", tipo: "ÔNIBUS", motorista: "MACGARED / GENIVA / BATISTA" },
  { prefixo: "122418", cliente: "VIVA+SOLAR", tipo: "ÔNIBUS", motorista: "EDVALDO SANTOS / GENIVAL FERREIRA" },
  { prefixo: "122420", cliente: "TECON", tipo: "ÔNIBUS", motorista: "CARLOS / SÉRGIO LUIS" },
  { prefixo: "122422", cliente: "TECON", tipo: "ÔNIBUS", motorista: "MAURÍCIO / ERIVALDO FEIJO" },
  { prefixo: "122602", cliente: "MERCADO LIVRE", tipo: "ÔNIBUS", motorista: "MARCILIO FELIPE" },
  { prefixo: "122604", cliente: "MERCADO LIVRE", tipo: "ÔNIBUS", motorista: "VALMIR MAGALHÃES" },
  { prefixo: "151002", cliente: "JCPM", tipo: "ÔNIBUS", motorista: "JOÃO SIMÃO" }
];

// Dados de exemplo de saídas
const saidasData = [
  { id: 1, data: "2024-08-01", hora: "06:50", monitor: "IRANILDO", veiculo: "101256", km_entrada: 693473, motorista: "VICENTE", cliente: "JEEP", tipo: "ÔNIBUS", local_saida: "PAULISTA", recife: 54, muribeca: 74, paulista: 26, observacoes: "" },
  { id: 2, data: "2024-08-01", hora: "07:15", monitor: "IRANILDO", veiculo: "121910", km_entrada: 566555, motorista: "JOSE MARCOS", cliente: "JEEP", tipo: "ÔNIBUS", local_saida: "AGUA FRIA", recife: 20, muribeca: 40, paulista: 24, observacoes: "" },
  { id: 3, data: "2024-08-01", hora: "15:55", monitor: "IRANILDO", veiculo: "121934", km_entrada: 543067, motorista: "CARLOS EDUARDO", cliente: "JEEP", tipo: "ÔNIBUS", local_saida: "PAULISTA", recife: 54, muribeca: 74, paulista: 26, observacoes: "" },
  { id: 4, data: "2024-08-01", hora: "20:20", monitor: "ANDERSON", veiculo: "101320", km_entrada: 610023, motorista: "EMERSON LOURENÇO", cliente: "JEEP", tipo: "ÔNIBUS", local_saida: "GOIANA", recife: 120, muribeca: 140, paulista: 88, observacoes: "PORTA" },
  { id: 5, data: "2024-08-01", hora: "23:53", monitor: "ANDERSON", veiculo: "101318", km_entrada: 625127, motorista: "PEDRO LINS", cliente: "JEEP", tipo: "ÔNIBUS", local_saida: "GOIANA", recife: 120, muribeca: 140, paulista: 88, observacoes: "AR-CONDICIONADO" },
];

const ControleSaidas = () => {
  const [saidas, setSaidas] = useState(saidasData);
  const [filtros, setFiltros] = useState({
    dataInicio: '',
    dataFim: '',
    monitor: '',
    veiculo: '',
    motorista: '',
    cliente: '',
    local_saida: '',
    observacoes: ''
  });
  const [filtrosExpandidos, setFiltrosExpandidos] = useState(true);
  const [modalAberto, setModalAberto] = useState(false);
  const [modalVisualizacao, setModalVisualizacao] = useState(false);
  const [modalEdicao, setModalEdicao] = useState(false);
  const [modalExclusao, setModalExclusao] = useState(false);
  const [saidaSelecionada, setSaidaSelecionada] = useState(null);
  const [novaSaida, setNovaSaida] = useState({
    data: '',
    hora: '',
    monitor: '',
    veiculo: '',
    km_entrada: '',
    motorista: '',
    cliente: '',
    tipo: '',
    local_saida: '',
    recife: '',
    muribeca: '',
    paulista: '',
    observacoes: ''
  });

  // Extrair valores únicos para os dropdowns
  const monitoresUnicos = [...new Set(saidasData.map(s => s.monitor))].sort();
  const veiculosUnicos = [...new Set(frotaData.map(v => v.prefixo))].sort();
  const motoristasUnicos = [...new Set(frotaData.filter(v => v.motorista).map(v => v.motorista))].sort();
  const clientesUnicos = [...new Set(frotaData.map(v => v.cliente))].sort();
  const tiposUnicos = [...new Set(frotaData.map(v => v.tipo))].sort();
  const locaisSaidaUnicos = [...new Set(saidasData.map(s => s.local_saida))].sort();

  const handleFiltroChange = (campo, valor) => {
    setFiltros(prev => ({ ...prev, [campo]: valor }));
  };

  const limparFiltros = () => {
    setFiltros({
      dataInicio: '',
      dataFim: '',
      monitor: '',
      veiculo: '',
      motorista: '',
      cliente: '',
      local_saida: '',
      observacoes: ''
    });
  };

  const aplicarFiltros = () => {
    let resultados = saidasData;

    // Filtro por data
    if (filtros.dataInicio) {
      resultados = resultados.filter(s => s.data >= filtros.dataInicio);
    }
    if (filtros.dataFim) {
      resultados = resultados.filter(s => s.data <= filtros.dataFim);
    }

    // Filtros por campos exatos
    if (filtros.monitor) {
      resultados = resultados.filter(s => s.monitor === filtros.monitor);
    }
    if (filtros.veiculo) {
      resultados = resultados.filter(s => s.veiculo === filtros.veiculo);
    }
    if (filtros.motorista) {
      resultados = resultados.filter(s => s.motorista === filtros.motorista);
    }
    if (filtros.cliente) {
      resultados = resultados.filter(s => s.cliente === filtros.cliente);
    }
    if (filtros.local_saida) {
      resultados = resultados.filter(s => s.local_saida === filtros.local_saida);
    }

    // Filtro por observações (busca parcial)
    if (filtros.observacoes) {
      resultados = resultados.filter(s => 
        s.observacoes.toLowerCase().includes(filtros.observacoes.toLowerCase())
      );
    }

    setSaidas(resultados);
  };

  const filtrosAtivos = Object.values(filtros).some(v => v !== '');

  const handleNovaSaidaChange = (campo, valor) => {
    setNovaSaida(prev => ({ ...prev, [campo]: valor }));
    
    // Quando selecionar um veículo, preencher automaticamente motorista, cliente e tipo
    if (campo === 'veiculo') {
      const veiculoInfo = frotaData.find(v => v.prefixo === valor);
      if (veiculoInfo) {
        setNovaSaida(prev => ({
          ...prev,
          veiculo: valor,
          motorista: veiculoInfo.motorista || '',
          cliente: veiculoInfo.cliente || '',
          tipo: veiculoInfo.tipo || ''
        }));
      }
    }
  };

  const salvarNovaSaida = () => {
    const novoId = Math.max(...saidasData.map(s => s.id)) + 1;
    const saidaCompleta = {
      ...novaSaida,
      id: novoId,
      km_entrada: parseInt(novaSaida.km_entrada) || 0,
      recife: parseInt(novaSaida.recife) || 0,
      muribeca: parseInt(novaSaida.muribeca) || 0,
      paulista: parseInt(novaSaida.paulista) || 0
    };
    
    saidasData.push(saidaCompleta);
    setSaidas([...saidasData]);
    setModalAberto(false);
    setNovaSaida({
      data: '',
      hora: '',
      monitor: '',
      veiculo: '',
      km_entrada: '',
      motorista: '',
      cliente: '',
      tipo: '',
      local_saida: '',
      recife: '',
      muribeca: '',
      paulista: '',
      observacoes: ''
    });
  };

  const abrirVisualizacao = (saida) => {
    setSaidaSelecionada(saida);
    setModalVisualizacao(true);
  };

  const abrirEdicao = (saida) => {
    setSaidaSelecionada(saida);
    setNovaSaida({
      data: saida.data,
      hora: saida.hora,
      monitor: saida.monitor,
      veiculo: saida.veiculo,
      km_entrada: saida.km_entrada.toString(),
      motorista: saida.motorista,
      cliente: saida.cliente,
      local_saida: saida.local_saida,
      recife: saida.recife.toString(),
      muribeca: saida.muribeca.toString(),
      paulista: saida.paulista.toString(),
      observacoes: saida.observacoes
    });
    setModalEdicao(true);
  };

  const salvarEdicao = () => {
    const index = saidasData.findIndex(s => s.id === saidaSelecionada.id);
    if (index !== -1) {
      saidasData[index] = {
        ...saidaSelecionada,
        ...novaSaida,
        km_entrada: parseInt(novaSaida.km_entrada) || 0,
        recife: parseInt(novaSaida.recife) || 0,
        muribeca: parseInt(novaSaida.muribeca) || 0,
        paulista: parseInt(novaSaida.paulista) || 0
      };
      setSaidas([...saidasData]);
    }
    setModalEdicao(false);
    setSaidaSelecionada(null);
    setNovaSaida({
      data: '',
      hora: '',
      monitor: '',
      veiculo: '',
      km_entrada: '',
      motorista: '',
      cliente: '',
      local_saida: '',
      recife: '',
      muribeca: '',
      paulista: '',
      observacoes: ''
    });
  };

  const abrirExclusao = (saida) => {
    setSaidaSelecionada(saida);
    setModalExclusao(true);
  };

  const confirmarExclusao = () => {
    const index = saidasData.findIndex(s => s.id === saidaSelecionada.id);
    if (index !== -1) {
      saidasData.splice(index, 1);
      setSaidas([...saidasData]);
    }
    setModalExclusao(false);
    setSaidaSelecionada(null);
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Controle de Saídas</h1>
            <p className="text-gray-500 mt-2">Gerenciamento de ocorrências e saídas de veículos</p>
          </div>
          <div className="flex gap-3">
            <button 
              onClick={() => setModalAberto(true)}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus className="w-5 h-5" />
              Adicionar Saída
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
              <Download className="w-5 h-5" />
              Exportar
            </button>
          </div>
        </div>
      </div>

      {/* Estatísticas */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-blue-600">
          <p className="text-sm text-gray-600">Total de Saídas</p>
          <p className="text-2xl font-bold text-gray-800">{saidas.length}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-green-600">
          <p className="text-sm text-gray-600">Veículos Únicos</p>
          <p className="text-2xl font-bold text-green-600">{new Set(saidas.map(s => s.veiculo)).size}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-purple-600">
          <p className="text-sm text-gray-600">Clientes</p>
          <p className="text-2xl font-bold text-purple-600">{new Set(saidas.map(s => s.cliente)).size}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-orange-600">
          <p className="text-sm text-gray-600">KM Total</p>
          <p className="text-2xl font-bold text-orange-600">
            {saidas.reduce((acc, s) => acc + (s.recife + s.muribeca + s.paulista), 0).toLocaleString()}
          </p>
        </div>
      </div>

      {/* Painel de Filtros */}
      <div className="bg-white rounded-xl shadow-sm border mb-8">
        <div 
          className="p-6 cursor-pointer hover:bg-gray-50 transition-colors"
          onClick={() => setFiltrosExpandidos(!filtrosExpandidos)}
        >
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <Filter className="w-5 h-5 text-gray-600" />
              <h2 className="text-lg font-semibold text-gray-800">Filtros</h2>
              {filtrosAtivos && (
                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                  Filtros ativos
                </span>
              )}
            </div>
            {filtrosExpandidos ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
          </div>
        </div>

        {filtrosExpandidos && (
          <div className="px-6 pb-6 border-t">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
              {/* Filtro Data Início */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Data Início
                </label>
                <input
                  type="date"
                  value={filtros.dataInicio}
                  onChange={(e) => handleFiltroChange('dataInicio', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Filtro Data Fim */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Data Fim
                </label>
                <input
                  type="date"
                  value={filtros.dataFim}
                  onChange={(e) => handleFiltroChange('dataFim', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Filtro Monitor */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Monitor
                </label>
                <select
                  value={filtros.monitor}
                  onChange={(e) => handleFiltroChange('monitor', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Todos</option>
                  {monitoresUnicos.map(m => (
                    <option key={m} value={m}>{m}</option>
                  ))}
                </select>
              </div>

              {/* Filtro Veículo */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                  <Truck className="w-4 h-4" />
                  Veículo
                </label>
                <select
                  value={filtros.veiculo}
                  onChange={(e) => handleFiltroChange('veiculo', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Todos</option>
                  {veiculosUnicos.map(v => (
                    <option key={v} value={v}>{v}</option>
                  ))}
                </select>
              </div>

              {/* Filtro Motorista */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Motorista
                </label>
                <select
                  value={filtros.motorista}
                  onChange={(e) => handleFiltroChange('motorista', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Todos</option>
                  {motoristasUnicos.map(m => (
                    <option key={m} value={m}>{m}</option>
                  ))}
                </select>
              </div>

              {/* Filtro Cliente */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                  <Building2 className="w-4 h-4" />
                  Cliente
                </label>
                <select
                  value={filtros.cliente}
                  onChange={(e) => handleFiltroChange('cliente', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Todos</option>
                  {clientesUnicos.map(c => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              {/* Filtro Local de Saída */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  Local de Saída
                </label>
                <select
                  value={filtros.local_saida}
                  onChange={(e) => handleFiltroChange('local_saida', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Todos</option>
                  {locaisSaidaUnicos.map(l => (
                    <option key={l} value={l}>{l}</option>
                  ))}
                </select>
              </div>

              {/* Filtro Observações */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  Observações
                </label>
                <input
                  type="text"
                  value={filtros.observacoes}
                  onChange={(e) => handleFiltroChange('observacoes', e.target.value)}
                  placeholder="Buscar nas observações..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Botões de Ação */}
            <div className="flex gap-3 mt-6">
              <button
                onClick={aplicarFiltros}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
              >
                <Search className="w-4 h-4" />
                Aplicar Filtros
              </button>
              {filtrosAtivos && (
                <button
                  onClick={limparFiltros}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors flex items-center gap-2"
                >
                  <X className="w-4 h-4" />
                  Limpar
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Tabela de Resultados */}
      <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Data</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hora</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Monitor</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Veículo</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">KM</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Motorista</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cliente</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Local Saída</th>
                <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Recife</th>
                <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Muribeca</th>
                <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Paulista</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Observações</th>
                <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {saidas.map((saida) => (
                <tr key={saida.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                    {new Date(saida.data).toLocaleDateString('pt-BR')}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">{saida.hora}</td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{saida.monitor}</td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-bold">
                      {saida.veiculo}
                    </span>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-600">
                    {saida.km_entrada.toLocaleString()}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">{saida.motorista}</td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-xs font-medium">
                      {saida.cliente}
                    </span>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">{saida.local_saida}</td>
                  <td className="px-4 py-4 whitespace-nowrap text-center text-sm text-gray-600">{saida.recife}</td>
                  <td className="px-4 py-4 whitespace-nowrap text-center text-sm text-gray-600">{saida.muribeca}</td>
                  <td className="px-4 py-4 whitespace-nowrap text-center text-sm text-gray-600">{saida.paulista}</td>
                  <td className="px-4 py-4 text-sm text-gray-600 max-w-xs">
                    {saida.observacoes ? (
                      <span className="italic">{saida.observacoes}</span>
                    ) : (
                      <span className="text-gray-400">-</span>
                    )}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() => abrirVisualizacao(saida)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Visualizar"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => abrirEdicao(saida)}
                        className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                        title="Editar"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => abrirExclusao(saida)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Excluir"
                      >
                        <Trash className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {saidas.length === 0 && (
          <div className="text-center py-12">
            <Search className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">Nenhuma saída encontrada com os filtros aplicados</p>
          </div>
        )}
      </div>

      {/* Modal Adicionar Nova Saída */}
      {modalAberto && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            {/* Header do Modal */}
            <div className="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold text-gray-800">Adicionar Nova Saída</h2>
                <p className="text-sm text-gray-500 mt-1">Preencha os dados da saída do veículo</p>
              </div>
              <button
                onClick={() => setModalAberto(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-6 h-6 text-gray-600" />
              </button>
            </div>

            {/* Formulário */}
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Data */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-blue-600" />
                    Data *
                  </label>
                  <input
                    type="date"
                    value={novaSaida.data}
                    onChange={(e) => handleNovaSaidaChange('data', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>

                {/* Hora */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                    <Clock className="w-4 h-4 text-blue-600" />
                    Hora *
                  </label>
                  <input
                    type="time"
                    value={novaSaida.hora}
                    onChange={(e) => handleNovaSaidaChange('hora', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>

                {/* Monitor */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                    <User className="w-4 h-4 text-blue-600" />
                    Monitor *
                  </label>
                  <input
                    type="text"
                    value={novaSaida.monitor}
                    onChange={(e) => handleNovaSaidaChange('monitor', e.target.value.toUpperCase())}
                    placeholder="Nome do monitor"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>

                {/* Veículo */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                    <Truck className="w-4 h-4 text-blue-600" />
                    Veículo *
                  </label>
                  <input
                    type="text"
                    value={novaSaida.veiculo}
                    onChange={(e) => handleNovaSaidaChange('veiculo', e.target.value)}
                    placeholder="Número do veículo"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>

                {/* KM Entrada */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-blue-600" />
                    KM Entrada *
                  </label>
                  <input
                    type="number"
                    value={novaSaida.km_entrada}
                    onChange={(e) => handleNovaSaidaChange('km_entrada', e.target.value)}
                    placeholder="Quilometragem"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>

                {/* Motorista */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                    <User className="w-4 h-4 text-blue-600" />
                    Motorista *
                  </label>
                  <input
                    type="text"
                    value={novaSaida.motorista}
                    onChange={(e) => handleNovaSaidaChange('motorista', e.target.value.toUpperCase())}
                    placeholder="Nome do motorista"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>

                {/* Cliente */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-blue-600" />
                    Cliente *
                  </label>
                  <input
                    type="text"
                    value={novaSaida.cliente}
                    onChange={(e) => handleNovaSaidaChange('cliente', e.target.value.toUpperCase())}
                    placeholder="Nome do cliente"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>

                {/* Local de Saída */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-blue-600" />
                    Local de Saída *
                  </label>
                  <input
                    type="text"
                    value={novaSaida.local_saida}
                    onChange={(e) => handleNovaSaidaChange('local_saida', e.target.value.toUpperCase())}
                    placeholder="Local"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>

                {/* Distância Recife */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    KM Recife
                  </label>
                  <input
                    type="number"
                    value={novaSaida.recife}
                    onChange={(e) => handleNovaSaidaChange('recife', e.target.value)}
                    placeholder="Distância"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                {/* Distância Muribeca */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    KM Muribeca
                  </label>
                  <input
                    type="number"
                    value={novaSaida.muribeca}
                    onChange={(e) => handleNovaSaidaChange('muribeca', e.target.value)}
                    placeholder="Distância"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                {/* Distância Paulista */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    KM Paulista
                  </label>
                  <input
                    type="number"
                    value={novaSaida.paulista}
                    onChange={(e) => handleNovaSaidaChange('paulista', e.target.value)}
                    placeholder="Distância"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                {/* Observações */}
                <div className="md:col-span-2 lg:col-span-3">
                  <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                    <FileText className="w-4 h-4 text-blue-600" />
                    Observações
                  </label>
                  <textarea
                    value={novaSaida.observacoes}
                    onChange={(e) => handleNovaSaidaChange('observacoes', e.target.value.toUpperCase())}
                    placeholder="Observações sobre a saída (opcional)"
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  />
                </div>
              </div>

              {/* Botões */}
              <div className="flex gap-3 mt-8 pt-6 border-t">
                <button
                  onClick={() => setModalAberto(false)}
                  className="flex-1 px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium"
                >
                  Cancelar
                </button>
                <button
                  onClick={salvarNovaSaida}
                  className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center justify-center gap-2"
                >
                  <Plus className="w-5 h-5" />
                  Adicionar Saída
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal Visualizar Saída */}
      {modalVisualizacao && saidaSelecionada && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            {/* Header do Modal */}
            <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-4 flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold">Detalhes da Saída</h2>
                <p className="text-blue-100 text-sm mt-1">Veículo {saidaSelecionada.veiculo}</p>
              </div>
              <button
                onClick={() => setModalVisualizacao(false)}
                className="p-2 hover:bg-blue-800 rounded-lg transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Conteúdo */}
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center gap-2 text-gray-600 mb-2">
                    <Calendar className="w-4 h-4" />
                    <span className="text-sm font-medium">Data</span>
                  </div>
                  <p className="text-lg font-semibold text-gray-800">
                    {new Date(saidaSelecionada.data).toLocaleDateString('pt-BR')}
                  </p>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center gap-2 text-gray-600 mb-2">
                    <Clock className="w-4 h-4" />
                    <span className="text-sm font-medium">Hora</span>
                  </div>
                  <p className="text-lg font-semibold text-gray-800">{saidaSelecionada.hora}</p>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center gap-2 text-gray-600 mb-2">
                    <User className="w-4 h-4" />
                    <span className="text-sm font-medium">Monitor</span>
                  </div>
                  <p className="text-lg font-semibold text-gray-800">{saidaSelecionada.monitor}</p>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center gap-2 text-gray-600 mb-2">
                    <Truck className="w-4 h-4" />
                    <span className="text-sm font-medium">Veículo</span>
                  </div>
                  <p className="text-lg font-semibold text-blue-600">{saidaSelecionada.veiculo}</p>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center gap-2 text-gray-600 mb-2">
                    <MapPin className="w-4 h-4" />
                    <span className="text-sm font-medium">KM Entrada</span>
                  </div>
                  <p className="text-lg font-semibold text-gray-800">
                    {saidaSelecionada.km_entrada.toLocaleString()}
                  </p>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center gap-2 text-gray-600 mb-2">
                    <User className="w-4 h-4" />
                    <span className="text-sm font-medium">Motorista</span>
                  </div>
                  <p className="text-lg font-semibold text-gray-800">{saidaSelecionada.motorista}</p>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center gap-2 text-gray-600 mb-2">
                    <Building2 className="w-4 h-4" />
                    <span className="text-sm font-medium">Cliente</span>
                  </div>
                  <p className="text-lg font-semibold text-purple-600">{saidaSelecionada.cliente}</p>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center gap-2 text-gray-600 mb-2">
                    <MapPin className="w-4 h-4" />
                    <span className="text-sm font-medium">Local de Saída</span>
                  </div>
                  <p className="text-lg font-semibold text-gray-800">{saidaSelecionada.local_saida}</p>
                </div>
              </div>

              {/* Distâncias */}
              <div className="mt-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Distâncias (KM)</h3>
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-blue-50 p-4 rounded-lg text-center">
                    <p className="text-sm text-gray-600 mb-1">Recife</p>
                    <p className="text-2xl font-bold text-blue-600">{saidaSelecionada.recife}</p>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg text-center">
                    <p className="text-sm text-gray-600 mb-1">Muribeca</p>
                    <p className="text-2xl font-bold text-green-600">{saidaSelecionada.muribeca}</p>
                  </div>
                  <div className="bg-orange-50 p-4 rounded-lg text-center">
                    <p className="text-sm text-gray-600 mb-1">Paulista</p>
                    <p className="text-2xl font-bold text-orange-600">{saidaSelecionada.paulista}</p>
                  </div>
                </div>
              </div>

              {/* Observações */}
              {saidaSelecionada.observacoes && (
                <div className="mt-6 bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
                  <div className="flex items-center gap-2 text-yellow-800 mb-2">
                    <FileText className="w-4 h-4" />
                    <span className="text-sm font-medium">Observações</span>
                  </div>
                  <p className="text-gray-700">{saidaSelecionada.observacoes}</p>
                </div>
              )}

              <button
                onClick={() => setModalVisualizacao(false)}
                className="w-full mt-6 px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Editar Saída */}
      {modalEdicao && saidaSelecionada && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            {/* Header do Modal */}
            <div className="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold text-gray-800">Editar Saída</h2>
                <p className="text-sm text-gray-500 mt-1">Atualize os dados da saída</p>
              </div>
              <button
                onClick={() => {
                  setModalEdicao(false);
                  setSaidaSelecionada(null);
                }}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-6 h-6 text-gray-600" />
              </button>
            </div>

            {/* Formulário - mesmo do adicionar */}
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Data */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-green-600" />
                    Data *
                  </label>
                  <input
                    type="date"
                    value={novaSaida.data}
                    onChange={(e) => handleNovaSaidaChange('data', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    required
                  />
                </div>

                {/* Hora */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                    <Clock className="w-4 h-4 text-green-600" />
                    Hora *
                  </label>
                  <input
                    type="time"
                    value={novaSaida.hora}
                    onChange={(e) => handleNovaSaidaChange('hora', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    required
                  />
                </div>

                {/* Monitor */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                    <User className="w-4 h-4 text-green-600" />
                    Monitor *
                  </label>
                  <input
                    type="text"
                    value={novaSaida.monitor}
                    onChange={(e) => handleNovaSaidaChange('monitor', e.target.value.toUpperCase())}
                    placeholder="Nome do monitor"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    required
                  />
                </div>

                {/* Veículo */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                    <Truck className="w-4 h-4 text-green-600" />
                    Veículo *
                  </label>
                  <input
                    type="text"
                    value={novaSaida.veiculo}
                    onChange={(e) => handleNovaSaidaChange('veiculo', e.target.value)}
                    placeholder="Número do veículo"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    required
                  />
                </div>

                {/* KM Entrada */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-green-600" />
                    KM Entrada *
                  </label>
                  <input
                    type="number"
                    value={novaSaida.km_entrada}
                    onChange={(e) => handleNovaSaidaChange('km_entrada', e.target.value)}
                    placeholder="Quilometragem"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    required
                  />
                </div>

                {/* Motorista */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                    <User className="w-4 h-4 text-green-600" />
                    Motorista *
                  </label>
                  <input
                    type="text"
                    value={novaSaida.motorista}
                    onChange={(e) => handleNovaSaidaChange('motorista', e.target.value.toUpperCase())}
                    placeholder="Nome do motorista"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    required
                  />
                </div>

                {/* Cliente */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-green-600" />
                    Cliente *
                  </label>
                  <input
                    type="text"
                    value={novaSaida.cliente}
                    onChange={(e) => handleNovaSaidaChange('cliente', e.target.value.toUpperCase())}
                    placeholder="Nome do cliente"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    required
                  />
                </div>

                {/* Local de Saída */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-green-600" />
                    Local de Saída *
                  </label>
                  <input
                    type="text"
                    value={novaSaida.local_saida}
                    onChange={(e) => handleNovaSaidaChange('local_saida', e.target.value.toUpperCase())}
                    placeholder="Local"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    required
                  />
                </div>

                {/* Distância Recife */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    KM Recife
                  </label>
                  <input
                    type="number"
                    value={novaSaida.recife}
                    onChange={(e) => handleNovaSaidaChange('recife', e.target.value)}
                    placeholder="Distância"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>

                {/* Distância Muribeca */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    KM Muribeca
                  </label>
                  <input
                    type="number"
                    value={novaSaida.muribeca}
                    onChange={(e) => handleNovaSaidaChange('muribeca', e.target.value)}
                    placeholder="Distância"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>

                {/* Distância Paulista */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    KM Paulista
                  </label>
                  <input
                    type="number"
                    value={novaSaida.paulista}
                    onChange={(e) => handleNovaSaidaChange('paulista', e.target.value)}
                    placeholder="Distância"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>

                {/* Observações */}
                <div className="md:col-span-2 lg:col-span-3">
                  <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                    <FileText className="w-4 h-4 text-green-600" />
                    Observações
                  </label>
                  <textarea
                    value={novaSaida.observacoes}
                    onChange={(e) => handleNovaSaidaChange('observacoes', e.target.value.toUpperCase())}
                    placeholder="Observações sobre a saída (opcional)"
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
                  />
                </div>
              </div>

              {/* Botões */}
              <div className="flex gap-3 mt-8 pt-6 border-t">
                <button
                  onClick={() => {
                    setModalEdicao(false);
                    setSaidaSelecionada(null);
                  }}
                  className="flex-1 px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium"
                >
                  Cancelar
                </button>
                <button
                  onClick={salvarEdicao}
                  className="flex-1 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium flex items-center justify-center gap-2"
                >
                  <Edit className="w-5 h-5" />
                  Salvar Alterações
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal Confirmar Exclusão */}
      {modalExclusao && saidaSelecionada && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full">
            <div className="p-6">
              <div className="flex items-center justify-center w-12 h-12 bg-red-100 rounded-full mx-auto mb-4">
                <Trash className="w-6 h-6 text-red-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 text-center mb-2">Excluir Saída</h2>
              <p className="text-gray-600 text-center mb-6">
                Tem certeza que deseja excluir a saída do veículo <strong>{saidaSelecionada.veiculo}</strong> de <strong>{new Date(saidaSelecionada.data).toLocaleDateString('pt-BR')}</strong>?
              </p>
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
                <p className="text-sm text-yellow-800">
                  <strong>Atenção:</strong> Esta ação não pode ser desfeita!
                </p>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setModalExclusao(false);
                    setSaidaSelecionada(null);
                  }}
                  className="flex-1 px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium"
                >
                  Cancelar
                </button>
                <button
                  onClick={confirmarExclusao}
                  className="flex-1 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium flex items-center justify-center gap-2"
                >
                  <Trash className="w-5 h-5" />
                  Excluir
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ControleSaidas;
