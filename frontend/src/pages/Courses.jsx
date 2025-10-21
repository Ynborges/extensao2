import React, { useState, useEffect } from 'react';
import { Filter } from 'lucide-react';
import { useApi } from '../hooks/useApi';
import { courseService } from '../services/courseService';
import CourseCard from '../components/CourseCard';
import FilterSidebar from '../components/FilterSidebar';

const Courses = () => {
  const [filters, setFilters] = useState({
    search: '',
    modalidade: '',
    nivel: '',
    categoriaId: '',
    page: 1
  });
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const { data: coursesData, isLoading } = useApi(
    ['courses', filters],
    () => courseService.getCourses(filters)
  );

  const { data: categories } = useApi(
    ['categories'],
    () => courseService.getCategories()
  );

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value,
      page: 1 // Reset page when filters change
    }));
  };

  const handlePageChange = (newPage) => {
    setFilters(prev => ({ ...prev, page: newPage }));
  };

  const courses = coursesData?.courses || [];
  const pagination = coursesData?.pagination || {};

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Catálogo de Cursos
          </h1>
          <p className="text-gray-600">
            Encontre o curso ideal para sua carreira profissional
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar de Filtros */}
          <div className="lg:w-80">
            <div className="lg:hidden mb-4">
              <button
                onClick={() => setIsFilterOpen(true)}
                className="flex items-center btn-secondary"
              >
                <Filter className="h-4 w-4 mr-2" />
                Filtros
              </button>
            </div>

            <FilterSidebar
              isOpen={isFilterOpen}
              onClose={() => setIsFilterOpen(false)}
              filters={filters}
              onFilterChange={handleFilterChange}
              categories={categories || []}
            />
          </div>

          {/* Lista de Cursos */}
          <div className="flex-1">
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="card animate-pulse">
                    <div className="h-4 bg-gray-200 rounded mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
                    <div className="h-20 bg-gray-200 rounded mb-4"></div>
                    <div className="h-8 bg-gray-200 rounded"></div>
                  </div>
                ))}
              </div>
            ) : courses.length > 0 ? (
              <>
                {/* Resultados */}
                <div className="mb-6">
                  <p className="text-gray-600">
                    {pagination.total} curso{pagination.total !== 1 ? 's' : ''} encontrado{pagination.total !== 1 ? 's' : ''}
                  </p>
                </div>

                {/* Grid de Cursos */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
                  {courses.map((course) => (
                    <CourseCard key={course.id} course={course} />
                  ))}
                </div>

                {/* Paginação */}
                {pagination.pages > 1 && (
                  <div className="flex justify-center space-x-2">
                    <button
                      onClick={() => handlePageChange(pagination.page - 1)}
                      disabled={pagination.page === 1}
                      className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                    >
                      Anterior
                    </button>
                    
                    {[...Array(pagination.pages)].map((_, i) => {
                      const page = i + 1;
                      return (
                        <button
                          key={page}
                          onClick={() => handlePageChange(page)}
                          className={`px-4 py-2 border rounded-lg ${
                            page === pagination.page
                              ? 'bg-primary-600 text-white border-primary-600'
                              : 'border-gray-300 hover:bg-gray-50'
                          }`}
                        >
                          {page}
                        </button>
                      );
                    })}

                    <button
                      onClick={() => handlePageChange(pagination.page + 1)}
                      disabled={pagination.page === pagination.pages}
                      className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                    >
                      Próxima
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">
                  Nenhum curso encontrado com os filtros selecionados.
                </p>
                <button
                  onClick={() => {
                    setFilters({
                      search: '',
                      modalidade: '',
                      nivel: '',
                      categoriaId: '',
                      page: 1
                    });
                  }}
                  className="mt-4 btn-primary"
                >
                  Limpar Filtros
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Courses;