/* eslint-disable max-len */
import React, { useState, useCallback } from 'react';
import InputMask from 'react-input-mask';
import './styles.css';

import api from './services/api';

interface CepInfoProps{
    cep: string,
    logradouro: string,
    uf: string,
    localidade: string,
}

// @ts-ignore
function CepInput(props) {
  // eslint-disable-next-line react/prop-types, react/destructuring-assignment, react/self-closing-comp
  return <InputMask mask="99999-999" placeholder="00000-000" onChange={props.onChange} value={props.value}></InputMask>;
}

function App() {
  const [cepInput, setCepInput] = useState('');
  const [cepInfo, setCepInfo] = useState<CepInfoProps[]>([]);
  const [err, setErr] = useState('');

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    setErr('');

    if (cepInput.length < 8 || cepInput.length > 8) {
      setErr('Digite um CEP válido!');
      return;
    }

    async function submit() {
      const response = await api.get(`ws/${cepInput}/json/`).then((data) => {
        if (data.data.erro) {
          return setErr('Digite um CEP válido!');
        }
        return data;
      });

      if (response) {
        const data = {
          cep: response.data.cep,
          logradouro: response.data.logradouro,
          localidade: response.data.localidade,
          uf: response.data.uf,

        };
        setCepInfo([data]);
      }

      setCepInput('');
    }

    submit();
  }, [cepInput, err]);

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const filtering = e.target.value.replace(/\D/g, '');
    setCepInput(filtering);
  }

  return (
    <main>
      <section>
        <div className="container">
          {err}
          <div className="box">
            <form onSubmit={handleSubmit} className="box__form">
              <CepInput value={cepInput} onChange={(e: React.ChangeEvent<HTMLInputElement>) => { handleInputChange(e); }} />
              <button type="submit">Buscar CEP</button>
            </form>
          </div>
          {cepInfo.map((info) => (
            <div className="box">
              <p>
                <strong>CEP:</strong>
                {' '}
                {info.cep}
              </p>
              <p>
                <strong>
                  Estado:
                </strong>
                {' '}
                {info.uf}
              </p>
              <p>
                <strong>
                  Cidade:
                </strong>
                {' '}
                {info.localidade}
              </p>
              <p>
                <strong>
                  Logradouro:
                </strong>
                {' '}
                {info.logradouro}
              </p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

export default App;
