const express = require('express');
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const config = require('./config/config').get(process.env.NODE_ENV);

const PORT = process.env.PORT || 3000;

mongoose.Promise = global.Promise;
mongoose.connect(config.DB);

const app = express();

app.use(bodyParser.json());
app.use(cookieParser());

app.listen(PORT, () => {
  console.log('Server is running');
})

