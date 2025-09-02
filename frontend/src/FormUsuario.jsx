import { useState } from "react";
import axios from "axios";

function FormUsuario({ onUserAdded }) {
  const [nome, setNome] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3000/usuarios", { nome });
      setNome("");
      onUserAdded?.();
    } catch (error) {
      console.error("Erro ao cadastrar usuário:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="nome">Nome do Usuário</label>
      <input
        type="text"
        name="nome"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
        placeholder="João"
        required
      />
      <input type="submit" value="Cadastrar Usuário" />
    </form>
  );
}

export default FormUsuario;