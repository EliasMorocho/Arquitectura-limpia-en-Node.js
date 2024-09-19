const mongoose = require('mongoose');
const logger = require('../../config/logger');
const MongoAccess = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
    });
    logger.info('Conectado a MongoDB');
  } catch (error) {
    logger.error('Error al conectar a MongoDB:'+ error);
    throw error;
  }
};

module.exports = MongoAccess;


