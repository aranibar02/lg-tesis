const render_menu = (type) => {
    var wrapper = document.getElementById('menu');
    const items = [{header:"Gimnasio", value: "gimnasio"},
                   {header:"Spa", value: "spa"},
                   {header:"Restaurante", value: "restaurante"}
                   ];

    var html = items.map(function(item, key){
      return `
        <li class="itemmenu grid" col="0" row="${key + 1}">
            <div class="item">
                <p>${item.header}</p>
            </div>
        </li>
      `
    }).join(` `);
    wrapper.innerHTML = html;
};

const render_body = (data) => {
    var wrapper = document.getElementById('content');
    var html = data.map(function(item, key){
        return(`
        <div class="card-box p-4 subgrid" col="${1}" row="${key + 1}">
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
    <div class="col-12 pl-5 serv-rest" style="display: none;">
    </div>
    <div class="col-12 pl-0 scrollbar" style="display: none;">
        <div class="col-12 pl-4 multi-rest">
            ${html}
        </div>
    </div>
    `;
    wrapper.innerHTML = html;
  };

(async function () {
    try{
        const pathUrl = window.location.href;

        const params = pathUrl.split("?");
        const defaultType = 'gyms';
        const type = params.length > 1 ? params[1] : defaultType;
        let response = {};
        let data = {};

        switch(type){
            case 'gyms':
                response = await get(ENDPOINT_GET_GYMS, {method: 'GET'});
                break;
            case 'restaurants':
                response = await get(ENDPOINT_GET_RESTAURANTS, {method: 'GET'}); 
                break;
            case  'spas':
                response = await get(ENDPOINT_GET_SPAS, {method: 'GET'}); 
                break;
            default:
                break;
        }
        console.log(response.data);
        data = response.data;
        render_menu(type);
        render_body(data);
        //control_magic_remoto();
    }catch(ex){
        console.log(ex);
    };
})();




