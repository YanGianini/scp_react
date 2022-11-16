import React, { useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import { Link } from "react-router-dom";
import Tabela from './Tabela';
import Formulario from './Formulario';

function PresencaBox() { 

    const params = useParams();
    const baseURL = `http://localhost:8080/pessoa/${params.id}`;
    const [users, setUsers] = useState([]);
    
    useEffect(() => {
        load();
    }, []);

    async function load() {
        await fetch(`${baseURL}`, {
            method: 'GET',
        })
            .then(data => {
                return data.json();
            })
            .then(data => {
                setUsers(data);
            })
            .catch(err => {
                console.log(err);
            });
    }

    
    return (
        <div>
            <div className='text-center'>
                <h2><Link to="/pessoa">Lista de Pessoas</Link></h2>
            </div>
            <div className="row">
                <div className="col-md-6 my-3">
                    <h2 className="font-weight-bold text-center"> Cadastro de Presenças do aluno {users.nome}</h2>
                    <Formulario/>
                </div>
                <div className="col-md-6 my-3">
                    <h2 className="font-weight-bold text-center"> Lista de Presenças </h2>
                    <Tabela/>
                </div>
            </div>
        </div>
    );
}
export default PresencaBox;