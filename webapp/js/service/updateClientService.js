document.getElementById("cCepCliente3").addEventListener('change', listCep);
document.getElementById("cCepCliente4").addEventListener('change', listCep);

var idClient = parseInt(localStorage.getItem("idClient"))

function loadClient() {

    let cont = 3;
    let success = function (data) {
        document.getElementById("cNomeCliente3").value = data.name;
        document.getElementById("cEmailCliente3").value = data.email;
        document.getElementById("cCPFCliente3").value = data.legalNumber;
        document.getElementById("cDataNascimentoCliente3").value = FormataStringDataToFrontend(data.birthDate)
        document.getElementById("cSexo3").value = data.gender;
        data.address.forEach(element => {
            document.getElementById("cEnderecoCliente"+cont).value = element.address;
            document.getElementById("cNumeroCliente"+cont).value = element.numberAddress;
            document.getElementById("cBairroCliente"+cont).value = element.district;
            document.getElementById("cCepCliente"+cont).value = element.zipCode;
            document.getElementById("cCidadeCliente"+cont).value = element.city;
            document.getElementById("cEstadoCliente"+cont).value = element.uf;
            cont++
        });
        // document.getElementById("cEnderecoCliente4").value = ;
        // document.getElementById("cNumeroCliente4").value;
        // document.getElementById("cBairroCliente4").value;
        // document.getElementById("cCepCliente4").value;
        // document.getElementById("cCidadeCliente4").value;
        // document.getElementById("cEstadoCliente4").value;
        // console.log(data)
    }

    let error = function (err) {
        console.log(err.responseJSON)
    }
    findOneClient(success, error, idClient);
}


function saveUpdate() {
    let cNomeCliente = document.getElementById("cNomeCliente3").value;
    let cDataNascimentoCliente = document.getElementById("cDataNascimentoCliente3").value;
    let cSexo = document.getElementById("cSexo3").value;

    let data = {
        id: idClient,
        name: cNomeCliente,
        birthDate: FormataStringDataToBackend(cDataNascimentoCliente),
        gender: cSexo,
    }

    let success = function (data) {
        alert = "Dados pessoais atualizados com sucesso!";
    }

    let error = function (err) {
        console.log(err)
        console.log(err.responseJSON.message)
    }

    console.log(data)

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

function changePassword() {
    let pass1 = document.getElementById("cSenhaNova").value;
    let pass2 = document.getElementById("cSenhaNova2").value;
    if (pass1 === pass2) {

        let data = {
            id: idClient,
            newPassword:document.getElementById("cSenhaNova").value
        }

        let success = function (data) {
            alert("Senha alterada com sucesso!")
        }

        let error = function (err) {
            console.log(err.responseJSON.message)
        }

        resetPassword(success, error, data, idClient)
    } else {
        alert("As senhas não são iguais!")
    }
}

function update(success, error, data, idClient) {
    $.ajax({
        url: urlPrincipal + urlClient + `/${idClient}/update`,
        contentType: 'application/json',
        type: 'PUT',
        data: JSON.stringify(data),
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

function findOneClient(success, error, idClient) {
    $.ajax({
        url: urlPrincipal + urlClient + `/${idClient}`,
        contentType: 'application/json',
        type: 'GET',
        success,
        error,
    })
}

function resetPassword(success, error, data, idClient) {
    $.ajax({
        url: urlPrincipal + urlClient + `/${idClient}/password`,
        contentType: 'application/json',
        type: 'PUT',
        data: JSON.stringify(data),
        success,
        error,
    })
}