$(window).on("load", function() {

    jQuery.getJSON("http://localhost:55852/servicioprueba.asmx/getAllSentencias", function(datos) {
        console.log(datos);
    });

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