import argon2 from 'argon2';

// Gera o hash seguro da senha
export async function criptografarSenha(senhaPura) {
  try {
    return await argon2.hash(senhaPura);
  } catch (error) {
    throw new Error('Erro ao processar segurança da senha');
  }
}

// Compara a senha digitada com o hash guardado no banco
export async function verificarSenha(senhaDigitada, hashDoBanco) {
  try {
    return await argon2.verify(hashDoBanco, senhaDigitada);
  } catch (error) {
    throw new Error('Erro ao validar credenciais');
  }
}