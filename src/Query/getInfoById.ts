import { FieldResolveInput } from 'stucco-js';
import { resolverFor } from '../zeus/index.js';
import puppeteer from 'puppeteer';

export const handler = async (input: FieldResolveInput) =>
  resolverFor('Query', 'getInfoById', async (args) => {
    const browser = await puppeteer.launch({ headless: false, slowMo: 15 });
    const page = await browser.newPage();

    // Set screen size
    await page.setViewport({ width: 1080, height: 1080 });
    await page.goto('https://systemobsluginajmu.pl/login');

    // Type into search box
    await page.type('.form-control.m-input.placeholder-no-fix', args.login?.email);
    await page.type('.form-control.placeholder-no-fix.m-input.m-login__form-input--last', args.login?.password);

    const login = await page.waitForSelector('div >.btn.btn-focus.m-btn.m-btn--pill.m-btn--custom.m-btn--air');
    await login?.click({ delay: 0 });

    const select = await page.waitForSelector('text/Nieruchomości');
    await select?.click({ delay: 0 });

    await page.goto(`https://systemobsluginajmu.pl/estates/view-estate/${args.estate_id}`);

    const apInfoPodstawowe = await page.waitForSelector(
      'div[class="adminpanelEstatesViewEstate"]>div>div>div[class="portlet light bordered"]',
    );
    const basicInfo = await apInfoPodstawowe?.evaluate((el) => el?.textContent);

    const apInfoOg = await page.waitForSelector(
      'div[id="estate_card_main"]>table[class="table table-bordered table-striped"]>tbody',
    );
    const info1 = await apInfoOg?.evaluate((el) => el?.innerText);

    const apInfoSzczeg = await page.waitForSelector(
      'div[id="estate_card_details"]>div>table[class="table table-bordered table-striped"]>tbody',
    );
    const info2 = await apInfoSzczeg?.evaluate((el) => el?.textContent);

    const apInfoDostawcow = await page.waitForSelector(
      'div[class="estateCardProviders"]>table[class="table table-bordered table-striped"]>tbody',
    );
    const info3 = await apInfoDostawcow?.evaluate((el) => el?.textContent);

    const notatki = await page.waitForSelector('div[class="notes"]>div[class="mt-comments"]');
    const notes = await notatki?.evaluate((el) => el?.textContent);

    const pokoje = await page.waitForSelector(
      'div[class="portlet-body display-hide"]>div>table[class="table table-bordered responsive table-condensed table-hover"]',
    );
    const rooms = await pokoje?.evaluate((el) => el?.textContent);

    const liczniki = await page.waitForSelector(
      'div[class="portlet-body display-hide"]>div>div[class="panel-group accordion"]',
    );
    const meters = await liczniki?.evaluate((el) => el?.textContent);
    console.log('1');
    const zgloszenia = await page.waitForSelector(
      'div[class="portlet-body display-hide"]>table[id="estate_tickets_table"]',
    );
    console.log('2');
    const notifications = await zgloszenia?.evaluate((el) => el?.textContent);

    const controle = await page.waitForSelector(
      'div[class="portlet light bordered"]>div>table[id="estate_controls_reload"]',
    );
    console.log('3');
    const controls = await controle?.evaluate((el) => el?.textContent);

    return {
      basicInfo: basicInfo,
      apartment_card: { ogolne: info1, szczegoly: info2, daneDostawcow: info3 },
      notes: notes,
      rooms_and_tenants: rooms,
      meters_and_charges: meters,
      notifications: notifications,
      estate_controls: controls,
    };
  })(input.arguments);
