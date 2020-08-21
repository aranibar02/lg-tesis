var estanciaId = 4;
var signageCodigo = "123456789";
var cuentaId = 1;
var habitacionId = "101";
var nombreHuesped = "";
var nombreHuespedCompleto = "";
var mensajeEstanciaActiva = "Estancia activa";
var mensajeEstanciaInactiva = "Estancia inactivo";
var estanciaActiva = false;

function GetEstanciaData(){
    $.ajax({
        url: 'https://tp-ires-api.azurewebsites.net/v1/management/signage/'+signageCodigo,
        type: 'GET',
        async: false,
        timeout: 15000,
    }).done(function(data){
        var value = data.result;
        if(data.statusCode == 200){
            if(data.message === mensajeEstanciaInactiva){
                window.location.replace("screensaver.html");
                estanciaActiva = false;
            }else if(data.message === mensajeEstanciaActiva){
                nombreHuesped = value.cliente.Nombre;
                nombreHuespedCompleto = value.cliente.NombreCompleto;
                estanciaId = value.estanciaId;
                cuentaId = value.cuentaId;
                estanciaActiva = true;
            }
        }else{
            estanciaActiva = false;
            window.location.replace("screensaver.html");
        }
    }).fail(function () {
    });
}
