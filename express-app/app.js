const express = require('express');
const app = express();
const adminRoutes = require('./routes/admin');
const userRoutes = require('./routes/user');

const path = require('path');

app.set('view engine', 'pug');
app.set('views', './views');

app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRoutes);
app.use(userRoutes);

app.use((req, res) => {
  res.status(404).render('404');
});

app.listen(3000, () => {
  console.log('listening on port 3000');
});
