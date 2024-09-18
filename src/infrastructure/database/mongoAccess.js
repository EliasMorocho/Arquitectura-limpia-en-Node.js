const mongoose = require('mongoose');

const MongoAccess = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/Morocho', {
    });
    console.log('Conectado a MongoDB');
  } catch (error) {
    console.error('Error al conectar a MongoDB:', error);
    throw error;
  }
};

module.exports = MongoAccess;


