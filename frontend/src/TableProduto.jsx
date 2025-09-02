import { useState, useEffect } from "react";
import axios from "axios";

function TableProduto() {
  const [produtos, setProdutos] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({ nome: "", preco: "" });

  const fetchProdutos = async () => {
    try {
      const response = await axios.get("http://localhost:3000/produtos");
      setProdutos(response.data);
    } catch (error) {
      console.error("Erro ao buscar produtos:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/produtos/${id}`);
      fetchProdutos();
      // dispara evento para avisar que dados mudaram
      window.dispatchEvent(new Event("dadosAtualizados"));
    } catch (error) {
      console.error("Erro ao deletar produto:", error);
    }
  };

  const handleEdit = (produto) => {
    setEditingId(produto.id);
    setEditForm({ nome: produto.nome, preco: produto.preco });
  };

  const handleEditSubmit = async (id) => {
    try {
      await axios.put(`http://localhost:3000/produtos/${id}`, {
        ...editForm,
        preco: parseFloat(editForm.preco)
      });
      setEditingId(null);
      fetchProdutos();
      // dispara evento para avisar que dados mudaram
      window.dispatchEvent(new Event("dadosAtualizados"));
    } catch (error) {
      console.error("Erro ao editar produto:", error);
    }
  };

  useEffect(() => {
    fetchProdutos();

    const handleUpdate = () => fetchProdutos();
    window.addEventListener("dadosAtualizados", handleUpdate);

    return () => {
      window.removeEventListener("dadosAtualizados", handleUpdate);
    };
  }, []);

  return (
    <table className="tableProduto">
      <thead>
        <tr>
          <th>ID</th>
          <th>Nome</th>
          <th>Preço</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        {produtos.map((produto) => (
          <tr key={produto.id}>
            <td>{produto.id}</td>
            <td>
              {editingId === produto.id ? (
                <input
                  type="text"
                  value={editForm.nome}
                  onChange={(e) => setEditForm(prev => ({ ...prev, nome: e.target.value }))}
                />
              ) : (
                produto.nome
              )}
            </td>
            <td>
              {editingId === produto.id ? (
                <input
                  type="number"
                  value={editForm.preco}
                  onChange={(e) => setEditForm(prev => ({ ...prev, preco: e.target.value }))}
                  step="0.01"
                />
              ) : (
                `R$ ${parseFloat(produto.preco).toFixed(2)}`
              )}
            </td>
            <td>
              {editingId === produto.id ? (
                <>
                  <button onClick={() => handleEditSubmit(produto.id)}>Salvar</button>
                  <button onClick={() => setEditingId(null)}>Cancelar</button>
                </>
              ) : (
                <>
                  <button onClick={() => handleEdit(produto)}>Editar</button>
                  <button onClick={() => handleDelete(produto.id)}>Deletar</button>
                </>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default TableProduto;
