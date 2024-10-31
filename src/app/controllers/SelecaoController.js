
/* import conexao from "../database/conexao.js"
 */

import SelecaoRepository from "../repositories/SelecaoRepository.js"

class SelecaoController{

    async index(req, res){ //para aguardar a resposta "função async" e usar o await
/*         const sql = "SELECT * FROM selecoes ORDER BY id DESC"
        conexao.query(sql, (erro, selecoes) => {
            if(erro){
                console.log(erro)
            }else{
                res.status(200).send(selecoes)
            }
        }) */
       const data = await SelecaoRepository.findAll();
       res.json(data)
    }

    async show(req, res){
        /* const id_selecao = req.params.id
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
         }) */
        const id = req.params.id
        const data = await SelecaoRepository.findById(id)
        res.json(data)
    }

    async store(req, res){
        const dados = req.body;
        const data = await SelecaoRepository.create(dados);
        res.json(data);
    }

    async update(req, res){
        const id_selecao = req.params.id
        const dados = req.body
        const data = await SelecaoRepository.update(dados, id_selecao)
        res.send(data)

    }

    async delete(req, res){
        const id = req.params.id
        const selecao =  await SelecaoRepository.delete((id))
        res.send(selecao)
    }

}

export default new SelecaoController(); // Cria e exporta uma instância