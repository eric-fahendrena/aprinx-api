import { jest } from '@jest/globals';

// Mock modules before importing the app so controller uses the mocked implementations
await jest.unstable_mockModule('@aws-sdk/s3-request-presigner', () => ({
  getSignedUrl: async () => 'https://signed.example/test-url',
}));

await jest.unstable_mockModule('nanoid', () => ({
  nanoid: (n) => 'fixedid',
}));

await jest.unstable_mockModule('@aws-sdk/client-s3', () => ({
  S3Client: function S3Client() {},
  PutObjectCommand: class PutObjectCommand {},
}));

const { default: app } = await import('../../app.js');
import request from 'supertest';

describe('Uploads route (presigned url) with mocks', () => {
  beforeAll(() => {
    // Provide predictable template for file public URL
    process.env.S3_PUBLIC_URL_TEMPLATE = 'https://s3.test/{bucket}/{key}/{projectId}';
  });

  test('GET /api/upload/presigned-url returns signedUrl and fileUrl (with projectId)', async () => {
    const res = await request(app).get('/api/upload/presigned-url').query({ key: 'avatar.png', projectId: 'proj1' });
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('signedUrl', 'https://signed.example/test-url');
    // keyUnique = `aprix-${nanoid(8)}_${key}` -> aprix-fixedid_avatar.png
    expect(res.body).toHaveProperty('fileUrl', 'https://s3.test/aprix-storage/aprix-fixedid_avatar.png/proj1');
  });

  test('GET /api/upload/presigned-url returns signedUrl and fileUrl (without projectId)', async () => {
    const res = await request(app).get('/api/upload/presigned-url').query({ key: 'file.jpg' });
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('signedUrl', 'https://signed.example/test-url');
    expect(res.body).toHaveProperty('fileUrl', 'https://s3.test/aprix-storage/aprix-fixedid_file.jpg/');
  });
});
