


import express from "express"; // chama o módulo express
const app = express() // instancia o express do módulo express
/* const port = 3000 // porta para rodar o projecto */

/* import conexao from "../infra/conexao.js"; */

app.use(express.json()) // para o express ler o body de method post se houver

const selecoes= [
    {id: 1, selecao: "Angola", grupo: "G"},
    {id: 2, selecao: "Níger", grupo: "G"},
    {id: 3, selecao: "Brasil", grupo: "G"},
    {id: 4, selecao: "Sérvia", grupo: "G"},
]

function getSelecao(id){ 
    return selecoes.filter(selecao => selecao.id == id) //pega todos os dados
}

function getIndexSelecao(id){ 
    return selecoes.findIndex(selecao => selecao.id == id) // pega apenas o id no array
}

// Rotas
app.get("/", function(req, res){ // requisicao e uma resposta
    res.send("Hello World, I am leraning Node.js!")
})

app.get("/selecoes", function(req, res){
    res.status(200).send(selecoes)
})  

app.get("/selecoes/:id", function(req, res){
    let id_selecao = req.params.id
    res.status(200).json(getSelecao(id_selecao))
})  

app.post("/selecoes", (req, res) => {
    selecoes.push(req.body) // pegar apenas os dados do body enviado pelo user
    res.status(201).send("Added with success!")
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