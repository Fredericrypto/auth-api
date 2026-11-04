// Importa o objeto 'z' da biblioteca 'zod', que é a ferramenta que usaremos para criar regras de validação (schemas)
import { z } from 'zod';

// Cria e exporta um schema de validação chamado 'registerSchema' para validar os dados de cadastro de um novo usuário
export const registerSchema = z.object({

    // Define que o campo 'nome' obrigatoriamente precisa ser uma string (texto) e ter no mínimo 2 caracteres. 
    // Caso contrário, rejeita com a mensagem de erro personalizada informada.
    nome: z.string().min(2, "O nome deve ter pelo menos 2 caracteres"),

    // Define que o campo 'email' obrigatoriamente precisa ser uma string e seguir o formato estrutural padrão de um e-mail (ex: texto@texto.com).
    // Caso o formato esteja incorreto, retorna a mensagem de erro personalizada.
    email: z.string().email("Formato de e-mail inválido"),

    // Define que o campo 'senha' obrigatoriamente precisa ser uma string e ter no mínimo 6 caracteres de comprimento.
    // Se for menor que isso, retorna a mensagem de erro personalizada.
    senha: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),

// Fecha a definição do objeto de regras para o registro
});

// Cria e exporta um segundo schema de validação chamado 'loginSchema', focado nas regras exigidas na hora de entrar na conta
export const loginSchema = z.object({

    // Define que o campo 'email' no login precisa ser uma string e obrigatoriamente ter um formato de e-mail válido.
    email: z.string().email("Formato de email inválido"),

    // Define que o campo 'senha' no login precisa ser uma string e ter no mínimo 1 caractere (ou seja, não pode vir vazio ou nulo).
    senha: z.string().min(1, "A senha é obrigatória"),

// Fecha a definição do objeto de regras para o login
});