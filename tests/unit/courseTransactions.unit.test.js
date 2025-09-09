const { addTransaction } = await import('../../controllers/courseTransactions.controller.js');

describe('Unit - courseTransactions.addTransaction', () => {
  test('addTransaction is a function', () => {
    expect(typeof addTransaction).toBe('function');
  });
});
