// Import Common HTML Function
$(function () {
    var includes = $('[data-include]')
    $.each(includes, function () {
        var file = 'common/' + $(this).data('include') + '.html'
        $(this).load(file)
    })
})