// src/domain/models/User.js
class User {
  constructor({ Email, Name, Password }) {
    this.Email = Email;
    this.Name = Name;
    this.Password = Password;
  }
}

module.exports = User;
