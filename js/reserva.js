$(".confirm-reserva").on('click',function() {
    $("#confirmModal").modal('show');
});
var d = new Date();

var ActiveModal = false;
var Active = 0;
$('#ActiveModal1').addClass('active');
var day = d.getDate();
var month = d.getMonth()+1;
var year = d.getFullYear().toString().substr(-2);

var hour = d.getHours()+1;
var minute = "00";

var time = {
    day : day,
    month : month,
    year : year,
    hour : hour,
    minute : minute
}
function setTimeSelectors(time){
    $(".date .dia .value").html(time.day);
    $(".date .mes .value").html(time.month);
    $(".date .anio .value").html(time.year);
    $(".hour .hora .value").html(time.hour);
    $(".hour .minutos .value").html(time.minute);
}

setTimeSelectors(time);

$.ajax({
    url: URL_API_CONFIGURATION,
    type: 'GET',
    data : {
        bookingId : bookingId
    },
    async: false,
    timeout: 15000,
    success: function (data) {
        value = data.result;
        $("#bookIndication").text(value.reservationIndication);
        $("#dateTxt").text(value.dateText);
        $("#hourTxt").text(value.hourText);
        $("#bookBtn").text(value.restaurantButtonText);
        $("#cancelBtn").text(value.cancelButtonText);
        $("#pageTitle").text(value.restaurantButtonText);
        $("#reservationSuccededTxt").text(value.reservationSucceded);
        $("#dateValidationText").text(value.dateValidationText);
    }
});

var nombreServicio = "";
var nombrePlato = "";
var tipoPlato = "";
var restauranteId = "";
var reservationConfirmationMessage = "";
$(document).ready(function() {
    $("#diaSpan").addClass("active");
    var urlprincipal = window.location.href;
    var divs = urlprincipal.split("?");
    tipoServicio = b64_to_utf8(divs[1]);
    servicioId = b64_to_utf8(divs[2]);
    if(tipoServicio == 2){
        $.ajax({
            url: URL_API_DISH_BY_ID,
            data:{
                bookingId:bookingId,
                dishId:servicioId
            },
            type: 'GET',
            async: false,
            success : function (data) {
                nombreServicio = data.result.restaurantName;
                nombrePlato = data.result.name;
                tipoPlato = data.result.dishTypeName;
                restauranteId = data.result.restaurantId;
                $("#service-name").text(nombreServicio);
                $("#imgServicio").attr("src",data.result.photo);
                $("#mensajeReserva").text(data.result.reservationWelcome);
                reservationConfirmationMessage = data.result.reservationConfirmation;
            }
        });
    }else{
        $.ajax({
            url: URL_API_SERVICE_BY_ID,
            data:{
                bookingId:bookingId,
                serviceId:servicioId
            },
            type: 'GET',
            async: false,
            success : function (data) {
                nombreServicio = data.result.name;
                $("#service-name").text(nombreServicio);
                $("#mensajeReserva").text(data.result.reservationWelcome);
                $("#imgServicio").attr("src",data.result.photo);
                reservationConfirmationMessage = data.result.reservationConfirmation;
            }
        });
    }
});

$(".confirm-modal").on('click', function(){
    $("#confirmModal").modal('hide');
    $("#acceptModal").modal('show');
})

$(".cancel-reserva").on('click',function(){
    window.location.href = 'servicios.html';
})

$("body").on('click','.markers .icon-bf', function() {
    var type =  $(this).parent();
    var dia = parseInt($('.markers .dia .value').html());
    var mes = parseInt($('.markers .mes .value').html());
    var anio = parseInt($('.markers .anio .value').html());
    var hora = parseInt($('.markers .hora .value').html());
    var minuto = parseInt($('.markers .minutos .value').html());
    var arr1 = [1,3,5,7,8,10,12];
    var arr2 = [4,6,9,11];
    if(type.hasClass('dia')){        
       // if(arr1.includes(mes)){

             if(dia < 31) dia++;
        $('.markers .dia .value').html(dia);

    }else if(type.hasClass('mes')){
        if(mes < 12) mes++;
        $('.markers .mes .value').html(mes);
    }else if(type.hasClass('anio')){
        if(anio< 20)
        anio++;
        $('.markers .anio .value').html(anio);
    }else if(type.hasClass('hora')){
        if(hora < 23) hora++;
        $('.markers .hora .value').html(hora);
    }else if(type.hasClass('minutos')){
        if(minuto == 30) minuto = "00";
        else if(minuto == "00") minuto = 30;
        $('.markers .minutos .value').html(minuto);
    }
})

$("body").on('click','.markers .icon-af', function() {
    var type =  $(this).parent();
    var dia = parseInt($('.markers .dia .value').html());
    var mes = parseInt($('.markers .mes .value').html());
    var anio = parseInt($('.markers .anio .value').html());
    var hora = parseInt($('.markers .hora .value').html());
    var minuto = parseInt($('.markers .minutos .value').html());
    var arr1 = [1,3,5,7,8,10,12];
    var arr2 = [4,6,9,11];
    if(type.hasClass('dia')){        
        if(dia > 1) dia--;
        $('.markers .dia .value').html(dia);
    }else if(type.hasClass('mes')){
        if(mes > 1) mes--;
        $('.markers .mes .value').html(mes);
    }else if(type.hasClass('anio')){
        if(anio>19)
        anio--;
        $('.markers .anio .value').html(anio);
    }else if(type.hasClass('hora')){
        if(hora > 0) hora--;
        $('.markers .hora .value').html(hora);
    }else if(type.hasClass('minutos')){
        if(minuto == 30) minuto = "00";
        else if(minuto == "00") minuto = 30;
        $('.markers .minutos .value').html(minuto);
    }
})

function redirect(){
    window.location.replace("servicios.html");
}
$('body').bind("keydown", function(e){
    var column = $('.grid.active').attr('column');
    /*if(column == undefined){
        $('.grid[column=1][row=1]').addClass('itemselected');
        $('.grid[column=1][row=1]').addClass('active');
        $('.subgrid[column=1][row=1]').addClass('itemselected');
        $('.subgrid[column=1][row=1]').addClass('active');
    }*/
    if(e.keyCode === 39){
        if(ActiveModal == true){
            Active = 2;
            $('#ActiveModal1').removeClass('active');
            $('#ActiveModal2').addClass('active');
        }else{
            if(column == undefined){
                console.log('undefined12');
                $('.grid[column=1]').addClass('active');
            }else{
                column = parseInt($('.grid.active').attr('column'));
                if(column < 8){
                    column++;
                    $('.grid').removeClass('active');
                    $('.grid[column='+column+']').addClass('active');
                }
            }
        }
        console.log('right');
    }else if(e.keyCode === 40){
        console.log('down');
        $('.markers .grid.active .icon-af').click();
    }else if(e.keyCode === 37){
        console.log('left');
        if(ActiveModal == true){
            Active = 1;
            $('#ActiveModal2').removeClass('active');
            $('#ActiveModal1').addClass('active');
        }else{
            column = parseInt($('.grid.active').attr('column'));
            if(column > 1){
                column--;
                $('.grid').removeClass('active');
                $('.grid[column='+column+']').addClass('active');
            }
        }
    }else if(e.keyCode === 38){
        console.log('up');
        $('.markers .grid.active .icon-bf').click();
    }else if(e.keyCode === 13){
        console.log('enter');
        if(column == 8){
            //$('#confirmModal').modal('show');
            if(Active == 0){
                ActiveModal = true;
                Active = 1;
                var _dia = $("#diavalue").text();
                var _mes = $("#mesvalue").text();
                var _anio = $("#aniovalue").text();
                var _hora = $("#horavalue").text();
                var _minuto = $("#minutovalue").text();

                AjaxConfirmar(_dia,_mes,_anio,_hora,_minuto);
            }else if(Active == 1){
                ActiveModal=false;
                Active = 0;
                $("#confirmModal").modal('hide');
            }else{
                ActiveModal=false;
                AjaxReserva();
            }
        }
        else if(column == 7){
            if(tipoServicio == 1){
                window.location.replace("servicios.html")

            }else{
                window.location.replace("restaurantes.html?"+ utf8_to_b64(restauranteId));
            }
        }
        else if(column == 1)
			/*redirect();*/
            if(tipoServicio == 1){
                window.location.replace("servicios.html")

            }else{
                window.location.replace("restaurantes.html?"+ utf8_to_b64(restauranteId));
            }
    }
});

function AjaxConfirmar(d,m,y,h,min){

    if(d<10){
        d = "0"+d;
    }

    if(m<10){
        m = "0"+m;
    }

    if(h<10){
        h = "0"+h;
    }

    var auxFecha  = new Date('20'+ y +'-'+m+'-'+d+'T'+h+':'+min);
    var now = new Date();
    if (auxFecha<now){
        $('#fechaModal').modal('show');
        var delay = 2000;
        setTimeout(function () {
            $('#fechaModal').modal('hide');
        },delay);
        ActiveModal=false;
        Active = 0;
    }else{
        ModalShow = true;
        ModalAct = 1;

        var auxMessage = reservationConfirmationMessage;
        if(tipoServicio == 2){

            auxMessage = auxMessage.replace("{2}",d+"/"+m+"/"+y).replace("{3}",h+":"+min);
            /*$("#msjConfirmacion").text("¿Estás seguro que deseas realizar esta reserva de "+tipoPlato+" "
                +nombrePlato+" en el restaurant "+nombreServicio+" el "+d+"/"+m+"/"+y+" a las "+h+":"+min+ "?");*/
            $("#msjConfirmacion").text(auxMessage);
        }else{
            auxMessage = auxMessage.replace("{1}",d+"/"+m+"/"+y).replace("{2}",h+":"+min);
            //$("#msjConfirmacion").text("¿Estás seguro que deseas realizar esta reserva en "+nombreServicio+" el "+d+"/"+m+"/"+y+" a las "+h+":"+min+ "?");
            $("#msjConfirmacion").text(auxMessage);
        }
        $('#confirmModal').modal('show');
    }

}

function AjaxReserva(){
    $("#confirmModal").modal('hide');
	var Url = window.location.href;
	var divisiones = Url.split("?");
	var TipoId = b64_to_utf8(divisiones[1]);
	var PlatoId = 0;
    var ServicioId = 0;

    var _dia = $("#diavalue").html();
    var _mes = $("#mesvalue").html();
    var _anio = $("#aniovalue").html();
    var _hora = $("#horavalue").html();
    var _minuto = $("#minutovalue").html();

    if(_dia<10){
        _dia = "0"+_dia;
    }

    if(_mes<10){
        _mes = "0"+_mes;
    }

    if(_hora<10){
        _hora = "0"+_hora;
    }

    var FechaReserva  = '20'+ _anio +'-'+_mes+'-'+_dia+'T'+_hora+':'+_minuto;

    if(TipoId == 2){
        PlatoId = b64_to_utf8(divisiones[2]);
    }
	else{
        ServicioId = b64_to_utf8(divisiones[2]);
    }

	var params = {"servicioId": +parseInt(ServicioId), "platoId": parseInt(PlatoId), "fechaReserva": ""+FechaReserva+""};

    generarReserva(params);
}

function generarReserva(parametros) {
    $.ajax({
        url: URL_API_RESERVATION_POST_BY_BOOKING,
        type: 'POST',
        dataType:'json',
        contentType: 'application/json',
        async: false,
        data:  JSON.stringify({
            bookingId : bookingId,
            serviceId:parametros.servicioId,
            reservationDate:parametros.fechaReserva,
            dishId:parametros.platoId
        }),
        success: function (msg, status, jqXHR) {
            $('#acceptModal').modal('show');
           var delay = 2000;
            setTimeout(function () {
                window.location = "servicios.html";
            },delay)
        },
        error: function (errorThrown) {
            console.log(errorThrown);
            $("#msjConfirmacion").text("Ocurrió un error, intentalo de nuevo");
            $('#confirmModal').modal('show');
            var delay = 3500;
            setTimeout(function () {
                $('#confirmModal').modal('hide');
                window.location = window.location.href;
            },delay)
        }
    });
}
function utf8_to_b64( str ) {
  return window.btoa(unescape(encodeURIComponent( str )));
}

function b64_to_utf8( str ) {
  return decodeURIComponent(escape(window.atob( str )));
}
