import puppeteer from 'puppeteer';

async () => {
  const browser = await puppeteer.launch({ headless: false, slowMo: 50 });
  const page = await browser.newPage();

  // Set screen size
  await page.setViewport({ width: 1080, height: 1024 });
  await page.goto('https://systemobsluginajmu.pl/login');

  // Type into search box
  await page.type('.form-control.m-input.placeholder-no-fix', 'artur@aexol.com');
  await page.type('.form-control.placeholder-no-fix.m-input.m-login__form-input--last', 'XzNuegFg3jLGuaX');

  const login = await page.waitForSelector('div >.btn.btn-focus.m-btn.m-btn--pill.m-btn--custom.m-btn--air');
  await login.click({ delay: 100 });

  const select = await page.waitForSelector('text/Nieruchomości');
  await select.click('text/Nieruchomości', { delay: 100 });

  const addNew = await page.waitForSelector('a[class="btn btn-success"]');
  await addNew.click({ delay: 100 });

  await page.click('a[class="btn.btn-success"]');

  // await page.waitForSelector('div >.form-control', 'Name');
  await page.waitForSelector('input[name="division_name"]');
  await page.type('input[name="division_name"]', 'Name');
  await page.type('input[name="division_shortname"]', 'CompanyName');
  await page.type('input[name="division_address"]', 'Address');
  await page.type('input[name="division_city"]', 'City');
  await page.type('input[name="division_zip"]', 'Zip');
  //await page.type('select[name="division_country_id"]', '41');
  await page.type('input[name="division_account"]', '93828404804444444');

  const submit = await page.waitForSelector('div >.btn.green');

  await submit.click({ delay: 100 });
};
