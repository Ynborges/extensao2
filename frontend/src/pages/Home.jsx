import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, Users, Award, TrendingUp } from 'lucide-react';
import { useApi } from '../hooks/useApi';
import { courseService } from '../services/courseService';
import CourseCard from '../components/CourseCard';

const Home = () => {
  const { data: coursesData } = useApi(
    ['courses', { limit: 6 }],
    () => courseService.getCourses({ limit: 6 })
  );

  const featuredCourses = coursesData?.courses || [];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-600 to-primary-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Seu Futuro Profissional
              <span className="block text-secondary-400">Começa Aqui</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-primary-100 max-w-3xl mx-auto">
              Conectamos jovens estudantes de Manaus aos melhores cursos técnicos 
              e profissionalizantes da região
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/cursos" className="bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                Explorar Cursos
              </Link>
              <Link to="/cadastro" className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary-600 transition-colors">
                Cadastrar-se
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-2">500+</h3>
              <p className="text-gray-600">Cursos Disponíveis</p>
            </div>
            <div>
              <div className="bg-secondary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-secondary-600" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-2">10k+</h3>
              <p className="text-gray-600">Estudantes Conectados</p>
            </div>
            <div>
              <div className="bg-yellow-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-yellow-600" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-2">50+</h3>
              <p className="text-gray-600">Instituições Parceiras</p>
            </div>
            <div>
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-2">85%</h3>
              <p className="text-gray-600">Taxa de Empregabilidade</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Courses */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Cursos em Destaque
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Descubra os cursos mais procurados e prepare-se para as oportunidades 
              do mercado de trabalho amazonense
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {featuredCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>

          <div className="text-center">
            <Link 
              to="/cursos" 
              className="inline-flex items-center btn-primary"
            >
              Ver Todos os Cursos
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Pronto para Transformar seu Futuro?
          </h2>
          <p className="text-xl mb-8 text-primary-100 max-w-2xl mx-auto">
            O mercado do Amazonas precisa de 175 mil profissionais qualificados até 2027. 
            Seja um deles!
          </p>
          <Link to="/cadastro" className="bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
            Começar Agora
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;