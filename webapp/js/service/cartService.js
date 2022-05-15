if (localStorage.getItem("carrinho") === null) {
    let listaVazia = []
    localStorage.setItem("carrinho", JSON.stringify(listaVazia))
}


// localStorage.setItem("cart", {})

function addProductCart(productId) {
    let productQtd = parseInt(document.getElementById("productQtd").value)
    let listaProdutos = JSON.parse(localStorage.getItem("carrinho") || "[]")
    let produtoRepetido;
    let contRepetido = 0;

    let success = function (data) {

        // verifica se o produto já exite no carrinho
        console.log(data)
        listaProdutos.forEach(element => {
            if (element.id === productId) {
                listaProdutos[contRepetido].qtd = listaProdutos[contRepetido].qtd + productQtd
                localStorage.setItem("carrinho", JSON.stringify(listaProdutos))

                produtoRepetido = 1;
            }
            contRepetido++
        });

        if (produtoRepetido != 1) {
            let produto = {
                id: productId,
                qtd: productQtd,
                name: data.name,
                price: data.price,
                image: findPrincipalImage(data.photos, data.principalPhoto)
            }
            listaProdutos.push(produto)
            localStorage.setItem("carrinho", JSON.stringify(listaProdutos))
        }

        telaCarrinho()
    }


    let error = function (err) {
        console.log(err)
    }


    findOneProduct(success, error, productId)
}

function listCart() {
    let listaProdutos = JSON.parse(localStorage.getItem("carrinho") || "[]")
    let listaCarrinho = document.getElementById("lista-carrinho")
    let listaPrecos = []

    listaProdutos.forEach(element => {
        listaCarrinho.innerHTML += `<div class="row">
                                            <div class="col-xs-2"><img class="img-responsive" style="max-height: 90px" src="../projeto-games/${element.image}">
                                            </div>
                                            <div class="col-xs-4">
                                                <h4 class="product-name"><strong>${element.name}</strong></h4>
                                            </div>
                                            <div class="col-xs-6">
                                                <div class="col-xs-6 text-right">
                                                    <h4><strong>R$${formataStringMoneyToFrontend(element.price)}<span class="text-muted"> x</span></strong></h4>
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

        listaPrecos.push(element.price)


    })

    document.getElementById("vSubTotalProdutos").innerText = "R$" + formataStringMoneyToFrontend(calcSubtotalCarrinho(listaProdutos, listaPrecos))
}

function listCheckout() {
    let listaProdutos = JSON.parse(localStorage.getItem("carrinho") || "[]")
    let listaCheckout = document.getElementById("lista-checkout")
    let listaPrecos = []
    let contArrayLength = 1

    listaProdutos.forEach(element => {
        listaCheckout.innerHTML += `<div class="order-col">
                                        <div>${element.qtd}x ${element.name}</div>
                                        <div>R$${formataStringMoneyToFrontend(element.price)}</div>
                                    </div>`

        listaPrecos.push(element.price)
    })

    document.getElementById("vTotalProdutos").innerText = "R$" + formataStringMoneyToFrontend(calcSubtotalCarrinho(listaProdutos, listaPrecos))
}

function calcSubtotalCarrinho(listaProdutos, listaPrecos) {
    let soma = 0.0
    for (let i = 0; i < listaProdutos.length; i++) {
        let totalProduto = listaProdutos[i].qtd * listaPrecos[i]
        soma = soma + totalProduto
    }

    return soma
}

function telaCarrinho() {
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