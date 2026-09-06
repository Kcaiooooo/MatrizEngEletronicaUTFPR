const TOTAL_COMPLEMENTARY_HOURS = 180;

const TOTAL_EXTENSION_HOURS = 0;

const TOTAL_HUMANITIES_HOURS = 120;

const TOTAL_OPTIONAL_HOURS = 630;

const NODE_WIDTH = 130;

const NODE_HEIGHT = 90;

const OPTIONAL_LAYOUT_MIN_X = 14;

const OPTIONAL_LAYOUT_MAX_X = 92;

const OPTIONAL_LAYOUT_MIN_Y = 10;

const OPTIONAL_LAYOUT_MAX_Y = 92;

const SPECIALIZATION_TRACKS = {
            'Automação [213]': ['ET7DA', 'ET7DB', 'ET7DC', 'ET7DD', 'ET7DE', 'ET7DF', 'ET7DG', 'ET7DH', 'ET7DI', 'ET7DJ', 'ET7DK', 'ET7DL', 'ET7DM'],
            'Controle [214]': ['EL6AB', 'EL6AC', 'EL6AD', 'EL68F', 'ET7GD'],
            'Produção Industrial [212]': ['ET7AA', 'ET7AB', 'ET7AC', 'ET7AD', 'ET7AE', 'ET7AF', 'ET7AG', 'ET7AH', 'ET7AI', 'GE70F', 'GE70H', 'GE70K', 'GE70M', 'GE70N', 'GE70O', 'GE70P', 'GE70Q', 'GE70R'],
            'Instalações e Gerenciamento [216]': ['ET75B', 'ET76B', 'ET77B'],
            'Sistemas de Potência [218]': ['ET77J', 'ET78J'],
            'Manutenção e Máquinas [219]': ['ET7FF', 'ET7FQ', 'ET76E'],
            'Eletrônica Industrial [220]': ['EL6EA', 'EL66D', 'EL68A', 'ET7BK'],
            'Ciências Ambientais [210]': ['ET70F', 'QB7AH', 'QB7AI', 'QB70E', 'QB70F', 'QB74I'],
            'Outros Departamentos [222]': ['CC63R', 'CC64B', 'EL6BF', 'EL6DA', 'IF65D', 'ME60D', 'ME64I']
        };

const OPTIONAL_GROUPS_CONFIG = {
            '[210]': { requiredHours: 30, name: 'Ciências Ambientais' },
            '[211]': { requiredHours: 120, name: 'Ciências Humanas, Sociais e Cidadania' },
            '[213]': { requiredHours: 180, name: 'Automação' },
            '[214]': { requiredHours: 180, name: 'Controle' },
            '[212]': { requiredHours: 90, name: 'Produção Industrial' },
            '[215]': { requiredHours: 180, name: 'Área de Aprofundamento' },
            '[216]': { requiredHours: 180, name: 'Instalações e Gerenciamento de Energia' },
            '[218]': { requiredHours: 180, name: 'Sistemas de Potência' },
            '[219]': { requiredHours: 180, name: 'Manutenção e Máquinas' },
            '[220]': { requiredHours: 180, name: 'Eletrônica Industrial' },
            '[222]': { requiredHours: 180, name: 'Outros Departamentos' }
        };

const allNodesData = [
            {
                        "id": "CE70A",
                        "equivalents": [{"id": "CE62A", "cht": 30}, {"id": "CE70B", "cht": 30}, {"id": "COE70A", "cht": 30}, {"id": "ET62B", "cht": 30}, {"id": "LIC70A", "cht": 30}],
                        "name": "COMUNICAÇÃO LINGUÍSTICA",
                        "dependencies": [],
                        "cht": 30,
                        "type": "subject",
                        "y": 5.0,
                        "period": 1,
                        "x": 5.5
            },
            {
                        "id": "ET71B",
                        "equivalents": [{"id": "ELT71B", "cht": 45}, {"id": "ET61A", "cht": 75}],
                        "name": "DESENHO ELÉTRICO",
                        "dependencies": [],
                        "cht": 75,
                        "type": "subject",
                        "y": 5.0,
                        "period": 1,
                        "x": 20.3
            },
            {
                        "id": "ET71C",
                        "equivalents": [{"id": "ELT71A", "cht": 75}, {"id": "ET61B", "cht": 30}],
                        "name": "INTRODUÇÃO A ENGENHARIA",
                        "dependencies": [],
                        "cht": 30,
                        "type": "subject",
                        "y": 5.0,
                        "period": 1,
                        "x": 35.2
            },
            {
                        "id": "FI71M",
                        "equivalents": [{"id": "FIS7F1", "cht": 60}, {"id": "FI61A", "cht": 75}, {"id": "FI71A", "cht": 75}, {"id": "FI71Z", "cht": 60}, {"id": "FI72B", "cht": 90}],
                        "name": "FÍSICA TEÓRICA 1",
                        "dependencies": [],
                        "cht": 60,
                        "type": "subject",
                        "y": 5.0,
                        "period": 1,
                        "x": 50.0
            },
            {
                        "id": "IF71A",
                        "equivalents": [{"id": "IF61A", "cht": 60}, {"id": "IF61C", "cht": 90}, {"id": "INF71A", "cht": 60}],
                        "name": "COMPUTAÇÃO 1",
                        "dependencies": [],
                        "cht": 60,
                        "type": "subject",
                        "y": 5.0,
                        "period": 1,
                        "x": 64.8
            },
            {
                        "id": "MA71A",
                        "equivalents": [{"id": "MAT7C1", "cht": 90}, {"id": "MA61A", "cht": 90}, {"id": "MA71Z", "cht": 90}],
                        "name": "CÁLCULO DIFERENCIAL E INTEGRAL 1",
                        "dependencies": [],
                        "cht": 90,
                        "type": "subject",
                        "y": 5.0,
                        "period": 1,
                        "x": 79.7
            },
            {
                        "id": "MA71B",
                        "equivalents": [{"id": "MAT7AL", "cht": 60}, {"id": "MAT7GA", "cht": 60}, {"id": "MA61B", "cht": 90}, {"id": "MA71I", "cht": 45}, {"id": "MA71Y", "cht": 90}, {"id": "MA72I", "cht": 60}],
                        "name": "GEOMETRIA ANALÍTICA E ÁLGEBRA LINEAR",
                        "dependencies": [],
                        "cht": 90,
                        "type": "subject",
                        "y": 5.0,
                        "period": 1,
                        "x": 94.5
            },
            {
                        "id": "ET70B",
                        "name": "ATIVIDADES COMPLEMENTARES",
                        "dependencies": [],
                        "cht": 180,
                        "type": "subject",
                        "y": 15.0,
                        "period": 2,
                        "x": 5.5
            },
            {
                        "id": "ET72B",
                        "equivalents": [{"id": "ELT71C", "cht": 45}, {"id": "ET63A", "cht": 45}],
                        "name": "LABORATÓRIO DE INSTALAÇÕES ELÉTRICAS",
                        "dependencies": [
                                    "ET71B"
                        ],
                        "cht": 45,
                        "type": "subject",
                        "y": 15.0,
                        "period": 2,
                        "x": 18.2
            },
            {
                        "id": "ET72F",
                        "equivalents": [{"id": "ELT72C", "cht": 90}, {"id": "ET62D", "cht": 75}, {"id": "FI63A", "cht": 75}, {"id": "FI66C", "cht": 90}, {"id": "FI73A", "cht": 75}],
                        "name": "ELETRICIDADE E MAGNETISMO",
                        "dependencies": [],
                        "cht": 75,
                        "type": "subject",
                        "y": 15.0,
                        "period": 2,
                        "x": 30.9
            },
            {
                        "id": "FI70A",
                        "equivalents": [{"id": "CC73A", "cht": 60}, {"id": "COC73F", "cht": 60}, {"id": "FI62B", "cht": 60}],
                        "name": "MECÂNICA GERAL 1",
                        "dependencies": [
                                    "FI71M",
                                    "MA71B"
                        ],
                        "cht": 60,
                        "type": "subject",
                        "y": 15.0,
                        "period": 2,
                        "x": 43.6
            },
            {
                        "id": "FI72M",
                        "equivalents": [{"id": "FIS7F2", "cht": 60}, {"id": "FI62A", "cht": 75}, {"id": "FI64D", "cht": 90}, {"id": "FI72A", "cht": 75}, {"id": "FI72Z", "cht": 60}],
                        "name": "FÍSICA TEÓRICA 2",
                        "dependencies": [
                                    "FI71M"
                        ],
                        "cht": 60,
                        "type": "subject",
                        "y": 15.0,
                        "period": 2,
                        "x": 56.4
            },
            {
                        "id": "FI72N",
                        "equivalents": [{"id": "FIS7E1", "cht": 30}, {"id": "FI61A", "cht": 75}, {"id": "FI62A", "cht": 75}, {"id": "FI71A", "cht": 75}, {"id": "FI71Y", "cht": 30}, {"id": "FI72A", "cht": 75}, {"id": "FI72B", "cht": 90}],
                        "name": "FÍSICA EXPERIMENTAL 1",
                        "dependencies": [
                                    "FI71M"
                        ],
                        "cht": 30,
                        "type": "subject",
                        "y": 15.0,
                        "period": 2,
                        "x": 69.1
            },
            {
                        "id": "MA72A",
                        "equivalents": [{"id": "MA62A", "cht": 60}, {"id": "MA72H", "cht": 60}, {"id": "MA75D", "cht": 75}],
                        "name": "CÁLCULO DIFERENCIAL E INTEGRAL 2",
                        "dependencies": [
                                    "MA71A"
                        ],
                        "cht": 60,
                        "type": "subject",
                        "y": 15.0,
                        "period": 2,
                        "x": 81.8
            },
            {
                        "id": "QB70D",
                        "equivalents": [{"id": "QBI7QE", "cht": 30}, {"id": "QBI7QT", "cht": 60}, {"id": "QB62A", "cht": 90}, {"id": "QB70C", "cht": 75}, {"id": "QB70I", "cht": 90}],
                        "name": "QUÍMICA",
                        "dependencies": [],
                        "cht": 90,
                        "type": "subject",
                        "y": 15.0,
                        "period": 2,
                        "x": 94.5
            },
            {
                        "id": "ET73F",
                        "equivalents": [{"id": "ELT73B", "cht": 90}, {"id": "EL63A", "cht": 75}, {"id": "ET63D", "cht": 90}],
                        "name": "CIRCUITOS ELÉTRICOS A",
                        "dependencies": [
                                    "ET72F"
                        ],
                        "cht": 90,
                        "type": "subject",
                        "y": 25.0,
                        "period": 3,
                        "x": 5.5
            },
            {
                        "id": "FI70B",
                        "equivalents": [{"id": "FI63B", "cht": 60}],
                        "name": "MECÂNICA GERAL 2",
                        "dependencies": [
                                    "FI70A"
                        ],
                        "cht": 60,
                        "type": "subject",
                        "y": 25.0,
                        "period": 3,
                        "x": 23.3
            },
            {
                        "id": "FI70C",
                        "equivalents": [{"id": "ELT75B", "cht": 60}, {"id": "FI64B", "cht": 45}],
                        "name": "PRINCÍPIOS DE RESISTÊNCIA DOS MATERIAIS",
                        "dependencies": [
                                    "FI70A"
                        ],
                        "cht": 45,
                        "type": "subject",
                        "y": 25.0,
                        "period": 3,
                        "x": 41.1
            },
            {
                        "id": "MA70C",
                        "equivalents": [{"id": "MAT7N1", "cht": 60}, {"id": "MA63C", "cht": 60}],
                        "name": "CÁLCULO NUMÉRICO",
                        "dependencies": [
                                    "IF71A",
                                    "MA72A"
                        ],
                        "cht": 60,
                        "type": "subject",
                        "y": 25.0,
                        "period": 3,
                        "x": 58.9
            },
            {
                        "id": "MA70G",
                        "equivalents": [{"id": "FI74K", "cht": 60}, {"id": "MAT7ED", "cht": 60}, {"id": "MA63B", "cht": 60}, {"id": "MA70B", "cht": 90}, {"id": "MA70Z", "cht": 60}],
                        "name": "EQUAÇÕES DIFERENCIAIS ORDINÁRIAS",
                        "dependencies": [
                                    "MA71B",
                                    "MA72A"
                        ],
                        "cht": 60,
                        "type": "subject",
                        "y": 25.0,
                        "period": 3,
                        "x": 76.7
            },
            {
                        "id": "MA73A",
                        "equivalents": [{"id": "MA63A", "cht": 60}],
                        "name": "CÁLCULO DIFERENCIAL E INTEGRAL 3",
                        "dependencies": [
                                    "MA72A"
                        ],
                        "cht": 60,
                        "type": "subject",
                        "y": 25.0,
                        "period": 3,
                        "x": 94.5
            },
            {
                        "id": "ET74C",
                        "equivalents": [{"id": "ELT74E", "cht": 120}, {"id": "EL65E", "cht": 120}, {"id": "ET64B", "cht": 90}],
                        "name": "ELETRÔNICA 1",
                        "dependencies": [
                                    "ET73F"
                        ],
                        "cht": 90,
                        "type": "subject",
                        "y": 35.0,
                        "period": 4,
                        "x": 5.5
            },
            {
                        "id": "ET74E",
                        "equivalents": [{"id": "ELT75G", "cht": 60}, {"id": "EL64B", "cht": 60}, {"id": "ET64C", "cht": 60}],
                        "name": "ELETROMAGNETISMO",
                        "dependencies": [
                                    "ET72F",
                                    "MA73A"
                        ],
                        "cht": 60,
                        "type": "subject",
                        "y": 35.0,
                        "period": 4,
                        "x": 20.3
            },
            {
                        "id": "ET74F",
                        "equivalents": [{"id": "ELT74B", "cht": 120}, {"id": "EL64F", "cht": 75}],
                        "name": "CIRCUITOS ELÉTRICOS B",
                        "dependencies": [
                                    "ET73F",
                                    "MA70G"
                        ],
                        "cht": 90,
                        "type": "subject",
                        "y": 35.0,
                        "period": 4,
                        "x": 35.2
            },
            {
                        "id": "ET74H",
                        "equivalents": [{"id": "EL65F", "cht": 60}],
                        "name": "SISTEMAS DE INSTRUMENTAÇÃO 1",
                        "dependencies": [
                                    "ET73F"
                        ],
                        "cht": 30,
                        "type": "subject",
                        "y": 35.0,
                        "period": 4,
                        "x": 50.0
            },
            {
                        "id": "FI74M",
                        "equivalents": [{"id": "FIS7F4", "cht": 60}, {"id": "FI64A", "cht": 60}, {"id": "FI67E", "cht": 90}, {"id": "FI74A", "cht": 60}],
                        "name": "FÍSICA TEÓRICA 4",
                        "dependencies": [
                                    "ET72F"
                        ],
                        "cht": 60,
                        "type": "subject",
                        "y": 35.0,
                        "period": 4,
                        "x": 64.8
            },
            {
                        "id": "GE70D",
                        "equivalents": [{"id": "GEE7E3", "cht": 30}, {"id": "GE60D", "cht": 30}],
                        "name": "ECONOMIA",
                        "dependencies": [
                        "Periodo:3"
            ],
                        "cht": 30,
                        "type": "subject",
                        "y": 35.0,
                        "period": 4,
                        "x": 79.7
            },
            {
                        "id": "MA74C",
                        "equivalents": [{"id": "MAT7FZ", "cht": 60}, {"id": "MA64A", "cht": 60}],
                        "name": "CÁLCULO 4 B",
                        "dependencies": [
                                    "MA73A"
                        ],
                        "cht": 60,
                        "type": "subject",
                        "y": 35.0,
                        "period": 4,
                        "x": 94.5
            },
            {
                        "id": "ES70B",
                        "equivalents": [{"id": "ES65A", "cht": 30}, {"id": "ES72C", "cht": 30}, {"id": "FCH7PA", "cht": 30}],
                        "name": "PSICOLOGIA APLICADA AO TRABALHO",
                        "dependencies": [
                        "Periodo:4"
            ],
                        "cht": 30,
                        "type": "subject",
                        "y": 45.0,
                        "period": 5,
                        "x": 5.5
            },
            {
                        "id": "ET75C",
                        "equivalents": [{"id": "ELT72B", "cht": 60}, {"id": "ET65B", "cht": 60}],
                        "name": "ELETRÔNICA DIGITAL",
                        "dependencies": [
                                    "ET74C"
                        ],
                        "cht": 60,
                        "type": "subject",
                        "y": 45.0,
                        "period": 5,
                        "x": 20.3
            },
            {
                        "id": "ET75E",
                        "equivalents": [{"id": "ET65C", "cht": 60}],
                        "name": "MÁQUINAS ELÉTRICAS 1",
                        "dependencies": [
                                    "ET74E",
                                    "ET74F"
                        ],
                        "cht": 60,
                        "type": "subject",
                        "y": 45.0,
                        "period": 5,
                        "x": 35.2
            },
            {
                        "id": "ET75F",
                        "equivalents": [{"id": "ELT75F", "cht": 60}, {"id": "EL64G", "cht": 60}, {"id": "ET65D", "cht": 60}],
                        "name": "MEDIDAS ELÉTRICAS",
                        "dependencies": [
                                    "ET74F"
                        ],
                        "cht": 60,
                        "type": "subject",
                        "y": 45.0,
                        "period": 5,
                        "x": 50.0
            },
            {
                        "id": "ET75H",
                        "equivalents": [{"id": "ELT74C", "cht": 60}, {"id": "EL65D", "cht": 60}, {"id": "ET65E", "cht": 60}],
                        "name": "SINAIS E SISTEMAS 1",
                        "dependencies": [
                                    "ET74F",
                                    "MA74C"
                        ],
                        "cht": 60,
                        "type": "subject",
                        "y": 45.0,
                        "period": 5,
                        "x": 64.8
            },
            {
                        "id": "IF72A",
                        "equivalents": [{"id": "IF62C", "cht": 60}, {"id": "INF72A", "cht": 60}],
                        "name": "COMPUTAÇÃO 2",
                        "dependencies": [
                                    "IF71A"
                        ],
                        "cht": 60,
                        "type": "subject",
                        "y": 45.0,
                        "period": 5,
                        "x": 79.7
            },
            {
                        "id": "MA70H",
                        "equivalents": [{"id": "EST70A", "cht": 60}, {"id": "EST70C", "cht": 60}, {"id": "MA65A", "cht": 60}, {"id": "MA70F", "cht": 90}],
                        "name": "PROBABILIDADE E ESTATÍSTICA",
                        "dependencies": [
                                    "MA72A"
                        ],
                        "cht": 60,
                        "type": "subject",
                        "y": 45.0,
                        "period": 5,
                        "x": 94.5
            },
            {
                        "id": "ET76C",
                        "equivalents": [{"id": "ELT75E", "cht": 90}, {"id": "EL67E", "cht": 90}, {"id": "ET66B", "cht": 90}],
                        "name": "ELETRÔNICA DE POTÊNCIA",
                        "dependencies": [
                                    "ET74C"
                        ],
                        "cht": 90,
                        "type": "subject",
                        "y": 55.0,
                        "period": 6,
                        "x": 5.5
            },
            {
                        "id": "ET76F",
                        "equivalents": [{"id": "ELT75C", "cht": 45}, {"id": "ET53E", "cht": 128}, {"id": "ET66D", "cht": 90}],
                        "name": "SISTEMAS ELETROMAGNÉTICOS",
                        "dependencies": [
                                    "ET72B",
                                    "ET74H"
                        ],
                        "cht": 45,
                        "type": "subject",
                        "y": 55.0,
                        "period": 6,
                        "x": 20.3
            },
            {
                        "id": "ET76G",
                        "equivalents": [{"id": "ET53E", "cht": 128}],
                        "name": "SISTEMAS ELETROPNEUMÁTICOS",
                        "dependencies": [
                                    "ET72B",
                                    "ET74H"
                        ],
                        "cht": 45,
                        "type": "subject",
                        "y": 55.0,
                        "period": 6,
                        "x": 35.2
            },
            {
                        "id": "ET76H",
                        "equivalents": [{"id": "ELT76D", "cht": 60}, {"id": "EL66F", "cht": 60}],
                        "name": "SISTEMAS DE CONTROLE 1",
                        "dependencies": [
                                    "ET75H"
                        ],
                        "cht": 60,
                        "type": "subject",
                        "y": 55.0,
                        "period": 6,
                        "x": 50.0
            },
            {
                        "id": "ET77E",
                        "equivalents": [{"id": "ET67C", "cht": 60}],
                        "name": "MÁQUINAS ELÉTRICAS 3",
                        "dependencies": [
                                    "ET75E"
                        ],
                        "cht": 60,
                        "type": "subject",
                        "y": 55.0,
                        "period": 6,
                        "x": 64.8
            },
            {
                        "id": "FI70D",
                        "equivalents": [{"id": "FI65C", "cht": 90}, {"id": "FI66A", "cht": 30}, {"id": "ME65G", "cht": 45}],
                        "name": "FENÔMENOS DE TRANSPORTE 1",
                        "dependencies": [
                                    "FI72M"
                        ],
                        "cht": 30,
                        "type": "subject",
                        "y": 55.0,
                        "period": 6,
                        "x": 79.7
            },
            {
                        "id": "GE70L",
                        "equivalents": [{"id": "GEE7G3", "cht": 45}, {"id": "GE60A", "cht": 30}],
                        "name": "GESTÃO DA PRODUÇÃO",
                        "dependencies": [
                                    "GE70D"
                        ],
                        "cht": 30,
                        "type": "subject",
                        "y": 55.0,
                        "period": 6,
                        "x": 94.5
            },
            {
                        "id": "ET77A",
                        "equivalents": [{"id": "ELT77I", "cht": 60}, {"id": "ET56E", "cht": 80}],
                        "name": "REDES INDUSTRIAIS",
                        "dependencies": [
                                    "ET75C",
                                    "IF72A"
                        ],
                        "cht": 60,
                        "type": "subject",
                        "y": 65.0,
                        "period": 7,
                        "x": 5.5
            },
            {
                        "id": "ET77C",
                        "equivalents": [{"id": "ELT73A", "cht": 60}, {"id": "EL66A", "cht": 90}, {"id": "ET67E", "cht": 60}],
                        "name": "SISTEMAS MICROCONTROLADOS",
                        "dependencies": [
                                    "ET75C"
                        ],
                        "cht": 60,
                        "type": "subject",
                        "y": 65.0,
                        "period": 7,
                        "x": 20.3
            },
            {
                        "id": "ET77D",
                        "equivalents": [{"id": "ELT75H", "cht": 60}, {"id": "ET67F", "cht": 60}],
                        "name": "SISTEMAS DE INSTRUMENTAÇÃO 2",
                        "dependencies": [
                                    "ET74H",
                                    "ET75H"
                        ],
                        "cht": 30,
                        "type": "subject",
                        "y": 65.0,
                        "period": 7,
                        "x": 35.2
            },
            {
                        "id": "ET77F",
                        "equivalents": [{"id": "ELT77D", "cht": 60}, {"id": "EL68F", "cht": 60}, {"id": "ET54D", "cht": 96}, {"id": "ET67D", "cht": 60}],
                        "name": "CONTROLADORES LÓGICOS PROGRAMÁVEIS",
                        "dependencies": [
                                    "ET76F"
                        ],
                        "cht": 60,
                        "type": "subject",
                        "y": 65.0,
                        "period": 7,
                        "x": 50.0
            },
            {
                        "id": "ET77G",
                        "name": "SISTEMAS HIDRÁULICOS",
                        "dependencies": [
                                    "ET72B",
                                    "ET74H"
                        ],
                        "cht": 45,
                        "type": "subject",
                        "y": 65.0,
                        "period": 7,
                        "x": 64.8
            },
            {
                        "id": "ET77H",
                        "equivalents": [{"id": "ELT77A", "cht": 60}, {"id": "EL67F", "cht": 60}],
                        "name": "SISTEMAS DE CONTROLE 2",
                        "dependencies": [
                                    "ET76H"
                        ],
                        "cht": 60,
                        "type": "subject",
                        "y": 65.0,
                        "period": 7,
                        "x": 79.7
            },
            {
                        "id": "FI70E",
                        "equivalents": [{"id": "ELT74A", "cht": 30}, {"id": "FI65C", "cht": 90}, {"id": "FI67A", "cht": 45}, {"id": "ME66F", "cht": 45}],
                        "name": "FENÔMENOS DE TRANSPORTE 2",
                        "dependencies": [
                                    "FI70D"
                        ],
                        "cht": 45,
                        "type": "subject",
                        "y": 65.0,
                        "period": 7,
                        "x": 94.5
            },
            {
                        "id": "ET70C",
                        "name": "ESTÁGIO SUPERVISIONADO",
                        "dependencies": [],
                        "cht": 400,
                        "type": "subject",
                        "y": 75.0,
                        "period": 8,
                        "x": 5.5
            },
            {
                        "id": "ET78F",
                        "equivalents": [{"id": "ELT77J", "cht": 60}, {"id": "ET6DK", "cht": 60}],
                        "name": "SUPERVISÃO DE PROCESSOS",
                        "dependencies": [
                                    "ET77F"
                        ],
                        "cht": 60,
                        "type": "subject",
                        "y": 75.0,
                        "period": 8,
                        "x": 50.0
            },
            {
                        "id": "ET78I",
                        "equivalents": [{"id": "ELT78A", "cht": 30}, {"id": "ET68G", "cht": 30}, {"id": "ET68H", "cht": 30}, {"id": "ET78L", "cht": 30}],
                        "name": "METODOLOGIA APLICADA AO TCC",
                        "dependencies": [],
                        "cht": 30,
                        "type": "subject",
                        "y": 75.0,
                        "period": 8,
                        "x": 94.5
            },
            {
                        "id": "ET79F",
                        "equivalents": [{"id": "ELT7AH", "cht": 45}, {"id": "ET56C", "cht": 48}, {"id": "ET6DE", "cht": 60}],
                        "name": "SISTEMAS ROBÓTICOS",
                        "dependencies": [
                                    "ET77G",
                                    "MA71B"
                        ],
                        "cht": 60,
                        "type": "subject",
                        "y": 85.0,
                        "period": 9,
                        "x": 5.5
            },
            {
                        "id": "ET79H",
                        "equivalents": [{"id": "ET51C", "cht": 48}, {"id": "ET67H", "cht": 45}],
                        "name": "FUNDAMENTOS DE ENGENHARIA DE SEGURANÇA DO TRABALHO",
                        "dependencies": [],
                        "cht": 45,
                        "type": "subject",
                        "y": 85.0,
                        "period": 9,
                        "x": 50.0
            },
            {
                        "id": "ET79I",
                        "equivalents": [{"id": "ET69G", "cht": 60}, {"id": "ET69H", "cht": 60}, {"id": "ET79L", "cht": 60}],
                        "name": "TRABALHO DE CONCLUSÃO DE CURSO 1",
                        "dependencies": [
                                    "ET78I"
                        ],
                        "cht": 60,
                        "type": "subject",
                        "y": 85.0,
                        "period": 9,
                        "x": 94.5
            },
            {
                        "id": "ET70H",
                        "equivalents": [{"id": "ET770A", "cht": 30}],
                        "name": "ÉTICA, PROFISSÃO E CIDADANIA",
                        "dependencies": [],
                        "cht": 30,
                        "type": "subject",
                        "y": 94.0,
                        "period": 10,
                        "x": 5.5
            },
            {
                        "id": "ET70I",
                        "name": "TRABALHO DE CONCLUSÃO DE CURSO 2",
                        "dependencies": [
                                    "ET79I"
                        ],
                        "cht": 60,
                        "type": "subject",
                        "y": 94.0,
                        "period": 10,
                        "x": 94.5
            }
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
            { id: 'ELT7GA', name: 'DECISÃO MULTICRITÉRIO', "dependencies": [
                        "Periodo:7"
            ], period: 8, cht: 45, type: 'humanities', x: 10, y: 86, groupId: '[1137]' },
            { id: 'ELT7GB', name: 'PRODUÇÃO SUSTENTÁVEL', "dependencies": [
                        "Periodo:7"
            ], period: 8, cht: 45, type: 'humanities', x: 30, y: 86, groupId: '[1137]' },
            { id: 'ELT7GC', name: 'ANALYTICS PARA OPERAÇÕES, ENERGIA E INDÚSTRIA', "dependencies": [
                        "Periodo:7"
            ], period: 8, cht: 45, type: 'humanities', x: 50, y: 86, groupId: '[1137]' },
            { id: 'GEE7A2', name: 'FUNDAMENTOS DE ADMINISTRAÇÃO', "dependencies": [
                        "Periodo:7"
            ], period: 8, cht: 45, type: 'humanities', x: 70, y: 86, groupId: '[1137]' },
            { id: 'GEE7E2', name: 'FUNDAMENTOS DE EMPREENDEDORISMO', "dependencies": [
                        "Periodo:7"
            ], period: 8, cht: 30, type: 'humanities', x: 90, y: 86, groupId: '[1137]' },

            { id: 'GEE7E6', name: 'FUNDAMENTOS DE ENGENHARIA ECONÔMICA E VIABILIDADE', "dependencies": [
                        "Periodo:7"
            ], period: 8, cht: 60, type: 'humanities', x: 20, y: 92, groupId: '[1137]' },
            { id: 'GEE7F2', name: 'FUNDAMENTOS DE FINANÇAS', "dependencies": [
                        "Periodo:7"
            ], period: 8, cht: 60, type: 'humanities', x: 40, y: 92, groupId: '[1137]' },
            { id: 'GEE7G2', name: 'FUNDAMENTOS DE GESTÃO DE PESSOAS', "dependencies": [
                        "Periodo:7"
            ], period: 8, cht: 45, type: 'humanities', x: 60, y: 92, groupId: '[1137]' },
            { id: 'GEE7G4', name: 'FUNDAMENTOS DE GESTÃO DA PRODUÇÃO', "dependencies": [
                        "Periodo:7"
            ], period: 8, cht: 45, type: 'humanities', x: 80, y: 92, groupId: '[1137]' },
            { id: 'GEE7M2', name: 'FUNDAMENTOS DE MARKETING', "dependencies": [
                        "Periodo:7"
            ], period: 8, cht: 45, type: 'humanities', x: 35, y: 95, groupId: '[1137]' },
            { id: 'QBI7CA', name: 'CIÊNCIAS DO AMBIENTE', "dependencies": [
                        "Periodo:7"
            ], period: 8, cht: 30, type: 'humanities', x: 55, y: 95, groupId: '[1137]', alternative: { id: 'QB70J / QB70E / QB17CA', name: 'QB70J, QB70E, QB17CA' } },
        ];

const allOptionalNodesData = [
            {
                        "id": "ET7DA",
                        "equivalents": [{"id": "ET55B", "cht": 80}, {"id": "ET68D", "cht": 60}],
                        "name": "ACIONAMENTO ELETRÔNICO DE MÁQUINAS ELÉTRICAS",
                        "dependencies": [
                        "Periodo:7"
            ],
                        "period": 8,
                        "cht": 60,
                        "x": 5.5,
                        "y": 10.0,
                        "type": "optional",
                        "groupId": "[213]"
            },
            {
                        "id": "ET7DI",
                        "equivalents": [{"id": "ET52D", "cht": 32}, {"id": "ET6DG", "cht": 60}],
                        "name": "SISTEMAS E EVENTOS DISCRETOS",
                        "dependencies": [
                        "Periodo:7"
            ],
                        "period": 8,
                        "cht": 60,
                        "x": 17.0,
                        "y": 10.0,
                        "type": "optional",
                        "groupId": "[213]"
            },
            {
                        "id": "EL6AB",
                        "equivalents": [{"id": "EEC42", "cht": 60}],
                        "name": "CONTROLE INTELIGENTE",
                        "dependencies": [
                        "Periodo:7"
            ],
                        "period": 8,
                        "cht": 60,
                        "x": 5.5,
                        "y": 22.0,
                        "type": "optional",
                        "groupId": "[214]"
            },
            {
                        "id": "EL6AC",
                        "equivalents": [{"id": "EEC44", "cht": 60}],
                        "name": "CONTROLE 3",
                        "dependencies": [
                        "Periodo:7"
            ],
                        "period": 8,
                        "cht": 60,
                        "x": 17.0,
                        "y": 22.0,
                        "type": "optional",
                        "groupId": "[214]"
            },
            {
                        "id": "EL6AD",
                        "equivalents": [{"id": "EEC45", "cht": 60}],
                        "name": "CONTROLE 4",
                        "dependencies": [
                        "Periodo:7"
            ],
                        "period": 8,
                        "cht": 60,
                        "x": 28.5,
                        "y": 22.0,
                        "type": "optional",
                        "groupId": "[214]"
            },
            {
                        "id": "EL68F",
                        "equivalents": [{"id": "EEC41", "cht": 60}],
                        "name": "CONTROLE SUPERVISÓRIO",
                        "dependencies": [
                        "Periodo:7"
            ],
                        "period": 8,
                        "cht": 60,
                        "x": 40.0,
                        "y": 22.0,
                        "type": "optional",
                        "groupId": "[214]"
            },
            {
                        "id": "ET7GD",
                        "equivalents": [{"id": "ELF75", "cht": 60}, {"id": "ELT7EF", "cht": 60}],
                        "name": "INTRODUÇÃO À IDENTIFICAÇÃO DE SISTEMAS",
                        "dependencies": [
                        "Periodo:7"
            ],
                        "period": 8,
                        "cht": 60,
                        "x": 51.5,
                        "y": 22.0,
                        "type": "optional",
                        "groupId": "[214]"
            },
            {
                        "id": "GE70M",
                        "equivalents": [{"id": "GE60G", "cht": 30}],
                        "name": "ESTRATÉGIA EMPRESARIAL",
                        "dependencies": [
                        "Periodo:7"
            ],
                        "period": 8,
                        "cht": 30,
                        "x": 5.5,
                        "y": 34.0,
                        "type": "optional",
                        "groupId": "[212]"
            },
            {
                        "id": "GE70N",
                        "name": "CADEIA DE SUPRIMENTOS",
                        "dependencies": [
                        "Periodo:7"
            ],
                        "period": 8,
                        "cht": 30,
                        "x": 17.0,
                        "y": 34.0,
                        "type": "optional",
                        "groupId": "[212]"
            },
            {
                        "id": "GE70O",
                        "equivalents": [{"id": "GEE7M1", "cht": 45}, {"id": "GE60F", "cht": 30}],
                        "name": "GESTÃO DA QUALIDADE",
                        "dependencies": [
                        "Periodo:7"
            ],
                        "period": 8,
                        "cht": 30,
                        "x": 28.5,
                        "y": 34.0,
                        "type": "optional",
                        "groupId": "[212]"
            },
            {
                        "id": "GE70P",
                        "equivalents": [{"id": "GE60I", "cht": 30}],
                        "name": "GESTÃO DE CUSTOS INDUSTRIAIS",
                        "dependencies": [
                        "Periodo:7"
            ],
                        "period": 8,
                        "cht": 30,
                        "x": 40.0,
                        "y": 34.0,
                        "type": "optional",
                        "groupId": "[212]"
            },
            {
                        "id": "GE70Q",
                        "equivalents": [{"id": "GE60K", "cht": 30}],
                        "name": "VIABILIDADE ECONÔMICA DE PROJETOS",
                        "dependencies": [
                        "Periodo:7"
            ],
                        "period": 8,
                        "cht": 30,
                        "x": 51.5,
                        "y": 34.0,
                        "type": "optional",
                        "groupId": "[212]"
            },
            {
                        "id": "GE70R",
                        "equivalents": [{"id": "QB60F", "cht": 30}],
                        "name": "GESTÃO AMBIENTAL NAS EMPRESAS",
                        "dependencies": [
                        "Periodo:7"
            ],
                        "period": 8,
                        "cht": 30,
                        "x": 63.0,
                        "y": 34.0,
                        "type": "optional",
                        "groupId": "[212]"
            },
            {
                        "id": "ET75B",
                        "equivalents": [{"id": "ELT74D", "cht": 60}, {"id": "ET65A", "cht": 60}],
                        "name": "MATERIAIS E COMPONENTES ELÉTRICOS",
                        "dependencies": [
                        "Periodo:7"
            ],
                        "period": 8,
                        "cht": 60,
                        "x": 5.5,
                        "y": 46.0,
                        "type": "optional",
                        "groupId": "[216]"
            },
            {
                        "id": "ET76B",
                        "equivalents": [{"id": "ELT76B", "cht": 75}, {"id": "ET66A", "cht": 90}],
                        "name": "INSTALAÇÕES ELÉTRICAS PREDIAS",
                        "dependencies": [
                        "Periodo:7"
            ],
                        "period": 8,
                        "cht": 90,
                        "x": 17.0,
                        "y": 46.0,
                        "type": "optional",
                        "groupId": "[216]"
            },
            {
                        "id": "ET77B",
                        "equivalents": [{"id": "ELT77B", "cht": 75}, {"id": "ET67A", "cht": 90}],
                        "name": "INSTALAÇÕES ELÉTRICAS DE BAIXA TENSÃO",
                        "dependencies": [
                        "Periodo:7"
            ],
                        "period": 8,
                        "cht": 90,
                        "x": 28.5,
                        "y": 46.0,
                        "type": "optional",
                        "groupId": "[216]"
            },
            {
                        "id": "ET77J",
                        "equivalents": [{"id": "ELT76E", "cht": 90}, {"id": "ET67B", "cht": 75}],
                        "name": "SISTEMAS DE ENERGIA ELÉTRICA",
                        "dependencies": [
                        "Periodo:7"
            ],
                        "period": 8,
                        "cht": 75,
                        "x": 5.5,
                        "y": 58.0,
                        "type": "optional",
                        "groupId": "[218]"
            },
            {
                        "id": "ET78J",
                        "equivalents": [{"id": "ELT77E", "cht": 60}, {"id": "ET68B", "cht": 75}],
                        "name": "SISTEMAS DE DISTRIBUIÇÃO E SMART GRIDS",
                        "dependencies": [
                        "Periodo:7"
            ],
                        "period": 8,
                        "cht": 60,
                        "x": 17.0,
                        "y": 58.0,
                        "type": "optional",
                        "groupId": "[218]"
            },
            {
                        "id": "ET7FF",
                        "equivalents": [{"id": "ELT77H", "cht": 45}, {"id": "ET6CD", "cht": 60}],
                        "name": "GERÊNCIA DE MANUTENÇÃO",
                        "dependencies": [
                        "Periodo:7"
            ],
                        "period": 8,
                        "cht": 60,
                        "x": 5.5,
                        "y": 70.0,
                        "type": "optional",
                        "groupId": "[219]"
            },
            {
                        "id": "ET7FQ",
                        "equivalents": [{"id": "ET55C", "cht": 48}],
                        "name": "SERVOACIONAMENTOS",
                        "dependencies": [
                        "Periodo:7"
            ],
                        "period": 8,
                        "cht": 60,
                        "x": 17.0,
                        "y": 70.0,
                        "type": "optional",
                        "groupId": "[219]"
            },
            {
                        "id": "ET76E",
                        "equivalents": [{"id": "ELT77C", "cht": 60}, {"id": "ET66C", "cht": 60}],
                        "name": "MÁQUINAS ELÉTRICAS E ESPECIAIS",
                        "dependencies": [
                        "Periodo:7"
            ],
                        "period": 8,
                        "cht": 60,
                        "x": 28.5,
                        "y": 70.0,
                        "type": "optional",
                        "groupId": "[219]"
            },
            {
                        "id": "EL6EA",
                        "equivalents": [{"id": "CSW48", "cht": 60}],
                        "name": "LABORATÓRIO DE ELETRÔNICA INDUSTRIAL",
                        "dependencies": [
                        "Periodo:7"
            ],
                        "period": 8,
                        "cht": 60,
                        "x": 5.5,
                        "y": 82.0,
                        "type": "optional",
                        "groupId": "[220]"
            },
            {
                        "id": "EL66D",
                        "equivalents": [{"id": "EEQ32", "cht": 45}],
                        "name": "PROCESSAMENTO DIGITAL DE SINAIS",
                        "dependencies": [
                        "Periodo:7"
            ],
                        "period": 8,
                        "cht": 60,
                        "x": 17.0,
                        "y": 82.0,
                        "type": "optional",
                        "groupId": "[220]"
            },
            {
                        "id": "EL68A",
                        "equivalents": [{"id": "CSW42", "cht": 60}, {"id": "ELTE3", "cht": 60}],
                        "name": "LÓGICA RECONFIGURÁVEL",
                        "dependencies": [
                        "Periodo:7"
            ],
                        "period": 8,
                        "cht": 60,
                        "x": 28.5,
                        "y": 82.0,
                        "type": "optional",
                        "groupId": "[220]"
            },
            {
                        "id": "ET7BK",
                        "equivalents": [{"id": "ELT77G", "cht": 60}],
                        "name": "NOÇÕES DE INSTRUMENTAÇÃO INDUSTRIAL",
                        "dependencies": [
                        "Periodo:7"
            ],
                        "period": 8,
                        "cht": 60,
                        "x": 40.0,
                        "y": 82.0,
                        "type": "optional",
                        "groupId": "[220]"
            },
            {
                        "id": "CC63R",
                        "equivalents": [{"id": "ARQ72H", "cht": 60}, {"id": "AU63R", "cht": 60}, {"id": "CC75B", "cht": 60}],
                        "name": "TECNOLOGIA DAS CONSTRUÇÕES",
                        "dependencies": [
                        "Periodo:7"
            ],
                        "period": 8,
                        "cht": 60,
                        "x": 5.5,
                        "y": 92.0,
                        "type": "optional",
                        "groupId": "[222]"
            },
            {
                        "id": "CC64B",
                        "equivalents": [{"id": "CC7BQ", "cht": 60}],
                        "name": "ERGONOMIA APLICADA",
                        "dependencies": [
                        "Periodo:7"
            ],
                        "period": 8,
                        "cht": 45,
                        "x": 17.0,
                        "y": 92.0,
                        "type": "optional",
                        "groupId": "[222]"
            },
            {
                        "id": "EL6BF",
                        "equivalents": [{"id": "CSR53", "cht": 45}, {"id": "ELTB3", "cht": 60}],
                        "name": "COMUNICAÇÕES SEM FIO",
                        "dependencies": [
                        "Periodo:7"
            ],
                        "period": 8,
                        "cht": 60,
                        "x": 28.5,
                        "y": 92.0,
                        "type": "optional",
                        "groupId": "[222]"
            },
            {
                        "id": "EL6DA",
                        "equivalents": [{"id": "EEY42", "cht": 60}, {"id": "ELTA2", "cht": 60}],
                        "name": "BIOENGENHARIA E SISTEMAS MÉDICOS",
                        "dependencies": [
                        "Periodo:7"
            ],
                        "period": 8,
                        "cht": 60,
                        "x": 40.0,
                        "y": 92.0,
                        "type": "optional",
                        "groupId": "[222]"
            },
            {
                        "id": "IF65D",
                        "equivalents": [{"id": "CSG20", "cht": 45}],
                        "name": "ANÁLISE E PROJETO DE SISTEMAS",
                        "dependencies": [
                        "Periodo:7"
            ],
                        "period": 8,
                        "cht": 45,
                        "x": 51.5,
                        "y": 92.0,
                        "type": "optional",
                        "groupId": "[222]"
            },
            {
                        "id": "ME60D",
                        "equivalents": [{"id": "ME79H", "cht": 30}],
                        "name": "MANUTENÇÃO INDUSTRIAL",
                        "dependencies": [
                        "Periodo:7"
            ],
                        "period": 8,
                        "cht": 30,
                        "x": 63.0,
                        "y": 92.0,
                        "type": "optional",
                        "groupId": "[222]"
            },
            {
                        "id": "ME64I",
                        "equivalents": [{"id": "ME76F", "cht": 75}],
                        "name": "USINAGEM DE MATERIAIS",
                        "dependencies": [
                        "Periodo:7"
            ],
                        "period": 8,
                        "cht": 90,
                        "x": 74.5,
                        "y": 92.0,
                        "type": "optional",
                        "groupId": "[222]"
            },
            {
                        "id": "ET7DB", "name": "AUTOMAÇÃO PREDIAL", "dependencies": ["Periodo:7"], "period": 8, "cht": 60, "x": 17.0, "y": 10.0, "type": "optional", "groupId": "[213]", "equivalents": [{"id": "ET6CA", "cht": 60}]
            },
            {
                        "id": "ET7DC", "name": "FABRICAÇÃO AUXILIADA POR COMPUTADOR", "dependencies": ["Periodo:7"], "period": 8, "cht": 60, "x": 28.5, "y": 10.0, "type": "optional", "groupId": "[213]", "equivalents": [{"id": "ET6FE", "cht": 60}]
            },
            {
                        "id": "ET7DD", "name": "FUNDAMENTOS DE INTELIGÊNCIA ARTIFICIAL", "dependencies": ["Periodo:7"], "period": 8, "cht": 60, "x": 40.0, "y": 10.0, "type": "optional", "groupId": "[213]", "equivalents": [{"id": "ELT7AA", "cht": 45}, {"id": "ET6DP", "cht": 60}]
            },
            {
                        "id": "ET7DE", "name": "INSTRUMENTAÇÃO VIRTUAL", "dependencies": ["Periodo:7"], "period": 8, "cht": 60, "x": 51.5, "y": 10.0, "type": "optional", "groupId": "[213]", "equivalents": [{"id": "ET6DL", "cht": 60}]
            },
            {
                        "id": "ET7DF", "name": "METROLOGIA ELÉTRICA", "dependencies": ["Periodo:7"], "period": 8, "cht": 60, "x": 63.0, "y": 10.0, "type": "optional", "groupId": "[213]", "equivalents": [{"id": "ELT7AB", "cht": 45}, {"id": "ET6DA", "cht": 60}]
            },
            {
                        "id": "ET7DG", "name": "MODELAGEM E SÍNTESE DE SISTEMAS INTEGRADOS", "dependencies": ["Periodo:7"], "period": 8, "cht": 60, "x": 74.5, "y": 10.0, "type": "optional", "groupId": "[213]", "equivalents": [{"id": "ET6DD", "cht": 60}]
            },
            {
                        "id": "ET7DH", "name": "SIMULAÇÃO DE SISTEMAS ELÉTRICOS INDUSTRIAIS", "dependencies": ["Periodo:7"], "period": 8, "cht": 60, "x": 86.0, "y": 10.0, "type": "optional", "groupId": "[213]", "equivalents": [{"id": "ELT7AF", "cht": 60}, {"id": "ET6DF", "cht": 60}]
            },
            {
                        "id": "ET7DJ", "name": "SISTEMAS FLEXÍVEIS DE MANUFATURA", "dependencies": ["Periodo:7"], "period": 8, "cht": 60, "x": 17.0, "y": 16.0, "type": "optional", "groupId": "[213]"
            },
            {
                        "id": "ET7DK", "name": "SISTEMAS MECATRÔNICOS", "dependencies": ["Periodo:7"], "period": 8, "cht": 60, "x": 28.5, "y": 16.0, "type": "optional", "groupId": "[213]", "equivalents": [{"id": "ELT7AI", "cht": 45}, {"id": "ET6DN", "cht": 60}]
            },
            {
                        "id": "ET7DL", "name": "TÓPICOS ESPECIAIS EM AUTOMAÇÃO", "dependencies": ["Periodo:7"], "period": 8, "cht": 60, "x": 40.0, "y": 16.0, "type": "optional", "groupId": "[213]"
            },
            {
                        "id": "ET7DM", "name": "MÉTODOS DE AVALIAÇÃO E TOMADA DE DECISÃO EM AUTOMAÇÃO", "dependencies": ["Periodo:7"], "period": 8, "cht": 60, "x": 51.5, "y": 16.0, "type": "optional", "groupId": "[213]", "equivalents": [{"id": "ELT7AE", "cht": 60}]
            },
            {
                        "id": "ET7AA", "name": "GESTÃO DA INFORMAÇÃO", "dependencies": ["Periodo:7"], "period": 8, "cht": 30, "x": 5.5, "y": 28.0, "type": "optional", "groupId": "[212]", "equivalents": [{"id": "ET6AA", "cht": 30}]
            },
            {
                        "id": "ET7AB", "name": "GESTÃO DA QUALIDADE", "dependencies": ["Periodo:7"], "period": 8, "cht": 30, "x": 17.0, "y": 28.0, "type": "optional", "groupId": "[212]", "equivalents": [{"id": "EL6CA", "cht": 60}, {"id": "ET6AB", "cht": 30}]
            },
            {
                        "id": "ET7AC", "name": "GESTÃO DE PROJETOS", "dependencies": ["Periodo:7"], "period": 8, "cht": 30, "x": 28.5, "y": 28.0, "type": "optional", "groupId": "[212]", "equivalents": [{"id": "ELT72A", "cht": 45}, {"id": "ET56F", "cht": 32}, {"id": "ET6AC", "cht": 30}]
            },
            {
                        "id": "ET7AD", "name": "INOVAÇÃO TECNOLÓGICA", "dependencies": ["Periodo:7"], "period": 8, "cht": 30, "x": 40.0, "y": 28.0, "type": "optional", "groupId": "[212]", "equivalents": [{"id": "EL6CC", "cht": 60}, {"id": "ET6AD", "cht": 30}]
            },
            {
                        "id": "ET7AE", "name": "TÓPICOS ESPECIAIS EM PRODUÇÃO INDUSTRIAL", "dependencies": ["Periodo:7"], "period": 8, "cht": 30, "x": 51.5, "y": 28.0, "type": "optional", "groupId": "[212]", "equivalents": [{"id": "ET6AQ", "cht": 60}, {"id": "GE56A", "cht": 48}]
            },
            {
                        "id": "ET7AF", "name": "JOGOS EMPRESARIAIS", "dependencies": ["Periodo:7"], "period": 8, "cht": 30, "x": 63.0, "y": 28.0, "type": "optional", "groupId": "[212]", "equivalents": [{"id": "ET6AF", "cht": 30}]
            },
            {
                        "id": "ET7AG", "name": "SISTEMAS DE INFORMAÇÃO", "dependencies": ["Periodo:7"], "period": 8, "cht": 30, "x": 74.5, "y": 28.0, "type": "optional", "groupId": "[212]", "equivalents": [{"id": "ET6AG", "cht": 30}]
            },
            {
                        "id": "ET7AH", "name": "SIMULAÇÃO DE SISTEMAS DE PRODUÇÃO", "dependencies": ["Periodo:7"], "period": 8, "cht": 30, "x": 86.0, "y": 28.0, "type": "optional", "groupId": "[212]", "equivalents": [{"id": "ELT7AF", "cht": 60}, {"id": "ET6AH", "cht": 30}]
            },
            {
                        "id": "ET7AI", "name": "TÓPICOS DE PLANEJAMENTO INDUSTRIAL", "dependencies": ["Periodo:7"], "period": 8, "cht": 30, "x": 5.5, "y": 34.0, "type": "optional", "groupId": "[212]", "equivalents": [{"id": "ET6AI", "cht": 30}]
            },
            {
                        "id": "GE70F", "name": "GESTÃO DE PESSOAS", "dependencies": ["Periodo:7"], "period": 8, "cht": 30, "x": 17.0, "y": 34.0, "type": "optional", "groupId": "[212]", "equivalents": [{"id": "GEE7G1", "cht": 45}, {"id": "GE60B", "cht": 30}]
            },
            {
                        "id": "GE70H", "name": "GESTÃO FINANCEIRA", "dependencies": ["Periodo:7"], "period": 8, "cht": 30, "x": 28.5, "y": 34.0, "type": "optional", "groupId": "[212]", "equivalents": [{"id": "GEE7F1", "cht": 60}, {"id": "GE60C", "cht": 30}, {"id": "GE60H", "cht": 30}]
            },
            {
                        "id": "GE70K", "name": "GESTÃO DE OPORTUNIDADES", "dependencies": ["Periodo:7"], "period": 8, "cht": 30, "x": 40.0, "y": 34.0, "type": "optional", "groupId": "[212]", "equivalents": [{"id": "GEE7E1", "cht": 30}, {"id": "GE60E", "cht": 30}, {"id": "GE70T", "cht": 30}, {"id": "ME60I", "cht": 30}]
            },
            {
                        "id": "ET70F", "name": "TÓPICOS ESPECIAIS EM CIÊNCIAS AMBIENTAIS", "dependencies": [], "period": 5, "cht": 30, "x": 5.5, "y": 40.0, "type": "optional", "groupId": "[210]", "equivalents": [{"id": "ME6DP", "cht": 60}, {"id": "QB55Z", "cht": 32}]
            },
            {
                        "id": "QB7AH", "name": "EDUCAÇÃO AMBIENTAL", "dependencies": [], "period": 5, "cht": 30, "x": 17.0, "y": 40.0, "type": "optional", "groupId": "[210]", "equivalents": [{"id": "QB56F", "cht": 32}, {"id": "QB60C", "cht": 30}, {"id": "QB70L", "cht": 30}]
            },
            {
                        "id": "QB7AI", "name": "ENERGIA E MEIO AMBIENTE", "dependencies": [], "period": 5, "cht": 30, "x": 28.5, "y": 40.0, "type": "optional", "groupId": "[210]", "equivalents": [{"id": "QB54B", "cht": 32}, {"id": "QB60D", "cht": 30}]
            },
            {
                        "id": "QB70E", "name": "CIÊNCIAS DO AMBIENTE", "dependencies": [], "period": 5, "cht": 30, "x": 40.0, "y": 40.0, "type": "optional", "groupId": "[210]", "equivalents": [{"id": "QBI7CA", "cht": 30}, {"id": "QB60A", "cht": 30}, {"id": "QB70J", "cht": 30}]
            },
            {
                        "id": "QB70F", "name": "DESENVOLVIMENTO SUSTENTÁVEL", "dependencies": [], "period": 5, "cht": 30, "x": 51.5, "y": 40.0, "type": "optional", "groupId": "[210]", "equivalents": [{"id": "QB60E", "cht": 30}]
            },
            {
                        "id": "QB74I", "name": "ECOLOGIA", "dependencies": [], "period": 5, "cht": 30, "x": 63.0, "y": 40.0, "type": "optional", "groupId": "[210]", "equivalents": [{"id": "QB51F", "cht": 32}, {"id": "QB60B", "cht": 30}, {"id": "QB70K", "cht": 30}]
            }
];

export { TOTAL_COMPLEMENTARY_HOURS, TOTAL_EXTENSION_HOURS, TOTAL_HUMANITIES_HOURS, TOTAL_OPTIONAL_HOURS, NODE_WIDTH, NODE_HEIGHT, OPTIONAL_LAYOUT_MIN_X, OPTIONAL_LAYOUT_MAX_X, OPTIONAL_LAYOUT_MIN_Y, OPTIONAL_LAYOUT_MAX_Y, SPECIALIZATION_TRACKS, OPTIONAL_GROUPS_CONFIG, allNodesData, allHumanitiesData, allOptionalNodesData };
