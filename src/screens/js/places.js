//#region global variables
var bodyActive = true;
//#endregion

//#region 
var language;
//#endregion


const get_category_by_language = (item) => {
  let text = '';
  switch(language){
    case 'español':
      text = item.name;
      break;
    case 'ingles':
      text = item.name_en;
      break;
    case 'portugues':
      text = item.name_po
      break;
    default:
      text = item.name
      break;
  }
  return text;
}

const get_config_data = async() => {
	try{
		const response = await get(ENDPOINT_CHECK_IN(GUEST_ID), { method: 'GET'} );
		const data = response.data.length > 0 ? response.data[0].configuration : {};
		return data;
	}catch(ex){
		console.log(ex);
	}
};

const show_loader = () => {
    $('#loader-wrapper').removeClass('Oculto').addClass('Activo');
  };
  
  const hide_loader = () => {
    $('#loader-wrapper').removeClass('Active').addClass('Oculto');
  };
  
  const select_item_menu = async(past, current) =>{
    show_loader();
    past.removeClass(`itemselected active`);
    current.addClass(`itemselected active`);
    const serial = Number(current.attr(`serial`));
    console.log(serial);
    const placesResult = await get(ENDPOINT_TOURISTICPLACES, {method: 'GET'});

    const places = placesResult.data.filter(x => Number(x.touristic_places_type_id) === Number(serial));
    //render_body(places); 
    //const response = await get(ENDPOINT_TOURISTICPLACES, {method: 'GET'});
    //const e = response.data;
    render_body(places);
    hide_loader();
  };
  
  const select_item_body = async(past, current) =>{
    const scrollBody = $(`.scrollbar`);
    past.removeClass(`active`);
    current.addClass(`active`);
    const row = Number(current.attr('row'));
    scrollBody.animate({scrollTop: (row - 1)*470}, 300);
  };
  
  const select_back_buttom = (past, current) => {
    past.removeClass(`itemselected active`);
    current.addClass(`itemselected active`);
  }
  
  
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
  
  const control_magic_remote_body = (e, row) => {
    const size = $(`.card-box`).length;
    const past = $(`.card-box.active`);
    const scrollBody = $(`.contenido`);
    //const displacement = parseInt(scrollBody.height())/parseInt(size);
    //console.log(displacement);
    switch(e.keyCode){ 
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
  
  const render_menu = (data) => {
    var wrapper = document.getElementById('menu');

    var html = data.map(function(item, key){
      return `
      <li class="itemmenu grid ${key > 0 ? "" : (bodyActive === false ? "itemselected active": "itemselected")}" col="0" row="${key + 1}" serial="${item.id}">
        <div class="item">
          <p>${get_category_by_language(item)}</p>
        </div>
      </li>
      `
    }).join(` `);
    wrapper.innerHTML = html;
  }
  
  const render_body = (data) => {
    var wrapper = document.getElementById('Contenido');
    var html = data.map(function(item, key){

        return(`<div class="card-box p-4 subgrid ${key > 0 ? "" : (bodyActive === true ? "active": "")}" col="1" row="${key + 1}" serial="${item.id}">
        <h1>${item.name}</h1>
        <div class="info">
          <span><img src="${item.img_url}" class="rest-img"/></span>
          <div class="rest-info pl-4">
            <p>${item.description.substring(0,200)}...</p>
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
  }

  const init = () => {
    $('#serviceTypeText').text(CONFIGURATION[language].submodule_places_name);
  };
  
  (async function () {
  
      show_loader();
      const pathUrl = window.location.href;
      const config = await get_config_data();

      language = config ? config.language : 'español';
      const params = pathUrl.split("?");
      

        const categories = await get(ENDPOINT_PLACES_TYPES, { method: 'GET' });
        const categoryId = categories.data[0].id;
        const placeResult = await get(ENDPOINT_TOURISTICPLACES, {method: 'GET'});
        const places = placeResult.data.filter(x => x.touristic_places_type_id === Number(categoryId)); 
        bodyActive = places.length > 0 ? true : false;

        init();
        render_menu(categories.data);
        render_body(places);

        /*const categories = [
            {id: 1, name: 'Atracciones'},
            {id: 1, name: 'Compras'},
            {id: 1, name: 'Bares'},
        ]
        const response = await get(ENDPOINT_TOURISTICPLACES, {method: 'GET'});
        const places = response.data;


        bodyActive = places.length > 0 ? true: false; 
        render_menu(categories);
        render_body(places);
        */
        control_magic_remote();
        hide_loader();
  })();