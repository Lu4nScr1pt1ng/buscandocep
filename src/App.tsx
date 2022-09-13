import React, { useState, useCallback } from 'react';
import './styles.css';

import api from './services/api';

interface CepInfoProps{
    cep: string,
    logradouro: string,
    uf: string,
    localidade: string,
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
      const response = await api.get(`ws/${cepInput}/json/`);

      const data = {
        cep: response.data.cep,
        logradouro: response.data.logradouro,
        localidade: response.data.localidade,
        uf: response.data.uf,

      };
      setCepInfo([data]);
      setCepInput('');
    }

    submit();
  }, [cepInput, err]);

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setCepInput(e.target.value);
  }

  return (
    <main>
      <section>
        <div className="container">
          {err}
          <div className="box">
            <form onSubmit={handleSubmit} className="box__form">
              <input type="number" value={cepInput} onChange={(e) => { handleInputChange(e); }} maxLength={8} />
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
