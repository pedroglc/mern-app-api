const Usuario = require('../models/usuario.model.js');
const jwt = require('jsonwebtoken');
const secret = 'sua_chave_secreta_aqui';

module.exports = {
  async index(req, res) {
    const user = await Usuario.find();
    res.json(user);
  },
  async Usuario_details(req, res) {
    const id = req.params.id;
    const user = await Usuario.findById({ _id: id });
    res.json(user);
  },
  async create(req, res) {
    const { nome_usuario, email_usuario, tipo_usuario, senha_usuario } =
      req.body;

    let data = {};

    let user = await Usuario.findOne({ email_usuario });
    if (!user) {
      //data = { nome_usuario, email_usuario, tipo_usuario, senha_usuario };
      user = await Usuario.create({
        nome_usuario,
        email_usuario,
        tipo_usuario,
        senha_usuario,
      });

      return res.status(200).json(user);
    } else {
      return res.status(400).json(user);
    }
  },
  async deleteUser(req, res) {
    const { _id } = req.params;
    const user = await Usuario.findByIdAndDelete({ _id });
    return res.json(user);
  },
  async updateUser(req, res) {
    const { _id, nome_usuario, email_usuario, tipo_usuario, senha_usuario } =
      req.body;
    const data = { nome_usuario, email_usuario, tipo_usuario, senha_usuario };
    const user = await Usuario.findOneAndUpdate({ _id }, data, { new: true });
    res.json(user);
  },
  async Login(req, res) {
    try {
      const { email, senha } = req.body;

      const user = await Usuario.findOne({
        email_usuario: email,
        tipo_usuario: 1,
      }).exec();

      if (!user) {
        return res.status(200).json({ status: 2, error: 'Email não confere' });
      }

      user.isCorrectPassword(senha, async (err, same) => {
        if (err) {
          console.log(err);
          return res
            .status(200)
            .json({ error: 'Erro no servidor, tente novamente' });
        }

        if (!same) {
          return res
            .status(200)
            .json({ status: 2, error: 'A senha não confere' });
        }

        const playload = { email };
        const token = jwt.sign(playload, secret, {
          expiresIn: '24h',
        });

        const { _id } = user;

        res.cookie('token', token, { httpOnly: true });
        res.status(200).json({
          status: 1,
          auth: true,
          token: token,
          id_Client: _id,
          user_name: user.nome_usuario,
        });
      });
    } catch (error) {
      console.error(error);
      res.status(200).json({ erro: 'Erro no servidor, tente novamente' });
    }
  },
  async checkToken(req, res) {
    const token =
      req.body.token ||
      req.query.token ||
      req.cookies.token ||
      req.headers['x-access-token'];
    if (!token) {
      res.json({ status: 401, msg: 'Não autorizado, token inexistente' });
    } else {
      jwt.verify(token, secret, function (err, decoded) {
        if (err) {
          res.json({
            status: 401,
            msg: 'Não autorizado, token inválido',
          });
        } else {
          res.json({ status: 200 });
        }
      });
    }
  },
  async destroyToken(req, res) {
    const token = req.headers.token;
    if (token) {
      res.cookie('token', null, { httpOnly: true });
    } else {
      res.status(401).send('Logout não autorizado');
    }
    res.send('Sessão finalizada com sucesso!');
  },
};
