const bcrypt = require('bcryptjs');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const { User } = require('../models');

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const user = await User.findOne({ where: { username } });
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      const isValid = await bcrypt.compare(password, user.password);
      if (!isValid) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  })
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findByPk(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});

const register = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).send('Username and password are required');
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({ username, password: hashedPassword });
    res.redirect('/login.html');
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).send('Internal server error');
  }
};

const login = (req, res) => {
  res.redirect('/inventory.html');
};

const logout = (req, res) => {
  req.logout();
  res.redirect('/login.html');
};

module.exports = {
  register,
  login,
  logout,
};
