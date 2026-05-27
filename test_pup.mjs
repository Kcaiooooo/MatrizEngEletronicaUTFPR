import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch({args: ['--no-sandbox']});
  const page = await browser.newPage();
  page.on('console', msg => console.log('PAGE LOG:', msg.text()));
  page.on('pageerror', err => console.log('PAGE ERROR:', err.toString()));
  await page.goto('file://' + process.cwd() + '/test_pdf_module.html');
  await new Promise(r => setTimeout(r, 1000));
  await browser.close();
})();
