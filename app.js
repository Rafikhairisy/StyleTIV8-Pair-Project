const express = require('express');
const app = express();
const port = 1810;
const router = require('./routers/router');
const nodemailer = require('nodemailer');
const session = require('express-session');

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));

app.use(session({
  secret: 'Kepoo deh',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false, samesite: true }
}));

app.use(router);

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
