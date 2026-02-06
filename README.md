# Processo Seletivo SEPLAG

> **Inscrição Nº:** 16547  
> **Vaga:** PROCESSO SELETIVO CONJUNTO Nº 001/2026/SEPLAG e demais Órgãos - Engenheiro da Computação - Sênior
> 🔗 **Demo:** [https://karinewagner.github.io/projeto-gerenciador-de-pets/login](https://karinewagner.github.io/projeto-gerenciador-de-pets/login)

## 📋 Visão Geral do Projeto

Este projeto é uma aplicação Single Page Application (SPA) desenvolvida em **React 18** com **TypeScript**, focada em atender os requisitos técnicos do processo seletivo para Engenheiro da Computação Sênior.

O sistema permite o gerenciamento completo de Pets e Tutores, incluindo autenticação segura, uploads de imagens, listagens e vínculo entre entidades.

---

## 🏗️ Arquitetura e Decisões Técnicas

A arquitetura foi pensada para atender aos critérios de **modularização**, **clean code** e **escalabilidade**.

- **Modularização**: O código está organizado em módulos (`src/modules`), onde cada domínio (Pets, Tutors) possui suas próprias rotas, páginas e lógica, facilitando a escalabilidade.
- **Componentização**: Componentes reutilizáveis (UI Kit) estão em `src/components`.
- **Camada de Serviço (Service Layer)**: Toda a comunicação com a API é centralizada em `src/services`, desacoplando a UI da lógica de dados.
- **Custom Hooks (Facade Pattern)**: Hooks como `usePets` atuam como uma fachada para a lógica de estado e busca de dados, simplificando os componentes de visualização.
- **Performance**:
  - **Lazy Loading**: As rotas principais são carregadas sob demanda (`React.lazy`).
  - **Otimização de Renderização**: Uso de React Hooks padrão e TypeScript para garantir type-safety.

### Tecnologias Principais

- **Frontend**: React 18, TypeScript, Vite
- **Roteamento**: React Router DOM 6
- **Estilização**: Tailwind CSS (Responsividade e Design System)
- **Qualidade de Código**: ESLint, Prettier
- **Testes**: Vitest, React Testing Library
- **Containerização**: Docker, Docker Compose

---

## 🚀 Como Executar o Projeto

Você pode executar o projeto de duas formas: localmente com Node.js ou via Docker.

### Pré-requisitos
- Node.js 18+ (para execução local)
- Docker e Docker Compose (para execução em container)

### 1. Execução Local

1. Clone o repositório e acesse a pasta:
   ```bash
   git clone <repo-url>
   cd projeto-gerenciador-de-pets
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Crie o arquivo `.env` na raiz (baseado no `.env.example`):
   ```env
   VITE_API_URL=https://pet-manager-api.geia.vip
   ```

4. Execute o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```
   Acesse: `http://localhost:5173`

### 2. Execução via Docker

O projeto possui um `Dockerfile` otimizado com multi-stage build (Build -> Nginx).

1. Construa e suba o container:
   ```bash
   docker-compose up -d --build
   ```

2. Acesse a aplicação:
   Acesse: `http://localhost:8080`

*Nota: A URL da API é injetada via ARG de build no Dockerfile e environment no docker-compose.*

### 3. Rodando a imagem do DockerHub
Puxe a imagem diretamente do DockerHub e execute.

1️⃣ Puxe a imagem do DockerHub:
   ```bash
   docker pull karinewagner/busca-pet-app
   ```
2️⃣ Rode o container:
   ```bash
   docker run -p 8080:80 karinewagner/busca-pet-app
   ```
3️⃣ Acesse no navegador: 

http://localhost:8080

> **Nota**: Certifique-se de que o Docker está instalado e rodando em sua máquina para as opções 2 e 3.

---
## 🔗 API utilizada

Documentação dos endpoints: https://pet-manager-api.geia.vip/q/swagger-ui/

---

## 🧪 Testes

Para rodar os testes unitários configurados com Vitest:

```bash
npm run test
```

Para ver a cobertura (se configurado):
```bash
npm run test:run
```

---

## 📂 Estrutura de Pastas

```
src/
├── components/   # Componentes reutilizáveis (Input, Button, Layouts)
├── contexts/     # Estado global (Toast, Auth/Confirm)
├── hooks/        # Custom Hooks (Lógica de API/Estado)
├── modules/      # Módulos de negócio (Feature-based)
│   ├── pets/     # Rotas, Páginas e Componentes de Pets
│   └── tutors/   # Rotas, Páginas e Componentes de Tutores
├── pages/        # Páginas genéricas (Login, 404)
├── services/     # Camada de comunicação com API (Axios/Fetch)
└── types/        # Definições de Tipos TypeScript (Interfaces)
```
