import { FieldResolveInput } from 'stucco-js';
import { resolverFor } from '../zeus/index.js';
import puppeteer from 'puppeteer';
import path from 'path';

export const handler = async (input: FieldResolveInput) =>
  resolverFor('Mutation', 'Login', async (args) => {
    (async () => {
      const pathToExtension = path.join(process.cwd(), 'my-extension');
      const browser = await puppeteer.launch({
        headless: 'new',
        args: [`--disable-extensions-except=${pathToExtension}`, `--load-extension=${pathToExtension}`],
      });
      const backgroundPageTarget = await browser.waitForTarget((target) => target.type() === 'background_page');
      const backgroundPage = await backgroundPageTarget.page();
      // Test the background page as you would any other page.
      await browser.close();
      return true;
    })();
  })(input.arguments);
