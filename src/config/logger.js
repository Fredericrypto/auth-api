import winston from 'winston';

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    winston.format.errors({ stack: true }),
    winston.format.json()
  ),
  defaultMeta: { service: 'auth-api' },
  transports: [
    // Escreve todos os logs com nível 'error' ou inferior em 'error.log'
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
    // Escreve todos os logs em 'combined.log'
    new winston.transports.File({ filename: 'logs/combined.log' }),
  ],
});

// Se não estamos em produção, também mandamos logs coloridos para o console do terminal
if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.simple()
    ),
  }));
}

export default logger;