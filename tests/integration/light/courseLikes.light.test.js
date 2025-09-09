import request from 'supertest';
const { default: app } = await import('../../../app.js');

describe('Integration light - courseLikes', () => {
  test('GET /api/course-likes/:cId without auth returns 401', async () => {
    const res = await request(app).get('/api/course-likes/1');
    expect(res.status).toBe(401);
  });
});
