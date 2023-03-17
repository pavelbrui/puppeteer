import { FieldResolveInput } from 'stucco-js';
import { resolverFor } from '../zeus/index.js';
import puppeteer from 'puppeteer';

export const handler = async (input: FieldResolveInput) =>
  resolverFor('Mutation', 'firstRegister', async (args) => {
    const browser = await puppeteer.launch({ headless: false, slowMo: 50 });
    const page = await browser.newPage();

    // Set screen size
    await page.setViewport({ width: 1080, height: 1024 });
    await page.goto('https://systemobsluginajmu.pl/login');

    const textSelector = await page.waitForSelector('text/System');
    const fullTitle = await textSelector?.evaluate((el) => el.textContent);

    // Type into search box
    await page.type('.form-control.m-input.placeholder-no-fix', args.login.email);
    await page.type('.form-control.placeholder-no-fix.m-input.m-login__form-input--last', args.login.password);

    const login = await page.waitForSelector('div >.btn.btn-focus.m-btn.m-btn--pill.m-btn--custom.m-btn--air');
    await login?.click({ delay: 100 });

    await page.waitForSelector('input[name="division_name"]');
    await page.type('input[name="division_name"]', 'Name');
    await page.type('input[name="division_shortname"]', 'CompanyName');
    await page.type('input[name="division_address"]', 'Address');
    await page.type('input[name="division_city"]', 'City');
    await page.type('input[name="division_zip"]', 'Zip');
    await page.type('select[name="division_country_id"]', '41');
    await page.type('input[name="division_account"]', '93828404804444444');

    const submit = await page.waitForSelector('div >.btn.green');

    await submit?.click({ delay: 100 });

    console.log('The title of this blog post is "%s".', fullTitle);

    await browser.close();

    return 'super';
  })(input.arguments);
