import { useState, useEffect } from "react";
import axios from "axios";

function FormCompras({ onChangeData }) {
  const [usuarios, setUsuarios] = useState([]);
  const [produtos, setProdutos] = useState([]);
  const [compra, setCompra] = useState({ usuarioId: "", produtoId: "" });

  const fetchData = async () => {
    try {
      const [usersResponse, productsResponse] = await Promise.all([
        axios.get("http://localhost:3000/usuarios"),
        axios.get("http://localhost:3000/produtos")
      ]);
      setUsuarios(usersResponse.data);
      setProdutos(productsResponse.data);
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3000/compras", {
        id_produto: compra.produtoId,
        id_usuario: compra.usuarioId
      });
      alert("Compra realizada com sucesso!");
      setCompra({ usuarioId: "", produtoId: "" });
      fetchData();
      onChangeData?.(); // força atualizar tabelas
    } catch (error) {
      console.error("Erro ao realizar compra:", error);
      alert("Erro ao realizar compra");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="usuarioId">Usuário</label>
      <select
        name="usuarioId"
        value={compra.usuarioId}
        onChange={(e) => setCompra(prev => ({ ...prev, usuarioId: e.target.value }))}
        required
      >
        <option value="">-- Selecione um usuário --</option>
        {usuarios.map(usuario => (
          <option key={usuario.id} value={usuario.id}>
            {usuario.nome}
          </option>
        ))}
      </select>
      
      <label htmlFor="produtoId">Produto</label>
      <select
        name="produtoId"
        value={compra.produtoId}
        onChange={(e) => setCompra(prev => ({ ...prev, produtoId: e.target.value }))}
        required
      >
        <option value="">-- Selecione um produto --</option>
        {produtos.map(produto => (
          <option key={produto.id} value={produto.id}>
            {produto.nome} - R$ {parseFloat(produto.preco).toFixed(2)}
          </option>
        ))}
      </select>
      <input type="submit" value="Finalizar Compra" />
    </form>
  );
}

export default FormCompras;
