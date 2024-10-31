
import conexao from "../database/conexao.js"

class SelecaoRepository{

    create(selecao){
        const sql = "INSERT INTO selecoes SET ?"
        return new Promise((resolve, reject)=>{
            conexao.query(sql, selecao, (erro, resultado) => {
                if(erro){
                    return reject(`Erro`+erro)
                }else{
                    const resultado_formated = JSON.parse(JSON.stringify(resultado));
                    return resolve(resultado_formated)
                }
            })
        })
    }

    findAll(selecao){
        const sql = "SELECT * FROM selecoes ORDER BY id DESC"
        return new Promise((resolve, reject) => { 
            conexao.query(sql, (erro, selecoes) => {
                if(erro){
                    console.log(erro)
                }else{
                    const dados = JSON.parse(JSON.stringify(selecoes)) // converte em string/objcto
                    return resolve(dados)
                }
            })
        })
    }

    findById(id){
        const sql = `SELECT * FROM selecoes WHERE id=?`
        return new Promise((resolve, reject)=>{
            conexao.query(sql, id, (erro, selecao_returned) => {
                if(erro){
                 console.log(`Erro`+erro)
                }else if (selecao_returned && selecao_returned.length > 0) {
                    const selecao_converted = JSON.parse(JSON.stringify(selecao_returned));
                    return resolve(selecao_converted); // Envia o resultado da seleção
                } else {
                    return reject("Nenhum resultado encontrado"); // Caso não haja resultados
                }
             })
        })
        /* conexao.query(sql, id_selecao, (erro, selecao_returned) => {
            if(erro){
             console.log(`Erro`+erro)
            }else if (selecao_returned && selecao_returned.length > 0) {
                const selecao = selecao_returned[0];
                res.status(200).send(selecao); // Envia o resultado da seleção
            } else {
                res.status(404).send("Nenhum resultado encontrado"); // Caso não haja resultados
            }
         }) */
    }

    update(dados, id_selecao){
        const sql = "UPDATE selecoes SET ? WHERE id=?"
        return new Promise((resolve, reject)=>{
            conexao.query(sql, [dados, id_selecao], (erro, resultado) =>{
                if(erro){
                    return reject(`Erro`+erro)
                }else{
                    return resolve(`Updated! ${id_selecao}`)
                }
            })
        })
    }

    delete(id){
        const sql = "DELETE FROM selecoes WHERE id=?"
        return new Promise((resolve, reject)=>{
            conexao.query(sql, id, (erro, selecao)=>{
                if(erro) {return reject(`Houve um erro...`)}else{
                    return resolve('Eliminado com sucesso!')
                }
            })
        })
    }

}

export default new SelecaoRepository()