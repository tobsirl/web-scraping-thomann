const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  const url = 'https://www.thomann.de/ie/st_models.html?pg=3&ls=25';
  await page.goto(url);
  await page.screenshot({ path: 'example.png' });

  await browser.close();
})();
