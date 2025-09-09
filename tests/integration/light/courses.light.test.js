import { jest } from '@jest/globals';

// Mock course model to avoid DB access in light integration
await jest.unstable_mockModule('../../../models/course.model.js', () => ({
  addCourse: async (cData) => ({ id: 1, ...cData }),
  deleteCourse: async (courseId) => ({ id: courseId }),
  selectAllCourses: async (offset, limit) => [],
  selectCoursesByKeyword: async (keyword, offset, limit) => [],
  selectCoursePrice: async (courseId) => 100,
  selectCourse: async (cId) => null,
  selectRandCourse: async () => null,
  addVideo: async (vData) => ({ id: 1, ...vData }),
  selectVideos: async (cId) => [],
  selectVideo: async (cId, vId) => null,
  selectCoursesByUserAccess: async (uId, offset, limit) => [],
}));

const { default: app } = await import('../../../app.js');
import request from 'supertest';

describe('Integration light - courses', () => {
  test('GET /api/courses returns 200 with mocked model', async () => {
    const res = await request(app).get('/api/courses');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});
