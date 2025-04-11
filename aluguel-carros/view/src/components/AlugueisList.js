import React, { useEffect, useState } from 'react';
import api from '../api';

const AlugueisList = () => {
  const [alugueis, setAlugueis] = useState([]);

  useEffect(() => {
    api.get('/alugueis')
      .then((response) => setAlugueis(response.data))
      .catch((error) => console.error('Erro ao buscar aluguéis:', error));
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Lista de Aluguéis</h1>
      <ul className="space-y-2">
        {alugueis.map((aluguel) => (
          <li
            key={aluguel.id}
            className="p-4 bg-gray-100 rounded shadow hover:bg-gray-200"
          >
            <p><strong>Cliente:</strong> {aluguel.cliente}</p>
            <p><strong>Veículo:</strong> {aluguel.veiculo}</p>
            <p><strong>Período:</strong> {aluguel.periodo}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AlugueisList;