import axios from "axios";

const API_URL = "http://localhost:5000/usuarios";

// Función para crear un usuario
export const createUser = async (nombre, email) => {
  try {
    const response = await axios.post(API_URL, { nombre, email });
    return response.data;
  } catch (error) {
    console.error("Error al crear el usuario:", error.response.data);
    throw error;
  }
};

// Función para obtener todos los usuarios
export const getUsers = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error al obtener usuarios:", error.response.data);
    throw error;
  }
};

// Función para obtener un usuario por ID
export const getUserById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener el usuario:", error.response.data);
    throw error;
  }
};

// Función para actualizar un usuario
export const updateUser = async (id, nombre, email) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, { nombre, email });
    return response.data;
  } catch (error) {
    console.error("Error al actualizar el usuario:", error.response.data);
    throw error;
  }
};

// Función para eliminar un usuario
export const deleteUser = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/borrar/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error al eliminar el usuario:", error.response.data);
    throw error;
  }
};
