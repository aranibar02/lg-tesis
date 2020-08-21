$(document).ready(function () {
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
        }
        if(e.keyCode === 39){
            console.log('right');
            Activa = false;
            column = parseInt($('.grid.active').attr('column'));
            $('.grid[column=1][row="4"]').removeClass('active');
        }
        else if(e.keyCode === 37){
            console.log('left');
            Activa = true;
            column = parseInt($('.grid.active').attr('column'));
            $('.grid[column=1][row=4]').addClass('active');
        }
        else if(e.keyCode === 40){
            console.log('down');
            column = parseInt($('.subgrid.active').attr('column'));
            row = parseInt($('.subgrid.active').attr('row'))+1;
            Subrow = Subrow + 1;
            var maxRow = $("#ColumMensaje").val();
            if(maxRow >= Subrow){
                ScrollDown += 471;
                var ScrollMax = 500;
                $("#ScrollRes").animate({ scrollTop: ScrollDown }, (ScrollMax));
                $('.subgrid').removeClass('active');
                $('.subgrid[column=2][row='+Subrow+']').addClass('active');
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

                ScrollDown -= 471;
                var ScrollMax = 500;
                $("#ScrollRes").animate({ scrollTop: ScrollDown }, (ScrollMax));
                $('.subgrid').removeClass('active');
                $('.subgrid[column=2][row='+Subrow+']').addClass('active');
            }else{
                Subrow = Subrow + 1;
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

    function createCORSrequest(method, url){
        var xhr = new XMLHttpRequest();
        if('withCredentials' in xhr){
            xhr.open(method,url,true);
        }else if(typeof XDomainRequest != "undefined" ){
            xhr = new XDomainRequest();
            xhr.open(method, url);
        }else{
            xhr = null;
        }
        return xhr;
    }

    showPreloader();

    /*$.ajax({
        url: URL_API_CONFIGURATION,
        type: 'GET',
        data : {
            bookingId : bookingId
        },
        async: true,
        timeout: 15000,
    }).done(function(data){*/

        //value = data.result;

        //var config = value;
        //$("#weatherTitle").text(value.fourthModuleName);
        hidePreloader();

        var url_api_darksky = "s";
        //var days = value.daysOfWeek.split(",");
        var lang = "es-ES";

        if (lang == "en-US"){
            url_api_darksky = "http://api.darksky.net/forecast/4dfacd70456b80963a3da6e0d7008666/-12.0431800,-77.0282400?&units=auto&exclude=minutely,hourly"
        } else if(lang == "es-ES"){
            url_api_darksky = "http://api.darksky.net/forecast/4dfacd70456b80963a3da6e0d7008666/-12.0431800,-77.0282400?lang=es&units=auto&exclude=minutely,hourly"
        }else if(lang == "pt-PT"){
            url_api_darksky = "http://api.darksky.net/forecast/4dfacd70456b80963a3da6e0d7008666/-12.0431800,-77.0282400?lang=pt&units=auto&exclude=minutely,hourly"
        }

        console.log(url_api_darksky);

        $.ajax({
            url: url_api_darksky,
            type: 'GET',
            async: true,
            crossDomain: true,
            dataType: 'jsonp'
        }).done(function(data){
            console.log(data);
            var text = '';
            value = data.daily;
            $("#Back").addClass("active");
            text += '<div class="col-12 pl-5 serv-rest">';
            text += '</div>';
            text += '<div class="col-12 pl-0 scrollbar" id="ScrollRes">';
            text += '   <div class="col-12 pl-4 multi-rest">';
            var count = 0;
            value.data.forEach(function(pronostico, key){
                var help = '';
                id = parseInt(key) + 1;
                var html = '';

                var fecha = new Date(pronostico.time*1000);
                //var weekday = days;

                //var ndia = weekday[fecha.getDay()];
                //var dia = fecha.getDate().toString().padStart(2,"0");
                var dia = fecha.getDate();
                //var mes = (fecha.getMonth()+1).toString().padStart(2,"0");
                var mes = (fecha.getMonth()+1);
                var anio = fecha.getFullYear();
                count = count + 1;

                var currentDay = ("0" + dia.toString()).slice(-2);
                var currentMonth = ("0" + mes.toString()).slice(-2);


                var id_serv = parseInt(key) + 1;
                text += '<div class="card-box subgrid" column="2" row="'+id_serv+'" style="padding 1.5rem">';
                text += '   <h1 style="padding: 6% 0 1% 2%;">'+currentDay+'/'+currentMonth+'/'+anio+'</h1>';
                text += '   <div class="info">';
                text += '       <img src="././icons/clima/'+pronostico.icon+'.png" class="rest-img">';
                text += '       <div class="rest-info pl-4">';
                text += '           <p class="infoclima">'+pronostico.summary+'</p>';
                text += '            <p id="minimumTemperatureText" class="infoclima">'+'Temperatura Mínima'+': '+Math.round(pronostico.temperatureLow)+' °C</p>';
                text += '            <p id="maximumWeatherText" class="infoclima">'+'Temperatura Máxima'+': '+Math.round(pronostico.temperatureHigh)+' °C</p>';
                text += '            <p id="humidityText" class="infoclima">'+'Humedad'+': '+pronostico.humidity*100+'%</p>';
                text += '       </div>';
                text += '   </div>';
                text += '</div>';
            });
            for(var i = 0; i <1 ; i++){
                text += '<div class="card-box row subgrid" column="2" style="height: 150px;">';
                text += '   <h1 style="width: 100%"></h1>';
                text += '   <div class="info">';
                text += '   </div>';
                text += '</div>';
            }
            text += '   <input type="hidden" id="ColumMensaje" value="'+count+'">';
            text += '   </DIV>';
            text += '   </div>'
            text += '</div>';

            $(".contenido").append(text);
            $('.subgrid[column=2][row=1]').addClass('active');
            hidePreloader();
        });


    /*})*/
    /*.fail(function () {
        $("#weatherTitle").text("Weather");
        hidePreloader();
    });*/

    /*$.ajax({
        url: 'https://api.darksky.net/forecast/4dfacd70456b80963a3da6e0d7008666/-12.0431800,-77.0282400?lang=es&units=auto&exclude=minutely,hourly',
        type: 'GET',
        async: true,
        crossDomain: true,
        dataType: 'jsonp'
    }).done(function(data){
        var text = '';
        value = data.daily;
        $("#Back").addClass("active");
        text += '<div class="col-12 pl-5 serv-rest">';
        text += '</div>';
        text += '<div class="col-12 pl-0 scrollbar" id="ScrollRes">';
        text += '   <div class="col-12 pl-4 multi-rest">';
        var count = 0;
        value.data.forEach(function(pronostico, key){
            var help = '';
            id = parseInt(key) + 1;
            var html = '';

            var fecha = new Date(pronostico.time*1000);
            var weekday = new Array(7);
            weekday[0] =  "Domingo";
            weekday[1] = "Lunes";
            weekday[2] = "Martes";
            weekday[3] = "Miercoles";
            weekday[4] = "Jueves";
            weekday[5] = "Viernes";
            weekday[6] = "Sábado";

            var ndia = weekday[fecha.getDay()];
            //var dia = fecha.getDate().toString().padStart(2,"0");
            var dia = fecha.getDate();
            //var mes = (fecha.getMonth()+1).toString().padStart(2,"0");
            var mes = (fecha.getMonth()+1);
            var anio = fecha.getFullYear();
            count = count + 1;

            var currentDay = ("0" + dia.toString()).slice(-2);
            var currentMonth = ("0" + mes.toString()).slice(-2);


            var id_serv = parseInt(key) + 1;
            text += '<div class="card-box subgrid" column="2" row="'+id_serv+'" style="padding 1.5rem">';
            text += '   <h1 style="padding: 6% 0 1% 2%;">'+ndia+', '+currentDay+'/'+currentMonth+'/'+anio+'</h1>';
            text += '   <div class="info">';
            text += '       <img src="././icons/clima/'+pronostico.icon+'.png" class="rest-img">';
            text += '       <div class="rest-info pl-4">';
            text += '           <p class="infoclima">'+pronostico.summary+'</p>';
            text += '            <p class="infoclima">Temperatura mínima: '+Math.round(pronostico.temperatureLow)+' °C</p>';
            text += '            <p class="infoclima">Temperatura máxima: '+Math.round(pronostico.temperatureHigh)+' °C</p>';
            text += '            <p class="infoclima">Humedad: '+pronostico.humidity*100+'%</p>';
            text += '       </div>';
            text += '   </div>';
            text += '</div>';
        });
        for(var i = 0; i <1 ; i++){
            text += '<div class="card-box row subgrid" column="2" style="height: 150px;">';
            text += '   <h1 style="width: 100%"></h1>';
            text += '   <div class="info">';
            text += '   </div>';
            text += '</div>';
        }
        text += '   <input type="hidden" id="ColumMensaje" value="'+count+'">';
        text += '   </DIV>';
        text += '   </div>'
        text += '</div>';

        $(".contenido").append(text);
        $('.subgrid[column=2][row=1]').addClass('active');
        hidePreloader();
    });*/

    function redirect(){
        window.location.replace("index.html");
    }
    function showPreloader() {
        $("#loader-wrapper").removeClass("Oculto").addClass("Activo");
    }

    function hidePreloader() {
        $("#loader-wrapper").removeClass("Activo").addClass("Oculto");
    }
});
