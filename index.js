const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./config/keys');
require('./models/user');
require('./services/passport');


mongoose.connect(keys.mongoURI);

const app = express();

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
  })
);

app.use(passport.initialize());
app.use(passport.session());

// app.get('/',(req, res) => {
//   res.send({'message': 'This project is still on-going >_<'});
// });

require('./routes/authRoutes')(app);
const PORT = process.env.PORT || 5000; //using heroku or localhost
app.listen(PORT);

//http://localhost:5000/
