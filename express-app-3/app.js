const express = require('express');
const path = require('path');
const sequelize = require('./utility/database');
const errorController = require('./controllers/error');
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const Category = require('./models/category');
const Product = require('./models/product');
const User = require('./models/user');
const app = express();

app.set('view engine', 'pug');
app.set('views', './views');

app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404Page);

Product.belongsTo(Category, {
  foreignKey: {
    allowNull: false,
  },
});
Category.hasMany(Product);

sequelize
  //.sync({ force: true })
  .sync()
  .then(() => {
    User.findByPk(1).then((user) => {
      if (!user) {
        User.create({ name: 'ozancan', email: 'ozan@mail.com' });
      }
      return user;
    })
    .then(user)
    return Category.count().then((count) => {
      if (count === 0) {
        Category.bulkCreate([
          { name: 'Telefon', description: 'Telefon Kategorisi' },
          { name: 'Bilgisayar', description: 'Bilgisayar Kategorisi' },
          { name: 'Elektronik', description: 'Elektronik Kategorisi' },
        ]);
      }
    });
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(3000, () => {
  console.log('listening on port 3000');
});
