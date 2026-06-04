const fs = require('fs');
let content = fs.readFileSync('pages/Skill tree Custom.html', 'utf8');

// Replace the hardcoded variables definition
const regexToReplace = /const TOTAL_COMPLEMENTARY_HOURS = 180;[\s\S]*?let nodes = \[\];/;

const newLogic = `
        import { getMatrixById } from '../assets/firebase-config.js';

        // Variáveis que serão preenchidas dinamicamente do Firebase
        let TOTAL_COMPLEMENTARY_HOURS = 0;
        let TOTAL_EXTENSION_HOURS = 0;
        let TOTAL_HUMANITIES_HOURS = 0;
        let TOTAL_OPTIONAL_HOURS = 0;
        let NODE_WIDTH = 130;
        let NODE_HEIGHT = 90;
        let SPECIALIZATION_TRACKS = {};
        let OPTIONAL_GROUPS_CONFIG = {};
        let allNodesData = [];
        let allHumanitiesData = [];
        let allOptionalNodesData = [];

        let nodes = [];
        let humanitiesNodes = [];
        let optionalNodes = [];
`;

content = content.replace(regexToReplace, newLogic);

// Wrap initializeTree() and everything after it to be inside an async load function
const initRegex = /initializeTree\(\);/;

const asyncLoad = `
        async function loadMatrixFromFirebase() {
            const urlParams = new URLSearchParams(window.location.search);
            const matrixId = urlParams.get('id');

            if (!matrixId) {
                alert('Nenhuma matriz especificada. Você será redirecionado.');
                window.location.href = '../index.html';
                return;
            }

            const matrixData = await getMatrixById(matrixId);

            if (!matrixData) {
                alert('Matriz não encontrada ou erro no Firebase. Se você não configurou o Firebase, o site não funcionará.');
                return;
            }

            // Popula as variáveis
            document.getElementById('course-title').textContent = matrixData.name || 'Matriz Customizada';
            document.title = (matrixData.name || 'Matriz Customizada') + ' - UTFPR';

            TOTAL_COMPLEMENTARY_HOURS = matrixData.totalComplementary || 0;
            TOTAL_EXTENSION_HOURS = matrixData.totalExtension || 0;
            TOTAL_HUMANITIES_HOURS = matrixData.totalHumanities || 0;
            TOTAL_OPTIONAL_HOURS = matrixData.totalOptional || 0;
            
            SPECIALIZATION_TRACKS = matrixData.specializationTracks || {};
            OPTIONAL_GROUPS_CONFIG = matrixData.optionalGroupsConfig || {};

            allNodesData = matrixData.nodes.filter(n => n.type === 'subject');
            allHumanitiesData = matrixData.nodes.filter(n => n.type === 'humanities');
            allOptionalNodesData = matrixData.nodes.filter(n => n.type === 'optional');

            initializeTree();
        }

        // --- INITIALIZATION ---
        loadMatrixFromFirebase();
`;

content = content.replace(initRegex, asyncLoad);

fs.writeFileSync('pages/Skill tree Custom.html', content);
