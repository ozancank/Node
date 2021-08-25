const express = require('express');
const path = require('path');
const mongoConnect = require('./utility/database');
const errorController = require('./controllers/error');
// const adminRoutes = require('./routes/admin');
// const userRoutes = require('./routes/shop');

const app = express();
app.set('view engine', 'pug');
app.set('views', './views');

app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// app.use('/admin', adminRoutes);
// app.use(userRoutes);

app.use(errorController.get404Page);

mongoConnect((client) => {
  app.listen(3000);
  console.log(client);
});
