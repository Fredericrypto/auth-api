# 🚀 Auth API — Express + Drizzle ORM + MySQL

API RESTful de autenticação de usuários desenvolvida com Node.js, Express, Drizzle ORM e MySQL, utilizando hash seguro de senhas com Argon2 e validação rigorosa de inputs com Zod.

---

## 🛠️ Tecnologias Atuais (Implementadas)

* **Runtime:** Node.js
* **Framework Web:** Express
* **ORM:** Drizzle ORM
* **Banco de Dados:** MySQL / MariaDB
* **Segurança de Senha:** Argon2 (hashing seguro)
* **Validação de Dados:** Zod (schemas e sanitização)
* **Gerenciamento de Ambiente:** dotenv

---

## 🗺️ Roadmap de Evolução (Próximas Tecnologias)

Para transformar esta API em um padrão corporativo pronto para produção (como o *Cardápio SaaS*), implementaremos as seguintes camadas de forma modular:

1. **🔒 Autenticação Baseada em Sessão / Tokens (JWT ou Cookies HttpOnly)**
   - Emissão de tokens seguros e proteção de rotas privadas.
2. **🛡️ Segurança de Infraestrutura e Cabeçalhos (Helmet & CORS)**
   - Proteção contra vulnerabilidades web comuns (XSS, Clickjacking) e controle de origens permitidas.
3. **⚡ Rate Limiting & Proteção de Força Bruta (Express-Rate-Limit / Redis)**
   - Bloqueio de múltiplos requests e tentativas excessivas de login por IP.
4. **📊 Tratamento Avançado de Erros e Logging (Winston / Morgan)**
   - Padronização de respostas de exceção e auditoria de requisições.

---

## 📂 Estrutura Atual do Projeto

```text
.
├── src/
│   ├── db/
│   │   ├── index.js      # Conexão do pool MySQL com Drizzle ORM
│   │   └── schema.js     # Definição das tabelas do banco de dados
│   └── schemas/
│       └── auth.schema.js # Regras de validação de input com Zod
├── utils/
│   └── auth.js           # Funções utilitárias de hash e verificação (Argon2)
├── server.js             # Entrada da aplicação e rotas (/register, /login)
├── drizzle.config.ts     # Configuração das migrações do Drizzle Kit
├── .env.example          # Modelo de variáveis de ambiente
├── package.json
└── README.md

---
