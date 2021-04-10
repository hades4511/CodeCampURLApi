require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoConnect = require('./util/database').MongoConnect;

const app = express();
const port = process.env.PORT || 3000;

const homeRoutes = require('./routes/home');
const urlRoutes = require('./routes/url');

app.use(express.urlencoded({
    extended: true
  })
);
app.use(cors());
app.use('/public', express.static(`${process.cwd()}/public`));

app.use('/api/shorturl', urlRoutes);
app.use(homeRoutes);

mongoConnect(() => {
  app.listen(port, function() {
    console.log(`Listening on port ${port}`);
  });
});

