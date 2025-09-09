import { jest } from '@jest/globals';
const { getProfile } = await import('../../controllers/users.controller.js');

describe('Unit - users.getProfile', () => {
  test('getProfile returns function', () => {
    expect(typeof getProfile).toBe('function');
  });
});
