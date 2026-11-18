import swaggerJSDoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Auth API - Documentação',
      version: '1.0.0',
      description: 'API de autenticação modularizada com Node.js, Express, Drizzle ORM, Zod, Argon2 e JWT.',
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Servidor de Desenvolvimento',
      },
    ],
    components: {
      securitySchemes: {
        BearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: 'Insira o token JWT gerado no login no formato: Bearer <seu_token>',
        },
      },
    },
  },
  apis: ['./src/routes/*.js'], // Procura as anotações diretamente nos arquivos de rotas
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;