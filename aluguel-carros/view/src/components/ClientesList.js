import React, { useEffect, useState } from 'react';
import api from '../api';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faUserEdit, faTrash, faPlus, faUsers } from '@fortawesome/free-solid-svg-icons';

// Importa o SweetAlert2 pelo CDN
const Swal = window.Swal;

const ClientesList = () => {
  const [clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Busca os clientes da API
    api.get('/clientes')
      .then((response) => {
        setClientes(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Erro ao buscar clientes:', error);
        setError('Não foi possível carregar a lista de clientes.');
        setLoading(false);
      });
  }, []);

  const handleDelete = (id) => {
    // Exibe o modal de confirmação com SweetAlert2
    Swal.fire({
      title: 'Tem certeza?',
      text: 'Você não poderá desfazer esta ação!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sim, excluir!',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        // Se o usuário confirmar, exclui o cliente
        api.delete(`/clientes/${id}`)
          .then(() => {
            setClientes(clientes.filter((cliente) => cliente.id !== id));
            Swal.fire('Excluído!', 'O cliente foi excluído com sucesso.', 'success');
          })
          .catch((error) => {
            console.error('Erro ao excluir cliente:', error);
            Swal.fire('Erro!', 'Não foi possível excluir o cliente.', 'error');
          });
      }
    });
  };

  if (loading) {
    return <p className="p-4 text-center text-gray-500">Carregando clientes...</p>;
  }

  if (error) {
    return <p className="p-4 text-center text-red-500">{error}</p>;
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Botão de Voltar */}
      <div className="flex justify-start mb-6">
        <button
          onClick={() => navigate('/')}
          className="flex items-center px-4 py-2 bg-gray-900 text-white rounded hover:bg-gray-700 transition duration-300"
        >
          <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
          Voltar para Home
        </button>
      </div>

      {/* Título */}
      <h1 className="text-4xl font-extrabold text-gray-800 mb-8 text-center flex items-center justify-center">
        <FontAwesomeIcon icon={faUsers} className="mr-3 text-gray-700" />
        Lista de Clientes
      </h1>

      {/* Botão de Cadastrar Cliente */}
      <div className="flex justify-end mb-6">
        <button
          onClick={() => navigate('/CadastrarCliente')}
          className="flex items-center px-6 py-3 bg-gray-900 text-white rounded hover:bg-gray-700 transition duration-300"
        >
          <FontAwesomeIcon icon={faPlus} className="mr-2" />
          Cadastrar Cliente
        </button>
      </div>

      {/* Lista de Clientes */}
      {clientes.length === 0 ? (
        <p className="text-center text-gray-500">Nenhum cliente encontrado.</p>
      ) : (
        <ul className="space-y-6">
          {clientes.map((cliente) => (
            <li
              key={cliente.id}
              className="p-6 bg-white rounded-lg shadow-lg hover:shadow-2xl transition duration-300"
            >
              <p className="mb-4 text-lg text-gray-800">
                <strong>Nome:</strong> {cliente.nome}
              </p>
              <p className="mb-6 text-lg text-gray-800">
                <strong>Telefone:</strong> {cliente.telefone}
              </p>
              <div className="flex space-x-4">
                <button
                  onClick={() => navigate(`/editarCliente/${cliente.id}`)}
                  className="flex items-center px-6 py-3 bg-gray-900 text-white rounded hover:bg-gray-700 transition duration-300"
                >
                  <FontAwesomeIcon icon={faUserEdit} className="mr-2" />
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(cliente.id)}
                  className="flex items-center px-6 py-3 bg-red-500 text-white rounded hover:bg-red-600 transition duration-300"
                >
                  <FontAwesomeIcon icon={faTrash} className="mr-2" />
                  Excluir
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ClientesList;