const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  const url = 'https://www.thomann.de/ie/st_models.html?pg=2&ls=25';
  await page.goto(url);
  // await page.screenshot({ path: 'example.png' });

  const textContent = await page.evaluate(() =>
    Array.from(document.querySelectorAll('.title-block')).map(item =>
      item.innerText.trim()
    )
  );
  console.log(textContent);

  await browser.close();
})();
