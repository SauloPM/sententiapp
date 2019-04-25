$(window).on("load", function() {

    ajustarAlto();

    $(window).resize(function() {
        ajustarAlto();
    })
});

function ajustarAlto() {
    
    // Variables
    var alto = $(".padre .hijo").width() + 'px';
    console.log(alto);

    $(".padre .hijo").css('height', alto);
}