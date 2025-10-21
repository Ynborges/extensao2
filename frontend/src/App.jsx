import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import Courses from './pages/Courses';
import CourseDetail from './pages/CourseDetail';
import Login from './pages/Login';
import Register from './pages/Register';
import StudentDashboard from './pages/StudentDashboard';

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cursos" element={<Courses />} />
          <Route path="/cursos/:id" element={<CourseDetail />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cadastro" element={<Register />} />
          
          {/* Rotas protegidas */}
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute requiredRole="estudante">
                <StudentDashboard />
              </ProtectedRoute>
            } 
          />
          
          {/* Placeholder para outras páginas */}
          <Route path="/oportunidades" element={<div className="p-8 text-center">Página de Oportunidades em desenvolvimento</div>} />
          <Route path="/blog" element={<div className="p-8 text-center">Página do Blog em desenvolvimento</div>} />
          <Route path="/instituicao/dashboard" element={<div className="p-8 text-center">Dashboard da Instituição em desenvolvimento</div>} />
          
          {/* 404 */}
          <Route path="*" element={
            <div className="min-h-screen flex items-center justify-center">
              <div className="text-center">
                <h1 className="text-4xl font-bold text-gray-900 mb-4">404</h1>
                <p className="text-gray-600 mb-4">Página não encontrada</p>
                <a href="/" className="btn-primary">Voltar ao Início</a>
              </div>
            </div>
          } />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;