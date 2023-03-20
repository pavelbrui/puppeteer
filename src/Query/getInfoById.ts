import { FieldResolveInput } from 'stucco-js';
import { resolverFor } from '../zeus/index.js';
import puppeteer from 'puppeteer';

export const handler = async (input: FieldResolveInput) =>
  resolverFor('Query', 'getInfoById', async (args) => {
    const browser = await puppeteer.launch({ headless: false, slowMo: 15 });
    const page = await browser.newPage();

    // Set screen size
    await page.setViewport({ width: 1080, height: 1024 });
    await page.goto('https://systemobsluginajmu.pl/login');

    // Type into search box
    await page.type('.form-control.m-input.placeholder-no-fix', args.login?.email);
    await page.type('.form-control.placeholder-no-fix.m-input.m-login__form-input--last', args.login?.password);

    const login = await page.waitForSelector('div >.btn.btn-focus.m-btn.m-btn--pill.m-btn--custom.m-btn--air');
    await login?.click({ delay: 0 });

    const select = await page.waitForSelector('text/Nieruchomości');
    await select?.click({ delay: 10 });

    await page.goto(`https://systemobsluginajmu.pl/estates/view-estate/${args.estate_id}`);
    const apInfo = await page.waitForSelector('div[class="adminpanelEstatesViewEstate"]');

    const info = await apInfo?.evaluate((el) => el?.innerText);

    return info;
  })(input.arguments);
