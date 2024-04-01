const mongoose = require('mongoose');

async function connectDatabase() {
  //await mongoose.connect('mongodb://127.0.0.1:27017/curso-mern');
  await mongoose.connect(
    //'mongodb+srv://pedrocelestino01:rFYnsppetv6Chmnh@cluster0.w5s5i9i.mongodb.net/DESCREVER O BANCO DE DADOS?retryWrites=true&w=majority&appName=Cluster0'
    'mongodb+srv://pedrocelestino01:rFYnsppetv6Chmnh@cluster0.w5s5i9i.mongodb.net/mern?retryWrites=true&w=majority'
  );
}

module.exports = connectDatabase;
