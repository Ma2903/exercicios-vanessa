import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import ClientesList from './components/ClientesList';
import VeiculoList from './components/VeiculoList';
import ContratosList from './components/ContratosList';
import AlugueisList from './components/AlugueisList';
import CadastrarCliente from './components/CadastrarCliente';
import CadastrarVeiculo from './components/CadastrarVeiculo';
import EditarCliente from './components/EditarCliente';
import EditarVeiculo from './components/EditarVeiculo';

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
        <Route path="/alugueis" element={<AlugueisList />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
