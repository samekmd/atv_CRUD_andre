# Visão Geral

Este projeto é um sistema **Full Stack** desenvolvido com **TypeScript**, **React** e **Node.js**, utilizando **PostgreSQL** como banco de dados.

## Tecnologias Utilizadas

* **Node.js** com **TypeScript**
* **Express.js** como framework backend
* **PostgreSQL** como banco de dados relacional
* **Prisma** como ORM
* **React** para o frontend
* **Vite** para o bundler e ambiente de desenvolvimento frontend

---

## Configuração do Ambiente

Antes de iniciar o projeto, crie um arquivo `.env` na raiz da pasta `/api` e adicione as seguintes variáveis de ambiente com os valores apropriados:

```ini
DATABASE_URL= sua_url
PORT= sua_porta
JWT_SECRET= sua_jwt_secret
EMAIL_USER= seu_email_de_confiança
EMAIL_PASSWORD= sua_senha_do_nodemailer
```

---

## Instalação e Execução

### 1. Clone o Repositório

```bash
git clone https://github.com/seu-repositorio.git
```

### 2. Instale o Backend

```bash
cd atv_CRUD_andre/api
npm install
# ou
yarn install
```

### 3. Gere os Arquivos Prisma

```bash
npx prisma generate
```

### 4. Inicie o Backend

```bash
npm run dev
```

O backend será executado em `http://localhost:3000` por padrão.

---

### 5. Instale o Frontend

Abra outro terminal e execute:

```bash
cd atv_CRUD_andre/frontend
npm install
# ou
yarn install
```

### 6. Inicie o Frontend

```bash
npm run dev
```

O frontend será executado em `http://localhost:5173` por padrão.

---

## Estrutura do Projeto

```text
atv_CRUD_andre/
│
├── api/              # Backend
│   ├── src/
│   │   ├── controllers/    # Lógica dos controllers (CRUD)
│   │   ├── database/       # Configuração da conexão com o banco
│   │   ├── generated/      # Arquivos gerados pelo Prisma
│   │   ├── middlewares/    # Middlewares (autenticação, etc.)
│   │   ├── services/       # Lógica de negócios
│   │   ├── routes.ts       # Definição das rotas
│   │   └── server.ts       # Inicialização do servidor
│   ├── prisma/             # Schema do Prisma
│   ├── package.json        # Configurações e dependências
│   └── tsconfig.json       # Configurações do TypeScript
│
└── frontend/         # Frontend
    ├── src/
    │   ├── assets/         # Imagens e arquivos estáticos
    │   ├── components/     # Componentes reutilizáveis
    │   ├── hook/           # Hooks personalizados
    │   ├── middlewares/    # Lógicas auxiliares no frontend
    │   ├── pages/          # Páginas da aplicação
    │   ├── services/       # Integração com APIs
    │   ├── App.tsx         # Componente principal
    │   ├── main.tsx        # Ponto de entrada da aplicação
    │   ├── App.css         # Estilos globais
    │   └── index.css       # Estilos base
    ├── package.json        # Configurações e dependências
    └── vite-env.d.ts       # Configuração do ambiente Vite
```

---


