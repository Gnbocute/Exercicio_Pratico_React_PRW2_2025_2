import { useState, useEffect } from "react";

function TableUsuario() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  // Buscar clientes ao montar
  useEffect(() => {
    async function fetchUsuarios() {
      try {
        const response = await fetch("http://localhost:3000/usuarios");
        if (!response.ok) {
          throw new Error(`Response status: ${response.status}`);
        }
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error(error.message);
        setError("Erro ao buscar usuários");
      } finally {
        setLoading(false);
      }
    }

    fetchUsuarios();
  }, []);

  const handleDelete = async (id) => {
    setDeletingId(id);

    try {
      const response = await fetch(`http://localhost:3000/usuarios/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Se deletar no backend, remove localmente
      setData((prevData) => prevData.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Erro ao deletar usuário:", error);
      setError("Falha ao deletar usuário");
    } finally {
      setDeletingId(null);
    }
  };

  if (loading) {
    return <div>Carregando usuários...</div>;
  }

  if (error) {
    return <div>Erro: {error}</div>;
  }

  return (
    <>
      <h1>Usuários</h1>
      <table className="tableUsuario">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Produtos</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody id="tableBody">
          {data.length > 0 ? (
            data.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.nome}</td>
                <td>
                  {item.produtos && item.produtos.length > 0 ? (
                    <ul>
                      {item.produtos.map((p) => (
                        <li key={p.id}>
                          {p.nome} - R$ {p.preco}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    "Sem produtos"
                  )}
                </td>
                <td>
                  <button
                    className="btn-delete"
                    onClick={() => handleDelete(item.id)}
                    disabled={deletingId === item.id}
                  >
                    {deletingId === item.id ? "Deletando..." : "Deletar"}
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">Nenhum usuário encontrado</td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
}

export default TableUsuario;
