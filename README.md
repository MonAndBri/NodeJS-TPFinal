 # 🛒 NodeJS TP Final

![Node.js](https://img.shields.io/badge/Node.js-v16+-green)
![Express](https://img.shields.io/badge/Express-4.x-blue)
![Vercel](https://img.shields.io/badge/Deploy-Vercel-black?logo=vercel)

## 📖 Descripción

Este proyecto es una API RESTful construida en Node.js + Express que permite gestionar productos alojados en Firebase.  
Incluye autenticación mediante JWT y endpoints protegidos para operaciones CRUD sobre los productos.  

- Autenticación de usuarios con `/auth/login`
- CRUD de productos (`/api/products`)
- Desplegado en [Vercel](https://node-js-tp-final-mab.vercel.app)

---

## 🚀 Características

- CRUD de productos (`/api/products`)  
- Autenticación JWT (`/auth/login`)  
- JSON como formato principal  
- Compatible con **Vercel Serverless Functions**  

---

## 📁 Estructura del proyecto

/api  

└── products.js      # Funciones API para productos  

/auth  

└── login.js         # Funciones para login  

src/  

├── routes/          # Rutas de la API  

├── controllers/     # Lógica de controladores  

├── data/            # Datos de ejemplo o DB  

└── app.js           # Configuración de Express  

package.json  

vercel.json  

README.md

---

## 🔧 Requisitos

- Node.js v16+
- npm

---

## 📥 Instalación

```bash
git clone https://github.com/MonAndBri/NodeJS-TPFinal
cd NodeJS-TPFinal
npm install
```

## ▶️ Ejecutar en Local
```bash
npm start
```
### Servidor local:
http://localhost:3000

## ☁️ Despliegue en Vercel

El proyecto está configurado para funcionar en Vercel a través de:

vercel.json

### URL de producción:

https://node-js-tp-final-mab.vercel.app/

## 🛠️ Tecnologías utilizadas

Node JS

Express

Firebase

JavaScript

JWT para autenticación

Vercel Serverless Functions

## 🌐 Endpoints API

Todas las rutas requieren Content-Type: application/json.
Las rutas /api/products requieren Authorization: Bearer <JWT_TOKEN> excepto /auth/login y los métods GET

| Método | Endpoint            | Body                                                         | cURL                                                                                                                                                                                             | Ejemplo de Respuesta                                                                                                                                                                                                       |
| ------ | ------------------- | ------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| POST   | `/auth/login`       | `{ "username": "usuario", "password": "contraseña" }`        | ```bash curl -X POST http://localhost:3000/auth/login -H "Content-Type: application/json" -d '{"username":"usuario","password":"contraseña"}'```                                                     | 200: `{ "token": "<JWT_TOKEN>", "message": "Login exitoso" }`<br>401: `{ "error": "Credenciales inválidas" }`                                                                                                              |
| GET    | `/api/products`     | -                                                            | `bash curl -H "Authorization: Bearer <JWT_TOKEN>" http://localhost:3000/api/products`                                                                                                            | 200: `[{"id":1,"nombre":"Producto 1","precio":120,"stock":10},{"id":2,"nombre":"Producto 2","precio":250,"stock":5}]`<br>401: `{ "error": "Token inválido o faltante" }`                                                   |
| GET    | `/api/products/:id` | -                                                            | `bash curl -H "Authorization: Bearer <JWT_TOKEN>" http://localhost:3000/api/products/1`                                                                                                          | 200: `{ "id":1,"nombre":"Producto 1","precio":120,"stock":10 }`<br>404: `{ "error":"Producto no encontrado" }`<br>401: `{ "error":"Token inválido o faltante" }`                                                           |
| POST   | `/api/products`     | `{ "nombre":"Producto nuevo", "precio":123, "stock":10 }`    | `bash curl -X POST http://localhost:3000/api/products -H "Authorization: Bearer <JWT_TOKEN>" -H "Content-Type: application/json" -d '{"nombre":"Producto nuevo","precio":123,"stock":10}'`       | 201: `{ "id":3,"nombre":"Producto nuevo","precio":123,"stock":10 }`<br>400: `{ "error":"Faltan campos requeridos" }`<br>401: `{ "error":"Token inválido o faltante" }`                                                     |
| PUT    | `/api/products/:id` | `{ "nombre":"Producto actualizado","precio":150,"stock":8 }` | `bash curl -X PUT http://localhost:3000/api/products/3 -H "Authorization: Bearer <JWT_TOKEN>" -H "Content-Type: application/json" -d '{"nombre":"Producto actualizado","precio":150,"stock":8}'` | 200: `{ "id":3,"nombre":"Producto actualizado","precio":150,"stock":8 }`<br>400: `{ "error":"Faltan campos requeridos" }`<br>404: `{ "error":"Producto no encontrado" }`<br>401: `{ "error":"Token inválido o faltante" }` |
| DELETE | `/api/products/:id` | -                                                            | `bash curl -X DELETE http://localhost:3000/api/products/3 -H "Authorization: Bearer <JWT_TOKEN>"`                                                                                                | 200: `{ "message":"Producto eliminado correctamente" }`<br>404: `{ "error":"Producto no encontrado" }`<br>401: `{ "error":"Token inválido o faltante" }`                                                                   |

## 👤 Autor

** MonAndBri **
Repositorio: https://github.com/MonAndBri/NodeJS-TPFinal











