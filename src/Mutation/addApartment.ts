import { FieldResolveInput } from 'stucco-js';
import { resolverFor, Rodzaj_najmu } from '../zeus/index.js';
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
    await page.type('input[name="estate_address"]', args.input.address);
    await page.type('input[name="estate_city"]', args.input.city);
    await page.type('input[name="estate_zip"]', args.input.zip || '');
    if (args.input.rental_type === Rodzaj_najmu.Wynajem_calosci) {
      try {
        // await page.type('div[id="estate_rental_type"]>input[value="1"]', '1');
        console.log('input');
        await page.waitForSelector('div[id="estate_rental_type"]');
        console.log('div finded');
        await page.evaluate(() => {
          const elements = [...document.querySelectorAll('label')];
          const targetElement = elements.find((e) => e.innerText == 'Wynajem');
          if (targetElement) targetElement.click();
        });

        //const change = await page.waitForXPath('//label[contains(text(), "Wynajem")]');
        //const change = await page.waitForSelector('div[name="estate_rental_type"]>input[value="1"]');
        //await change?.click({ delay: 100 });
        console.log('Wynajem_calosci added');
      } catch {
        console.log('Button Wynajem_calosci not find');
      }
    }
    await page.type('input[name="estate_access_code"]', args.input.intercomCode || '');
    await page.type('input[name="estate_code"]', args.input.apartment_id || '');
    if (args.input.ifOtherBankAccount) {
      await page.type('input[name="estate_account"]', args.input.ifOtherBankAccount);
    }
    const submit = await page.waitForSelector('div[class="col-md-12 text-right"]>button[class="btn green"]');
    await submit?.click({ delay: 1300 });
    console.log('Apartment added');
    try {
      await page.waitForSelector('input[placeholder="Dodaj tag"]');
    } catch {
      return 'Field for tags not find';
    }
    await page.type('input[placeholder="Dodaj tag"]', args.input.tags ? args.input.tags?.toString() + ',' : '');
    console.log('Tags added');

    const notes = args.input.notes;
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

    if (args.input.rodzaj_ogrzewania) {
      const ogrzew = await page.waitForSelector(
        'td[class="col-xs-8"]>a[class="editable editable-click editable-empty"]',
      );
      await ogrzew?.click({ delay: 600 });
      console.log('ogrzew select?');
      try {
        const but1 = await page.waitForSelector('span[class="select2-selection select2-selection--single"]');
        await but1?.click({ delay: 1000 });
        console.log('but1');
        await page.evaluate(() => {
          const elements = [...document.querySelectorAll('li')];
          const targetElement = elements.find((e) => e.innerText == 'Gaz');
          if (targetElement) targetElement.click(), targetElement.click();
          console.log('but2');
        });
        //const but2 = await page.waitForSelector('li[contains(text(), "Gaz")]');
        //await but2?.click({ delay: 1000 });
      } catch {
        return 'Field for notes not find';
      }
      await page.type('select[class="form-control hit-type select2-hidden-accessible"]', '3');
      const ok = await page.waitForSelector('button[class="btn blue editable-submit"]');
      await ok?.click({ delay: 1000 });
    }
    console.log('rodzaj_ogrzewania');

    const internet = await page.waitForSelector(
      'td[class="col-xs-8"]>a[class="editable editable-click editable-empty"]',
    );
    await internet?.click({ delay: 600 });
    //await browser.close();

    console.log('super');

    return ' super';
  })(input.arguments);
