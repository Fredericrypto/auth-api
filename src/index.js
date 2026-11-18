import app from '../server.js';
import logger from './config/logger.js';

// Start the server only after everything is configured
const PORT = process.nano || 3000;
app.listen(3000, () => {
  logger.info('🚀 Servidor rodando com sucesso na porta 3000');
});