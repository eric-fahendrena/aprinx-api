const { createCourse } = await import('../../controllers/courses.controller.js');

describe('Unit - courses.createCourse', () => {
  test('createCourse is a function', () => {
    expect(typeof createCourse).toBe('function');
  });
});
