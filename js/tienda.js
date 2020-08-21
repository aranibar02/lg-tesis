
var onlist = false;

var Activa = true;
var Subcolumn = 0;
var Subrow = 0;
var Scroll	= 0;
var ScrollUp	= 0;
var ScrollDown	= 0;
var ScrollValue = 500;
var cantidad = 1;
var currencySymbol = '';
var priceText = '';
var productText = '';

var ModalShow = false;
var ModalAct = 0;
var ConfAct = 2;


$('body').bind("keydown", function(e){
    var column = $('.grid.active').attr('column');
    var row = $('.grid.active').attr('row');

    if(column == undefined){
        $('.grid[column=1][row=1]').addClass('itemselected');
        $('.grid[column=1][row=1]').addClass('active');
        $('.subgrid[column=1][row=1]').addClass('itemselected');
        $('.subgrid[column=1][row=1]').addClass('active');
        $("#canvalue").html(1);
        $('.contenido .gym').show();
        $('.contenido .fondo').hide();

    }
    if(e.keyCode === 39){
        console.log('right');
        if(ModalAct == 1){
            ConfAct = 2;
            if($('#cantidadSpan').hasClass("active")){
                $('#ActiveModal1').addClass("active");
                $('#cantidadSpan').removeClass("active");
            }/* else if($('#ActiveModal1').hasClass("active")){
                $('#ActiveModal1').removeClass("active");
                $('#ActiveModal2').addClass("active");
                $('#cantidadSpan').removeClass("active");
            } */

        }else{
            Activa = false;
            column = parseInt($('.grid.active').attr('column'));
            row1 = parseInt($('.grid.active').attr('row'));
            row = parseInt($('.grid.active').attr('row'))+1;
            if(Activa == false){
                var colm = $("#Colum_"+row1).val();
                Subrow = Subrow + 1;
                if(colm >= Subrow){
                    Scroll	= (Scroll);
                    if((Subrow-1)%3===0 && Subrow >1){
                        Scroll	= (Scroll+1);
                    }
                    ScrollDown	= (Scroll*ScrollValue);
                    ActualizaGrid(column, row1, Activa, Subrow, ScrollDown);
                }else {
                    Subrow = Subrow - 1;
                }
            }else{
                if(row <= 3)
                    ActualizaGrid(column, row, Activa);
            }
        }
    }
    else if(e.keyCode === 37){
        //en el modal
        if( ModalAct == 1){
            Scroll	= 0;
            ConfAct = 1
            if($('#ActiveModal1').hasClass("active")){
                $('#ActiveModal1').removeClass("active");
                $('#cantidadSpan').addClass("active");
            }/* else if($('#ActiveModal2').hasClass("active")){
                $('#ActiveModal1').addClass("active");
                $('#ActiveModal2').removeClass("active");
                $('#cantidadSpan').removeClass("active");
            } */
        }else{
            //en la tienda principal
            column = parseInt($('.grid.active').attr('column'));
            row = parseInt($('.grid.active').attr('row'));
            if(Subrow > 1){
                Subrow = Subrow - 1;
                ActualizaGrid(column, Subrow, Activa, Subrow);
                if((Subrow-1)%3===0 && Subrow >1){
                    Scroll	= (Scroll-1);
                    ScrollDown	= (Scroll*ScrollValue);
                    ActualizaGrid(column, row, Activa, Subrow, ScrollDown);
                }
            }else{
                if(column==1){
                    Activa = true;
                }
                Subrow = 0;
                ActualizaGrid(column, row, Activa, Subrow);

            }
        }
    }
    else if(e.keyCode === 40){
        if(ModalAct != 1){
            column = parseInt($('.grid.active').attr('column'));
            row1 = parseInt($('.grid.active').attr('row'));
            row = parseInt($('.grid.active').attr('row'))+1;
            if(Activa == false){
                var colm = $("#Colum_"+row1).val();
                Subrow = Subrow + 3;
                if(colm >= Subrow){
                    Scroll	= (Scroll+1);
                    ScrollDown	= (Scroll*ScrollValue);
                    ActualizaGrid(column, row1, Activa, Subrow, ScrollDown);
                }else {
                    Subrow = Subrow - 3;
                }
            }else{
                if(row <= 6)
                    ActualizaGrid(column, row, Activa);
            }
        }else{
            cantidad = parseInt($('#canvalue').text());
            var Idprecio = $("#precio_id_"+row+"_"+Subrow).val();
            if($('#cantidadSpan').hasClass('active')){
                //alert("tienes :"+cantidad+" producto");
                if(cantidad == 1){
                    //alert("minimo alcanzado");
                }else{
                    cantidad--;
                }
                $("#canvalue").text(cantidad);
                actualizar(Idprecio,cantidad);
            }else if($('#ActiveModal1').hasClass("active")){
                ConfAct = 2;
                $('#ActiveModal2').addClass("active");
                $('#ActiveModal1').removeClass("active")
            }
        }
    }
    else if(e.keyCode === 38){
        if(ModalAct != 1){
            column = parseInt($('.grid.active').attr('column'));
            row1 = parseInt($('.grid.active').attr('row'));
            row = parseInt($('.grid.active').attr('row'))-1;
            if(Activa == false){
                var colm = "0";
                Subrow = Subrow - 3;
                if(colm < Subrow){
                    Scroll	= (Scroll-1);
                    ScrollUp = (Scroll*ScrollValue);
                    ActualizaGrid(column, row1, Activa, Subrow, ScrollUp);
                }else {
                    Subrow = Subrow + 3;
                }
            }else{
                if(row != 0){
                    ActualizaGrid(column, row, Activa);
                }
            }
        }else{
            cantidad = parseInt($('#canvalue').text());
            var Idprecio = $("#precio_id_"+row+"_"+Subrow).val();
            //aqui poner el stock
            var stock = 100;
            if($('#cantidadSpan').hasClass('active')){
                //alert("tienes :"+cantidad+" producto");
                if(cantidad == 10){
                    //alert("máximo alcanzado");
                }else{
                    cantidad++;
                }
                $("#canvalue").text(cantidad);
                actualizar(Idprecio,cantidad);
            }else if($('#ActiveModal2').hasClass("active")){
                $('#ActiveModal1').addClass("active");
                $('#ActiveModal2').removeClass("active");
            }


        }
    }
    else if(e.keyCode === 13){
        if(column=="1" && row=="6")
            redirect();
        else{
            if(Subrow!=0){
                var IdProducto = $("#service_id_"+row+"_"+Subrow).val();
                var Idnombre = $("#nombre_id_"+row+"_"+Subrow).val();
                var Idprecio = $("#precio_id_"+row+"_"+Subrow).val();
                cantidad = parseInt($("#canvalue").text());
                if(ModalShow == false){
                    AjaxConfirmar(IdProducto,Idnombre,Idprecio);
                    ConfAct = 1;
                    $('#cantidadSpan').removeClass("active");
                    $('#ActiveModal1').addClass("active");
                    $('#ActiveModal2').removeClass("active");
                    //$('.cancel-modal').addClass("active");
                    //$('.confirm-modal').removeClass("active");
                }
                else if(Activa == false){
                    $('#confirmModal').modal('hide');
                    ModalAct = 0;
                    ModalShow = false;
                    console.log("confact"+ConfAct);
                    if(ConfAct == 2 && $('#ActiveModal2').hasClass('active')){
                        AjaxComprar(IdProducto,cantidad);
                    }else{
                        cantidad = 1;
                        $("#canvalue").text(cantidad);
                    }
                }
            }

        }
    }
});



function AjaxConfirmar(productoId,nombreId,precioId){
    ModalShow = true;
    ModalAct = 1;
    precioId = parseFloat(precioId).toFixed(2);
    $("#Nombre").text(productText+": " +nombreId);
    $("#precio").text(priceText+": "+currencySymbol+" "+precioId);
    $('#confirmModal').modal('show');
}

function actualizar(precioId,cantidad){
    precioId = parseFloat(precioId).toFixed(2);
    precioId *=cantidad;
    $("#precio").text(priceText+": "+currencySymbol+" "+precioId.toFixed(2));
}

function AjaxComprar(productoId,cantidad){
    $.ajax({
        url: URL_API_BUY_BY_BOOKING,
        type: 'POST',
        dataType:'json',
        contentType: 'application/json',
        async: false,
        data: JSON.stringify({
            bookingId: bookingId,
            productId: productoId,
            quantity: cantidad,
        }),
        success: function (msg, status, jqXHR) {
            //$('#confirm-message').html("Se agregó el producto a la cuenta.");
            $('#acceptModal').modal('show');
            var delay = 1500;
            setTimeout(function () {
                $('#acceptModal').modal('hide');
            },delay);
            /*          $('#ActiveModal1').addClass("active");
                      $('#ActiveModal2').removeClass("active");*/
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

var ActivC = 1;
function changeService(type){
    var img_aux = $('.itemmenu.itemselected .item-background').attr('src');
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
    $("#storeTitle").text(value.thirdModuleName);
    $("#buyConfirmationText").text(value.buyConfirmation);
    $("#buySucceded").text(value.buySucceded);
    $("#ActiveModal1").text(value.cancelButtonText);
    $("#ActiveModal2").text(value.buyButtonText);
    priceText = value.amountHeader;
    productText = value.accountHeader;
}).fail(function () {
});

$.ajax({
    url: URL_API_PRODUCTS_BY_TYPE,
    type: 'GET',
    data:{
        bookingId: bookingId
    },
    async: false,
}).done(function(data){
    var text = '';
    data.result.forEach(function(value , key){
        var id = parseInt(key) + 1;
        var help = '';
        var html = '';
        html += '<input type="hidden" id="ColumCategoria_'+id+'" value="'+value.productTypeId+'">';
        html += '<li class="itemmenu '+value.productTypeId+' grid" id="'+id+'_Inicio" column="1" row="'+id+'" data-type="'+value.productTypeId+'">';
        html += '   <img class="item-background" src="'+value.photo+'" style="display: none;">'
        html += '   <div class="item" >';
        html += '       <p>'+value.name+'</p>'
        html += '   </div>';
        html += '</li>';

        text += '<div class="col-12 pl-5 serv-rest '+value.productTypeId+'" style="display: none;">';
        text += '</div>';
        text += '<div class="'+value.productTypeId+' col-12 pl-0 scrollbar" id="ScrollRes_'+id+'" data-type="'+value.name+'" style="display: none;">';
        text += '   <div class="col-12 pl-4 multi-rest">';
        var count = 0;
        value.products.forEach(function(serv, key){
            currencySymbol = serv.currencySymbol;
            $("#precio").text("Precio: "+serv.currencySymbol);
            count = count + 1;
            var id_serv = parseInt(key) + 1;

            text += '<div class="card-box col-44 subgrid" Style="float:left" column="2" row="'+id_serv+'">';
            text += '   <input type="hidden" id="service_id_'+id+'_'+id_serv+'"   name="service-id" value="'+serv.productId+'">';
            text += '   <input type="hidden" id="nombre_id_'+id+'_'+id_serv+'"   name="nombre-id" value="'+serv.name+'">';
            text += '   <input type="hidden" id="precio_id_'+id+'_'+id_serv+'"   name="precio-id" value="'+serv.unitPrice+'">';
            text += '   <input type="hidden" id="service-type" name="service-type" value="'+value.tipoProductoId+'">';
            text += '   <div class="info" style="font-size: 26px;">';
            text += '       <img src="'+serv.photo+'" class="rest-img" style="width: 326px;object-fit:contain;background-color: white">';
            text += '       <div class="rest-info pl-4">';
            text += '           <div >'+serv.name+'</div>';
            text += '           <p class="precio">'+serv.currencySymbol+ ' '+serv.unitPrice.toFixed(2)+'</p>';
            text += '       </div>';
            text += '   </div>';
            text += '</div>';
        });
        for(var i = 0; i <1 ; i++){
            text += '<div class="card-box row subgrid" Style="float:left; height: 600px;" column="2">';
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

function valor(){
    ModalAct = 1;
    $('#ActiveModal1').addClass("itemselected");
    $("#confirmModal").modal('show');
    ModalShow = true;
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
        $("#ScrollRes_"+row).animate({ scrollTop: Scroll }, (300));
    }
}

function showPreloader() {
    $("#loader-wrapper").removeClass("Oculto").addClass("Activo");
}

function hidePreloader() {
    $("#loader-wrapper").removeClass("Activo").addClass("Oculto");
}