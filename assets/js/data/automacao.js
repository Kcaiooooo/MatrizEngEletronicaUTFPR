const TOTAL_COMPLEMENTARY_HOURS = 15;

const TOTAL_EXTENSION_HOURS = 420;

const TOTAL_HUMANITIES_HOURS = 135;

const TOTAL_OPTIONAL_HOURS = 540;

const NODE_WIDTH = 130;

const NODE_HEIGHT = 90;

const OPTIONAL_LAYOUT_MIN_X = 14;

const OPTIONAL_LAYOUT_MAX_X = 92;

const OPTIONAL_LAYOUT_MIN_Y = 10;

const OPTIONAL_LAYOUT_MAX_Y = 92;

const SPECIALIZATION_TRACKS = {
            'Automação e Sistemas': [ // Grupo 1139
                'ELT7AA', 'ELT7AB', 'ELT7AC', 'ELT7AD', 'ELT7AE', 'ELT7AF', 'ELT7AG', 'ELT7AH', 'ELT7AI', 'ELT7AJ', 'ELT7AK'
            ],
            'Modelagem e Controle': [ // Grupo 1138
                'ELT7EA', 'ELT7EB', 'ELT7EC', 'ELT7ED', 'ELT7EE', 'ELT7EF', 'ELT7EG', 'ELT7EH', 'ELT7EI', 'ELT7EJ', 'ELT7EK', 'ELT7EL', 'ELT7EM', 'ELT7EN', 'ELT7EO', 'ELT7EP'
            ],
            'Manutenção Industrial': [ // Grupo 1148
                'ELT7DA', 'ELT7DB', 'ELT7DC', 'ELT7DD', 'ELT7DE', 'ELT7DF', 'ELT7DG', 'ELT7DH', 'ELT7DI', 'ELT7DJ'
            ],
            'Projetos Eletrônicos e de Máquinas': [ // Grupo 1149
                'ELT7FA', 'ELT7FB', 'ELT7FC', 'ELT7FD', 'ELT7FE', 'ELT7FF', 'ELT7FG', 'ELT7FH', 'ELT7FI', 'ELT7FJ', 'ELT7FK', 'ELT7FL', 'ELT7FM', 'ELT77G'
            ],
            'Energia e Sustentabilidade': [ // Grupo 1147
                'ELT7BA', 'ELT7BB', 'ELT7BC', 'ELT7BD', 'ELT7BE', 'ELT7BF', 'ELT7BG', 'ELT7BH', 'ELT7BI', 'ELT7BJ', 'ELT7BK', 'ELT7BL', 'ELT7BM', 'ELT7BN', 'ELT7BO', 'ELT7BP', 'ELT7BQ', 'ELT7BR', 'ELT7BS', 'ELT7BT'
            ],
            'Instalações e Eficiência Energética': [ // Grupo 1146
                'ELT7CA', 'ELT7CB', 'ELT7CC', 'ELT7CD', 'ELT7CE', 'ELT7CF', 'ELT7CG', 'ELT7CH', 'ELT76B', 'ELT77B'
            ]
        };

const OPTIONAL_GROUPS_CONFIG = {
            '[1136]': { requiredHours: 135, name: 'Ciências Humanas, Linguagens, Letras e Artes' },
            '[1137]': { requiredHours: 135, name: 'Empregabilidade e Empreendedorismo' },
            '[1138]': { requiredHours: 135, name: 'Modelagem e Controle' },
            '[1139]': { requiredHours: 135, name: 'Automação e Sistemas' },
            '[1140]': { requiredHours: 135, name: 'Formação Complementar' },
            '[1146]': { requiredHours: 134, name: 'Instalações e Eficiência Energética' },
            '[1147]': { requiredHours: 135, name: 'Energia e Sustentabilidade' },
            '[1148]': { requiredHours: 135, name: 'Manutenção Industrial' },
            '[1149]': { requiredHours: 135, name: 'Projetos Eletrônicos e de Máquinas' }
        };

const allNodesData = [
            // --- Período 1 ---
            { id: 'ELT71A', name: 'INTRODUÇÃO À ENGENHARIA ELÉTRICA E CONTROLE E AUTOMAÇÃO', dependencies: [], period: 1, chs: 5, cht: 75, x: 5.5, y: 2, type: 'subject' },
            { id: 'ELT71B', name: 'DESENHO ELÉTRICO', dependencies: [], equivalents: [{ id: 'ELT81D', cht: 45 }], period: 1, chs: 3, cht: 45, x: 23, y: 2, type: 'subject' },
            { id: 'ELT71C', name: 'LABORATÓRIOS DE INSTALAÇÕES ELÉTRICAS', dependencies: [], period: 1, chs: 3, cht: 45, x: 41, y: 2, type: 'subject' },
            { id: 'INF71A', name: 'COMPUTAÇÃO 1', dependencies: [], period: 1, chs: 4, cht: 60, x: 59, y: 2, type: 'subject' },
            { id: 'MAT7GA', name: 'GEOMETRIA ANALÍTICA', dependencies: [], period: 1, chs: 4, cht: 60, x: 77, y: 2, type: 'subject' },
            { id: 'MAT7PC', name: 'PRÉ-CÁLCULO', dependencies: [], period: 1, chs: 4, cht: 60, x: 94.5, y: 2, type: 'subject' },

            // --- Período 2 ---
            { id: 'ELT72A', name: 'FUNDAMENTOS DE GESTÃO DE PROJETOS', dependencies: [], equivalents: [{ id: 'ELT82A', cht: 45 }, { id: 'GEE7G5', cht: 45 }], period: 2, chs: 3, cht: 45, x: 5.5, y: 13, type: 'subject' },
            { id: 'ELT72B', name: 'SISTEMAS DIGITAIS', dependencies: [], period: 2, chs: 4, cht: 60, x: 20, y: 13, type: 'subject' },
            { id: 'ELT72C', name: 'FENÔMENOS ELETROMAGNÉTICOS', dependencies: [], period: 2, chs: 6, cht: 90, x: 35, y: 13, type: 'subject' },
            { id: 'FIS7F1', name: 'FÍSICA TEÓRICA 1', dependencies: [], period: 2, chs: 4, cht: 60, x: 50, y: 13, type: 'subject' },
            { id: 'INF72A', name: 'COMPUTAÇÃO 2', dependencies: ['INF71A'], period: 2, chs: 4, cht: 60, x: 65, y: 13, type: 'subject' },
            { id: 'MAT7AL', name: 'ÁLGEBRA LINEAR', dependencies: ['MAT7GA'], equivalents: [{ id: 'MECP72A' }], period: 2, chs: 4, cht: 60, x: 80, y: 13, type: 'subject' },
            { id: 'MAT7C1', name: 'CÁLCULO DIFERENCIAL E INTEGRAL 1', dependencies: ['MAT7PC'], equivalents: [{ id: 'MECP71B' }], period: 2, chs: 6, cht: 90, x: 94.5, y: 13, type: 'subject' },

            // --- Período 3 ---
            { id: 'COE70A', name: 'COMUNICAÇÃO ORAL E ESCRITA', dependencies: ['Periodo:2'], period: 3, chs: 2, cht: 30, x: 5.5, y: 23, type: 'subject' },
            { id: 'ELT73A', name: 'SISTEMAS MICROCONTROLADOS', dependencies: ['ELT72B'], period: 3, chs: 4, cht: 60, x: 18, y: 23, type: 'subject' },
            { id: 'ELT73B', name: 'ANÁLISE DE CIRCUITOS A', dependencies: ['ELT72C'], period: 3, chs: 4, cht: 90, x: 31, y: 23, type: 'subject' },
            { id: 'FIS7E1', name: 'FÍSICA EXPERIMENTAL 1', dependencies: ['FIS7F1'], period: 3, chs: 2, cht: 30, x: 44, y: 23, type: 'subject' },
            { id: 'FIS7F2', name: 'FÍSICA TEÓRICA 2', dependencies: [], period: 3, chs: 4, cht: 60, x: 57, y: 23, type: 'subject' },
            { id: 'GEE7E3', name: 'FUNDAMENTOS DE ECONOMIA', dependencies: ['Periodo:2'], period: 3, chs: 2, cht: 30, x: 70, y: 23, type: 'subject' },
            { id: 'MAT7C2', name: 'CÁLCULO DIFERENCIAL E INTEGRAL 2', dependencies: ['MAT7C1', 'MAT7GA'], equivalents: [{ id: 'MECP72B' }], period: 3, chs: 6, cht: 90, x: 83, y: 23, type: 'subject' },
            { id: 'MAT7ED', name: 'EQUAÇÕES DIFERENCIAIS ORDINÁRIAS', dependencies: ['MAT7AL', 'MAT7C1'], period: 3, chs: 4, cht: 60, x: 94.5, y: 23, type: 'subject' },

            // --- Período 4 ---
            { id: 'ELT74A', name: 'FUNDAMENTOS DE FENÔMENOS DE TRANSPORTE', dependencies: ['FIS7F2'], period: 4, chs: 2, cht: 30, x: 5.5, y: 34, type: 'subject' },
            { id: 'ELT74B', name: 'ANÁLISE DE CIRCUITOS B', dependencies: ['ELT73B', 'MAT7ED'], period: 4, chs: 6, cht: 120, x: 23, y: 34, type: 'subject' },
            { id: 'ELT74C', name: 'SINAIS E SISTEMAS', dependencies: ['ELT73B', 'MAT7ED'], period: 4, chs: 4, cht: 60, x: 41, y: 34, type: 'subject' },
            { id: 'ELT74D', name: 'MATERIAIS E EQUIPAMENTOS ELÉTRICOS 1', dependencies: ['ELT71B', 'ELT71C'], period: 4, chs: 2, cht: 60, x: 59, y: 34, type: 'subject' },
            { id: 'ELT74E', name: 'AMPLIFICADORES OPERACIONAIS E SEMICONDUTORES', dependencies: ['ELT73B'], period: 4, chs: 6, cht: 120, x: 77, y: 34, type: 'subject' },
            { id: 'ELT74F', name: 'OFICINA DE INTEGRAÇÃO, PESQUISA E EXTENSÃO 1', dependencies: ['Periodo:4'], period: 4, chs: 2, cht: 120, x: 94.5, y: 34, type: 'subject' },

            // --- Período 5 ---
            { id: 'ELT75A', name: 'ANÁLISE DE SISTEMAS LINEARES', dependencies: ['ELT74C'], period: 5, chs: 2, cht: 30, x: 5.5, y: 45, type: 'subject' },
            { id: 'ELT75B', name: 'ELEMENTOS DE MECÂNICA', dependencies: ['FIS7F1', 'MAT7GA'], period: 5, chs: 4, cht: 60, x: 20, y: 45, type: 'subject' },
            { id: 'ELT75C', name: 'SISTEMAS ELETROMAGNÉTICOS', dependencies: ['ELT71C'], equivalents: [{ id: 'ELT83C', cht: 60 }], period: 5, chs: 3, cht: 45, x: 35, y: 45, type: 'subject' },
            { id: 'ELT75D', name: 'PROBABILIDADE E ESTATÍSTICA APLICADA A ENGENHARIA', dependencies: ['MAT7PC'], period: 5, chs: 2, cht: 45, x: 50, y: 45, type: 'subject' },
            { id: 'ELT75E', name: 'ELETRÔNICA DE POTÊNCIA', dependencies: ['ELT74B'], equivalents: [{ id: 'ELF84' }], period: 5, chs: 4, cht: 90, x: 65, y: 45, type: 'subject' },
            { id: 'ELT75F', name: 'MEDIDAS ELÉTRICAS', dependencies: ['ELT74B'], period: 5, chs: 2, cht: 60, x: 80, y: 45, type: 'subject' },
            { id: 'ELT75H', name: 'INSTRUMENTAÇÃO INDUSTRIAL', dependencies: ['ELT74E'], equivalents: [{ id: 'ELT85E', cht: 60 }], period: 5, chs: 4, cht: 60, x: 94.5, y: 45, type: 'subject' },

            // --- Período 6 ---
            { id: 'ELT76A', name: 'SISTEMAS DE CONTROLE CONTÍNUO', dependencies: ['ELT75A'], period: 6, chs: 3, cht: 60, x: 5.5, y: 55, type: 'subject' },
            { id: 'ELT76C', name: 'CONVERSÃO ELETROMECÂNICA DE ENERGIA 1', dependencies: ['ELT74B'], period: 6, chs: 4, cht: 90, x: 23, y: 55, type: 'subject' },
            { id: 'ELT76F', name: 'OFICINA DE INTEGRAÇÃO, PESQUISA E EXTENSÃO II', dependencies: ['Periodo:6'], period: 6, chs: 2, cht: 105, x: 41, y: 55, type: 'subject' },
            { id: 'ELT76G', name: 'SISTEMAS PNEUMÁTICOS, ELETROPNEUMÁTICOS E HIDRÁULICO', dependencies: ['ELT75C'], equivalents: [{ id: 'ELT84C', cht: 60 }], period: 6, chs: 3, cht: 45, x: 59, y: 55, type: 'subject' },
            { id: 'ELT76H', name: 'INSTRUMENTAÇÃO VIRTUAL', dependencies: ['INF72A'], period: 6, chs: 2, cht: 60, x: 77, y: 55, type: 'subject' },
            { id: 'ELT77D', name: 'CONTROLADORES LÓGICOS PROGRAMÁVEIS', dependencies: ['ELT75C'], equivalents: [{ id: 'ELT84B', cht: 60 }], period: 6, chs: 4, cht: 60, x: 94.5, y: 55, type: 'subject' },

            // --- Período 7 ---
            { id: 'ELT77A', name: 'SISTEMAS DE CONTROLE DISCRETO', dependencies: ['ELT76A'], period: 7, chs: 3, cht: 60, x: 5.5, y: 66, type: 'subject' },
            { id: 'ELT77C', name: 'CONVERSÃO ELETROMECÂNICA DE ENERGIA 2', dependencies: ['ELT76C'], period: 7, chs: 4, cht: 60, x: 23, y: 66, type: 'subject' },
            { id: 'ELT77F', name: 'SEGURANÇA E LEGISLAÇÃO PROFISSIONAL', dependencies: ['Periodo:7'], period: 7, chs: 1, cht: 60, x: 41, y: 66, type: 'subject' },
            { id: 'ELT77H', name: 'GERÊNCIA DE MANUTENÇÃO', dependencies: ['ELT75D'], period: 7, chs: 1, cht: 45, x: 59, y: 66, type: 'subject' },
            { id: 'ELT77I', name: 'IOT INDUSTRIAL', dependencies: ['ELT76H', 'INF72A'], period: 7, chs: 3, cht: 60, x: 77, y: 66, type: 'subject' },
            { id: 'ELT77J', name: 'CONTROLE E SUPERVISÃO', dependencies: ['ELT76A'], equivalents: [{ id: 'ELT86C', cht: 60 }], period: 7, chs: 2, cht: 60, x: 94.5, y: 66, type: 'subject' },

            // --- Período 8 ---
            { id: 'ELT78A', name: 'METODOLOGIA APLICADA AO TCC', dependencies: ['Periodo:7'], period: 8, chs: 1, cht: 30, x: 20, y: 77, type: 'subject' },
            { id: 'ELT78B', name: 'OFICINA DE INTEGRAÇÃO, PESQUISA E EXTENSÃO III', dependencies: ['Periodo:8'], period: 8, chs: 2, cht: 120, x: 45, y: 77, type: 'subject' },
            { id: 'ELT78C', name: 'ESTÁGIO CURRICULAR OBRIGATÓRIO', dependencies: ['Periodo:7'], period: 8, chs: 0, cht: 360, x: 70, y: 77, type: 'subject' },
            { id: 'ELT78E', name: 'ATIVIDADES COMPLEMENTARES', dependencies: ['Periodo:7'], period: 8, chs: 0, cht: 15, x: 94.5, y: 77, type: 'subject' },

            // --- Período 9 ---
            { id: 'ELT79A', name: 'TRABALHO DE CONCLUSÃO DE CURSO', dependencies: ['ELT78A'], period: 9, chs: 5, cht: 75, x: 45, y: 87, type: 'subject' }
        ];

const allHumanitiesData = [
            // --- Grupo [1136] - Ciências Humanas, Linguagens, Letras e Artes ---
            { id: 'EDU70J', name: 'LIBRAS', dependencies: ['Periodo:3'], period: 5, cht: 45, type: 'humanities', x: 10, y: 10, groupId: '[1136]' },
            { id: 'FCH7AA', name: 'DANÇA E TECNOLOGIA', dependencies: ['Periodo:3'], period: 5, cht: 60, type: 'humanities', x: 30, y: 10, groupId: '[1136]' },
            { id: 'FCH7AB', name: 'QUESTÕES CONTEMPORÂNEAS DO CORPO', dependencies: ['Periodo:3'], period: 5, cht: 60, type: 'humanities', x: 50, y: 10, groupId: '[1136]' },
            { id: 'FCH7FA', name: 'FILOSOFIA DA CIÊNCIA E DA TECNOLOGIA', dependencies: ['Periodo:3'], period: 5, cht: 45, type: 'humanities', x: 70, y: 10, groupId: '[1136]' },
            { id: 'FCH7FB', name: 'FUNDAMENTOS DA ÉTICA', dependencies: ['Periodo:3'], period: 5, cht: 45, type: 'humanities', x: 90, y: 10, groupId: '[1136]' },

            { id: 'FCH7FC', name: 'TEORIA DAS CIÊNCIAS HUMANAS', dependencies: ['Periodo:3'], period: 5, cht: 45, type: 'humanities', x: 10, y: 25, groupId: '[1136]' },
            { id: 'FCH7GA', name: 'METROPOLIZAÇÃO CONTEMPORÂNEA', dependencies: ['Periodo:3'], period: 5, cht: 45, type: 'humanities', x: 30, y: 25, groupId: '[1136]' },
            { id: 'FCH7HA', name: 'HISTÓRIA DA TÉCNICA E DA TECNOLOGIA', dependencies: ['Periodo:3'], period: 5, cht: 45, type: 'humanities', x: 50, y: 25, groupId: '[1136]' },
            { id: 'FCH7HB', name: 'HISTÓRIA GERAL DA ECONOMIA', dependencies: ['Periodo:3'], period: 5, cht: 45, type: 'humanities', x: 70, y: 25, groupId: '[1136]' },
            { id: 'FCH7HC', name: 'CAPITALISMO CONTEMPORÂNEO E ECONOMIA POLÍTICA', dependencies: ['Periodo:3'], period: 5, cht: 45, type: 'humanities', x: 90, y: 25, groupId: '[1136]' },

            { id: 'FCH7PA', name: 'PSICOLOGIA DO TRABALHO', dependencies: ['Periodo:3'], period: 5, cht: 30, type: 'humanities', x: 10, y: 40, groupId: '[1136]' },
            { id: 'FCH7PB', name: 'RELAÇÕES INTERPESSOAIS, GRUPO E PODER', dependencies: ['Periodo:3'], period: 5, cht: 30, type: 'humanities', x: 30, y: 40, groupId: '[1136]' },
            { id: 'FCH7PC', name: 'PLANEJAMENTO DE CARREIRA', dependencies: ['Periodo:3'], period: 5, cht: 60, type: 'humanities', x: 50, y: 40, groupId: '[1136]' },
            { id: 'FCH7SA', name: 'SOCIOLOGIA', dependencies: ['Periodo:3'], period: 5, cht: 45, type: 'humanities', x: 70, y: 40, groupId: '[1136]' },
            { id: 'FCH7SB', name: 'TECNOLOGIA E SOCIEDADE', dependencies: ['Periodo:3'], period: 5, cht: 45, type: 'humanities', x: 90, y: 40, groupId: '[1136]' },

            { id: 'FCH7SC', name: 'TECNOLOGIA, TRABALHO E SAÚDE', dependencies: ['Periodo:3'], period: 5, cht: 45, type: 'humanities', x: 10, y: 55, groupId: '[1136]' },
            { id: 'FCH7SD', name: 'SOCIEDADE E POLÍTICA NO BRASIL', dependencies: ['Periodo:3'], period: 5, cht: 45, type: 'humanities', x: 30, y: 55, groupId: '[1136]' },
            { id: 'FCH7SE', name: 'SOCIEDADE E POLÍTICA NO PARANÁ', dependencies: ['Periodo:3'], period: 5, cht: 45, type: 'humanities', x: 50, y: 55, groupId: '[1136]' },
            { id: 'FCH7SF', name: 'POLÍTICA, INSTITUIÇÕES E CIDADANIA NO PARANÁ', dependencies: ['Periodo:3'], period: 5, cht: 60, type: 'humanities', x: 70, y: 55, groupId: '[1136]' },
            { id: 'FCH7XA', name: 'TECNOLOGIA SOCIAL E ECONOMIA SOLIDÁRIA', dependencies: ['Periodo:3'], period: 5, cht: 60, type: 'humanities', x: 90, y: 55, groupId: '[1136]' },

            { id: 'FCH7XB', name: 'PRESENÇA AFRICANA NO BRASIL: TECNOLOGIA, TRABALHO E CULTURA', dependencies: ['Periodo:3'], period: 5, cht: 45, type: 'humanities', x: 10, y: 70, groupId: '[1136]' },
            { id: 'FCH7XC', name: 'PRESENÇA AFRICANA NO BRASIL', dependencies: ['Periodo:3'], period: 5, cht: 30, type: 'humanities', x: 30, y: 70, groupId: '[1136]' },
            { id: 'FCH7XD', name: 'DIREITOS HUMANOS, SEGURANÇA E DIVERSIDADE', dependencies: ['Periodo:3'], period: 5, cht: 45, type: 'humanities', x: 50, y: 70, groupId: '[1136]' },
            { id: 'FCH7XE', name: 'POLÍTICAS PÚBLICAS', dependencies: ['Periodo:3'], period: 5, cht: 45, type: 'humanities', x: 70, y: 70, groupId: '[1136]' },
            { id: 'FCH7XF', name: 'DIMENSÃO AMBIENTAL NA GESTÃO URBANA', dependencies: ['Periodo:3'], period: 5, cht: 45, type: 'humanities', x: 90, y: 70, groupId: '[1136]' },
            { id: 'FCH7XG', name: 'TECNOPOLÍTICAS DA SOCIEDADE CONTEMPORÂNEA', dependencies: ['Periodo:3'], period: 5, cht: 45, type: 'humanities', x: 50, y: 76, groupId: '[1136]' },

            // --- Grupo [1137] - Empregabilidade e Empreendedorismo ---
            { id: 'ELT7GA', name: 'DECISÃO MULTICRITÉRIO', dependencies: ['Periodo:5'], period: 8, cht: 45, type: 'humanities', x: 10, y: 86, groupId: '[1137]' },
            { id: 'ELT7GB', name: 'PRODUÇÃO SUSTENTÁVEL', dependencies: ['Periodo:5'], period: 8, cht: 45, type: 'humanities', x: 30, y: 86, groupId: '[1137]' },
            { id: 'ELT7GC', name: 'ANALYTICS PARA OPERAÇÕES, ENERGIA E MANUTENÇÃO', dependencies: ['Periodo:5'], period: 8, cht: 45, type: 'humanities', x: 50, y: 86, groupId: '[1137]' },
            { id: 'GEE7A2', name: 'FUNDAMENTOS DE ADMINISTRAÇÃO', dependencies: ['Periodo:5'], period: 8, cht: 45, type: 'humanities', x: 70, y: 86, groupId: '[1137]' },
            { id: 'GEE7E2', name: 'FUNDAMENTOS DE EMPREENDEDORISMO', dependencies: ['Periodo:5'], period: 8, cht: 30, type: 'humanities', x: 90, y: 86, groupId: '[1137]' },

            { id: 'GEE7E6', name: 'FUNDAMENTOS DE ENGENHARIA ECONÔMICA E ANÁLISE DE VIABILIDADE', dependencies: ['Periodo:5'], period: 8, cht: 60, type: 'humanities', x: 20, y: 92, groupId: '[1137]' },
            { id: 'GEE7F2', name: 'FUNDAMENTOS DE FINANÇAS', dependencies: ['Periodo:5'], period: 8, cht: 60, type: 'humanities', x: 40, y: 92, groupId: '[1137]' },
            { id: 'GEE7G2', name: 'FUNDAMENTOS DE GESTÃO DE PESSOAS', dependencies: ['Periodo:5'], period: 8, cht: 45, type: 'humanities', x: 60, y: 92, groupId: '[1137]' },
            { id: 'GEE7G4', name: 'FUNDAMENTOS DE GESTÃO DA PRODUÇÃO', dependencies: ['Periodo:5'], period: 8, cht: 45, type: 'humanities', x: 80, y: 92, groupId: '[1137]' },
            { id: 'GEE7M2', name: 'FUNDAMENTOS DE MARKETING', dependencies: ['Periodo:5'], period: 8, cht: 45, type: 'humanities', x: 35, y: 95, groupId: '[1137]' },
            { id: 'QBI7CA', name: 'CIÊNCIAS DO AMBIENTE', dependencies: ['Periodo:5'], period: 8, cht: 30, type: 'humanities', x: 55, y: 95, groupId: '[1137]', alternative: { id: 'QB70J / QB70E / QB17CA', name: 'QB70J, QB70E, QB17CA' } },
        ];

const allOptionalNodesData = [
            // --- Trilha [1139]: Automação e Sistemas ---
            { id: 'ELT7AA', name: 'INTRODUÇÃO À INTELIGÊNCIA ARTIFICIAL', dependencies: ['Periodo:7'], period: 8, cht: 45, x: 10, y: 10, type: 'optional', groupId: '[1139]' },
            { id: 'ELT7AB', name: 'INSTRUMENTAÇÃO PARA MEDIDAS ELÉTRICAS', dependencies: ['Periodo:7'], period: 8, cht: 45, x: 25, y: 10, type: 'optional', groupId: '[1139]' },
            { id: 'ELT7AC', name: 'PROJETOS DE QUADROS ELÉTRICOS', dependencies: ['Periodo:7'], period: 8, cht: 60, x: 40, y: 10, type: 'optional', groupId: '[1139]' },
            { id: 'ELT7AD', name: 'SENSORES A FIBRA ÓTICA PARA APLICAÇÕES', dependencies: ['Periodo:7'], period: 8, cht: 45, x: 55, y: 10, type: 'optional', groupId: '[1139]' },
            { id: 'ELT7AE', name: 'MÉTODOS DE AVALIAÇÃO E TOMADA DE DECISÃO', dependencies: ['Periodo:7'], period: 8, cht: 60, x: 70, y: 10, type: 'optional', groupId: '[1139]' },
            { id: 'ELT7AH', name: 'SISTEMAS ROBÓTICOS 2', dependencies: ['Periodo:7'], period: 8, cht: 45, x: 85, y: 10, type: 'optional', groupId: '[1139]' },
            { id: 'ELT7AF', name: 'SIMULAÇÃO DE SISTEMAS ELÉTRICOS INDUSTRIAIS', dependencies: ['Periodo:7'], period: 8, cht: 60, x: 20, y: 16, type: 'optional', groupId: '[1139]' },
            { id: 'ELT7AG', name: 'SISTEMAS ROBÓTICOS 1', dependencies: ['Periodo:7'], period: 8, cht: 45, x: 35, y: 16, type: 'optional', groupId: '[1139]' },
            { id: 'ELT7AI', name: 'INTRODUÇÃO À MECATRÔNICA', dependencies: ['Periodo:7'], period: 8, cht: 45, x: 50, y: 16, type: 'optional', groupId: '[1139]' },
            { id: 'ELT7AJ', name: 'TÓPICOS AVANÇADOS EM AUTOMAÇÃO I', dependencies: ['Periodo:7'], period: 8, cht: 60, x: 65, y: 16, type: 'optional', groupId: '[1139]' },
            { id: 'ELT7AK', name: 'SENSORES INTELIGENTES', dependencies: ['Periodo:7'], period: 8, cht: 45, x: 80, y: 16, type: 'optional', groupId: '[1139]' },

            // --- Trilha [1138]: Modelagem e Controle ---
            { id: 'ELT7EA', name: 'PROCESSAMENTO DIGITAL DE SINAIS', dependencies: ['Periodo:7'], period: 8, cht: 45, x: 10, y: 25, type: 'optional', groupId: '[1138]' },
            { id: 'ELT7EB', name: 'REDES DE SENSORES SEM FIO DE LONGO ALCANCE', dependencies: [], period: 8, cht: 45, x: 25, y: 25, type: 'optional', groupId: '[1138]' },
            { id: 'ELT7EC', name: 'REDES DE SENSORES SEM FIO IPV6', dependencies: ['Periodo:7'], period: 8, cht: 45, x: 40, y: 25, type: 'optional', groupId: '[1138]' },
            { id: 'ELT7ED', name: 'FILTROS ESTOCÁSTICOS APLICADOS NA ENGENHARIA', dependencies: ['Periodo:7'], period: 8, cht: 45, x: 55, y: 25, type: 'optional', groupId: '[1138]' },
            { id: 'ELT7EE', name: 'CONTROLE MULTIVARIÁVEL', dependencies: ['Periodo:7'], period: 8, cht: 60, x: 70, y: 25, type: 'optional', groupId: '[1138]' },
            { id: 'ELT7EF', name: 'INTRODUÇÃO A IDENTIFICAÇÃO DE SISTEMAS', dependencies: ['Periodo:7'], period: 8, cht: 60, x: 85, y: 25, type: 'optional', groupId: '[1138]' },
            { id: 'ELT7EG', name: 'INTRODUÇÃO À DINÂMICA E AO CONTROLE DE ATITUDE', dependencies: ['Periodo:7'], period: 8, cht: 60, x: 10, y: 31, type: 'optional', groupId: '[1138]' },
            { id: 'ELT7EH', name: 'PROCESSOS ALEATÓRIOS', dependencies: ['Periodo:7'], period: 8, cht: 60, x: 25, y: 31, type: 'optional', groupId: '[1138]' },
            { id: 'ELT7EI', name: 'TÓPICOS ESPECIAIS EM CONTROLE 1', dependencies: ['Periodo:7'], period: 8, cht: 60, x: 40, y: 31, type: 'optional', groupId: '[1138]' },
            { id: 'ELT7EJ', name: 'TÓPICOS ESPECIAIS EM CONTROLE 2', dependencies: ['Periodo:7'], period: 8, cht: 60, x: 55, y: 31, type: 'optional', groupId: '[1138]' },
            { id: 'ELT7EK', name: 'TÓPICOS ESPECIAIS EM CONTROLE 3', dependencies: ['Periodo:7'], period: 8, cht: 45, x: 70, y: 31, type: 'optional', groupId: '[1138]' },
            { id: 'ELT7EL', name: 'CONTROLE CLÁSSICO E PREDITIVO', dependencies: ['Periodo:7'], period: 8, cht: 60, x: 85, y: 31, type: 'optional', groupId: '[1138]' },
            { id: 'ELT7EM', name: 'CONTROLE ÓTIMO', dependencies: ['Periodo:7'], period: 8, cht: 45, x: 25, y: 37, type: 'optional', groupId: '[1138]' },
            { id: 'ELT7EN', name: 'INTRODUÇÃO À LÓGICA PARACONSISTENTE', dependencies: ['Periodo:7'], period: 8, cht: 60, x: 45, y: 37, type: 'optional', groupId: '[1138]' },
            { id: 'ELT7EO', name: 'INTRODUÇÃO À OTIMIZAÇÃO PARA ENGENHARIA', dependencies: ['Periodo:7'], period: 8, cht: 45, x: 65, y: 37, type: 'optional', groupId: '[1138]' },
            { id: 'ELT7EP', name: 'CONTROLE DE ROBÔS', dependencies: ['Periodo:7'], period: 8, cht: 45, x: 85, y: 37, type: 'optional', groupId: '[1138]' },

            // --- Trilha [1148]: Manutenção Industrial ---
            { id: 'ELT7DA', name: 'TÉCNICAS PREDITIVAS', dependencies: ['Periodo:7'], period: 8, cht: 45, x: 10, y: 46, type: 'optional', groupId: '[1148]' },
            { id: 'ELT7DB', name: 'PLANEJAMENTO E CONTROLE DA MANUTENÇÃO', dependencies: ['Periodo:7'], period: 8, cht: 45, x: 25, y: 46, type: 'optional', groupId: '[1148]' },
            { id: 'ELT7DC', name: 'OTIMIZAÇÃO DA CONFIABILIDADE DE SISTEMAS', dependencies: ['Periodo:7'], period: 8, cht: 45, x: 40, y: 46, type: 'optional', groupId: '[1148]' },
            { id: 'ELT7DH', name: 'MANUTENÇÃO DE SISTEMAS AUTOMATIZADOS', dependencies: ['Periodo:7'], period: 8, cht: 75, x: 55, y: 46, type: 'optional', groupId: '[1148]' },
            { id: 'ELT7DJ', name: 'SUPERVISÃO DE PROCESSOS', dependencies: ['Periodo:7'], period: 8, cht: 60, x: 70, y: 46, type: 'optional', groupId: '[1148]' },
            { id: 'ELT7DD', name: 'CUSTO DO CICLO DE VIDA DE EQUIPAMENTOS', dependencies: ['Periodo:7'], period: 8, cht: 45, x: 10, y: 52, type: 'optional', groupId: '[1148]' },
            { id: 'ELT7DE', name: 'ENGENHARIA DE MANUTENÇÃO', dependencies: ['Periodo:7'], period: 8, cht: 45, x: 25, y: 52, type: 'optional', groupId: '[1148]' },
            { id: 'ELT7DF', name: 'CONFIABILIDADE, MANTENABILIDADE E DISPONIBILIDADE DE SISTEMAS', dependencies: ['Periodo:7'], period: 8, cht: 45, x: 40, y: 52, type: 'optional', groupId: '[1148]' },
            { id: 'ELT7DG', name: 'ANÁLISE E GERENCIAMENTO DE RISCOS', dependencies: ['Periodo:7'], period: 8, cht: 45, x: 55, y: 52, type: 'optional', groupId: '[1148]' },
            { id: 'ELT7DI', name: 'TÉCNICAS PARA ANÁLISE DE FALHAS', dependencies: ['Periodo:7'], period: 8, cht: 45, x: 70, y: 52, type: 'optional', groupId: '[1148]' },

            // --- Trilha [1149]: Projetos Eletrônicos e de Máquinas ---
            { id: 'ELT7FA', name: 'INVERSORES E RETIFICADORES PWM TRIFÁSICOS', dependencies: ['Periodo:7'], period: 8, cht: 60, x: 10, y: 58, type: 'optional', groupId: '[1149]' },
            { id: 'ELT7FE', name: 'LÓGICA RECONFIGURÁVEL', dependencies: ['Periodo:7'], period: 8, cht: 60, x: 25, y: 58, type: 'optional', groupId: '[1149]' },
            { id: 'ELT7FF', name: 'CONVERSORES CC-CA PWM', dependencies: ['Periodo:7'], period: 8, cht: 60, x: 40, y: 58, type: 'optional', groupId: '[1149]' },
            { id: 'ELT7FH', name: 'COMPATIBILIDADE ELETROMAGNÉTICA', dependencies: ['Periodo:7'], period: 8, cht: 45, x: 55, y: 58, type: 'optional', groupId: '[1149]' },
            { id: 'ELT7FL', name: 'ESTUDO DE MÁQUINAS ELÉTRICAS 1', dependencies: ['Periodo:7'], period: 8, cht: 60, x: 70, y: 58, type: 'optional', groupId: '[1149]' },
            { id: 'ELT77G', name: 'NOÇÕES DE TELECOMUNICAÇÕES', dependencies: ['Periodo:7'], period: 8, cht: 60, x: 85, y: 58, type: 'optional', groupId: '[1149]' },
            { id: 'ELT7FB', name: 'ELEMENTOS DE PROCESSAMENTO DE ÁUDIO', dependencies: ['Periodo:7'], period: 8, cht: 45, x: 20, y: 64, type: 'optional', groupId: '[1149]' },
            { id: 'ELT7FC', name: 'TÓPICOS ESPECIAIS EM PROCESSAMENTO ELETRÔNICO DE ENERGIA EM FONTES RENOVÁVEIS', dependencies: ['Periodo:7'], period: 8, cht: 60, x: 35, y: 64, type: 'optional', groupId: '[1149]' },
            { id: 'ELT7FD', name: 'PROJETO DE RETIFICADORES COM CORREÇÃO DE FATOR DE POTÊNCIA', dependencies: ['Periodo:7'], period: 8, cht: 60, x: 50, y: 64, type: 'optional', groupId: '[1149]' },
            { id: 'ELT7FG', name: 'PROJETO DE CONVERSORES ESTÁTICOS ISOLADOS EM ALTA FREQUÊNCIA E FONTES CHAVEADAS', dependencies: ['Periodo:7'], period: 8, cht: 60, x: 65, y: 64, type: 'optional', groupId: '[1149]' },
            { id: 'ELT7FI', name: 'TÓPICOS ESPECIAIS EM ELETRÔNICA DE POTÊNCIA', dependencies: ['Periodo:7'], period: 8, cht: 60, x: 80, y: 64, type: 'optional', groupId: '[1149]' },
            { id: 'ELT7FJ', name: 'SIMULAÇÃO DE DISPOSITIVOS ELETROMAGNÉTICOS POR ELEMENTOS FINITOS', dependencies: ['Periodo:7'], period: 8, cht: 60, x: 30, y: 70, type: 'optional', groupId: '[1149]' },
            { id: 'ELT7FK', name: 'PROJETO DE GERADORES SÍNCRONOS', dependencies: ['Periodo:7'], period: 8, cht: 45, x: 45, y: 70, type: 'optional', groupId: '[1149]' },
            { id: 'ELT7FM', name: 'ESTUDO DE MÁQUINAS ELÉTRICAS 2', dependencies: ['Periodo:7'], period: 8, cht: 60, x: 60, y: 70, type: 'optional', groupId: '[1149]' },

            // --- Trilha [1147]: Energia e Sustentabilidade ---
            { id: 'ELT7BA', name: 'PLANEJAMENTO DA OPERAÇÃO DE SISTEMAS DE POTÊNCIA', dependencies: ['Periodo:7'], period: 8, cht: 45, x: 10, y: 76, type: 'optional', groupId: '[1147]' },
            { id: 'ELT7BB', name: 'TRANSITÓRIOS ELETROMAGNÉTICOS EM SISTEMAS ELÉTRICOS DE POTÊNCIA', dependencies: ['Periodo:7'], period: 8, cht: 45, x: 25, y: 76, type: 'optional', groupId: '[1147]' },
            { id: 'ELT7BC', name: 'ANÁLISE DE SISTEMAS ELÉTRICOS DE POTÊNCIA ASSISTIDA POR COMPUTADOR', dependencies: ['Periodo:8'], period: 8, cht: 45, x: 40, y: 76, type: 'optional', groupId: '[1147]' },
            { id: 'ELT7BD', name: 'GERAÇÃO DE ENERGIA ELÉTRICA', dependencies: ['Periodo:7'], period: 8, cht: 45, x: 55, y: 76, type: 'optional', groupId: '[1147]' },
            { id: 'ELT7BE', name: 'PROTEÇÃO DE SISTEMAS DE DISTRIBUIÇÃO', dependencies: ['Periodo:7'], period: 8, cht: 45, x: 70, y: 76, type: 'optional', groupId: '[1147]' },
            { id: 'ELT7BF', name: 'ESTUDO DE PROTEÇÃO PARA SISTEMAS ELÉTRICOS DE POTÊNCIA E VALIDAÇÃO PRÁTICA', dependencies: ['Periodo:7'], period: 8, cht: 90, x: 85, y: 76, type: 'optional', groupId: '[1147]' },
            { id: 'ELT7BG', name: 'COMUNICAÇÃO EM SUBESTAÇÕES DE ENERGIA', dependencies: ['Periodo:7'], period: 8, cht: 45, x: 15, y: 82, type: 'optional', groupId: '[1147]' },
            { id: 'ELT7BH', name: 'LINHAS DE TRANSMISSÃO DE ENERGIA ELÉTRICA', dependencies: ['Periodo:7'], period: 8, cht: 45, x: 30, y: 82, type: 'optional', groupId: '[1147]' },
            { id: 'ELT7BI', name: 'ANÁLISE DE REDES DE DISTRIBUIÇÃO', dependencies: ['Periodo:7'], period: 8, cht: 45, x: 45, y: 82, type: 'optional', groupId: '[1147]' },
            { id: 'ELT7BJ', name: 'ESTABILIDADE TRANSITÓRIA EM SISTEMAS ELÉTRICOS DE POTÊNCIA', dependencies: ['Periodo:7'], period: 8, cht: 45, x: 60, y: 82, type: 'optional', groupId: '[1147]' },
            { id: 'ELT7BK', name: 'CONTROLE DE TENSÃO E FREQUÊNCIA EM SISTEMAS ELÉTRICOS DE POTÊNCIA', dependencies: ['Periodo:7'], period: 8, cht: 45, x: 75, y: 82, type: 'optional', groupId: '[1147]' },
            { id: 'ELT7BL', name: 'COMERCIALIZAÇÃO DE ENERGIA ELÉTRICA', dependencies: ['Periodo:7'], period: 8, cht: 45, x: 90, y: 82, type: 'optional', groupId: '[1147]' },
            { id: 'ELT7BM', name: 'PLANEJAMENTO ENERGÉTICO E SUSTENTABILIDADE', dependencies: ['Periodo:7'], period: 8, cht: 45, x: 25, y: 88, type: 'optional', groupId: '[1147]' },
            { id: 'ELT7BN', name: 'CONTROLE DE CARGA EM SISTEMAS ELÉTRICOS', dependencies: ['Periodo:7'], period: 8, cht: 60, x: 40, y: 88, type: 'optional', groupId: '[1147]' },
            { id: 'ELT7BO', name: 'SUBESTAÇÕES', dependencies: ['Periodo:7'], period: 8, cht: 60, x: 55, y: 88, type: 'optional', groupId: '[1147]' },
            { id: 'ELT7BP', name: 'SMART GRIDS - REDES DE DISTRIBUIÇÃO DE ENERGIA INTELIGENTES', dependencies: ['Periodo:7'], period: 8, cht: 45, x: 70, y: 88, type: 'optional', groupId: '[1147]' },
            { id: 'ELT7BQ', name: 'FUNDAMENTOS DE ENERGIA EÓLICA. MEDIÇÕES E TESES', dependencies: ['Periodo:7'], period: 8, cht: 45, x: 85, y: 88, type: 'optional', groupId: '[1147]' },
            { id: 'ELT7BR', name: 'ENERGIA EÓLICA ONSHORE E OFFSHORE', dependencies: ['Periodo:7'], period: 8, cht: 45, x: 20, y: 94, type: 'optional', groupId: '[1147]' },
            { id: 'ELT7BS', name: 'PROTEÇÃO DE SISTEMAS ELÉTRICOS DE POTÊNCIA', dependencies: ['Periodo:7'], period: 8, cht: 45, x: 35, y: 94, type: 'optional', groupId: '[1147]' },
            { id: 'ELT7BT', name: 'ENERGIAS RENOVÁVEIS NO AGRONEGÓCIO', dependencies: ['Periodo:7'], period: 8, cht: 45, x: 50, y: 94, type: 'optional', groupId: '[1147]' },
            { id: 'ELT76E', name: 'SISTEMAS ELÉTRICOS DE POTÊNCIA 1', dependencies: ['Periodo:7'], period: 8, cht: 90, x: 65, y: 94, type: 'optional', groupId: '[1147]' },
            { id: 'ELT77E', name: 'SISTEMAS ELÉTRICOS DE POTÊNCIA 2', dependencies: ['ELT76E'], period: 8, cht: 60, x: 80, y: 94, type: 'optional', groupId: '[1147]' },

            // --- Trilha [1146]: Instalações e Eficiência Energética ---
            { id: 'ELT7CA', name: 'EFICIÊNCIA ENERGÉTICA EM EDIFICAÇÕES', dependencies: ['Periodo:7'], period: 8, cht: 45, x: 10, y: 100, type: 'optional', groupId: '[1146]' },
            { id: 'ELT7CB', name: 'ENERGIA SOLAR FOTOVOLTAICA I', dependencies: ['Periodo:7'], period: 8, cht: 45, x: 25, y: 100, type: 'optional', groupId: '[1146]' },
            { id: 'ELT7CC', name: 'ENERGIA SOLAR FOTOVOLTAICA II', dependencies: ['Periodo:7'], period: 8, cht: 45, x: 40, y: 100, type: 'optional', groupId: '[1146]' },
            { id: 'ELT7CD', name: 'GERENCIAMENTO DE OBRAS ELÉTRICAS', dependencies: ['Periodo:7'], period: 8, cht: 60, x: 55, y: 100, type: 'optional', groupId: '[1146]' },
            { id: 'ELT7CE', name: 'INSTALAÇÕES ELÉTRICAS INDUSTRIAIS 2', dependencies: ['ELT77B'], period: 8, cht: 45, x: 70, y: 100, type: 'optional', groupId: '[1146]' },
            { id: 'ELT7CF', name: 'INSTALAÇÕES ELÉTRICAS PREDIAIS 2', dependencies: ['ELT76B'], period: 8, cht: 45, x: 85, y: 100, type: 'optional', groupId: '[1146]' },
            { id: 'ELT7CG', name: 'ILUMINAÇÃO ELÉTRICA', dependencies: ['Periodo:7'], period: 8, cht: 60, x: 20, y: 106, type: 'optional', groupId: '[1146]' },
            { id: 'ELT7CH', name: 'GESTÃO DE ENERGIA', dependencies: ['Periodo:7'], period: 8, cht: 45, x: 35, y: 106, type: 'optional', groupId: '[1146]' },
            { id: 'ELT76B', name: 'INSTALAÇÕES ELÉTRICAS PREDIAIS 1', dependencies: ['Periodo:7'], period: 8, cht: 75, x: 50, y: 106, type: 'optional', groupId: '[1146]' },
            { id: 'ELT77B', name: 'INSTALAÇÕES ELÉTRICAS INDUSTRIAIS 1', dependencies: ['ELT76B'], period: 8, cht: 75, x: 65, y: 106, type: 'optional', groupId: '[1146]' }
        ];

export { TOTAL_COMPLEMENTARY_HOURS, TOTAL_EXTENSION_HOURS, TOTAL_HUMANITIES_HOURS, TOTAL_OPTIONAL_HOURS, NODE_WIDTH, NODE_HEIGHT, OPTIONAL_LAYOUT_MIN_X, OPTIONAL_LAYOUT_MAX_X, OPTIONAL_LAYOUT_MIN_Y, OPTIONAL_LAYOUT_MAX_Y, SPECIALIZATION_TRACKS, OPTIONAL_GROUPS_CONFIG, allNodesData, allHumanitiesData, allOptionalNodesData };
