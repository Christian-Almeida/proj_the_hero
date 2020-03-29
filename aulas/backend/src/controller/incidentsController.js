/**
 * Importar a conexão com o banco 
 */

const conexao = require("../database/connection")

module.exports = {
    async index(request, response) {
        const {page = 1} = request.query;

        const [count] = await conexao("incidents").count()
        console.log(count);

        const incidents = await conexao("incidents")
        .join("ongs","ongs.id","=","incidents.ong_id")
        .limit(5)
        .offset((page - 1) *5)
        .select([
            "incidents.*",
            "ongs.name",
            "ongs.email",
            "ongs.whatsapp",
            "ongs.city",
            "ongs.uf"
        ]);

    response.header("X-Total-Count", count["count(*)"])
        return response.json(incidents)
    },

    async criaRequisicao(request, response) {
        const {
            title,
            description,
            value
        } = request.body

        //validação
        const ong_id = request.headers.authorization;

        const [id] = await conexao("incidents").insert({
            title,
            description,
            value,
            ong_id
        })

        return response.json({
            id
        })
        //cabeçalho da requisição: request.headers, usado para achar o contexto da requisição: autenticação, localização
        //request.headers
    },

    async delete(request, response) {
        const {
            id
        } = request.params;
        const ong_id = request.headers.authorization;

        const incident = await conexao("incidents").where("id", id).select("ong_id").first();

        if (incident.ong_id != ong_id) {
            return response.status(401).json({
                error: "Nao Permitido"
            });
        }


        await conexao("incidents").where("id", id).delete();

        return response.status(204).send();

    }
}