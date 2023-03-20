import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch({ headless: false, slowMo: 50 });
  const page = await browser.newPage();

  // Set screen size
  await page.setViewport({ width: 1080, height: 1024 });
  await page.goto('https://systemobsluginajmu.pl/login');

  // Type into search box
  await page.type('.form-control.m-input.placeholder-no-fix', 'artur@aexol.com');
  await page.type('.form-control.placeholder-no-fix.m-input.m-login__form-input--last', 'XzNuegFg3jLGuaX');

  const login = await page.waitForSelector('div >.btn.btn-focus.m-btn.m-btn--pill.m-btn--custom.m-btn--air');
  await login?.click({ delay: 0 });

  const select = await page.waitForSelector('text/Nieruchomości');
  await select?.click({ delay: 10 });
  await page.goto('https://systemobsluginajmu.pl/estates/index');

  const response2 = await page.waitForResponse((response) => {
    return response.url().endsWith('index');
  });

  const indexJson2 = await response2.text();
  console.log('indexJson2 = ', indexJson2);

  const response = await page.waitForResponse((response) => {
    return response.url().endsWith('index.json');
  });

  const indexJson = await response.text();
  console.log(indexJson);

  //await browser.close();
})();
