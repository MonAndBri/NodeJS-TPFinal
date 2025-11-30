import { db } from "../data/data.js";
import { doc, getDoc, collection, getDocs, addDoc, updateDoc, deleteDoc } from "firebase/firestore";

const productsCollection = collection(db, 'products');

export async function obtenerProductoPorId(id) {
    try {
        const docRef = doc(productsCollection, id);
        const docSnap = await getDoc(docRef);
        if (!docSnap.exists()) {
            console.log("Model → no existe un producto con ese ID:", id);
            return null;
        }

        const product = {
            id: docSnap.id,
            ...docSnap.data()
        };
        console.log("Model → producto encontrado:", product);
        return product;
    } catch (error) {
        console.error("Error en el modelo al obtener producto por ID:", error);
        throw error;
    }
}

export async function obtenerProductos() {
    try {
        const querySnapshot = await getDocs(productsCollection);

        const products = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));

        console.log("Productos obtenidos en models:", products);

        return products;
    } catch (error) {
        console.error("Error al buscar los producto en el modelo:", error);
        throw error;
    }
}

export async function agregarProducto(data) {
    try {
        const docRef = await addDoc(productsCollection, data);
        const snapshot = await getDoc(docRef);

        console.log("Producto agregado");

        return {
            id: snapshot.id,
            ...snapshot.data()
        };
    } catch (error) {
        console.error("Error al agregar producto en el modelo:", error);
        throw error;
    }
}

export async function actualizarProducto(id, data) {
    try {
        const ref = doc(productsCollection, id);
        const snapshot = await getDoc(ref);
        if (!snapshot.exists()) {
            return null;
        }

        await updateDoc(ref, data);

        const updatedSnapshot = await getDoc(ref);

        console.log("Producto actualizado");

        return {
            id: updatedSnapshot.id,
            ...updatedSnapshot.data()
        };

    } catch (error) {
        console.error("Error al actualizar producto en el modelo:", error);
        throw error;
    }
}

export async function eliminarProducto(id) {
    try {
        const ref = doc(productsCollection, id);
        const snapshot = await getDoc(ref);
        if (!snapshot.exists()) return null;

        const productoEliminado = { id: snapshot.id, ...snapshot.data() };

        await deleteDoc(ref);

        console.log("Producto eliminado");
        return productoEliminado;

    } catch (error) {
        console.error("Error en el modelo al eliminar producto:", error);
        throw error;
    }
}

