function tipoSocio() {
    var tipoSocioOpcion = document.getElementById("appbundle_socio_tipoSocio").value;

    if(tipoSocioOpcion == 2) {
        $('#campo-apellido').addClass('d-none');
        $('#campo-segundoApellido').addClass('d-none');
        $('#appbundle_socio_primerApellido').removeAttr('required');
        $('#campo-menor').addClass('d-none');
        $('#campo-Ced-menor').addClass('d-none');
        $('#labelAlias').text("Siglas");
        $('#campo-sexo').prop('disabled', true);
        $('#campo-estadoCivil').prop('disabled', true);
        $('#campo-cedula').prop('disabled', true);
        $('#campo-pasaporte').prop('disabled', true);
        $('#menor-checkbox').prop('checked',false);
        $('#campo-rnc').prop('readonly',false);
        $('#menor_columna').removeClass();
        $('#menor_columna').addClass('form-row d-none');
        $('#campo-cedula').val(null);
        $('#campo-pasaporte').val(null);
        $('#campo-sexo').val(null);
        $('#campo-estadoCivil').val(null);
        $('#tituloPersonas').text("Representantes");
        $('#lbl-rnc').removeClass();
        $('#lbl-rnc').addClass('requerido');
        $('#campo-rnc').attr('required','required');
        $('#lbl-cedula').removeClass();
        $('#lbl-cedula').addClass('requerido d-none');
        $('#campo-cedula').removeAttr('required');
        $('.campoPrimerApellido').removeAttr('required');
        ocultar = 0;

    }else{
        $('#campo-apellido').removeClass();
        $('#campo-apellido').addClass('form-group col-md-3');
        $('#campo-segundoApellido').removeClass();
        $('#campo-segundoApellido').addClass('form-group col-md-3');
        $('#appbundle_socio_primerApellido').attr('required','required');
        $('#campo-menor').removeClass();
        $('#campo-menor').addClass('menor text-center');
        $('#campo-Ced-menor').removeClass();
        $('#campo-Ced-menor').addClass('menor text-center');
        $('#labelAlias').text("Alias");
        $('#campo-sexo').prop('disabled', false);
        $('#campo-estadoCivil').prop('disabled', false);
        $('#campo-cedula').prop('disabled', false);
        $('#campo-pasaporte').prop('disabled', false);
        $('#menor-checkbox').prop('checked',false);
        $('#menor_columna').removeClass();
        $('#menor_columna').addClass('form-row d-none');
        $('#campo-sexo').val(1);
        $('#campo-estadoCivil').val(1);
        $('#tituloPersonas').text("Personas");
        $('#lbl-rnc').removeClass();
        $('#lbl-rnc').addClass('requerido d-none');
        $('#campo-rnc').removeAttr('required');
        $('#lbl-cedula').removeClass();
        $('#lbl-cedula').addClass('requerido');
        $('#campo-cedula').attr('required','required');
        $('.campoPrimerApellido').attr('required','required');
        ocultar = 0;
    }
}

var ocultarCh = 0;
function check() {
    if(ocultarCh == 0){
        $('#cedulaMenorCheckBox').prop('disabled', true);
        $('#campo-cedula').val(null);
        $('#campo-cedula').prop('disabled', true);
        $('#campo-cedula').removeAttr('required');
        $('#lbl-cedula').addClass('requerido d-none');

        $('#menor_columna').removeClass();
        $('#menor_columna').addClass('form-row');
        $('#campo-menorLibro').attr('required','required');
        $('#campo-menorFolio').attr('required','required');
        $('#campo-menorActa').attr('required','required');

        $('#campo-rnc').val(null);
        $('#campo-rnc').prop('disabled', true);

        ocultarCh = 1;
    }else{
        $('#cedulaMenorCheckBox').prop('disabled', false);
        $('#campo-cedula').prop('disabled', false);
        $('#campo-cedula').attr('required','required');
        $('#lbl-cedula').removeClass();
        $('#lbl-cedula').addClass('requerido');

        $('#menor_columna').removeClass();
        $('#menor_columna').addClass('form-row d-none');
        $('#campo-menorLibro').removeAttr('required');
        $('#campo-menorFolio').removeAttr('required');
        $('#campo-menorActa').removeAttr('required');
        $('#campo-menorLibro').val(null);
        $('#campo-menorFolio').val(null);
        $('#campo-menorActa').val(null);

        $('#campo-rnc').prop('disabled', false);
        ocultarCh = 0;
    }
}

var ocultarMenorColumna = 0;
function checkMenor() {
    if(ocultarMenorColumna == 0){
        $('#menor-checkbox').prop('disabled', true);
        $('#menor-checkbox').prop('checked','checked');
        ocultarMenorColumna = 1;
    }else{
        $('#menor-checkbox').prop('disabled', false);
        $('#menor-checkbox').prop('checked',false);
        ocultarMenorColumna = 0;
    }
}

var ocultarSegundoTelefono = 1;
function segundoTelefono() {
    if(ocultarSegundoTelefono == 0){
        $('#campo-segundoTelefono').removeClass();
        $('#campo-segundoTelefono').addClass('d-none');
        $('#campo-segundoTelefono2').removeClass();
        $('#campo-segundoTelefono2').addClass('d-none');
        $('#campo-segundoTelefono3').removeClass();
        $('#campo-segundoTelefono3').addClass('d-none');

        $('.numContacto2').val(null);
        $('.numContacto2').val(null);
        $('.numContacto2').val(null);
        ocultarSegundoTelefono = 1;
    }else{
        $('#campo-segundoTelefono').removeClass();
        $('#campo-segundoTelefono').addClass('form-group col-md-2');
        $('#campo-segundoTelefono2').removeClass();
        $('#campo-segundoTelefono2').addClass('form-group col-md-1');
        $('#campo-segundoTelefono3').removeClass();
        $('#campo-segundoTelefono3').addClass('form-group col-md-2');
        ocultarSegundoTelefono = 0;
    }
}

var ocultarDescripcionSospechoso = 0;
function checkSospechoso(){
    if(ocultarDescripcionSospechoso == 0){
        $('#campo-sospechosoDescripcion').prop('readonly', false);
        ocultarDescripcionSospechoso = 1;
    }else{
        $('#campo-sospechosoDescripcion').prop('readonly', true);
        ocultarDescripcionSospechoso = 0;
    }
}

var ocultarCamposPoliticamenteExp = 0;

function checkPoliticamenteExpuesto(){
    if(ocultarCamposPoliticamenteExp == 0){
        $('#campo-cargoPolitico').prop('disabled', false);
        $('#campo-institucionPolitica').prop('disabled', false);
        ocultarCamposPoliticamenteExp = 1;
    }else{
        $('#campo-cargoPolitico').prop('disabled', true);
        $('#campo-institucionPolitica').prop('disabled', true);
        ocultarCamposPoliticamenteExp = 0;
    }
}

function agregarPersona_Representante() {
    $('#columna2_persona_representante').removeClass();
    $('#columna2_persona_representante').addClass('form-row');
}
function eliminarPersona_Representante() {
    $('#columna2_persona_representante').removeClass();
    $('#columna2_persona_representante').addClass('form-row d-none');
}

var ocultarPerVincAport = 0;
function ocultarPerVincApor() {
    if (ocultarPerVincAport == 0) {
        $('#divPersonasVinculadas').removeClass();
        $('#divPersonasVinculadas').addClass('personasVinculadas');
        addPersonaForm($collectionHolder, $newLinkLi, false);
        $('#addButtonP').removeClass();
        $('#addButtonP').addClass('add_personas_link btn-danger btn btn-sm');
        $("#addButtonP").html('Eliminar Personas Vinculadas');
        ocultarPerVincAport = 1;
    }else{
        $('#divPersonasVinculadas').removeClass();
        $('#divPersonasVinculadas').addClass('d-none');
        $('#addButtonP').removeClass();
        $('#addButtonP').addClass('add_personas_link btn-success btn btn-sm');
        $("#addButtonP").html('Agregar Personas Vinculadas');
        $( ".btn-danger" ).each(function( index ) {
            $( this ).click();
        });
        ocultarPerVincAport = 0;
    }
}

//========= Comprobar Campos de Formulario Socio/New
var mostrarTab = false;

function comprobarCampos(){
    var menorCheckbox = $('#menor-checkbox').prop('checked');
    var tipoSocioOpcion = parseInt($('#appbundle_socio_tipoSocio').find('option:selected').val());

    if(tipoSocioOpcion === 1){
        if(menorCheckbox){
            validarCamposRequeridosSocioMenor();
        }else{
            validarCamposRequeridosSocioFisica();
        }
    }else{
        validarCamposRequeridosSocioJuridica();
    }
}

function validarCamposRequeridosSocioFisica(){
    var campoSucursal = $('.campoSucursal').find('option:selected').text();
    var campoSucursalDistrito = $('.campoSucursalDistrito').find('option:selected').text();
    var campoNombre = $('.campoNombre').val();
    var campoPrimerApellido = $('.campoPrimerApellido').val();
    var campoCedula = $('.campoCedula').val();
    var campoFechaNacimiento = $('.campoFechaNacimiento').val();
    //-------------------------------
    var campoPais = $('.campoPais').find('option:selected').val();
    var campoProvincia = $('.campoProvincia').find('option:selected').val();
    var campoMunicipio = $('.campoMunicipio').find('option:selected').val();
    //console.log($("#campo-cedula").cleanVal());
    //$("#campo-cedula").val("3333333333");
    //alerr($("#campo-cedula").cleanVal());
    //$("#campo-cedula").unmask();
    mostrarTab = false;

    if(campoSucursal == null || campoSucursal == "" || campoSucursalDistrito == null || campoSucursalDistrito == "" || campoNombre == null || campoNombre == "" || campoPrimerApellido == null || campoPrimerApellido == "" || campoCedula == null || campoCedula == "" || campoFechaNacimiento == null || campoFechaNacimiento == ""){
        $('#generales-tab').tab('show');
        mostrarTab = true;
    }

    if(!mostrarTab){
        if(campoPais == null || campoPais == "" || campoProvincia == null || campoProvincia == "" || campoMunicipio == null || campoMunicipio == ""){
            $('#localizacion-tab').tab('show');
            mostrarTab = true;
        }
    }
}

function validarCamposRequeridosSocioMenor() {
    var campoSucursal = $('.campoSucursal').find('option:selected').text();
    var campoSucursalDistrito = $('.campoSucursalDistrito').find('option:selected').text();
    var campoNombre = $('.campoNombre').val();
    var campoPrimerApellido = $('.campoPrimerApellido').val();
    var campoCedula = $('.campoCedula').val();
    var campoFechaNacimiento = $('.campoFechaNacimiento').val();

    var campoMenorLibro = $('#campo-menorLibro').val();
    var campoMenorFolio = $('#campo-menorFolio').val();
    var campoMenorActa = $('#campo-menorActa').val();
    //-------------------------------
    var campoPais = $('.campoPais').find('option:selected').val();
    var campoProvincia = $('.campoProvincia').find('option:selected').val();
    var campoMunicipio = $('.campoMunicipio').find('option:selected').val();
    mostrarTab = false;

    if(campoSucursal == null || campoSucursal == "" || campoSucursalDistrito == null || campoSucursalDistrito == "" || campoNombre == null || campoNombre == "" || campoPrimerApellido == null || campoPrimerApellido == "" || campoFechaNacimiento == null || campoFechaNacimiento == "" || campoMenorLibro == null || campoMenorLibro =="" || campoMenorFolio == null || campoMenorFolio =="" || campoMenorActa == null || campoMenorActa ==""){
        $('#generales-tab').tab('show');
        mostrarTab = true;
    }

    if(!mostrarTab){
        if(campoPais == null || campoPais == "" || campoProvincia == null || campoProvincia == "" || campoMunicipio == null || campoMunicipio == ""){
            $('#localizacion-tab').tab('show');
            mostrarTab = true;
        }
    }
}

function validarCamposRequeridosSocioJuridica(){
    var campoSucursal = $('.campoSucursal').find('option:selected').text();
    var campoSucursalDistrito = $('.campoSucursalDistrito').find('option:selected').text();
    var campoNombre = $('.campoNombre').val();
    //var campoPrimerApellido = $('.campoPrimerApellido').val();
    //var campoCedula = $('.campoCedula').val();
    var campoFechaNacimiento = $('.campoFechaNacimiento').val();

    var campoRnc = $('#campo-rnc').val();
    //-------------------------------
    var campoPais = $('.campoPais').find('option:selected').val();
    var campoProvincia = $('.campoProvincia').find('option:selected').val();
    var campoMunicipio = $('.campoMunicipio').find('option:selected').val();
    //console.log($("#campo-cedula").cleanVal());
    //$("#campo-cedula").val("3333333333");
    //alerr($("#campo-cedula").cleanVal());
    //$("#campo-cedula").unmask();
    mostrarTab = false;

    if(campoSucursal == null || campoSucursal == "" || campoSucursalDistrito == null || campoSucursalDistrito == "" || campoNombre == null || campoNombre == "" || campoFechaNacimiento == null || campoFechaNacimiento == "" || campoRnc == null || campoRnc == ""){
        $('#generales-tab').tab('show');
        mostrarTab = true;
    }

    if(!mostrarTab){
        if(campoPais == null || campoPais == "" || campoProvincia == null || campoProvincia == "" || campoMunicipio == null || campoMunicipio == ""){
            $('#localizacion-tab').tab('show');
            mostrarTab = true;
        }
    }
}
