const Joi = require('joi');

const registerSchema = Joi.object({
  nomeCompleto: Joi.string().min(2).max(255).required(),
  email: Joi.string().email().required(),
  senha: Joi.string().min(6).required(),
  tipoUsuario: Joi.string().valid('estudante', 'instituicao').required(),
  // Campos específicos do estudante
  nomeEscola: Joi.when('tipoUsuario', {
    is: 'estudante',
    then: Joi.string().min(2).max(255).required(),
    otherwise: Joi.forbidden()
  }),
  areaInteressePrincipal: Joi.when('tipoUsuario', {
    is: 'estudante',
    then: Joi.string().min(2).max(255).required(),
    otherwise: Joi.forbidden()
  }),
  // Campos específicos da instituição
  nomeInstituicao: Joi.when('tipoUsuario', {
    is: 'instituicao',
    then: Joi.string().min(2).max(255).required(),
    otherwise: Joi.forbidden()
  }),
  descricao: Joi.when('tipoUsuario', {
    is: 'instituicao',
    then: Joi.string().min(10).required(),
    otherwise: Joi.forbidden()
  }),
  urlSite: Joi.when('tipoUsuario', {
    is: 'instituicao',
    then: Joi.string().uri().optional(),
    otherwise: Joi.forbidden()
  })
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  senha: Joi.string().required(),
});

const courseSchema = Joi.object({
  titulo: Joi.string().min(5).max(255).required(),
  descricao: Joi.string().min(20).required(),
  modalidade: Joi.string().valid('presencial', 'online').required(),
  nivel: Joi.string().valid('iniciante', 'intermediario', 'avancado').required(),
  cargaHorariaHoras: Joi.number().integer().min(1).required(),
  localizacao: Joi.string().max(255).optional(),
  requisitos: Joi.string().min(10).required(),
  linkInscricao: Joi.string().uri().required(),
  categoriaIds: Joi.array().items(Joi.number().integer().positive()).min(1).required()
});

const opportunitySchema = Joi.object({
  titulo: Joi.string().min(5).max(255).required(),
  descricao: Joi.string().min(20).required(),
  requisitos: Joi.string().min(10).required(),
  categoriaCursoRelacionadaId: Joi.number().integer().positive().optional()
});

module.exports = {
  registerSchema,
  loginSchema,
  courseSchema,
  opportunitySchema,
};