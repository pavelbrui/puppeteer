import { FieldResolveInput } from 'stucco-js';
import { resolverFor } from '../zeus/index.js';
import puppeteer from 'puppeteer';

export const handler = async (input: FieldResolveInput) =>
  resolverFor('Query', 'ListAll', async (args) => {
    const browser = await puppeteer.launch({ headless: false, slowMo: 1 });
    const page = await browser.newPage();

    // Set screen size
    await page.setViewport({ width: 1080, height: 1024 });
    await page.goto('https://systemobsluginajmu.pl/login');

    // Type into search box
    await page.type('.form-control.m-input.placeholder-no-fix', args.login?.email);
    await page.type('.form-control.placeholder-no-fix.m-input.m-login__form-input--last', args.login?.password);

    const login = await page.waitForSelector('div >.btn.btn-focus.m-btn.m-btn--pill.m-btn--custom.m-btn--air');
    await login?.click({ delay: 50 });

    const select = await page.waitForSelector('text/Nieruchomości');
    await select?.click();

    try {
      // await page.waitForSelector('input[name="estate_address"]');
    } catch {
      return 'Error';
    }
    try {
      const hhhh = await page.waitForSelector(
        'div>div>div>div>div>div>table[id="dbtable"]>tbody>tr[class="odd"]>td>a>span[class="label label-default float-right"]',
      );
      const hhhh2 = await page.waitForSelector(
        'div>div>div>div>div>div>table[id="dbtable"]>tbody>tr[class="odd"]>td>a',
      );
      console.log('href working!!');
      console.log(await hhhh?.evaluate((el) => el.textContent));
      console.log(await hhhh2?.evaluate((el) => el.textContent));
    } catch {
      console.log('Field for notes not find');
    }

    const hhhh3 = await page.waitForSelector('div>div>div>div>div>div>table[id="dbtable"]>tbody>tr[class="odd"]>td');
    console.log(await hhhh3?.evaluate((el) => el.textContent));

    const hhhh4 = await page.waitForSelector('div>div>div>div>div>div>table[id="dbtable"]>tbody>tr[class="odd"]');
    console.log(await hhhh4?.evaluate((el) => el.textContent));

    const elements = await page.waitForSelector(
      'div>div>div>div>div>div>table[id="dbtable"]>tbody>tr[class="odd"]>td>a',
    );
    console.log(await elements?.evaluate((el) => el.textContent));

    const textSelector = await page.waitForSelector('text/Customize and automate');
    const fullTitle = await textSelector?.evaluate((el) => el.textContent);

    // Print the full title
    console.log('The title of this blog post is "%s".', fullTitle);
    await browser.close();

    return [hhhh4];
  })(input.arguments);
