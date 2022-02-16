import { User } from "../../models/index.js";

class UserSeeder {
  static async seed() {
    await User.query().insert({
      name: "Francis",
      email: "a@a.com",
      password: "password",
    });
    await User.query().insert({
      name: "Bob",
      email: "bob@bob.com",
      password: "password",
    });
    await User.query().insert({
      name: "Sara",
      email: "sara@sara.com",
      password: "password",
    });
  }
}

export default UserSeeder;
