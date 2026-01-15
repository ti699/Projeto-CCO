import React, { useState, useEffect } from 'react';
import { Bus, Plus, Search, Edit2, Trash2, Car, ChevronDown, ChevronUp, Building2, X, RefreshCw, ClipboardList, Calendar, TrendingUp, Eye } from 'lucide-react';
import ControleSaidas from './ControleSaidas';

// Histórico de trocas de veículos
const trocasVeiculos = [
  { seq: 1, carro_novo: "102544", substituto: "2544", cliente: "MERCADO LIVRE", observacoes: "2544 FOI PARA RESERVA" },
  { seq: 2, carro_novo: "102546", substituto: "102508", cliente: "51 MULLER", observacoes: "102508 FOI PARA CBA, SUBSTITUINDO O 121301" },
  { seq: 3, carro_novo: "102548", substituto: "956", cliente: "JEEP", observacoes: "956 VERSATILY" },
  { seq: 4, carro_novo: "102550", substituto: "101232", cliente: "JEEP", observacoes: "101232 FOI PARA RESERVA" },
  { seq: 5, carro_novo: "102552", substituto: "121506", cliente: "JEEP", observacoes: "121506 FOI PARA CONSAG" },
  { seq: 6, carro_novo: "102554", substituto: "122414", cliente: "ACHÉ", observacoes: "122414 SUBSTITUIU 121506 NA CONSAG" },
  { seq: 7, carro_novo: "102556", substituto: "101256", cliente: "MERCADO LIVRE", observacoes: "101256 FOI PARA RESERVA" },
  { seq: 8, carro_novo: "102558", substituto: "2544", cliente: "CBA", observacoes: "2544 FOI PARA RESERVA (MESMO DA SEQ 1)" },
  { seq: 9, carro_novo: "102560", substituto: "101236", cliente: "MERCADO LIVRE", observacoes: "101236 FOI PARA ALUGADO" },
  { seq: 10, carro_novo: "102562", substituto: "102016", cliente: "ACHÉ e MERCADO LIVRE", observacoes: "102016 FOI PARA RESERVA" }
];

const veiculosPorCliente = {
  "RETRO": [
    { prefixo: "956", tipo: "VAN", ano_fabricacao: 2003, ano_modelo: 2003, ar_condicionado: true, wc: false, assentos: 19, motorista: "CADU TURMA 3.0" },
    { prefixo: "1203", tipo: "MICRO", ano_fabricacao: 2012, ano_modelo: 2012, ar_condicionado: false, wc: true, assentos: 26, motorista: "ALAN JOSÉ" },
    { prefixo: "1702", tipo: "MICRO", ano_fabricacao: 2017, ano_modelo: 2017, ar_condicionado: true, wc: true, assentos: 26, motorista: "JOÃO CARLOS" },
    { prefixo: "1948", tipo: "MICRO", ano_fabricacao: 2019, ano_modelo: 2019, ar_condicionado: true, wc: false, assentos: 26, motorista: "GLEYDSON / MARCOS PAULO" },
    { prefixo: "1001", tipo: "MICRO", ano_fabricacao: 2011, ano_modelo: 2011, ar_condicionado: true, wc: false, assentos: 27, motorista: "JOSÉ TOM ANGOLA" },
    { prefixo: "1359", tipo: "ÔNIBUS", ano_fabricacao: 2009, ano_modelo: 2009, ar_condicionado: false, wc: false, assentos: 44, motorista: "HUGO LINNS" },
    { prefixo: "101018", tipo: "MICRO", ano_fabricacao: 2010, ano_modelo: 2010, ar_condicionado: false, wc: false, assentos: 27, motorista: "JUCA" },
    { prefixo: "1397", tipo: "ÔNIBUS", ano_fabricacao: 2013, ano_modelo: 2014, ar_condicionado: true, wc: true, assentos: 46, motorista: "JUCA" },
    { prefixo: "1373", tipo: "ÔNIBUS", ano_fabricacao: 2010, ano_modelo: 2010, ar_condicionado: false, wc: false, assentos: 40, motorista: "SÉRGIO" },
    { prefixo: "1375", tipo: "ÔNIBUS", ano_fabricacao: 2010, ano_modelo: 2010, ar_condicionado: false, wc: false, assentos: 40, motorista: "HÉLIO" },
    { prefixo: "1379", tipo: "ÔNIBUS", ano_fabricacao: 2010, ano_modelo: 2010, ar_condicionado: false, wc: false, assentos: 40, motorista: "JORGE/ JOSÉ DANIEL" },
    { prefixo: "121019", tipo: "ÔNIBUS", ano_fabricacao: 2010, ano_modelo: 2010, ar_condicionado: false, wc: false, assentos: 48, motorista: "LEANDRO MARQUES E ANTONIO RODRIGUES" },
    { prefixo: "1502", tipo: "ÔNIBUS", ano_fabricacao: 2015, ano_modelo: 2015, ar_condicionado: true, wc: true, assentos: 42, motorista: "ISAAC" },
    { prefixo: "131002", tipo: "ÔNIBUS", ano_fabricacao: 2010, ano_modelo: 2010, ar_condicionado: false, wc: false, assentos: 48, motorista: "JOSIMAR" },
    { prefixo: "2018", tipo: "VAN", ano_fabricacao: 2019, ano_modelo: 2020, ar_condicionado: true, wc: false, assentos: 17, motorista: "EDIVALDO" },
    { prefixo: "101256", tipo: "ÔNIBUS", ano_fabricacao: 2012, ano_modelo: 2012, ar_condicionado: true, wc: false, assentos: 48, motorista: "VICENTE / EDNALDO BARBOSA" },
    { prefixo: "101232", tipo: "ÔNIBUS", ano_fabricacao: 2012, ano_modelo: 2012, ar_condicionado: true, wc: false, assentos: 48, motorista: "JOSÉ LÚCIO" },
    { prefixo: "101318", tipo: "ÔNIBUS", ano_fabricacao: 2013, ano_modelo: 2013, ar_condicionado: true, wc: true, assentos: 45, motorista: "PAULO ROBERTO" },
    { prefixo: "121056", tipo: "ÔNIBUS", ano_fabricacao: 2012, ano_modelo: 2012, ar_condicionado: true, wc: false, assentos: 48, motorista: "FOLGUISTA DE SÁBADO" },
    { prefixo: "121301", tipo: "ÔNIBUS", ano_fabricacao: 2013, ano_modelo: 2013, ar_condicionado: true, wc: true, assentos: 45, motorista: "EMERSON" },
    { prefixo: "121302", tipo: "ÔNIBUS", ano_fabricacao: 2013, ano_modelo: 2013, ar_condicionado: true, wc: true, assentos: 45, motorista: "NILTON DE PAULA" },
    { prefixo: "121506", tipo: "ÔNIBUS", ano_fabricacao: 2015, ano_modelo: 2015, ar_condicionado: true, wc: false, assentos: 48, motorista: "ANDREMIR E GUSTAVO ALEXANDRE" },
    { prefixo: "121922", tipo: "ÔNIBUS", ano_fabricacao: 2019, ano_modelo: 2019, ar_condicionado: true, wc: true, assentos: 45, motorista: "SEVERINO B. ANADIO" },
    { prefixo: "2544", tipo: "MICRO", ano_fabricacao: 2024, ano_modelo: 2025, ar_condicionado: true, wc: false, assentos: 27, motorista: "MARÇAL" },
    { prefixo: "102016", tipo: "ÔNIBUS", ano_fabricacao: 2020, ano_modelo: 2020, ar_condicionado: true, wc: false, assentos: 48, motorista: "WEDSON E CARLOS ANDRÉ /" }
  ],
  "CARREFOUR": [
    { prefixo: "956", tipo: "VAN", ano_fabricacao: 2017, ano_modelo: 2018, ar_condicionado: true, wc: false, assentos: 19, motorista: "LUIZ CARLOS" },
    { prefixo: "1203", tipo: "MICRO", ano_fabricacao: 2012, ano_modelo: 2012, ar_condicionado: true, wc: false, assentos: 26, motorista: "CARLOS PAIXÃO" },
    { prefixo: "1702", tipo: "MICRO", ano_fabricacao: 2016, ano_modelo: 2017, ar_condicionado: true, wc: true, assentos: 26, motorista: "LOURENÇO / ADRIANO JOAQUIM" }
  ],
  "JEEP": [
    { prefixo: "101236", tipo: "ÔNIBUS", ano_fabricacao: 2012, ano_modelo: 2012, ar_condicionado: true, wc: false, assentos: 48, motorista: "JAIRO INÁCIO / EDNALDO BARBOSA" },
    { prefixo: "101244", tipo: "ÔNIBUS", ano_fabricacao: 2013, ano_modelo: 2013, ar_condicionado: true, wc: false, assentos: 48, motorista: "JANILSON / HUMBERTO" },
    { prefixo: "101246", tipo: "ÔNIBUS", ano_fabricacao: 2013, ano_modelo: 2013, ar_condicionado: true, wc: false, assentos: 48, motorista: "PAULO SERGIO/LINO ALVES/JOSE EDWILSON" },
    { prefixo: "101250", tipo: "ÔNIBUS", ano_fabricacao: 2012, ano_modelo: 2012, ar_condicionado: true, wc: false, assentos: 48, motorista: "GLAUBER / WILSON JUVENAL" },
    { prefixo: "101720", tipo: "ÔNIBUS", ano_fabricacao: 2017, ano_modelo: 2017, ar_condicionado: true, wc: true, assentos: 46, motorista: "ELIEZER" },
    { prefixo: "102104", tipo: "ÔNIBUS", ano_fabricacao: 2021, ano_modelo: 2021, ar_condicionado: true, wc: false, assentos: 48, motorista: "PAULO SERGIO / JOSE EDWILSON" },
    { prefixo: "102206", tipo: "ÔNIBUS", ano_fabricacao: 2021, ano_modelo: 2022, ar_condicionado: true, wc: false, assentos: 50, motorista: "JAILSON ALVES / NAELSON CAMPOS" },
    { prefixo: "102306", tipo: "ÔNIBUS", ano_fabricacao: 2022, ano_modelo: 2023, ar_condicionado: true, wc: false, assentos: 48, motorista: "GLAUBER / WILSON JUVENAL" },
    { prefixo: "102512", tipo: "ÔNIBUS", ano_fabricacao: 2024, ano_modelo: 2025, ar_condicionado: true, wc: false, assentos: 48, motorista: "PAULO LOPES / LINO ALVES" },
    { prefixo: "102548", tipo: "ÔNIBUS", ano_fabricacao: 2024, ano_modelo: 2025, ar_condicionado: true, wc: false, assentos: 48, motorista: "PAULO CARLOS" },
    { prefixo: "102550", tipo: "ÔNIBUS", ano_fabricacao: 2024, ano_modelo: 2025, ar_condicionado: true, wc: false, assentos: 48, motorista: "MICHEL ARAUJO VIULAR o SÃO PAULO" },
    { prefixo: "121902", tipo: "ÔNIBUS", ano_fabricacao: 2018, ano_modelo: 2019, ar_condicionado: true, wc: true, assentos: 46, motorista: "PAULO SEVERINO / ADILSON JOSÉ" },
    { prefixo: "121904", tipo: "ÔNIBUS", ano_fabricacao: 2018, ano_modelo: 2019, ar_condicionado: true, wc: true, assentos: 46, motorista: "ANT. COUTINHO / PAULO SEVERINO" },
    { prefixo: "121906", tipo: "ÔNIBUS", ano_fabricacao: 2018, ano_modelo: 2019, ar_condicionado: true, wc: true, assentos: 46, motorista: "ADRIANO / LOURENÇO/HELIO" },
    { prefixo: "121910", tipo: "ÔNIBUS", ano_fabricacao: 2018, ano_modelo: 2019, ar_condicionado: true, wc: true, assentos: 46, motorista: "IRAPUHY / JAILSON CARVALHO" },
    { prefixo: "121912", tipo: "ÔNIBUS", ano_fabricacao: 2018, ano_modelo: 2019, ar_condicionado: true, wc: true, assentos: 46, motorista: "WILSON DUARTE / TIAGO AVELINO" },
    { prefixo: "121914", tipo: "ÔNIBUS", ano_fabricacao: 2018, ano_modelo: 2019, ar_condicionado: true, wc: true, assentos: 46, motorista: "VALMIR" },
    { prefixo: "121916", tipo: "ÔNIBUS", ano_fabricacao: 2018, ano_modelo: 2019, ar_condicionado: true, wc: true, assentos: 46, motorista: "PLINIO / VALBÉRIO" },
    { prefixo: "121918", tipo: "ÔNIBUS", ano_fabricacao: 2018, ano_modelo: 2019, ar_condicionado: true, wc: true, assentos: 46, motorista: "IVSON" },
    { prefixo: "121920", tipo: "ÔNIBUS", ano_fabricacao: 2018, ano_modelo: 2019, ar_condicionado: true, wc: true, assentos: 46, motorista: "EDMILSON" },
    { prefixo: "121924", tipo: "ÔNIBUS", ano_fabricacao: 2018, ano_modelo: 2019, ar_condicionado: true, wc: true, assentos: 46, motorista: "MARCIO LIRA/ JAILSON CARVALHO" },
    { prefixo: "121926", tipo: "ÔNIBUS", ano_fabricacao: 2018, ano_modelo: 2019, ar_condicionado: true, wc: true, assentos: 46, motorista: "CHARLE FABIANO/ ERIVALDO FEIJOR/ JOSÉ MARCELINO" },
    { prefixo: "121930", tipo: "ÔNIBUS", ano_fabricacao: 2018, ano_modelo: 2019, ar_condicionado: true, wc: true, assentos: 46, motorista: "MARCANTONIO/ CLEILTON" },
    { prefixo: "121932", tipo: "ÔNIBUS", ano_fabricacao: 2018, ano_modelo: 2019, ar_condicionado: true, wc: true, assentos: 46, motorista: "RUI / CARLOS / MANOEL" },
    { prefixo: "121934", tipo: "ÔNIBUS", ano_fabricacao: 2018, ano_modelo: 2019, ar_condicionado: true, wc: true, assentos: 45, motorista: "CARLOS EDUARDO" },
    { prefixo: "121936", tipo: "ÔNIBUS", ano_fabricacao: 2018, ano_modelo: 2019, ar_condicionado: true, wc: true, assentos: 46, motorista: "SERGIO GOMES" },
    { prefixo: "122106", tipo: "ÔNIBUS", ano_fabricacao: 2020, ano_modelo: 2021, ar_condicionado: true, wc: false, assentos: 49, motorista: "ERIVALDO / JOSÉ EDWILSON" },
    { prefixo: "122108", tipo: "ÔNIBUS", ano_fabricacao: 2020, ano_modelo: 2021, ar_condicionado: true, wc: false, assentos: 49, motorista: "NAELSON/CARLOS NUNES" },
    { prefixo: "122110", tipo: "ÔNIBUS", ano_fabricacao: 2020, ano_modelo: 2021, ar_condicionado: true, wc: false, assentos: 49, motorista: "PAULO / GEORGE" }
  ],
  "CONSAG": [
    { prefixo: "102010", tipo: "ÔNIBUS", ano_fabricacao: 2019, ano_modelo: 2020, ar_condicionado: true, wc: false, assentos: 48, motorista: "KLEBSON" },
    { prefixo: "102102", tipo: "ÔNIBUS", ano_fabricacao: 2021, ano_modelo: 2021, ar_condicionado: true, wc: false, assentos: 48, motorista: "ALLAN" },
    { prefixo: "102210", tipo: "ÔNIBUS", ano_fabricacao: 2021, ano_modelo: 2022, ar_condicionado: true, wc: false, assentos: 48, motorista: "LUIZ CARLOS" },
    { prefixo: "102304", tipo: "ÔNIBUS", ano_fabricacao: 2022, ano_modelo: 2023, ar_condicionado: true, wc: false, assentos: 48, motorista: "JAILSON JOÃO" },
    { prefixo: "102552", tipo: "ÔNIBUS", ano_fabricacao: 2024, ano_modelo: 2025, ar_condicionado: true, wc: false, assentos: 48, motorista: "ADRIANO LUIZ" },
    { prefixo: "121502", tipo: "ÔNIBUS", ano_fabricacao: 2015, ano_modelo: 2015, ar_condicionado: true, wc: false, assentos: 48, motorista: "SEVERINO" },
    { prefixo: "121602", tipo: "ÔNIBUS", ano_fabricacao: 2016, ano_modelo: 2016, ar_condicionado: true, wc: false, assentos: 48, motorista: "JOSE JOSINALDO" },
    { prefixo: "121604", tipo: "ÔNIBUS", ano_fabricacao: 2016, ano_modelo: 2016, ar_condicionado: true, wc: false, assentos: 48, motorista: "MARCILIO" },
    { prefixo: "121606", tipo: "ÔNIBUS", ano_fabricacao: 2016, ano_modelo: 2016, ar_condicionado: true, wc: false, assentos: 48, motorista: "JOSÉ ANTONIO" },
    { prefixo: "122414", tipo: "ÔNIBUS", ano_fabricacao: 2023, ano_modelo: 2024, ar_condicionado: true, wc: false, assentos: 48, motorista: "JOSÉ ELIAS" }
  ],
  "CBA": [
    { prefixo: "2002", tipo: "ÔNIBUS", ano_fabricacao: 2019, ano_modelo: 2020, ar_condicionado: true, wc: true, assentos: 50, motorista: "WELLINGTON VIEIRA" },
    { prefixo: "2006", tipo: "ÔNIBUS", ano_fabricacao: 2019, ano_modelo: 2020, ar_condicionado: true, wc: true, assentos: 50, motorista: "JOSÉ ANDRÉ" },
    { prefixo: "2024", tipo: "MICRO", ano_fabricacao: 2020, ano_modelo: 2020, ar_condicionado: true, wc: false, assentos: 33, motorista: "CARLOS ANTÔNIO / DEIVSON" },
    { prefixo: "2214", tipo: "MICRO", ano_fabricacao: 2022, ano_modelo: 2022, ar_condicionado: true, wc: false, assentos: 33, motorista: "EDUARDO PEREIRA /HUMBERTO/GEORGE" },
    { prefixo: "2406", tipo: "MICRO", ano_fabricacao: 2023, ano_modelo: 2024, ar_condicionado: true, wc: false, assentos: 33, motorista: "ALTAIS / JOSÉ DANIEL" },
    { prefixo: "102508", tipo: "ÔNIBUS", ano_fabricacao: 2025, ano_modelo: 2025, ar_condicionado: true, wc: true, assentos: 45, motorista: "PETRONIO / JAELSON" },
    { prefixo: "102504", tipo: "ÔNIBUS", ano_fabricacao: 2024, ano_modelo: 2025, ar_condicionado: true, wc: true, assentos: 45, motorista: "RODRIGO LUIS" },
    { prefixo: "102506", tipo: "ÔNIBUS", ano_fabricacao: 2024, ano_modelo: 2025, ar_condicionado: true, wc: true, assentos: 45, motorista: "EVANDRO" },
    { prefixo: "121932", tipo: "ÔNIBUS", ano_fabricacao: 2018, ano_modelo: 2019, ar_condicionado: true, wc: true, assentos: 46, motorista: "NELSON MARIANO" },
    { prefixo: "122410", tipo: "ÔNIBUS", ano_fabricacao: 2023, ano_modelo: 2024, ar_condicionado: true, wc: false, assentos: 48, motorista: "OZEIAS / EDNALDO F." }
  ],
  "PIACENTINI": [
    { prefixo: "2208", tipo: "MICRO", ano_fabricacao: 2022, ano_modelo: 2022, ar_condicionado: true, wc: false, assentos: 33, motorista: "LUCIANO XAVIER" },
    { prefixo: "102202", tipo: "ÔNIBUS", ano_fabricacao: 2021, ano_modelo: 2022, ar_condicionado: true, wc: false, assentos: 50, motorista: "ANDERSON FELIPE" },
    { prefixo: "102208", tipo: "ÔNIBUS", ano_fabricacao: 2021, ano_modelo: 2022, ar_condicionado: true, wc: false, assentos: 50, motorista: "JOSE RENATO" },
    { prefixo: "122412", tipo: "ÔNIBUS", ano_fabricacao: 2023, ano_modelo: 2024, ar_condicionado: true, wc: false, assentos: 48, motorista: "JOSÉ DOMINGOS" }
  ],
  "VIVÁ/SOLAR": [
    { prefixo: "402", tipo: "VAN", ano_fabricacao: 2023, ano_modelo: 2024, ar_condicionado: true, wc: false, assentos: 15, motorista: "ROBSON FIDELES" },
    { prefixo: "424", tipo: "VAN", ano_fabricacao: 2023, ano_modelo: 2024, ar_condicionado: true, wc: false, assentos: 15, motorista: "ALLAN JOSÉ" },
    { prefixo: "102310", tipo: "ÔNIBUS", ano_fabricacao: 2022, ano_modelo: 2023, ar_condicionado: true, wc: false, assentos: 50, motorista: "WALMIR HENRIQUE / GENIVAL BATISTA" },
    { prefixo: "122112", tipo: "ÔNIBUS", ano_fabricacao: 2020, ano_modelo: 2021, ar_condicionado: true, wc: false, assentos: 48, motorista: "GENIVAL BATISTA /SATURNINO" },
    { prefixo: "122416", tipo: "ÔNIBUS", ano_fabricacao: 2023, ano_modelo: 2024, ar_condicionado: true, wc: false, assentos: 48, motorista: "MACARRÃO / GENIVAL FERREIRA" },
    { prefixo: "122418", tipo: "ÔNIBUS", ano_fabricacao: 2023, ano_modelo: 2024, ar_condicionado: true, wc: false, assentos: 48, motorista: "EDVALDO SANTOS / GENIVAL FERREIRA" }
  ],
  "MERCADO LIVRE": [
    { prefixo: "102012", tipo: "ÔNIBUS", ano_fabricacao: 2019, ano_modelo: 2020, ar_condicionado: true, wc: false, assentos: 48, motorista: "PAULO R ANJO /GREYDSON" },
    { prefixo: "102302", tipo: "ÔNIBUS", ano_fabricacao: 2022, ano_modelo: 2023, ar_condicionado: true, wc: false, assentos: 48, motorista: "JOSÉ JOÃO E SILVIO KLEBER" },
    { prefixo: "102544", tipo: "ÔNIBUS", ano_fabricacao: 2024, ano_modelo: 2025, ar_condicionado: true, wc: false, assentos: 48, motorista: "MARCELO MAGALHÃES" },
    { prefixo: "102556", tipo: "ÔNIBUS", ano_fabricacao: 2024, ano_modelo: 2025, ar_condicionado: true, wc: false, assentos: 48, motorista: "DAYVID" },
    { prefixo: "102560", tipo: "ÔNIBUS", ano_fabricacao: 2024, ano_modelo: 2025, ar_condicionado: true, wc: false, assentos: 48, motorista: "EDUARDO GONÇALVES" },
    { prefixo: "122502", tipo: "ÔNIBUS", ano_fabricacao: 2024, ano_modelo: 2025, ar_condicionado: false, wc: true, assentos: 48, motorista: "MARCILIO FELIPE" },
    { prefixo: "122504", tipo: "ÔNIBUS", ano_fabricacao: 2024, ano_modelo: 2025, ar_condicionado: false, wc: true, assentos: 48, motorista: "VALMIR MAGALHÃES" }
  ],
  "TECON": [
    { prefixo: "2004", tipo: "ÔNIBUS", ano_fabricacao: 2019, ano_modelo: 2020, ar_condicionado: true, wc: true, assentos: 50, motorista: "CLAYTON" },
    { prefixo: "2008", tipo: "ÔNIBUS", ano_fabricacao: 2019, ano_modelo: 2020, ar_condicionado: true, wc: true, assentos: 50, motorista: "GERLANIO" },
    { prefixo: "102520", tipo: "ÔNIBUS", ano_fabricacao: 2024, ano_modelo: 2025, ar_condicionado: true, wc: false, assentos: 48, motorista: "JOSÉ APARECIDO / ADEILDO ( FOLGUISTA)" },
    { prefixo: "122420", tipo: "ÔNIBUS", ano_fabricacao: 2023, ano_modelo: 2024, ar_condicionado: true, wc: false, assentos: 48, motorista: "DENOS / SERGIO LIMA" },
    { prefixo: "122422", tipo: "ÔNIBUS", ano_fabricacao: 2023, ano_modelo: 2024, ar_condicionado: true, wc: false, assentos: 48, motorista: "MAURICIO / ERIVALDO FEIJÓ" }
  ],
  "MARELLI": [
    { prefixo: "2028", tipo: "MICRO", ano_fabricacao: 2020, ano_modelo: 2020, ar_condicionado: true, wc: false, assentos: 33, motorista: "EDUARDO GONÇALVES" },
    { prefixo: "2030", tipo: "MICRO", ano_fabricacao: 2020, ano_modelo: 2021, ar_condicionado: true, wc: true, assentos: 28, motorista: "GILSON LOURENÇO" },
    { prefixo: "2034", tipo: "MICRO", ano_fabricacao: 2020, ano_modelo: 2021, ar_condicionado: true, wc: true, assentos: 28, motorista: "ALEXSANDRO ALVES" },
    { prefixo: "2038", tipo: "MICRO", ano_fabricacao: 2020, ano_modelo: 2021, ar_condicionado: true, wc: true, assentos: 28, motorista: "ALEXANDRE PEREIRA / ANTONIO RODRIGUES" }
  ],
  "ACHÉ": [
    { prefixo: "2202", tipo: "MICRO", ano_fabricacao: 2022, ano_modelo: 2022, ar_condicionado: true, wc: false, assentos: 33, motorista: "ROSSI" },
    { prefixo: "2204", tipo: "MICRO", ano_fabricacao: 2022, ano_modelo: 2022, ar_condicionado: true, wc: false, assentos: 33, motorista: "LEANDRO MARQUES/SILVIO SALUSTIANO" },
    { prefixo: "2206", tipo: "MICRO", ano_fabricacao: 2022, ano_modelo: 2022, ar_condicionado: true, wc: false, assentos: 33, motorista: "ALEXSANDRO CORREIA" },
    { prefixo: "102502", tipo: "ÔNIBUS", ano_fabricacao: 2024, ano_modelo: 2025, ar_condicionado: true, wc: false, assentos: 45, motorista: "GLEITON" },
    { prefixo: "102510", tipo: "ÔNIBUS", ano_fabricacao: 2024, ano_modelo: 2025, ar_condicionado: true, wc: false, assentos: 45, motorista: "BERIVALDO" },
    { prefixo: "102562", tipo: "ÔNIBUS", ano_fabricacao: 2024, ano_modelo: 2025, ar_condicionado: true, wc: false, assentos: 45, motorista: "ANDRÉ R. LIMA E JOÃO FRANCISCO (3 SEMANAL)" }
  ],
  "MASTERFOODS": [
    { prefixo: "522", tipo: "VAN", ano_fabricacao: 2024, ano_modelo: 2025, ar_condicionado: true, wc: false, assentos: 15, motorista: "DENNYS" },
    { prefixo: "524", tipo: "VAN", ano_fabricacao: 2024, ano_modelo: 2025, ar_condicionado: true, wc: false, assentos: 15, motorista: "THIAGO" },
    { prefixo: "528", tipo: "VAN", ano_fabricacao: 2024, ano_modelo: 2025, ar_condicionado: true, wc: false, assentos: 15, motorista: "OSEIAS / JAILSON" }
  ],
  "CAMPARI": [
    { prefixo: "2032", tipo: "MICRO", ano_fabricacao: 2020, ano_modelo: 2021, ar_condicionado: true, wc: true, assentos: 28, motorista: "VALDEMIR" },
    { prefixo: "2210", tipo: "MICRO", ano_fabricacao: 2022, ano_modelo: 2022, ar_condicionado: true, wc: false, assentos: 33, motorista: "ALBERT" },
    { prefixo: "2212", tipo: "MICRO", ano_fabricacao: 2022, ano_modelo: 2022, ar_condicionado: true, wc: false, assentos: 33, motorista: "RICARDO ANTONIO" },
    { prefixo: "2220", tipo: "MICRO", ano_fabricacao: 2022, ano_modelo: 2022, ar_condicionado: true, wc: false, assentos: 33, motorista: "CLAUDEMIR ANDRADE" }
  ],
  "AMANCO": [
    { prefixo: "2104", tipo: "MICRO", ano_fabricacao: 2020, ano_modelo: 2021, ar_condicionado: true, wc: false, assentos: 33, motorista: "JOSÉ ANTONIO/ SILVIO KLEBER" },
    { prefixo: "2216", tipo: "MICRO", ano_fabricacao: 2022, ano_modelo: 2022, ar_condicionado: true, wc: false, assentos: 33, motorista: "MARCELO MUNIZ / WILLAMS MELO" },
    { prefixo: "2218", tipo: "MICRO", ano_fabricacao: 2022, ano_modelo: 2022, ar_condicionado: true, wc: false, assentos: 33, motorista: "BRUNO LEONARDO" }
  ],
  "AMCOR": [
    { prefixo: "102514", tipo: "ÔNIBUS", ano_fabricacao: 2024, ano_modelo: 2025, ar_condicionado: true, wc: false, assentos: 48, motorista: "CARLOS GALDINO / CARLOS JUSTINO" },
    { prefixo: "102516", tipo: "ÔNIBUS", ano_fabricacao: 2024, ano_modelo: 2025, ar_condicionado: true, wc: false, assentos: 48, motorista: "SAMUEL / LUCIANO XAVIER" },
    { prefixo: "102518", tipo: "ÔNIBUS", ano_fabricacao: 2024, ano_modelo: 2025, ar_condicionado: true, wc: false, assentos: 48, motorista: "GEOMÁRIO" }
  ],
  "MONTE RODOVIAS": [
    { prefixo: "304", tipo: "VAN", ano_fabricacao: 2023, ano_modelo: 2023, ar_condicionado: true, wc: false, assentos: 15, motorista: "JEAN TED" },
    { prefixo: "306", tipo: "VAN", ano_fabricacao: 2023, ano_modelo: 2023, ar_condicionado: true, wc: false, assentos: 15, motorista: "JOSÉ ELIAS" },
    { prefixo: "308", tipo: "VAN", ano_fabricacao: 2023, ano_modelo: 2023, ar_condicionado: true, wc: false, assentos: 15, motorista: "CARLOS ALBERTO MAX" }
  ],
  "CIMENTO FORTE": [
    { prefixo: "530", tipo: "VAN", ano_fabricacao: 2025, ano_modelo: 2025, ar_condicionado: true, wc: false, assentos: 21, motorista: "FÁBIO" },
    { prefixo: "2546", tipo: "MICRO", ano_fabricacao: 2022, ano_modelo: 2022, ar_condicionado: true, wc: false, assentos: 27, motorista: "EVERSON" }
  ],
  "ECO RESORT": [
    { prefixo: "102204", tipo: "ÔNIBUS", ano_fabricacao: 2021, ano_modelo: 2022, ar_condicionado: true, wc: false, assentos: 50, motorista: "JOSIAS/ WELLINGTON ANDRADE" }
  ],
  "JCPM": [
    { prefixo: "2222", tipo: "MICRO", ano_fabricacao: 2022, ano_modelo: 2022, ar_condicionado: true, wc: false, assentos: 33, motorista: "SEVERINO" }
  ],
  "HDH": [
    { prefixo: "2036", tipo: "MICRO", ano_fabricacao: 2020, ano_modelo: 2021, ar_condicionado: true, wc: true, assentos: 28, motorista: "WANILSON" },
    { prefixo: "2404", tipo: "MICRO", ano_fabricacao: 2023, ano_modelo: 2024, ar_condicionado: true, wc: false, assentos: 33, motorista: "JAILSON ARIMATEIA" }
  ],
  "ImBETTA": [
    { prefixo: "2026", tipo: "MICRO", ano_fabricacao: 2020, ano_modelo: 2020, ar_condicionado: true, wc: false, assentos: 33, motorista: "PAULO DOMINGOS" }
  ],
  "CRISTAL PET": [
    { prefixo: "1322", tipo: "MICRO", ano_fabricacao: 2013, ano_modelo: 2013, ar_condicionado: true, wc: false, assentos: 26, motorista: "SILVIO SAULUSTIANO" },
    { prefixo: "2102", tipo: "MICRO", ano_fabricacao: 2020, ano_modelo: 2021, ar_condicionado: true, wc: false, assentos: 33, motorista: "JOSÉ JOSINALDO" }
  ],
  "51 MULLER": [
    { prefixo: "102546", tipo: "ÔNIBUS", ano_fabricacao: 2024, ano_modelo: 2025, ar_condicionado: true, wc: true, assentos: 45, motorista: "SANDRO SEVERINO" }
  ],
  "TURISMO": [
    { prefixo: "1712", tipo: "ÔNIBUS", ano_fabricacao: 2017, ano_modelo: 2017, ar_condicionado: true, wc: true, assentos: 50, motorista: "AGOSTINHO/ ANT. SÉRGIO" },
    { prefixo: "2302", tipo: "ÔNIBUS", ano_fabricacao: 2023, ano_modelo: 2023, ar_condicionado: true, wc: true, assentos: 46 }
  ],
  "MOURA": [
    { prefixo: "102558", tipo: "ÔNIBUS", ano_fabricacao: 2024, ano_modelo: 2025, ar_condicionado: true, wc: false, assentos: 48, motorista: "GILSON LUIZ" }
  ],
  "DECAL": [
    { prefixo: "2542", tipo: "MICRO", ano_fabricacao: 2024, ano_modelo: 2025, ar_condicionado: true, wc: false, assentos: 27, motorista: "REGINALDO BIANL N 31" }
  ],
  "OMIRP": [
    { prefixo: "2548", tipo: "MICRO", ano_fabricacao: 2024, ano_modelo: 2025, ar_condicionado: true, wc: false, assentos: 27, motorista: "PAULO COULINHO" }
  ],
  "VILA GALÉ": [
    { prefixo: "2554", tipo: "MICRO", ano_fabricacao: 2024, ano_modelo: 2025, ar_condicionado: true, wc: false, assentos: 27, motorista: "CARLOS ANDRÉ" }
  ],
  "PREFEITURA IPO": [
    { prefixo: "1204", tipo: "MICRO", ano_fabricacao: 2012, ano_modelo: 2012, ar_condicionado: true, wc: false, assentos: 27, motorista: "LUIZ CARLOS" },
    { prefixo: "2550", tipo: "MICRO", ano_fabricacao: 2024, ano_modelo: 2025, ar_condicionado: true, wc: false, assentos: 27, motorista: "JOSÉ JOQUILÉ" }
  ],
  "ALUGADOS": [
    { prefixo: "1323", tipo: "MICRO", ano_fabricacao: 2013, ano_modelo: 2013, ar_condicionado: true, wc: false, assentos: 26, motorista: "ONDALVA" },
    { prefixo: "2042", tipo: "MICRO", ano_fabricacao: 2020, ano_modelo: 2021, ar_condicionado: true, wc: false, assentos: 33, motorista: "ROSELI" },
    { prefixo: "101428", tipo: "ÔNIBUS", ano_fabricacao: 2014, ano_modelo: 2014, ar_condicionado: true, wc: true, assentos: 45, motorista: "POLICLÍCA" },
    { prefixo: "101724", tipo: "ÔNIBUS", ano_fabricacao: 2017, ano_modelo: 2017, ar_condicionado: true, wc: true, assentos: 46, motorista: "FCH" },
    { prefixo: "121908", tipo: "ÔNIBUS", ano_fabricacao: 2018, ano_modelo: 2019, ar_condicionado: true, wc: true, assentos: 46, motorista: "PROMO" },
    { prefixo: "121928", tipo: "ÔNIBUS", ano_fabricacao: 2018, ano_modelo: 2019, ar_condicionado: true, wc: true, assentos: 46, motorista: "PRAGA DE BOA VIAGEM" },
    { prefixo: "2224", tipo: "MICRO", ano_fabricacao: 2022, ano_modelo: 2022, ar_condicionado: true, wc: false, assentos: 33, motorista: "JOSÉ BOA VIAGEM" },
    { prefixo: "2226", tipo: "MICRO", ano_fabricacao: 2022, ano_modelo: 2022, ar_condicionado: true, wc: false, assentos: 33, motorista: "DINAL" },
    { prefixo: "2228", tipo: "MICRO", ano_fabricacao: 2022, ano_modelo: 2022, ar_condicionado: true, wc: false, assentos: 33, motorista: "JOSÉ JOBIAS" }
  ],
  "CARREFOUR": [
    { prefixo: "1001", tipo: "MICRO", ano_fabricacao: 2011, ano_modelo: 2011, ar_condicionado: true, wc: false, assentos: 27, motorista: "JOSÉ TOM ANGELA" }
  ]
};

const Veiculos = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [tipoFiltro, setTipoFiltro] = useState('TODOS');
  const [clienteSelecionado, setClienteSelecionado] = useState('TODOS');
  const [veiculosPorClienteState, setVeiculosPorClienteState] = useState(veiculosPorCliente);
  const [veiculosRecentementeAdicionados, setVeiculosRecentementeAdicionados] = useState([]);
  const [clientesExpandidos, setClientesExpandidos] = useState({});
  const [reservasExpandido, setReservasExpandido] = useState(false);
  const [trocasExpandido, setTrocasExpandido] = useState(false);
  const [controleSaidasAberto, setControleSaidasAberto] = useState(false);
  const [modalAberto, setModalAberto] = useState(false);
  const [modalReservaAberto, setModalReservaAberto] = useState(false);
  const [modalTrocaAberto, setModalTrocaAberto] = useState(false);
  const [modalVisualizarTroca, setModalVisualizarTroca] = useState(false);
  const [modalEditarTroca, setModalEditarTroca] = useState(false);
  const [modalExcluirTroca, setModalExcluirTroca] = useState(false);
  const [trocaSelecionada, setTrocaSelecionada] = useState(null);
  const [observacoes, setObservacoes] = useState([]);
  const [novaObservacao, setNovaObservacao] = useState('');
  const [editandoObsId, setEditandoObsId] = useState(null);
  const [novoVeiculo, setNovoVeiculo] = useState({
    cliente: '',
    prefixo: '',
    tipo: 'VAN',
    ano_fabricacao: '',
    ano_modelo: '',
    assentos: '',
    ar_condicionado: true,
    wc: false,
    motorista: '',
    quantidade_turnos: '',
    local_saida: '',
    rota: '',
    casa_motorista: '',
    marca: ''
  });

  // API-driven vehicles management
  const [veiculosApi, setVeiculosApi] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [loadingVeiculos, setLoadingVeiculos] = useState(false);
  const [formAberto, setFormAberto] = useState(false);
  const [isEditando, setIsEditando] = useState(false);
  const [formVeiculo, setFormVeiculo] = useState({ placa: '', modelo: '', marca: '', ano: '', cliente_id: '' });

  useEffect(() => {
    fetchClientes();
    fetchVeiculos();
  }, []);

  const fetchClientes = async () => {
    try {
      const res = await (await import('../../services/api')).default.get('/clientes');
      setClientes(res.data || []);
    } catch (error) {
      console.error('Erro ao buscar clientes:', error);
      setClientes([]);
    }
  };

  const fetchVeiculos = async () => {
    setLoadingVeiculos(true);
    try {
      const res = await (await import('../../services/api')).default.get('/veiculos');
      setVeiculosApi(res.data || []);
    } catch (error) {
      console.error('Erro ao buscar veículos:', error);
      setVeiculosApi([]);
    } finally {
      setLoadingVeiculos(false);
    }
  };

  const abrirFormularioNovo = () => {
    setIsEditando(false);
    setFormVeiculo({ 
      placa: '', 
      modelo: '', 
      marca: '', 
      ano: '', 
      cliente_id: '', 
      tipo: 'VAN', 
      ano_fabricacao: '', 
      motorista: '', 
      assentos: '', 
      ar_condicionado: false, 
      wc: false 
    });
    setFormAberto(true);
  };

  const abrirFormularioEdicao = (v) => {
    setIsEditando(true);
    setFormVeiculo({ 
      id: v.id, 
      placa: v.placa || '', 
      modelo: v.modelo || '', 
      marca: v.marca || '', 
      ano: v.ano || '', 
      cliente_id: v.cliente_id || '',
      tipo: v.tipo || 'VAN',
      ano_fabricacao: v.ano_fabricacao || '',
      motorista: v.motorista || '',
      assentos: v.assentos || '',
      ar_condicionado: v.ar_condicionado || false,
      wc: v.wc || false
    });
    setFormAberto(true);
  };

  const salvarVeiculoApi = async (e) => {
    e.preventDefault();
    try {
      const api = (await import('../../services/api')).default;
      const payload = {
        placa: formVeiculo.placa,
        modelo: formVeiculo.modelo,
        marca: formVeiculo.marca,
        ano: formVeiculo.ano ? Number(formVeiculo.ano) : null,
        cliente_id: formVeiculo.cliente_id ? Number(formVeiculo.cliente_id) : null,
        tipo: formVeiculo.tipo || 'VAN',
        ano_fabricacao: formVeiculo.ano_fabricacao ? Number(formVeiculo.ano_fabricacao) : null,
        motorista: formVeiculo.motorista || null,
        assentos: formVeiculo.assentos ? Number(formVeiculo.assentos) : null,
        ar_condicionado: formVeiculo.ar_condicionado || false,
        wc: formVeiculo.wc || false,
      };

      if (isEditando) {
        await api.put(`/veiculos/${formVeiculo.id}`, payload);
        alert('Veículo atualizado com sucesso');
      } else {
        const response = await api.post('/veiculos', payload);
        alert('Veículo criado com sucesso');
        
        // Adicionar à lista de veículos recentemente adicionados
        const clienteNome = clientes.find(c => c.id === Number(formVeiculo.cliente_id))?.nome || 'Cliente';
        const novoVeiculoInfo = {
          prefixo: formVeiculo.placa,
          tipo: formVeiculo.tipo || 'VAN',
          modelo: formVeiculo.modelo || '',
          marca: formVeiculo.marca || '',
          cliente: clienteNome,
          ano_fabricacao: formVeiculo.ano_fabricacao || formVeiculo.ano,
          assentos: Number(formVeiculo.assentos) || 0,
          motorista: formVeiculo.motorista || '',
          ar_condicionado: formVeiculo.ar_condicionado || false,
          wc: formVeiculo.wc || false,
          dataHoraAdicao: new Date().toISOString()
        };
        
        setVeiculosRecentementeAdicionados(prev => [
          ...prev,
          novoVeiculoInfo
        ]);
        
        // Adicionar aos veículos do cliente
        setVeiculosPorClienteState(prev => ({
          ...prev,
          [clienteNome]: [...(prev[clienteNome] || []), novoVeiculoInfo]
        }));
      }

      setFormAberto(false);
      fetchVeiculos();
    } catch (error) {
      console.error('Erro ao salvar veículo:', error);
      alert(error.response?.data?.message || 'Erro ao salvar veículo');
    }
  };

  const excluirVeiculoApi = async (id) => {
    if (!confirm('Confirma exclusão do veículo?')) return;
    try {
      const api = (await import('../../services/api')).default;
      await api.delete(`/veiculos/${id}`);
      alert('Veículo excluído');
      fetchVeiculos();
    } catch (error) {
      console.error('Erro ao excluir veículo:', error);
      alert('Erro ao excluir veículo');
    }
  };
  const [novaReserva, setNovaReserva] = useState({
    prefixo: '',
    tipo: 'VAN',
    ano_fabricacao: '',
    ano_modelo: '',
    assentos: '',
    ar_condicionado: true,
    wc: false,
    motorista: '',
    quantidade_turnos: '',
    local_saida: '',
    rota: '',
    casa_motorista: '',
    marca: ''
  });
  const [novaTroca, setNovaTroca] = useState({
    carro_novo: '',
    substituto: '',
    cliente: '',
    observacoes: ''
  });

  // Obter todos os veículos em um array único
  const todosVeiculos = Object.entries(veiculosPorCliente).flatMap(([cliente, veiculos]) =>
    veiculos.map(v => ({ ...v, cliente }))
  );

  // Calcular estatísticas
  const totalVeiculos = veiculosApi.length > 0 ? veiculosApi.length : todosVeiculos.length;
  const totalAssentos = veiculosApi.length > 0 ? veiculosApi.reduce((acc, v) => acc + (v.assentos || 0), 0) : todosVeiculos.reduce((acc, v) => acc + v.assentos, 0);

  const countByTipo = (tipo) => {
    if (veiculosApi.length > 0) {
      return veiculosApi.filter(v => {
        const modelo = (v.modelo || '').toLowerCase();
        if (tipo === 'VAN') return modelo.includes('van');
        if (tipo === 'MICRO') return modelo.includes('micro');
        if (tipo === 'ÔNIBUS') return modelo.includes('ônibus') || modelo.includes('onibus');
        return false;
      }).length;
    }
    return todosVeiculos.filter(v => v.tipo === tipo).length;
  };

  const veiculosFiltrados = todosVeiculos.filter(veiculo => {
    const matchSearch = veiculo.prefixo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        veiculo.tipo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        veiculo.cliente.toLowerCase().includes(searchTerm.toLowerCase());
    const matchTipo = tipoFiltro === 'TODOS' || veiculo.tipo === tipoFiltro;
    const matchCliente = clienteSelecionado === 'TODOS' || veiculo.cliente === clienteSelecionado;
    return matchSearch && matchTipo && matchCliente;
  });

  const toggleCliente = (cliente) => {
    setClientesExpandidos(prev => ({
      ...prev,
      [cliente]: !prev[cliente]
    }));
  };

  const handleNovoVeiculo = () => {
    setModalAberto(true);
  };

  const handleSalvarVeiculo = (e) => {
    e.preventDefault();
    
    // Criar objeto do novo veículo
    const novoVeiculoCompleto = {
      prefixo: novoVeiculo.prefixo,
      tipo: novoVeiculo.tipo,
      ano_fabricacao: parseInt(novoVeiculo.ano_fabricacao) || 0,
      ano_modelo: parseInt(novoVeiculo.ano_modelo) || 0,
      assentos: parseInt(novoVeiculo.assentos) || 0,
      ar_condicionado: novoVeiculo.ar_condicionado,
      wc: novoVeiculo.wc,
      motorista: novoVeiculo.motorista || '',
      quantidade_turnos: parseInt(novoVeiculo.quantidade_turnos) || 0,
      local_saida: novoVeiculo.local_saida || '',
      rota: novoVeiculo.rota || '',
      casa_motorista: novoVeiculo.casa_motorista || '',
      marca: novoVeiculo.marca || ''
    };

    // Adicionar veículo ao cliente correspondente
    const clienteNome = novoVeiculo.cliente;
    setVeiculosPorClienteState(prev => ({
      ...prev,
      [clienteNome]: [...(prev[clienteNome] || []), novoVeiculoCompleto]
    }));

    // Adicionar à lista de veículos recentemente adicionados
    setVeiculosRecentementeAdicionados(prev => [
      ...prev,
      { ...novoVeiculoCompleto, cliente: clienteNome, dataHoraAdicao: new Date().toISOString() }
    ]);

    console.log('Novo veículo cadastrado:', novoVeiculoCompleto);
    alert(`Veículo ${novoVeiculo.prefixo} cadastrado com sucesso para ${clienteNome}!`);
    
    setModalAberto(false);
    setNovoVeiculo({
      cliente: '',
      prefixo: '',
      tipo: 'VAN',
      ano_fabricacao: '',
      ano_modelo: '',
      assentos: '',
      ar_condicionado: true,
      wc: false,
      motorista: '',
      quantidade_turnos: '',
      local_saida: '',
      rota: '',
      casa_motorista: '',
      marca: ''
    });
  };

  const limparFiltros = () => {
    setSearchTerm('');
    setTipoFiltro('TODOS');
    setClienteSelecionado('TODOS');
  };

  const handleNovaReserva = () => {
    setModalReservaAberto(true);
  };

  const handleSalvarReserva = (e) => {
    e.preventDefault();
    // Aqui você pode adicionar a lógica para salvar no backend
    console.log('Nova reserva:', novaReserva);
    alert('Veículo reserva cadastrado com sucesso!');
    setModalReservaAberto(false);
    setNovaReserva({
      prefixo: '',
      tipo: 'VAN',
      ano_fabricacao: '',
      ano_modelo: '',
      assentos: '',
      ar_condicionado: true,
      wc: false,
      motorista: ''
    });
  };

  const handleNovaTroca = () => {
    setModalTrocaAberto(true);
  };

  const abrirVisualizarTroca = (troca) => {
    setTrocaSelecionada(troca);
    setModalVisualizarTroca(true);
  };

  const abrirEditarTroca = (troca) => {
    setTrocaSelecionada(troca);
    setModalEditarTroca(true);
  };

  const abrirExcluirTroca = (troca) => {
    setTrocaSelecionada(troca);
    setModalExcluirTroca(true);
  };

  const confirmarExclusaoTroca = () => {
    // Aqui você implementaria a lógica de exclusão
    console.log('Excluindo troca:', trocaSelecionada);
    setModalExcluirTroca(false);
    setTrocaSelecionada(null);
  };

  const salvarEdicaoTroca = () => {
    // Aqui você implementaria a lógica de edição
    console.log('Salvando edição da troca:', trocaSelecionada);
    setModalEditarTroca(false);
    setTrocaSelecionada(null);
  };

  const handleSalvarTroca = (e) => {
    e.preventDefault();
    // Aqui você pode adicionar a lógica para salvar no backend
    console.log('Nova troca:', novaTroca);
    alert('Troca de veículo registrada com sucesso!');
    setModalTrocaAberto(false);
    setNovaTroca({
      carro_novo: '',
      substituto: '',
      cliente: '',
      observacoes: ''
    });
  };

  const getTipoIcon = (tipo) => {
    switch(tipo) {
      case 'VAN': return <Car className="w-5 h-5" />;
      case 'MICRO': return <Bus className="w-5 h-5" />;
      case 'ÔNIBUS': return <Bus className="w-5 h-5" />;
      default: return <Bus className="w-5 h-5" />;
    }
  };

  const getTipoBadgeColor = (tipo) => {
    switch(tipo) {
      case 'VAN': return 'bg-blue-100 text-blue-800';
      case 'MICRO': return 'bg-green-100 text-green-800';
      case 'ÔNIBUS': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Veículos</h1>
            <p className="text-gray-500 mt-2">Gerenciamento completo da frota por cliente</p>
          </div>
          <button 
            onClick={abrirFormularioNovo}
            className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            <Plus className="w-5 h-5" />
            Novo Veículo
          </button>
        </div>

        {/* Estatísticas Gerais */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-6">
          <div className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-red-600">
            <p className="text-sm text-gray-600">Total de Veículos</p>
            <p className="text-2xl font-bold text-red-600">{totalVeiculos}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-gray-600">
            <p className="text-sm text-gray-600">Total Assentos</p>
            <p className="text-2xl font-bold text-gray-600">{totalAssentos}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-red-600">
            <p className="text-sm text-gray-600">Vans</p>
            <p className="text-2xl font-bold text-red-600">
              {countByTipo('VAN')}
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-gray-600">
            <p className="text-sm text-gray-600">Micros</p>
            <p className="text-2xl font-bold text-gray-600">
              {countByTipo('MICRO')}
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-red-600">
            <p className="text-sm text-gray-600">Ônibus</p>
            <p className="text-2xl font-bold text-red-600">
              {countByTipo('ÔNIBUS')}
            </p>
          </div>
        </div>

        {/* Observações Importantes */}
        <div className="mt-4 bg-white border-l-4 border-red-600 p-4 rounded-lg shadow-sm">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <svg className="h-4 w-4 text-red-600" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3 flex-1">
              <h3 className="text-xs font-medium text-gray-700 mb-2">Observações Importantes</h3>
              
              {/* Campo de adicionar nova observação */}
              <div className="flex gap-2 mb-3">
                <textarea
                  value={novaObservacao}
                  onChange={(e) => setNovaObservacao(e.target.value)}
                  placeholder="Adicione uma nova observação...&#10;Ex: Veículo 956 com manutenção pendente"
                  rows="2"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent bg-white text-gray-600 text-xs"
                />
                <button
                  onClick={() => {
                    if (novaObservacao.trim()) {
                      setObservacoes([...observacoes, { id: Date.now(), texto: novaObservacao }]);
                      setNovaObservacao('');
                    }
                  }}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg text-xs hover:bg-red-700 transition-colors h-fit"
                >
                  Salvar
                </button>
              </div>

              {/* Lista de observações salvas */}
              {observacoes.length > 0 && (
                <div className="space-y-2">
                  {observacoes.map((obs) => (
                    <div key={obs.id} className="bg-white border border-gray-200 rounded-lg p-2 flex items-start justify-between">
                      {editandoObsId === obs.id ? (
                        <div className="flex-1 flex gap-2">
                          <textarea
                            defaultValue={obs.texto}
                            onBlur={(e) => {
                              setObservacoes(observacoes.map(o => 
                                o.id === obs.id ? { ...o, texto: e.target.value } : o
                              ));
                              setEditandoObsId(null);
                            }}
                            className="flex-1 px-2 py-1 border border-gray-300 rounded text-xs"
                            rows="2"
                            autoFocus
                          />
                        </div>
                      ) : (
                        <p className="text-xs text-gray-700 flex-1">{obs.texto}</p>
                      )}
                      <div className="flex gap-1 ml-2">
                        <button
                          onClick={() => setEditandoObsId(obs.id)}
                          className="p-1 text-blue-600 hover:bg-blue-50 rounded transition-colors"
                          title="Editar"
                        >
                          <Edit2 className="w-3 h-3" />
                        </button>
                        <button
                          onClick={() => setObservacoes(observacoes.filter(o => o.id !== obs.id))}
                          className="p-1 text-red-600 hover:bg-red-50 rounded transition-colors"
                          title="Excluir"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Veículos Recentemente Adicionados */}
      <div className="bg-white rounded-lg border-l-4 border-gray-600 p-4 mb-4 shadow-sm overflow-hidden">
        <div className="flex items-start">
          <div className="flex-shrink-0">
            <Bus className="h-4 w-4 text-gray-600" />
          </div>
          <div className="ml-3 flex-1">
            <h3 className="text-xs font-medium text-gray-700 mb-2">Veículos Cadastrados Recentemente • {veiculosRecentementeAdicionados.length} veículo(s)</h3>
            {veiculosRecentementeAdicionados.length === 0 ? (
              <p className="text-xs text-gray-500">Nenhum veículo adicionado ainda</p>
            ) : (
              <div className="space-y-1">
                {veiculosRecentementeAdicionados.map((veiculo, idx) => {
                  const dataHora = veiculo.dataHoraAdicao ? new Date(veiculo.dataHoraAdicao) : null;
                  const dataFormatada = dataHora ? dataHora.toLocaleDateString('pt-BR') : '';
                  const horaFormatada = dataHora ? dataHora.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }) : '';
                  
                  return (
                    <div key={`recente-${idx}`} className="bg-white border border-gray-200 rounded p-2 text-xs">
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="font-semibold text-gray-900">{veiculo.prefixo}</span>
                          <span className="text-gray-600"> • {veiculo.tipo}</span>
                          <span className="text-gray-600"> • {veiculo.cliente}</span>
                          <span className="text-gray-500"> • {veiculo.assentos} assentos</span>
                        </div>
                        {dataHora && (
                          <div className="text-xs text-gray-500">
                            <span className="font-medium">{dataFormatada}</span> às <span className="font-medium">{horaFormatada}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modal/Formulário para criar/editar veículo */}
      {formAberto && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-lg">
            <div className="sticky top-0 bg-white border-b p-4 flex justify-between items-center">
              <h3 className="text-lg font-semibold">{isEditando ? 'Editar Veículo' : 'Novo Veículo'}</h3>
              <button type="button" onClick={() => setFormAberto(false)} className="text-gray-500 hover:text-gray-700">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={salvarVeiculoApi} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Placa *</label>
                  <input required value={formVeiculo.placa} onChange={(e) => setFormVeiculo(f => ({ ...f, placa: e.target.value }))} className="w-full border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-red-500" placeholder="Ex: ABC-1234" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Tipo *</label>
                  <select required value={formVeiculo.tipo || 'VAN'} onChange={(e) => setFormVeiculo(f => ({ ...f, tipo: e.target.value }))} className="w-full border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-red-500">
                    <option value="VAN">VAN</option>
                    <option value="MICRO">MICRO</option>
                    <option value="ÔNIBUS">ÔNIBUS</option>
                  </select>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Modelo</label>
                  <input value={formVeiculo.modelo} onChange={(e) => setFormVeiculo(f => ({ ...f, modelo: e.target.value }))} className="w-full border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-red-500" placeholder="Ex: Sprinter" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Marca</label>
                  <input value={formVeiculo.marca} onChange={(e) => setFormVeiculo(f => ({ ...f, marca: e.target.value }))} className="w-full border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-red-500" placeholder="Ex: Mercedes" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Ano de Fabricação *</label>
                  <input required value={formVeiculo.ano_fabricacao || ''} onChange={(e) => setFormVeiculo(f => ({ ...f, ano_fabricacao: e.target.value }))} className="w-full border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-red-500" type="number" min="1990" max="2030" placeholder="Ex: 2023" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Ano Modelo</label>
                  <input value={formVeiculo.ano} onChange={(e) => setFormVeiculo(f => ({ ...f, ano: e.target.value }))} className="w-full border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-red-500" type="number" min="1990" max="2030" placeholder="Ex: 2024" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Motorista</label>
                  <input value={formVeiculo.motorista || ''} onChange={(e) => setFormVeiculo(f => ({ ...f, motorista: e.target.value }))} className="w-full border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-red-500" placeholder="Nome do motorista" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Assentos</label>
                  <input value={formVeiculo.assentos || ''} onChange={(e) => setFormVeiculo(f => ({ ...f, assentos: e.target.value }))} className="w-full border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-red-500" type="number" min="1" placeholder="Ex: 20" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Cliente *</label>
                <select required value={formVeiculo.cliente_id} onChange={(e) => setFormVeiculo(f => ({ ...f, cliente_id: e.target.value }))} className="w-full border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-red-500">
                  <option value="">— Selecionar Cliente —</option>
                  {clientes.map(c => <option key={c.id} value={c.id}>{c.nome}</option>)}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center">
                  <input type="checkbox" id="ar_condicionado" checked={formVeiculo.ar_condicionado || false} onChange={(e) => setFormVeiculo(f => ({ ...f, ar_condicionado: e.target.checked }))} className="w-4 h-4 text-red-600 border-gray-300 rounded focus:ring-red-500" />
                  <label htmlFor="ar_condicionado" className="ml-2 text-sm font-medium text-gray-700">Ar Condicionado</label>
                </div>
                <div className="flex items-center">
                  <input type="checkbox" id="wc" checked={formVeiculo.wc || false} onChange={(e) => setFormVeiculo(f => ({ ...f, wc: e.target.checked }))} className="w-4 h-4 text-red-600 border-gray-300 rounded focus:ring-red-500" />
                  <label htmlFor="wc" className="ml-2 text-sm font-medium text-gray-700">WC</label>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 mt-6 pt-4 border-t">
                <button type="button" onClick={() => setFormAberto(false)} className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">Cancelar</button>
                <button type="submit" className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">Salvar Veículo</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Controle de Saídas */}
      {controleSaidasAberto ? (
        <div className="mb-8">
          <button
            onClick={() => setControleSaidasAberto(false)}
            className="mb-4 flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
          >
            <ChevronDown className="w-4 h-4" />
            Voltar para Veículos
          </button>
          <ControleSaidas />
        </div>
      ) : (
        <>
          {/* Card de Acesso ao Controle de Saídas */}
          <div className="bg-white rounded-lg border-l-4 border-red-600 mb-8 overflow-hidden shadow-sm">
            <div className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 cursor-pointer flex-1">
                  <div className="p-3 bg-red-600 rounded-lg">
                    <ClipboardList className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800">Controle de Saídas e Ocorrências</h2>
                    <p className="text-gray-600">Gerencie e monitore todas as saídas de veículos, ocorrências e quilometragem</p>
                  </div>
                </div>
                <button
                  onClick={() => setControleSaidasAberto(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  <ClipboardList className="w-5 h-5" />
                  Acessar Controle
                </button>
              </div>
            </div>
          </div>

          {/* Carros Reservas - Destaque */}
      <div className="bg-white rounded-lg border-l-4 border-gray-600 mb-8 overflow-hidden shadow-sm">
        <div className="p-6">
          <div className="flex items-center justify-between">
            <div 
              className="flex items-center gap-3 cursor-pointer flex-1"
              onClick={() => setReservasExpandido(!reservasExpandido)}
            >
              <div className="p-3 bg-gray-600 rounded-lg">
                <Bus className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-800">Carros Reservas</h2>
                <p className="text-gray-600">Frota disponível para operações especiais • {veiculosPorClienteState.RESERVA?.length || 0} veículos</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleNovaReserva();
                }}
                className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
              >
                <Plus className="w-4 h-4" />
                Adicionar Reserva
              </button>
              <div className="hidden md:flex gap-2">
                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                  {veiculosPorClienteState.RESERVA?.filter(v => v.tipo === 'VAN').length || 0} Vans
                </span>
                <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                  {veiculosPorClienteState.RESERVA?.filter(v => v.tipo === 'MICRO').length || 0} Micros
                </span>
                <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-xs font-medium">
                  {veiculosPorClienteState.RESERVA?.filter(v => v.tipo === 'ÔNIBUS').length || 0} Ônibus
                </span>
              </div>
              <div onClick={() => setReservasExpandido(!reservasExpandido)} className="cursor-pointer">
                {reservasExpandido ? <ChevronUp className="w-6 h-6 text-gray-600" /> : <ChevronDown className="w-6 h-6 text-gray-600" />}
              </div>
            </div>
          </div>
        </div>

        {reservasExpandido && (
          <div className="px-6 pb-6">
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Prefixo
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Tipo
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Ano Fab/Mod
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Assentos
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        WC
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Ar Cond.
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Ações
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {(veiculosPorClienteState.RESERVA || []).map((veiculo, idx) => (
                      <tr key={`reserva-${veiculo.prefixo}-${idx}`} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-3">
                            <div className="text-gray-500">
                              {getTipoIcon(veiculo.tipo)}
                            </div>
                            <span className="font-semibold text-gray-900">{veiculo.prefixo}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getTipoBadgeColor(veiculo.tipo)}`}>
                            {veiculo.tipo}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                          {veiculo.ano_fabricacao}/{veiculo.ano_modelo || '-'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {veiculo.assentos}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 rounded text-xs font-medium ${
                            veiculo.wc ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                          }`}>
                            {veiculo.wc ? 'Sim' : 'Não'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 rounded text-xs font-medium ${
                            veiculo.ar_condicionado ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                          }`}>
                            {veiculo.ar_condicionado ? 'Sim' : 'Não'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex justify-end gap-2">
                            <button
                              onClick={() => abrirFormularioEdicao({ placa: veiculo.prefixo, modelo: '', marca: '', cliente_id: null })}
                              className="text-blue-600 hover:text-blue-900 p-2 hover:bg-blue-50 rounded transition-colors"
                              title="Editar"
                            >
                              <Edit2 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => alert('Excluir de reservas não está disponível via API; remova manualmente.')}
                              className="text-red-600 hover:text-red-900 p-2 hover:bg-red-50 rounded transition-colors"
                              title="Excluir"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Trocas de Veículos - Histórico */}
      <div className="bg-white rounded-lg border-l-4 border-red-600 mb-8 overflow-hidden shadow-sm">
        <div className="p-6">
          <div className="flex items-center justify-between">
            <div 
              className="flex items-center gap-3 cursor-pointer flex-1"
              onClick={() => setTrocasExpandido(!trocasExpandido)}
            >
              <div className="p-3 bg-red-600 rounded-lg">
                <RefreshCw className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-800">Trocas de Veículos</h2>
                <p className="text-gray-600">Histórico de substituições e movimentações • {trocasVeiculos.length} trocas registradas</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleNovaTroca();
                }}
                className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                <Plus className="w-4 h-4" />
                Registrar Troca
              </button>
              <div onClick={() => setTrocasExpandido(!trocasExpandido)} className="cursor-pointer">
                {trocasExpandido ? <ChevronUp className="w-6 h-6 text-gray-600" /> : <ChevronDown className="w-6 h-6 text-gray-600" />}
              </div>
            </div>
          </div>
        </div>

        {trocasExpandido && (
          <div className="px-6 pb-6">
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Seq
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Carro Novo
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Substituto
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Cliente
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Observações
                      </th>
                      <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Ações
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {trocasVeiculos.map((troca, idx) => (
                      <tr key={`troca-${troca.seq}-${idx}`} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-xs font-bold">
                            #{troca.seq}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            <span className="font-semibold text-gray-900">{troca.carro_novo}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                            <span className="font-medium text-gray-600">{troca.substituto}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                            {troca.cliente}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-sm text-gray-600 italic">{troca.observacoes}</span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center justify-center gap-2">
                            <button
                              onClick={() => abrirVisualizarTroca(troca)}
                              className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                              title="Visualizar troca"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => abrirEditarTroca(troca)}
                              className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                              title="Editar troca"
                            >
                              <Edit2 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => abrirExcluirTroca(troca)}
                              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                              title="Excluir troca"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Filtros e Busca */}
      <div className="bg-white p-6 rounded-xl shadow-sm border mb-8">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-800">Veículos por Cliente</h3>
          {(searchTerm !== '' || tipoFiltro !== 'TODOS' || clienteSelecionado !== 'TODOS') && (
            <button
              onClick={limparFiltros}
              className="px-4 py-2 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors flex items-center gap-2"
            >
              <X className="w-4 h-4" />
              Limpar Filtros
            </button>
          )}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Buscar por prefixo, tipo ou cliente..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <select
              value={clienteSelecionado}
              onChange={(e) => setClienteSelecionado(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="TODOS">Todos os clientes</option>
              {Object.keys(veiculosPorCliente).filter(c => c !== 'RESERVA').sort().map(cliente => (
                <option key={cliente} value={cliente}>{cliente}</option>
              ))}
            </select>
          </div>
          <div>
            <select
              value={tipoFiltro}
              onChange={(e) => setTipoFiltro(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="TODOS">Todos os tipos</option>
              <option value="VAN">Van</option>
              <option value="MICRO">Micro-ônibus</option>
              <option value="ÔNIBUS">Ônibus</option>
            </select>
          </div>
        </div>
      </div>

      {/* Veículos por Cliente */}
      <div className="space-y-6">
        {Object.entries(veiculosPorClienteState)
          .filter(([cliente]) => cliente !== 'RESERVA') // Excluir RESERVA da lista de clientes
          .filter(([cliente]) => clienteSelecionado === 'TODOS' || cliente === clienteSelecionado)
          .sort((a, b) => a[0].localeCompare(b[0]))
          .map(([cliente, veiculos]) => {
            // Filtrar veículos pela busca e tipo
            const veiculosDoCliente = veiculos.filter(v => {
              const matchSearch = v.prefixo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                  v.tipo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                  cliente.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                  (v.motorista && v.motorista.toLowerCase().includes(searchTerm.toLowerCase()));
              const matchTipo = tipoFiltro === 'TODOS' || v.tipo === tipoFiltro;
              return matchSearch && matchTipo;
            });

            if (veiculosDoCliente.length === 0) return null;

            // Auto-expandir quando há busca ativa, cliente específico selecionado, ou manualmente expandido
            const isExpanded = searchTerm !== '' || clienteSelecionado !== 'TODOS' ? true : (clientesExpandidos[cliente] || false);
            const totalAssentosCliente = veiculosDoCliente.reduce((acc, v) => acc + v.assentos, 0);

            return (
              <div key={cliente} className="bg-white rounded-xl shadow-sm border overflow-hidden">
                {/* Header do Cliente */}
                <div 
                  className="bg-white p-6 cursor-pointer hover:bg-gray-50 transition-colors border-b"
                  onClick={() => toggleCliente(cliente)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-red-600 rounded-lg">
                        <Building2 className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-800">{cliente}</h3>
                        <p className="text-sm text-gray-600 mt-1">
                          {veiculosDoCliente.length} veículo(s) • {totalAssentosCliente} assentos
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="hidden md:flex gap-2">
                        <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-xs font-medium">
                          {veiculosDoCliente.filter(v => v.tipo === 'VAN').length} Vans
                        </span>
                        <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                          {veiculosDoCliente.filter(v => v.tipo === 'MICRO').length} Micros
                        </span>
                        <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-xs font-medium">
                          {veiculosDoCliente.filter(v => v.tipo === 'ÔNIBUS').length} Ônibus
                        </span>
                      </div>
                      {isExpanded ? <ChevronUp className="w-6 h-6 text-gray-600" /> : <ChevronDown className="w-6 h-6 text-gray-600" />}
                    </div>
                  </div>
                </div>

                {/* Tabela de Veículos do Cliente */}
                {isExpanded && (
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Prefixo
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Tipo
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Modelo
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Ano Fab.
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Assentos
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            WC
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Ar
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Motorista
                          </th>
                          <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Ações
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {veiculosDoCliente.map((veiculo, idx) => (
                          <tr key={`${cliente}-${veiculo.prefixo}-${idx}`} className="hover:bg-gray-50 transition-colors">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center gap-3">
                                <div className="text-gray-500">
                                  {getTipoIcon(veiculo.tipo)}
                                </div>
                                <span className="font-semibold text-gray-900">{veiculo.prefixo}</span>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`px-3 py-1 rounded-full text-xs font-medium ${getTipoBadgeColor(veiculo.tipo)}`}>
                                {veiculo.tipo}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                              {veiculo.modelo || '-'}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                              {veiculo.ano_fabricacao || '-'}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              {veiculo.assentos}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`px-2 py-1 rounded text-xs font-medium ${
                                veiculo.wc ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                              }`}>
                                {veiculo.wc ? 'Sim' : 'Não'}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`px-2 py-1 rounded text-xs font-medium ${
                                veiculo.ar_condicionado ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                              }`}>
                                {veiculo.ar_condicionado ? 'Sim' : 'Não'}
                              </span>
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-600 max-w-xs truncate">
                              {veiculo.motorista || '-'}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                              <div className="flex justify-end gap-2">
                                <button
                                  onClick={() => veiculo.id ? abrirFormularioEdicao(veiculo) : alert('Edição disponível apenas para veículos cadastrados')}
                                  className="text-blue-600 hover:text-blue-900 p-2 hover:bg-blue-50 rounded transition-colors"
                                  title="Editar"
                                >
                                  <Edit2 className="w-4 h-4" />
                                </button>
                                <button
                                  onClick={() => veiculo.id ? excluirVeiculoApi(veiculo.id) : alert('Exclusão disponível apenas para veículos cadastrados')}
                                  className="text-red-600 hover:text-red-900 p-2 hover:bg-red-50 rounded transition-colors"
                                  title="Excluir"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            );
          })}
      </div>

      {/* Mensagem quando não há resultados */}
      {Object.entries(veiculosPorClienteState)
        .filter(([cliente]) => cliente !== 'RESERVA')
        .filter(([cliente]) => clienteSelecionado === 'TODOS' || cliente === clienteSelecionado)
        .every(([, veiculos]) => {
          const filtrados = veiculos.filter(v => {
            const matchSearch = v.prefixo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                v.tipo.toLowerCase().includes(searchTerm.toLowerCase());
            const matchTipo = tipoFiltro === 'TODOS' || v.tipo === tipoFiltro;
            return matchSearch && matchTipo;
          });
          return filtrados.length === 0;
        }) && (
        <div className="text-center py-12 bg-white rounded-xl shadow-sm">
          <Bus className="w-12 h-12 text-gray-400 mx-auto mb-3" />
          <p className="text-gray-500">Nenhum veículo encontrado com os filtros aplicados</p>
        </div>
      )}

      {/* Modal Novo Veículo */}
      {modalAberto && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-800">Cadastrar Novo Veículo</h2>
              <button 
                onClick={() => setModalAberto(false)}
                className="text-gray-500 hover:text-gray-700 p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleSalvarVeiculo} className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Cliente */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Cliente *
                  </label>
                  <select
                    value={novoVeiculo.cliente}
                    onChange={(e) => setNovoVeiculo({...novoVeiculo, cliente: e.target.value})}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Selecione o cliente</option>
                    <option value="RESERVA">RESERVA</option>
                    <option value="RETIDO">RETIDO</option>
                    <option value="ALUGADO">ALUGADO</option>
                    {Object.keys(veiculosPorCliente).filter(c => c !== 'RESERVA').sort().map(cliente => (
                      <option key={cliente} value={cliente}>{cliente}</option>
                    ))}
                  </select>
                </div>

                {/* Prefixo */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Prefixo *
                  </label>
                  <input
                    type="text"
                    value={novoVeiculo.prefixo}
                    onChange={(e) => setNovoVeiculo({...novoVeiculo, prefixo: e.target.value})}
                    required
                    placeholder="Ex: 956"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                {/* Tipo */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tipo *
                  </label>
                  <select
                    value={novoVeiculo.tipo}
                    onChange={(e) => setNovoVeiculo({...novoVeiculo, tipo: e.target.value})}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="VAN">VAN</option>
                    <option value="MICRO">MICRO</option>
                    <option value="ÔNIBUS">ÔNIBUS</option>
                  </select>
                </div>

                {/* Ano Fabricação */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Ano Fabricação *
                  </label>
                  <input
                    type="number"
                    value={novoVeiculo.ano_fabricacao}
                    onChange={(e) => setNovoVeiculo({...novoVeiculo, ano_fabricacao: e.target.value})}
                    required
                    placeholder="Ex: 2023"
                    min="1990"
                    max="2030"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                {/* Ano Modelo */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Ano Modelo
                  </label>
                  <input
                    type="number"
                    value={novoVeiculo.ano_modelo}
                    onChange={(e) => setNovoVeiculo({...novoVeiculo, ano_modelo: e.target.value})}
                    placeholder="Ex: 2024"
                    min="1990"
                    max="2030"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                {/* Assentos */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Assentos *
                  </label>
                  <input
                    type="number"
                    value={novoVeiculo.assentos}
                    onChange={(e) => setNovoVeiculo({...novoVeiculo, assentos: e.target.value})}
                    required
                    placeholder="Ex: 45"
                    min="1"
                    max="100"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                {/* Quantidade de Turnos */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Quantidade de Turnos
                  </label>
                  <input
                    type="number"
                    value={novoVeiculo.quantidade_turnos}
                    onChange={(e) => setNovoVeiculo({...novoVeiculo, quantidade_turnos: e.target.value})}
                    placeholder="Ex: 1, 2, 3"
                    min="1"
                    max="10"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                {/* Ar Condicionado */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Ar Condicionado
                  </label>
                  <div className="flex items-center gap-4 mt-3">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        checked={novoVeiculo.ar_condicionado === true}
                        onChange={() => setNovoVeiculo({...novoVeiculo, ar_condicionado: true})}
                        className="w-4 h-4 text-blue-600"
                      />
                      <span className="text-sm text-gray-700">Sim</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        checked={novoVeiculo.ar_condicionado === false}
                        onChange={() => setNovoVeiculo({...novoVeiculo, ar_condicionado: false})}
                        className="w-4 h-4 text-blue-600"
                      />
                      <span className="text-sm text-gray-700">Não</span>
                    </label>
                  </div>
                </div>

                {/* WC */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    WC (Banheiro)
                  </label>
                  <div className="flex items-center gap-4 mt-3">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        checked={novoVeiculo.wc === true}
                        onChange={() => setNovoVeiculo({...novoVeiculo, wc: true})}
                        className="w-4 h-4 text-blue-600"
                      />
                      <span className="text-sm text-gray-700">Sim</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        checked={novoVeiculo.wc === false}
                        onChange={() => setNovoVeiculo({...novoVeiculo, wc: false})}
                        className="w-4 h-4 text-blue-600"
                      />
                      <span className="text-sm text-gray-700">Não</span>
                    </label>
                  </div>
                </div>

                {/* Motorista */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Motorista
                  </label>
                  <input
                    type="text"
                    value={novoVeiculo.motorista}
                    onChange={(e) => setNovoVeiculo({...novoVeiculo, motorista: e.target.value})}
                    placeholder="Ex: João Silva"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                {/* Local de Saída */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Local de Saída
                  </label>
                  <input
                    type="text"
                    value={novoVeiculo.local_saida || ''}
                    onChange={(e) => setNovoVeiculo({...novoVeiculo, local_saida: e.target.value})}
                    placeholder="Ex: CABO TURNO 1.0"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                {/* Rota */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Rota
                  </label>
                  <input
                    type="text"
                    value={novoVeiculo.rota || ''}
                    onChange={(e) => setNovoVeiculo({...novoVeiculo, rota: e.target.value})}
                    placeholder="Ex: JEAN YEN"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                {/* Casa do Motorista */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Casa do Motorista
                  </label>
                  <input
                    type="text"
                    value={novoVeiculo.casa_motorista || ''}
                    onChange={(e) => setNovoVeiculo({...novoVeiculo, casa_motorista: e.target.value})}
                    placeholder="Ex: CASA MOTORISTA"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                {/* Marca */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Marca
                  </label>
                  <input
                    type="text"
                    value={novoVeiculo.marca || ''}
                    onChange={(e) => setNovoVeiculo({...novoVeiculo, marca: e.target.value})}
                    placeholder="Ex: Mercedes, Volvo"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="flex gap-3 mt-6 pt-6 border-t">
                <button
                  type="button"
                  onClick={() => setModalAberto(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Cadastrar Veículo
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal - Nova Reserva */}
      {modalReservaAberto && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-gradient-to-r from-amber-600 to-orange-600 text-white p-6 rounded-t-xl">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-2xl font-bold">Adicionar Veículo Reserva</h2>
                  <p className="text-amber-100 mt-1">Cadastre um novo veículo na frota de reservas</p>
                </div>
                <button
                  onClick={() => setModalReservaAberto(false)}
                  className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            <form onSubmit={handleSalvarReserva} className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Prefixo */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Prefixo *
                  </label>
                  <input
                    type="text"
                    value={novaReserva.prefixo}
                    onChange={(e) => setNovaReserva({...novaReserva, prefixo: e.target.value})}
                    required
                    placeholder="Ex: 956"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  />
                </div>

                {/* Tipo */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tipo *
                  </label>
                  <select
                    value={novaReserva.tipo}
                    onChange={(e) => setNovaReserva({...novaReserva, tipo: e.target.value})}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  >
                    <option value="VAN">VAN</option>
                    <option value="MICRO">MICRO</option>
                    <option value="ÔNIBUS">ÔNIBUS</option>
                  </select>
                </div>

                {/* Ano Fabricação */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Ano Fabricação *
                  </label>
                  <input
                    type="number"
                    value={novaReserva.ano_fabricacao}
                    onChange={(e) => setNovaReserva({...novaReserva, ano_fabricacao: e.target.value})}
                    required
                    placeholder="Ex: 2023"
                    min="1990"
                    max="2030"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  />
                </div>

                {/* Ano Modelo */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Ano Modelo
                  </label>
                  <input
                    type="number"
                    value={novaReserva.ano_modelo}
                    onChange={(e) => setNovaReserva({...novaReserva, ano_modelo: e.target.value})}
                    placeholder="Ex: 2024"
                    min="1990"
                    max="2030"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  />
                </div>

                {/* Assentos */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Assentos *
                  </label>
                  <input
                    type="number"
                    value={novaReserva.assentos}
                    onChange={(e) => setNovaReserva({...novaReserva, assentos: e.target.value})}
                    required
                    placeholder="Ex: 45"
                    min="1"
                    max="100"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  />
                </div>

                {/* Quantidade de Turnos */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Quantidade de Turnos
                  </label>
                  <input
                    type="number"
                    value={novaReserva.quantidade_turnos}
                    onChange={(e) => setNovaReserva({...novaReserva, quantidade_turnos: e.target.value})}
                    placeholder="Ex: 1, 2, 3"
                    min="1"
                    max="10"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  />
                </div>

                {/* Ar Condicionado */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Ar Condicionado
                  </label>
                  <div className="flex items-center gap-4 mt-3">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        checked={novaReserva.ar_condicionado === true}
                        onChange={() => setNovaReserva({...novaReserva, ar_condicionado: true})}
                        className="w-4 h-4 text-amber-600"
                      />
                      <span className="text-sm text-gray-700">Sim</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        checked={novaReserva.ar_condicionado === false}
                        onChange={() => setNovaReserva({...novaReserva, ar_condicionado: false})}
                        className="w-4 h-4 text-amber-600"
                      />
                      <span className="text-sm text-gray-700">Não</span>
                    </label>
                  </div>
                </div>

                {/* WC */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    WC
                  </label>
                  <div className="flex items-center gap-4 mt-3">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        checked={novaReserva.wc === true}
                        onChange={() => setNovaReserva({...novaReserva, wc: true})}
                        className="w-4 h-4 text-amber-600"
                      />
                      <span className="text-sm text-gray-700">Sim</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        checked={novaReserva.wc === false}
                        onChange={() => setNovaReserva({...novaReserva, wc: false})}
                        className="w-4 h-4 text-amber-600"
                      />
                      <span className="text-sm text-gray-700">Não</span>
                    </label>
                  </div>
                </div>

                {/* Motorista */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Motorista
                  </label>
                  <input
                    type="text"
                    value={novaReserva.motorista}
                    onChange={(e) => setNovaReserva({...novaReserva, motorista: e.target.value})}
                    placeholder="Ex: João Silva / Pedro Santos"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  />
                </div>

                {/* Local de Saída */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Local de Saída
                  </label>
                  <input
                    type="text"
                    value={novaReserva.local_saida || ''}
                    onChange={(e) => setNovaReserva({...novaReserva, local_saida: e.target.value})}
                    placeholder="Ex: CABO TURNO 1.0"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  />
                </div>

                {/* Rota */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Rota
                  </label>
                  <input
                    type="text"
                    value={novaReserva.rota || ''}
                    onChange={(e) => setNovaReserva({...novaReserva, rota: e.target.value})}
                    placeholder="Ex: JEAN YEN"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  />
                </div>

                {/* Casa do Motorista */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Casa do Motorista
                  </label>
                  <input
                    type="text"
                    value={novaReserva.casa_motorista || ''}
                    onChange={(e) => setNovaReserva({...novaReserva, casa_motorista: e.target.value})}
                    placeholder="Ex: CASA MOTORISTA"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  />
                </div>

                {/* Marca */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Marca
                  </label>
                  <input
                    type="text"
                    value={novaReserva.marca || ''}
                    onChange={(e) => setNovaReserva({...novaReserva, marca: e.target.value})}
                    placeholder="Ex: Mercedes, Volvo"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="flex gap-3 mt-6 pt-6 border-t">
                <button
                  type="button"
                  onClick={() => setModalReservaAberto(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors"
                >
                  Adicionar à Reserva
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal - Nova Troca */}
      {modalTrocaAberto && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-gradient-to-r from-emerald-600 to-teal-600 text-white p-6 rounded-t-xl">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-2xl font-bold">Registrar Troca de Veículo</h2>
                  <p className="text-emerald-100 mt-1">Registre uma nova substituição de veículo</p>
                </div>
                <button
                  onClick={() => setModalTrocaAberto(false)}
                  className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            <form onSubmit={handleSalvarTroca} className="p-6">
              <div className="space-y-6">
                {/* Carro Novo */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Carro Novo (Prefixo) *
                  </label>
                  <input
                    type="text"
                    value={novaTroca.carro_novo}
                    onChange={(e) => setNovaTroca({...novaTroca, carro_novo: e.target.value})}
                    required
                    placeholder="Ex: 102544"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  />
                  <p className="text-xs text-gray-500 mt-1">Prefixo do veículo que está entrando</p>
                </div>

                {/* Substituto */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Substituto (Prefixo) *
                  </label>
                  <input
                    type="text"
                    value={novaTroca.substituto}
                    onChange={(e) => setNovaTroca({...novaTroca, substituto: e.target.value})}
                    required
                    placeholder="Ex: 2544"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  />
                  <p className="text-xs text-gray-500 mt-1">Prefixo do veículo que está saindo</p>
                </div>

                {/* Cliente */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Cliente *
                  </label>
                  <select
                    value={novaTroca.cliente}
                    onChange={(e) => setNovaTroca({...novaTroca, cliente: e.target.value})}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  >
                    <option value="">Selecione o cliente</option>
                    {Object.keys(veiculosPorCliente).filter(c => c !== 'RESERVA').sort().map(cliente => (
                      <option key={cliente} value={cliente}>{cliente}</option>
                    ))}
                  </select>
                </div>

                {/* Observações */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Observações *
                  </label>
                  <textarea
                    value={novaTroca.observacoes}
                    onChange={(e) => setNovaTroca({...novaTroca, observacoes: e.target.value})}
                    required
                    placeholder="Ex: Carro antigo foi para RESERVA"
                    rows="3"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent resize-none"
                  />
                </div>
              </div>

              <div className="flex gap-3 mt-6 pt-6 border-t">
                <button
                  type="button"
                  onClick={() => setModalTrocaAberto(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
                >
                  Registrar Troca
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Visualizar Troca */}
      {modalVisualizarTroca && trocaSelecionada && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold">Detalhes da Troca</h2>
                  <p className="text-blue-100 mt-1">Sequência #{trocaSelecionada.seq}</p>
                </div>
                <button
                  onClick={() => setModalVisualizarTroca(false)}
                  className="p-2 hover:bg-blue-600 rounded-lg transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* Informações da Troca */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-green-50 p-4 rounded-lg border-2 border-green-200">
                  <p className="text-xs font-medium text-green-600 uppercase mb-1">Carro Novo</p>
                  <p className="text-2xl font-bold text-green-800">{trocaSelecionada.carro_novo}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-xs text-green-700">Veículo que entrou</span>
                  </div>
                </div>

                <div className="bg-red-50 p-4 rounded-lg border-2 border-red-200">
                  <p className="text-xs font-medium text-red-600 uppercase mb-1">Substituto</p>
                  <p className="text-2xl font-bold text-red-800">{trocaSelecionada.substituto}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    <span className="text-xs text-red-700">Veículo que saiu</span>
                  </div>
                </div>
              </div>

              {/* Cliente */}
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <p className="text-xs font-medium text-blue-600 uppercase mb-2">Cliente</p>
                <div className="flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-blue-600" />
                  <span className="text-lg font-semibold text-blue-800">{trocaSelecionada.cliente}</span>
                </div>
              </div>

              {/* Observações */}
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <p className="text-xs font-medium text-gray-600 uppercase mb-2">Observações</p>
                <p className="text-gray-800 italic">{trocaSelecionada.observacoes}</p>
              </div>
            </div>

            <div className="p-6 border-t">
              <button
                onClick={() => setModalVisualizarTroca(false)}
                className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Editar Troca */}
      {modalEditarTroca && trocaSelecionada && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="bg-gradient-to-r from-green-600 to-green-700 p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold">Editar Troca</h2>
                  <p className="text-green-100 mt-1">Sequência #{trocaSelecionada.seq}</p>
                </div>
                <button
                  onClick={() => setModalEditarTroca(false)}
                  className="p-2 hover:bg-green-600 rounded-lg transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            <div className="p-6">
              <div className="space-y-4">
                {/* Carro Novo */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Carro Novo (Prefixo) *
                  </label>
                  <input
                    type="text"
                    value={trocaSelecionada.carro_novo}
                    onChange={(e) => setTrocaSelecionada({...trocaSelecionada, carro_novo: e.target.value})}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>

                {/* Substituto */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Substituto (Prefixo) *
                  </label>
                  <input
                    type="text"
                    value={trocaSelecionada.substituto}
                    onChange={(e) => setTrocaSelecionada({...trocaSelecionada, substituto: e.target.value})}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>

                {/* Cliente */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Cliente *
                  </label>
                  <select
                    value={trocaSelecionada.cliente}
                    onChange={(e) => setTrocaSelecionada({...trocaSelecionada, cliente: e.target.value})}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    <option value="">Selecione o cliente</option>
                    {Object.keys(veiculosPorCliente).filter(c => c !== 'RESERVA').sort().map(cliente => (
                      <option key={cliente} value={cliente}>{cliente}</option>
                    ))}
                  </select>
                </div>

                {/* Observações */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Observações *
                  </label>
                  <textarea
                    value={trocaSelecionada.observacoes}
                    onChange={(e) => setTrocaSelecionada({...trocaSelecionada, observacoes: e.target.value})}
                    required
                    rows="3"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
                  />
                </div>
              </div>

              <div className="flex gap-3 mt-6 pt-6 border-t">
                <button
                  type="button"
                  onClick={() => setModalEditarTroca(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  onClick={salvarEdicaoTroca}
                  className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  Salvar Alterações
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal Excluir Troca */}
      {modalExcluirTroca && trocaSelecionada && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full">
            <div className="bg-gradient-to-r from-red-600 to-red-700 p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold">Excluir Troca</h2>
                  <p className="text-red-100 mt-1">Sequência #{trocaSelecionada.seq}</p>
                </div>
                <button
                  onClick={() => setModalExcluirTroca(false)}
                  className="p-2 hover:bg-red-600 rounded-lg transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            <div className="p-6">
              {/* Alerta */}
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-yellow-700 font-medium">
                      Esta ação não pode ser desfeita!
                    </p>
                  </div>
                </div>
              </div>

              {/* Informações da Troca */}
              <div className="space-y-3 mb-6">
                <div className="flex justify-between items-center py-2 border-b">
                  <span className="text-gray-600">Carro Novo:</span>
                  <span className="font-semibold text-gray-900">{trocaSelecionada.carro_novo}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b">
                  <span className="text-gray-600">Substituto:</span>
                  <span className="font-semibold text-gray-900">{trocaSelecionada.substituto}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b">
                  <span className="text-gray-600">Cliente:</span>
                  <span className="font-semibold text-gray-900">{trocaSelecionada.cliente}</span>
                </div>
              </div>

              <p className="text-gray-700 mb-6">
                Tem certeza que deseja excluir este registro de troca de veículo?
              </p>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setModalExcluirTroca(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  onClick={confirmarExclusaoTroca}
                  className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  Confirmar Exclusão
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
        </>
      )}
    </div>
  );
};

export default Veiculos;
