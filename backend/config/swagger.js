import swaggerJsdoc from 'swagger-jsdoc';
import path from 'path';

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Minha API',
      version: '1.0.0',
      description: 'Documentação da API',
    },
  },
  apis: [path.resolve('./routes/userRoutes.js'), path.resolve('./routes/speciesRoutes.js')],
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);

export default swaggerDocs;
