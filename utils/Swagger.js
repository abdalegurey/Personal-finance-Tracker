import swaggerJSDoc from 'swagger-jsdoc';
import dotenv from 'dotenv';

dotenv.config();
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Transaction Finance Manager API',
      version: '1.0.0',
      description: 'API documentation for our Transaction Finance manager backend'
    },
    servers: [
      {
        url:  'http://localhost:3000',
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      }
    },
    security: [
      {
        bearerAuth: []
      }
    ]
  },
  apis: ['./routes/*.js'] // Where your route files live
};

export const swaggerSpec = swaggerJSDoc(options);
