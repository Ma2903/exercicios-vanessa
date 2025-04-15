import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import ClientesList from './components/ClientesList';
import VeiculoList from './components/VeiculoList';
import ContratosList from './components/ContratosList';
import AlugueisList from './components/AlugueisList';
import CadastrarCliente from './components/CadastrarCliente';
import CadastrarVeiculo from './components/CadastrarVeiculo';
import CadastrarContrato from './components/CadastrarContrato';
import CadastrarAluguel from './components/CadastrarAluguel';
import EditarCliente from './components/EditarCliente';
import EditarVeiculo from './components/EditarVeiculo';
import EditarContrato from './components/EditarContrato';
import EditarAluguel from './components/EditarAluguel';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/clientes" element={<ClientesList />} />
        <Route path="/CadastrarCliente" element={<CadastrarCliente />} />
        <Route path="/editarCliente/:id" element={<EditarCliente />} />
        <Route path="/veiculos" element={<VeiculoList />} />
        <Route path="/CadastrarVeiculo" element={<CadastrarVeiculo />} />
        <Route path="/editarVeiculo/:id" element={<EditarVeiculo />} />
        <Route path="/contratos" element={<ContratosList />} />
        <Route path="/CadastrarContrato" element={<CadastrarContrato />} />
        <Route path="/editarContrato/:id" element={<EditarContrato />} />
        <Route path="/alugueis" element={<AlugueisList />} />
        <Route path="/CadastrarAluguel" element={<CadastrarAluguel />} />
        <Route path="/editarAluguel/:id" element={<EditarAluguel />} />
        <Route path="*" element={<h1 className="p-4 text-center text-gray-500">Página não encontrada</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
