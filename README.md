# 🚀 Como executar o projeto (Frontend)

Este documento explica passo a passo como rodar o ambiente de desenvolvimento e produção do projeto frontend.

---

## 📌 Pré-requisitos

* Node.js (versão 18 ou superior)
* Yarn

---

## 🛠️ Instalação (Frontend)

### Clone o repositório Frontend

```bash
git clone https://github.com/Move-System/paraty-ged-front.git
cd paraty-ged-front
```

### Instale as dependências Frontend

```bash
yarn install
```

---

## 🧑‍💻 Ambiente de Desenvolvimento (Frontend)

### Configuração

Crie o arquivo `.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:3333
```

### Executar Frontend em Desenvolvimento

Execute o comando:

```bash
yarn dev
```

O frontend estará rodando em: `http://localhost:3000`

---

## 🚀 Ambiente de Produção (Frontend)

### Configuração

Crie o arquivo `.env.production`:

```env
NEXT_PUBLIC_API_URL=sua_url_backend_prod
```

### Build da Aplicação

Compile o código antes de executar em produção:

```bash
yarn build
```

### Executar Frontend em Produção

Após o build, rode:

```bash
yarn start
```

---

## 📌 Estrutura de Branches

* **main**: Branch para ambiente de produção.
* **dev**: Branch para desenvolvimento e testes.
* **feature/...**: Branches específicas para funcionalidades.

---

## 📝 Boas práticas

* Sempre teste funcionalidades na branch `dev` antes de enviar para `main`.
* Nunca faça commit diretamente na branch `main`, sempre faça merge vindo da branch `dev`.

---

## 🚦 Suporte

Se tiver dúvidas ou problemas, entre em contato com a equipe de desenvolvimento.
