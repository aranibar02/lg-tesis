function ScrollRutina(IdScroll, Scroll, ScrollTime){
    $(IdScroll).animate({ scrollTop: Scroll }, (ScrollTime));
}
function CrearCookiesRutina(nombre, valor){
    $.cookie(nombre,valor,{path: '/HILTON/index.html' }); // path donde dejar la cookie
    $.cookie(nombre,valor, { expires: 7 }); // con fecha de expiración a los 7 dias
    $.cookie(nombre,valor, { path: '/', expires: 7 }); // con fecha de expiración a los 7 dias y path
    //Cookies.set(nombre, valor); //cookie de sesión
    //Cookies.set(nombre, valor,{expires: 5}); //cookie que caduca a los 5 días
}

function CrearCookie(nombre, valor){
	$.cookie(nombre,valor,{path: '/HILTON/index.html' }); // path donde dejar la cookie
	$.cookie(nombre,valor, { expires: 7 }); // con fecha de expiración a los 7 dias
	$.cookie(nombre,valor, { path: '/', expires: 7 }); // con fecha de expiración a los 7 dias y path
	//Cookies.set(nombre, valor); //cookie de sesión
	//Cookies.set(nombre, valor,{expires: 5}); //cookie que caduca a los 5 días
}
function LeerCookiesRutina(nombre){
    $.cookie(nombre);
    //Cookies.set(nombre); //cookie de sesión
}
function BorrarCookiesRutina(nombre){
    $.removeCookie(nombre);
    //Cookies.remove(nombre); //cookie de sesión
}


function setCookie(cname, cvalue, exdays) {
	var d = new Date();
	d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
	var expires = "expires=" + d.toUTCString();
	document.cookie = cname + "=" + cvalue + "; " + expires;
}

function getCookie(cname) {
	var name = cname + "=";
	var ca = document.cookie.split(';');
	for (var i = 0; i < ca.length; i++) {
		var c = ca[i];
		//while (c.chartAt(0) == ' ') c = c.substring(1);
		if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
	}
	return "";
}

function checkCookie(cname) {
	var resul = false;
	var username = getCookie(cname);
	if (username != "") {
	  	resul = username;
	}else{
		resul = false;
	}
	return resul;
}

function eliminarCookie(cname) {
	return document.cookie = cname + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}