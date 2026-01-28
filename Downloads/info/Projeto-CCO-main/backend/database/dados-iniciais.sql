--
-- PostgreSQL database dump
--

\restrict rZv1NEfgxD1xA8dF3kpJEWeu47chClTil6MCMUd1WsWGv4zQfSxIt21nDmauQmW

-- Dumped from database version 18.1
-- Dumped by pg_dump version 18.1

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Data for Name: clientes; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.clientes VALUES (28, 'PREFEITURA IPO', '11573521000172', '', '', '', 2, true, '2026-01-13 17:11:55.639326', '2026-01-13 17:11:55.639326', NULL, 'ALTO', 'WHATSAPP', 'LIGAÇÃO', 'E-MAIL', NULL, NULL);
INSERT INTO public.clientes VALUES (1, 'aaaaaaaaa', '111111111111', '222222222', 'ale@gmail.com', 'fffffffffff', 1, false, '2026-01-13 17:06:12.012699', '2026-01-13 17:06:12.012699', NULL, 'ALTO', 'WHATSAPP', 'LIGAÇÃO', 'E-MAIL', NULL, NULL);
INSERT INTO public.clientes VALUES (27, 'VILA GALÉ', '49701071000208', '(81) 97909-2273', 'cabo.rh@vilagale.com', '', 2, true, '2026-01-13 17:11:55.638808', '2026-01-13 17:26:08.770564', 'Janaina', 'ALTO', 'WHATSAPP', 'LIGAÇÃO', 'E-MAIL', NULL, NULL);
INSERT INTO public.clientes VALUES (14, 'AMANCO', '61156113000140', '(81) 98721-2891', 'luciana.lira@wavin.com', '', 2, true, '2026-01-13 17:11:55.633137', '2026-01-13 17:26:08.771237', 'Luciana', 'ALTO', 'WHATSAPP', 'LIGAÇÃO', 'E-MAIL', NULL, NULL);
INSERT INTO public.clientes VALUES (23, '51 MULLER', '61066726000241', '(81) 99618-7458', 'julianafreitas@ciamuller.com.br', '', 2, true, '2026-01-13 17:11:55.637304', '2026-01-13 17:26:08.771929', 'Juliana', 'ALTO', 'WHATSAPP', 'LIGAÇÃO', 'E-MAIL', NULL, NULL);
INSERT INTO public.clientes VALUES (25, 'DECAL', '19645540000198', '(81) 3311-5965', 'nsilva@decalbrasil.com', '', 2, true, '2026-01-13 17:11:55.638079', '2026-01-13 17:26:08.772607', 'Nicolly', 'ALTO', 'WHATSAPP', 'LIGAÇÃO', 'E-MAIL', NULL, NULL);
INSERT INTO public.clientes VALUES (10, 'MARELLI', '49701071000127', '(81) 98573-3404', 'gilvanice.silva@external.marelli.com / roney.rocha@marelli.com', '', 2, true, '2026-01-13 17:11:55.630825', '2026-01-13 17:26:08.77324', 'Gilvanice', 'ALTO', 'WHATSAPP', 'LIGAÇÃO', 'E-MAIL', NULL, NULL);
INSERT INTO public.clientes VALUES (16, 'MONTE RODOVIAS', '19645540000117', '(81) 98160-3657', 'robson.lucena@monterodovias.com.br / deyse.silva@monterodovias.com.br', '', 2, true, '2026-01-13 17:11:55.633974', '2026-01-13 17:26:08.773908', 'Robson', 'ALTO', 'WHATSAPP', 'LIGAÇÃO', 'E-MAIL', NULL, NULL);
INSERT INTO public.clientes VALUES (24, 'MOURA', '10823605000202', '(81) 98896-5728', 'janildo.possidonio@grupomoura.com', '', 2, true, '2026-01-13 17:11:55.637706', '2026-01-13 17:26:08.774556', 'Janildo', 'ALTO', 'WHATSAPP', 'LIGAÇÃO', 'E-MAIL', NULL, NULL);
INSERT INTO public.clientes VALUES (12, 'MASTERFOODS', '00789323000120', '(11) 96394-9798', 'pamela.vieira@effem.com', '', 2, true, '2026-01-13 17:11:55.632325', '2026-01-13 17:26:08.775234', 'Pamela', 'ALTO', 'WHATSAPP', 'LIGAÇÃO', 'E-MAIL', NULL, NULL);
INSERT INTO public.clientes VALUES (21, 'ImBETTA', '08467115000291', '(81) 99164-5104', 'karine.pereira@sandene.com.br', '', 2, true, '2026-01-13 17:11:55.636365', '2026-01-13 17:26:08.775809', 'Karine', 'ALTO', 'WHATSAPP', 'LIGAÇÃO', 'E-MAIL', NULL, NULL);
INSERT INTO public.clientes VALUES (11, 'ACHÉ', '60659463000191', '(81) 99964-7277 / 98120-3525', 'silvandro.santos@ache.com.br / jasiane.silva@ache.com.br', '', 2, true, '2026-01-13 17:11:55.631664', '2026-01-13 17:26:08.759704', 'Lima/Jasiane', 'ALTO', 'WHATSAPP', 'LIGAÇÃO', 'E-MAIL', NULL, NULL);
INSERT INTO public.clientes VALUES (15, 'AMCOR', '61156113000309', '(81) 99114-8722', 'Ricardo.Barros@amcor.com', '', 2, true, '2026-01-13 17:11:55.633579', '2026-01-13 17:26:08.76169', 'Ricardo', 'ALTO', 'WHATSAPP', 'LIGAÇÃO', 'E-MAIL', NULL, NULL);
INSERT INTO public.clientes VALUES (3, 'JEEP', '59104422000155', '(81) 99804-8387', 'douglas.duarte2@external.stellantis.com', '', 2, true, '2026-01-13 17:11:55.626412', '2026-01-13 17:26:08.762594', 'Douglas', 'ALTO', 'WHATSAPP', 'LIGAÇÃO', 'E-MAIL', NULL, NULL);
INSERT INTO public.clientes VALUES (9, 'TECON', '07418535000182', '(81) 98423-8350', 'VMorais@teconsuape.com / AAlcoforado@teconsuape.com', '', 2, true, '2026-01-13 17:11:55.630097', '2026-01-13 17:26:08.763515', 'Valeria', 'ALTO', 'WHATSAPP', 'LIGAÇÃO', 'E-MAIL', NULL, NULL);
INSERT INTO public.clientes VALUES (6, 'PIACENTINI', '61152932000109', '(13) 99606-3998', 'karllili.ns@piacentinibrasil.com', '', 2, true, '2026-01-13 17:11:55.628539', '2026-01-13 17:26:08.764881', 'Karlili Souza', 'ALTO', 'WHATSAPP', 'LIGAÇÃO', 'E-MAIL', NULL, NULL);
INSERT INTO public.clientes VALUES (8, 'MERCADO LIVRE', '10573521000191', '(81) 98752-2363', 'ext_brunalbu@mercadolivre.com', '', 2, true, '2026-01-13 17:11:55.629586', '2026-01-13 17:26:08.765686', 'Gilson', 'ALTO', 'WHATSAPP', 'LIGAÇÃO', 'E-MAIL', NULL, NULL);
INSERT INTO public.clientes VALUES (4, 'CONSAG', '08149811000155', '(81) 98135-2350 / (31) 98328-8066', 'aldecirdes.junior@agnet.com.br', '', 2, true, '2026-01-13 17:11:55.627372', '2026-01-13 17:26:08.766424', 'Junior/Klehandro', 'ALTO', 'WHATSAPP', 'LIGAÇÃO', 'E-MAIL', NULL, NULL);
INSERT INTO public.clientes VALUES (5, 'CBA', '33047538000115', '(81) 98190-2385', 'carlos.silva@cba.com.br', '', 2, true, '2026-01-13 17:11:55.628011', '2026-01-13 17:26:08.767157', 'Carlos', 'ALTO', 'WHATSAPP', 'LIGAÇÃO', 'E-MAIL', NULL, NULL);
INSERT INTO public.clientes VALUES (7, 'VIVÁ/SOLAR', '08467115000100', '(81) 98111-5772', 'dp@solarportodegalinhas.com.br', '', 2, true, '2026-01-13 17:11:55.629048', '2026-01-13 17:26:08.767908', 'Juliana', 'ALTO', 'WHATSAPP', 'LIGAÇÃO', 'E-MAIL', NULL, NULL);
INSERT INTO public.clientes VALUES (17, 'CIMENTO FORTE', '07880765000140', '(81) 99998-2570 / (81) 3561-3515', 'edgard.ln@asanet.com.br', '', 2, true, '2026-01-13 17:11:55.634449', '2026-01-13 17:26:08.768653', 'Edgard Fernandes', 'ALTO', 'WHATSAPP', 'LIGAÇÃO', 'E-MAIL', NULL, NULL);
INSERT INTO public.clientes VALUES (13, 'CAMPARI', '61066726000160', '(81) 99286-5886', 'andre.pereira@campari.com', '', 2, true, '2026-01-13 17:11:55.632743', '2026-01-13 17:26:08.769281', 'André Pereira', 'ALTO', 'WHATSAPP', 'LIGAÇÃO', 'E-MAIL', NULL, NULL);
INSERT INTO public.clientes VALUES (22, 'CRISTAL PET', '07418535000263', '(81) 99113-2208', 'telma.ramos@envases.com.br', '', 2, true, '2026-01-13 17:11:55.636885', '2026-01-13 17:26:08.769876', 'Telma', 'ALTO', 'WHATSAPP', 'LIGAÇÃO', 'E-MAIL', NULL, NULL);
INSERT INTO public.clientes VALUES (20, 'HDH', '00882304000225', '(81) 3183-0019 / (81) 98681-2087', 'hdh.recepcaoportaria@hdh.fpmf.org.br', '', 2, true, '2026-01-13 17:11:55.635796', '2026-01-13 17:26:08.776365', 'Sergio Ricardo', 'ALTO', 'WHATSAPP', 'LIGAÇÃO', 'E-MAIL', NULL, NULL);
INSERT INTO public.clientes VALUES (19, 'JCPM', '00882304000144', '(81) 99497-4263', 'silvano.silva@jcpm.com.br', '', 2, true, '2026-01-13 17:11:55.635246', '2026-01-13 17:26:08.77696', 'Silvano', 'ALTO', 'WHATSAPP', 'LIGAÇÃO', 'E-MAIL', NULL, NULL);
INSERT INTO public.clientes VALUES (26, 'OMIRP', '45543915000262', '(81) 98793-4138', 'conceicaocpaiva@omirp.com.br', '', 2, true, '2026-01-13 17:11:55.638443', '2026-01-13 17:26:08.777655', 'Janaina', 'ALTO', 'WHATSAPP', 'LIGAÇÃO', 'E-MAIL', NULL, NULL);
INSERT INTO public.clientes VALUES (2, 'CARREFOUR', '45543915000181', '(81) 3333-1111', 'contato@carrefour.com', '', 2, true, '2026-01-13 17:11:55.622092', '2026-01-13 17:26:08.778282', 'Contato', 'ALTO', 'WHATSAPP', 'LIGAÇÃO', 'E-MAIL', NULL, NULL);
INSERT INTO public.clientes VALUES (18, 'ECO RESORT', '10823605000121', '(81) 3335-6666', 'contato@ecoresort.com', '', 2, true, '2026-01-13 17:11:55.634844', '2026-01-13 17:26:08.778919', 'Contato', 'ALTO', 'WHATSAPP', 'LIGAÇÃO', 'E-MAIL', NULL, NULL);
INSERT INTO public.clientes VALUES (29, 'llllllllllll', '11111111', '87908787', 'habdhab@gmail.com', '', 2, false, '2026-01-14 16:58:59.847386', '2026-01-14 16:58:59.847386', NULL, 'ALTO', 'WHATSAPP', 'LIGAÇÃO', 'E-MAIL', NULL, NULL);


--
-- Data for Name: tipos_quebra; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: usuarios; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.usuarios VALUES (1, 'teste', 'teste@teste.com', '$2a$10$7nHTBH8lsGH.DlwhNB/2v.TB/fLypS63X2Y0rwOdgP.ddJz6Leof6', NULL, 'administrador', true, '2026-01-14 12:15:52.431925', '2026-01-14 12:15:52.431925');
INSERT INTO public.usuarios VALUES (2, 'Alessandra', 'alessandra@astroturviagens.com', '$2a$10$UrE5GRL9VntmSBbh73Qua.M2rsCePn8QtDeDxCU7Ij7wctRUdvTI.', 'Coordenador', 'administrador', true, '2026-01-14 23:43:08.453731', '2026-01-14 23:43:08.453731');


--
-- Data for Name: veiculos; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.veiculos VALUES (1, 'gggg', 'rrrr', 'hhhh', 2016, 8, NULL, false, '2026-01-14 15:01:59.364942', '2026-01-14 15:01:59.364942');
INSERT INTO public.veiculos VALUES (2, 'jjj', 'jjjjjjjjjjjjjj', 'hhhhhhhhh', 2019, 8, NULL, false, '2026-01-14 15:12:40.026436', '2026-01-14 15:12:40.026436');
INSERT INTO public.veiculos VALUES (3, 'aaaa', 'aaaaaaa', 'aaaaaaaaa', 2019, 12, NULL, true, '2026-01-14 17:27:38.033757', '2026-01-14 17:27:38.033757');
INSERT INTO public.veiculos VALUES (4, 'aaaaa', 'ddddd', 'dddddd', 2019, 8, NULL, true, '2026-01-14 17:29:26.578009', '2026-01-14 17:29:26.578009');
INSERT INTO public.veiculos VALUES (7, 'bbbbbbb', 'fffff', 'faaaaaaaa', 2019, 8, NULL, true, '2026-01-14 17:30:40.94029', '2026-01-14 17:30:40.94029');
INSERT INTO public.veiculos VALUES (8, 'abb9832', 'fjma;f', ';kajbhfvjkl', 2020, 8, NULL, true, '2026-01-14 17:37:44.70792', '2026-01-14 17:37:44.70792');


--
-- Data for Name: ocorrencias; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.ocorrencias VALUES (1, '13/01-0001', NULL, NULL, NULL, '2026-01-11 21:00:00', '2026-01-13 15:17:28.817', NULL, NULL, 'hrbhnr5tbn', NULL, NULL, NULL, 'em_andamento', NULL, NULL, false, NULL, NULL, NULL, '2026-01-13 15:17:28.818633', '2026-01-13 15:17:28.818633');
INSERT INTO public.ocorrencias VALUES (2, '13/01-0002', NULL, NULL, NULL, '2026-01-12 21:00:00', '2026-01-13 15:24:26.461', NULL, NULL, 'bvebecbseb nsenbseb nnb', NULL, NULL, NULL, 'pendente', NULL, NULL, false, NULL, NULL, NULL, '2026-01-13 15:24:26.462671', '2026-01-13 15:24:26.462671');
INSERT INTO public.ocorrencias VALUES (3, '13/01-0003', NULL, NULL, NULL, '2026-01-12 21:00:00', '2026-01-13 16:21:45.95', NULL, NULL, 'AAAAAAAAA', '{"cliente_nome":"ACHÊ","tipo_ocorrencia":"Atraso","veiculo_placa":"201","horario_socorro":"12:00","horario_saida":"13:00"}', NULL, NULL, 'concluido', NULL, NULL, false, NULL, NULL, NULL, '2026-01-13 16:21:45.951436', '2026-01-13 16:21:45.951436');
INSERT INTO public.ocorrencias VALUES (4, '13/01-0004', NULL, NULL, NULL, '2026-01-12 21:00:00', '2026-01-13 16:31:15.554', NULL, NULL, 'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA', '{"cliente_nome":"AMCOR","tipo_ocorrencia":"Quebra","veiculo_placa":"401","horario_socorro":"23:00","horario_saida":"00:56"}', NULL, NULL, 'concluido', NULL, NULL, false, NULL, NULL, NULL, '2026-01-13 16:31:15.555485', '2026-01-13 16:49:12.587211');


--
-- Data for Name: ocorrencia_anexos; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.ocorrencia_anexos VALUES (1, 1, 'Card 1 capa (1).png', 'image/png', 117998, 'C:\Users\aless\Downloads\Projeto-CCO-main (1)\Projeto-CCO-main\backend\uploads\1768328248769-225971043.png', '2026-01-13 15:17:28.82528');
INSERT INTO public.ocorrencia_anexos VALUES (2, 2, 'Card 1 capa (1).png', 'image/png', 117998, 'C:\Users\aless\Downloads\Projeto-CCO-main (1)\Projeto-CCO-main\backend\uploads\1768328666413-893550605.png', '2026-01-13 15:24:26.46523');
INSERT INTO public.ocorrencia_anexos VALUES (3, 3, 'Card 1 capa (1).png', 'image/png', 117998, 'C:\Users\aless\Downloads\Projeto-CCO-main (1)\Projeto-CCO-main\backend\uploads\1768332105902-677055224.png', '2026-01-13 16:21:45.954428');
INSERT INTO public.ocorrencia_anexos VALUES (4, 4, 'MINAS -_IlustraÃ§Ã£o -26 1.png', 'image/png', 29504, 'C:\Users\aless\Downloads\Projeto-CCO-main (1)\Projeto-CCO-main\backend\uploads\1768332675509-477539267.png', '2026-01-13 16:31:15.557016');


--
-- Data for Name: ocorrencia_logs; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Name: clientes_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.clientes_id_seq', 29, true);


--
-- Name: ocorrencia_anexos_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.ocorrencia_anexos_id_seq', 4, true);


--
-- Name: ocorrencia_logs_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.ocorrencia_logs_id_seq', 1, false);


--
-- Name: ocorrencias_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.ocorrencias_id_seq', 4, true);


--
-- Name: tipos_quebra_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.tipos_quebra_id_seq', 1, false);


--
-- Name: usuarios_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.usuarios_id_seq', 2, true);


--
-- Name: veiculos_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.veiculos_id_seq', 8, true);


--
-- PostgreSQL database dump complete
--

\unrestrict rZv1NEfgxD1xA8dF3kpJEWeu47chClTil6MCMUd1WsWGv4zQfSxIt21nDmauQmW

