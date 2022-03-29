let idProduct = 0;

function verificaIdUrl() {
    var url = window.location.href;
    var res = url.split('?');

    if (res[1] !== undefined) {
        var lala = res[1].split('=');
        idProduct = lala[1];
    }

    if (idProduct > 0) {
        loadProduct("editar", idProduct);
    }
}

function loadProduct(tela, idProduct) {
    let success = function (data) {
        //console.log(data)
        if (tela === "editar") {
            // document.getElementById("cNomeProduto").value = data.
            // document.getElementById("cQtdeProduto").value = data.
            // document.getElementById("cDescricaoProduto").value = data.
            // document.getElementById("cPrecoProduto").value = data.
            // document.getElementById("cAvaliacaoProduto").value = data.
            // document.getElementById("cImagemProduto").value = data.
        } else {
            // document.getElementById("vNomeProduto").value = data.
            // document.getElementById("vQtdeProduto").value = data.
            // document.getElementById("vDescricaoProduto").value = data.
            // document.getElementById("vPrecoProduto").value = data.
            // document.getElementById("vAvaliacaoProduto").value = data.
            // document.getElementById("vImagemProduto").value = data.
        }
    }

    let error = function (err) {
        console.log(err)
    }

    //console.log(tela + " " + idProduct);
    findOne(success, error, idProduct);
}

function saveProduct(event) {
    event.preventDefault()

    let cNomeProduto = document.getElementById("cNomeProduto").value;
    let cQtdeProduto = document.getElementById("cQtdeProduto").value;
    let cDescricaoProduto = document.getElementById("cDescricaoProduto").value;
    let cPrecoProduto = document.getElementById("cPrecoProduto").value;
    let cAvaliacaoProduto = document.getElementById("cAvaliacaoProduto").value;
    // let cImagemProduto = document.getElementById("cImagemProduto").value;

    let data = {
        // ?: cNomeProduto,
        // ?: cQtdeProduto,
        // ?: cDescricaoProduto,
        // ?: cPrecoProduto,
        // ?: cAvaliacaoProduto,
        
    }

    let success = function (data) {
        window.location = "list-product.html"
    }

    let error = function (err) {
        // console.log(err)
        // console.log(err.responseJSON.message)
        if (err.status == 400) {
            alert("O e-mail já está em uso!")
        }
    }

    if (idProduct > 0) {
        update(success, error, data, idProduct);
    } else {
        post(success, error, data);
    }


}

function listProduct() {
    let listProduto = document.getElementById("listaProduto")


    let success = function (data) {

        data.forEach(element => {
            //console.log(element)
            listaUsuario.innerHTML += `
                    <tr>
                        <td>${element.id}</td>
                        <td>${element.login}</td>
                        <td>${element.name}</td>
                        <td>${element.legalNumber}</td>
                        <td>${element.profile}</td>
                        <td>${element.productStatus == false ? "Desabilitado" : "Habilitado"}</td>
                        <td>
                            <a class="btn btn-sm btn-icon btn-info" href="#" data-toggle="modal"
                                data-target="#viewModalUsuario" title="Informações" 
                                id="btnView" onclick="loadProduct('visualizar', ${element.id})">
                                <i class="material-icons-two-tone">info</i></a>
                            <a class="btn btn-sm btn-icon btn-secondary" href="#"                            
                                title="Ativar/Desativar"
                                id="btnAtive" onclick="disableProduct(${element.id})">
                                <i class="material-icons-two-tone">toggle_on</i></a>
                            <a class="btn btn-sm btn-icon btn-warning"
                                title="Editar" onclick="telaUpdate(${element.id})"
                                id="btnEdit">
                                <i class="material-icons-two-tone">edit</i></a>                            
                        </td>
                    </tr>
                `
        })
    }

    let error = function (err) {

    }

    findAll(success, error)

}

function telaUpdate(id) {
    window.location = "register-product.html?id=" + id;
}

function disableProduct(id) {
    let success = function () {
        document.location.reload(true);
    }

    let error = function (err) {
        console.log(err);
    }

    disable(success, error, id)
}

function disable(success, error, id) {
    $.ajax({
        url: urlPrincipal + urlProduto + `/${id}/status`,
        contentType: 'application/json',
        type: 'PUT',
        success,
        error
    })
}

function post(success, error, dado) {
    //console.log(urlPrincipal + urlUsuario)
    $.ajax({
        url: urlPrincipal + urlProduto,
        contentType: 'application/json',
        type: 'POST',
        data: JSON.stringify(dado),
        success,
        error,
    })
}

function findAll(success, error) {
    $.ajax({
        url: urlPrincipal + urlProduto,
        contentType: 'application/json',
        type: 'GET',
        success,
        error,
    })
}

function update(success, error, dado, id) {
    $.ajax({
        url: urlPrincipal + urlProduto + `/${id}/update`,
        contentType: 'application/json',
        type: 'PUT',
        data: JSON.stringify(dado),
        success,
        error,
    })
}

function findOne(success, error, id) {
    $.ajax({
        url: urlPrincipal + urlProduto + `/${id}`,
        contentType: 'application/json',
        type: 'GET',
        success,
        error,
    })
}