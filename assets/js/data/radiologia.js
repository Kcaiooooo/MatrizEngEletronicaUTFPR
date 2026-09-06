const TOTAL_HUMANITIES_HOURS = 60;

const TOTAL_OPTIONAL_HOURS = 60;

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
                '[1099]': { requiredHours: 60, name: 'Disciplinas Optativas' }
            };

var allHumanitiesData = [];

var allOptionalNodesData = [
            {
                        "id": "CAART04",
                        "name": "PRÁTICA ARTÍSTICA MUSICAL: GRUPOS INSTRUMENTAIS 1",
                        "period": 2,
                        "x": 10,
                        "y": 10,
                        "cht": 90,
                        "dependencies": [],
                        "type": "optional",
                        "groupId": "[1099]"
            },
            {
                        "id": "FCH7FA",
                        "name": "FILOSOFIA DA CIÊNCIA E DA TECNOLOGIA",
                        "period": 2,
                        "x": 30,
                        "y": 10,
                        "cht": 45,
                        "dependencies": [],
                        "type": "optional",
                        "groupId": "[1099]"
            },
            {
                        "id": "FCH7PB",
                        "name": "RELAÇÕES INTERPESSOAIS, GRUPO E PODER",
                        "period": 2,
                        "x": 50,
                        "y": 10,
                        "cht": 30,
                        "dependencies": [],
                        "type": "optional",
                        "groupId": "[1099]"
            },
            {
                        "id": "FCH7PC",
                        "name": "PLANEJAMENTO DE CARREIRA",
                        "period": 2,
                        "x": 70,
                        "y": 10,
                        "cht": 60,
                        "dependencies": [],
                        "type": "optional",
                        "groupId": "[1099]"
            },
            {
                        "id": "FCH7SC",
                        "name": "TECNOLOGIA, TRABALHO E SAÚDE",
                        "period": 2,
                        "x": 90,
                        "y": 10,
                        "cht": 45,
                        "dependencies": [],
                        "type": "optional",
                        "groupId": "[1099]"
            },
            {
                        "id": "FCH7XA",
                        "name": "TECNOLOGIA SOCIAL E ECONOMIA SOLIDÁRIA",
                        "period": 2,
                        "x": 10,
                        "y": 25,
                        "cht": 60,
                        "dependencies": [],
                        "type": "optional",
                        "groupId": "[1099]"
            },
            {
                        "id": "FCH7XB",
                        "name": "PRESENÇA AFRICANA NO BRASIL: TECNOLOGIA, TRABALHO E CULTURA",
                        "period": 2,
                        "x": 30,
                        "y": 25,
                        "cht": 45,
                        "dependencies": [],
                        "type": "optional",
                        "groupId": "[1099]"
            },
            {
                        "id": "FCH7XC",
                        "name": "PRESENÇA AFRICANA NO BRASIL",
                        "period": 2,
                        "x": 50,
                        "y": 25,
                        "cht": 30,
                        "dependencies": [],
                        "type": "optional",
                        "groupId": "[1099]"
            },
            {
                        "id": "GEE7F1",
                        "name": "FUNDAMENTOS DE FINANÇAS",
                        "period": 2,
                        "x": 70,
                        "y": 25,
                        "cht": 60,
                        "dependencies": [],
                        "type": "optional",
                        "groupId": "[1099]"
            },
            {
                        "id": "GEE7G1",
                        "name": "FUNDAMENTOS DE GESTÃO DE PESSOAS",
                        "period": 2,
                        "x": 90,
                        "y": 25,
                        "cht": 45,
                        "dependencies": [],
                        "type": "optional",
                        "groupId": "[1099]"
            },
            {
                        "id": "DIN8Z1",
                        "name": "ERGONOMIA APLICADA À RADIOLOGIA",
                        "period": 2,
                        "x": 10,
                        "y": 40,
                        "cht": 45,
                        "dependencies": [],
                        "type": "optional",
                        "groupId": "[1099]"
            },
            {
                        "id": "EDU70I",
                        "name": "EDUCAÇÃO ESPECIAL E PROCESSOS INCLUSIVOS",
                        "period": 2,
                        "x": 30,
                        "y": 40,
                        "cht": 45,
                        "dependencies": [],
                        "type": "optional",
                        "groupId": "[1099]"
            },
            {
                        "id": "EDU70J",
                        "name": "LIBRAS",
                        "period": 2,
                        "x": 50,
                        "y": 40,
                        "cht": 45,
                        "dependencies": [],
                        "type": "optional",
                        "groupId": "[1099]"
            },
            {
                        "id": "FIS7E1",
                        "name": "FÍSICA EXPERIMENTAL 1",
                        "period": 2,
                        "x": 70,
                        "y": 40,
                        "cht": 30,
                        "dependencies": [],
                        "type": "optional",
                        "groupId": "[1099]"
            },
            {
                        "id": "FIS7E2",
                        "name": "FÍSICA EXPERIMENTAL 2",
                        "period": 2,
                        "x": 90,
                        "y": 40,
                        "cht": 30,
                        "dependencies": [
                                    "FIS7E1"
                        ],
                        "type": "optional",
                        "groupId": "[1099]"
            },
            {
                        "id": "FIS8A1",
                        "name": "RADIOLOGIA VETERINÁRIA",
                        "period": 2,
                        "x": 10,
                        "y": 55,
                        "cht": 30,
                        "dependencies": [],
                        "type": "optional",
                        "groupId": "[1099]"
            },
            {
                        "id": "FIS8A2",
                        "name": "NORMAS E RECOMENDAÇÕES EM RADIOLOGIA",
                        "period": 2,
                        "x": 30,
                        "y": 55,
                        "cht": 30,
                        "dependencies": [],
                        "type": "optional",
                        "groupId": "[1099]"
            },
            {
                        "id": "FIS8A3",
                        "name": "RADIOLOGIA FORENSE",
                        "period": 2,
                        "x": 50,
                        "y": 55,
                        "cht": 30,
                        "dependencies": [],
                        "type": "optional",
                        "groupId": "[1099]"
            },
            {
                        "id": "FIS8A4",
                        "name": "RADIOLOGIA NO CENTRO CIRÚRGICO",
                        "period": 2,
                        "x": 70,
                        "y": 55,
                        "cht": 30,
                        "dependencies": [
                                    "FIS82B"
                        ],
                        "type": "optional",
                        "groupId": "[1099]"
            },
            {
                        "id": "FIS8A5",
                        "name": "PROTOCOLOS EM TC E RM",
                        "period": 2,
                        "x": 90,
                        "y": 55,
                        "cht": 30,
                        "dependencies": [
                                    "FIS85A",
                                    "FIS85B"
                        ],
                        "type": "optional",
                        "groupId": "[1099]"
            },
            {
                        "id": "FIS8A6",
                        "name": "SAÚDE COLETIVA",
                        "period": 2,
                        "x": 10,
                        "y": 70,
                        "cht": 75,
                        "dependencies": [],
                        "type": "optional",
                        "groupId": "[1099]"
            },
            {
                        "id": "FIS8A7",
                        "name": "VOLUNTARIADO EM SAÚDE",
                        "period": 2,
                        "x": 30,
                        "y": 70,
                        "cht": 75,
                        "dependencies": [],
                        "type": "optional",
                        "groupId": "[1099]"
            },
            {
                        "id": "FIS8A8",
                        "name": "DESENVOLVIMENTO DE MATERIAL DIDÁTICO INTERATIVO PARA ENSINO DE RADIOLOGIA",
                        "period": 2,
                        "x": 50,
                        "y": 70,
                        "cht": 75,
                        "dependencies": [],
                        "type": "optional",
                        "groupId": "[1099]"
            },
            {
                        "id": "FIS8A9",
                        "name": "RADIOBIOLOGIA MOLECULAR E CELULAR",
                        "period": 2,
                        "x": 70,
                        "y": 70,
                        "cht": 30,
                        "dependencies": [],
                        "type": "optional",
                        "groupId": "[1099]"
            },
            {
                        "id": "FIS8B1",
                        "name": "FÍSICA NUCLEAR APLICADA À RADIOLOGIA",
                        "period": 2,
                        "x": 90,
                        "y": 70,
                        "cht": 30,
                        "dependencies": [
                                    "FIS83F"
                        ],
                        "type": "optional",
                        "groupId": "[1099]"
            },
            {
                        "id": "FIS8B2",
                        "name": "MANUFATURA ADITIVA EM RADIOLOGIA",
                        "period": 2,
                        "x": 10,
                        "y": 85,
                        "cht": 30,
                        "dependencies": [],
                        "type": "optional",
                        "groupId": "[1099]"
            },
            {
                        "id": "FIS8B3",
                        "name": "LABORATÓRIO DE DOSIMETRIA",
                        "period": 2,
                        "x": 30,
                        "y": 85,
                        "cht": 30,
                        "dependencies": [
                                    "FIS84E"
                        ],
                        "type": "optional",
                        "groupId": "[1099]"
            },
            {
                        "id": "FIS8B4",
                        "name": "RADIOLOGIA E COMUNIDADE",
                        "period": 2,
                        "x": 50,
                        "y": 85,
                        "cht": 75,
                        "dependencies": [],
                        "type": "optional",
                        "groupId": "[1099]"
            },
            {
                        "id": "GEE7E3",
                        "name": "FUNDAMENTOS DE ECONOMIA",
                        "period": 2,
                        "x": 70,
                        "y": 85,
                        "cht": 30,
                        "dependencies": [],
                        "type": "optional",
                        "groupId": "[1099]"
            },
            {
                        "id": "GEE7M1",
                        "name": "FUNDAMENTOS DE MARKETING",
                        "period": 2,
                        "x": 90,
                        "y": 85,
                        "cht": 45,
                        "dependencies": [],
                        "type": "optional",
                        "groupId": "[1099]"
            }
];

var allNodesData = [
            {
                        "id": "COE70A",
                        "name": "COMUNICAÇÃO ORAL E ESCRITA",
                        "period": 1,
                        "x": 8.0,
                        "y": 8,
                        "cht": 30,
                        "dependencies": [],
                        "type": "subject"
            },
            {
                        "id": "FIS81A",
                        "name": "FÍSICA APLICADA À ÁREA DA SAÚDE 1",
                        "period": 1,
                        "x": 22.0,
                        "y": 8,
                        "cht": 60,
                        "dependencies": [],
                        "type": "subject"
            },
            {
                        "id": "FIS81B",
                        "name": "INTRODUÇÃO À RADIOLOGIA",
                        "period": 1,
                        "x": 36.0,
                        "y": 8,
                        "cht": 30,
                        "dependencies": [],
                        "type": "subject"
            },
            {
                        "id": "FIS81C",
                        "name": "ANATOMIA HUMANA 1",
                        "period": 1,
                        "x": 50.0,
                        "y": 8,
                        "cht": 45,
                        "dependencies": [],
                        "type": "subject"
            },
            {
                        "id": "MAT7T1",
                        "name": "TÓPICOS MATEMÁTICOS 1",
                        "period": 1,
                        "x": 64.0,
                        "y": 8,
                        "cht": 90,
                        "dependencies": [],
                        "type": "subject"
            },
            {
                        "id": "QBI81A",
                        "name": "FUNDAMENTOS DE BIOQUÍMICA",
                        "period": 1,
                        "x": 78.0,
                        "y": 8,
                        "cht": 45,
                        "dependencies": [],
                        "type": "subject"
            },
            {
                        "id": "QBI81B",
                        "name": "BIOLOGIA CELULAR E MICROBIOLOGIA",
                        "period": 1,
                        "x": 92.0,
                        "y": 8,
                        "cht": 45,
                        "dependencies": [],
                        "type": "subject"
            },
            {
                        "id": "FIS82A",
                        "name": "FÍSICA APLICADA À AREA DE SAÚDE 2",
                        "period": 2,
                        "x": 8.0,
                        "y": 22,
                        "cht": 60,
                        "dependencies": [
                                    "FIS81A"
                        ],
                        "type": "subject"
            },
            {
                        "id": "FIS82B",
                        "name": "BIOSSEGURANÇA",
                        "period": 2,
                        "x": 24.8,
                        "y": 22,
                        "cht": 45,
                        "dependencies": [],
                        "type": "subject"
            },
            {
                        "id": "FIS82C",
                        "name": "FISIOLOGIA GERAL",
                        "period": 2,
                        "x": 41.6,
                        "y": 22,
                        "cht": 60,
                        "dependencies": [
                                    "FIS81C"
                        ],
                        "type": "subject"
            },
            {
                        "id": "FIS82D",
                        "name": "BIOÉTICA",
                        "period": 2,
                        "x": 58.4,
                        "y": 22,
                        "cht": 30,
                        "dependencies": [],
                        "type": "subject"
            },
            {
                        "id": "FIS82E",
                        "name": "ANATOMIA HUMANA 2",
                        "period": 2,
                        "x": 75.2,
                        "y": 22,
                        "cht": 45,
                        "dependencies": [
                                    "FIS81C"
                        ],
                        "type": "subject"
            },
            {
                        "id": "MAT7T2",
                        "name": "TÓPICOS MATEMÁTICOS 2",
                        "period": 2,
                        "x": 92.0,
                        "y": 22,
                        "cht": 90,
                        "dependencies": [
                                    "MAT7T1"
                        ],
                        "type": "subject"
            },
            {
                        "id": "FIS83A",
                        "name": "FÍSICA APLICADA À ÁREA DA SAÚDE 3",
                        "period": 3,
                        "x": 8.0,
                        "y": 36,
                        "cht": 60,
                        "dependencies": [
                                    "MAT7T2"
                        ],
                        "type": "subject"
            },
            {
                        "id": "FIS83B",
                        "name": "FORMAÇÃO DE IMAGENS 1",
                        "period": 3,
                        "x": 24.8,
                        "y": 36,
                        "cht": 60,
                        "dependencies": [],
                        "type": "subject"
            },
            {
                        "id": "FIS83C",
                        "name": "PROTEÇÃO RADIOLÓGICA",
                        "period": 3,
                        "x": 41.6,
                        "y": 36,
                        "cht": 60,
                        "dependencies": [],
                        "type": "subject"
            },
            {
                        "id": "FIS83D",
                        "name": "EXAMES RADIOLÓGICOS CONVENCIONAIS 1",
                        "period": 3,
                        "x": 58.4,
                        "y": 36,
                        "cht": 90,
                        "dependencies": [
                                    "FIS82E"
                        ],
                        "type": "subject"
            },
            {
                        "id": "FIS83E",
                        "name": "ASSISTÊNCIA INTEGRAL AO PACIENTE EM RADIOLOGIA",
                        "period": 3,
                        "x": 75.2,
                        "y": 36,
                        "cht": 30,
                        "dependencies": [
                                    "FIS82B",
                                    "FIS82E"
                        ],
                        "type": "subject"
            },
            {
                        "id": "FIS83F",
                        "name": "FÍSICA DAS RADIAÇÕES",
                        "period": 3,
                        "x": 92.0,
                        "y": 36,
                        "cht": 90,
                        "dependencies": [],
                        "type": "subject"
            },
            {
                        "id": "FCH7PA",
                        "name": "PSICOLOGIA DO TRABALHO",
                        "period": 4,
                        "x": 8.0,
                        "y": 50,
                        "cht": 30,
                        "dependencies": [],
                        "type": "subject"
            },
            {
                        "id": "FIS84A",
                        "name": "METODOLOGIA DA PESQUISA",
                        "period": 4,
                        "x": 20.0,
                        "y": 50,
                        "cht": 30,
                        "dependencies": [],
                        "type": "subject"
            },
            {
                        "id": "FIS84B",
                        "name": "MAMOGRAFIA",
                        "period": 4,
                        "x": 32.0,
                        "y": 50,
                        "cht": 45,
                        "dependencies": [
                                    "FIS83B"
                        ],
                        "type": "subject"
            },
            {
                        "id": "FIS84C",
                        "name": "RADIOTERAPIA",
                        "period": 4,
                        "x": 44.0,
                        "y": 50,
                        "cht": 45,
                        "dependencies": [],
                        "type": "subject"
            },
            {
                        "id": "FIS84D",
                        "name": "EXAMES RADIOLÓGICOS CONVENCIONAIS 2",
                        "period": 4,
                        "x": 56.0,
                        "y": 50,
                        "cht": 75,
                        "dependencies": [
                                    "FIS83D"
                        ],
                        "type": "subject"
            },
            {
                        "id": "FIS84E",
                        "name": "DOSIMETRIA",
                        "period": 4,
                        "x": 68.0,
                        "y": 50,
                        "cht": 30,
                        "dependencies": [],
                        "type": "subject"
            },
            {
                        "id": "FIS84F",
                        "name": "FORMAÇÃO DE IMAGENS 2",
                        "period": 4,
                        "x": 80.0,
                        "y": 50,
                        "cht": 45,
                        "dependencies": [
                                    "FIS83B"
                        ],
                        "type": "subject"
            },
            {
                        "id": "FIS84G",
                        "name": "ANATOMOFISIOPATOLOGIA NAS IMAGENS MÉDICAS 1",
                        "period": 4,
                        "x": 92.0,
                        "y": 50,
                        "cht": 45,
                        "dependencies": [
                                    "FIS82E"
                        ],
                        "type": "subject"
            },
            {
                        "id": "FIS85A",
                        "name": "TOMOGRAFIA COMPUTADORIZADA",
                        "period": 5,
                        "x": 8.0,
                        "y": 64,
                        "cht": 45,
                        "dependencies": [
                                    "FIS84F"
                        ],
                        "type": "subject"
            },
            {
                        "id": "FIS85B",
                        "name": "RESSONÂNCIA MAGNÉTICA",
                        "period": 5,
                        "x": 20.0,
                        "y": 64,
                        "cht": 60,
                        "dependencies": [
                                    "FIS83A"
                        ],
                        "type": "subject"
            },
            {
                        "id": "FIS85C",
                        "name": "LABORATÓRIO DE RADIOLOGIA",
                        "period": 5,
                        "x": 32.0,
                        "y": 64,
                        "cht": 30,
                        "dependencies": [
                                    "FIS83B"
                        ],
                        "type": "subject"
            },
            {
                        "id": "FIS85D",
                        "name": "CARTAS TÉCNICAS",
                        "period": 5,
                        "x": 44.0,
                        "y": 64,
                        "cht": 30,
                        "dependencies": [
                                    "FIS84F"
                        ],
                        "type": "subject"
            },
            {
                        "id": "FIS85E",
                        "name": "TRABALHO DE CONCLUSÃO 1",
                        "period": 5,
                        "x": 56.0,
                        "y": 64,
                        "cht": 30,
                        "dependencies": [
                                    "FIS84A"
                        ],
                        "type": "subject"
            },
            {
                        "id": "FIS85F",
                        "name": "RADIOLOGIA ODONTOLÓGICA",
                        "period": 5,
                        "x": 68.0,
                        "y": 64,
                        "cht": 30,
                        "dependencies": [
                                    "FIS83B"
                        ],
                        "type": "subject"
            },
            {
                        "id": "FIS85G",
                        "name": "ANATOMOFISIOPATOLOGIA NAS IMAGENS MÉDICAS 2",
                        "period": 5,
                        "x": 80.0,
                        "y": 64,
                        "cht": 30,
                        "dependencies": [
                                    "FIS84G"
                        ],
                        "type": "subject"
            },
            {
                        "id": "GEE7A1",
                        "name": "FUNDAMENTOS DE ADMINISTRAÇÃO",
                        "period": 5,
                        "x": 92.0,
                        "y": 64,
                        "cht": 45,
                        "dependencies": [],
                        "type": "subject"
            },
            {
                        "id": "FIS86A",
                        "name": "PROCESSAMENTO DE IMAGENS DIGITAIS",
                        "period": 6,
                        "x": 8.0,
                        "y": 78,
                        "cht": 45,
                        "dependencies": [],
                        "type": "subject"
            },
            {
                        "id": "FIS86B",
                        "name": "MEDICINA NUCLEAR",
                        "period": 6,
                        "x": 22.0,
                        "y": 78,
                        "cht": 60,
                        "dependencies": [
                                    "FIS82C"
                        ],
                        "type": "subject"
            },
            {
                        "id": "FIS86C",
                        "name": "RADIOLOGIA INDUSTRIAL",
                        "period": 6,
                        "x": 36.0,
                        "y": 78,
                        "cht": 30,
                        "dependencies": [],
                        "type": "subject"
            },
            {
                        "id": "FIS86D",
                        "name": "ULTRASSOM",
                        "period": 6,
                        "x": 50.0,
                        "y": 78,
                        "cht": 30,
                        "dependencies": [],
                        "type": "subject"
            },
            {
                        "id": "FIS86E",
                        "name": "TRABALHO DE CONCLUSÃO 2",
                        "period": 6,
                        "x": 64.0,
                        "y": 78,
                        "cht": 60,
                        "dependencies": [
                                    "Periodo:6",
                                    "FIS85E"
                        ],
                        "type": "subject"
            },
            {
                        "id": "GEE7E1",
                        "name": "FUNDAMENTOS DE EMPREENDEDORISMO",
                        "period": 6,
                        "x": 78.0,
                        "y": 78,
                        "cht": 30,
                        "dependencies": [],
                        "type": "subject"
            },
            {
                        "id": "FIS80A",
                        "name": "ESTÁGIO CURRICULAR OBRIGATÓRIO",
                        "period": 2,
                        "x": 92.0,
                        "y": 78,
                        "cht": 600,
                        "dependencies": [
                                    "FIS83C",
                                    "FIS83D"
                        ],
                        "type": "subject"
            }
];

export { TOTAL_HUMANITIES_HOURS, TOTAL_OPTIONAL_HOURS, NODE_WIDTH, NODE_HEIGHT, SPECIALIZATION_TRACKS_M2, OPTIONAL_GROUPS_CONFIG, allHumanitiesData, allOptionalNodesData, allNodesData };
