import { verificarToken } from '../utils/jwt.js';

export function authMiddleware(req, res, next) {
  // Pega o cabeçalho 'Authorization' enviado na requisição
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({
      sucesso: false,
      erro: 'Token de autenticação não fornecido',
    });
  }

  // O formato padrão é "Bearer <TOKEN>". Vamos separar a palavra Bearer do token real.
  const partes = authHeader.split(' ');

  if (partes.length !== 2) {
    return res.status(401).json({
      sucesso: false,
      erro: 'Erro no formato do token',
    });
  }

  const [schema, token] = partes;

  if (!/^Bearer$/i.test(schema)) {
    return res.status(401).json({
      sucesso: false,
      erro: 'Token malformatado',
    });
  }

  // Valida o token usando nossa função utilitária
  const payload = verificarToken(token);

  if (!payload) {
    return res.status(401).json({
      sucesso: false,
      erro: 'Token inválido ou expirado',
    });
  }

  // Anexa os dados decodificados do usuário no objeto 'req' para a rota final usar se precisar
  req.usuario = payload;

  // Libera a passagem para a próxima função (a rota em si)
  return next();
}