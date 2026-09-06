const TOTAL_COMPLEMENTARY_HOURS = 30;

const TOTAL_EXTENSION_HOURS = 450;

const TOTAL_HUMANITIES_HOURS = 30;

const TOTAL_OPTIONAL_HOURS = 180;

const NODE_WIDTH = 130;

const NODE_HEIGHT = 90;

const OPTIONAL_LAYOUT_MIN_X = 14;

const OPTIONAL_LAYOUT_MAX_X = 92;

const OPTIONAL_LAYOUT_MIN_Y = 10;

const OPTIONAL_LAYOUT_MAX_Y = 92;

const SPECIALIZATION_TRACKS = {
            'Tecnologia da Construção': ['COC7AA', 'COC7AB', 'COC7AC', 'COC7AG', 'COC7AH', 'COC7AI', 'COC7AJ', 'COC7AK', 'COC7AM', 'COC7AN'],
            'Estruturas': ['COC7AD', 'COC7BA', 'COC7BB', 'COC7BC', 'COC7BD', 'COC7BF', 'COC7BG', 'COC7BH'],
            'Gestão e Avaliação': ['COC7AE', 'COC7AF', 'COC7AL', 'COC7CA'],
            'Hidráulica e Saneamento': ['COC7BE', 'COC7CB', 'COC7CC', 'COC7CD', 'COC7CE', 'COC7CF'],
            'Geotecnia e Transportes': ['COC7DA', 'COC7DB', 'COC7DC', 'COC7EA', 'COC7EB']
        };

const OPTIONAL_GROUPS_CONFIG = {
            '[1097]': { requiredHours: 30, name: 'Optativas Humanidades' },
            '[1098]': { requiredHours: 180, name: 'Optativas Específicas' }
        };

const allNodesData = [
            {
                        "id": "COC71C",
                        "name": "CIÊNCIAS DOS MATERIAIS APLICADA À ENGENHARIA CIVIL",
                        "dependencies": [],
                        "cht": 60,
                        "type": "subject",
                        "y": 5.0,
                        "period": 1,
                        "x": 5.5
            },
            {
                        "id": "COC71D",
                        "name": "EXPRESSÃO GRÁFICA",
                        "dependencies": [],
                        "cht": 45,
                        "type": "subject",
                        "y": 5.0,
                        "period": 1,
                        "x": 18.2
            },
            {
                        "id": "COC71F",
                        "name": "MODELAGEM DA INFORMAÇÃO DA CONSTRUÇÃO",
                        "dependencies": [],
                        "cht": 30,
                        "type": "subject",
                        "y": 5.0,
                        "period": 1,
                        "x": 30.9
            },
            {
                        "id": "COC71G",
                        "name": "INTRODUÇÃO À ENGENHARIA CIVIL",
                        "dependencies": [],
                        "cht": 60,
                        "type": "subject",
                        "y": 5.0,
                        "period": 1,
                        "x": 43.6
            },
            {
                        "id": "COE70A",
                        "name": "COMUNICAÇÃO ORAL E ESCRITA",
                        "dependencies": [],
                        "cht": 30,
                        "type": "subject",
                        "y": 5.0,
                        "period": 1,
                        "x": 56.4
            },
            {
                        "id": "INF71A",
                        "name": "COMPUTAÇÃO 1",
                        "dependencies": [],
                        "cht": 60,
                        "type": "subject",
                        "y": 5.0,
                        "period": 1,
                        "x": 69.1
            },
            {
                        "id": "MAT7C1",
                        "equivalents": [{"id": "MECP71B", "cht": 90}],
                        "name": "CÁLCULO DIFERENCIAL E INTEGRAL 1",
                        "dependencies": [],
                        "cht": 90,
                        "type": "subject",
                        "y": 5.0,
                        "period": 1,
                        "x": 81.8
            },
            {
                        "id": "MAT7GA",
                        "equivalents": [{"id": "MECP71A", "cht": 60}],
                        "name": "GEOMETRIA ANALÍTICA",
                        "dependencies": [],
                        "cht": 60,
                        "type": "subject",
                        "y": 5.0,
                        "period": 1,
                        "x": 94.5
            },
            {
                        "id": "COC70B",
                        "name": "ATIVIDADES COMPLEMENTARES",
                        "dependencies": [],
                        "cht": 30,
                        "type": "subject",
                        "y": 15.0,
                        "period": 2,
                        "x": 5.5
            },
            {
                        "id": "COC72C",
                                                "name": "MATERIAIS DE CONSTRUÇÃO CIVIL 1",
                        "dependencies": [
                                    "COC71C"
                        ],
                        "cht": 90,
                        "type": "subject",
                        "y": 15.0,
                        "period": 2,
                        "x": 20.3
            },
            {
                        "id": "COC72D",
                        "name": "PROJETO ARQUITETÔNICO",
                        "dependencies": [
                                    "COC71D",
                                    "COC71F"
                        ],
                        "cht": 60,
                        "type": "subject",
                        "y": 15.0,
                        "period": 2,
                        "x": 35.2
            },
            {
                        "id": "COC72F",
                        "name": "TOPOGRAFIA",
                        "dependencies": [],
                        "cht": 60,
                        "type": "subject",
                        "y": 15.0,
                        "period": 2,
                        "x": 50.0
            },
            {
                        "id": "FIS7F1",
                        "equivalents": [{"id": "MECP72C", "cht": 60}],
                        "name": "FÍSICA TEÓRICA 1",
                        "dependencies": [],
                        "cht": 60,
                        "type": "subject",
                        "y": 15.0,
                        "period": 2,
                        "x": 64.8
            },
            {
                        "id": "MAT7AL",
                        "equivalents": [{"id": "MECP72A", "cht": 60}],
                        "name": "ÁLGEBRA LINEAR",
                        "dependencies": [
                                    "MAT7GA"
                        ],
                        "cht": 60,
                        "type": "subject",
                        "y": 15.0,
                        "period": 2,
                        "x": 79.7
            },
            {
                        "id": "MAT7C2",
                        "equivalents": [{"id": "MECP72B", "cht": 90}],
                        "name": "CÁLCULO DIFERENCIAL E INTEGRAL 2",
                        "dependencies": [
                                    "MAT7C1",
                                    "MAT7GA"
                        ],
                        "cht": 90,
                        "type": "subject",
                        "y": 15.0,
                        "period": 2,
                        "x": 94.5
            },
            {
                        "id": "COC73C",
                                                "name": "ARGAMASSAS E CONCRETOS",
                        "dependencies": [
                                    "COC71C"
                        ],
                        "cht": 90,
                        "type": "subject",
                        "y": 25.0,
                        "period": 3,
                        "x": 5.5
            },
            {
                        "id": "COC73F",
                                                "name": "ESTÁTICA",
                        "dependencies": [
                                    "FIS7F1"
                        ],
                        "cht": 60,
                        "type": "subject",
                        "y": 25.0,
                        "period": 3,
                        "x": 20.3
            },
            {
                        "id": "COC73G",
                        "name": "ENGENHARIA DE SEGURANÇA DO TRABALHO",
                        "dependencies": [],
                        "cht": 60,
                        "type": "subject",
                        "y": 25.0,
                        "period": 3,
                        "x": 35.2
            },
            {
                        "id": "EST70C",
                        "equivalents": [{"id": "EST70A", "cht": 60}],
                        "name": "INTRODUÇÃO À ESTATÍSTICA",
                        "dependencies": [],
                        "cht": 60,
                        "type": "subject",
                        "y": 25.0,
                        "period": 3,
                        "x": 50.0
            },
            {
                        "id": "FIS7E1",
                        "equivalents": [{"id": "MECP73B", "cht": 30}],
                        "name": "FÍSICA EXPERIMENTAL 1",
                        "dependencies": [
                                    "FIS7F1"
                        ],
                        "cht": 30,
                        "type": "subject",
                        "y": 25.0,
                        "period": 3,
                        "x": 64.8
            },
            {
                        "id": "FIS7F2",
                        "equivalents": [{"id": "MECP73A", "cht": 60}],
                        "name": "FÍSICA TEÓRICA 2",
                        "dependencies": [
                                    "FIS7F1"
                        ],
                        "cht": 60,
                        "type": "subject",
                        "y": 25.0,
                        "period": 3,
                        "x": 79.7
            },
            {
                        "id": "MAT7ED",
                        "name": "EQUAÇÕES DIFERENCIAIS ORDINÁRIAS",
                        "dependencies": [
                                    "MAT7AL",
                                    "MAT7C1"
                        ],
                        "cht": 60,
                        "type": "subject",
                        "y": 25.0,
                        "period": 3,
                        "x": 94.5
            },
            {
                        "id": "COC74B",
                        "name": "HIDROLOGIA",
                        "dependencies": [
                                    "COC72F",
                                    "EST70C"
                        ],
                        "cht": 60,
                        "type": "subject",
                        "y": 35.0,
                        "period": 4,
                        "x": 5.5
            },
            {
                        "id": "COC74C",
                        "name": "TECNOLOGIAS CONSTRUTIVAS 1",
                        "dependencies": [
                                    "COC72C",
                                    "COC73C"
                        ],
                        "cht": 60,
                        "type": "subject",
                        "y": 35.0,
                        "period": 4,
                        "x": 20.3
            },
            {
                        "id": "COC74E",
                        "name": "MECÂNICA DOS FLUÍDOS E TRANSFERÊNCIA DE CALOR",
                        "dependencies": [
                                    "COC73F"
                        ],
                        "cht": 75,
                        "type": "subject",
                        "y": 35.0,
                        "period": 4,
                        "x": 35.2
            },
            {
                        "id": "COC74F",
                        "name": "RESISTÊNCIA DOS MATERIAIS 1",
                        "dependencies": [
                                    "COC73F"
                        ],
                        "cht": 60,
                        "type": "subject",
                        "y": 35.0,
                        "period": 4,
                        "x": 50.0
            },
            {
                        "id": "COC74G",
                        "name": "GEOLOGIA APLICADA À ENGENHARIA",
                        "dependencies": [],
                        "cht": 60,
                        "type": "subject",
                        "y": 35.0,
                        "period": 4,
                        "x": 64.8
            },
            {
                        "id": "FIS7F3",
                        "name": "FÍSICA TEÓRICA 3",
                        "dependencies": [
                                    "FIS7F2",
                                    "MAT7C1"
                        ],
                        "cht": 60,
                        "type": "subject",
                        "y": 35.0,
                        "period": 4,
                        "x": 79.7
            },
            {
                        "id": "GEE7A1",
                        "name": "FUNDAMENTOS DE ADMINISTRAÇÃO",
                        "dependencies": [],
                        "cht": 45,
                        "type": "subject",
                        "y": 35.0,
                        "period": 4,
                        "x": 94.5
            },
            {
                        "id": "COC75B",
                        "name": "MÉTODOS NUMÉRICOS APLICADOS À ENGENHARIA CIVIL",
                        "dependencies": [
                                    "INF71A",
                                    "MAT7ED"
                        ],
                        "cht": 60,
                        "type": "subject",
                        "y": 45.0,
                        "period": 5,
                        "x": 5.5
            },
            {
                        "id": "COC75C",
                        "name": "LOGÍSTICA NA CONSTRUÇÃO",
                        "dependencies": [
                                    "COC74C"
                        ],
                        "cht": 60,
                        "type": "subject",
                        "y": 45.0,
                        "period": 5,
                        "x": 20.3
            },
            {
                        "id": "COC75D",
                        "name": "INSTALAÇÕES ELÉTRICAS PREDIAIS",
                        "dependencies": [
                                    "COC72D",
                                    "FIS7F3"
                        ],
                        "cht": 60,
                        "type": "subject",
                        "y": 45.0,
                        "period": 5,
                        "x": 35.2
            },
            {
                        "id": "COC75E",
                        "name": "HIDRÁULICA",
                        "dependencies": [
                                    "COC74E"
                        ],
                        "cht": 60,
                        "type": "subject",
                        "y": 45.0,
                        "period": 5,
                        "x": 50.0
            },
            {
                        "id": "COC75F",
                        "name": "RESISTÊNCIA DOS MATERIAIS 2",
                        "dependencies": [
                                    "COC74F"
                        ],
                        "cht": 60,
                        "type": "subject",
                        "y": 45.0,
                        "period": 5,
                        "x": 64.8
            },
            {
                        "id": "COC75G",
                        "name": "MECÂNICA DOS SOLOS",
                        "dependencies": [
                                    "COC74G"
                        ],
                        "cht": 90,
                        "type": "subject",
                        "y": 45.0,
                        "period": 5,
                        "x": 79.7
            },
            {
                        "id": "GEE7E5",
                        "name": "FUNDAMENTOS DE ENGENHARIA ECONÔMICA E ANÁLISE DE VIABILIDADE",
                        "dependencies": [],
                        "cht": 60,
                        "type": "subject",
                        "y": 45.0,
                        "period": 5,
                        "x": 94.5
            },
            {
                        "id": "COC76A",
                        "name": "AÇÕES E SEGURANÇA DAS ESTRUTURAS",
                        "dependencies": [
                                    "COC74F"
                        ],
                        "cht": 30,
                        "type": "subject",
                        "y": 55.0,
                        "period": 6,
                        "x": 5.5
            },
            {
                        "id": "COC76B",
                        "name": "INSTALAÇÕES HIDROSSANITÁRIAS",
                        "dependencies": [
                                    "COC75E"
                        ],
                        "cht": 60,
                        "type": "subject",
                        "y": 55.0,
                        "period": 6,
                        "x": 18.2
            },
            {
                        "id": "COC76C",
                        "name": "TECNOLOGIAS CONSTRUTIVAS 2",
                        "dependencies": [
                                    "COC74C"
                        ],
                        "cht": 60,
                        "type": "subject",
                        "y": 55.0,
                        "period": 6,
                        "x": 30.9
            },
            {
                        "id": "COC76D",
                        "name": "QUALIDADE E PRODUTIVIDADE",
                        "dependencies": [
                                    "COC75C"
                        ],
                        "cht": 60,
                        "type": "subject",
                        "y": 55.0,
                        "period": 6,
                        "x": 43.6
            },
            {
                        "id": "COC76E",
                        "name": "SISTEMAS HIDRÁULICOS URBANOS",
                        "dependencies": [
                                    "COC75E"
                        ],
                        "cht": 45,
                        "type": "subject",
                        "y": 55.0,
                        "period": 6,
                        "x": 56.4
            },
            {
                        "id": "COC76F",
                        "name": "ANÁLISE ESTRUTURAL 1",
                        "dependencies": [
                                    "COC75F"
                        ],
                        "cht": 60,
                        "type": "subject",
                        "y": 55.0,
                        "period": 6,
                        "x": 69.1
            },
            {
                        "id": "COC76G",
                        "name": "FUNDAÇÕES",
                        "dependencies": [
                                    "COC75G"
                        ],
                        "cht": 60,
                        "type": "subject",
                        "y": 55.0,
                        "period": 6,
                        "x": 81.8
            },
            {
                        "id": "COC76H",
                        "name": "ENGENHARIA DE TRANSPORTES",
                        "dependencies": [],
                        "cht": 60,
                        "type": "subject",
                        "y": 55.0,
                        "period": 6,
                        "x": 94.5
            },
            {
                        "id": "COC70A",
                        "name": "ESTÁGIO SUPERVISIONADO",
                        "dependencies": [
                        "Periodo:7"
            ],
                        "cht": 360,
                        "type": "subject",
                        "y": 65.0,
                        "period": 7,
                        "x": 5.5
            },
            {
                        "id": "COC77A",
                        "name": "ESTRUTURAS DE CONCRETO ARMADO 1",
                        "dependencies": [
                                    "COC72D",
                                    "COC76A",
                                    "COC76F"
                        ],
                        "cht": 60,
                        "type": "subject",
                        "y": 65.0,
                        "period": 7,
                        "x": 16.6
            },
            {
                        "id": "COC77B",
                        "name": "ESPECIFICAÇÕES E ORÇAMENTOS",
                        "dependencies": [
                                    "COC76C"
                        ],
                        "cht": 60,
                        "type": "subject",
                        "y": 65.0,
                        "period": 7,
                        "x": 27.8
            },
            {
                        "id": "COC77C",
                        "name": "GESTÃO DE PROJETOS",
                        "dependencies": [
                                    "COC76D"
                        ],
                        "cht": 60,
                        "type": "subject",
                        "y": 65.0,
                        "period": 7,
                        "x": 38.9
            },
            {
                        "id": "COC77D",
                        "name": "GESTÃO AMBIENTAL",
                        "dependencies": [],
                        "cht": 45,
                        "type": "subject",
                        "y": 65.0,
                        "period": 7,
                        "x": 50.0
            },
            {
                        "id": "COC77E",
                        "name": "SANEAMENTO",
                        "dependencies": [
                                    "COC76E"
                        ],
                        "cht": 45,
                        "type": "subject",
                        "y": 65.0,
                        "period": 7,
                        "x": 61.1
            },
            {
                        "id": "COC77F",
                        "name": "ANÁLISE ESTRUTURAL 2",
                        "dependencies": [
                                    "COC76F"
                        ],
                        "cht": 60,
                        "type": "subject",
                        "y": 65.0,
                        "period": 7,
                        "x": 72.2
            },
            {
                        "id": "COC77G",
                        "name": "FUNDAMENTOS JURÍDICOS APLICADOS À ENGENHARIA CIVIL",
                        "dependencies": [],
                        "cht": 30,
                        "type": "subject",
                        "y": 65.0,
                        "period": 7,
                        "x": 83.4
            },
            {
                        "id": "GEE7F1",
                        "equivalents": [{"id": "GEE7F2", "cht": 60}],
                        "name": "FUNDAMENTOS DE FINANÇAS",
                        "dependencies": [],
                        "cht": 60,
                        "type": "subject",
                        "y": 65.0,
                        "period": 7,
                        "x": 94.5
            },
            {
                        "id": "COC78A",
                        "name": "ESTRUTURAS DE CONCRETO ARMADO 2",
                        "dependencies": [
                                    "COC77A"
                        ],
                        "cht": 60,
                        "type": "subject",
                        "y": 75.0,
                        "period": 8,
                        "x": 5.5
            },
            {
                        "id": "COC78B",
                        "name": "ESTRUTURA DE AÇO",
                        "dependencies": [
                                    "COC76A",
                                    "COC77F"
                        ],
                        "cht": 60,
                        "type": "subject",
                        "y": 75.0,
                        "period": 8,
                        "x": 35.2
            },
            {
                        "id": "COC78C",
                        "name": "GESTÃO DE RESÍDUOS SÓLIDOS",
                        "dependencies": [
                                    "COC77C",
                                    "COC77D"
                        ],
                        "cht": 45,
                        "type": "subject",
                        "y": 75.0,
                        "period": 8,
                        "x": 64.8
            },
            {
                        "id": "COC78D",
                        "name": "PROJETOS DE RODOVIAS",
                        "dependencies": [
                                    "COC74B",
                                    "COC75G"
                        ],
                        "cht": 60,
                        "type": "subject",
                        "y": 75.0,
                        "period": 8,
                        "x": 94.5
            },
            {
                        "id": "COC79A",
                        "name": "ESTRUTURAS DE MADEIRA",
                        "dependencies": [
                                    "COC76A",
                                    "COC76F"
                        ],
                        "cht": 45,
                        "type": "subject",
                        "y": 85.0,
                        "period": 9,
                        "x": 5.5
            },
            {
                        "id": "COC79B",
                        "name": "OBRAS DE CONSTRUÇÃO PESADA",
                        "dependencies": [
                                    "COC75G"
                        ],
                        "cht": 60,
                        "type": "subject",
                        "y": 85.0,
                        "period": 9,
                        "x": 35.2
            },
            {
                        "id": "COC79C",
                        "name": "GERENCIAMENTO DE OBRAS",
                        "dependencies": [
                                    "COC77B",
                                    "COC77C"
                        ],
                        "cht": 60,
                        "type": "subject",
                        "y": 85.0,
                        "period": 9,
                        "x": 64.8
            },
            {
                        "id": "COC79D",
                        "name": "TRABALHO DE CONCLUSÃO DE CURSO 1",
                        "dependencies": [],
                        "cht": 30,
                        "type": "subject",
                        "y": 85.0,
                        "period": 9,
                        "x": 94.5
            },
            {
                        "id": "COC70D",
                        "name": "TRABALHO DE CONCLUSÃO DE CURSO 2",
                        "dependencies": [
                                    "COC79D"
                        ],
                        "cht": 30,
                        "type": "subject",
                        "y": 94.0,
                        "period": 10,
                        "x": 5.5
            }
];

const allHumanitiesData = [
            { id: 'CAART18', name: 'INTRODUÇÃO DE VIOLÃO POPULAR, TEORIA MUSICAL E PRÁTICA DE CANTO 1', dependencies: [], period: 2, cht: 60, type: 'humanities', x: 10.0, y: 5.0, groupId: '[1097]' },
            { id: 'CAART19', name: 'INTRODUÇÃO DE VIOLÃO POPULAR, TEORIA MUSICAL E PRÁTICA DE CANTO 2', dependencies: [], period: 2, cht: 60, type: 'humanities', x: 30.0, y: 5.0, groupId: '[1097]' },
            { id: 'CAART20', name: 'TÓPICOS DE APRECIAÇÃO MUSICAL', dependencies: [], period: 2, cht: 30, type: 'humanities', x: 50.0, y: 5.0, groupId: '[1097]' },
            { id: 'CAART26', name: 'COMPOSIÇÃO E ELEMENTOS DE MÚSICA', dependencies: [], period: 2, cht: 60, type: 'humanities', x: 70.0, y: 5.0, groupId: '[1097]' },
            { id: 'EDU70J', name: 'LIBRAS', dependencies: [], period: 2, cht: 45, type: 'humanities', x: 90.0, y: 5.0, groupId: '[1097]' },
            { id: 'FCH7AA', name: 'DANÇA E TECNOLOGIA', dependencies: [], period: 2, cht: 60, type: 'humanities', x: 10.0, y: 11.5, groupId: '[1097]' },
            { id: 'FCH7AB', name: 'QUESTÕES CONTEMPORÂNEAS DO CORPO', dependencies: [], period: 2, cht: 60, type: 'humanities', x: 30.0, y: 11.5, groupId: '[1097]' },
            { id: 'FCH7FA', name: 'FILOSOFIA DA CIÊNCIA E DA TECNOLOGIA', dependencies: [], period: 2, cht: 45, type: 'humanities', x: 50.0, y: 11.5, groupId: '[1097]' },
            { id: 'FCH7FB', name: 'FUNDAMENTOS DA ÉTICA', dependencies: [], period: 2, cht: 45, type: 'humanities', x: 70.0, y: 11.5, groupId: '[1097]' },
            { id: 'FCH7FC', name: 'TEORIA DAS CIÊNCIAS HUMANAS', dependencies: [], period: 2, cht: 45, type: 'humanities', x: 90.0, y: 11.5, groupId: '[1097]' },
            { id: 'FCH7GA', name: 'METROPOLIZAÇÃO CONTEMPORÂNEA: TECNOLOGIA E TERRITÓRIO', dependencies: [], period: 2, cht: 45, type: 'humanities', x: 10.0, y: 18.0, groupId: '[1097]' },
            { id: 'FCH7HA', name: 'HISTÓRIA DA TÉCNICA E DA TECNOLOGIA', dependencies: [], period: 2, cht: 45, type: 'humanities', x: 30.0, y: 18.0, groupId: '[1097]' },
            { id: 'FCH7HB', name: 'HISTÓRIA GERAL DA ECONOMIA', dependencies: [], period: 2, cht: 45, type: 'humanities', x: 50.0, y: 18.0, groupId: '[1097]' },
            { id: 'FCH7HC', name: 'CAPITALISMO CONTEMPORÂNEO E ECONOMIA POLÍTICA', dependencies: [], period: 2, cht: 45, type: 'humanities', x: 70.0, y: 18.0, groupId: '[1097]' },
            { id: 'FCH7PA', name: 'PSICOLOGIA DO TRABALHO', dependencies: [], period: 2, cht: 30, type: 'humanities', x: 90.0, y: 18.0, groupId: '[1097]' },
            { id: 'FCH7PB', name: 'RELAÇÕES INTERPESSOAIS, GRUPO E PODER', dependencies: [], period: 2, cht: 30, type: 'humanities', x: 10.0, y: 24.5, groupId: '[1097]' },
            { id: 'FCH7PC', name: 'PLANEJAMENTO DE CARREIRA', dependencies: [], period: 2, cht: 60, type: 'humanities', x: 30.0, y: 24.5, groupId: '[1097]' },
            { id: 'FCH7SA', name: 'SOCIOLOGIA', dependencies: [], period: 2, cht: 45, type: 'humanities', x: 50.0, y: 24.5, groupId: '[1097]' },
            { id: 'FCH7SB', name: 'TECNOLOGIA E SOCIEDADE', dependencies: [], period: 2, cht: 45, type: 'humanities', x: 70.0, y: 24.5, groupId: '[1097]' },
            { id: 'FCH7SC', name: 'TECNOLOGIA, TRABALHO E SAÚDE', dependencies: [], period: 2, cht: 45, type: 'humanities', x: 90.0, y: 24.5, groupId: '[1097]' },
            { id: 'FCH7SD', name: 'SOCIEDADE E POLÍTICA NO BRASIL', dependencies: [], period: 2, cht: 45, type: 'humanities', x: 10.0, y: 31.0, groupId: '[1097]' },
            { id: 'FCH7SE', name: 'SOCIEDADE E POLÍTICA NO PARANÁ', dependencies: [], period: 2, cht: 45, type: 'humanities', x: 30.0, y: 31.0, groupId: '[1097]' },
            { id: 'FCH7SF', name: 'POLÍTICA, INSTITUIÇÕES E CIDADANIA NO PARANÁ', dependencies: [], period: 2, cht: 60, type: 'humanities', x: 50.0, y: 31.0, groupId: '[1097]' },
            { id: 'FCH7XA', name: 'TECNOLOGIA SOCIAL E ECONOMIA SOLIDÁRIA', dependencies: [], period: 2, cht: 60, type: 'humanities', x: 70.0, y: 31.0, groupId: '[1097]' },
            { id: 'FCH7XB', name: 'PRESENÇA AFRICANA NO BRASIL: TECNOLOGIA, TRABALHO E CULTURA', dependencies: [], period: 2, cht: 45, type: 'humanities', x: 90.0, y: 31.0, groupId: '[1097]' },
            { id: 'FCH7XC', name: 'PRESENÇA AFRICANA NO BRASIL', dependencies: [], period: 2, cht: 30, type: 'humanities', x: 10.0, y: 37.5, groupId: '[1097]' },
            { id: 'FCH7XD', name: 'DIREITOS HUMANOS, SEGURANÇA E DIVERSIDADE', dependencies: [], period: 2, cht: 45, type: 'humanities', x: 30.0, y: 37.5, groupId: '[1097]' },
            { id: 'FCH7XE', name: 'POLÍTICAS PÚBLICAS', dependencies: [], period: 2, cht: 45, type: 'humanities', x: 50.0, y: 37.5, groupId: '[1097]' },
            { id: 'FCH7XF', name: 'DIMENSÃO AMBIENTAL NA GESTÃO URBANA', dependencies: [], period: 2, cht: 45, type: 'humanities', x: 70.0, y: 37.5, groupId: '[1097]' },
            { id: 'FCH7XG', name: 'TECNOPOLÍTICAS DA SOCIEDADE CONTEMPORÂNEA', dependencies: [], period: 2, cht: 45, type: 'humanities', x: 90.0, y: 37.5, groupId: '[1097]' },
            { id: 'GEE7E3', name: 'FUNDAMENTOS DE ECONOMIA', dependencies: [], period: 2, cht: 30, type: 'humanities', x: 10.0, y: 44.0, groupId: '[1097]' },
            { id: 'GEE7G1', name: 'FUNDAMENTOS DE GESTÃO DE PESSOAS', dependencies: [], period: 2, cht: 45, type: 'humanities', x: 30.0, y: 44.0, groupId: '[1097]' },
            { id: 'GEE7M1', name: 'FUNDAMENTOS DE MARKETING', dependencies: [], period: 2, cht: 45, type: 'humanities', x: 50.0, y: 44.0, groupId: '[1097]' }
        ];

const allOptionalNodesData = [
            {
                        "id": "COC7AA",
                        "name": "CONCRETOS ESPECIAIS",
                        "dependencies": [
                                    "COC73C"
                        ],
                        "period": 8,
                        "cht": 60,
                        "x": 5.5,
                        "y": 15.0,
                        "type": "optional",
                        "groupId": "[1098]"
            },
            {
                        "id": "COC7AB",
                        "name": "PATOLOGIA DAS CONSTRUÇÕES",
                        "dependencies": [
                                    "COC72C"
                        ],
                        "period": 8,
                        "cht": 60,
                        "x": 17.0,
                        "y": 15.0,
                        "type": "optional",
                        "groupId": "[1098]"
            },
            {
                        "id": "COC7AC",
                        "name": "PATOLOGIA DAS ESTRUTURAS",
                        "dependencies": [
                                    "COC73C"
                        ],
                        "period": 8,
                        "cht": 60,
                        "x": 28.5,
                        "y": 15.0,
                        "type": "optional",
                        "groupId": "[1098]"
            },
            {
                        "id": "COC7AG",
                        "name": "EFICIÊNCIA ENERGÉTICA EM EDIFICAÇÕES",
                        "dependencies": [],
                        "period": 8,
                        "cht": 60,
                        "x": 40.0,
                        "y": 15.0,
                        "type": "optional",
                        "groupId": "[1098]"
            },
            {
                        "id": "COC7AH",
                        "name": "PROJETOS ARQUITETÔNICOS BIOCLIMÁTICOS",
                        "dependencies": [],
                        "period": 8,
                        "cht": 60,
                        "x": 51.5,
                        "y": 15.0,
                        "type": "optional",
                        "groupId": "[1098]"
            },
            {
                        "id": "COC7AI",
                        "name": "AUTOMAÇÃO PREDIAL",
                        "dependencies": [
                                    "COC75D"
                        ],
                        "period": 8,
                        "cht": 60,
                        "x": 63.0,
                        "y": 15.0,
                        "type": "optional",
                        "groupId": "[1098]"
            },
            {
                        "id": "COC7AJ",
                        "name": "IMPERMEABILIZAÇÃO",
                        "dependencies": [
                                    "COC76C"
                        ],
                        "period": 8,
                        "cht": 60,
                        "x": 74.5,
                        "y": 15.0,
                        "type": "optional",
                        "groupId": "[1098]"
            },
            {
                        "id": "COC7AK",
                        "name": "SEGURANÇA CONTRA INCÊNDIO E PÂNICO",
                        "dependencies": [],
                        "period": 8,
                        "cht": 60,
                        "x": 86.0,
                        "y": 15.0,
                        "type": "optional",
                        "groupId": "[1098]"
            },
            {
                        "id": "COC7AM",
                        "name": "CONSTRUÇÃO ENXUTA",
                        "dependencies": [
                                    "COC76C"
                        ],
                        "period": 8,
                        "cht": 60,
                        "x": 5.5,
                        "y": 23.5,
                        "type": "optional",
                        "groupId": "[1098]"
            },
            {
                        "id": "COC7AN",
                        "name": "CONSTRUÇÃO INDUSTRIALIZADA EM CONCRETO",
                        "dependencies": [
                                    "COC74C"
                        ],
                        "period": 8,
                        "cht": 60,
                        "x": 17.0,
                        "y": 23.5,
                        "type": "optional",
                        "groupId": "[1098]"
            },
            {
                        "id": "COC7AD",
                        "name": "RECUPERAÇÃO E REFORÇO DE ESTRUTURAS",
                        "dependencies": [
                                    "COC77A"
                        ],
                        "period": 8,
                        "cht": 60,
                        "x": 5.5,
                        "y": 35.0,
                        "type": "optional",
                        "groupId": "[1098]"
            },
            {
                        "id": "COC7BA",
                        "name": "ANÁLISE COMPUTACIONAL DE ESTRUTURAS",
                        "dependencies": [
                                    "COC77F"
                        ],
                        "period": 8,
                        "cht": 60,
                        "x": 17.0,
                        "y": 35.0,
                        "type": "optional",
                        "groupId": "[1098]"
            },
            {
                        "id": "COC7BB",
                        "name": "ESTRUTURAS DE EDIFÍCIOS EM CONCRETO",
                        "dependencies": [
                                    "COC78A"
                        ],
                        "period": 8,
                        "cht": 60,
                        "x": 28.5,
                        "y": 35.0,
                        "type": "optional",
                        "groupId": "[1098]"
            },
            {
                        "id": "COC7BC",
                        "name": "PROJETO DE ESTRUTURAS EM AÇO",
                        "dependencies": [
                                    "COC78B"
                        ],
                        "period": 8,
                        "cht": 60,
                        "x": 40.0,
                        "y": 35.0,
                        "type": "optional",
                        "groupId": "[1098]"
            },
            {
                        "id": "COC7BD",
                        "name": "CONCRETO PROTENDIDO",
                        "dependencies": [
                                    "COC77A"
                        ],
                        "period": 8,
                        "cht": 60,
                        "x": 51.5,
                        "y": 35.0,
                        "type": "optional",
                        "groupId": "[1098]"
            },
            {
                        "id": "COC7BF",
                        "name": "PONTES EM CONCRETO",
                        "dependencies": [
                                    "COC78A"
                        ],
                        "period": 8,
                        "cht": 60,
                        "x": 63.0,
                        "y": 35.0,
                        "type": "optional",
                        "groupId": "[1098]"
            },
            {
                        "id": "COC7BG",
                        "name": "DINÂMICA DAS ESTRUTURAS",
                        "dependencies": [
                                    "COC77F"
                        ],
                        "period": 8,
                        "cht": 60,
                        "x": 74.5,
                        "y": 35.0,
                        "type": "optional",
                        "groupId": "[1098]"
            },
            {
                        "id": "COC7BH",
                        "name": "PROJETO EM CONCRETO PRÉ-MOLDADO",
                        "dependencies": [
                                    "COC77A"
                        ],
                        "period": 8,
                        "cht": 60,
                        "x": 86.0,
                        "y": 35.0,
                        "type": "optional",
                        "groupId": "[1098]"
            },
            {
                        "id": "COC7AE",
                        "name": "ENGENHARIA DE AVALIAÇÕES",
                        "dependencies": [
                                    "COC77B"
                        ],
                        "period": 8,
                        "cht": 60,
                        "x": 5.5,
                        "y": 55.0,
                        "type": "optional",
                        "groupId": "[1098]"
            },
            {
                        "id": "COC7AF",
                        "name": "TÓPICOS AVANÇADOS EM AVALIAÇÕES",
                        "dependencies": [
                                    "COC77B"
                        ],
                        "period": 8,
                        "cht": 60,
                        "x": 17.0,
                        "y": 55.0,
                        "type": "optional",
                        "groupId": "[1098]"
            },
            {
                        "id": "COC7AL",
                        "name": "ESTRATÉGIA EMPRESARIAL E EMPREENDEDORISMO",
                        "dependencies": [],
                        "period": 8,
                        "cht": 60,
                        "x": 28.5,
                        "y": 55.0,
                        "type": "optional",
                        "groupId": "[1098]"
            },
            {
                        "id": "COC7CA",
                        "name": "GERENCIAMENTO DE RESÍDUOS DA CONSTRUÇÃO",
                        "dependencies": [],
                        "period": 8,
                        "cht": 60,
                        "x": 40.0,
                        "y": 55.0,
                        "type": "optional",
                        "groupId": "[1098]"
            },
            {
                        "id": "COC7BE",
                        "name": "SEGURANÇA DE BARRAGENS",
                        "dependencies": [
                                    "COC74B",
                                    "COC74F",
                                    "COC75E",
                                    "COC75G"
                        ],
                        "period": 8,
                        "cht": 60,
                        "x": 5.5,
                        "y": 72.0,
                        "type": "optional",
                        "groupId": "[1098]"
            },
            {
                        "id": "COC7CB",
                        "name": "USO RACIONAL DAS ÁGUAS PLUVIAIS",
                        "dependencies": [],
                        "period": 8,
                        "cht": 60,
                        "x": 17.0,
                        "y": 72.0,
                        "type": "optional",
                        "groupId": "[1098]"
            },
            {
                        "id": "COC7CC",
                        "name": "APROVEITAMENTO DE ÁGUAS RESIDUÁRIAS",
                        "dependencies": [],
                        "period": 8,
                        "cht": 60,
                        "x": 28.5,
                        "y": 72.0,
                        "type": "optional",
                        "groupId": "[1098]"
            },
            {
                        "id": "COC7CD",
                        "name": "SISTEMAS DE DRENAGEM URBANA",
                        "dependencies": [
                                    "COC75E"
                        ],
                        "period": 8,
                        "cht": 60,
                        "x": 40.0,
                        "y": 72.0,
                        "type": "optional",
                        "groupId": "[1098]"
            },
            {
                        "id": "COC7CE",
                        "name": "CONSTRUÇÕES SUSTENTÁVEIS",
                        "dependencies": [],
                        "period": 8,
                        "cht": 60,
                        "x": 51.5,
                        "y": 72.0,
                        "type": "optional",
                        "groupId": "[1098]"
            },
            {
                        "id": "COC7CF",
                        "name": "DINÂMICA DOS FLUÍDOS",
                        "dependencies": [
                                    "COC75E"
                        ],
                        "period": 8,
                        "cht": 60,
                        "x": 63.0,
                        "y": 72.0,
                        "type": "optional",
                        "groupId": "[1098]"
            },
            {
                        "id": "COC7DA",
                        "name": "ESTABILIDADE DE TALUDES E ENCOSTAS",
                        "dependencies": [
                                    "COC75G"
                        ],
                        "period": 8,
                        "cht": 60,
                        "x": 5.5,
                        "y": 88.0,
                        "type": "optional",
                        "groupId": "[1098]"
            },
            {
                        "id": "COC7DB",
                        "name": "MECÂNICA DOS SOLOS AVANÇADA",
                        "dependencies": [
                                    "COC75G"
                        ],
                        "period": 8,
                        "cht": 60,
                        "x": 17.0,
                        "y": 88.0,
                        "type": "optional",
                        "groupId": "[1098]"
            },
            {
                        "id": "COC7DC",
                        "name": "MATERIAIS GEOTÉCNICOS",
                        "dependencies": [
                                    "COC75G"
                        ],
                        "period": 8,
                        "cht": 60,
                        "x": 28.5,
                        "y": 88.0,
                        "type": "optional",
                        "groupId": "[1098]"
            },
            {
                        "id": "COC7EA",
                        "name": "FERROVIAS",
                        "dependencies": [
                                    "COC78D"
                        ],
                        "period": 8,
                        "cht": 60,
                        "x": 40.0,
                        "y": 88.0,
                        "type": "optional",
                        "groupId": "[1098]"
            },
            {
                        "id": "COC7EB",
                        "name": "PAVIMENTAÇÃO",
                        "dependencies": [
                                    "COC76H",
                                    "COC78D"
                        ],
                        "period": 8,
                        "cht": 60,
                        "x": 51.5,
                        "y": 88.0,
                        "type": "optional",
                        "groupId": "[1098]"
            }
];

export { TOTAL_COMPLEMENTARY_HOURS, TOTAL_EXTENSION_HOURS, TOTAL_HUMANITIES_HOURS, TOTAL_OPTIONAL_HOURS, NODE_WIDTH, NODE_HEIGHT, OPTIONAL_LAYOUT_MIN_X, OPTIONAL_LAYOUT_MAX_X, OPTIONAL_LAYOUT_MIN_Y, OPTIONAL_LAYOUT_MAX_Y, SPECIALIZATION_TRACKS, OPTIONAL_GROUPS_CONFIG, allNodesData, allHumanitiesData, allOptionalNodesData };
