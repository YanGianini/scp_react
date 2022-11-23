import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import Formulario from './Formulario';
import Tabela from './Tabela';
import './pessoa.css'

function PessoaBox() {
    const [isShown, setIsShown] = useState(true);

    const handleClick = event => {
        setIsShown(current => !current);
      };

    return (
        <div class="content">
            <div className="column">
                
                <div className="pessoa-lista">
                    <h2 className="font-weight-bold text-center"> Lista de Pessoas </h2>
                    <div style={{textAlign: "end"}}>
                        <p><Link to="/presencas" class="voltar-link">Cadastrar presenças</Link></p>
                    </div>
                    <Tabela />
                </div>
                <div className="pessoa-cadastro">
                    <h2 className="font-weight-bold text-center" onClick={handleClick}> Cadastro de Pessoas +</h2>
                    <div className={isShown ? 'display-none' : 'display-flex'}><Formulario />  </div>
                                    
                </div>
            </div>
        </div>
    );
}
export default PessoaBox;