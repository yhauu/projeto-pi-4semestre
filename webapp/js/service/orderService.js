function listClientOrders() {
    let idCliente = parseInt(localStorage.getItem("idClient"))

    let success = function (data) {
    
        data.forEach(element => {
            document.getElementById("lista-pedidos-cliente").innerHTML += `<div class="row">
                <div class="col-xs-10">
                    <h4 class="product-name"><strong>Pedido #${element.id}</strong></h4>
                    <h5><strong>Status do Pedido: ${element.status}</strong></h5>
                    <h5><strong>Data: 23/05/2022</strong></h5>
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
        // document.getElementById("vIDPedido").innerText = 
        // document.getElementById("vTotalProdutos").innerText = 
        // document.getElementById("vMetodoPag").innerText = 
        // document.getElementById("vEnderecoEntrg").innerText = 
        // document.getElementById("vEstadoUFEntrg").innerText = 
        // document.getElementById("vEnderecoEntrg").innerText = 
        // document.getElementById("vEstadoUFEntrg").innerText = 
        // document.getElementById("lista-produtos").innerText = 
        

    }

    let error = function (err) {
        console.log(err.responseJSON)
    }

    findOneOrder(success, error, idOrder)
}

function telaUpdate(id) {
    window.location = "register-order.html?id=" + id;
}

// function verificaIdUrl() {
//     var url = window.location.href;
//     var res = url.split('?');

//     if (res[1] !== undefined) {
//         var lala = res[1].split('=');
//         idProduct = lala[1];
//     }

//     if (idProduct > 0) {
//         // loadProduct("editar", idProduct);
//     }
// }

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
