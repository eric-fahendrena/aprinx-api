import request from 'supertest';
const { default: app } = await import('../../../app.js');

describe('Integration light - commentNotifications', () => {
  test('GET /api/comment-notifications/get-unseen-notifications without auth returns 401', async () => {
    const res = await request(app).get('/api/comment-notifications/get-unseen-notifications');
    expect(res.status).toBe(401);
  });
});
