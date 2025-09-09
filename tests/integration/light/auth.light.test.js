import request from 'supertest';
const { default: app } = await import('../../../app.js');

describe('Integration (light) - auth routes', () => {
  test('GET /api/auth/get-token returns cookie value', async () => {
    const res = await request(app).get('/api/auth/get-token').set('Cookie', ['jwt_token=lighttest']);
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('jwt_token', 'lighttest');
  });

  test('GET /api/auth/logout redirects to client origin', async () => {
    // Use agent to simulate session cookie
    const agent = request.agent(app);
    const res = await agent.get('/api/auth/logout');
    // logout uses req.session.destroy and then res.redirect(process.env.CLIENT_ORIGIN)
    // If CLIENT_ORIGIN is set in tests setup to http://localhost, expect 302/301
    expect([301,302,303,307,308]).toContain(res.status);
  });
});
