import { useState, useEffect } from "react";

// Adicionei props, mesmo que esteja vazio, para poder usar depois
function FormCompras({ refreshTrigger }) { 
  const [usuarios, setUsuarios] = useState([]);
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [compra, setCompra] = useState({
    usuarioId: "",
    produtoId: ""
  });

  // useEffect que busca os dados quando o componente monta
  // E quando o refreshTrigger muda (sinalizando que um novo usuário ou produto foi adicionado)
  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const usersResponse = await fetch("http://localhost:3000/usuarios");
        if (!usersResponse.ok) throw new Error("Failed to fetch users");
        const usersData = await usersResponse.json();
        setUsuarios(usersData);

        const productsResponse = await fetch("http://localhost:3000/produtos");
        if (!productsResponse.ok) throw new Error("Failed to fetch products");
        const productsData = await productsResponse.json();
        setProdutos(productsData);

        setError(null);
      } catch (err) {
        console.error(err.message);
        setError("Failed to load data for form");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [refreshTrigger]); // <-- refreshTrigger como dependência

  const handleSelectChange = (e) => {
    const { name, value } = e.target;
    setCompra(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!compra.usuarioId || !compra.produtoId) {
      alert("Por favor, selecione um usuário e um produto.");
      return;
    }

    // Lógica para salvar a compra
    console.log("Compra realizada:", compra);
    alert("Compra realizada com sucesso!");
    setCompra({ usuarioId: "", produtoId: "" });
  };

  if (loading) {
    return <div>Carregando opções de compra...</div>;
  }

  if (error) {
    return <div>Erro: {error}</div>;
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="usuarioId">Usuário</label>
        <select
          name="usuarioId"
          value={compra.usuarioId}
          onChange={handleSelectChange}
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
          onChange={handleSelectChange}
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
    </>
  );
}

export default FormCompras;