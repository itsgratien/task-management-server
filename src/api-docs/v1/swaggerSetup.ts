import swaggerJsDoc, { SwaggerDefinition } from 'swagger-jsdoc';
import path from 'path';
import swaggerUI from 'swagger-ui-express';

const definition: SwaggerDefinition = {
  info: {
    title: 'Payment Gateway',
    description: 'API Documentation For Urubuto Payment Gateway',
    version: '1'
  },
  servers: [{ url: 'http://localhost:4000/api/v1' }],
  openapi: '3.0.0'
};

const swaggerOptions = {
  swaggerDefinition: definition,
  apis: [path.join(__dirname, './*.yaml')]
};

const swaggerSpec = swaggerJsDoc(swaggerOptions);

const swaggerSetup = swaggerUI.setup(swaggerSpec);

export default swaggerSetup;
