
const Authentication = require('./controllers/authentication');
const passportService = require('./services/passport');
const passport = require('passport');

// session false == no cookieees
const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', { session: false });

module.exports = function(app) {
/*  app.get('/', function(req, res, next) {
    res.send(['waterbottle', 'phone', 'paper']);
  }); */
  app.post('/signup', Authentication.signup);
  app.get('/', requireAuth, function(req, res) {
    res.send({ hi: 'there' });
  });
  app.post('/signin', requireSignin, Authentication.signin);
}


// GET, POST, UPDATE, DELETE
// req, res, next

// req:
// res: Respond to user
// next: some error handling
