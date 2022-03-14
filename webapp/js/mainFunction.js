// Import Common HTML Function
$(function () {
    var includes = $('[data-include]')
    $.each(includes, function () {
        var file = 'common/' + $(this).data('include') + '.html'
        $(this).load(file)
    })
})

// Function DataTable
$(document).ready(function () {
    $('table').DataTable({
        dom: 'Bfrtip',
        // order: [[0,'asc']],
        order: [],
        // stateSave: true,
        colReorder: true,
        rowReorder: true,
        responsive: true,
        // select: true,
        language: {
            info: "Mostrando de _START_ á _END_ do total de _TOTAL_ de registros",
            infoEmpty: " ",
            emptyTable: "Não existem registros para exibir",
            zeroRecords: "Nenhum registro encontrado para pesquisa",
            processing: "Processando...",
            paginate: {
                previous: "Anterior ",
                next: " Próximo"
            },
            search: "Pesquisar na tabela",

        }
    });
});

