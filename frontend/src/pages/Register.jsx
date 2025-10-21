import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Eye, EyeOff, UserPlus } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import toast from 'react-hot-toast';

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [userType, setUserType] = useState('estudante');
  const { register: registerUser } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm();

  const watchedUserType = watch('tipoUsuario', 'estudante');

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      await registerUser(data);
      toast.success('Cadastro realizado com sucesso!');
      navigate('/');
    } catch (error) {
      toast.error(error.response?.data?.error || 'Erro ao fazer cadastro');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">
            Criar sua conta
          </h2>
          <p className="mt-2 text-gray-600">
            Já tem uma conta?{' '}
            <Link to="/login" className="text-primary-600 hover:text-primary-500">
              Faça login
            </Link>
          </p>
        </div>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            {/* Tipo de usuário */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tipo de conta
              </label>
              <div className="grid grid-cols-2 gap-3">
                <label className="flex items-center">
                  <input
                    {...register('tipoUsuario', { required: true })}
                    type="radio"
                    value="estudante"
                    className="mr-2"
                  />
                  <span className="text-sm">Estudante</span>
                </label>
                <label className="flex items-center">
                  <input
                    {...register('tipoUsuario', { required: true })}
                    type="radio"
                    value="instituicao"
                    className="mr-2"
                  />
                  <span className="text-sm">Instituição</span>
                </label>
              </div>
            </div>

            {/* Dados básicos */}
            <div>
              <label htmlFor="nomeCompleto" className="block text-sm font-medium text-gray-700">
                Nome Completo
              </label>
              <div className="mt-1">
                <input
                  {...register('nomeCompleto', {
                    required: 'Nome completo é obrigatório',
                    minLength: {
                      value: 2,
                      message: 'Nome deve ter pelo menos 2 caracteres'
                    }
                  })}
                  type="text"
                  className="input-field"
                  placeholder="Seu nome completo"
                />
                {errors.nomeCompleto && (
                  <p className="mt-1 text-sm text-red-600">{errors.nomeCompleto.message}</p>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <div className="mt-1">
                <input
                  {...register('email', {
                    required: 'Email é obrigatório',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Email inválido'
                    }
                  })}
                  type="email"
                  className="input-field"
                  placeholder="seu@email.com"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="senha" className="block text-sm font-medium text-gray-700">
                Senha
              </label>
              <div className="mt-1 relative">
                <input
                  {...register('senha', {
                    required: 'Senha é obrigatória',
                    minLength: {
                      value: 6,
                      message: 'Senha deve ter pelo menos 6 caracteres'
                    }
                  })}
                  type={showPassword ? 'text' : 'password'}
                  className="input-field pr-10"
                  placeholder="Sua senha"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-gray-400" />
                  ) : (
                    <Eye className="h-4 w-4 text-gray-400" />
                  )}
                </button>
              </div>
              {errors.senha && (
                <p className="mt-1 text-sm text-red-600">{errors.senha.message}</p>
              )}
            </div>

            {/* Campos específicos do estudante */}
            {watchedUserType === 'estudante' && (
              <>
                <div>
                  <label htmlFor="nomeEscola" className="block text-sm font-medium text-gray-700">
                    Nome da Escola
                  </label>
                  <div className="mt-1">
                    <input
                      {...register('nomeEscola', {
                        required: watchedUserType === 'estudante' ? 'Nome da escola é obrigatório' : false
                      })}
                      type="text"
                      className="input-field"
                      placeholder="Nome da sua escola"
                    />
                    {errors.nomeEscola && (
                      <p className="mt-1 text-sm text-red-600">{errors.nomeEscola.message}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label htmlFor="areaInteressePrincipal" className="block text-sm font-medium text-gray-700">
                    Área de Interesse Principal
                  </label>
                  <div className="mt-1">
                    <select
                      {...register('areaInteressePrincipal', {
                        required: watchedUserType === 'estudante' ? 'Área de interesse é obrigatória' : false
                      })}
                      className="input-field"
                    >
                      <option value="">Selecione uma área</option>
                      <option value="Tecnologia da Informação">Tecnologia da Informação</option>
                      <option value="Logística">Logística</option>
                      <option value="Metalmecânica">Metalmecânica</option>
                      <option value="Eletroeletrônica">Eletroeletrônica</option>
                      <option value="Construção Civil">Construção Civil</option>
                      <option value="Administração">Administração</option>
                      <option value="Saúde">Saúde</option>
                      <option value="Turismo e Hospitalidade">Turismo e Hospitalidade</option>
                    </select>
                    {errors.areaInteressePrincipal && (
                      <p className="mt-1 text-sm text-red-600">{errors.areaInteressePrincipal.message}</p>
                    )}
                  </div>
                </div>
              </>
            )}

            {/* Campos específicos da instituição */}
            {watchedUserType === 'instituicao' && (
              <>
                <div>
                  <label htmlFor="nomeInstituicao" className="block text-sm font-medium text-gray-700">
                    Nome da Instituição
                  </label>
                  <div className="mt-1">
                    <input
                      {...register('nomeInstituicao', {
                        required: watchedUserType === 'instituicao' ? 'Nome da instituição é obrigatório' : false
                      })}
                      type="text"
                      className="input-field"
                      placeholder="Nome da sua instituição"
                    />
                    {errors.nomeInstituicao && (
                      <p className="mt-1 text-sm text-red-600">{errors.nomeInstituicao.message}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label htmlFor="descricao" className="block text-sm font-medium text-gray-700">
                    Descrição
                  </label>
                  <div className="mt-1">
                    <textarea
                      {...register('descricao', {
                        required: watchedUserType === 'instituicao' ? 'Descrição é obrigatória' : false,
                        minLength: {
                          value: 10,
                          message: 'Descrição deve ter pelo menos 10 caracteres'
                        }
                      })}
                      rows={3}
                      className="input-field"
                      placeholder="Descreva sua instituição"
                    />
                    {errors.descricao && (
                      <p className="mt-1 text-sm text-red-600">{errors.descricao.message}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label htmlFor="urlSite" className="block text-sm font-medium text-gray-700">
                    Site (opcional)
                  </label>
                  <div className="mt-1">
                    <input
                      {...register('urlSite', {
                        pattern: {
                          value: /^https?:\/\/.+/,
                          message: 'URL deve começar com http:// ou https://'
                        }
                      })}
                      type="url"
                      className="input-field"
                      placeholder="https://www.suainstituicao.com"
                    />
                    {errors.urlSite && (
                      <p className="mt-1 text-sm text-red-600">{errors.urlSite.message}</p>
                    )}
                  </div>
                </div>
              </>
            )}

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center items-center btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                ) : (
                  <UserPlus className="h-4 w-4 mr-2" />
                )}
                {isLoading ? 'Cadastrando...' : 'Criar Conta'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;