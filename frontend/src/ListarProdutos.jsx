

function ListarProdutos({ url }) {
    url.get(`/produtos`)
        .then(resposta => {
            resposta.data.forEach(produto => {
                console.log(produto.nome);
            });
        })
        .catch(error => {
            console.error("Ocorreu um erro ao buscar os produtos:", error);
        });
    }

export default ListarProdutos;