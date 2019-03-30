const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  const url = 'https://www.thomann.de/ie/st_models.html?pg=2&ls=25';
  await page.goto(url);
  // await page.screenshot({ path: 'example.png' });

  // const guitarNames = await page.evaluate(() =>
  //   Array.from(document.querySelectorAll('.title-block')).map(guitar =>
  //     guitar.innerText.trim()
  //   )
  // );

  // const guitarPrice = await page.evaluate(() =>
  //   Array.from(document.querySelectorAll('.price-block')).map(price =>
  //     price.innerText.trim()
  //   )
  // );
  //title, price and image are scraped from the website and put in an object 
  const guitarInfo = await page.evaluate(() =>
    Array.from(document.querySelectorAll('.extensible-article')).map(
      content => ({
        title: content.querySelector('.title-block').textContent,
        price: content.querySelector('.price-block').textContent,
        image: content.querySelector('.product-image img').src
      })
    )
  );

  // console.log(guitarNames);
  // console.log(guitarPrice);
  console.log(guitarInfo);

  await browser.close();
})();
