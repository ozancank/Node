const express = require('express');
const path = require('path');
const mongoConnect = require('./utility/database').mongoConnect;
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
  User.findByName('ozancan')
    .then((user) => {
      req.user = new User(user.name, user.email, user._id);
      next();
    })
    .catch((err) => {
      console.log(err);
    });
});

app.use('/admin', adminRoutes);
app.use(userRoutes);

app.use(errorController.get404Page);

mongoConnect(() => {
  User.findByName('ozancan')
    .then((user) => {
      if (!user) {
        user = new User('ozancan', 'ozan@mail.com');
        return user.save();
      }
      return user;
    })
    .then((user) => {
      console.log(user);
      app.listen(3000);
    })
    .catch((err) => {
      console.log(err);
    });
});
