import React, {useState} from 'react';

import Formulario from './Formulario';
import Tabela from './Tabela';
import './pessoa.css'

function PessoaBox() {
    const [isShown, setIsShown] = useState(true);

    const handleClick = event => {
        setIsShown(current => !current);
      };

    return (
        <div class="pessoa">
            <div className="column">
                <div className="pessoa-cadastro">
                    <h2 className="font-weight-bold text-center" onClick={handleClick}> Cadastro de Pessoas </h2>
                    <div className={isShown ? 'display-flex' : 'display-none'}><Formulario />  </div>
                                    
                </div>
                <div className="pessoa-lista">
                    <h2 className="font-weight-bold text-center"> Lista de Pessoas </h2>
                    <Tabela />
                </div>
            </div>
        </div>
    );
}
export default PessoaBox;