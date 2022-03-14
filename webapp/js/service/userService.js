function saveUser() {
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
        birthDate: cDataNascimentoUsuario,
        profile: cPerfilUsuário
    }

    console.log(data)

    let success = function (data) {
        console.log(data);
    }

    let error = function (err) {
        console.log(err);
    }

    post(success, error, data);
}

function listUser() {

    let listUsuario = document.getElementById("listaUsuario")

    let data = {
        id: 0,
        name: "Felype 1",
        login: "Felipe-sama",
        legalNumber: "123-123-123-12",
        password: "f3r1pe",
        telephone: "123",
        email: "aiii@aiii",
        birthDate: "10/10/2002",
        profile: "Safado",
        status: "Ativado"
    }
    let data1 = {
        id: 1,
        name: "Felype 2",
        login: "Felipe-sama",
        legalNumber: "123-123-123-12",
        password: "f3r1pe",
        telephone: "123",
        email: "aiii@aiii",
        birthDate: "10/10/2002",
        profile: "Safado",
        status: "Ativado"
    }
    let data2 = {
        id: 2,
        name: "Felype 3",
        login: "Felipe-sama",
        legalNumber: "123-123-123-12",
        password: "f3r1pe",
        telephone: "123",
        email: "aiii@aiii",
        birthDate: "10/10/2002",
        profile: "Safado",
        status: "Ativado"
    }

    let data3 = {
        id: 3,
        name: "Felype 4",
        login: "Felipe-sama",
        legalNumber: "123-123-123-12",
        password: "f3r1pe",
        telephone: "123",
        email: "aiii@aiii",
        birthDate: "10/10/2002",
        profile: "Safado",
        status: "Ativado"
    }

    var list = [];

    list.push(data);
    list.push(data1);
    list.push(data2);
    list.push(data3);

    console.log(list)

    list.forEach(element => {
        listaUsuario.innerHTML += `
                <tr>
                    <td>${element.id}</td>
                    <td>${element.login}</td>
                    <td>${element.name}</td>
                    <td>${element.legalNumber}</td>
                    <td>${element.profile}</td>
                    <td>${element.status}</td>
                    <td>
                        <a class="btn btn-sm btn-icon btn-info" href="#" data-toggle="modal"
                            data-target="#viewModalUsuario" title="Informações">
                            <i data-feather="info"></i></a>
                        <a class="btn btn-sm btn-icon btn-secondary" href="#"
                            data-toggle="modal" data-target="#updateModalUsuario"
                            title="Ativar/Desativar"><i data-feather="toggle-left"></i></a>
                        <a class="btn btn-sm btn-icon btn-warning" href="register-user.html"
                            title="Editar"><i data-feather="edit"></i></a>
                        <a class="btn btn-sm btn-icon btn-danger" href="#" data-toggle="modal"
                            data-target="#deleteUsuarioModal" title="Excluir"><i
                                data-feather="x"></i></a>
                    </td>
                </tr>
            `

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
        url: ursPrincipal + urlUsuario,
        contentType: 'application/json',
        type: 'GET',
        success,
        error,
    })
}