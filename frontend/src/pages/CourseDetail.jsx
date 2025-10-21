import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Clock, MapPin, Users, ExternalLink, BookOpen, CheckCircle } from 'lucide-react';
import { useApi, useApiMutation } from '../hooks/useApi';
import { courseService } from '../services/courseService';
import { useAuth } from '../contexts/AuthContext';

const CourseDetail = () => {
  const { id } = useParams();
  const { isAuthenticated, isStudent } = useAuth();

  const { data: course, isLoading } = useApi(
    ['course', id],
    () => courseService.getCourseById(id)
  );

  const enrollMutation = useApiMutation(
    () => courseService.enrollInCourse(id),
    {
      successMessage: 'Inscrição realizada com sucesso!',
      invalidateQueries: [['course', id]]
    }
  );

  const modalityLabels = {
    presencial: 'Presencial',
    online: 'Online'
  };

  const levelLabels = {
    iniciante: 'Iniciante',
    intermediario: 'Intermediário',
    avancado: 'Avançado'
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Curso não encontrado</h1>
          <Link to="/cursos" className="btn-primary">
            Voltar aos Cursos
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <ol className="flex items-center space-x-2 text-sm text-gray-500">
            <li><Link to="/" className="hover:text-primary-600">Início</Link></li>
            <li>/</li>
            <li><Link to="/cursos" className="hover:text-primary-600">Cursos</Link></li>
            <li>/</li>
            <li className="text-gray-900">{course.titulo}</li>
          </ol>
        </nav>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          {/* Header */}
          <div className="p-8 border-b border-gray-200">
            <div className="flex justify-between items-start mb-4">
              <div className="flex-1">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  {course.titulo}
                </h1>
                <p className="text-lg text-gray-600 mb-4">
                  {course.instituicao.nomeInstituicao}
                </p>
              </div>
              {course.instituicao.urlLogo && (
                <img
                  src={course.instituicao.urlLogo}
                  alt={course.instituicao.nomeInstituicao}
                  className="w-20 h-20 object-contain ml-6"
                />
              )}
            </div>

            {/* Categorias */}
            <div className="flex flex-wrap gap-2 mb-6">
              {course.categorias.map((categoria) => (
                <span
                  key={categoria.id}
                  className="px-3 py-1 bg-primary-100 text-primary-700 text-sm rounded-full"
                >
                  {categoria.nome}
                </span>
              ))}
            </div>

            {/* Informações básicas */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="flex items-center text-gray-600">
                <Clock className="h-5 w-5 mr-2" />
                <span>{course.cargaHorariaHoras} horas</span>
              </div>
              <div className="flex items-center text-gray-600">
                <Users className="h-5 w-5 mr-2" />
                <span>{modalityLabels[course.modalidade]}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <BookOpen className="h-5 w-5 mr-2" />
                <span>{levelLabels[course.nivel]}</span>
              </div>
            </div>

            {course.localizacao && (
              <div className="flex items-center text-gray-600 mb-6">
                <MapPin className="h-5 w-5 mr-2" />
                <span>{course.localizacao}</span>
              </div>
            )}

            {/* Botões de ação */}
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href={course.linkInscricao}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary flex items-center justify-center"
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                Inscrever-se Oficialmente
              </a>
              
              {isAuthenticated && isStudent && (
                <button
                  onClick={() => enrollMutation.mutate()}
                  disabled={enrollMutation.isLoading}
                  className="btn-secondary flex items-center justify-center"
                >
                  <CheckCircle className="h-4 w-4 mr-2" />
                  {enrollMutation.isLoading ? 'Inscrevendo...' : 'Marcar Interesse'}
                </button>
              )}
            </div>
          </div>

          {/* Conteúdo */}
          <div className="p-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Descrição e Requisitos */}
              <div className="lg:col-span-2 space-y-6">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-3">
                    Sobre o Curso
                  </h2>
                  <p className="text-gray-700 leading-relaxed">
                    {course.descricao}
                  </p>
                </div>

                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-3">
                    Requisitos
                  </h2>
                  <div className="prose prose-sm text-gray-700">
                    {course.requisitos.split('\n').map((req, index) => (
                      <p key={index}>{req}</p>
                    ))}
                  </div>
                </div>
              </div>

              {/* Sidebar - Informações da Instituição */}
              <div className="space-y-6">
                <div className="card">
                  <h3 className="font-semibold text-gray-900 mb-3">
                    Sobre a Instituição
                  </h3>
                  <p className="text-gray-700 text-sm mb-4">
                    {course.instituicao.descricao}
                  </p>
                  {course.instituicao.urlSite && (
                    <a
                      href={course.instituicao.urlSite}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary-600 hover:text-primary-700 text-sm flex items-center"
                    >
                      <ExternalLink className="h-4 w-4 mr-1" />
                      Visitar Site
                    </a>
                  )}
                </div>

                {!isAuthenticated && (
                  <div className="card bg-primary-50 border-primary-200">
                    <h3 className="font-semibold text-primary-900 mb-2">
                      Quer acompanhar este curso?
                    </h3>
                    <p className="text-primary-700 text-sm mb-4">
                      Cadastre-se para marcar interesse e receber atualizações.
                    </p>
                    <Link to="/cadastro" className="btn-primary text-sm">
                      Cadastrar-se
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;