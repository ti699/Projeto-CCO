import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { Toaster } from 'sonner';

// Layout
import MainLayout from './layouts/MainLayout';
import AuthLayout from './layouts/AuthLayout';

// Pages - Auth
import Login from './pages/Auth/Login';
import Cadastro from './pages/Auth/Cadastro';
import RecuperarSenha from './pages/Auth/RecuperarSenha';

// Pages - Main
import Dashboard from './pages/Dashboard';
import Ocorrencias from './pages/Ocorrencias';
import NovaOcorrencia from './pages/Ocorrencias/NovaOcorrencia';
import EditarOcorrencia from './pages/Ocorrencias/EditarOcorrencia';
import DetalhesOcorrencia from './pages/Ocorrencias/DetalhesOcorrencia';
import Clientes from './pages/Cadastros/Clientes';
import Veiculos from './pages/Cadastros/Veiculos';
import TiposQuebra from './pages/Cadastros/TiposQuebra';
import Usuarios from './pages/Cadastros/Usuarios';
import Relatorios from './pages/Relatorios';
import Importacao from './pages/Importacao';
import Configuracoes from './pages/Configuracoes';
import GestaoClientes from './pages/Clientes/GestaoClientes';
import DetalhesCliente from './pages/Clientes/DetalhesCliente';
import EditarCliente from './pages/Clientes/EditarCliente';

// Protected Route Component
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Toaster position="top-right" richColors />
        <Routes>
          {/* Auth Routes */}
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/cadastro" element={<Cadastro />} />
            <Route path="/recuperar-senha" element={<RecuperarSenha />} />
          </Route>

          {/* Protected Routes */}
          <Route element={<ProtectedRoute><MainLayout /></ProtectedRoute>}>
            <Route path="/" element={<Dashboard />} />
            
            {/* Ocorrências */}
            <Route path="/ocorrencias" element={<Ocorrencias />} />
            <Route path="/ocorrencias/nova" element={<NovaOcorrencia />} />
            <Route path="/ocorrencias/editar/:id" element={<EditarOcorrencia />} />
            <Route path="/ocorrencias/:id" element={<DetalhesOcorrencia />} />
            
            {/* Clientes */}
            <Route path="/clientes" element={<GestaoClientes />} />
            <Route path="/clientes/editar/:id" element={<EditarCliente />} />
            <Route path="/clientes/:id" element={<DetalhesCliente />} />
            
            {/* Cadastros */}
            <Route path="/cadastros/clientes" element={<Clientes />} />
            <Route path="/cadastros/veiculos" element={<Veiculos />} />
            <Route path="/cadastros/tipos-quebra" element={<TiposQuebra />} />
            <Route path="/cadastros/usuarios" element={<Usuarios />} />
            
            {/* Outros */}
            <Route path="/relatorios" element={<Relatorios />} />
            <Route path="/importacao" element={<Importacao />} />
            <Route path="/configuracoes" element={<Configuracoes />} />
          </Route>

          {/* Redirect */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
