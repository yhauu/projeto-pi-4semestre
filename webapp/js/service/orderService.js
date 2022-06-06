function listClientOrders() {
    let idCliente = parseInt(localStorage.getItem("idClient"))

    let success = function (data) {
        console.log(data)



        data.forEach(element => {
            let status
            if (data.status == "AGUARDANDO_PAGAMENTO") {
                status = "Aguardando Pagamento"
            } else if (element.status == "PAGAMENTO_REJEITADO") {
                status = "Pagamento Rejeitado"
            } else if (element.status == "PAGAMENTO_SUCESSO") {
                status = "Pagamento com Sucesso"
            } else if (element.status == "AGUARDANDO_RETIRADA") {
                status = "Aguardando Retirada"
            } else if (element.status == "EM_TRANSITO") {
                status = "Em Trânsito"
            } else if (element.status == "ENTREGUE") {
                status = "Entregue"
            }

            document.getElementById("lista-pedidos-cliente").innerHTML += `<div class="row">
                <div class="col-xs-10">
                    <h4 class="product-name"><strong>Pedido #${element.id}</strong></h4>
                    <h5><strong>Status do Pedido: ${status}</strong></h5>
                    <h5><strong>Data: ${FormataStringDataToFrontend(element.saleDate)}</strong></h5>
                    <h5>Valor Total: <strong>R$${formataStringMoneyToFrontend(element.totalSaleAmount)}</strong></h5>
                </div>
                <div class="col-xs-2">
                    <a class="btn btn-red" data-toggle="modal"
                     data-target="#viewModalPedido" onclick="listOneOrder(${element.id})">Detalhes</a>
                </div>
            </div>
            <hr>`
        });

    }

    let error = function (err) {
        console.log(err.responseJSON)
    }

    findAllClientOrders(success, error, idCliente)
}

function listOneOrder(idOrder) {


    let success = function (data) {
        console.log(data)
        document.getElementById("lista-produtos").innerHTML = ``

        document.getElementById("vTotalProdutos").innerText = formataStringMoneyToFrontend(data.totalSaleAmount)
        document.getElementById("vMetodoPag").innerText = "Metodo de Pagamento: " + data.paymentMethods
        document.getElementById("vEnderecoEntrg").innerText = data.deliveryAddress.address + ", " + data.deliveryAddress.numberAddress + " - " + data.deliveryAddress.zipCode
        document.getElementById("vEstadoUFEntrg").innerText = data.deliveryAddress.district + ", " + data.deliveryAddress.city + " - " + data.deliveryAddress.uf

        data.listProducts.forEach(element => {
            document.getElementById("lista-produtos").innerHTML += `<div class="order-col">
                                            <div>${element.qtd}x ${element.name}</div>
                                            <div>R$${formataStringMoneyToFrontend(element.unitPrice)}</div>
                                        </div>`
        });
        document.getElementById("lista-produtos").innerHTML += `<div class="order-col">
                                                                <div><strong>Frete</strong></div>
                                                                <div><strong>R$${formataStringMoneyToFrontend(data.fee)}</strong></div>
                                                            </div`


    }

    let error = function (err) {
        console.log(err.responseJSON)
    }

    findOneOrder(success, error, idOrder)
}

function listOrder() {
    let listaPedido = document.getElementById("listaPedido")

    let success = function (data) {
        console.log(data)
        data.forEach(element => {
            let status
            if (element.status == "AGUARDANDO_PAGAMENTO") {
                status = "Aguardando Pagamento"
            } else if (element.status == "PAGAMENTO_REJEITADO") {
                status = "Pagamento Rejeitado"
            } else if (element.status == "PAGAMENTO_SUCESSO") {
                status = "Pagamento com Sucesso"
            } else if (element.status == "AGUARDANDO_RETIRADA") {
                status = "Aguardando Retirada"
            } else if (element.status == "EM_TRANSITO") {
                status = "Em Trânsito"
            } else if (element.status == "ENTREGUE") {
                status = "Entregue"
            }

            listaPedido.innerHTML += `<tr>
                                        <td>${element.id}</td>
                                        <td>${FormataStringDataToFrontend(element.saleDate)}</td>
                                        <td>R$${formataStringMoneyToFrontend(element.totalSaleAmount)}</td>
                                        <td>${status}</td>
                                        <td>                                                
                                            <a class="btn btn-sm btn-icon btn-warning"
                                                title="Alterar" onclick="telaUpdate(${element.id})"
                                                id="btnEdit">
                                                <i class="material-icons-two-tone">edit</i></a>                            
                                        </td>
                                    </tr>`
        });
    }

    let error = function (err) {
        console.log(err.responseJSON)
    }

    findAllOrder(success, error)
}

function loadOrder(idOrder) {
    console.log(idOrder)
    let success = function (data) {
        console.log(data)
        document.getElementById("cIDPedido").value = idOrder
        document.getElementById("cStatusPedido").value = data.status
        document.getElementById("cDataPedido").value = FormataStringDataToFrontend(data.saleDate)
        document.getElementById("cTotalPedido").value = formataStringMoneyToFrontend(data.totalSaleAmount)
    }

    let error = function (err) {
        console.log(err.responseJSON)
    }

    findOneOrder(success, error, idOrder)
}

function saveOrder(event) {
    event.preventDefault()
    let idOrder = document.getElementById("cIDPedido").value
    let statusOrder = document.getElementById("cStatusPedido").value


    let dado = {
        id: idOrder,
        saleStatus: statusOrder
    }

    let success = function (data) {
        alert("Status do Pedido Alterado!")
        window.location = "register-order.html?id=" + id;
    }

    let error = function (err) {
        console.log(err.responseJSON)
    }

    updateOrder(success, error, dado, idOrder)

}


function telaUpdate(id) {
    window.location = "register-order.html?id=" + id;
}


function verificaIdUrl() {
    var url = window.location.href;
    var res = url.split('?');

    if (res[1] !== undefined) {
        var lala = res[1].split('=');
        idOrder = lala[1];
    }

    if (idOrder > 0) {
        loadOrder(idOrder);
    }
}

function findAllClientOrders(success, error, id) {
    $.ajax({
        url: urlPrincipal + urlSales + urlClient + `/${id}`,
        contentType: 'application/json',
        type: 'GET',
        success,
        error,
    })
}

function findOneOrder(success, error, id) {
    $.ajax({
        url: urlPrincipal + urlSales + `/${id}`,
        contentType: 'application/json',
        type: 'GET',
        success,
        error,
    })
}

function findAllOrder(success, error) {
    $.ajax({
        url: urlPrincipal + urlSales,
        contentType: 'application/json',
        type: 'GET',
        success,
        error,
    })
}

function updateOrder(success, error, dado, id) {
    console.log(dado)
    $.ajax({
        url: urlPrincipal + urlSales + `/${id}/status`,
        contentType: 'application/json',
        type: 'PUT',
        data: JSON.stringify(dado),
        success,
        error,
    })
}
