/* eslint-disable linebreak-style */
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const db = require('../models');

passport.use(
  new LocalStrategy(
    // Our user will sign in using an email, rather than a "username"
    {
      usernameField: 'email',
    },
    (email, password, done) => {
      // When a user tries to sign in this code runs
      db.User.findOne({
        where: {
          email,
        },
      })
        .then((dbUser) => {
          // If there's no user with the given email
          if (!dbUser) {
            console.log('user does not exist in db');
            return done(null, false, {
              message: 'Incorrect email.',
            });
          }
          // If there is a user with the given email,but the password the user gives us is incorrect
          if (!dbUser.validPassword(password)) {
            return done(null, false, {
              message: 'Incorrect password.',
            });
          }
          // If none of the above, return the user
          return done(null, dbUser);
        })
        .catch((err) => {
          console.log('user does not exist', err);
        });
      // eslint-disable-next-line comma-dangle
    }
    // eslint-disable-next-line comma-dangle
  )
);

// In order to help keep authentication state across HTTP requests,
// Sequelize needs to serialize and deserialize the user
// Just consider this part boilerplate needed to make it all work
passport.serializeUser((user, cb) => {
  cb(null, user);
});

passport.deserializeUser((obj, cb) => {
  cb(null, obj);
});

// Exporting our configured passport
module.exports = passport;
