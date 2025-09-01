import { useState, useEffect } from "react";

function TableUsuario({ refreshTrigger, onUserDeleted }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data when component mounts OR when refreshTrigger changes
  useEffect(() => {
    async function fetchUsuarios() {
      try {
        setLoading(true);
        const response = await fetch("http://localhost:3000/usuarios");
        if (!response.ok) {
          throw new Error(`Response status: ${response.status}`);
        }
        const result = await response.json();
        setData(result);
        setError(null);
      } catch (error) {
        console.error(error.message);
        setError("Failed to fetch users");
      } finally {
        setLoading(false);
      }
    }

    fetchUsuarios();
  }, [refreshTrigger]); // ← refreshTrigger added to dependency array

  const handleDelete = async (id) => {

    try {
      const response = await fetch(`http://localhost:3000/usuarios/${id}`, {
        method: "DELETE",
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Refresh the data after successful deletion
      if (onUserDeleted) {
        onUserDeleted();
      }
      
    } catch (error) {
      console.error("Error deleting user:", error);
      setError("Failed to delete user");
    }
  };

  if (loading) {
    return <div>Loading users...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <table className="tableUsuario">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Produtos</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.nome}</td>
                <td>{/* Add products here */}</td>
                <td>
                  <button
                    className="btn-delete"
                    onClick={() => handleDelete(item.id)}
                  >
                    Deletar
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">No users found</td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
}

export default TableUsuario;