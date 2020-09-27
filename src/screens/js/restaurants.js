//#region globals
var restaurantId;
var dishTypeId;
var dishId;
var bodyActive = true;
var bodySize = 0;
//#endregion





const show_loader = () => {
    $('#loader-wrapper').removeClass('Oculto').addClass('Activo');
};

const hide_loader = () => {
    $('#loader-wrapper').removeClass('Activo').addClass('Oculto');
};

const select_back_buttom = (past, current) => {
    past.removeClass(`itemselected active`);
    current.addClass(`itemselected active`);
};

const select_item_menu = async(past, current) =>{

    show_loader();
    past.removeClass(`itemselected active`);
    current.addClass(`itemselected active`);
    const dishTypeId = current.attr(`unique-key`);
    const x = await getData(Number(restaurantId), Number(dishTypeId));
    bodySize = x.length;
    render_body(x);
    hide_loader();
};

const select_item_body = async(past, current) =>{
    const scrollBody = $(`.scrollbar`);
    past.removeClass(`active`);
    current.addClass(`active`);
    const row = Number(current.attr('row'));
    scrollBody.animate({scrollTop: (row - 1)*470}, 300);
};

const control_magic_remote_back = (e) => {
    const size = $('.itemmenu').length;
    const past = $('.back');
    switch(e.keyCode){
        case 13:
            //press ok
            window.location.replace('index.html');
            break; 
        case 37:
            break;
        case 38:
              const current = $(`.itemmenu[col=0][row=${size}]`);
              select_back_buttom(past, current);
            break;
        case 39:
            return;
        case 40:
            return;
    };
  };



const control_magic_remote_menu = (e, row) => {
    const past = $(`.itemmenu.active`); 
    const size = $(`.itemmenu`).length;
  
    switch(e.keyCode){
        case 13:
            //press ok
            break; 
        case 37:
            return;
        case 38:
            row = row - 1;
            if(row <= 0){
              return;
            }else{
              const current = $(`.itemmenu[col=0][row=${row.toString()}]`);
              select_item_menu(past, current);
            }
            break;
        case 39:
            // press right
            if(bodySize <= 0) return;
            else{
                const current =$(`.card-box[col=1][row=1]`);
                select_item_body(past, current);
            }
            break; 
        case 40:
            row = row + 1;
            if(row > size) {
              const current = $(`.back`);
              select_back_buttom(past, current);
            }
            else {
              const current = $(`.itemmenu[col=0][row=${row.toString()}]`);
              select_item_menu(past, current);
            }
            break;
    };
};

const handle_redirect = (key) => { 
    let pathname = `booking.html?restaurantes?${restaurantId}?${key}`;
    window.location.replace(pathname);
};

const control_magic_remote_body = (e, row) => {
    const size = $(`.card-box.row`).length - 1;
    console.log(size);
    const past = $(`.card-box.active`);
    const scrollBody = $(`.contenido`);
    //const displacement = parseInt(scrollBody.height())/parseInt(size);
    //console.log(displacement);
    switch(e.keyCode){
        case 13:
            // press ok
            const key = $(past).attr(`unique-key`);
            handle_redirect(key);
            break;
        case 37:
            const current = $(`.itemmenu.itemselected`);
            select_item_menu(past, current);
            return;
        case 38:
            // press top
            row = row - 1;
            if(row <= 0) {return;}
            else{
                const current = $(`.card-box[col=1][row=${row.toString()}]`);
                scrollBody.animate({scrollTop: (row - 1)*300}, 300);
                select_item_body(past, current);
            }
            break;
        case 39:
            // press right
            return; 
        case 40:
            // press bottom
            row = row + 1;
            if( row > size) {return;}
            else{
               console.log(row);
                const current = $(`.card-box[col=1][row=${row.toString()}]`);
                scrollBody.animate({scrollTop: (row - 1)*300}, 300);
                select_item_body(past, current);
                //scrollBody.scrollTop(displacement*(-1));
            } 
            break;
    };
};
  
const control_magic_remote = () => {
    $('body').bind("keydown", function(e){ 
        const element = $(`.active`);
        let row = parseInt(element.attr(`row`));
        let col = parseInt(element.attr(`col`)); 
        console.log(row);
        switch(col){
            case 0:
                control_magic_remote_menu(e, row)
                //$(`.scroll__body`).css(`overflow-y`, `hidden`);
                break;
            case 1:
                control_magic_remote_body(e, row);
                //$(`.scroll__body`).css(`overflow-y`, `scroll`);
                break;
            case 4:
                control_magic_remote_back(e);
            default:
                break;
        }
      });
}; 

const render_main_list = (restaurant, dishTypes, dishTypeId) => {

    const wrapper = document.getElementById('main-list');

    const html = dishTypes.map( (item, key) => {
        return `
        <li class="itemmenu grid ${item.id === dishTypeId ? (bodyActive === false ? "itemselected active" : "itemselected") : ""}" col="0" row="${key + 1}" 
        topic="${item.description}" unique-key="${item.id}">
            <div class="item" >
                <p>${item.description}</p>
            </div>
        </li>        
        `
    }).join(` `);

    const contentHtml = `
        <div class="logo2">
            <h2>RESTAURANTE</h2>
            <h1>${restaurant.name}</h1>
        </div>
        <ul class="sidebar">
            ${html}
        </ul>
        <div class="img-dtl">
            <img id="imgRestaurante" src="${restaurant.imgUrl ? restaurant.imgUrl : "ser1.jpg"}" class="rs">
            <a href="services.html" class="grid">
                <img src="left-arrow.png" class="back" col="4" row="4">
            </a>
        </div>
    `;
    wrapper.innerHTML = contentHtml;
};

const render_menu = (dishTypes, dishTypeId) => {

    const wrapper = document.getElementById('content');

    const html = dishTypes.map( (item, key) => {
        return `
        <li class="itemmenu grid ${item.id === dishTypeId ? (bodyActive === false ? "itemselected active" : "itemselected") : ""}" col="0" row="${key + 1}" 
        topic="${item.description}" unique-key="${item.id}">
            <div class="item" >
                <p>${item.description}</p>
            </div>
        </li>        
        `
    }).join(` `);

    wrapper.innerHTML = html;
};



const render_body = (data) => {
    const wrapper = document.getElementById('content');
    const html = data.map( (item, key) => {
        return (`
        <div class="card-box row subgrid ${key > 0 && bodyActive === true ? "": "active"}" col="1" row="${key + 1}" unique-key="${item.id}">
        <div class="col-12 pl-0 m-4">
            <div class="col-12">
                <div class="card-box p-4 grid" column="2" row="1">
                    <h1>${item.name}</h1>
                    <div class="info">
                        <img src="${item.photoUrl}" class="rest-img"/>
                        <div class="rest-info pl-4">
                            <p>
                                ${item.small_description}
                            </p>
                            <div class="buttons">
                                <a href="reserva.html" class="btn btn-primary reserva grid changebutton" item="2">Reservar</a>
		                    </div>
                        </div>
                    </div>
                </div>  
            </div>
        </div>
        </div>
        `)
    }).join(` `);

    const contentHtml = `
        <div class="col-12 pl-5 serv-rest">
        </div>
        <div class="col-12 pl-0">
            <div class="col-12 pl-4 multi-rest">
                ${html}
                <div class="card-box row subgrid" column="1" style="height: 150px;">
					<h1 style="width: 100%"></h1>
					<div class="info">
					</div>
				</div>
            </div>
        </div>
    `;

    wrapper.innerHTML = contentHtml;
    
};

const getData = async(restaurantId, dishTypeId) => {
    try{
        const response = await get(ENDPOINT_GET_DISHES, {method: 'GET'});
        console.log(response);
        const data = response.data.filter(x => x.restaurant_id === restaurantId &&
                                          x.dish_type_id === dishTypeId);
        return data;
    }catch(ex){
        console.log(ex);
    }
};

const init = (data) => {
    $('#serviceTypeText').text(`Restaurante`);
    $('tituloRestaurante').text(data.name);
    $('imgRestaurante').attr('src', data.imgUrl);
}

(async function () {
    try{
        let data = {};

        const pathUrl = window.location.href;
        const params = pathUrl.split("?");
        restaurantId = params.length > 1 ? params[1] : 0;
 
        const restaurantResponse = await get(ENDPOINT_GET_RESTAURANTS, {method: 'GET'});
        const restaurant = restaurantResponse.data.find( x => x.id === Number(restaurantId));
        init(restaurant);

        const dishTypesResponse = await get(ENDPOINT_GET_DISH_TYPES, {method: 'GET'});
        const dishTypes = dishTypesResponse.data.sort( (a, b) => a.id - b.id);
        const defaultType = dishTypes[0].id;
        const type = params.length > 2 ? params[2] : defaultType;

        const dishes = await getData(Number(restaurantId), Number(type));
    
        bodyActive = dishes.length > 0 ? true : false;
        bodySize = dishes.length;

        render_main_list(restaurant, dishTypes, Number(type));
        render_menu(dishTypes, Number(type));
        render_body(dishes);
        control_magic_remote();
    }catch(ex){
        console.log(ex);
    };
})();
