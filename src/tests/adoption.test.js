import request from 'supertest';
import app from '../modules/app.js';
import { connectDB, disconnectDB } from '../config/mongoDb.config.js';
import { userModel } from '../modules/users/user.model.js';
import { petModel } from '../modules/pets/pet.model.js';
import { adoptionModel } from '../modules/adoptions/adoption.model.js';

describe('Adoption API Endpoints', () => {
  let testUser;
  let testPet;
  let testAdoption;
  let authToken;

  beforeAll(async () => {
    await connectDB();
    
    testUser = await userModel.create({
      first_name: 'Test',
      last_name: 'User',
      email: 'test@adoption.com',
      password: '$2b$10$examplehashedpassword', 
      role: 'admin'
    });

    testPet = await petModel.create({
      name: 'Fluffy',
      type: 'cat',
      age: 3
    });

    const loginRes = await request(app)
      .post('/api/auth/login')
      .send({ email: 'test@adoption.com', password: 'coder123' });
    
    authToken = loginRes.body.token;

    testAdoption = await adoptionModel.create({
      pet: testPet._id,
      user: testUser._id,
      status: 'pending'
    });
  });

  afterAll(async () => {
    await adoptionModel.deleteMany();
    await petModel.deleteMany();
    await userModel.deleteMany();
    await disconnectDB();
  });

  describe('POST /api/adoptions', () => {
    it('debería crear una nueva adopción', async () => {
      const res = await request(app)
        .post('/api/adoptions')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          petId: testPet._id,
          userId: testUser._id
        });
      
      expect(res.statusCode).toEqual(201);
      expect(res.body).toHaveProperty('_id');
      expect(res.body.status).toBe('pending');
    });

    it('debería fallar sin token de autenticación', async () => {
      const res = await request(app)
        .post('/api/adoptions')
        .send({ petId: testPet._id, userId: testUser._id });
      
      expect(res.statusCode).toEqual(401);
    });
  });

  describe('GET /api/adoptions', () => {
    it('debería listar todas las adopciones', async () => {
      const res = await request(app)
        .get('/api/adoptions')
        .set('Authorization', `Bearer ${authToken}`);
      
      expect(res.statusCode).toEqual(200);
      expect(Array.isArray(res.body)).toBe(true);
      expect(res.body.length).toBeGreaterThan(0);
    });
  });

  describe('GET /api/adoptions/:id', () => {
    it('debería obtener una adopción por ID', async () => {
      const res = await request(app)
        .get(`/api/adoptions/${testAdoption._id}`)
        .set('Authorization', `Bearer ${authToken}`);
      
      expect(res.statusCode).toEqual(200);
      expect(res.body._id).toEqual(testAdoption._id.toString());
    });

    it('debería fallar con ID inexistente', async () => {
      const fakeId = '65a1d6f8e8d4b83d7a9f3c5a';
      const res = await request(app)
        .get(`/api/adoptions/${fakeId}`)
        .set('Authorization', `Bearer ${authToken}`);
      
      expect(res.statusCode).toEqual(404);
    });
  });

  describe('PUT /api/adoptions/:id', () => {
    it('debería actualizar una adopción', async () => {
      const res = await request(app)
        .put(`/api/adoptions/${testAdoption._id}`)
        .set('Authorization', `Bearer ${authToken}`)
        .send({ status: 'approved' });
      
      expect(res.statusCode).toEqual(200);
      expect(res.body.status).toBe('approved');
    });
  });

  describe('DELETE /api/adoptions/:id', () => {
    it('debería eliminar una adopción', async () => {
      const res = await request(app)
        .delete(`/api/adoptions/${testAdoption._id}`)
        .set('Authorization', `Bearer ${authToken}`);
      
      expect(res.statusCode).toEqual(200);
      
      const deletedAdoption = await adoptionModel.findById(testAdoption._id);
      expect(deletedAdoption).toBeNull();
    });
  });
});
