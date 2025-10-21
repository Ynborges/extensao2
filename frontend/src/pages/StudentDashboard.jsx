import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Briefcase, Calendar, ExternalLink } from 'lucide-react';
import { useApi } from '../hooks/useApi';
import { studentService } from '../services/studentService';
import { useAuth } from '../contexts/AuthContext';

const StudentDashboard = () => {
  const { user } = useAuth();
  const { data: dashboard, isLoading } = useApi(
    ['student-dashboard'],
    () => studentService.getDashboard()
  );

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  const enrollments = dashboard?.enrollments || [];
  const applications = dashboard?.applications || [];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Olá, {user?.nomeCompleto}!
          </h1>
          <p className="text-gray-600">
            Acompanhe seus cursos e candidaturas
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="card">
            <div className="flex items-center">
              <div className="bg-primary-100 p-3 rounded-lg">
                <BookOpen className="h-6 w-6 text-primary-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Cursos</p>
                <p className="text-2xl font-bold text-gray-900">{enrollments.length}</p>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center">
              <div className="bg-secondary-100 p-3 rounded-lg">
                <Briefcase className="h-6 w-6 text-secondary-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Candidaturas</p>
                <p className="text-2xl font-bold text-gray-900">{applications.length}</p>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center">
              <div className="bg-yellow-100 p-3 rounded-lg">
                <Calendar className="h-6 w-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Este Mês</p>
                <p className="text-2xl font-bold text-gray-900">
                  {enrollments.filter(e => 
                    new Date(e.dataInscricao).getMonth() === new Date().getMonth()
                  ).length}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Cursos Matriculados */}
          <div className="card">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">
                Meus Cursos
              </h2>
              <Link to="/cursos" className="text-primary-600 hover:text-primary-700 text-sm">
                Ver todos os cursos
              </Link>
            </div>

            {enrollments.length > 0 ? (
              <div className="space-y-4">
                {enrollments.map((enrollment) => (
                  <div key={enrollment.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-medium text-gray-900">
                        {enrollment.curso.titulo}
                      </h3>
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        enrollment.status === 'inscrito' 
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {enrollment.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">
                      {enrollment.curso.instituicao.nomeInstituicao}
                    </p>
                    <p className="text-xs text-gray-500 mb-3">
                      Inscrito em {new Date(enrollment.dataInscricao).toLocaleDateString('pt-BR')}
                    </p>
                    <div className="flex space-x-2">
                      <Link
                        to={`/cursos/${enrollment.curso.id}`}
                        className="text-primary-600 hover:text-primary-700 text-sm"
                      >
                        Ver detalhes
                      </Link>
                      <a
                        href={enrollment.curso.linkInscricao}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-secondary-600 hover:text-secondary-700 text-sm flex items-center"
                      >
                        <ExternalLink className="h-3 w-3 mr-1" />
                        Inscrever-se
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500 mb-4">
                  Você ainda não se inscreveu em nenhum curso
                </p>
                <Link to="/cursos" className="btn-primary">
                  Explorar Cursos
                </Link>
              </div>
            )}
          </div>

          {/* Candidaturas */}
          <div className="card">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">
                Minhas Candidaturas
              </h2>
              <Link to="/oportunidades" className="text-primary-600 hover:text-primary-700 text-sm">
                Ver oportunidades
              </Link>
            </div>

            {applications.length > 0 ? (
              <div className="space-y-4">
                {applications.map((application) => (
                  <div key={application.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-medium text-gray-900">
                        {application.oportunidade.titulo}
                      </h3>
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        application.status === 'pendente' 
                          ? 'bg-yellow-100 text-yellow-800'
                          : application.status === 'aprovado'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {application.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">
                      {application.oportunidade.instituicao.nomeInstituicao}
                    </p>
                    <p className="text-xs text-gray-500">
                      Candidatura em {new Date(application.dataCandidatura).toLocaleDateString('pt-BR')}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <Briefcase className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500 mb-4">
                  Você ainda não se candidatou a nenhuma oportunidade
                </p>
                <Link to="/oportunidades" className="btn-primary">
                  Ver Oportunidades
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;