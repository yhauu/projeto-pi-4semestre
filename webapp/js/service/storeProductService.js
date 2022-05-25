function listAllProducts() {
    let vListaProdutos = document.getElementById("vListaProdutos")

    let success = function (data) {
        data.forEach(element => {


            vListaProdutos.innerHTML += `
            <div class="col-md-3 col-xs-6" id="productId${element.id}">
                <div class="product">
                    <div class="product-img">
                        <img src="../projeto-games/${findPrincipalImage(element.photos, element.principalPhoto)}" style="max-height: 17rem;">
                    </div>
                    <div class="product-body">
                        <h3 class="product-name"><a href="#">${element.name}</a></h3>
                        <h4 class="product-price">R$${formataStringMoneyToFrontend(element.price)}</h4>
                        <div class="product-rating">
                        </div>
                        <button class="btn primary-btn" onclick="telaProduto(${element.id})"><i class="fa fa-shopping-cart"></i>
                            Comprar</button>
                    </div>
                </div>
            </div>`

        })
    }

    let error = function (err) {
        console.log(err)
    }

    findAll(success, error)
}


function listCarouselProduts() {
//  let vCaroselProdutos = document.getElementById("vCaroselProdutos")

//  let success = function (data) {
//      data.forEach(element => {

//          vCaroselProdutos.innerHTML += `
//          <!-- product -->
//          <div class="product">
//              <div class="product-img">
//                  <img src="../projeto-games/${findPrincipalImage(element.photos, element.principalPhoto)}" style="max-height: 17rem;">
//              </div>
//              <div class="product-body">
//                  <h3 class="product-name"><a href="#">${element.name}</a></h3>
//                  <h4 class="product-price">R$${formataStringMoneyToFrontend(element.price)}</h4>
//                  <div class="product-rating">
//                  </div>
//                  <button class="btn primary-btn" onclick="telaProduto(${element.id})"><i class="fa fa-shopping-cart"></i>
//                      Comprar</button>
//                 </div>
//          </div>
//          <!-- /product -->`


//      })
//  }

//  let error = function (err) {
//      console.log(err)
//  }

//  findAll(success, error)
}

function telaProduto(id) {
    window.location = "store-product.html?id=" + id;
}

function findPrincipalImage(listaImg, namePrincipalImg) {
    let imgPath;

    listaImg.forEach(element => {
        splitText = element.namePhoto.split('.')
        if (splitText[0] === namePrincipalImg) {
            imgPath = (element.path).replace('.', '')
        }
    });

    return imgPath
}

function loadProduct(idProduct) {
    let success = function (data) {
        let productMainImg = document.getElementById("product-main-img")
        let productImgs = document.getElementById("product-imgs")

        console.log(data)
        
        document.getElementById("vProductName").innerText = data.name
        document.getElementById("vProductRating").innerText = (data.rating).toFixed(1)
        document.getElementById("vProductPrice").innerText = "R$ " + formataStringMoneyToFrontend(data.price)
        document.getElementById("vProductDescription").innerText = data.description
        document.getElementById("vProductQtde").innerText = data.quantity + " EM ESTOQUE"

        document.getElementById("btnBuyDiv").innerHTML += `
                <button class="add-to-cart-btn" style="margin-top: 2.5rem" 
                onclick="addProductCart(${data.id})"><i
                class="fa fa-shopping-cart"></i>Comprar</button>`
    }

    let error = function (err) {
        console.log(err)
    }

    //console.log(tela + " " + idProduct);
    findOne(success, error, idProduct);
}

function verificaIdUrl() {
    var url = window.location.href;
    var res = url.split('?');

    if (res[1] !== undefined) {
        var lala = res[1].split('=');
        idProduct = lala[1];
    }

    loadProduct(idProduct);
    
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

function findOne(success, error, id) {
    $.ajax({
        url: urlPrincipal + urlProduto + `/${id}`,
        contentType: 'application/json',
        type: 'GET',
        success,
        error,
    })
}
