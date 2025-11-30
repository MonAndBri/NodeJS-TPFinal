import {
    obtenerProductoPorId, obtenerProductos, eliminarProducto,
    agregarProducto, actualizarProducto
} from "../models/products.models.js"

export async function getAllProductsService() {
    try {
        const products = await obtenerProductos()
        return products;
    } catch (error) {
        console.error("Error en el servicio al obtener los productos:", error);
        throw error;
    }
};

export const getProductByIdService = async (id) => {
    try {
        const product = await obtenerProductoPorId(id)
        if (!product) {
            console.log("Service → no se encontró producto con ese ID:", id);
            return null;
        }
        console.log("Service → producto obtenido:", product);
        return product;
    } catch (error) {
        console.error("Error en el servicio al obtener producto por ID:", error);
        throw error;
    }
};

export async function addProductService(productData) {
    try {
        const newProduct = await agregarProducto(productData);
        if (!newProduct) return null;
        return newProduct;
    } catch (error) {
        console.error("Error en el servicio al agregar producto:", error);
        throw error;
    }
}

export async function deleteProductService(id) {
    try {
        const deletedProduct = await eliminarProducto(id);
        if (!deletedProduct) return null;
        return deletedProduct;
    } catch (error) {
        console.error("Error en el servicio al eliminar producto:", error);
        throw error;
    }
}

export async function updateProductService(id, productData) {
    try {
        const updatedProduct = await actualizarProducto(id, productData);
        if (!updatedProduct) return null;
        return updatedProduct;
    } catch (error) {
        console.error("Error en el servicio al actualizar producto:", error);
        throw error;
    }
}