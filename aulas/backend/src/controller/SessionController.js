const conexao = require("../database/connection")

module.exports = {
    async criarSessao(request, response){
        const {id} = request.body

        const ong = await conexao("ongs")
        .where("id", id)
        .select("name")
        .first();

        if(!ong){
            return response.status(400).json({error:"No Ong found with this id"})
        }

        return response.json(ong)
    }
}