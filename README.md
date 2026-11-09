# Auth API <img src="https://api.iconify.design/lucide:shield-check.svg?color=%23ef4444&width=24" width="24" height="24" align="absmiddle" />

A secure, production-ready authentication microservice built with **Node.js, Express, Drizzle ORM, and MySQL**, focusing on robust backend security best practices (AppSec) and modular architecture.

---

## <img src="https://api.iconify.design/lucide:cpu.svg?color=%233b82f6&width=20" width="20" height="20" align="absmiddle" /> Tech Stack & Core Libraries

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database & ORM:** MySQL & Drizzle ORM
- **Validation:** Zod *(Strict schema validation for incoming payloads)*
- **Security & Cryptography:** 
  - **Argon2:** Advanced password hashing for brute-force resistance.
  - **jsonwebtoken (JWT):** Stateless session management.
  - **Helmet:** HTTP header hardening against common web vulnerabilities.
  - **CORS:** Strict dynamic whitelist for trusted origin validation.
  - **express-rate-limit:** Brute-force and DDoS defense for sensitive routes.

---

## <img src="https://api.iconify.design/lucide:lock.svg?color=%2310b981&width=20" width="20" height="20" align="absmiddle" /> Security Architecture Highlights

1. **Input Validation & Sanitization:** All incoming requests are strictly validated at the boundary using Zod schemas before hitting business logic.
2. **Password Hashing:** Utilizing Argon2 instead of legacy algorithms to protect user credentials against modern hardware cracking.
3. **HTTP Header Hardening:** Configured via Helmet to mitigate XSS, clickjacking, and MIME-sniffing attacks.
4. **Strict CORS Policy:** Replaced insecure wildcards (`*`) with a dynamic origin whitelist restricted to trusted environments.
5. **Rate Limiting:** Implemented custom thresholds (e.g., rigorous limits on `/login` to thwart credential stuffing and brute-force attacks).

---

## <img src="https://api.iconify.design/lucide:terminal.svg?color=%23f59e0b&width=20" width="20" height="20" align="absmiddle" /> Getting Started

### Prerequisites
- Node.js installed
- Running MySQL instance

### Installation

1. Clone the repository:
   ```bash
   git clone [https://github.com/Fredericrypto/auth-api.git](https://github.com/Fredericrypto/auth-api.git)
   cd auth-api
