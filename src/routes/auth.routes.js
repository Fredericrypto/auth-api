import { Router } from 'express';
import { registrar, login, perfil } from '../controllers/auth.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import { rateLimit } from 'express-rate-limit';

const router = Router();

// Limiter restrito para rotas de autenticação (proteção contra brute-force)
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 15,
  skipSuccessfulRequests: true,
  message: {
    erro: "Muitas tentativas de acesso a partir desse IP. Tente novamente após 15 minutos."
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Rotas públicas e protegidas
/**
 * @swagger
 * /register:
 *   post:
 *     summary: Registra um novo usuário
 *     tags: [Autenticação]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nome
 *               - email
 *               - senha
 *             properties:
 *               nome:
 *                 type: string
 *                 example: Felipe Silva
 *               email:
 *                 type: string
 *                 example: felipe@example.com
 *               senha:
 *                 type: string
 *                 example: StrongPassword123!
 *     responses:
 *       201:
 *         description: Usuário cadastrado com sucesso
 *       400:
 *         description: Dados inválidos ou erro no cadastro
 */
router.post('/register', authLimiter, registrar);

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Autentica um usuário e retorna o token JWT
 *     tags: [Autenticação]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - senha
 *             properties:
 *               email:
 *                 type: string
 *                 example: felipe@example.com
 *               senha:
 *                 type: string
 *                 example: StrongPassword123!
 *     responses:
 *       200:
 *         description: Login autorizado com sucesso
 *       401:
 *         description: Credenciais inválidas
 */
router.post('/login', authLimiter, login);

/**
 * @swagger
 * /perfil:
 *   get:
 *     summary: Retorna os dados do usuário logado (Rota protegida)
 *     tags: [Usuário]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Dados do usuário retornados com sucesso
 *       401:
 *         description: Token ausente ou inválido
 */
router.get('/perfil', authMiddleware, perfil);

export default router;
