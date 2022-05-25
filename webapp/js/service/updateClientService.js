document.getElementById("cCepCliente3").addEventListener('change', listCep);
document.getElementById("cCepCliente4").addEventListener('change', listCep);

let idClient = 0

function verificaIdUrl() {
    var url = window.location.href;
    var res = url.split('?');

    if (res[1] !== undefined) {
        var lala = res[1].split('=');
        idClient = lala[1];
    }

    if (idClient > 0) {
        loadUser(idClient);
    }
}


function loadClient(idClient) {
    let success = function (data) {
        //console.log(data)
        document.getElementById("cNomeCliente").value;
        document.getElementById("cEmailCliente").value;
        document.getElementById("cCPFCliente").value;
        document.getElementById("cSenhaCliente").value;
        document.getElementById("cDataNascimentoCliente").value;
        document.getElementById("cSexo").value;
        document.getElementById("cEnderecoCliente1").value;
        document.getElementById("cNumeroCliente1").value;
        document.getElementById("cBairroCliente1").value;
        document.getElementById("cCepCliente1").value;
        document.getElementById("cCidadeCliente1").value;
        document.getElementById("cEstadoCliente1").value;
        document.getElementById("cEnderecoCliente2").value;
        document.getElementById("cNumeroCliente2").value;
        document.getElementById("cBairroCliente2").value;
        document.getElementById("cCepCliente2").value;
        document.getElementById("cCidadeCliente2").value;
        document.getElementById("cEstadoCliente2").value;
        document.getElementById("cDataNascimentoCliente").value;
        document.getElementById("cSexo").value;
        document.getElementById("cEnderecoCliente").value;
        document.getElementById("cNumeroCliente").value;
        document.getElementById("cBairroCliente").value;
        document.getElementById("cCepCliente").value;
        document.getElementById("cCidadeCliente").value;
        document.getElementById("cEstadoCliente").value;
    }
    let error = function (err) {
        console.log(err)
    }
    //console.log(tela + " " + idClient);
    findOne(success, error, idClient);
}


function saveUpdate(event) {
    event.preventDefault()

    let cNomeCliente = document.getElementById("cNomeCliente").value;
    let cDataNascimentoCliente = document.getElementById("cDataNascimentoCliente").value;
    let cSexo = document.getElementById("cSexo").value;

    let data = {
        name: cNomeCliente,
        birthDate: cDataNascimentoCliente,
        password: cSenhaCliente,
        gender: cSexo,
    }

    let success = function (data) {
        alert = "Dados pessoais atualizados com sucesso!";
    }

    let error = function (err) {
        console.log(err)
        console.log(err.responseJSON.message)
    }

    update(success, error, data, idClient);
}

function listCep(e) {
    let cep = e.target.value;
    let id = e.target.id;
    let success = function (data) {

        if (id === "cCepCliente3") {
            document.getElementById("cEnderecoCliente3").value = data.logradouro;
            document.getElementById("cBairroCliente3").value = data.bairro;
            document.getElementById("cCidadeCliente3").value = data.localidade;
            document.getElementById("cEstadoCliente3").value = data.uf;
        }
        else {
            document.getElementById("cEnderecoCliente4").value = data.logradouro;
            document.getElementById("cBairroCliente4").value = data.bairro;
            document.getElementById("cCidadeCliente4").value = data.localidade;
            document.getElementById("cEstadoCliente4").value = data.uf;
        }
    }

    let error = function (err) {
        console.log(err)
    }

    findViaCep(success, error, cep);
}

function update(success, error, dado, id) {
    $.ajax({
        url: urlPrincipal + urlClient + `/${id}/update`,
        contentType: 'application/json',
        type: 'PUT',
        data: JSON.stringify(dado),
        success,
        error,
    })
}

function findViaCep(success, error, cep) {
    $.ajax({
        url: urlViaCEP + `/${cep}` + `/json`,
        contentType: 'application/json',
        type: 'GET',
        success,
        error,
    })
}

function findOne(success, error, id) {
    $.ajax({
        url: urlPrincipal + urlClient + `/${id}`,
        contentType: 'application/json',
        type: 'GET',
        success,
        error,
    })
}
