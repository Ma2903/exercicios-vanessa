import React, { useState } from 'react';
import api from '../api';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faFileContract } from '@fortawesome/free-solid-svg-icons';

const CadastrarContrato = () => {
  const [tipo, setTipo] = useState('');
  const [valor, setValor] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validação simples antes de enviar
    if (!tipo || !valor) {
      setError('Todos os campos são obrigatórios.');
      return;
    }

    api.post('/contratos', { tipo, valor })
      .then(() => navigate('/contratos'))
      .catch((error) => {
        if (error.response && error.response.status === 400) {
          setError(error.response.data.error); // Exibe o erro retornado pelo back-end
        } else {
          console.error('Erro ao cadastrar contrato:', error);
          setError('Erro ao cadastrar contrato. Tente novamente.');
        }
      });
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Botão de Voltar */}
      <div className="flex justify-start mb-6">
        <button
          onClick={() => navigate('/contratos')}
          className="flex items-center px-4 py-2 bg-gray-900 text-white rounded hover:bg-gray-700 transition duration-300"
        >
          <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
          Voltar para Lista de Contratos
        </button>
      </div>

      {/* Título */}
      <h1 className="text-4xl font-extrabold text-gray-800 mb-8 text-center flex items-center justify-center">
        <FontAwesomeIcon icon={faFileContract} className="mr-3 text-gray-700" />
        Cadastrar Contrato
      </h1>

      {/* Formulário */}
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg mx-auto">
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-2 text-gray-700 font-semibold">Tipo:</label>
            <select
              value={tipo}
              onChange={(e) => setTipo(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-900"
              required
            >
              <option value="" disabled>Selecione o tipo do contrato</option>
              <option value="diaria">Diária</option>
              <option value="semanal">Semanal</option>
              <option value="mensal">Mensal</option>
            </select>
          </div>
          <div className="mb-6">
            <label className="block mb-2 text-gray-700 font-semibold">Valor:</label>
            <input
              type="number"
              value={valor}
              onChange={(e) => setValor(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-900"
              placeholder="Digite o valor do contrato"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full flex items-center justify-center px-6 py-3 bg-gray-900 text-white rounded hover:bg-gray-700 transition duration-300"
          >
            <FontAwesomeIcon icon={faFileContract} className="mr-2" />
            Cadastrar
          </button>
        </form>
      </div>
    </div>
  );
};

export default CadastrarContrato;