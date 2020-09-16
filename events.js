


const select_item_menu = async(past, current) =>{
  past.removeClass(`itemselected active`);
  current.addClass(`itemselected active`);
  const topic = current.attr(`topic`).toString();
  const x = await get(ENDPOINT_GET_EVENT_BY_TYPE(topic), {method: 'GET'});
  const e = x.data;
  render_body(e);
};

const select_item_body = async(past, current) =>{
  past.removeClass(`active`);
  current.addClass(`active`);
}

const control_magic_remoto_menu = (e, row) => {
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
          select_item_menu(past, current);
          break; 
      case 40:
          row = row + 1;
          if(row >   size) {
            const current = $(`.back`);
            select_item_menu(past, current);
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

const control_magic_remoto = () => {
  $('body').bind("keydown", function(e){ 
      const element = $(`.active`);
      let row = parseInt(element.attr(`row`));
      let col = parseInt(element.attr(`col`)); 
      console.log(row);
      switch(col){
          case 0:
              control_magic_remoto_menu(e, row)
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



const render_body = (data) => {
  var wrapper = document.getElementById('Contenido');
  var html = data.map(function(item, key){

      const date = new Date(item.start_time);
      const hour = date.getHours();
      const minutes = date.getMinutes();
      console.log(`minutes`,minutes);
      const format = date.toLocaleDateString("en-US");
      const time = `${hour}:${minutes}`;

      return(`<div class="card-box p-4 subgrid ${key > 0 ? "" : "active"}" col="1" row="${key + 1}">
      <h1>${item.name}</h1>
      <div class="info">
        <span><img src="${item.imgUrl}" class="rest-img"/></span>
        <div class="rest-info pl-4">
          <p>${item.description}</p>
          <span class="datelabel">Fecha: </span><span>: ${format} ,</span><span class="hourlabel"> Hora: </span><span>${time} </span>
        </div>
      </div>
    </div>
    ` ) 
  }).join(" ");
  wrapper.innerHTML = html;
}

(async function () {
    const pathUrl = window.location.href;

    const params = pathUrl.split("?");
    const defaultType = 'musica';
    const type = params.length > 1 ? params[1] : defaultType;
      
    const response = await get(ENDPOINT_GET_EVENT_BY_TYPE(type), {method: 'GET'});
    const events = response.data;
    render_menu(type);
    render_body(events);
    control_magic_remoto();
})();