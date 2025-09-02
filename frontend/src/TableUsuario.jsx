import { useState, useEffect } from "react";
import axios from "axios";

function TableUsuario({ refresh }) {
  const [usuarios, setUsuarios] = useState([]);

  const fetchUsuarios = async () => {
    try {
      const response = await axios.get("http://localhost:3000/usuarios");
      setUsuarios(response.data);
    } catch (error) {
      console.error("Erro ao buscar usuários:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/usuarios/${id}`);
      fetchUsuarios();
    } catch (error) {
      console.error("Erro ao deletar usuário:", error);
    }
  };

  useEffect(() => {
    fetchUsuarios();
  }, [refresh]);

  return (
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
        {usuarios.map((usuario) => (
          <tr key={usuario.id}>
            <td>{usuario.id}</td>
            <td>{usuario.nome}</td>
            <td>
                {usuario.produtos.map(p => (
                  <span key={p.id}>
                    {p.nome} (R$ {parseFloat(p.preco).toFixed(2)})
                    <br />
                  </span>
                ))
              }
            </td>
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
