//Pais
$('#appbundle_contacto_pais').change(function () {
    var paisSelector = $(this);
    $.ajax({
        url: territorioRuta,
        type: "GET",
        dataType: "JSON",
        data: {
            paisid: paisSelector.val()
        },
        success: function (data) {

            var urbanizacionSelect = $("#appbundle_contacto_urbanizacion");
            clearAll(urbanizacionSelect, 1);
            var sectorSelect = $("#appbundle_contacto_sector");
            clearAll(sectorSelect, 2);
            var municipioSelect = $("#appbundle_contacto_municipio");
            clearAll(municipioSelect, 3);
            var provinciaSelect = $("#appbundle_contacto_provincia");
            clearAll(provinciaSelect, 4);
            if (data.r === 1)
            {
                $.each(data.d, function (key, provincia) {
                    provinciaSelect.append('<option value="' + provincia.id + '">' + provincia.name + '</option>');
                });
            } else {
                alert(data.m);
            }
        },
        error: function (err) {
            // console.log(err);
            alert(MSG_JSON_ERROR_CONNECTING);
        }
    });
});

//Provincia
$('#appbundle_contacto_provincia').change(function () {
    var provinciaSelector = $(this);
    $.ajax({
        url: territorioRuta,
        type: "GET",
        dataType: "JSON",
        data: {
            provinciaid: provinciaSelector.val()
        },
        success: function (data) {

            var urbanizacionSelect = $("#appbundle_contacto_urbanizacion");
            clearAll(urbanizacionSelect, 1);
            var sectorSelect = $("#appbundle_contacto_sector");
            clearAll(sectorSelect, 2);
            var municipioSelect = $("#appbundle_contacto_municipio");
            clearAll(municipioSelect, 3);
            //municipioSelect.html('');
            //municipioSelect.append('<option value> Seleccione un municipio de ' + provinciaSelector.find("option:selected").text() + ' ...</option>');
            if (data.r === 1)
            {
                $.each(data.d, function (key, municipio) {
                    municipioSelect.append('<option value="' + municipio.id + '">' + municipio.name + '</option>');
                });
            } else {
                alert(data.m);
            }
        },
        error: function (err) {
            alert(MSG_JSON_ERROR_CONNECTING);
        }
    });
});
//Municipio
$('#appbundle_contacto_municipio').change(function () {
    var municipioSelector = $(this);
    $.ajax({
        url: territorioRuta,
        type: "GET",
        dataType: "JSON",
        data: {
            municipioid: municipioSelector.val()
        },
        success: function (data) {

            var urbanizacionSelect = $("#appbundle_contacto_urbanizacion");
            clearAll(urbanizacionSelect, 1);
            var sectorSelect = $("#appbundle_contacto_sector");
            clearAll(sectorSelect, 2);
            //sectorSelect.html('');
            //sectorSelect.append('<option value> Seleccione un sector de ' + municipioSelector.find("option:selected").text() + ' ...</option>');
            if (data.r === 1)
            {
                $.each(data.d, function (key, sector) {
                    sectorSelect.append('<option value="' + sector.id + '">' + sector.name + '</option>');
                });
            } else {
                alert(data.m);
            }
        },
        error: function (err) {
            alert(MSG_JSON_ERROR_CONNECTING);
        }
    });
});
//Sector
$('#appbundle_contacto_sector').change(function () {
    var sectorSelector = $(this);
    $.ajax({
        url: territorioRuta,
        type: "GET",
        dataType: "JSON",
        data: {
            sectorid: sectorSelector.val()
        },
        success: function (data) {

            var urbanizacionSelect = $("#appbundle_contacto_urbanizacion");
            clearAll(urbanizacionSelect, 1);
            if (data.r === 1)
            {
                $.each(data.d, function (key, urbanizacion) {
                    urbanizacionSelect.append('<option value="' + urbanizacion.id + '">' + urbanizacion.name + '</option>');
                });
            } else {
                alert(data.m);
            }
        },
        error: function (err) {
            alert(MSG_JSON_ERROR_CONNECTING);
        }
    });
});
function clearAll(dropDownX, valueX) {
    var text = "";

    switch (valueX) {
        case 1:
            // Urbanizacion
            text = 'Primero seleccione un sector...';
            break;
        case 2:
            // Sector
            text = 'Primero seleccione un municipio...';
            break;
        case 3:
            // Municipio
            text = 'Primero seleccione una provincia...';
            break;
        case 4:
            // Provincia
            text = 'Primero seleccione un país...';
            break;
        case 10:
            // Sucursal Distrito
            text = 'Primero seleccione una sucursal...';
            break;
        default:
        // code block
    }
    dropDownX.html('');

    dropDownX.append('<option value> ' + text + dropDownX.find("option:selected").text() + ' ...</option>');
}