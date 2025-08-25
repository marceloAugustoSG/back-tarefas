# 📝 Lista de Tarefas - Backend

Backend desenvolvido em **NestJS** com **Prisma** e **PostgreSQL** para gerenciamento de tarefas.

---

## 🚀 Como rodar o projeto

### 1. Clonar o repositório
```bash
git clone [https://github.com/seu-usuario/nome-do-repo.git](https://github.com/marceloAugustoSG/back-tarefas.git
cd nome-do-repo
```

### 2. Instalar dependências
```bash
yarn install
```

### 3. Configurar o banco de dados
Crie um arquivo `.env` na raiz do projeto e adicione a variável:

```env
DATABASE_URL="postgresql://usuario:senha@localhost:5432/nome_banco?schema=public"
```

### 4. Rodar as migrations
```bash
yarn prisma migrate dev
```

### 5. Executar o projeto
```bash
# Desenvolvimento
yarn start:dev

# Produção
yarn start:prod
```

---

## 📌 Rotas disponíveis

### Tarefas (`/tarefas`)
- **GET** `/tarefas` → Lista todas as tarefas  
- **POST** `/tarefas` → Cria uma nova tarefa  
- **GET** `/tarefas/:id` → Busca uma tarefa pelo ID  
- **PUT** `/tarefas/:id` → Atualiza uma tarefa existente  
- **DELETE** `/tarefas/:id` → Remove uma tarefa  

---

## 📂 Exemplos de requisições

### Criar uma tarefa
```json
POST /tarefas
Content-Type: application/json

{
  "titulo": "Estudar NestJS",
  "custo": 0,
  "dataLimite": "2025-09-01"
}
```

### Atualizar uma tarefa
```json
PUT /tarefas/1
Content-Type: application/json

{
  "titulo": "Estudar NestJS (atualizado)",
  "custo": 50,
  "dataLimite": "2025-09-10"
}
```

---

## 🛠 Tecnologias
- [NestJS](https://nestjs.com)  
- [Prisma](https://www.prisma.io/)  
- [PostgreSQL](https://www.postgresql.org/)  

---
📖 Projeto desenvolvido para aprovação de teste técnico. Marcelo Augusto Soares Gomes
