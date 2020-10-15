import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import bcrypt from 'bcryptjs';
import authConfig from '../../config/auth';
import Users from '../schema/Users';

class UserController {
  async create(req, res) {
    const { nome, email, senha, telefones } = req.body;

    const emailExist = await Users.findOne({ email });

    if (emailExist) {
      return res.status(400).json({ mensagem: 'E-mail já existente.' });
    }

    const id = await crypto.randomBytes(4).toString('HEX');

    const token = await jwt.sign({ id }, authConfig.secret, {
      expiresIn: authConfig.expiresIn,
    });

    const password = await bcrypt.hash(senha, 8);

    const user = await Users.create({
      id,
      nome,
      email,
      senha: password,
      telefones,
      ultimo_login: new Date(),
      token,
    });

    return res.status(201).json({
      id: user.id,
      nome: user.nome,
      email: user.email,
      senha: user.senha,
      telefones: user.telefones,
      ultimo_login: user.ultimo_login,
      data_criacao: user.createdAt,
      data_atualizacao: user.updatedAt,
      token: user.token,
    });
  }

  async read(req, res) {
    const user = await Users.findOne({ id: req.userId });

    return res.status(200).json({
      id: user.id,
      nome: user.nome,
      email: user.email,
      senha: user.senha,
      telefones: user.telefones,
      ultimo_login: user.ultimo_login,
      data_criacao: user.createdAt,
      data_atualizacao: user.updatedAt,
      token: user.token,
    });
  }
}

export default new UserController();
