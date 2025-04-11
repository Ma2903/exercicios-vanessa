import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUsers, faCar, faFileContract, faDollarSign } from '@fortawesome/free-solid-svg-icons';

const HomePage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* Header */}
      <header className="w-full bg-gray-900 text-white py-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center px-4">
          <h1 className="text-4xl font-extrabold tracking-wide hover:text-gray-400 transition duration-300">
            Sistema de Aluguel de Carros
          </h1>
          <nav className="space-x-6 flex items-center">
            <Link
              to="/"
              className="flex items-center text-white hover:bg-gray-700 hover:text-gray-300 px-3 py-2 rounded transition duration-300"
            >
              <FontAwesomeIcon icon={faHome} className="mr-2" />
              Home
            </Link>
            <Link
              to="/clientes"
              className="flex items-center text-white hover:bg-gray-700 hover:text-gray-300 px-3 py-2 rounded transition duration-300"
            >
              <FontAwesomeIcon icon={faUsers} className="mr-2" />
              Clientes
            </Link>
            <Link
              to="/veiculos"
              className="flex items-center text-white hover:bg-gray-700 hover:text-gray-300 px-3 py-2 rounded transition duration-300"
            >
              <FontAwesomeIcon icon={faCar} className="mr-2" />
              Veículos
            </Link>
            <Link
              to="/contratos"
              className="flex items-center text-white hover:bg-gray-700 hover:text-gray-300 px-3 py-2 rounded transition duration-300"
            >
              <FontAwesomeIcon icon={faFileContract} className="mr-2" />
              Contratos
            </Link>
            <Link
              to="/alugueis"
              className="flex items-center text-white hover:bg-gray-700 hover:text-gray-300 px-3 py-2 rounded transition duration-300"
            >
              <FontAwesomeIcon icon={faDollarSign} className="mr-2" />
              Aluguéis
            </Link>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h2 className="text-5xl font-extrabold text-gray-800 mb-4 animate-fade-in">
            Bem-vindo ao Sistema de Aluguel de Carros
          </h2>
          <p className="text-lg text-gray-600 animate-fade-in-delay">
            Gerencie clientes, veículos, contratos e aluguéis de forma simples e eficiente.
          </p>
        </div>

        {/* Cards Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Clientes */}
          <Link
            to="/clientes"
            className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center hover:shadow-2xl hover:scale-105 transform transition duration-300 group hover:bg-gray-800 hover:text-white"
          >
            <FontAwesomeIcon icon={faUsers} className="h-16 w-16 text-gray-700 mb-4 group-hover:text-white transition duration-300" />
            <h3 className="text-xl font-semibold text-gray-800 group-hover:text-white transition duration-300">Clientes</h3>
            <p className="text-gray-600 text-center mt-2 group-hover:text-white transition duration-300">Gerencie os dados dos seus clientes.</p>
          </Link>

          {/* Veículos */}
          <Link
            to="/veiculos"
            className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center hover:shadow-2xl hover:scale-105 transform transition duration-300 group hover:bg-gray-800 hover:text-white"
          >
            <FontAwesomeIcon icon={faCar} className="h-16 w-16 text-gray-700 mb-4 group-hover:text-white transition duration-300" />
            <h3 className="text-xl font-semibold text-gray-800 group-hover:text-white transition duration-300">Veículos</h3>
            <p className="text-gray-600 text-center mt-2 group-hover:text-white transition duration-300">Gerencie os veículos disponíveis para aluguel.</p>
          </Link>

          {/* Contratos */}
          <Link
            to="/contratos"
            className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center hover:shadow-2xl hover:scale-105 transform transition duration-300 group hover:bg-gray-800 hover:text-white"
          >
            <FontAwesomeIcon icon={faFileContract} className="h-16 w-16 text-gray-700 mb-4 group-hover:text-white transition duration-300" />
            <h3 className="text-xl font-semibold text-gray-800 group-hover:text-white transition duration-300">Contratos</h3>
            <p className="text-gray-600 text-center mt-2 group-hover:text-white transition duration-300">Visualize e gerencie os contratos de aluguel.</p>
          </Link>

          {/* Aluguéis */}
          <Link
            to="/alugueis"
            className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center hover:shadow-2xl hover:scale-105 transform transition duration-300 group hover:bg-gray-800 hover:text-white"
          >
            <FontAwesomeIcon icon={faDollarSign} className="h-16 w-16 text-gray-700 mb-4 group-hover:text-white transition duration-300" />
            <h3 className="text-xl font-semibold text-gray-800 group-hover:text-white transition duration-300">Aluguéis</h3>
            <p className="text-gray-600 text-center mt-2 group-hover:text-white transition duration-300">Acompanhe os aluguéis realizados.</p>
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full bg-gray-900 text-white py-4 text-center">
        <p className="text-sm">© 2025 Sistema de Aluguel de Carros. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
};

export default HomePage;