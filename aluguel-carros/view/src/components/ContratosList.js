import React, { useEffect, useState } from 'react';
import api from '../api';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faFileContract, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';

// Importa o SweetAlert2 pelo CDN
const Swal = window.Swal;

const ContratosList = () => {
  const [contratos, setContratos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    api.get('/contratos')
      .then((response) => {
          setContratos(response.data);
          setLoading(false);
      })
      .catch((error) => {
          console.error('Erro ao buscar contratos:', error);
          setError('Não foi possível carregar a lista de contratos.');
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
        // Se o usuário confirmar, exclui o contrato
        api.delete(`/contratos/${id}`)
          .then(() => {
            setContratos(contratos.filter((contrato) => contrato.id !== id));
            Swal.fire('Excluído!', 'O contrato foi excluído com sucesso.', 'success');
          })
          .catch((error) => {
            console.error('Erro ao excluir contrato:', error);
            Swal.fire('Erro!', 'Não foi possível excluir o contrato.', 'error');
          });
      }
    });
  };

  if (loading) {
    return <p className="p-4 text-center text-gray-500">Carregando contratos...</p>;
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
        <FontAwesomeIcon icon={faFileContract} className="mr-3 text-gray-700" />
        Lista de Contratos
      </h1>

      {/* Botão de Cadastrar Contrato */}
      <div className="flex justify-end mb-6">
        <button
          onClick={() => navigate('/CadastrarContrato')}
          className="flex items-center px-6 py-3 bg-gray-900 text-white rounded hover:bg-gray-700 transition duration-300"
        >
          <FontAwesomeIcon icon={faPlus} className="mr-2" />
          Cadastrar Contrato
        </button>
      </div>

      {/* Lista de Contratos */}
      {contratos.length === 0 ? (
        <p className="text-center text-gray-500">Nenhum contrato encontrado.</p>
      ) : (
        <ul className="space-y-6">
          {contratos.map((contrato) => (
            <li
              key={contrato.id}
              className="p-6 bg-white rounded-lg shadow-lg hover:shadow-2xl transition duration-300"
            >
              <p className="mb-4 text-lg text-gray-800">
                <strong>Tipo:</strong> {contrato.tipo}
              </p>
              <p className="mb-4 text-lg text-gray-800">
                <strong>Valor:</strong> R$ {contrato.valor}
              </p>
              <div className="flex space-x-4">
                <button
                  onClick={() => navigate(`/editarContrato/${contrato.id}`)}
                  className="flex items-center px-6 py-3 bg-gray-900 text-white rounded hover:bg-gray-700 transition duration-300"
                >
                  <FontAwesomeIcon icon={faFileContract} className="mr-2" />
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(contrato.id)}
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

export default ContratosList;