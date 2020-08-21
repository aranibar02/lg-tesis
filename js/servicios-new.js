var moreInfoText = '';
$(document).ready(function () {
    var onlist = false;
    var Activa = true;
    var Subcolumn = 0;
    var Subrow = 0;
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
            Activa = false;
            column = parseInt($('.grid.active').attr('column'));
            row = parseInt($('.grid.active').attr('row'));
            Subrow = 0;
            ScrollDown = 0;
            if(Activa == false){
                if(Subrow < 1){
                    Subrow = Subrow + 1;
                    ActualizaGrid(column, Subrow, Activa);
                }
            }else{
                if(row <= 3)
                    ActualizaGrid(column, row, Activa);
            }
        }
        else if(e.keyCode === 37){
            console.log('left');
            Activa = true;
            column = parseInt($('.grid.active').attr('column'));
            row = parseInt($('.grid.active').attr('row'));
            ScrollDown = 0;
            Subrow = 0;
            ActualizaGrid(column, row, Activa, Subrow);
        }
        else if(e.keyCode === 40){
            console.log('down');
            column = parseInt($('.grid.active').attr('column'));
            var maxRow = $("#Colum_"+row).val();
            row = parseInt($('.grid.active').attr('row'))+1;
            if(Activa == false){
                Subrow = Subrow + 1;
                if(maxRow >= Subrow){
                    ScrollDown	+= 471.86;
                    console.log(ScrollDown)
                    ActualizaGrid(column, Subrow, Activa, 0, ScrollDown);
                }else{
                    Subrow = Subrow - 1;
                }
            }else{
                if(row <= 4)
                    ActualizaGrid(column, row, Activa);
            }
        }
        else if(e.keyCode === 38){
            console.log('up');
            column = parseInt($('.grid.active').attr('column'));
            row = parseInt($('.grid.active').attr('row'))-1;
            if(Activa == false){
                Subrow = Subrow - 1;
                if(Subrow > 0){
                    ScrollDown -= 471.86;
                    console.log(ScrollDown)
                    ActualizaGrid(column, Subrow, Activa, 0, ScrollDown);
                }else{
                    Subrow = Subrow + 1;
                }
            }else{
                if(row != 0){
                    ActualizaGrid(column, row, Activa);
                }
            }
        }
        else if(e.keyCode === 13){
            InfoRedirect();
        }
    })

    if($('.sidebar .restaurante').hasClass('itemselected')){
        console.log('rest');
    }else if($('.sidebar .spa').hasClass('itemselected')){
        console.log('spa');
    }
    var ActivC = 1;
    function changeService(type){
        //var img_aux = $('.itemmenu.itemselected .item-background').attr('src');
        var img_aux = $(".item-background_"+type).attr('src');
        $('.img-rest').attr('src', img_aux);
        $('.contenido .fondo').hide();
        switch(type){
            case 'restaurants':
                $('.contenido').css({
                    "opacity" : "0",
                    "transition" : "0.5s linear"
                });
                setTimeout(function(){
                    $('.contenido .serv-rest h1').html('GIMNASIO');
                    $('.contenido .restaurante').show();
                    $('.contenido .spa').hide();
                    $('.contenido .gym').hide();
                    $('.contenido').css({
                        "opacity" : "1",
                        "transition" : "0.5s linear"
                    });
                    hidePreloader();
                },500);
                break;
            case 'spa':
                $('.contenido').css({
                    "opacity" : "0",
                    "transition" : "0.5s linear"
                });
                setTimeout(function(){
                    $('.contenido .restaurante').hide();
                    $('.contenido .spa').show();
                    $('.contenido .gym').hide();
                    $('.contenido').css({
                        "opacity" : "1",
                        "transition" : "0.5s linear"
                    })
                    hidePreloader();
                },500);
                break;
            case 'gym':
                $('.contenido').css({
                    "opacity" : "0",
                    "transition" : "0.5s linear"
                });
                setTimeout(function(){
                    $('.contenido .serv-rest h1').html('GIMNASIO');
                    $('.contenido .restaurante').hide();
                    $('.contenido .spa').hide();
                    $('.contenido .gym').show();
                    $('.contenido').css({
                        "opacity" : "1",
                        "transition" : "0.5s linear"
                    })
                    hidePreloader();
                },500);
                break;
            case 's1':
                $('.contenido').css({
                    "opacity" : "0",
                    "transition" : "0.5s linear"
                });
                setTimeout(function(){
                    $('.contenido .serv-rest h1').html('SERVICIOS');
                    $('#ScrollRes .card-box h1').html('Servicio a la habitación');
                    $('#ScrollRes .card-box .info img').attr('src','service1.jpeg');
                    $('#ScrollRes .card-box .info .rest-info p').html('El spa ofrece un nuevo concepto de cuatro ambientes integrados, que incluyen el área de masajes, aguas termales, yoga y área de sauna privada para una o más personas');
                    $('.contenido').css({
                        "opacity" : "1",
                        "transition" : "0.5s linear"
                    })
                },500);
                hidePreloader();
                break;
            case 's2':
                $('.contenido').css({
                    "opacity" : "0",
                    "transition" : "0.5s linear"
                });
                setTimeout(function(){
                    $('.contenido .serv-rest h1').html('SERVICIOS');
                    $('#ScrollRes .card-box h1').html('Sala de juegos');
                    $('#ScrollRes .card-box .info img').attr('src','service2.jpg');
                    $('#ScrollRes .card-box .info .rest-info p').html('El spa ofrece un nuevo concepto de cuatro ambientes integrados, que incluyen el área de masajes, aguas termales, yoga y área de sauna privada para una o más personas');
                    $('.contenido').css({
                        "opacity" : "1",
                        "transition" : "0.5s linear"
                    })
                },500);
                hidePreloader();
                break;
            default:
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
        $("#servicesTitle").text(value.secondModuleName);
        moreInfoText = value.servicesButttonText;
        hidePreloader();
    }).fail(function () {
        hidePreloader();
    });

    $.ajax({
        //url: 'https://tp-ires-api.azurewebsites.net/v1/tiposervicios',
        url: URL_API_SERVICES_BY_TYPE,
        type: 'GET',
        data: {
            bookingId : bookingId
        },
        async: false,
    }).done(function(data){
        var text = '';
        var StrData = JSON.stringify(data);
        var datars = utf8_to_b64(StrData);
        data.result.forEach(function(value , key){
            var id = parseInt(key) + 1;
            var help = '';
            if(value.serviceTypeId === 1){
                help = 'gym';
            }else if(value.serviceTypeId === 3){
                help = 'restaurante';
            }else if(value.serviceTypeId === 2){
                help = 'spa'
            }
            var html = '';
            html += '<li class="itemmenu '+help+' grid" id="'+id+'_Inicio" column="1" row="'+id+'" data-type="'+value.name.toLowerCase()+'">';
            html += '   <img class="item-background_'+help+'" src="'+value.photo+'" style="display: none;">'
            html += '   <div class="item" >';
            html += '       <p>'+value.name+'</p>';
            html += '   </div>';
            html += '</li>';

            text += '<div class="col-12 pl-5 serv-rest '+help+'" style="display: none;">';
            text += '</div>';
            text += '<div class="'+help+' col-12 pl-0 scrollbar" id="ScrollRes_'+id+'" data-type="'+help+'" style="display: none;">';
            text += '   <div class="col-12 pl-4 multi-rest">';

            var count = 0;
            value.services.forEach(function(serv, key){
                count = count + 1;
                var id_serv = parseInt(key) + 1;
                text += '   <input type="hidden" id="DataService" value="'+datars+'">';
                text += '   <input type="hidden" id="service_id_'+id+'_'+id_serv+'"   name="service-id" value="'+serv.serviceId+'">';
                text += '   <input type="hidden" id="service-type" name="service-type" value="'+serv.serviceTypeId+'">';
                text += '<div class="card-box p-4 subgrid" column="2" row="'+id_serv+'">';
                text += '   <h1>'+serv.name+'</h1>';
                text += '   <div class="info">';
                if(serv.photo != null){
                    text += '       <img src="'+serv.photo+'" class="rest-img">';
                }
                text += '       <div class="rest-info pl-4">';
                text += '           <p>'+serv.description+'</p>';
                text += '       </div>';
                text += '       <div class="rest-infoDiv">';
                text += '           <button onclick="InfoRedirect()" class="btn btn-primary more-info">'+moreInfoText+'</a>';
                text += '       </div>';
                text += '   </div>'
                text += '</div>';
            })
            for(var i = 0; i <1 ; i++){
                text += '<div class="card-box row subgrid" column="1" style="height: 150px;">';
                text += '   <h1 style="width: 100%"></h1>';
                text += '   <div class="info">';
                text += '   </div>';
                text += '</div>';
            }
            text += '   <input type="hidden" id="Colum_'+id+'" value="'+count+'">';
            text += '   </div>';
            text += '</div>';

            $(".main-list .sidebar").append(html);
        })
        $(".contenido").append(text);
        showPreloader();
        changeService('gym');
    });

    function utf8_to_b64( str ) {
        return window.btoa(unescape(encodeURIComponent( str )));
    }

    function b64_to_utf8( str ) {
        return decodeURIComponent(escape(window.atob( str )));
    }
    function InfoRedirect(){
        var dta = b64_to_utf8($('#DataService').val());
        var MyObjt = JSON.parse(dta);
        MyObjt = MyObjt.result;
        var data, TipoServicioId, ServicioId,nombreServicio,fotoServicio;
        var c;
        if(ActivC != 0)
            c = ActivC - 1;
        else
            c = ActivC;
        var RowAct = 1;
        for (var j in MyObjt[c]) {
            TipoServicioId = MyObjt[c]["serviceTypeId"];
            if (TipoServicioId == ActivC) {
                var Servicio = MyObjt[c]["services"];
                for (var g in Servicio) {
                    if (RowAct == Subrow) {
                        ServicioId = Servicio[g]["serviceId"];
                        nombreServicio = Servicio[g]["name"];
                        fotoServicio = Servicio[g]["photo"]
                    }
                    RowAct++;
                }
            }
        };
        $("#service-id").val(ServicioId);
        $("#service-type").val(TipoServicioId);

        var nServicio = utf8_to_b64(nombreServicio);

        if(Activa == false){
            if(ActivC != 3){
                var Tipo = utf8_to_b64(1);
                var IdRef = utf8_to_b64(ServicioId);
                //window.location.replace("reserva.html?"+Tipo+"?"+IdRef+"?"+nServicio);
                window.location.replace("reserva.html?"+Tipo+"?"+IdRef);
            }else{
                var IdRef1 = utf8_to_b64(ServicioId)
                fotoServicio = utf8_to_b64(fotoServicio);
                //window.location.replace("restaurantes.html?"+IdRef1+"?"+nServicio+"?"+fotoServicio);
                window.location.replace("restaurantes.html?"+IdRef1);
            }
        }else{
            redirect();
        }
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
            if($('.sidebar .restaurante').hasClass('itemselected')){
                console.log('restaurantes');
                changeService('restaurants');
                ActivC = 3;
            }
            else if($('.sidebar .spa').hasClass('itemselected')){
                console.log('spa');
                changeService('spa');
                ActivC = 2;
            }
            else if($('.sidebar .gym').hasClass('itemselected')){
                console.log('gym');
                changeService('gym');
                ActivC = 1;
            }
            else if($('.sidebar .servicios1').hasClass('itemselected')){
                console.log('s1');
                changeService('s1');
            }
            else if($('.sidebar .servicios2').hasClass('itemselected')){
                console.log('s2');
                changeService('s2');
            }else{
                hidePreloader();
            }
            $('.subgrid').removeClass('active');
            $('.subgrid[column=2][row='+Subrow+']').addClass('active');
        }else{
            var ScrollTime = 500;
            var IdScroll = "#ScrollRes_"+ActivC;
            ScrollRutina(IdScroll, Scroll, ScrollTime)
            //$("#ScrollRes_"+ActivC).animate({ scrollTop: Scroll }, (500));
            $('.subgrid').removeClass('active');
            $('.subgrid[column=2][row='+row+']').addClass('active');
            // $('.grid[column='+column+'][row=1]').addClass('active');
        }
    }

    function showPreloader() {
        $("#loader-wrapper").removeClass("Oculto").addClass("Activo");
    }

    function hidePreloader() {
        $("#loader-wrapper").removeClass("Activo").addClass("Oculto");
    }

    $("#1_Inicio").addClass("itemselected");
});

