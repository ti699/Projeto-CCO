/**
 * Utilitário para geração de relatórios formatados
 * Utilizado para exportação de relatórios de CCO por WhatsApp e Email
 */

/**
 * Formata uma data para o padrão brasileiro dd/mm/aaaa
 * @param {Date|string} data - Data a ser formatada
 * @returns {string} Data formatada
 */
export const formatarDataBR = (data) => {
  if (!data) return new Date().toLocaleDateString('pt-BR');
  const d = new Date(data);
  const dia = String(d.getDate()).padStart(2, '0');
  const mes = String(d.getMonth() + 1).padStart(2, '0');
  const ano = d.getFullYear();
  return `${dia}/${mes}/${ano}`;
};

/**
 * Gera um relatório de fechamento de plantão em formato texto
 * Pronto para envio por WhatsApp ou Email
 * 
 * @param {Array} ocorrencias - Array de objetos de ocorrência
 * @param {string} nomeMonitor - Nome do monitor responsável
 * @returns {string} Relatório formatado em texto
 */
export const gerarRelatorioTexto = (ocorrencias = [], nomeMonitor = 'Monitor') => {
  // Validação de entrada
  if (!Array.isArray(ocorrencias)) {
    ocorrencias = [];
  }

  const dataAtual = formatarDataBR(new Date());

  // ============================================
  // 1. CABEÇALHO
  // ============================================
  const cabecalho = `
╔════════════════════════════════════════════════════════════════╗
║      RELATÓRIO DE FECHAMENTO DE PLANTÃO - CCO ASTROTUR        ║
╚════════════════════════════════════════════════════════════════╝

📅 Data: ${dataAtual}
👤 Monitor: ${nomeMonitor}

`;

  // ============================================
  // 2. CÁLCULO DE INDICADORES
  // ============================================
  
  // Total de ocorrências
  const totalOcorrencias = ocorrencias.length;

  // Quantidade com atraso
  const ocorrenciasComAtraso = ocorrencias.filter(o => {
    return o.houve_atraso === 'sim' || 
           (o.tempo_atraso && parseInt(o.tempo_atraso) > 0);
  });
  const qtdComAtraso = ocorrenciasComAtraso.length;

  // Quantidade com troca de veículo
  const ocorrenciasComTroca = ocorrencias.filter(o => 
    o.houve_troca_veiculo === 'sim'
  );
  const qtdComTroca = ocorrenciasComTroca.length;

  // Quantidade pendente (não concluído)
  const ocorrenciasPendentes = ocorrencias.filter(o => 
    o.status !== 'concluido'
  );
  const qtdPendentes = ocorrenciasPendentes.length;

  const indicadores = `
┌────────────────────────────────────────────────────────────────┐
│                   INDICADORES DO TURNO                         │
└────────────────────────────────────────────────────────────────┘

📊 Total de Ocorrências: ${totalOcorrencias}
⏰ Ocorrências com Atraso: ${qtdComAtraso}
🚗 Trocas de Veículo: ${qtdComTroca}
❌ Pendências: ${qtdPendentes}

`;

  // ============================================
  // 3. OCORRÊNCIAS CRÍTICAS
  // ============================================
  
  // Combinar ocorrências com atraso E troca de veículo
  const ocorrenciasCriticas = ocorrencias.filter(o => 
    o.houve_atraso === 'sim' || 
    (o.tempo_atraso && parseInt(o.tempo_atraso) > 0) ||
    o.houve_troca_veiculo === 'sim'
  );

  let secaoCritica = '';
  
  if (ocorrenciasCriticas.length > 0) {
    secaoCritica = `
┌────────────────────────────────────────────────────────────────┐
│              OCORRÊNCIAS CRÍTICAS (⚠️ ATENÇÃO)                 │
└────────────────────────────────────────────────────────────────┘

`;

    ocorrenciasCriticas.forEach((ocorrencia, index) => {
      const numero = ocorrencia.numero_ocorrencia || 'N/A';
      const cliente = ocorrencia.cliente_nome || 'N/A';
      
      // Construir informação de veículo
      let infVeiculo = '';
      if (ocorrencia.houve_troca_veiculo === 'sim') {
        const placaOriginal = ocorrencia.veiculo_placa || 'N/A';
        const placaSubstituta = ocorrencia.veiculo_substituto_placa || 'N/A';
        infVeiculo = `${placaOriginal} ➡️ ${placaSubstituta}`;
      } else {
        infVeiculo = ocorrencia.veiculo_placa || 'N/A';
      }

      // Construir informação de atraso
      let infAtraso = 'N/A';
      if (ocorrencia.houve_atraso === 'sim' || 
          (ocorrencia.tempo_atraso && parseInt(ocorrencia.tempo_atraso) > 0)) {
        const tempoMin = ocorrencia.tempo_atraso || 0;
        infAtraso = `${tempoMin} minutos`;
      }

      const tipo = ocorrencia.tipo_ocorrencia || 'N/A';
      const status = ocorrencia.status || 'N/A';

      secaoCritica += `
${index + 1}. ${numero} - ${cliente}
   > Veículo: ${infVeiculo}
   > Motivo: ${tipo}
   > Atraso: ${infAtraso}
   > Status: ${status}
`;
    });

    secaoCritica += '\n';
  }

  // ============================================
  // 4. RESUMO GERAL
  // ============================================
  
  const resumoGeral = `
┌────────────────────────────────────────────────────────────────┐
│                    RESUMO GERAL DO DIA                         │
└────────────────────────────────────────────────────────────────┘

`;

  let listaResumo = '';
  ocorrencias.forEach((ocorrencia) => {
    const numero = ocorrencia.numero_ocorrencia || 'N/A';
    const cliente = ocorrencia.cliente_nome || 'N/A';
    const tipo = ocorrencia.tipo_ocorrencia || 'N/A';
    const status = ocorrencia.status || 'N/A';
    
    listaResumo += `• ${numero} (${cliente}): ${tipo} - ${status}\n`;
  });

  // Se não houver ocorrências
  if (ocorrencias.length === 0) {
    listaResumo = '✅ Nenhuma ocorrência registrada no turno.\n';
  }

  // ============================================
  // 5. PENDÊNCIAS
  // ============================================
  
  let secaoPendencias = '';
  
  if (ocorrenciasPendentes.length > 0) {
    secaoPendencias = `
┌────────────────────────────────────────────────────────────────┐
│                      ⚠️ PENDÊNCIAS                             │
└────────────────────────────────────────────────────────────────┘

As seguintes ocorrências ainda estão pendentes e requerem atenção:

`;

    ocorrenciasPendentes.forEach((ocorrencia) => {
      const numero = ocorrencia.numero_ocorrencia || 'N/A';
      secaoPendencias += `• ${numero}\n`;
    });

    secaoPendencias += `
⚡ Total: ${qtdPendentes} ocorrência(s) pendente(s)
Priorizar o fechamento destas ocorrências no próximo turno!

`;
  }

  // ============================================
  // RODAPÉ
  // ============================================
  
  const rodape = `
╔════════════════════════════════════════════════════════════════╗
║ Relatório gerado automaticamente pelo Sistema CCO - Astrotur   ║
║ Propriedade confidencial da empresa                           ║
╚════════════════════════════════════════════════════════════════╝
`;

  // ============================================
  // MONTAGEM FINAL
  // ============================================
  
  const relatorioCompleto = 
    cabecalho +
    indicadores +
    secaoCritica +
    resumoGeral +
    listaResumo +
    secaoPendencias +
    rodape;

  return relatorioCompleto;
};

/**
 * Gera um relatório em formato PDF (simulado em texto com estrutura)
 * @param {Array} ocorrencias - Array de objetos de ocorrência
 * @param {string} nomeMonitor - Nome do monitor responsável
 * @returns {object} Dados estruturados para PDF
 */
export const gerarRelatorioPDF = (ocorrencias = [], nomeMonitor = 'Monitor') => {
  if (!Array.isArray(ocorrencias)) {
    ocorrencias = [];
  }

  const dataAtual = formatarDataBR(new Date());

  // Cálculos
  const totalOcorrencias = ocorrencias.length;
  const qtdComAtraso = ocorrencias.filter(o => 
    o.houve_atraso === 'sim' || (o.tempo_atraso && parseInt(o.tempo_atraso) > 0)
  ).length;
  const qtdComTroca = ocorrencias.filter(o => 
    o.houve_troca_veiculo === 'sim'
  ).length;
  const qtdPendentes = ocorrencias.filter(o => 
    o.status !== 'concluido'
  ).length;

  return {
    titulo: 'RELATÓRIO DE FECHAMENTO DE PLANTÃO - CCO',
    data: dataAtual,
    monitor: nomeMonitor,
    empresa: 'Astrotur Transportes',
    logo: '', // URL da logo
    indicadores: {
      totalOcorrencias,
      qtdComAtraso,
      qtdComTroca,
      qtdPendentes
    },
    ocorrencias: ocorrencias.map(o => ({
      numero: o.numero_ocorrencia || 'N/A',
      cliente: o.cliente_nome || 'N/A',
      veiculo: o.veiculo_placa || 'N/A',
      veiculo_substituto: o.veiculo_substituto_placa || null,
      tipo: o.tipo_ocorrencia || 'N/A',
      descricao: o.descricao || '',
      atraso: o.tempo_atraso ? `${o.tempo_atraso} minutos` : 'Sem atraso',
      status: o.status || 'N/A'
    }))
  };
};

/**
 * Exporta relatório como texto para arquivo
 * @param {string} relatorioTexto - Texto do relatório
 * @param {string} nomeMonitor - Nome do monitor (para nome do arquivo)
 */
export const baixarRelatorioTexto = (relatorioTexto, nomeMonitor = 'relatorio') => {
  const dataAtual = new Date().toISOString().slice(0, 10);
  const nomeArquivo = `relatorio-${nomeMonitor}-${dataAtual}.txt`;
  
  const elemento = document.createElement('a');
  elemento.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(relatorioTexto));
  elemento.setAttribute('download', nomeArquivo);
  elemento.style.display = 'none';
  document.body.appendChild(elemento);
  elemento.click();
  document.body.removeChild(elemento);
};

export default {
  formatarDataBR,
  gerarRelatorioTexto,
  gerarRelatorioPDF,
  baixarRelatorioTexto
};
