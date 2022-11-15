import React, { useEffect, useState } from 'react';
import { Table } from 'reactstrap';
import { useParams } from 'react-router-dom';

export default function Tabela() {
    
    const baseURL = "http://localhost:8080/presenca";
    const params = useParams();
    const [presencas, setPresencas] = useState([]);
    const exibe_presencas = presencas.filter(presenca => (presenca.pessoaidPessoa.idpessoa === parseInt(params.id)))

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
                setPresencas(data);
            })
            .catch(err => {
                console.log(err);
            });
    }


    return (
        <Table className="table-bordered text-center">
            <thead className="thead-dark">
                <tr>
                    <th>ID</th>
                    <th>data</th>
                    <th>Situação</th>
                    <th>Pessoa</th>
                </tr>
            </thead>
            <tbody>
                {exibe_presencas.map(user => (
                    <tr>
                        <td>{user.idpresenca}</td>
                        <td>{user.data}</td>
                        <td>{user.situacao}</td>
                        <td>{user.pessoaidPessoa.nome}</td>
                    </tr>
                ))}
            </tbody>
        </Table>
    );
}