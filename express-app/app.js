const express = require('express');
const app = express();
const admin = require('./routes/admin');
const userRoutes = require('./routes/user');

const path = require('path');

app.set('view engine', 'pug');
app.set('views', './views');

app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', admin.routes);
app.use(userRoutes);

app.use((req, res) => {
  res.status(404).render('404', { title: 'Not Found' });
});

app.listen(3000, () => {
  console.log('listening on port 3000');
});