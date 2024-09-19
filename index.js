const express = require('express');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const MongoAccess = require('./src/infrastructure/database/mongoAccess');
const userRoutes = require('./src/routes/userRoutes');
const logger = require('./src/config/logger');
require('dotenv').config();
const app = express();
const PORT = 3000;
app.use(express.json());

const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: "Administración de Cuentas de Usuario",
      version: '1.0.0',
      description: 'El proyecto "Gestión de Usuarios" proporciona una solución para administrar el ciclo de vida de las cuentas de usuario. Incluye funcionalidades para crear, editar, eliminar y gestionar perfiles de usuario, así como asignar roles y permisos. La plataforma está diseñada para ser segura y fácil de usar, optimizando la administración y seguimiento de usuarios dentro del sistema.',
      contact: {
        name: 'Elias Morocho Ancalle',
        email: 'etx.elias.morocho@gmail.com',
      },
      servers: [
        {
          url: `http://localhost:${PORT}`,
          description: 'Servidor local',
        },
      ],
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ['./src/routes/*.js'],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocs));


app.use('/users', userRoutes);


MongoAccess().then(() => {
  app.listen(PORT, () => {
    logger.info(`Servidor corriendo en http://localhost:${PORT}`);
  });
}).catch((err) => {
  logger.error('Error al iniciar la aplicación:' + err);
});

