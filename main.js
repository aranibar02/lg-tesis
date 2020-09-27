
const connection = new WebSocket('ws://socket-app-ws.herokuapp.com');

connection.addEventListener('open', () => {
console.log('connected');
});



connection.addEventListener('message', e => {
    console.log(`enviado por amazon: ${e.data}`);
    const response = JSON.parse(e.data);
    const screen = response.screen ? response.screen : null;
    const intent = response.intent ? response.intent : null;
    const parameters = response.parameters ? response.parameters : [];
    let redirect = false;
    

    console.log(`screen: ${response}`);
    console.log(`parameters length: ${parameters.length}`);

    let resource = ``;
    let param = response.param;
    let arrayURL = [];
    let url = '';
    let past;
    let current;
    const pathname = window.location.pathname.split("/").pop();

    let serviceType;
    let serviceTypeValue;
    let service;
    let serviceValue;
    let dishType;
    let dishTypeId;

    //#region general variables 
    let confirm;
    let confirmValue;
    //#endregion

    //#region store variables
    let productCategory;
    let productCategoryId;
    let product;
    let productId;
    //#endregion

    //#region facilities
    let facility;
    //#endregion

    //#region events variables
    let event;
    let eventId;
    //#endregion

    //#region restaurants variables
    let dish;
    let dishId;
    //#endregion



    switch(screen){
        case 'weathers':
            resource = `clima.html`;
            break;
        case 'currencies':
            const currency = parameters.find(x => x.name === `currency`);
            const currencyId = currency ? currency.value : null;
            
            if(parameters.length <=0){
                if(pathname.indexOf(`index.html`) === -1){
                    resource = `index.html?currency`;
                }else{
                    CurrencyMod();                   
                }
            }else{
                if(currencyId){
                    if(pathname.indexOf(`index.html`) === -1){
                        resource = `index.html?currency?${currencyId}`;
                    }else{
                        CurrencyMod();
                        past = $(`.currbtn.active`);
                        current = $(`.currbtn[currency-id=${currencyId}]`)

                        setTimeout(() => {
                            select_currency_option(past, current);    
                        }, 500);
                    }
                }
            }
            break;
        case `languages`:
            const language = parameters.find(x => x.name === `language`);
            const languageId = language ? language.value : null;
            
            if(parameters.length <=0){
                if(pathname.indexOf(`index.html`) === -1){
                    resource = `index.html?language`;
                }else{
                    LanguageMod();
                }
            }else{
                if(languageId){
                    if(pathname.indexOf(`index.html`) === -1){
                        resource = `index.html?language?${languageId}`;
                    }else{
                        LanguageMod();
                        past = $(`.langbtn.active`);
                        current = $(`.langbtn[language-id=${languageId}]`)
                        select_language_option(past, current);
                    }
                }
            }
            break;
        case `placesInterest`:
            const placeType = parameters.find(x => x.name === `placesType`);
            const placeTypeId = placeType ? placeType.value : null;

            const place = parameters.find(x => x.name === `place`);
            const placeId = place ? place.value : null;

            if(parameters.length <= 0) resource = `placesInterest.html`;
            else{
                if(placeTypeId && !placeId){
                    if(pathname.indexOf(`placesInterest.html`) === -1){
                        resource = `placesInterest.html?${placeTypeId}`;
                      }else{
                        past = $(`.itemmenu.itemselected`);
                        current = $(`.itemmenu[serial=${placeTypeId}]`)
                        select_item_menu(past, current); 
                      }
                }
                if(placeTypeId && placeId){
                    past = $(`.card-box.active`);
                    current = $(`.card-box[serial=${placeId}]`);
                    select_item_body(past, current);
                }
            }

            break;
        case `facilities`:
            facility = parameters.find(x => x.name === `facility`);
            facilityValue = facility ? facility.value : null;
            
            if(parameters.length <=0) resource = `facilities.html`;
            else {
                if(facilityValue){
                    past = $(`.card-box.active`);
                    current = $(`.card-box[serial=${facilityValue}]`);
                    select_item_body(past, current);
                }
            }
            break;
        case `bookingHistory`:
            if(parameters.length <=0) resource =  `lreserva.html`;
            break;
        case `restaurants`:

            const restaurant = parameters.find(x => x.name === `restaurant`);
            const restaurantId = restaurant ? restaurant.value : null;

            dishType = parameters.find(x => x.name === `dishType`);
            dishTypeId = dishType ? dishType.value : null;

            dish = parameters.find(x => x.name === `dish`);
            dishId = dish ? dish.value : null
            
            if(restaurantId && dishTypeId && !dishId){
                resource = `restaurants.html?${restaurantId}?${dishTypeId}`;
            }
            if(restaurantId && dishTypeId && dishId){
                past = $(`.card-box.active`);
                current = $(`.card-box[serial=${dishId}]`);
                select_item_body(past, current); 
            }
            break;
        case `booking`:

            serviceType = parameters.find(x => x.name === `serviceType`);
            serviceTypeValue = serviceType ? serviceType.value : null;
            
            service = parameters.find(x => x.name === `serviceId`);
            const serviceId = service ? service.value : null;

            dishType = parameters.find(x => x.name === `dishType`);
            dishTypeId = dishType ? dishType.value : null;

            dish = parameters.find(x => x.name === `dishId`);
            dishId = dish ? dish.value : null;

            const date = parameters.find(x => x.name === `date`);
            const dateValue = date ? date.value : null;
            
            const time = parameters.find(x => x.name === `time`);
            const timeValue = time ? time.value : null;

            confirm = parameters.find(x => x.name === `confirm`);
            confirmValue = confirm ? confirm.value : null;

            if(serviceTypeValue && !serviceId && !dateValue && !timeValue && !confirmValue){
                if(pathname.indexOf(`services.html`) === -1){
                    resource = `services.html?${serviceTypeValue}`;
                }else{
                    past = $(`.itemmenu.itemselected`);
                    current = $(`.itemmenu[topic=${serviceTypeValue}]`);
                    select_item_menu(past, current);
                }
            }
            if(serviceTypeValue && serviceId && !dateValue && !timeValue && !confirmValue){
                
                if(serviceTypeValue === 'restaurantes'){
                    if(!dishTypeId){
                        resource = `restaurants.html?${serviceId}`;
                    }else if(dishTypeId && !dishId){
                        if(pathname.indexOf(`restaurants.html`) === -1){
                            resource = `restaurants.html?${serviceId}?${dishTypeId}`;
                        }else{
                            past = $(`.itemmenu.itemselected`);
                            current = $(`.itemmenu[unique-key=${dishTypeId}]`);
                            select_item_menu(past, current);
                        }
                    }else if(dishTypeId && dishId){
                        resource = `booking.html?${serviceTypeValue}?${serviceId}?${dishId}?NULL?NULL`;
                    }   
                }else{
                    if(pathname.indexOf(`booking.html`) === -1){
                        resource = `booking.html?${serviceTypeValue}?${serviceId}?${dishId ? dishId : 'NULL'}?NULL?NULL`;
                    }else{
                        //change name label
                        set_service_name(serviceTypeValue, serviceId, dishId);
                    }
                }
            }
            if(serviceId && dateValue && !timeValue && !confirmValue){
                if(pathname.indexOf(`booking.html`) === -1){
                        resource = `booking.html?${serviceTypeValue}?${serviceId}?${dishId ? dishId : 'NULL'}?${dateValue}?NULL`;
                }else{
                        console.log("hola miundo estamos acpa");
                        set_service_name(serviceTypeValue, serviceId, dishId);
                        set_date(dateValue);
                        //change date
                }
            }
            if(serviceId && dateValue && timeValue && !confirmValue){
                if(pathname.indexOf(`booking.html`) === -1){
                        resource = `booking.html?${serviceTypeValue}?${serviceId}?${dishId ? dishId : 'NULL'}?${dateValue}?${timeValue}`;
                }else{
                        set_service_name(serviceTypeValue, serviceId);
                        set_date(dateValue);
                        console.log(timeValue);
                        set_time(timeValue);
                }
            }

            if(serviceId && dateValue && timeValue && confirmValue){
                if(pathname.indexOf(`booking.html`) === -1){
                        resource = `booking.html?${serviceTypeValue}?${serviceId}?${dishId ? dishId : 'NULL'}?${dateValue}?${timeValue}`;
                }else{
                        set_service_name(serviceTypeValue, serviceId);
                        set_date(dateValue);
                        console.log(timeValue);
                        set_time(timeValue);
                        const dateFormat = `${date.value}T${timeValue}`;
                        postBooking(dateFormat);
                }
            }
            
            break;
        case `services`:

            serviceType = parameters.find(x => x.name === `serviceType`);
            serviceTypeValue = serviceType ? serviceType.value : null;
            
            if(parameters.length <=0) resource = `services.html`;
            else if(serviceTypeValue){
                if(pathname.indexOf(`services.html`) === -1){
                    resource = `services.html?${serviceTypeValue}`;
                }else{
                    past = $(`.itemmenu.itemselected`);
                    current = $(`.itemmenu[topic=${serviceTypeValue}]`);
                    select_item_menu(past, current);
                }
            }
            break;
        case `events`:
            const eventType = parameters.find(x => x.name === `eventType`);
            const eventTypeValue = eventType ? eventType.value : null;

            event = parameters.find(x => x.name === `event`);
            eventId = event ? event.value : null;

            if(parameters.length <=0) resource = `events.html`;
            else {
                if(eventTypeValue && !eventId){
                  if(pathname.indexOf(`events.html`) === -1){
                    resource = `events.html?${eventTypeValue}`;
                  }else{
                    past = $(`.itemmenu.itemselected`);
                    current = $(`.itemmenu[topic=${eventTypeValue}]`)
                    select_item_menu(past, current); 
                  }  
                }
                if(eventTypeValue && eventId){
                    past = $(`.card-box.active`);
                    current = $(`.card-box[serial=${eventId}]`);
                    select_item_body(past, current);
                }
            }
            break;
        case `touristicPlaces`:
            //touristicPlaceId
            const touristicParameter = parameters.find(e => e.name === `touristicPlaceId`);
            const tellMeMoreParameter = parameters.find(e => e.name === `tellMeMore`);
            const howCanIGetParameter = parameters.find(e => e.name === `howCanIGet`);

            const touristicValue = touristicParameter ? touristicParameter.value: null;
            const tellMeMoreValue = tellMeMoreParameter ? tellMeMoreParameter.value : null;
            const howCanIGetValue = howCanIGetParameter ? howCanIGetParameter.value : null;
            
            if(parameters.length <=0){
                resource = `touristicPlaces.html`;
            }else{
                resource = ``;
                if(touristicValue && tellMeMoreValue){
                    const past = $(`.selected`);
                    const current = $(`.tile[serial=${touristicValue}]`);
                    const row = get_row(touristicValue);
                    selectItem(past, current);
                    scroll_to_item(row - 1);
                }
                if(touristicValue && howCanIGetValue){
                    const past = $(`.selected`);
                    const current = $(`.tile[serial=${touristicValue}]`);
                    const row = get_row(touristicValue);
                    selectItem(past, current);
                    select_tab_right(past, current);
                    scroll_to_item(row - 1);
                } 
            }
            break;
        case `shoppingSummary`:
                resource = 'shoppingSummary.html';
            break;
        case `highSpeed`:
            const packageParameter = parameters.find(e => e.name === `hsiaPackageId`); 
            const packageValue = packageParameter ? packageParameter.value : null;
            const startBuyParameter = parameters.find(e => e.name === `startBuy`);
            const startBuyValue = startBuyParameter ? startBuyParameter.value : null;
            const daysParameter = parameters.find(e => e.name === `days`);
            const daysValue = daysParameter ? daysParameter.value : null;
            const endBuyParameter = parameters.find(e => e.name === `endBuy`);
            const endBuyValue = endBuyParameter ? endBuyParameter.value : null;

            if(parameters.length <= 0){
                resource = `highSpeed.html`;
            }else{
                resource = ``;
                if(packageValue) {
                    past = $(`.selected`);
                    current = $(`.shadow-lg[serial=${packageValue}]`);
                    select_item_body(past, current);
                }
                if(packageValue && startBuyValue && !daysValue){
                    const serial = $(`.shadow-lg[serial=${packageValue}]`).attr(`serial`);
                    open_highSpeed_modal(serial);
                }
                if(packageValue && startBuyValue && daysValue && !endBuyValue){
                    const serial = $(`.shadow-lg[serial=${packageValue}]`).attr(`serial`);
                    set_highSpeed_days(parseInt(daysValue));
                    set_highSpeed_total(serial, parseInt(daysValue));
                }
                if(packageValue && startBuyValue && daysValue && endBuyValue){
                    close_highSpeed_modal();
                    open_highSpeed_confirm_modal();
                }
            }            
            break;
        case `store`:
                
                //categoryId
                productCategory = parameters.find(e => e.name === `productCategory`);
                productCategoryId = productCategory ? productCategory.value : null;

                product = parameters.find(e => e.name === `product`);
                productId = product ? product.value : null;

                confirm = parameters.find( e => e.name === `confirm`);
                confirmValue = confirm ? confirm.value : null;

                console.log('productCategory', productCategoryId);
                console.log('product', productId);
                
                if(parameters.length <= 0) resource = `store.html`;
                else{
                    if(productCategoryId && !productId && !confirmValue){
                        past = $(`.itemmenu.itemselected`);
                        current = $(`.itemmenu[serial=${productCategoryId}]`);
                        select_item_menu(past, current); 
                    }
                    if(productCategoryId && productId && !confirmValue){
                      past = $(`.card-box.active`);
                      current = $(`.card-box[serial=${productId}]`);
                      select_product(past, current);
                    }
                    if(productCategoryId && productId && confirmValue){
                        console.log("aqui se compra");
                        post_store_transaction();
                    } 
                }

                /*
                //flag start buy
                const p2Object = parameters.find(e => e.name === `startBuy`);
                const p2 = p2Object ? p2Object.value : null;
                console.log(`p2Object: ${p2Object}`);
                //productId
                const p3Object = parameters.find(e => e.name === `productId`);
                const p3 = p3Object ? p3Object.value : null;
                //productQuantity
                const p4Object = parameters.find(e => e.name === `productQuantity`);
                const p4 = p4Object ? p4Object.value : null;

                //flag end buy
                const p5Object = parameters.find(e => e.name === `endingBuy`);
                const p5 = p5Object ? p5Object.value : null;
 
                if(parameters.length <=0){
                    resource = `store.html`;
                }else{
                    if(p1){
                        selectItemMenu(p1);
                    }
                    if(p2 && p3 && !p4){
                        console.log(`mando valores`);
                        openProductModal(p3, 1);  
                    }
                    if(p2 && p3 && p4 && !p5){
                        setProductQuantity(p3, p4);
                        setStoreAmount(p3, p4);
                        //setup modal total Amount 
                    }
                    if(p2 && p3 && p4 && p5){
                        console.log('estoy aca === here');
                        openConfirmModal();
                    }
                }
                */

            break;
        /*    
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
         */   
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
        /*    
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
        */
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