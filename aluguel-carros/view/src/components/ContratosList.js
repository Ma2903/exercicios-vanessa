import React, { useEffect, useState } from 'react';
import api from '../api';

const ContratosList = () => {
  const [contratos, setContratos] = useState([]);

  useEffect(() => {
    api.get('/contratos')
      .then((response) => setContratos(response.data))
      .catch((error) => console.error('Erro ao buscar contratos:', error));
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Lista de Contratos</h1>
      <ul className="space-y-2">
        {contratos.map((contrato) => (
          <li
            key={contrato.id}
            className="p-4 bg-gray-100 rounded shadow hover:bg-gray-200"
          >
            <p><strong>Cliente:</strong> {contrato.cliente}</p>
            <p><strong>Veículo:</strong> {contrato.veiculo}</p>
            <p><strong>Data:</strong> {contrato.data}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ContratosList;