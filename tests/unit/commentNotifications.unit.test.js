const { getUnseenNotifications } = await import('../../controllers/commentNotifications.controller.js');

describe('Unit - commentNotifications.getUnseenNotifications', () => {
  test('getUnseenNotifications is a function', () => {
    expect(typeof getUnseenNotifications).toBe('function');
  });
});
