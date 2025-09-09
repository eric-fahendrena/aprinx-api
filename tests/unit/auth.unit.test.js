import { jest } from '@jest/globals';

// Import the function as ESM module
const { generateToken } = await import('../../controllers/auth.controller.js');

describe('Unit - auth.generateToken', () => {
  beforeAll(() => {
    process.env.JWT_SECRET = 'unittestsecret';
  });

  test('generateToken returns a string token with payload claims', () => {
    const token = generateToken({ id: 42, role: 'user' });
    expect(typeof token).toBe('string');
    // Basic structure: header.payload.signature (3 parts)
    expect(token.split('.').length).toBe(3);
  });
});
