const TOTAL_COMPLEMENTARY_HOURS = 0;

const TOTAL_EXTENSION_HOURS = 390;

const TOTAL_HUMANITIES_HOURS = 30;

const TOTAL_OPTIONAL_HOURS = 180;

const NODE_WIDTH = 130;

const NODE_HEIGHT = 90;

const OPTIONAL_LAYOUT_MIN_X = 14;

const OPTIONAL_LAYOUT_MAX_X = 92;

const OPTIONAL_LAYOUT_MIN_Y = 10;

const OPTIONAL_LAYOUT_MAX_Y = 92;

const SPECIALIZATION_TRACKS = {
            'Sustentabilidade e Construção': ['ARQ7EA', 'COCS7AB', 'COCS7AC', 'COCS7AD', 'COCS7AE', 'COCS7AF', 'COCS7AG', 'COCS7AH', 'COCS7AI'],
            'Ecologia e Restauração': ['COCS7AA', 'COCS7AJ', 'COCS7AK', 'QBIS7AE'],
            'Extensão e Seminários': ['QBIS7AA', 'QBIS7AB', 'QBIS7AC']
        };

const OPTIONAL_GROUPS_CONFIG = {
            '[1154]': { requiredHours: 30, name: 'Disciplinas Optativas' }
        };

const allNodesData = [
            {"id": "COCS71A", "name": "EXPRESSÃO GRÁFICA 1", "dependencies": [], "cht": 45, "type": "subject", "x": 5.5, "y": 5.0, "period": 1},
            {"id": "COCS71B", "name": "MATERIAIS DE CONSTRUÇÃO APLICADOS À ENG. AMBIENTAL E SANITÁRIA", "dependencies": [], "cht": 90, "type": "subject", "x": 16.8, "y": 5.0, "period": 1},
            {"id": "MAT7GA", "name": "GEOMETRIA ANALÍTICA", "dependencies": [], "cht": 60, "type": "subject", "x": 28.0, "y": 5.0, "period": 1},
            {"id": "MAT7PC", "name": "PRÉ-CÁLCULO", "dependencies": [], "cht": 60, "type": "subject", "x": 39.2, "y": 5.0, "period": 1},
            {"id": "QBIS71A", "name": "INTRODUÇÃO À ENGENHARIA AMBIENTAL E SANITÁRIA", "dependencies": [], "cht": 30, "type": "subject", "x": 50.5, "y": 5.0, "period": 1},
            {"id": "QBIS71B", "name": "ECOLOGIA E BIODIVERSIDADE", "dependencies": [], "cht": 45, "type": "subject", "x": 61.8, "y": 5.0, "period": 1},
            {"id": "QBI7QE", "name": "QUÍMICA GERAL EXPERIMENTAL", "dependencies": [], "cht": 30, "type": "subject", "x": 73.0, "y": 5.0, "period": 1},
            {"id": "QBI7QT", "name": "QUÍMICA GERAL TEÓRICA", "dependencies": [], "cht": 60, "type": "subject", "x": 84.2, "y": 5.0, "period": 1},
            {"id": "COCS70C", "name": "ATIVIDADES COMPLEMENTARES", "dependencies": [], "cht": 30, "type": "subject", "x": 5.5, "y": 14.5, "period": 2},
            {"id": "COCS72A", "name": "DESENHO ASSISTIDO POR COMPUTADOR", "dependencies": [], "cht": 30, "type": "subject", "x": 15.5, "y": 14.5, "period": 2},
            {"id": "COCS72B", "name": "GEOLOGIA", "dependencies": [], "cht": 30, "type": "subject", "x": 25.5, "y": 14.5, "period": 2},
            {"id": "COE70A", "name": "COMUNICAÇÃO ORAL E ESCRITA", "dependencies": [], "cht": 30, "type": "subject", "x": 35.5, "y": 14.5, "period": 2},
            {"id": "FIS7F1", "name": "FÍSICA TEÓRICA 1", "dependencies": [], "cht": 60, "type": "subject", "x": 45.5, "y": 14.5, "period": 2},
            {"id": "INF71A", "name": "COMPUTAÇÃO 1", "dependencies": [], "cht": 60, "type": "subject", "x": 55.5, "y": 14.5, "period": 2},
            {"id": "MAT7AL", "name": "ÁLGEBRA LINEAR", "dependencies": ["MAT7GA"], "cht": 60, "type": "subject", "x": 65.5, "y": 14.5, "period": 2},
            {"id": "MAT7C1", "name": "CÁLCULO DIFERENCIAL E INTEGRAL 1", "dependencies": [], "cht": 90, "type": "subject", "x": 75.5, "y": 14.5, "period": 2},
            {"id": "QBIS72A", "name": "QUÍMICA ORGÂNICA FUNDAMENTAL", "dependencies": ["QBI7QT"], "cht": 45, "type": "subject", "x": 85.5, "y": 14.5, "period": 2},
            {"id": "COCS73A", "name": "MECÂNICA GERAL 1", "dependencies": ["FIS7F1", "MAT7AL", "MAT7GA"], "cht": 60, "type": "subject", "x": 5.5, "y": 24.0, "period": 3},
            {"id": "COCS73B", "name": "TOPOGRAFIA", "dependencies": ["COCS71A"], "cht": 60, "type": "subject", "x": 18.4, "y": 24.0, "period": 3},
            {"id": "EST70C", "name": "INTRODUÇÃO À ESTATÍSTICA", "dependencies": ["MAT7C1"], "cht": 60, "type": "subject", "x": 31.2, "y": 24.0, "period": 3},
            {"id": "FIS7E1", "name": "FÍSICA EXPERIMENTAL 1", "dependencies": ["FIS7F1"], "cht": 30, "type": "subject", "x": 44.1, "y": 24.0, "period": 3},
            {"id": "FIS7F2", "name": "FÍSICA TEÓRICA 2", "dependencies": ["FIS7F1"], "cht": 60, "type": "subject", "x": 56.9, "y": 24.0, "period": 3},
            {"id": "MAT7C2", "name": "CÁLCULO DIFERENCIAL E INTEGRAL 2", "dependencies": ["MAT7C1", "MAT7GA"], "cht": 90, "type": "subject", "x": 69.8, "y": 24.0, "period": 3},
            {"id": "QBIS73A", "name": "QUÍMICA ANALÍTICA", "dependencies": ["QBI7QE", "QBI7QT"], "cht": 60, "type": "subject", "x": 82.6, "y": 24.0, "period": 3},
            {"id": "COCS74A", "name": "RESISTÊNCIA DOS MATERIAIS 1", "dependencies": ["COCS73A"], "cht": 60, "type": "subject", "x": 5.5, "y": 33.5, "period": 4},
            {"id": "COCS74B", "name": "MECÂNICA DOS FLUIDOS E TRANSFERÊNCIA DE CALOR E MASSA", "dependencies": ["FIS7F1"], "cht": 75, "type": "subject", "x": 18.4, "y": 33.5, "period": 4},
            {"id": "COCS74C", "name": "GEOPROCESSAMENTO", "dependencies": ["COCS73B"], "cht": 60, "type": "subject", "x": 31.2, "y": 33.5, "period": 4},
            {"id": "ELT70A", "name": "ELETROTÉCNICA", "dependencies": [], "cht": 30, "type": "subject", "x": 44.1, "y": 33.5, "period": 4},
            {"id": "QBIS74A", "name": "LEGISLAÇÃO E DIREITO AMBIENTAL", "dependencies": [], "cht": 30, "type": "subject", "x": 56.9, "y": 33.5, "period": 4},
            {"id": "QBIS74B", "name": "BIOQUÍMICA A", "dependencies": ["QBIS72A"], "cht": 60, "type": "subject", "x": 69.8, "y": 33.5, "period": 4},
            {"id": "QBIS74C", "name": "MANEJO E CONSERVAÇÃO DE FAUNA E FLORA", "dependencies": ["QBIS71B"], "cht": 45, "type": "subject", "x": 82.6, "y": 33.5, "period": 4},
            {"id": "COCS75A", "name": "HIDRÁULICA", "dependencies": ["COCS74B"], "cht": 60, "type": "subject", "x": 5.5, "y": 43.0, "period": 5},
            {"id": "COCS75B", "name": "GEOTECNIA AMBIENTAL", "dependencies": ["COCS72B"], "cht": 60, "type": "subject", "x": 20.5, "y": 43.0, "period": 5},
            {"id": "QBIS75B", "name": "ANÁLISE DE ÁGUAS E ÁGUAS RESIDUÁRIAS", "dependencies": ["QBIS73A"], "cht": 60, "type": "subject", "x": 35.5, "y": 43.0, "period": 5},
            {"id": "QBIS75C", "name": "OPERAÇÕES UNITÁRIAS", "dependencies": ["COCS74B"], "cht": 60, "type": "subject", "x": 50.5, "y": 43.0, "period": 5},
            {"id": "QBIS75D", "name": "ECOSSISTEMAS AQUÁTICOS", "dependencies": ["QBIS71B"], "cht": 45, "type": "subject", "x": 65.5, "y": 43.0, "period": 5},
            {"id": "QBIS75E", "name": "LICENCIAMENTO E AVALIAÇÃO DE IMPACTOS AMBIENTAIS", "dependencies": ["QBIS74A"], "cht": 45, "type": "subject", "x": 80.5, "y": 43.0, "period": 5},
            {"id": "COCS76A", "name": "FONTES DE ENERGIA", "dependencies": ["ELT70A"], "cht": 30, "type": "subject", "x": 5.5, "y": 52.5, "period": 6},
            {"id": "COCS76B", "name": "HIDROLOGIA", "dependencies": ["COCS73B", "EST70C"], "cht": 60, "type": "subject", "x": 18.4, "y": 52.5, "period": 6},
            {"id": "COCS76C", "name": "INSTALAÇÕES HIDROSSANITÁRIAS", "dependencies": ["COCS75A"], "cht": 60, "type": "subject", "x": 31.2, "y": 52.5, "period": 6},
            {"id": "QBIS76A", "name": "GESTÃO AMBIENTAL E SUSTENTABILIDADE", "dependencies": ["QBIS74A"], "cht": 45, "type": "subject", "x": 44.1, "y": 52.5, "period": 6},
            {"id": "QBIS76B", "name": "PEDOLOGIA", "dependencies": ["COCS72B"], "cht": 30, "type": "subject", "x": 56.9, "y": 52.5, "period": 6},
            {"id": "QBIS76C", "name": "QUALIDADE DO AR", "dependencies": [], "cht": 30, "type": "subject", "x": 69.8, "y": 52.5, "period": 6},
            {"id": "QBIS76D", "name": "MICROBIOLOGIA AMBIENTAL", "dependencies": ["QBIS74B"], "cht": 60, "type": "subject", "x": 82.6, "y": 52.5, "period": 6},
            {"id": "COCS70B", "name": "ESTÁGIO CURRICULAR OBRIGATÓRIO", "dependencies": [], "cht": 360, "type": "subject", "x": 5.5, "y": 62.0, "period": 7},
            {"id": "COCS77A", "name": "SISTEMAS DE DRENAGEM URBANA", "dependencies": ["COCS75A", "COCS76B"], "cht": 30, "type": "subject", "x": 16.8, "y": 62.0, "period": 7},
            {"id": "COCS77B", "name": "RESÍDUOS SÓLIDOS 1", "dependencies": [], "cht": 45, "type": "subject", "x": 28.0, "y": 62.0, "period": 7},
            {"id": "GEE7E5", "name": "FUNDAMENTOS DE ENGENHARIA ECONÔMICA E ANÁLISE DE VIABILIDADE", "dependencies": [], "cht": 60, "type": "subject", "x": 39.2, "y": 62.0, "period": 7},
            {"id": "QBIS77A", "name": "AUDITORIAS E PERÍCIAS AMBIENTAIS", "dependencies": ["QBIS76A"], "cht": 45, "type": "subject", "x": 50.5, "y": 62.0, "period": 7},
            {"id": "QBIS77C", "name": "CONTROLE DA POLUIÇÃO ATMOSFÉRICA", "dependencies": ["QBIS76C"], "cht": 45, "type": "subject", "x": 61.8, "y": 62.0, "period": 7},
            {"id": "QBIS77D", "name": "TRATAMENTO DE ÁGUA DE ABASTECIMENTO", "dependencies": ["COCS75A", "QBIS75B"], "cht": 75, "type": "subject", "x": 73.0, "y": 62.0, "period": 7},
            {"id": "QBIS77E", "name": "RECUPERAÇÃO DE ÁREAS DEGRADADAS", "dependencies": ["COCS75B", "QBIS76B"], "cht": 60, "type": "subject", "x": 84.2, "y": 62.0, "period": 7},
            {"id": "COCS78A", "name": "TRATAMENTO DE ÁGUAS RESIDUÁRIAS", "dependencies": ["COCS75A", "QBIS76D"], "cht": 90, "type": "subject", "x": 5.5, "y": 71.5, "period": 8},
            {"id": "COCS78B", "name": "SISTEMAS HIDRÁULICOS URBANOS", "dependencies": ["COCS75A"], "cht": 45, "type": "subject", "x": 23.5, "y": 71.5, "period": 8},
            {"id": "QBIS78A", "name": "SAÚDE AMBIENTAL", "dependencies": [], "cht": 30, "type": "subject", "x": 41.5, "y": 71.5, "period": 8},
            {"id": "QBIS78B", "name": "RESÍDUOS SÓLIDOS 2", "dependencies": ["COCS77B"], "cht": 30, "type": "subject", "x": 59.5, "y": 71.5, "period": 8},
            {"id": "QBI78A", "name": "FUNDAMENTOS DE ECOTOXICOLOGIA", "dependencies": [], "cht": 60, "type": "subject", "x": 77.5, "y": 71.5, "period": 8},
            {"id": "COCS79A", "name": "ENGENHARIA DE SEGURANÇA DO TRABALHO", "dependencies": [], "cht": 30, "type": "subject", "x": 5.5, "y": 81.0, "period": 9},
            {"id": "COCS79B", "name": "TRABALHO DE CONCLUSÃO DE CURSO 1", "dependencies": ["Periodo:8"], "cht": 30, "type": "subject", "x": 35.5, "y": 81.0, "period": 9},
            {"id": "GEE7E1", "name": "FUNDAMENTOS DE EMPREENDEDORISMO", "dependencies": [], "cht": 30, "type": "subject", "x": 65.5, "y": 81.0, "period": 9},
            {"id": "COCS70A", "name": "TRABALHO DE CONCLUSÃO DE CURSO 2", "dependencies": ["COCS79B"], "cht": 30, "type": "subject", "x": 5.5, "y": 90.5, "period": 10},
        ];

const allHumanitiesData = [
            {"id": "EDU70A", "name": "HISTÓRIA DA PROFISSÃO DOCENTE", "dependencies": [], "period": 3, "cht": 30, "type": "humanities", "x": 10.0, "y": 5.0, "groupId": "[1154]"},
            {"id": "EDU70B", "name": "PESQUISA EM EDUCAÇÃO", "dependencies": [], "period": 3, "cht": 45, "type": "humanities", "x": 30.0, "y": 5.0, "groupId": "[1154]"},
            {"id": "EDU70C", "name": "FUNDAMENTOS SOCIOLÓGICOS DA EDUCAÇÃO", "dependencies": [], "period": 3, "cht": 45, "type": "humanities", "x": 50.0, "y": 5.0, "groupId": "[1154]"},
            {"id": "EDU70D", "name": "PSICOLOGIA DA EDUCAÇÃO", "dependencies": [], "period": 3, "cht": 45, "type": "humanities", "x": 70.0, "y": 5.0, "groupId": "[1154]"},
            {"id": "EDU70E", "name": "DIDÁTICA", "dependencies": [], "period": 3, "cht": 45, "type": "humanities", "x": 90.0, "y": 5.0, "groupId": "[1154]"},
            {"id": "EDU70F", "name": "CURRÍCULO E CONHECIMENTO ESCOLAR", "dependencies": [], "period": 3, "cht": 30, "type": "humanities", "x": 10.0, "y": 11.5, "groupId": "[1154]"},
            {"id": "EDU70G", "name": "GESTÃO ESCOLAR", "dependencies": [], "period": 3, "cht": 30, "type": "humanities", "x": 30.0, "y": 11.5, "groupId": "[1154]"},
            {"id": "EDU70H", "name": "POLÍTICA EDUCACIONAL", "dependencies": [], "period": 3, "cht": 30, "type": "humanities", "x": 50.0, "y": 11.5, "groupId": "[1154]"},
            {"id": "EDU70I", "name": "EDUCAÇÃO ESPECIAL E PROCESSOS INCLUSIVOS", "dependencies": [], "period": 3, "cht": 45, "type": "humanities", "x": 70.0, "y": 11.5, "groupId": "[1154]"},
            {"id": "EDU70J", "name": "LIBRAS", "dependencies": [], "period": 3, "cht": 45, "type": "humanities", "x": 90.0, "y": 11.5, "groupId": "[1154]"},
            {"id": "EDU70K", "name": "TECNOLOGIAS DIGITAIS NA EDUCAÇÃO", "dependencies": [], "period": 3, "cht": 45, "type": "humanities", "x": 10.0, "y": 18.0, "groupId": "[1154]"},
            {"id": "FCH7AA", "name": "DANÇA E TECNOLOGIA", "dependencies": [], "period": 3, "cht": 60, "type": "humanities", "x": 30.0, "y": 18.0, "groupId": "[1154]"},
            {"id": "FCH7AB", "name": "QUESTÕES CONTEMPORÂNEAS DO CORPO", "dependencies": [], "period": 3, "cht": 60, "type": "humanities", "x": 50.0, "y": 18.0, "groupId": "[1154]"},
            {"id": "FCH7FA", "name": "FILOSOFIA DA CIÊNCIA E DA TECNOLOGIA", "dependencies": [], "period": 3, "cht": 45, "type": "humanities", "x": 70.0, "y": 18.0, "groupId": "[1154]"},
            {"id": "FCH7FB", "name": "FUNDAMENTOS DA ÉTICA", "dependencies": [], "period": 3, "cht": 45, "type": "humanities", "x": 90.0, "y": 18.0, "groupId": "[1154]"},
            {"id": "FCH7FC", "name": "TEORIA DAS CIÊNCIAS HUMANAS", "dependencies": [], "period": 3, "cht": 45, "type": "humanities", "x": 10.0, "y": 24.5, "groupId": "[1154]"},
            {"id": "FCH7GA", "name": "METROPOLIZAÇÃO CONTEMPORÂNEA: TECNOLOGIA E TERRITÓRIO", "dependencies": [], "period": 3, "cht": 45, "type": "humanities", "x": 30.0, "y": 24.5, "groupId": "[1154]"},
            {"id": "FCH7HA", "name": "HISTÓRIA DA TÉCNICA E DA TECNOLOGIA", "dependencies": [], "period": 3, "cht": 45, "type": "humanities", "x": 50.0, "y": 24.5, "groupId": "[1154]"},
            {"id": "FCH7HB", "name": "HISTÓRIA GERAL DA ECONOMIA", "dependencies": [], "period": 3, "cht": 45, "type": "humanities", "x": 70.0, "y": 24.5, "groupId": "[1154]"},
            {"id": "FCH7HC", "name": "CAPITALISMO CONTEMPORÂNEO E ECONOMIA POLÍTICA", "dependencies": [], "period": 3, "cht": 45, "type": "humanities", "x": 90.0, "y": 24.5, "groupId": "[1154]"},
            {"id": "FCH7PA", "name": "PSICOLOGIA DO TRABALHO", "dependencies": [], "period": 3, "cht": 30, "type": "humanities", "x": 10.0, "y": 31.0, "groupId": "[1154]"},
            {"id": "FCH7PB", "name": "RELAÇÕES INTERPESSOAIS, GRUPO E PODER", "dependencies": [], "period": 3, "cht": 30, "type": "humanities", "x": 30.0, "y": 31.0, "groupId": "[1154]"},
            {"id": "FCH7PC", "name": "PLANEJAMENTO DE CARREIRA", "dependencies": [], "period": 3, "cht": 60, "type": "humanities", "x": 50.0, "y": 31.0, "groupId": "[1154]"},
            {"id": "FCH7SA", "name": "SOCIOLOGIA", "dependencies": [], "period": 3, "cht": 45, "type": "humanities", "x": 70.0, "y": 31.0, "groupId": "[1154]"},
            {"id": "FCH7SB", "name": "TECNOLOGIA E SOCIEDADE", "dependencies": [], "period": 3, "cht": 45, "type": "humanities", "x": 90.0, "y": 31.0, "groupId": "[1154]"},
            {"id": "FCH7SC", "name": "TECNOLOGIA, TRABALHO E SAÚDE", "dependencies": [], "period": 3, "cht": 45, "type": "humanities", "x": 10.0, "y": 37.5, "groupId": "[1154]"},
            {"id": "FCH7SD", "name": "SOCIEDADE E POLÍTICA NO BRASIL", "dependencies": [], "period": 3, "cht": 45, "type": "humanities", "x": 30.0, "y": 37.5, "groupId": "[1154]"},
            {"id": "FCH7SE", "name": "SOCIEDADE E POLÍTICA NO PARANÁ", "dependencies": [], "period": 3, "cht": 45, "type": "humanities", "x": 50.0, "y": 37.5, "groupId": "[1154]"},
            {"id": "FCH7SF", "name": "POLÍTICA, INSTITUIÇÕES E CIDADANIA NO PARANÁ", "dependencies": [], "period": 3, "cht": 60, "type": "humanities", "x": 70.0, "y": 37.5, "groupId": "[1154]"},
            {"id": "FCH7XA", "name": "TECNOLOGIA SOCIAL E ECONOMIA SOLIDÁRIA", "dependencies": [], "period": 3, "cht": 60, "type": "humanities", "x": 90.0, "y": 37.5, "groupId": "[1154]"},
            {"id": "FCH7XB", "name": "PRESENÇA AFRICANA NO BRASIL: TECNOLOGIA, TRABALHO E CULTURA", "dependencies": [], "period": 3, "cht": 45, "type": "humanities", "x": 10.0, "y": 44.0, "groupId": "[1154]"},
            {"id": "FCH7XC", "name": "PRESENÇA AFRICANA NO BRASIL", "dependencies": [], "period": 3, "cht": 30, "type": "humanities", "x": 30.0, "y": 44.0, "groupId": "[1154]"},
            {"id": "FCH7XD", "name": "DIREITOS HUMANOS, SEGURANÇA E DIVERSIDADE", "dependencies": [], "period": 3, "cht": 45, "type": "humanities", "x": 50.0, "y": 44.0, "groupId": "[1154]"},
            {"id": "FCH7XE", "name": "POLÍTICAS PÚBLICAS", "dependencies": [], "period": 3, "cht": 45, "type": "humanities", "x": 70.0, "y": 44.0, "groupId": "[1154]"},
            {"id": "FCH7XF", "name": "DIMENSÃO AMBIENTAL NA GESTÃO URBANA", "dependencies": [], "period": 3, "cht": 45, "type": "humanities", "x": 90.0, "y": 44.0, "groupId": "[1154]"},
            {"id": "FCH7XG", "name": "TECNOPOLÍTICAS DA SOCIEDADE CONTEMPORÂNEA", "dependencies": [], "period": 3, "cht": 45, "type": "humanities", "x": 10.0, "y": 50.5, "groupId": "[1154]"},
            {"id": "GEE7A1", "name": "FUNDAMENTOS DE ADMINISTRAÇÃO", "dependencies": [], "period": 3, "cht": 45, "type": "humanities", "x": 30.0, "y": 50.5, "groupId": "[1154]"},
            {"id": "GEE7E3", "name": "FUNDAMENTOS DE ECONOMIA", "dependencies": [], "period": 3, "cht": 30, "type": "humanities", "x": 50.0, "y": 50.5, "groupId": "[1154]"},
            {"id": "GEE7F1", "name": "FUNDAMENTOS DE FINANÇAS", "dependencies": [], "period": 3, "cht": 60, "type": "humanities", "x": 70.0, "y": 50.5, "groupId": "[1154]"},
            {"id": "GEE7G1", "name": "FUNDAMENTOS DE GESTÃO DE PESSOAS", "dependencies": [], "period": 3, "cht": 45, "type": "humanities", "x": 90.0, "y": 50.5, "groupId": "[1154]"},
            {"id": "GEE7G3", "name": "FUNDAMENTOS DE GESTÃO DA PRODUÇÃO", "dependencies": [], "period": 3, "cht": 45, "type": "humanities", "x": 10.0, "y": 57.0, "groupId": "[1154]"},
            {"id": "GEE7G5", "name": "FUNDAMENTOS DE GESTÃO DE PROJETO", "dependencies": [], "period": 3, "cht": 45, "type": "humanities", "x": 30.0, "y": 57.0, "groupId": "[1154]"},
            {"id": "GEE7M1", "name": "FUNDAMENTOS DE MARKETING", "dependencies": [], "period": 3, "cht": 45, "type": "humanities", "x": 50.0, "y": 57.0, "groupId": "[1154]"},
        ];

const allOptionalNodesData = [
            {"id": "ARQ7EA", "name": "TOWARDS SUSTAINABILITY", "dependencies": [], "period": 3, "cht": 60, "type": "optional", "x": 12.5, "y": 8.0, "groupId": "[1154]"},
            {"id": "COCS7AA", "name": "ECOLOGIA DA RESTAURAÇÃO", "dependencies": [], "period": 3, "cht": 30, "type": "optional", "x": 37.5, "y": 8.0, "groupId": "[1154]"},
            {"id": "COCS7AB", "name": "ESTABIIDADE DE TALUDES E ENCOSTAS", "dependencies": [], "period": 3, "cht": 60, "type": "optional", "x": 62.5, "y": 8.0, "groupId": "[1154]"},
            {"id": "COCS7AC", "name": "GERENCIAMENTO DE RESÍDUOS NA CONSTRUÇÃO CIVIL", "dependencies": [], "period": 3, "cht": 60, "type": "optional", "x": 87.5, "y": 8.0, "groupId": "[1154]"},
            {"id": "COCS7AD", "name": "USO RACIONAL DAS AGUÁS PLUVIAIS NAS EDIFICAÇÕES", "dependencies": [], "period": 3, "cht": 60, "type": "optional", "x": 12.5, "y": 18.0, "groupId": "[1154]"},
            {"id": "COCS7AE", "name": "SISTEMAS DE APROVEITAMENTO DE ÁGUAS RESIDUÁRIAS EM EDIFICAÇÕES", "dependencies": [], "period": 3, "cht": 60, "type": "optional", "x": 37.5, "y": 18.0, "groupId": "[1154]"},
            {"id": "COCS7AF", "name": "CONSTRUÇÕES SUSTENTÁVEIS", "dependencies": [], "period": 3, "cht": 60, "type": "optional", "x": 62.5, "y": 18.0, "groupId": "[1154]"},
            {"id": "COCS7AG", "name": "DINÃMICA DE FLUIDOS COMPUTACIONAL PARA SISTEMAS DE ENERGIAS RENOVÁVEIS", "dependencies": [], "period": 3, "cht": 60, "type": "optional", "x": 87.5, "y": 18.0, "groupId": "[1154]"},
            {"id": "COCS7AH", "name": "EFICIÊNCIA ENERGÉTICA EM EDIFICAÇÕES", "dependencies": [], "period": 3, "cht": 60, "type": "optional", "x": 12.5, "y": 28.0, "groupId": "[1154]"},
            {"id": "COCS7AI", "name": "PROJETO ARQUITETÔNICO UTILIZANDO ESTRATÉGIAS BIOCLIMÁTICAS", "dependencies": [], "period": 3, "cht": 60, "type": "optional", "x": 37.5, "y": 28.0, "groupId": "[1154]"},
            {"id": "COCS7AJ", "name": "FLORESTAS URBANAS", "dependencies": [], "period": 3, "cht": 30, "type": "optional", "x": 62.5, "y": 28.0, "groupId": "[1154]"},
            {"id": "COCS7AK", "name": "RESTAURAÇÃO FLORESTAL", "dependencies": ["COCS7AA"], "period": 3, "cht": 30, "type": "optional", "x": 87.5, "y": 28.0, "groupId": "[1154]"},
            {"id": "QBIS7AA", "name": "SEMINÁRIOS 1", "dependencies": [], "period": 3, "cht": 15, "type": "optional", "x": 12.5, "y": 38.0, "groupId": "[1154]"},
            {"id": "QBIS7AB", "name": "EXTENSÃO EM AÇÃO", "dependencies": [], "period": 3, "cht": 90, "type": "optional", "x": 37.5, "y": 38.0, "groupId": "[1154]"},
            {"id": "QBIS7AC", "name": "PRÁTICAS DE EXTENSÃO UNIVERSITÁRIA", "dependencies": [], "period": 3, "cht": 60, "type": "optional", "x": 62.5, "y": 38.0, "groupId": "[1154]"},
            {"id": "QBIS7AE", "name": "Gestão de Recursos Hídricos e Bacias Hidrográficas", "dependencies": [], "period": 3, "cht": 45, "type": "optional", "x": 87.5, "y": 38.0, "groupId": "[1154]"},
        ];

export { TOTAL_COMPLEMENTARY_HOURS, TOTAL_EXTENSION_HOURS, TOTAL_HUMANITIES_HOURS, TOTAL_OPTIONAL_HOURS, NODE_WIDTH, NODE_HEIGHT, OPTIONAL_LAYOUT_MIN_X, OPTIONAL_LAYOUT_MAX_X, OPTIONAL_LAYOUT_MIN_Y, OPTIONAL_LAYOUT_MAX_Y, SPECIALIZATION_TRACKS, OPTIONAL_GROUPS_CONFIG, allNodesData, allHumanitiesData, allOptionalNodesData };
