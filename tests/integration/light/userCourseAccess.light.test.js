import request from 'supertest';
const { default: app } = await import('../../../app.js');

describe('Integration light - userCourseAccess', () => {
  test('GET /api/user-course-access/:courseId without auth returns 401', async () => {
    const res = await request(app).get('/api/user-course-access/1');
    expect(res.status).toBe(401);
  });
});
