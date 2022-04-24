// Import Common HTML Function
$(function () {
    var includes = $('[data-include]')
    $.each(includes, function () {
        var file = 'common/' + $(this).data('include') + '.html'
        $(this).load(file)
    })
})

// Function DataTable
async function countDataTable(){
    await sleep(50);
    startDataTable();
}

function startDataTable() {
    $('table').DataTable({
        dom: 'Bfrtip',
        // order: [[0,'asc']],
        order: [],
        // stateSave: true,
        colReorder: true,
        rowReorder: true,
        responsive: true,
        pagingType: "full_numbers",
        // select: true,
        language: {
            info: "Mostrando _START_ a _END_ de _TOTAL_ de registros",
            infoEmpty: " ",
            emptyTable: "Não existem registros para exibir",
            zeroRecords: "Nenhum registro encontrado para pesquisa",
            processing: "Processando...",
            paginate: {
                first: "Primeira Página",
                last: "Última Página",
                previous: "Anterior ",
                next: " Próximo"
            },
            search: "Pesquisar na tabela",


        }
    });
}

// Jquery Mask
$(document).ready(function () {
    $('.date').mask('00/00/0000');
    $('.phone_with_ddd').mask('(00) 00000-0000');
    $('.cpf').mask('000.000.000-00', { reverse: true });
    $('.money').mask('00000000,00', {reverse: true});
});

// Format Date
function FormataStringDataToBackend(data) {
    console.log(data)
    var dia = data.split("/")[0];
    var mes = data.split("/")[1];
    var ano = data.split("/")[2];

    return ano + '-' + ("0" + mes).slice(-2) + '-' + ("0" + dia).slice(-2);
    // Utilizo o .slice(-2) para garantir o formato com 2 digitos.
}

function FormataStringDataToFrontend(data) {
    var dia = data[2];
    var mes = data[1];
    var ano = data[0];

    return ("0" + dia).slice(-2) + '/' + ("0" + mes).slice(-2) + '/' + ano ;
    // Utilizo o .slice(-2) para garantir o formato com 2 digitos.
}

function FormataStringMoneyToBackend(money) {
    return money.toString().replace(",",".");
}

function FormataStringMoneyToFrontend(money) {
    money = parseFloat(money).toFixed(2)
    money = money.replace('.', ',')
    return money
}

// Disable Form by ID;
function DisableForm(idForm) {
    document.getElementById(idForm).readOnly = true
}

//Valid CPF
function ValidCPF(strCPF) {
    var Soma;
    var Resto;
    Soma = 0;
    strCPF = strCPF.split('.').join("");
    strCPF = strCPF.split('-').join("");

    if (strCPF == "00000000000" ||
        strCPF == "11111111111" ||
        strCPF == "22222222222" ||
        strCPF == "33333333333" ||
        strCPF == "44444444444" ||
        strCPF == "55555555555" ||
        strCPF == "66666666666" ||
        strCPF == "77777777777" ||
        strCPF == "88888888888" ||
        strCPF == "99999999999") return false;

    for (i = 1; i <= 9; i++) Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (11 - i);
    Resto = (Soma * 10) % 11;

    if ((Resto == 10) || (Resto == 11)) Resto = 0;
    if (Resto != parseInt(strCPF.substring(9, 10))) return false;

    Soma = 0;
    for (i = 1; i <= 10; i++) Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (12 - i);
    Resto = (Soma * 10) % 11;

    if ((Resto == 10) || (Resto == 11)) Resto = 0;
    if (Resto != parseInt(strCPF.substring(10, 11))) return false;
    return true;
}

//time functions
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

