
import app from "./src/app.js"

const PORT = process.env.PORT || 3001 // para usar a porta default do node-js ou a 3001

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
    /* console.log(`Server rodando no endereço: http://localhost:${PORT}`) */
    console.log(`Server rodando no endereço: http://192.168.150.213:${PORT}`)
})