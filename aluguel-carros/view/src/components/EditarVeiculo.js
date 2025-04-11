import React, { useState, useEffect } from 'react';
import api from '../api';
import { useNavigate, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faSave, faCar } from '@fortawesome/free-solid-svg-icons';

const EditarVeiculo = () => {
  const { id } = useParams(); // Captura o ID da URL
  const [modelo, setModelo] = useState('');
  const [marca, setMarca] = useState('');
  const [ano, setAno] = useState('');
  const [placa, setPlaca] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true); // Adicionado para controlar o carregamento
  const navigate = useNavigate();

  useEffect(() => {
    // Busca os dados do veículo pelo ID
    api.get(`/veiculos/${id}`)
      .then((response) => {
        const veiculo = response.data; // Certifique-se de que a API retorna os dados corretamente
        setModelo(veiculo.modelo || ''); // Atualiza o estado com os dados do veículo
        setMarca(veiculo.marca || '');
        setAno(veiculo.ano || '');
        setPlaca(veiculo.placa || '');
        setLoading(false); // Define o carregamento como concluído
      })
      .catch((error) => {
        console.error('Erro ao buscar veículo:', error);
        setError('Não foi possível carregar os dados do veículo.');
        setLoading(false); // Define o carregamento como concluído mesmo em caso de erro
      });
  }, [id]); // Executa o efeito sempre que o ID mudar

  const handleSubmit = (e) => {
    e.preventDefault();

    // Atualiza os dados do veículo
    api.put(`/veiculos/${id}`, { modelo, marca, ano, placa })
      .then(() => navigate('/veiculos'))
      .catch((error) => {
        if (error.response && error.response.status === 400) {
          setError(error.response.data.error); // Exibe o erro retornado pelo back-end
        } else {
          console.error('Erro ao atualizar veículo:', error);
        }
      });
  };

  if (loading) {
    return <p className="p-4 text-center text-gray-500">Carregando dados do veículo...</p>;
  }

  if (error) {
    return <p className="p-4 text-center text-red-500">{error}</p>;
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Botão de Voltar */}
      <div className="flex justify-start mb-6">
        <button
          onClick={() => navigate('/veiculos')}
          className="flex items-center px-4 py-2 bg-gray-900 text-white rounded hover:bg-gray-700 transition duration-300"
        >
          <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
          Voltar para Lista de Veículos
        </button>
      </div>

      {/* Título */}
      <h1 className="text-4xl font-extrabold text-gray-800 mb-8 text-center flex items-center justify-center">
        <FontAwesomeIcon icon={faCar} className="mr-3 text-gray-700" />
        Editar Veículo
      </h1>

      {/* Formulário */}
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg mx-auto">
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-2 text-gray-700 font-semibold">Modelo:</label>
            <input
              type="text"
              value={modelo}
              onChange={(e) => setModelo(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-900"
              placeholder="Digite o modelo do veículo"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-gray-700 font-semibold">Marca:</label>
            <input
              type="text"
              value={marca}
              onChange={(e) => setMarca(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-900"
              placeholder="Digite a marca do veículo"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-gray-700 font-semibold">Ano:</label>
            <input
              type="number"
              value={ano}
              onChange={(e) => setAno(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-900"
              placeholder="Digite o ano do veículo"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block mb-2 text-gray-700 font-semibold">Placa:</label>
            <input
              type="text"
              value={placa}
              onChange={(e) => setPlaca(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-900"
              placeholder="Digite a placa do veículo"
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

export default EditarVeiculo;