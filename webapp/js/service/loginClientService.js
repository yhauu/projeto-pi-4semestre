function logiClient(event) {
    event.preventDefault()

    let email = document.getElementById("loginClientEmail").value
    let password = document.getElementById("loginClientPassword").value

    let data = {
        email: email,
        password: password
    }

    let success = function (data) {
        window.location = "index.html"
        localStorage.setItem("access", true)
        localStorage.setItem("email", data.email)
    }

    let error = function (err) {
        console.log(err.responseJSON.message)
        alert("Usuário ou senha invalida!")
    }

    postLogin(success, error, data)
}

function logoofClient() {
    localStorage.clear();
    window.location.href = "login-client.html"
}


async function countHeaderClientData() {
    await sleep(500);
    loadHeaderData();
    loadNavData();
}

function loadHeaderData() {
    document.getElementById("previewClientEmail").insertAdjacentHTML('afterbegin', localStorage.getItem("email"))
    document.getElementById("previewClientProfile").insertAdjacentHTML('afterbegin', localStorage.getItem("profile"))
}

function loadNavData(){
    if(localStorage.getItem("profile") == "ESTOQUISTA") {
        document.getElementById("navAdm").remove()
    }
}

function postLogin(success, error, dado) {
    $.ajax({
        url: urlPrincipal + urlLoginUsuario,
        contentType: 'application/json',
        type: 'POST',
        data: JSON.stringify(dado),
        success,
        error,
    })
}
