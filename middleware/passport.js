const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const pool = require('../db');

passport.use(new LocalStrategy(
  async (username, password, done) => {
    try {
      const user = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
      if (user.rows.length === 0) {
        return done(null, false, { message: 'Invalid credentials' });
      }
      const validPassword = await bcrypt.compare(password, user.rows[0].password);
      if (!validPassword) {
        return done(null, false, { message: 'Invalid credentials' });
      }
      return done(null, user.rows[0]);
    } catch (error) {
      return done(error);
    }
  }
));

module.exports = passport;