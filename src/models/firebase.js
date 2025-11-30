import { db } from "../data/data.js";
import { doc, getDoc, collection, getDocs, setDoc, addDoc, updateDoc, deleteDoc } from "firebase/firestore";

function obtenerProducto(id) {
  return new Promise(async (res, rej) => {
    try {
      const docRef = doc(db, "products", id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        console.log("Snap Data", docSnap);
        console.log("Document ID", docSnap.id);
        console.log("Document data:", docSnap.data());
        res(docSnap.data())
      } else {
        // docSnap.data() will be undefined in this case
        console.log("No such document!");
      }
    } catch (error) {
      console.log(error)
      rej(error)
    }
  })

}
obtenerProducto();

async function obtenerProductos() {
  new Promise(async (res, rej) => {
    try {
      const querySnapshot = await getDocs(collection(db, "products"));
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
      });
    } catch (error) {
      console.log(error)
      rej(error)
    }
  })

}
obtenerProductos();

async function agregarProducto(producto) {

  try {
    const docRef = await addDoc(collection(db, "products"), producto);
    console.log("Document written with ID: ", docRef.id);
    console.log("Producto:", docRef.data());
  } catch (error) {
    console.log(error);
  }

}
//agregarProducto({ name: "azucar", price: 300, category: "endulzante" });

async function actualizarProducto(producto) {
  try {
    await updateDoc(doc(db, "products", producto.id), {
      price: producto.price
    });
    console.log("Producto actualizado")
  } catch (error) {
    console.log(error);
  }
}
//actualizarProducto({id: "O5ZJQkVsHNDsH3FEocr3", price: 220})

async function eliminarProducto(id) {
  try {
    await deleteDoc(doc(db, "products", id));
    console.log("Producto eliminado")
  } catch (error) {
    console.log(error);
  }
}
eliminarProducto("oEUQ3g49CBC7sdfeWfub");