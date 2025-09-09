const { createFeedback } = await import('../../controllers/feedbacks.controller.js');

describe('Unit - feedback.createFeedback', () => {
  test('createFeedback is a function', () => {
    expect(typeof createFeedback).toBe('function');
  });
});
