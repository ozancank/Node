const express = require('express');
const app = express();

const errorController = require('./controllers/error');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

const sequelize = require('./utility/database');

const path = require('path');

app.set('view engine', 'pug');
app.set('views', './views');

app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRoutes);
app.use(shopRoutes);

sequelize
  .authenticate()
  .then(() => {
    console.log('BAŞARILI');
  })
  .catch((err) => {
    console.log(err);
  });

app.use(errorController.get404Page);

app.listen(3000, () => {
  console.log('listening on port 3000');
});
