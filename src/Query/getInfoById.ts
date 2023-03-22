import { Selector } from './../zeus/index';
import { BasicInfoModel } from './../models/BasicInfoModel';
import { FieldResolveInput } from 'stucco-js';
import { Apart_state, resolverFor } from '../zeus/index.js';
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
    await select?.click({ delay: 50 });

    await page.goto(`https://systemobsluginajmu.pl/estates/view-estate/${args.estate_id}`);

    const apInfoPodstawowe = await page.waitForSelector(
      'div[class="adminpanelEstatesViewEstate"]>div>div>div[class="portlet light bordered"]',
    );

    await apInfoPodstawowe?.click({ delay: 50 });
    const gotowe = await apInfoPodstawowe?.$$(
      'label[class="btn btn-transparent--custom rent active"]>input[value="0"]',
    );
    const state = gotowe?.length ? Apart_state.Gotowa_do_wynajmu : Apart_state.W_remoncie;
    console.log(gotowe?.length);

    console.log(state as string);

    const textSelector = await apInfoPodstawowe?.$('span[class="padding-L25 help-block small"]');
    const owner = await textSelector?.evaluate((el) => el.textContent);
    console.log('owner ', owner);

    const adres_info = await page.waitForSelector(
      'div[class="portlet-body "]>div[class="row"]>div[class="col-xs-12 col-md-4"]>h4',
    );
    console.log('adres_info', adres_info);
    const gwarancja = await page.waitForSelector('div>div>div>span[class="dim"]');
    const pakiet = await page.waitForSelector('div>div>div>span[class="dim"]:last-child');
    console.log(await gwarancja?.evaluate((el) => el?.textContent));
    console.log(await pakiet?.evaluate((el) => el?.textContent));

    const rental_info = await (
      await page.waitForSelector('div>div>div[class="col-xs-12 col-md-4"]:nth-last-child(2)')
    )?.evaluate((el) => el?.textContent);
    console.log(rental_info);

    const bank_account_for_payment = await (
      await page.waitForSelector('div>div>div[class="col-xs-12 col-md-12"]')
    )?.evaluate((el) => el?.textContent);

    const basicInfo: BasicInfoModel = {
      repair_warranty_up_to: (await gwarancja?.evaluate((el) => el?.textContent)) || undefined,
      assistance_package: (await pakiet?.evaluate((el) => el?.textContent)) || undefined,
      address_info: (await adres_info?.evaluate((el) => el?.textContent)) || undefined,
      rental_info: rental_info || undefined,
      bank_account_for_payment: bank_account_for_payment || undefined,
      estate_is_under_renovation: state,
      other_owner: owner || undefined,
    };

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
    await browser.close();

    return {
      basic_info: basicInfo,
      apartment_card: { general: info1, details: info2, supplier_data: info3 },
      notes: notes,
      rooms_and_tenants: rooms,
      meters_and_charges: meters,
      notifications: notifications,
      estate_controls: controls,
    };
  })(input.arguments);
