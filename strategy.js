async function strategy(page) {
  // ⏳ This will later check Keltner + RSI + Volume
  const rand = Math.random();
  if (rand > 0.7) return 'call';
  if (rand < 0.3) return 'put';
  return null;
}

module.exports = strategy;
