
import SelecaoRepository from "../repositories/SelecaoRepository.js"

class SelecaoController{

    async index(req, res){ //para aguardar a resposta "função async" e usar o await
       const data = await SelecaoRepository.findAll();
       res.json(data)
    }

    async show(req, res){
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