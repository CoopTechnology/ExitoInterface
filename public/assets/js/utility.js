/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
function defaultOptionsFormSocio() {


}

//-----------------------------------PAGINADOR AQUI--------------------------
var timerBuscar;
var lastNameC = "";
var lastModeSort = "ASC";
var rutaBuscarActual = "";
var actualPage = 1;
var limitRows;

function preparePaginator(data, modal) {
    //Pagina actual tomar valor aqui
    actualPage = $('#tableList').attr('actualPage');
    //console.log('Pagina Actual: ' + actualPage);
    //Eliminar los links via url del paginador
    $('#paginadorX ul.pagination a').attr('href', '#');
    //Asignarle llamada ajax a todos los links
    $('#paginadorX').on('click', "ul.pagination a", function (e) {
        buscarAjaxPaginator(e, data, modal);
    });
}
/*Este se llama cuando cambian de pagina en el paginador*/
function buscarAjaxPaginator(e, data, modal) {
    var word = $('#searchInput').val();
    page = e.target.innerText;
    if (e.target.getAttribute('rel') === 'prev')
        page = parseInt(actualPage) - parseInt(1);
    if (e.target.getAttribute('rel') === 'next')
        page = parseInt(actualPage) + parseInt(1);

    lastPage = page;
    $.ajax({
        type: "POST",
        url: rutaBuscarActual,
        data: {'buscar': word, 'page': page, 'limit': limitRows, 'modeSort': lastModeSort, 'namec': lastNameC, 'modal': modal, 'data': data}
    }).done(function (msg) {
        $('#listaRegistros').html(msg);
    });
    e.preventDefault();
}

/*Este se llama cuando se cambia el campo con el cual se ordena el resultado*/
function sortClick(e, nameC, modeSort, data, modal) {
    if (modeSort === 'ASC') {
        if (lastNameC === nameC)
        {
            modeSort = 'DESC';
        } else {
            //Si se cambia de columna hay que iniciar en modo ASC
            modeSort = 'ASC';
        }
    } else {
        modeSort = 'ASC';
    }
    var word = $('#searchInput').val();
    lastNameC = nameC;
    lastModeSort = modeSort;
    lastPage = 1;
    $.ajax({
        type: "POST",
        url: rutaBuscarActual,
        data: {'buscar': word, 'page': 1, 'limit': limitRows, 'modeSort': modeSort, 'namec': nameC, 'modal': modal, 'data': data}
    }).done(function (msg) {
        $('#listaRegistros').html(msg);
    });
    e.preventDefault();
}

//Metodo del imput
function buscar(e, data, modal) {
    var code = e.which || e.keyCode;

    if ((code > 47 && code < 58) || // numeric (0-9)
            (code > 64 && code < 91) || // upper alpha (A-Z)
            (code > 95 && code < 123) // lower alpha (a-z)
            || code === 13 || code === 8 || code === 46 || code === 32 || code === 190 || code === 188) { //Enter, Backspace, Spr, Space, period, comma

        if (timerBuscar !== null)
        {
            clearTimeout(timerBuscar);
        }

        if (code === 13) {
            if (modal === 'modal')
            {
                buscarAjax(rutaBuscarActual, data, modal);
            } else {
                buscarAjax(rutaBuscarActual, data);
            }
        } else {
            timerBuscar = setTimeout(function () {
                if (modal === 'modal')
                {
                    buscarAjax(rutaBuscarActual, data, modal);
                } else {
                    buscarAjax(rutaBuscarActual, data);
                }
            }, 450);
        }
    }
}

/*Este se llama cuando se busca un texto en expecifico*/
function buscarAjax(route, data, modal, list) {
    var word = $('#searchInput').val();

    //var datax = {'country': 3, 'otro': 1}

    lastPage = 1;
    $.ajax({
        type: "POST",
        url: route,
        //data: {'buscar': word, 'page': 1, 'limit': limitRows, 'view': view}
        //LO DEL PARARMETRO VIEW PENSARLO BIEN
        data: {'buscar': word, 'page': 1, 'limit': limitRows, 'modeSort': lastModeSort, 'namec': lastNameC, 'modal': modal, 'data': data}

    }).done(function (msg) {
        if (modal) {
            list.html(msg);
            //console.log("MODAL");
        } else {
            $('#listaRegistros').html(msg);
        }
    });

}
function buscarAjaxOnDemand(data, modal) {
    //console.log( ' limit'+limitRows+ ' modeSort'+ lastModeSort +' namec'+ lastNameC);

    if (typeof lastPage === 'undefined')//esto solo ocurre si se entra e inmediato se intenta eliminar
    {
        lastPage = 1;
    }

    var word = $('#searchInput').val();
    $.ajax({
        type: "POST",
        url: rutaBuscarActual,
        data: {'buscar': word, 'page': lastPage, 'limit': limitRows, 'modeSort': lastModeSort, 'namec': lastNameC, 'modal': modal, 'data': data}
    }).done(function (msg) {
        $('#listaRegistros').html(msg);
        lastPage = $('#tableList').attr('actualPage');
        //limitRows =$('#tableList').attr('limitRows');
    });
}

function cambiarLimitePorFila(view, data, modal) {
    //var word = $('#searchInput').val();
    var myselect = document.getElementById("rowLimit");
    limitRows = myselect.options[myselect.selectedIndex].value;
    lastPage = 1;

    $.ajax({
        type: "POST",
        url: routeConfig,
        data: {'c0': limitRows, 'v': view}
    }).done(function (msg) {
        buscarAjaxOnDemand(data, modal);
    });
}


//--------------------
//MECANISMO PARA LAS OPCIONES DE FILTRO PARTE 4, (NO TOCAR A MENOS QUE HAYA QUE HACER ALGO DIFERENTE)
caja = 1;
function cambiarFiltros(view, data, modal) {
    dataString = {"v": view};//Aqui va la constante CODE de la entidad de esta vista
    var count = 0;
    //Para Checkbox
    $.each($(".fcb"), function (k, v) {

        //Debe haber un campo al menos para filtrar
        if ($(v).prop('checked')) {
            count++;
            dataString[v.getAttribute("dc")] = 1;
        } else {
            dataString[v.getAttribute("dc")] = 0;
        }

    });
    //Para Drop down
    $.each($(".fsc"), function (k, v) {
        dataString[v.getAttribute("dc")] = $(v).find(":selected").val();

    });

    //Verificar que al menos haya un campo en el filtro
    if (count > 0) {
        verCajaFiltros();
        $.ajax({
            type: "POST",
            url: routeConfig,
            data: dataString
        }).done(function (msg) {
            lastPage = 1;
            buscarAjaxOnDemand(data, modal);
        });
    } else {
        showModalGenerico('Error', 'Debe seleccionar al menos un campo');
    }

}

function verCajaFiltros() {
    btnFiltrar = $('#btnFiltrar');
    cajaFiltros = $('#cajaFiltros');

    if (caja === 1) {
        btnFiltrar.html('<button class="btn-secondary btn .btn-sm" onclick="verCajaFiltros();"><i class="fas fa-sliders-h"></i> Filtrar <i class="fas fa-sort-down"></i></button>');
        cajaFiltros.removeClass('d-none');
        caja = 0;
    } else {
        btnFiltrar.html('<button class="btn-secondary btn .btn-sm" onclick="verCajaFiltros();"><i class="fas fa-sliders-h"></i> Filtrar <i class="fas fa-sort-up"></i></button>');
        cajaFiltros.addClass('d-none');
        caja = 1;
    }
}
//------------------------------------------------------------------------------
function returnFileSize(number) {
    if (number < 1024) {
        return number + 'bytes';
    } else if (number >= 1024 && number < 1048576) {
        return (number / 1024).toFixed(1) + 'KB';
    } else if (number >= 1048576) {
        return (number / 1048576).toFixed(1) + 'MB';
    }
}