import fs from 'fs';
import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf.mjs';

async function extractText(pdfPath) {
    const data = new Uint8Array(fs.readFileSync(pdfPath));
    const doc = await pdfjsLib.getDocument(data).promise;
    let fullText = '';
    for (let i = 1; i <= doc.numPages; i++) {
        const page = await doc.getPage(i);
        const textContent = await page.getTextContent();
        fullText += textContent.items.map(item => item.str).join('\n');
    }
    return fullText;
}

extractText('histórico/Histórico Escolar.pdf')
    .then(text => {
        fs.writeFileSync('extracted_text.txt', text);
        console.log('Text extracted and saved to extracted_text.txt');
    })
    .catch(err => {
        console.error('Error extracting text:', err);
    });
