import { mysqlTable, int, varchar } from 'drizzle-orm/mysql-core';

export const usuariosTable = mysqlTable('usuario', {
  id: int('id').autoincrement().primaryKey(),
  nome: varchar('nome', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  senha: varchar('senha', { length: 255 }).notNull(),
});