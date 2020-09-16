
//#region functions
const render_body = (data) => {
    const wrapper = $(`.contenido`);
    const contentHtml = data.map((item, key) => {
        return(
            `
            <div class="tile ${key>0 ? "" : "selected"}" col="1" row="${key + 1}" serial="${item.id}">
                <div class="wrapper">
                    <div class="header">${item.name}</div>
                    <div class="banner-img">
                        <img src="${item.img_url}" alt="Image 1">
                    </div>
                    <div class="row dates">
                        <div class="col-6 tab left ${key>0 ? "" : "active"}">Descripción</div>
                        <div class="col-6 tab right">¿Cómo llegar?</div>                               
                    </div>
                    <div class="stats">
                        <p class="info-description">
                            ${item.description}
                        </p>
                        <p class="info-reference" style="display:none">
                            ${item.reference_address}
                        </p>
                    </div>
                    </div>
                </div> 
            </div>
            `
        )
    }).join(` `);  
    wrapper.append(contentHtml);
}


const render_sidebar = (data) => {
    const wrapper = $(`.sidebar_content`);
    const contentHtml = data.map((item, key) => {
        return(
            `
            `
        )
    }).join(` `);
    wrapper.append(contentHtml);
}

function selectItem(past,current){

    past.removeClass(`selected`)
    past.find(`.left`).removeClass(`active`);
    past.find(`.right`).removeClass(`active`);

    current.addClass(`selected`);
    current.find(`.left`).addClass(`active`);  
}

const  select_tab_left = (past, current) => {
    past.find(`.right`).removeClass(`active`);
    past.find(`.left`).removeClass(`active`);
    current.find(`.right`).removeClass(`active`);
    current.find(`.left`).addClass(`active`);
    current.find(`.info-description`).css(`display`,`block`);
    current.find(`.info-reference`).css(`display`,`none`);
}

const select_tab_right = (past, current) => {
    past.find(`.left`).removeClass(`active`);
    past.find(`.right`).removeClass(`active`);
    current.find(`.left`).removeClass(`active`);
    current.find(`.right`).addClass(`active`);
    current.find(`.info-description`).css(`display`,`none`);
    current.find(`.info-reference`).css(`display`,`block`);
}


const get_row = (serial) => {
    return parseInt($(`.tile[serial=${serial}]`).attr(`row`));
}

const get_column = (serial) => {
    return parseInt($(`.tile[serial=${serial}]`).attr(`row`));
}

const scroll_to_item = (i) => {
    const container = $(`.contenido`);
    container.animate({scrollTop: 500*(i)}, 300);
}



const control_magic_remote_body = (e, row) => {
    const past = $(`.selected`);
    const size = $(`.tile`).length;
    //const content = $(`.contenido`);
    //let displacement = parseFloat((content.height() - 15)/size);
    let current;
    //console.log(displacement);
    switch(e.keyCode){
        case 13:
            //press ok
            break; 
        case 37:
            // press left
             //const current = $(`.back__home`);
             //selectItem(past,current);
            current = $(`.tile[col=1][row=${row.toString()}]`);
            current.find(`.right`).removeClass(`active`);
            current.find(`.left`).addClass(`active`);
            current.find(`.info-description`).css(`display`,`block`);
            current.find(`.info-reference`).css(`display`,`none`);
            break;
        case 38:
            // press top
            row = row - 1;
            if(row <= 0) {return;}
            else{
                //displacement = displacement*row;
                current = $(`.tile[col=1][row=${row.toString()}]`);
                scroll_to_item(row-1);
                selectItem(past, current);
            }
            break;
        case 39:
            // press right
            current = $(`.tile[col=1][row=${row.toString()}]`);
            current.find(`.right`).addClass(`active`);
            current.find(`.left`).removeClass(`active`);
            current.find(`.info-description`).css(`display`,`none`);
            current.find(`.info-reference`).css(`display`,`block`);
            break; 
        case 40:
            // press bottom
            row = row + 1;
            //displacement = displacement + 0.5*displacement;
            if( row > size) {return;}
            else{
                //displacement = displacement*row;
                current = $(`.tile[col=1][row=${row.toString()}]`);
                //content.animate({scrollTop: 500*(row-1)}, 300);
                scroll_to_item(row - 1);
                selectItem(past, current);
                //scrollBody.scrollTop(displacement*(-1));
            } 
            break;
        }
};

const control_magic_remote_sidebar = (e) => {

};

const control_magic_remote = () => {
    $('body').bind("keydown", function(e){
        const element = $(`.selected`);
        let row = parseInt(element.attr(`row`));
        let col = parseInt(element.attr(`col`)); 
        console.log(row);
        switch(col){
            case 0:
                control_magic_remoto_back(e)
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
//#endregion

//#region main
(async function(){
    try{
        const result = await get(ENDPOINT_GET_TOURISTICPLACES, {method: 'GET'});
        const touristicPlaces = result.data;
        render_body(touristicPlaces);
        control_magic_remote();
    }catch(e){
        console.log(e);
    }
})();
//#endregion


