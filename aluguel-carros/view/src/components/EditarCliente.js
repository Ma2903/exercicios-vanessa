import React, { useState, useEffect } from 'react';
import api from '../api';
import { useNavigate, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faSave, faUserEdit } from '@fortawesome/free-solid-svg-icons';

// Importa o SweetAlert2 pelo CDN
const Swal = window.Swal;

const EditarCliente = () => {
  const { id } = useParams(); // Captura o ID da URL
  const [nome, setNome] = useState('');
  const [telefone, setTelefone] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Busca os dados do cliente pelo ID
    api.get(`/clientes/${id}`)
      .then((response) => {
        setNome(response.data.nome);
        setTelefone(response.data.telefone);
      })
      .catch((error) => console.error('Erro ao buscar cliente:', error));
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    api.put(`/clientes/${id}`, { nome, telefone })
      .then(() => {
        Swal.fire({
          title: 'Sucesso!',
          text: 'Cliente atualizado com sucesso!',
          icon: 'success',
          confirmButtonText: 'OK',
        }).then(() => navigate('/clientes'));
      })
      .catch((err) => {
        console.error('Erro ao atualizar cliente:', err);
        Swal.fire({
          title: 'Erro!',
          text: 'Erro ao atualizar cliente. Verifique os dados e tente novamente.',
          icon: 'error',
          confirmButtonText: 'OK',
        });
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