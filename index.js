const puppeteer = require('puppeteer');
const login = require('./login');
const strategy = require('./strategy');
const trade = require('./trade');

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.setViewport({ width: 1366, height: 768 });

  await login(page);

  while (true) {
    const signal = await strategy(page);
    if (signal) {
      await trade(page, signal);
    } else {
      console.log('⏱️ No signal. Waiting...');
    }

    await new Promise(resolve => setTimeout(resolve, 5000));
  }
})();
