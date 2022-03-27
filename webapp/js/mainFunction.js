// Import Common HTML Function
$(function () {
    var includes = $('[data-include]')
    $.each(includes, function () {
        var file = 'common/' + $(this).data('include') + '.html'
        $(this).load(file)
    })
})

// Function DataTable
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
$(document).ready(function(){
    $('.date').mask('00/00/0000');
    $('.phone_with_ddd').mask('(00) 0000-0000');
    $('.cpf').mask('000.000.000-00', {reverse: true})
    $('.value').mask('R$ 000,00');
  });

  $('.carousel').slick({
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 4,
});


// Format Date
function FormataStringData(data) {
    var dia  = data.split("/")[0];
    var mes  = data.split("/")[1];
    var ano  = data.split("/")[2];
  
    return ano + '-' + ("0"+mes).slice(-2) + '-' + ("0"+dia).slice(-2);
    // Utilizo o .slice(-2) para garantir o formato com 2 digitos.
  }