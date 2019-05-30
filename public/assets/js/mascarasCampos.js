$(document).ready(function () {
    inicializarMascaras();
});


function inicializarMascaras(){
$('.campoCedula').mask('000-0000000-0', {placeholder: "XXX-XXXXXXX-X"});
$('.campoCelular').mask('(000) 000-0000', {placeholder: "(XXX)XXX-XXXX"});
$('#campo-rnc').mask('0-00-00000-0', {placeholder: "X-XX-XXXXX-X"});
//$('.porcentajeBenf').mask('00.00', {placeholder: "XX.XX"});
$('.montoOperacion ').mask("#,##0", {reverse: true});
$('.montoChequeCaja').mask("#,##0", {reverse: true});
}
