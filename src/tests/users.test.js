const request = require('supertest');
const app = require('../modules/app.js');

describe('Users API', () => {
  test('PUT /api/users/:id - Debe actualizar un usuario', async () => {
    const res = await request(app)
      .put('/api/users/65a1d6f8e8d4b83d7a9f3c5a')
      .send({ first_name: 'NombreActualizado' });
    expect(res.statusCode).toBe(200);
  });
});