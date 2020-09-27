const select_back_buttom = (past, current) => {
    past.removeClass(`itemselected active`);
    current.addClass(`itemselected active`);
};
  

const select_item_menu = async(past, current) =>{
    show_loader();
    past.removeClass(`itemselected active`);
    current.addClass(`itemselected active`);
    const topic = current.attr(`topic`).toString();
    const x = await getData(topic);
    const e = x.data;
    render_body(e);
    hide_loader();
};

const select_item_body = async(past, current) =>{

    const scrollBody = $(`.scrollbar`);
    past.removeClass(`active`);
    current.addClass(`active`);
    const row = Number(current.attr('row'));
    scrollBody.animate({scrollTop: (row - 1)*471.86}, 300);
}

const select_button_info = (past, current) => {
    past.removeClass('active');
    current.addClass('active itemselected');
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
            const current =$(`.card-box[col=1][row=1]`);
            select_item_body(past, current);
            break; 
        case 40:
            row = row + 1;
            if(row >   size) {
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

const handle_redirect = (type, key) => { 
    let pathname = ``;
    switch(type){
        case `restaurantes`:
            pathname = `restaurants.html?${key}`;
            break;
        default:
            pathname = `booking.html?${type}?${key}`;
            break;
    }
    window.location.replace(pathname);
};

const control_magic_remote_body = (e, row) => {
    const size = $(`.card-box`).length;
    const past = $(`.card-box.active`);
    //const displacement = parseInt(scrollBody.height())/parseInt(size);
    //console.log(displacement);
    switch(e.keyCode){
        case 13:
            // press ok
            const type = $(`.itemmenu.itemselected`).attr(`topic`);
            const key = $(past).attr(`unique-key`);
            handle_redirect(type, key);
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
  
const render_menu = (type) => {
    var wrapper = document.getElementById('menu');
    const items = [{header:"Gimnasio", value: "gimnasios"},
                   {header:"Spa", value: "spas"},
                   {header:"Restaurante", value: "restaurantes"}
                   ];

    var html = items.map(function(item, key){
      return `
        <li class="itemmenu grid ${type !== item.value ? "" : "itemselected"}" col="0" row="${key + 1}" topic=${item.value}>
            <div class="item">
                <p>${item.header}</p>
            </div>
        </li>
      `
    }).join(` `);
    wrapper.innerHTML = html;
};

const show_loader = () => {
    $('#loader-wrapper').removeClass('Oculto').addClass('Activo');
};

const hide_loader = () => {
    $('#loader-wrapper').removeClass('Activo').addClass('Oculto');
};

const render_body = (data) => {
    var wrapper = document.getElementById('content');
    var html = data.map(function(item, key){
        return(`
        <div class="card-box p-4 subgrid ${key >0 ? "":"active"}" col="${1}" row="${key + 1}" unique-key=${item.id}>
            <h1>${item.name}</h1>
            <div class="info">
                <span>
                    <img src="${item.imgUrl}" class="rest-img"/>
                </span>
                <div class="rest-info pl-4">
                    <p>${item.description}</p>
                </div>
                <div class="rest-infoDiv">
                    <button onclick="InfoRedirect()" class="btn btn-primary more-info">${"Mas informacion"}</button>
                </div>
            </div>
        </div>
      ` ) 
    }).join(" ");

    var contentHtml =     `
    <div class="col-12 pl-5 serv-rest">
    </div>
    <div class="col-12 pl-0 scrollbar">
        <div class="col-12 pl-4 multi-rest">
            ${html}
            <div class="" style="height: 150px;">
				    <h1 style="width: 100%"></h1>
				<div class="info">
				</div>
			</div>
        </div>
    </div>
    `;
    wrapper.innerHTML = contentHtml;
};

const getData = async (type) => {
    let response = {};
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
    return response;    
};

(async function () {
    try{
        show_loader();
        const pathUrl = window.location.href;
        const params = pathUrl.split("?");
        const defaultType = 'gimnasios';
        const type = params.length > 1 ? params[1] : defaultType;
        let data = {};
        const response = await getData(type);
        data = response.data;
        render_menu(type);
        render_body(data);
        hide_loader();

        control_magic_remote();
        
    }catch(ex){
        console.log(ex);
    };
})();




