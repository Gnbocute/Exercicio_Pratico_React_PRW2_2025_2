import { useState, useEffect } from "react";

function TableProduto({ refreshTrigger }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({
    nome: "",
    preco: ""
  });

  // Fetch data when component mounts OR when refreshTrigger changes
  useEffect(() => {
    async function fetchProdutos() {
      try {
        setLoading(true);
        const response = await fetch("http://localhost:3000/produtos");
        if (!response.ok) {
          throw new Error(`Response status: ${response.status}`);
        }
        const result = await response.json();
        setData(result);
        setError(null);
      } catch (error) {
        console.error(error.message);
        setError("Failed to fetch products");
      } finally {
        setLoading(false);
      }
    }

    fetchProdutos();
  }, [refreshTrigger]);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/produtos/${id}`, {
        method: "DELETE",
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Refresh the data after successful deletion
      const refreshResponse = await fetch("http://localhost:3000/produtos");
      const refreshedData = await refreshResponse.json();
      setData(refreshedData);
      
    } catch (error) {
      console.error("Error deleting product:", error);
      setError("Failed to delete product");
    }
  };

  const handleEdit = (product) => {
    setEditingId(product.id);
    setEditForm({
      nome: product.nome,
      preco: product.preco
    });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleEditSubmit = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/produtos/${id}`, {
        method: "PUT",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...editForm,
          preco: parseFloat(editForm.preco)
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Refresh the data after successful update
      const refreshResponse = await fetch("http://localhost:3000/produtos");
      const refreshedData = await refreshResponse.json();
      setData(refreshedData);
      
      // Reset editing state
      setEditingId(null);
      setEditForm({ nome: "", preco: "" });
      
    } catch (error) {
      console.error("Error updating product:", error);
      setError("Failed to update product");
    }
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditForm({ nome: "", preco: "" });
  };

  if (loading) {
    return <div>Loading products...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <h1>Produtos</h1>
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
          {data.length > 0 ? (
            data.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>
                  {editingId === item.id ? (
                    <input
                      type="text"
                      name="nome"
                      value={editForm.nome}
                      onChange={handleEditChange}
                    />
                  ) : (
                    item.nome
                  )}
                </td>
                <td>
                  {editingId === item.id ? (
                    <input
                      type="number"
                      name="preco"
                      value={editForm.preco}
                      onChange={handleEditChange}
                      step="0.01"
                      min="0"
                    />
                  ) : (
                    `R$ ${parseFloat(item.preco).toFixed(2)}`
                  )}
                </td>
                <td>
                  {editingId === item.id ? (
                    <>
                      <button
                        className="btn-save"
                        onClick={() => handleEditSubmit(item.id)}
                      >
                        Salvar
                      </button>
                      <button
                        className="btn-cancel"
                        onClick={handleCancelEdit}
                      >
                        Cancelar
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        className="btn-edit"
                        onClick={() => handleEdit(item)}
                      >
                        Editar
                      </button>
                      <button
                        className="btn-delete"
                        onClick={() => handleDelete(item.id)}
                      >
                        Deletar
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">No products found</td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
}

export default TableProduto;