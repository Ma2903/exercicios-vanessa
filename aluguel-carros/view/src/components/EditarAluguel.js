import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faSave, faPencilAlt } from '@fortawesome/free-solid-svg-icons';

// Importa o SweetAlert2 pelo CDN
const Swal = window.Swal;

const EditarAluguel = () => {
  const { id } = useParams(); // Obtém o ID do aluguel a ser editado
  const [clientes, setClientes] = useState([]);
  const [veiculos, setVeiculos] = useState([]);
  const [contratos, setContratos] = useState([]);
  const [formData, setFormData] = useState({
    id_cliente: '',
    id_veiculo: '',
    id_contrato: '',
    data_inicio: '',
    data_fim: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Função para formatar a data no formato YYYY-MM-DD
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Adiciona zero à esquerda
    const day = String(date.getDate()).padStart(2, '0'); // Adiciona zero à esquerda
    return `${year}-${month}-${day}`;
  };

  // Carregar dados do aluguel, clientes, veículos e contratos
  useEffect(() => {
    Promise.all([
      api.get(`/alugueis/${id}`),
      api.get('/clientes'),
      api.get('/veiculos'),
      api.get('/contratos'),
    ])
      .then(([aluguelRes, clientesRes, veiculosRes, contratosRes]) => {
        const aluguel = aluguelRes.data;
        setFormData({
          ...aluguel,
          data_inicio: formatDate(aluguel.data_inicio), // Formata a data de início
          data_fim: formatDate(aluguel.data_fim), // Formata a data de fim
        });
        setClientes(clientesRes.data);
        setVeiculos(veiculosRes.data);
        setContratos(contratosRes.data);
      })
      .catch((err) => {
        console.error('Erro ao carregar dados:', err);
        setError('Erro ao carregar dados necessários para a edição.');
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    api.put(`/alugueis/${id}`, formData)
      .then(() => {
        Swal.fire({
          title: 'Sucesso!',
          text: 'Aluguel atualizado com sucesso!',
          icon: 'success',
          confirmButtonText: 'OK',
        }).then(() => navigate('/alugueis'));
      })
      .catch((err) => {
        console.error('Erro ao atualizar aluguel:', err);
        Swal.fire({
          title: 'Erro!',
          text: 'Erro ao atualizar aluguel. Verifique os dados e tente novamente.',
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
          onClick={() => navigate('/alugueis')}
          className="flex items-center px-4 py-2 bg-gray-900 text-white rounded hover:bg-gray-700 transition duration-300"
        >
          <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
          Voltar para Lista de Aluguéis
        </button>
      </div>

      {/* Título */}
      <h1 className="text-4xl font-extrabold text-gray-800 mb-8 text-center flex items-center justify-center">
        <FontAwesomeIcon icon={faPencilAlt} className="mr-3 text-gray-700" />
        Editar Aluguel
      </h1>

      {/* Formulário */}
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg mx-auto">
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleSubmit}>
          {/* Cliente */}
          <div className="mb-4">
            <label className="block mb-2 text-gray-700 font-semibold">Cliente:</label>
            <select
              name="id_cliente"
              value={formData.id_cliente}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-900"
              required
            >
              <option value="">Selecione um cliente</option>
              {clientes.map((cliente) => (
                <option key={cliente.id} value={cliente.id}>
                  {cliente.nome}
                </option>
              ))}
            </select>
          </div>

          {/* Veículo */}
          <div className="mb-4">
            <label className="block mb-2 text-gray-700 font-semibold">Veículo:</label>
            <select
              name="id_veiculo"
              value={formData.id_veiculo}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-900"
              required
            >
              <option value="">Selecione um veículo</option>
              {veiculos.map((veiculo) => (
                <option key={veiculo.id} value={veiculo.id}>
                  {veiculo.modelo} - {veiculo.placa}
                </option>
              ))}
            </select>
          </div>

          {/* Contrato */}
          <div className="mb-4">
            <label className="block mb-2 text-gray-700 font-semibold">Contrato:</label>
            <select
              name="id_contrato"
              value={formData.id_contrato}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-900"
              required
            >
              <option value="">Selecione um contrato</option>
              {contratos.map((contrato) => (
                <option key={contrato.id} value={contrato.id}>
                  {contrato.tipo} - R$ {contrato.valor}
                </option>
              ))}
            </select>
          </div>

          {/* Data de Início */}
          <div className="mb-4">
            <label className="block mb-2 text-gray-700 font-semibold">Data de Início:</label>
            <input
              type="date"
              name="data_inicio"
              value={formData.data_inicio}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-900"
              required
            />
          </div>

          {/* Data de Fim */}
          <div className="mb-6">
            <label className="block mb-2 text-gray-700 font-semibold">Data de Fim:</label>
            <input
              type="date"
              name="data_fim"
              value={formData.data_fim}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-900"
              required
            />
          </div>

          {/* Botão de Salvar */}
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

export default EditarAluguel;