import request from 'supertest';
const { default: app } = await import('../../../app.js');

// We'll mock user model per-test if needed; for now check unauth behavior
describe('Integration light - users', () => {
  test('GET /api/users/me without auth should return 401', async () => {
    const res = await request(app).get('/api/users/me');
    expect(res.status).toBe(401);
  });
});
