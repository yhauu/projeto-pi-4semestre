function loginUser(event) {
    event.preventDefault()

    let email = document.getElementById("loginUserEmail").value
    let password = document.getElementById("loginUserPassword").value

    let data = {
        email: email,
        password: password
    }

    let success = function (data) {
        window.location = "main-page-backoffice.html"
        localStorage.setItem("access", true)
        localStorage.setItem("email", data.email)
        localStorage.setItem("profile", data.profile)
    }

    let error = function (err) {
        console.log(err)
        alert("Usuário ou senha invalida!")
    }

    postLogin(success, error, data)

    //     if (email == emailDefault && password == passwordDefault) {
    //         localStorage.setItem("access", true)
    //         localStorage.setItem("email", email)
    //         localStorage.setItem("profile", profileDefault)

    //         window.location.href = "main-page-backoffice.html"
    //     } else {
    //         alert("Usuário ou senha inválido!")
    //     }
    // }
}

function logoofUser() {
    localStorage.clear();
    window.location.href = "login-user.html"
}


async function countHeaderUserData() {
    await sleep(500);
    loadHeaderData();
}

function loadHeaderData() {
    document.getElementById("previewUserEmail").insertAdjacentHTML('afterbegin', localStorage.getItem("email"))
    document.getElementById("previewUserProfile").insertAdjacentHTML('afterbegin', localStorage.getItem("profile"))
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

