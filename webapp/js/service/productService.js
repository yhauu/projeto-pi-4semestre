let idProduct = 0;
var contImg = -1;
var listaDeImagens = [];
let primeiraImagem = true;
let elementStarIcon = `<i class="material-icons-two-tone md-light" id="favoriteTestar">star</i>`;
var favoriteImageName


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
        console.log(data)
        if (tela === "editar") {
            document.getElementById("cNomeProduto").value = data.name
            document.getElementById("cQtdeProduto").value = data.quantity
            document.getElementById("cDescricaoProduto").value = data.description
            document.getElementById("cPrecoProduto").value = FormataStringMoneyToFrontend(data.price)
            document.getElementById("cAvaliacaoProduto").value = (data.rating).toFixed(1)

            let cListaImagem = document.getElementById("cListaImagem")

            data.photos.forEach(element => {
                contImg++

                let imgPrincipal = ""
                splitText = element.namePhoto.split('.')
                
                if (splitText[0] === data.principalPhoto){
                    imgPrincipal = elementStarIcon
                    favoriteImageName = imgPrincipal
                }

                cListaImagem.innerHTML += `
                <div class="col mb-4" id="divImg${contImg}">
                    <div class="card">
                        <img id="imgId${contImg}" class="img-thumbnail img-add-imagem" alt="..."
                            style="max-height: 10rem;" src="../projeto-games${element.path.replace('.', '')}">
                        <div class="card-body p-1">
                            <h5 class="card-title" id="imgTitle${contImg}">${splitText[0]}${imgPrincipal}</h5>
                            <ul class="list-group list-group-horizontal float-right">
                                <li class="list-group-item p-0"><a
                                        class="btn btn-sm btn-icon btn-warning text-end"
                                        title="Tonar Imagem Principal" onclick="favoriteImage(imgTitle${contImg})" id="">
                                        <i class="material-icons-two-tone md-light">star</i></a>
                                </li>
                                <li class="list-group-item p-0"><a
                                        class="btn btn-sm btn-icon btn-danger text-end"
                                        title="Excluir Imagem" onclick="deleteImage(divImg${contImg})" id="">
                                        <i class="material-icons-two-tone md-light">close</i></a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>`})

                

        } else {
            document.getElementById("vNomeProduto").value = data.name
            document.getElementById("vQtdeProduto").value = data.quantity
            document.getElementById("vDescricaoProduto").value = data.description
            document.getElementById("vPrecoProduto").value = FormataStringMoneyToFrontend(data.price)
            document.getElementById("vAvaliacaoProduto").value = (data.rating).toFixed(1)

            let vListaImagens = document.getElementById("vListaImagens")
            vListaImagens.innerHTML = ''

            data.photos.forEach(element => {
                let imgPrincipal = ""
                splitText = element.namePhoto.split('.')
                
                if (splitText[0] === data.principalPhoto){
                    imgPrincipal = elementStarIcon
                }

                vListaImagens.innerHTML += `
                <div class="col mb-4">
                    <div class="card">
                        <img src="../projeto-games/${element.path.replace('.', '')}" class="img-thumbnail" alt="..." style="max-height: 10rem;">
                        <div class="card-body p-1">
                            <h5 class="card-title">${element.namePhoto}${imgPrincipal}</h5>                                                                
                        </div>
                    </div>
                </div>`
            })
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
    getImages();

    let cNomeProduto = document.getElementById("cNomeProduto").value;
    let cQtdeProduto = document.getElementById("cQtdeProduto").value;
    let cDescricaoProduto = document.getElementById("cDescricaoProduto").value;
    let cPrecoProduto = document.getElementById("cPrecoProduto").value;
    let cAvaliacaoProduto = document.getElementById("cAvaliacaoProduto").value;

    let formData = new FormData();

    let data = {
            name: cNomeProduto,
            quantity: parseInt(cQtdeProduto),
            description: cDescricaoProduto,
            price: parseFloat(cPrecoProduto.replace(',', '.')),
            rating: parseFloat(cAvaliacaoProduto),
            principalPhoto: favoriteImageName
    }

    formData.append('data', JSON.stringify(data));

    let contador = 1;
    console.log(listaDeImagens)
    for (img64 of listaDeImagens) {
        var file = dataURLtoFile(img64, "img-" + contador);
        formData.append('files', file);
        contador++;
    }

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
        post(success, error, formData);
    }
}
function getImages() {
    let imagens = document.getElementsByClassName("img-add-imagem");
    for (let img of imagens) {
        listaDeImagens.push(img.currentSrc);
        console.log(imagens.src)
    }
}

function listProduct() {
    let listProduto = document.getElementById("listaProduto")

    let success = function (data) {
        data.forEach(element => {     
            let = formatPrice = parseFloat(element.price).toFixed(2)
            formatPrice = formatPrice.replace('.', ',')   
            listProduto.innerHTML += `
                    <tr>
                        <td>${element.id}</td>
                        <td>${element.name}</td>
                        <td>${element.quantity}</td>
                        <td>R$${FormataStringMoneyToFrontend(element.price)}</td>
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
    let addImagem = document.getElementById("cListaImagem");
    let inputFile = document.getElementById("cImagemProduto").files;
    let inputFileForm = document.getElementById("cImagemProduto");
    let firstImageFavorite
    contImg++;

    if (inputFileForm.files.length != 0) {
        if (contImg == 0) {
            favoriteImageName = "img1"
             firstImageFavorite = elementStarIcon
        }else {
            firstImageFavorite = ""
        }

        addImagem.innerHTML += `
                        <div class="col mb-4" id="divImg${contImg}">
                            <div class="card">
                                <img id="imgId${contImg}" class="img-thumbnail img-add-imagem" alt="..."
                                    style="max-height: 10rem;">
                                <div class="card-body p-1">
                                    <h5 class="card-title" id="imgTitle${contImg}">img${contImg + 1}${firstImageFavorite}</h5>
                                    <ul class="list-group list-group-horizontal float-right">
                                        <li class="list-group-item p-0"><a
                                                class="btn btn-sm btn-icon btn-warning text-end"
                                                title="Tonar Imagem Principal" onclick="favoriteImage(imgTitle${contImg})" id="">
                                                <i class="material-icons-two-tone md-light">star</i></a>
                                        </li>
                                        <li class="list-group-item p-0"><a
                                                class="btn btn-sm btn-icon btn-danger text-end"
                                                title="Excluir Imagem" onclick="deleteImage(divImg${contImg})" id="">
                                                <i class="material-icons-two-tone md-light">close</i></a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>`

        if (inputFile.length > 0) {
            var fileReader = new FileReader();

            fileReader.onload = function (event) {
                document.getElementById(`imgId${contImg}`).setAttribute("src", event.target.result);
            }

            fileReader.readAsDataURL(inputFile[0]);
        }
    } else {
        alert("Selecione uma Imagem!");
        contImg--
    }

    inputFileForm.value = "";
}

function favoriteImage(event) {
    if (document.getElementById("favoriteTestar") != null) {
        let node = document.getElementById("favoriteTestar")

        if (node.parentNode) {
            node.parentNode.removeChild(node);
        }
    }
    // console.log(event)
    favoriteImageName = event.textContent
    event.innerHTML += elementStarIcon
}

function deleteImage(event) {
    event.remove();
}

function dataURLtoFile(dataurl, filename) {

    var arr = dataurl.split(','),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);

    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }

    return new File([u8arr], filename, { type: mime });
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
    $.ajax({
        url: urlPrincipal + urlProduto,
        type: 'POST',
        contentType: false,
        processData: false,
        data: dado,
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