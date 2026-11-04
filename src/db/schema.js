// Importa as funções essenciais do Drizzle específicas para o ecossistema MySQL/MariaDB:
// 'mysqlTable' para definir tabelas, 'int' para colunas numéricas inteiras e 'varchar' para textos de tamanho variável.
import { mysqlTable, int, varchar } from 'drizzle-orm/mysql-core';

// Cria e exporta a constante 'usuariosTable', que mapeia a estrutura da tabela no banco de dados para o código JavaScript/TypeScript.
export const usuariosTable = mysqlTable('usuario', {

  // Define a coluna 'id' como um número inteiro (int), configurada para autoincrementar a cada inserção (autoincrement) 
  // e estipulada como a Chave Primária (primaryKey) da tabela.
  id: int('id').autoincrement().primaryKey(),

  // Define a coluna 'nome' como um texto do tipo VARCHAR com um limite máximo de 255 caracteres.
  // O '.notNull()' força que o campo seja obrigatório (não aceita valores nulos/null no banco).
  nome: varchar('nome', { length: 255 }).notNull(),

  // Define a coluna 'email' como um VARCHAR de até 255 caracteres, obrigatório (.notNull()) 
  // e configurado com restrição única (.unique()), impedindo que dois usuários tenham o mesmo endereço de e-mail.
  email: varchar('email', { length: 255 }).notNull().unique(),

  // Define a coluna 'senha' como um VARCHAR de até 255 caracteres (espaço reservado para armazenar o hash seguro gerado pelo Argon2) 
  // e configurado como obrigatório (.notNull()).
  senha: varchar('senha', { length: 255 }).notNull(),

// Fecha o objeto de definição das colunas e o mapeamento da tabela 'usuario'
});