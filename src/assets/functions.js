$(window).on("load", function() {

    // Consumimos el servicio web (prueba)
    // jQuery.getJSON("http://localhost:55852/sentencias.asmx/MostrarSentencias", function(datos) {
    //     console.log(datos);
    // });

    //ajustarAlto();

    $(window).resize(function() {
        //ajustarAlto();
    })
});

function ajustarAlto() {
    
    // Variables
    var alto = $(".padre .hijo").width() + 'px';
    console.log(alto);

    $(".padre .hijo").css('height', alto);
}