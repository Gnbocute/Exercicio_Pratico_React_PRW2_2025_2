import { useState } from "react";

function FormProduto({ onProductAdded }) {
  const [data, setData] = useState({
    id: "",
    nome: "",
    preco: "",
  });

  async function getId() {
    try {
      const response = await fetch("http://localhost:3000/produtos");
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
      const result = await response.json();
      return result.length > 0 ? parseInt(result[result.length - 1].id) + 1 : 1;
    } catch (error) {
      console.error(error.message);
      return 1; // Fallback ID
    }
  }

  function AtualizaProduto(e) {
    const { name, value } = e.target;
    setData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }

  async function sendProduto(e) {
    e.preventDefault();
    
    try {
      const newId = await getId();
      const obj = { 
        ...data, 
        id: newId.toString(),
        preco: parseFloat(data.preco)
      };
      
      const response = await fetch("http://localhost:3000/produtos", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(obj),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      console.log('Success', result);
      
      // Reset form
      setData({
        id: "",
        nome: "",
        preco: "",
      });
      
      // Notify parent that a product was added
      if (onProductAdded) {
        onProductAdded();
      }
      
    } catch (error) {
      console.error('Error:', error);
    }
  }

  return (
    <>
      <form onSubmit={sendProduto}>
        <label htmlFor="nome">Nome do Produto</label>
        <input
          type="text"
          name="nome"
          value={data.nome}
          onChange={AtualizaProduto}
          placeholder="Nome do produto"
          required
        />
        
        <label htmlFor="preco">Preço</label>
        <input
          type="number"
          name="preco"
          value={data.preco}
          onChange={AtualizaProduto}
          placeholder="0.00"
          step="0.01"
          min="0"
          required
        />
        
        <input type="submit" value="Cadastrar Produto" />
      </form>
    </>
  );
}

export default FormProduto;