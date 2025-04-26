import swaggerJSDoc from 'swagger-jsdoc';

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'API de Users',
    version: '1.0.0',
    description: 'Endpoints para gestión de usuarios',
  },
  servers: [{ url: 'http://localhost:8080/api' }],
};

const options = {
  swaggerDefinition,
  apis: ['./src/modules/users/user.router.js'],
};

export const swaggerSpec = swaggerJSDoc(options);