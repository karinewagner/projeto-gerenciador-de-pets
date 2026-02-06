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

### 1. Execução Local (Desenvolvimento)

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

---

## ✅ Checklist de Implementação (Avaliação Prova Técnica)

Abaixo descrevo como cada ponto solicitado na prova foi atendido neste projeto:

### A. Estrutura e Organização
- [x] **Modularização Angular ou React**: Estrutura de pastas `src/modules/{feature}` (Pets, Tutors) isolando responsabilidades. Componentes UI genéricos em `src/components`.
- [x] **Responsividade e UX**: Interface responsiva construída com **Tailwind CSS**. Layout adaptável para mobile e desktop. Feedback visual com Toasts e Loaders.
- [x] **Documentação (README)**: Este documento cobre instalação, arquitetura e execução.

### B. Funcionalidades
- [x] **Consumo da API (CRUD Completo)**: Implementado em `src/services/petService.ts` e `src/services/tutorService.ts`. Wrapper `authFetch` em `apiService.ts` gerencia headers.
- [x] **Paginação e Busca**: Implementado no backend e frontend. Componentes `Pagination` e `SearchBar` integrados aos hooks de listagem.
- [x] **Autenticação JWT**: Login com armazenamento seguro (localStorage), **validação de expiração do token** (client-side), e interceptor para **renovação automática de token (Refresh Token)** implementado em `src/services/apiService.ts` (lógica de retry 401).
- [x] **Upload de imagens**: Funcionalidade implementada em `petService.ts` (`addPetPhoto`) utilizando `FormData`.
- [x] **Lazy Loading**: Rotas de Pets e Tutors carregadas via `lazy()` em `App.tsx` para performance inicial.
- [x] **State Management**: Uso de **Context API** para estados globais (Toast, ConfirmModal) e **Custom Hooks** (`usePets`) encapsulando a lógica de negócio e estado local complexo.
- [x] **Testes Unitários**: Configuração do **Vitest** presente. Comandos `npm run test` disponíveis.

### C. Boas Práticas e Entrega
- [x] **Clean Code**: Código fortemente tipado (TypeScript), nomes de funções semânticos, separação de responsabilidades (Service vs Component vs Hook).
- [x] **Performance**: Build otimizado com Vite, Lazy Loading e Code Splitting.
- [x] **Containerização**: `Dockerfile` com multi-stage build servindo estáticos via Nginx.
- [x] **Deploy GitHub Pages**: Configuração condicional de `base` em `vite.config.ts` para suporte a múltiplos ambientes (desenvolvimento e produção).
- [x] **CI/CD**: Workflow GitHub Actions para deploy automático no GitHub Pages (`.github/workflows/deploy.yml`).

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
