function ListarClientes({ url }) {
  url
    .get("/usuarios")
    .then((resposta) => {
      resposta.data.forEach((cliente) => {
        console.log(cliente.nome);
      });
    })
    .catch((error) => {
      console.error("Ocorreu um erro ao buscar produtos:", error);
    });
}

export default ListarClientes;