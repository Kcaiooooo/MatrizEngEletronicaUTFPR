const fs = require('fs');
const text = fs.readFileSync('extracted_text.txt', 'utf8');

const cleanTextForHeaders = text.replace(/(\r\n|\n|\r|\s)/g, '').toLowerCase();
const findCleanIndex = (str) => cleanTextForHeaders.indexOf(str);
const sectionsData = [
    { name: 'Obrigatorias', index: findCleanIndex('disciplinasobrigatóriascursadas'), mode: 'NORMAL' },
    { name: 'EquivalentesObrigatorias', index: findCleanIndex('detalhesdasequivalentescursadasdedisciplinasobrigatórias'), mode: 'INVERTED' },
    { name: 'Optativas', index: findCleanIndex('disciplinasoptativascursadas'), mode: 'NORMAL' },
    { name: 'EquivalentesOptativas', index: findCleanIndex('detalhesdasequivalentescursadasdedisciplinasoptativas'), mode: 'INVERTED' },
    { name: 'Enriquecimento', index: findCleanIndex('disciplinasdeenriquecimentocurricular'), mode: 'NORMAL' },
    { name: 'Resumo', index: findCleanIndex('resumooptativas'), mode: 'NORMAL' }
];

const originalTextIndices = {};
for (let i = 0, cleanIndex = 0; i < text.length; i++) {
    if (!/\s/.test(text[i])) {
        originalTextIndices[cleanIndex++] = i;
    }
}
const sections = sectionsData.filter(s => s.index !== -1).sort((a, b) => a.index - b.index);

const stopPhrase = "Disciplinas Obrigatórias Faltantes";
let effectiveText = text;
const stopIndex = text.indexOf(stopPhrase);
if (stopIndex !== -1) effectiveText = text.substring(0, stopIndex);

for (let i = 0; i < sections.length; i++) {
    const currentSection = sections[i];
    const nextSection = sections[i + 1];
    const startOriginalIndex = originalTextIndices[currentSection.index] || 0;
    const endOriginalIndex = nextSection ? (originalTextIndices[nextSection.index] || effectiveText.length) : effectiveText.length;
    const sectionText = effectiveText.substring(startOriginalIndex, endOriginalIndex);

    if (currentSection.mode === 'NORMAL') {
        const anySubjectCodeRegex = /\b[A-Z]{2,6}\d+[A-Z0-9]*\b/g;
        const codesInSection = [...sectionText.matchAll(anySubjectCodeRegex)];
        codesInSection.forEach((match, idx) => {
            const code = match[0];
            const startIndex = match.index;
            const endIndex = (idx + 1 < codesInSection.length) ? codesInSection[idx + 1].index : sectionText.length;
            const analysisBlock = sectionText.substring(startIndex, endIndex);

            const cleanAnalysisBlock = analysisBlock.replace(/\s/g, '');
            if (code === 'LICOM7AB' || code === 'FCH7HB') {
                 console.log(`[${code}] IN SECTION: ${currentSection.name}`);
                 console.log("BLOCK:", analysisBlock);
                 console.log("CLEAN:", cleanAnalysisBlock);
                 console.log("TEST:", /Aprovado|CréditoConsignado/i.test(cleanAnalysisBlock));
                 console.log('---');
            }
        });
    }
}
