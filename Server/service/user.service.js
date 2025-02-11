const userModel = require("../model/user.model");

const createUser = async ({ firstname, lastname, email, password }) => {
  if (!firstname || !lastname || !email) {
    throw new Error("all fields are required");
  }

  const user = userModel.create({
    fullname: {
      firstname,
      lastname,
    },
    email,
    password,
  });

  return user;
};

module.exports = createUser;
