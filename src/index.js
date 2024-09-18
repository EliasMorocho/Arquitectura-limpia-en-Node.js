// src/index.js
const express = require('express');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const connectDB = require('./infrastructure/database/users/dbuserRepository');
const authController = require('./interfaces/controllers/users/authController');

const app = express();
const PORT = 3000;


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
  apis: ['./src/interfaces/controllers/users/*.js'], 
};


const swaggerDocs = swaggerJsDoc(swaggerOptions);


app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use(express.json());

console.log(authController)
app.post('/login', authController.login);


connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
  });
}).catch((err) => {
  console.error('Error al iniciar la aplicación:', err);
});
