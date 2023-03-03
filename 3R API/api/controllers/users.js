const crypt = require("../libs/crypt/crypt");
const UserModel = require("../models/UserModel");
const { to } = require("../libs/to/to");

/**
 * It takes in a data object, checks if the username is already in use, if not, it creates a new user
 * with the data object and saves it to the database
 * @param data - the data to be used to create the new user
 * @returns A promise
 */
const registerUser = (data) => {
  return new Promise(async (resolve, reject) => {
    //request to check that the email to be used for the new user does not exist
    let { username, password, role, email } = data;

    let [err, result] = await to(
      UserModel.find({ $or: [{ username: username }, { email: email }] }).exec()
    );
    if (err) {
      reject(err);
    }
    if (result.length > 0) {
      reject("Username or email already in use");
    } else {
      let hashedPwd = crypt.hashPasswordSync(password);
      let newUser = new UserModel({
        email: email,
        username: username,
        password: hashedPwd,
        role: role,
        image: "",
      });
      newUser.save();
      resolve(result);
    }
  });
};

/**
 * GetUser returns a promise that resolves to a user object or rejects with an error.
 * @param userId - The userId of the user you want to get.
 * @returns A promise that resolves to a user object.
 */
const getUser = (userId) => {
  return new Promise(async (resolve, reject) => {
    let [err, result] = await to(UserModel.findOne({ userId: userId }).exec());
    if (err) {
      return reject(err);
    }
    resolve(result);
  });
};

/**
 * It takes a username as a parameter and returns a promise that resolves to the user object with that
 * username
 * @param username - The username of the user you want to get the user id from.
 * @returns A promise that resolves to the user object
 */
const getUserIdFromUserName = (username) => {
  //request to get the user id from the username
  return new Promise(async (resolve, reject) => {
    let [err, result] = await to(
      UserModel.findOne({ username: username }).exec()
    );
    if (err) {
      reject(err);
    } else if (result) {
      resolve(result);
    } else {
      reject("error");
    }
  });
};

/**
 * It takes a username and password, gets the user's password from the database, and then compares the
 * password to the one provided by the user
 * @param username - The username of the user
 * @param password - The password that the user entered
 * @returns A promise that resolves to a boolean value.
 */
const checkUserCredentials = (username, password) => {
  //request to check that the user credentials are correct
  return new Promise(async (resolve, reject) => {
    let [err, user] = await to(getUserIdFromUserName(username));
    if (!err || user) {
      crypt.comparePassword(password, user.password, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    } else {
      reject(err);
    }
  });
};



exports.registerUser = registerUser;
exports.checkUserCredentials = checkUserCredentials;
exports.getUserIdFromUserName = getUserIdFromUserName;
exports.getUser = getUser;
