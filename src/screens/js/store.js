//#region globals
var products;
var modalActive = false;
var language = '';
var currency = '';
var move = 0;
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

const select_back_buttom = (past, current) => {
  past.removeClass(`itemselected active`);
  current.addClass(`itemselected active`);
};

const select_product = (past, current) => {
  
  select_body_item(past, current);
  setTimeout(() => {
    open_confirm_modal();
  }, 1000);
};

const select_item_menu = async(past, current) => {
  show_loader();
  past.removeClass(`itemselected active`);
  current.addClass(`itemselected active`);
  const categoryId = Number(current.attr(`serial`));
  const imgUrl = current.attr('img-url').toString();
  $('.img-rest').attr('src', imgUrl);
  render_body(await get_data(categoryId));
  hide_loader();
};

const get_data = async(categoryId) => {
  try{
    const result = await get(ENDPOINT_GET_PRODUCTS, { method: 'GET' });
    const data = result.data.filter(x => x.product_category_id === Number(categoryId));
    return data;
  }catch(ex){
    console.log(ex);
  }
};


const select_body_item = (past, current) => {
  const scrollBody = $(`.scrollbar`);
  past.removeClass(`body__item_selected active`);
  current.addClass(`body__item_selected active`);
  
  const apos = Number(current.attr('pos'));
  const bpos = Number(past.attr('pos'));
  console.log(apos,' ', bpos);
  if(apos !== bpos){
    scrollBody.animate({scrollTop: apos*470}, 300);
  }
};


const set_module_header = (text) => {
  $('#storeTitle').text(text);
};
  

const select_button_modal = (past, current) => {
  past.removeClass('active');
  current.addClass('active');
};

const open_confirm_modal = () => {

  const objectHTML = $('.card-box.active'); 
  const price = parseFloat(objectHTML.attr('product-price')); 
  const productName = objectHTML.attr('product-name');

  $('#modal-header').text(`Producto: ${productName}`);
  $('#modal-subheader').text(`Precio: ${get_price_format(price)}`); // cambiar simbolo por cookie

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

const get_account_data = async(guestId) => {
  try{
    const response = await get(ENDPOINT_ACCOUNT_BY_GUEST(guestId), { method: 'GET' });
    const data = response.data;
    return data[0];
  }catch(ex){
    console.log(ex);
  }
};

const post_store_transaction = async() => {
  try{
    //post to endpoint transaction
    const objectHTML = $('.card-box.active');
    
    const productId = Number(objectHTML.attr('serial'));
    const price = parseFloat(objectHTML.attr('product-price')); 
    const productName = objectHTML.attr('product-name');

    let account = await get_account_data(GUEST_ID);
    account.total_amount = parseFloat(account.total_amount) + price;

    console.log(account);

    const body = {
      transaction_datetime: new Date().toISOString(),
      transaction_description: productName,
      currency_symbol: 'S/.', // sacar de cookie
      amount: price,
      soles: price,
      euro: price,
      dollar: price,
      product_id: productId,
      account_id: account.id,
      guest_id: GUEST_ID,
    };

    await post(ENDPOINT_TRANSACTIONS, body);
    await post(ENDPOINT_ACCOUNT, account);

    close_confirm_modal();
    open_success_modal();
  }catch(ex){
    console.log(ex);
    //open modal error;
  }
};

const control_magic_remote_menu = (e, row) => {
  const past = $(`.itemselected.active`); 
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
          const current =$(`.itembody[col=1][row=1]`);
          select_body_item(past, current);
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
}
const control_magic_remote_body = (e, row) => {
  const size = $(`.itembody`).length;
  const past = $(`.itembody.body__item_selected`);
  const scrollBody = $(`.contenido`);
  switch(e.keyCode){ 
      case 13:
          open_confirm_modal();
        break;
      case 37:
          row = row - 1;
          if(row <= 0){
            const current = $(`.itemmenu.itemselected`);
            select_item_menu(past, current);
          }else{
            const current = $(`.itembody[col=1][row=${row.toString()}]`);
            select_body_item(past, current);
          }
          break;
      case 38:
          // press top
          row = row - 3;
          if(row <= 0) {return;}
          else{
              const current = $(`.itembody[col=1][row=${row.toString()}]`);
              select_body_item(past, current);
          }
          break;
      case 39:
          // press right
          row = row + 1;
          if (row > size) return;
          else {
            const current = $(`.itembody[col=1][row=${row.toString()}]`);
            select_body_item(past, current);
          }
          return; 
      case 40:
          // press bottom
          row = row + 3;
          if( row > size) {return;}
          else{
              const current = $(`.itembody[col=1][row=${row.toString()}]`);
              select_body_item(past, current);
              //scrollBody.scrollTop(displacement*(-1));
          } 
          break;
  };
}
const control_magic_remote_back = (e) => {
  const past = $(`.back`); 
  const size = $(`.itemmenu`).length;
  console.log(size);
  switch(e.keyCode){
    case 13:
        window.location.href = "index.html";
        break; 
    case 37:
        return;
    case 38:
        const current = $(`.itemmenu[col=0][row=${size}]`);
        select_item_menu(past, current);
        break;
    case 39:
        //rigth
        return;
    case 40:
        //button
        return;
  };
}

const control_magic_remote_modal = (e) => {
  const past = $(`.modal-button.active`); 

  switch(e.keyCode){
    case 13:
        
        if(past.hasClass('confirm-modal')){
          console.log('sds');
          post_store_transaction();
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

const control_magic_remote = () => {
  $('body').bind("keydown", function(e){   
    console.log(modalActive);
    if(modalActive){

      control_magic_remote_modal(e);

    }else{

      const element = $(`.active`);
      console.log(element.length);
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
    }
  });
};

const render_sidebar = (data) => {
  const wrapper = $(`.sidebar`);
  const contentHtml = data.map((item,index) => {
    return `
    <li class="itemmenu ${index > 0 ? "" : "itemselected"}" col="0"  row="${index + 1}" serial="${item.id}" img-url="${item.img_url}">
        <div class="item" >
            <p>${get_category_by_language(item)}</p>
        </div>
    </li>
    `;
  }).join(" ");
  wrapper.append(contentHtml) 
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

const render_body = (data) => {
  console.log(data);
  const wrapper = $(`.contenido`);
  wrapper.empty();
  const html = data.map((item, index) => {
        return `
        <div class="card-box col-44 subgrid itembody ${index > 0 ? "" : "body__item_selected active"}" Style="float:left"  col="1" row="${index + 1}" 
        product-img-url="${item.img_url}" product-name="${item.name}" product-price="${item.price}" 
        serial="${item.id}" pos="${parseInt(index/3)}">
            <div class="info" style="font-size: 26px;">
                <img src="${item.img_url}" class="rest-img img-fluid" style="width: 326px;object-fit:contain;background-color: white">
                <div class="rest-info pl-4">
                    <div >${item.name}</div>
                    <p class="precio">${get_price_format(item.price)}</p>
                </div>
            </div>
        </div>
          `
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

      wrapper.append(contentHtml);
}

const show_loader = () => {
  $('#loader-wrapper').removeClass('Oculto').addClass('Activo');
};

const hide_loader = () => {
  $('#loader-wrapper').removeClass('Activo').addClass('Oculto');
};



/*
function renderSideBar(data,itemMenuId) {
  const wrapper = $(`.sidebar`);
  const contentHtml = data.map((item,index) => {
    return `
    <input type="hidden" id="ColumCategoria_${key}" value="${item.id}">
    <li class="itemmenu ${index > 0 ? "" : "body__item_selected active"}" col="0"  row="${index + 1}" serial="${item.id}">
        <div class="item" >
            <p>${item.name}</p>
        </div>
    </li>
    `;
  }).join(" ");
  wrapper.append(contentHtml)
};
*/
  (async function () {
    try{
      show_loader();
      const categoriesResult = await get(ENDPOINT_GET_PRODUCT_CATEGORIES, {method: 'GET'});
      const productResult = await get(ENDPOINT_GET_PRODUCTS, {method: 'GET'});


      const config = await get_config_data();
      language = config.language;
      currency = config.currency;

      set_module_header(CONFIGURATION[language].module_store_header_name);

      console.log(language,' ',currency);

      const categories = categoriesResult.data;
      console.log(categories);
      products = productResult.data.filter( x => x.product_category_id === parseInt(categories[0].id));
      console.log(products);
      render_sidebar(categories);
      render_body(products);
      hide_loader();
      control_magic_remote();
    }catch(e){
      console.log(e);
    }

    /*const location = window.location.href;
    const q = location.split('?');

    const productResult = await get(ENDPOINT_GET_PRODUCTS, {method: 'GET'});
    const categoriesResult = await get(ENDPOINT_GET_PRODUCT_CATEGORIES, {method: 'GET'});
    const itemMenuId = q.length > 1 ? q[1] : categoriesResult.data[0].id;
    const itemBodyId = q.length > 2 ? q[2] : productResult.data[0].id
    const categoryId = categoriesResult.data.length > 0 ?


    products = productResult.data.
        filter(e => e.product_category_id === parseInt());
    
    var categories = categoriesResult.data;
    render_sidebar(categories);
    /*renderSideBar(categories,itemMenuId);
    renderBody(products,itemBodyId);
    */

   // manageMagicControl(categories, products);


    /****************************/
    $(`.itemmenu`).mouseover(async function(){
        var serial = $(this).attr(`serial`);
        var result  = await get(ENDPOINT_GET_PRODUCTS, {method: 'GET'});
        products = result.data.filter( x => x.product_category_id === Number(serial));
        render_body(products); 
        /*
        var filterData = productResult.data.filter(e => e.product_category_id === parseInt(serial));
        console.log(filterData);
        renderBody(filterData, 1);
        */
    });
    
    /****************************/
/*
    const location = window.location.href;
    const q = location.split('?');
    const productCategoryId = q.length > 1 ? q[1] : $(`.itemmenu[col=0][row=0]`).attr('serial');
    const productId = q.length > 2 ? q[2] : $(`.itemBody[col=0][row=0]`).attr('serial');

    console.log(`${productCategoryId} ---- ${productId}`);
    manageMagicControl();
    /*const location = window.location.href;
    const q = location.split("?");
    const topic = q.length > 1 ? q[1] : "world";
    config = {
      method: "GET",
      headers: {
        "x-rapidapi-host": `${NEWS_API_HOST}`,
        "x-rapidapi-key": `${NEWS_API_KEY}`,
      },
    };
    //   const data = await get(
    //     SEARCH_FREE(`page_size=10&lang=es&media=True&q=${topic}`, config)
    //   );
    */
   /*
    const data = mockData;
    const mock = mockCategories;
    const products = mockProducts;
    renderSideBar(mock);
    renderBody(products);
    */
  })();


function manageSidebar(event, element, menuJSON, bodyJSON){
    console.log(bodyJSON);
    console.log(products);
    var serial = 0;
    var row = parseInt(element.attr(`row`));
    switch(event.keyCode){
        case 38:
            row = row - 1;
            if(row < 0) row = menuJSON.length - 1;
            serial = $(`.itemmenu[col=0][row=${row.toString()}]`).attr(`serial`);
            selectItemMenu(serial, element);
            /*products = bodyJSON.filter(e => e.product_category_id === parseInt(serial));
            renderBody(products, 1);
            break;
            */
        case 39:
            selectItemBody($(`.itembody[col=1][row=0]`).attr(`serial`));
            break;
        case 40:
            row = row + 1;
            if( row > menuJSON.length - 1) row = 0;
            serial = $(`.itemmenu[col=0][row=${row.toString()}]`).attr(`serial`);
            selectItemMenu(serial, element);
            /*console.log(bodyJSON);
            products = bodyJSON.filter(e => e.product_category_id === parseInt(serial));
            console.log(products);
            renderBody(products, 1);
            */
            break;
        default:
            break;
    };
};


function openProductModal(serial, quantity){
  setProductQuantity(serial, quantity);
  setProductTitle(serial);
  setStoreAmount(serial, quantity);
  setProductImage(serial);
  $(`#store__modal`).modal(`show`);
}

function setProductQuantity(serial, quantity){
  const bodyElement = $(`.itembody[serial=${serial}]`);
  const quantityHtml = $(`.store_action_count`);
  quantityHtml.text(quantity);
}

function setProductImage(serial){
  const bodyElement = $(`.itembody[serial=${serial}]`);
  const productImage = bodyElement.attr(`product-img-url`);
  const imageHtml = $(`#store__image`);
  imageHtml.attr(`src`, productImage);
}

function setProductTitle(serial){
  const bodyElement = $(`.itembody[serial=${serial}]`);
  const name = bodyElement.attr(`product-name`); 
  const titleHtml = $(`.store__title`);
  titleHtml.text(name);
}

function setStoreAmount(serial, quantity){  
  const bodyElement = $(`.itembody[serial=${serial}]`);
  const price = parseFloat(bodyElement.attr(`product-price`));
  console.log(quantity);
  const totalAmount = parseInt(quantity)*parseFloat(price);
  console.log(totalAmount);
  const amountHtml = $(`.store__amount`);
  amountHtml.text(`S/. ${totalAmount}`);
}


function openConfirmModal(){
  $(`#store__modal`).modal(`hide`);
  $(`#store__confirm`).modal(`show`);
}


function manageBody(event, element, menuJSON, bodyJSON){
    var serial = 0;
    var row = parseInt(element.attr(`row`));
    switch(event.keyCode){
        case 13:
            //press ok
            openProductModal();
            break; 
        case 37:
            row = row - 1;
            serial = $(`.itembody[col=1][row=${row.toString()}]`).attr(`serial`);
            // get row current item menu
            if(row<0) selectItemMenu($(`.itemmenu[col=0][row=0]`).attr(`serial`));
            else selectItemBody(serial);
            // press left
            break;
        case 38:
            // press top
            break;
        case 39:
            // press right
            row = row + 1;
            console.log(bodyJSON);
            if(row > products.length - 1) row = 0;
            console.log(`row : ${row}`);
            serial = $(`.itembody[col=1][row=${row.toString()}]`).attr(`serial`);
            selectItemBody(serial);
        case 40:
            // press bottom
            break;
    };
};


  function manageMagicControl(menuJSON, bodyJSON){
    $('body').bind("keydown", function(event){
        var element = $(`.active`); 
        var col = element.attr(`col`);

        switch(col){
            case `0`:
                manageSidebar(event, element, menuJSON, bodyJSON);
                break;
            case `1`:
                manageBody(event, element, menuJSON, bodyJSON);
                break;
            default:
                break;
        }
      });
 } 

//type : 0 item menu, 1 item body 
function getRowCol(serial, type){
    var xy = [];
    xy.length = 2;
    if(type===0) {
        xy[0] = parseInt($(`.itemmenu[serial=${serial}]`).attr('col'));
        xy[1] = parseInt($(`.itemmenu[serial=${serial}]`).attr('row'));
    }
    else {
        xy[0] = parseInt($(`.itembody[serial=${serial}]`).attr('col'));
        xy[0] = parseInt($(`.itembody[serial=${serial}]`).attr('row'));
    }
    return xy;
}
  
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
  
  

  function renderSideBar(data,itemMenuId) {
      var sideBar = document.getElementsByClassName("sidebar");
      console.log(sideBar);
      var contentHtml = data.map((item,key) => {
        return `
        <input type="hidden" id="ColumCategoria_${key}" value="${item.id}">
        <li class="itemmenu ${item.id} grid ${item.id===parseInt(itemMenuId)?"itemselected active":""}" id="${item.id}_Inicio" col="0"  row="${key}" serial="${item.id}">
            <div class="item" >
                <p>${item.name}</p>
            </div>
        </li>
        `;
      }).join(" ");
      console.log(contentHtml);
      $(".main-list .sidebar").append(contentHtml);
  };

  function renderBody(data, itemBodyId){
      var wrapper = document.getElementById(`content-wrapper`);
      var contentHtml = data.map((item, key) => {
          return `
        <div class="card-box col-44 subgrid itembody ${item.id===parseInt(itemBodyId) ? "itemselected":""}" Style="float:left"  col="1" row="${key}" 
        product-img-url="${item.img_url}" product-name="${item.name}" product-price="${item.price}" 
        serial="${item.id}">
            <input type="hidden" id="service_id_'+id+'_'+id_serv+'"   name="service-id" value="${item.id}">
            <input type="hidden" id="nombre_id_'+id+'_'+id_serv+'"   name="nombre-id" value="${item.name}">
            <input type="hidden" id="precio_id_'+id+'_'+id_serv+'"   name="precio-id" value="${item.prie}">
            <input type="hidden" id="service-type" name="service-type" value="${item.product_category_id}">
            <div class="info" style="font-size: 26px;">
                <img src="${item.img_url}" class="rest-img img-fluid" style="width: 326px;object-fit:contain;background-color: white">
                <div class="rest-info pl-4">
                    <div >${item.name}</div>
                    <p class="precio">sss${item.price}</p>
                </div>
            </div>
        </div>
          `
      }).join(" ");
      wrapper.innerHTML = contentHtml;
  }

/*

  $.ajax({
    url: URL_API_PRODUCTS_BY_TYPE,
    type: 'GET',
    data:{
        bookingId: bookingId
    },
    async: false,
}).done(function(data){
    var text = '';
    data.result.forEach(function(value , key){
        var id = parseInt(key) + 1;
        var help = '';
        var html = '';
        html += '<input type="hidden" id="ColumCategoria_'+id+'" value="'+value.productTypeId+'">';
        html += '<li class="itemmenu '+value.productTypeId+' grid" id="'+id+'_Inicio" column="1" row="'+id+'" data-type="'+value.productTypeId+'">';
        html += '   <img class="item-background" src="'+value.photo+'" style="display: none;">'
        html += '   <div class="item" >';
        html += '       <p>'+value.name+'</p>'
        html += '   </div>';
        html += '</li>';

        text += '<div class="col-12 pl-5 serv-rest '+value.productTypeId+'" style="display: none;">';
        text += '</div>';
        text += '<div class="'+value.productTypeId+' col-12 pl-0 scrollbar" id="ScrollRes_'+id+'" data-type="'+value.name+'" style="display: none;">';
        text += '   <div class="col-12 pl-4 multi-rest">';
        var count = 0;
        value.products.forEach(function(serv, key){
            currencySymbol = serv.currencySymbol;
            $("#precio").text("Precio: "+serv.currencySymbol);
            count = count + 1;
            var id_serv = parseInt(key) + 1;

            text += '<div class="card-box col-44 subgrid" Style="float:left" column="2" row="'+id_serv+'">';
            text += '   <input type="hidden" id="service_id_'+id+'_'+id_serv+'"   name="service-id" value="'+serv.productId+'">';
            text += '   <input type="hidden" id="nombre_id_'+id+'_'+id_serv+'"   name="nombre-id" value="'+serv.name+'">';
            text += '   <input type="hidden" id="precio_id_'+id+'_'+id_serv+'"   name="precio-id" value="'+serv.unitPrice+'">';
            text += '   <input type="hidden" id="service-type" name="service-type" value="'+value.tipoProductoId+'">';
            text += '   <div class="info" style="font-size: 26px;">';
            text += '       <img src="'+serv.photo+'" class="rest-img" style="width: 326px;object-fit:contain;background-color: white">';
            text += '       <div class="rest-info pl-4">';
            text += '           <div >'+serv.name+'</div>';
            text += '           <p class="precio">'+serv.currencySymbol+ ' '+serv.unitPrice.toFixed(2)+'</p>';
            text += '       </div>';
            text += '   </div>';
            text += '</div>';
        });
        for(var i = 0; i <1 ; i++){
            text += '<div class="card-box row subgrid" Style="float:left; height: 600px;" column="2">';
            text += '   <h1 style="width: 100%"></h1>';
            text += '   <div class="info">';
            text += '   </div>';
            text += '</div>';
        }
        text += '   </div>'
        text += '</div>';
        html += '<input type="hidden" id="Colum_'+id+'" value="'+count+'">';
        $(".main-list .sidebar").append(html);
    })
    $(".contenido").append(text);
    showPreloader();
    var Act = $("#ColumCategoria_1").val();
    changeService(Act);
});

function valor(){
    ModalAct = 1;
    $('#ActiveModal1').addClass("itemselected");
    $("#confirmModal").modal('show');
    ModalShow = true;
}

function redirect(){
    window.location.replace("index.html");
}
function ActualizaGrid(column, row, Activa, Subrow, Scroll){
    if(Activa != false){
        showPreloader();
        $('.grid').removeClass('active');
        $('.grid').removeClass('itemselected');
        $('.grid[column=1][row='+row+']').addClass('active');
        $('.grid[column=1][row='+row+']').addClass('itemselected');
        if(row != 6){
            changeService($("#ColumCategoria_"+ row).val());
        }else{
            hidePreloader();
        }
        $('.subgrid').removeClass('active');
        $('.subgrid[column=2][row='+Subrow+']').addClass('active');

    }else{
        $('.subgrid').removeClass('active');
        $('.subgrid[column=2][row='+Subrow+']').addClass('active');
        $("#ScrollRes_"+row).animate({ scrollTop: Scroll }, (300));
    }
}

function showPreloader() {
    $("#loader-wrapper").removeClass("Oculto").addClass("Activo");
}

function hidePreloader() {
    $("#loader-wrapper").removeClass("Activo").addClass("Oculto");
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
  
  function getModal(id, plan = {}) {
    return `
    <div style="position:relative" class="modal fade" id="${id}" data-backdrop="static" data-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="staticBackdropLabel">Confirmar compra</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body p-3">
          Usted a seleccionado el plan "${plan.name || "No definido"}"
          <div><span class="text-secondary">Precio: </span><span>${
            plan.total_amount
          } ${plan.total_amount_measure}</span></div>
          <div class="d-flex flex-column justify-content-center m-4">
            <h6 class="text-primary text-center ">Por cuantos dias lo desea seleccionar</h6>
            <input class="p-3" type="text" placeholder="0" style="font-size:1.2rem"/>
          </div>
        </div>
        <h3 class="pl-3">
          Total: ${plan.total_amount * 1} ${setSymbol(plan.total_amount_measure)}
        </h3>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
          <button type="button" class="btn btn-primary">Comprar</button>
        </div>
      </div>
    </div>
  </div>
  </div>
  `;
  }
  */