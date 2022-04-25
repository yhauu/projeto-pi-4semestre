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
                        <h4 class="product-price">R$${FormataStringMoneyToFrontend(element.price)}</h4>
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
    // let vCaroselProdutos = document.getElementById("vCaroselProdutos")
    
    // let success = function (data) {
    //     data.forEach(element => {

    //         vCaroselProdutos.innerHTML += `
    //         <!-- product -->
    //         <div class="product">
    //             <div class="product-img">
    //                 <img src="../projeto-games/${findPrincipalImage(element.photos, element.principalPhoto)}" style="max-height: 17rem;">
    //             </div>
    //             <div class="product-body">
    //                 <h3 class="product-name"><a href="#">${element.name}</a></h3>
    //                 <h4 class="product-price">R$${FormataStringMoneyToFrontend(element.price)}</h4>
    //                 <div class="product-rating">
    //                 </div>
    //                 <button class="btn primary-btn" onclick="telaProduto(${element.id})"><i class="fa fa-shopping-cart"></i>
    //                     Comprar</button>
    //                </div>
    //         </div>
    //         <!-- /product -->`
            

    //     })
    // }

    // let error = function (err) {
    //     console.log(err)
    // }

    // findAll(success, error)
}


function findPrincipalImage (listaImg, namePrincipalImg) {
    let imgPath;

    listaImg.forEach(element => {        
        splitText = element.namePhoto.split('.')
        if (splitText[0] === namePrincipalImg) {
            imgPath = (element.path).replace('.', '')
        }
    });

    return imgPath
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
