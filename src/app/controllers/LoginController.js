
import conexao from "../database/conexao.js";

import bcrypt from 'bcrypt';

class LoginController{

    auth(req, res) {
        const { email, password } = req.body;
        const sql = "SELECT * FROM users WHERE email = ? AND password = ?";
        conexao.query(sql, [email, password], (erro, resultado) => {
          if (erro) {
            res.status(500).send('Houve um erro...');
          } else if (resultado.length > 0) {
            res.status(200).send(resultado);
          } else {
            res.status(404).send('Email ou senha incorretos.');
          }
        });
    }

    async register(req, res) {
      const { email, password, name } = req.body;
      const sql = "SELECT * FROM users WHERE email = ?";

      const password_crypt = await bcrypt.hash(password, 10);

      conexao.query(sql, email, (erro, resultado) => {
        if (erro) {
          res.status(500).send('Houve um erro...');
        } else if (resultado.length > 0) {
          res.status(200).send('Email já cadastrado!');
        } else {
          const store = "INSERT INTO users (email,password,name) VALUES (?,?,?)";
          conexao.query(store, [email, password_crypt, name], (erro, resultado) => {
            if (erro) {
              res.status(500).send('Houve um erro...');
            }else {
              res.status(200).send('Conta criada com sucesso!');
            }
          });
        }
      });
  }

}

export default new LoginController();