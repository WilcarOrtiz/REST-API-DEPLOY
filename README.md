<p align="center">
  <a href="https://nodejs.org" target="_blank">
    <img src="https://nodejs.org/static/images/logo.svg" width="120" alt="Node.js Logo" />
  </a>
</p>

API REST construida con **Node.js + Express** siguiendo buenas prácticas de arquitectura MVC, con integración de **MongoDB**, **MySQL** y un sistema de **cache híbrido (NodeCache + Redis)** para alto rendimiento.

---

## 📌 Badges

<p align="center">
  <img src="https://img.shields.io/badge/node-%3E=18-green?logo=node.js" alt="Node.js" />
  <img src="https://img.shields.io/badge/express-5.1.0-blue?logo=express" alt="Express" />
  <img src="https://img.shields.io/badge/redis-cache-red?logo=redis" alt="Redis" />
  <img src="https://img.shields.io/badge/mongodb-6.18.0-green?logo=mongodb" alt="MongoDB" />
  <img src="https://img.shields.io/badge/mysql2-3.14.3-blue?logo=mysql" alt="MySQL" />
  <img src="https://img.shields.io/badge/license-ISC-lightgrey" alt="License" />
</p>

---

## 📦 Stack usado

- **Runtime:** [Node.js](https://nodejs.org/)
- **Framework:** [Express.js](https://expressjs.com/)
- **Bases de Datos:**
  - [MongoDB](https://www.mongodb.com/)
  - [MySQL](https://www.mysql.com/)
- **Cache:**
  - [NodeCache](https://github.com/node-cache/node-cache) (cache en memoria)
  - [Redis](https://redis.io/) (cache distribuido)
- **Validación:** [Zod](https://zod.dev/)
- **Testing:** [Jest](https://jestjs.io/) + [Supertest](https://github.com/ladjs/supertest)
- **Linting:** [ESLint Standard](https://standardjs.com/)

---

## ⚙️ Ejecutar en desarrollo

1. Clonar el repositorio
2. Ejecutar

```
npm install
```

3. Clonar el archivo `.env.template` y renombrar la copia a `.env`

4. Llenar las variables de entorno definida en el `.env`

5. En el archivo __server.js__ puedes seleccionar el modelo especifico (MongoDB, MySQL, Archivo Local)

6. Ejecutar la aplicacion en dev:

```
npm run start
```

[![CI/CD Node.js Docker](https://github.com/WilcarOrtiz/REST-API-DEPLOY/actions/workflows/main.yaml/badge.svg)](https://github.com/WilcarOrtiz/REST-API-DEPLOY/actions/workflows/main.yaml)
