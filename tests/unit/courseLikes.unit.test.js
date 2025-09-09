const { createCourseLike } = await import('../../controllers/courseLikes.controller.js');

describe('Unit - courseLikes.createCourseLike', () => {
  test('createCourseLike is a function', () => {
    expect(typeof createCourseLike).toBe('function');
  });
});
