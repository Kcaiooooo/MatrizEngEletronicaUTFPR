const TOTAL_COMPLEMENTARY_HOURS = 15;

const TOTAL_EXTENSION_HOURS = 465;

const TOTAL_HUMANITIES_HOURS = 210;

const TOTAL_OPTIONAL_HOURS = 300;

const NODE_WIDTH = 130;

const NODE_HEIGHT = 90;

const SPECIALIZATION_TRACKS = {
            'Telecomunicações': [
                'ELTB1', 'ELTB8', 'ELTB2', 'ELTB9', 'ELTB3', 'ELTB4', 'ELTB5', 'ELTB6', 'ELTB7'
            ],
            'Engenharia Biomédica': [
                'ELTA1', 'ELTA2', 'ELTA3', 'ELTA4', 'ELTA5', 'ELTA8', 'ELTA9'
            ],
            'Sistemas Computacionais': [
                'ICSD21', 'ICSD20', 'ICSF30', 'ICSE30', 'ICSG20', 'ICSI30', 'ICSB30', 'ICSM47', 'ICSM48', 'ICSM46', 'ELTE12'
            ],
            'Processamento de Sinais': [
                'ELTD6', 'ELTD10', 'ELTD7', 'ELTD11'
            ],
            'Internet das Coisas': [
                'ELTF01', 'ELTF02', 'ELTF04', 'ELTF05', 'ELTF06', 'ELTF07', 'ELTF08', 'ELTF09', 'ELTF10', 'ELTF11', 'ELTF12'
            ]
        };

const OPTIONAL_GROUPS_CONFIG = {
            // Grupos já existentes
            '[1176]': { requiredHours: 60, name: 'Opções De Expressão Gráfica' },
            '[1177]': { requiredHours: 90, name: 'Opções De Adm, Empreend E Economia' },
            '[1187]': { requiredHours: 180, name: 'Opções De Circuitos Elétricos' },
            '[1202]': { requiredHours: 45, name: 'Opções De Ativ De Síntese E Ic 2' },

            // Novos grupos adicionados
            '[1175]': { requiredHours: 60, name: 'Opções De Programação De Computador' },
            '[1190]': { requiredHours: 120, name: 'Opções De Instrumentos E Medidas' },
            '[1191]': { requiredHours: 60, name: 'Conceitos De Instrumentos E Medidas' },
            '[1192]': { requiredHours: 60, name: 'Aplicações De Instrumentos E Medidas' },
            '[1193]': { requiredHours: 210, name: 'Opções De Física Aplicada' },
            '[1194]': { requiredHours: 30, name: 'Opções De Ciências Do Ambiente' },
            '[1195]': { requiredHours: 45, name: 'Opções De Estrutura De Dados' },
            '[1196]': { requiredHours: 45, name: 'Opções De Ativ De Síntese E Ic' },
            '[1197]': { requiredHours: 60, name: 'Opções De Paradigmas De Programação' },
            '[1198]': { requiredHours: 105, name: 'Opções De Mecânica Dos Sólidos' },
            '[1199]': { requiredHours: 75, name: 'Opções De Idioma: Circuitos Digitais' },
            '[1200]': { requiredHours: 60, name: 'Opções De Idioma: Microcontroladores' },
            '[1201]': { requiredHours: 60, name: 'Opções De Idioma: Pds' },
            '[1203]': { requiredHours: 60, name: 'Opções De Idioma: Controle 1' },
            '[1204]': { requiredHours: 60, name: 'Opçoes De Idioma: Arq Org Computador' },
            '[1205]': { requiredHours: 60, name: 'Opções De Idioma: Sistemas Operacionais' },
            '[1206]': { requiredHours: 60, name: 'Opções De Idioma: Controle 2' },
            '[1207]': { requiredHours: 60, name: 'Opções De Idioma: Lógica Reconfigurável' },
            '[1208]': { requiredHours: 60, name: 'Opçoes De Idioma: Sistemas Embarcados' },
            '[1209]': { requiredHours: 60, name: 'Opções De Idioma: Princípios De Comunic' },
            '[1210]': { requiredHours: 75, name: 'Opções De Idioma: Eletrônica De Potência' },
            '[1211]': { requiredHours: 60, name: 'Opções De Idioma: Automação' },
            '[1212]': { requiredHours: 75, name: 'Opções De Idioma: Comunicações Digitais' }
        };

const allNodesData = [
            // Período 1
            { id: 'ELB11', name: 'Algoritmos', dependencies: [], period: 1, chs: 3, cht: 45, x: 5.5, y: 2, type: 'subject', alternative: { id: 'EL71E / ELN73B', name: 'EL71E, ELN73B' } },
            { id: 'ELE11', name: 'Eletricidade Prática', dependencies: [], period: 1, chs: 4, cht: 60, x: 20, y: 2, type: 'subject', alternative: { id: 'EEX11 / ELEX10', name: 'EEX11, ELEX10' } },
            { id: 'ELE15', name: 'Acolhimento', dependencies: [], period: 1, chs: 2, cht: 30, x: 35, y: 2, type: 'subject' },
            { id: 'MAT7GA', name: 'Geometria Analítica', dependencies: [], period: 1, chs: 4, cht: 60, x: 50, y: 2, type: 'subject' },
            { id: 'MAT7PC', name: 'Pré-Cálculo', dependencies: [], period: 1, chs: 4, cht: 60, x: 65, y: 2, type: 'subject' },
            { id: 'QBI7QT', name: 'Química Teórica', dependencies: [], period: 1, chs: 4, cht: 60, x: 80, y: 2, type: 'subject' },
            { id: 'QBI7QE', name: 'Química Exp.', dependencies: [], period: 1, chs: 2, cht: 30, x: 94.5, y: 2, type: 'subject' },

            // Período 2
            { id: 'ELB13', name: 'Desenho Técnico', dependencies: [], period: 2, cht: 30, chs: 2, x: 5.5, y: 13, type: 'subject', groupId: '[1176]', alternative: { id: 'EEF11 / ELEF10', name: 'EEF11, ELEF10' } },
            { id: 'ELB23', name: 'Desenho Técnico Aplicado', dependencies: [], period: 2, cht: 30, chs: 2, x: 20, y: 13, type: 'subject', groupId: '[1176]', alternative: { id: 'EEF21 / EL74H / ELEF20', name: 'EEF21, EL74H, ELEF20' } },
            { id: 'ELB21', name: 'Prog. de Computador', dependencies: ['ELB11'], period: 2, chs: 4, cht: 60, x: 35, y: 13, type: 'subject', alternative: { id: 'EL72E / ELN74B', name: 'EL72E, ELN74B' }, groupId: '[1175]' },
            { id: 'MAT7AL', name: 'Álgebra Linear', dependencies: ['MAT7GA'], period: 2, chs: 4, cht: 60, x: 50, y: 13, type: 'subject' },
            { id: 'MAT7C1', name: 'Cálculo 1', dependencies: ['MAT7PC'], period: 2, chs: 6, cht: 90, x: 65, y: 13, type: 'subject' },
            { id: 'ELE21', name: 'Intro. Comunicação e Redes', dependencies: [], period: 2, cht: 45, chs: 3, x: 80, y: 13, type: 'subject' },
            { id: 'QBI7CA', name: 'Ciências do Ambiente', dependencies: [], period: 2, cht: 30, chs: 2, x: 94.5, y: 13, type: 'subject', groupId: '[1194]', alternative: { id: 'QB70J / QB70E / QB17CA', name: 'QB70J, QB70E, QB17CA' } },

            // Período 3
            { id: 'ELE41', name: 'Oficina de Integração 1', dependencies: ['ELB21', 'ELE11'], period: 3, chs: 3, cht: 45, x: 5.5, y: 23, type: 'subject', groupId: '[1196]', alternative: { id: 'EEXZ1 / ELEX20', name: 'EEXZ1, ELEX20' } },
            { id: 'ELP35', name: 'Estrutura de Dados', dependencies: ['ELB21'], equivalents: [{ id: 'ELP35R', cht: 45 }], period: 3, chs: 3, cht: 45, x: 18.2, y: 23, type: 'subject', alternative: { id: 'ELP35R', name: 'ELP35R' }, groupId: '[1195]' },
            { id: 'ELB21R', name: 'Est. de Prog. de Computador', dependencies: ['ELB11'], period: 2, chs: 4, cht: 60, x: 30.9, y: 23, type: 'subject', groupId: '[1175]' },
            { id: 'ELP31T', name: 'Teoria de Circuitos Elétricos CC', dependencies: ['MAT7C1'], period: 3, cht: 60, chs: 4, x: 43.6, y: 23, type: 'subject', groupId: '[1187]' },
            { id: 'ELP31TP', name: 'Circuitos Elétricos 1 (Int.)', dependencies: ['MAT7C1'], period: 3, chs: 6, cht: 90, x: 56.4, y: 23, type: 'subject', groupId: '[1187]' },
            { id: 'FIS7F1', name: 'Física 1', dependencies: ['MAT7C1'], period: 3, chs: 4, cht: 60, x: 69.1, y: 23, type: 'subject' },
            { id: 'MAT7C2', name: 'Cálculo 2', dependencies: ['MAT7C1'], period: 3, chs: 6, cht: 90, x: 81.8, y: 23, type: 'subject' },
            { id: 'MAT7ED', name: 'Eq. Dif. Ordinárias', dependencies: ['MAT7C1'], period: 3, cht: 60, chs: 4, x: 94.5, y: 23, type: 'subject' },

            // Período 4
            { id: 'ICSE20', name: 'Técnicas de Prog.', dependencies: ['ELP35'], equivalents: [{ id: 'ICSE20R', cht: 60 }], period: 4, chs: 4, cht: 60, x: 5.5, y: 34, type: 'subject', alternative: { id: 'ICSE20R', name: 'ICSE20R' }, groupId: '[1197]' },
            { id: 'ELP41', name: 'Eletrônica Analógica 1', dependencies: ['ELP31T'], period: 4, chs: 4, cht: 60, x: 16.25, y: 34, type: 'subject', alternative: { id: 'ET74C', name: 'ET74C' } },
            { id: 'ELP42P', name: 'Prática de Circuitos Elétricos', dependencies: ['ELP31T'], period: 3, cht: 45, chs: 3, x: 27.5, y: 34, type: 'subject', groupId: '[1187]' },
            { id: 'ELP42T', name: 'Teoria de Circuitos Elétricos CA', dependencies: ['ELP31T'], period: 3, cht: 75, chs: 5, x: 38.75, y: 34, type: 'subject', groupId: '[1187]' },
            { id: 'ELP42TP', name: 'Circuitos Elétricos 2 (Int.)', dependencies: ['ELP31TP'], period: 3, chs: 6, cht: 90, x: 50, y: 34, type: 'subject', groupId: '[1187]' },
            { id: 'FIS7F2', name: 'Física 2', dependencies: ['FIS7F1'], period: 4, chs: 4, cht: 60, x: 61.25, y: 34, type: 'subject' },
            { id: 'ELB31', name: 'Prob. e Estatística', dependencies: ['MAT7C1'], period: 4, chs: 3, cht: 45, x: 72.5, y: 34, type: 'subject', alternative: { id: 'MA70H', name: 'MA70H' } },
            { id: 'ELB51', name: 'Mecânica Geral', dependencies: ['FIS7F1'], period: 4, cht: 60, chs: 4, x: 83.75, y: 34, type: 'subject', groupId: '[1198]', alternative: { id: 'F170A', name: 'F170A' } },
            { id: 'ELB61', name: 'Princípios de Resist. dos Materiais', dependencies: ['ELB51'], period: 4, cht: 45, chs: 3, x: 94.5, y: 34, type: 'subject', groupId: '[1198]', alternative: { id: 'MEC72B', name: 'MEC72B' } },

            // Período 5
            { id: 'ELP51', name: 'Eletrônica Analógica 2', dependencies: ['ELP41'], period: 5, chs: 4, cht: 60, x: 5.5, y: 45, type: 'subject', alternative: { id: 'EEE31 / ELEE30', name: 'EEE31, ELEE30' } },
            { id: 'ELF41', name: 'Circuitos Digitais', dependencies: ['ELP41'], equivalents: [{ id: 'ELW41', cht: 75 }], period: 5, chs: 5, cht: 75, x: 17.86, y: 45, type: 'subject', alternative: { id: 'EEB31 / ELEB30', name: 'EEB31, ELEB30' }, groupId: '[1199]' },
            { id: 'FIS7E1', name: 'Física Exp. 1', dependencies: ['FIS7F1'], period: 5, chs: 2, cht: 30, x: 30.72, y: 45, type: 'subject' },
            { id: 'ELB66', name: 'Sinais e Sistemas', dependencies: ['MAT7C2'], period: 5, chs: 6, cht: 90, x: 43.58, y: 45, type: 'subject', alternative: { id: 'ELEQ30 / ET75H / ET7GF', name: 'ELEQ30, ET75H, ET7GF' } },
            { id: 'ELB52', name: 'Eletromagnetismo 1', dependencies: ['MAT7C2'], period: 5, chs: 4, cht: 60, x: 56.44, y: 45, type: 'subject', alternative: { id: 'ET74E', name: 'ET74E' } },
            { id: 'ELP64', name: 'Eletromag. 2: Linhas e Antenas', dependencies: ['ELB52'], period: 5, chs: 4, cht: 60, x: 69.3, y: 45, type: 'subject' },
            { id: 'ELP65', name: 'Máquinas Elétricas', dependencies: ['ELB52'], period: 5, cht: 60, chs: 4, x: 82.16, y: 45, type: 'subject' },
            { id: 'ELT74A', name: 'Fund. Fenômenos de Transporte', dependencies: ['FIS7F2'], period: 5, cht: 30, chs: 2, x: 94.5, y: 45, type: 'subject' },

            // Período 6
            { id: 'ELP61', name: 'Eletrônica Analógica 3', dependencies: ['ELP51'], period: 6, chs: 4, cht: 60, x: 5.5, y: 55, type: 'subject', alternative: { id: 'EEF32 / ELEE31', name: 'EEF32, ELEE31' } },
            { id: 'ELF52', name: 'Microcontrolados', dependencies: ['ELF41'], equivalents: [{ id: 'ELW52', cht: 60 }], period: 6, chs: 4, cht: 60, x: 27.5, y: 55, type: 'subject', alternative: { id: 'CSW40 / ELEW31', name: 'CSW40, ELEW31' }, groupId: '[1200]' },
            { id: 'ELP34', name: 'Medidas Elétricas', dependencies: ['ELP42P', 'ELP42T', 'MAT7ED'], period: 6, chs: 4, cht: 60, x: 50, y: 55, type: 'subject', groupId: '[1191]', alternative: { id: 'ELT75F / ET75F', name: 'ELT75F, ET75F' } },
            { id: 'ELF51', name: 'PDS', dependencies: ['ELB66'], equivalents: [{ id: 'ELW51', cht: 60 }], period: 6, chs: 4, cht: 60, x: 72.5, y: 55, type: 'subject', alternative: { id: 'EEQ32 / ELEQ31', name: 'EEQ32, ELEQ31' }, groupId: '[1201]' },
            { id: 'ELP63', name: 'Instrumentação Industrial', dependencies: ['ELP34'], equivalents: [{ id: 'ELP67', cht: 60 }], period: 6, cht: 60, chs: 4, x: 94.5, y: 55, type: 'subject', groupId: '[1192]', alternative: { id: 'EL75G / ELN75C / ELP67', name: 'EL75G, ELN75C, ELP67' } },

            // Período 7
            { id: 'ELE64', name: 'Oficina de Integração (Genérica)', dependencies: ['Periodo:6'], period: 7, cht: 45, chs: 3, x: 5.5, y: 66, type: 'subject', groupId: '[1202]', alternative: { id: 'EEX22 / ELEX21', name: 'EEX22, ELEX21' } },
            { id: 'ELXB1', name: 'Oficina de Int. (Biomédica)', dependencies: ['Periodo:6'], period: 7, cht: 45, chs: 3, x: 17.86, y: 66, type: 'subject', groupId: '[1202]' },
            { id: 'ELXT1', name: 'Oficina de Int. (Telecom)', dependencies: ['Periodo:6'], period: 7, cht: 45, chs: 3, x: 30.72, y: 66, type: 'subject', groupId: '[1202]' },
            { id: 'ELP71', name: 'Eletrônica Analógica 4', dependencies: ['ELP61'], period: 7, chs: 4, cht: 60, x: 43.58, y: 66, type: 'subject' },
            { id: 'ELF61', name: 'Arq. de Computadores', dependencies: ['ELF52'], equivalents: [{ id: 'ELW61', cht: 60 }], period: 7, chs: 4, cht: 60, x: 56.44, y: 66, type: 'subject', alternative: { id: 'CSW30 / ELEW30', name: 'CSW30, ELEW30' }, groupId: '[1204]' },
            { id: 'ELF66', name: 'Sistemas Operacionais', dependencies: ['ELF52'], equivalents: [{ id: 'ELW66', cht: 60 }], period: 7, chs: 4, cht: 60, x: 69.3, y: 66, type: 'subject', alternative: { id: 'ICSO30', name: 'ICSO30' }, groupId: '[1205]' },
            { id: 'ELF62', name: 'Controle 1', dependencies: ['ELB66'], equivalents: [{ id: 'ELW62', cht: 60 }], period: 7, chs: 4, cht: 60, x: 82.16, y: 66, type: 'subject', alternative: { id: 'EEC21 / EL76A / ELEC20 / ET76H', name: 'EEC21, EL76A, ELEC20, ET76H' }, groupId: '[1203]' },
            { id: 'ELS02', name: 'Estágio Obrigatório', dependencies: [], period: 7, cht: 360, chs: 0, x: 94.5, y: 66, type: 'subject' },

            // Período 8
            { id: 'ELP66', name: 'Planej. de Carreira', dependencies: [], period: 8, chs: 2, cht: 30, x: 5.5, y: 77, type: 'subject' },
            { id: 'ELF84', name: 'Eletrônica de Potência', dependencies: ['ELP61'], equivalents: [{ id: 'ELW84', cht: 75 }], period: 8, chs: 5, cht: 75, x: 23, y: 77, type: 'subject', alternative: { id: 'EL76G / ET76C', name: 'EL76G, ET76C' }, groupId: '[1210]' },
            { id: 'ELF74', name: 'Sistemas Embarcados', dependencies: ['ELF61', 'ELF66'], equivalents: [{ id: 'ELW74', cht: 60 }], period: 8, chs: 4, cht: 60, x: 41, y: 77, type: 'subject', alternative: { id: 'CSW41 / ELEW32', name: 'CSW41, ELEW32' }, groupId: '[1208]' },
            { id: 'ELP73', name: 'Princ. de Comunicações', dependencies: ['ELB66', 'ELP71'], equivalents: [{ id: 'ELW71', cht: 60 }], period: 8, chs: 4, cht: 60, x: 59, y: 77, type: 'subject', alternative: { id: 'ELW71', name: 'Communication Systems' }, groupId: '[1209]' },
            { id: 'ELF72', name: 'Controle 2', dependencies: ['ELF62'], equivalents: [{ id: 'ELW72', cht: 60 }], period: 8, chs: 4, cht: 60, x: 77, y: 77, type: 'subject', alternative: { id: 'EL77A / ET77H', name: 'EL77A, ET77H' }, groupId: '[1206]' },
            { id: 'ELTE3', name: 'Lógica Reconfigurável', dependencies: ['ELB66'], period: 8, cht: 60, chs: 4, x: 94.5, y: 77, type: 'subject', groupId: '[1207]', alternative: { id: 'CSW42 / ELEW33', name: 'CSW42, ELEW33' } },

            // Período 9
            { id: 'ELE91', name: 'TCC 1', dependencies: [], period: 9, chs: 3, cht: 45, x: 5.5, y: 87, type: 'subject' },
            { id: 'ELO91', name: 'Ética e Cidadania', dependencies: [], period: 9, chs: 2, cht: 30, x: 35, y: 87, type: 'subject' },
            { id: 'ELF73', name: 'Com. Digitais', dependencies: ['ELP73'], equivalents: [{ id: 'ELW73', cht: 75 }], period: 9, chs: 5, cht: 75, x: 65, y: 87, type: 'subject', alternative: { id: 'ELW73', name: 'Digital Communications' }, groupId: '[1212]' },
            { id: 'ELF81', name: 'Controle a Ev. Discretos', dependencies: ['ELF62'], period: 9, chs: 4, cht: 60, x: 94.5, y: 87, type: 'subject', alternative: { id: 'EEC46 / EL76B', name: 'EEC46, EL76B' }, groupId: '[1211]' },

            // Período 10
            { id: 'ELE92', name: 'TCC 2', dependencies: ['ELE91'], period: 10, chs: 0, cht: 15, x: 5.5, y: 98, type: 'subject' },
            { id: 'ELO92', name: 'Empreendedorismo', dependencies: [], period: 10, cht: 30, chs: 2, x: 15, y: 98, type: 'subject', alternative: { id: 'ELBAA / GE70T / GEE7E1 / ME781', name: 'ELBAA, GE70T, GEE7E1, ME781' } },
            { id: 'GEE7A1', name: 'Fund. de Administração', dependencies: [], period: 10, cht: 45, chs: 3, x: 25, y: 98, type: 'subject', groupId: '[1177]' },
            { id: 'GEE7E3', name: 'Fund. de Economia', dependencies: [], period: 10, cht: 30, chs: 2, x: 35, y: 98, type: 'subject', groupId: '[1177]' },
            { id: 'GEE7E5', name: 'Fund. de Eng. Econômica', dependencies: [], period: 10, cht: 60, chs: 4, x: 45, y: 98, type: 'subject', groupId: '[1177]' },
            { id: 'GEE7F1', name: 'Fund. de Finanças', dependencies: [], period: 10, cht: 60, chs: 4, x: 55, y: 98, type: 'subject', groupId: '[1177]', alternative: { id: 'GEE7F2', name: 'GEE7F2' } },
            { id: 'GEE7G1', name: 'Fund. de Gestão de Pessoas', dependencies: [], period: 10, cht: 45, chs: 3, x: 65, y: 98, type: 'subject', groupId: '[1177]' },
            { id: 'GEE7G3', name: 'Fund. de Gestão da Produção', dependencies: [], period: 10, cht: 45, chs: 3, x: 75, y: 98, type: 'subject', groupId: '[1177]' },
            { id: 'GEE7G5', name: 'Fund. de Gestão de Projeto', dependencies: [], period: 10, cht: 45, chs: 3, x: 85, y: 98, type: 'subject', groupId: '[1177]' },
            { id: 'GEE7M1', name: 'Fund. de Marketing', dependencies: [], period: 10, cht: 45, chs: 3, x: 94.5, y: 98, type: 'subject', groupId: '[1177]' }
        ];

const allHumanitiesData = [
            // --- INÍCIO DO CÓDIGO PARA allHumanitiesData ---
            // Período 2 - [1215] Linguística, Letras e Artes
            { id: 'CAART02', name: 'Prática Musical 1', dependencies: [], period: 2, cht: 60, type: 'humanities', x: 5.5, y: 5 },
            { id: 'CAART03', name: 'Prática Musical 2', dependencies: [], period: 2, cht: 60, type: 'humanities', x: 5.5, y: 12 },
            { id: 'CAART04', name: 'Grupos Instrumentais 1', dependencies: [], period: 2, cht: 90, type: 'humanities', x: 5.5, y: 19 },
            { id: 'CAART05', name: 'Grupos Instrumentais 2', dependencies: [], period: 2, cht: 90, type: 'humanities', x: 5.5, y: 26 },
            { id: 'CAART06', name: 'Grupos Instrumentais 3', dependencies: [], period: 2, cht: 90, type: 'humanities', x: 5.5, y: 33 },
            { id: 'CAART07', name: 'Grupos Instrumentais 4', dependencies: [], period: 2, cht: 90, type: 'humanities', x: 5.5, y: 40 },
            { id: 'EDU70J', name: 'Libras', dependencies: [], period: 2, cht: 45, type: 'humanities', x: 16.25, y: 5 },
            { id: 'EDU7AG', name: 'Espanhol para Eng. 1', dependencies: [], period: 2, cht: 45, type: 'humanities', x: 16.25, y: 12 },
            { id: 'EDU7AH', name: 'Espanhol para Eng. 2', dependencies: [], period: 2, cht: 45, type: 'humanities', x: 16.25, y: 19 },
            { id: 'EDU7AI', name: 'Prática de Escrita para Eng.', dependencies: [], period: 2, cht: 60, type: 'humanities', x: 16.25, y: 26 },
            { id: 'LEM7A1', name: 'Alemão 1', dependencies: [], period: 2, cht: 60, type: 'humanities', x: 27.5, y: 5 },
            { id: 'LEM7A2', name: 'Alemão 2', dependencies: [], period: 2, cht: 60, type: 'humanities', x: 27.5, y: 12 },
            { id: 'LEM7A3', name: 'Alemão 3', dependencies: [], period: 2, cht: 60, type: 'humanities', x: 27.5, y: 19 },
            { id: 'LEM7A4', name: 'Alemão 4', dependencies: [], period: 2, cht: 60, type: 'humanities', x: 27.5, y: 26 },
            { id: 'LEM7A5', name: 'Alemão 5', dependencies: [], period: 2, cht: 60, type: 'humanities', x: 27.5, y: 33 },
            { id: 'LEM7F1', name: 'Francês 1', dependencies: [], period: 2, cht: 60, type: 'humanities', x: 38.75, y: 5 },
            { id: 'LEM7F2', name: 'Francês 2', dependencies: [], period: 2, cht: 60, type: 'humanities', x: 38.75, y: 12 },
            { id: 'LEM7F3', name: 'Francês 3', dependencies: [], period: 2, cht: 60, type: 'humanities', x: 38.75, y: 19 },
            { id: 'LEM7F4', name: 'Francês 4', dependencies: [], period: 2, cht: 60, type: 'humanities', x: 38.75, y: 26 },
            { id: 'LEM7F5', name: 'Francês 5', dependencies: [], period: 2, cht: 60, type: 'humanities', x: 38.75, y: 33 },

            // Período 2 - [1214] Ciências Humanas
            { id: 'FCH7FA', name: 'Filosofia da Ciência e Tec.', dependencies: [], period: 2, cht: 45, type: 'humanities', x: 50, y: 5 },
            { id: 'FCH7FC', name: 'Teoria das Ciências Humanas', dependencies: [], period: 2, cht: 45, type: 'humanities', x: 50, y: 12 },
            { id: 'FCH7GA', name: 'Metropolização Contemp.', dependencies: [], period: 2, cht: 45, type: 'humanities', x: 50, y: 19 },
            { id: 'FCH7HA', name: 'História da Técnica e Tec.', dependencies: [], period: 2, cht: 45, type: 'humanities', x: 50, y: 26 },
            { id: 'FCH7HB', name: 'História Geral da Economia', dependencies: [], period: 2, cht: 45, type: 'humanities', x: 50, y: 33 },
            { id: 'FCH7HC', name: 'Capitalismo Contemp.', dependencies: [], period: 2, cht: 45, type: 'humanities', x: 50, y: 40 },
            { id: 'FCH7PA', name: 'Psicologia do Trabalho', dependencies: [], period: 2, cht: 30, type: 'humanities', x: 61.25, y: 5 },
            { id: 'FCH7PB', name: 'Relações Interpessoais', dependencies: [], period: 2, cht: 30, type: 'humanities', x: 61.25, y: 12 },
            { id: 'FCH7SA', name: 'Sociologia', dependencies: [], period: 2, cht: 45, type: 'humanities', x: 61.25, y: 19 },
            { id: 'FCH7SB', name: 'Tecnologia e Sociedade', dependencies: [], period: 2, cht: 45, type: 'humanities', x: 61.25, y: 26 },
            { id: 'FCH7SC', name: 'Tec., Trabalho e Saúde', dependencies: [], period: 2, cht: 45, type: 'humanities', x: 61.25, y: 33 },
            { id: 'FCH7SD', name: 'Sociedade e Política no BR', dependencies: [], period: 2, cht: 45, type: 'humanities', x: 61.25, y: 40 },
            { id: 'FCH7XC', name: 'Presença Africana no Brasil', dependencies: [], period: 2, cht: 30, type: 'humanities', x: 72.5, y: 5 },
            { id: 'FCH7XF', name: 'Dimensão Amb. na Gestão Urbana', dependencies: [], period: 2, cht: 45, type: 'humanities', x: 72.5, y: 12 },
            { id: 'FCH7XG', name: 'Tecnopolíticas da Soc. Contemp.', dependencies: [], period: 2, cht: 45, type: 'humanities', x: 72.5, y: 19 },

            // Período 2 - [1213] Ciências Sociais e Aplicadas & [1216] Saúde & [1217] Eletivas
            { id: 'ELH04', name: 'Inovação Tec. e Financiamento', dependencies: [], period: 2, cht: 60, type: 'humanities', x: 83.75, y: 5 },
            { id: 'ELH05', name: 'Noções Jurídicas p/ Empreend.', dependencies: [], period: 2, cht: 60, type: 'humanities', x: 83.75, y: 12 },
            { id: 'ELH06', name: 'Metodologias Ativas p/ Eng.', dependencies: [], period: 2, cht: 30, type: 'humanities', x: 83.75, y: 19 },
            { id: 'LICOM7AB', name: 'Comunicação Soc. e Eventos', dependencies: [], period: 2, cht: 105, type: 'humanities', x: 83.75, y: 26 },
            { id: 'ELH01', name: 'Fund. de Primeiros Socorros', dependencies: [], period: 2, cht: 30, type: 'humanities', x: 94.5, y: 5 },
            { id: 'ELH02', name: 'Prática de Grupo com Música', dependencies: [], period: 2, cht: 30, type: 'humanities', x: 94.5, y: 12 },
            { id: 'ELH07', name: 'Humanidades 1', dependencies: [], period: 2, cht: 30, type: 'humanities', x: 94.5, y: 19 },
            { id: 'ELH08', name: 'Humanidades 2', dependencies: [], period: 2, cht: 45, type: 'humanities', x: 94.5, y: 26 },
            { id: 'ELH09', name: 'Humanidades 3', dependencies: [], period: 2, cht: 60, type: 'humanities', x: 94.5, y: 33 },
            { id: 'ELS03', name: 'Ativ. Complementares', dependencies: [], period: 2, cht: 15, type: 'humanities', x: 83.75, y: 33 },
            { id: 'ELH10', name: 'Humanidades 4', dependencies: [], period: 2, cht: 75, type: 'humanities', x: 94.5, y: 40 },
            { id: 'ELH14', name: 'Humanidades 5', dependencies: [], period: 2, cht: 30, type: 'humanities', x: 94.5, y: 47 },
            { id: 'ELH15', name: 'Inteligência Artificial e Informática na Educação', dependencies: [], period: 2, cht: 60, type: 'humanities', x: 27.5, y: 40 },
            { id: 'ELH16', name: 'Prática de Habilidades Sociais por Meio de Jogos de Tabuleiros', dependencies: [], period: 2, cht: 60, type: 'humanities', x: 38.75, y: 40 }
            // --- FIM DO CÓDIGO PARA allHumanitiesData ---
        ];

const allOptionalNodesData = [
            // Trilha: Telecomunicações [1181]
            { id: 'ELTB1', name: 'Sistemas de Comunicação', dependencies: ['ELP66'], period: 9, cht: 60, x: 10, y: 10, type: 'optional' },
            { id: 'ELTB8', name: 'Redes de Computadores', dependencies: ['ELP66'], period: 9, cht: 60, x: 22, y: 10, type: 'optional' },
            { id: 'ELTB2', name: 'Redes Avançadas', dependencies: ['ELP66'], period: 9, cht: 60, x: 34, y: 10, type: 'optional' },
            { id: 'ELTB9', name: 'Segurança de Redes e Sistemas', dependencies: ['ELP66', 'ELTB8'], period: 9, cht: 60, x: 46, y: 10, type: 'optional' },
            { id: 'ELTB3', name: 'Comunicações Sem Fio', dependencies: ['ELB31', 'ELB66', 'ELF73', 'ELP66'], period: 9, cht: 60, x: 58, y: 10, type: 'optional' },
            { id: 'ELTB4', name: 'Comunicações Ópticas', dependencies: ['ELP64', 'ELP66'], period: 9, cht: 60, x: 70, y: 10, type: 'optional' },
            { id: 'ELTB5', name: 'Eletromagnetismo Aplicado', dependencies: ['ELB66', 'ELP64', 'ELP71'], period: 9, cht: 60, x: 82, y: 10, type: 'optional' },
            { id: 'ELTB6', name: 'Tópicos Avançados em Com.', dependencies: ['ELP66'], period: 9, cht: 60, x: 94.5, y: 10, type: 'optional' },
            { id: 'ELTB7', name: 'Aplicações de Machine Learning em Com.', dependencies: ['ELF73', 'ELP66', 'ELTB3'], period: 9, cht: 60, x: 58, y: 17, type: 'optional' },

            // Trilha: Engenharia Biomédica [1182]
            { id: 'ELTA1', name: 'Princípios de Eng. Biomédica', dependencies: ['ELP66'], period: 9, cht: 30, x: 10, y: 26, type: 'optional' },
            { id: 'ELTA2', name: 'Bioengenharia', dependencies: ['ELP66'], period: 9, cht: 60, x: 22, y: 26, type: 'optional' },
            { id: 'ELTA3', name: 'Engenharia Médica', dependencies: ['ELP66'], period: 9, cht: 60, x: 34, y: 26, type: 'optional' },
            { id: 'ELTA4', name: 'Engenharia Clínica', dependencies: ['ELP66'], period: 9, cht: 60, x: 46, y: 26, type: 'optional' },
            { id: 'ELTA5', name: 'Fisiologia Quantitativa para Eng.', dependencies: ['ELP66'], period: 9, cht: 60, x: 58, y: 26, type: 'optional' },
            { id: 'ELTA8', name: 'Aquisição e Proc. de Sinais Biomédicos', dependencies: ['ELP66'], period: 9, cht: 60, x: 70, y: 26, type: 'optional' },
            { id: 'ELTA9', name: 'Proc. de Sinais e Imagens Biomédicas', dependencies: ['ELP66'], period: 9, cht: 60, x: 82, y: 26, type: 'optional' },

            // Trilha: Sistemas Computacionais [1183]
            { id: 'ICSD21', name: 'Matemática Discreta', dependencies: ['ELP66'], period: 9, cht: 45, x: 10, y: 35, type: 'optional' },
            { id: 'ICSD20', name: 'Introdução a Lógica para Computação', dependencies: ['ELP66'], period: 9, cht: 45, x: 22, y: 35, type: 'optional' },
            { id: 'ICSF30', name: 'Estruturas de Dados 2', dependencies: ['ELP66'], period: 9, cht: 45, x: 34, y: 35, type: 'optional' },
            { id: 'ICSE30', name: 'Engenharia de Software', dependencies: ['ELP66'], period: 9, cht: 60, x: 46, y: 35, type: 'optional' },
            { id: 'ICSG20', name: 'Análise e Projeto de Sistemas', dependencies: ['ELP66'], period: 9, cht: 45, x: 58, y: 35, type: 'optional' },
            { id: 'ICSI30', name: 'Sistemas Inteligentes', dependencies: ['ELP66'], period: 9, cht: 45, x: 70, y: 35, type: 'optional' },
            { id: 'ICSB30', name: 'Introdução a Banco de Dados', dependencies: ['ELP66'], period: 9, cht: 60, x: 82, y: 35, type: 'optional' },
            { id: 'ICSM47', name: 'Desenvolvimento Web - Front-End', dependencies: ['ELP66'], period: 9, cht: 60, x: 10, y: 42, type: 'optional' },
            { id: 'ICSM48', name: 'Desenvolvimento Web - Back-End', dependencies: ['ELP66'], period: 9, cht: 60, x: 22, y: 42, type: 'optional' },
            { id: 'ICSM46', name: 'Prog. p/ Dispositivos Móveis', dependencies: ['ELP66'], period: 9, cht: 60, x: 34, y: 42, type: 'optional' },
            { id: 'ELTE12', name: 'Princípios de Compiladores', dependencies: [], period: 9, cht: 60, x: 46, y: 42, type: 'optional' },

            // Trilha: Processamento de Sinais, Imagens e Padrões [1184]
            { id: 'ELTD6', name: 'Fund. Matemáticos para Sinais', dependencies: ['ELP66'], period: 9, cht: 60, x: 10, y: 51, type: 'optional' },
            { id: 'ELTD10', name: 'PDS Avançado', dependencies: ['ELF51', 'ELP66'], period: 9, cht: 60, x: 22, y: 51, type: 'optional' },
            { id: 'ELTD7', name: 'Introdução ao Aprendizado de Máquina', dependencies: ['ELP66'], period: 9, cht: 60, x: 34, y: 51, type: 'optional' },
            { id: 'ELTD11', name: 'Oficina de Sinais, Imagens e Padrões', dependencies: ['ELF51', 'ELP66'], period: 9, cht: 60, x: 46, y: 51, type: 'optional' },

            // Trilha: Internet das Coisas (Sistemas Ciberfísicos) [???]
            { id: 'ELTF01', name: 'Introdução e Aplicações IoT', dependencies: ['ELP66'], period: 9, cht: 30, x: 10, y: 60, type: 'optional' },
            { id: 'ELTF02', name: 'Sistemas Cliente-Servidor IoT', dependencies: ['ELP66'], period: 9, cht: 60, x: 22, y: 60, type: 'optional' },
            { id: 'ELTF04', name: 'Linguagem de Programação IoT', dependencies: ['ELP66'], period: 9, cht: 60, x: 34, y: 60, type: 'optional' },
            { id: 'ELTF05', name: 'Objetos Inteligentes e Conectados', dependencies: ['ELP66'], period: 9, cht: 60, x: 46, y: 60, type: 'optional' },
            { id: 'ELTF06', name: 'Uso de Computação em Nuvem IoT', dependencies: ['ELP66'], period: 9, cht: 60, x: 58, y: 60, type: 'optional' },
            { id: 'ELTF07', name: 'Linux: Servidores em IoT', dependencies: ['ELP66'], period: 9, cht: 60, x: 70, y: 60, type: 'optional' },
            { id: 'ELTF08', name: 'Sistemas Embarcados em IoT', dependencies: ['ELP66'], period: 9, cht: 60, x: 82, y: 60, type: 'optional' },
            { id: 'ELTF09', name: 'Laboratório de Atuadores', dependencies: ['ELP66'], period: 9, cht: 30, x: 94.5, y: 60, type: 'optional' },
            { id: 'ELTF10', name: 'Laboratório de Gateways', dependencies: ['ELP66'], period: 9, cht: 30, x: 10, y: 67, type: 'optional' },
            { id: 'ELTF11', name: 'Aplicações IOT em Indústria', dependencies: ['ELP66'], period: 9, cht: 60, x: 22, y: 67, type: 'optional' },
            { id: 'ELTF12', name: 'Aplicações e Solução de Problemas em IoT', dependencies: ['ELP66'], period: 9, cht: 60, x: 34, y: 67, type: 'optional' },

            // Optativas Gerais [1186]
            { id: 'ELN7AC', name: 'Redes Industriais', dependencies: ['ELF72', 'ELP66'], period: 9, cht: 45, x: 10, y: 76, type: 'optional', alternative: { id: 'ELT85C', name: 'ELT85C' } },
            { id: 'ELN7AD', name: 'Sistemas de Supervisão', dependencies: ['ELF72', 'ELP66'], period: 9, cht: 45, x: 22, y: 76, type: 'optional', alternative: { id: 'ELT771 / ELT86C', name: 'ELT771, ELT86C' } },
            { id: 'ELTE9', name: 'Controle Automático', dependencies: ['ELF72', 'ELP66'], period: 9, cht: 60, x: 34, y: 76, type: 'optional' },
            { id: 'ELTE4', name: 'Introdução à Robótica', dependencies: ['ELP66'], period: 9, cht: 60, x: 46, y: 76, type: 'optional', alternative: { id: 'ELGAE', name: 'ELGAE' } },
            { id: 'ELTE5', name: 'Projeto de PCBs e Simulação', dependencies: ['ELP66'], period: 9, cht: 60, x: 58, y: 76, type: 'optional' },
            { id: 'ELTE7', name: 'Física dos Semicondutores', dependencies: ['ELP66'], period: 9, cht: 60, x: 70, y: 76, type: 'optional' },
            { id: 'ELTE8', name: 'Sistemas Não Lineares', dependencies: ['ELP66'], period: 9, cht: 60, x: 82, y: 76, type: 'optional' },
            { id: 'ELTE10', name: 'Identificação de Sistemas', dependencies: ['ELP66'], period: 9, cht: 60, x: 94.5, y: 76, type: 'optional' },
            { id: 'ELTC1', name: 'Metodologia da Pesquisa', dependencies: ['ELP66'], period: 9, cht: 60, x: 10, y: 83, type: 'optional' },
            { id: 'ELTC2', name: 'Amostragem e Planej. de Exp.', dependencies: ['ELP66'], period: 9, cht: 60, x: 22, y: 83, type: 'optional' },
            { id: 'ELTC3', name: 'Análise de Confiabilidade', dependencies: ['ELP66'], period: 9, cht: 45, x: 34, y: 83, type: 'optional' },
            { id: 'ELTC4', name: 'Análise Estatística de Dados', dependencies: ['ELP66'], period: 9, cht: 60, x: 46, y: 83, type: 'optional' },
            { id: 'ELTC5', name: 'Inferência Estatística', dependencies: ['ELP66'], period: 9, cht: 60, x: 58, y: 83, type: 'optional' },
            { id: 'ELTE1', name: 'Engenharia de Sistemas', dependencies: ['ELP66'], period: 9, cht: 45, x: 70, y: 83, type: 'optional', alternative: { id: 'EL75H', name: 'EL75H' } },
            { id: 'ELTE2', name: 'Programação Matemática', dependencies: ['ELP66'], period: 9, cht: 60, x: 82, y: 83, type: 'optional', alternative: { id: 'CSD41', name: 'CSD41' } },
            { id: 'ELTE11', name: 'TV Digital', dependencies: ['ELP66'], period: 9, cht: 60, x: 94.5, y: 83, type: 'optional' },
            { id: 'ELX91', name: 'Oficina de Integração', dependencies: ['ELP66'], period: 9, cht: 45, x: 10, y: 90, type: 'optional', alternative: { id: 'EEX23', name: 'EEX23' } },
            { id: 'ELX92', name: 'Prática de Engenharia', dependencies: ['Periodo:6'], period: 9, cht: 30, x: 22, y: 90, type: 'optional' },
            { id: 'ELTE6', name: 'Energia Fotovoltaica', dependencies: [], period: 9, cht: 60, x: 34, y: 90, type: 'optional' },
            { id: 'ELTE13', name: 'Veículos Elétricos', dependencies: [], period: 9, cht: 60, x: 46, y: 90, type: 'optional' }
        ];

export { TOTAL_COMPLEMENTARY_HOURS, TOTAL_EXTENSION_HOURS, TOTAL_HUMANITIES_HOURS, TOTAL_OPTIONAL_HOURS, NODE_WIDTH, NODE_HEIGHT, SPECIALIZATION_TRACKS, OPTIONAL_GROUPS_CONFIG, allNodesData, allHumanitiesData, allOptionalNodesData };
