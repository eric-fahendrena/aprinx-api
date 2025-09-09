const { createSubscriptionTransaction } = await import('../../controllers/subscriptionTransactions.controller.js');

describe('Unit - subscriptionTransactions.createSubscriptionTransaction', () => {
  test('createSubscriptionTransaction is a function', () => {
    expect(typeof createSubscriptionTransaction).toBe('function');
  });
});
