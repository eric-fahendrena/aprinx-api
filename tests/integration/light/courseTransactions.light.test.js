import request from 'supertest';
const { default: app } = await import('../../../app.js');

describe('Integration light - courseTransactions', () => {
  test('POST /api/course-transactions/add without auth returns 401', async () => {
    const res = await request(app).post('/api/course-transactions/add').send({});
    expect(res.status).toBe(401);
  });
});
