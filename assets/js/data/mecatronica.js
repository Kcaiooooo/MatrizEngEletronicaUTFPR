const TOTAL_COMPLEMENTARY_HOURS = 15;

const TOTAL_EXTENSION_HOURS = 420;

const TOTAL_HUMANITIES_HOURS = 120;

const TOTAL_OPTIONAL_HOURS = 240;

const NODE_WIDTH = 130;

const NODE_HEIGHT = 90;

const OPTIONAL_LAYOUT_MIN_X = 14;

const OPTIONAL_LAYOUT_MAX_X = 92;

const OPTIONAL_LAYOUT_MIN_Y = 10;

const OPTIONAL_LAYOUT_MAX_Y = 92;

const SPECIALIZATION_TRACKS = {
            'Trilha Formativa em Eletrônica': [
                'ELE13', 'ELF74', 'ELF75', 'ELN7AA', 'ELN7AB', 'ELN7AC', 'ELN7AD', 'ELN7AE', 'ELN7AF', 'ELN7AG', 'ELN7AH', 'ELN7AI', 'ELN7AJ', 'ELN7AK', 'ELN7AL', 'ELN7AM', 'ELN7AN', 'ELN7AO', 'ELTA2', 'ELTD1', 'ELTD2', 'ELTD4', 'ELTD6', 'ELTD7', 'ELTE10', 'ELTE13', 'ELTE2', 'ELTE6', 'ELTE8', 'ELTE9'
            ],
            'Trilha Formativa em Mecânica': [
                'MEC78B', 'MEC7AA', 'MEC7AC', 'MEC7AD', 'MEC7AE', 'MEC7AF', 'MEC7AG', 'MEC7AH', 'MEC7AI', 'MEC7AJ', 'MEC7AK', 'MEC7AL', 'MEC7AM', 'MEC7AN', 'MEC7AO', 'MEC7AP', 'MEC7AQ', 'MEC7AR', 'MEC7CO', 'MEC7EE', 'MEC7GF'
            ],
            'Unidades Curriculares Extensionistas': [
                'ARQ7DH', 'ARQ7EC', 'CAART01', 'CAART02', 'CAART03', 'CAART04', 'CAART05', 'CAART06', 'CAART07', 'CAART08', 'CAART09', 'CAART10', 'CAART11', 'CAART12', 'CAART13', 'CAART14', 'CAART15', 'CAART16', 'CAART17', 'CAART21', 'CAART22', 'CAART23', 'CAART24', 'CAART25', 'DIN7HU', 'ELN7AP', 'ELN7AQ', 'ELN7AR', 'ELN7AS', 'ELN8BD', 'ELN8CD', 'ELN8DI', 'ELN8DJ', 'ELN8DK', 'ELN8EC', 'FCH7AB', 'FCH7PC', 'FCH7SF', 'FCH7XB', 'GEE72H', 'GEE73C', 'GEE76A', 'LICOM7AA', 'LICOM7AB'
            ]
        };

const OPTIONAL_GROUPS_CONFIG = {
            '[1120]': { requiredHours: 120, name: 'Trilha Formativa em Eletrônica' },
            '[1121]': { requiredHours: 120, name: 'Trilha Formativa em Mecânica' },
            '[1122]': { requiredHours: 60, name: 'Ciclo de Humanidades' },
            '[1135]': { requiredHours: 30, name: 'Ciências Humanas' },
            '[1222]': { requiredHours: 30, name: 'Ciclo de Humanidades' },
            '[1224]': { requiredHours: 420, name: 'Unidades Curriculares Extensionistas' }
        };

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
            { id: 'FIS7E1', name: 'FÍSICA EXPERIMENTAL 1', dependencies: ["FIS7F1"], equivalents: [{ id: 'MECP73B', cht: 30 }], period: 3, chs: 2, cht: 30, x: 43.6, y: 23.0, type: 'subject' },
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

const allHumanitiesData = [
            // --- Grupo [1135] ---
            { id: 'EDU70I', name: 'EDUCAÇÃO ESPECIAL E PROCESSOS INCLUSIVOS', dependencies: [], groupId: '[1135]', period: 4, chs: 3, cht: 45, x: 10, y: 5.0, type: 'humanities' },
            { id: 'EDU70K', name: 'TECNOLOGIAS DIGITAIS NA EDUCAÇÃO', dependencies: [], groupId: '[1135]', period: 4, chs: 3, cht: 45, x: 30, y: 5.0, type: 'humanities' },
            { id: 'ELO91', name: 'ÉTICA, PROFISSÃO E CIDADANIA', dependencies: [], groupId: '[1135]', period: 4, chs: 2, cht: 30, x: 50, y: 5.0, type: 'humanities' },
            { id: 'FCH7FA', name: 'FILOSOFIA DA CIÊNCIA E DA TECNOLOGIA', dependencies: [], groupId: '[1135]', period: 4, chs: 3, cht: 45, x: 70, y: 5.0, type: 'humanities' },
            { id: 'FCH7FC', name: 'TEORIA DAS CIÊNCIAS HUMANAS', dependencies: [], groupId: '[1135]', period: 4, chs: 3, cht: 45, x: 90, y: 5.0, type: 'humanities' },
            { id: 'FCH7GA', name: 'METROPOLIZAÇÃO CONTEMPORÂNEA: TECNOLOGIA E TERRITÓRIO', dependencies: [], groupId: '[1135]', period: 4, chs: 3, cht: 45, x: 10, y: 15.0, type: 'humanities' },
            { id: 'FCH7HA', name: 'HISTÓRIA DA TÉCNICA E DA TECNOLOGIA', dependencies: [], groupId: '[1135]', period: 4, chs: 3, cht: 45, x: 30, y: 15.0, type: 'humanities' },
            { id: 'FCH7HB', name: 'HISTÓRIA GERAL DA ECONOMIA', dependencies: [], groupId: '[1135]', period: 4, chs: 3, cht: 45, x: 50, y: 15.0, type: 'humanities' },
            { id: 'FCH7HC', name: 'CAPITALISMO CONTEMPORÂNEO E ECONOMIA POLÍTICA', dependencies: [], groupId: '[1135]', period: 4, chs: 3, cht: 45, x: 70, y: 15.0, type: 'humanities' },
            { id: 'FCH7PA', name: 'PSICOLOGIA DO TRABALHO', dependencies: [], groupId: '[1135]', period: 4, chs: 2, cht: 30, x: 90, y: 15.0, type: 'humanities' },
            { id: 'FCH7PB', name: 'RELAÇÕES INTERPESSOAIS, GRUPO E PODER', dependencies: [], groupId: '[1135]', period: 4, chs: 2, cht: 30, x: 10, y: 25.0, type: 'humanities' },
            { id: 'FCH7SA', name: 'SOCIOLOGIA', dependencies: [], groupId: '[1135]', period: 4, chs: 3, cht: 45, x: 30, y: 25.0, type: 'humanities' },
            { id: 'FCH7SB', name: 'TECNOLOGIA E SOCIEDADE', dependencies: [], groupId: '[1135]', period: 4, chs: 3, cht: 45, x: 50, y: 25.0, type: 'humanities' },
            { id: 'FCH7SC', name: 'TECNOLOGIA, TRABALHO E SAÚDE', dependencies: [], groupId: '[1135]', period: 4, chs: 3, cht: 45, x: 70, y: 25.0, type: 'humanities' },
            { id: 'FCH7SD', name: 'SOCIEDADE E POLÍTICA NO BRASIL', dependencies: [], groupId: '[1135]', period: 4, chs: 3, cht: 45, x: 90, y: 25.0, type: 'humanities' },
            { id: 'FCH7SE', name: 'SOCIEDADE E POLÍTICA NO PARANÁ', dependencies: [], groupId: '[1135]', period: 4, chs: 3, cht: 45, x: 10, y: 35.0, type: 'humanities' },
            { id: 'FCH7XA', name: 'TECNOLOGIA SOCIAL E ECONOMIA SOLIDÁRIA', dependencies: [], groupId: '[1135]', period: 4, chs: 4, cht: 60, x: 30, y: 35.0, type: 'humanities' },
            { id: 'FCH7XC', name: 'PRESENÇA AFRICANA NO BRASIL', dependencies: [], groupId: '[1135]', period: 4, chs: 2, cht: 30, x: 50, y: 35.0, type: 'humanities' },
            { id: 'FCH7XD', name: 'DIREITOS HUMANOS, SEGURANÇA E DIVERSIDADE', dependencies: [], groupId: '[1135]', period: 4, chs: 3, cht: 45, x: 70, y: 35.0, type: 'humanities' },
            { id: 'FCH7XE', name: 'POLÍTICAS PÚBLICAS', dependencies: [], groupId: '[1135]', period: 4, chs: 3, cht: 45, x: 90, y: 35.0, type: 'humanities' },
            { id: 'FCH7XF', name: 'DIMENSÃO AMBIENTAL NA GESTÃO URBANA', dependencies: [], groupId: '[1135]', period: 4, chs: 3, cht: 45, x: 10, y: 45.0, type: 'humanities' },
            { id: 'FCH7XG', name: 'TECNOPOLÍTICAS DA SOCIEDADE CONTEMPORÂNEA', dependencies: [], groupId: '[1135]', period: 4, chs: 3, cht: 45, x: 30, y: 45.0, type: 'humanities' },
            { id: 'MEC7AV', name: 'Tópicos em Ciências Humanas 1', dependencies: [], groupId: '[1135]', period: 4, chs: 2, cht: 30, x: 50, y: 45.0, type: 'humanities' },
            { id: 'MEC7AX', name: 'Tópicos em Ciências Humanas 2', dependencies: [], groupId: '[1135]', period: 4, chs: 3, cht: 45, x: 70, y: 45.0, type: 'humanities' },
            { id: 'MEC7AZ', name: 'Tópicos em Ciências Humanas 3', dependencies: [], groupId: '[1135]', period: 4, chs: 4, cht: 60, x: 90, y: 45.0, type: 'humanities' },
            // --- Grupo [1222] ---
            { id: 'ARQ7EA', name: 'TOWARDS SUSTAINABILITY', dependencies: [], groupId: '[1222]', period: 4, chs: 4, cht: 60, x: 10, y: 55.0, type: 'humanities' },
            { id: 'ARQ7EB', name: 'RUMO A SUSTENTABILIDADE', dependencies: [], groupId: '[1222]', period: 4, chs: 4, cht: 60, x: 30, y: 55.0, type: 'humanities' },
            { id: 'EDU70J', name: 'LIBRAS', dependencies: [], groupId: '[1222]', period: 4, chs: 3, cht: 45, x: 50, y: 55.0, type: 'humanities' },
            { id: 'EDU7AG', name: 'ESPANHOL PARA ENGENHARIAS 1', dependencies: [], groupId: '[1222]', period: 4, chs: 3, cht: 45, x: 70, y: 55.0, type: 'humanities' },
            { id: 'EDU7AH', name: 'ESPANHOL PARA ENGENHARIAS 2', dependencies: ["EDU7AG"], groupId: '[1222]', period: 4, chs: 3, cht: 45, x: 90, y: 55.0, type: 'humanities' },
            { id: 'EDU7AI', name: 'PRÁTICA DE ESCRITA PARA ENGENHARIAS', dependencies: [], groupId: '[1222]', period: 4, chs: 4, cht: 60, x: 10, y: 65.0, type: 'humanities' },
            { id: 'ELH01', name: 'FUNDAMENTOS DE PRIMEIROS SOCORROS', dependencies: [], groupId: '[1222]', period: 4, chs: 2, cht: 30, x: 30, y: 65.0, type: 'humanities' },
            { id: 'ELH02', name: 'PRÁTICA DE GRUPO E INTERAÇÕES HUMANAS COM A MÚSICA', dependencies: [], groupId: '[1222]', period: 4, chs: 2, cht: 30, x: 50, y: 65.0, type: 'humanities' },
            { id: 'ELH04', name: 'INOVAÇÃO TECNOLÓGICA E FINANCIAMENTO', dependencies: [], groupId: '[1222]', period: 4, chs: 4, cht: 60, x: 70, y: 65.0, type: 'humanities' },
            { id: 'ELH05', name: 'NOÇÕES JURÍDICAS PARA EMPREENDEDORES', dependencies: [], groupId: '[1222]', period: 4, chs: 4, cht: 60, x: 90, y: 65.0, type: 'humanities' },
            { id: 'ELTC1', name: 'METODOLOGIA DA PESQUISA CIENTÍFICA E TECNOLÓGICA', dependencies: [], groupId: '[1222]', period: 4, chs: 4, cht: 60, x: 10, y: 75.0, type: 'humanities' },
            { id: 'FCH7AA', name: 'DANÇA E TECNOLOGIA', dependencies: [], groupId: '[1222]', period: 4, chs: 4, cht: 60, x: 30, y: 75.0, type: 'humanities' },
            { id: 'GEE75D', name: 'GESTÃO ESTRATÉGICA', dependencies: [], groupId: '[1222]', period: 4, chs: 4, cht: 60, x: 50, y: 75.0, type: 'humanities' },
            { id: 'GEE7A1', name: 'FUNDAMENTOS DE ADMINISTRAÇÃO', dependencies: [], groupId: '[1222]', period: 4, chs: 3, cht: 45, x: 70, y: 75.0, type: 'humanities' },
            { id: 'GEE7AA', name: 'GESTÃO DO CONHECIMENTO', dependencies: [], groupId: '[1222]', period: 4, chs: 2, cht: 30, x: 90, y: 75.0, type: 'humanities' },
            { id: 'GEE7E5', name: 'FUNDAMENTOS DE ENGENHARIA ECONÔMICA E ANÁLISE DE VIABILIDADE', dependencies: [], groupId: '[1222]', period: 4, chs: 4, cht: 60, x: 10, y: 85.0, type: 'humanities' },
            { id: 'GEE7F1', name: 'FUNDAMENTOS DE FINANÇAS', dependencies: [], equivalents: [{ id: 'GEE7F2', cht: 60 }], groupId: '[1222]', period: 4, chs: 4, cht: 60, x: 30, y: 85.0, type: 'humanities' },
            { id: 'GEE7G1', name: 'FUNDAMENTOS DE GESTÃO DE PESSOAS', dependencies: [], groupId: '[1222]', period: 4, chs: 3, cht: 45, x: 50, y: 85.0, type: 'humanities' },
            { id: 'GEE7G5', name: 'FUNDAMENTOS DE GESTÃO DE PROJETO', dependencies: [], groupId: '[1222]', period: 4, chs: 3, cht: 45, x: 70, y: 85.0, type: 'humanities' },
            { id: 'GEE7M1', name: 'FUNDAMENTOS DE MARKETING', dependencies: [], groupId: '[1222]', period: 4, chs: 3, cht: 45, x: 90, y: 85.0, type: 'humanities' },
            { id: 'LEM7SM', name: 'SUSTENTABILIDADE E MEIO AMBIENTE: ESTUDO DE NARRATIVAS AMBIENTAIS', dependencies: [], groupId: '[1222]', period: 4, chs: 2, cht: 30, x: 10, y: 95.0, type: 'humanities' },
            { id: 'MEC7AS', name: 'Tópicos em Humanidades 1', dependencies: [], groupId: '[1222]', period: 4, chs: 2, cht: 30, x: 30, y: 95.0, type: 'humanities' },
            { id: 'MEC7AT', name: 'Tópicos em Humanidades 2', dependencies: [], groupId: '[1222]', period: 4, chs: 3, cht: 45, x: 50, y: 95.0, type: 'humanities' },
            { id: 'MEC7AU', name: 'Tópicos em Humanidades 3', dependencies: [], groupId: '[1222]', period: 4, chs: 4, cht: 60, x: 70, y: 95.0, type: 'humanities' },
            { id: 'QBI7CA', name: 'CIÊNCIAS DO AMBIENTE', dependencies: [], groupId: '[1222]', period: 4, chs: 2, cht: 30, x: 90, y: 95.0, type: 'humanities' },
        ];

const allOptionalNodesData = [
            // --- Trilha [1120] ---
            { id: 'ELE13', name: 'REDES', dependencies: [], equivalents: [{ id: 'ELE21', cht: 45 }], groupId: '[1120]', period: 6, chs: 3, cht: 45, x: 10, y: 5.0, type: 'optional' },
            { id: 'ELF74', name: 'SISTEMAS EMBARCADOS', dependencies: ["ELN76B"], equivalents: [{ id: 'CSW41', cht: 60 }, { id: 'ELEW32', cht: 60 }], groupId: '[1120]', period: 6, chs: 4, cht: 60, x: 26, y: 5.0, type: 'optional' },
            { id: 'ELF75', name: 'MODELAGEM E SIMULAÇÃO', dependencies: ["ELN77A"], equivalents: [{ id: 'ELT7EF', cht: 60 }], groupId: '[1120]', period: 6, chs: 4, cht: 60, x: 42, y: 5.0, type: 'optional' },
            { id: 'ELN7AA', name: 'DESENHO ELETRÔNICO', dependencies: ["ELN72A"], equivalents: [{ id: 'ELB23', cht: 30 }, { id: 'ELEF20', cht: 30 }], groupId: '[1120]', period: 6, chs: 2, cht: 30, x: 58, y: 5.0, type: 'optional' },
            { id: 'ELN7AB', name: 'ENGENHARIA DE SISTEMAS', dependencies: ["ELN74B"], equivalents: [{ id: 'ELEW40', cht: 45 }, { id: 'ELTE1', cht: 45 }], groupId: '[1120]', period: 6, chs: 3, cht: 45, x: 74, y: 5.0, type: 'optional' },
            { id: 'ELN7AC', name: 'REDES INDUSTRIAIS', dependencies: ["ELN75B"], equivalents: [{ id: 'ELT85C', cht: 45 }], groupId: '[1120]', period: 6, chs: 3, cht: 45, x: 90, y: 5.0, type: 'optional' },
            { id: 'ELN7AD', name: 'SISTEMAS DE SUPERVISÃO', dependencies: ["ELN77B"], equivalents: [{ id: 'ELT77J', cht: 60 }, { id: 'ELT86C', cht: 60 }], groupId: '[1120]', period: 6, chs: 3, cht: 45, x: 10, y: 10.1, type: 'optional' },
            { id: 'ELN7AE', name: 'CONTROLE DE PROCESSOS', dependencies: ["ELN77A"], groupId: '[1120]', period: 6, chs: 3, cht: 45, x: 26, y: 10.1, type: 'optional' },
            { id: 'ELN7AF', name: 'ELETRÔNICA DE POTÊNCIA B', dependencies: ["ELN77C"], groupId: '[1120]', period: 6, chs: 2, cht: 30, x: 42, y: 10.1, type: 'optional' },
            { id: 'ELN7AG', name: 'Tópicos em Eletrônica', dependencies: [], groupId: '[1120]', period: 6, chs: 2, cht: 30, x: 58, y: 10.1, type: 'optional' },
            { id: 'ELN7AH', name: 'Tópicos em Eletrônica', dependencies: [], groupId: '[1120]', period: 6, chs: 3, cht: 45, x: 74, y: 10.1, type: 'optional' },
            { id: 'ELN7AI', name: 'Tópicos em Eletrônica', dependencies: [], groupId: '[1120]', period: 6, chs: 4, cht: 60, x: 90, y: 10.1, type: 'optional' },
            { id: 'ELN7AJ', name: 'Tópicos em Eletrônica', dependencies: [], groupId: '[1120]', period: 6, chs: 4, cht: 60, x: 10, y: 15.3, type: 'optional' },
            { id: 'ELN7AK', name: 'Eletrônica de Potência', dependencies: ["ELN77C"], groupId: '[1120]', period: 6, chs: 2, cht: 30, x: 26, y: 15.3, type: 'optional' },
            { id: 'ELN7AL', name: 'Internet das Coisas', dependencies: ["ELN75B"], groupId: '[1120]', period: 6, chs: 3, cht: 45, x: 42, y: 15.3, type: 'optional' },
            { id: 'ELN7AM', name: 'Desenvolvimento de Projetos Eletrônicos', dependencies: ["ELN72A"], groupId: '[1120]', period: 6, chs: 2, cht: 30, x: 58, y: 15.3, type: 'optional' },
            { id: 'ELN7AN', name: 'Robótica Aplicada', dependencies: ["ELN78A"], equivalents: [{ id: 'ELEW41', cht: 75 }], groupId: '[1120]', period: 6, chs: 5, cht: 75, x: 74, y: 15.3, type: 'optional' },
            { id: 'ELN7AO', name: 'Linux Básico', dependencies: [], equivalents: [{ id: 'ELN8CA', cht: 60 }], groupId: '[1120]', period: 6, chs: 4, cht: 60, x: 90, y: 15.3, type: 'optional' },
            { id: 'ELTA2', name: 'BIOENGENHARIA', dependencies: ["ELN76A"], groupId: '[1120]', period: 6, chs: 4, cht: 60, x: 10, y: 20.4, type: 'optional' },
            { id: 'ELTD1', name: 'INTRODUÇÃO À MODELAGEM E APRENDIZADO', dependencies: ["EST70A"], groupId: '[1120]', period: 6, chs: 4, cht: 60, x: 26, y: 20.4, type: 'optional' },
            { id: 'ELTD2', name: 'PROCESSAMENTO DE IMAGENS', dependencies: ["Periodo:6"], equivalents: [{ id: 'CSV30', cht: 60 }], groupId: '[1120]', period: 6, chs: 3, cht: 45, x: 42, y: 20.4, type: 'optional' },
            { id: 'ELTD4', name: 'RECONHECIMENTO DE PADRÕES E APRENDIZADO DE MÁQUINA', dependencies: ["ELTD1"], groupId: '[1120]', period: 6, chs: 3, cht: 45, x: 58, y: 20.4, type: 'optional' },
            { id: 'ELTD6', name: 'FUNDAMENTOS MATEMÁTICOS PARA SINAIS, IMAGENS E PADRÕES', dependencies: ["EST70A", "MAT7AL"], groupId: '[1120]', period: 6, chs: 4, cht: 60, x: 74, y: 20.4, type: 'optional' },
            { id: 'ELTD7', name: 'INTRODUÇÃO AO APRENDIZADO DE MÁQUINA', dependencies: ["ELTD6"], groupId: '[1120]', period: 6, chs: 4, cht: 60, x: 90, y: 20.4, type: 'optional' },
            { id: 'ELTE10', name: 'IDENTIFICAÇÃO DE SISTEMAS', dependencies: ["ELN78A"], groupId: '[1120]', period: 6, chs: 4, cht: 60, x: 10, y: 25.6, type: 'optional' },
            { id: 'ELTE13', name: 'VEÍCULOS ELÉTRICOS', dependencies: ["ELN77C", "ELN78C"], groupId: '[1120]', period: 6, chs: 4, cht: 60, x: 26, y: 25.6, type: 'optional' },
            { id: 'ELTE2', name: 'PROGRAMAÇÃO MATEMÁTICA', dependencies: [], equivalents: [{ id: 'CSD41', cht: 45 }], groupId: '[1120]', period: 6, chs: 4, cht: 60, x: 42, y: 25.6, type: 'optional' },
            { id: 'ELTE6', name: 'ENERGIA FOTOVOLTAICA', dependencies: [], groupId: '[1120]', period: 6, chs: 4, cht: 60, x: 58, y: 25.6, type: 'optional' },
            { id: 'ELTE8', name: 'SISTEMAS NÃO LINEARES', dependencies: ["ELN78A"], groupId: '[1120]', period: 6, chs: 4, cht: 60, x: 74, y: 25.6, type: 'optional' },
            { id: 'ELTE9', name: 'CONTROLE AUTOMÁTICO', dependencies: ["ELN78A"], groupId: '[1120]', period: 6, chs: 4, cht: 60, x: 90, y: 25.6, type: 'optional' },

            // --- Trilha [1121] ---
            { id: 'MEC78B', name: 'ENGENHARIA ECONÔMICA', dependencies: [], groupId: '[1121]', period: 6, chs: 2, cht: 30, x: 10, y: 34.6, type: 'optional' },
            { id: 'MEC7AA', name: 'PRINCÍPIOS DE MECÂNICA RACIONAL', dependencies: ["MEC74A"], equivalents: [{ id: 'FIS76B', cht: 60 }], groupId: '[1121]', period: 6, chs: 4, cht: 60, x: 26, y: 34.6, type: 'optional' },
            { id: 'MEC7AC', name: 'MANUFATURA ADITIVA', dependencies: ["MEC72A"], groupId: '[1121]', period: 6, chs: 3, cht: 45, x: 42, y: 34.6, type: 'optional' },
            { id: 'MEC7AD', name: 'SOLDAGEM', dependencies: ["MEC72B"], equivalents: [{ id: 'MEC75D', cht: 45 }], groupId: '[1121]', period: 6, chs: 3, cht: 45, x: 58, y: 34.6, type: 'optional' },
            { id: 'MEC7AE', name: 'MECANISMOS', dependencies: ["MEC74A"], equivalents: [{ id: 'MEC76F', cht: 60 }], groupId: '[1121]', period: 6, chs: 4, cht: 60, x: 74, y: 34.6, type: 'optional' },
            { id: 'MEC7AF', name: 'PROGRAMAÇÃO DE ROBÔS', dependencies: ["ELN77B"], groupId: '[1121]', period: 6, chs: 2, cht: 30, x: 90, y: 34.6, type: 'optional' },
            { id: 'MEC7AG', name: 'CONTROLE ESTATÍSTICO DE PROCESSO', dependencies: ["EST70A"], groupId: '[1121]', period: 6, chs: 4, cht: 60, x: 10, y: 39.7, type: 'optional' },
            { id: 'MEC7AH', name: 'SIMULAÇÃO', dependencies: ["MEC76D"], groupId: '[1121]', period: 6, chs: 3, cht: 45, x: 26, y: 39.7, type: 'optional' },
            { id: 'MEC7AI', name: 'TECNOLOGIA ASSISTIVA', dependencies: ["MEC75B"], groupId: '[1121]', period: 6, chs: 3, cht: 45, x: 42, y: 39.7, type: 'optional' },
            { id: 'MEC7AJ', name: 'MANUFATURA AVANÇADA E INDÚSTRIA 4.0', dependencies: ["MEC76D"], groupId: '[1121]', period: 6, chs: 4, cht: 60, x: 58, y: 39.7, type: 'optional' },
            { id: 'MEC7AK', name: 'FUNDIÇÃO E CONFORMAÇÃO PLÁSTICA', dependencies: ["MEC72B"], equivalents: [{ id: 'MEC74C', cht: 30 }, { id: 'MEC74D', cht: 30 }], groupId: '[1121]', period: 6, chs: 4, cht: 60, x: 74, y: 39.7, type: 'optional' },
            { id: 'MEC7AL', name: 'Tópicos em Mecânica 1', dependencies: [], groupId: '[1121]', period: 6, chs: 2, cht: 30, x: 90, y: 39.7, type: 'optional' },
            { id: 'MEC7AM', name: 'Tópicos em Mecânica 2', dependencies: [], groupId: '[1121]', period: 6, chs: 3, cht: 45, x: 10, y: 44.9, type: 'optional' },
            { id: 'MEC7AN', name: 'Tópicos em Mecânica 3', dependencies: [], groupId: '[1121]', period: 6, chs: 4, cht: 60, x: 26, y: 44.9, type: 'optional' },
            { id: 'MEC7AO', name: 'Tópicos em Mecânica 4', dependencies: [], groupId: '[1121]', period: 6, chs: 4, cht: 60, x: 42, y: 44.9, type: 'optional' },
            { id: 'MEC7AP', name: 'Programação de Robôs', dependencies: ["ELN77B"], groupId: '[1121]', period: 6, chs: 2, cht: 30, x: 58, y: 44.9, type: 'optional' },
            { id: 'MEC7AQ', name: 'Manufatura Avançada e Indústria 4.0', dependencies: ["MEC76D"], groupId: '[1121]', period: 6, chs: 4, cht: 60, x: 74, y: 44.9, type: 'optional' },
            { id: 'MEC7AR', name: 'Simulação', dependencies: ["MEC76D"], groupId: '[1121]', period: 6, chs: 3, cht: 45, x: 90, y: 44.9, type: 'optional' },
            { id: 'MEC7CO', name: 'PRODUÇÃO ENXUTA', dependencies: ["MEC76D"], groupId: '[1121]', period: 6, chs: 4, cht: 60, x: 10, y: 50.0, type: 'optional' },
            { id: 'MEC7EE', name: 'GESTÃO DE CARREIRA', dependencies: [], groupId: '[1121]', period: 6, chs: 4, cht: 60, x: 26, y: 50.0, type: 'optional' },
            { id: 'MEC7GF', name: 'SIMULAÇÃO DE PROJETOS MECÂNICOS', dependencies: ["MEC76A"], groupId: '[1121]', period: 6, chs: 4, cht: 60, x: 42, y: 50.0, type: 'optional' },

            // --- Trilha [1224] ---
            { id: 'ARQ7DH', name: 'DESIGN THINKING PARA INOVAÇÃO', dependencies: [], groupId: '[1224]', period: 2, chs: 6, cht: 90, x: 10, y: 59.0, type: 'optional' },
            { id: 'ARQ7EC', name: 'PRÁTICAS DE EXTENSÃO UNIVERSITÁRIA', dependencies: [], groupId: '[1224]', period: 2, chs: 4, cht: 60, x: 26, y: 59.0, type: 'optional' },
            { id: 'CAART01', name: 'TÓPICOS EM MÚSICA E TECNOLOGIA: HISTÓRIA DO JAZZ', dependencies: [], groupId: '[1224]', period: 2, chs: 2, cht: 30, x: 42, y: 59.0, type: 'optional' },
            { id: 'CAART02', name: 'PRÁTICA MUSICAL E INTERAÇÕES HUMANAS: APRENDIZADO COLETIVO DE VIOLINO, VIOLA ERUDITA, VIOLONCELO E CONTRABAIXO ACÚSTICO 1', dependencies: [], groupId: '[1224]', period: 2, chs: 4, cht: 60, x: 58, y: 59.0, type: 'optional' },
            { id: 'CAART03', name: 'PRÁTICA MUSICAL E INTERAÇÕES HUMANAS: APRENDIZADO COLETIVO DE VIOLINO, VIOLA ERUDITA, VIOLONCELO E CONTRABAIXO ACÚSTICO 2', dependencies: [], groupId: '[1224]', period: 2, chs: 4, cht: 60, x: 74, y: 59.0, type: 'optional' },
            { id: 'CAART04', name: 'PRÁTICA ARTÍSTICA MUSICAL: GRUPOS INSTRUMENTAIS 1', dependencies: [], groupId: '[1224]', period: 2, chs: 6, cht: 90, x: 90, y: 59.0, type: 'optional' },
            { id: 'CAART05', name: 'PRÁTICA ARTÍSTICA MUSIAL: GRUPOS INSTRUMENTAIS 2', dependencies: [], groupId: '[1224]', period: 2, chs: 6, cht: 90, x: 10, y: 64.1, type: 'optional' },
            { id: 'CAART06', name: 'PRÁTICA ARTÍSTICA MUSICAL: GRUPOS INSTRUMENTAIS 3', dependencies: [], groupId: '[1224]', period: 2, chs: 6, cht: 90, x: 26, y: 64.1, type: 'optional' },
            { id: 'CAART07', name: 'PRÁTICA ARTÍSTICA MUSICAL: GRUPOS INSTRUMENTAIS 4', dependencies: [], groupId: '[1224]', period: 2, chs: 6, cht: 90, x: 42, y: 64.1, type: 'optional' },
            { id: 'CAART08', name: 'INTRODUÇÃO NA PRÁTICA DE CANTO, TEORIA E SOLFEJO MUSICAL 1', dependencies: [], groupId: '[1224]', period: 2, chs: 4, cht: 60, x: 58, y: 64.1, type: 'optional' },
            { id: 'CAART09', name: 'INTROCUÇÃO NA PRÁTICA DE CANTO, TEORIA E SOLFEJO MUSICAL 2', dependencies: [], groupId: '[1224]', period: 2, chs: 4, cht: 60, x: 74, y: 64.1, type: 'optional' },
            { id: 'CAART10', name: 'PRÁTICAS DE VIOLÃO POPULAR E MPB 1', dependencies: [], groupId: '[1224]', period: 2, chs: 6, cht: 90, x: 90, y: 64.1, type: 'optional' },
            { id: 'CAART11', name: 'PRÁTICA DE VIOLÃO POPULAR E MPB 2', dependencies: [], groupId: '[1224]', period: 2, chs: 6, cht: 90, x: 10, y: 69.3, type: 'optional' },
            { id: 'CAART12', name: 'CANTO CORAL 1', dependencies: [], groupId: '[1224]', period: 2, chs: 8, cht: 120, x: 26, y: 69.3, type: 'optional' },
            { id: 'CAART13', name: 'CANTO CORAL 2', dependencies: [], groupId: '[1224]', period: 2, chs: 8, cht: 120, x: 42, y: 69.3, type: 'optional' },
            { id: 'CAART14', name: 'CANTO CORAL 3', dependencies: [], groupId: '[1224]', period: 2, chs: 8, cht: 120, x: 58, y: 69.3, type: 'optional' },
            { id: 'CAART15', name: 'CANTO CORAL 4', dependencies: [], groupId: '[1224]', period: 2, chs: 8, cht: 120, x: 74, y: 69.3, type: 'optional' },
            { id: 'CAART16', name: 'TÉCNICA VOCAL E AFINAÇÃO', dependencies: [], groupId: '[1224]', period: 2, chs: 8, cht: 120, x: 90, y: 69.3, type: 'optional' },
            { id: 'CAART17', name: 'CANTO, FONÉTICA E FONOLOGIA', dependencies: [], groupId: '[1224]', period: 2, chs: 8, cht: 120, x: 10, y: 74.4, type: 'optional' },
            { id: 'CAART21', name: 'TÓPICOS EM PENSAMENTO COMPUTACIONAL E MÚSICA', dependencies: [], groupId: '[1224]', period: 2, chs: 8, cht: 120, x: 26, y: 74.4, type: 'optional' },
            { id: 'CAART22', name: 'COMPUTAÇÃO MUSICAL', dependencies: [], groupId: '[1224]', period: 2, chs: 8, cht: 120, x: 42, y: 74.4, type: 'optional' },
            { id: 'CAART23', name: 'CRIATIVIDADE E PROCESSOS CRIATIVOS', dependencies: [], groupId: '[1224]', period: 2, chs: 8, cht: 120, x: 58, y: 74.4, type: 'optional' },
            { id: 'CAART24', name: 'TECNOLOGIA DA INFORMAÇÃO E COMUNICAÇÃO NA EDUCAÇÃO', dependencies: [], groupId: '[1224]', period: 2, chs: 8, cht: 120, x: 74, y: 74.4, type: 'optional' },
            { id: 'CAART25', name: 'PROJETOS STEAM (SCIENCE, TECHNOLOGY, ENGINEERING, ARTS, MATHEMATICS)', dependencies: [], groupId: '[1224]', period: 2, chs: 8, cht: 120, x: 90, y: 74.4, type: 'optional' },
            { id: 'DIN7HU', name: 'PROJETOS PARA PESSOAS: LABORATÓRIO DE DESIGN E INOVAÇÃO SOCIAL', dependencies: [], groupId: '[1224]', period: 2, chs: 4, cht: 60, x: 10, y: 79.6, type: 'optional' },
            { id: 'ELN7AP', name: 'Práticas de Desenvolvimento para Linux Avançado', dependencies: ["ELN7AO"], equivalents: [{ id: 'ELN8CC', cht: 90 }], groupId: '[1224]', period: 2, chs: 6, cht: 90, x: 26, y: 79.6, type: 'optional' },
            { id: 'ELN7AQ', name: 'Segurança da Informação na Prática', dependencies: [], equivalents: [{ id: 'ELN8DH', cht: 120 }], groupId: '[1224]', period: 2, chs: 8, cht: 120, x: 42, y: 79.6, type: 'optional' },
            { id: 'ELN7AR', name: 'Gestão de Produtos Digitais', dependencies: [], equivalents: [{ id: 'ELN8EB', cht: 90 }], groupId: '[1224]', period: 2, chs: 6, cht: 90, x: 58, y: 79.6, type: 'optional' },
            { id: 'ELN7AS', name: 'Cabeamento Estruturado na Prática', dependencies: ["ELE13"], equivalents: [{ id: 'ELN8DG', cht: 105 }], groupId: '[1224]', period: 2, chs: 7, cht: 105, x: 74, y: 79.6, type: 'optional' },
            { id: 'ELN8BD', name: 'ENGENHARIA DE PROMPT', dependencies: ["ELN74B"], groupId: '[1224]', period: 2, chs: 5, cht: 75, x: 90, y: 79.6, type: 'optional' },
            { id: 'ELN8CD', name: 'DESENVOLVIMENTO PARA SISTEMAS GNU/ LINUX', dependencies: ["ELN7AO"], groupId: '[1224]', period: 2, chs: 6, cht: 90, x: 10, y: 84.7, type: 'optional' },
            { id: 'ELN8DI', name: 'TECHNOLOGICAL CRAFTSMANSHIP WORKS', dependencies: ["Periodo:4"], groupId: '[1224]', period: 2, chs: 7, cht: 105, x: 26, y: 84.7, type: 'optional' },
            { id: 'ELN8DJ', name: 'VISÃO PRÁTICA DA GESTÃO DA SEGURANÇA DA INFORMAÇÃO E SUAS APLICAÇÕES', dependencies: ["ELE13"], groupId: '[1224]', period: 2, chs: 8, cht: 120, x: 42, y: 84.7, type: 'optional' },
            { id: 'ELN8DK', name: 'ESTUDOS DE CASOS E PROJETOS DE CABEAMENTO ESTRUTURADO', dependencies: ["ELE13"], groupId: '[1224]', period: 2, chs: 7, cht: 105, x: 58, y: 84.7, type: 'optional' },
            { id: 'ELN8EC', name: 'INTRODUÇÃO À SUSTENTABILIDADE AMBIENTAL', dependencies: [], groupId: '[1224]', period: 2, chs: 6, cht: 90, x: 74, y: 84.7, type: 'optional' },
            { id: 'FCH7AB', name: 'QUESTÕES CONTEMPORÂNEAS DO CORPO', dependencies: [], groupId: '[1224]', period: 2, chs: 4, cht: 60, x: 90, y: 84.7, type: 'optional' },
            { id: 'FCH7PC', name: 'PLANEJAMENTO DE CARREIRA', dependencies: [], groupId: '[1224]', period: 2, chs: 4, cht: 60, x: 10, y: 89.9, type: 'optional' },
            { id: 'FCH7SF', name: 'POLÍTICA, INSTITUIÇÕES E CIDADANIA NO PARANÁ', dependencies: [], groupId: '[1224]', period: 2, chs: 4, cht: 60, x: 26, y: 89.9, type: 'optional' },
            { id: 'FCH7XB', name: 'PRESENÇA AFRICANA NO BRASIL: TECNOLOGIA, TRABALHO E CULTURA', dependencies: [], groupId: '[1224]', period: 2, chs: 3, cht: 45, x: 42, y: 89.9, type: 'optional' },
            { id: 'GEE72H', name: 'A PRÁTICA DA EXTENSÃO UNIVERSITÁRIA', dependencies: [], groupId: '[1224]', period: 2, chs: 2, cht: 30, x: 58, y: 89.9, type: 'optional' },
            { id: 'GEE73C', name: 'MATEMÁTICA FINANCEIRA', dependencies: [], groupId: '[1224]', period: 2, chs: 3, cht: 45, x: 74, y: 89.9, type: 'optional' },
            { id: 'GEE76A', name: 'ELABORAÇÃO E GESTÃO DE PROJETOS', dependencies: [], groupId: '[1224]', period: 2, chs: 3, cht: 45, x: 90, y: 89.9, type: 'optional' },
            { id: 'LICOM7AA', name: 'UNICAÇÃO E EDUCAÇÃO', dependencies: [], groupId: '[1224]', period: 2, chs: 6, cht: 90, x: 10, y: 95.0, type: 'optional' },
            { id: 'LICOM7AB', name: 'COMUNICAÇÃO, SOCIEDADE E EVENTOS SMART CHALLENGES SMART PROJECTS', dependencies: [], groupId: '[1224]', period: 2, chs: 7, cht: 105, x: 26, y: 95.0, type: 'optional' },
            { id: 'SMCHAL', name: 'SMART CHALLENGES', dependencies: [], groupId: '[1224]', period: 2, chs: 8, cht: 120, x: 42, y: 95.0, type: 'optional' },
            { id: 'SMPROJ', name: 'SMART PROJECTS', dependencies: [], groupId: '[1224]', period: 2, chs: 8, cht: 120, x: 58, y: 95.0, type: 'optional' },

        ];

export { TOTAL_COMPLEMENTARY_HOURS, TOTAL_EXTENSION_HOURS, TOTAL_HUMANITIES_HOURS, TOTAL_OPTIONAL_HOURS, NODE_WIDTH, NODE_HEIGHT, OPTIONAL_LAYOUT_MIN_X, OPTIONAL_LAYOUT_MAX_X, OPTIONAL_LAYOUT_MIN_Y, OPTIONAL_LAYOUT_MAX_Y, SPECIALIZATION_TRACKS, OPTIONAL_GROUPS_CONFIG, allNodesData, allHumanitiesData, allOptionalNodesData };
