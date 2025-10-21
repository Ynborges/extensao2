import React from 'react';
import { X } from 'lucide-react';

const FilterSidebar = ({ 
  isOpen, 
  onClose, 
  filters, 
  onFilterChange, 
  categories = [] 
}) => {
  const modalityOptions = [
    { value: '', label: 'Todas' },
    { value: 'presencial', label: 'Presencial' },
    { value: 'online', label: 'Online' }
  ];

  const levelOptions = [
    { value: '', label: 'Todos' },
    { value: 'iniciante', label: 'Iniciante' },
    { value: 'intermediario', label: 'Intermediário' },
    { value: 'avancado', label: 'Avançado' }
  ];

  return (
    <>
      {/* Overlay para mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed lg:static inset-y-0 left-0 z-50 w-80 bg-white shadow-lg lg:shadow-none
        transform transition-transform duration-300 ease-in-out lg:transform-none
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="p-6">
          <div className="flex items-center justify-between mb-6 lg:hidden">
            <h2 className="text-lg font-semibold">Filtros</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="space-y-6">
            {/* Busca por palavra-chave */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Buscar
              </label>
              <input
                type="text"
                placeholder="Digite uma palavra-chave..."
                value={filters.search || ''}
                onChange={(e) => onFilterChange('search', e.target.value)}
                className="input-field"
              />
            </div>

            {/* Modalidade */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Modalidade
              </label>
              <select
                value={filters.modalidade || ''}
                onChange={(e) => onFilterChange('modalidade', e.target.value)}
                className="input-field"
              >
                {modalityOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Nível */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nível
              </label>
              <select
                value={filters.nivel || ''}
                onChange={(e) => onFilterChange('nivel', e.target.value)}
                className="input-field"
              >
                {levelOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Categoria */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Área
              </label>
              <select
                value={filters.categoriaId || ''}
                onChange={(e) => onFilterChange('categoriaId', e.target.value)}
                className="input-field"
              >
                <option value="">Todas as áreas</option>
                {categories.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.nome}
                  </option>
                ))}
              </select>
            </div>

            {/* Botão para limpar filtros */}
            <button
              onClick={() => {
                onFilterChange('search', '');
                onFilterChange('modalidade', '');
                onFilterChange('nivel', '');
                onFilterChange('categoriaId', '');
              }}
              className="w-full btn-secondary"
            >
              Limpar Filtros
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default FilterSidebar;