appInsights.trackEvent({name: 'Protector'});

$(document).ready(function () {

	$.ajax({
		//url: 'https://tp-ires-api.azurewebsites.net/v1/configuracion/1',
		url: URL_API_CONFIGURATION,
		type: 'GET',
		data : {
			bookingId : bookingId
		},
		async: true,
		timeout: 15000,
	}).done(function(data){
		value = data.result;
		$("#imglogo").attr('src', value.logoImage);
		$("#imgFondo").attr('src', value.screensaverImage);
		$("#nombreHuesped").text(value.guestName);
		$("#screensaverGreeting").text(value.screensaverGreeting);
		$("#location").text(value.screensaverPlace);
		$("#indication").text(value.screensaverIndication);
	}).fail(function () {
		$('#logo').attr('src','imagenes/logo.png');
		$("#imgFondo").attr('src', 'images/imgmain.jpg');
	});

/*
	$.ajax({
		//url: 'https://tp-ires-api.azurewebsites.net/v1/management/signage/'+signageCodigo ,
		url: 'https://tp-ires-api.azurewebsites.net/v1/management/signage/'+signageCodigo ,
		type: 'GET',
		async: false,
		timeout: 15000,
	}).done(function(data){
		var value = data.result;
		if(data.statusCode == 200){
			if(data.message === mensajeEstanciaInactiva){
				$("#nombreHuesped").text(" ");
			}else if(data.message === mensajeEstanciaActiva){
				$("#nombreHuesped").text(value.cliente.NombreCompleto);
				nombreHuesped = value.cliente.Nombre;
				nombreHuespedCompleto = value.cliente.NombreCompleto;
				estanciaId = value.estanciaId;
				cuentaId = value.cuentaId;
			}
		}else{
			$("#nombreHuesped").text(" ");
			estanciaId = 0;
		}
	}).fail(function () {
		$("#nombreHuesped").text(" ");
	});
*/



	$(document).bind('keydown', function(){
		window.location.replace("index.html");
	});
});