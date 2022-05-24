function telaUpdate (id) {
    window.location = "register-order.html?id=" + id;
}

function verificaIdUrl() {
    var url = window.location.href;
    var res = url.split('?');

    if (res[1] !== undefined) {
        var lala = res[1].split('=');
        idProduct = lala[1];
    }

    if (idProduct > 0) {
        // loadProduct("editar", idProduct);
    }
}