const express = require('express');
const routes = express.Router();

const Usuario = require('./controllers/usuarios.controllers.js');
const Produto = require('./controllers/produtos.controllers.js');

//Rotas de usuarios
routes.get('/api/usuarios', Usuario.index);
routes.get('/api/usuarios.details/:id', Usuario.Usuario_details);
routes.post('/api/usuarios', Usuario.create);
routes.delete('/api/usuarios/:_id', Usuario.deleteUser);
routes.put('/api/usuarios', Usuario.updateUser);
routes.post('/api/usuarios/login', Usuario.Login);
routes.get('/api/usuarios/checktoken', Usuario.checkToken);
routes.get('/api/usuarios/destroytoken', Usuario.destroyToken);

//Rotas de produtos
routes.get('/api/produtos', Produto.index);
routes.get('/api/produtos/:id', Produto.Produto_details);
routes.post('/api/produtos', Produto.create);
routes.delete('/api/produtos/:_id', Produto.deleteProduct);
routes.put('/api/produtos', Produto.updateProduct);

module.exports = routes;
