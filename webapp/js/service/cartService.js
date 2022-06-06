if (localStorage.getItem("carrinho") === null) {
    let listaVazia = []
    localStorage.setItem("carrinho", JSON.stringify(listaVazia))
}
if (localStorage.getItem("frete") === null) {
    localStorage.setItem("frete", 0)
}


// localStorage.setItem("cart", {})

function addProductCart(productId) {
    let productQtd = parseInt(document.getElementById("productQtd").value)
    let listaProdutos = JSON.parse(localStorage.getItem("carrinho") || "[]")
    let produtoRepetido;
    let contRepetido = 0;

    let success = function (data) {

        console.log(data)
        if (data.quantity >= productQtd) {
            // verifica se o produto já exite no carrinho
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
        } else {
            alert("Sem quantidade em estoque! Selecione uma quantidade válida")
        }
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
        listaCarrinho.innerHTML += `<div id="itemId${element.id}">
                                        <div class="row">
                                            <div class="col-xs-2"><img class="img-responsive" style="max-height: 90px" src="../${element.image}">
                                            </div>
                                            <div class="col-xs-4">
                                                <h4 class="product-name"><strong>${element.name}</strong></h4>
                                            </div>
                                            <div class="col-xs-6">
                                                <div class="col-xs-6 text-right">
                                                    <h4><strong>R$${formataStringMoneyToFrontend(element.price)}<span class="text-muted"> x</span></strong></h4>
                                                </div>
                                                <div class="col-xs-4">
                                                    <input type="number" style="max-width: 7rem" id="${element.id}" class="form-control input-sm  product-qtde" min="1" step="1" value="${element.qtd}">
                                                </div>
                                                <div class="col-xs-2">
                                                    <a class="btn btn-danger btn-xs btn-red btn-red-icon" onclick="deleteCartItem(${element.id})">
                                                        <i class="fa fa-trash"></i>
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                        <hr>
                                    </div>`

        listaPrecos.push(element.price)


    })

    document.querySelectorAll('.product-qtde').forEach(item => {
        item.addEventListener('change', updateProductQtd)
      })

    document.getElementById("vSubTotalProdutos").innerText = "R$" + formataStringMoneyToFrontend(calcSubtotalCarrinho())
    document.getElementById("vSubTotalProdutosFrete").innerText = "R$" + formataStringMoneyToFrontend(calcSubtotalCarrinho())
}

function updateProductQtd (e) {
    let qtdProduct = parseInt(e.target.value)
    let idProduct = parseInt(e.target.id)
    let cont = 0

    let listaProdutos = JSON.parse(localStorage.getItem("carrinho") || "[]")
    // console.log(listaProdutos)
    listaProdutos.forEach(element => {
        console.log(element.id)
        console.log(idProduct)
        if(element.id ==+ idProduct){
            listaProdutos[cont].qtd = qtdProduct
        }
        cont++
    });

    localStorage.setItem("carrinho", JSON.stringify(listaProdutos))

    document.getElementById("vSubTotalProdutos").innerText = "R$" + formataStringMoneyToFrontend(calcSubtotalCarrinho())
    document.getElementById("vSubTotalProdutosFrete").innerText = "R$" + formataStringMoneyToFrontend(calcSubtotalCarrinho())
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
    
    listaCheckout.innerHTML += `<div class="order-col">
                                    <div><strong>Frete</strong></div>
                                    <div><strong>R$${formataStringMoneyToFrontend(localStorage.getItem("frete"))}</strong></div>
                                </div>`
    

    document.getElementById("vTotalProdutos").innerText = "R$" + formataStringMoneyToFrontend(calcSubtotalCarrinho() + parseFloat(localStorage.getItem("frete")))
}

function calcSubtotalCarrinho() {
    let listaProdutos = JSON.parse(localStorage.getItem("carrinho") || "[]")
    let listaPrecos = []

    listaProdutos.forEach(element => {
        listaPrecos.push(element.price)
    });

    let soma = 0.0
    for (let i = 0; i < listaProdutos.length; i++) {
        let totalProduto = listaProdutos[i].qtd * listaPrecos[i]
        soma = soma + totalProduto
    }

    return soma
}



function deleteCartItem(id) {
    let listaProdutos = JSON.parse(localStorage.getItem("carrinho") || "[]")
    let listaPrecos = []
    let count = 0

    listaProdutos.forEach(element => {
        listaPrecos.push(element.price)
        if (element.id === id) {
            listaProdutos.splice(count , 1)
            localStorage.setItem("carrinho", JSON.stringify(listaProdutos))
        } 
        count++
    });

    document.getElementById("itemId" + id).remove()
    document.getElementById("vSubTotalProdutos").innerText = "R$" + formataStringMoneyToFrontend(calcSubtotalCarrinho())    
    document.getElementById("vSubTotalProdutosFrete").innerText = "R$" + formataStringMoneyToFrontend(calcSubtotalCarrinho())
}

function telaCarrinho() {
    window.location = "cart.html"
}

function calcFrete (event) {
    event.preventDefault();
    let cep = (document.getElementById("cCep").value).replace('-', '')

    document.getElementById("lista-frete").innerHTML = `
    <label for="inputUsernameEmail">Escolha o Tipo de Entrega: </label>
        <div class="btn-group" data-toggle="buttons">
            <label class="btn btn-default" onclick="somaTotalFrete(8.00)">
                <input type="radio" value="8.0" /> Econômica: R$8,00
            </label>
            <label class="btn btn-default" onclick="somaTotalFrete(12.50)">
                <input type="radio" value="12.5" /> Rápida: R$12,50 
            </label>
            <label class="btn btn-default" onclick="somaTotalFrete(20.00)">
                <input type="radio" value="20.0" /> Agendada: R$20,00
            </label>									
        </div>
    `
}

function somaTotalFrete (valorFrete) {
    localStorage.setItem("frete", valorFrete)
    document.getElementById("vSubTotalProdutosFrete").innerText = "R$" + formataStringMoneyToFrontend(calcSubtotalCarrinho() + valorFrete)
}

function verificarAcesso(){
    let acesso = localStorage.getItem("accessClient")
    

    if(acesso === "true") {
        window.location.href = "select-address.html"
    } else {
        localStorage.setItem("processo-compra", true)
        window.location.href = "login-client.html"
    }
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

function findCep(success, error, id) {
    $.ajax({
        url: urlPrincipal + urlProduto + `/${id}`,
        contentType: 'application/json',
        type: 'GET',
        success,
        error,
    })
}
