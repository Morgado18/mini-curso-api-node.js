
import conexao from "../database/conexao.js"

class SelecaoRepository{

    create(){

    }

    findAll(){
        const sql = "SELECT * FROM selecoes ORDER BY id DESC"
        conexao.query(sql, (erro, selecoes) => {
            if(erro){
                console.log(erro)
            }else{
                return selecoes
            }
        })
    }

    findById(){

    }

    update(){

    }

    delete(){

    }

}

export default new SelecaoRepository()