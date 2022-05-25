function checkout(metodoPagamento) {

    let frete = parseFloat(localStorage.getItem("frete"))
    let valTotal = calcSubtotalCarrinho() + frete
    let listaProdutos = JSON.parse(localStorage.getItem("carrinho") || "[]")
    let idCliente = parseInt(localStorage.getItem("idClient"))
    let endEntrega = parseInt(localStorage.getItem("endEntrega"))
    let endFatura = parseInt(localStorage.getItem("endFatura"))

    // let listaAux = []
    // let count = 0

    // listaProdutos.forEach(element => {
    //     let produto = {element.id, element.qtde}
    // });



    if (metodoPagamento === "BOLETO" || metodoPagamento === "CARTAO_CREDITO") {
        let dado = {
            fee: frete,
            totalSaleAmount: valTotal,
            clientId: idCliente,
            deliveryAddressId: endEntrega,
            billingAdrressId: endFatura,
            paymentMethods: metodoPagamento,
            listProductsCart: listaProdutos
        }
        console.log(JSON.stringify(dado))

        let success = function (data) {
            alert("Pedido Realizado com Sucesso!")
            localStorage.setItem("carrinho", []) 

            window.location = "store-list-order.html"
        }

        let error = function (err) {
            console.log(err.responseJSON)
        }

        postCheckout(success, error, dado)
    }
}

function validaPagamento() {
    let inputBoleto = document.getElementById("payment-1")
    let inputCartao = document.getElementById("payment-2")

    if (inputBoleto.checked === true) {
        checkout(inputBoleto.value)
    } else if (inputCartao.checked === true) {
        checkout(inputCartao.value)
    } else {
        alert("Selecione o método de pagamento!!")
        checkout(null)
    }
}

function listClientAddressCheckout() {
    let idCliente = parseInt(localStorage.getItem("idClient"))

    let success = function (data) {
        console.log(data)

        document.getElementById("lista-entrega").innerHTML += `
                            <div class="row">
                                <div class="col-xs-10">
                                    <h4 class="product-name"><strong>${data.address[0].address}, ${data.address[0].numberAddress} -
                                    ${data.address[0].zipCode}</strong></h4>
                                    <h4><small>${data.address[0].district}, ${data.address[0].city} - SP</small></h4>
                                </div>
                                <div class="col-xs-2">
                                    <div class="btn-group" data-toggle="buttons">
                                        <label class="btn btn-danger">
                                            <input type="radio" name="options" id="option2" autocomplete="off">
                                            <i class="fa fa-check"></i>
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <hr>`

        document.getElementById("lista-faturamento").innerHTML += `
                            <div class="row">
                                <div class="col-xs-10">
                                    <h4 class="product-name"><strong>${data.address[1].address}, ${data.address[1].numberAddress} -
                                    ${data.address[1].zipCode}</strong></h4>
                                    <h4><small>${data.address[1].district}, ${data.address[1].city} - SP</small></h4>
                                </div>
                                <div class="col-xs-2">
                                    <div class="btn-group" data-toggle="buttons">
                                        <label class="btn btn-danger">
                                            <input type="radio" name="options" id="option2" autocomplete="off">
                                            <i class="fa fa-check"></i>
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <hr>`

        localStorage.setItem("endEntrega", data.address[0].id)
        localStorage.setItem("endFatura", data.address[1].id)
    }

    let error = function (err) {
        console.log(err)
    }

    findOneClient(success, error, idCliente)

}

function postCheckout(success, error, dado) {
    $.ajax({
        url: urlPrincipal + urlSales,
        contentType: 'application/json',
        type: 'POST',
        data: JSON.stringify(dado),
        success,
        error,
    })
}

function findOneClient(success, error, id) {
    $.ajax({
        url: urlPrincipal + urlClient + `/${id}`,
        contentType: 'application/json',
        type: 'GET',
        success,
        error,
    })
}

