import React, { useEffect, useState } from 'react';
import api from '../api';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faTrash, faPlus, faDollarSign, faEdit } from '@fortawesome/free-solid-svg-icons';

// Importa o SweetAlert2 pelo CDN
const Swal = window.Swal;

const AlugueisList = () => {
  const [alugueis, setAlugueis] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Função para formatar datas no formato DD/MM/YYYY
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('pt-BR').format(date);
  };

  useEffect(() => {
    // Busca os aluguéis da API
    api.get('/alugueis')
      .then((response) => {
        setAlugueis(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Erro ao buscar aluguéis:', error);
        setError('Não foi possível carregar a lista de aluguéis.');
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
        // Se o usuário confirmar, exclui o aluguel
        api.delete(`/alugueis/${id}`)
          .then(() => {
            setAlugueis(alugueis.filter((aluguel) => aluguel.id !== id));
            Swal.fire('Excluído!', 'O aluguel foi excluído com sucesso.', 'success');
          })
          .catch((error) => {
            console.error('Erro ao excluir aluguel:', error);
            Swal.fire('Erro!', 'Não foi possível excluir o aluguel.', 'error');
          });
      }
    });
  };

  if (loading) {
    return <p className="p-4 text-center text-gray-500">Carregando aluguéis...</p>;
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
        <FontAwesomeIcon icon={faDollarSign} className="mr-3 text-gray-700" />
        Lista de Aluguéis
      </h1>

      {/* Botão de Cadastrar Aluguel */}
      <div className="flex justify-end mb-6">
        <button
          onClick={() => navigate('/CadastrarAluguel')}
          className="flex items-center px-6 py-3 bg-gray-900 text-white rounded hover:bg-gray-700 transition duration-300"
        >
          <FontAwesomeIcon icon={faPlus} className="mr-2" />
          Cadastrar Aluguel
        </button>
      </div>

      {/* Lista de Aluguéis */}
      {alugueis.length === 0 ? (
        <p className="text-center text-gray-500">Nenhum aluguel encontrado.</p>
      ) : (
        <ul className="space-y-6">
          {alugueis.map((aluguel) => (
            <li
              key={aluguel.id}
              className="p-6 bg-white rounded-lg shadow-lg hover:shadow-2xl transition duration-300"
            >
              <p className="mb-4 text-lg text-gray-800">
                <strong>Cliente:</strong> {aluguel.cliente}
              </p>
              <p className="mb-4 text-lg text-gray-800">
                <strong>Veículo:</strong> {aluguel.veiculo}
              </p>
              <p className="mb-4 text-lg text-gray-800">
                <strong>Período:</strong> {formatDate(aluguel.data_inicio)} até {formatDate(aluguel.data_fim)}
              </p>
              <div className="flex space-x-4">
                {/* Botão Editar */}
                <button
                  onClick={() => navigate(`/EditarAluguel/${aluguel.id}`)}
                  className="flex items-center px-6 py-3 bg-gray-900 text-white rounded hover:bg-gray-700 transition duration-300"
                >
                  <FontAwesomeIcon icon={faEdit} className="mr-2" />
                  Editar
                </button>

                {/* Botão Excluir */}
                <button
                  onClick={() => handleDelete(aluguel.id)}
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

export default AlugueisList;