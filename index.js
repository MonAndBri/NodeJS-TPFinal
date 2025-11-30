import express from "express";
import cors from 'cors';
import productsRouter from './src/routes/products.routes.js';
import authRouter from './src/routes/auth.routes.js';
import { authentication } from "./src/middlewares/authentication.js"

const app = express();
const PORT = process.env.PORT || 3000;

const corsConfig = {
    //origin: ['http://localhost:3000', 'https://midominio.com'], // dominios permitidos
    origin: (origin, callback) => {callback(null, true);}, // para no poner dominios "en duro"
    methods: ['GET', 'POST', 'PUT', 'DELETE'],                  // métodos permitidos
    allowedHeaders: ['Content-Type', 'Authorization'],          // cabeceras permitidas
    exposedHeaders: ['Content-Length'],                         // cabeceras visibles al cliente
    credentials: true,                                          // habilitar credenciales
    maxAge: 600,                                                // cache preflight
    optionsSuccessStatus: 204                                   // respuesta preflight exitosa
}
app.use(cors(corsConfig));

app.use(express.json());  // para usar json en el body

app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});

// Routers
app.use('/auth', authRouter);
app.use("/api", productsRouter);

// Middleware para manejar rutas desconocidas
app.use((req, res, next) => {
    res.status(404).send('Recurso no encontrado o ruta inválida');
});

// Middleware para manejar errores generales
app.use((err, req, res, next) => {
    console.error('ERROR:', err);
    res.status(500).json({
        error: 'Ocurrió un error interno en el servidor'
    });
});

/* Comento este fragmento de código para desplegar en Vercel
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
}) */

// ❗ IMPORTANTE: NO usar listen() en Vercel
export default app;