import { use, useState } from "react";
import axios from "axios";
import './App.css'
import ListarProdutos from './ListarProdutos'
import AdicionarProduto from "./AdicionarProduto";
import AdicionarCliente from "./AdicionarCliente";
import ListarClientes from "./ListarClientes";


function App() {

   const [clientes, setClientes] = useState([
    {
      nome: "Carlos",
    },
    {
      nome: "Filipao",
    },
    {
      nome: "Bocute",
    },
  ]);


   function adicionarClientes(novo_cliente) {
    setClientes([...clientes, novo_cliente]);
  }

  function excluirClientes(indice) {
    let listaNovaClientes = clientes.filter((valor, i) => i != indice);
    setClientes(listaNovaClientes);
  }

  const api = axios.create({
    baseURL: `http://localhost:3000/`
    })

  return (
    <>
       <div className="geral">
        <h1>Loja de Smartphone</h1>
        <div className="formulario">
        <AdicionarCliente url={api}></AdicionarCliente>
        </div>
        <div className="listaClientes">
          <ListarClientes url={api}></ListarClientes>
        </div>
      </div>
    <AdicionarProduto url={api}></AdicionarProduto>
    <ListarProdutos url={api}></ListarProdutos>
    </>
  )
}

export default App;
