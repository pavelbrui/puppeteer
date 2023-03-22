import { FieldResolveInput } from 'stucco-js';
import { resolverFor, Rodzaj_najmu, Rodzaj_ogrzewania, Zarzadzanie } from '../zeus/index.js';
import puppeteer from 'puppeteer';

export const handler = async (input: FieldResolveInput) =>
  resolverFor('Mutation', 'addApartment', async (args) => {
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
    await page.type('input[name="estate_city"]', args.info.city);
    await page.type('input[name="estate_zip"]', args.info.zip || '');
    if (args.info.rental_type === Rodzaj_najmu.Wynajem_calosci) {
      try {
        const change = await page.waitForSelector('div[id="estate_rental_type"]>label>input[value="1"]');
        await change?.click({ delay: 100 });
        console.log('Wynajem_calosci added');
      } catch {
        console.log('Button Wynajem_calosci not find');
      }
    }
    if (args.info.menage_type) {
      const value =
        args.info.menage_type === Zarzadzanie.Zarzadzanie ? 2 : args.info.menage_type === Zarzadzanie.Podnajem ? 3 : 1;

      try {
        const change = await page.waitForSelector(`div[id="estate_manage_type"]>label>input[value="${value}"]`);
        await change?.click({ delay: 100 });
        if (value > 1) {
          const wlasciciel = await page.waitForSelector(`span[id="select2-owner_id-container"]`);
          await wlasciciel?.click({ delay: 100 });
          const owner = await page.waitForSelector('ul[id="select2-owner_id-results"]:last-child');
          await owner?.click({ delay: 100 });
        }
        console.log('Zarzadzanie added');
      } catch {
        console.log('Button Zarzadzanie not find');
      }
    }
    await page.type('input[name="estate_access_code"]', args.info.intercom_code || '');
    await page.type('input[name="estate_code"]', args.info.apartment_id || '');
    if (args.info.if_other_bank_account) {
      await page.type('input[name="estate_account"]', args.info.if_other_bank_account);
    }
    const submit = await page.waitForSelector('div[class="col-md-12 text-right"]>button[class="btn green"]');
    await submit?.click({ delay: 1300 });
    console.log('Apartment added');
    try {
      await page.waitForSelector('input[placeholder="Dodaj tag"]');
    } catch {
      return 'Field for tags not find';
    }
    await page.type('input[placeholder="Dodaj tag"]', args.info.tags ? args.info.tags?.toString() + ',' : '');
    console.log('Tags added');

    const notes = args.info.notes;
    if (notes) {
      for (const i in notes) {
        try {
          await page.waitForSelector('textarea[placeholder="Wpisz treść"]');
        } catch {
          return 'Field for notes not find';
        }
        await page.type('textarea[placeholder="Wpisz treść"]', notes[i]);
        const addNote = await page.waitForSelector('div >.btn.btn-small.btn-success.submit');
        await addNote?.click({ delay: 100 });
      }
    }
    console.log('Notes added');

    if (args.info.heating_type) {
      const ogrzew = await page.waitForSelector(
        'td[class="col-xs-8"]>a[class="editable editable-click editable-empty"]',
      );
      await ogrzew?.click({ delay: 600 });
      try {
        const ogrzewSelect = await page.waitForSelector('span[class="select2-selection select2-selection--single"]');
        await ogrzewSelect?.click({ delay: 100 });
        const heating =
          args.info.heating_type === Rodzaj_ogrzewania.Wlasna_kotlowina
            ? 1
            : args.info.heating_type === Rodzaj_ogrzewania.Prand
            ? 2
            : args.info.heating_type === Rodzaj_ogrzewania.Miejskie
            ? 3
            : 4;

        const heatingSelect = await page.waitForSelector(
          `span>span[class="select2-dropdown select2-dropdown--below"]>span[class="select2-results"]>ul>li:nth-last-child(${heating})`,
        );

        await heatingSelect?.click({ delay: 100 });
      } catch {
        return 'Field for heating not find';
      }

      const ok = await page.waitForSelector('div[class="form-group"]>div>div>button[class="btn blue editable-submit"]');
      await ok?.click({ delay: 30 });
    }
    console.log('rodzaj_ogrzewania added');

    if (args.info.internet_provider) {
      const internet = await page.waitForSelector(
        'td[class="col-xs-8"]>a[class="editable editable-click editable-empty"]',
      );
      await internet?.click({ delay: 30 });
      await page.type('input[class="form-control"]', args.info.internet_provider);
      const ok = await page.waitForSelector('div[class="form-group"]>div>div>button[class="btn blue editable-submit"]');
      await ok?.click({ delay: 30 });
    }

    //await browser.close();

    console.log('super');

    return 'Success!!!';
  })(input.arguments);
