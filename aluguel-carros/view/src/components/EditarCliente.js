import React, { useState, useEffect } from 'react';
import api from '../api';
import { useNavigate, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faSave, faUserEdit } from '@fortawesome/free-solid-svg-icons';

const EditarCliente = () => {
  const { id } = useParams(); // Captura o ID da URL
  const [nome, setNome] = useState('');
  const [telefone, setTelefone] = useState('');
  const [telefoneOriginal, setTelefoneOriginal] = useState(''); // Armazena o telefone original
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Busca os dados do cliente pelo ID
    api.get(`/clientes/${id}`)
      .then((response) => {
        setNome(response.data.nome);
        setTelefone(response.data.telefone);
        setTelefoneOriginal(response.data.telefone); // Armazena o telefone original
      })
      .catch((error) => console.error('Erro ao buscar cliente:', error));
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Prepara os dados para envio
    const dadosAtualizados = { nome };
    if (telefone !== telefoneOriginal) {
      dadosAtualizados.telefone = telefone; // Inclui o telefone apenas se ele foi alterado
    }

    // Atualiza os dados do cliente
    api.put(`/clientes/${id}`, dadosAtualizados)
      .then(() => navigate('/clientes'))
      .catch((error) => {
        if (error.response && error.response.status === 400) {
          setError(error.response.data.error); // Exibe o erro retornado pelo back-end
        } else {
          console.error('Erro ao atualizar cliente:', error);
        }
      });
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Botão de Voltar */}
      <div className="flex justify-start mb-6">
        <button
          onClick={() => navigate('/clientes')}
          className="flex items-center px-4 py-2 bg-gray-900 text-white rounded hover:bg-gray-700 transition duration-300"
        >
          <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
          Voltar para Lista de Clientes
        </button>
      </div>

      {/* Título */}
      <h1 className="text-4xl font-extrabold text-gray-800 mb-8 text-center flex items-center justify-center">
        <FontAwesomeIcon icon={faUserEdit} className="mr-3 text-gray-700" />
        Editar Cliente
      </h1>

      {/* Formulário */}
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg mx-auto">
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-2 text-gray-700 font-semibold">Nome:</label>
            <input
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-900"
              placeholder="Digite o nome do cliente"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block mb-2 text-gray-700 font-semibold">Telefone:</label>
            <input
              type="text"
              value={telefone}
              onChange={(e) => setTelefone(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-900"
              placeholder="Digite o telefone do cliente"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full flex items-center justify-center px-6 py-3 bg-gray-900 text-white rounded hover:bg-gray-700 transition duration-300"
          >
            <FontAwesomeIcon icon={faSave} className="mr-2" />
            Atualizar
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditarCliente;