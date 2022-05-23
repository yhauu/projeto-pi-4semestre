document.getElementById("cCepCliente3").addEventListener('change', listCep);
document.getElementById("cCepCliente4").addEventListener('change', listCep);

function saveUpdate(event) {
    event.preventDefault()

    let cNomeUsuario3 = document.getElementById("cNomeUsuario3").value;
    let cDataNascimentoCliente3 = document.getElementById("cDataNascimentoCliente3").value;
    let cSexo3 = document.getElementById("cSexo3").value;


    let data = {
        name: cNomeUsuario3,
        birthDate: FormataStringDataToBackend(cDataNascimentoCliente3),
        sex: cSexo3,
    }

    let success = function (data) {
        window.location = "login-client.html"
    }

    let error = function (err) {
        console.log(err)
        // console.log(err.responseJSON.message)
        }

    update(success, error, data, idClient);
}

function listCep(e) {
    let cep = e.target.value;
    let id = e.target.id;
    let success = function (data) {

        if (cep == "" || cep == " " || cep == "0") {
            if (id === "cCepCliente3") {
                document.getElementById("cEnderecoCliente3").value = "";
                document.getElementById("cBairroCliente3").value = "";
                document.getElementById("cCidadeCliente3").value = "";
                document.getElementById("cEstadoCliente3").value = "";

            }
            else {
                document.getElementById("cEnderecoCliente4").value = "";
                document.getElementById("cBairroCliente4").value = "";
                document.getElementById("cCidadeCliente4").value = "";
                document.getElementById("cEstadoCliente4").value = "";
            }
        }
        else
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