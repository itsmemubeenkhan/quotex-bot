const config = require('./config');

async function trade(page, direction) {
  console.log(`📤 Placing ${direction.toUpperCase()} trade...`);

  // Target only the Investment input (2nd input)
  await page.waitForSelector('.section-deal__investment input.input-control__input', { visible: true });
  const amountInput = await page.$('.section-deal__investment input.input-control__input');

  // Clear the current value
  await amountInput.click({ clickCount: 3 });
  await page.keyboard.press('Backspace');
  await amountInput.type(config.amount.toString(), { delay: 100 });

  // Wait for trade buttons
  await page.waitForSelector('button.call-btn.section-deal__button', { visible: true });
  await page.waitForSelector('button.put-btn.section-deal__button', { visible: true });

  // Click based on direction
  if (direction === 'call') {
    await page.click('button.call-btn.section-deal__button');
  } else if (direction === 'put') {
    await page.click('button.put-btn.section-deal__button');
  } else {
    console.log('❌ Invalid direction');
    return;
  }

  console.log(`✅ Trade placed: ${direction.toUpperCase()} for $${config.amount}`);
  await new Promise(resolve => setTimeout(resolve, config.duration * 60 * 1000));
}

module.exports = trade;
