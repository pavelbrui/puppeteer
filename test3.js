console.log('hello world');

import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch({ headless: false, slowMo: 50 });
  const page = await browser.newPage();

  // Set screen size
  await page.setViewport({ width: 1080, height: 1024 });
  await page.goto('https://systemobsluginajmu.pl/login');

  // Type into search box
  await page.type('.form-control.m-input.placeholder-no-fix', args.login.email);
  await page.type('.form-control.placeholder-no-fix.m-input.m-login__form-input--last', args.login.password);

  const login = await page.waitForSelector('div >.btn.btn-focus.m-btn.m-btn--pill.m-btn--custom.m-btn--air');
  await login?.click({ delay: 100 });

  const select = await page.waitForSelector('text/Nieruchomości');
  await select?.click();

  const addNew = await page.waitForSelector('a[class="btn btn-success"]');
  await addNew?.click({ delay: 100 });

  try {
    await page.waitForSelector('input[name="estate_address"]');
  } catch {
    return 'Error';
  }
  await page.type('input[name="estate_address"]', args.info.address);
  await page.type('input[name="estate_city"]', 'CompanyName');
  await page.type('input[name="estate_zip"]', 'Address');
  if (args.info) {
    const change = await page.waitForSelector('div >.btn.btn-transparent--custom');
    await change?.click({ delay: 100 });
  }
  await page.type('input[name="estate_access_code"]', 'City');
  await page.type('input[name="estate_code"]', 'Zip');
  await page.type('input[name="estate_account"]', '93828404804444444');

  const submit = await page.waitForSelector('div >.btn.green');

  await submit?.click({ delay: 100 });

  await browser.close();

  await page.evaluate(() => {
    window.scrollBy(0, -window.innerHeight / 8);
  });

  return ' super';
})();

const dostawcy = await page.waitForSelector('a[href="#estate_card_details"]');
await dostawcy?.click({ delay: 10 });
console.log('clik norm');

// await page.type('div[id="estate_rental_type"]>input[value="1"]', '1');
console.log('input');
(await page.waitForSelector('div[id="estate_rental_type"]>label'))?.click();
console.log('div finded');
await page.evaluate(() => {
  const elements = [...document.querySelectorAll('label')];
  const targetElement = elements.find((e) => e.innerText == 'Wynajem');
  if (targetElement) targetElement.click();
});

//const change = await page.waitForXPath('//label[contains(text(), "Wynajem")]');
