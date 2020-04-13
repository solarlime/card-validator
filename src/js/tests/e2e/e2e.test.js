import puppeteer from 'puppeteer';

jest.setTimeout(30000);
describe('E2E', () => {
  let browser = null;
  let page = null;
  const url = 'http://localhost:9000';
  beforeAll(async () => {
    browser = await puppeteer.launch(
      // {
      //   headless: false,
      //   slowMo: 100,
      //   devtools: true,
      // },
    );
    page = await browser.newPage();
  });
  afterAll(async () => {
    await browser.close();
  });
  describe('Tests', () => {
    test('Wrong card. Enter', async () => {
      await page.goto(url);
      const form = await page.$('[id=form]');
      const input = await form.$('[id=input]');
      await input.type('5469370010432874');
      await input.press('Enter');
      await page.waitFor(() => document.querySelector('p.answer').innerText === 'This card is invalid');
    });
    test('Right card. Button', async () => {
      const form = await page.$('[id=form]');
      const input = await form.$('[id=input]');
      // 3 clicks select everything in the input
      await input.click({ clickCount: 3 });
      await input.type('5189010004509395');
      const button = await form.$('button[class=button]');
      button.click();
      await page.waitFor(() => document.querySelector('p.answer').innerText === 'This card is valid');
    });
    test('Payment system', async () => {
      await page.goto(url);
      const form = await page.$('[id=form]');
      const input = await form.$('[id=input]');
      await input.type('5189010004509395');
      await input.press('Enter');
      await page.waitForSelector('.card-container .card-active');
    });
    test('Right card. Button', async () => {
      const form = await page.$('[id=form]');
      const input = await form.$('[id=input]');
      // 3 clicks select everything in the input
      await input.click({ clickCount: 3 });
      await input.type('123qwe!@#');
      const button = await form.$('button[class=button]');
      button.click();
      await page.waitFor(() => document.querySelector('p.answer').innerText === 'Incorrect input');
    });
  });
});
