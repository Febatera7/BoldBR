const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Users = require('../schema/Users');
const authConfig = require('../../config/auth');

class SessionController {
  async create(req, res) {
    const { email, senha } = req.body;

    const user = await Users.findOne({ email });

    if (!user) {
      return res.status(401).json({ mensagem: 'Usuário e/ou senha inválidos' });
    }

    if (!(await bcrypt.compare(senha, user.senha))) {
      return res.status(401).json({ mensagem: 'Usuário e/ou senha inválidos' });
    }

    const token = jwt.sign({ id: user.id }, authConfig.secret, {
      expiresIn: authConfig.expiresIn,
    });

    await user.updateOne({
      token,
      ultimo_login: new Date(),
    });

    const userUpdated = await Users.findOne({ token });

    return res.json({
      id: userUpdated.id,
      nome: userUpdated.nome,
      email: userUpdated.email,
      senha: userUpdated.senha,
      telefones: userUpdated.telefones,
      ultimo_login: userUpdated.ultimo_login,
      data_criacao: userUpdated.createdAt,
      data_atualizacao: userUpdated.updatedAt,
      token: userUpdated.token,
      });
  }
}

module.exports = new SessionController();
