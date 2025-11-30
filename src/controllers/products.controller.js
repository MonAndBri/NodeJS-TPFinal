import {
    getAllProductsService,
    getProductByIdService,
    addProductService,
    deleteProductService,
    updateProductService
} from '../services/products.service.js';

export const getAllProducts = async (req, res) => {
    try {
        const products = await getAllProductsService();
        if (!products || products.length === 0) {
            return res.status(404).json({ error: "No hay productos disponibles" });
        }

        console.log("Productos obtenidos:", products);

        return res.status(200).json(products);

    } catch (error) {
        console.error("Error en el controler obteniendo productos:", error);
        return res.status(500).json({ error: "Error interno del servidor" });
    }
};

export const getProductById = async (req, res) => {
    try {
        const id = req.params.id;
        if (!id) {
            return res.status(400).json(error);
        }

        const product = await getProductByIdService(id);
        if (!product) {
            return res.status(404).json({ error: "Producto no encontrado" });
        }

        return res.status(200).json(product);
        
    } catch (error) {
        console.error("Error en el controler obteniendo producto:", error);
        return res.status(500).json({ error: "Error interno del servidor" });
    }
};

export const addProduct = async (req, res) => {
    try {
        const product = req.body;
        if (!product || Object.keys(product).length === 0) {
            return res.status(400).json({ error: "El cuerpo de la solicitud está vacío o es inválido" });
        }

        const newProduct = await addProductService(product);
        if (!newProduct) {
            return res.status(500).json({ error: "No se pudo crear el producto" });
        }

        return res.status(201).json(newProduct);

    } catch (error) {
        console.error("Error en el controller creando producto:", error);
        return res.status(500).json({ error: "Error interno del servidor" });
    }
};

export const deleteProduct = async (req, res) => {
    try {
        const id = req.params.id;
        if (!id) {
            return res.status(400).json({ error: "Falta el parámetro 'id'" });
        }

        const deleted = await deleteProductService(id);
        if (!deleted) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        } 
        
        return res.status(200).json({ message: "Producto eliminado correctamente" });

    } catch (error) {
        console.error("Error en el controller borrando producto:", error);
        return res.status(500).json({ error: "Error interno del servidor" });
    }
}

export const updateProduct = async (req, res) => {
    try {
        const id = req.params.id;
        if (!id) {
            return res.status(400).json({ error: "Falta el parámetro 'id'" });
        }

        const product = req.body;
        if (!product || Object.keys(product).length === 0) {
            return res.status(400).json({ error: "El cuerpo de la solicitud no puede estar vacío" });
        }

        const updated = await updateProductService(id, product);
        if (!updated) {
            return res.status(404).json({ error: "Producto no encontrado" });
        }

        return res.status(200).json(updated);

    } catch (error) {
        console.error("Error en el controller actualizando producto:", error);
        return res.status(500).json({ error: "Error interno del servidor" });
    }
}

