import express from "express";
import { authentication } from "../middlewares/authentication.js"

const router = express.Router();

import {
    getAllProducts,
    getProductById,
    addProduct,
    deleteProduct,
    updateProduct
} from '../controllers/products.controller.js';

// Rutas públicas
router.get('/products', getAllProducts);
router.get('/products/:id', getProductById);

// Middleware de autenticación a partir de acá
router.use(authentication);

// Rutas protegidas
router.post('/products/create', addProduct);
router.delete('/products/:id', deleteProduct);
router.put('/products/:id', updateProduct);

export default router;