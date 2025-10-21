import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, MapPin, Users, ExternalLink } from 'lucide-react';

const CourseCard = ({ course }) => {
  const modalityLabels = {
    presencial: 'Presencial',
    online: 'Online'
  };

  const levelLabels = {
    iniciante: 'Iniciante',
    intermediario: 'Intermediário',
    avancado: 'Avançado'
  };

  return (
    <div className="card hover:shadow-md transition-shadow duration-200">
      <div className="flex justify-between items-start mb-3">
        <div className="flex-1">
          <h3 className="font-semibold text-lg text-gray-900 mb-2 line-clamp-2">
            {course.titulo}
          </h3>
          <p className="text-sm text-gray-600 mb-2">
            {course.instituicao.nomeInstituicao}
          </p>
        </div>
        {course.instituicao.urlLogo && (
          <img
            src={course.instituicao.urlLogo}
            alt={course.instituicao.nomeInstituicao}
            className="w-12 h-12 object-contain ml-3"
          />
        )}
      </div>

      <p className="text-gray-700 text-sm mb-4 line-clamp-3">
        {course.descricao}
      </p>

      <div className="flex flex-wrap gap-2 mb-4">
        {course.categorias.map((categoria) => (
          <span
            key={categoria.id}
            className="px-2 py-1 bg-primary-100 text-primary-700 text-xs rounded-full"
          >
            {categoria.nome}
          </span>
        ))}
      </div>

      <div className="space-y-2 mb-4">
        <div className="flex items-center text-sm text-gray-600">
          <Clock className="h-4 w-4 mr-2" />
          <span>{course.cargaHorariaHoras}h</span>
          <span className="mx-2">•</span>
          <span>{levelLabels[course.nivel]}</span>
        </div>
        
        <div className="flex items-center text-sm text-gray-600">
          <Users className="h-4 w-4 mr-2" />
          <span>{modalityLabels[course.modalidade]}</span>
          {course.localizacao && (
            <>
              <span className="mx-2">•</span>
              <MapPin className="h-4 w-4 mr-1" />
              <span>{course.localizacao}</span>
            </>
          )}
        </div>
      </div>

      <div className="flex space-x-2">
        <Link
          to={`/cursos/${course.id}`}
          className="flex-1 btn-primary text-center"
        >
          Ver Detalhes
        </Link>
        <a
          href={course.linkInscricao}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-secondary flex items-center justify-center"
        >
          <ExternalLink className="h-4 w-4" />
        </a>
      </div>
    </div>
  );
};

export default CourseCard;