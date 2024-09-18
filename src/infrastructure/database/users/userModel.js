const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  Email: { type: String, required: true },
  Name: { type: String, required: true },
  Password: { type: String, required: true },
  Role: { type: String, required: true },
  State: { type: String },
});

const UserModel = mongoose.model('Users', userSchema, 'Users');

module.exports = UserModel;
