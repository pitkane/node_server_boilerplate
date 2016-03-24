const User = require('../models/user');
const jwt = require('jwt-simple');
const config = require('../config');

function tokenForUser(user) {
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timestamp }, config.secret);
}

exports.signup = function(req, res, next) {
  // res.send({ success: true });
  // console.log(req.body)

  const bodyEmail = req.body.email;
  const bodyPassword = req.body.password;

  if(!bodyEmail || !bodyPassword) {
    return res.status(422).send({ error: 'You must provide email and password' });
  }
  // res.send({ success: true });

  // see if a user with the given email exists
  User.findOne({ email: bodyEmail }, function(err, existingUser) {
    if(err) {
      return next(err);
    }

    // if a user with email does exist, return an error
    if(existingUser) {
      return res.status(422).send({ error: 'Email is in use' });
    }

    // if a user with email does not exist, create and save user record
    const user = new User({
      email: bodyEmail,
      password: bodyPassword
    });

    user.save(function(err) {
      if(err) {
        return next(err);
      }
      // Respond to request indicating the user was created
      res.json({ token: tokenForUser(user) });
    });

  });

}

exports.signin = function(req, res, next) {
  // User has already had their email and password auth'd
  // We just need to give them a token
  res.send({ token: tokenForUser(req.user) });
}
