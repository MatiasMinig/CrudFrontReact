import React, { useState, useEffect } from "react";
import { getUsers, createUser, updateUser, deleteUser } from "./api";

function App() {
  const [usuarios, setUsuarios] = useState([]);
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      const users = await getUsers();
      setUsuarios(users);
    };

    fetchUsers();
  }, []);

  const handleCreateUser = async () => {
    try {
      if (editId) {
        await handleUpdateUser(editId);
      } else {
        const newUser = await createUser(nombre, email);
        setUsuarios([...usuarios, newUser]);
      }
      setNombre("");
      setEmail("");
      setEditId(null);
    } catch (error) {
      console.error("Error al guardar el usuario:", error);
    }
  };

  const handleEditUser = (user) => {
    setNombre(user.nombre);
    setEmail(user.email);
    setEditId(user.id_usuario);
  };

  const handleUpdateUser = async (id) => {
    try {
      const updatedUser = await updateUser(id, nombre, email);
      setUsuarios(
        usuarios.map((user) => (user.id_usuario === id ? updatedUser : user))
      );
      setEditId(null);
      setNombre("");
      setEmail("");
    } catch (error) {
      console.error("Error al actualizar el usuario:", error);
    }
  };

  const handleDeleteUser = async (id) => {
    try {
      await deleteUser(id);
      setUsuarios(usuarios.filter((user) => user.id_usuario !== id));
    } catch (error) {
      console.error("Error al eliminar el usuario:", error);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Gestión de Usuarios</h2>
      <form className="mb-4">
        <div className="form-group">
          <label htmlFor="nombre">Nombre</label>
          <input
            type="text"
            className="form-control"
            id="nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            placeholder="Ingresa el nombre"
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            className="form-control"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Ingresa el email"
          />
        </div>
        <button
          type="button"
          className="btn btn-primary mt-3"
          onClick={handleCreateUser}
        >
          {editId ? "Actualizar Usuario" : "Agregar Usuario"}
        </button>
      </form>

      <h3>Lista de Usuarios</h3>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Email</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((user) => (
            <tr key={user.id_usuario}>
              <td>{user.id_usuario}</td>
              <td>{user.nombre}</td>
              <td>{user.email}</td>
              <td>
                <button
                  className="btn btn-secondary btn-sm me-2"
                  onClick={() => handleEditUser(user)}
                >
                  Editar
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDeleteUser(user.id_usuario)}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
