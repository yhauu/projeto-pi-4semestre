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
        window.location = "index.html"
        localStorage.setItem("accessClient", true)
        localStorage.setItem("idClient", data.id)
        localStorage.setItem("emailClient", data.email)
    }

    let error = function (err) {
        console.log(err.responseJSON.message)
        alert("Usuário ou senha invalida!")
    }

    postLogin(success, error, data)
}

function logoofClient() {
    localStorage.setItem("accessClient", false);
    window.location.href = "login-client.html"
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
