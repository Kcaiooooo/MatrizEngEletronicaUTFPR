const TOTAL_COMPLEMENTARY_HOURS = 0;

const TOTAL_EXTENSION_HOURS = 285;

const TOTAL_HUMANITIES_HOURS = 75;

const TOTAL_MANAGEMENT_HOURS = 30;

const TOTAL_OPTIONAL_HOURS = 45;

const NODE_WIDTH = 130;

const NODE_HEIGHT = 90;

const OPTIONAL_LAYOUT_MIN_X = 14;

const OPTIONAL_LAYOUT_MAX_X = 92;

const OPTIONAL_LAYOUT_MIN_Y = 10;

const OPTIONAL_LAYOUT_MAX_Y = 92;

const SPECIALIZATION_TRACKS = {
            'Automação Industrial': ['ELT7AC', 'ELT8AA', 'ELT8AB', 'ELT8AC', 'ELT8AD']
        };

const OPTIONAL_GROUPS_CONFIG = {
            '[1130]': { requiredHours: 45, name: 'Optativas de Automação' },
            '[1132]': { requiredHours: 75, name: 'Ciclo de Humanidades' },
            '[1133]': { requiredHours: 30, name: 'Gestão' }
        };

const allNodesData = [
            {"id": "ELT81A", "name": "COMUNICAÇÃO ORAL E ESCRITA", "period": 1, "cht": 30, "dependencies": [], "type": "subject", "x": 5.0, "y": 5.0, "groupId": null},
            {"id": "ELT81B", "name": "FENÔMENOS ELETROMAGNÉTICOS", "period": 1, "cht": 90, "dependencies": [], "type": "subject", "x": 20.0, "y": 5.0, "groupId": null},
            {"id": "ELT81C", "name": "INTRODUÇÃO À TECNOLOGIA EM AUTOMAÇÃO", "period": 1, "cht": 60, "dependencies": [], "type": "subject", "x": 35.0, "y": 5.0, "groupId": null},
            {"id": "ELT81D", "name": "DESENHO TÉCNICO", "period": 1, "cht": 45, "dependencies": [], "type": "subject", "x": 50.0, "y": 5.0, "groupId": null},
            {"id": "INF71A", "name": "COMPUTAÇÃO 1", "period": 1, "cht": 60, "dependencies": [], "type": "subject", "x": 65.0, "y": 5.0, "groupId": null},
            {"id": "MAT7T1", "name": "TÓPICOS MATEMÁTICOS 1", "period": 1, "cht": 90, "dependencies": [], "type": "subject", "x": 80.0, "y": 5.0, "groupId": null},

            {"id": "ELT82A", "name": "FUNDAMENTOS DE GESTÃO DE PROJETOS", "period": 2, "cht": 45, "dependencies": [], "type": "subject", "x": 5.0, "y": 22.0, "groupId": null},
            {"id": "ELT82B", "name": "ANÁLISE DE CIRCUITOS", "period": 2, "cht": 75, "dependencies": [], "type": "subject", "x": 20.0, "y": 22.0, "groupId": null},
            {"id": "ELT82C", "name": "INSTALAÇÕES ELÉTRICAS", "period": 2, "cht": 75, "dependencies": [], "type": "subject", "x": 35.0, "y": 22.0, "groupId": null},
            {"id": "ELT82E", "name": "ELETRÔNICA ANALÓGICA", "period": 2, "cht": 75, "dependencies": [], "type": "subject", "x": 50.0, "y": 22.0, "groupId": null},
            {"id": "ELT82F", "name": "ELETRÔNICA DIGITAL", "period": 2, "cht": 75, "dependencies": [], "type": "subject", "x": 65.0, "y": 22.0, "groupId": null},
            {"id": "EST70A", "name": "INTRODUÇÃO À ESTATÍSTICA", "period": 2, "cht": 60, "dependencies": [], "type": "subject", "x": 80.0, "y": 22.0, "groupId": null, "alternative": {"id": "EST70C", "cht": 60}},

            {"id": "ELT80A", "name": "ESTÁGIO OBRIGATÓRIO", "period": 3, "cht": 360, "dependencies": [], "type": "subject", "x": 5.0, "y": 39.0, "groupId": null},
            {"id": "ELT83A", "name": "SEGURANÇA E LEGISLAÇÃO PROFISSIONAL", "period": 3, "cht": 60, "dependencies": [], "type": "subject", "x": 18.0, "y": 39.0, "groupId": null},
            {"id": "ELT83B", "name": "SISTEMAS MICROCONTROLADOS", "period": 3, "cht": 60, "dependencies": [], "type": "subject", "x": 31.0, "y": 39.0, "groupId": null},
            {"id": "ELT83C", "name": "SISTEMAS ELETROMAGNÉTICOS", "period": 3, "cht": 60, "dependencies": [], "type": "subject", "x": 44.0, "y": 39.0, "groupId": null},
            {"id": "ELT83D", "name": "EFICIÊNCIA ENERGÉTICA", "period": 3, "cht": 45, "dependencies": [], "type": "subject", "x": 57.0, "y": 39.0, "groupId": null},
            {"id": "ELT83F", "name": "OFICINA DE INTEGRAÇÃO E EXTENSÃO 1", "period": 3, "cht": 105, "dependencies": ["ELT82F"], "type": "subject", "x": 70.0, "y": 39.0, "groupId": null},
            {"id": "GEE7G3", "name": "FUNDAMENTOS DE GESTÃO DA PRODUÇÃO", "period": 3, "cht": 45, "dependencies": [], "type": "subject", "x": 83.0, "y": 39.0, "groupId": null},

            {"id": "ELT84A", "name": "INTRODUÇÃO À INTELIGÊNCIA ARTIFICIAL", "period": 4, "cht": 45, "dependencies": [], "type": "subject", "x": 5.0, "y": 56.0, "groupId": null},
            {"id": "ELT84B", "name": "CONTROLADORES LÓGICOS PROGRAMÁVEIS", "period": 4, "cht": 60, "dependencies": ["ELT83C"], "type": "subject", "x": 20.0, "y": 56.0, "groupId": null},
            {"id": "ELT84C", "name": "SISTEMAS PNEUMÁTICOS E HIDRÁULICOS", "period": 4, "cht": 60, "dependencies": ["ELT83C"], "type": "subject", "x": 35.0, "y": 56.0, "groupId": null},
            {"id": "ELT84D", "name": "MÁQUINAS ELÉTRICAS", "period": 4, "cht": 75, "dependencies": [], "type": "subject", "x": 50.0, "y": 56.0, "groupId": null},
            {"id": "ELT84E", "name": "MANUTENÇÃO DE SISTEMAS ELETRÔNICOS", "period": 4, "cht": 75, "dependencies": ["ELT82E"], "type": "subject", "x": 65.0, "y": 56.0, "groupId": null},
            {"id": "ELT84F", "name": "GERÊNCIA DE MANUTENÇÃO", "period": 4, "cht": 45, "dependencies": [], "type": "subject", "x": 80.0, "y": 56.0, "groupId": null},

            {"id": "ELT85A", "name": "MANUTENÇÃO DE SISTEMAS AUTOMATIZADOS", "period": 5, "cht": 75, "dependencies": [], "type": "subject", "x": 5.0, "y": 73.0, "groupId": null},
            {"id": "ELT85B", "name": "INTERNET DAS COISAS INDUSTRIAL (IIoT)", "period": 5, "cht": 60, "dependencies": [], "type": "subject", "x": 20.0, "y": 73.0, "groupId": null},
            {"id": "ELT85C", "name": "REDES INDUSTRIAIS APLICADAS", "period": 5, "cht": 45, "dependencies": ["ELT84B"], "type": "subject", "x": 35.0, "y": 73.0, "groupId": null},
            {"id": "ELT85D", "name": "ACIONAMENTO ELETRÔNICO DE MÁQUINAS", "period": 5, "cht": 60, "dependencies": ["ELT84D"], "type": "subject", "x": 50.0, "y": 73.0, "groupId": null},
            {"id": "ELT85E", "name": "INSTRUMENTAÇÃO INDUSTRIAL", "period": 5, "cht": 60, "dependencies": ["ELT82E"], "type": "subject", "x": 65.0, "y": 73.0, "groupId": null},
            {"id": "ELT85F", "name": "OFICINA DE INTEGRAÇÃO E EXTENSÃO 2", "period": 5, "cht": 90, "dependencies": ["ELT83F"], "type": "subject", "x": 80.0, "y": 73.0, "groupId": null},

            {"id": "ELT86A", "name": "SISTEMAS A EVENTOS DISCRETOS", "period": 6, "cht": 45, "dependencies": [], "type": "subject", "x": 5.0, "y": 90.0, "groupId": null},
            {"id": "ELT86B", "name": "ROBÓTICA APLICADA E SERVOMECANISMOS", "period": 6, "cht": 75, "dependencies": [], "type": "subject", "x": 20.0, "y": 90.0, "groupId": null},
            {"id": "ELT86C", "name": "SUPERVISÃO DE PROCESSOS", "period": 6, "cht": 60, "dependencies": [], "type": "subject", "x": 35.0, "y": 90.0, "groupId": null},
            {"id": "ELT86D", "name": "CONTROLE DE PROCESSOS", "period": 6, "cht": 75, "dependencies": [], "type": "subject", "x": 50.0, "y": 90.0, "groupId": null},
            {"id": "ELT86F", "name": "OFICINA DE INTEGRAÇÃO E EXTENSÃO 3", "period": 6, "cht": 90, "dependencies": [], "type": "subject", "x": 65.0, "y": 90.0, "groupId": null},
            {"id": "GEE7E1", "name": "FUNDAMENTOS DE EMPREENDEDORISMO", "period": 6, "cht": 30, "dependencies": [], "type": "subject", "x": 80.0, "y": 90.0, "groupId": null},
        ];

const allHumanitiesData = [
            {"id": "EDU70J", "name": "LIBRAS", "period": 2, "cht": 45, "dependencies": [], "type": "humanities", "x": 10.0, "y": 5.0, "groupId": "[1132]"},
            {"id": "FCH7FB", "name": "FUNDAMENTOS DA ÉTICA", "period": 2, "cht": 45, "dependencies": [], "type": "humanities", "x": 30.0, "y": 5.0, "groupId": "[1132]"},
            {"id": "FCH7PA", "name": "PSICOLOGIA DO TRABALHO", "period": 2, "cht": 30, "dependencies": [], "type": "humanities", "x": 50.0, "y": 5.0, "groupId": "[1132]"},
            {"id": "FCH7PC", "name": "PLANEJAMENTO DE CARREIRA", "period": 2, "cht": 60, "dependencies": [], "type": "humanities", "x": 70.0, "y": 5.0, "groupId": "[1132]"},
            {"id": "FCH7SB", "name": "TECNOLOGIA E SOCIEDADE", "period": 2, "cht": 45, "dependencies": [], "type": "humanities", "x": 90.0, "y": 5.0, "groupId": "[1132]"},
            {"id": "FCH7SC", "name": "TECNOLOGIA, TRABALHO E SAÚDE", "period": 2, "cht": 45, "dependencies": [], "type": "humanities", "x": 10.0, "y": 14.0, "groupId": "[1132]"},
            {"id": "FCH7XB", "name": "PRESENÇA AFRICANA NO BRASIL: TECNOLOGIA, TRABALHO E CULTURA", "period": 2, "cht": 45, "dependencies": [], "type": "humanities", "x": 30.0, "y": 14.0, "groupId": "[1132]"},
            {"id": "FCH7XD", "name": "DIREITOS HUMANOS, SEGURANÇA E DIVERSIDADE", "period": 2, "cht": 45, "dependencies": [], "type": "humanities", "x": 50.0, "y": 14.0, "groupId": "[1132]"},
            {"id": "FCH7XF", "name": "DIMENSÃO AMBIENTAL NA GESTÃO URBANA", "period": 2, "cht": 45, "dependencies": [], "type": "humanities", "x": 70.0, "y": 14.0, "groupId": "[1132]"},
            {"id": "ELT8BA", "name": "PRODUÇÃO SUSTENTÁVEL", "period": 2, "cht": 45, "dependencies": [], "type": "humanities", "x": 20.0, "y": 24.0, "groupId": "[1133]"},
            {"id": "GEE7M1", "name": "FUNDAMENTOS DE MARKETING", "period": 2, "cht": 45, "dependencies": [], "type": "humanities", "x": 50.0, "y": 24.0, "groupId": "[1133]"},
            {"id": "QBI7CA", "name": "CIÊNCIAS DO AMBIENTE", "period": 2, "cht": 30, "dependencies": [], "type": "humanities", "x": 80.0, "y": 24.0, "groupId": "[1133]"},
        ];

const allOptionalNodesData = [
            {"id": "ELT7AC", "name": "PROJETOS DE QUADROS ELÉTRICOS DE AUTOMAÇÃO", "period": 4, "cht": 60, "dependencies": [], "type": "optional", "x": 15.0, "y": 10.0, "groupId": "[1130]"},
            {"id": "ELT8AA", "name": "ROBÓTICA PEDAGÓGICA NA EDUCAÇÃO BÁSICA", "period": 4, "cht": 45, "dependencies": [], "type": "optional", "x": 50.0, "y": 10.0, "groupId": "[1130]"},
            {"id": "ELT8AB", "name": "SENSORES INTELIGENTES", "period": 4, "cht": 45, "dependencies": [], "type": "optional", "x": 85.0, "y": 10.0, "groupId": "[1130]"},
            {"id": "ELT8AC", "name": "CONTROLADORES LÓGICOS PROGRAMÁVEIS 2", "period": 4, "cht": 60, "dependencies": ["ELT84B"], "type": "optional", "x": 30.0, "y": 25.0, "groupId": "[1130]"},
            {"id": "ELT8AD", "name": "REDES INDUSTRIAIS", "period": 4, "cht": 60, "dependencies": [], "type": "optional", "x": 70.0, "y": 25.0, "groupId": "[1130]"},
        ];

export { TOTAL_COMPLEMENTARY_HOURS, TOTAL_EXTENSION_HOURS, TOTAL_HUMANITIES_HOURS, TOTAL_MANAGEMENT_HOURS, TOTAL_OPTIONAL_HOURS, NODE_WIDTH, NODE_HEIGHT, OPTIONAL_LAYOUT_MIN_X, OPTIONAL_LAYOUT_MAX_X, OPTIONAL_LAYOUT_MIN_Y, OPTIONAL_LAYOUT_MAX_Y, SPECIALIZATION_TRACKS, OPTIONAL_GROUPS_CONFIG, allNodesData, allHumanitiesData, allOptionalNodesData };
