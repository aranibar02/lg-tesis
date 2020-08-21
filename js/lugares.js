
var onlist = false;


var Activa = true;
var Subcolumn = 0;
var Subrow = 0;
var ActiveItem = 0;
var Scroll = 0;
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
        Scroll = 0;
        Subrow = 0;
        if(Activa == false){
            ActiveItem = ActiveItem + 1;
            var colm = $("#Colum_"+row).val();
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
                    ScrollDown	= (Scroll*470);
                    ActualizaGrid(column, row1, Activa, Subrow, ScrollDown);
                }else {                    
                    Subrow = Subrow - 1;
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
                    ScrollUp	= (Scroll*470);
                    ActualizaGrid(column, row1, Activa, Subrow, ScrollUp);
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
        console.log('enter');
		if(column=="1" && row=="6")
			redirect();
        /*else{
            var IdProducto = $("#service_id_"+row+"_"+Subrow).val();
            var Idnombre = $("#nombre_id_"+row+"_"+Subrow).val();
            var Idprecio = $("#precio_id_"+row+"_"+Subrow).val();            
            if(ModalShow == false)
                AjaxConfirmar(IdProducto,Idnombre,Idprecio);
            else if(Activa == false){
                $('#confirmModal').modal('hide');
                ModalAct = 0;
                ModalShow = false;
                if(ConfAct == 2){
                    AjaxComprar(IdProducto);
                }
            }
        }*/
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
    //AjaxComprar(productoId,nombreId,precioId);
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
function AjaxComprar(productoId){
    $.ajax({
        url: 'https://tp-ires-api.azurewebsites.net/v1/detallecuenta',
        type: 'POST',
        dataType:'json',
        contentType: 'application/json',
        async: false,
        data:  JSON.stringify({
            "cuentaId":1,
            "productoId":productoId,
            "cantidad":1,
            "dscto":0
        }),
        success: function (msg, status, jqXHR) {
            $('#confirm-message').html("Se agregó el producto a la cuenta.");
            $('#acceptModal').modal('show');
            var delay = 1500;
            setTimeout(function () {
                $('#acceptModal').modal('hide');
            },delay)
        },
        error: function (errorThrown) {
            console.log(errorThrown);
            $('#confirm-message').html("Ocurrió un problema, intentalo de nuevo");
        }
    });
    $('#acceptModal').modal('hide');
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
    url: URL_API_CONFIGURATION,
    type: 'GET',
    data : {
        bookingId : bookingId
    },
    async: false,
    timeout: 15000,
}).done(function(data){
    value = data.result;
    $("#placesTitle").text(value.secondSubModuleName);
    hidePreloader();
}).fail(function () {
    hidePreloader();
});

$.ajax({
    //url: 'https://tp-ires-api.azurewebsites.net/v1/lugaresinteres/lugarevento',
    url: URL_API_PLACES_BY_TYPE,
    type: 'GET',
    async: false,
    data : {
        bookingId : bookingId
    }
}).done(function(data){
    var text = '';
    value = data.result;
    console.log(value);
    value.forEach(function(categ, key){
        console.log(value);
        var help = '';
        var id = parseInt(key) + 1;
        var html = '';
		html += '<input type="hidden" id="ColumCategoria_'+id+'" value="'+categ.placeTypeId+'">';
        html += '<li class="itemmenu '+help+' grid" id="'+categ.placeTypeId+'_Inicio" column="1" row="'+categ.placeTypeId+'">';
        html += '   <div class="item" >';
        html += '       <p>'+categ.name+'</p>'
        html += '   </div>';
        html += '</li>';

        text += '<div class="col-12 pl-5 serv-rest '+categ.placeTypeId+'" style="display: none;">';
        text += '</div>';
        text += '<div class="'+categ.placeTypeId+' col-12 pl-0 scrollbar" id="ScrollRes_'+id+'" data-type="'+categ.name+'" style="display: none;">';
        text += '   <div class="col-12 pl-4 multi-rest">';

		var count = 0;
        categ.places.forEach(function(serv, key){
            count = count + 1;
            var id_serv = parseInt(key) + 1;
            var aux_img ;
            text += '   <input type="hidden" id="service_id_'+id+'_'+id_serv+'"   name="service-id" value="'+serv.placeId+'">';
            text += '   <input type="hidden" id="service-type" name="service-type" value="'+serv.placeId+'">';

            text += '<div class="card-box p-4 subgrid" column="2" row="'+id_serv+'">';
            text += '   <h1 style="padding: 4% 0 2.5% 2%;">'+serv.name+'</h1>';
            text += '   <div class="info">';
            if(serv.photo != null){
                text += '           <span/>';
                text += '           <img src="'+serv.photo+'" class="rest-img"/>';
                text += '           </span>';
            }
            text += '       <div class="rest-info pl-4">';
            text += '           <p>'+serv.description+'</p>';
            text += '       </div>';
            text += '   </div>';
            text += '</div>';
        })
        for(var i = 0; i <1 ; i++){
            text += '<div class="card-box row subgrid" column="1" style="height: 150px;">';
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
})

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
		$("#ScrollRes_"+row).animate({ scrollTop: Scroll }, (500));
	}
}

function showPreloader() {
    $("#loader-wrapper").removeClass("Oculto").addClass("Activo");
}

function hidePreloader() {
    $("#loader-wrapper").removeClass("Activo").addClass("Oculto");
}