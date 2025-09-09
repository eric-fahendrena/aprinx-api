const { addAccess } = await import('../../controllers/userCourseAccess.controller.js');

describe('Unit - userCourseAccess.addAccess', () => {
  test('addAccess is a function', () => {
    expect(typeof addAccess).toBe('function');
  });
});
