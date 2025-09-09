const { getTeacherSubscription } = await import('../../controllers/teacherSubscriptions.controller.js');

describe('Unit - teacherSubscriptions.getTeacherSubscription', () => {
  test('getTeacherSubscription is a function', () => {
    expect(typeof getTeacherSubscription).toBe('function');
  });
});
