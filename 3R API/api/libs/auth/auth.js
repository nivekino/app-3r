const userController = require("../../controllers/users");
const jwt = require("jsonwebtoken");
const { to } = require("../to/to");

/**
 * It receives a request from the user, validates the data, checks the user's credentials, and returns
 * a token if everything is correct
 * @param req - The request object.
 * @param res - The response object.
 * @returns a message indicating that the user has logged in successfully and the token generated from
 * the user's data.
 */
const loginUser = async (req, res) => {
  //validation to check that no field is empty
  if (!req.body) {
    return res.status(400).json({ message: "Missing data" });
  } else if (!req.body.username || !req.body.password) {
    return res.status(400).json({ message: "Missing data" });
  }
  //asynchronous request to check the data entered by the user
  let [err, resp] = await to(
    userController.checkUserCredentials(req.body.username, req.body.password)
  );
  //if there is an error, a message will be returned indicating the error.
  if (err || !resp) {
    return res.status(400).json({ message: "Invalid credentials" });
  }
  //if everything is ok, we proceed to obtain the user id and generate a token from the user's data.
  let user = await userController.getUserIdFromUserName(req.body.username);

  const token = jwt.sign({ userId: user._id, role: user.role }, process.env.KEY);
  res.status(200).json({ message: "User login successful", token: token });
};

/**
 * It receives a request, validates the data, and then sends it to the userController.registerUser
 * function
 * @param req - The request object. This contains information about the HTTP request that raised the
 * event.
 * @param res - the response object
 * @returns a function that is being exported.
 */
const createUser = async (req, res) => {
  //validation to check that no field is empty
  //console.log(req.body)
  if (!req.body) {
    return res.status(400).json({ message: "Missing data" });
  } else if (!req.body.username || !req.body.password || !req.body.email) {
    return res.status(400).json({ message: "Missing data" });
  }
  //asynchronous request to register user
  let [err, resp] = await to(userController.registerUser(req.body));

  if (err || !resp) {
    return res.status(401).json({ message: err });
  }
  //if everything is ok, we proceed to obtain the user id and generate a token from the user's data.
  res.status(200).json({ message: "User created!" });
};

exports.loginUser = loginUser;
exports.createUser = createUser;
