
const connection = new WebSocket('ws://socket-app-ws.herokuapp.com');

connection.addEventListener('open', () => {
console.log('connected');
});



connection.addEventListener('message', e => {
    
    console.log(`enviado por amazon: ${e.data}`);
    let response = JSON.parse(e.data);
    let event = response.event
    let resource = ``;
    let param = response.param;
    let arrayURL = [];
    let url = '';

    switch(event){

        case 'view-service':
            if(param === 'restaurantes'){
                resource = `restaurantes.html`;
            }
            else if(param === 'spas'){
                resource = `spas.html`
            }
            else if(param === 'gimnasios'){
                resource = 'gyms.html'
            }
            else if(param === 'eventos'){
                resource = 'events.html'
            }
            else if(param === 'instalaciones'){
                resource = 'locals.html';
            }
            break;
        case 'find-service':
            let serviceTye = response.serviceType;
            if(serviceTye === 'restaurante'){
                resource = `restaurantes.html?${param}`;
            }else if(serviceTye === 'spa'){
                resource = `spas.html?${param}`;
            }else if(serviceTye === 'gimnasio'){
                resource = `gimns.html?${param}`;
            }else if(serviceTye === `instalacion`){
                resource = `locals.html?${param}`;
            }else if(serviceTye === `evento`){
                resource = `events.html?${param}`;
            }
            break;
        case 'view-restaurants':
            resource = `restaurantes.html`;
            break;
        case 'view-restaurant-by-name':
            resource = `restaurantes.html?${param}`;
            break;
        case 'show-booking-modal':
            //resource = `bookingHistory.html?${true}`;
            renderModal();
            break;
        case 'show-weather-forecast':
            resource = `clima.html`;
            break;
        case 'view-gyms':
            resource = `gyms.html`;
            break;
        case 'view-gym-by-name':
            resource = `gyms.html?${param}`
            break;
        case 'view-locals':
            resource = `locals.html`;
            break;
        case 'view-local-by-name':
            resource = `locals.html?${param}`
            break;
        case 'view-events':
            resource = `events.html`;
            break;
        case 'view-event-by-name':
            resource = `events.html?${param}`
            break;
        case 'view-spas':
            resource = `spas.html`
            break;
        case 'view-spa-by-name':
            resource = `spas.html?${param}`;
        case 'start-booking':
            resource = `reserva.html`;
            break;
        case 'edit-service': 
            arrayURL = windows.location.href.split('/');
            //resource = `reserva.html`;
            url = arrayURL[arrayURL.length - 1];
            console.log(url);
            if(url != 'reserva.html'){
                window.location.replace('reserva.html');
                resource = '';
            }
            $('#service-name').text(param)
            break;
        case 'edit-service-name':
            arrayURL = window.location.href.split('/');
            //resource = `reserva.html`;
            url = arrayURL[arrayURL.length - 1];
            console.log(`url : ${url}`);
            if(url != 'reserva.html'){
                window.location.replace('reserva.html');
                resource = '';
            }
            var service =  $('#service-name').text();
            var text = `${service} ${param}`;
            $('#service-name').text(text);
            break;
        case 'edit-service-date':
            arrayURL = window.location.href.split('/');
            //resource = `reserva.html`;
            url = arrayURL[arrayURL.length - 1];
            console.log(`url : ${url}`);
            if(url != 'reserva.html'){
                window.location.replace('reserva.html');
                resource = '';
            }
            var date_arg = param.split('-');
            $('#aniovalue').text(date_arg[0]);
            $('#mesvalue').text(date_arg[1]);
            $('#diavalue').text(date_arg[2]);
            break;
        case 'edit-service-hours':
            arrayURL = window.location.href.split('/');
            //resource = `reserva.html`;
            url = arrayURL[arrayURL.length - 1];
            console.log(`url : ${url}`);
            if(url != 'reserva.html'){
                window.location.replace('reserva.html');
                resource = '';
            }
            var hours_arg = param.split(':');
            $('#horavalue').text(hours_arg[0]);
            $('#minutovalue').text(hours_arg[1]);
            break;
        default:
            break;
    }

    if(resource != ``){
        window.location.replace(resource);
    }

/*console.log(e.data);
console.log(typeof e.data);
window.location.replace('restaurantes.html')
//window.location.replace('restaurantes.html');
render(response.data);
console.log(response.data);*/
});


function renderModal(){
    var html = `<div class="modal show" id="acceptModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
	            <div class="modal-dialog modal-lg" role="document">
		        <div class="modal-content">
			    <div class="modal-body">
				<img src="icons/confirm-icon.svg"/>
				<p id="reservationSuccededTxt" class="mt-5">¡Tu reserva se realizó con éxito!</p>
			    </div>
		        </div>
	            </div>
                </div>`

    $('body').append(html);  
    $('#acceptModal').modal('show');
}