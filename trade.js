const config = require('./config');

async function trade(page, direction) {
  console.log(`📤 Placing ${direction.toUpperCase()} trade...`);

  await page.waitForSelector('input.input-control__input', { visible: true });
  const amountInput = await page.$('input.input-control__input');
  await amountInput.click({ clickCount: 3 });
  await amountInput.type(config.amount.toString());

  await page.waitForSelector('button.call-btn', { visible: true });
  await page.waitForSelector('button.put-btn', { visible: true });

  if (direction === 'call') {
    await page.click('button.call-btn');
  } else if (direction === 'put') {
    await page.click('button.put-btn');
  } else {
    console.log('❌ Invalid direction');
    return;
  }

  console.log(`✅ Trade placed: ${direction.toUpperCase()} for $${config.amount}`);
  await new Promise(resolve => setTimeout(resolve, config.duration * 60 * 1000));
}

module.exports = trade;
