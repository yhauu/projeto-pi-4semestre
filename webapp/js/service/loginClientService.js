function loginClient(event) {
    event.preventDefault()

    let emailClient = document.getElementById("loginClientEmail").value
    let passwordClient = document.getElementById("loginClientPassword").value

    let data = {
        email: emailClient,
        password: passwordClient
    }

    console.log(data);

    let success = function (data) {
        localStorage.setItem("accessClient", true)
        localStorage.setItem("idClient", data.id)
        localStorage.setItem("emailClient", data.email)
        verAcesso()
    }

    let error = function (err) {
        console.log(err.responseJSON.message)
        alert("Usuário ou senha invalida!")
    }

    postLogin(success, error, data)
}

function verAcesso() {
    let acesso = localStorage.getItem("processo-compra")

    console.log(acesso)
    

    if(acesso === "true") {
        window.location.href = "select-address.html"
        localStorage.setItem("processo-compra", false)
    } else {        
        window.location.href = "index.html"
    }
}

function logoofClient() {
    localStorage.setItem("accessClient", false);
    localStorage.setItem("idClient", null)
    localStorage.setItem("emailClient", null)
    window.location.href = "index.html"
}


async function countHeaderClientData() {
    await sleep(500);
    loadNavData();
}


function loadNavData() {
    if (localStorage.getItem("accessClient") === "true") {
        document.getElementById("navItem").innerHTML = `
        				<li><a href="store-list-order.html"><i class="fa fa-list"></i>Meus Pedidos</a></li>
                        <li><a href="update-client.html"><i class="fa fa-user-o"></i>Meu Perfil</a></li>
                        <li><a href="login-client.html" onclick="logoofClient()"><i class="fa fa-sign-out"></i>Logoof</a></li>
                    `
    }
}

function ocultaFrete (){
    if (localStorage.getItem("accessClient") === "true") {
        document.getElementById("ocultaFrete").innerHTML = ``
    }
}

function postLogin(success, error, dado) {
    $.ajax({
        url: urlPrincipal + urlLoginClient,
        contentType: 'application/json',
        type: 'POST',
        data: JSON.stringify(dado),
        success,
        error,
    })
}
