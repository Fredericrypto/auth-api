import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import { rateLimit } from 'express-rate-limit';
import logger from './src/config/logger.js';
import authRoutes from './src/routes/auth.routes.js';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './src/config/swagger.js';

const app = express();

// General limit for the rest of the API (light abuse / DoS protection)
const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit of 100 requests per IP on the general API
  message: {
    erro: "Muitas requisições feitas a partir desse IP, por favor tente novamente mais tarde."
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Apply the general limiter to every route in the API
app.use(globalLimiter);

// Apply Helmet to harden the HTTP security headers
app.use(helmet());

// SECURE CORS CONFIGURATION
const CORS_ERROR_MESSAGE = 'Bloqueado pela política de CORS';
const origensPermitidas = ['http://localhost:3000', 'http://localhost:5173'];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    if (origensPermitidas.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error(CORS_ERROR_MESSAGE));
    }
  },
  credentials: true,
}));

app.use(express.json());

// Rota da documentação Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Registra as rotas da aplicação
app.use(authRoutes);

// Global error handler
app.use((err, req, res, next) => {
  if (err.message === CORS_ERROR_MESSAGE) {
    logger.warn(`Tentativa de acesso de origem bloqueada por CORS: ${req.headers.origin || 'Origem desconhecida'}`);
    return res.status(403).json({ sucesso: false, erro: 'Origem não permitida' });
  }

  logger.error(`Erro interno no servidor: ${err.message}`, { stack: err.stack });
  return res.status(500).json({ sucesso: false, erro: 'Erro interno' });
});

const PORT = 3000;

// O servidor só sobe se NÃO estivermos rodando no ambiente de testes do Jest
if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    logger.info(`🚀 Servidor rodando com sucesso na porta ${PORT}`);
  });
}

export default app;