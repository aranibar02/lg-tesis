
var onlist = false;


var Activa = true;
var Subcolumn = 0;
var Subrow = 0;
var ActiveItem = 0;
var Scroll = 0;
var ScrollDown = 0;
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
        row = parseInt($('.grid.active').attr('row'));
        Subrow = 0;
        ScrollDown = 0;
        if(Activa == false){
            ActiveItem = ActiveItem + 1;
            //var colm = $("#Colum_"+row).val();
            if(Subrow < 1){
                Subrow = Subrow + 1;
                ActualizaGrid(column, row, Activa, Subrow, Scroll);
            }
        }else{
            if(ActiveItem == 0)
                if(row <= 3)
                    ActualizaGrid(column, row, Activa);
        }
    }
    else if(e.keyCode === 37){
        /*console.log('left');
        column = parseInt($('.grid.active').attr('column'));
        row = parseInt($('.grid.active').attr('row'));
        ActiveItem = ActiveItem - 1;
        ScrollDown = 0;
        if(ActiveItem == 0){
            Scroll = 0;
            Subrow = 0;
            Activa = true;
            ActualizaGrid(column, row, Activa, Subrow, Scroll);
        }
        if(ActiveItem != 0)
            ActualizaGrid(column, row, Activa, Subrow, Scroll);*/

        console.log('left');
        column = parseInt($('.grid.active').attr('column'));
        row = parseInt($('.grid.active').attr('row'));
        ActiveItem = ActiveItem - 1;
        ScrollDown = 0;
        Scroll = 0;
        Activa = true;
        Subrow = 0;
        ActualizaGrid(column, row, Activa, Subrow, Scroll);
    }

    else if(e.keyCode === 40){
        console.log('down');
		if(ModalAct != 1){
            column = parseInt($('.grid.active').attr('column'));
            row1 = parseInt($('.grid.active').attr('row'));
            row = parseInt($('.grid.active').attr('row'))+1;
            if(Activa == false){
                var colm = $("#Colum_"+row1).val();
                Subrow = Subrow + 1;
                if(colm >= Subrow){
                    Scroll	= (Scroll+1);
                    ScrollDown	+= 470;
                    ActualizaGrid(column, row1, Activa, Subrow, ScrollDown);
                    console.log("entro a if");
                }else {
                    Subrow = Subrow - 1;
                    console.log("entro a else");
                }
            }else{
                if(row <= 6)
                    ActualizaGrid(column, row, Activa);
            }
		}
    }
	else if(e.keyCode === 38){
        console.log('up');
		if(ModalAct != 1){
            column = parseInt($('.grid.active').attr('column'));  
            row1 = parseInt($('.grid.active').attr('row'));
            row = parseInt($('.grid.active').attr('row'))-1;
            if(Activa == false){
                var colm = "0";
                Subrow = Subrow - 1;
                if(colm < Subrow){
                    Scroll	= (Scroll-1);
                    ScrollDown	-= 470;
                    ActualizaGrid(column, row1, Activa, Subrow, ScrollDown);
                }else {                    
                    Subrow = Subrow + 1;
                }
            }else{
                if(row != 0){
                    ActualizaGrid(column, row, Activa);
                }
            }
        }
    }
	else if(e.keyCode === 13){
		if(column=="1" && row=="6")
			redirect();
    }
});
var ModalShow = false;
var ModalAct = 0;
var ConfAct = 0;
function AjaxConfirmar(productoId,nombreId,precioId){
    ModalShow = true;
    ModalAct = 1;
    precioId = parseFloat(precioId).toFixed(2);
    $("#Nombre").html("Producto: " +nombreId);
    $("#precio").html("Precio: S/ "+precioId);
    $('#confirmModal').modal('show');
}

function ActivaSubGrid(row, ActiveItem, Position){
	if(Position == "right")
		$('.subgrid[column="2"][row='+row+'] .grid[item='+(ActiveItem-1)+']').removeClass('active');
	else if(Position == "left")
		$('.subgrid[column="2"][row='+row+'] .grid[item='+(ActiveItem+1)+']').removeClass('active');
	else  if(Position == "down")
		$('.subgrid[column="2"][row='+(row-1)+'] .grid[item='+(ActiveItem)+']').removeClass('active');
	else  if(Position == "up")
		$('.subgrid[column="2"][row='+(row+1)+'] .grid[item='+(ActiveItem)+']').removeClass('active');

	$('.subgrid[column="2"][row='+row+'] .grid[item='+ActiveItem+']').addClass('active');
}

function redirect(){
	window.location.replace("index.html");
}

if($('.sidebar .restaurante').hasClass('itemselected')){
    console.log('rest');
}else if($('.sidebar .spa').hasClass('itemselected')){
    console.log('spa');
}
var ActivC = 1;
function changeService(type){
    var img_aux = $('.itemmenu.itemselected .item-background').attr('src');
    console.log(img_aux);
    $('.img-rest').attr('src', img_aux);
    $('.contenido .fondo').hide();
    switch(type){
        case '1':
            $('.contenido').css({
                "opacity" : "0",
                "transition" : "0.5s linear"
            });
            setTimeout(function(){
				$('.contenido .1').show();
                $('.contenido .2').hide();
                $('.contenido .3').hide();
                $('.contenido .4').hide();
                $('.contenido .5').hide();
                $('.contenido').css({
                    "opacity" : "1",
                    "transition" : "0.5s linear"
                })
				hidePreloader();
            },500);
            break;
        case '2':
            $('.contenido').css({
                "opacity" : "0",
                "transition" : "0.5s linear"
            });
            setTimeout(function(){
				$('.contenido .1').hide();
                $('.contenido .2').show();
                $('.contenido .3').hide();
                $('.contenido .4').hide();
                $('.contenido .5').hide();
                $('.contenido').css({
                    "opacity" : "1",
                    "transition" : "0.5s linear"
                })
				hidePreloader();
            },500);
            break;
        case '3':
            $('.contenido').css({
                "opacity" : "0",
                "transition" : "0.5s linear"
            });
            setTimeout(function(){
				$('.contenido .1').hide();
                $('.contenido .2').hide();
                $('.contenido .3').show();
                $('.contenido .4').hide();
                $('.contenido .5').hide();
                $('.contenido').css({
                    "opacity" : "1",
                    "transition" : "0.5s linear"
                })
				hidePreloader();
            },500);
            break;
        case '4':
            $('.contenido').css({
                "opacity" : "0",
                "transition" : "0.5s linear"
            });
            setTimeout(function(){
				$('.contenido .1').hide();
                $('.contenido .2').hide();
                $('.contenido .3').hide();
                $('.contenido .4').show();
                $('.contenido .5').hide();
                $('.contenido').css({
                    "opacity" : "1",
                    "transition" : "0.5s linear"
                })
				hidePreloader();
            },500);
            break;
        case '5':
            $('.contenido').css({
                "opacity" : "0",
                "transition" : "0.5s linear"
            });
            setTimeout(function(){
				$('.contenido .1').hide();
                $('.contenido .2').hide();
                $('.contenido .3').hide();
                $('.contenido .4').hide();
                $('.contenido .5').show();
                $('.contenido').css({
                    "opacity" : "1",
                    "transition" : "0.5s linear"
                })
				hidePreloader();
            },500);
            break;
        default:
            $('.contenido').css({
                "opacity" : "0",
                "transition" : "0.5s linear"
            });
            setTimeout(function(){
				$('.contenido .1').hide();
                $('.contenido .2').hide();
                $('.contenido .3').hide();
                $('.contenido .4').hide();
                $('.contenido .5').hide();
                $('.contenido').css({
                    "opacity" : "1",
                    "transition" : "0.5s linear"
                })
				hidePreloader();
            },500);
            break;
            break;
    }
}


$.ajax({
    //url: 'https://tp-ires-api.azurewebsites.net/v1/eventos/tipoevento',
    url: URL_API_EVENTS_BY_TYPE,
    type: 'GET',
    data:{
        bookingId : bookingId
    },
    async: false,
}).done(function(data){
    var text = '';
    value = data.result;
    value.forEach(function(categ, key){
        console.log(value);
        var help = '';
        var id = parseInt(key) + 1;
        var html = '';
		html += '<input type="hidden" id="ColumCategoria_'+id+'" value="'+categ.eventTypeId+'">';
        html += '<li class="itemmenu '+help+' grid" id="'+categ.eventTypeId+'_Inicio" column="1" row="'+categ.eventTypeId+'">';
        html += '   <div class="item" >';
        html += '       <p>'+categ.name+'</p>'
        html += '   </div>';
        html += '</li>';
        text += '<div class="col-12 pl-5 serv-rest '+categ.eventTypeId+'" style="display: none;">';
        text += '</div>';
        text += '<div class="'+categ.eventTypeId+' col-12 pl-0 scrollbar" id="ScrollRes_'+id+'" data-type="'+categ.name+'" style="display: none;">';
        text += '   <div class="col-12 pl-4 multi-rest">';

		var count = 0;
        categ.events.forEach(function(serv, key){
            count = count + 1;
            var id_serv = parseInt(key) + 1;
            text += '<div class="card-box p-4 subgrid" column="2" row="'+id_serv+'">';
            text += '   <h1>'+serv.name+'</h1>';
            text += '   <div class="info">';
            if(serv.photo != null){
                text += '           <span/>';
                text += '           <img src="'+serv.photo+'" class="rest-img"/>';
                text += '           </span>';
            }
            text += '       <div class="rest-info pl-4">';
            text += '           <p>'+serv.description+'</p>';
            text += '           <span class="datelabel">Fecha: </span><span>: '+serv.eventDate+'-</span><span class="hourlabel">Hora: </span><span>: '+serv.eventHour+'</span>';
            text += '       </div>';
            text += '   </div>'
            text += '</div>';
        });
        for(var i = 0; i <1 ; i++){
            text += '<div class="card-box row subgrid" column="2" style="height: 150px;">';
            text += '   <h1 style="width: 100%"></h1>';
            text += '   <div class="info">';
            text += '   </div>';
            text += '</div>';
        }
        text += '   </div>'
        text += '</div>';
		html += '<input type="hidden" id="Colum_'+id+'" value="'+count+'">';
        $(".main-list .sidebar").append(html);
    })
    $(".contenido").append(text);
    showPreloader();
    var Act = $("#ColumCategoria_1").val();
    changeService(Act);
});

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
    $("#eventTitle").text(value.eventTitle);
    $(".datelabel").text(value.dateText);
    $(".hourlabel").text(value.hourText);
    hidePreloader();
}).fail(function () {
    hidePreloader();
});


function valor(){
	ModalAct = 1;
	$('#ActiveModal1').addClass("itemselected");
	$("#confirmModal").modal('show');
	ModalShow = true;
}

function utf8_to_b64( str ) {
  return window.btoa(unescape(encodeURIComponent( str )));
}

function b64_to_utf8( str ) {
  return decodeURIComponent(escape(window.atob( str )));
}

function redirect(){
    //history.go(-1);
	window.location.replace("index.html");
}
function ActualizaGrid(column, row, Activa, Subrow, Scroll){
	if(Activa != false){
		showPreloader();
		$('.grid').removeClass('active');
		$('.grid').removeClass('itemselected');
		$('.grid[column=1][row='+row+']').addClass('active');
		$('.grid[column=1][row='+row+']').addClass('itemselected');
		if(row != 6){
			changeService($("#ColumCategoria_"+ row).val());
		}else{
			hidePreloader();
		}
		$('.subgrid').removeClass('active');
        $('.subgrid[column=2][row='+Subrow+']').addClass('active');

	}else{
		$('.subgrid').removeClass('active');
		$('.subgrid[column=2][row='+Subrow+']').addClass('active');
		$("#ScrollRes_"+row).animate({ scrollTop: Scroll }, (300));
	}
}

function showPreloader() {
    $("#loader-wrapper").removeClass("Oculto").addClass("Activo");
}

function hidePreloader() {
    $("#loader-wrapper").removeClass("Activo").addClass("Oculto");
}