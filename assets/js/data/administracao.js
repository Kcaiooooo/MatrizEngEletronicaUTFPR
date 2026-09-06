const TOTAL_COMPLEMENTARY_HOURS = 120;

const TOTAL_EXTENSION_HOURS = 315;

const TOTAL_HUMANITIES_HOURS = 90;

const TOTAL_OPTIONAL_HOURS = 120;

const NODE_WIDTH = 130;

const NODE_HEIGHT = 90;

const OPTIONAL_LAYOUT_MIN_X = 14;

const OPTIONAL_LAYOUT_MAX_X = 92;

const OPTIONAL_LAYOUT_MIN_Y = 10;

const OPTIONAL_LAYOUT_MAX_Y = 92;

const SPECIALIZATION_TRACKS = {
            'Tópicos em Sustentabilidade e Gestão [1113]': [
                'FCH7XF', 'GEE7AA', 'GEE7AB', 'GEE7AC', 'GEE7AD', 'GEE7AE', 'GEE7AF', 'GEE7AH', 'GEE7AI', 'GEE7AJ', 'GEE7AK', 'GEE7AL', 'GEE7AM', 'GEE7AN', 'GEE7AO'
            ],
            'Tópicos em Inovação e Tecnologia [1114]': [
                'FCH7HA', 'GEE7BA', 'GEE7BB', 'GEE7BC', 'GEE7BD', 'GEE7BE', 'GEE7BH', 'GEE7BI', 'GEE7BJ', 'GEE7BK', 'GEE7BL', 'GEE7BM', 'GEE7BN'
            ],
            'Tópicos em Empreendedorismo [1115]': [
                'GEE7CA', 'GEE7CB', 'GEE7CC', 'GEE7CD', 'GEE7CE', 'GEE7CF', 'GEE7CG', 'GEE7CH', 'GEE7CI', 'GEE7CJ', 'GEE7CK'
            ],
            'Tópicos em Formação Humana [1116]': [
                'EDU70J', 'FCH7PC', 'FCH7XB', 'FCH7XD', 'GEE7DA', 'GEE7DB', 'GEE7DC', 'GEE7DD'
            ]
        };

const OPTIONAL_GROUPS_CONFIG = {
            '[1112]': { requiredHours: 120, name: 'Optativas de Aperfeiçoamento' },
            '[1113]': { requiredHours: 30, name: 'Tópicos em Sustentabilidade e Gestão' },
            '[1114]': { requiredHours: 30, name: 'Tópicos em Inovação e Tecnologia' },
            '[1115]': { requiredHours: 30, name: 'Tópicos em Empreendedorismo' },
            '[1116]': { requiredHours: 30, name: 'Tópicos em Formação Humana' }
        };

const allNodesData = [
            {
                "id": "FCH7FB",
                "name": "FUNDAMENTOS DA ÉTICA",
                "dependencies": [],
                "cht": 45,
                "type": "subject",
                "y": 5.0,
                "period": 1,
                "x": 5.5
            },
            {
                "id": "FCH7SA",
                "name": "SOCIOLOGIA",
                "dependencies": [],
                "cht": 45,
                "type": "subject",
                "y": 5.0,
                "period": 1,
                "x": 20.3
            },
            {
                "id": "GEE71A",
                "name": "ECONOMIA",
                "dependencies": [],
                "cht": 30,
                "type": "subject",
                "y": 5.0,
                "period": 1,
                "x": 35.2
            },
            {
                "id": "GEE71B",
                "name": "TEORIA GERAL DO ESTADO",
                "dependencies": [],
                "cht": 45,
                "type": "subject",
                "y": 5.0,
                "period": 1,
                "x": 50.0
            },
            {
                "id": "GEE71D",
                "name": "FUNDAMENTOS DE ADMINISTRAÇÃO",
                "dependencies": [],
                "cht": 60,
                "type": "subject",
                "y": 5.0,
                "period": 1,
                "x": 64.8
            },
            {
                "id": "GEE71G",
                "name": "INICIAÇÃO AO ENSINO, PESQUISA E EXTENSÃO",
                "dependencies": [],
                "cht": 30,
                "type": "subject",
                "y": 5.0,
                "period": 1,
                "x": 79.7
            },
            {
                "id": "MAT7T1",
                "name": "TÓPICOS MATEMÁTICOS 1",
                "dependencies": [],
                "cht": 90,
                "type": "subject",
                "y": 5.0,
                "period": 1,
                "x": 94.5
            },
            {
                "id": "EST70A",
                "name": "INTRODUÇÃO À ESTATÍSTICA",
                "dependencies": [],
                "cht": 60,
                "type": "subject",
                "y": 18.0,
                "period": 2,
                "x": 5.5
            },
            {
                "id": "FCH7FA",
                "name": "FILOSOFIA DA CIÊNCIA E DA TECNOLOGIA",
                "dependencies": [],
                "cht": 45,
                "type": "subject",
                "y": 18.0,
                "period": 2,
                "x": 16.6
            },
            {
                "id": "GEE70B",
                "name": "ATIVIDADES COMPLEMENTARES",
                "dependencies": [],
                "cht": 120,
                "type": "subject",
                "y": 18.0,
                "period": 2,
                "x": 27.8
            },
            {
                "id": "GEE72A",
                "name": "MICROECONOMIA",
                "dependencies": [],
                "cht": 45,
                "type": "subject",
                "y": 18.0,
                "period": 2,
                "x": 38.9
            },
            {
                "id": "GEE72B",
                "name": "INSTITUIÇÕES DE DIREITO",
                "dependencies": [],
                "cht": 45,
                "type": "subject",
                "y": 18.0,
                "period": 2,
                "x": 50.0
            },
            {
                "id": "GEE72D",
                "name": "TEORIAS DA ADMINISTRAÇÃO",
                "dependencies": [],
                "cht": 60,
                "type": "subject",
                "y": 18.0,
                "period": 2,
                "x": 61.1
            },
            {
                "id": "GEE72E",
                "name": "EMPREENDEDORISMO",
                "dependencies": [],
                "cht": 45,
                "type": "subject",
                "y": 18.0,
                "period": 2,
                "x": 72.2
            },
            {
                "id": "GEE72F",
                "name": "CONTABILIDADE EMPRESARIAL",
                "dependencies": [],
                "cht": 60,
                "type": "subject",
                "y": 18.0,
                "period": 2,
                "x": 83.4
            },
            {
                "id": "GEE72H",
                "name": "A PRÁTICA DA EXTENSÃO UNIVERSITÁRIA",
                "dependencies": [],
                "cht": 30,
                "type": "subject",
                "y": 18.0,
                "period": 2,
                "x": 94.5
            },
            {
                "id": "GEE73A",
                "name": "MACROECONOMIA",
                "dependencies": [],
                "cht": 45,
                "type": "subject",
                "y": 31.0,
                "period": 3,
                "x": 5.5
            },
            {
                "id": "GEE73B",
                "name": "GOVERNANÇA E GESTÃO PÚBLICA",
                "dependencies": [],
                "cht": 45,
                "type": "subject",
                "y": 31.0,
                "period": 3,
                "x": 18.2
            },
            {
                "id": "GEE73C",
                "name": "MATEMÁTICA FINANCEIRA",
                "dependencies": [],
                "cht": 45,
                "type": "subject",
                "y": 31.0,
                "period": 3,
                "x": 30.9
            },
            {
                "id": "GEE73D",
                "name": "ESTRUTURA E ANÁLISE DE DEMONSTRAÇÕES",
                "dependencies": [],
                "cht": 45,
                "type": "subject",
                "y": 31.0,
                "period": 3,
                "x": 43.6
            },
            {
                "id": "GEE73E",
                "name": "GESTÃO DE MARKETING",
                "dependencies": [],
                "cht": 60,
                "type": "subject",
                "y": 31.0,
                "period": 3,
                "x": 56.4
            },
            {
                "id": "GEE73F",
                "name": "TEORIAS ORGANIZACIONAIS",
                "dependencies": [],
                "cht": 60,
                "type": "subject",
                "y": 31.0,
                "period": 3,
                "x": 69.1
            },
            {
                "id": "GEE73G",
                "name": "ECONOMIA E POLÍTICAS PÚBLICAS",
                "dependencies": [],
                "cht": 45,
                "type": "subject",
                "y": 31.0,
                "period": 3,
                "x": 81.8
            },
            {
                "id": "GEE73H",
                "name": "INTRODUÇÃO AO MUNDO DO TRABALHO I",
                "dependencies": [],
                "cht": 30,
                "type": "subject",
                "y": 31.0,
                "period": 3,
                "x": 94.5
            },
            {
                "id": "GEE70A",
                "name": "ESTÁGIO OBRIGATÓRIO",
                "dependencies": [],
                "cht": 360,
                "type": "subject",
                "y": 44.0,
                "period": 4,
                "x": 5.5
            },
            {
                "id": "GEE74A",
                "name": "ECONOMIA BRASILEIRA",
                "dependencies": [],
                "cht": 30,
                "type": "subject",
                "y": 44.0,
                "period": 4,
                "x": 16.6
            },
            {
                "id": "GEE74B",
                "name": "PESQUISA OPERACIONAL",
                "dependencies": [],
                "cht": 60,
                "type": "subject",
                "y": 44.0,
                "period": 4,
                "x": 27.8
            },
            {
                "id": "GEE74C",
                "name": "CUSTOS E FORMAÇÃO DE PREÇOS",
                "dependencies": [],
                "cht": 45,
                "type": "subject",
                "y": 44.0,
                "period": 4,
                "x": 38.9
            },
            {
                "id": "GEE74D",
                "name": "TECNOLOGIAS DE GESTÃO E SUSTENTABILIDADE",
                "dependencies": [],
                "cht": 45,
                "type": "subject",
                "y": 44.0,
                "period": 4,
                "x": 50.0
            },
            {
                "id": "GEE74E",
                "name": "PESQUISA MERCADOLÓGICA E INTEL. DE MERCADO",
                "dependencies": [],
                "cht": 60,
                "type": "subject",
                "y": 44.0,
                "period": 4,
                "x": 61.1
            },
            {
                "id": "GEE74F",
                "name": "COMPORTAMENTO ORGANIZACIONAL",
                "dependencies": [],
                "cht": 60,
                "type": "subject",
                "y": 44.0,
                "period": 4,
                "x": 72.2
            },
            {
                "id": "GEE74G",
                "name": "GESTÃO DE TECNOLOGIAS DE INFORMAÇÃO",
                "dependencies": [],
                "cht": 30,
                "type": "subject",
                "y": 44.0,
                "period": 4,
                "x": 83.4
            },
            {
                "id": "GEE74H",
                "name": "INTRODUÇÃO AO MUNDO DO TRABALHO II",
                "dependencies": [],
                "cht": 30,
                "type": "subject",
                "y": 44.0,
                "period": 4,
                "x": 94.5
            },
            {
                "id": "FCH7PA",
                "name": "PSICOLOGIA DO TRABALHO",
                "dependencies": [],
                "cht": 30,
                "type": "subject",
                "y": 57.0,
                "period": 5,
                "x": 5.5
            },
            {
                "id": "GEE75A",
                "name": "PROCESSOS E GESTÃO DA QUALIDADE",
                "dependencies": [],
                "cht": 60,
                "type": "subject",
                "y": 57.0,
                "period": 5,
                "x": 20.3
            },
            {
                "id": "GEE75B",
                "name": "GESTÃO DE PRODUÇÃO E OPERAÇÕES",
                "dependencies": [],
                "cht": 30,
                "type": "subject",
                "y": 57.0,
                "period": 5,
                "x": 35.2
            },
            {
                "id": "GEE75C",
                "name": "FINANÇAS CORPORATIVAS I",
                "dependencies": [],
                "cht": 60,
                "type": "subject",
                "y": 57.0,
                "period": 5,
                "x": 50.0
            },
            {
                "id": "GEE75D",
                "name": "GESTÃO ESTRATÉGICA",
                "dependencies": [],
                "cht": 60,
                "type": "subject",
                "y": 57.0,
                "period": 5,
                "x": 64.8
            },
            {
                "id": "GEE75E",
                "name": "GESTÃO DE PESSOAS E DESENV. INTERPESSOAL",
                "dependencies": [],
                "cht": 45,
                "type": "subject",
                "y": 57.0,
                "period": 5,
                "x": 79.7
            },
            {
                "id": "GEE75F",
                "name": "FINANÇAS E ORÇAMENTO PÚBLICO",
                "dependencies": [],
                "cht": 45,
                "type": "subject",
                "y": 57.0,
                "period": 5,
                "x": 94.5
            },
            {
                "id": "GEE76A",
                "name": "ELABORAÇÃO E GESTÃO DE PROJETOS",
                "dependencies": [],
                "cht": 45,
                "type": "subject",
                "y": 70.0,
                "period": 6,
                "x": 5.5
            },
            {
                "id": "GEE76B",
                "name": "METODOLOGIA DA PESQUISA",
                "dependencies": [],
                "cht": 30,
                "type": "subject",
                "y": 70.0,
                "period": 6,
                "x": 20.3
            },
            {
                "id": "GEE76C",
                "name": "FINANÇAS CORPORATIVAS II",
                "dependencies": [
                    "GEE75C"
                ],
                "cht": 60,
                "type": "subject",
                "y": 70.0,
                "period": 6,
                "x": 35.2
            },
            {
                "id": "GEE76D",
                "name": "GESTÃO ESTRATÉGICA DE MARKETING",
                "dependencies": [
                    "GEE75D"
                ],
                "cht": 45,
                "type": "subject",
                "y": 70.0,
                "period": 6,
                "x": 50.0
            },
            {
                "id": "GEE76E",
                "name": "GESTÃO ESTRATÉGICA DE PESSOAS",
                "dependencies": [],
                "cht": 60,
                "type": "subject",
                "y": 70.0,
                "period": 6,
                "x": 64.8
            },
            {
                "id": "GEE76F",
                "name": "LOGÍSTICA E CADEIA DE SUPRIMENTOS",
                "dependencies": [],
                "cht": 60,
                "type": "subject",
                "y": 70.0,
                "period": 6,
                "x": 79.7
            },
            {
                "id": "GEE76G",
                "name": "DIREITOS ESPECIAIS APLICADOS",
                "dependencies": [],
                "cht": 45,
                "type": "subject",
                "y": 70.0,
                "period": 6,
                "x": 94.5
            },
            {
                "id": "GEE77A",
                "name": "TCC1",
                "dependencies": [],
                "cht": 60,
                "type": "subject",
                "y": 83.0,
                "period": 7,
                "x": 5.5
            },
            {
                "id": "GEE77B",
                "name": "LABORATÓRIO DE GESTÃO",
                "dependencies": [],
                "cht": 30,
                "type": "subject",
                "y": 83.0,
                "period": 7,
                "x": 18.2
            },
            {
                "id": "GEE77C",
                "name": "CONTROLADORIA E GESTÃO DE RESULTADOS",
                "dependencies": [],
                "cht": 60,
                "type": "subject",
                "y": 83.0,
                "period": 7,
                "x": 30.9
            },
            {
                "id": "GEE77D",
                "name": "GESTÃO DE SERVIÇOS",
                "dependencies": [],
                "cht": 30,
                "type": "subject",
                "y": 83.0,
                "period": 7,
                "x": 43.6
            },
            {
                "id": "GEE78A",
                "name": "TCC2",
                "dependencies": [
                    "GEE77A"
                ],
                "cht": 60,
                "type": "subject",
                "y": 94.0,
                "period": 8,
                "x": 5.5
            }
        ];

const allHumanitiesData = [];

const allOptionalNodesData = [
            {
                "id": "FCH7XF",
                "name": "DIMENSÃO AMBIENTAL NA GESTÃO URBANA",
                "dependencies": [],
                "period": 7,
                "cht": 45,
                "x": 5.5,
                "y": 12.0,
                "type": "optional",
                "groupId": "[1113]"
            },
            {
                "id": "GEE7AA",
                "name": "GESTÃO DO CONHECIMENTO",
                "dependencies": [],
                "period": 7,
                "cht": 30,
                "x": 17.0,
                "y": 12.0,
                "type": "optional",
                "groupId": "[1113]"
            },
            {
                "id": "GEE7AB",
                "name": "NEGÓCIOS INTERNACIONAIS",
                "dependencies": [],
                "period": 7,
                "cht": 30,
                "x": 28.5,
                "y": 12.0,
                "type": "optional",
                "groupId": "[1113]"
            },
            {
                "id": "GEE7AC",
                "name": "TEORIAS ORGANIZACIONAIS II",
                "dependencies": [],
                "period": 7,
                "cht": 30,
                "x": 40.0,
                "y": 12.0,
                "type": "optional",
                "groupId": "[1113]"
            },
            {
                "id": "GEE7AD",
                "name": "TOMADA DE DECISÃO GERENCIAL",
                "dependencies": [],
                "period": 7,
                "cht": 30,
                "x": 51.5,
                "y": 12.0,
                "type": "optional",
                "groupId": "[1113]"
            },
            {
                "id": "GEE7AE",
                "name": "CONSUMO CONSCIENTE E SUSTENTÁVEL",
                "dependencies": [],
                "period": 7,
                "cht": 30,
                "x": 63.0,
                "y": 12.0,
                "type": "optional",
                "groupId": "[1113]"
            },
            {
                "id": "GEE7AF",
                "name": "GESTÃO DA PRODUÇÃO E OPERAÇÕES II",
                "dependencies": [],
                "period": 7,
                "cht": 30,
                "x": 74.5,
                "y": 12.0,
                "type": "optional",
                "groupId": "[1113]"
            },
            {
                "id": "GEE7AH",
                "name": "Operations Management",
                "dependencies": [],
                "period": 7,
                "cht": 30,
                "x": 86.0,
                "y": 12.0,
                "type": "optional",
                "groupId": "[1113]"
            },
            {
                "id": "GEE7AI",
                "name": "Economia Circular e Políticas Públicas",
                "dependencies": [],
                "period": 7,
                "cht": 30,
                "x": 5.5,
                "y": 20.5,
                "type": "optional",
                "groupId": "[1113]"
            },
            {
                "id": "GEE7AJ",
                "name": "Planejamento Tributário",
                "dependencies": [],
                "period": 7,
                "cht": 30,
                "x": 17.0,
                "y": 20.5,
                "type": "optional",
                "groupId": "[1113]"
            },
            {
                "id": "GEE7AK",
                "name": "Gestão Pública em Contexto",
                "dependencies": [],
                "period": 7,
                "cht": 30,
                "x": 28.5,
                "y": 20.5,
                "type": "optional",
                "groupId": "[1113]"
            },
            {
                "id": "GEE7AL",
                "name": "Gestão de Pessoas em Ambientes Digitais",
                "dependencies": [],
                "period": 7,
                "cht": 30,
                "x": 40.0,
                "y": 20.5,
                "type": "optional",
                "groupId": "[1113]"
            },
            {
                "id": "GEE7AM",
                "name": "Gestão de Pessoas e Carreiras",
                "dependencies": [],
                "period": 7,
                "cht": 30,
                "x": 51.5,
                "y": 20.5,
                "type": "optional",
                "groupId": "[1113]"
            },
            {
                "id": "GEE7AN",
                "name": "Subjetividade e Saúde Mental no Trabalho",
                "dependencies": [],
                "period": 7,
                "cht": 30,
                "x": 63.0,
                "y": 20.5,
                "type": "optional",
                "groupId": "[1113]"
            },
            {
                "id": "GEE7AO",
                "name": "Estudos Contemporâneos em Gestão de Pessoas",
                "dependencies": [],
                "period": 7,
                "cht": 30,
                "x": 74.5,
                "y": 20.5,
                "type": "optional",
                "groupId": "[1113]"
            },
            {
                "id": "FCH7HA",
                "name": "HISTÓRIA DA TÉCNICA E DA TECNOLOGIA",
                "dependencies": [],
                "period": 7,
                "cht": 45,
                "x": 5.5,
                "y": 34.0,
                "type": "optional",
                "groupId": "[1114]"
            },
            {
                "id": "GEE7BA",
                "name": "GESTÃO DA INOVAÇÃO",
                "dependencies": [],
                "period": 7,
                "cht": 30,
                "x": 17.0,
                "y": 34.0,
                "type": "optional",
                "groupId": "[1114]"
            },
            {
                "id": "GEE7BB",
                "name": "TECNOLOGIA E CIÊNCIA DE DADOS I",
                "dependencies": [],
                "period": 7,
                "cht": 45,
                "x": 28.5,
                "y": 34.0,
                "type": "optional",
                "groupId": "[1114]"
            },
            {
                "id": "GEE7BC",
                "name": "TECNOLOGIA E CIÊNCIA DE DADOS II",
                "dependencies": [],
                "period": 7,
                "cht": 45,
                "x": 40.0,
                "y": 34.0,
                "type": "optional",
                "groupId": "[1114]"
            },
            {
                "id": "GEE7BD",
                "name": "MARKETING DIGITAL",
                "dependencies": [],
                "period": 7,
                "cht": 30,
                "x": 51.5,
                "y": 34.0,
                "type": "optional",
                "groupId": "[1114]"
            },
            {
                "id": "GEE7BE",
                "name": "TÓPICOS ESPECIAIS EM MARKETING",
                "dependencies": [],
                "period": 7,
                "cht": 30,
                "x": 63.0,
                "y": 34.0,
                "type": "optional",
                "groupId": "[1114]"
            },
            {
                "id": "GEE7BH",
                "name": "Abordagens da Internacionalização",
                "dependencies": [],
                "period": 7,
                "cht": 30,
                "x": 74.5,
                "y": 34.0,
                "type": "optional",
                "groupId": "[1114]"
            },
            {
                "id": "GEE7BI",
                "name": "Gestão de Riscos Corporativos",
                "dependencies": [],
                "period": 7,
                "cht": 30,
                "x": 86.0,
                "y": 34.0,
                "type": "optional",
                "groupId": "[1114]"
            },
            {
                "id": "GEE7BJ",
                "name": "Finanças Comportamentais",
                "dependencies": [],
                "period": 7,
                "cht": 30,
                "x": 5.5,
                "y": 42.5,
                "type": "optional",
                "groupId": "[1114]"
            },
            {
                "id": "GEE7BK",
                "name": "Contabilidade Internacional",
                "dependencies": [],
                "period": 7,
                "cht": 30,
                "x": 17.0,
                "y": 42.5,
                "type": "optional",
                "groupId": "[1114]"
            },
            {
                "id": "GEE7BL",
                "name": "Gestão na Indústria 4.0",
                "dependencies": [],
                "period": 7,
                "cht": 30,
                "x": 28.5,
                "y": 42.5,
                "type": "optional",
                "groupId": "[1114]"
            },
            {
                "id": "GEE7BM",
                "name": "Economia Paranaense Contemporânea",
                "dependencies": [],
                "period": 7,
                "cht": 30,
                "x": 40.0,
                "y": 42.5,
                "type": "optional",
                "groupId": "[1114]"
            },
            {
                "id": "GEE7BN",
                "name": "Introdução à Avaliação Econômica de Política Pública",
                "dependencies": [],
                "period": 7,
                "cht": 30,
                "x": 51.5,
                "y": 42.5,
                "type": "optional",
                "groupId": "[1114]"
            },
            {
                "id": "GEE7CA",
                "name": "GESTÃO DE PRODUTOS E BRANDING",
                "dependencies": [],
                "period": 7,
                "cht": 30,
                "x": 5.5,
                "y": 56.0,
                "type": "optional",
                "groupId": "[1115]"
            },
            {
                "id": "GEE7CB",
                "name": "COMUNICAÇÃO INTEGRADA DE MARKETING",
                "dependencies": [],
                "period": 7,
                "cht": 30,
                "x": 17.0,
                "y": 56.0,
                "type": "optional",
                "groupId": "[1115]"
            },
            {
                "id": "GEE7CC",
                "name": "COMPORTAMENTO DO CONSUMIDOR E ESTRATÉGIA DE MARKETING",
                "dependencies": [],
                "period": 7,
                "cht": 30,
                "x": 28.5,
                "y": 56.0,
                "type": "optional",
                "groupId": "[1115]"
            },
            {
                "id": "GEE7CD",
                "name": "MARKETING EM MERCADOS INDUSTRIAIS E ORGANIZACIONAIS",
                "dependencies": [],
                "period": 7,
                "cht": 30,
                "x": 40.0,
                "y": 56.0,
                "type": "optional",
                "groupId": "[1115]"
            },
            {
                "id": "GEE7CE",
                "name": "SIMULAÇÃO EMPRESARIAL",
                "dependencies": [],
                "period": 7,
                "cht": 45,
                "x": 51.5,
                "y": 56.0,
                "type": "optional",
                "groupId": "[1115]"
            },
            {
                "id": "GEE7CF",
                "name": "CONTEXTOS EM ADMINISTRAÇÃO",
                "dependencies": [],
                "period": 7,
                "cht": 30,
                "x": 63.0,
                "y": 56.0,
                "type": "optional",
                "groupId": "[1115]"
            },
            {
                "id": "GEE7CG",
                "name": "Empreendedorismo e Plataformas Digitais: Estratégias, Ecossistemas e Inovação Aberta",
                "dependencies": [],
                "period": 7,
                "cht": 30,
                "x": 74.5,
                "y": 56.0,
                "type": "optional",
                "groupId": "[1115]"
            },
            {
                "id": "GEE7CH",
                "name": "Avaliação Social na Era Digital: Gestão de Reputação, Legitimação e Estigma nas Organizações",
                "dependencies": [],
                "period": 7,
                "cht": 30,
                "x": 86.0,
                "y": 56.0,
                "type": "optional",
                "groupId": "[1115]"
            },
            {
                "id": "GEE7CI",
                "name": "Cooperativismo",
                "dependencies": [],
                "period": 7,
                "cht": 30,
                "x": 5.5,
                "y": 64.5,
                "type": "optional",
                "groupId": "[1115]"
            },
            {
                "id": "GEE7CJ",
                "name": "Estudos Contemporâneos em Finanças",
                "dependencies": [],
                "period": 7,
                "cht": 30,
                "x": 17.0,
                "y": 64.5,
                "type": "optional",
                "groupId": "[1115]"
            },
            {
                "id": "GEE7CK",
                "name": "Inovações e Práticas Contemporâneas em Gestão",
                "dependencies": [],
                "period": 7,
                "cht": 30,
                "x": 28.5,
                "y": 64.5,
                "type": "optional",
                "groupId": "[1115]"
            },
            {
                "id": "EDU70J",
                "name": "LIBRAS",
                "dependencies": [],
                "period": 7,
                "cht": 45,
                "x": 5.5,
                "y": 78.0,
                "type": "optional",
                "groupId": "[1116]"
            },
            {
                "id": "FCH7PC",
                "name": "PLANEJAMENTO DE CARREIRA",
                "dependencies": [],
                "period": 7,
                "cht": 60,
                "x": 17.0,
                "y": 78.0,
                "type": "optional",
                "groupId": "[1116]"
            },
            {
                "id": "FCH7XB",
                "name": "PRESENÇA AFRICANA NO BRASIL: TECNOLOGIA, TRABALHO E CULTURA",
                "dependencies": [],
                "period": 7,
                "cht": 45,
                "x": 28.5,
                "y": 78.0,
                "type": "optional",
                "groupId": "[1116]"
            },
            {
                "id": "FCH7XD",
                "name": "DIREITOS HUMANOS, SEGURANÇA E DIVERSIDADE",
                "dependencies": [],
                "period": 7,
                "cht": 45,
                "x": 40.0,
                "y": 78.0,
                "type": "optional",
                "groupId": "[1116]"
            },
            {
                "id": "GEE7DA",
                "name": "DIVERSIDADE, INCLUSÃO E CULTURA CORPORATIVA CONTEMPORÂNEA",
                "dependencies": [],
                "period": 7,
                "cht": 30,
                "x": 51.5,
                "y": 78.0,
                "type": "optional",
                "groupId": "[1116]"
            },
            {
                "id": "GEE7DB",
                "name": "MARKETING E SOCIEDADE",
                "dependencies": [],
                "period": 7,
                "cht": 30,
                "x": 63.0,
                "y": 78.0,
                "type": "optional",
                "groupId": "[1116]"
            },
            {
                "id": "GEE7DC",
                "name": "CIDADANIA E POLÍTICAS DE CONSUMO",
                "dependencies": [],
                "period": 7,
                "cht": 30,
                "x": 74.5,
                "y": 78.0,
                "type": "optional",
                "groupId": "[1116]"
            },
            {
                "id": "GEE7DD",
                "name": "MARKETING POLÍTICO E ELEITORAL",
                "dependencies": [],
                "period": 7,
                "cht": 45,
                "x": 86.0,
                "y": 78.0,
                "type": "optional",
                "groupId": "[1116]"
            }
        ];

export { TOTAL_COMPLEMENTARY_HOURS, TOTAL_EXTENSION_HOURS, TOTAL_HUMANITIES_HOURS, TOTAL_OPTIONAL_HOURS, NODE_WIDTH, NODE_HEIGHT, OPTIONAL_LAYOUT_MIN_X, OPTIONAL_LAYOUT_MAX_X, OPTIONAL_LAYOUT_MIN_Y, OPTIONAL_LAYOUT_MAX_Y, SPECIALIZATION_TRACKS, OPTIONAL_GROUPS_CONFIG, allNodesData, allHumanitiesData, allOptionalNodesData };
