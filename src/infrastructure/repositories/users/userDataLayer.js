const mongoose = require('mongoose');
const UserRepository = require("../../../domain/repositories/Users/userRepository");
const UserModel = require('../../database/users/dbuserRepository')
const User = require('../../../domain/entities/User')

const { ERROR_MESSAGES, SUCCESS_MESSAGES, STATES } = require('../../constants');
class userDataLayer extends UserRepository {

  async findById(id) {
    try {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new Error('ID inválido');
      }

      const user = await UserModel.findById(id).exec();

      if (!user) {
        throw new Error('Usuario no encontrado');
      }

      return user;
    } catch (error) {
      throw new Error(`Error al buscar usuario por ID: ${error.message}`);
    }
  }

  async findByUsername(email) {
    const userDocument = await UserModel.findOne({ Email: email });
    if (userDocument) {
      return new User(userDocument);
    }
    return null;
  }

  async createUser(userData) {
    const user = new UserModel({
      ...userData,
      State: STATES.ACTIVE
    });
    return await user.save();
  }

  async updateUser(userId, updatedData) {
    const allowedUpdates = {
      Name: updatedData.Name,
      Role: updatedData.Role
    };
    Object.keys(allowedUpdates).forEach(key => {
      if (allowedUpdates[key] === undefined) {
        delete allowedUpdates[key];
      }
    });
    try {
      const updateResult = await UserModel.updateOne({ _id: userId }, { $set: allowedUpdates });

      if (updateResult.matchedCount === 0) {
        return { success: false, message: ERROR_MESSAGES.NOT_FOUND };
      }

      if (updateResult.modifiedCount > 0) {
        return { success: true, message: SUCCESS_MESSAGES.SUCCESS };
      }

      return { success: true, message: SUCCESS_MESSAGES.NO_CHANGES };
    } catch (error) {
      return { success: false, message: error.message };
    }
  }
  async deleted(userId) {
    const updateResult = await UserModel.updateOne({ _id: userId }, {
      $set: {
        State: STATES.INACTIVE,
      }
    });

    if (updateResult.matchedCount === 0) {
      return { success: false, message: ERROR_MESSAGES.NOT_FOUND };
    }

    if (updateResult.modifiedCount > 0) {
      return { success: true, message: SUCCESS_MESSAGES.SUCCESS };
    }

    return { success: true, message: SUCCESS_MESSAGES.NO_CHANGES };
  } catch(error) {
    return { success: false, message: error.message };
  }
}


module.exports = userDataLayer;
