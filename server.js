const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');
const routes = require('./src/routes.js');

const app = express();
//import connectDatabase from './src/database/db.js';
const connectDatabase = require('./src/database/db.js');
const port = process.env.PORT || 5000;

connectDatabase()
  .then(() => {
    app.listen(port, () =>
      console.log('Servidor rodando e banco conectado na porta 5000')
    );
  })
  .catch((error) => console.log(error));

app.use(cors());

app.use(cookieParser());

app.use(express.json());

app.use(routes);
