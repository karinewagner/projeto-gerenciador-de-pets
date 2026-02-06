# Estágio 1: Build (Ambiente Node para compilar o projeto)
FROM node:20-alpine AS build

WORKDIR /app

# Declaração dos argumentos de build. 
# O Vite exige que as variáveis estejam presentes no momento da compilação (npm run build)
ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL

# Copia apenas os arquivos de dependências para aproveitar o cache do Docker
COPY package*.json ./
RUN npm install

# Copia o restante do código fonte
COPY . .

# Executa o build do projeto (Gera a pasta /dist)
RUN npm run build

# Estágio 2: Produção (Servidor Nginx para servir os arquivos estáticos)
FROM nginx:stable-alpine

# Remove as configurações padrões do Nginx
RUN rm -rf /etc/nginx/conf.d/*

# Copia a nossa configuração customizada para o Nginx (suporte ao React Router)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copia os arquivos gerados no estágio de build para a pasta que o Nginx serve
COPY --from=build /app/dist /usr/share/nginx/html

# Porta padrão do container
EXPOSE 80

# Inicia o Nginx
CMD ["nginx", "-g", "daemon off;"]