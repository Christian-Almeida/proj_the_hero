/**
 * Perfis das ongs
 */
import React,{useState, useEffect} from "react";

import {Link, useHistory} from "react-router-dom";
//importa estilo de icones
import {FiPower, FiTrash2} from "react-icons/fi";
import "./styles.css";
import logoImg from "../../assets/logo.svg"
import api from "../../services/api";


export default function Profile() {



          const [incidents, setIncidents] = useState([]);

          const ongName = localStorage.getItem("ongName")
          const ongId = localStorage.getItem("ongId")

          const history = useHistory()

          useEffect(() => {
            api.get("profile", {
              headers: {
                Authorization: ongId,
              }
            }).then(response => {setIncidents(response.data)});
          }, [ongId]);


          //função delete
          async function handleDeleteIncident(id){
            try {
              await api.delete(`incidents/${id}`, {
                headers:{
                  Authorization: ongId,
                }
              })

              setIncidents(incidents.filter(incident=> incident.id !== id))
            } catch (err) {
              alert("Erro ao deletar caso, tente novamente")
              
            }
          }

          //função pra logout
          function handleLogout(){
            localStorage.clear()
            history.push("/")
          }


          
    return (
      <div className="profile-container">
                <header>
                  <img src={logoImg} alt="Be the hero"/>
                  <span>Bem Vinda, {ongName}</span>
                  
                  <Link className="button" to="/incidents/new"> Cadastrar Novo Caso </Link>
                  
                  <button onClick={handleLogout} type="button">  
                  <FiPower size={18} color="#E02041"/>  
                  </button>
                </header>

            <h1>Casos Encontrados</h1>
            <ul>
              {incidents.map(incident => (
                 <li key={incident.id}>
                      <strong>Caso</strong>
                      <p>{incident.title}</p>

                      <strong>Descrição</strong>
                      <p>{incident.description}</p>   

                      <strong>Valor</strong>
                      <p>{Intl.NumberFormat("pt-br",{ style: "currency", currency: "BRL"}).format(incident.value)}</p>

                      <button onClick={()=> handleDeleteIncident(incident.id)} type="button">
                        <FiTrash2 size={20} color="#a8a8b3"/>
                      </button>
                </li>
              ))
              }
            </ul>
      </div>
     )
}


/** */