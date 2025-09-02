import { useState, useEffect } from "react";
import axios from "axios";

function TableUsuario({ refreshTrigger, onUserDeleted }) {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsuarios();
  }, [refreshTrigger]);

  const fetchUsuarios = async () => {
    try {
      const response = await axios.get("http://localhost:3000/usuarios");
      setUsuarios(response.data);
    } catch (error) {
      console.error("Erro ao buscar usuários:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/usuarios/${id}`);
      onUserDeleted?.();
    } catch (error) {
      console.error("Erro ao deletar usuário:", error);
    }
  };

  if (loading) return <div>Carregando usuários...</div>;

  return (
    <table className="tableUsuario">
      <thead>
        <tr>
          <th>ID</th>
          <th>Nome</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        {usuarios.map((usuario) => (
          <tr key={usuario.id}>
            <td>{usuario.id}</td>
            <td>{usuario.nome}</td>
            <td>
              <button onClick={() => handleDelete(usuario.id)}>Deletar</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default TableUsuario;