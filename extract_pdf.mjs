import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf.mjs';
import fs from 'fs';

async function extract() {
    const data = new Uint8Array(fs.readFileSync('docs/histórico/Histórico Escolar.pdf'));
    const pdf = await pdfjsLib.getDocument(data).promise;
    let fullText = '';
    for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();
        fullText += textContent.items.map(item => item.str).join('\n');
    }
    fs.writeFileSync('extracted_text.txt', fullText);
}
extract();
