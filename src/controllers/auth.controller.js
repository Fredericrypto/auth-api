import { cadastrarUsuarioService, loginUsuarioService } from '../services/auth.service.js';
import { registerSchema, loginSchema } from '../schemas/auth.schema.js';

export async function registrar(req, res, next) {
  try {
    const validacao = registerSchema.safeParse(req.body);

    if (!validacao.success) {
      return res.status(400).json({
        sucesso: false,
        erros: validacao.error.format(),
      });
    }

    const resultado = await cadastrarUsuarioService(validacao.data);
    return res.status(201).json(resultado);
  } catch (error) {
    // Passa para o error handler global ou retorna erro amigável de duplicidade/banco
    return res.status(400).json({ sucesso: false, erro: 'Erro ao cadastrar' });
  }
}

export async function login(req, res, next) {
  try {
    const validacao = loginSchema.safeParse(req.body);

    if (!validacao.success) {
      return res.status(400).json({
        sucesso: false,
        erros: validacao.error.format(),
      });
    }

    const resultado = await loginUsuarioService(validacao.data);
    return res.status(200).json(resultado);
  } catch (error) {
    if (error.message === 'Credenciais inválidas') {
      return res.status(401).json({ sucesso: false, erro: 'Credenciais inválidas' });
    }
    return res.status(500).json({ sucesso: false, erro: 'Erro interno' });
  }
}

export async function perfil(req, res) {
  return res.status(200).json({
    sucesso: true,
    mensagem: 'Você acessou uma rota protegida com sucesso!',
    usuarioLogado: req.usuario
  });
}
