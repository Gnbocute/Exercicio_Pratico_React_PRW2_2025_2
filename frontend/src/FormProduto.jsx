import { useState } from "react";
import axios from "axios";

function FormProduto() {
  const [formData, setFormData] = useState({ nome: "", preco: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3000/produtos", {
        ...formData,
        preco: parseFloat(formData.preco)
      });
      setFormData({ nome: "", preco: "" });
      // dispara evento global para avisar que dados mudaram
      window.dispatchEvent(new Event("dadosAtualizados"));
    } catch (error) {
      console.error("Erro ao cadastrar produto:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="nome">Nome do Produto</label>
      <input
        type="text"
        name="nome"
        value={formData.nome}
        onChange={handleChange}
        placeholder="Nome do produto"
        required
      />
      
      <label htmlFor="preco">Preço</label>
      <input
        type="number"
        name="preco"
        value={formData.preco}
        onChange={handleChange}
        placeholder="0.00"
        step="0.01"
        min="0"
        required
      />
      
      <input type="submit" value="Cadastrar Produto" />
    </form>
  );
}

export default FormProduto;
