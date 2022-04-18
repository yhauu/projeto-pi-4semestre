function loginUser(event) {
    event.preventDefault()

    let email = document.getElementById("loginUserEmail").value
    let password = document.getElementById("loginUserPassword").value
    let emailDefault = "admin@admin"
    let passwordDefault = "admin"
    let profileDefault = "Administrador"

    // let data = {
    //     email: email,
    //     password: password
    // }

    if (email == emailDefault && password == passwordDefault) {
        localStorage.setItem("access", true)
        localStorage.setItem("email", email)
        localStorage.setItem("profile", profileDefault)

        window.location.href = "main-page-backoffice.html"
    } else {
        alert("Usuário ou senha inválido!")
    }
}

function logoofUser(){
    localStorage.clear();
    window.location.href = "login-user.html"
}

    

document.addEventListener("DOMContentLoaded", function(event) { 
    console.log(document.getElementById("previewUserEmail"))
  });

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

