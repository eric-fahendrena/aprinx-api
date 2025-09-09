const { createDeletedCourse } = await import('../../controllers/deletedCourses.controller.js');

describe('Unit - deletedCourses.createDeletedCourse', () => {
  test('createDeletedCourse is a function', () => {
    expect(typeof createDeletedCourse).toBe('function');
  });
});
