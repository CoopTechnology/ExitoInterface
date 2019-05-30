var MSG_JSON_ERROR_CONNECTING = "Ha ocurrido un error al intentar conectar con el servidor.";
function stringToInt(str) {
    if (typeof str === "undefined" || str === '' || isNaN(str)) {
        return 0;
    }
    return parseInt(str);
}
function stringToFloat(str) {
    if (typeof str === "undefined" || str === '' || isNaN(str)) {
        return 0;
    }
    return parseFloat(str);
}
//-----------------------------------PAGINADOR AQUI--------------------------
var timerBuscar2;
//var lasNameC = "";
var routeSearchSocio = "";
//var actualPage = 1;
var limitRows2 = 10;

/*
 function buscarSoloSocio(e) {
 var code = e.which || e.keyCode;
 if ($('#searchInputGlobal').val() !== "") {
 //Caracteres permitidos -- OJO --Si se cambia un caracter cambiar tambien en [buscar] si aplica
 if ((code > 47 && code < 58) || // numeric (0-9)
 (code > 64 && code < 91) || // upper alpha (A-Z)
 (code > 95 && code < 123) // lower alpha (a-z)
 || code === 13 || code === 8 || code === 46 || code === 32 || code === 190 || code === 188) { //Enter, Backspace, Spr, Space, period, comma
 
 if (timerBuscar2 !== null)
 {
 clearTimeout(timerBuscar2);
 }
 
 if (code === 13) {
 var word = $('#searchInputGlobal').val();
 //lasNameC=word;
 //#sam cambiar esto
 location.href = 'http://localhost/exito/web/app_dev.php/socio/?word=' + word;
 
 
 //buscarAjaxSocio(routeActual);
 } else {
 timerBuscar2 = setTimeout(function () {
 buscarAjaxSociox(routeSearchSocio);
 }, 450);
 }
 }
 }
 }*/
/*
 function buscarAjaxSociox(route) {
 
 var world = $('#searchInputGlobal').val();
 
 $.ajax({
 type: "POST",
 url: route,
 data: {'buscar': world, 'page': 1, 'limit': limitRows2, 'json': 'json'}
 
 }).done(function (data) {
 // $('#lista').html(msg);
 //lasNameC = "";
 $("#datalistGlobal").empty();
 var obj = $.parseJSON(data);
 var data = obj.options;
 
 $.each(data, function (i, item) {
 //console.log(item);
 var o = new Option(item[1]);
 o.setAttribute("data-value", item[0]);
 $("#datalistGlobal").append(o);
 });
 
 
 
 //_this.focus();
 });
 
 }*/
/*function checkExistsGlobalSearch(inputValue) {
 var result = new Array(false);
 $.each($('#datalist_content .item'), function (key, value) {
 console.log('value: '+value.getAttribute('value'));
 
 
 //alert(key + ": " + value);
 console.log('inputValue:'+inputValue+'key:'+key+'____'+'value:'+value.innerHTML);
 if (inputValue === value.innerHTML.trim()) {
 result = new Array(true, value.getAttribute('value'));
 }
 
 });
 
 var x = document.getElementById("datalist_content");
 var i;
 var result = new Array(false);
 if (x.options !== undefined) {
 for (i = 0; i < x.options.length; i++) {
 if (inputValue === x.options[i].value) {
 
 console.log(x.options[i].getAttribute('data-value'));
 result = new Array(true, x.options[i].getAttribute('data-value'));
 //flag = true;
 }
 }
 }
 return result;
 }*/
/*
 function checkExistsGlobalSearch(inputValue) {
 
 var x = document.getElementById("datalistGlobal");
 var i;
 var result = new Array(false);
 if (x.options !== undefined) {
 for (i = 0; i < x.options.length; i++) {
 if (inputValue === x.options[i].value) {
 
 console.log(x.options[i].getAttribute('data-value'));
 result = new Array(true, x.options[i].getAttribute('data-value'));
 //flag = true;
 }
 }
 }
 return result;
 }*/
/*
 function getParameterByNameURL(name) {
 name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
 var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
 results = regex.exec(location.search);
 return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
 }*/
/*
 var wordRe=getParameterByNameURL('word');
 if (wordRe !== "")
 {
 buscarAjaxGlobal(routeActual,wordRe);
 }
 */
//--------------------
function showModalGenerico(error, msg) {
    $('#tituloModal').html(error);
    $('#cuerpoModal').html(msg);
    $('#ModalGenericoMsj').modal('show');
}
/* ==== CRUDs Sencillos / Modal Delete===== */
var rutaActualModalDelete;
var idRegistroTemp;
var rutaTemp;
var mensajeTemp;
var tokenFormDelete;
var pathFromDelete;
function indexListaEliminarReg(registroID, ruta, msg) {
    idRegistroTemp = registroID;
    rutaTemp = ruta;
    mensajeTemp = msg;
    rutaActualModalDelete = 1;
}
function showEliminarReg(registroID, ruta, msg) {
    idRegistroTemp = registroID;
    rutaTemp = ruta;
    mensajeTemp = msg;
    rutaActualModalDelete = 2;
}
function eliminarReg(datos) {

    if (rutaActualModalDelete === 1) {
        deleteFromIndex(rutaTemp, datos);
    } else {
        deleteFromShow(rutaTemp);
    }
}

function deleteFromIndex(ruta, datosx) {
    $.ajax({
        url: ruta,
        type: 'POST',
        data: {
            "_method": "DELETE",
            "form[_token]": tokenFormDelete
        },
        success: function (data) {
            //lastPage = 1;
            if (data.r === 1) {
                //$('#'+idRegistroTemp).remove();
                //alert(rutaBuscarActual);
                buscarAjaxOnDemand(datosx);
            } else if (data.r === 2) {
                showModalGenerico("Error",data.m);
            }
        }
    });
}
function deleteFromShow(ruta) {
    $.ajax({
        url: ruta,
        type: 'POST',
        data: {
            "_method": "DELETE",
            "form[_token]": tokenFormDelete
        },
        success: function (data) {
            if (data.r === 1) {
                $('#' + idRegistroTemp).remove();
                window.location.href = pathFromDelete;
            } else if (data.r === 2) {
                showModalGenerico("Error",data.m);
            }
        }
    });
}
$('.modalMensaje').on('show.bs.modal', function () {
    $('.modal-body').html('Está seguro que desea eliminar el registro: <b>' + mensajeTemp + '</b>');
});

/* END==== CRUDs Sencillos / Modal Delete===== */


/////////////////////////////
var routeConfig;




//--------------------UTILES
function removeAllMultipleChart(text, chart) {
    var result = "";
    var exist = false;
    if (null !== text && text !== '') {
        for (var i = 0; i < text.length; i++) {
            if (text.charAt(i) === chart) {
                if (!exist) {
                    result += text.charAt(i);
                    exist = true;
                }
            } else {
                result += text.charAt(i);
                exist = false;
            }
        }
    }
    return result;
}
//--------------------------
function isStrEmpty(value) {
//USO:
//isEmpty(undefined); // true
//isEmpty(null); // true
//isEmpty(''); // true
//isEmpty('foo'); // false
//isEmpty(1); // false
//isEmpty(0); // false
    return typeof value == 'string' && !value.trim() || typeof value == 'undefined' || value === null;
}

