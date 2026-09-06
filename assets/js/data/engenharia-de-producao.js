const TOTAL_MANDATORY_HOURS = 2700;

const TOTAL_EXTENSION_HOURS = 360;

const TOTAL_HUMANITIES_HOURS = 165;

const TOTAL_OPTIONAL_HOURS = 375;

const TOTAL_COMPLEMENTARY_HOURS = 60;

const TOTAL_DEGREE_HOURS = 3600;

const NODE_WIDTH = 130;

const NODE_HEIGHT = 90;

const OPTIONAL_LAYOUT_MIN_X = 10;

const OPTIONAL_LAYOUT_MAX_X = 92;

const OPTIONAL_LAYOUT_MIN_Y = 6;

const OPTIONAL_LAYOUT_MAX_Y = 94;

const SPECIALIZATION_TRACKS = {
            "Ciência de Dados & Estatística Aplicada": [
                        "EST7BF",
                        "EST7AA",
                        "EST7AB",
                        "EST7AC",
                        "EST7AD",
                        "EST7AJ",
                        "EST7AK",
                        "EST7AL",
                        "EST7AM",
                        "EST7AN",
                        "EST7AO",
                        "EST7AQ",
                        "EST7AU",
                        "EST7AW",
                        "EST7AX",
                        "EST7AY",
                        "EST7AZ",
                        "EST7BA",
                        "EST7BB",
                        "EST7BC",
                        "EST7BD",
                        "EST7BG",
                        "EST7BH",
                        "EST7BI",
                        "EST7BJ",
                        "EST7BL",
                        "EST7BN",
                        "EST7BP"
            ],
            "Engenharia de Operações, Logística & Pesquisa Operacional": [
                        "MEC7AG",
                        "MEC7BO",
                        "MEC7BP",
                        "MEC7CA",
                        "MEC7CB",
                        "MEC7CC",
                        "MEC7CG",
                        "MEC7CJ",
                        "MEC7CK",
                        "MEC7CM",
                        "MEC7CN",
                        "MEC7CP",
                        "MEC7HB",
                        "MEC7HC",
                        "MEC7HD",
                        "MECP7AA"
            ],
            "Engenharia de Materiais & Manufatura Avançada": [
                        "MECP7AB",
                        "MEC7DA",
                        "MEC7DB",
                        "MEC7DD",
                        "MEC7DE",
                        "MEC7DG",
                        "MEC7DH",
                        "MEC7DI",
                        "MEC7DJ",
                        "MEC7DK",
                        "MEC7DL",
                        "MEC7DM",
                        "MEC7DN",
                        "MEC7DO",
                        "MEC7DP",
                        "MEC7EA",
                        "MEC7ED",
                        "MEC7EF",
                        "MEC7EI",
                        "MEC7EJ",
                        "MEC73D",
                        "MEC74F",
                        "MEC74G",
                        "MEC77B"
            ],
            "Sistemas Mecânicos, Térmicos & Fluidos": [
                        "MEC7AI",
                        "MEC7BA",
                        "MEC7BB",
                        "MEC7BC",
                        "MEC7BE",
                        "MEC7BF",
                        "MEC7BG",
                        "MEC7BH",
                        "MEC7BI",
                        "MEC7BJ",
                        "MEC7BK",
                        "MEC7BL",
                        "MEC7BM",
                        "MEC7BN",
                        "MEC7BQ",
                        "MEC7BR",
                        "MEC7BS",
                        "MEC7BT",
                        "MEC7BU",
                        "MEC7FB",
                        "MEC7FC",
                        "MEC7FD",
                        "MEC7FE",
                        "MEC7FF",
                        "MEC7FG",
                        "MEC7FH",
                        "MEC7FI",
                        "MEC7GB",
                        "MEC7GD",
                        "MEC7HA",
                        "MEC7HE",
                        "MEC7HG",
                        "MEC73A",
                        "MEC74A",
                        "MEC74E",
                        "MEC75F",
                        "MEC75G",
                        "MEC76C",
                        "MEC76E",
                        "MEC76F",
                        "MEC76G",
                        "MEC76H",
                        "MEC77A",
                        "MEC77E",
                        "MEC77F",
                        "MEC77G"
            ]
};

const OPTIONAL_GROUPS_CONFIG = {
            '[1219]': { requiredHours: 375, name: 'Optativas em Engenharia de Produção' },
            '[1218]': { requiredHours: 165, name: 'Ciclo de Humanidades' }
        };

const allNodesData = [
            {
                        "id": "MEC71A",
                        "name": "DESENHO TÉCNICO",
                        "cht": 45,
                        "period": 1,
                        "dependencies": [],
                        "type": "subject",
                        "x": 7.0,
                        "y": 2.0
            },
            {
                        "id": "MECP71C",
                        "name": "INTRODUÇÃO À ENGENHARIA DE PRODUÇÃO",
                        "cht": 30,
                        "period": 1,
                        "dependencies": [],
                        "type": "subject",
                        "x": 24.2,
                        "y": 2.0
            },
            {
                        "id": "MECP71A",
                        "name": "GEOMETRIA ANALÍTICA PARA ENGENHARIA",
                        "cht": 60,
                        "period": 1,
                        "dependencies": [],
                        "type": "subject",
                        "x": 41.4,
                        "y": 2.0
            },
            {
                        "id": "MECP71B",
                        "name": "CÁLCULO DIFERENCIAL E INTEGRAL 1",
                        "cht": 90,
                        "period": 1,
                        "dependencies": [],
                        "type": "subject",
                        "x": 58.6,
                        "y": 2.0
            },
            {
                        "id": "INF71A",
                        "name": "COMPUTAÇÃO 1",
                        "cht": 60,
                        "period": 1,
                        "dependencies": [],
                        "type": "subject",
                        "x": 75.8,
                        "y": 2.0
            },
            {
                        "id": "MECP71D",
                        "name": "ATIVIDADES COMPLEMENTARES",
                        "cht": 60,
                        "period": 1,
                        "dependencies": [],
                        "type": "subject",
                        "x": 93.0,
                        "y": 2.0
            },
            {
                        "id": "MECP72D",
                        "name": "DESENHO AUXILIADO POR COMPUTADOR 1",
                        "cht": 45,
                        "period": 2,
                        "dependencies": [
                                    "MEC71A"
                        ],
                        "type": "subject",
                        "x": 7.0,
                        "y": 12.5
            },
            {
                        "id": "MECP72E",
                        "name": "FUNDAMENTOS DE CIÊNCIAS DOS MATERIAIS",
                        "cht": 60,
                        "period": 2,
                        "dependencies": [],
                        "type": "subject",
                        "x": 28.5,
                        "y": 12.5
            },
            {
                        "id": "MECP72A",
                        "name": "ÁLGEBRA LINEAR PARA ENGENHARIA",
                        "cht": 60,
                        "period": 2,
                        "dependencies": [
                                    "MECP71A"
                        ],
                        "type": "subject",
                        "x": 50.0,
                        "y": 12.5
            },
            {
                        "id": "MECP72B",
                        "name": "CÁLCULO DIFERENCIAL E INTEGRAL 2",
                        "cht": 90,
                        "period": 2,
                        "dependencies": [
                                    "MECP71A",
                                    "MECP71B"
                        ],
                        "type": "subject",
                        "x": 71.5,
                        "y": 12.5
            },
            {
                        "id": "MECP72C",
                        "name": "FÍSICA APLICADA 1",
                        "cht": 60,
                        "period": 2,
                        "dependencies": [],
                        "type": "subject",
                        "x": 93.0,
                        "y": 12.5
            },
            {
                        "id": "MEC74B",
                        "name": "METROLOGIA MECÂNICA",
                        "cht": 45,
                        "period": 3,
                        "dependencies": [
                                    "MECP71C"
                        ],
                        "type": "subject",
                        "x": 7.0,
                        "y": 23.0
            },
            {
                        "id": "MECP73C",
                        "name": "ORGANIZAÇÃO INDUSTRIAL",
                        "cht": 30,
                        "period": 3,
                        "dependencies": [
                                    "MECP71C"
                        ],
                        "type": "subject",
                        "x": 28.5,
                        "y": 23.0
            },
            {
                        "id": "EST70C",
                        "name": "INTRODUÇÃO À ESTATÍSTICA",
                        "cht": 60,
                        "period": 3,
                        "dependencies": [
                                    "MECP71B"
                        ],
                        "type": "subject",
                        "x": 50.0,
                        "y": 23.0
            },
            {
                        "id": "MECP73A",
                        "name": "FÍSICA APLICADA 2",
                        "cht": 60,
                        "period": 3,
                        "dependencies": [
                                    "MECP72C"
                        ],
                        "type": "subject",
                        "x": 71.5,
                        "y": 23.0
            },
            {
                        "id": "MECP73B",
                        "name": "FÍSICA EXPERIMENTAL APLICADA",
                        "cht": 30,
                        "period": 3,
                        "dependencies": [
                                    "MECP72C"
                        ],
                        "type": "subject",
                        "x": 93.0,
                        "y": 23.0
            },
            {
                        "id": "MECP74C",
                        "name": "PROCESSOS METALÚRGICOS DE FABRICAÇÃO E SOLDAGEM",
                        "cht": 45,
                        "period": 4,
                        "dependencies": [
                                    "MECP72E"
                        ],
                        "type": "subject",
                        "x": 7.0,
                        "y": 33.5
            },
            {
                        "id": "MECP74A",
                        "name": "GESTÃO DE OPERAÇÕES",
                        "cht": 45,
                        "period": 4,
                        "dependencies": [
                                    "MECP71C"
                        ],
                        "type": "subject",
                        "x": 28.5,
                        "y": 33.5
            },
            {
                        "id": "MEC73C",
                        "name": "ESTÁTICA",
                        "cht": 60,
                        "period": 4,
                        "dependencies": [
                                    "MECP71B",
                                    "MECP72C"
                        ],
                        "type": "subject",
                        "x": 50.0,
                        "y": 33.5
            },
            {
                        "id": "MEC75A",
                        "name": "FENÔMENOS DE TRANSPORTE",
                        "cht": 45,
                        "period": 4,
                        "dependencies": [
                                    "MECP72B",
                                    "MECP73A"
                        ],
                        "type": "subject",
                        "x": 71.5,
                        "y": 33.5
            },
            {
                        "id": "MECP74B",
                        "name": "ELETRICIDADE",
                        "cht": 75,
                        "period": 4,
                        "dependencies": [
                                    "MECP72B"
                        ],
                        "type": "subject",
                        "x": 93.0,
                        "y": 33.5
            },
            {
                        "id": "MECP75A",
                        "name": "USINAGEM CONVENCIONAL",
                        "cht": 45,
                        "period": 5,
                        "dependencies": [
                                    "MECP72D",
                                    "MECP72E",
                                    "MEC74B"
                        ],
                        "type": "subject",
                        "x": 7.0,
                        "y": 44.0
            },
            {
                        "id": "MEC78G",
                        "name": "METODOLOGIA DE PROJETO DE PRODUTO",
                        "cht": 45,
                        "period": 5,
                        "dependencies": [
                                    "MECP72D"
                        ],
                        "type": "subject",
                        "x": 24.2,
                        "y": 44.0
            },
            {
                        "id": "MEC7CL",
                        "name": "PLANEJAMENTO E CONTROLE DA PRODUÇÃO 1",
                        "cht": 45,
                        "period": 5,
                        "dependencies": [
                                    "MECP74A"
                        ],
                        "type": "subject",
                        "x": 41.4,
                        "y": 44.0
            },
            {
                        "id": "MEC79E",
                        "name": "SISTEMAS DE GESTÃO DA QUALIDADE",
                        "cht": 30,
                        "period": 5,
                        "dependencies": [
                                    "MEC74B"
                        ],
                        "type": "subject",
                        "x": 58.6,
                        "y": 44.0
            },
            {
                        "id": "MEC76A",
                        "name": "MECÂNICA DOS SÓLIDOS 1",
                        "cht": 90,
                        "period": 5,
                        "dependencies": [
                                    "MEC73C"
                        ],
                        "type": "subject",
                        "x": 75.8,
                        "y": 44.0
            },
            {
                        "id": "MEC77C",
                        "name": "FUNDAMENTOS DE ENG. DE SEGURANÇA DO TRABALHO",
                        "cht": 45,
                        "period": 5,
                        "dependencies": [
                                    "MECP71C"
                        ],
                        "type": "subject",
                        "x": 93.0,
                        "y": 44.0
            },
            {
                        "id": "MECP76C",
                        "name": "PROJETO INTEGRADOR BÁSICO",
                        "cht": 90,
                        "period": 6,
                        "dependencies": [
                                    "MECP74C",
                                    "MECP75A",
                                    "MEC78G"
                        ],
                        "type": "subject",
                        "x": 7.0,
                        "y": 54.5
            },
            {
                        "id": "MECP76A",
                        "name": "LOGÍSTICA",
                        "cht": 45,
                        "period": 6,
                        "dependencies": [
                                    "MEC7CL"
                        ],
                        "type": "subject",
                        "x": 21.3,
                        "y": 54.5
            },
            {
                        "id": "MECP76B",
                        "name": "PRODUÇÃO ENXUTA",
                        "cht": 45,
                        "period": 6,
                        "dependencies": [
                                    "MEC79E"
                        ],
                        "type": "subject",
                        "x": 35.7,
                        "y": 54.5
            },
            {
                        "id": "MEC7HF",
                        "name": "AUTOMAÇÃO DA PRODUÇÃO",
                        "cht": 30,
                        "period": 6,
                        "dependencies": [
                                    "MEC79E"
                        ],
                        "type": "subject",
                        "x": 50.0,
                        "y": 54.5
            },
            {
                        "id": "MEC79D",
                        "name": "GESTÃO AMBIENTAL",
                        "cht": 30,
                        "period": 6,
                        "dependencies": [
                                    "MEC79E"
                        ],
                        "type": "subject",
                        "x": 64.3,
                        "y": 54.5
            },
            {
                        "id": "MEC77D",
                        "name": "ANÁLISE DE CUSTOS INDUSTRIAIS",
                        "cht": 45,
                        "period": 6,
                        "dependencies": [
                                    "MEC77C"
                        ],
                        "type": "subject",
                        "x": 78.7,
                        "y": 54.5
            },
            {
                        "id": "MECP76D",
                        "name": "ESTÁGIO SUPERVISIONADO",
                        "cht": 360,
                        "period": 6,
                        "dependencies": [
                                    "MEC7CL",
                                    "MEC75A",
                                    "MEC77C"
                        ],
                        "type": "subject",
                        "x": 93.0,
                        "y": 54.5
            },
            {
                        "id": "MECP77C",
                        "name": "PROJETO INTEGRADOR NA ENG. DE PRODUÇÃO 1",
                        "cht": 90,
                        "period": 7,
                        "dependencies": [
                                    "MECP76C"
                        ],
                        "type": "subject",
                        "x": 7.0,
                        "y": 65.0
            },
            {
                        "id": "MEC7CI",
                        "name": "PESQUISA OPERACIONAL 1",
                        "cht": 60,
                        "period": 7,
                        "dependencies": [
                                    "INF71A",
                                    "MECP71A",
                                    "MECP72A"
                        ],
                        "type": "subject",
                        "x": 28.5,
                        "y": 65.0
            },
            {
                        "id": "MECP77A",
                        "name": "ANÁLISE DE DADOS",
                        "cht": 60,
                        "period": 7,
                        "dependencies": [
                                    "EST70C"
                        ],
                        "type": "subject",
                        "x": 50.0,
                        "y": 65.0
            },
            {
                        "id": "MEC78B",
                        "name": "ENGENHARIA ECONÔMICA",
                        "cht": 30,
                        "period": 7,
                        "dependencies": [
                                    "MEC77D"
                        ],
                        "type": "subject",
                        "x": 71.5,
                        "y": 65.0
            },
            {
                        "id": "MECP77B",
                        "name": "GESTÃO DE MANUTENÇÃO",
                        "cht": 30,
                        "period": 7,
                        "dependencies": [
                                    "Periodo:7"
                        ],
                        "type": "subject",
                        "x": 93.0,
                        "y": 65.0
            },
            {
                        "id": "MECP78B",
                        "name": "PROJETO INTEGRADOR NA ENG. DE PRODUÇÃO 2",
                        "cht": 90,
                        "period": 8,
                        "dependencies": [
                                    "MECP77C"
                        ],
                        "type": "subject",
                        "x": 10.0,
                        "y": 75.5
            },
            {
                        "id": "MECP78A",
                        "name": "EMPREENDEDORISMO",
                        "cht": 45,
                        "period": 8,
                        "dependencies": [
                                    "MECP77C"
                        ],
                        "type": "subject",
                        "x": 36.7,
                        "y": 75.5
            },
            {
                        "id": "MECP78D",
                        "name": "GERENCIAMENTO DE PROJETOS",
                        "cht": 45,
                        "period": 8,
                        "dependencies": [
                                    "MEC78B",
                                    "MEC78G"
                        ],
                        "type": "subject",
                        "x": 63.3,
                        "y": 75.5
            },
            {
                        "id": "MECP78C",
                        "name": "METODOLOGIA DA PESQUISA",
                        "cht": 30,
                        "period": 8,
                        "dependencies": [],
                        "type": "subject",
                        "x": 90.0,
                        "y": 75.5
            },
            {
                        "id": "MECP79A",
                        "name": "TRABALHO DE CONCLUSÃO DE CURSO 1",
                        "cht": 60,
                        "period": 9,
                        "dependencies": [
                                    "MECP78C"
                        ],
                        "type": "subject",
                        "x": 50.0,
                        "y": 86.0
            },
            {
                        "id": "MECP70A",
                        "name": "TRABALHO DE CONCLUSÃO DE CURSO 2",
                        "cht": 60,
                        "period": 10,
                        "dependencies": [
                                    "MECP79A"
                        ],
                        "type": "subject",
                        "x": 50.0,
                        "y": 94.5
            }
];

const allHumanitiesData = [
            {
                        "id": "EDU70C",
                        "name": "FUNDAMENTOS SOCIOLÓGICOS DA EDUCAÇÃO",
                        "cht": 45,
                        "chs": 3,
                        "dependencies": [],
                        "groupId": "[1218]",
                        "period": 2,
                        "type": "humanities",
                        "x": 10.0,
                        "y": 6.0
            },
            {
                        "id": "EDU70I",
                        "name": "EDUCAÇÃO ESPECIAL E PROCESSOS INCLUSIVOS",
                        "cht": 45,
                        "chs": 3,
                        "dependencies": [],
                        "groupId": "[1218]",
                        "period": 2,
                        "type": "humanities",
                        "x": 30.0,
                        "y": 6.0
            },
            {
                        "id": "EDU70J",
                        "name": "LIBRAS",
                        "cht": 45,
                        "chs": 3,
                        "dependencies": [],
                        "groupId": "[1218]",
                        "period": 2,
                        "type": "humanities",
                        "x": 50.0,
                        "y": 6.0
            },
            {
                        "id": "EDU70K",
                        "name": "TECNOLOGIAS DIGITAIS NA EDUCAÇÃO",
                        "cht": 45,
                        "chs": 3,
                        "dependencies": [],
                        "groupId": "[1218]",
                        "period": 2,
                        "type": "humanities",
                        "x": 70.0,
                        "y": 6.0
            },
            {
                        "id": "FCH7FA",
                        "name": "FILOSOFIA DA CIÊNCIA E DA TECNOLOGIA",
                        "cht": 45,
                        "chs": 3,
                        "dependencies": [],
                        "groupId": "[1218]",
                        "period": 2,
                        "type": "humanities",
                        "x": 90.0,
                        "y": 6.0
            },
            {
                        "id": "FCH7FC",
                        "name": "TEORIA DAS CIÊNCIAS HUMANAS",
                        "cht": 45,
                        "chs": 3,
                        "dependencies": [],
                        "groupId": "[1218]",
                        "period": 2,
                        "type": "humanities",
                        "x": 10.0,
                        "y": 22.0
            },
            {
                        "id": "FCH7GA",
                        "name": "METROPOLIZAÇÃO CONTEMPORÂNEA: TECNOLOGIA E TERRITÓRIO",
                        "cht": 45,
                        "chs": 3,
                        "dependencies": [],
                        "groupId": "[1218]",
                        "period": 2,
                        "type": "humanities",
                        "x": 30.0,
                        "y": 22.0
            },
            {
                        "id": "FCH7HA",
                        "name": "HISTÓRIA DA TÉCNICA E DA TECNOLOGIA",
                        "cht": 45,
                        "chs": 3,
                        "dependencies": [],
                        "groupId": "[1218]",
                        "period": 2,
                        "type": "humanities",
                        "x": 50.0,
                        "y": 22.0
            },
            {
                        "id": "FCH7HB",
                        "name": "HISTÓRIA GERAL DA ECONOMIA",
                        "cht": 45,
                        "chs": 3,
                        "dependencies": [],
                        "groupId": "[1218]",
                        "period": 2,
                        "type": "humanities",
                        "x": 70.0,
                        "y": 22.0
            },
            {
                        "id": "FCH7HC",
                        "name": "CAPITALISMO CONTEMPORÂNEO E ECONOMIA POLÍTICA",
                        "cht": 45,
                        "chs": 3,
                        "dependencies": [],
                        "groupId": "[1218]",
                        "period": 2,
                        "type": "humanities",
                        "x": 90.0,
                        "y": 22.0
            },
            {
                        "id": "FCH7PA",
                        "name": "PSICOLOGIA DO TRABALHO",
                        "cht": 30,
                        "chs": 2,
                        "dependencies": [],
                        "groupId": "[1218]",
                        "period": 2,
                        "type": "humanities",
                        "x": 10.0,
                        "y": 38.0
            },
            {
                        "id": "FCH7PB",
                        "name": "RELAÇÕES INTERPESSOAIS, GRUPO E PODER",
                        "cht": 30,
                        "chs": 2,
                        "dependencies": [],
                        "groupId": "[1218]",
                        "period": 2,
                        "type": "humanities",
                        "x": 30.0,
                        "y": 38.0
            },
            {
                        "id": "FCH7SA",
                        "name": "SOCIOLOGIA",
                        "cht": 45,
                        "chs": 3,
                        "dependencies": [],
                        "groupId": "[1218]",
                        "period": 2,
                        "type": "humanities",
                        "x": 50.0,
                        "y": 38.0
            },
            {
                        "id": "FCH7SB",
                        "name": "TECNOLOGIA E SOCIEDADE",
                        "cht": 45,
                        "chs": 3,
                        "dependencies": [],
                        "groupId": "[1218]",
                        "period": 2,
                        "type": "humanities",
                        "x": 70.0,
                        "y": 38.0
            },
            {
                        "id": "FCH7SC",
                        "name": "TECNOLOGIA, TRABALHO E SAÚDE",
                        "cht": 45,
                        "chs": 3,
                        "dependencies": [],
                        "groupId": "[1218]",
                        "period": 2,
                        "type": "humanities",
                        "x": 90.0,
                        "y": 38.0
            },
            {
                        "id": "FCH7SE",
                        "name": "SOCIEDADE E POLÍTICA NO PARANÁ",
                        "cht": 45,
                        "chs": 3,
                        "dependencies": [],
                        "groupId": "[1218]",
                        "period": 2,
                        "type": "humanities",
                        "x": 10.0,
                        "y": 54.0
            },
            {
                        "id": "FCH7XC",
                        "name": "PRESENÇA AFRICANA NO BRASIL",
                        "cht": 30,
                        "chs": 2,
                        "dependencies": [],
                        "groupId": "[1218]",
                        "period": 2,
                        "type": "humanities",
                        "x": 30.0,
                        "y": 54.0
            },
            {
                        "id": "FCH7XD",
                        "name": "DIREITOS HUMANOS, SEGURANÇA E DIVERSIDADE",
                        "cht": 45,
                        "chs": 3,
                        "dependencies": [],
                        "groupId": "[1218]",
                        "period": 2,
                        "type": "humanities",
                        "x": 50.0,
                        "y": 54.0
            },
            {
                        "id": "FCH7XE",
                        "name": "POLÍTICAS PÚBLICAS",
                        "cht": 45,
                        "chs": 3,
                        "dependencies": [],
                        "groupId": "[1218]",
                        "period": 2,
                        "type": "humanities",
                        "x": 70.0,
                        "y": 54.0
            },
            {
                        "id": "FCH7XF",
                        "name": "DIMENSÃO AMBIENTAL NA GESTÃO URBANA",
                        "cht": 45,
                        "chs": 3,
                        "dependencies": [],
                        "groupId": "[1218]",
                        "period": 2,
                        "type": "humanities",
                        "x": 90.0,
                        "y": 54.0
            },
            {
                        "id": "FCH7XG",
                        "name": "TECNOPOLÍTICAS DA SOCIEDADE CONTEMPORÂNEA",
                        "cht": 45,
                        "chs": 3,
                        "dependencies": [],
                        "groupId": "[1218]",
                        "period": 2,
                        "type": "humanities",
                        "x": 50.0,
                        "y": 70.0
            }
];

const allOptionalNodesData = [
            {
                        "id": "EST7BF",
                        "name": "SÉRIES TEMPORAIS",
                        "cht": 60,
                        "chs": 4,
                        "dependencies": [
                                    "EST7AC"
                        ],
                        "groupId": "[1219]",
                        "track": "Ciência de Dados & Estatística Aplicada",
                        "period": 3,
                        "type": "optional",
                        "x": 10.0,
                        "y": 4.0
            },
            {
                        "id": "EST7AA",
                        "name": "ANÁLISE DE DADOS CATEGÓRICOS",
                        "cht": 60,
                        "chs": 4,
                        "dependencies": [
                                    "EST7AC"
                        ],
                        "groupId": "[1219]",
                        "track": "Ciência de Dados & Estatística Aplicada",
                        "period": 3,
                        "type": "optional",
                        "x": 26.0,
                        "y": 4.0
            },
            {
                        "id": "EST7AB",
                        "name": "ANÁLISE DE DADOS LONGITUDINAIS",
                        "cht": 60,
                        "chs": 4,
                        "dependencies": [
                                    "EST7AX"
                        ],
                        "groupId": "[1219]",
                        "track": "Ciência de Dados & Estatística Aplicada",
                        "period": 3,
                        "type": "optional",
                        "x": 42.0,
                        "y": 4.0
            },
            {
                        "id": "EST7AC",
                        "name": "ANÁLISE DE REGRESSÃO",
                        "cht": 60,
                        "chs": 4,
                        "dependencies": [
                                    "EST7BP"
                        ],
                        "groupId": "[1219]",
                        "track": "Ciência de Dados & Estatística Aplicada",
                        "period": 3,
                        "type": "optional",
                        "x": 58.0,
                        "y": 4.0
            },
            {
                        "id": "EST7AD",
                        "name": "ANÁLISE DE SOBREVIVÊNCIA",
                        "cht": 60,
                        "chs": 4,
                        "dependencies": [
                                    "EST7AC"
                        ],
                        "groupId": "[1219]",
                        "track": "Ciência de Dados & Estatística Aplicada",
                        "period": 3,
                        "type": "optional",
                        "x": 74.0,
                        "y": 4.0
            },
            {
                        "id": "EST7AJ",
                        "name": "ESTATÍSTICA BAYESIANA",
                        "cht": 60,
                        "chs": 4,
                        "dependencies": [
                                    "EST7BP"
                        ],
                        "groupId": "[1219]",
                        "track": "Ciência de Dados & Estatística Aplicada",
                        "period": 3,
                        "type": "optional",
                        "x": 90.0,
                        "y": 4.0
            },
            {
                        "id": "EST7AK",
                        "name": "ESTATÍSTICA COMPUTACIONAL EM R",
                        "cht": 60,
                        "chs": 4,
                        "dependencies": [],
                        "groupId": "[1219]",
                        "track": "Ciência de Dados & Estatística Aplicada",
                        "period": 3,
                        "type": "optional",
                        "x": 10.0,
                        "y": 8.2
            },
            {
                        "id": "EST7AL",
                        "name": "ESTATÍSTICA MULTIVARIADA 1",
                        "cht": 60,
                        "chs": 4,
                        "dependencies": [
                                    "EST7BN",
                                    "EST7BP"
                        ],
                        "groupId": "[1219]",
                        "track": "Ciência de Dados & Estatística Aplicada",
                        "period": 3,
                        "type": "optional",
                        "x": 26.0,
                        "y": 8.2
            },
            {
                        "id": "EST7AM",
                        "name": "ESTATÍSTICA MULTIVARIADA 2",
                        "cht": 60,
                        "chs": 4,
                        "dependencies": [
                                    "EST7AL"
                        ],
                        "groupId": "[1219]",
                        "track": "Ciência de Dados & Estatística Aplicada",
                        "period": 3,
                        "type": "optional",
                        "x": 42.0,
                        "y": 8.2
            },
            {
                        "id": "EST7AN",
                        "name": "ESTATÍSITCA NÃO PARAMÉTRICA",
                        "cht": 60,
                        "chs": 4,
                        "dependencies": [
                                    "EST7BC"
                        ],
                        "groupId": "[1219]",
                        "track": "Ciência de Dados & Estatística Aplicada",
                        "period": 3,
                        "type": "optional",
                        "x": 58.0,
                        "y": 8.2
            },
            {
                        "id": "EST7AO",
                        "name": "GEOESTATÍSTICA",
                        "cht": 60,
                        "chs": 4,
                        "dependencies": [],
                        "groupId": "[1219]",
                        "track": "Ciência de Dados & Estatística Aplicada",
                        "period": 3,
                        "type": "optional",
                        "x": 74.0,
                        "y": 8.2
            },
            {
                        "id": "EST7AQ",
                        "name": "INTRODUÇÃO À SUPERFÍCIE DE RESPOSTA",
                        "cht": 60,
                        "chs": 4,
                        "dependencies": [],
                        "groupId": "[1219]",
                        "track": "Ciência de Dados & Estatística Aplicada",
                        "period": 3,
                        "type": "optional",
                        "x": 90.0,
                        "y": 8.2
            },
            {
                        "id": "EST7AU",
                        "name": "INTRODUÇÃO AOS PROCESSOS ESTOCÁSTICOS",
                        "cht": 60,
                        "chs": 4,
                        "dependencies": [
                                    "EST7BC"
                        ],
                        "groupId": "[1219]",
                        "track": "Ciência de Dados & Estatística Aplicada",
                        "period": 3,
                        "type": "optional",
                        "x": 10.0,
                        "y": 12.4
            },
            {
                        "id": "EST7AW",
                        "name": "ESTATÍSTICA COMPUTACIONAL EM PYTHON",
                        "cht": 60,
                        "chs": 4,
                        "dependencies": [],
                        "groupId": "[1219]",
                        "track": "Ciência de Dados & Estatística Aplicada",
                        "period": 3,
                        "type": "optional",
                        "x": 26.0,
                        "y": 12.4
            },
            {
                        "id": "EST7AX",
                        "name": "MODELOS LINEARES GENERALIZADOS",
                        "cht": 60,
                        "chs": 4,
                        "dependencies": [
                                    "EST7AC"
                        ],
                        "groupId": "[1219]",
                        "track": "Ciência de Dados & Estatística Aplicada",
                        "period": 3,
                        "type": "optional",
                        "x": 42.0,
                        "y": 12.4
            },
            {
                        "id": "EST7AY",
                        "name": "ESTATÍSTICA DEMOGRÁFICA",
                        "cht": 60,
                        "chs": 4,
                        "dependencies": [
                                    "EST7BB"
                        ],
                        "groupId": "[1219]",
                        "track": "Ciência de Dados & Estatística Aplicada",
                        "period": 3,
                        "type": "optional",
                        "x": 58.0,
                        "y": 12.4
            },
            {
                        "id": "EST7AZ",
                        "name": "MODELOS LINEARES MISTOS",
                        "cht": 60,
                        "chs": 4,
                        "dependencies": [
                                    "EST7AC"
                        ],
                        "groupId": "[1219]",
                        "track": "Ciência de Dados & Estatística Aplicada",
                        "period": 3,
                        "type": "optional",
                        "x": 74.0,
                        "y": 12.4
            },
            {
                        "id": "EST7BA",
                        "name": "PLANEJAMENTO E ANÁLISE DE EXPERIMENTOS 1",
                        "cht": 60,
                        "chs": 4,
                        "dependencies": [
                                    "EST7BP"
                        ],
                        "groupId": "[1219]",
                        "track": "Ciência de Dados & Estatística Aplicada",
                        "period": 3,
                        "type": "optional",
                        "x": 90.0,
                        "y": 12.4
            },
            {
                        "id": "EST7BB",
                        "name": "PLANEJAMENTO E ANÁLISE DE EXPERIMENTOS 2",
                        "cht": 60,
                        "chs": 4,
                        "dependencies": [
                                    "EST7BA"
                        ],
                        "groupId": "[1219]",
                        "track": "Ciência de Dados & Estatística Aplicada",
                        "period": 3,
                        "type": "optional",
                        "x": 10.0,
                        "y": 16.6
            },
            {
                        "id": "EST7BC",
                        "name": "PROBABILIDADE 1",
                        "cht": 60,
                        "chs": 4,
                        "dependencies": [],
                        "groupId": "[1219]",
                        "track": "Ciência de Dados & Estatística Aplicada",
                        "period": 3,
                        "type": "optional",
                        "x": 26.0,
                        "y": 16.6
            },
            {
                        "id": "EST7BD",
                        "name": "PROBABILIDADE 2",
                        "cht": 60,
                        "chs": 4,
                        "dependencies": [
                                    "EST7BC"
                        ],
                        "groupId": "[1219]",
                        "track": "Ciência de Dados & Estatística Aplicada",
                        "period": 3,
                        "type": "optional",
                        "x": 42.0,
                        "y": 16.6
            },
            {
                        "id": "EST7BG",
                        "name": "SÉRIES TEMPORAIS MULTIVARIADAS",
                        "cht": 60,
                        "chs": 4,
                        "dependencies": [
                                    "EST7BF"
                        ],
                        "groupId": "[1219]",
                        "track": "Ciência de Dados & Estatística Aplicada",
                        "period": 3,
                        "type": "optional",
                        "x": 58.0,
                        "y": 16.6
            },
            {
                        "id": "EST7BH",
                        "name": "TÉCNICAS DE AMOSTRAGEM 1",
                        "cht": 60,
                        "chs": 4,
                        "dependencies": [
                                    "EST7BP"
                        ],
                        "groupId": "[1219]",
                        "track": "Ciência de Dados & Estatística Aplicada",
                        "period": 3,
                        "type": "optional",
                        "x": 74.0,
                        "y": 16.6
            },
            {
                        "id": "EST7BI",
                        "name": "TÉCNICAS DE AMOSTRAGEM 2",
                        "cht": 60,
                        "chs": 4,
                        "dependencies": [
                                    "EST7BH"
                        ],
                        "groupId": "[1219]",
                        "track": "Ciência de Dados & Estatística Aplicada",
                        "period": 3,
                        "type": "optional",
                        "x": 90.0,
                        "y": 16.6
            },
            {
                        "id": "EST7BJ",
                        "name": "TEORIA DA RESPOSTA AO ITEM",
                        "cht": 60,
                        "chs": 4,
                        "dependencies": [
                                    "EST7AC"
                        ],
                        "groupId": "[1219]",
                        "track": "Ciência de Dados & Estatística Aplicada",
                        "period": 3,
                        "type": "optional",
                        "x": 26.0,
                        "y": 20.8
            },
            {
                        "id": "EST7BL",
                        "name": "TÓPICOS ESPECIAIS EM ESTATÍSTICA",
                        "cht": 60,
                        "chs": 4,
                        "dependencies": [
                                    "EST7BP"
                        ],
                        "groupId": "[1219]",
                        "track": "Ciência de Dados & Estatística Aplicada",
                        "period": 3,
                        "type": "optional",
                        "x": 42.0,
                        "y": 20.8
            },
            {
                        "id": "EST7BN",
                        "name": "TÓPICOS MATEMÁTICOS PARA ESTATÍSTICA 1",
                        "cht": 60,
                        "chs": 4,
                        "dependencies": [],
                        "groupId": "[1219]",
                        "track": "Ciência de Dados & Estatística Aplicada",
                        "period": 3,
                        "type": "optional",
                        "x": 58.0,
                        "y": 20.8
            },
            {
                        "id": "EST7BP",
                        "name": "ESTATÍSTICA INFERENCIAL",
                        "cht": 60,
                        "chs": 4,
                        "dependencies": [
                                    "EST7BC"
                        ],
                        "groupId": "[1219]",
                        "track": "Ciência de Dados & Estatística Aplicada",
                        "period": 3,
                        "type": "optional",
                        "x": 74.0,
                        "y": 20.8
            },
            {
                        "id": "MEC7AG",
                        "name": "CONTROLE ESTATÍSTICO DE PROCESSO",
                        "cht": 60,
                        "chs": 4,
                        "dependencies": [
                                    "MEC79E"
                        ],
                        "groupId": "[1219]",
                        "track": "Engenharia de Operações, Logística & Pesquisa Operacional",
                        "period": 3,
                        "type": "optional",
                        "x": 10.0,
                        "y": 28.0
            },
            {
                        "id": "MEC7BO",
                        "name": "SIMULAÇÃO A EVENTOS DISCRETOS",
                        "cht": 30,
                        "chs": 2,
                        "dependencies": [
                                    "MEC7CL"
                        ],
                        "groupId": "[1219]",
                        "track": "Engenharia de Operações, Logística & Pesquisa Operacional",
                        "period": 3,
                        "type": "optional",
                        "x": 26.0,
                        "y": 28.0
            },
            {
                        "id": "MEC7BP",
                        "name": "SIMULAÇÃO AVANÇADA A EVENTOS DISCRETOS-CONTÍNUOS",
                        "cht": 30,
                        "chs": 2,
                        "dependencies": [
                                    "MEC7BO"
                        ],
                        "groupId": "[1219]",
                        "track": "Engenharia de Operações, Logística & Pesquisa Operacional",
                        "period": 3,
                        "type": "optional",
                        "x": 42.0,
                        "y": 28.0
            },
            {
                        "id": "MEC7CA",
                        "name": "ESTRATÉGIA DE OPERAÇÕES",
                        "cht": 45,
                        "chs": 3,
                        "dependencies": [
                                    "MECP76A"
                        ],
                        "groupId": "[1219]",
                        "track": "Engenharia de Operações, Logística & Pesquisa Operacional",
                        "period": 3,
                        "type": "optional",
                        "x": 58.0,
                        "y": 28.0
            },
            {
                        "id": "MEC7CB",
                        "name": "ESTUDO DE MÉTODOS E TEMPOS",
                        "cht": 45,
                        "chs": 3,
                        "dependencies": [
                                    "MEC7CL"
                        ],
                        "groupId": "[1219]",
                        "track": "Engenharia de Operações, Logística & Pesquisa Operacional",
                        "period": 3,
                        "type": "optional",
                        "x": 74.0,
                        "y": 28.0
            },
            {
                        "id": "MEC7CC",
                        "name": "GESTÃO DA CADEIA DE SUPRIMENTOS",
                        "cht": 45,
                        "chs": 3,
                        "dependencies": [
                                    "MECP76A"
                        ],
                        "groupId": "[1219]",
                        "track": "Engenharia de Operações, Logística & Pesquisa Operacional",
                        "period": 3,
                        "type": "optional",
                        "x": 90.0,
                        "y": 28.0
            },
            {
                        "id": "MEC7CG",
                        "name": "META-HEURÍSTICAS EM PESQUISA OPERACIONAL",
                        "cht": 60,
                        "chs": 4,
                        "dependencies": [
                                    "MEC7CI"
                        ],
                        "groupId": "[1219]",
                        "track": "Engenharia de Operações, Logística & Pesquisa Operacional",
                        "period": 3,
                        "type": "optional",
                        "x": 10.0,
                        "y": 32.2
            },
            {
                        "id": "MEC7CJ",
                        "name": "PESQUISA OPERACIONAL 2",
                        "cht": 60,
                        "chs": 4,
                        "dependencies": [
                                    "MEC7CI"
                        ],
                        "groupId": "[1219]",
                        "track": "Engenharia de Operações, Logística & Pesquisa Operacional",
                        "period": 3,
                        "type": "optional",
                        "x": 26.0,
                        "y": 32.2
            },
            {
                        "id": "MEC7CK",
                        "name": "PESQUISA OPERACIONAL APLICADA A ESTUDO DE CASO",
                        "cht": 60,
                        "chs": 4,
                        "dependencies": [
                                    "MEC7CI"
                        ],
                        "groupId": "[1219]",
                        "track": "Engenharia de Operações, Logística & Pesquisa Operacional",
                        "period": 3,
                        "type": "optional",
                        "x": 42.0,
                        "y": 32.2
            },
            {
                        "id": "MEC7CM",
                        "name": "PLANEJAMENTO E CONTROLE DA PRODUÇÃO 2",
                        "cht": 45,
                        "chs": 3,
                        "dependencies": [
                                    "MEC7CL"
                        ],
                        "groupId": "[1219]",
                        "track": "Engenharia de Operações, Logística & Pesquisa Operacional",
                        "period": 3,
                        "type": "optional",
                        "x": 58.0,
                        "y": 32.2
            },
            {
                        "id": "MEC7CN",
                        "name": "PLANEJAMENTO ESTRATÉGICO",
                        "cht": 30,
                        "chs": 2,
                        "dependencies": [
                                    "MECP71C"
                        ],
                        "groupId": "[1219]",
                        "track": "Engenharia de Operações, Logística & Pesquisa Operacional",
                        "period": 3,
                        "type": "optional",
                        "x": 74.0,
                        "y": 32.2
            },
            {
                        "id": "MEC7CP",
                        "name": "SISTEMAS FLEXÍVEIS DE MANUFATURA",
                        "cht": 60,
                        "chs": 4,
                        "dependencies": [
                                    "MEC7HF"
                        ],
                        "groupId": "[1219]",
                        "track": "Engenharia de Operações, Logística & Pesquisa Operacional",
                        "period": 3,
                        "type": "optional",
                        "x": 90.0,
                        "y": 32.2
            },
            {
                        "id": "MEC7HB",
                        "name": "AVALIAÇÃO DO CICLO DE VIDA",
                        "cht": 30,
                        "chs": 2,
                        "dependencies": [
                                    "MEC79D"
                        ],
                        "groupId": "[1219]",
                        "track": "Engenharia de Operações, Logística & Pesquisa Operacional",
                        "period": 3,
                        "type": "optional",
                        "x": 26.0,
                        "y": 36.4
            },
            {
                        "id": "MEC7HC",
                        "name": "ENGENHARIA DA QUALIDADE",
                        "cht": 45,
                        "chs": 3,
                        "dependencies": [
                                    "MEC79E"
                        ],
                        "groupId": "[1219]",
                        "track": "Engenharia de Operações, Logística & Pesquisa Operacional",
                        "period": 3,
                        "type": "optional",
                        "x": 42.0,
                        "y": 36.4
            },
            {
                        "id": "MEC7HD",
                        "name": "ENGENHARIA ERGONÔMICA",
                        "cht": 45,
                        "chs": 3,
                        "dependencies": [
                                    "MEC77C"
                        ],
                        "groupId": "[1219]",
                        "track": "Engenharia de Operações, Logística & Pesquisa Operacional",
                        "period": 3,
                        "type": "optional",
                        "x": 58.0,
                        "y": 36.4
            },
            {
                        "id": "MECP7AA",
                        "name": "MANUFATURA AVANÇADA E INDÚSTRIA 4.0",
                        "cht": 30,
                        "chs": 2,
                        "dependencies": [
                                    "MEC7HF"
                        ],
                        "groupId": "[1219]",
                        "track": "Engenharia de Operações, Logística & Pesquisa Operacional",
                        "period": 3,
                        "type": "optional",
                        "x": 74.0,
                        "y": 36.4
            },
            {
                        "id": "MECP7AB",
                        "name": "INT. DE TRAT. TÉRMICO E COMPORTAMENTO MECÂNICO",
                        "cht": 60,
                        "chs": 4,
                        "dependencies": [
                                    "MECP72E"
                        ],
                        "groupId": "[1219]",
                        "track": "Engenharia de Materiais & Manufatura Avançada",
                        "period": 3,
                        "type": "optional",
                        "x": 10.0,
                        "y": 43.6
            },
            {
                        "id": "MEC7DA",
                        "name": "CARACTERIZAÇÃO E ANÁLISE DE FALHAS DE MATERIAIS",
                        "cht": 45,
                        "chs": 3,
                        "dependencies": [
                                    "MECP72E"
                        ],
                        "groupId": "[1219]",
                        "track": "Engenharia de Materiais & Manufatura Avançada",
                        "period": 3,
                        "type": "optional",
                        "x": 26.0,
                        "y": 43.6
            },
            {
                        "id": "MEC7DB",
                        "name": "ENSAIOS NÃO DESTRUTIVOS",
                        "cht": 30,
                        "chs": 2,
                        "dependencies": [
                                    "MEC74F"
                        ],
                        "groupId": "[1219]",
                        "track": "Engenharia de Materiais & Manufatura Avançada",
                        "period": 3,
                        "type": "optional",
                        "x": 42.0,
                        "y": 43.6
            },
            {
                        "id": "MEC7DD",
                        "name": "FUNDAMENTOS DE CORROSÃO",
                        "cht": 45,
                        "chs": 3,
                        "dependencies": [
                                    "MECP72E"
                        ],
                        "groupId": "[1219]",
                        "track": "Engenharia de Materiais & Manufatura Avançada",
                        "period": 3,
                        "type": "optional",
                        "x": 58.0,
                        "y": 43.6
            },
            {
                        "id": "MEC7DE",
                        "name": "FUNDAMENTOS DE DESGASTE",
                        "cht": 60,
                        "chs": 4,
                        "dependencies": [
                                    "MECP72E"
                        ],
                        "groupId": "[1219]",
                        "track": "Engenharia de Materiais & Manufatura Avançada",
                        "period": 3,
                        "type": "optional",
                        "x": 74.0,
                        "y": 43.6
            },
            {
                        "id": "MEC7DG",
                        "name": "MECÂNICA DOS MATERIAIS COMPÓSITOS",
                        "cht": 60,
                        "chs": 4,
                        "dependencies": [
                                    "MEC76E"
                        ],
                        "groupId": "[1219]",
                        "track": "Engenharia de Materiais & Manufatura Avançada",
                        "period": 3,
                        "type": "optional",
                        "x": 90.0,
                        "y": 43.6
            },
            {
                        "id": "MEC7DH",
                        "name": "METAIS NÃO FERROSOS",
                        "cht": 30,
                        "chs": 2,
                        "dependencies": [
                                    "MEC74F"
                        ],
                        "groupId": "[1219]",
                        "track": "Engenharia de Materiais & Manufatura Avançada",
                        "period": 3,
                        "type": "optional",
                        "x": 10.0,
                        "y": 47.8
            },
            {
                        "id": "MEC7DI",
                        "name": "METALURGIA DO PÓ",
                        "cht": 45,
                        "chs": 3,
                        "dependencies": [
                                    "MEC73D"
                        ],
                        "groupId": "[1219]",
                        "track": "Engenharia de Materiais & Manufatura Avançada",
                        "period": 3,
                        "type": "optional",
                        "x": 26.0,
                        "y": 47.8
            },
            {
                        "id": "MEC7DJ",
                        "name": "PROCESSAMENTO DE MATERIAIS CERÂMICOS",
                        "cht": 60,
                        "chs": 4,
                        "dependencies": [
                                    "MEC74G"
                        ],
                        "groupId": "[1219]",
                        "track": "Engenharia de Materiais & Manufatura Avançada",
                        "period": 3,
                        "type": "optional",
                        "x": 42.0,
                        "y": 47.8
            },
            {
                        "id": "MEC7DK",
                        "name": "PROCESSAMENTO DE MATERIAIS POLIMÉRICOS",
                        "cht": 60,
                        "chs": 4,
                        "dependencies": [
                                    "MEC74G"
                        ],
                        "groupId": "[1219]",
                        "track": "Engenharia de Materiais & Manufatura Avançada",
                        "period": 3,
                        "type": "optional",
                        "x": 58.0,
                        "y": 47.8
            },
            {
                        "id": "MEC7DL",
                        "name": "REVESTIMENTOS POR SOLDAGEM E ASPERSÃO TÉRMICA",
                        "cht": 45,
                        "chs": 3,
                        "dependencies": [
                                    "MECP74C"
                        ],
                        "groupId": "[1219]",
                        "track": "Engenharia de Materiais & Manufatura Avançada",
                        "period": 3,
                        "type": "optional",
                        "x": 74.0,
                        "y": 47.8
            },
            {
                        "id": "MEC7DM",
                        "name": "SELEÇÃO DE MATERIAIS",
                        "cht": 45,
                        "chs": 3,
                        "dependencies": [
                                    "MEC74F"
                        ],
                        "groupId": "[1219]",
                        "track": "Engenharia de Materiais & Manufatura Avançada",
                        "period": 3,
                        "type": "optional",
                        "x": 90.0,
                        "y": 47.8
            },
            {
                        "id": "MEC7DN",
                        "name": "SOLDAGEM DE AÇOS INOXIDÁVEIS",
                        "cht": 45,
                        "chs": 3,
                        "dependencies": [
                                    "MECP74C"
                        ],
                        "groupId": "[1219]",
                        "track": "Engenharia de Materiais & Manufatura Avançada",
                        "period": 3,
                        "type": "optional",
                        "x": 10.0,
                        "y": 52.0
            },
            {
                        "id": "MEC7DO",
                        "name": "TRATAMENTO DE MATERIAIS POR PLASMA",
                        "cht": 45,
                        "chs": 3,
                        "dependencies": [
                                    "MEC73D"
                        ],
                        "groupId": "[1219]",
                        "track": "Engenharia de Materiais & Manufatura Avançada",
                        "period": 3,
                        "type": "optional",
                        "x": 26.0,
                        "y": 52.0
            },
            {
                        "id": "MEC7DP",
                        "name": "TRATAMENTOS DE SUPERFÍCIE",
                        "cht": 45,
                        "chs": 3,
                        "dependencies": [
                                    "MEC73D"
                        ],
                        "groupId": "[1219]",
                        "track": "Engenharia de Materiais & Manufatura Avançada",
                        "period": 3,
                        "type": "optional",
                        "x": 42.0,
                        "y": 52.0
            },
            {
                        "id": "MEC7EA",
                        "name": "ANÁLISE DE SUPERFÍCIES USINADAS",
                        "cht": 60,
                        "chs": 4,
                        "dependencies": [
                                    "MEC77B"
                        ],
                        "groupId": "[1219]",
                        "track": "Engenharia de Materiais & Manufatura Avançada",
                        "period": 3,
                        "type": "optional",
                        "x": 58.0,
                        "y": 52.0
            },
            {
                        "id": "MEC7ED",
                        "name": "FABRICAÇÃO AUXILIADA POR COMPUTADOR (CAD/CAM)",
                        "cht": 60,
                        "chs": 4,
                        "dependencies": [
                                    "MEC77B"
                        ],
                        "groupId": "[1219]",
                        "track": "Engenharia de Materiais & Manufatura Avançada",
                        "period": 3,
                        "type": "optional",
                        "x": 74.0,
                        "y": 52.0
            },
            {
                        "id": "MEC7EF",
                        "name": "PROCESSOS DE USINAGEM NÃO CONVENCIONAIS",
                        "cht": 45,
                        "chs": 3,
                        "dependencies": [
                                    "MECP75A"
                        ],
                        "groupId": "[1219]",
                        "track": "Engenharia de Materiais & Manufatura Avançada",
                        "period": 3,
                        "type": "optional",
                        "x": 90.0,
                        "y": 52.0
            },
            {
                        "id": "MEC7EI",
                        "name": "TECNOLOGIAS DE PROTOTIPAGEM RÁPIDA",
                        "cht": 60,
                        "chs": 4,
                        "dependencies": [
                                    "MEC73A"
                        ],
                        "groupId": "[1219]",
                        "track": "Engenharia de Materiais & Manufatura Avançada",
                        "period": 3,
                        "type": "optional",
                        "x": 10.0,
                        "y": 56.2
            },
            {
                        "id": "MEC7EJ",
                        "name": "USINAGEM ABRASIVA",
                        "cht": 60,
                        "chs": 4,
                        "dependencies": [
                                    "MECP75A"
                        ],
                        "groupId": "[1219]",
                        "track": "Engenharia de Materiais & Manufatura Avançada",
                        "period": 3,
                        "type": "optional",
                        "x": 26.0,
                        "y": 56.2
            },
            {
                        "id": "MEC73D",
                        "name": "TRATAMENTOS TÉRMICOS",
                        "cht": 60,
                        "chs": 4,
                        "dependencies": [
                                    "MECP72E"
                        ],
                        "groupId": "[1219]",
                        "track": "Engenharia de Materiais & Manufatura Avançada",
                        "period": 3,
                        "type": "optional",
                        "x": 42.0,
                        "y": 56.2
            },
            {
                        "id": "MEC74F",
                        "name": "ENSAIOS DE MATERIAIS",
                        "cht": 60,
                        "chs": 4,
                        "dependencies": [
                                    "MECP72E"
                        ],
                        "groupId": "[1219]",
                        "track": "Engenharia de Materiais & Manufatura Avançada",
                        "period": 3,
                        "type": "optional",
                        "x": 58.0,
                        "y": 56.2
            },
            {
                        "id": "MEC74G",
                        "name": "MATERIAIS CERÂMICOS E POLIMÉRICOS",
                        "cht": 45,
                        "chs": 3,
                        "dependencies": [
                                    "MECP72E"
                        ],
                        "groupId": "[1219]",
                        "track": "Engenharia de Materiais & Manufatura Avançada",
                        "period": 3,
                        "type": "optional",
                        "x": 74.0,
                        "y": 56.2
            },
            {
                        "id": "MEC77B",
                        "name": "USINAGEM CNC",
                        "cht": 45,
                        "chs": 3,
                        "dependencies": [
                                    "MECP75A"
                        ],
                        "groupId": "[1219]",
                        "track": "Engenharia de Materiais & Manufatura Avançada",
                        "period": 3,
                        "type": "optional",
                        "x": 90.0,
                        "y": 56.2
            },
            {
                        "id": "MEC7AI",
                        "name": "TECNOLOGIA ASSISTIVA",
                        "cht": 45,
                        "chs": 3,
                        "dependencies": [
                                    "MEC78G"
                        ],
                        "groupId": "[1219]",
                        "track": "Sistemas Mecânicos, Térmicos & Fluidos",
                        "period": 3,
                        "type": "optional",
                        "x": 10.0,
                        "y": 63.4
            },
            {
                        "id": "MEC7BA",
                        "name": "DINÂMICA DOS FLUIDOS COMPUTACIONAL APLICADA",
                        "cht": 45,
                        "chs": 3,
                        "dependencies": [
                                    "MEC77G"
                        ],
                        "groupId": "[1219]",
                        "track": "Sistemas Mecânicos, Térmicos & Fluidos",
                        "period": 3,
                        "type": "optional",
                        "x": 26.0,
                        "y": 63.4
            },
            {
                        "id": "MEC7BB",
                        "name": "DINÂMICA DOS MATERIAIS POLIMÉRICOS",
                        "cht": 30,
                        "chs": 2,
                        "dependencies": [
                                    "MEC75G"
                        ],
                        "groupId": "[1219]",
                        "track": "Sistemas Mecânicos, Térmicos & Fluidos",
                        "period": 3,
                        "type": "optional",
                        "x": 42.0,
                        "y": 63.4
            },
            {
                        "id": "MEC7BC",
                        "name": "ESCOAMENTO DE ÓLEO E GÁS EM TUBULAÇÕES",
                        "cht": 45,
                        "chs": 3,
                        "dependencies": [
                                    "MEC75G"
                        ],
                        "groupId": "[1219]",
                        "track": "Sistemas Mecânicos, Térmicos & Fluidos",
                        "period": 3,
                        "type": "optional",
                        "x": 58.0,
                        "y": 63.4
            },
            {
                        "id": "MEC7BE",
                        "name": "FUNDAMENTOS DE ENGENHARIA DE PETRÓLEO",
                        "cht": 45,
                        "chs": 3,
                        "dependencies": [
                                    "MEC74E"
                        ],
                        "groupId": "[1219]",
                        "track": "Sistemas Mecânicos, Térmicos & Fluidos",
                        "period": 3,
                        "type": "optional",
                        "x": 74.0,
                        "y": 63.4
            },
            {
                        "id": "MEC7BF",
                        "name": "FUNDAMENTOS E APLICAÇÕES DE MICRO E NANOFLUIDODINÂMICA",
                        "cht": 30,
                        "chs": 2,
                        "dependencies": [
                                    "MEC76H"
                        ],
                        "groupId": "[1219]",
                        "track": "Sistemas Mecânicos, Térmicos & Fluidos",
                        "period": 3,
                        "type": "optional",
                        "x": 90.0,
                        "y": 63.4
            },
            {
                        "id": "MEC7BG",
                        "name": "INTRODUÇÃO À DINÂMICA DOS FLUIDOS",
                        "cht": 30,
                        "chs": 2,
                        "dependencies": [
                                    "MEC76H"
                        ],
                        "groupId": "[1219]",
                        "track": "Sistemas Mecânicos, Térmicos & Fluidos",
                        "period": 3,
                        "type": "optional",
                        "x": 10.0,
                        "y": 67.6
            },
            {
                        "id": "MEC7BH",
                        "name": "INTRODUÇÃO À DINÂMICA DOS FLUIDOS COMPUTACIONAL",
                        "cht": 45,
                        "chs": 3,
                        "dependencies": [
                                    "MEC76G",
                                    "MEC76H"
                        ],
                        "groupId": "[1219]",
                        "track": "Sistemas Mecânicos, Térmicos & Fluidos",
                        "period": 3,
                        "type": "optional",
                        "x": 26.0,
                        "y": 67.6
            },
            {
                        "id": "MEC7BI",
                        "name": "MÁQUINAS DE FLUXO",
                        "cht": 45,
                        "chs": 3,
                        "dependencies": [
                                    "MEC75G"
                        ],
                        "groupId": "[1219]",
                        "track": "Sistemas Mecânicos, Térmicos & Fluidos",
                        "period": 3,
                        "type": "optional",
                        "x": 42.0,
                        "y": 67.6
            },
            {
                        "id": "MEC7BJ",
                        "name": "MEIOS POROSOS: CONCEITOS E APLICAÇÕES NA ENGENHARIA",
                        "cht": 30,
                        "chs": 2,
                        "dependencies": [
                                    "MEC75G",
                                    "MEC76G"
                        ],
                        "groupId": "[1219]",
                        "track": "Sistemas Mecânicos, Térmicos & Fluidos",
                        "period": 3,
                        "type": "optional",
                        "x": 58.0,
                        "y": 67.6
            },
            {
                        "id": "MEC7BK",
                        "name": "MOTORES DE COMBUSTÃO INTERNA",
                        "cht": 45,
                        "chs": 3,
                        "dependencies": [
                                    "MEC75F"
                        ],
                        "groupId": "[1219]",
                        "track": "Sistemas Mecânicos, Térmicos & Fluidos",
                        "period": 3,
                        "type": "optional",
                        "x": 74.0,
                        "y": 67.6
            },
            {
                        "id": "MEC7BL",
                        "name": "PRINCÍPIOS DE REFRIGERAÇÃO",
                        "cht": 45,
                        "chs": 3,
                        "dependencies": [
                                    "MEC75F",
                                    "MEC77G"
                        ],
                        "groupId": "[1219]",
                        "track": "Sistemas Mecânicos, Térmicos & Fluidos",
                        "period": 3,
                        "type": "optional",
                        "x": 90.0,
                        "y": 67.6
            },
            {
                        "id": "MEC7BM",
                        "name": "PROJETO DE INSTALAÇÕES DE CONDICIONAMENTO DE AR",
                        "cht": 45,
                        "chs": 3,
                        "dependencies": [
                                    "MEC75F",
                                    "MEC77G"
                        ],
                        "groupId": "[1219]",
                        "track": "Sistemas Mecânicos, Térmicos & Fluidos",
                        "period": 3,
                        "type": "optional",
                        "x": 10.0,
                        "y": 71.8
            },
            {
                        "id": "MEC7BN",
                        "name": "REOLOGIA APLICADA À ENGENHARIA DE PETRÓLEO",
                        "cht": 30,
                        "chs": 2,
                        "dependencies": [
                                    "MEC76H"
                        ],
                        "groupId": "[1219]",
                        "track": "Sistemas Mecânicos, Térmicos & Fluidos",
                        "period": 3,
                        "type": "optional",
                        "x": 26.0,
                        "y": 71.8
            },
            {
                        "id": "MEC7BQ",
                        "name": "SIMULAÇÃO E OTIMIZAÇÃO DE SISTEMAS TÉRMICOS",
                        "cht": 45,
                        "chs": 3,
                        "dependencies": [
                                    "MEC75F",
                                    "MEC77G"
                        ],
                        "groupId": "[1219]",
                        "track": "Sistemas Mecânicos, Térmicos & Fluidos",
                        "period": 3,
                        "type": "optional",
                        "x": 42.0,
                        "y": 71.8
            },
            {
                        "id": "MEC7BR",
                        "name": "SISTEMAS DE POTENCIA DE VAPOR",
                        "cht": 45,
                        "chs": 3,
                        "dependencies": [
                                    "MEC75F",
                                    "MEC77G"
                        ],
                        "groupId": "[1219]",
                        "track": "Sistemas Mecânicos, Térmicos & Fluidos",
                        "period": 3,
                        "type": "optional",
                        "x": 58.0,
                        "y": 71.8
            },
            {
                        "id": "MEC7BS",
                        "name": "TÓPICOS EM SISTEMAS TERMOFLUIDOMECÂNICOS 1",
                        "cht": 45,
                        "chs": 3,
                        "dependencies": [
                                    "MEC77G"
                        ],
                        "groupId": "[1219]",
                        "track": "Sistemas Mecânicos, Térmicos & Fluidos",
                        "period": 3,
                        "type": "optional",
                        "x": 74.0,
                        "y": 71.8
            },
            {
                        "id": "MEC7BT",
                        "name": "TÓPICOS EM SISTEMAS TERMOFLUIDOMECÂNICOS 2",
                        "cht": 30,
                        "chs": 2,
                        "dependencies": [
                                    "MEC77G"
                        ],
                        "groupId": "[1219]",
                        "track": "Sistemas Mecânicos, Térmicos & Fluidos",
                        "period": 3,
                        "type": "optional",
                        "x": 90.0,
                        "y": 71.8
            },
            {
                        "id": "MEC7BU",
                        "name": "TROCADORES DE CALOR",
                        "cht": 45,
                        "chs": 3,
                        "dependencies": [
                                    "MEC77G"
                        ],
                        "groupId": "[1219]",
                        "track": "Sistemas Mecânicos, Térmicos & Fluidos",
                        "period": 3,
                        "type": "optional",
                        "x": 10.0,
                        "y": 76.0
            },
            {
                        "id": "MEC7FB",
                        "name": "FUDAMENTOS DE ACÚSTICA",
                        "cht": 60,
                        "chs": 4,
                        "dependencies": [
                                    "MEC77E"
                        ],
                        "groupId": "[1219]",
                        "track": "Sistemas Mecânicos, Térmicos & Fluidos",
                        "period": 3,
                        "type": "optional",
                        "x": 26.0,
                        "y": 76.0
            },
            {
                        "id": "MEC7FC",
                        "name": "MECÂNICA DA FRATURA E FADIGA",
                        "cht": 60,
                        "chs": 4,
                        "dependencies": [
                                    "MEC76E"
                        ],
                        "groupId": "[1219]",
                        "track": "Sistemas Mecânicos, Térmicos & Fluidos",
                        "period": 3,
                        "type": "optional",
                        "x": 42.0,
                        "y": 76.0
            },
            {
                        "id": "MEC7FD",
                        "name": "MÉTODOS DE OTIMIZAÇÃO APLICADOS À ENGENHARIA",
                        "cht": 60,
                        "chs": 4,
                        "dependencies": [
                                    "MEC78G"
                        ],
                        "groupId": "[1219]",
                        "track": "Sistemas Mecânicos, Térmicos & Fluidos",
                        "period": 3,
                        "type": "optional",
                        "x": 58.0,
                        "y": 76.0
            },
            {
                        "id": "MEC7FE",
                        "name": "MÉTODOS DOS ELEMENTOS FINITOS PARA MECÂNICA ESTRUTURAL",
                        "cht": 60,
                        "chs": 4,
                        "dependencies": [
                                    "MEC76E"
                        ],
                        "groupId": "[1219]",
                        "track": "Sistemas Mecânicos, Térmicos & Fluidos",
                        "period": 3,
                        "type": "optional",
                        "x": 74.0,
                        "y": 76.0
            },
            {
                        "id": "MEC7FF",
                        "name": "MÉTODOS EXPERIMENTAIS EM ACÚSTICA",
                        "cht": 60,
                        "chs": 4,
                        "dependencies": [
                                    "MEC77E"
                        ],
                        "groupId": "[1219]",
                        "track": "Sistemas Mecânicos, Térmicos & Fluidos",
                        "period": 3,
                        "type": "optional",
                        "x": 90.0,
                        "y": 76.0
            },
            {
                        "id": "MEC7FG",
                        "name": "MÉTODOS NUMÉRICOS",
                        "cht": 60,
                        "chs": 4,
                        "dependencies": [
                                    "MEC76E"
                        ],
                        "groupId": "[1219]",
                        "track": "Sistemas Mecânicos, Térmicos & Fluidos",
                        "period": 3,
                        "type": "optional",
                        "x": 10.0,
                        "y": 80.2
            },
            {
                        "id": "MEC7FH",
                        "name": "TRIBOLOGIA DE ELEMENTOS DE MÁQUINAS 1",
                        "cht": 60,
                        "chs": 4,
                        "dependencies": [
                                    "MEC77A"
                        ],
                        "groupId": "[1219]",
                        "track": "Sistemas Mecânicos, Térmicos & Fluidos",
                        "period": 3,
                        "type": "optional",
                        "x": 26.0,
                        "y": 80.2
            },
            {
                        "id": "MEC7FI",
                        "name": "TRIBOLOGIA DE ELEMENTOS DE MÁQUINA 2",
                        "cht": 60,
                        "chs": 4,
                        "dependencies": [
                                    "MEC77A"
                        ],
                        "groupId": "[1219]",
                        "track": "Sistemas Mecânicos, Térmicos & Fluidos",
                        "period": 3,
                        "type": "optional",
                        "x": 42.0,
                        "y": 80.2
            },
            {
                        "id": "MEC7GB",
                        "name": "CRIATIVIDADE E INOVAÇÃO",
                        "cht": 45,
                        "chs": 3,
                        "dependencies": [
                                    "MEC78G"
                        ],
                        "groupId": "[1219]",
                        "track": "Sistemas Mecânicos, Térmicos & Fluidos",
                        "period": 3,
                        "type": "optional",
                        "x": 58.0,
                        "y": 80.2
            },
            {
                        "id": "MEC7GD",
                        "name": "MODELAGEM GEOMÉTRICA AVANÇADA",
                        "cht": 60,
                        "chs": 4,
                        "dependencies": [
                                    "MEC73A"
                        ],
                        "groupId": "[1219]",
                        "track": "Sistemas Mecânicos, Térmicos & Fluidos",
                        "period": 3,
                        "type": "optional",
                        "x": 74.0,
                        "y": 80.2
            },
            {
                        "id": "MEC7HA",
                        "name": "ANÁLISE EXPERIMENTAL DE TENSÕES",
                        "cht": 30,
                        "chs": 2,
                        "dependencies": [
                                    "MECP72E",
                                    "MEC76E"
                        ],
                        "groupId": "[1219]",
                        "track": "Sistemas Mecânicos, Térmicos & Fluidos",
                        "period": 3,
                        "type": "optional",
                        "x": 90.0,
                        "y": 80.2
            },
            {
                        "id": "MEC7HE",
                        "name": "MEDIÇÕES DE GRANDEZAS MECÂNICAS",
                        "cht": 30,
                        "chs": 2,
                        "dependencies": [
                                    "MEC74B"
                        ],
                        "groupId": "[1219]",
                        "track": "Sistemas Mecânicos, Térmicos & Fluidos",
                        "period": 3,
                        "type": "optional",
                        "x": 10.0,
                        "y": 84.4
            },
            {
                        "id": "MEC7HG",
                        "name": "PNEUMÁTICA E HIDRÁULICA 2",
                        "cht": 60,
                        "chs": 4,
                        "dependencies": [
                                    "MEC76C"
                        ],
                        "groupId": "[1219]",
                        "track": "Sistemas Mecânicos, Térmicos & Fluidos",
                        "period": 3,
                        "type": "optional",
                        "x": 26.0,
                        "y": 84.4
            },
            {
                        "id": "MEC73A",
                        "name": "DESENHO AUXILIADO POR COMPUTADOR 2",
                        "cht": 30,
                        "chs": 2,
                        "dependencies": [
                                    "MECP72D"
                        ],
                        "groupId": "[1219]",
                        "track": "Sistemas Mecânicos, Térmicos & Fluidos",
                        "period": 3,
                        "type": "optional",
                        "x": 42.0,
                        "y": 84.4
            },
            {
                        "id": "MEC74A",
                        "name": "DINÂMICA",
                        "cht": 60,
                        "chs": 4,
                        "dependencies": [
                                    "MEC73C"
                        ],
                        "groupId": "[1219]",
                        "track": "Sistemas Mecânicos, Térmicos & Fluidos",
                        "period": 3,
                        "type": "optional",
                        "x": 58.0,
                        "y": 84.4
            },
            {
                        "id": "MEC74E",
                        "name": "TERMODINÂMICA 1",
                        "cht": 60,
                        "chs": 4,
                        "dependencies": [
                                    "MECP71B",
                                    "MECP73A"
                        ],
                        "groupId": "[1219]",
                        "track": "Sistemas Mecânicos, Térmicos & Fluidos",
                        "period": 3,
                        "type": "optional",
                        "x": 74.0,
                        "y": 84.4
            },
            {
                        "id": "MEC75F",
                        "name": "TERMODINÂMICA 2",
                        "cht": 60,
                        "chs": 4,
                        "dependencies": [
                                    "MEC74E"
                        ],
                        "groupId": "[1219]",
                        "track": "Sistemas Mecânicos, Térmicos & Fluidos",
                        "period": 3,
                        "type": "optional",
                        "x": 90.0,
                        "y": 84.4
            },
            {
                        "id": "MEC75G",
                        "name": "MECÂNICA DOS FLUIDOS 1",
                        "cht": 60,
                        "chs": 4,
                        "dependencies": [
                                    "MEC74A",
                                    "MEC74E"
                        ],
                        "groupId": "[1219]",
                        "track": "Sistemas Mecânicos, Térmicos & Fluidos",
                        "period": 3,
                        "type": "optional",
                        "x": 10.0,
                        "y": 88.6
            },
            {
                        "id": "MEC76C",
                        "name": "PNEUMÁTICA E HIDRÁULICA",
                        "cht": 60,
                        "chs": 4,
                        "dependencies": [
                                    "MEC75G"
                        ],
                        "groupId": "[1219]",
                        "track": "Sistemas Mecânicos, Térmicos & Fluidos",
                        "period": 3,
                        "type": "optional",
                        "x": 26.0,
                        "y": 88.6
            },
            {
                        "id": "MEC76E",
                        "name": "MECÂNICA DOS SÓLIDOS 2",
                        "cht": 60,
                        "chs": 4,
                        "dependencies": [
                                    "MEC76A"
                        ],
                        "groupId": "[1219]",
                        "track": "Sistemas Mecânicos, Térmicos & Fluidos",
                        "period": 3,
                        "type": "optional",
                        "x": 42.0,
                        "y": 88.6
            },
            {
                        "id": "MEC76F",
                        "name": "MECANISMOS",
                        "cht": 60,
                        "chs": 4,
                        "dependencies": [
                                    "MEC74A"
                        ],
                        "groupId": "[1219]",
                        "track": "Sistemas Mecânicos, Térmicos & Fluidos",
                        "period": 3,
                        "type": "optional",
                        "x": 58.0,
                        "y": 88.6
            },
            {
                        "id": "MEC76G",
                        "name": "TRANSFERÊNCIA DE CALOR 1",
                        "cht": 60,
                        "chs": 4,
                        "dependencies": [
                                    "MEC74E"
                        ],
                        "groupId": "[1219]",
                        "track": "Sistemas Mecânicos, Térmicos & Fluidos",
                        "period": 3,
                        "type": "optional",
                        "x": 74.0,
                        "y": 88.6
            },
            {
                        "id": "MEC76H",
                        "name": "MECÂNICA DOS FLUIDOS 2",
                        "cht": 60,
                        "chs": 4,
                        "dependencies": [
                                    "MEC75G"
                        ],
                        "groupId": "[1219]",
                        "track": "Sistemas Mecânicos, Térmicos & Fluidos",
                        "period": 3,
                        "type": "optional",
                        "x": 90.0,
                        "y": 88.6
            },
            {
                        "id": "MEC77A",
                        "name": "ELEMENTOS DE MÁQUINAS 2",
                        "cht": 60,
                        "chs": 4,
                        "dependencies": [
                                    "MEC77F"
                        ],
                        "groupId": "[1219]",
                        "track": "Sistemas Mecânicos, Térmicos & Fluidos",
                        "period": 3,
                        "type": "optional",
                        "x": 26.0,
                        "y": 92.8
            },
            {
                        "id": "MEC77E",
                        "name": "VIBRAÇÕES",
                        "cht": 60,
                        "chs": 4,
                        "dependencies": [
                                    "MECP72B",
                                    "MEC74A"
                        ],
                        "groupId": "[1219]",
                        "track": "Sistemas Mecânicos, Térmicos & Fluidos",
                        "period": 3,
                        "type": "optional",
                        "x": 42.0,
                        "y": 92.8
            },
            {
                        "id": "MEC77F",
                        "name": "ELEMENTOS DE MÁQUINAS 1",
                        "cht": 60,
                        "chs": 4,
                        "dependencies": [
                                    "MEC76E",
                                    "MEC76F"
                        ],
                        "groupId": "[1219]",
                        "track": "Sistemas Mecânicos, Térmicos & Fluidos",
                        "period": 3,
                        "type": "optional",
                        "x": 58.0,
                        "y": 92.8
            },
            {
                        "id": "MEC77G",
                        "name": "TRANSFERÊNCIA DE CALOR 2",
                        "cht": 60,
                        "chs": 4,
                        "dependencies": [
                                    "MEC76G",
                                    "MEC76H"
                        ],
                        "groupId": "[1219]",
                        "track": "Sistemas Mecânicos, Térmicos & Fluidos",
                        "period": 3,
                        "type": "optional",
                        "x": 74.0,
                        "y": 92.8
            }
];

export { TOTAL_MANDATORY_HOURS, TOTAL_EXTENSION_HOURS, TOTAL_HUMANITIES_HOURS, TOTAL_OPTIONAL_HOURS, TOTAL_COMPLEMENTARY_HOURS, TOTAL_DEGREE_HOURS, NODE_WIDTH, NODE_HEIGHT, OPTIONAL_LAYOUT_MIN_X, OPTIONAL_LAYOUT_MAX_X, OPTIONAL_LAYOUT_MIN_Y, OPTIONAL_LAYOUT_MAX_Y, SPECIALIZATION_TRACKS, OPTIONAL_GROUPS_CONFIG, allNodesData, allHumanitiesData, allOptionalNodesData };
