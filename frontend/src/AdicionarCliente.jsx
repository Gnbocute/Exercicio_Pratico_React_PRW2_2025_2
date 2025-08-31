import { useState } from "react";
import ListarClientes from "./ListarClientes";

function AdicionarCliente({ url }) {
  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");

  function enviarForm(e) {
    e.preventDefault();
    url.post("/usuarios", {
      nome: nome,
    });
    setNome("");
  }

  return (
    <>
      <form onSubmit={enviarForm}>
        <p>Clientes</p>
        <input
          type="text"
          placeholder="Digite o nome do cliente"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        ></input>
        <button>Enviar</button>
      </form>
      <ListarClientes url={url}></ListarClientes>
    </>
  );
}

export default AdicionarCliente;