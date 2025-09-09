import request from 'supertest';
const { default: app } = await import('../../../app.js');

describe('Integration light - deletedCourses', () => {
  test('POST /api/deleted-courses/add without auth returns 401', async () => {
    const res = await request(app).post('/api/deleted-courses/add').send({});
    expect(res.status).toBe(401);
  });
});
