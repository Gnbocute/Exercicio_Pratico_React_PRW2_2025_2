import { useState, useEffect } from "react";
import axios from "axios";

function TableUsuario() {
  const [usuarios, setUsuarios] = useState([]);

  // busca lista de usuários do backend
  const fetchUsuarios = async () => {
    try {
      const response = await axios.get("http://localhost:3000/usuarios");
      setUsuarios(response.data);
    } catch (error) {
      console.error("Erro ao buscar usuários:", error);
    }
  };

  // exclusão de usuário
  const handleDeleteUsuario = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/usuarios/${id}`);
      fetchUsuarios();
      window.dispatchEvent(new Event("dadosAtualizados"));
    } catch (error) {
      console.error("Erro ao deletar usuário:", error);
    }
  };

  // exclusão de compra (produto de um usuário)
  const handleDeleteCompra = async (usuarioId, produtoId) => {
    try {
      await axios.delete(`http://localhost:3000/compras/${produtoId}/${usuarioId}`);
      fetchUsuarios();
      window.dispatchEvent(new Event("dadosAtualizados"));
    } catch (error) {
      console.error("Erro ao excluir compra:", error);
    }
  };

  useEffect(() => {
    fetchUsuarios();

    // escuta evento de atualização
    const handleUpdate = () => fetchUsuarios();
    window.addEventListener("dadosAtualizados", handleUpdate);

    return () => {
      window.removeEventListener("dadosAtualizados", handleUpdate);
    };
  }, []);

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
              {usuario.produtos.map((p) => (
                  <div key={p.id} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <span>
                      {p.nome} (R$ {parseFloat(p.preco).toFixed(2)})
                    </span>
                    <button onClick={() => handleDeleteCompra(usuario.id, p.id)}>
                      Excluir
                    </button>
                  </div>
                ))}
            </td>
            <td>
              <button onClick={() => handleDeleteUsuario(usuario.id)}>Deletar</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default TableUsuario;
