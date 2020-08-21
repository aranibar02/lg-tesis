
var onlist = false;
var Activa = true;
var Subcolumn = 1;
var Subrow = 0;
var TotalRows = 0;
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
		Activa = false;
        column = parseInt($('.grid.active').attr('column'));
        row = 1;
		Subrow = 0;
		//$('.grid[column=1][row="4"]').removeClass('active');
		//$('.grid[column=1][row='+row+']').addClass('active');
    }
	else if(e.keyCode === 37){
        console.log('left');
		Activa = true;
        column = parseInt($('.grid.active').attr('column'));
        row = 4;
		Subrow = 0;
		$('.grid[column=1][row="1"]').removeClass('active');
		$('.grid[column=1][row='+row+']').addClass('active');
    }
	else if(e.keyCode === 40){
        console.log('down');
        column = parseInt($('.grid.active').attr('column'));
        row = parseInt($('.grid.active').attr('row'))+1;
        if(Subrow <= TotalRows){
            Subrow = Subrow + 1;
            var ScrollDown	= Subrow*140;
            $("#ScrollRes").animate({ scrollTop: ScrollDown }, (300));
        }
    }
	else if(e.keyCode === 38){
        console.log('up');
        column = parseInt($('.grid.active').attr('column'));
        row = parseInt($('.grid.active').attr('row'))-1;
		if(Subrow > 0){
            Subrow = Subrow - 1;
            var ScrollUp	= Subrow*140;
            $("#ScrollRes").animate({ scrollTop: ScrollUp }, (300));
        }
    }
	else if(e.keyCode === 13){
        console.log('enter');
		redirect();
    }
})

if($('.sidebar .restaurante').hasClass('itemselected')){
    console.log('rest');
}else if($('.sidebar .spa').hasClass('itemselected')){
    console.log('spa');
}
var ActivC = 1;

GetEstanciaData();


$.ajax({
    url: URL_API_CONFIGURATION,
    type: 'GET',
    data : {
        bookingId : bookingId
    },
    async: false,
    timeout: 60000,
}).done(function(data){
    value = data.result;
    $("#moduleTitle").text(value.fifhtSubModuleName);
    hidePreloader();
}).fail(function () {
    hidePreloader();
});

$.ajax({
    url: URL_API_ACCOUNT_BY_BOOKING,
    data:{
        bookingId: bookingId
    },
    type: 'GET',
    async: false,
    success : function(data){
        var text = '';
        var value = data.result;
        var help = '';

        var html = '';
        html += '   <div style="background: #efefef;padding: 10% ;color: #102042;" >';
        html += '       <h1>'+value.periodText+':</h1>';
        html += '       <h2>'+value.fechaFacturacion+'</h2>';
        html += '       <h1>'+value.amountHeader.split(' ')[0]+'</h1>';
        html += '       <h2>'+value.currencySymbol+' '+value.total.toFixed(2)+'</h2>';
        html += '   </div>';

        text += '<div class="col-12 pl-5 serv-rest '+help+'" style="display: none;">';
        text += '</div>';
        text += '<div class="'+help+' col-12 pl-0 "  data-type="'+help+'">';
        text += '   <div class="col-12 pl-4 multi-rest">';
        text += '   <h1 style="MARGIN: 2% 0;">'+value.accountHeader+'</h1>';
        text += '   <DIV style="background: #838383;    height: 100px;">';
        text += '       <DIV style="FLOAT: LEFT;padding: 2% 3%;font-size: 2em;    color: #FFFFFF;width: 15%;">'+value.dateHeader+'</DIV>';
        //text += '       <DIV style="FLOAT: LEFT;padding: 2% 3%;font-size: 2em;    color: #FFFFFF;width: 15%;">'+value.hourHeader+'</DIV>';
        text += '       <DIV style="FLOAT: LEFT;padding: 2% 3%;font-size: 2em;    color: #FFFFFF;width: 50%;text-align: center;">'+value.descriptionAccountHeader+'</DIV>';
        text += '       <DIV style="FLOAT: LEFT;padding: 2% 3%;font-size: 2em;    color: #FFFFFF;width: 10%;text-align: right;"">'+value.quantityHeader+'</DIV>';
        text += '       <DIV style="FLOAT: LEFT;padding: 2% 3%;font-size: 2em;    color: #FFFFFF;width: 25%;text-align: right;;">'+value.amountHeader+'</DIV>';
        text += '   </DIV>';
        text += '   <DIV  id="ScrollRes" data-type="'+help+'" style=" overflow-y: scroll; height:750PX;">';

        TotalRows = value.detallesCuenta.length;
        value.detallesCuenta.forEach(function(serv, key){
            var id_serv = parseInt(key) + 1;
            text += '   <input type="hidden" id="service_id_'+value.cuentaId+'_'+id_serv+'"   name="service-id" value="'+serv.detalleCuentaId+'">';
            text += '   <input type="hidden" id="service-type" name="service-type" value="'+serv.detalleCuentaId+'">';
            text += '   <DIV style="background:#d2d2d2;    height: 100px;width: 100%;margin: 3% 0;">';
            text += '       <DIV style="text-align: center;FLOAT: LEFT;padding: 2% 3%;font-size: 1.8em;    color: #102042;width: 15%;">'+serv.fechaTransaccion+'</DIV>';
            //text += '       <DIV style="text-align: center;FLOAT: LEFT;padding: 2% 3%;font-size: 1.8em;    color: #102042;width: 15%;">'+serv.horaTransaccion+'</DIV>';
            text += '       <DIV style="text-align: center; FLOAT: LEFT;padding: 2% 3%;font-size: 2em;    color: #102042;width: 50%;text-align: center;">'+serv.nombreProducto+'</DIV>';
            text += '       <DIV style="text-align: center;FLOAT: LEFT;padding: 2% 3%;font-size: 1.8em;    color: #102042;width: 10%;text-align: right;">'+serv.cantidad+'</DIV>';
            text += '       <DIV style="text-align: right;FLOAT: LEFT;padding: 2% 3%;font-size: 2em;    color: #102042;width: 25%;text-align: right;">'+serv.subTotal.toFixed(2)+'</DIV>';
            text += '   </DIV>';
        })
        text += '   </DIV>';
        text += '   </div>'
        text += '</div>';

        $(".main-list .sidebar").append(html);
        $(".contenido").append(text);
    }, error: function (xhr) {
        console.log(xhr)
    }
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