import { useState } from "react";

async function getProdutos() {
  const url = "http://localhost:3000/usuarios";
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error.message);
  }
}

async function getId() {
  const url = "http://localhost:3000/usuarios";
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const result = await response.json();
    if (result.length === 0) return 1;
    return parseInt(result[result.length - 1].id) + 1;
  } catch (error) {
    console.error(error.message);
  }
}

function FormProdutos() {
  const [data, setData] = useState({
    id: "",
    nome: "",
    preco: "",
  });

  function AtualizaProduto(e) {
    const { name, value } = e.target;
    setData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }

  async function sendProduto(e) {
    e.preventDefault();

    const newId = await getId(); // espera id
    const obj = { ...data, id: newId };

    console.log("Enviando:", obj);

    try {
      const response = await fetch("http://localhost:3000/usuarios", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(obj),
      });

      if (!response.ok) {
        throw new Error("Erro ao enviar produto");
      }

      const result = await response.json();
      console.log("Sucesso:", result);

      setData({
        id: "",
        nome: "",
        preco: "",
      });
    } catch (error) {
      console.error("Erro:", error);
    }
  }

  return (
    <>
      <h1>Cadastar Produto</h1>
      <form onSubmit={sendProduto}>
        <label htmlFor="nome">Nome do Produto</label>
        <input
          type="text"
          name="nome"
          value={data.nome}
          onChange={AtualizaProduto}
        ></input>
        <label htmlFor="preco">Valor do produto</label>
        <input
          id="preco"
          name="preco"
          type="number"
          value={data.preco}
          onChange={AtualizaProduto}
          step={0.1}
          min={0.1}
        ></input>
        <button type="submit">Enviar</button>
      </form>
    </>
  );
}

export default FormProdutos;
