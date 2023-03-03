const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const passport = require('passport');
const jwt_decode = require("jwt-decode");


/**
 * When a user tries to access a protected route, check if the JWT is valid.
 */
const init = () => {
  const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('jwt'),
    secretOrKey: process.env.KEY,
  };

  passport.use(
    new JwtStrategy(opts, (decoded, done) => {
      return done(null, decoded);
    })
  );
};

/**
 * ProtectWithJwt is a function that returns a function that returns a function that returns a
 * function.
 * @param req - The request object
 * @param res - The response object
 * @param next - The next middleware function in the stack.
 * @returns A function that takes in req, res, next and returns a function that takes in req, res,
 * next.
 */
const protectWithJwt = (req, res, next) => {
  return passport.authenticate('jwt', { session: false })(req, res, next);
};


/**
 * It checks if the user is an admin by checking the role in the decoded token
 * @param req - The request object.
 * @param res - The response object
 * @param next - This is a function that is called when the middleware is complete.
 * @returns A function that takes in three parameters: req, res, and next.
 */
const isAdmin = (req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
    const decoded = jwt_decode(token);
    if (decoded.role == 1) {
      return next();
    } else {
      return res.status(401).json({
        message: "You are not authorized to perform this action",
      });
    }
  } else {
    return res.status(401).json({
      message: "You are not authorized to perform this action",
    });
  }
};

exports.init = init;
exports.protectWithJwt = protectWithJwt;
exports.isAdmin = isAdmin;
