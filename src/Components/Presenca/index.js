import React, { useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import { Link } from "react-router-dom";
import Tabela from './Tabela';
import Formulario from './Formulario';

function PresencaBox() { 

    const params = useParams();
    const baseURL = `http://localhost:8080/pessoa/${params.id}`;
    const [users, setUsers] = useState([]);
    
    const [isShown, setIsShown] = useState(true);

    const handleClick = event => {
        setIsShown(current => !current);
      };

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
        <div class="content">
            <div className="column">
                <div style={{textAlign: "end"}}>
                    <p><Link to="/pessoa" class="voltar-link">voltar</Link></p>
                </div>
                <div>
                    <h2 className="font-weight-bold text-center"> Lista de Presenças </h2>
                    <Tabela/>
                </div>
                <div>
                    <h2 className="font-weight-bold text-center" onClick={handleClick}> Cadastro de Presenças do aluno {users.nome}</h2>
                    <div className={isShown ? 'display-none' : 'display-flex'}><Formulario />  </div>
                </div>
            </div>
        </div>
    );
}
export default PresencaBox;
