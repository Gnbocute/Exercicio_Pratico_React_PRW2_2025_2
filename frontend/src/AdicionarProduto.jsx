import { useState } from "react";
import ListarProdutos from "./ListarProdutos";

function AdicionarProduto({url}){

    const [nome, setNome] = useState("");
    const [preco, setPreco] = useState(0.1);

    function aoEnviarProduto(e){
        e.preventDefault();
        url.post(`/produtos`, {
            nome: nome,
            preco: preco
        });
        setNome("");
        setPreco(0.1);
        <ListarProdutos url={url}></ListarProdutos> 
    }

    return(
        <form onSubmit={aoEnviarProduto}>
            <p>Produtos</p>
            <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} placeholder="Nome do produto"></input>
            <input type="number" value={preco} onChange={(e) => setPreco(e.target.value)} step={0.1} min={0.1} placeholder="Preço do produto"></input>
            <button>Enviar</button>
        </form>
    )
} 

export default AdicionarProduto;