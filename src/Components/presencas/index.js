import React, {useState, useEffect} from 'react';
import { Button, Form, FormGroup, Input, Label} from 'reactstrap';
import { Link } from 'react-router-dom';
function PresencasBox(){

    
    const baseURL = "http://localhost:8080/presenca";
    const basePessoaURL = "http://localhost:8080/pessoa";
    const [post_data, setPost_data] = useState("");
    const [post_situacao, setPost_situacao] = useState([]);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        load();
    }, []);

    async function load() {
        await fetch(`${basePessoaURL}`, {
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

    const handleFormChange = (id, situacao, i) =>{
        let data =[...post_situacao];
        data[i] ={id: id, situacao: situacao};
        setPost_situacao(data);
    }


    async function postData() {
        console.log(post_situacao)
        for (const i in post_situacao){
            const postData = {
                data: post_data,
                situacao: post_situacao[i].situacao,
                pessoaidPessoa:{idpessoa: post_situacao[i].id},
            };
            console.log(i);
            console.log(postData);
    
            try {
                await fetch(`${baseURL}`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(postData),
                });
    
            } catch (err) {
                console.log(err);
            }

        }
        
    }

    return (
        <div class="content">
            <Form className='form_default'>
            <div style={{textAlign: "end"}}>
                <p><Link to="/pessoa" class="voltar-link">voltar</Link></p>
            </div>
            <h2>Presenças</h2> 
            <FormGroup>
                <div className="form-row">
                    <div>
                        <Label for="data">Data:</Label>
                        <Input id="data" type="date" value={post_data} onChange={(e) => setPost_data(e.target.value)} max={new Date().toISOString().split('T')[0]}/>
                    </div>
                    {users.map((user, i) => (
                    <div>
                        <p key={user.idpessoa}>{user.nome}</p>
                        <FormGroup onChange={(e) => handleFormChange(user.idpessoa, e.target.value, i)}>
                            <Label for="situacao">Situação:</Label>
                            <FormGroup check>
                                <Label check>
                                    <Input type="radio" name={`situacao_${user.idpessoa}`} value={true} /> Presente
                                </Label>
                            </FormGroup>
                            <FormGroup check>
                                <Label check>
                                    <Input type="radio" name={`situacao_${user.idpessoa}`} value={false} /> Ausente
                                </Label>
                            </FormGroup>
                        </FormGroup>
                    </div>))}
                </div>
            </FormGroup>
            <div class="div-btn">
                <Button className="btn-submit" onClick={postData}>Salvar</Button>
            </div>
            
        </Form>
        </div>
    );

}
export default PresencasBox;