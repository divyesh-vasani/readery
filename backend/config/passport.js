const passport = require("passport");
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require("../models/User");

const opts = {
  jwtFromRequest: ExtractJwt.fromExtractors([
    (req) => req.cookies.jwtToken // Access the JWT token from cookies
  ]),
  secretOrKey: process.env.JWT_SECRET
};

passport.use(new JwtStrategy(opts, async (jwt_payload, done) => {
  try {
      const user = await User.findById(jwt_payload.userId)
      if (user) return done(null, user);
      return done(null, false);
  } catch (err) {
      return done(err, false);
  }
}));
