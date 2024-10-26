


import express from "express"; // chama o módulo express
/* import conexao from "../infra/conexao"; */
const app = express() // instancia o express do módulo express
/* const port = 3000 // porta para rodar o projecto */

/* import conexao from "../infra/conexao.js"; */




import conexao from "../infra/conexao.js";

app.use(express.json()) // para o express ler o body de method post se houver

import path from 'path';
import { fileURLToPath } from 'url';

// Necessário para resolver o __dirname com módulos ESM
const __filename = fileURLToPath(import.meta.url); // pega e converte o caminho da dir actual
const __dirname = path.dirname(__filename); // obtém o diretório onde o arquivo atual (app.js) está localizado

app.use(express.static(path.join(__dirname, 'views')));

app.use(express.urlencoded({ extended: true }))

/* const selecoes= [
    {id: 1, selecao: "Angola", grupo: "G"},
    {id: 2, selecao: "Níger", grupo: "G"},
    {id: 3, selecao: "Brasil", grupo: "G"},
    {id: 4, selecao: "Sérvia", grupo: "G"},
] */

/* function getSelecao(id){ 
    return selecoes.filter(selecao => selecao.id == id) //pega todos os dados
}

function getIndexSelecao(id){ 
    return selecoes.findIndex(selecao => selecao.id == id) // pega apenas o id no array
} */

// Rotas
/* app.get("/", function(req, res){ // requisicao e uma resposta
    res.send("Hello World, I am leraning Node.js!")
}) */



// Rota para servir o index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

    /* get all */
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


/* get one */
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

/* create */
app.post("/selecoes", (req, res) => {
    const dados = req.body
    const sql = "INSERT INTO selecoes SET ?"
  /* console.log("Dados recebidos:", req.body);  */
    conexao.query(sql, dados, (erro, resultado) => {
        if(erro){
            console.log(`Erro`+erro)
        }else{
            res.status(201).json(resultado)
        }
    })
})

/* update */
app.put("/selecoes/:id", function(req, res){
    /* let index_selecao = getIndexSelecao(req.params.id)
    selecoes[index_selecao].selecao = req.body.selecao
    selecoes[index_selecao].grupo   = req.body.grupo
    res.json(selecoes) */
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
})

/* delete */
app.delete("/selecoes/:id", function(req, res){
    /* const id_selecao = getIndexSelecao(req.params.id) */
    const id_selecao = req.params.id
    /* selecoes.splice(id_selecao, 1) // id e qnt de item a remover, remove um item de um array
    res.send(`Deleted with success, the selecao ${id_selecao}!`) */
    const sql = "DELETE FROM selecoes WHERE id=?"
    conexao.query(sql, id_selecao, (erro, resultado) =>{
        if(erro){
            console.log(`Erro`+erro)
        }else{
            res.status(200).send(`Deleted! ${id_selecao}`)
        }
    })
})

export default app

/* // escutar a porta
app.listen(port, function(){
    console.log(`Server rodando no endereço: http://localhost:${port}`)
})
  */