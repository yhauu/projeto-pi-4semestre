if(localStorage.getItem("carrinho") === null) {
    let listaVazia = []
    localStorage.setItem("carrinho", JSON.stringify(listaVazia))
}


// localStorage.setItem("cart", {})

function addProductCart (productId){
    let productQtd = parseInt(document.getElementById("productQtd").value)
    let listaProdutos = JSON.parse(localStorage.getItem("carrinho") || "[]")
    let produtoRepetido;
    let contRepetido = 0;
    
    // verifica se o produto já exite no carrinho
    listaProdutos.forEach(element => {
        if(element.id === productId){
            listaProdutos[contRepetido].qtd = listaProdutos[contRepetido].qtd + productQtd
            localStorage.setItem("carrinho", JSON.stringify(listaProdutos))

            produtoRepetido = 1;
        }
        contRepetido++
    });

    if (produtoRepetido != 1) {
        let produto = {
            id: productId,
            qtd: productQtd
        }    
        listaProdutos.push(produto)
        localStorage.setItem("carrinho", JSON.stringify(listaProdutos))
    } 

    telaCarrinho()
}

function listCart(){
    let listaProdutos = JSON.parse(localStorage.getItem("carrinho") || "[]")
    let listaCarrinho = document.getElementById("lista-carrinho")

    listaProdutos.forEach(element => {
        let success = function (data) {
            console.log(data)
            listaCarrinho.innerHTML += `<div class="row">
                                            <div class="col-xs-2"><img class="img-responsive" style="max-height: 90px" src="../projeto-games/${findPrincipalImage(data.photos, data.principalPhoto)}">
                                            </div>
                                            <div class="col-xs-4">
                                                <h4 class="product-name"><strong>${data.name}</strong></h4>
                                            </div>
                                            <div class="col-xs-6">
                                                <div class="col-xs-6 text-right">
                                                    <h4><strong>R$${FormataStringMoneyToFrontend(data.price)}<span class="text-muted"> x</span></strong></h4>
                                                </div>
                                                <div class="col-xs-4">
                                                    <input type="number" class="form-control input-sm" value="${element.qtd}">
                                                </div>
                                                <div class="col-xs-2">
                                                    <a class="btn btn-danger btn-xs btn-red btn-red-icon">
                                                        <i class="fa fa-trash"></i>
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                        <hr>`
        }

        let error = function (err) {
            console.log(err)
        }

        findOneProduct(success, error, element.id)
    });

    

}

function calcSubtotalCarrinho (listaProdutos) {
    
}

function telaCarrinho (){
    window.location = "cart.html"
}

function findOneProduct(success, error, id) {
    $.ajax({
        url: urlPrincipal + urlProduto + `/${id}`,
        contentType: 'application/json',
        type: 'GET',
        success,
        error,
    })
}