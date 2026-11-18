import { db } from '../db/index.js';
import { usuariosTable } from '../db/schema.js';
import { eq } from 'drizzle-orm';
import { criptografarSenha, verificarSenha } from '../../utils/auth.js';
import { gerarToken } from '../utils/jwt.js';

export async function cadastrarUsuarioService(dados) {
  const { nome, email, senha } = dados;

  // Criptografa a senha com Argon2
  const senhaHash = await criptografarSenha(senha);

  // Insere no banco de dados
  await db.insert(usuariosTable).values({
    nome,
    email,
    senha: senhaHash,
  });

  return { sucesso: true, mensagem: 'Usuário cadastrado com sucesso' };
}

export async function loginUsuarioService(dados) {
  const { email, senha } = dados;

  // Busca o usuário no banco
  const [usuario] = await db.select().from(usuariosTable).where(eq(usuariosTable.email, email));

  if (!usuario) {
    throw new Error('Credenciais inválidas');
  }

  // Verifica a senha
  const senhaValida = await verificarSenha(senha, usuario.senha);

  if (!senhaValida) {
    throw new Error('Credenciais inválidas');
  }

  // Gera o token JWT
  const token = gerarToken(usuario);

  return {
    sucesso: true,
    mensagem: 'Login autorizado!',
    token
  };
}
