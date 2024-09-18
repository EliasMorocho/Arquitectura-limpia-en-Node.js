// src/index.js
const express = require('express');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const connectDB = require('./infrastructure/database/dbRepository');
const userRoutes = require('./routes/userRoutes');

const swaggerComponents = require('./swagger/user/components');
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
    ...swaggerComponents,
  },
  apis: ['./src/routes/*.js'], 

};


const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

connectDB().then(() => {
  app.listen(PORT, () => {
    app.use('/users', userRoutes);
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
  });
}).catch((err) => {
  console.error('Error al iniciar la aplicación:', err);
});
