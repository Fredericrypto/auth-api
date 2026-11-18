<div align="center">
  <img src="./docs/banner.png" alt="Auth API Banner" width="100%">
</div>

---

# Auth API 🔒

A secure, production-ready authentication microservice built with **Node.js, Express, Drizzle ORM, and PostgreSQL**, focusing on robust backend security best practices (AppSec), modular architecture, and full containerization via Docker.

---

## 🚀 Tech Stack & Core Libraries

- **Runtime:** Node.js (v20+)
- **Framework:** Express.js
- **Database & ORM:** PostgreSQL & Drizzle ORM
- **Containerization:** Docker & Docker Compose
- **Validation:** Zod (Strict schema validation for incoming payloads)
- **Security & Cryptography:** 
  - **Argon2:** Advanced password hashing for brute-force resistance.
  - **jsonwebtoken (JWT):** Stateless session management.
  - **Helmet:** HTTP header hardening against common web vulnerabilities.
  - **CORS:** Strict dynamic whitelist for trusted origin validation.
  - **express-rate-limit:** Brute-force and DDoS defense for sensitive routes.
- **Documentation:** Swagger UI (`/api-docs`)

---

## 🛠️ Security Architecture Highlights

1. **Input Validation & Sanitization:** All incoming requests are strictly validated at the boundary using Zod schemas before hitting business logic.
2. **Password Hashing:** Utilizing Argon2 instead of legacy algorithms to protect user credentials against modern hardware cracking.
3. **HTTP Header Hardening:** Configured via Helmet to mitigate XSS, clickjacking, and MIME-sniffing attacks.
4. **Strict CORS Policy:** Replaced insecure wildcards (`*`) with a dynamic origin whitelist restricted to trusted environments.
5. **Rate Limiting:** Implemented custom thresholds (e.g., rigorous limits on `/login` to thwart credential stuffing and brute-force attacks).

---

## 🎯 Demonstration

<div align="center">
  <img src="./docs/demo.gif" alt="Auth API Demo" width="100%">
</div>

---

## ⚙️ Getting Started with Docker (Recommended)

A forma mais rápida e isolada de rodar o projeto é utilizando o Docker Compose, que já gerencia a API e o banco PostgreSQL integrados.

### Prerequisites
- Docker & Docker Compose instalados na máquina.

### Installation & Execution

1. Clone the repository:
   ```bash
   git clone https://github.com/Fredericrypto/auth-api.git
   cd auth-api
   ```

2. Configure o arquivo `.env` na raiz do projeto:
   ```env
   PORT=3000
   DATABASE_URL=postgres://postgres:secretpassword@postgres:5432/auth_db
   JWT_SECRET=sua_chave_secreta_super_segura_aqui
   ```

3. Suba os containers com o Docker Compose:
   ```bash
   docker compose up --build
   ```

O servidor estará rodando em `http://localhost:3000` e a documentação interativa do Swagger estará disponível em `http://localhost:3000/api-docs`.