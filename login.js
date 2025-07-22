const config = require('./config');

async function login(page) {
  await page.goto('https://market-qx.pro/en/sign-in/modal', { waitUntil: 'networkidle2' });

  // Wait for email input
  await page.waitForSelector('input[name="email"]', { visible: true });
  await page.type('input[name="email"]', config.email, { delay: 50 });

  await page.waitForSelector('input[name="password"]', { visible: true });
  await page.type('input[name="password"]', config.password, { delay: 50 });

  // Wait for and click "I agree" checkbox if available
  const checkbox = await page.$('input[type="checkbox"]');
  if (checkbox) {
    try {
      await checkbox.click();
    } catch (err) {
      console.warn('⚠️ Could not click checkbox:', err.message);
    }
  }

  // Wait for login button and click it safely
  const button = await page.waitForSelector('button[type="submit"]', { visible: true });
  try {
    await button.click();
  } catch (err) {
    console.error('❌ Could not click login button:', err.message);
    process.exit(1);
  }

  // Wait for navigation or dashboard element
  await page.waitForNavigation({ waitUntil: 'networkidle2' });

  console.log('✅ Logged into Quotex');
}

module.exports = login;
