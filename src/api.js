import firebase, { db } from './firebase-config';
import { collection, getDocs, getDoc, query, doc, addDoc, deleteDoc, updateDoc, where, orderBy, endAt, startAt } from "firebase/firestore";


// Metodo para guardar usuario
export const saveUser = (id, nombre, email, rol, estado) => {

  addDoc(collection(db, 'users'), { id, nombre, email, rol, estado });
}

//Metodo para listar un usuario por id
export const ListUser = async (id) => {
  const UserRef = collection(db, "users");

  const q = query(UserRef, where("email", "==", id));

  const querySnapshot = await getDocs(q);

  return querySnapshot;
}

//Metodo para listar todos los usuarios
export const ListUsers = async () => {

  const result = await getDocs(query(collection(db, 'users')));

  return result;
}


//Metodo para realizar busqueda de usuarios por email
export const ListUsersForEmail = async (email) => {

  const UserRef = collection(db, "users");

  const q = query(UserRef, orderBy('email'), startAt(email), endAt(email + '\uf8ff'));

  const querySnapshot = await getDocs(q);

  return querySnapshot;
}


//Metodo para realizar busqueda de usuarios por id
export const ListUsersForID = async (id) => {

  const UserRef = collection(db, "users");

  const q = query(UserRef, where("id", "==", id));

  const querySnapshot = await getDocs(q);

  return querySnapshot;
}



export const updateUser = async (id, rol, estado) => {

  await updateDoc(doc(db, 'users', id), {rol, estado})
}


export const getProducts = async() => {

  const result = await getDocs(query(collection(db, 'Product')));

  return result;

 }

// Metodo para guardar producto
export const saveProduct = (id, codigo, nombre, valorUnitario, estado) => {

  addDoc(collection(db, 'Product'), { id, codigo, nombre, valorUnitario, estado });

}


//Metodo para listar todos los productos
export const listproduct = async () => {

  const result = await getDocs(query(collection(db, 'Product')));

  return result;
}

//Metodo para realizar busqueda de productos por nombre

export const ListProductsForName = async (nombre) => {

  const UserRef = collection(db, "Product");

  const q = query(UserRef, orderBy('nombre'), startAt(nombre), endAt(nombre + '\uf8ff'));

  const querySnapshot = await getDocs(q);

  return querySnapshot;
}


//Metodo para realizar busqueda de productos por id
export const ListProductsForID = async (id) => {

  const UserRef = collection(db, "Product");

  const q = query(UserRef, where("id", "==", id));

  const querySnapshot = await getDocs(q);
  console.log(querySnapshot.docs);
  return querySnapshot;
}

export const updateProducto = async (id, codigo, nombre, valorUnitario, estado) => {

  await updateDoc(doc(db, 'Product', id), {codigo, nombre, valorUnitario, estado})
}

//Metodo para listar todos las ventas
export const ListSales = async () => {

  const result = await getDocs(query(collection(db, 'sales')));

  return result;
}

//Metodo para realizar busqueda de productos por id
export const ListProductsVendor= async () => {

  const UserRef = collection(db, "users");

  const q = query(UserRef, where("rol", "==", "Vendedor"));

  const querySnapshot = await getDocs(q);

  return querySnapshot;
}

//Metodo para realizar busqueda de productos por id
export const ListProductsCash = async (id) => {

  const UserRef = collection(db, "Product");

  const q = query(UserRef, where("nombre", "==", id));

  const querySnapshot = await getDocs(q);

  return querySnapshot;
}

// Metodo para guardar venta
export const saveSale = (id, nombreCliente, documentoCliente, fecha, encargado, productos, valorTotal) => {

  addDoc(collection(db, 'sales'), { id, nombreCliente, documentoCliente, fecha, encargado, productos, valorTotal });
}