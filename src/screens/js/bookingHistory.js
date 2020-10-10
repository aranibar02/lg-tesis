//#region
var lastItem = 0;
//#endregion


//#region 
var lastItem = 0;
var language = '';
var currency = '';
//#endregion


const init = async() => {
    $('#moduleTitle').text(CONFIGURATION[language].module_booking_history_header_name);
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



  const get_price_format = (price) => {
    let text = '';
    switch(currency){
      case 'soles':
        text = `${SOL_SYMBOL} ${price}`;
        break;
      case 'dolares':
        text = `${USD_SYMBOL}${toDollars(price).toFixed(2)}`;
        break;
      case 'euros':
        text = `${toEuros(price).toFixed(2)} ${EURO_SYMBOL}`;
        break;
      default:
        text = `${SOL_SYMBOL} ${price.toFixed(2)}`;
        break;
    }
    return text;
  }
//$13.95
//28,06 €
//S/ 825


const select_back_button  = (past, current) => {
    past.removeClass('active');
    current.addClass('itemselected active');
};



const select_item_body = async(past, current) =>{
    if(past.hasClass('back')){
        past.removeClass(`itemselected active`);
        current.addClass(`active`);
      }else{
        const scrollBody = $(`.scrollbar`);
        past.removeClass(`active`);
        current.addClass(`active`);
        const row = Number(current.attr('row'));
        scrollBody.animate({scrollTop: (row - 1)*470}, 300);
      }
};

const control_magic_remote_back = (e) => {
    const past = $(`.back`);
    console.log('eee');
    switch(e.keyCode){ 
        case 13:
          window.location.replace('index.html');
          break;
        case 37:
            return;
        case 38:
            return;
        case 39:
            // press right
            console.log(lastItem);
            const current = $(`.card-box[col=1][row=${lastItem}]`);
            select_item_body(past, current);
            return; 
        case 40:
            // press bottom
            return;
    };
  };

const control_magic_remote_body = (e, row) => {
    const size = $(`.card-box`).length;
    const past = $(`.card-box.active`);
    //const scrollBody = $(`#ScrollRes`);
    //const displacement = parseInt(scrollBody.height())/parseInt(size);
    //console.log(displacement);
    switch(e.keyCode){ 
        case 37:
            const current = $(`.back`);
            select_back_button(past, current);
            return;
        case 38:
            // press top
            row = row - 1;
            if(row <= 0) {return;}
            else{
                const current = $(`.card-box[col=1][row=${row.toString()}]`);
                //scrollBody.animate({scrollTop: (row - 1)*470}, 300);
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
                //scrollBody.animate({scrollTop: (row - 1)*470}, 300);
                select_item_body(past, current);
                //scrollBody.scrollTop(displacement*(-1));
            } 
            break;
    };
    lastItem = row;
  };
  
  const control_magic_remote = () => {
    $('body').bind("keydown", function(e){ 
        const element = $(`.active`);
        let row = parseInt(element.attr(`row`));
        let col = parseInt(element.attr(`col`)); 
        console.log(row);
        switch(col){
            case 0:
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


const render_body = (data) => {

    const wrapper = document.getElementById('content');
    const html = data.map( (item, key) => {
        const date = new Date(item.startTime);
        return (
            `<div class="card-box p-4 subgrid ${key > 0 ? "" : "active"}" col="1" row="${key + 1}">
                <h1>${item.title}</h1>
                <div class="info">
                    <img src="${item.imgUrl}" class="rest-img"/>
                    <div class="rest-info pl-4">
                        <p>Fecha: ${date.toLocaleDateString()}</p>
                        <p>
                        Hora:
                        ${
                        date.getUTCHours().toString()}:${date.getUTCMinutes().toString().length > 1
                        ? date.getUTCMinutes().toString()
                        : `${date.getUTCMinutes().toString()}0`
                        }
                        </p>
                    </div>
                </div>
            </div>
            `
        )
    }).join(` `);

    const contentHtml = `
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

const get_time_symbol = (x) => {
    const date = new Date(x);
    if(date.getUTCHours() > 11) return 'p. m.';
    else return 'a. m.';
};

const show_loader = () => {
    $("#loader-wrapper").removeClass("Oculto").addClass("Activo");
};

const hide_loader = () => {
    $("#loader-wrapper").removeClass("Activo").addClass("Oculto");
};

(async function () {
    try{
       
        show_loader();
        const restaurantsBooking = await get(ENDPOINT_BOOKING_RESTAURANTS, { method: 'GET'});
        const gymsBooking = await get(ENDPOINT_BOOKING_GYMS, { method: 'GET' });
        const spasBooking = await get(ENDPOINT_BOOKING_SPAS, { method: 'GET' });
        const config = await get_config_data();

        language = config.language;

        let data = [];

        const a = restaurantsBooking.data.map( x => ({
            startTime: x.start_time,
            title: x.restaurant.name,
            imgUrl: x.restaurant.imgUrl,
            guestId: x.guest_id
        }));

        const b = gymsBooking.data.map(x => ({
            startTime: x.start_time,
            title: x.gym.name,
            imgUrl: x.gym.imgUrl,
            guestId: x.guest_id
        }));

        const c = spasBooking.data.map(x => ({
            startTime: x.start_time,
            title: x.spa.name,
            imgUrl: x.spa.imgUrl,
            guestId: x.guest_id
        })); 
        
        data = a.concat(b).concat(c).sort( (x,z) => {return new Date(z.startTime) - new Date(x.startTime)});
        data = data.filter( x => Number(x.guestId) === GUEST_ID);
        console.log(data);
        console.log(data);
        lastItem = 1;
        init();
        render_body(data);
        hide_loader();
        control_magic_remote();
    }catch(ex){
        console.log(ex);
    };
})();