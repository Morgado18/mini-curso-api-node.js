
/* import conexao from "../database/conexao.js"
 */

import SelecaoRepository from "../repositories/SelecaoRepository.js"

class SelecaoController{

    index(req, res){
        const sql = "SELECT * FROM selecoes ORDER BY id DESC"
        conexao.query(sql, (erro, selecoes) => {
            if(erro){
                console.log(erro)
            }else{
                res.status(200).send(selecoes)
            }
        })
      /*  const data = SelecaoRepository.findAll();
       res.json(data) */
    }

    show(req, res){
        const id_selecao = req.params.id
        const sql = `SELECT * FROM selecoes WHERE id=?`
        conexao.query(sql, id_selecao, (erro, selecao_returned) => {
            if(erro){
             console.log(`Erro`+erro)
            }else if (selecao_returned && selecao_returned.length > 0) {
                const selecao = selecao_returned[0];
                res.status(200).send(selecao); // Envia o resultado da seleção
            } else {
                res.status(404).send("Nenhum resultado encontrado"); // Caso não haja resultados
            }
         })
    }

    store(req, res){
        const dados = req.body
        const sql = "INSERT INTO selecoes SET ?"
        conexao.query(sql, dados, (erro, resultado) => {
            if(erro){
                console.log(`Erro`+erro)
            }else{
                res.status(201).json(resultado)
            }
        })
    }

    update(req, res){
        const id_selecao = req.params.id
        const dados = req.body
        const sql = "UPDATE selecoes SET ? WHERE id=?"
        conexao.query(sql, [dados, id_selecao], (erro, resultado) =>{
            if(erro){
                console.log(`Erro`+erro)
            }else{
                res.status(200).send(`Updated! ${id_selecao}`)
            }
        })
    }

    delete(req, res){
        const id_selecao = req.params.id
        const sql = "DELETE FROM selecoes WHERE id=?"
        conexao.query(sql, id_selecao, (erro, resultado) =>{
            if(erro){
                console.log(`Erro`+erro)
            }else{
                res.status(200).send(`Deleted! ${id_selecao}`)
            }
        })
    }

}

export default new SelecaoController(); // Cria e exporta uma instância