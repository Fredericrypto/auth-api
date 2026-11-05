import jwt from 'jsonwebtoken';

// Chave secreta puxada diretamente das variáveis de ambiente
const JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret';

// Função para gerar o token com validade (ex: 1 dia)
export function gerarToken(usuario) {
  return jwt.sign(
    { id: usuario.id, email: usuario.email, nome: usuario.nome },
    JWT_SECRET,
    { expiresIn: '1d' } // O token expira em 1 dia
  );
}

// Função para verificar se um token enviado é válido
export function verificarToken(token) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    return null; // Retorna null se o token for falso, adulterado ou expirado
  }
}