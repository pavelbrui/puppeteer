import { FieldResolveInput } from 'stucco-js';
import { resolverFor } from '../zeus/index.js';
import puppeteer from 'puppeteer';

export const handler = async (input: FieldResolveInput) =>
  resolverFor('Query', 'ListAll', async (args) => {
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

    await page.goto('https://systemobsluginajmu.pl/estates/index');

    const response = await page.waitForResponse((response) => {
      return response.url().endsWith('index');
    });

    const indexJson = await response.text();

    const aparts = JSON.parse(indexJson).data;

    const estate_det = (aparts[0].estate_details as string).split('\n');
    console.log(estate_det);

    console.log({
      ...aparts[0],
      estate_details: {
        liczba_pokoi: estate_det[0].split(':')[1],
        pietro: estate_det[1].split(':')[1],
        powierzchnia: estate_det[2].split(':')[1],
      },
    });
    await browser.close();
    return aparts;
  })(input.arguments);
