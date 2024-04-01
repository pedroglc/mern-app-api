const mongoose = require('mongoose');

async function connectDatabase() {
  await mongoose.connect('mongodb://127.0.0.1:27017/curso-mern');
}

module.exports = connectDatabase;
