
var onlist = false;
var Activa = true;
var Subcolumn = 1;
var Subrow = 1;
var ScrollDown	= 0;
$('body').bind("keydown", function(e){
    var column = $('.grid.active').attr('column');
    var row = $('.grid.active').attr('row');
	if(column == undefined){
		console.log('undefined12');
		$('.grid[column=1][row=1]').addClass('itemselected');
		$('.grid[column=1][row=1]').addClass('active');
		$('.subgrid[column=1][row=1]').addClass('itemselected');
		$('.subgrid[column=1][row=1]').addClass('active');
		$('.contenido .gym').show();
		$('.contenido .fondo').hide();
	}
    if(e.keyCode === 39){
        console.log('right');
        Scroll = 0;
        //Subrow = 0;
		Activa = false;
        column = parseInt($('.grid.active').attr('column'));
    }
	else if(e.keyCode === 37){
        console.log('left');
		Activa = true;
        column = parseInt($('.grid.active').attr('column'));
        row = 4;
    }
	else if(e.keyCode === 40){
        console.log('down');
        column = parseInt($('.subgrid.active').attr('column'));
        row = parseInt($('.subgrid.active').attr('row'))+1;
        Subrow = Subrow + 1;
        var maxRow = $("#ColumMensaje").val();
        if(maxRow >= Subrow){
            ScrollDown	+= 470;
            var ScrollTime = 500;
            var IdScroll = "#ScrollRes";
            ScrollRutina(IdScroll, ScrollDown, ScrollTime);
            $('.subgrid').removeClass('active');
            $('.subgrid[column=1][row='+Subrow+']').addClass('active');
        }else{
            Subrow = Subrow - 1;
        }
    }
	else if(e.keyCode === 38){
        console.log('up');
        column = parseInt($('.subgrid.active').attr('column'));
        row = parseInt($('.subgrid.active').attr('row'))-1;
        Subrow = Subrow - 1;
        var maxRow = $("#ColumMensaje").val();
        if(Subrow > 0){
            ScrollDown -= 470;
            var ScrollTime = 500;
            var IdScroll = "#ScrollRes";
            ScrollRutina(IdScroll, ScrollDown, ScrollTime);
            $('.subgrid').removeClass('active');
            $('.subgrid[column=1][row='+Subrow+']').addClass('active');
        }else{
            Subrow = Subrow + 1;
        }
    }
	else if(e.keyCode === 13){
        console.log('enter');
		redirect();
    }
});

if($('.sidebar .restaurante').hasClass('itemselected')){
    console.log('rest');
}else if($('.sidebar .spa').hasClass('itemselected')){
    console.log('spa');
}
var ActivC = 1;

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
    $("#titlePage").text(value.thirdSubModuleName);
    hidePreloader();
}).fail(function () {
    hidePreloader();
});

$.ajax({
    //url: 'https://tp-ires-api.azurewebsites.net/v1/areashotel',
    url: URL_API_HOTEL_AREAS,
    type: 'GET',
    data:{
        bookingId : bookingId
    },
    async: false,
}).done(function(data){
    var text = '';
    value = data.result;
    console.log(value);

    $("#Back").addClass("active");
    text += '<div class="col-12 pl-5 serv-rest">';
    text += '</div>';
    text += '<div class="col-12 pl-0 scrollbar" id="ScrollRes">';
    text += '   <div class="col-12 pl-4 multi-rest">';
    var count = 0;
    value.forEach(function(categ, key){
        count = count + 1;
        var id_serv = parseInt(key) + 1;

        text += '<div class="card-box p-4 subgrid" column="1" row="'+id_serv+'">';
        text += '   <h1>'+categ.name+'</h1>';
        text += '   <div class="info">';
        if(categ.photo != null){
            text += '        <img src="'+categ.photo+'" class="rest-img">';
        }
        text += '       <div class="rest-info pl-4">';
        text += '            <p>'+categ.description+'</p>';
        text += '       </div>';
        text += '   </div>'
        text += '</div>';
    });

    for(var i = 0; i <1 ; i++){
        text += '<div class="card-box row subgrid" column="1" style="height: 150px;">';
        text += '   <h1 style="width: 100%"></h1>';
        text += '   <div class="info">';
        text += '   </div>';
        text += '</div>';
    }
    text += '   <input type="hidden" id="ColumMensaje" value="'+count+'">';
    text += '   </div>';
    text += '   </div>';
    text += '</div>';

    $(".contenido").append(text);
    $('.subgrid[column=1][row=1]').addClass('active');
});
function utf8_to_b64( str ) {
  return window.btoa(unescape(encodeURIComponent( str )));
}

function b64_to_utf8( str ) {
  return decodeURIComponent(escape(window.atob( str )));
}
function redirect(){
	window.location.replace("index.html");
}
function showPreloader() {
    $("#loader-wrapper").removeClass("Oculto").addClass("Activo");
}

function hidePreloader() {
    $("#loader-wrapper").removeClass("Activo").addClass("Oculto");
}