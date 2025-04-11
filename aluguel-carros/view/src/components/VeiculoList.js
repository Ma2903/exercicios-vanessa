import React, { useEffect, useState } from 'react';
import api from '../api';

const VeiculoList = () => {
  const [veiculos, setVeiculos] = useState([]);

  useEffect(() => {
    api.get('/veiculos')
      .then((response) => setVeiculos(response.data))
      .catch((error) => console.error('Erro ao buscar veículos:', error));
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Lista de Veículos</h1>
      <ul className="space-y-2">
        {veiculos.map((veiculo) => (
          <li
            key={veiculo.id}
            className="p-4 bg-gray-100 rounded shadow hover:bg-gray-200"
          >
            <p><strong>Modelo:</strong> {veiculo.modelo}</p>
            <p><strong>Marca:</strong> {veiculo.marca}</p>
            <p><strong>Ano:</strong> {veiculo.ano}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default VeiculoList;