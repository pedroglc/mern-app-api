const Produto = require('../models/produto.model');

module.exports = {
  async index(req, res) {
    const product = await Produto.find();
    res.json(product);
  },
  async Produto_details(req, res) {
    const id = req.params.id;
    const product = await Produto.findById({ _id: id });
    res.json(product);
  },
  async create(req, res) {
    const { nome_produto, descricao_produto, preco_produto, qtd_produto } =
      req.body;

    let data = {};

    let product = await Produto.findOne({ nome_produto });
    if (!product) {
      //data = { nome_usuario, email_usuario, tipo_usuario, senha_usuario };
      product = await Produto.create({
        nome_produto,
        descricao_produto,
        preco_produto,
        qtd_produto,
      });

      return res.status(200).json(product);
    } else {
      return res.status(500).json(product);
    }
  },
  async deleteProduct(req, res) {
    const { _id } = req.params;
    const product = await Produto.findByIdAndDelete({ _id });
    return res.json(product);
  },
  async updateProduct(req, res) {
    const { _id, nome_produto, descricao_produto, preco_produto, qtd_produto } =
      req.body;
    const data = {
      nome_produto,
      descricao_produto,
      preco_produto,
      qtd_produto,
    };
    const product = await Produto.findOneAndUpdate({ _id }, data, {
      new: true,
    });
    res.json(product);
  },
};
