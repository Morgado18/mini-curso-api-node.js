
import express from "express"; // chama o módulo express
const app = express() // instancia o express do módulo express

import SelecaoController from "./app/controllers/SelecaoController.js";

app.use(express.json()) // para o express ler o body de method post se houver

import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url); // pega e converte o caminho da dir actual
const __dirname = path.dirname(__filename); // obtém o diretório onde o arquivo atual (app.js) está localizado

app.use(express.static(path.join(__dirname, 'views')));

app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

/* ROTAS */
app.get("/selecoes", SelecaoController.index)  
app.get("/selecoes/:id", SelecaoController.show)  
app.post("/selecoes", SelecaoController.store)
app.put("/selecoes/:id", SelecaoController.update)
app.delete("/selecoes/:id", SelecaoController.delete)

export default app
