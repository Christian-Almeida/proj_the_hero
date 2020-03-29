/**
 * Configuração da rota
 * 
 * -importar connection para se comunicar com o banco de dados
 */

const express = require("express")



//importa a controlladora ong
const OngController = require("./controller/OngController")
//Importa controladora de  incidents
const incidentsController = require("./controller/incidentsController")
//impoorta Profile Controller
const ProfileController = require("./controller/ProfieController");

const SessionController = require("./controller/SessionController")
//importa função do node.js pra cryptografar os dados
const crypto = require("crypto")

const routes = express.Router();


//rota para listar :get
//rota para criar a requisição e retornar o recurso: post
//Rotas da Ong
routes.get("/ongs", OngController.index)
routes.post("/ongs", OngController.criacao);

routes.post("/sessions", SessionController.criarSessao)
//rota do profile
routes.get("/profile", ProfileController.index)
//Rota do incident
routes.get("/incidents", incidentsController.index)
routes.post("/incidents", incidentsController.criaRequisicao)
routes.delete("/incidents/:id", incidentsController.delete);

module.exports = routes;