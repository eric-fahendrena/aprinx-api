import { jest } from '@jest/globals';

// Mock feedback model to avoid DB access in light integration
await jest.unstable_mockModule('../../../models/feedback.model.js', () => ({
  insertFeedback: async (data) => ({ id: 1, ...data }),
  selectAllFeedbacks: async () => [],
}));

const { default: app } = await import('../../../app.js');
import request from 'supertest';

describe('Integration light - feedback', () => {
  test('POST /api/feedback/add creates feedback (mocked)', async () => {
    const res = await request(app).post('/api/feedback/add').send({ authorId: 1, message: 'test' });
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('id', 1);
  });
});
