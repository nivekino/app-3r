const bcrypt = require('bcrypt');

/**
 * HashPassword is a function that takes a plain text password and a callback function as arguments,
 * and then uses bcrypt to hash the password and pass the result to the callback function.
 * @param plainTextPwd - The password to be hashed.
 * @param done - This is a callback function that will be called when the hashing is complete.
 */
const hashPassword = (plainTextPwd, done) => {
    bcrypt.hash(plainTextPwd, 10, done);
};

/**
 * It takes a plain text password and returns a hashed password
 * @param plainTextPwd - The password to be hashed.
 * @returns A hash of the plain text password.
 */
const hashPasswordSync = (plainTextPwd) => {
    return bcrypt.hashSync(plainTextPwd, 10);
};

/**
 * ComparePassword is a function that takes a plain text password and a hashed password and
 * returns a boolean value indicating whether the plain text password matches the hashed password.
 * @param plainPassword - The password that the user entered in the login form.
 * @param hashPassword - The hashed password from the database
 * @param done - This is a callback function that is called when the password comparison is complete.
 */
const comparePassword = (plainPassword, hashPassword, done) => {
    bcrypt.compare(plainPassword, hashPassword, done);
};

exports.hashPassword = hashPassword;
exports.hashPasswordSync = hashPasswordSync;
exports.comparePassword = comparePassword;
