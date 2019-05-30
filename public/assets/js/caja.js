/* ============= Tipo de Operación Selector ============*/

$(document).ready(function () {
    configurarAportaciones();
});
function inicializarSelectorTipoOperacion() {
    var tipoOperacion = $('.selectTipoOperacion');

    tipoOperacion.on('input propertychange', function () {
        if(tipoOperacion.val() === 'dp'){
            removeAllEvents();
            configurarCajaDp();
            calcularTotalRecibido();
        }else{
            removeAllEvents();
            configurarCajaRt();
            calcularTotalEntregado();
        }
    });
}
/* END============= Tipo de Operación Selector ============*/

/* ============= Caja Modo DEPOSITO =======*/

function configurarCajaDp() {

    $("input[calculo=recibido]").on('input propertychange paste keyup change cut copy', function () {

        var recibido = stringToInt($('.rMontoTotal').val());
        var montoInicial = stringToInt($('.montoOperacion').cleanVal());
        if (recibido > montoInicial) {
            $('.deshabilitarEntregado').removeAttr('disabled');
        } else {
            limpiarEntregado();
            $('.deshabilitarEntregado').attr('disabled', true);
        }

        calcularTotalRecibido();
        calcularResultado();
    });

    $("input[calculo=entregado]").on('input propertychange paste keyup change cut copy', function () {
        calcularTotalEntregado();
        calcularResultado();
    });

    $("input[calculo=montoOperacion]").on('input propertychange paste keyup change cut copy', function () {
        calcularResultado();

        if (stringToInt($('.montoOperacion').cleanVal()) > 0) {
            $('.deshabilitarTodo').removeAttr('disabled');
        } else {
            $('.deshabilitarTodo').attr('disabled', true);
        }

        var recibido = stringToInt($('.rMontoTotal').val());
        var montoInicial = stringToInt($('.montoOperacion').cleanVal());
        //console.log(montoInicial);
        if (recibido > montoInicial) {
            $('.deshabilitarEntregado').removeAttr('disabled');
        } else {
            limpiarEntregado();
            $('.deshabilitarEntregado').attr('disabled', true);
        }
        if (montoInicial === 0) {
            limpiar();
        }
    });
}
//===========Recibido
function calcularTotalRecibido() {
    var rMoneda1 = stringToInt($('.rMoneda1').val());
    var rMoneda5 = stringToInt($('.rMoneda5').val()) * 5;
    var rMoneda10 = stringToInt($('.rMoneda10').val()) * 10;
    var rMoneda25 = stringToInt($('.rMoneda25').val()) * 25;
    var rMoneda50 = stringToInt($('.rMoneda50').val()) * 50;
    var rMoneda100 = stringToInt($('.rMoneda100').val()) * 100;
    var rMoneda200 = stringToInt($('.rMoneda200').val()) * 200;
    var rMoneda500 = stringToInt($('.rMoneda500').val()) * 500;
    var rMoneda1000 = stringToInt($('.rMoneda1000').val()) * 1000;
    var rMoneda2000 = stringToInt($('.rMoneda2000').val()) * 2000;
    var rMontoTotal = rMoneda1 + rMoneda5 + rMoneda10 + rMoneda25 + rMoneda50 + rMoneda100 + rMoneda200 + rMoneda500 + rMoneda1000 + rMoneda2000;
    $('.rMontoTotal').val(rMontoTotal);
}

//===========Recibido

//===========Entregado
function calcularTotalEntregado() {
    var eMoneda1 = stringToInt($('.eMoneda1').val());
    var eMoneda5 = stringToInt($('.eMoneda5').val()) * 5;
    var eMoneda10 = stringToInt($('.eMoneda10').val()) * 10;
    var eMoneda25 = stringToInt($('.eMoneda25').val()) * 25;
    var eMoneda50 = stringToInt($('.eMoneda50').val()) * 50;
    var eMoneda100 = stringToInt($('.eMoneda100').val()) * 100;
    var eMoneda200 = stringToInt($('.eMoneda200').val()) * 200;
    var eMoneda500 = stringToInt($('.eMoneda500').val()) * 500;
    var eMoneda1000 = stringToInt($('.eMoneda1000').val()) * 1000;
    var eMoneda2000 = stringToInt($('.eMoneda2000').val()) * 2000;
    var eMontoTotal = eMoneda1 + eMoneda5 + eMoneda10 + eMoneda25 + eMoneda50 + eMoneda100 + eMoneda200 + eMoneda500 + eMoneda1000 + eMoneda2000;
    $('.eMontoTotal').val(eMontoTotal);
}

//===========Entregado

//===========Resultado
function calcularResultado() {

    //console.log(':: '+stringToInt($('.montoOperacion')));
    var totalOperacion = stringToInt($('.montoOperacion').cleanVal());
    var rMontoTotal = stringToInt($('.rMontoTotal').val());
    var eMontoTotal = stringToInt($('.eMontoTotal').val());
    var difRmontotalTotalOperacion = stringToInt(rMontoTotal - totalOperacion);
    var difMasEntregado = difRmontotalTotalOperacion + eMontoTotal
    $('.totalOperacion').val(totalOperacion);
    $('.totalRecibido').val(rMontoTotal);
    $('.totalEntregado').val(eMontoTotal);

    if (difRmontotalTotalOperacion === 0)
    {
        if (eMontoTotal > 0)
        {
            //CASO 2 - SOBRA DINERO (INICIAL=100, RECIBIDO=100, ENTREGADO 50)
            $('.totalGeneral').val(difMasEntregado);
            $('#faltante-devolver-sobrante').html('CASO 2 SOBRANTE $');
        } else {
            //CASO 1 - NO HAY PROBLEMAS  (INICIAL=100, RECIBIDO=100, ENTREGADO 0)
            $('.totalGeneral').addClass('is-valid');
            $('.totalGeneral').removeClass('is-invalid');
            $('.totalGeneral').val(difMasEntregado);
            $('#faltante-devolver-sobrante').html('Correcto $');
        }
    } else if (difRmontotalTotalOperacion > 0)
    {
        if (eMontoTotal === 0)
        {
            //CASO 3 - A DEVOLVER   (INICIAL=100, RECIBIDO=200, ENTREGADO 0))
            $('.totalGeneral').val(difMasEntregado);
            $('#faltante-devolver-sobrante').html('A Devolver $');
            $('.totalGeneral').removeClass('is-valid');
            $('.totalGeneral').removeClass('is-invalid');
        } else if (eMontoTotal === difRmontotalTotalOperacion)
        {
            //CASO 4 - NO HAY PROBLEMAS (INICIAL=100, RECIBIDO=200, ENTREGADO 100))
            $('.totalGeneral').val(eMontoTotal - difRmontotalTotalOperacion);
            $('#faltante-devolver-sobrante').html('Correcto $');
            $('.totalGeneral').addClass('is-valid');
        } else if (eMontoTotal > difRmontotalTotalOperacion)
        {
            //CASO 5 - SOBRANTE (INICIAL=100, RECIBIDO=200, ENTREGADO 150))
            $('.totalGeneral').val(eMontoTotal - difRmontotalTotalOperacion);
            $('#faltante-devolver-sobrante').html('Sobrante $');
            $('.totalGeneral').addClass('is-invalid');
            $('.totalGeneral').focus();
        } else if (eMontoTotal < difRmontotalTotalOperacion)
        {
            //CASO 6 - SOBRANTE (INICIAL=100, RECIBIDO=200, ENTREGADO 50))
            $('.totalGeneral').val(difRmontotalTotalOperacion - eMontoTotal);
            $('#faltante-devolver-sobrante').html('A Devolver $');
        }
    } else if (difRmontotalTotalOperacion < 0)
    {
        if (eMontoTotal === 0)
        {
            //CASO 7 - FALTANTE (INICIAL=100, RECIBIDO=50, ENTREGADO 0))
            $('.totalGeneral').removeClass('is-valid');
            $('.totalGeneral').removeClass('is-invalid');
            $('.totalGeneral').val(Math.abs(difMasEntregado));
            $('#faltante-devolver-sobrante').html('Faltante $');
        } else if (eMontoTotal > 0)
        {
            //CASO 8 - FALTANTE (INICIAL=100, RECIBIDO=50, ENTREGADO 100))
            $('.totalGeneral').val(Math.abs(difRmontotalTotalOperacion - eMontoTotal));
            $('#faltante-devolver-sobrante').html('CASO 8 FALTANTE WARNING$');
            //ESTO NO SE DEBERIA PERMITIR YA QUE ESTA ENTREGANDO SIN RECIBIR
        }
    }
}
//===========Resultado

//===========Limpiar Campos
function limpiar() {
    $('.rMoneda1').val('');
    $('.rMoneda5').val('');
    $('.rMoneda10').val('');
    $('.rMoneda25').val('');
    $('.rMoneda50').val('');
    $('.rMoneda100').val('');
    $('.rMoneda200').val('');
    $('.rMoneda500').val('');
    $('.rMoneda1000').val('');
    $('.rMoneda2000').val('');
    $('.eMoneda1').val('');
    $('.eMoneda5').val('');
    $('.eMoneda10').val('');
    $('.eMoneda25').val('');
    $('.eMoneda50').val('');
    $('.eMoneda100').val('');
    $('.eMoneda200').val('');
    $('.eMoneda500').val('');
    $('.eMoneda1000').val('');
    $('.eMoneda2000').val('');
    $('.rMontoTotal').val('');
    $('.eMontoTotal').val('');
    $('.totalOperacion').val('');
    $('.totalRecibido').val('');
    $('.totalEntregado').val('');
    $('.totalGeneral').val('');
}
function limpiarEntregado() {
    $('.eMoneda1').val('');
    $('.eMoneda5').val('');
    $('.eMoneda10').val('');
    $('.eMoneda25').val('');
    $('.eMoneda50').val('');
    $('.eMoneda100').val('');
    $('.eMoneda200').val('');
    $('.eMoneda500').val('');
    $('.eMoneda1000').val('');
    $('.eMoneda2000').val('');
    $('.eMontoTotal').val('');
}
//===========Limpiar Campos

/* END============= Caja Modo DEPOSITO =======*/
/* ============= Caja Modo RETIRO =======*/

function configurarCajaRt() {

    $("input[calculo=montoOperacion]").on('input propertychange paste keyup change cut copy', function () {

        var montoInicial = stringToInt($('.montoOperacion').cleanVal());
        if (montoInicial > 0) {
            $('.deshabilitarTodo').removeAttr('disabled');
            $('.deshabilitarRecibido').attr('disabled', true);
        } else {
            limpiarEntregado();
            $('.deshabilitarTodo').attr('disabled', true);
            $('.deshabilitarRecibido').removeAttr('disabled');
        }

        if (montoInicial === 0) {
            limpiarEntregado();
        }

        calcularTotalEntregado();
        calcularResultadoRetiro();
    });

    $("input[calculo=entregado]").on('input propertychange paste keyup change cut copy', function () {
        calcularTotalEntregado();
        calcularResultadoRetiro();
    });
}
//==================Calcular RESULTADO RETIRO
function calcularResultadoRetiro(){
    var totalOperacion = stringToInt($('.montoOperacion').cleanVal());
    var eMontoTotal = stringToInt($('.eMontoTotal').val());
    var difRmontotalTotalOperacion = stringToInt(totalOperacion - eMontoTotal);
    var totalGeneral = $('.totalGeneral');
    var faltanteDevolverSobrante = $('#faltante-devolver-sobrante');
    $('.totalOperacion').val(totalOperacion);
    $('.totalEntregado').val(eMontoTotal);

    if (totalOperacion === eMontoTotal) {
        totalGeneral.removeClass('is-invalid');
        totalGeneral.addClass('is-valid');
        totalGeneral.val(difRmontotalTotalOperacion);
        faltanteDevolverSobrante.html('Correcto $');
    } else if(totalOperacion < eMontoTotal){
        totalGeneral.removeClass('is-valid');
        totalGeneral.addClass('is-invalid');
        totalGeneral.val(Math.abs(difRmontotalTotalOperacion));
        faltanteDevolverSobrante.html('Sobrante $');
        totalGeneral.focus();
    } else if(totalOperacion > eMontoTotal){
        totalGeneral.removeClass('is-invalid');
        totalGeneral.removeClass('is-valid');
        totalGeneral.val(difRmontotalTotalOperacion);
        faltanteDevolverSobrante.html('Faltante $');
    }
}
/* END============= Caja Modo RETIRO =======*/
/* ============= Caja REMOVER EVENTOS =======*/
function removeAllEvents(){
    $("input[calculo=recibido]").off('input propertychange paste keyup change cut copy');
    $("input[calculo=entregado]").off('input propertychange paste keyup change cut copy');
    $("input[calculo=montoOperacion]").off('input propertychange paste keyup change cut copy');
    $('.deshabilitarRecibido').removeAttr('disabled');
    $('.deshabilitarEntregado').removeAttr('disabled');
    $('.deshabilitarTodo').attr('disabled', true);
    $('.montoOperacion').val('');
    limpiar();
    limpiarEntregado();
    var totalGeneral = $('.totalGeneral');
    totalGeneral.removeClass('is-valid');
    totalGeneral.removeClass('is-invalid');
    $('#faltante-devolver-sobrante').html('Faltante $');
    $('.montoOperacion ').unmask();
    inicializarMascaras();
}
/* END============= Caja REMOVER EVENTOS =======*/

/* ============= Caja Aportaciones =======*/
var pathAportacion;
function inicializarCuentaAportacion(event) {
    clearBtnClass();
    $(event.target).addClass('active');

    $.ajax({
        type: "POST",
        url: pathAportacion,
        data: {}

    }).done(function (msg) {
        $('#formularioCajaContenido').html(msg);
        configurarAportaciones();
    });
}
function configurarAportaciones(){
    inicializarSelectorTipoOperacion();
    configurarCajaDp();
    inicializarMascaras();
}
/* END============= Caja Aportaciones =======*/


/* ============= Caja Ahorro =======*/
var pathAhorro;
function inicializarCuentaAhorro(event) {
    clearBtnClass();
    $(event.target).addClass('active');

    $.ajax({
        type: "POST",
        url: pathAhorro,
        data: {}

    }).done(function (msg) {
        $('#formularioCajaContenido').html(msg);
        configurarAhorro();
    });
}
function configurarAhorro(){
    inicializarSelectorTipoOperacion();
    configurarCajaDp();
    inicializarMascaras();
}
/* END============= Caja Ahorro =======*/
/* ============= Caja Debito =======*/
var pathDebito;
function inicializarCuentaDebito(event) {
    clearBtnClass();
    $(event.target).addClass('active');

    $.ajax({
        type: "POST",
        url: pathDebito,
        data: {}

    }).done(function (msg) {
        $('#formularioCajaContenido').html(msg);

    });
}
/* END============= Caja Debito =======*/
/* ============= Caja Debito =======*/
var pathServicio;
function inicializarServicio(event) {
    clearBtnClass();
    $(event.target).addClass('active');

    $.ajax({
        type: "POST",
        url: pathServicio,
        data: {}

    }).done(function (msg) {
        $('#formularioCajaContenido').html(msg);

    });
}
/* END============= Caja Debito =======*/

/* ================ REMOVER CLASE ACTIVE ============ */
function clearBtnClass(){
    $('.btn-caja').removeClass('active');
}
/* END================ REMOVER CLASE ACTIVE ============ */

/* ================ PESTAÑAS DE CAJA PIE DE PAGINA ============ */
$("textarea[contar=caracteres]").on('input propertychange paste keyup change cut copy', function () {
    var caracteres = $('#textareaNotaCaja').val().length;
    $('#contadorCaracteres').html(caracteres+'/150');
});
/* END================ PESTAÑAS DE CAJA PIE DE PAGINA ============ */