//criar modulo para carregar o modulo do express
const express = require("express");

//importa cors de segurança
const cors = require("cors")
//passando a rota externa
const routes = require("./routes")

//variavel contendo a aplicação
const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);  


app.listen(3333);



/***
 * Rotas / Recursos  
 */

/**Metodos http
 * 
 * Get: buscar/listar uma informação no backend (quando se entra ou atualiza uma pagina    )
 * Post: criar uma informação no backend
 * Put: alterar uma informação no backend
 * Delete : deletar uma informação no backend 
 */


 /**
  * Tipos de parametro:
  * 
  * Query params: parametros nomeados enviados na rota apos "?" (filtros, paginação)
  * Route params: patrametros utilizados para identificar recursos, dps no https apos a raiz ele so vai considerar o q vier depois
  * um especifico   
  * 
  * Request params: Utilizado para criar ou alterar recursos
  */

//Para query
/*app.get("/users", (request, response) => {
    
    //chama a requisição do tipo query
    const params = request.query;

    console.log(params)
    
    //retorna resposta da requisição
    return response.json({
        event: "Treinamento",
        aluno: "Ivo Mozart"
    })
});
*/

//Para route

/*app.get("/users/:id", (request, response) => {
    
    //chama a requisição do tipo query
    const params = request.params;

    console.log(params)
    
    //retorna resposta da requisição
    return response.json({
        event: "Treinamento",
        aluno: "Ivo Mozart"
    })
});
*/

//rota ou metodo request
/*app.post("/users", (request, response) => {
    
    //chama a requisição do tipo query
    const body = request.body;

    console.log(body)
    
    //retorna resposta da requisição
    return response.json({
        event: "Treinamento",
        aluno: "Eren Yeager"
    })
});
*/