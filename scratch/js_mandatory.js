const allNodesData = [
            // --- Período 1 ---
            { id: 'COE70A', name: 'COMUNICAÇÃO ORAL E ESCRITA', dependencies: [], period: 1, chs: 2, cht: 30, x: 5.5, y: 2.0, type: 'subject' },
            { id: 'ELN71A', name: 'INTRODUÇÃO À ENGENHARIA MECATRÔNICA', dependencies: [], period: 1, chs: 2, cht: 30, x: 20.3, y: 2.0, type: 'subject' },
            { id: 'ELN71B', name: 'PRINCÍPIOS DE MECATRÔNICA', dependencies: [], period: 1, chs: 3, cht: 45, x: 35.2, y: 2.0, type: 'subject' },
            { id: 'FCH7FB', name: 'FUNDAMENTOS DA ÉTICA', dependencies: [], period: 1, chs: 3, cht: 45, x: 50.0, y: 2.0, type: 'subject' },
            { id: 'MAT7GA', name: 'GEOMETRIA ANALÍTICA', dependencies: [], equivalents: [{ id: 'MECP71A', cht: 60 }], period: 1, chs: 4, cht: 60, x: 64.8, y: 2.0, type: 'subject' },
            { id: 'MAT7PC', name: 'PRÉ-CÁLCULO', dependencies: [], period: 1, chs: 4, cht: 60, x: 79.7, y: 2.0, type: 'subject' },
            { id: 'MEC71A', name: 'DESENHO TÉCNICO', dependencies: [], period: 1, chs: 3, cht: 45, x: 94.5, y: 2.0, type: 'subject' },

            // --- Período 2 ---
            { id: 'ELN70C', name: 'ATIVIDADES COMPLEMENTARES', dependencies: [], period: 2, chs: 0, cht: 15, x: 5.5, y: 12.5, type: 'subject' },
            { id: 'ELN72A', name: 'ELETRICIDADE BÁSICA', dependencies: ["MAT7PC"], equivalents: [{ id: 'ELT72C', cht: 90 }], period: 2, chs: 4, cht: 60, x: 20.3, y: 12.5, type: 'subject' },
            { id: 'FIS7F1', name: 'FÍSICA TEÓRICA 1', dependencies: [], equivalents: [{ id: 'MECP72C', cht: 60 }], period: 2, chs: 4, cht: 60, x: 35.2, y: 12.5, type: 'subject' },
            { id: 'MAT7AL', name: 'ÁLGEBRA LINEAR', dependencies: ["MAT7GA"], equivalents: [{ id: 'MECP72A', cht: 60 }], period: 2, chs: 4, cht: 60, x: 50.0, y: 12.5, type: 'subject' },
            { id: 'MAT7C1', name: 'CÁLCULO DIFERENCIAL E INTEGRAL 1', dependencies: ["MAT7PC"], equivalents: [{ id: 'MECP71B', cht: 90 }], period: 2, chs: 6, cht: 90, x: 64.8, y: 12.5, type: 'subject' },
            { id: 'MEC72A', name: 'DESENHO AUXILIADO POR COMPUTADOR 1', dependencies: ["MEC71A"], equivalents: [{ id: 'MECP72D', cht: 45 }], period: 2, chs: 3, cht: 45, x: 79.7, y: 12.5, type: 'subject' },
            { id: 'MEC72B', name: 'FUNDAMENTOS DE CIÊNCIAS DOS MATERIAIS', dependencies: [], equivalents: [{ id: 'MECP72E', cht: 60 }], period: 2, chs: 4, cht: 60, x: 94.5, y: 12.5, type: 'subject' },

            // --- Período 3 ---
            { id: 'ELN73A', name: 'CIRCUITOS ELÉTRICOS A', dependencies: ["ELN72A", "MAT7C1"], equivalents: [{ id: 'ELN73D', cht: 75 }, { id: 'ELP31T', cht: 60 }, { id: 'ELP31TP', cht: 90 }, { id: 'ELP42P', cht: 45 }, { id: 'ELT73B', cht: 90 }], period: 3, chs: 4, cht: 60, x: 5.5, y: 23.0, type: 'subject' },
            { id: 'ELN73B', name: 'ALGORITMOS DE PROGRAMAÇÃO', dependencies: [], equivalents: [{ id: 'ELB11', cht: 45 }], period: 3, chs: 3, cht: 45, x: 18.2, y: 23.0, type: 'subject' },
            { id: 'EST70A', name: 'INTRODUÇÃO À ESTATÍSTICA', dependencies: ["MAT7C1"], equivalents: [{ id: 'EST70C', cht: 60 }], period: 3, chs: 0, cht: 60, x: 30.9, y: 23.0, type: 'subject' },
            { id: 'FIS7E1', name: 'FÍSICA EXPERIMENTAL FO 1', dependencies: ["FIS7F1"], equivalents: [{ id: 'MECP73B', cht: 30 }], period: 3, chs: 2, cht: 30, x: 43.6, y: 23.0, type: 'subject' },
            { id: 'MAT7ED', name: 'EQUAÇÕES DIFERENCIAIS ORDINÁRIAS', dependencies: ["MAT7C1", "MAT7GA"], period: 3, chs: 4, cht: 60, x: 56.4, y: 23.0, type: 'subject' },
            { id: 'MEC73A', name: 'DESENHO AUXILIADO POR COMPUTADOR 2', dependencies: ["MEC72A"], period: 3, chs: 2, cht: 30, x: 69.1, y: 23.0, type: 'subject' },
            { id: 'MEC73B', name: 'TRATAMENTOS E PROPRIEDADES DOS MATERIAIS', dependencies: ["MEC72B"], equivalents: [{ id: 'MEC73D', cht: 60 }, { id: 'MEC74F', cht: 60 }], period: 3, chs: 4, cht: 60, x: 81.8, y: 23.0, type: 'subject' },
            { id: 'MEC73C', name: 'ESTÁTICA', dependencies: ["FIS7F1", "MAT7AL"], period: 3, chs: 4, cht: 60, x: 94.5, y: 23.0, type: 'subject' },

            // --- Período 4 ---
            { id: 'ELN74A', name: 'ELETRÔNICA A', dependencies: ["ELN73A"], equivalents: [{ id: 'ELEE30', cht: 60 }, { id: 'ELT74E', cht: 120 }], period: 4, chs: 4, cht: 60, x: 5.5, y: 33.5, type: 'subject' },
            { id: 'ELN74B', name: 'PROGRAMAÇÃO DE COMPUTADOR', dependencies: ["ELN73B"], equivalents: [{ id: 'ELB21', cht: 60 }], period: 4, chs: 4, cht: 60, x: 23.3, y: 33.5, type: 'subject' },
            { id: 'FIS7F2', name: 'FÍSICA TEÓRICA 2', dependencies: ["FIS7F1"], equivalents: [{ id: 'MECP73A', cht: 60 }], period: 4, chs: 4, cht: 60, x: 41.1, y: 33.5, type: 'subject' },
            { id: 'MAT7C2', name: 'CÁLCULO DIFERENCIAL E INTEGRAL 2', dependencies: ["MAT7C1", "MAT7GA"], equivalents: [{ id: 'MECP72B', cht: 90 }], period: 4, chs: 6, cht: 90, x: 58.9, y: 33.5, type: 'subject' },
            { id: 'MEC74A', name: 'DINÂMICA', dependencies: ["MAT7ED", "MEC73C"], period: 4, chs: 4, cht: 60, x: 76.7, y: 33.5, type: 'subject' },
            { id: 'MEC74B', name: 'METROLOGIA MECÂNICA', dependencies: ["EST70A"], period: 4, chs: 3, cht: 45, x: 94.5, y: 33.5, type: 'subject' },

            // --- Período 5 ---
            { id: 'ELN75A', name: 'CIRCUITOS ELÉTRICOS B', dependencies: ["ELN73A"], equivalents: [{ id: 'ELT74B', cht: 120 }], period: 5, chs: 4, cht: 60, x: 5.5, y: 44.0, type: 'subject' },
            { id: 'ELN75B', name: 'CIRCUITOS DIGITAIS', dependencies: ["ELN74A"], equivalents: [{ id: 'ELEB30', cht: 90 }, { id: 'ELF41', cht: 75 }, { id: 'ELT72B', cht: 60 }, { id: 'ELT82F', cht: 75 }, { id: 'ELW41', cht: 75 }], period: 5, chs: 5, cht: 75, x: 20.3, y: 44.0, type: 'subject' },
            { id: 'ELN75C', name: 'INSTRUMENTAÇÃO INDUSTRIAL', dependencies: ["ELN74A"], equivalents: [{ id: 'ELP63', cht: 60 }, { id: 'ELT75H', cht: 60 }, { id: 'ELT85E', cht: 60 }], period: 5, chs: 4, cht: 60, x: 35.2, y: 44.0, type: 'subject' },
            { id: 'MAT7FZ', name: 'ANÁLISE DE FOURIER E TRANSFORMADA Z', dependencies: ["MAT7ED"], period: 5, chs: 4, cht: 60, x: 50.0, y: 44.0, type: 'subject' },
            { id: 'MEC75A', name: 'FENÔMENOS DE TRANSPORTE', dependencies: ["FIS7F2", "MAT7C2"], equivalents: [{ id: 'ELEY42', cht: 45 }, { id: 'ELT74A', cht: 30 }, { id: 'MEC74E', cht: 60 }, { id: 'MEC75G', cht: 60 }], period: 5, chs: 3, cht: 45, x: 64.8, y: 44.0, type: 'subject' },
            { id: 'MEC75B', name: 'METODOLOGIA DE PROJETOS', dependencies: [], equivalents: [{ id: 'MEC78G', cht: 45 }], period: 5, chs: 3, cht: 45, x: 79.7, y: 44.0, type: 'subject' },
            { id: 'MEC75C', name: 'ENGENHARIA DE SEGURANÇA DO TRABALHO', dependencies: [], equivalents: [{ id: 'MEC77C', cht: 45 }], period: 5, chs: 2, cht: 30, x: 94.5, y: 44.0, type: 'subject' },

            // --- Período 6 ---
            { id: 'ELN70B', name: 'ESTÁGIO CURRICULAR OBRIGATÓRIO', dependencies: [], period: 6, chs: 0, cht: 360, x: 5.5, y: 54.5, type: 'subject' },
            { id: 'ELN76A', name: 'ELETRÔNICA B', dependencies: ["ELN74A", "MAT7ED"], equivalents: [{ id: 'ELEE31', cht: 60 }, { id: 'ELP61', cht: 60 }], period: 6, chs: 4, cht: 60, x: 20.3, y: 54.5, type: 'subject' },
            { id: 'ELN76B', name: 'SISTEMAS MICROCONTROLADOS', dependencies: ["ELN75B"], equivalents: [{ id: 'ELEW31', cht: 60 }, { id: 'ELF52', cht: 60 }, { id: 'ELT73A', cht: 60 }, { id: 'ELT83B', cht: 60 }, { id: 'ELW52', cht: 60 }], period: 6, chs: 4, cht: 60, x: 35.2, y: 54.5, type: 'subject' },
            { id: 'MEC76A', name: 'MECÂNICA DOS SÓLIDOS 1', dependencies: ["MEC73C"], period: 6, chs: 6, cht: 90, x: 50.0, y: 54.5, type: 'subject' },
            { id: 'MEC76B', name: 'USINAGEM', dependencies: ["MEC72B"], equivalents: [{ id: 'MEC75E', cht: 75 }, { id: 'MECP75A', cht: 45 }], period: 6, chs: 4, cht: 60, x: 64.8, y: 54.5, type: 'subject' },
            { id: 'MEC76C', name: 'PNEUMÁTICA E HIDRÁULICA', dependencies: ["ELN75B"], period: 6, chs: 4, cht: 60, x: 79.7, y: 54.5, type: 'subject' },
            { id: 'MEC76D', name: 'GESTÃO DA PRODUÇÃO', dependencies: [], period: 6, chs: 2, cht: 30, x: 94.5, y: 54.5, type: 'subject' },

            // --- Período 7 ---
            { id: 'ELN77A', name: 'SISTEMAS DE CONTROLE A', dependencies: ["ELN76A", "MAT7ED"], equivalents: [{ id: 'ELEC20', cht: 60 }, { id: 'ELF62', cht: 60 }, { id: 'ELT76A', cht: 60 }, { id: 'ELW62', cht: 60 }], period: 7, chs: 4, cht: 60, x: 5.5, y: 65.0, type: 'subject' },
            { id: 'ELN77B', name: 'CONTROLE A EVENTOS DISCRETOS', dependencies: ["ELN75B"], equivalents: [{ id: 'ELF81', cht: 60 }, { id: 'ELT77D', cht: 60 }, { id: 'ELT84B', cht: 60 }, { id: 'ELW81', cht: 60 }], period: 7, chs: 4, cht: 60, x: 23.3, y: 65.0, type: 'subject' },
            { id: 'ELN77C', name: 'ELETRÔNICA DE POTÊNCIA A', dependencies: ["ELN74A", "ELN75A", "MAT7FZ"], equivalents: [{ id: 'ELF84', cht: 75 }, { id: 'ELT75E', cht: 90 }, { id: 'ELW84', cht: 75 }], period: 7, chs: 4, cht: 60, x: 41.1, y: 65.0, type: 'subject' },
            { id: 'GEE7E3', name: 'FUNDAMENTOS DE ECONOMIA', dependencies: [], period: 7, chs: 2, cht: 30, x: 58.9, y: 65.0, type: 'subject' },
            { id: 'MEC77A', name: 'ELEMENTOS DE MÁQUINAS 2', dependencies: ["MEC76A"], period: 7, chs: 4, cht: 60, x: 76.7, y: 65.0, type: 'subject' },
            { id: 'MEC77B', name: 'USINAGEM CNC', dependencies: ["MEC76B"], period: 7, chs: 3, cht: 45, x: 94.5, y: 65.0, type: 'subject' },

            // --- Período 8 ---
            { id: 'ELN78A', name: 'SISTEMAS DE CONTROLE B', dependencies: ["ELN77A", "MAT7FZ"], equivalents: [{ id: 'ELF72', cht: 60 }, { id: 'ELT77A', cht: 60 }, { id: 'ELW72', cht: 60 }], period: 8, chs: 4, cht: 60, x: 5.5, y: 75.5, type: 'subject' },
            { id: 'ELN78B', name: 'PROJETO INTEGRADOR 1', dependencies: ["ELN76B", "ELN77B"], period: 8, chs: 4, cht: 60, x: 23.3, y: 75.5, type: 'subject' },
            { id: 'ELN78C', name: 'ACIONAMENTOS ELÉTRICOS', dependencies: ["ELN75A", "ELN77C"], equivalents: [{ id: 'ELT84D', cht: 75 }, { id: 'ELT85D', cht: 60 }], period: 8, chs: 5, cht: 75, x: 41.1, y: 75.5, type: 'subject' },
            { id: 'ELN78D', name: 'METODOLOGIA APLICADA AO TCC', dependencies: [], period: 8, chs: 2, cht: 30, x: 58.9, y: 75.5, type: 'subject' },
            { id: 'ELN78E', name: 'EMPREENDEDORISMO', dependencies: [], equivalents: [{ id: 'ELN8DD', cht: 30 }, { id: 'ELO92', cht: 30 }, { id: 'GEE7E1', cht: 30 }, { id: 'MEC78D', cht: 30 }, { id: 'MECP78A', cht: 45 }], period: 8, chs: 2, cht: 30, x: 76.7, y: 75.5, type: 'subject' },
            { id: 'MEC78A', name: 'MANUFATURA INTEGRADA', dependencies: ["ELN77B"], period: 8, chs: 4, cht: 60, x: 94.5, y: 75.5, type: 'subject' },

            // --- Período 9 ---
            { id: 'ELN79A', name: 'TCC 1', dependencies: ["ELN78D"], period: 9, chs: 2, cht: 30, x: 5.5, y: 86.0, type: 'subject' },
            { id: 'MEC79A', name: 'PROJETO INTEGRADOR 2', dependencies: ["MEC78A"], period: 9, chs: 2, cht: 30, x: 23.3, y: 86.0, type: 'subject' },
            { id: 'MEC79B', name: 'ROBÓTICA', dependencies: ["ELN78A", "MEC74A"], equivalents: [{ id: 'ELT7AH', cht: 45 }], period: 9, chs: 4, cht: 60, x: 41.1, y: 86.0, type: 'subject' },
            { id: 'MEC79C', name: 'MANUTENÇÃO INDUSTRIAL', dependencies: [], equivalents: [{ id: 'ELT77H', cht: 45 }, { id: 'MEC78E', cht: 30 }, { id: 'MECP77B', cht: 30 }], period: 9, chs: 2, cht: 30, x: 58.9, y: 86.0, type: 'subject' },
            { id: 'MEC79D', name: 'GESTÃO AMBIENTAL', dependencies: [], period: 9, chs: 2, cht: 30, x: 76.7, y: 86.0, type: 'subject' },
            { id: 'MEC79E', name: 'SISTEMAS DE GESTÃO DA QUALIDADE', dependencies: [], period: 9, chs: 2, cht: 30, x: 94.5, y: 86.0, type: 'subject' },

            // --- Período 10 ---
            { id: 'ELN70A', name: 'TCC 2', dependencies: ["ELN79A"], period: 10, chs: 1, cht: 15, x: 50.0, y: 96.5, type: 'subject' },

        ];