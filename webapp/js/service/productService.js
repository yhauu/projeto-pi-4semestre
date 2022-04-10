let idProduct = 0;
var contImg = 0;

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
            document.getElementById("cNomeProduto").value = data.name
            document.getElementById("cQtdeProduto").value = data.quantity
            document.getElementById("cDescricaoProduto").value = data.description
            document.getElementById("cPrecoProduto").value = data.price
            document.getElementById("cAvaliacaoProduto").value = data.rating
            // document.getElementById("cImagemProduto").value = data.photos
        } else {
            document.getElementById("vNomeProduto").value = data.name
            document.getElementById("vQtdeProduto").value = data.quantity
            document.getElementById("vDescricaoProduto").value = data.description
            document.getElementById("vPrecoProduto").value = data.price
            document.getElementById("vAvaliacaoProduto").value = data.rating
            // document.getElementById("vImagemProduto").value = data.photos
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
    let cImagemProduto = null;
    // let cImagemProduto = document.getElementById("cImagemProduto").value;


    let data = {
        name: cNomeProduto,
        quantity: parseInt(cQtdeProduto),
        description: cDescricaoProduto,
        price: parseFloat(cPrecoProduto),
        rating: parseFloat(cAvaliacaoProduto)
        // photos: cImagemProduto
    }

    console.log(data)

    let success = function (data) {
        window.location = "list-product.html"
    }

    let error = function (err) {
        console.log(err)
        // console.log(err.responseJSON.message)
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
            listProduto.innerHTML += `
                    <tr>
                        <td>${element.id}</td>
                        
                        <td>${element.name}</td>
                        <td>${element.quantity}</td>
                        <td>${element.price}</td>
                        <td>${element.productStatus == false ? "Desabilitado" : "Habilitado"}</td>
                        <td>
                            <a class="btn btn-sm btn-icon btn-info" href="#" data-toggle="modal"
                                data-target="#viewModalProduto" title="Informações" 
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
        console.log(err)
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



function addImage() {
    let addImagem = document.getElementById("lista-imagem");


    addImagem.innerHTML += `
                        <div class="col mb-4">
                            <div class="card">
                                <img src="img/pato.jpg" class="img-thumbnail" alt="..."
                                    style="max-height: 10rem;">
                                <div class="card-body p-1">
                                    <h5 class="card-title">Pato.jpg<i
                                            class="material-icons-two-tone md-light">star</i></h5>
                                    <ul class="list-group list-group-horizontal float-right">
                                        <li class="list-group-item p-0"><a
                                                class="btn btn-sm btn-icon btn-warning text-end"
                                                title="Tonar Imagem Principal" onclick="" id="">
                                                <i class="material-icons-two-tone md-light">star</i></a>
                                        </li>
                                        <li class="list-group-item p-0"><a
                                                class="btn btn-sm btn-icon btn-danger text-end"
                                                title="Excluir Imagem" onclick="deleteImage(event)" id="">
                                                <i class="material-icons-two-tone md-light">close</i></a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>`
}

function deleteImage(event) {
    console.log(event);
    console.log($(this))

    $(this).parent().parent().remove();
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