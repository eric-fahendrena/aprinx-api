const { getAllNotifications } = await import('../../controllers/notifications.controller.js');

describe('Unit - notifications.getAllNotifications', () => {
  test('getAllNotifications is a function', () => {
    expect(typeof getAllNotifications).toBe('function');
  });
});
