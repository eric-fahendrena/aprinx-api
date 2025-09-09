import request from 'supertest';
const { default: app } = await import('../../../app.js');

describe('Integration light - notifications', () => {
  test('GET /api/notifications without auth returns 401', async () => {
    const res = await request(app).get('/api/notifications');
    expect(res.status).toBe(401);
  });
});
