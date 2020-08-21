	var Activa = true;
	var Subrow = 0;
	var ActiveItem = 0;
	var Scroll = 0;
	$('body').bind("keydown", function(e){
		var column = $('.grid.active').attr('column');
		var row = $('.grid.active').attr('row');
		if(column == undefined){
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
				if(Subrow < 1){
					Subrow = Subrow + 1;
					ActualizaGrid(column, Subrow, Activa);
				}
				ActivaSubGrid(Subrow, ActiveItem, "right");
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
			if(ActiveItem == 0){
				Activa = true;
			}
			ActivaSubGrid(Subrow, ActiveItem, "left");
			if(ActiveItem == 0)
				ActualizaGrid(column, row, Activa, Subrow, Scroll);
		}
		else if(e.keyCode === 40){
			console.log('down');
			column = parseInt($('.grid.active').attr('column'));
			row = parseInt($('.grid.active').attr('row'))+1;
			if(Activa == false){
				if(Subrow < CounTop){
					Subrow = Subrow + 1;
					Scroll += 432.46;
					ActualizaGrid(column, Subrow, Activa, 0, Scroll);
					ActivaSubGrid(Subrow, ActiveItem, "down");
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
				if(Subrow > 0){
					Subrow = Subrow - 1;
					Scroll -= 432.46;
					ActualizaGrid(column, Subrow, Activa, 0, Scroll);
					ActivaSubGrid(Subrow, ActiveItem, "up");
				}
			}else{
				if(row != 0){
					ActualizaGrid(column, row, Activa);
				}
			}
		}
		else if(e.keyCode === 13){
			console.log('enter');
			if(Activa == false){
				//var subcolumn = $('.subgrid.active').attr('column');
				var subcolumn = $('.grid.active').attr('row');
				var subrow = $('.subgrid.active').attr('row');
				var PlatoId = $('#PlatoId_id_'+subcolumn+'_'+subrow).val();
				var nombrePlato = $('#PlatoNombre_'+subcolumn+'_'+subrow).val();
				var Tipo = utf8_to_b64(2);
				PlatoId = utf8_to_b64(PlatoId);
				window.location.replace("reserva.html?"+Tipo+"?"+PlatoId);
			}else{
				if(column=="1" && row=="4")
					redirect();
			}
		}
	})

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
	if($('.sidebar .restaurante').hasClass('itemselected')){
		console.log('rest');
	}else if($('.sidebar .spa').hasClass('itemselected')){
		console.log('spa');
	}
	var id_serv = 0;
	var ActivC = 1;
	var CounTop = 0;

/*	$( document ).ready(function() {
		//$("#tituloRestaurante").text(nombreRestaurante);
		//$("#imgRestaurante").attr("src",imagenResturante);
	});*/

	function changeService(type){
		var img_aux = $('.itemmenu.itemselected .item-background').attr('src');
		$('.img-rest').attr('src', img_aux);
		$('.contenido .fondo').hide();
		switch(type){
			case 'Desayuno':
				$('.contenido').css({
					"opacity" : "0",
					"transition" : "0.5s linear"
				});
				setTimeout(function(){
					$('.contenido .serv-rest h1').html('DESAYUNO');
					$('.contenido .Desayuno').show();
					$('.contenido .Almuerzo').hide();
					$('.contenido .Cena').hide();
					$('.contenido').css({
						"opacity" : "1",
						"transition" : "0.5s linear"
					});
					hidePreloader();
				},500);
				break;
			case 'Almuerzo':
				$('.contenido').css({
					"opacity" : "0",
					"transition" : "0.5s linear"
				});
				setTimeout(function(){
					$('.contenido .Almuerzo').show();
					$('.contenido .Desayuno').hide();
					$('.contenido .Cena').hide();
					$('.contenido').css({
						"opacity" : "1",
						"transition" : "0.5s linear"
					})
					hidePreloader();
				},500);
				break;
			case 'Cena':
				$('.contenido').css({
					"opacity" : "0",
					"transition" : "0.5s linear"
				});
				setTimeout(function(){
					$('.contenido .Cena').show();
					$('.contenido .Almuerzo').hide();
					$('.contenido .Desayuno').hide();
					$('.contenido').css({
						"opacity" : "1",
						"transition" : "0.5s linear"
					})
					hidePreloader();
				},500);
				break;
			default:
				break;
		}
	}
	var Url = window.location.href;
	var divisiones = Url.split("?");
	ServicioId = b64_to_utf8(divisiones[1]);

	$.ajax({
		url: URL_API_DISHES_BY_TYPE,
		type: 'GET',
		data: {
			bookingId : bookingId,
			serviceId : ServicioId
		},
		async: false,
		success : function (data) {
			var text = '';
			var StrData = JSON.stringify(data);
			var datars = utf8_to_b64(StrData)
			$("#serviceTypeText").text(data.result.serviceTypeName);
			$("#tituloRestaurante").text(data.result.serviceName);
			$("#imgRestaurante").attr("src",data.result.servicePhoto);
			data.result.dishTypes.forEach(function(value , key){
				var id = parseInt(key) + 1;
				var help = '';
				if(value.dishTypeId === 1){
					help = 'Desayuno';
				}else if(value.dishTypeId === 2){
					help = 'Almuerzo';
				}else if(value.dishTypeId === 3){
					help = 'Cena'
				}
				var html = '';
				//html += '<li class="itemmenu '+help+' grid" id="'+id+'_Inicio" column="1" row="'+id+'" data-type="'+value.name.toLowerCase()+'">';
				html += '<li class="itemmenu '+help+' grid" id="'+id+'_Inicio" column="1" row="'+id+'" data-type="'+value.name.toLowerCase()+'">';
				html += '   <div class="item" >';
				html += '       <p>'+value.name+'</p>';
				html += '   </div>';
				html += '</li>';

				text += '<div class="col-12 pl-5 serv-rest '+help+'" style="display: none;">';
				text += '</div>';
				text += '<div class="'+help+' col-12 pl-0 scrollbar" id="ScrollRes_'+id+'" data-type="'+help+'" style="display: none;">';
				text += '   <div class="col-12 pl-4 multi-rest">';
				value.dishes.forEach(function(serv, key){
					id_serv = parseInt(key) + 1;
					text += '   <input type="hidden" id="PlatoId_id_'+id+'_'+id_serv+'"   name="PlatoId-id" value="'+serv.dishId+'">';
					text += '   <input type="hidden" id="PlatoNombre_'+id+'_'+id_serv+'"   name="PlatoNombre" value="'+serv.name+'">';
					text += '   <input type="hidden" id="DataService" id="DataService" value="'+datars+'">';
					text += '   <div class="card-box row subgrid" column="2" row="'+id_serv+'" >';
					//text += '   	<div class="'+value.name+' col-12 pl-0 m-4 scrollbar" id="style-2" style="display: none;">';
					text += '   	<div class="'+help+' col-12 pl-0 m-4 scrollbar" id="style-2" style="display: none;">';
					//text += '   	<div class="'+value.nombre+' col-12 pl-0 scrollbar" id="style-2" style="display: none;">';
					text += '   		<div class="col-12">';
					text += '   			<div class="card-box p-4 grid" column="2" row="1">';
					text += '   				<h1>'+serv.name+'</h1>';
					text += '   				<div class="info">';
					text += '       				<img src="'+serv.photo+'" class="rest-img">';
					text += '   					<div class="rest-info pl-4">';
					text += '   						<p>';
					text += 								serv.description.replace(",\r\n","<br>");
					// text += '   							Lun-Vie de 6:00 am a 10:00 am<br>';
					// text += '   							Sab-Dom de 6:00 am a 11:00 am';
					text += '   						</p>';
					text += '   						<div class="buttons">';
					//text += '   							<a href="#" class="btn btn-primary more-info grid" item="1">Más información</a>';
					text += '   							<a href="reserva.html" class="btn btn-primary reserva grid changebutton" item="2">Reservar</a>';
					text += '   						</div>';
					text += '   					</div>';
					text += '   				</div>';
					text += '   			</div>';
					text += '   		</div>';
					text += '   	</div>';
					text += '   </div>';
				});
				for(var i = 0; i <1 ; i++){
					text += '<div class="card-box row subgrid" column="1" style="height: 150px;">';
					text += '   <h1 style="width: 100%"></h1>';
					text += '   <div class="info">';
					text += '   </div>';
					text += '</div>';
				}
				text += '   </div>'
				text += '</div>';
				$(".main-list .sidebar").append(html);
			})
			$("#Contenido").append(text);
			showPreloader();
			changeService('Desayuno');
		}
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
		$(".changebutton").text(value.restaurantButtonText);
		hidePreloader();
	}).fail(function () {
		hidePreloader();
	});

	function utf8_to_b64( str ) {
		return window.btoa(unescape(encodeURIComponent( str )));
	}

	function b64_to_utf8( str ) {
		return decodeURIComponent(escape(window.atob( str )));
	}

	function InfoRedirect(Subrow, Tipo){
		var dta = b64_to_utf8($('#DataService').val());
		var MyObjt = JSON.parse(dta);
		MyObjt = MyObjt.result.dishTypes;
		var data, TipoPlatoId, PlatoId;
		var c;
		if(ActivC != 0)
			c = ActivC - 1;
		else
			c = ActivC;
		var CountTot = 0;
		var RowCount = 1;
		for (var j in MyObjt[c]) {
			TipoPlatoId = MyObjt[c]["dishTypeId"];
			if (TipoPlatoId == ActivC) {
				var Servicio = MyObjt[c]["dishes"];
				CountTot = Servicio.length;
				for (var g in Servicio) {
					if (RowCount == Subrow) {
						PlatoId = Servicio[g]["dishId"];
					}
					RowCount++;
				}
			}
		};
		if(Tipo == 1)
			return CountTot;
		else (Tipo == 2)
		return PlatoId;
	}

	function redirect(){
		window.location.replace("servicios.html");
	}

	function ActualizaGrid(column, row, Activa, Subrow, Scroll){
		if(Activa != false){
			showPreloader();
			$('.grid').removeClass('active');
			$('.grid').removeClass('itemselected');
			$('.grid[column=1][row='+row+']').addClass('active');
			$('.grid[column=1][row='+row+']').addClass('itemselected');
			if($('.sidebar .Desayuno').hasClass('itemselected')){
				changeService('Desayuno');
				ActivC = 1;
			}
			else if($('.sidebar .Almuerzo').hasClass('itemselected')){
				changeService('Almuerzo');
				ActivC = 2;
			}
			else if($('.sidebar .Cena').hasClass('itemselected')){
				changeService('Cena');
				ActivC = 3;
			}
			/*else if($('.sidebar .servicios1').hasClass('itemselected')){
				changeService('s1');
			}
			else if($('.sidebar .servicios2').hasClass('itemselected')){
				changeService('s2');
			}*/else{
				hidePreloader();
			}
			$('.subgrid').removeClass('active');
			$('.subgrid[column=2][row='+Subrow+']').addClass('active');
		}else{
			CounTop = InfoRedirect(row,1);
			if($('.sidebar .Desayuno').hasClass('itemselected'))
				if(Subrow != 0)
					$('.contenido .Desayuno').show();
			$('.subgrid').removeClass('active');
			$('.subgrid[column=2][row='+row+']').addClass('active');
		}
		$("#ScrollRes_"+ActivC).animate({ scrollTop: Scroll }, (CounTop * 50));
	}

	function showPreloader() {
		$("#loader-wrapper").removeClass("Oculto").addClass("Activo");
	}

	function hidePreloader() {
		$("#loader-wrapper").removeClass("Activo").addClass("Oculto");
	}



