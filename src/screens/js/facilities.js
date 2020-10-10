//#region
var lastItem = 0;
var language;
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
  }

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
                //$(`.scroll__body`).css(`overflow-y`, `hidden`);
                break;
            case 1:
                control_magic_remote_body(e, row);
                //$(`.scroll__body`).css(`overflow-y`, `scroll`);
                break;
            case 4:
                control_magic_remote_back(e);
                break;
            default:
                break;
        }
      });
  }; 
  
  /*const render_menu = (type) => {
    var wrapper = document.getElementById('menu');
    const items = [{header:"Música", value: "musica"},
                   {header:"Arte", value: "arte"},
                   {header:"Moda", value: "moda"},
                   {header:"Teatro", value: "teatro"}];
    var html = items.map(function(item, key){
      return `
      <li class="itemmenu grid ${type !== item.value ? "" : "itemselected"}" col="0" row="${key + 1}" topic="${item.value}">
        <div class="item">
          <p>${item.header}</p>
        </div>
      </li>
      `
    }).join(` `);
    wrapper.innerHTML = html;
  }
  */
  
  const render_body = (data) => {
    var wrapper = document.getElementById('content');
    var html = data.map(function(item, key){
  
        /*const date = new Date(item.start_time);
        const hour = date.getHours();
        const minutes = date.getMinutes();
        console.log(`minutes`,minutes);
        const format = date.toLocaleDateString("en-US");
        const time = `${hour}:${minutes}`;
        */

        return(`<div class="card-box p-4 subgrid ${key > 0 ? "" : "active"}" col="1" row="${key + 1}" serial="${item.id}">
        <h1>${item.name}</h1>
        <div class="info">
          <span><img src="${item.imgUrl}" class="rest-img"/></span>
          <div class="rest-info pl-4">
            <p>${item.description}</p>
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
    $('#titlePage').text(CONFIGURATION[language].submodule_facilities_name);
  };

  (async function () {
      const response = await get(ENDPOINT_FACILITIES, {method: 'GET'});
      const config = await get_config_data();
      language = config.language;

      const events = response.data;
      init();
      render_body(events);
      control_magic_remote();
  })();


  