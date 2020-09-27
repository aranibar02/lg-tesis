NomSecion = 'Index'
var CaseClick = 0;
var ModalAct = 0;
var i = 0;
var ModalShow = false;

var x = window.location.href.split("?");
var a = x.length > 1 ? x[1] : null;
var b = x.length > 2 ? x[2] : null;

const select_language_option = (past, current) => {
	past.removeClass('active');
	current.addClass('active');
	const languageId = Number(current.attr('language-id'));
	console.log(languageId);
	setTimeout(() => {
		change_language(languageId);
	}, 1000);
};


const select_currency_option = (past, current) => {
	past.removeClass('active');
	current.addClass('active');
	const currencyId = Number(current.attr('currency-id'));
	setTimeout(() => {
		change_currency(currencyId);
	}, 1000);
};


if(a){
	if(a.toString() === 'language'){
		LanguageMod();
		if(b){
			const past = $(`.langbtn.active`);
			const current = $(`.langbtn[language-id=${b}]`)
			
			select_language_option(past, current);
		}		
	}else if( a.toString() === 'currency'){
		CurrencyMod();
		if(b){
			const past = $(`.currbtn.active`);
			const current = $(`.currbtn[currency-id=${b}]`)

			select_currency_option(past, current);
		}
	}
};

const get_config_data = async() => {
	try{
		const response = await get(ENDPOINT_CHECK_IN(GUEST_ID), { method: 'GET'} );
		const data = response.data.length > 0 ? response.data[0].configuration : {};
		return data;
	}catch(ex){
		console.log(ex);
	}
};


$(document).bind("keydown", function (e) {
	console.log(e.wich);
	var $prev, $next, $current = $("ul li.itemselected");
	if (e.which === 40 ) {
		console.log("down ");
		down($current);

	} else if (e.which === 39) {
		console.log('right');
		right($next, $current);

	} else if (e.which === 37) {
		console.log('left');
		left($prev, $current);
	} else if (e.which === 38) {
		console.log('up');
		up($current);

	} else if (e.which === 13) {
		e.preventDefault();
		//debug
		console.log("modal activado ? :"+ModalShow);
		console.log("acto numero : "+ModalAct);
		console.log(" case click n : "+CaseClick);
		console.log("numero  elemento : "+i);
		//fin debug
		ingreso();
	}
});
function down($current){
	//entramos al modal
	//!$current.length ||
	if( ModalShow === true){
		if(ModalAct == 1){
			//InfoModal
			if($('#ActiveModalInfo1').hasClass("itemselected") || $('#ActiveModalInfo2').hasClass("itemselected") || $('#ActiveModalInfo4').hasClass("itemselected") ){
				$('#ActiveModalInfo3').addClass("active");
				CaseClick = 3;
				$('#ActiveModalInfo1').removeClass("itemselected");
				$('#ActiveModalInfo2').removeClass("itemselected");
				$('#ActiveModalInfo4').removeClass("itemselected");
				i = 0;
			}
		}else if(ModalAct === 2){
			//accountModal
			if($('#ActiveModal1').hasClass("itemselected") || $('#ActiveModal2').hasClass("itemselected")){
				CaseClick = 3;
				$('#ActiveModal3').addClass("active");
				$('#ActiveModal1').removeClass("itemselected");
				$('#ActiveModal2').removeClass("itemselected");
				i = 0;
			}

		}else if(ModalAct === 3){
			if($("#activeLanguage1").hasClass("active")){
				$("#activeLanguage2").addClass("active");
				$("#activeLanguage1").removeClass("active");
				$("#activeLanguage3").removeClass("active");
				CaseClick=2;
			}else if($("#activeLanguage2").hasClass("active")){
				$("#activeLanguage3").addClass("active");
				$("#activeLanguage1").removeClass("active");
				$("#activeLanguage2").removeClass("active");
				CaseClick=3;
			}
		}else if(ModalAct === 4){
			if($("#activeCurrency1").hasClass("active")){
				$("#activeCurrency2").addClass("active");
				$("#activeCurrency1").removeClass("active");
				$("#activeCurrency3").removeClass("active");
				CaseClick=2;
			}else if($("#activeCurrency2").hasClass("active")){
				$("#activeCurrency3").addClass("active");
				$("#activeCurrency1").removeClass("active");
				$("#activeCurrency2").removeClass("active");
				CaseClick=3;
			}
		}

	}else {
		//si esta afuera
		if($("#mnu_btn_1").hasClass("active")){
			$("#mnu_btn_2").addClass("active");
			$("#mnu_btn_1").removeClass("active");
		}else if($("#mnu_btn_2").hasClass("active")){
			$("#mnu_btn_1").removeClass("active");
			$("#mnu_btn_2").removeClass("active");
			$("ul li:first").addClass("itemselected");
		}
	}
}
function up($current){
	if(ModalShow == true){
		if(ModalAct == 3){
			if($("#activeLanguage2").hasClass("active")){
				$("#activeLanguage1").addClass("active");
				$("#activeLanguage2").removeClass("active");
				$("#activeLanguage3").removeClass("active");
				CaseClick=1;
			}else if($("#activeLanguage3").hasClass("active")){
				$("#activeLanguage2").addClass("active");
				$("#activeLanguage1").removeClass("active");
				$("#activeLanguage3").removeClass("active");
				CaseClick=2;
			}
		}else if(ModalAct == 4){
			if($("#activeCurrency2").hasClass("active")){
				$("#activeCurrency1").addClass("active");
				$("#activeCurrency2").removeClass("active");
				$("#activeCurrency3").removeClass("active");
				CaseClick=1;
			}else if($("#activeCurrency3").hasClass("active")){
				$("#activeCurrency2").addClass("active");
				$("#activeCurrency1").removeClass("active");
				$("#activeCurrency3").removeClass("active");
				CaseClick=2;
			}
		}else if(ModalAct === 1){
			if($("#ActiveModalInfo3").hasClass("active")){
				CaseClick=1;
				$('#ActiveModalInfo1').addClass("itemselected");
				$('#ActiveModalInfo2').removeClass("itemselected");
				$('#ActiveModalInfo4').removeClass("itemselected");
				$('#ActiveModalInfo3').removeClass("active");
			}
		}else if(ModalShow === 2){
			if($('#ActiveModal3').hasClass("active")){
				CaseClick=1;
				$('#ActiveModal1').addClass("itemselected");
				$('#ActiveModal2').removeClass("itemselected");
				$('#ActiveModal3').removeClass("active");
			}
		}
	}else{
		if($("#inicio").hasClass("itemselected") || $("#servicios").hasClass("itemselected") ||
			$("#tienda").hasClass("itemselected") || $("#serviciosexternos").hasClass("itemselected") ||
			$("#bandeja").hasClass("itemselected") || $("#cuenta").hasClass("itemselected")  ){
			$("#inicio").removeClass("itemselected");
			$("#servicios").removeClass("itemselected");
			$("#tienda").removeClass("itemselected");
			$("#serviciosexternos").removeClass("itemselected");
			$("#bandeja").removeClass("itemselected");
			$("#cuenta").removeClass("itemselected");
			//botones laterales
			$("#mnu_btn_1").removeClass("active");
			$("#mnu_btn_2").addClass("active");


		}else if($("#mnu_btn_2").hasClass("active")){
			$("#mnu_btn_1").addClass("active");
			$("#mnu_btn_2").removeClass("active");

		}
	}
}

function right($next, $current){
	if(ModalShow===true){
		if(ModalAct === 1){
			if($("#ActiveModalInfo1").hasClass("itemselected")){
				$('#ActiveModalInfo2').addClass("itemselected");
				$("#ActiveModalInfo1").removeClass("itemselected");
				CaseClick =2;
			}else if($("#ActiveModalInfo2").hasClass("itemselected")){
				$('#ActiveModalInfo4').addClass("itemselected");
				$("#ActiveModalInfo2").removeClass("itemselected");
				CaseClick =4;
			}
		}else if(ModalAct === 2){
			if($("#ActiveModal1").hasClass("itemselected")){
				CaseClick =2;
				$('#ActiveModal2').addClass("itemselected");
				$("#ActiveModal1").removeClass("itemselected");
			}
		}
	}else{
		$next = $current.next("li");
		if ($next.length) {
			$current.removeClass("itemselected");
			$next.addClass("itemselected");
		}

	}

}
function left($prev, $current){
	if(ModalShow == true){
		if(ModalAct === 1){
			if($("#ActiveModalInfo2").hasClass("itemselected")){
				$('#ActiveModalInfo1').addClass("itemselected");
				$("#ActiveModalInfo2").removeClass("itemselected");
				CaseClick =1;
			}else if($("#ActiveModalInfo4").hasClass("itemselected")){
				$('#ActiveModalInfo2').addClass("itemselected");
				$("#ActiveModalInfo4").removeClass("itemselected");
				CaseClick =2;
			}
		}else if(ModalAct === 2){
			if($("#ActiveModal2").hasClass("itemselected")){
				CaseClick =1;
				$('#ActiveModal1').addClass("itemselected");
				$("#ActiveModal2").removeClass("itemselected");
			}
		}
	}else {
		$prev = $current.prev("li");
		if ($prev.length) {
			$current.removeClass("itemselected");
			$prev.addClass("itemselected");
		}
	}
}
function ingreso(){
	if(ModalShow===true){
		if(ModalAct===1){
			if(CaseClick == 1)
				window.location.replace("events.html");
			else if(CaseClick == 2 )
				window.location.replace("placesInterest.html");
			else if(CaseClick == 4 )
				window.location.replace("facilities.html");
			else if(CaseClick == 3 ){
				closemodal("infoModal");
			}
		}else if(ModalAct === 2){
			if(CaseClick == 1)
				window.location.replace("lreserva.html");
			else if(CaseClick == 2 )
				window.location.replace("./shoppingSummary.html");
			else if(CaseClick == 3 ){
				closemodal("accountModal");
			}
		}else if(ModalAct === 3){
			console.log("se ha seleccionado un tipo de lenguaje");
			if($('#activeLanguage1').hasClass('active')){
				change_language(1);
				//cambiarIdioma(2);
			}else if($('#activeLanguage2').hasClass('active')){
				change_language(2);
				//cambiarIdioma(1);
			}else if($('#activeLanguage3').hasClass('active')){
				change_language(3);
				//cambiarIdioma(3);
			}
			closemodal("languageModal");
		}else if(ModalAct === 4){
			console.log("se ha seleccionado un tipo de moneda");
			if($('#activeCurrency1').hasClass('active')){
				//cambiarMoneda(2);
				change_currency(1);
			}else if($('#activeCurrency2').hasClass('active')){
				//cambiarMoneda(1);
				change_currency(2);
			}else if($('#activeCurrency3').hasClass('active')){
				//cambiarMoneda(3);
				change_currency(3);
			}
			closemodal("currencyModal");
		}
	}else{
		if($("#mnu_btn_1").hasClass("active")){
			LanguageMod();
		}else if($("#mnu_btn_2").hasClass("active")){
			CurrencyMod();
		}else{
			var seleccionado=$('li[class*="itemselected"]');
			exdays = 7;
			cvalue = seleccionado.attr("opcion");
			//setCookie(NomSecion, cvalue, exdays)
			switch(seleccionado.attr("opcion")){
				case "inicio":InfoTelo();
					console.log("inicio");break;
				case "servicios":
					window.location.replace("services.html");
					break;
				case "tienda":
					console.log("tienda");
					window.location.replace("./store.html");
					break;
				case "serviciosexternos":
					console.log("serviciosexternos");
					window.location.replace("clima.html");
					break;
				case "bandeja":
					window.location.replace("./touristicPlaces.html");
					break;
				case "cuenta":ModalActivo();console.log("cuenta");
					break;
			}
		}
	}
}
//Modal Informacion
function InfoTelo(){

	ModalAct = 1;
	CaseClick = 1;
	//$('#ActiveModalInfo1').addClass("itemselected");
	$('#ActiveModalInfo1').addClass("itemselected");
	$("#infoModal").modal('show');
	ModalShow = true;
}
//Modal cuenta
function ModalActivo(){
	ModalAct = 2;
	CaseClick = 1;
	$('#ActiveModal1').addClass("itemselected");
	//$('#ActiveModal1').addClass("itemselected");

	$("#accountModal").modal('show');
	ModalShow = true;
}
function LanguageMod(){
	ModalAct = 3;
	CaseClick = 1;
	$('#activeLanguage1').addClass("active");
	$("#languageModal").modal('show');
	ModalShow = true;
}
function CurrencyMod(){
	ModalAct = 4;
	CaseClick = 1;
	$('#activeCurrency1').addClass("active");
	$("#currencyModal").modal('show');
	ModalShow = true;
}
function closemodal($id){
	ModalShow = false;
	CaseClick = 0;
	if(ModalAct === 1){
		$('#ActiveModalInfo1').removeClass("itemselected");
		$('#ActiveModalInfo2').removeClass("itemselected");
		$('#ActiveModalInfo3').removeClass("active");
		$('#ActiveModalInfo4').removeClass("itemselected");
		ModalAct = 0;
	}else if(ModalAct === 2){

		$('#ActiveModal1').removeClass("itemselected");
		$('#ActiveModal2').removeClass("itemselected");
		$('#ActiveModal3').removeClass("active");
		$('#cuenta').removeClass("itemselected");
		ModalAct = 0;
	}else if(ModalAct === 3){
		$("#activeLanguage1").removeClass("active");
		$("#activeLanguage2").removeClass("active");
		$("#activeLanguage3").removeClass("active");
		$("#mnu_btn_1").removeClass("active");


		ModalAct = 0;
	}else if(ModalAct === 4){
		$("#activeCurrency1").removeClass("active");
		$("#activeCurrency2").removeClass("active");
		$("#activeCurrency3").removeClass("active");
		$("#mnu_btn_2").removeClass("active");
		ModalAct = 0;
	}
	$("#inicio").addClass("itemselected");
	$("#"+$id).modal("hide");

}

$(function(){
	var actualizarHora = function(){
		var fecha = new Date(),
			hora = fecha.getHours(),
			minutos = fecha.getMinutes(),
			segundos = fecha.getSeconds(),
			diaSemana = fecha.getDay(),
			dia = fecha.getDate(),
			mes = fecha.getMonth(),
			anio = fecha.getFullYear()

		var $pHoras = $("#horas"),
			$pSegundos = $("#segundos"),
			$pMinutos = $("#minutos"),
			$pAMPM = $("#ampm"),
			$pDiaSemana = $("#diaSemana"),
			$pDia = $("#dia"),
			$pMes = $("#mes"),
			$pAnio = $("#anio");
		var semana = ['Domingo','Lunes','Martes','Miercoles','Jueves','Viernes','Sabado'];
		var meses = ['enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre'];

		var currentDay = ("0" + dia.toString()).slice(-2);
		var currentMonth = ("0" + (mes+1).toString()).slice(-2);
		var currentHour = ("0" + hora.toString()).slice(-2);
		var currentMinute = ("0" + minutos.toString()).slice(-2);
		$pDiaSemana.text(semana[diaSemana]);
		$pDia.text(currentDay);
		$pMes.text(currentMonth);
		$pAnio.text(anio);
		$pHoras.text(currentHour);
		$pMinutos.text(currentMinute);
	};
	actualizarHora();
	var intervalo = setInterval(actualizarHora,1000);
});

showPreloader();

(async function () {
	const bookingConfig = await get_config_data();
	console.log(bookingConfig);
	const language = bookingConfig.language;
	$('#infoTxt').text(CONFIGURATION[`${language}`].module_information_name);
	$('#servicesTxt').text(CONFIGURATION[`${language}`].module_services_name);
	$('#storeTxt').text(CONFIGURATION[`${language}`].module_store_name);
	$('#weatherTxt').text(CONFIGURATION[`${language}`].module_weather_name);
	$('#accountTxt').text(CONFIGURATION[`${language}`].module_account_name);
	$('#eventTxt').text(CONFIGURATION[`${language}`].submodule_events_name);
	$('#placesTxt').text(CONFIGURATION[`${language}`].submodule_places_name);
	$('#facilitiesTxt').text(CONFIGURATION[`${language}`].submodule_facilities_name);
	$('#reservationsTxt').text(CONFIGURATION[`${language}`].submodule_booking_history_name);
	$("#accountStateTxt").text(CONFIGURATION[`${language}`].submodule_account_state_name);
	$('#langTitle').text(CONFIGURATION[`${language}`].submodule_language_header);
	$('#activeLanguage1').text(CONFIGURATION[`${language}`].submodule_language_spanish);
	$('#activeLanguage2').text(CONFIGURATION[`${language}`].submodule_language_english);
	$('#activeLanguage3').text(CONFIGURATION[`${language}`].submodule_language_portuguese);
	$("#currencyTitle").text(CONFIGURATION[`${language}`].submodule_currency_header);
	$("#activeCurrency1").text(CONFIGURATION[`${language}`].submodule_currency_soles);
	$("#activeCurrency2").text(CONFIGURATION[`${language}`].submodule_currency_dollar);
	$("#activeCurrency3").text(CONFIGURATION[`${language}`].submodule_currency_euro);
})();


$.ajax({
	url: URL_API_CONFIGURATION,
	type: 'GET',
	data : {
		bookingId : bookingId
	},
	async: false,
	timeout: 15000,
}).done(function(data){
	value = data.result;
	$("#imglogo").attr('src', value.logoImage);
	$('body').css('background-image', 'url("'+value.mainImage+'")');
	$("#eventTxt").text(value.firstSubModuleName);
	$("#placesTxt").text(value.secondSubModuleName);
	$("#facilitiesTxt").text(value.thirdSubModuleName);
	$("#reservationsTxt").text(value.fourtSubModuleName);
	$("#accountStateTxt").text(value.fifhtSubModuleName);
	$("#infoTxt").text(value.firstModuleName);
	$("#servicesTxt").text(value.secondModuleName);
	$("#storeTxt").text(value.thirdModuleName);
	$("#weatherTxt").text(value.fourthModuleName);
	$("#messagesTxt").text(value.fifthModuleName);
	$("#accountTxt").text(value.sixthModuleName);
	$("#langTitle").text(value.languageText);
	$("#activeLanguage1").text(value.englishLanguageText);
	$("#activeLanguage2").text(value.spanishLanguageText);
	$("#activeLanguage3").text(value.portugueseLanguageText);
	$("#currencyTitle").text(value.currencyText);
	$("#activeCurrency1").text(value.solesLanguageText);
	$("#activeCurrency2").text(value.dolarLanguageText);
	$("#activeCurrency3").text(value.euroLanguageText);
	hidePreloader();
}).fail(function () {
	$('#logo').attr('src','imagenes/logo.png');
	$("#imgFondo").attr('src', 'images/imgmain.jpg');
	hidePreloader();
});


$.ajax({
	url: 'https://api.darksky.net/forecast/4dfacd70456b80963a3da6e0d7008666/-12.0431800,-77.0282400?lang=es&units=auto&exclude=minutely,hourly',
	type: 'GET',
	async: true,
	crossDomain: true,
	dataType: 'jsonp'
}).done(function(data){
	value = data.currently;
	$(".temp").text(Math.round(value.temperature)+" °C")
});

function showPreloader() {
	$("#loader-wrapper").removeClass("Oculto").addClass("Activo");
}

function hidePreloader() {
	$("#loader-wrapper").removeClass("Activo").addClass("Oculto");
}

$(document).bind('mousemove click keydown', function(){
	clearTimeout(timer);
	preparetosleep();

});


const change_currency = async (code) => {
	try{
		showPreloader();
		let config = await get_config_data();
		switch(code){
			case 1:
				config.currency = 'soles';
				break;
			case 2:
				config.currency = 'dolares';
				break;
			case 3:
				config.currency = 'euros';
				break;
			default:
				break;
		}
		await post(ENDPOINT_CONFIGURATION, config);
		hidePreloader();
		window.location.replace("index.html");
	}catch(ex){
		console.log(ex);
	}
};

const change_language = async (code) => {
	try{
		showPreloader();
		let config = await get_config_data();
		switch(code){
			case 1:
				config.language = 'español';
				break;
			case 2:
				config.language = 'ingles';
				break;
			case 3:
				config.language = 'portugues';
				break;
			default:
				break;
		}
		console.log('guest config', config);
		await post(ENDPOINT_CONFIGURATION, config);
		hidePreloader();
		window.location.replace("index.html");
	}catch(ex){
		console.log(ex);
	}
};


function cambiarIdioma(codigo) {
	showPreloader();
	$.ajax({
		url: URL_API_CONFIGURATION_LANGUAGE,
		type: 'GET',
		data : {
			bookingId : bookingId,
			languageId: codigo
		},
		async: false,
		timeout: 20000,
	}).done(function(data){
		hidePreloader();
		console.log("ok");
		window.location.replace("index.html");
	}).fail(function () {
		hidePreloader();
		console.log("error");
		window.location.replace("index.html");
	});
}

function cambiarMoneda(codigo) {
	showPreloader();
	$.ajax({
		url: URL_API_CONFIGURATION_CURRENCY,
		type: 'GET',
		data : {
			bookingId : bookingId,
			currencyId: codigo
		},
		async: false,
		timeout: 20000,
	}).done(function(data){
		hidePreloader()
		window.location.replace("index.html");
	}).fail(function () {
		hidePreloader();
		window.location.replace("index.html");
	});
}

function preparetosleep(){
	timer = setTimeout(function(){
		window.location.replace("screensaver.html");
	}, 150000);
}
preparetosleep();


