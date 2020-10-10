//#region 
var lastItem = 0;
var language = '';
var currency = '';
//#endregion


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

const show_loader = () =>{
    $('#loader-wrapper').addClass('Activo').removeClass('Oculto');
};

const hide_loader = () =>{
    $('#loader-wrapper').addClass('Oculto').removeClass('Activo');
};

const get_account_data = async(guestId) => {
    try{
      const response = await get(ENDPOINT_ACCOUNT_BY_GUEST(guestId), { method: 'GET' });
      const data = response.data.length > 0 ? response.data[0] : {};
      return data;
    }catch(ex){
      console.log(ex);
    }
  };

function selectItem(past,current){
    past.removeClass(`itemselected active`)
    current.addClass(`itemselected active`);
} 

function control_magic_remote_back(e){
    const past = $(`.itemselected`); 
    switch(e.keyCode){
        case 13:
            //press ok
            window.location.replace('index.html');
            break; 
        case 37:
            return;
        case 38:
            return;
        case 39:
            // press right
            const current =$(`.itembody[col=1][row=${lastItem}]`);
            selectItem(past, current);
            break; 
        case 40:
            return;
    };
}

function control_magic_remote_body(e, row){
    
    const size = $(`.itembody`).length;
    const past = $(`.itemselected`);
    const scrollBody = $(`#ScrollRes`);
    const displacement = parseInt(scrollBody.height())/parseInt(size);
    console.log(displacement);
    switch(e.keyCode){
        case 13:
            //press ok
            break; 
        case 37:
            // press left
             const current = $(`.back`);
             select_back_button(past,current);
            break;
        case 38:
            // press top
            row = row - 1;
            if(row <= 0) {return;}
            else{
                const current = $(`.itembody[col=1][row=${row.toString()}]`);
                scrollBody.animate({scrollTop: (row - 1)*140}, 300);
                selectItem(past, current);
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
                const current = $(`.itembody[col=1][row=${row.toString()}]`);
                scrollBody.animate({scrollTop: (row - 1)*140}, 300);
                selectItem(past, current);
                //scrollBody.scrollTop(displacement*(-1));
            } 
            break;
    };

    lastItem = row;
};

function control_magic_remoto(){
    $('body').bind("keydown", function(e){
        const element = $(`.itemselected`);
        let row = parseInt(element.attr(`row`));
        let col = parseInt(element.attr(`col`)); 

        switch(col){
            case 4:
                control_magic_remote_back(e)
                //$(`.scroll__body`).css(`overflow-y`, `hidden`);
                break;
            case 1:
                control_magic_remote_body(e, row);
                //$(`.scroll__body`).css(`overflow-y`, `scroll`);
                break;
            default:
                break;
        }
      });
 }; 


 const init = () => {
     $('#moduleTitle').text(CONFIGURATION[language].module_account_header_name);
     $('#period').text(CONFIGURATION[language].module_account_period_name);
     $('#amount').text(CONFIGURATION[language].module_account_amount_name);
     $('#transaction-subheader').text(CONFIGURATION[language].module_account_subheader_name);
     $('#table-date').text(CONFIGURATION[language].module_account_table_date_name);
     $('#table-time').text(CONFIGURATION[language].module_account_table_time_name);
     $('#table-description').text(CONFIGURATION[language].module_account_table_description_name);
     $('#table-amount').text(CONFIGURATION[language].module_account_table_amount_name);
 };



function renderSideBar(data){
    const wrapper = $(`.main-list .sidebar`);
    var contentHtml = data.map( (item, key) => {
        return `
        <div style="background: #efefef;padding: 10% ;color: #102042;">
            <h1 id="period">Periodo:</h1>
            <h2>${item.billing_date}</h2>
            <h1 id="amount">Cuenta:</h1>
            <h2>${get_price_format(item.total_amount)}</h2>
        </div>
        `    
    }).join(` `);
    wrapper.append(contentHtml);
};

const render_body = (data) =>{

    const wrapper = $(`.contenido`);
    const html = data.map((item, key) => {
        const date = new Date(item.transaction_datetime);
        const hour = date.getHours();
        const minutes = date.getMinutes();
        const dateFormat = date.toLocaleDateString("en-US");
        const time = `${hour}:${minutes}`;
        return (`
        <div style="background:#d2d2d2; height: 100px;width: 100%;margin: 3% 0;" class="itembody ${key+1===1?"itemselected":""}" col=1 row=${key+1} serial=${item.id}>
            <div style="text-align: center;FLOAT: LEFT;padding: 2% 3%;font-size: 1.8em;    color: #102042;width: 20%;" >${dateFormat}</div>
            <div style="text-align: center; FLOAT: LEFT;padding: 2% 3%;font-size: 2em;    color: #102042;width: 15%;text-align: center;" >${time}</div>
            <div style="text-align: center;FLOAT: LEFT;padding: 2% 3%;font-size: 1.8em;    color: #102042;width: 40%;text-align: left;" >${item.transaction_description}</div>
            <div style="text-align: right;FLOAT: LEFT;padding: 2% 3%;font-size: 2em;    color: #102042;width: 25%;text-align: left;" >${get_price_format(item.amount)}</div>
        </div>
        `)
    }).join(` `);

    const contentHtml = `
    <div class="col-12 pl-5 serv-rest" style="display: none;">
    </div>
    <div class="col-12 pl-0">
        <div class="col-12 pl-4 multi-rest">
            <h1 style="MARGIN: 2% 0;" id="transaction-subheader"></h1>
            <div style="background: #838383;    height: 100px;">
                <div style="FLOAT: LEFT;padding: 2% 3%;font-size: 2em;    color: #FFFFFF;width: 20%;" id="table-date">${CONFIGURATION[language].module_account_table_date_name}</div>
                <div style="FLOAT: LEFT;padding: 2% 3%;font-size: 2em;    color: #FFFFFF;width: 15%;text-align: center;" id="table-time">${CONFIGURATION[language].module_account_table_time_name}</div>
                <div style="FLOAT: LEFT;padding: 2% 3%;font-size: 2em;    color: #FFFFFF;width: 40%;text-align: left;" id="table-description">${CONFIGURATION[language].module_account_table_description_name}</div>
                <div style="FLOAT: LEFT;padding: 2% 3%;font-size: 2em;    color: #FFFFFF;width: 25%;text-align: left;" id="table-amount">${CONFIGURATION[language].module_account_table_amount_name}</div>
            </div>
            <div  id="ScrollRes" style=" overflow-y: scroll; height:750PX;">
            ${html}
            </div>
        </div>
    </div>`;
    wrapper.append(contentHtml);
};
    

function renderBody(data){
    const wrapper = $(`.contenido`);
    var contentHtml = `
    <div class="col-12 pl-5 serv-rest" style="display: none;">
    </div>
    <div class="col-12 pl-0">
        <div class="col-12 pl-4 multi-rest">
        <h1 style="MARGIN: 2% 0;">Historial de transacciones</h1>
        <div style="background: #838383;    height: 100px;">
            <div style="float: left;padding: 2% 3%;font-size: 1.5em; color: #FFFFFF;width: 20%;">FECHA</div>
            <div style="float: left;padding: 2% 3%;font-size: 1.5em; color: #FFFFFF;width: 20%;text-align: center;">HORA</div>
            <div style="float: left;padding: 2% 3%;font-size: 1.5em; color: #FFFFFF;width: 40%;text-align: center;"">DESCRIPCION</div>
            <div style="float: left;padding: 2% 3%;font-size: 1.5em; color: #FFFFFF;width: 20%;text-align: center;">MONTO</div>
        </div>
        <div  id="ScrollRes" class="scroll__body" style=" overflow-y: scroll; height:750px;width: 100%">
    `;
    var bodyHtml = data.map((item, key) => {
        const date = new Date(item.transaction_datetime);
        const hour = date.getHours();
        const minutes = date.getMinutes();
        const dateFormat = date.toLocaleDateString("en-US");
        const time = `${hour}:${minutes}`;
        return `
        <input type="hidden" id="service_id_${item.id}_${key+1}" name="service-id" value="${item.transaction_description}">
        <input type="hidden" id="service-type" name="service-type" value="${item.id}">
        <div class="itembody ${key+1===1?"itemselected":""}" style="background:#d2d2d2; height: 100px;width: 100%;margin: 3% 0;" col=1 row=${key+1} serial=${item.id}>
            <div style="text-align: center;float: left;padding: 2% 3%;font-size: 1.5em;;width: 20%;">${dateFormat}</div>
            <div style="text-align: center; float: left;padding: 2% 3%;font-size: 1.5em;;width: 20%;text-align: center;">${time}</div>
            <div style="text-align: center;float: left;padding: 2% 3%;font-size: 1.5em;;width: 40%;text-align: left;">${item.transaction_description}</div>
            <div style="text-align: right;float: left;padding: 2% 3%;font-size: 1.5em;;width: 20%;text-align: right;">${item.currency_symbol} ${item.amount}</div>       
        </div>
        `
    }).join(` `) ;
    console.log(bodyHtml);
    contentHtml = `
        ${contentHtml}
        ${bodyHtml}
        </div>
        </div>
        </div>
    `
    console.log(contentHtml);
    wrapper.append(contentHtml);
};


(async function(){

    try{
    show_loader();
    const account = await get_account_data(GUEST_ID);
    const startDate = new Date(account.billing_date_start).toLocaleDateString("en-US");
    const endDate = new Date(account.billing_date_end).toLocaleDateString("en-US");

    const config = await get_config_data();
    language = config.language;
    currency = config.currency;

    const result = await get(ENDPOINT_TRANSACTIONS, {method: 'GET'});
    const transactions = result.data;
    console.log(transactions);
    console.log(GUEST_ID);
    const transactionsGuest = result.data.filter(e => e.guest_id === GUEST_ID);

    renderSideBar([{
        currency_symbol: account.currency_symbol,
        total_amount: account.total_amount,
        billing_date: `${startDate} - ${endDate}`
    }]);
    render_body(transactionsGuest);
    hide_loader();
    init();
    control_magic_remoto();
    }catch(ex){
        console.log(ex)
    }
})();