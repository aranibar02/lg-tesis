//#region Globals
var modalShow = false;
//#endregion


//#region Utils
const render_body = (data) => {
  var wrapper = $(`.contenido`);
  var contentHtml = data.map((item, key) => {
      return `
        <div class="card shadow-lg ${key > 0 ? "" : "selected"}" id="${item.name.toLowerCase()}" col="1" row="${key + 1}" serial="${item.id}" style="width:20rem"
          highSpeed-name="${item.name}" highSpeed-price="${item.total_amount}"
        >
            <h3 class="card-title text-center mt-4">${item.name}</h3>
            <span class="dropdown-divider"></span>
            <div class="highSpeed__price">
              <span class="highSpeed__price_currency text-muted">S/.</span>
              <h2 class="display-3 text-center">${item.total_amount}</h2>
              <span class="highSpeed__price_currency" style="font-size: 0.9rem">/diario</span>
            </div>
            <span class="dropdown-divider"></span>
            <div class="card-body">
              <div class="text-center text-muted">Velocidad obtenida</div>
              <h2 class="text-center m-5">
                ${item.internet_speed} 
                ${item.unit_measure}
              </h2>
            </div>
            <div class="text-center card-footer p-4">
              <button type="button" id="btn_${item.name.toLowerCase()}" class="btn btn-light" data-toggle="modal">Obtener</button>
            </div>
        </div>
      `;
    }).join(" ");

  var getHtml = (html) => {
    return `
    <div style="width:100%;height:100vh;position:absolute;top:0;left:0">
    </div> 
    <div class="highSpeed__container">
      ${html}
      </div>
      `;
  };
  
  wrapper.append(getHtml(contentHtml));
  //wrapper.innerHTML = getHtml(contentHtml);
};

const open_highSpeed_modal = (serial, days = 1) =>{
  set_highSpeed_days(days);
  set_highSpeed_price(serial);
  set_highSpeed_title(serial);
  set_highSpeed_total(serial, days);
  const modal = $(`#highSpeed__modal`);
  modal.modal(`show`);
  modalShow = true;
};

const close_highSpeed_modal = () => {
  const modal = $(`#highSpeed__modal`);
  modal.modal(`hide`);
  modalShow = false;
};

const open_highSpeed_confirm_modal = () => {
  const modal = $(`#highSpeed__modal__confirm`);
  modal.modal('show');
};

const close_highSpeed_confirm_modal = () => {
  const modal = $(`#highSpeed__modal__confirm`);
  modal.modal('hide');
};

const set_highSpeed_days = (days) => {
  const highSpeedDaysHtml = $(`.highSpeed_days`);
  highSpeedDaysHtml.val(days);
};

const set_highSpeed_price = (serial) => {
  const highSpeedPrice = parseFloat($(`.shadow-lg[serial=${serial}]`).attr(`highSpeed-price`));
  const highSpeedPriceHtml = $(`.highSpeed_price`);
  highSpeedPriceHtml.text(`S/. ${highSpeedPrice.toFixed(2)}`);
};

const set_highSpeed_title = (serial) => {
  const highSpeedName = $(`.shadow-lg[serial=${serial}]`).attr(`highSpeed-name`);
  const highSpeedTitleHtml = $(`.highSpeed_title`);
  highSpeedTitleHtml.text(`Usted a seleccionado el plan ${highSpeedName}`)
};

const set_highSpeed_total = (serial, days) => {
  const highSpeedPrice = parseFloat($(`.shadow-lg[serial=${serial}]`).attr(`highSpeed-price`));
  const highSpeedTotalHtml = $(`.highSpeed_total`);
  const total = highSpeedPrice*days;
  highSpeedTotalHtml.text(`Monto total a pagar: S/. ${total.toFixed(2)}`);
};

const select_item_body = (past, current) => {
  past.removeClass(`selected`)
  current.addClass(`selected`);
};

const control_magic_remote_back = (e) => {
  const past = $(`.selected`);
  switch(e.keyCode){
    case 13:
        break;
    case 37:
        return;
    case 38:
        return;
    case 39:
        // press right
        console.log('eee');
        current = $(`.shadow-lg[col=1][row=1]`);
        select_item_body(past, current);
        break; 
    case 40:
        // press bottom
        return;
    }
}

const control_magic_remote_modal = (e, row) => {
  const past = $(`.selected`);
  const size = $(`.shadow-lg`).length;
  let current;
  switch(e.keyCode){
      case 13:
          current = $(`.shadow-lg[col=1][row=${row.toString()}]`);
          open_highSpeed_modal(current.attr(`serial`));
          break; 
      case 37:
          // press left
          row = row - 1;
          current = $(`.shadow-lg[col=1][row=${row.toString()}]`);
          select_item_body(past, current);
          break;
      case 38:
          return;
      case 39:
          // press right
          row = row + 1;
          if(row > size) return;
          current = $(`.shadow-lg[col=1][row=${row.toString()}]`);
          select_item_body(past, current);
          break; 
      case 40:
          // press bottom
          return;
      }
};

const control_magic_remote_body = (e, row) => {
  const past = $(`.selected`);
  const size = $(`.shadow-lg`).length;
  let current;
  switch(e.keyCode){
      case 13:
          current = $(`.shadow-lg[col=1][row=${row.toString()}]`);
          open_highSpeed_modal(current.attr(`serial`));
          break; 
      case 37:
          // press left
          row = row - 1;
          if(row <= 0) {
            current = $(`.back`);
            select_item_body(past, current);
          };
          current = $(`.shadow-lg[col=1][row=${row.toString()}]`);
          select_item_body(past, current);
          break;
      case 38:
          return;
      case 39:
          // press right
          row = row + 1;
          if(row > size) return;
          current = $(`.shadow-lg[col=1][row=${row.toString()}]`);
          select_item_body(past, current);
          break; 
      case 40:
          // press bottom

          return;
      }
};

const control_magic_remote =() => {
  $('body').bind("keydown", function(e){
    const element = $(`.selected`);
    console.log(modalShow);
    let row = parseInt(element.attr(`row`));
    let col = parseInt(element.attr(`col`)); 
    
    if(!modalShow){
      switch(col){
        case 0:
            control_magic_remote_back(e)
            break;
        case 1:
            control_magic_remote_body(e, row);
            break;
        default:
            break;
      }
    }else{
      control_magic_remote_modal();
    }
  });
};
//#endregion

(async function () {
 /* const location = window.location.href;
  const q = location.split("?");
  const topic = q.length > 1 ? q[1] : "world";
  */
  const result = await get(ENDPOINT_GET_HIGHSPEED, {method: 'GET'});
  const hsiaPackages = result.data;
  render_body(hsiaPackages);
  control_magic_remote();
})();

/*
function setSymbol(currency) {
  var DOLARS = "dolares";
  var SOLES = "soles";
  switch (currency) {
    case DOLARS:
      return "$";
    case SOLES:
      return "S./";
    default:
      return "$";
  }
}

function selectItem(past, current){
  past.removeClass(`itemselected active`)
  current.addClass(`itemselected active`);
}

function control_magin_remote_back(){

}




function render(data) {
  var wrapper = document.getElementById("Contenido");
  var showHighSpeedModalId = "highSpeedStaticBackdrop";
  var highSpeedPlanSelected = {
    name: "Basico",
    internet_speed: 10,
    unit_measure: "Mbps",
    total_amount: 5.0,
    total_amount_measure: "dolares",
    frecuency: "diario",
  };
  var contentHtml = data.plans
    .map((item) => {
      return `
        <div class="card shadow-lg" id="${item.name.toLowerCase()}" style="width:20rem">
            <h3 class="card-title text-center mt-4">${item.name}</h3>
            <span class="dropdown-divider"></span>
            <div class="highSpeed__price">
              <span class="highSpeed__price_currency text-muted">${setSymbol(
                item.total_amount_measure
              )}</span>
              <h2 class="display-3 text-center">${item.total_amount}</h2>
              <span class="highSpeed__price_currency" style="font-size: 0.9rem">/${
                item.frecuency
              }</span>
            </div>
            <span class="dropdown-divider"></span>
            <div class="card-body">
              <div class="text-center text-muted">Velocidad obtenida</div>
              <h2 class="text-center m-5">
                ${item.internet_speed} 
                ${item.unit_measure}
              </h2>
            </div>
            <div class="text-center card-footer p-4">
              <button type="button" id="btn_${item.name.toLowerCase()}" class="btn btn-primary" data-toggle="modal" data-target="#${showHighSpeedModalId}">Obtener</button>
            </div>
        </div>
      `;
    })
    .join(" ");

  var getHtml = (html) => {
    return `
    <div style="width:100%;height:100vh;position:absolute;top:0;left:0">
      ${getModal(showHighSpeedModalId, highSpeedPlanSelected)}
    </div> 
    <div class="highSpeed__container">
      ${html}
      </div>
      `;
  };
  wrapper.innerHTML = getHtml(contentHtml);
}
*/
