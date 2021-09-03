const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const mongoDbStore = require('connect-mongodb-session')(session);
const csurf = require('csurf');

const passwd = require('./passwd');
const User = require('./models/user');
const errorController = require('./controllers/error');
const adminRoutes = require('./routes/admin');
const userRoutes = require('./routes/shop');
const accountRoutes = require('./routes/account');

const app = express();
app.set('view engine', 'pug');
app.set('views', './views');

const ConnectionString = `mongodb+srv://ozancan1:${passwd.mongoDbAtlas}@cluster0.afkna.mongodb.net/node-app-orm?retryWrites=true&w=majority`;
const store = new mongoDbStore({
  uri: ConnectionString,
  collection: 'mySessions',
});

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
  session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 3600000,
    },
    store: store,
  })
);
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  if (!req.session.user) {
    return next();
  }

  User.findById(req.session.user._id)
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => console.log(err));
});
app.use(csurf());

app.use('/admin', adminRoutes);
app.use(userRoutes);
app.use(accountRoutes);

app.use(errorController.get404Page);

mongoose
  .connect(ConnectionString)
  .then(() => {
    console.log('connected to mongodb');
    app.listen(3000);
  })
  .catch((err) => console.log(err));
