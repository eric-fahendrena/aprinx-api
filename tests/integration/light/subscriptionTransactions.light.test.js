import request from 'supertest';
const { default: app } = await import('../../../app.js');

describe('Integration light - subscriptionTransactions', () => {
  test('POST /api/subscription-transactions/add without auth should return 401 or 403 (requires auth)', async () => {
    const res = await request(app).post('/api/subscription-transactions/add').send({});
    // Route requires authentication and role checks; expect unauthorized (401) or forbidden (403)
    expect([401,403]).toContain(res.status);
  });
});
