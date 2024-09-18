// src/index.js
const express = require('express');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const MongoAccess = require('./infrastructure/database/mongoAccess');
const userRoutes = require('./routes/userRoutes');

const app = express();
const PORT = 3000;
app.use(express.json());
const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Mi API',
      version: '1.0.0',
      description: 'API de ejemplo usando Swagger y Node.js',
      contact: {
        name: 'Tu Nombre',
        email: 'tucorreo@example.com',
      },
      servers: [
        {
          url: `http://localhost:${PORT}`,
          description: 'Servidor local',
        },
      ],
    },
  },
  apis: ['./src/routes/*.js'],

};


const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

MongoAccess().then(() => {
  app.listen(PORT, () => {
    app.use('/users', userRoutes);
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
  });
}).catch((err) => {
  console.error('Error al iniciar la aplicación:', err);
});
