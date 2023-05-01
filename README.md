# Kanban Fullstack Application

## Description

Kanban - is application for managing kanban boards. You can create board, invite your collegues or friends and track some progress.

## Local installation

---

### Install dependencies

```bash
npm run install
```

---

### Run application

Be sure to config `./client/env.local` and `./server/env/development.env` with example schemas

#### Front end

```bash
npm run start:fe:dev
```

#### Back end

```bash
npm run start:fe:dev
```

## Technical Stack

There are two big parts of application. Furthermore, there is Docker configuration

---

### Front End

- Javascript (Typescipt)
- React
- Next.js
- Redux
- Axios

[Read more](./client/README.md)

---

### Back End

- Node.JS (with Typescript)
- Nest.JS
- PostgreSQL
- TypeORM

[Read more](./server/README.md)

---

### Deployment

- Docker
- Docker Compose
- Heroku (for Back End)

## Useful links

- FE Deploy - [kanban-fullstack.vercel.app](kanban-fullstack.vercel.app)

- BE Deploy - [https://coursework-kanban.herokuapp.com/](https://coursework-kanban.herokuapp.com/)

- BE Documentation - [https://coursework-kanban.herokuapp.com/docs](https://coursework-kanban.herokuapp.com/docs)
