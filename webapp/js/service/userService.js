let idUser = 0;

function verificaIdUrl() {
    var url = window.location.href;
    var res = url.split('?');

    if (res[1] !== undefined) {
        var lala = res[1].split('=');
        idUser = lala[1];
    }

    if (idUser > 0) {
        loadUser("editar", idUser);
    }
}

function loadUser(tela, idUser) {
    let success = function (data) {
        console.log(data)
        if (tela === "editar") {
            document.getElementById("cNomeUsuario").value = data.name
            document.getElementById("cUserUsuario").value = data.login
            document.getElementById("cSenhaUsuario").value = data.password
            document.getElementById("cCPFUsuario").value = data.legalNumber
            document.getElementById("cDataNascimentoUsuario").value = data.birthDate
            document.getElementById("cEmailUsuario").value = data.email
            document.getElementById("cTelefone").value = data.telephoneNumber
            document.getElementById("cPerfilUsuário").value = data.profile
        } else {
            document.getElementById("vNomeUsuario").value = data.name
            document.getElementById("vUserUsuario").value = data.login
            //document.getElementById("vSenhaUsuario").value = data.password
            document.getElementById("vCPFUsuario").value = data.legalNumber
            document.getElementById("vDataNascimentoUsuario").value = data.birthDate
            document.getElementById("vEmailUsuario").value = data.email
            document.getElementById("vTelefone").value = data.telephoneNumber
            document.getElementById("vPerfilUsuario").value = data.profile
            document.getElementById("vStatusUsuario").value = data.userStatus
            document.getElementById("vDataAltercaoUsuario").value = data.statusUpdateDate
        }
    }

    let error = function (err) {
        console.log(err)
    }

    console.log(tela+" "+idUser);
    findOne(success, error, idUser);
}

function saveUser(event) {
    event.preventDefault()

    let cNomeUsuario = document.getElementById("cNomeUsuario").value;
    let cUserUsuario = document.getElementById("cUserUsuario").value;
    let cSenhaUsuario = document.getElementById("cSenhaUsuario").value;
    let cCPFUsuario = document.getElementById("cCPFUsuario").value;
    let cDataNascimentoUsuario = document.getElementById("cDataNascimentoUsuario").value;
    let cEmailUsuario = document.getElementById("cEmailUsuario").value;
    let cTelefone = document.getElementById("cTelefone").value;
    let cPerfilUsuário = document.getElementById("cPerfilUsuário").value;

    let data = {
        name: cNomeUsuario,
        login: cUserUsuario,
        legalNumber: cCPFUsuario,
        password: cSenhaUsuario,
        telephoneNumber: cTelefone,
        email: cEmailUsuario,
        birthDate: FormataStringData(cDataNascimentoUsuario),
        profile: cPerfilUsuário
    }

    let success = function (data) {
        window.location = "list-user.html"
    }

    let error = function (err) {
        console.log(err)
    }

    if (idUser > 0) {
        update(success, error, data, idUser);
    } else {
        post(success, error, data);
    }
}


function listUser() {
    let listUsuario = document.getElementById("listaUsuario")


    let success = function (data){
        
        data.forEach(element => {
            console.log(element)
            listaUsuario.innerHTML += `
                    <tr>
                        <td>${element.id}</td>
                        <td>${element.login}</td>
                        <td>${element.name}</td>
                        <td>${element.legalNumber}</td>
                        <td>${element.profile}</td>
                        <td>${element.userStatus == false?"Desabilitado": "Habilitado"}</td>
                        <td>
                            <a class="btn btn-sm btn-icon btn-info" href="#" data-toggle="modal"
                                data-target="#viewModalUsuario" title="Informações" 
                                id="btnView" onclick="loadUser('visualizar', ${element.id})">
                                <i class="material-icons-two-tone">info</i></a>
                            <a class="btn btn-sm btn-icon btn-secondary" href="#"                            
                                title="Ativar/Desativar"
                                id="btnAtive" onclick="disableUser(${element.id})">
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

    let error = function (err){
        
    }

    findAll(success, error)

}

function telaUpdate(id) {
    window.location = "register-user.html?id="+id;
}

function disableUser(id) {
    let success = function (){
        document.location.reload(true);
    }

    let error = function (err){
        console.log(err);
    }

    disable(success, error, id)
}

function disable(success, error, id) {
    $.ajax({
        url: urlPrincipal + urlUsuario + `/${id}/status`,
        contentType: 'application/json',
        type: 'PUT',
        success,
        error
    })
}

function post(success, error, dado) {
    console.log(urlPrincipal + urlUsuario)
    $.ajax({
        url: urlPrincipal + urlUsuario,
        contentType: 'application/json',
        type: 'POST',
        data: JSON.stringify(dado),
        success,
        error,
    })
}

function findAll(success, error) {
    $.ajax({
        url: urlPrincipal + urlUsuario,
        contentType: 'application/json',
        type: 'GET',
        success,
        error,
    })
}

function update(success, error, dado, id) {
    $.ajax({
        url: urlPrincipal + urlUsuario + `/${id}/update`,
        contentType: 'application/json',
        type: 'PUT',
        data: JSON.stringify(dado),
        success,
        error,
    })
}

function findOne(success, error, id) {
    $.ajax({
        url: urlPrincipal + urlUsuario + `/${id}`,
        contentType: 'application/json',
        type: 'GET',
        success,
        error,
    })
}