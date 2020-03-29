/**
 * Controlador de rotas para deixar o codigo mais enxuto
 * 
 * -td paginas requer conexão ao banco "connection"
 */
const connection = require("../database/connection")
const crypto = require("crypto")

module.exports = {

    async index(request, response) {

        const ongs = await connection("ongs").select("*")

        return response.json({
            ongs
        })
    },

    async criacao(request, response) {

        //request.body ta mandando/recebendo requisição do front-end
        const {
            name,
            email,
            whatsapp,
            city,
            uf
        } = request.body;

        const id = crypto.randomBytes(4).toString("HEX");

        await connection("ongs").insert({

            id,
            name,
            email,
            whatsapp,
            city,
            uf
        })

        //retorna resposta da requisição
        return response.json({
            id
        })
    }
}