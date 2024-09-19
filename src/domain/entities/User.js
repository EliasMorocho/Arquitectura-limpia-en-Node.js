class User {
  constructor({ Email, Name, Role, State, Password, _id }) {
    this.Email = Email;
    this.Name = Name;
    this.Role = Role;
    this.State = State;
    this.Password = Password;
    this.Id = _id
  }
}

module.exports = User;
