function Clientes(props) {
  function Excluir(e) {
    e.preventDefault();
    props.onExcluir(props.indice);
  }
  return (
    <>
        <id>{props.id}</id>
        <p>{props.nome}</p>
        <button onClick={Excluir}>Remover</button>
    </>
  );
}

export default Clientes;