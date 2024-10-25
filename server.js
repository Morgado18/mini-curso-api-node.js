
import app from "./src/app.js"

const PORT = 3001

/* import conexao from "./infra/conexao.js" */

/* conexao.connect((error)=>{
    if(error){
        console.log(error)
    }else{
        console.log('Conexão realizada com sucesso!')
        // escutar a PORTa
    }
}) */
 
    app.listen(PORT, function(){
        console.log(`Server rodando no endereço: http://localhost:${PORT}`)
    })