//#region globals 
var modal_open = false;
//#endregion

const select_item_menu = async (e) => {
    try{
        switch(e){
            case 1:
                break;
            case 2:
                break;
            case 3:
                break;
            case 4:
                const dishTypesResult = await get(ENDPOINT_GET_DISH_TYPES, {method: 'GET'})
                const dishTypes = dishTypesResult.data;
                const dishesResult = await get(ENDPOINT_GET_DISHES, {method: 'GET'})
                const dishes = dishesResult.data;
                render_content_inroom_dining(dishes, dishTypes);
                break;
            default:
                break;
        }
    }catch(ex){
        console.log(ex);
    }   
};
const toggle_dish_type = (e) => {
    e.trigger(`click`);
};
const select_dish_types = (past, current) => {
    past.removeClass(`active selected`);
    current.addClass(`active selected`);
    current.trigger(`click`);
};
const select_dish = (past, current) => {
    past.removeClass(`dish__active selected`);
    current.addClass(`dish__active selected`);
};
const post_inroom_dining = async(body) => {
    try{
        const JSONResponse = await post(ENDPOINT_GET_TRANSACTIONS, body);
        //close modal && show modal success
    }catch(ex){
        console.log(ex);
    }
};
const open_modal_confirm = () => {
    $(`.mask`).removeClass(`close-mask`);
    $(`.news__modal`).removeClass(`close-modal`);
};
const close_modal_confirm = () => {
    $(`.mask`).addClass(`close-mask`);
    $(`.news__modal`).addClass(`close-modal`);
};
const control_magic_remote_modal = (e) => {
    switch(e.keyCode){
        case 13:
            if(!$(`.accept`).hasClass(`modal_button_disabled`)){

            }else{
                close_modal_confirm();
                modal_open = false; 
            }
            break; 
        case 37:
            //left
            $(`.cancel`).removeClass(`modal_button_disabled`);
            $(`.accept`).addClass(`modal_button_disabled`);
            break;
        case 38:
            //top
            return;
        case 39:
            // press right
            $(`.accept`).removeClass(`modal_button_disabled`);
            $(`.cancel`).addClass(`modal_button_disabled`);
            break; 
        case 40:
            //bottom
            return;
    };
};
const control_magic_remoto_dishes = (e, row) => {
    const past = $(`.news__section_item.selected`);
    const dishType = past.attr(`dish_type`);
    const size = $(`.news__section_item[dish_type=${dishType}]`).length;
    const sizeDishTypes = $(`.news__section_header`).length;
    let dishTypeRow;
    let current;
    let toggle;

    switch(e.keyCode){
        case 13:
            //press ok
            open_modal_confirm();
            modal_open = true;
            break; 
        case 37:
            //left
            row = row - 1;
            if(row <= 0) return;
            else {
                toggle  = $(`.news_section_header[dish_type=${dishType.toString()}]`); 
                toggle_dish_type(toggle);
                const current = $(`.news__section_item[col=2][row=${row.toString()}][dish_type=${dishType.toString()}]`);
                select_dish(past, current);
            }
            return;
        case 38:
            //top
            dishTypeRow = past.attr(`dish_type`);
            if(Number(dishTypeRow) > 1){
                toggle = $(`.news__section_header[col=1][row=${Number(dishTypeRow) - 1}]`);
                current = $(`.news__section_item[col=2][row=1][dish_type=${Number(dishTypeRow) - 1}]`)
                toggle_dish_type(toggle);
                select_dish(past, current);
            }else{
                return;
            }
            break;
        case 39:
            row = row + 1;
            if(row > size) return;
            else{
                console.log(`new row: ${row}`)
                current = $(`.news__section_item[col=2][row=${row.toString()}][dish_type=${dishType.toString()}]`);
                select_dish(past, current);
            }
            // press right
            break; 
        case 40:
            //bottom
            dishTypeRow = past.attr(`dish_type`);
            console.log(`Size type dish: ${sizeDishTypes}`);
            if(dishTypeRow > sizeDishTypes){
                return;
            }else{
                toggle = $(`.news__section_header[col=1][row=${Number(dishTypeRow) + 1}]`);
                current = $(`.news__section_item[col=2][row=1][dish_type=${Number(dishTypeRow) + 1}]`)
                toggle_dish_type(toggle);
                select_dish(past, current);
                
            }
            break;
    };
};
const control_magic_remoto = () => {
    $('body').bind("keydown", function(e){
        
        const element = $(`.selected`);
        let row = parseInt(element.attr(`row`));
        let col = parseInt(element.attr(`col`)); 
        console.log(row);
        console.log(col);
        if(modal_open === true){
            control_magic_remote_modal(e);
        }else{
            switch(col){
                case 0:
                    control_magic_remoto_menu(e, row)
                    //$(`.scroll__body`).css(`overflow-y`, `hidden`);
                    break;
                case 1:
                    //control_magic_remoto_dishTypes(e, row);
                    //$(`.scroll__body`).css(`overflow-y`, `scroll`);
                    break;
                case 2:
                    control_magic_remoto_dishes(e, row);
                case 4:
                    //control_magic_remote_back(e);
                default:
                    break;
            }
        }
      });
  }; 
  
const render_content_inroom_dining = (dishes, dishTypes) => {
    const wrapper = $(`.news__main`);
    const contentHtml = dishTypes.map((dishType, index) => {
        return `
        <div class="news__section">
        <div class="news__section_header" data-toggle="collapse" data-target="#collapse${index + 1}" col="${1}" row="${index + 1}"
        dish_type="${dishType.id}">
          <div class="news__section_title">${dishType.description}</div>
          <button>
            <span>-</span>
           </button>  
        </div>
        <div id="collapse${index + 1}" class="collapse ${ index > 0 ? "" : "show"}" data-parent=".news__main">
        <div class="news__section_items active">
        ${dishes.filter((e) => e.dish_type_id === dishType.id)
            .map( (dish, key) => {
            return `
            <div class="news__section_item ${key > 0 ? "" : "dish__active selected"}" col=2 row="${key + 1}" dish_type="${dishType.id}">
                <button class="news__section_plus_button">+</button>
                <div class="news__section_item_image">
                    <img src="${dish.photoUrl}" alt="..." width="100%" height="100%"/> 
                </div>
                <div class="news__section_item_title">
                    ${dish.name}
                </div>  
                <div class="news__section_item_price">
                    S/ ${dish.total_amount}
                </div>
            </div>
            `
        }).join(` `)}
        </div>
        </div>
        </div>
        `
    }).join(` `);

    wrapper.append(contentHtml);
}

(async function () {


    select_item_menu(4);
    control_magic_remoto();
  
  })();
  
  
  