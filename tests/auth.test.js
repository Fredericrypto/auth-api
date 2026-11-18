import request from 'supertest';
import app from '../server.js';

describe('Auth API Integration Tests', () => {
  const testUser = {
    nome: 'Test User',
    email: `test_${Date.now()}@example.com`,
    senha: 'StrongPassword123!'
  };

  let tokenToken = '';

  it('should register a new user successfully', async () => {
    const response = await request(app)
      .post('/register')
      .send(testUser);

    expect(response.status).toBe(201);
    expect(response.body.sucesso).toBe(true);
  });

  it('should authenticate the user and return a JWT token', async () => {
    const response = await request(app)
      .post('/login')
      .send({
        email: testUser.email,
        senha: testUser.senha
      });

    expect(response.status).toBe(200);
    expect(response.body.token).toBeDefined();
    tokenToken = response.body.token;
  });

  it('should access protected route with valid JWT token', async () => {
    const response = await request(app)
      .get('/perfil')
      .set('Authorization', `Bearer ${tokenToken}`);

    expect(response.status).toBe(200);
    expect(response.body.sucesso).toBe(true);
  });
});