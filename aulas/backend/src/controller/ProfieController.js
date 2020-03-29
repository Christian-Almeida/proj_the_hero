/**
 * Rota de perfis dos casos
 */

 const conexao = require("../database/connection");

 //pegar o id da tabela ong e ver se ela esta autorizada ou se encontra no banco
 module.exports = {
     async index(request, response){
         const ong_id = request.headers.authorization;

         const incidents = await conexao("incidents")
         .where("ong_id",ong_id)
         .select("*");

         return response.json(incidents)
     }
 }