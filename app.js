const express = require('express');
const session = require('express-session');
const passport = require('passport');
const bodyParser = require('body-parser');

const authRoutes = require('./routes/auth');
const inventoryRoutes = require('./routes/inventory');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: true,
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/auth', authRoutes);
app.use('/inventory', inventoryRoutes);

app.get('/login', (req, res) => {
  res.send('<form method="post" action="/auth/login"><input type="text" name="username"/><input type="password" name="password"/><button type="submit">Login</button></form>');
});

app.get('/register', (req, res) => {
  res.send('<form method="post" action="/auth/register"><input type="text" name="username"/><input type="password" name="password"/><button type="submit">Register</button></form>');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
