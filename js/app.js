/**
Para la ciudadania.
Saúl Espinosa Ruiz
Con el apoyo de diferentes frameworks e inspiraciones.
*/
var nombreEmpresaGlobal = null;
var expedienteEmpresaGlobal = null;

function setGlobal(nombre, expediente, idEmpresa){
    $('#empresaDGSP').val(nombre);
    $('#expedienteDGSP').val(expediente);
    $('#idEmpresaDGSP').val(idEmpresa);
}

/**
 * funcion handle que alza los servicios cuando el dispositivo esta listo.
 * @return void
 */
function magia(){

    /*$('#infoTuristica-button').click(function(){

    });*///01800-0089090

    $('.verSitiosTurismo').click(function(){
        showModal();
        var idTipo = $(this).attr('id');
        var idT;
        $("#resultadoSitiosTurismo").empty();
        switch(idTipo){
            case 'embajadas-action':
                idT = 1;
                break;
            case 'museos-action':
                idT = 3;
                break;
            case 'hoteles-action':
                idT = 2;
                break;
        }
        var request = $.ajax({
            timeout:50000,
            url: "http://201.144.220.174/seguridad_privada/api/trae_sitios/"+idT,
            type: "GET",
            /*data: {
                key: '848e2c385fed8ad9199$16d11f9f17d5',
                nombrePost: nombre,
                empresaPost: empresa,
                observacionesPost: observaciones,
                uniformePost: uniforme,
                vehiculoPost: vehiculo,
                expedientePost: expediente
            },*/
            dataType: "json"
        });
        request.done(function(msg) {
           //resultadoSitiosTurismo
           for (var i = 0; i < msg.length; i++) {
                 $(".resultadoSitiosTurismo").append('<li><h2>' + msg[i].Nombre + '</h2><p>Direccion: ' + msg[i].Calle + '</p></li>');
            };
            $(".resultadoSitiosTurismo").listview('refresh');
            hideModal();
        });      
        request.fail(function(jqXHR, textStatus) {
            $.mobile.loading( "hide" );
            alerta( "Se ha producido un error, por favor intente de nuevo en un momento: " + textStatus, 'Error', 'Aceptar' );
            hideModal();
        });
    }); 

    //http://www.ssp.df.gob.mx/SegPrivada/Pages/VerificadoresSP.aspx (1)
    //http://www.ssp.df.gob.mx/SegPrivada/Pages/FormatosyRequisitos-.aspx  (2)
    $('#link1').click(function(e){
        e.preventDefault();
        var ref = window.open('http://www.ssp.df.gob.mx/SegPrivada/Pages/VerificadoresSP.aspx', '_system', 'location=yes');
    });
    $('#link2').click(function(e){
        e.preventDefault();
        var ref = window.open('http://www.ssp.df.gob.mx/SegPrivada/Pages/FormatosyRequisitos-.aspx', '_system', 'location=yes');
    });

    $('#enviarSeguridadPrivada').click(function(e){
               
            e.preventDefault();
            var nombre = $('#nombreDGSP').val();
            var empresa = $('#empresaDGSP').val();
            var observaciones = $('#observacionesDGSP').val();
            var uniforme = $('#uniformeDGSP').val();
            var vehiculo = $('#vehiculoDGSP').val();
            var expediente = $('#expedienteDGSP').val();
            if(nombre == '' || empresa == '' || observaciones == ''){
                alerta("Los campos nombre, empresa y observaciones son requeridos: ", "Alerta", "Aceptar");
            }else{
                 showModal();
                var request = $.ajax({
                    timeout:50000,
                    url: "http://201.144.220.174/seguridad_privada/api/guarda_reporte",
                    type: "POST",
                    data: {
                        key: '848e2c385fed8ad9199$16d11f9f17d5',
                        nombrePost: nombre,
                        empresaPost: empresa,
                        observacionesPost: observaciones,
                        uniformePost: uniforme,
                        vehiculoPost: vehiculo,
                        expedientePost: expediente
                    },
                    dataType: "json"
                });
                request.done(function(msg) {
                    $.mobile.loading( "hide" );
                    $('#nombreDGSP').val('');
                    $('#empresaDGSP').val('');
                    $('#observacionesDGSP').val('');
                    $('#uniformeDGSP').val('');
                    $('#vehiculoDGSP').val('');
                    $('#expedienteDGSP').val('');
                   alerta("Reporte enviado correctamente. Su folio es: " + msg, "Éxito", "Aceptar");
                });      
                request.fail(function(jqXHR, textStatus) {
                    $.mobile.loading( "hide" );
                    alerta( "Se ha producido un error, por favor intente de nuevo en un momento: " + textStatus, 'Error', 'Aceptar' );
                });
            }
        });
    /**
     * seguridad privada
     */
    $('#botonBuscarEmpresa').click(function(e){
        e.preventDefault();
        var nombreEmpresa = $('#nombreEmpresa').val();
        if(nombreEmpresa.length < 4){
            alerta("Por favor ingrese un nombre de empresa correcto.", "Alerta", "Aceptar");
        }else{
            showModal();
            busquedaEmpresaSeguridadPrivada(nombreEmpresa);
        }
    });
    //vehiculos
    $('#buscar_info_vehiculo').live('click',function(ev){
        var placa_box = $('#placa').val();
        if(placa_box != ''){
            consultar_placa_corralon();
            consultar_placa();
            consultar_placa_infracciones();
        }else{
            alerta("Por favor ingresa un número de placa.", "Alerta", "Aceptar");
        }
        ev.preventDefault();
    });
    
    //CAS
    $('#enviar-CAS').click(function(e){
        $(this).removeClass("ui-btn-active");
        var nombreCompleto = $('#nombre').val();
        var telefonoContacto = $('#telefono').val();
        var denunciaDescripcion = $('#denuncia').val();
        var idtipoDenuncia = $('#tipoDenuncia').val();
        var idDelegacion = $('#idDelegacion').val();
        var calleNumero = $('#calleNumero').val();
        var colonia = $('#colonia').val();

        if(colonia == '' || calleNumero == '' || idDelegacion == '' || nombreCompleto == '' || telefonoContacto == '' || denunciaDescripcion == '' || idtipoDenuncia == ''){
            navigator.notification.alert(
                'Es necesario llenar todos los campos.',  // message
                null,         // callback
                'Alerta',            // title
                'Aceptar'                  // buttonName
            );
        }else{
            $.mobile.loading( "show", {
                text: "Enviando...",
                textVisible: true,
                theme: "d",
                html: ""
            });

            var request = $.ajax({
                timeout:50000,
                url: "http://201.144.220.174/cas/mi-policia-cas/inserta",
                type: "POST",
                data: {
                    key: '16d11f9f17d5$848e2c385fed8ad9199',
                    nombre_completo: nombreCompleto,
                    telefono: telefonoContacto,
                    denuncia: denunciaDescripcion,
                    id_tipo_denuncia: idtipoDenuncia,
                    calle_numero: calleNumero,
                    id_delegacion: idDelegacion,
                    colonia_denuncia: colonia
                },
                dataType: "json"
            });
            request.done(function(msg) {
                limpia_folios();
                $.mobile.loading( "hide" );
                navigator.notification.alert(
                    'Tu número de folio es: ' + msg.folio,  // message
                    null,         // callback
                    'Folio Generado con Éxito',            // title
                    'Aceptar'                  // buttonName
                );
                guardaFolio(msg.folio, msg.fecha);
            });      
            request.fail(function(jqXHR, textStatus) {
                //Si existe un error, lo muestra.
                $.mobile.loading( "hide" );
                alerta( "Se ha producido un error, por favor intente de nuevo en un momento: " + textStatus, 'Error', 'Aceptar');
            });
        }
            e.preventDefault();
    });
    $('#cas').live("pagebeforecreate", function(event, data) {
        var col = $('#cas_nav');
        var deviceVersion = device.version;
        var fullv =  deviceVersion.split('.');
        var numero = fullv[0];
        if(numero > 2){
            col.attr('data-position', 'fixed');
            col.attr('data-tap-toggle', 'false');
        }
    });
    $('#folios').live("pageshow", function(event, data) {
        dameFolios();
        $('.folio_historico').click(function(e){
            var folio_interno = $(this).attr('id');
            consulta_folio(folio_interno);
            e.preventDefault();
        });
    });
    //FIN CAS
    document.addEventListener("online", function(){
        if (!existeScript("https://maps.google.com/maps/api/js?sensor=true&callback=googleMapsReady")){
        if (!comprueba_conexion() )
       {
            alerta("No se ha podido establecer una conexión a Internet.", "Alerta", "Aceptar");
       }
       else
       {
            showModal();
            carga_gmaps_script();
       } 
        
    }
    }, false);

    document.addEventListener("resume", function(){
        if (!existeScript("https://maps.google.com/maps/api/js?sensor=true&callback=googleMapsReady")){
        if (!comprueba_conexion() )
       {
            alerta("No se ha podido establecer una conexión a Internet.", "Alerta", "Aceptar");
       }
       else
       {
            showModal();
            carga_gmaps_script();
       } 
        
    }
    }, false);

    document.addEventListener("offline", function (){
        alerta("Se ha perdido la conexión a Internet.", "Alerta", "Aceptar");
    }, false);

    if (!existeScript("https://maps.google.com/maps/api/js?sensor=true&callback=googleMapsReady")){
        if (!comprueba_conexion() )
       {
            alerta("No se ha podido establecer una conexión a Internet.", "Alerta", "Aceptar");
       }
       else
       {
            showModal();
            carga_gmaps_script();
       } 
        
    }
    /**
     * ejecuta la busqueda mediante el code address
     * @param  objet    e    evento click
     * @return void
     */
    $("#ubicar_busqueda").click(function(e){
        buscar_direccion();
        e.preventDefault();
    });

    /**
     * evento click del boton de reubicar cuadrante que destruye el mapa y
     * lo vuelve a mostrar con la posicion más actual.
     * @param  objet    e    evento click
     * @return void
     */
    $("#reubicar_emergencia").click(function(e){
        $('#map_canvas').gmap('destroy');
        $(this).removeClass("ui-btn-active");
        limpia_divs_informacion();
        mapa_emergencia('map_canvas');
        e.preventDefault();
    });

    /**
     * inicializa el mapa de las emergencias cuando se muestra la página
     * @return void
     */
    $('#emergencia').live("pageshow", function(event, data) {
        if (data.prevPage.attr('id') == "principal"){
            mapa_emergencia('map_canvas');
        }
        if (data.prevPage.attr('id') == "ubicar"){
            genera_mapa_direccion(localStorage.lat, localStorage.lng);
        }
    });
    /**
     * inicializa el servicio de las ubicaciones cuando se muestra la página.
     * @return void
     */
    /*$('#ubicar').live("pageshow", function() {

    });*/

    /**
     * destruye el mapa de las emergencias cuando se oculta la página
     * @return void
     */
    $('#emergencia').live("pagehide", function(){
        $('#map_canvas').gmap('destroy');
        limpia_divs_informacion();
    });

     $('#fomularioSeguridadPrivada').live("pagehide", function(){
        $('#map_formulario').gmap('destroy');
        limpia_divs_informacion();
    });

    $('#fomularioSeguridadPrivada').live("pageshow", function(){
        mapa_emergencia('map_formulario');
    });
    $('#vistaFomularioSeguridadPrivada').live("pageshow", function(){
            
    });

    $('#detalleSeguridadPrivada').live("pageshow", function(event, data) {
        //editar
        showModal();
        var idEmpresaHere = $('#idEmpresaDGSP').val();
        //alert(idEmpresaHere);
            $(".detallesLabels").empty();
            var request = $.ajax({
                timeout:30000,
                url: "http://201.144.220.174/seguridad_privada/api/detalle_empresa",
                type: "POST",
                data: {
                    idEmpresa: idEmpresaHere
                },
                dataType: "json"
            });
            request.done(function(msg) {
                $.mobile.loading( "hide" );
                $('#labelNombre').html(msg.titulo);
                $('#labelExpediente').html(msg.expediente);
                $('#labelPermiso').html(msg.permiso);
                $('#labelVigencia').html(msg.fechaVigencia);
                $('#labelModalidad').html(msg.modalidad);
                $('#labelCalle').html(msg.domicilio);
                $('#labelNoExterior').html(msg.noExterior);
                $('#labelNoInterior').html(msg.noInterior);
                $('#labelColonia').html(msg.colonia);
                $('#labelCP').html(msg.codigoPostal);
                $('#labelTelefono').html(msg.telefono);
                //$('#labelSituacion').html(msg.domicilio);
                $('#labelDelegacion').html(msg.delegacion);
            });      
            request.fail(function(jqXHR, textStatus) {
                //Si existe un error, lo muestra.
                $.mobile.loading( "hide" );
                alerta( "Se ha producido un error, por favor intente de nuevo en un momento: " + textStatus, 'Error', 'Aceptar');
            });
    }); 
}

function googleMapsReady(){
    hideModal();
}

/**
 * esta funcion comprueb a si existe una conexcion a internet, de lo contrario la app no podra funcionar.
 * @return bool booleano de la conxion.
 */
function comprueba_conexion()
{
    var networkState = navigator.connection.type;

    if (networkState == Connection.UNKNOWN || networkState == Connection.NONE)
        return false;
    else
        return true;
}

/**
 * funcion que inicializa el mapa de las emergencias por medio de geolocalización via phonegap
 * @return void
 */
function mapa_emergencia(container){
    showModal();
    navigator.geolocation.getCurrentPosition(function (position){
        var clientPosition = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
        cuadrante_actual(position.coords.latitude, position.coords.longitude, function(idcdCuadranteGeolocalizado){
            if(container == 'map_formulario'){
                poligono_cuadrante_fomulario(idcdCuadranteGeolocalizado);
            }else{
                poligono_cuadrante(idcdCuadranteGeolocalizado);
            }
            comandantes_cuadrante(idcdCuadranteGeolocalizado);
        });
        $('#'+container).gmap({
            'center': position.coords.latitude + ', ' + position.coords.longitude,
            'callback': function() {
                var self = this;
                var markerPrincipal = self.addMarker({
                    'position': position.coords.latitude + ', ' + position.coords.longitude,
                    'bounds': false,
                    'draggable': true
                }).dragend(function(){
                    showModal();
                    cuadrante_actual(this.getPosition().lat(), this.getPosition().lng(), function(idcdCuadranteGeolocalizado){
                        poligono_cuadrante(idcdCuadranteGeolocalizado);
                        comandantes_cuadrante(idcdCuadranteGeolocalizado);
                    });
                })
                markerPrincipal.drag(function(){
                    limpia_divs_informacion();
                    $('#'+container).gmap('clear', 'overlays > Polygon');
                });
            }
        });
        $('#'+container).gmap('option', 'zoom', 16);
        //cuadrante_actual(position.coords.latitude, position.coords.longitude);
    }, function (error){
        var codigoError = error.code;
        var mensajeError = error.message;
        //alert(codigoError);
        if (codigoError == 'TIMEOUT' || codigoError == 3){
            alerta("El tiempo en que responde el GSP tardo demaciado, no se pudo ubicar tu posición.", "Error", "Aceptar");
        }
        else if (codigoError == 'POSITION_UNAVAILABLE' || codigoError == 2){
            alerta("El servicio de tu GPS parece no estar respondiendo.", "Error", "Aceptar");
        }
        else if (codigoError == 'PERMISSION_DENIED' || codigoError == 1){
            alerta("Mi Policía no pudo acceder a tu posición, no tiene permisos.", "Error", "Aceptar");
        }
        else{
            alerta(mensajeError, "Error desconocido", "Aceptar");
        }
        hideModal();
    }, {enableHighAccuracy: true});
}

/**
 * funcion que ubica mediante el algoritmo de punto en un poligono el id del cuadrante en el que se
 * encuentran las coordenadas de posicion actual, despues de ubicar el cuadrante, se ejecuta la consulta para
 * delimitar el poligono de el cuadrante
 * @param  {[double]} lat [numero decimal que contiene la latitud]
 * @param  {[double]} lng [numero decimal que contiene la longitud]
 * @return void
 */
function cuadrante_actual(lat, lng, callback){
    var idcd;
    $.ajax({
        url: "http://201.144.220.174/pid/cuadrantesService/index.php/cuadrante_ajax/json_datos_cuadrante",
        type: "POST",
        data: {
                latitude_post: lat,
                longitude_post: lng
        },
        dataType: "json",
        success: function (data){
            if (data != undefined){
                //poligono_cuadrante(data[0].idcd);
                //idcd = data[0].idcd;
                //document.getElementById("comandantes").innerHTML += data[0].zona + "<br/>";
                //alert(data[0].zona);
                document.getElementById("datos_cuadrante").innerHTML += 
                    "Zona: " + data[0].zona + "<br/>" + 
                    "Delegación: " + data[0].deleg + "<br/>" + 
                    "Sector: " + data[0].sector + "<br/>" +
                    "Cuadrante: " + data[0].nomenclatura + "<br/>" +
                    "Teléfono: " + data[0].telefono + "<br/>" +
                    "ID Nextel: " + data[0].idnextel + "<br/>";
                document.getElementById('boton_marcar').setAttribute("href", "tel:" + data[0].telefono);
                hideModal();
                $('#marcar').show();
                $('#datos').show();
                $('#fuera_df').hide();
                callback(data[0].idcd);
            }else{
                alerta("Esta zona no esta cubierta por la Policía del Distrito Federal.", "Mensaje", "Aceptar");
                $('#datos').hide();
                $('#fuera_df').show();
                hideModal();
            }
        }
    });
}

/**
 * funcion que pinta graficamente el poligono dentro del mapa instanciado, se hace una consulta ajax para traer dichos datos.
 * @param  int   id_cuadrante    id del cuadrante que se desea pintar
 * @return void
 */
function poligono_cuadrante(id_cuadrante){
    $.ajax({
        url: "http://201.144.220.174/pid/cuadrantesService/index.php/cuadrante_ajax/json_coordenadas_poligonos",
        type: "POST",
        data: {idcd: id_cuadrante},
        dataType: "json",
        success: function (data){
            for (var i = 0; i < data.length; i++) {
                var coordsArray = [];
                for (var j = 0; j < data[i].length; j++) {
                    coordA = data[i][j].split(",");
                    if (coordA[0] != '' && coordA[1] != undefined){
                        coordsArray.push(new google.maps.LatLng(coordA[0], coordA[1]));
                    }
                }
                $('#map_canvas').gmap('addShape', 'Polygon', { 
                    'paths': coordsArray,
                    'strokeColor': "#3687B2",
                    'strokeOpacity': 1,
                    'strokeWeight': 3.5,
                    'fillColor': "#3687B2",
                    'fillOpacity': 0.2
                });
            };
            hideModal();
        }
    });
}
function poligono_cuadrante_fomulario(id_cuadrante){
    $("#resultado_cuadrante_sp").empty();
    $('#empresasLoading').show();
    $.ajax({
        url: "http://201.144.220.174/pid/cuadrantesService/index.php/cuadrante_ajax/json_coordenadas_poligonos",
        type: "POST",
        data: {idcd: id_cuadrante},
        dataType: "json",
        success: function (data){
            for (var i = 0; i < data.length; i++) {
                var coordsArray = [];
                for (var j = 0; j < data[i].length; j++) {
                    coordA = data[i][j].split(",");
                    if (coordA[0] != '' && coordA[1] != undefined){
                        coordsArray.push(new google.maps.LatLng(coordA[0], coordA[1]));
                    }
                }
                $('#map_formulario').gmap('addShape', 'Polygon', { 
                    'paths': coordsArray,
                    'strokeColor': "#3687B2",
                    'strokeOpacity': 1,
                    'strokeWeight': 3.5,
                    'fillColor': "#3687B2",
                    'fillOpacity': 0.2
                });
            };
            //hideModal();
        }
    });
    $.ajax({
        url: "http://201.144.220.174/seguridad_privada/api/empresa_por_cuadrante",
        type: "POST",
        data: {idcd: id_cuadrante},
        dataType: "json",
        success: function (data){
            $('#empresasLoading').hide();
            for (var i = 0; i < data.length; i++) {
                 $("#resultado_cuadrante_sp").append('<li><a onclick="setGlobal(\''+data[i].Nombre+'\', \''+data[i].empresaExpediente+'\', '+data[i].idEmpresa+');" data-transition="none" class="puntos_encontrados" href="#detalleSeguridadPrivada"><h2>' + data[i].Nombre + '</h2><p>Vigencia: ' + data[i].Vigencia + '</p></a></li>');
            };
            $("#resultado_cuadrante_sp").listview('refresh');
            hideModal();
        }
    });
}

/**
 * muestra los comandantes de un cuadrante dado por un id como parametro.
 * @param  int idCuadrante id del cuadrante del que se desea conocer los jefes de cuadrante.
 * @return void
 */
function comandantes_cuadrante(idCuadrante){
    $.ajax({
        url: "http://201.144.220.174/pid/cuadrantesService/index.php/cuadrante_ajax/json_comandantes_cuadrante",
        type: "POST",
        data: {
            idcd: idCuadrante,
        },
        dataType: "json",
        success: function (data){
           for (var i = 0; i < data.length; i++) {
                document.getElementById("comandantes").innerHTML += "<li>" + data[i].emp + " - " + data[i].nombre + "</li>";
            }
        }
    });
}

function genera_mapa_direccion(lat, lng){
    $.mobile.changePage("#emergencia");
    showModal();
    var clientPositionDir = new google.maps.LatLng(lat, lng);
    var mapa = $('#map_canvas').gmap({
        'center': clientPositionDir,
        'callback': function() {
            var self = this;
            var markerPrincipal = self.addMarker({
                'position': clientPositionDir,
                'bounds': false,
                'draggable': true
            }).dragend(function(){
                showModal();
                cuadrante_actual(this.getPosition().lat(), this.getPosition().lng(), function(idcdCuadranteGeolocalizado){
                    poligono_cuadrante(idcdCuadranteGeolocalizado);
                    comandantes_cuadrante(idcdCuadranteGeolocalizado);
                });
            })
            markerPrincipal.drag(function(){
                limpia_divs_informacion();
                $("#map_canvas").gmap('clear', 'overlays > Polygon');
            });
        }
    });
    $('#map_canvas').gmap('option', 'zoom', 16);
    //cuadrante_actual(position.coords.latitude, position.coords.longitude);
    cuadrante_actual(lat, lng, function(idcdCuadranteGeolocalizado){
        poligono_cuadrante(idcdCuadranteGeolocalizado);
        comandantes_cuadrante(idcdCuadranteGeolocalizado);
    });
}

/**
 * genera una consulta al servicio de geocoding para regresar los resultados en una lista
 * @return void
 */
function buscar_direccion() {
    showModal();
    var delegacion = "";
    var colonia = "" ;
    var geocoder = new google.maps.Geocoder();
    var b = 0;
    var address = document.getElementById("direccion").value + ", mexico df";
    $("#resultado_busqueda").empty();
    geocoder.geocode( { 'address': address}, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        for (var a = 0; a < results.length; a++) {
            for (i=0;i<results[a].address_components.length;i++){
                for (j=0;j<results[a].address_components[i].types.length;j++){
                    if (results[a].address_components[i].types[j]=="sublocality"){
                        delegacion = results[a].address_components[i].long_name;
                    }
                    if (results[a].address_components[i].types[j]=="neighborhood"){
                        colonia = ', Col. ' +  results[a].address_components[i].long_name;
                    }
                    if(results[a].address_components[i].types[j]=="locality" && results[a].address_components[i].long_name == "Ciudad de México"){
                        var lat = results[a].geometry.location.lat();
                        var lng = results[a].geometry.location.lng();
                        $("#resultado_busqueda").append('<li><a data-transition="none" href="#emergencia" onclick="localStorage.lat='+ lat +';localStorage.lng='+ lng +';" class="puntos_encontrados"><h2>' + delegacion + colonia + '</h2><p>' + results[a].formatted_address + '</p></a></li>');
                        $("#resultado_busqueda").listview('refresh');
                        b++;
                    }
                }
            }
        }
        if (b == 0 || address == '')
            alerta("No se pudo encontrar el área proxima a su consulta", "Mensaje", "Aceptar");
        hideModal();
      } else {
        hideModal();
        alerta("Error: " + status, "Error desconocido", "Aceptar");
      }
    });
  }

/**
 * limpia los divs que contienen informacion de un cuadrante anterior si es el caso.
 * @return void
 */
function limpia_divs_informacion(){
    document.getElementById("datos_cuadrante").innerHTML = "";
    document.getElementById("comandantes").innerHTML = "";
    $('#marcar').hide();
}

/**
 * muestra una ventana model y el mensaje de "cargando", usado principalmente
 * para mostrar que se esta ejecutando una accion y hay que esperar.
 * @return void
 */
function showModal(){
    $.mobile.loading( "show", {
        text: "Cargando...",
        textVisible: true,
        theme: "d",
        html: ""
    });
}
/**
 * destruye la ventana modal con el mensaje de "cargabdo"
 * @return {[type]} [description]
 */
function hideModal(){
    $.mobile.loading( "hide" );
}

/**
 * verifica que el script js del parametro exista
 * @param  string src  nombre del script
 * @return void
 */
function existeScript(src){
    if($('script[src="'+src+'"]').length>0){
        return true;
    }else{
        return false;
    }
}

function carga_gmaps_script(){
    var script = document.createElement("script");
    script.src = "https://maps.google.com/maps/api/js?sensor=true&callback=googleMapsReady";
    script.type = "text/javascript";
    document.getElementsByTagName("head")[0].appendChild(script);

    var script = document.createElement("script");
    script.src = "js/libs/jquery.ui.map.js";
    script.type = "text/javascript";
    document.getElementsByTagName("head")[0].appendChild(script);
}

/**
 * Genela las alertas nativas de cada dispositivo.
 * @param  streing  mensaje  mensaje que se va a mostrar en la notificacion
 * @param  streing  titulo   titulo del encabezado
 * @param  streing  boton    titulo del boton
 * @return void
 */
function alerta(mensaje, titulo, boton){
    navigator.notification.alert(
            mensaje,         // message
            function (){},  // callback
            titulo,         // title
            boton           // buttonName
        );
}

//$(document).ready(magia);
document.addEventListener("deviceready", magia, false);
/**$(document).one("mobileinit", function () {

        // Setting #container div as a jqm pageContainer
        $.mobile.pageContainer = $('#container');

        // Setting default page transition to slide
        $.mobile.defaultPageTransition = 'slide';

    });**/

//CAS

function guardaFolio(folioResponse, fechaAlta){
    var foliosActuales = JSON.parse(window.localStorage.getItem("folios"));
    var folioArray = {};
    var count = 0;

    for (var obj in foliosActuales){
        count++;
    }
    if(count != 0){
        for(var i = 0; i <= count; i++){
            if (count == i){
                folioArray[count+1] =
                {
                    folio : folioResponse,
                    fecha : fechaAlta
                };
            }else{
                folioArray[i+1] =
                {
                    folio : foliosActuales[i+1].folio,
                    fecha : foliosActuales[i+1].fecha
                };
            }
        }
    }else{
        folioArray[1] =
        {
            folio : folioResponse,
            fecha : fechaAlta
        };
    }

    window.localStorage.setItem("folios", JSON.stringify(folioArray));
}

function dameFolios(){
    $("#folios_listado").empty();
    $("#folios_listado").append('<li data-role="list-divider" role="heading"> Historial</li>');
    store = window.localStorage.getItem("folios");
    var foliosActuales = JSON.parse(store);
    var count = 0;
    for (var obj in foliosActuales){
        count++;
    }
    if(count != 0){
        for(var i = 1; i <= count; i++){
            $("#folios_listado").append('<li><a data-transition="none" class="folio_historico" id="'+foliosActuales[i].folio+'" href="#" data-transition="slide">CAS-'+foliosActuales[i].folio+' ('+foliosActuales[i].fecha+')</a></li>');
            $("#folios_listado").listview('refresh');
        }
    }else{
        alerta('No existen folios guardados.', 'Mensaje', 'Aceptar');
    }
}

function limpia_folios(){
    $('#denuncia').val('');
    $('#tipoDenuncia').val('').selectmenu('refresh');
    $('#idDelegacion').val('').selectmenu('refresh');
    $('#calleNumero').val('');
    $('#colonia').val('');
}

//--Inicio de consultas CAS. v 1.5.1
function consulta_folio(folio){
    $.mobile.loading( "show", {
        text: "Cargando...",
        textVisible: true,
        theme: "d",
        html: ""
    });
    var request = $.ajax({
        timeout:50000,
        url: "http://201.144.220.174/cas/mi-policia-cas/consulta",
        type: "POST",
        data: {
            key: '848e2c385fed8ad9199$16d11f9f17d5',
            folio_post: folio
        },
        dataType: "json"
    });
    request.done(function(msg) {
        $.mobile.loading( "hide" );
        if (msg.id_situacion == 1 || msg.acciones_realizadas == ''){
            alerta("Su denuncia aún esta siendo atendida por el Centro de Atención del Secretario.", "Mensaje", "Aceptar");
        }else if(msg.id_situacion == 2 || msg.id_situacion == 3){
            alerta(folio+": " + msg.acciones_realizadas, "Acciones realizadas", "Aceptar");
        }
        //append para poner el resultado de la consulta
        //si la respuesta es concluida, debera de ponerse un select para que el usuario defina que tal el trato
    });      
    request.fail(function(jqXHR, textStatus) {
        $.mobile.loading( "hide" );
        alerta( "Se ha producido un error, por favor intente de nuevo en un momento: " + textStatus, 'Error', 'Aceptar' );
    });
}
    //--Fin de consultas C.A.S.
//FIN CAS

//inicio finanzas
function consultar_placa_corralon(){
    var placaApp = $('#placa').val();
    $.mobile.loading( "show", {
        text: "Cargando...",
        textVisible: true,
        theme: "d",
        html: ""
    });
    var request = $.ajax({
        timeout:50000,
        url: "http://201.144.220.174/mpws/index.php/corralon/buscar_en_corralon",
        type: "POST",
        data: {
            key: 'A7b5aRdc74cM6501dd6Ca7146f13c7a3',
            placa: placaApp
        },
        dataType: "json"
    });
    request.done(function(msg) {
        $.mobile.loading( "hide" );
        if(msg.error != undefined ){
            alerta(msg.error, 'Error', 'Aceptar');
        }else if(msg.fechaYHoraRemolque != null){
            var telC = msg.telefonoCorralon;
            var telCt = telC.replace(" ","");
            $('#placas_response').show();
            $('#placas_response').html('<p>El vehículo con placas <strong>'+placaApp.toUpperCase()+'</strong> fué remolcado el día <strong>'+msg.fechaRemolque+'</strong> a las <strong>'+msg.horaRemolque+'</strong> horas al deposito <strong>'+msg.nombreCorralon+'</strong> ubicado en '+msg.direccionCorralon+'. <i> El domicilio puede variar por diversas razones, se sugiere hablar al número teléfonico indicado.</i> </p><a data-role="button" id="marcar_deposito" target="_blank" rel="external" data-theme="b" href="tel:'+telCt+'" data-icon="grid" data-iconpos="left">Tel. '+msg.telefonoCorralon+'</a>').trigger( "create" );
        }else{
            $('#placas_response').hide();
            alerta('No existen registros para el automóvil con placas '+placaApp.toUpperCase(), 'Resultado', 'Aceptar');
        }
        //append para poner el resultado de la consulta
        //si la respuesta es concluida, debera de ponerse un select para que el usuario defina que tal el trato
    });      
    request.fail(function(jqXHR, textStatus) {
        $.mobile.loading( "hide" );
        alerta( "Se ha producido un error, por favor intente de nuevo en un momento: " + textStatus, 'Error', 'Aceptar' );
    });
}
//fin finanzas

//inicio finanzas
function consultar_placa_old(){
    var placaApp = $('#placa').val();
    $.mobile.loading( "show", {
        text: "Cargando...",
        textVisible: true,
        theme: "d",
        html: ""
    });
    var request = $.ajax({
        timeout:50000,
        url: "http://moobky.com/soap/wsf.php",
        type: "POST",
        data: {
            placa: placaApp
        },
        dataType: "json"
    });
    request.done(function(msg) {
        $.mobile.loading( "hide" );
        if (msg.respuesta.tieneadeudos == 0){
            //alerta('Su automóvil no tiene adeudos', 'Mensaje', 'Aceptar');
        }
        else{
            //alerta('Los años adeudados son: ' + msg.respuesta.adeudos, 'Mensaje', 'Aceptar');
            $("#placas_response_finanzas").append("Los años adeudados de tenencia para el automóvil con placas <strong>"+placaApp+"</strong> son: "+msg.respuesta.adeudos);
        }
        //append para poner el resultado de la consulta
        //si la respuesta es concluida, debera de ponerse un select para que el usuario defina que tal el trato
    });      
    request.fail(function(jqXHR, textStatus) {
        $.mobile.loading( "hide" );
        alerta( "Se ha producido un error, por favor intente de nuevo en un momento: " + textStatus, 'Error', 'Aceptar');
    });
}
function consultar_placa(){
    $('#placas_response_finanzas').hide();
    $('#tenencia').empty();
    $('#mensaje_tenencia').empty();
    var placaApp = $('#placa').val();
    $.mobile.loading( "show", {
        text: "Cargando...",
        textVisible: true,
        theme: "d",
        html: ""
    });
    var request = $.ajax({
        timeout:50000,
        url: "http://201.144.220.174/pid/adeudostenenciaMA_ws_client.php",
        type: "POST",
        data: {
            placa: placaApp
        },
        dataType: "json"
    });
    request.done(function(msg) {
        $.mobile.loading( "hide" );
        $('#tenencia').empty();
    $('#mensaje_tenencia').empty();
        if (msg.noExiste == 1){
            //alerta('Su automóvil no tiene adeudos', 'Mensaje', 'Aceptar');
        }
        else{
            //alerta('Su automóvil si tiene adeudos', 'Mensaje', 'Aceptar');
            var total = 0;
            //$("#mensaje_tenencia").append('El automóvil con placas <strong>' + placaApp + '</strong> adeuda los siguientes años de tenencia:');
            $("#mensaje_tenencia").append('<div class="isa_warning">El automóvil con placas <strong>' + placaApp.toUpperCase() + '</strong> tiene adeudos de tenencia.</div>');
            //alerta('Los años adeudados de tenencia para el automóvil con placas '+ placaApp +' son: ' + msg.respuesta.adeudos, 'Mensaje', 'Aceptar');
            //$('#placas_response_finanzas').append('Usted debe: <strong>'+ placaApp +'</strong> son: ' + msg.total);
            for (var i=0; i<msg.length; i++){
                $('#placas_response_finanzas').show();
                //$("#tenencia").append('<li data-theme="d">'+msg[i].ejercicio+'<span class="ui-li-count">$ '+msg[i].total+'</span></li>');
                $("#tenencia").listview('refresh');
            }
            //$('#placas_response_finanzas').append('Usted debe: <strong>'+ placaApp +'</strong> son: ' + total);
        }
        //append para poner el resultado de la consulta
        //si la respuesta es concluida, debera de ponerse un select para que el usuario defina que tal el trato
    });      
    request.fail(function(jqXHR, textStatus) {
        $.mobile.loading( "hide" );
        alerta( "Se ha producido un error, por favor intente de nuevo en un momento: " + textStatus, 'Error', 'Aceptar');
    });
}
function consultar_placa_infracciones(){
    $('#placas_response_finanzas_infracciones').hide();
    $('#infracciones').empty();
    $('#mensaje_infraccion').empty();
    var placaApp = $('#placa').val();
    $.mobile.loading( "show", {
        text: "Cargando...",
        textVisible: true,
        theme: "d",
        html: ""
    });
    var request = $.ajax({
        timeout:50000,
        url: "http://201.144.220.174/pid/adeudostenenciaMA_ws_client1.php",
        type: "POST",
        data: {
            placa: placaApp
        },
        dataType: "json"
    });
    request.done(function(msg) {
        //alert(msg.adeudo);
        $.mobile.loading( "hide" );
        $('#infracciones').empty();
    $('#mensaje_infraccion').empty();
        if (msg.adeudo == 0){
            //alerta('Su automóvil no tiene adeudos', 'Mensaje', 'Aceptar');
        }
        else{
            //alerta('Su automóvil si tiene adeudos', 'Mensaje', 'Aceptar');
            //var total = 0;
            //$("#mensaje_tenencia").append('El automóvil con placas <strong>' + placaApp + '</strong> adeuda los siguientes años de tenencia:');
            $("#mensaje_infraccion").append('<div class="isa_warning">El automóvil con placas <strong>' + placaApp.toUpperCase() + '</strong> tiene adeudos de infracci&oacute;n.</div>');
            //alerta('Los años adeudados de tenencia para el automóvil con placas '+ placaApp +' son: ' + msg.respuesta.adeudos, 'Mensaje', 'Aceptar');
            //$('#placas_response_finanzas').append('Usted debe: <strong>'+ placaApp +'</strong> son: ' + msg.total);
            //for (var i=0; i<msg.length; i++){
                $('#placas_response_finanzas_infracciones').show();
                //$("#tenencia").append('<li data-theme="d">'+msg[i].ejercicio+'<span class="ui-li-count">$ '+msg[i].total+'</span></li>');
                //$("#tenencia").listview('refresh');
            //}
            //$('#placas_response_finanzas').append('Usted debe: <strong>'+ placaApp +'</strong> son: ' + total);
        }
        //append para poner el resultado de la consulta
        //si la respuesta es concluida, debera de ponerse un select para que el usuario defina que tal el trato
    });      
    request.fail(function(jqXHR, textStatus) {
        $.mobile.loading( "hide" );
        alerta( "Se ha producido un error, por favor intente de nuevo en un momento: " + textStatus, 'Error', 'Aceptar');
    });
}
//fin finanzas

/*
Funciones de empresas privada
 */
function busquedaEmpresaSeguridadPrivada(nombreEmpresa){
    showModal();
    $("#resultadoBusquedaEmpresa").empty();
    var request = $.ajax({
        timeout:30000,
        url: "http://201.144.220.174/seguridad_privada/api/busca_empresa",
        type: "POST",
        data: {
            nombre_empresa: nombreEmpresa
        },
        dataType: "json"
    });
    request.done(function(msg) {
        //alert(msg[0].Nombre);
        for (var i = 0; i < msg.length; i++) {
            $("#resultadoBusquedaEmpresa").append('<li><a onclick="setGlobal(\''+msg[i].Nombre+'\', \''+msg[i].Expediente+'\', '+msg[i].idEmpresa+');" data-transition="none" href="#detalleSeguridadPrivada" class="puntos_encontrados"><h2>' + msg[i].Nombre + '</h2><p>' + msg[i].vigenciaHumano + '</p></a></li>');
        };
        $("#resultadoBusquedaEmpresa").listview('refresh');
        $.mobile.loading( "hide" );
    });      
    request.fail(function(jqXHR, textStatus) {
        //Si existe un error, lo muestra.
        $.mobile.loading( "hide" );
        alerta( "Se ha producido un error, por favor intente de nuevo en un momento: " + textStatus, 'Error', 'Aceptar');
    });
}