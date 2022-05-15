let idClient = 0;

function verificaIdUrl() {
    var url = window.location.href;
    var res = url.split('?');

    if (res[1] !== undefined) {
        var lala = res[1].split('=');
        idClient = lala[1];
    }

    if (idClient > 0) {
        loadUser("editar", idClient);
    }
}

function loadClient(tela, idClient) {
    let success = function (data) {
        //console.log(data)
        if (tela === "editar") {
            document.getElementById("cSenhaCliente").value;
            document.getElementById("cDataNascimentoCliente").value;
            document.getElementById("cSexo").value;
            document.getElementById("cEnderecoCliente").value;
            document.getElementById("cNumeroCliente").value;
            document.getElementById("cBairroCliente").value;
            document.getElementById("cCepCliente").value;
            document.getElementById("cCidadeCliente").value;
            document.getElementById("cEstadoCliente").value;
            DisableForm("cEmailCliente")
            DisableForm("cCPFCliente")
        } else 
            document.getElementById("cDataNascimentoCliente").value;
            document.getElementById("cSexo").value;
            document.getElementById("cEnderecoCliente").value;
            document.getElementById("cNumeroCliente").value;
            document.getElementById("cBairroCliente").value;
            document.getElementById("cCepCliente").value;
            document.getElementById("cCidadeCliente").value;
            document.getElementById("cEstadoCliente").value;
        }
    }

    let error = function (err) {
        console.log(err)
    }

    //console.log(tela + " " + idClient);
    findOne(success, error, idClient);

function saveClient(event) {
    event.preventDefault()

    let cEmailCliente = document.getElementById("cEmailCliente").value;
    let cCPFCliente = document.getElementById("cCPFCliente").value;
    let cSenhaCliente = document.getElementById("cSenhaCliente").value;
    let cDataNascimentoCliente = document.getElementById("cDataNascimentoCliente").value;
    let cSexo = document.getElementById("cSexo").value;
    let cEnderecoCliente1 = document.getElementById("cEnderecoCliente1").value;
    let cNumeroCliente1 = document.getElementById("cNumeroCliente1").value;
    let cBairroCliente1 = document.getElementById("cBairroCliente1").value;
    let cCepCliente1 = document.getElementById("cCepCliente1").value;
    let cCidadeCliente1 = document.getElementById("cCidadeCliente1").value;
    let cEstadoCliente1 = document.getElementById("cEstadoCliente1").value;
    let cEnderecoCliente2 = document.getElementById("cEnderecoCliente2").value;
    let cNumeroCliente2 = document.getElementById("cNumeroCliente2").value;
    let cBairroCliente2 = document.getElementById("cBairroCliente2").value;
    let cCepCliente2 = document.getElementById("cCepCliente2").value;
    let cCidadeCliente2 = document.getElementById("cCidadeCliente2").value;
    let cEstadoCliente2 = document.getElementById("cEstadoCliente2").value;


    if (ValidCPF(cCPFCliente) === true) {

        let data = {
            name: cNomeUsuario,
            login: cEmailCliente,
            legalNumber: cCPFCliente,
            password: cSenhaCliente,
            birthDate: FormataStringDataToBackend(cDataNascimentoCliente),
            sex: cSexo,
            email: cEmailCliente,
            address1: cEnderecoCliente1,
            number1: cNumeroCliente1,
            district1: cBairroCliente1,
            cep1: cCepCliente1,
            city1: cCidadeCliente1,
            state1: cEstadoCliente1,
            address2: cEnderecoCliente2,
            number2: cNumeroCliente2,
            district2: cBairroCliente2,
            cep2: cCepCliente2,
            city2: cCidadeCliente2,
            state2: cEstadoCliente2
            }

        let success = function (data) {
            window.location = "login-client.html"
        }

        let error = function (err) {
             console.log(err)
            // console.log(err.responseJSON.message)
            if (err.status == 400 && err.message == "Email is already in use!"){
                alert("O e-mail já está em uso!")
            } 
        }

        if (idClient > 0) {
            update(success, error, data, idClient);
        } else {
            post(success, error, data);
        }

    } else {
        alert("CPF Invalido");
    }
}

function listClient() {
    let listClient = document.getElementById("listaClient")


    let success = function (data) {

        data.forEach(element => {
            //console.log(element)
            listaClient.innerHTML += `
                    <tr>
                        <td>${element.id}</td>
                        <td>${element.login}</td>
                        <td>${element.name}</td>
                        <td>${element.legalNumber}</td>
                        <td>${element.profile}</td>
                        <td>${element.userStatus == false ? "Desabilitado" : "Habilitado"}</td>
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

    let error = function (err) {

    }

    findAll(success, error)

}

function telaUpdate(id) {
    window.location = "register-user.html?id=" + id;
}

function disableUser(id) {
    let success = function () {
        document.location.reload(true);
    }

    let error = function (err) {
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
    //console.log(urlPrincipal + urlUsuario)
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