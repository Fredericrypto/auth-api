# Usa a imagem oficial e leve do Node.js baseada em Alpine Linux
FROM node:20-alpine

# Instala ferramentas de compilação necessárias para pacotes nativos (como argon2)
RUN apk add --no-cache python3 make g++

# Define o diretório de trabalho dentro do container
WORKDIR /app

# Copia os arquivos de dependências
COPY package*.json ./

# Instala as dependências incluindo os pacotes nativos
RUN npm install

# Copia todo o restante do código fonte do projeto
COPY . .

# Expõe a porta em que a aplicação roda
EXPOSE 3000

# Comando para iniciar o servidor em modo de desenvolvimento
CMD ["npm", "run", "dev"]