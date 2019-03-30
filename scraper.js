const puppeteer = require('puppeteer');

(async () => {
  const getGuitarInfo = async url => {
    const page = await browser.newPage();
    await page.goto(url);
    console.log(`Scraping page ${url}`);
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
    const nextPageNum = parseInt(url.match(/pg=(\d+)$/)[1], 10) + 1;
    const nextURL = `https://www.thomann.de/ie/st_models.html?pg=${nextPageNum}`;
    await page.close();
    return guitarInfo;
  };

  const browser = await puppeteer.launch();

  const url = 'https://www.thomann.de/ie/st_models.html?pg=1';

  const guitarData = await getGuitarInfo(url);

  console.log(guitarData);

  await browser.close();
})();

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
