const TOTAL_HUMANITIES_HOURS = 210;

const TOTAL_OPTIONAL_HOURS = 300;

const NODE_WIDTH = 130;

const NODE_HEIGHT = 90;

const SPECIALIZATION_TRACKS_M2 = {
                'Telecomunicações': [
                    'ELTB1', 'ELTB2', 'ELTB3', 'ELTB4', 'ELTB5', 'ELTB6'
                ],
                'Engenharia Biomédica': [
                    'ELTA1', 'ELTA2', 'ELTA3', 'ELTA4', 'ELTA5'
                ],
                'Pesquisa Científica': [
                    'ELTC1', 'ELTC2', 'ELTC3', 'ELTC4', 'ELTC5'
                ],
                'Processamento de Sinais': [
                    'ELTD1', 'ELTD2', 'ELTD3', 'ELTD4', 'ELTD5'
                ]
            };

const OPTIONAL_GROUPS_CONFIG = {
                // --- Grupos de Matérias Obrigatórias ---
                '[1005]': { requiredHours: 90, name: 'Computação' },
                '[1006]': { requiredHours: 165, name: 'Circuitos Elétricos' },
                '[1007]': { requiredHours: 105, name: 'Eletromagnetismo' },
                '[1009]': { requiredHours: 120, name: 'Instrumentação' },
                '[1010]': { requiredHours: 255, name: 'Física' },
                '[1011]': { requiredHours: 105, name: 'Mecânica Dos Sólidos' },
                '[1012]': { requiredHours: 405, name: 'Matemática' },
                '[1014]': { requiredHours: 30, name: 'Ciências Do Ambiente' },
                '[1015]': { requiredHours: 120, name: 'Administração E Economia' },
                '[1017]': { requiredHours: 240, name: 'Controle E Automação' },
                '[1018]': { requiredHours: 315, name: 'Eletrônica Digital' },
                '[1020]': { requiredHours: 135, name: 'Prática De Engenharia' },
                '[1021]': { requiredHours: 75, name: 'Opção De Idioma: Circuitos Digitais' },
                '[1022]': { requiredHours: 60, name: 'Opção De Idioma: Microcontroladores' },
                '[1023]': { requiredHours: 60, name: 'Opção De Idioma: Arq E Org De Computador' },
                '[1024]': { requiredHours: 60, name: 'Opção De Idioma: Sistemas Operacionais' },
                '[1025]': { requiredHours: 60, name: 'Opção De Idioma: Sistemas Embarcados' },
                '[1026]': { requiredHours: 60, name: 'Opção De Idioma: Pds' },
                '[1027]': { requiredHours: 60, name: 'Opção De Idioma: Modelagem E Simulação' },
                '[1028]': { requiredHours: 60, name: 'Opção De Idioma: Controle 1' },
                '[1029]': { requiredHours: 60, name: 'Opção De Idioma: Controle 2' },
                '[1030]': { requiredHours: 60, name: 'Opção De Idioma: Automação' },
                '[1031]': { requiredHours: 75, name: 'Opção De Idioma: Eletrônica De Potência' },
                '[1032]': { requiredHours: 60, name: 'Opção De Idioma: Princ De Comunicações' },
                '[1033]': { requiredHours: 75, name: 'Opção De Idioma: Comunicações Digitals' },
                '[1040]': { requiredHours: 240, name: 'Disciplinas Clássicas Eletron Analógica' },
                '[1041]': { requiredHours: 90, name: 'Disciplinas De Matemática Aplicada' },

                // --- Grupos de Matérias de Humanidades ---
                '[1013]': { requiredHours: 210, name: 'Ciclo De Humanidades' },
                '[1042]': { requiredHours: 210, name: 'Ciências Sociais E Aplicadas' },
                '[1043]': { requiredHours: 210, name: 'Ciências Humanas' },
                '[1044]': { requiredHours: 210, name: 'Linguística, Letras E Artes' },
                '[1045]': { requiredHours: 210, name: 'Saúde' },
                '[1046]': { requiredHours: 210, name: 'Disciplinas Convalidadas De Humanas' },

                // --- Grupos de Trilhas ---
                '[1034]': { requiredHours: 360, name: 'Trilhas De Aprofundamento' },
                '[1035]': { requiredHours: 360, name: 'Telecomunicações' },
                '[1036]': { requiredHours: 270, name: 'Engenharia Biomédica' },
                '[1037]': { requiredHours: 315, name: 'Pesquisa Científica' },
                '[1038]': { requiredHours: 240, name: 'Proc De Sinais, Imagens E Padrões' },
                '[1039]': { requiredHours: 360, name: 'Trilha Eletiva' },
                '[1047]': { requiredHours: 330, name: 'Optativas' },
                '[1111]': { requiredHours: 285, name: 'Computação' }
            };

const allNodesData = [
                // Período 1
                { id: 'ELB11', name: 'ALGORITMOS DE PROGRAMAÇÃO', dependencies: [], period: 1, chs: 3, cht: 45, x: 5.5, y: 2, type: 'subject', alternative: { id: 'ELN738 / EL71E', name: 'ELN738, EL71E' } },
                { id: 'ELB13', name: 'DESENHO TÉCNICO', dependencies: [], period: 1, chs: 2, cht: 30, x: 20, y: 2, type: 'subject', alternative: { id: 'EEF11 / ELEF10', name: 'EEF11, ELEF10' } },
                { id: 'ELE11', name: 'ELETRICIDADE E ELETRÔNICA NA PRÁTICA', dependencies: [], period: 1, chs: 4, cht: 60, x: 35, y: 2, type: 'subject', alternative: { id: 'EEX11 / ELEX10', name: 'EEX11, ELEX10' } },
                { id: 'ELE12', name: 'INTRODUÇÃO À ENGENHARIA ELETRÔNICA', dependencies: [], period: 1, chs: 3, cht: 45, x: 50, y: 2, type: 'subject' },
                { id: 'ELE13', name: 'REDES', dependencies: [], period: 1, chs: 3, cht: 45, x: 65, y: 2, type: 'subject' },
                { id: 'ELM01', name: 'PRÉ-CÁLCULO', dependencies: [], period: 1, chs: 4, cht: 60, x: 80, y: 2, type: 'subject', alternative: { id: 'MAT7PC / MA70K', name: 'MAT7PC, MA70K' } },
                { id: 'QB70I', name: 'QUÍMICA', dependencies: [], period: 1, chs: 6, cht: 90, x: 94.5, y: 2, type: 'subject', alternative: { id: 'QBI7QE / QBI7QT / QB70D', name: 'QBI7QE, QBI7QT, QB70D' } },

                // Período 2
                { id: 'ELB21', name: 'PROGRAMAÇÃO DE COMPUTADOR', dependencies: ['ELB11'], period: 2, chs: 4, cht: 60, x: 5.5, y: 13, type: 'subject', groupId: '[1005]', alternative: { id: 'ELN748 / EL72E', name: 'ELN748, EL72E' } },
                { id: 'ELP33', name: 'ESTRUTURA DE DADOS E ALGORITMOS', dependencies: ['ELB21'], period: 2, chs: 2, cht: 30, x: 18.21, y: 13, type: 'subject', groupId: '[1005]', alternative: { id: 'CSF20 / ELP35 / ICSF20', name: 'CSF20, ELP35, ICSF20' } },
                { id: 'MA71Y', name: 'GEOMETRIA ANALÍTICA E ALGEBRA LINEAR', dependencies: ['ELM01'], period: 2, chs: 6, cht: 90, x: 30.93, y: 13, type: 'subject', groupId: '[1012]', alternative: { id: 'MATZAL / MAT7GA / MA718', name: 'MATZAL, MAT7GA, MA718' } },
                { id: 'MA71Z', name: 'CALCULO DIFERENCIAL E INTEGRAL 1', dependencies: ['ELM01'], period: 2, chs: 6, cht: 90, x: 43.64, y: 13, type: 'subject', groupId: '[1012]', alternative: { id: 'MAT7C1 / MA71A / MA71H', name: 'MAT7C1, MA71A, MA71H' } },
                { id: 'ELP21', name: 'CIRCUITOS ELÉTRICOS 1', dependencies: ['ELE11', 'ELE12', 'MA71Z'], period: 2, chs: 5, cht: 75, x: 56.36, y: 13, type: 'subject', groupId: '[1006]', alternative: { id: 'ELEB20 / ELP31T / EL72F', name: 'ELEB20, ELP31T, EL72F' } },
                { id: 'MA72H', name: 'CÁLCULO DIFERENCIAL E INTEGRAL 2', dependencies: ['MA71Z'], period: 2, chs: 4, cht: 60, x: 69.07, y: 13, type: 'subject', groupId: '[1012]', alternative: { id: 'MAT7C2 / MA72A', name: 'MAT7C2, MA72A' } },
                { id: 'MA73H', name: 'CÁLCULO DIFERENCIAL E INTEGRAL 3', dependencies: ['MA72H'], period: 2, chs: 4, cht: 60, x: 81.79, y: 13, type: 'subject', groupId: '[1012]', alternative: { id: 'MAT7C3 / MA73A', name: 'MAT7C3, MA73A' } },
                { id: 'QB70J', name: 'CIÊNCIAS DO AMBIENTE', dependencies: [], period: 2, chs: 2, cht: 30, x: 94.5, y: 13, type: 'subject', groupId: '[1014]', alternative: { id: 'QB17CA / QB70E', name: 'QB17CA, QB70E' } },
                { id: 'ELB23', name: 'DESENHO TÉCNICO APLICADO', dependencies: ['ELB13'], period: 2, chs: 2, cht: 30, x: 12, y: 18, type: 'subject', alternative: { id: 'EEF21 / ELEF20 / EL74H', name: 'EEF21, ELEF20, EL74H' } },
                { id: 'ELB31', name: 'PROBABILIDADE E ESTATÍSTICA APLICADAS', dependencies: ['MA71Z'], period: 2, chs: 3, cht: 45, x: 24, y: 18, type: 'subject', groupId: '[1012]', alternative: { id: 'MA70H', name: 'MA70H' } },
                { id: 'MA70Z', name: 'EQUAÇÕES DIFERENCIAIS ORDINARIAS', dependencies: ['MA72H'], period: 2, chs: 4, cht: 60, x: 36, y: 18, type: 'subject', groupId: '[1012]', alternative: { id: 'MATZED / MA70G', name: 'MATZED, MA70G' } },
                { id: 'QB70K', name: 'ECOLOGIA', dependencies: [], period: 2, chs: 2, cht: 30, x: 48, y: 18, type: 'subject', groupId: '[1014]', alternative: { id: 'QB741 / QB77U', name: 'QB741, QB77U' } },
                { id: 'QB70L', name: 'EDUCAÇÃO AMBIENTAL', dependencies: [], period: 2, chs: 2, cht: 30, x: 60, y: 18, type: 'subject', groupId: '[1014]', alternative: { id: 'QB7AH', name: 'QB7AH' } },
                { id: 'QB70M', name: 'ENERGIA E MEIO AMBIENTE', dependencies: [], period: 2, chs: 2, cht: 30, x: 72, y: 18, type: 'subject', groupId: '[1014]', alternative: { id: 'QB7AI', name: 'QB7AI' } },
                { id: 'QB70N', name: 'DESENVOLVIMENTO SUSTENTAVEL', dependencies: [], period: 2, chs: 2, cht: 30, x: 84, y: 18, type: 'subject', groupId: '[1014]', alternative: { id: 'QB70F', name: 'QB70F' } },

                // Período 3
                { id: 'FI71Z', name: 'FÍSICA TEÓRICA 1', dependencies: ['MA71Z'], period: 3, chs: 4, cht: 60, x: 5.5, y: 23, type: 'subject', groupId: '[1010]', alternative: { id: 'F1712 / FI71M', name: 'F1712, FI71M' } },
                { id: 'FI71Y', name: 'FISICA EXPERIMENTAL 1', dependencies: ['FI71Z'], period: 3, chs: 2, cht: 30, x: 20, y: 23, type: 'subject', groupId: '[1010]', alternative: { id: 'FIS7E1 / F171N', name: 'FIS7E1, F171N' } },
                { id: 'ELB52', name: 'ELETROMAGNETISMO 1', dependencies: ['MA71Z'], period: 3, chs: 4, cht: 60, x: 35, y: 23, type: 'subject', groupId: '[1010]', alternative: { id: 'ET74E', name: 'ET74E' } },
                { id: 'ELP34', name: 'MEDIDAS ELÉTRICAS', dependencies: ['ELE11'], period: 3, chs: 4, cht: 60, x: 50, y: 23, type: 'subject', groupId: '[1009]', alternative: { id: 'ELT75F / ET75F', name: 'ELT75F, ET75F' } },
                { id: 'FI72Z', name: 'FÍSICA TEÓRICA 2', dependencies: ['FI71Z'], period: 3, chs: 4, cht: 60, x: 65, y: 23, type: 'subject', groupId: '[1010]', alternative: { id: 'FIS7F2 / FI72M', name: 'FIS7F2, FI72M' } },
                { id: 'ELE41', name: 'OFICINA DE INTEGRAÇÃO: ELETRICIDADE, ELETRONICA E COMPUTAÇÃO NA PRATICA', dependencies: ['ELB21', 'ELE11'], period: 3, chs: 3, cht: 45, x: 80, y: 23, type: 'subject', groupId: '[1020]', alternative: { id: 'EEX21 / ELEX20', name: 'EEX21, ELEX20' } },
                { id: 'ELP63', name: 'INSTRUMENTAÇÃO INDUSTRIAL', dependencies: [], period: 3, chs: 4, cht: 60, x: 94.5, y: 23, type: 'subject', groupId: '[1009]', alternative: { id: 'ELN75C / EL75G', name: 'ELN75C, EL75G' } },
                { id: 'ELB53', name: 'FENÔMENOS DE TRANSPORTE', dependencies: ['FI72Z'], period: 3, chs: 3, cht: 45, x: 42, y: 28, type: 'subject', groupId: '[1010]', alternative: { id: 'ELT74A / F170D / ME74D', name: 'ELT74A, F170D, ME74D' } },
                { id: 'ELE64', name: 'OFICINA DE INTEGRAÇÃO 2', dependencies: ['ELE41'], period: 3, chs: 3, cht: 45, x: 57, y: 28, type: 'subject', groupId: '[1020]', alternative: { id: 'EEX22 / ELEX21', name: 'EEX22, ELEX21' } },

                // Período 4
                { id: 'ELP41', name: 'ELETRÔNICA ANALOGICA 1', dependencies: ['ELP21'], period: 4, chs: 4, cht: 60, x: 5.5, y: 34, type: 'subject', groupId: '[1040]', alternative: { id: 'ET74C', name: 'ET74C' } },
                { id: 'ELP51', name: 'ELETRONICA ANALÓGICA 2', dependencies: ['ELP41'], period: 4, chs: 4, cht: 60, x: 27.75, y: 34, type: 'subject', groupId: '[1040]', alternative: { id: 'EEE31 / ELEE30', name: 'EEE31, ELEE30' } },
                { id: 'ELP61', name: 'ELETRONICA ANALOGICA 3', dependencies: ['ELP51'], period: 4, chs: 4, cht: 60, x: 50, y: 34, type: 'subject', groupId: '[1040]', alternative: { id: 'EEE32 / ELEE31', name: 'EEE32, ELEE31' } },
                { id: 'ELP71', name: 'ELETRÔNICA ANALOGICA 4', dependencies: ['ELP61'], period: 4, chs: 4, cht: 60, x: 72.25, y: 34, type: 'subject', groupId: '[1040]' },
                { id: 'ELP32', name: 'CIRCUITOS ELETRICOS 2', dependencies: ['ELP21'], period: 2, chs: 6, cht: 90, x: 94.5, y: 34, type: 'subject', groupId: '[1006]', alternative: { id: 'ELEB21 / ELP42P / ELP42T / ET73F', name: 'ELEB21, ELP42P, ELP42T, ET73F' } },

                // Período 5
                { id: 'ELB51', name: 'MECÂNICA GERAL', dependencies: ['FI71Z'], period: 5, chs: 4, cht: 60, x: 5.5, y: 45, type: 'subject', groupId: '[1011]', alternative: { id: 'F170A', name: 'F170A' } },
                { id: 'ELB61', name: 'PRINCÍPIOS DE RESISTÊNCIA DOS MATERIAIS', dependencies: ['ELB51'], period: 5, chs: 3, cht: 45, x: 23.3, y: 45, type: 'subject', groupId: '[1011]', alternative: { id: 'MEC72B', name: 'MEC72B' } },
                { id: 'ELB66', name: 'SINAIS E SISTEMAS', dependencies: ['MA73H'], period: 5, chs: 6, cht: 90, x: 41.1, y: 45, type: 'subject', groupId: '[1041]', alternative: { id: 'ELEQ30 / ET7GF / ET75H', name: 'ELEQ30, ET7GF, ET75H' } },
                { id: 'ELF41', name: 'CIRCUITOS DIGITAIS', dependencies: ['ELP41'], period: 5, chs: 5, cht: 75, x: 58.9, y: 45, type: 'subject', alternative: { id: 'EEB31 / ELEB30', name: 'EEB31, ELEB30' }, groupId: '[1021]' },
                { id: 'ELF51', name: 'PROCESSAMENTO DIGITAL DE SINAIS', dependencies: ['ELB66'], period: 5, chs: 4, cht: 60, x: 76.7, y: 45, type: 'subject', alternative: { id: 'EEQ32 / ELEQ31', name: 'EEQ32, ELEQ31' }, groupId: '[1026]' },
                { id: 'ELP64', name: 'ELETROMAGNETISMO 2: LINHAS E ANTENAS', dependencies: ['ELB52'], period: 5, chs: 4, cht: 60, x: 94.5, y: 45, type: 'subject', groupId: '[1007]' },
                { id: 'ELP62', name: 'MÁQUINAS ELÉTRICAS', dependencies: ['ELB52'], period: 5, chs: 3, cht: 45, x: 50, y: 50, type: 'subject', groupId: '[1007]', alternative: { id: 'ELP65 / ELT7FL / EL76H / ET75E / ET75G', name: 'ELP65, ELT7FL, EL76H, ET75E, ET75G' } },

                // Período 6
                { id: 'ELF52', name: 'SISTEMAS MICROCONTROLADOS', dependencies: ['ELB21', 'ELF41'], period: 6, chs: 4, cht: 60, x: 50, y: 55, type: 'subject', alternative: { id: 'CSW40 / ELEW31', name: 'CSW40, ELEW31' }, groupId: '[1022]' },

                // Período 7
                { id: 'ELF61', name: 'ARQUITETURA E ORGANIZAÇÃO DE COMPUTADORES', dependencies: ['ELF52'], period: 7, chs: 4, cht: 60, x: 5.5, y: 66, type: 'subject', alternative: { id: 'CSW30 / ELEW30', name: 'CSW30, ELEW30' }, groupId: '[1023]' },
                { id: 'ELF62', name: 'CONTROLE 1', dependencies: ['ELB66'], period: 7, chs: 4, cht: 60, x: 20, y: 66, type: 'subject', alternative: { id: 'EEC21 / ELEC20 / EL76A', name: 'EEC21, ELEC20, EL76A' }, groupId: '[1028]' },
                { id: 'ELF66', name: 'SISTEMAS OPERACIONAIS', dependencies: ['ELF52'], period: 7, chs: 4, cht: 60, x: 35, y: 66, type: 'subject', alternative: { id: 'ICS030', name: 'ICS030' }, groupId: '[1024]' },
                { id: 'ELF75', name: 'MODELAGEM E SIMULAÇÃO', dependencies: ['ELF62'], period: 7, chs: 4, cht: 60, x: 50, y: 66, type: 'subject', alternative: { id: 'ELT7EF / ET7GD', name: 'ELT7EF, ET7GD' }, groupId: '[1027]' },
                { id: 'ELP66', name: 'PLANEJAMENTO E PROJETO DE CARREIRA DO ENGENHEIRO ELETRÔNICO', dependencies: ['Periodo:6'], period: 7, chs: 2, cht: 30, x: 65, y: 66, type: 'subject' },
                { id: 'ELS01', name: 'ESTAGIO CURRICULAR OBRIGATÓRIO', dependencies: [], period: 7, chs: 0, cht: 400, x: 80, y: 66, type: 'subject' },
                { id: 'ELE91', name: 'TRABALHO DE CONCLUSÃO DE CURSO 1', dependencies: ['Periodo:7'], period: 3, cht: 45, x: 94.5, y: 66, type: 'subject', groupId: '[1020]' },
                { id: 'ELTE13', name: 'VEÍCULOS ELÉTRICOS', dependencies: ['ELP61'], period: 7, chs: 4, cht: 60, x: 50, y: 71, type: 'subject', groupId: '[1027]' },

                // Período 8
                { id: 'ELF72', name: 'CONTROLE 2', dependencies: ['ELF62'], period: 8, chs: 4, cht: 60, x: 5.5, y: 77, type: 'subject', alternative: { id: 'EL77A / ET77H', name: 'EL77A, ET77H' }, groupId: '[1029]' },
                { id: 'ELF74', name: 'SISTEMAS EMBARCADOS', dependencies: ['ELF61', 'ELF66'], period: 8, chs: 4, cht: 60, x: 35.17, y: 77, type: 'subject', alternative: { id: 'CSW41 / ELEW32', name: 'CSW41, ELEW32' }, groupId: '[1025]' },
                { id: 'ELF84', name: 'ELETRÔNICA DE POTÊNCIA', dependencies: ['ELP61'], period: 8, chs: 5, cht: 75, x: 64.83, y: 77, type: 'subject', alternative: { id: 'EL76G / ET76C', name: 'EL76G, ET76C' }, groupId: '[1031]' },
                { id: 'ELP73', name: 'PRINCIPIOS DE COMUNICAÇÕES', dependencies: ['ELB66', 'ELP71'], period: 8, chs: 4, cht: 60, x: 94.5, y: 77, type: 'subject', alternative: { id: 'ELW71', name: 'COMMUNICATION SYSTEMS' }, groupId: '[1032]' },

                // Período 9
                { id: 'ELB91', name: 'ECONOMIA APLICADA A ENGENHARIA', dependencies: [], period: 9, chs: 4, cht: 60, x: 5.5, y: 87, type: 'subject', groupId: '[1015]', alternative: { id: 'GE70D', name: 'GE70D' } },
                { id: 'ELB92', name: 'INTRODUÇÃO A ADMINISTRAÇÃO E GERENCIAMENTO DE PROJETOS', dependencies: [], period: 9, chs: 4, cht: 60, x: 23.3, y: 87, type: 'subject', groupId: '[1015]', alternative: { id: 'GEE7G6', name: 'GEE7G6' } },
                { id: 'ELB93', name: 'ENGENHARIA DE PRODUTO', dependencies: [], period: 9, chs: 4, cht: 60, x: 41.1, y: 87, type: 'subject', groupId: '[1015]' },
                { id: 'ELF73', name: 'COMUNICAÇÕES DIGITAIS', dependencies: ['ELP73'], period: 9, chs: 5, cht: 75, x: 58.9, y: 87, type: 'subject', alternative: { id: 'ELW73', name: 'DIGITAL COMMUNICATIONS' }, groupId: '[1033]' },
                { id: 'ELF81', name: 'CONTROLE A EVENTOS DISCRETOS', dependencies: ['ELF62'], period: 9, chs: 4, cht: 60, x: 76.7, y: 87, type: 'subject', alternative: { id: 'EEC46 / EL76B', name: 'EEC46, EL76B' }, groupId: '[1030]' },
                { id: 'ELO91', name: 'ETICA, PROFISSÃO E CIDADANIA', dependencies: [], period: 9, chs: 2, cht: 30, x: 94.5, y: 87, type: 'subject' },
                { id: 'GEE7A1', name: 'FUNDAMENTOS DE ADMINISTRAÇÃO', dependencies: [], period: 9, chs: 3, cht: 45, x: 6, y: 92, type: 'subject', groupId: '[1015]' },
                { id: 'GEE7E3', name: 'FUNDAMENTOS DE ECONOMIA', dependencies: [], period: 9, chs: 2, cht: 30, x: 18, y: 92, type: 'subject', groupId: '[1015]' },
                { id: 'GEE7E5', name: 'FUND. DE ENG. ECONÔMICA E ANÁLISE DE VIABILIDADE', dependencies: [], period: 9, chs: 4, cht: 60, x: 31, y: 92, type: 'subject', groupId: '[1015]' },
                { id: 'GEE7F1', name: 'FUNDAMENTOS DE FINANÇAS', dependencies: [], period: 9, chs: 4, cht: 60, x: 44, y: 92, type: 'subject', groupId: '[1015]', alternative: { id: 'GEE7F2', name: 'GEE7F2' } },
                { id: 'GEE7G1', name: 'FUNDAMENTOS DE GESTÃO DE PESSOAS', dependencies: [], period: 9, chs: 2, cht: 45, x: 57, y: 92, type: 'subject', groupId: '[1015]' },
                { id: 'GEE7G3', name: 'FUNDAMENTOS DE GESTÃO DA PRODUÇÃO', dependencies: [], period: 9, chs: 3, cht: 45, x: 70, y: 92, type: 'subject', groupId: '[1015]' },
                { id: 'GEE7G5', name: 'FUNDAMENTOS DE GESTÃO DE PROJETO', dependencies: [], period: 9, chs: 3, cht: 45, x: 83, y: 92, type: 'subject', groupId: '[1015]' },
                { id: 'GEE7M1', name: 'FUNDAMENTOS DE MARKETING', dependencies: [], period: 9, chs: 3, cht: 45, x: 94, y: 92, type: 'subject', groupId: '[1015]' },

                // Período 10
                { id: 'ELE92', name: 'TRABALHO DE CONCLUSÃO DE CURSO 2', dependencies: ['ELE91'], period: 10, chs: 0, cht: 15, x: 41.1, y: 98, type: 'subject' },
                { id: 'ELO92', name: 'EMPREENDEDORISMO', dependencies: [], period: 10, chs: 2, cht: 30, x: 58.9, y: 98, type: 'subject', alternative: { id: 'ELBAA / GEE7E1 / GE70T / ME781', name: 'ELBAA, GEE7E1, GE70T, ME781' } }
            ];

const allHumanitiesData = [
                // --- INÍCIO DO CÓDIGO PARA allHumanitiesData ---
                // Grupo [1044] - Linguística, Letras e Artes
                { id: 'CAART02', name: 'PRÁTICA MUSICAL E INTERAÇÕES HUMANAS: APRENDIZADO COLETIVO DE VIOLINO 1', dependencies: [], period: 2, cht: 60, type: 'humanities', x: 5.5, y: 2 },
                { id: 'CAART03', name: 'PRÁTICA MUSICAL E INTERAÇÕES HUMANAS: APRENDIZADO COLETIVO DE VIOLINO 2', dependencies: [], period: 2, cht: 60, type: 'humanities', x: 35.17, y: 2 },
                { id: 'CAART04', name: 'PRÁTICA ARTÍSTICA MUSICAL: GRUPOS INSTRUMENTAIS 1', dependencies: [], period: 2, cht: 90, type: 'humanities', x: 64.83, y: 2 },
                { id: 'CAART05', name: 'PRÁTICA ARTÍSTICA MUSICAL: GRUPOS INSTRUMENTAIS 2', dependencies: [], period: 2, cht: 90, type: 'humanities', x: 94.5, y: 2 },
                { id: 'CAART06', name: 'PRÁTICA ARTÍSTICA MUSICAL: GRUPOS INSTRUMENTAIS 3', dependencies: [], period: 2, cht: 90, type: 'humanities', x: 5.5, y: 10.73 },
                { id: 'CAART07', name: 'PRÁTICA ARTÍSTICA MUSICAL: GRUPOS INSTRUMENTAIS 4', dependencies: [], period: 2, cht: 90, type: 'humanities', x: 35.17, y: 10.73 },
                { id: 'CL70B', name: 'FRANCES PARA FINS ACADÊMICOS', dependencies: [], period: 2, cht: 120, type: 'humanities', x: 64.83, y: 10.73 },
                { id: 'CL70C', name: 'FRANCES PARA FINS ACADÊMICOS 2', dependencies: ['CL70B'], period: 2, cht: 60, type: 'humanities', x: 94.5, y: 10.73 },
                { id: 'ED70V', name: 'LIBRAS A', dependencies: [], period: 2, cht: 30, type: 'humanities', x: 5.5, y: 19.45 },
                { id: 'ELH02', name: 'PRATICA DE GRUPO E INTERAÇÕES HUMANAS COM A MÚSICA', dependencies: [], period: 2, cht: 30, type: 'humanities', x: 35.17, y: 19.45 },
                { id: 'ELH11', name: 'ESPANHOL PARA ENGENHARIAS I', dependencies: [], period: 2, cht: 45, type: 'humanities', x: 64.83, y: 19.45 },
                { id: 'ELH12', name: 'ESPANHOL PARA ENGENHARIAS II', dependencies: ['ELH11'], period: 2, cht: 45, type: 'humanities', x: 94.5, y: 19.45 },
                { id: 'ED70U', name: 'LIBRAS B', dependencies: [], period: 2, cht: 30, type: 'humanities', x: 20, y: 19.45 },
                { id: 'ELH13', name: 'PRÁTICA DE ESCRITA PARA ENGENHARIAS', dependencies: [], period: 2, cht: 60, type: 'humanities', x: 5.5, y: 28.18 },
                { id: 'EL84H', name: 'TECNICAS DE PESQUISA ACADÊMICA', dependencies: [], period: 2, cht: 35, type: 'humanities', x: 35.17, y: 28.18 },
                { id: 'LEM701', name: 'FRANCÊS PARA FINS ACADÉMICOS DD 1', dependencies: [], period: 2, cht: 60, type: 'humanities', x: 64.83, y: 28.18 },
                { id: 'LEM702', name: 'FRANCES PARA FINS ACADÊMICOS DD 2', dependencies: [], period: 2, cht: 60, type: 'humanities', x: 94.5, y: 28.18 },
                { id: 'LEM703', name: 'FRANCES PARA FINS ACADÊMICOS DD 3', dependencies: [], period: 2, cht: 60, type: 'humanities', x: 5.5, y: 36.91 },

                // Grupo [1042] - Ciências Sociais e Aplicadas
                { id: 'ELH03', name: 'DESIGN THINKING PARA DESENVOLVIMENTO DE NOVOS PRODUTOS', dependencies: ['Periodo:5'], period: 2, cht: 90, type: 'humanities', x: 35.17, y: 36.91 },
                { id: 'ELH04', name: 'INOVAÇÃO TECNOLÓGICA E FINANCIAMENTO', dependencies: ['Periodo:5'], period: 2, cht: 60, type: 'humanities', x: 64.83, y: 36.91 },
                { id: 'ELH05', name: 'NOÇÕES JURÍDICAS PARA EMPREENDEDORES', dependencies: ['Periodo:5'], period: 2, cht: 60, type: 'humanities', x: 94.5, y: 36.91 },
                { id: 'ELH06', name: 'METODOLOGIAS ATIVAS PARA A EDUCAÇÃO EM ENGENHARIA', dependencies: ['Periodo:5'], period: 2, cht: 30, type: 'humanities', x: 5.5, y: 45.64 },
                { id: 'GE70Z', name: 'INTRODUÇÃO A ADMINISTRAÇÃO', dependencies: [], period: 2, cht: 30, type: 'humanities', x: 35.17, y: 45.64 },
                { id: 'GE71Z', name: 'VIABILIDADE ECONOMICA DE PROJETOS', dependencies: [], period: 2, cht: 30, type: 'humanities', x: 64.83, y: 45.64 },

                // Grupo [1043] - Ciências Humanas
                { id: 'ES7AB', name: 'TÓPICOS EM CIÊNCIAS HUMANAS 2', dependencies: [], period: 2, cht: 45, type: 'humanities', x: 94.5, y: 45.64 },
                { id: 'ES7AH', name: 'TÓPICOS EM CIÊNCIAS HUMANAS 8', dependencies: [], period: 2, cht: 30, type: 'humanities', x: 5.5, y: 54.36 },
                { id: 'ESZAI', name: 'TÓPICOS EM CIÊNCIAS HUMANAS 9', dependencies: [], period: 2, cht: 45, type: 'humanities', x: 35.17, y: 54.36 },
                { id: 'ES7AJ', name: 'TÓPICOS EM CIÊNCIAS HUMANAS 10', dependencies: [], period: 2, cht: 45, type: 'humanities', x: 64.83, y: 54.36 },
                { id: 'ES7AK', name: 'TÓPICOS EM CIÊNCIAS HUMANAS 11', dependencies: [], period: 2, cht: 30, type: 'humanities', x: 94.5, y: 54.36 },
                { id: 'ES72A', name: 'RELAÇÕES HUMANAS E LIDERANÇA', dependencies: [], period: 2, cht: 30, type: 'humanities', x: 5.5, y: 63.09 },
                { id: 'ES72B', name: 'TECNOLOGIA E SOCIEDADE', dependencies: [], period: 2, cht: 30, type: 'humanities', x: 35.17, y: 63.09 },
                { id: 'ES72C', name: 'PSICOLOGIA APLICADA AO TRABALHO', dependencies: [], period: 2, cht: 30, type: 'humanities', x: 64.83, y: 63.09 },
                { id: 'ES72D', name: 'SOCIEDADE POLÍTICA NO BRASIL', dependencies: [], period: 2, cht: 30, type: 'humanities', x: 94.5, y: 63.09 },
                { id: 'ES72E', name: 'A PRESENCA AFRICANA NO BRASIL', dependencies: [], period: 2, cht: 30, type: 'humanities', x: 5.5, y: 71.82 },
                { id: 'ES72F', name: 'FILOSOFIA DA CIENCIA E DA TECNOLOGIA', dependencies: [], period: 2, cht: 30, type: 'humanities', x: 35.17, y: 71.82 },
                { id: 'ES72G', name: 'HISTORIA DA TÉCNICA E DA TECNOLOGIA', dependencies: [], period: 2, cht: 30, type: 'humanities', x: 64.83, y: 71.82 },
                { id: 'FCH7FC', name: 'TEORIA DAS CIÊNCIAS HUMANAS', dependencies: [], period: 2, cht: 45, type: 'humanities', x: 94.5, y: 71.82 },
                { id: 'FCH7GA', name: 'METROPOLIZAÇÃO CONTEMPORANEA', dependencies: [], period: 2, cht: 45, type: 'humanities', x: 5.5, y: 80.55 },
                { id: 'FCH7HB', name: 'HISTORIA GERAL DA ECONOMIA', dependencies: [], period: 2, cht: 45, type: 'humanities', x: 35.17, y: 80.55 },
                { id: 'FCH7HC', name: 'CAPITALISMO CONTEMPORANEO E ECONOMIA POLITICA', dependencies: [], period: 2, cht: 45, type: 'humanities', x: 64.83, y: 80.55 },
                { id: 'FCH7SC', name: 'TECNOLOGIA, TRABALHO E SAÚDE', dependencies: [], period: 2, cht: 45, type: 'humanities', x: 94.5, y: 80.55 },
                { id: 'FCH7XF', name: 'DIMENSÃO AMBIENTAL NA GESTÃO URBANA', dependencies: [], period: 2, cht: 45, type: 'humanities', x: 5.5, y: 89.27 },
                { id: 'FCH7XG', name: 'TECNOPOLÍTICAS DA SOCIEDADE CONTEMPORANEA', dependencies: [], period: 2, cht: 45, type: 'humanities', x: 35.17, y: 89.27 },

                // Grupo [1045] - Saúde
                { id: 'ELH01', name: 'FUNDAMENTOS DE PRIMEIROS SOCORROS', dependencies: [], period: 2, cht: 30, type: 'humanities', x: 64.83, y: 89.27 },

                // Grupo [1046] - Disciplinas Convalidadas de Humanas
                { id: 'ELH07', name: 'HUMANIDADES 1', dependencies: [], period: 2, cht: 30, type: 'humanities', x: 94.5, y: 89.27 },
                { id: 'ELH08', name: 'HUMANIDADES 2', dependencies: [], period: 2, cht: 45, type: 'humanities', x: 5.5, y: 98 },
                { id: 'ELH09', name: 'HUMANIDADES 3', dependencies: [], period: 2, cht: 60, type: 'humanities', x: 35.17, y: 98 },
                { id: 'ELH10', name: 'HUMANIDADES 4', dependencies: [], period: 2, cht: 75, type: 'humanities', x: 64.83, y: 98 },
                // --- FIM DO CÓDIGO PARA allHumanitiesData ---
            ];

const allOptionalNodesData = [
                // --- INÍCIO DO CÓDIGO REAJUSTADO (Y <= 98) ---

                // Trilha: Telecomunicações (y: 8)/
                { id: 'ELTB1', name: 'SISTEMAS DE COMUNICAÇÃO', dependencies: ['ELP66'], period: 8, cht: 60, x: 8, y: 8, type: 'optional', groupId: '[1035]' },
                { id: 'ELTB2', name: 'REDES AVANÇADAS', dependencies: ['ELP66'], period: 8, cht: 60, x: 23.3, y: 8, type: 'optional', groupId: '[1035]' },
                { id: 'ELTB3', name: 'COMUNICAÇÕES SEM FIO', dependencies: ['ELB31', 'ELB66', 'ELF73', 'ELP66'], period: 8, cht: 60, x: 41.1, y: 8, type: 'optional', groupId: '[1035]' },
                { id: 'ELTB4', name: 'COMUNICAÇÕES OPTICAS', dependencies: ['ELP64', 'ELP66'], period: 8, cht: 60, x: 58.9, y: 8, type: 'optional', groupId: '[1035]' },
                { id: 'ELTB5', name: 'ELETROMAGNETISMO APLICADO', dependencies: ['ELB66', 'ELP64', 'ELP71'], period: 8, cht: 60, x: 76.7, y: 8, type: 'optional', groupId: '[1035]' },
                { id: 'ELTB6', name: 'TOPICOS AVANÇADOS EM COMUNICAÇÕES', dependencies: ['ELP66'], period: 8, cht: 60, x: 94.5, y: 8, type: 'optional', groupId: '[1035]' },

                // Trilha: Engenharia Biomédica (y: 20)
                { id: 'ELTA1', name: 'PRINCIPIOS DE ENGENHARIA BIOMÉDICA', dependencies: ['ELP66'], period: 8, cht: 30, x: 8, y: 20, type: 'optional', groupId: '[1036]' },
                { id: 'ELTA2', name: 'BIOENGENHARIA', dependencies: ['ELP66'], period: 8, cht: 60, x: 27.75, y: 20, type: 'optional', groupId: '[1036]' },
                { id: 'ELTA3', name: 'ENGENHARIA MÉDICA', dependencies: ['ELP66'], period: 8, cht: 60, x: 50, y: 20, type: 'optional', groupId: '[1036]' },
                { id: 'ELTA4', name: 'ENGENHARIA CLINICA', dependencies: ['ELP66'], period: 8, cht: 60, x: 72.25, y: 20, type: 'optional', groupId: '[1036]' },
                { id: 'ELTA5', name: 'FISIOLOGIA QUANTITATIVA PARA ENGENHARIA', dependencies: ['ELP66'], period: 8, cht: 60, x: 94.5, y: 20, type: 'optional', groupId: '[1036]' },

                // Trilha: Pesquisa Científica (y: 32)
                { id: 'ELTC1', name: 'METODOLOGIA DA PESQUISA CIENTIFICA E TECNOLÓGICA', dependencies: ['ELP66'], period: 8, cht: 60, x: 8, y: 32, type: 'optional', groupId: '[1037]' },
                { id: 'ELTC2', name: 'AMOSTRAGEM E PLANEJAMENTO DE EXPERIMENTOS', dependencies: ['ELP66'], period: 8, cht: 60, x: 27.75, y: 32, type: 'optional', groupId: '[1037]' },
                { id: 'ELTC3', name: 'ANÁLISE DE SOBREVIVÊNCIA E CONFIABILIDADE', dependencies: ['ELP66'], period: 8, cht: 45, x: 50, y: 32, type: 'optional', groupId: '[1037]' },
                { id: 'ELTC4', name: 'ANÁLISE ESTATISTICA DE DADOS', dependencies: ['ELP66'], period: 8, cht: 60, x: 72.25, y: 32, type: 'optional', groupId: '[1037]' },
                { id: 'ELTC5', name: 'INFERÊNCIA ESTATÍSTICA', dependencies: ['ELP66'], period: 8, cht: 60, x: 94.5, y: 32, type: 'optional', groupId: '[1037]' },

                // Trilha: Processamento de Sinais, Imagens e Padrões (y: 44)
                { id: 'ELTD1', name: 'INTRODUÇÃO A MODELAGEM E APRENDIZADO', dependencies: ['ELB31', 'ELP66', 'MA71Y'], period: 8, cht: 60, x: 8, y: 44, type: 'optional', groupId: '[1038]' },
                { id: 'ELTD2', name: 'PROCESSAMENTO DE IMAGENS', dependencies: ['ELP66'], period: 8, cht: 45, x: 27.75, y: 44, type: 'optional', groupId: '[1038]', alternative: { id: 'CSV30', name: 'CSV30' } },
                { id: 'ELTD3', name: 'PROCESSAMENTO DIGITAL DE SINAIS APLICADO', dependencies: ['ELP66', 'ELTD1', 'ELTD2'], period: 8, cht: 45, x: 50, y: 44, type: 'optional', groupId: '[1038]' },
                { id: 'ELTD4', name: 'RECONHECIMENTO DE PADRÕES E APRENDIZADO DE MÁQUINA', dependencies: ['ELP66', 'ELTD1'], period: 8, cht: 45, x: 72.25, y: 44, type: 'optional', groupId: '[1038]', alternative: { id: 'CSV41 / ICSV41', name: 'CSV41, ICSV41' } },
                { id: 'ELTD5', name: 'VISÃO COMPUTACIONAL', dependencies: ['ELP66'], period: 8, cht: 45, x: 94.5, y: 44, type: 'optional', groupId: '[1038]' },

                // Trilha Eletiva e Optativas (agrupadas a partir de y: 58)
                // Linha 1 de optativas
                { id: 'ELTE01', name: 'ELETIVA', dependencies: [], period: 8, cht: 360, x: 8, y: 58, type: 'optional', groupId: '[1039]' },
                { id: 'CSB30', name: 'INTRODUÇÃO A BANCO DE DADOS', dependencies: [], period: 8, cht: 60, x: 18.2, y: 58, type: 'optional', groupId: '[1047]', alternative: { id: 'ICSB30 / IF65E', name: 'ICSB30, IF65E' } },
                { id: 'CSE20', name: 'TÉCNICAS DE PROGRAMAÇÃO', dependencies: [], period: 8, cht: 60, x: 31, y: 58, type: 'optional', groupId: '[1047]', alternative: { id: 'ICSE20 / IF62C', name: 'ICSE20, IF62C' } },
                { id: 'CSM43', name: 'PROGRAMAÇÃO PARA DISPOSITIVOS MÓVEIS E SEM FIO', dependencies: [], period: 8, cht: 60, x: 43.8, y: 58, type: 'optional', groupId: '[1047]', alternative: { id: 'ICSM46 / IF6AG', name: 'ICSM46, IF6AG' } },
                { id: 'ELSC01', name: 'SMART CHALLENGES', dependencies: [], period: 8, cht: 120, x: 56.6, y: 58, type: 'optional', groupId: '[1047]' },
                { id: 'ELSP01', name: 'SMART PROJECTS', dependencies: ['Periodo:5'], period: 8, cht: 120, x: 69.4, y: 58, type: 'optional', groupId: '[1047]' },
                { id: 'ELTE1', name: 'ENGENHARIA DE SISTEMAS', dependencies: ['ELP66'], period: 8, cht: 45, x: 82.2, y: 58, type: 'optional', groupId: '[1047]', alternative: { id: 'EL75H', name: 'EL75H' } },
                { id: 'ELTE10', name: 'IDENTIFICAÇÃO DE SISTEMAS', dependencies: [], period: 8, cht: 60, x: 94.5, y: 58, type: 'optional', groupId: '[1047]' },

                // Linha 2 de optativas
                { id: 'ELTE2', name: 'PROGRAMAÇÃO MATEMÁTICA', dependencies: ['ELP66'], period: 8, cht: 60, x: 8, y: 68, type: 'optional', groupId: '[1047]', alternative: { id: 'CSD41', name: 'CSD41' } },
                { id: 'ELTE3', name: 'LÓGICA RECONFIGURAVEL', dependencies: ['ELP66'], period: 8, cht: 60, x: 18.2, y: 68, type: 'optional', groupId: '[1047]', alternative: { id: 'CSW42 / ELEW33', name: 'CSW42, ELEW33' } },
                { id: 'ELTE4', name: 'INTRODUÇÃO A ROBOTICA', dependencies: ['ELP66'], period: 8, cht: 60, x: 31, y: 68, type: 'optional', groupId: '[1047]', alternative: { id: 'EL6AE', name: 'EL6AE' } },
                { id: 'ELTE5', name: 'PROJETO DE PLACAS DE CIRCUITOS IMPRESSOS', dependencies: ['ELP66'], period: 8, cht: 60, x: 43.8, y: 68, type: 'optional', groupId: '[1047]' },
                { id: 'ELTE6', name: 'ENERGIA FOTOVOLTAICA', dependencies: [], period: 8, cht: 60, x: 56.6, y: 68, type: 'optional', groupId: '[1047]' },
                { id: 'ELTE7', name: 'FISICA DOS SEMICONDUTORES', dependencies: ['ELB52', 'FI72Z'], period: 8, cht: 60, x: 69.4, y: 68, type: 'optional', groupId: '[1047]' },
                { id: 'ELTE8', name: 'SISTEMAS NÃO LINEARES', dependencies: [], period: 8, cht: 60, x: 82.2, y: 68, type: 'optional', groupId: '[1047]' },
                { id: 'ELTE9', name: 'CONTROLE AUTOMÁTICO', dependencies: [], period: 8, cht: 60, x: 94.5, y: 68, type: 'optional', groupId: '[1047]' },

                // Linha 3 de optativas
                { id: 'ELX91', name: 'OFICINA DE INTEGRAÇÃO: PRATICA DE ENGENHARIA', dependencies: ['ELP66'], period: 8, cht: 45, x: 8, y: 78, type: 'optional', groupId: '[1047]', alternative: { id: 'EEX23', name: 'EEX23' } },
                { id: 'ELX92', name: 'PROSPECÇÃO E ESTUDO DE VIABILIDADE DE PROJETOS', dependencies: ['Periodo:6'], period: 8, cht: 30, x: 18.2, y: 78, type: 'optional', groupId: '[1047]' },
                { id: 'EL77D', name: 'REDES INDUSTRIAIS', dependencies: [], period: 8, cht: 45, x: 31, y: 78, type: 'optional', groupId: '[1047]', alternative: { id: 'ELN7AC / ELT85C / ET77A', name: 'ELN7AC, ELT85C, ET77A' } },
                { id: 'EL77E', name: 'SISTEMAS DE SUPERVISÃO', dependencies: [], period: 8, cht: 45, x: 43.8, y: 78, type: 'optional', groupId: '[1047]', alternative: { id: 'ELNZAD / ELT77J / ELT86C / ET78F', name: 'ELNZAD, ELT77J, ELT86C, ET78F' } },
                { id: 'EL77G', name: 'ACIONAMENTOS INDUSTRIAIS', dependencies: [], period: 8, cht: 45, x: 56.6, y: 78, type: 'optional', groupId: '[1047]', alternative: { id: 'ELT85D', name: 'ELT85D' } },
                { id: 'EL78D', name: 'CONTROLE DE PROCESSOS', dependencies: [], period: 8, cht: 45, x: 69.4, y: 78, type: 'optional', groupId: '[1047]', alternative: { id: 'ELN7AE', name: 'ELN7AE' } },
                { id: 'ICSD20', name: 'INTRODUÇÃO À LÓGICA PARA COMPUTAÇÃO', dependencies: [], period: 8, cht: 45, x: 82.2, y: 78, type: 'optional', groupId: '[1111]' },
                { id: 'ICSD21', name: 'MATEMÁTICA DISCRETA', dependencies: [], period: 8, cht: 45, x: 94.5, y: 78, type: 'optional', groupId: '[1111]' },

                // Linha 4 de optativas
                { id: 'ICSE30', name: 'ENGENHARIA DE SOFTWARE', dependencies: [], period: 8, cht: 60, x: 8, y: 88, type: 'optional', groupId: '[1111]' },
                { id: 'ICSF30', name: 'ESTRUTURAS DE DADOS 2', dependencies: [], period: 8, cht: 45, x: 27.75, y: 88, type: 'optional', groupId: '[1111]' },
                { id: 'ICSG20', name: 'ANÁLISE E PROJETO DE SISTEMAS', dependencies: [], period: 8, cht: 45, x: 50, y: 88, type: 'optional', groupId: '[1111]' },
                { id: 'ICSI30', name: 'SISTEMAS INTELIGENTES', dependencies: [], period: 8, cht: 45, x: 72.25, y: 88, type: 'optional', groupId: '[1111]' },
                { id: 'ICSM47', name: 'DESENVOLVIMENTO DE APLICAÇÕES WEB-FRONT-END', dependencies: [], period: 8, cht: 60, x: 94.5, y: 88, type: 'optional', groupId: '[1111]' },

                // Linha 5 de optativas
                { id: 'ICSM48', name: 'DESENVOLVIMENTO DE APLICAÇÕES WEB-BACK-END', dependencies: [], period: 8, cht: 60, x: 8, y: 98, type: 'optional', groupId: '[1111]' },
                { id: 'ELTE12', name: 'PRINCIPIOS DE COMPILADORES', dependencies: [], period: 8, cht: 60, x: 27.75, y: 98, type: 'optional', groupId: '[1111]' }

                // --- FIM DO CÓDIGO REAJUSTADO ---
            ];

export { TOTAL_HUMANITIES_HOURS, TOTAL_OPTIONAL_HOURS, NODE_WIDTH, NODE_HEIGHT, SPECIALIZATION_TRACKS_M2, OPTIONAL_GROUPS_CONFIG, allNodesData, allHumanitiesData, allOptionalNodesData };
