// Test setup: ensure test env and provide simple globals/mocks
process.env.NODE_ENV = 'test';
process.env.CLIENT_ORIGIN = 'http://localhost';
process.env.JWT_SECRET = 'testsecret';
// Avoid initializing real DB connections in tests by mocking pool if needed
// jest will mock modules per-test when required

// Extend jest timeout if CI is slow
// If you need to increase timeout, call jest.setTimeout(...) inside test files
