//#region globals
var serviceType;
var dishTypeId;
var serviceId;
var dishId;
var now;
var currentFullYear
var currentYear;
var currentMonth;
var currentDay;
var currentHour;
var maxMonth;
var maxYear;
var maxDay;
var maxHour;
var modalActive = false;
//#endregion


const generate_booking = (year, month, day, hour, minute) => {
    const dateString = `20${year}-${month}-${day}T${hour}:${minute}`;
    console.log(dateString);
    const date  = new Date(dateString);

    console.log(date);
    if(date < now){
        $('#fechaModal').modal('show');
        var delay = 2000;
        setTimeout(function () {
            $('#fechaModal').modal('hide');
        },delay);
    }else{
        postBooking(dateString);
    }
};


const open_confirm_modal = async() => {

    
    const dayHtml = $(`.markers .day .value`);
    const monthHtml = $(`.markers .month .value`);
    const yearHtml = $(`.markers .year .value`);
    const hourHtml = $(`.hour .hour .value`);
    const minuteHtml = $(`.hour .minute .value`);


    let day = Number(dayHtml.html());
    let month = Number(monthHtml.html());
    let year = Number(yearHtml.html());
    let hour = Number(hourHtml.html());
    let minute = Number(minuteHtml.html());


    const dateString = `20${year}-${month}-${day}`;
    const tempHour = `${hour}:${minute}`;
    const service = await getService(serviceType, serviceId);
    const headerText = `¿Estás seguro que deseas realizar esta reserva para ${service.name}, el ${dateString} a las ${tempHour}?`;
    $('#msjConfirmacion').text(headerText);
  
    $('#confirmModal').modal('show');
    $('.modal-button.confirm-modal').addClass('active');

    modalActive = true;
  }; 

  const close_confirm_modal = () => {
    $('#confirmModal').modal('hide');
    $('.modal-button').removeClass('active');
    modalActive = false;
  };

  const open_success_modal = () => {
    $('#acceptModal').modal('show');
    setInterval(() => {
      $('#acceptModal').modal('hide');
    }, 1000);
  };


const postBooking = async(startDate) => {
    let body = {};
    let result = {};

    try{
        switch(serviceType){
            case 'gimnasios':
                body = {
                    start_time: startDate,
                    end_time: startDate,
                    gym_id: serviceId,
                    guest_id: GUEST_ID
                }
                result = await post(ENDPOINT_BOOKING_GYMS, body);
                break;
            case 'restaurantes':
                body = {
                    start_time: startDate,
                    end_time: startDate,
                    restaurant_id: serviceId,
                    guest_id: GUEST_ID,
                    dish_id: dishId
                }
                result = await post(ENDPOINT_BOOKING_RESTAURANTS, body);
                break;
            case 'spas':
                body = {
                    start_time: startDate,
                    end_time: startDate,
                    spa_id: serviceId,
                    guest_id: GUEST_ID
                }
                result = await post(ENDPOINT_BOOKING_SPAS, body);
                break;
        }

        if(result.success){
            $('#acceptModal').modal('show');
            var delay = 2000;
            setTimeout(function () {
                window.location = "services.html";
            },delay)
        }else{
            $("#msjConfirmacion").text("Ocurrió un error, intentalo de nuevo");
            $('#confirmModal').modal('show');
            var delay = 3500;
            /*setTimeout(function () {
                $('#confirmModal').modal('hide');
                window.location = window.location.href;
            },delay)
            */
        }

    }catch(ex){
        console.log(ex);
        $("#msjConfirmacion").text("Ocurrió un error, intentalo de nuevo");
        $('#confirmModal').modal('show');
        var delay = 3500;
        /*setTimeout(function () {
            $('#confirmModal').modal('hide');
            window.location = window.location.href;
        },delay)
        */
    }
    
}

const select_item_body = (past, current) => {
    past.removeClass(`active`);
    current.addClass(`active`);
};

const set_headers = (type, service, dish) => {
    let headerText = service.name;
    let welcomeText = "";

    switch(type){
        case 'gimnasios':
            welcomeText = `Bienvenido a ${service.name}.`
            break;
        case 'restaurantes':
            welcomeText = `Bienvenido al restaurante ${service.name}. Has solicitado reservar ${dish.name.toUpperCase()}`
            break;
        case 'spas':
            welcomeText = `Bienvenido a ${service.name}.`
            break;
    }

    $('#service-name').text(headerText);
    $('#mensajeReserva').text(welcomeText);
};

const getService = async(type, service) => {
    
    let response = {};
    let data = {};

    try{
        switch(type){
            case 'gimnasios':
                response = await get(ENDPOINT_GET_GYMS, {method: 'GET'});
                break;
            case 'restaurantes':
                response = await get(ENDPOINT_GET_RESTAURANTS, {method: 'GET'}); 
                break;
            case  'spas':
                response = await get(ENDPOINT_GET_SPAS, {method: 'GET'}); 
                break;
            default:
                break;
        }
    
        data = response.data;
        data = data.find(x => x.id === Number(service));
        return data;

    }catch(ex){
        console.log(ex)
    }
};

const set_service_name = async(serviceType, service, dish) => {
    serviceId = service;
    
    let x = {};
    let y = {};
    let welcomeText = '';

    x = await getService(serviceType, service);

    if(dish){
        y = await getDish(dish);
        welcomeText = `Bienvenido al restaurante ${x.name}. Has solicitado reservar ${y.name.toUpperCase()}.`;
    }else{
        welcomeText = `Bienvenido a ${x.name}.`;
    }
    $('#service-name').text(x.name);
    $('#mensajeReserva').text(`${welcomeText}`);
};


const set_date = (date) => {
    const dayHtml = $(`.markers .day .value`);
    const monthHtml = $(`.markers .month .value`);
    const yearHtml = $(`.markers .year .value`);

    dayHtml.html(date.split('-')[2]);
    monthHtml.html(date.split('-')[1]);
    yearHtml.html(date.split('-')[0]);
};

const set_time = (time) => {
    const hourHtml = $(`.hour .hour .value`);
    const minuteHtml = $(`.hour .minute .value`);
    
    hourHtml.html(time.split(':')[0]);
    minuteHtml.html(time.split(':')[1]);

    const delay = 2000;
        setTimeout(function () {
            open_confirm_modal();
    },delay);
};

const select_button_modal = (past, current) => {
    past.removeClass('active');
    current.addClass('active');
};

const control_magic_remote_modal = (e) => {

    const past = $(`.modal-button.active`); 
    const dayHtml = $(`.markers .day .value`);
    const monthHtml = $(`.markers .month .value`);
    const yearHtml = $(`.markers .year .value`);
    const hourHtml = $(`.hour .hour .value`);
    const minuteHtml = $(`.hour .minute .value`);


    let day = Number(dayHtml.html());
    let month = Number(monthHtml.html());
    let year = Number(yearHtml.html());
    let hour = Number(hourHtml.html());
    let minute = Number(minuteHtml.html());



    switch(e.keyCode){
      case 13:
          
          if(past.hasClass('confirm-modal')){
            generate_booking(year, month, day, hour, minute);
          }else{
            close_confirm_modal();
          }
          break; 
      case 37:
  
          current = $(`.modal-button.cancel-modal`);
          select_button_modal(past, current);
  
          return;
      case 38:
          break;
      case 39:
  
          current = $(`.modal-button.confirm-modal`);
          select_button_modal(past, current);
  
          return;
      case 40:
          break;
    };
  }


const control_magic_remote_grid = (e) => {
    let col = 0;
    let type = '';

    const size = $(`.grid`).length;
    const past = $(`.grid.active`);
    
    col = Number(past.attr(`col`));
    type = past.attr(`type`);

    const dayHtml = $(`.markers .day .value`);
    const monthHtml = $(`.markers .month .value`);
    const yearHtml = $(`.markers .year .value`);
    const hourHtml = $(`.hour .hour .value`);
    const minuteHtml = $(`.hour .minute .value`);


    let day = Number(dayHtml.html());
    let month = Number(monthHtml.html());
    let year = Number(yearHtml.html());
    let hour = Number(hourHtml.html());
    console.log(hour);
    let minute = Number(minuteHtml.html());
    console.log(minute);
    console.log(type);

    const scrollBody = $(`.contenido`);
    //const displacement = parseInt(scrollBody.height())/parseInt(size);
    //console.log(displacement);
    switch(e.keyCode){
        case 13:
            //press enter
            if(type === 'accept'){
                day = day.toString().length < 2 ? `0${day}` : day;
                month = month.toString().length < 2 ? `0${month}` : month;
                hour = hour.toString().length < 2 ? `0${hour}` : hour;
                open_confirm_modal();
                //generate_booking(year, month, day, hour, minute);
            }else if(type === 'cancel' || type === 'back'){
                window.location.replace("services.html")
            }else{
                return;
            }
            break;
        case 37:
            // press left
            col = col - 1;
            if(col <= 0) return;
            else {
                const current = $(`.grid[col=${col}]`);
                select_item_body(past, current);
            }
            break;
        case 38:
            // press top
            if(type === 'day'){
                day = Number(dayHtml.html());
                if(day < maxDay) day++;
                dayHtml.html(day);

            }else if(type === 'month'){
                month = Number(monthHtml.html());
                if(month < maxMonth){
                    month++;
                    maxDay = new Date(currentFullYear, month, 0).getDate();
                }

                if(day > maxDay) dayHtml.html(maxDay);
                monthHtml.html(month);

            }else if(type ==='year'){
                console.log(year, ' ', maxYear);
                if(year < maxYear) year++;
                yearHtml.html(year);

            }else if(type === 'hour'){
                console.log(hour);
                if(hour < maxHour - 1) hour++;
                hourHtml.html(hour); 
            }else if(type === 'minute'){
                minuteHtml.html("30");
            }else{
                return;
            }
            break;
        case 39:
            // press right
            col = col + 1;
            if(col > size) return;
            else {
                const current = $(`.grid[col=${col}]`);
                select_item_body(past, current);
            }
            break;
        case 40:
            // press bottom
            if(type === 'day'){
                let day = Number(dayHtml.html());
                if(day > 1) day--;
                dayHtml.html(day);
            }else if(type === 'month'){
                let month = Number(monthHtml.html());
                if(month > 1){
                    month--;
                    maxDay = new Date(currentFullYear, month, 0).getDate();
                }
                if(day > maxDay) dayHtml.html(maxDay);
                monthHtml.html(month);
            }else if(type ==='year'){
                if(year >= maxYear) year--;
                yearHtml.html(year);

            }else if(type === 'hour'){
                if(hour > 1) hour--;
                hourHtml.html(hour);

            }else if(type === 'minute'){
                minuteHtml.html("00");
            }else{
                return;
            }
            break;
    };
}

const control_magic_remote = () => {
    $('body').bind("keydown", function(e){

        if(modalActive){
            control_magic_remote_modal(e);
          }else{
            control_magic_remote_grid(e);
          }

    }); 
};

const set_time_selectors = (day, month, year, hour) => {
    const dayHtml = $(`.date .day .value`);
    const monthHtml = $(`.date .month .value`);
    const yearHtml = $(`.date .year .value`);
    const hourHtml = $(`.hours .hour .value`);
    const minuteHtml = $(`.hours .minute .value`);
    console.log(day,' ',month,' ',year,' ',hour);

    dayHtml.html(day);
    monthHtml.html(month);
    yearHtml.html(year);
    hourHtml.html(hour);
    minuteHtml.html("30");
}

const getDish = async(dishId) => {
    try{
        const dishesResult = await get(ENDPOINT_GET_DISHES, { method: 'GET' });
        const dishes = dishesResult.data;
        const dish = dishes.find( x => x.id === Number(dishId));
        return dish;
    }catch(ex){
        console.log(ex);
    }
}

(async function () {
    try{
                
        let dishResult = {};
        let dishData = {};


        const pathUrl = window.location.href;
        const params = pathUrl.split("?");
        
        console.log(Object.values(params));

        serviceType = params.length > 1 ? params[1] : "";
        serviceId = params.length > 2 ? params[2] : 0;

        dishId = params.length > 3 ? (params[3] !== 'NULL' ? params[3] : null) : null;
        date = params.length > 4 ? (params[4] !== 'NULL' ? params[4] : null) : null;
        time = params.length > 5 ? (params[5] !== 'NULL' ? params[5] : null) : null; 

        now = new Date();

        currentDay = date ? date.split('-')[2] : now.getDate();
        currentMonth = date ? date.split('-')[1] : now.getMonth() + 1;
        currentFullYear = date ? date.split('-')[0] : now.getFullYear();
        
        currentYear = currentFullYear.toString().substr(-2);
        currentHour = time ? time.split(':')[0] : now.getHours()+1;

        const serviceData = await getService(serviceType, serviceId);
        

        if(dishId){
            dishData = await getDish(dishId);
        }
        console.log(serviceData);

        set_time_selectors(currentDay, currentMonth, currentYear, currentHour);
        set_headers(serviceType, serviceData, dishData );
        
        maxMonth = 12;
        maxHour = 24;
        maxDay = new Date(now.getFullYear(), currentMonth, 0).getDate();
        maxYear = Number(currentYear) + 1;
        


        control_magic_remote();

        /*let data = {};
        


        const pathUrl = window.location.href;
        const params = pathUrl.split("?");
        restaurantId = params.length > 1 ? params[1] : 0;
        dishId = params.length > 2 ? params[2] : 0;
        date = params.length > 3 ? (params[3] !== 'NULL' ? params[3] : new Date()) : new Date();
        time = params.length > 4 ? (params[4] !== 'NULL' ? params[4] : new Date()) : new Date(); 
        console.log(restaurantId);
        
        const restaurantResponse = await get(ENDPOINT_GET_RESTAURANTS, {method: 'GET'});
        const restaurant = restaurantResponse.data.find( x => x.id === Number(restaurantId));

        console.log(restaurantResponse.data);
        console.log(restaurant);

        const dishTypesResponse = await get(ENDPOINT_GET_DISH_TYPES, {method: 'GET'});
        const dishTypes = dishTypesResponse.data.sort( (a, b) => a.id - b.id);
        const defaultType = dishTypes[0].id;
        const type = params.length > 2 ? params[2] : defaultType;

        const dishes = await getData(Number(restaurantId), Number(type));
        console.log(dishes);

        render_main_list(restaurant, dishTypes, Number(type));
        render_body(dishes);
        control_magic_remote();
        */
    }catch(ex){
        console.log(ex);
    };
})();


