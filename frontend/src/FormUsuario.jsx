import { useState } from "react";

function FormUsuario({ onUserAdded }) {
  const [data, setData] = useState({
    id: "",
    nome: "",
    produtos: "",
  });

  async function getId() {
    try {
      const response = await fetch("http://localhost:3000/usuarios");
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

  function AtualizaUsuario(e) {
    const { name, value } = e.target;
    setData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }

  async function sendUsuario(e) {
    e.preventDefault();
    
    try {
      const newId = await getId();
      const obj = { ...data, id: newId.toString() };
      
      const response = await fetch("http://localhost:3000/usuarios", {
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
        produtos: "",
      });
      
      // Notify parent that a user was added
      if (onUserAdded) {
        onUserAdded();
      }
      
    } catch (error) {
      console.error('Error:', error);
    }
  }

  return (
    <>
      <h1>Cadastrar Usuário</h1>
      <form onSubmit={sendUsuario}>
        <label htmlFor="nome">Nome do Usuário</label>
        <input
          type="text"
          name="nome"
          value={data.nome}
          onChange={AtualizaUsuario}
          placeholder="João"
          required
        />
        <input type="submit" value="Cadastrar Usuário" />
      </form>
    </>
  );
}

export default FormUsuario;