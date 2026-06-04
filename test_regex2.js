const fs = require('fs');
const text = fs.readFileSync('extracted_text.txt', 'utf8');

const anySubjectCodeRegex = /\b[A-Z]{2,6}\d+[A-Z0-9]*\b/g;
const codes = [...text.matchAll(anySubjectCodeRegex)];
codes.forEach(match => {
    if (match[0] === 'LICOM7AB') {
        console.log("Found LICOM7AB at", match.index);
        console.log(text.substring(match.index, match.index + 200));
    }
});
