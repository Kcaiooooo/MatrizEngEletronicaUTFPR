const puppeteer = require('puppeteer');
(async () => {
  const browser = await puppeteer.launch({args: ['--no-sandbox', '--disable-web-security']});
  const page = await browser.newPage();
  page.on('console', msg => console.log('PAGE LOG:', msg.text()));
  page.on('pageerror', err => console.log('PAGE ERROR:', err.toString()));
  await page.goto('http://localhost:8080/Skill%20tree%20Eletrica.html');
  await new Promise(r => setTimeout(r, 2000));
  
  // click upload button and simulate file upload
  const fileInput = await page.$('#pdf-upload');
  await fileInput.uploadFile('histórico/Histórico Escolar.pdf');
  
  await new Promise(r => setTimeout(r, 5000));
  await browser.close();
  process.exit(0);
})();
