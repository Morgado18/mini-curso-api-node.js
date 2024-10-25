


import express from "express"; // chama o módulo express
/* import conexao from "../infra/conexao"; */
const app = express() // instancia o express do módulo express
/* const port = 3000 // porta para rodar o projecto */

/* import conexao from "../infra/conexao.js"; */

import conexao from "../infra/conexao.js";

app.use(express.json()) // para o express ler o body de method post se houver

/* const selecoes= [
    {id: 1, selecao: "Angola", grupo: "G"},
    {id: 2, selecao: "Níger", grupo: "G"},
    {id: 3, selecao: "Brasil", grupo: "G"},
    {id: 4, selecao: "Sérvia", grupo: "G"},
] */

function getSelecao(id){ 
    return selecoes.filter(selecao => selecao.id == id) //pega todos os dados
}

function getIndexSelecao(id){ 
    return selecoes.findIndex(selecao => selecao.id == id) // pega apenas o id no array
}

// Rotas
/* app.get("/", function(req, res){ // requisicao e uma resposta
    res.send("Hello World, I am leraning Node.js!")
}) */

app.get("/selecoes", function(req, res){
    //res.status(200).send(selecoes)
    const sql = "SELECT * FROM selecoes"
    conexao.query(sql, (erro, selecoes) => {
        if(erro){
            console.log(erro)
        }else{
            res.status(200).send(selecoes)
        }
    })
})  

app.get("/selecoes/:id", function(req, res){
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


    //res.status(200).json(getSelecao(id_selecao))
})  

app.post("/selecoes", (req, res) => {
    //selecoes.push(req.body) // pegar apenas os dados do body enviado pelo user
    //res.status(201).send("Added with success!")
    const dados = req.body
    const sql = "INSERT INTO selecoes SET ?"
  //  res.send("ok")
  
  /* console.log("Dados recebidos:", req.body);  */
    conexao.query(sql, dados, (erro, resultado) => {
        if(erro){
            console.log(`Erro`+erro)
        }else{
            res.status(201).json(resultado)
        }
    })

    //console.log("Dados recebidos:", req.body); 
})

app.put("/selecoes/:id", function(req, res){
    let index_selecao = getIndexSelecao(req.params.id)
    selecoes[index_selecao].selecao = req.body.selecao
    selecoes[index_selecao].grupo   = req.body.grupo
    res.json(selecoes)
})

app.delete("/selecoes/:id", function(req, res){
    let id_selecao = getIndexSelecao(req.params.id)
    selecoes.splice(id_selecao, 1) // id e qnt de item a remover, remove um item de um array
    res.send(`Deleted with success, the selecao ${id_selecao}!`)
})

export default app

/* // escutar a porta
app.listen(port, function(){
    console.log(`Server rodando no endereço: http://localhost:${port}`)
})
  */