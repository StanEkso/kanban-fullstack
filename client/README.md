# Kanban FE Application

## Description

Kanban FE - is Front End part of Kanban application.

## Local installation

---

### Install dependencies

```bash
npm install
```

---

### Run application

Be sure to config `./env.local` with example schema

```bash
npm run dev
```

## Technical Stack

There are two big parts of application. Furthermore, there is Docker configuration

---

### Front End

- Javascript/Typescript
- React
  - v18
  - Server components
  - Suspense and etc.
- Next.js
  - v13
  - /app directory
  - /src folder
  - SSG, SSR, CSR
- Redux
  - Redux Saga as tool to perform async operations
  - Redux Toolkit to create pretty code
  - Redux Toolkit Query to perform cacheable queries
    - \*With axios base query
- Axios
  - Base url
  - Attach token interceptors
- Styling
  - SCSS for major styles
  - TailwindCSS for some utility classes

## Useful links

- Deploy - [kanban-fullstack.vercel.app](kanban-fullstack.vercel.app)

## [Back to main](../README.md)
