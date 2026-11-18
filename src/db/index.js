import 'dotenv/config';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

// Cria a conexão utilizando a URL do ambiente (apontando para o container 'postgres')
const client = postgres(process.env.DATABASE_URL);

export const db = drizzle(client);