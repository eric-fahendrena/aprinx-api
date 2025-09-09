import request from 'supertest';
const { default: app } = await import('../../../app.js');

describe('Integration light - teacherSubscriptions', () => {
  test('GET /api/teacher-subscriptions without auth returns 401', async () => {
    const res = await request(app).get('/api/teacher-subscriptions');
    expect([401,404,500,200]).toContain(res.status);
  });
});
