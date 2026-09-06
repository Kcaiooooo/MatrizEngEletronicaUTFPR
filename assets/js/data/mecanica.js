const TOTAL_COMPLEMENTARY_HOURS = 60;

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
            'Sistemas Termofluidomecânicos & Energia': [
                'MEC7BA', 'MEC7BB', 'MEC7BC', 'MEC7BD', 'MEC7BE', 'MEC7BF', 'MEC7BG', 'MEC7BH', 'MEC7BI', 'MEC7BJ', 'MEC7BK', 'MEC7BL', 'MEC7BM', 'MEC7BN', 'MEC7BQ', 'MEC7BR', 'MEC7BS', 'MEC7BT', 'MEC7BU', 'MEC7FA'
            ],
            'Manufatura, Materiais & Processos de Fabricação': [
                'MEC7AC', 'MEC7AF', 'MEC7AJ', 'MEC7DA', 'MEC7DB', 'MEC7DC', 'MEC7DD', 'MEC7DE', 'MEC7DG', 'MEC7DH', 'MEC7DI', 'MEC7DJ', 'MEC7DK', 'MEC7DL', 'MEC7DM', 'MEC7DN', 'MEC7DO', 'MEC7DP', 'MEC7EA', 'MEC7ED', 'MEC7EF', 'MEC7EG', 'MEC7EI', 'MEC7EJ', 'MEC7EK'
            ],
            'Engenharia de Operações & Gestão da Produção': [
                'MEC7AG', 'MEC7AH', 'MEC7BO', 'MEC7BP', 'MEC7CA', 'MEC7CB', 'MEC7CC', 'MEC7CD', 'MEC7CE', 'MEC7CF', 'MEC7CG', 'MEC7CH', 'MEC7CI', 'MEC7CJ', 'MEC7CK', 'MEC7CL', 'MEC7CM', 'MEC7CN', 'MEC7CO', 'MEC7CP', 'MEC7EH', 'MEC7GE', 'MEC7HB', 'MEC7HC', 'MEC7HD', 'MEC7HF'
            ],
            'Projeto Mecânico, Análise Estrutural & Automação': [
                'MEC7FB', 'MEC7FC', 'MEC7FD', 'MEC7FE', 'MEC7FF', 'MEC7FG', 'MEC7FH', 'MEC7FI', 'MEC7GB', 'MEC7GC', 'MEC7GD', 'MEC7GF', 'MEC7HA', 'MEC7HE', 'MEC7HG', 'MEC7HH'
            ]
        };

const OPTIONAL_GROUPS_CONFIG = {
            '[1178]': { requiredHours: 240, name: 'Optativas de Conteúdo Profissionalizante' },
            '[1179]': { requiredHours: 120, name: 'Optativas de Conteúdo Humanidades' },
            '[1234]': { requiredHours: 420, name: 'Unidades Curriculares Extensionistas' }
        };

const allNodesData = [
            {
                "id": "FIS7F1",
                "name": "FÍSICA TEÓRICA 1",
                "dependencies": [],
                "cht": 60,
                "type": "subject",
                "y": 2.0,
                "period": 1,
                "x": 5.5
            },
            {
                "id": "INF71A",
                "name": "COMPUTAÇÃO 1",
                "dependencies": [],
                "cht": 60,
                "type": "subject",
                "y": 2.0,
                "period": 1,
                "x": 23.3
            },
            {
                "id": "MAT7C1",
                "name": "CÁLCULO DIFERENCIAL E INTEGRAL 1",
                "dependencies": [],
                "cht": 90,
                "type": "subject",
                "y": 2.0,
                "period": 1,
                "x": 41.1
            },
            {
                "id": "MAT7GA",
                "name": "GEOMETRIA ANALÍTICA",
                "dependencies": [],
                "cht": 60,
                "type": "subject",
                "y": 2.0,
                "period": 1,
                "x": 58.9
            },
            {
                "id": "MEC71A",
                "name": "DESENHO TÉCNICO",
                "dependencies": [],
                "cht": 45,
                "type": "subject",
                "y": 2.0,
                "period": 1,
                "x": 76.7
            },
            {
                "id": "MEC71B",
                "name": "INTRODUÇÃO À ENGENHARIA MECÂNICA",
                "dependencies": [],
                "cht": 30,
                "type": "subject",
                "y": 2.0,
                "period": 1,
                "x": 94.5
            },
            {
                "id": "MEC70D",
                "name": "ATIVIDADES COMPLEMENTARES",
                "dependencies": [],
                "cht": 60,
                "type": "subject",
                "y": 12.5,
                "period": 2,
                "x": 5.5
            },
            {
                "id": "FIS7F2",
                "name": "FÍSICA TEÓRICA 2",
                "dependencies": [
                    "FIS7F1"
                ],
                "cht": 60,
                "type": "subject",
                "y": 12.5,
                "period": 2,
                "x": 20.3
            },
            {
                "id": "MAT7C2",
                "name": "CÁLCULO DIFERENCIAL E INTEGRAL 2",
                "dependencies": [
                    "MAT7C1",
                    "MAT7GA"
                ],
                "cht": 90,
                "type": "subject",
                "y": 12.5,
                "period": 2,
                "x": 35.2
            },
            {
                "id": "MAT7AL",
                "name": "ÁLGEBRA LINEAR",
                "dependencies": [
                    "MAT7GA"
                ],
                "cht": 60,
                "type": "subject",
                "y": 12.5,
                "period": 2,
                "x": 50.0
            },
            {
                "id": "MEC72A",
                "name": "DESENHO AUXILIADO POR COMPUTADOR 1",
                "dependencies": [
                    "MEC71A"
                ],
                "cht": 45,
                "type": "subject",
                "y": 12.5,
                "period": 2,
                "x": 64.8
            },
            {
                "id": "MEC72B",
                "name": "FUNDAMENTOS DE CIÊNCIAS DOS MATERIAIS",
                "dependencies": [],
                "cht": 60,
                "type": "subject",
                "y": 12.5,
                "period": 2,
                "x": 79.7
            },
            {
                "id": "MEC74B",
                "name": "METROLOGIA MECÂNICA",
                "dependencies": [],
                "cht": 45,
                "type": "subject",
                "y": 12.5,
                "period": 2,
                "x": 94.5
            },
            {
                "id": "ELN73D",
                "name": "ELETRICIDADE",
                "dependencies": [
                    "MAT7C1"
                ],
                "cht": 75,
                "type": "subject",
                "y": 23.0,
                "period": 3,
                "x": 5.5
            },
            {
                "id": "EST70A",
                "name": "INTRODUÇÃO À ESTATÍSTICA",
                "dependencies": [
                    "MAT7C1"
                ],
                "cht": 60,
                "type": "subject",
                "y": 23.0,
                "period": 3,
                "x": 18.2
            },
            {
                "id": "FIS7E1",
                "name": "FÍSICA EXPERIMENTAL 1",
                "dependencies": [
                    "FIS7F1"
                ],
                "cht": 30,
                "type": "subject",
                "y": 23.0,
                "period": 3,
                "x": 30.9
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
                "y": 23.0,
                "period": 3,
                "x": 43.6
            },
            {
                "id": "MEC73A",
                "name": "DESENHO AUXILIADO POR COMPUTADOR 2",
                "dependencies": [
                    "MEC72A"
                ],
                "cht": 30,
                "type": "subject",
                "y": 23.0,
                "period": 3,
                "x": 56.4
            },
            {
                "id": "MEC73C",
                "name": "ESTÁTICA",
                "dependencies": [
                    "FIS7F1",
                    "MAT7C1"
                ],
                "cht": 60,
                "type": "subject",
                "y": 23.0,
                "period": 3,
                "x": 69.1
            },
            {
                "id": "MEC73D",
                "name": "TRATAMENTOS TÉRMICOS",
                "dependencies": [
                    "MEC72B"
                ],
                "cht": 60,
                "type": "subject",
                "y": 23.0,
                "period": 3,
                "x": 81.8
            },
            {
                "id": "OPT_1179_1",
                "name": "OPTATIVA HUMANIDADES 1",
                "dependencies": [],
                "cht": 60,
                "type": "optional-placeholder",
                "groupId": "[1179]",
                "y": 23.0,
                "period": 3,
                "x": 94.5
            },
            {
                "id": "ELT74G",
                "name": "MÁQUINAS ELÉTRICAS",
                "dependencies": [
                    "ELN73D"
                ],
                "cht": 45,
                "type": "subject",
                "y": 33.5,
                "period": 4,
                "x": 5.5
            },
            {
                "id": "MAT7N1",
                "name": "CÁLCULO NUMÉRICO",
                "dependencies": [
                    "MAT7ED"
                ],
                "cht": 60,
                "type": "subject",
                "y": 33.5,
                "period": 4,
                "x": 18.2
            },
            {
                "id": "MEC74A",
                "name": "DINÂMICA",
                "dependencies": [
                    "MEC73C"
                ],
                "cht": 60,
                "type": "subject",
                "y": 33.5,
                "period": 4,
                "x": 30.9
            },
            {
                "id": "MEC74C",
                "name": "CONFORMAÇÃO PLÁSTICA",
                "dependencies": [
                    "MEC73D"
                ],
                "cht": 30,
                "type": "subject",
                "y": 33.5,
                "period": 4,
                "x": 43.6
            },
            {
                "id": "MEC74D",
                "name": "FUNDIÇÃO",
                "dependencies": [
                    "MEC73D"
                ],
                "cht": 30,
                "type": "subject",
                "y": 33.5,
                "period": 4,
                "x": 56.4
            },
            {
                "id": "MEC74E",
                "name": "TERMODINÂMICA 1",
                "dependencies": [
                    "FIS7F2",
                    "MAT7C1"
                ],
                "cht": 60,
                "type": "subject",
                "y": 33.5,
                "period": 4,
                "x": 69.1
            },
            {
                "id": "MEC74F",
                "name": "ENSAIOS DE MATERIAIS",
                "dependencies": [
                    "MEC72B"
                ],
                "cht": 60,
                "type": "subject",
                "y": 33.5,
                "period": 4,
                "x": 81.8
            },
            {
                "id": "MEC74G",
                "name": "MATERIAIS CERÂMICOS E POLIMÉRICOS",
                "dependencies": [
                    "MEC72B"
                ],
                "cht": 45,
                "type": "subject",
                "y": 33.5,
                "period": 4,
                "x": 94.5
            },
            {
                "id": "MEC75D",
                "name": "SOLDAGEM",
                "dependencies": [
                    "MEC73D"
                ],
                "cht": 45,
                "type": "subject",
                "y": 44.0,
                "period": 5,
                "x": 5.5
            },
            {
                "id": "MEC75E",
                "name": "USINAGEM CONVENCIONAL",
                "dependencies": [
                    "MEC72B",
                    "MEC74B",
                    "MEC74F"
                ],
                "cht": 75,
                "type": "subject",
                "y": 44.0,
                "period": 5,
                "x": 20.3
            },
            {
                "id": "MEC75F",
                "name": "TERMODINÂMICA 2",
                "dependencies": [
                    "MEC74E"
                ],
                "cht": 60,
                "type": "subject",
                "y": 44.0,
                "period": 5,
                "x": 35.2
            },
            {
                "id": "MEC75G",
                "name": "MECÂNICA DOS FLUIDOS 1",
                "dependencies": [
                    "MAT7ED",
                    "MEC74A",
                    "MEC74E"
                ],
                "cht": 60,
                "type": "subject",
                "y": 44.0,
                "period": 5,
                "x": 50.0
            },
            {
                "id": "MEC75H",
                "name": "ELETRÔNICA APLICADA A ENGENHARIA MECÂNICA",
                "dependencies": [
                    "ELT74G"
                ],
                "cht": 60,
                "type": "subject",
                "y": 44.0,
                "period": 5,
                "x": 64.8
            },
            {
                "id": "MEC76A",
                "name": "MECÂNICA DOS SÓLIDOS 1",
                "dependencies": [
                    "MEC73C"
                ],
                "cht": 90,
                "type": "subject",
                "y": 44.0,
                "period": 5,
                "x": 79.7
            },
            {
                "id": "MEC70E",
                "name": "ESTÁGIO SUPERVISIONADO",
                "dependencies": [],
                "cht": 360,
                "type": "subject",
                "y": 54.5,
                "period": 6,
                "x": 5.5
            },
            {
                "id": "MEC76E",
                "name": "MECÂNICA DOS SÓLIDOS 2",
                "dependencies": [
                    "MEC76A"
                ],
                "cht": 60,
                "type": "subject",
                "y": 54.5,
                "period": 6,
                "x": 18.2
            },
            {
                "id": "MEC76F",
                "name": "MECANISMOS",
                "dependencies": [
                    "MEC74A"
                ],
                "cht": 60,
                "type": "subject",
                "y": 54.5,
                "period": 6,
                "x": 30.9
            },
            {
                "id": "MEC76G",
                "name": "TRANSFERÊNCIA DE CALOR 1",
                "dependencies": [
                    "MAT7N1",
                    "MEC74E"
                ],
                "cht": 60,
                "type": "subject",
                "y": 54.5,
                "period": 6,
                "x": 43.6
            },
            {
                "id": "MEC76H",
                "name": "MECÂNICA DOS FLUIDOS 2",
                "dependencies": [
                    "MEC75G"
                ],
                "cht": 60,
                "type": "subject",
                "y": 54.5,
                "period": 6,
                "x": 56.4
            },
            {
                "id": "MEC77B",
                "name": "USINAGEM CNC",
                "dependencies": [
                    "MEC75E"
                ],
                "cht": 45,
                "type": "subject",
                "y": 54.5,
                "period": 6,
                "x": 69.1
            },
            {
                "id": "MEC79D",
                "name": "GESTÃO AMBIENTAL",
                "dependencies": [],
                "cht": 30,
                "type": "subject",
                "y": 54.5,
                "period": 6,
                "x": 81.8
            },
            {
                "id": "MEC79E",
                "name": "SISTEMAS DE GESTÃO DA QUALIDADE",
                "dependencies": [
                    "MEC74B"
                ],
                "cht": 30,
                "type": "subject",
                "y": 54.5,
                "period": 6,
                "x": 94.5
            },
            {
                "id": "MEC76C",
                "name": "PNEUMÁTICA E HIDRÁULICA",
                "dependencies": [
                    "MEC75G"
                ],
                "cht": 60,
                "type": "subject",
                "y": 65.0,
                "period": 7,
                "x": 5.5
            },
            {
                "id": "MEC77C",
                "name": "FUNDAMENTOS DE ENGENHARIA DE SEGURANÇA DO TRABALHO",
                "dependencies": [
                    "MEC79E"
                ],
                "cht": 45,
                "type": "subject",
                "y": 65.0,
                "period": 7,
                "x": 18.2
            },
            {
                "id": "MEC77D",
                "name": "ANÁLISE DE CUSTOS INDUSTRIAIS",
                "dependencies": [],
                "cht": 45,
                "type": "subject",
                "y": 65.0,
                "period": 7,
                "x": 30.9
            },
            {
                "id": "MEC77E",
                "name": "VIBRAÇÕES",
                "dependencies": [
                    "MAT7C2",
                    "MEC74A"
                ],
                "cht": 60,
                "type": "subject",
                "y": 65.0,
                "period": 7,
                "x": 43.6
            },
            {
                "id": "MEC77F",
                "name": "ELEMENTOS DE MÁQUINAS 1",
                "dependencies": [
                    "MEC76E",
                    "MEC76F"
                ],
                "cht": 60,
                "type": "subject",
                "y": 65.0,
                "period": 7,
                "x": 56.4
            },
            {
                "id": "MEC77G",
                "name": "TRANSFERÊNCIA DE CALOR 2",
                "dependencies": [
                    "MEC76G",
                    "MEC76H"
                ],
                "cht": 60,
                "type": "subject",
                "y": 65.0,
                "period": 7,
                "x": 69.1
            },
            {
                "id": "MEC76D",
                "name": "GESTÃO DA PRODUÇÃO",
                "dependencies": [],
                "cht": 30,
                "type": "subject",
                "y": 75.5,
                "period": 8,
                "x": 5.5
            },
            {
                "id": "MEC77A",
                "name": "ELEMENTOS DE MÁQUINAS 2",
                "dependencies": [
                    "MEC77F"
                ],
                "cht": 60,
                "type": "subject",
                "y": 75.5,
                "period": 8,
                "x": 16.6
            },
            {
                "id": "MEC78B",
                "name": "ENGENHARIA ECONÔMICA",
                "dependencies": [],
                "cht": 30,
                "type": "subject",
                "y": 75.5,
                "period": 8,
                "x": 27.8
            },
            {
                "id": "MEC78C",
                "name": "GERENCIAMENTO DE PROJETOS",
                "dependencies": [
                    "MEC79E"
                ],
                "cht": 45,
                "type": "subject",
                "y": 75.5,
                "period": 8,
                "x": 38.9
            },
            {
                "id": "MEC78D",
                "name": "EMPREENDEDORISMO",
                "dependencies": [],
                "cht": 30,
                "type": "subject",
                "y": 75.5,
                "period": 8,
                "x": 50.0
            },
            {
                "id": "MEC78E",
                "name": "MANUTENÇÃO MECÂNICA",
                "dependencies": [],
                "cht": 30,
                "type": "subject",
                "y": 75.5,
                "period": 8,
                "x": 61.1
            },
            {
                "id": "MEC78F",
                "name": "LABORATÓRIO DE CIÊNCIAS TÉRMICAS",
                "dependencies": [
                    "MEC77G"
                ],
                "cht": 30,
                "type": "subject",
                "y": 75.5,
                "period": 8,
                "x": 72.2
            },
            {
                "id": "MEC78G",
                "name": "METODOLOGIA DE PROJETO DE PRODUTO",
                "dependencies": [
                    "MEC73A"
                ],
                "cht": 45,
                "type": "subject",
                "y": 75.5,
                "period": 8,
                "x": 83.4
            },
            {
                "id": "MEC78H",
                "name": "COMUNICAÇÃO E METODOLOGIA CIENTÍFICA",
                "dependencies": [],
                "cht": 45,
                "type": "subject",
                "y": 75.5,
                "period": 8,
                "x": 94.5
            },
            {
                "id": "MEC70F",
                "name": "TRABALHO DE CONCLUSÃO DE CURSO 1",
                "dependencies": [
                    "MEC78G",
                    "MEC78H"
                ],
                "cht": 60,
                "type": "subject",
                "y": 86.0,
                "period": 9,
                "x": 5.5
            },
            {
                "id": "MEC70G",
                "name": "TRABALHO DE CONCLUSÃO DE CURSO 2",
                "dependencies": [
                    "MEC70F"
                ],
                "cht": 60,
                "type": "subject",
                "y": 96.5,
                "period": 10,
                "x": 5.5
            }
        ];

const allHumanitiesData = [
            {
                "id": "CAART18",
                "name": "INTRODUÇÃO DE VIOLÃO POPULAR, TEORIA MUSICAL E PRÁTICA DE CANTO 1",
                "chs": 4,
                "cht": 60,
                "dependencies": [],
                "groupId": "[1179]",
                "period": 3,
                "type": "humanities",
                "x": 10,
                "y": 5.0
            },
            {
                "id": "CAART19",
                "name": "INTRODUÇÃO DE VIOLÃO POPULAR, TEORIA MUSICAL E PRÁTICA DE CANTO 2",
                "chs": 4,
                "cht": 60,
                "dependencies": [],
                "groupId": "[1179]",
                "period": 3,
                "type": "humanities",
                "x": 30,
                "y": 5.0
            },
            {
                "id": "CAART20",
                "name": "TÓPICOS DE APRECIAÇÃO MUSICAL",
                "chs": 2,
                "cht": 30,
                "dependencies": [],
                "groupId": "[1179]",
                "period": 3,
                "type": "humanities",
                "x": 50,
                "y": 5.0
            },
            {
                "id": "CAART26",
                "name": "COMPOSIÇÃO E ELEMENTOS DE MÚSICA",
                "chs": 4,
                "cht": 60,
                "dependencies": [],
                "groupId": "[1179]",
                "period": 3,
                "type": "humanities",
                "x": 70,
                "y": 5.0
            },
            {
                "id": "COE70A",
                "name": "COMUNICAÇÃO ORAL E ESCRITA",
                "chs": 2,
                "cht": 30,
                "dependencies": [],
                "groupId": "[1179]",
                "period": 3,
                "type": "humanities",
                "x": 90,
                "y": 5.0
            },
            {
                "id": "EDU70A",
                "name": "HISTÓRIA DA PROFISSÃO DOCENTE",
                "chs": 2,
                "cht": 30,
                "dependencies": [],
                "groupId": "[1179]",
                "period": 3,
                "type": "humanities",
                "x": 10,
                "y": 15.0
            },
            {
                "id": "EDU70B",
                "name": "PESQUISA EM EDUCAÇÃO",
                "chs": 3,
                "cht": 45,
                "dependencies": [],
                "groupId": "[1179]",
                "period": 3,
                "type": "humanities",
                "x": 30,
                "y": 15.0
            },
            {
                "id": "EDU70D",
                "name": "PSICOLOGIA DA EDUCAÇÃO",
                "chs": 3,
                "cht": 45,
                "dependencies": [],
                "groupId": "[1179]",
                "period": 3,
                "type": "humanities",
                "x": 50,
                "y": 15.0
            },
            {
                "id": "EDU70E",
                "name": "DIDÁTICA",
                "chs": 3,
                "cht": 45,
                "dependencies": [],
                "groupId": "[1179]",
                "period": 3,
                "type": "humanities",
                "x": 70,
                "y": 15.0
            },
            {
                "id": "EDU70F",
                "name": "CURRÍCULO E CONHECIMENTO ESCOLAR",
                "chs": 2,
                "cht": 30,
                "dependencies": [],
                "groupId": "[1179]",
                "period": 3,
                "type": "humanities",
                "x": 90,
                "y": 15.0
            },
            {
                "id": "EDU70G",
                "name": "GESTÃO ESCOLAR",
                "chs": 2,
                "cht": 30,
                "dependencies": [],
                "groupId": "[1179]",
                "period": 3,
                "type": "humanities",
                "x": 10,
                "y": 25.0
            },
            {
                "id": "EDU70H",
                "name": "POLÍTICA EDUCACIONAL",
                "chs": 2,
                "cht": 30,
                "dependencies": [],
                "groupId": "[1179]",
                "period": 3,
                "type": "humanities",
                "x": 30,
                "y": 25.0
            },
            {
                "id": "EDU70I",
                "name": "EDUCAÇÃO ESPECIAL E PROCESSOS INCLUSIVOS",
                "chs": 3,
                "cht": 45,
                "dependencies": [],
                "groupId": "[1179]",
                "period": 3,
                "type": "humanities",
                "x": 50,
                "y": 25.0
            },
            {
                "id": "EDU70J",
                "name": "LIBRAS",
                "chs": 3,
                "cht": 45,
                "dependencies": [],
                "groupId": "[1179]",
                "period": 3,
                "type": "humanities",
                "x": 70,
                "y": 25.0
            },
            {
                "id": "ELH01",
                "name": "FUNDAMENTOS DE PRIMEIROS SOCORROS",
                "chs": 2,
                "cht": 30,
                "dependencies": [],
                "groupId": "[1179]",
                "period": 3,
                "type": "humanities",
                "x": 90,
                "y": 25.0
            },
            {
                "id": "ELH02",
                "name": "PRÁTICA DE GRUPO E INTERAÇÕES HUMANAS COM A MÚSICA",
                "chs": 2,
                "cht": 30,
                "dependencies": [],
                "groupId": "[1179]",
                "period": 3,
                "type": "humanities",
                "x": 10,
                "y": 35.0
            },
            {
                "id": "ELH03",
                "name": "DESIGN THINKING PARA DESENVOLVIMENTO DE NOVOS PRODUTOS",
                "chs": 6,
                "cht": 90,
                "dependencies": [],
                "groupId": "[1179]",
                "period": 3,
                "type": "humanities",
                "x": 30,
                "y": 35.0
            },
            {
                "id": "ELH05",
                "name": "NOÇÕES JURÍDICAS PARA EMPREENDEDORES",
                "chs": 4,
                "cht": 60,
                "dependencies": [],
                "groupId": "[1179]",
                "period": 3,
                "type": "humanities",
                "x": 50,
                "y": 35.0
            },
            {
                "id": "FCH7AA",
                "name": "DANÇA E TECNOLOGIA",
                "chs": 4,
                "cht": 60,
                "dependencies": [],
                "groupId": "[1179]",
                "period": 3,
                "type": "humanities",
                "x": 70,
                "y": 35.0
            },
            {
                "id": "FCH7AB",
                "name": "QUESTÕES CONTEMPORÂNEAS DO CORPO",
                "chs": 4,
                "cht": 60,
                "dependencies": [],
                "groupId": "[1179]",
                "period": 3,
                "type": "humanities",
                "x": 90,
                "y": 35.0
            },
            {
                "id": "FCH7FA",
                "name": "FILOSOFIA DA CIÊNCIA E DA TECNOLOGIA",
                "chs": 3,
                "cht": 45,
                "dependencies": [],
                "groupId": "[1179]",
                "period": 3,
                "type": "humanities",
                "x": 10,
                "y": 45.0
            },
            {
                "id": "FCH7FB",
                "name": "FUNDAMENTOS DA ÉTICA",
                "chs": 3,
                "cht": 45,
                "dependencies": [],
                "groupId": "[1179]",
                "period": 3,
                "type": "humanities",
                "x": 30,
                "y": 45.0
            },
            {
                "id": "FCH7FC",
                "name": "TEORIA DAS CIÊNCIAS HUMANAS",
                "chs": 3,
                "cht": 45,
                "dependencies": [],
                "groupId": "[1179]",
                "period": 3,
                "type": "humanities",
                "x": 50,
                "y": 45.0
            },
            {
                "id": "FCH7GA",
                "name": "METROPOLIZAÇÃO CONTEMPORÂNEA: TECNOLOGIA E TERRITÓRIO",
                "chs": 3,
                "cht": 45,
                "dependencies": [],
                "groupId": "[1179]",
                "period": 3,
                "type": "humanities",
                "x": 70,
                "y": 45.0
            },
            {
                "id": "FCH7HA",
                "name": "HISTÓRIA DA TÉCNICA E DA TECNOLOGIA",
                "chs": 3,
                "cht": 45,
                "dependencies": [],
                "groupId": "[1179]",
                "period": 3,
                "type": "humanities",
                "x": 90,
                "y": 45.0
            },
            {
                "id": "FCH7HB",
                "name": "HISTÓRIA GERAL DA ECONOMIA",
                "chs": 3,
                "cht": 45,
                "dependencies": [],
                "groupId": "[1179]",
                "period": 3,
                "type": "humanities",
                "x": 10,
                "y": 55.0
            },
            {
                "id": "FCH7HC",
                "name": "CAPITALISMO CONTEMPORÂNEO E ECONOMIA POLÍTICA",
                "chs": 3,
                "cht": 45,
                "dependencies": [],
                "groupId": "[1179]",
                "period": 3,
                "type": "humanities",
                "x": 30,
                "y": 55.0
            },
            {
                "id": "FCH7PA",
                "name": "PSICOLOGIA DO TRABALHO",
                "chs": 2,
                "cht": 30,
                "dependencies": [],
                "groupId": "[1179]",
                "period": 3,
                "type": "humanities",
                "x": 50,
                "y": 55.0
            },
            {
                "id": "FCH7PB",
                "name": "RELAÇÕES INTERPESSOAIS, GRUPO E PODER",
                "chs": 2,
                "cht": 30,
                "dependencies": [],
                "groupId": "[1179]",
                "period": 3,
                "type": "humanities",
                "x": 70,
                "y": 55.0
            },
            {
                "id": "FCH7SA",
                "name": "SOCIOLOGIA",
                "chs": 3,
                "cht": 45,
                "dependencies": [],
                "groupId": "[1179]",
                "period": 3,
                "type": "humanities",
                "x": 90,
                "y": 55.0
            },
            {
                "id": "FCH7SB",
                "name": "TECNOLOGIA E SOCIEDADE",
                "chs": 3,
                "cht": 45,
                "dependencies": [],
                "groupId": "[1179]",
                "period": 3,
                "type": "humanities",
                "x": 10,
                "y": 65.0
            },
            {
                "id": "FCH7SC",
                "name": "TECNOLOGIA, TRABALHO E SAÚDE",
                "chs": 3,
                "cht": 45,
                "dependencies": [],
                "groupId": "[1179]",
                "period": 3,
                "type": "humanities",
                "x": 30,
                "y": 65.0
            },
            {
                "id": "FCH7SD",
                "name": "SOCIEDADE E POLÍTICA NO BRASIL",
                "chs": 3,
                "cht": 45,
                "dependencies": [],
                "groupId": "[1179]",
                "period": 3,
                "type": "humanities",
                "x": 50,
                "y": 65.0
            },
            {
                "id": "FCH7SE",
                "name": "SOCIEDADE E POLÍTICA NO PARANÁ",
                "chs": 3,
                "cht": 45,
                "dependencies": [],
                "groupId": "[1179]",
                "period": 3,
                "type": "humanities",
                "x": 70,
                "y": 65.0
            },
            {
                "id": "FCH7SF",
                "name": "POLÍTICA, INSTITUIÇÕES E CIDADANIA NO PARANÁ",
                "chs": 4,
                "cht": 60,
                "dependencies": [],
                "groupId": "[1179]",
                "period": 3,
                "type": "humanities",
                "x": 90,
                "y": 65.0
            },
            {
                "id": "FCH7XA",
                "name": "TECNOLOGIA SOCIAL E ECONOMIA SOLIDÁRIA",
                "chs": 4,
                "cht": 60,
                "dependencies": [],
                "groupId": "[1179]",
                "period": 3,
                "type": "humanities",
                "x": 10,
                "y": 75.0
            },
            {
                "id": "FCH7XB",
                "name": "PRESENÇA AFRICANA NO BRASIL: TECNOLOGIA, TRABALHO E CULTURA",
                "chs": 3,
                "cht": 45,
                "dependencies": [],
                "groupId": "[1179]",
                "period": 3,
                "type": "humanities",
                "x": 30,
                "y": 75.0
            },
            {
                "id": "FCH7XC",
                "name": "PRESENÇA AFRICANA NO BRASIL",
                "chs": 2,
                "cht": 30,
                "dependencies": [],
                "groupId": "[1179]",
                "period": 3,
                "type": "humanities",
                "x": 50,
                "y": 75.0
            },
            {
                "id": "FCH7XD",
                "name": "DIREITOS HUMANOS, SEGURANÇA E DIVERSIDADE",
                "chs": 3,
                "cht": 45,
                "dependencies": [],
                "groupId": "[1179]",
                "period": 3,
                "type": "humanities",
                "x": 70,
                "y": 75.0
            },
            {
                "id": "FCH7XF",
                "name": "DIMENSÃO AMBIENTAL NA GESTÃO URBANA",
                "chs": 3,
                "cht": 45,
                "dependencies": [],
                "groupId": "[1179]",
                "period": 3,
                "type": "humanities",
                "x": 90,
                "y": 75.0
            },
            {
                "id": "FCH7XG",
                "name": "TECNOPOLÍTICAS DA SOCIEDADE CONTEMPORÂNEA",
                "chs": 3,
                "cht": 45,
                "dependencies": [],
                "groupId": "[1179]",
                "period": 3,
                "type": "humanities",
                "x": 10,
                "y": 85.0
            },
            {
                "id": "GEE7A1",
                "name": "FUNDAMENTOS DE ADMINISTRAÇÃO",
                "chs": 3,
                "cht": 45,
                "dependencies": [],
                "groupId": "[1179]",
                "period": 3,
                "type": "humanities",
                "x": 30,
                "y": 85.0
            },
            {
                "id": "GEE7E3",
                "name": "FUNDAMENTOS DE ECONOMIA",
                "chs": 2,
                "cht": 30,
                "dependencies": [],
                "groupId": "[1179]",
                "period": 3,
                "type": "humanities",
                "x": 50,
                "y": 85.0
            },
            {
                "id": "GEE7F1",
                "name": "FUNDAMENTOS DE FINANÇAS",
                "chs": 4,
                "cht": 60,
                "dependencies": [],
                "groupId": "[1179]",
                "period": 3,
                "type": "humanities",
                "x": 70,
                "y": 85.0
            },
            {
                "id": "GEE7G1",
                "name": "FUNDAMENTOS DE GESTÃO DE PESSOAS",
                "chs": 3,
                "cht": 45,
                "dependencies": [],
                "groupId": "[1179]",
                "period": 3,
                "type": "humanities",
                "x": 90,
                "y": 85.0
            },
            {
                "id": "GEE7M1",
                "name": "FUNDAMENTOS DE MARKETING",
                "chs": 3,
                "cht": 45,
                "dependencies": [],
                "groupId": "[1179]",
                "period": 3,
                "type": "humanities",
                "x": 10,
                "y": 95.0
            }
        ];

const allOptionalNodesData = [
            {
                "id": "MEC7EX1",
                "name": "Disciplina Extensionista A",
                "dependencies": [],
                "period": 3,
                "cht": 105,
                "x": 10,
                "y": 10,
                "type": "optional",
                "groupId": "[1234]"
            },
            {
                "id": "MEC7EX2",
                "name": "Disciplina Extensionista B",
                "dependencies": [
                    "MEC7EX1"
                ],
                "period": 3,
                "cht": 105,
                "x": 22,
                "y": 10,
                "type": "optional",
                "groupId": "[1234]"
            },
            {
                "id": "MEC7EX3",
                "name": "Disciplina Extensionista C",
                "dependencies": [
                    "MEC7EX2"
                ],
                "period": 3,
                "cht": 105,
                "x": 34,
                "y": 10,
                "type": "optional",
                "groupId": "[1234]"
            },
            {
                "id": "MEC7EX4",
                "name": "Disciplina Extensionista D",
                "dependencies": [
                    "MEC7EX3"
                ],
                "period": 3,
                "cht": 105,
                "x": 46,
                "y": 10,
                "type": "optional",
                "groupId": "[1234]"
            },
            {
                "id": "ELH04",
                "name": "INOVAÇÃO TECNOLÓGICA E FINANCIAMENTO",
                "dependencies": [],
                "period": 3,
                "cht": 60,
                "x": 58,
                "y": 10,
                "type": "optional",
                "groupId": "[1178]"
            },
            {
                "id": "ELN75C",
                "name": "INSTRUMENTAÇÃO INDUSTRIAL",
                "dependencies": [],
                "period": 3,
                "cht": 60,
                "x": 70,
                "y": 10,
                "type": "optional",
                "groupId": "[1178]"
            },
            {
                "id": "ELTE2",
                "name": "PROGRAMAÇÃO MATEMÁTICA",
                "dependencies": [],
                "period": 3,
                "cht": 60,
                "x": 82,
                "y": 10,
                "type": "optional",
                "groupId": "[1178]"
            },
            {
                "id": "FIS7E2",
                "name": "FÍSICA EXPERIMENTAL 2",
                "dependencies": [],
                "period": 3,
                "cht": 30,
                "x": 94,
                "y": 10,
                "type": "optional",
                "groupId": "[1178]"
            },
            {
                "id": "FIS7F4",
                "name": "FÍSICA TEÓRICA 4",
                "dependencies": [],
                "period": 3,
                "cht": 60,
                "x": 10,
                "y": 17,
                "type": "optional",
                "groupId": "[1178]"
            },
            {
                "id": "MAT7AA",
                "name": "ÁLGEBRA LINEAR AVANÇADA",
                "dependencies": [],
                "period": 3,
                "cht": 60,
                "x": 22,
                "y": 17,
                "type": "optional",
                "groupId": "[1178]"
            },
            {
                "id": "MAT7FZ",
                "name": "ANÁLISE DE FOURIER E TRANSFORMADA Z",
                "dependencies": [],
                "period": 3,
                "cht": 60,
                "x": 34,
                "y": 17,
                "type": "optional",
                "groupId": "[1178]"
            },
            {
                "id": "MAT7IA",
                "name": "INTRODUÇÃO À ANÁLISE",
                "dependencies": [],
                "period": 3,
                "cht": 60,
                "x": 46,
                "y": 17,
                "type": "optional",
                "groupId": "[1178]"
            },
            {
                "id": "MAT7PC",
                "name": "PRÉ-CÁLCULO",
                "dependencies": [],
                "period": 3,
                "cht": 60,
                "x": 58,
                "y": 17,
                "type": "optional",
                "groupId": "[1178]"
            },
            {
                "id": "MAT7PO",
                "name": "PESQUISA OPERACIONAL",
                "dependencies": [],
                "period": 3,
                "cht": 60,
                "x": 70,
                "y": 17,
                "type": "optional",
                "groupId": "[1178]"
            },
            {
                "id": "MAT7VC",
                "name": "VARIÁVEIS COMPLEXAS",
                "dependencies": [],
                "period": 3,
                "cht": 60,
                "x": 82,
                "y": 17,
                "type": "optional",
                "groupId": "[1178]"
            },
            {
                "id": "MEC7AC",
                "name": "MANUFATURA ADITIVA",
                "dependencies": [],
                "period": 3,
                "cht": 45,
                "x": 94,
                "y": 17,
                "type": "optional",
                "groupId": "[1178]"
            },
            {
                "id": "MEC7AF",
                "name": "PROGRAMAÇÃO DE ROBÔS",
                "dependencies": [],
                "period": 3,
                "cht": 30,
                "x": 10,
                "y": 24,
                "type": "optional",
                "groupId": "[1178]"
            },
            {
                "id": "MEC7AG",
                "name": "CONTROLE ESTATÍSTICO DE PROCESSO",
                "dependencies": [],
                "period": 3,
                "cht": 60,
                "x": 22,
                "y": 24,
                "type": "optional",
                "groupId": "[1178]"
            },
            {
                "id": "MEC7AH",
                "name": "SIMULAÇÃO",
                "dependencies": [],
                "period": 3,
                "cht": 45,
                "x": 34,
                "y": 24,
                "type": "optional",
                "groupId": "[1178]"
            },
            {
                "id": "MEC7AI",
                "name": "TECNOLOGIA ASSISTIVA",
                "dependencies": [],
                "period": 3,
                "cht": 45,
                "x": 46,
                "y": 24,
                "type": "optional",
                "groupId": "[1178]"
            },
            {
                "id": "MEC7AJ",
                "name": "MANUFATURA AVANÇADA E INDÚSTRIA 4.0",
                "dependencies": [],
                "period": 3,
                "cht": 60,
                "x": 58,
                "y": 24,
                "type": "optional",
                "groupId": "[1178]"
            },
            {
                "id": "MEC7BA",
                "name": "DINÂMICA DOS FLUIDOS COMPUTACIONAL APLICADA",
                "dependencies": [
                    "MEC77G"
                ],
                "period": 3,
                "cht": 45,
                "x": 70,
                "y": 24,
                "type": "optional",
                "groupId": "[1178]"
            },
            {
                "id": "MEC7BB",
                "name": "DINÂMICA DOS MATERIAIS POLIMÉRICOS",
                "dependencies": [
                    "MEC75G"
                ],
                "period": 3,
                "cht": 30,
                "x": 82,
                "y": 24,
                "type": "optional",
                "groupId": "[1178]"
            },
            {
                "id": "MEC7BC",
                "name": "ESCOAMENTO DE ÓLEO E GÁS EM TUBULAÇÕES",
                "dependencies": [
                    "MEC75G"
                ],
                "period": 3,
                "cht": 45,
                "x": 94,
                "y": 24,
                "type": "optional",
                "groupId": "[1178]"
            },
            {
                "id": "MEC7BD",
                "name": "FUNDAMENTOS DE COMBUSTÃO",
                "dependencies": [
                    "MEC75F"
                ],
                "period": 3,
                "cht": 45,
                "x": 10,
                "y": 31,
                "type": "optional",
                "groupId": "[1178]"
            },
            {
                "id": "MEC7BE",
                "name": "FUNDAMENTOS DE ENGENHARIA DE PETRÓLEO",
                "dependencies": [
                    "MEC74E"
                ],
                "period": 3,
                "cht": 45,
                "x": 22,
                "y": 31,
                "type": "optional",
                "groupId": "[1178]"
            },
            {
                "id": "MEC7BF",
                "name": "FUNDAMENTOS E APLICAÇÕES DE MICRO E NANOFLUIDODINÂMICA",
                "dependencies": [
                    "MEC76H"
                ],
                "period": 3,
                "cht": 30,
                "x": 34,
                "y": 31,
                "type": "optional",
                "groupId": "[1178]"
            },
            {
                "id": "MEC7BG",
                "name": "INTRODUÇÃO À DINÂMICA DOS FLUIDOS",
                "dependencies": [
                    "MEC76H"
                ],
                "period": 3,
                "cht": 30,
                "x": 46,
                "y": 31,
                "type": "optional",
                "groupId": "[1178]"
            },
            {
                "id": "MEC7BH",
                "name": "INTRODUÇÃO À DINÂMICA DOS FLUIDOS COMPUTACIONAL",
                "dependencies": [
                    "MEC76G",
                    "MEC76H"
                ],
                "period": 3,
                "cht": 45,
                "x": 58,
                "y": 31,
                "type": "optional",
                "groupId": "[1178]"
            },
            {
                "id": "MEC7BI",
                "name": "MÁQUINAS DE FLUXO",
                "dependencies": [
                    "MEC75G"
                ],
                "period": 3,
                "cht": 45,
                "x": 70,
                "y": 31,
                "type": "optional",
                "groupId": "[1178]"
            },
            {
                "id": "MEC7BJ",
                "name": "MEIOS POROSOS: CONCEITOS E APLICAÇÕES NA ENGENHARIA",
                "dependencies": [
                    "MEC75G",
                    "MEC76G"
                ],
                "period": 3,
                "cht": 30,
                "x": 82,
                "y": 31,
                "type": "optional",
                "groupId": "[1178]"
            },
            {
                "id": "MEC7BK",
                "name": "MOTORES DE COMBUSTÃO INTERNA",
                "dependencies": [
                    "MEC75F"
                ],
                "period": 3,
                "cht": 45,
                "x": 94,
                "y": 31,
                "type": "optional",
                "groupId": "[1178]"
            },
            {
                "id": "MEC7BL",
                "name": "PRINCÍPIOS DE REFRIGERAÇÃO",
                "dependencies": [
                    "MEC75F",
                    "MEC77G"
                ],
                "period": 3,
                "cht": 45,
                "x": 10,
                "y": 38,
                "type": "optional",
                "groupId": "[1178]"
            },
            {
                "id": "MEC7BM",
                "name": "PROJETO DE INSTALAÇÕES DE CONDICIONAMENTO DE AR",
                "dependencies": [
                    "MEC75F",
                    "MEC77G"
                ],
                "period": 3,
                "cht": 45,
                "x": 22,
                "y": 38,
                "type": "optional",
                "groupId": "[1178]"
            },
            {
                "id": "MEC7BN",
                "name": "REOLOGIA APLICADA À ENGENHARIA DE PETRÓLEO",
                "dependencies": [
                    "MEC76H"
                ],
                "period": 3,
                "cht": 30,
                "x": 34,
                "y": 38,
                "type": "optional",
                "groupId": "[1178]"
            },
            {
                "id": "MEC7BO",
                "name": "SIMULAÇÃO A EVENTOS DISCRETOS",
                "dependencies": [
                    "MEC7CL"
                ],
                "period": 3,
                "cht": 30,
                "x": 46,
                "y": 38,
                "type": "optional",
                "groupId": "[1178]"
            },
            {
                "id": "MEC7BP",
                "name": "SIMULAÇÃO AVANÇADA A EVENTOS DISCRETOS-CONTÍNUOS",
                "dependencies": [
                    "MEC7BO"
                ],
                "period": 3,
                "cht": 30,
                "x": 58,
                "y": 38,
                "type": "optional",
                "groupId": "[1178]"
            },
            {
                "id": "MEC7BQ",
                "name": "SIMULAÇÃO E OTIMIZAÇÃO DE SISTEMAS TÉRMICOS",
                "dependencies": [
                    "MEC75F",
                    "MEC77G"
                ],
                "period": 3,
                "cht": 45,
                "x": 70,
                "y": 38,
                "type": "optional",
                "groupId": "[1178]"
            },
            {
                "id": "MEC7BR",
                "name": "SISTEMAS DE POTENCIA DE VAPOR",
                "dependencies": [
                    "MEC75F",
                    "MEC77G"
                ],
                "period": 3,
                "cht": 45,
                "x": 82,
                "y": 38,
                "type": "optional",
                "groupId": "[1178]"
            },
            {
                "id": "MEC7BS",
                "name": "TÓPICOS EM SISTEMAS TERMOFLUIDOMECÂNICOS 1",
                "dependencies": [
                    "MEC77G"
                ],
                "period": 3,
                "cht": 45,
                "x": 94,
                "y": 38,
                "type": "optional",
                "groupId": "[1178]"
            },
            {
                "id": "MEC7BT",
                "name": "TÓPICOS EM SISTEMAS TERMOFLUIDOMECÂNICOS 2",
                "dependencies": [
                    "MEC77G"
                ],
                "period": 3,
                "cht": 30,
                "x": 10,
                "y": 45,
                "type": "optional",
                "groupId": "[1178]"
            },
            {
                "id": "MEC7BU",
                "name": "TROCADORES DE CALOR",
                "dependencies": [
                    "MEC77G"
                ],
                "period": 3,
                "cht": 45,
                "x": 22,
                "y": 45,
                "type": "optional",
                "groupId": "[1178]"
            },
            {
                "id": "MEC7CA",
                "name": "ESTRATÉGIA DE OPERAÇÕES",
                "dependencies": [
                    "MEC76D"
                ],
                "period": 3,
                "cht": 45,
                "x": 34,
                "y": 45,
                "type": "optional",
                "groupId": "[1178]"
            },
            {
                "id": "MEC7CB",
                "name": "ESTUDO DE MÉTODOS E TEMPOS",
                "dependencies": [
                    "MEC7CL"
                ],
                "period": 3,
                "cht": 45,
                "x": 46,
                "y": 45,
                "type": "optional",
                "groupId": "[1178]"
            },
            {
                "id": "MEC7CC",
                "name": "GESTÃO DA CADEIA DE SUPRIMENTOS",
                "dependencies": [
                    "MEC7CF"
                ],
                "period": 3,
                "cht": 45,
                "x": 58,
                "y": 45,
                "type": "optional",
                "groupId": "[1178]"
            },
            {
                "id": "MEC7CD",
                "name": "GESTÃO DE OPERAÇÕES",
                "dependencies": [],
                "period": 3,
                "cht": 30,
                "x": 70,
                "y": 45,
                "type": "optional",
                "groupId": "[1178]"
            },
            {
                "id": "MEC7CE",
                "name": "INDICADORES DE DESEMPENHO INDUSTRIAL",
                "dependencies": [
                    "MEC76D"
                ],
                "period": 3,
                "cht": 45,
                "x": 82,
                "y": 45,
                "type": "optional",
                "groupId": "[1178]"
            },
            {
                "id": "MEC7CF",
                "name": "LOGÍSTICA",
                "dependencies": [
                    "MEC7CL"
                ],
                "period": 3,
                "cht": 60,
                "x": 94,
                "y": 45,
                "type": "optional",
                "groupId": "[1178]"
            },
            {
                "id": "MEC7CG",
                "name": "META-HEURÍSTICAS EM PESQUISA OPERACIONAL",
                "dependencies": [
                    "MEC7CI"
                ],
                "period": 3,
                "cht": 60,
                "x": 10,
                "y": 52,
                "type": "optional",
                "groupId": "[1178]"
            },
            {
                "id": "MEC7CH",
                "name": "MODELAGEM DE SISTEMAS DE MANUFATURA",
                "dependencies": [
                    "MEC76D"
                ],
                "period": 3,
                "cht": 60,
                "x": 22,
                "y": 52,
                "type": "optional",
                "groupId": "[1178]"
            },
            {
                "id": "MEC7CI",
                "name": "PESQUISA OPERACIONAL 1",
                "dependencies": [
                    "INF71A",
                    "MAT7AL",
                    "MAT7GA"
                ],
                "period": 3,
                "cht": 60,
                "x": 34,
                "y": 52,
                "type": "optional",
                "groupId": "[1178]"
            },
            {
                "id": "MEC7CJ",
                "name": "PESQUISA OPERACIONAL 2",
                "dependencies": [
                    "MEC7CI"
                ],
                "period": 3,
                "cht": 60,
                "x": 46,
                "y": 52,
                "type": "optional",
                "groupId": "[1178]"
            },
            {
                "id": "MEC7CK",
                "name": "PESQUISA OPERACIONAL APLICADA A ESTUDO DE CASO",
                "dependencies": [
                    "MEC7CI"
                ],
                "period": 3,
                "cht": 60,
                "x": 58,
                "y": 52,
                "type": "optional",
                "groupId": "[1178]"
            },
            {
                "id": "MEC7CL",
                "name": "PLANEJAMENTO E CONTROLE DA PRODUÇÃO 1",
                "dependencies": [
                    "MEC7CD"
                ],
                "period": 3,
                "cht": 45,
                "x": 70,
                "y": 52,
                "type": "optional",
                "groupId": "[1178]"
            },
            {
                "id": "MEC7CM",
                "name": "PLANEJAMENTO E CONTROLE DA PRODUÇÃO 2",
                "dependencies": [
                    "MEC7CL"
                ],
                "period": 3,
                "cht": 45,
                "x": 82,
                "y": 52,
                "type": "optional",
                "groupId": "[1178]"
            },
            {
                "id": "MEC7CN",
                "name": "PLANEJAMENTO ESTRATÉGICO",
                "dependencies": [],
                "period": 3,
                "cht": 30,
                "x": 94,
                "y": 52,
                "type": "optional",
                "groupId": "[1178]"
            },
            {
                "id": "MEC7CO",
                "name": "PRODUÇÃO ENXUTA",
                "dependencies": [
                    "MEC76D"
                ],
                "period": 3,
                "cht": 60,
                "x": 10,
                "y": 59,
                "type": "optional",
                "groupId": "[1178]"
            },
            {
                "id": "MEC7CP",
                "name": "SISTEMAS FLEXÍVEIS DE MANUFATURA",
                "dependencies": [
                    "MEC7HF"
                ],
                "period": 3,
                "cht": 60,
                "x": 22,
                "y": 59,
                "type": "optional",
                "groupId": "[1178]"
            },
            {
                "id": "MEC7DA",
                "name": "CARACTERIZAÇÃO E ANÁLISE DE FALHAS DE MATERIAIS",
                "dependencies": [
                    "MEC72B"
                ],
                "period": 3,
                "cht": 45,
                "x": 34,
                "y": 59,
                "type": "optional",
                "groupId": "[1178]"
            },
            {
                "id": "MEC7DB",
                "name": "ENSAIOS NÃO DESTRUTIVOS",
                "dependencies": [
                    "MEC74F"
                ],
                "period": 3,
                "cht": 30,
                "x": 46,
                "y": 59,
                "type": "optional",
                "groupId": "[1178]"
            },
            {
                "id": "MEC7DC",
                "name": "FALHAS MECÂNICAS POR DESGASTE",
                "dependencies": [
                    "MEC74F"
                ],
                "period": 3,
                "cht": 45,
                "x": 58,
                "y": 59,
                "type": "optional",
                "groupId": "[1178]"
            },
            {
                "id": "MEC7DD",
                "name": "FUNDAMENTOS DE CORROSÃO",
                "dependencies": [
                    "MEC72B"
                ],
                "period": 3,
                "cht": 45,
                "x": 70,
                "y": 59,
                "type": "optional",
                "groupId": "[1178]"
            },
            {
                "id": "MEC7DE",
                "name": "FUNDAMENTOS DE DESGASTE",
                "dependencies": [
                    "MEC72B"
                ],
                "period": 3,
                "cht": 60,
                "x": 82,
                "y": 59,
                "type": "optional",
                "groupId": "[1178]"
            },
            {
                "id": "MEC7DG",
                "name": "MECÂNICA DOS MATERIAIS COMPÓSITOS",
                "dependencies": [
                    "MEC76E"
                ],
                "period": 3,
                "cht": 60,
                "x": 94,
                "y": 59,
                "type": "optional",
                "groupId": "[1178]"
            },
            {
                "id": "MEC7DH",
                "name": "METAIS NÃO FERROSOS",
                "dependencies": [
                    "MEC74F"
                ],
                "period": 3,
                "cht": 30,
                "x": 10,
                "y": 66,
                "type": "optional",
                "groupId": "[1178]"
            },
            {
                "id": "MEC7DI",
                "name": "METALURGIA DO PÓ",
                "dependencies": [
                    "MEC73D"
                ],
                "period": 3,
                "cht": 45,
                "x": 22,
                "y": 66,
                "type": "optional",
                "groupId": "[1178]"
            },
            {
                "id": "MEC7DJ",
                "name": "PROCESSAMENTO DE MATERIAIS CERÂMICOS",
                "dependencies": [
                    "MEC74G"
                ],
                "period": 3,
                "cht": 60,
                "x": 34,
                "y": 66,
                "type": "optional",
                "groupId": "[1178]"
            },
            {
                "id": "MEC7DK",
                "name": "PROCESSAMENTO DE MATERIAIS POLIMÉRICOS",
                "dependencies": [
                    "MEC74G"
                ],
                "period": 3,
                "cht": 60,
                "x": 46,
                "y": 66,
                "type": "optional",
                "groupId": "[1178]"
            },
            {
                "id": "MEC7DL",
                "name": "REVESTIMENTOS POR SOLDAGEM E ESPERSÃO TÉRMICA",
                "dependencies": [
                    "MEC75D"
                ],
                "period": 3,
                "cht": 45,
                "x": 58,
                "y": 66,
                "type": "optional",
                "groupId": "[1178]"
            },
            {
                "id": "MEC7DM",
                "name": "SELEÇÃO DE MATERIAIS",
                "dependencies": [
                    "MEC74F"
                ],
                "period": 3,
                "cht": 45,
                "x": 70,
                "y": 66,
                "type": "optional",
                "groupId": "[1178]"
            },
            {
                "id": "MEC7DN",
                "name": "SOLDAGEM DE AÇOS INOXIDÁVEIS",
                "dependencies": [
                    "MEC75D"
                ],
                "period": 3,
                "cht": 45,
                "x": 82,
                "y": 66,
                "type": "optional",
                "groupId": "[1178]"
            },
            {
                "id": "MEC7DO",
                "name": "TRATAMENTO DE MATERIAIS POR PLASMA",
                "dependencies": [
                    "MEC73D"
                ],
                "period": 3,
                "cht": 45,
                "x": 94,
                "y": 66,
                "type": "optional",
                "groupId": "[1178]"
            },
            {
                "id": "MEC7DP",
                "name": "TRATAMENTOS DE SUPERFÍCIE",
                "dependencies": [
                    "MEC73D"
                ],
                "period": 3,
                "cht": 45,
                "x": 10,
                "y": 73,
                "type": "optional",
                "groupId": "[1178]"
            },
            {
                "id": "MEC7EA",
                "name": "ANÁLISE DE SUPERFÍCIES USINADAS",
                "dependencies": [
                    "MEC77B"
                ],
                "period": 3,
                "cht": 60,
                "x": 22,
                "y": 73,
                "type": "optional",
                "groupId": "[1178]"
            },
            {
                "id": "MEC7EB",
                "name": "APRENDIZAGEM BASEADA EM PROJETOS 1",
                "dependencies": [],
                "period": 3,
                "cht": 105,
                "x": 34,
                "y": 73,
                "type": "optional",
                "groupId": "[1178]"
            },
            {
                "id": "MEC7EC",
                "name": "APRENDIZAGEM BASEADA EM PROJETOS 2",
                "dependencies": [
                    "MEC7EB"
                ],
                "period": 3,
                "cht": 135,
                "x": 46,
                "y": 73,
                "type": "optional",
                "groupId": "[1178]"
            },
            {
                "id": "MEC7ED",
                "name": "FABRICAÇÃO AUXILIADA POR COMPUTADOR (CAD/CAM)",
                "dependencies": [
                    "MEC77B"
                ],
                "period": 3,
                "cht": 60,
                "x": 58,
                "y": 73,
                "type": "optional",
                "groupId": "[1178]"
            },
            {
                "id": "MEC7EE",
                "name": "GESTÃO DE CARREIRA",
                "dependencies": [],
                "period": 3,
                "cht": 60,
                "x": 70,
                "y": 73,
                "type": "optional",
                "groupId": "[1178]"
            },
            {
                "id": "MEC7EF",
                "name": "PROCESSOS DE USINAGEM NÃO CONVENCIONAIS",
                "dependencies": [
                    "MEC75E"
                ],
                "period": 3,
                "cht": 45,
                "x": 82,
                "y": 73,
                "type": "optional",
                "groupId": "[1178]"
            },
            {
                "id": "MEC7EG",
                "name": "PROJETO INTEGRADOR EM FABRICAÇÃO",
                "dependencies": [
                    "MEC74B",
                    "MEC74C",
                    "MEC74D",
                    "MEC75D",
                    "MEC77B"
                ],
                "period": 3,
                "cht": 60,
                "x": 94,
                "y": 73,
                "type": "optional",
                "groupId": "[1178]"
            },
            {
                "id": "MEC7EH",
                "name": "PROJETO INTEGRADOR EM MANUFATURA",
                "dependencies": [
                    "MEC78C"
                ],
                "period": 3,
                "cht": 60,
                "x": 10,
                "y": 80,
                "type": "optional",
                "groupId": "[1178]"
            },
            {
                "id": "MEC7EI",
                "name": "TECNOLOGIAS DE PROTOTIPAGEM RÁPIDA",
                "dependencies": [
                    "MEC73A"
                ],
                "period": 3,
                "cht": 60,
                "x": 22,
                "y": 80,
                "type": "optional",
                "groupId": "[1178]"
            },
            {
                "id": "MEC7EJ",
                "name": "USINAGEM ABRASIVA",
                "dependencies": [
                    "MEC75E"
                ],
                "period": 3,
                "cht": 60,
                "x": 34,
                "y": 80,
                "type": "optional",
                "groupId": "[1178]"
            },
            {
                "id": "MEC7EK",
                "name": "USINAGEM DE ENGRENAGENS",
                "dependencies": [
                    "MEC74B",
                    "MEC75E"
                ],
                "period": 3,
                "cht": 60,
                "x": 46,
                "y": 80,
                "type": "optional",
                "groupId": "[1178]"
            },
            {
                "id": "MEC7FA",
                "name": "FUNDAMENTALS OF WIND ENERGY",
                "dependencies": [],
                "period": 3,
                "cht": 60,
                "x": 58,
                "y": 80,
                "type": "optional",
                "groupId": "[1178]"
            },
            {
                "id": "MEC7FB",
                "name": "FUDAMENTOS DE ACÚSTICA",
                "dependencies": [
                    "MEC77E"
                ],
                "period": 3,
                "cht": 60,
                "x": 70,
                "y": 80,
                "type": "optional",
                "groupId": "[1178]"
            },
            {
                "id": "MEC7FC",
                "name": "MECÂNICA DA FRATURA E FADIGA",
                "dependencies": [
                    "MEC76E"
                ],
                "period": 3,
                "cht": 60,
                "x": 82,
                "y": 80,
                "type": "optional",
                "groupId": "[1178]"
            },
            {
                "id": "MEC7FD",
                "name": "MÉTODOS DE OTIMIZAÇÃO APLICADOS À ENGENHARIA",
                "dependencies": [
                    "MEC78G"
                ],
                "period": 3,
                "cht": 60,
                "x": 94,
                "y": 80,
                "type": "optional",
                "groupId": "[1178]"
            },
            {
                "id": "MEC7FE",
                "name": "MÉTODOS DOS ELEMENTOS FINITOS PARA MECÂNICA ESTRUTURAL",
                "dependencies": [
                    "MEC76E"
                ],
                "period": 3,
                "cht": 60,
                "x": 10,
                "y": 87,
                "type": "optional",
                "groupId": "[1178]"
            },
            {
                "id": "MEC7FF",
                "name": "MÉTODOS EXPERIMENTAIS EM ACÚSTICA",
                "dependencies": [
                    "MEC77E"
                ],
                "period": 3,
                "cht": 60,
                "x": 22,
                "y": 87,
                "type": "optional",
                "groupId": "[1178]"
            },
            {
                "id": "MEC7FG",
                "name": "MÉTODOS NUMÉRICOS",
                "dependencies": [
                    "MEC76E"
                ],
                "period": 3,
                "cht": 60,
                "x": 34,
                "y": 87,
                "type": "optional",
                "groupId": "[1178]"
            },
            {
                "id": "MEC7FH",
                "name": "TRIBOLOGIA DE ELEMENTOS DE MÁQUINAS 1",
                "dependencies": [
                    "MEC77A"
                ],
                "period": 3,
                "cht": 60,
                "x": 46,
                "y": 87,
                "type": "optional",
                "groupId": "[1178]"
            },
            {
                "id": "MEC7FI",
                "name": "TRIBOLOGIA DE ELEMENTOS DE MÁQUINAS 2",
                "dependencies": [
                    "MEC77A"
                ],
                "period": 3,
                "cht": 60,
                "x": 58,
                "y": 87,
                "type": "optional",
                "groupId": "[1178]"
            },
            {
                "id": "MEC7GA",
                "name": "BOLSA DE VALORES E MERCADO DE CAPITAIS",
                "dependencies": [],
                "period": 3,
                "cht": 45,
                "x": 70,
                "y": 87,
                "type": "optional",
                "groupId": "[1178]"
            },
            {
                "id": "MEC7GB",
                "name": "CRIATIVIDADE E INOVAÇÃO",
                "dependencies": [
                    "MEC78G"
                ],
                "period": 3,
                "cht": 45,
                "x": 82,
                "y": 87,
                "type": "optional",
                "groupId": "[1178]"
            },
            {
                "id": "MEC7GC",
                "name": "MÉTODOS PARA PROJETO DE PRODUTO",
                "dependencies": [
                    "MEC78G"
                ],
                "period": 3,
                "cht": 45,
                "x": 94,
                "y": 87,
                "type": "optional",
                "groupId": "[1178]"
            },
            {
                "id": "MEC7GD",
                "name": "MODELAGEM GEOMÉTRICA AVANÇADA",
                "dependencies": [
                    "MEC73A"
                ],
                "period": 3,
                "cht": 60,
                "x": 10,
                "y": 94,
                "type": "optional",
                "groupId": "[1178]"
            },
            {
                "id": "MEC7GE",
                "name": "PRODUÇÃO ENXUTA: FERRAMENTAS",
                "dependencies": [
                    "MEC76D"
                ],
                "period": 3,
                "cht": 45,
                "x": 22,
                "y": 94,
                "type": "optional",
                "groupId": "[1178]"
            },
            {
                "id": "MEC7GF",
                "name": "SIMULAÇÃO DE PROJETOS MECÂNICOS",
                "dependencies": [
                    "MEC76A"
                ],
                "period": 3,
                "cht": 60,
                "x": 34,
                "y": 94,
                "type": "optional",
                "groupId": "[1178]"
            },
            {
                "id": "MEC7HA",
                "name": "ANÁLISE EXPERIMENTAL DE TENSÕES",
                "dependencies": [
                    "MEC72B",
                    "MEC76E"
                ],
                "period": 3,
                "cht": 30,
                "x": 46,
                "y": 94,
                "type": "optional",
                "groupId": "[1178]"
            },
            {
                "id": "MEC7HB",
                "name": "AVALIAÇÃO DO CICLO DE VIDA",
                "dependencies": [
                    "MEC79D"
                ],
                "period": 3,
                "cht": 30,
                "x": 58,
                "y": 94,
                "type": "optional",
                "groupId": "[1178]"
            },
            {
                "id": "MEC7HC",
                "name": "ENGENHARIA DA QUALIDADE",
                "dependencies": [
                    "MEC79E"
                ],
                "period": 3,
                "cht": 45,
                "x": 70,
                "y": 94,
                "type": "optional",
                "groupId": "[1178]"
            },
            {
                "id": "MEC7HD",
                "name": "ENGENHARIA ERGONÔMICA",
                "dependencies": [
                    "MEC77C"
                ],
                "period": 3,
                "cht": 45,
                "x": 82,
                "y": 94,
                "type": "optional",
                "groupId": "[1178]"
            },
            {
                "id": "MEC7HE",
                "name": "MEDIÇÕES DE GRANDEZAS MECÂNICAS",
                "dependencies": [
                    "MEC74B"
                ],
                "period": 3,
                "cht": 30,
                "x": 94,
                "y": 94,
                "type": "optional",
                "groupId": "[1178]"
            },
            {
                "id": "MEC7HF",
                "name": "AUTOMAÇÃO DA PRODUÇÃO",
                "dependencies": [
                    "MEC79E"
                ],
                "period": 3,
                "cht": 30,
                "x": 10,
                "y": 101,
                "type": "optional",
                "groupId": "[1178]"
            },
            {
                "id": "MEC7HG",
                "name": "PNEUMÁTICA E HIDRÁULICA 2",
                "dependencies": [
                    "MEC76C"
                ],
                "period": 3,
                "cht": 60,
                "x": 22,
                "y": 101,
                "type": "optional",
                "groupId": "[1178]"
            },
            {
                "id": "MEC7HH",
                "name": "VISÃO DE MÁQUINA NA INDÚSTRIA",
                "dependencies": [],
                "period": 3,
                "cht": 60,
                "x": 34,
                "y": 101,
                "type": "optional",
                "groupId": "[1178]"
            },
            {
                "id": "MEC78A",
                "name": "MANUFATURA INTEGRADA",
                "dependencies": [],
                "period": 3,
                "cht": 60,
                "x": 46,
                "y": 101,
                "type": "optional",
                "groupId": "[1178]"
            },
            {
                "id": "QBI7QE",
                "name": "QUÍMICA GERAL EXPERIMENTAL",
                "dependencies": [],
                "period": 3,
                "cht": 30,
                "x": 58,
                "y": 101,
                "type": "optional",
                "groupId": "[1178]"
            },
            {
                "id": "QBI7QT",
                "name": "QUÍMICA GERAL TEÓRICA",
                "dependencies": [],
                "period": 3,
                "cht": 60,
                "x": 70,
                "y": 101,
                "type": "optional",
                "groupId": "[1178]"
            }
        ];

export { TOTAL_COMPLEMENTARY_HOURS, TOTAL_EXTENSION_HOURS, TOTAL_HUMANITIES_HOURS, TOTAL_OPTIONAL_HOURS, NODE_WIDTH, NODE_HEIGHT, OPTIONAL_LAYOUT_MIN_X, OPTIONAL_LAYOUT_MAX_X, OPTIONAL_LAYOUT_MIN_Y, OPTIONAL_LAYOUT_MAX_Y, SPECIALIZATION_TRACKS, OPTIONAL_GROUPS_CONFIG, allNodesData, allHumanitiesData, allOptionalNodesData };
