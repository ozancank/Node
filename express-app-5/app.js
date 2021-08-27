const express = require('express');
const path = require('path');
const mongoose = require('mongoose');

const passwd = require('./passwd');
const User = require('./models/user');
const errorController = require('./controllers/error');
const adminRoutes = require('./routes/admin');
const userRoutes = require('./routes/shop');

const app = express();
app.set('view engine', 'pug');
app.set('views', './views');

app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  User.findOne({name:'ozancan'})
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => {
      console.log(err);
    });
});

app.use('/admin', adminRoutes);
app.use(userRoutes);

app.use(errorController.get404Page);

mongoose
  .connect(
    `mongodb+srv://ozancan1:${passwd}@cluster0.afkna.mongodb.net/node-app-orm?retryWrites=true&w=majority`
  )
  .then(() => {
    console.log('connected to mongodb');
    User.findOne({ name: 'ozancan' })
      .then((user) => {
        if (!user) {
          user = new User({
            name: 'ozancan',
            email: 'ozan@mail.com',
            cart: { items: [] },
          });
          return user.save();
        }
        return user;
      })
      .then(() => {
        app.listen(3000);
      })
      .catch((err) => {
        console.log(err);
      });
  });
