var currentUrl = window.location.href;
var params = currentUrl.split("?");
console.log(params);
var action = '';

var eventName = params[1];
var serviceUrl = '';
if(params.length > 1){
  serviceUrl = `https://ires2-tesis-backend.herokuapp.com/api/v1/events?name=${eventName}`;
  action = 'Reservar';
}else{
  serviceUrl = `https://ires2-tesis-backend.herokuapp.com/api/v1/events`;
  action = 'Más Información';
}


//var PlatoId = 0;
//var ServicioId = 0;


fetch(serviceUrl)
  .then(
    function(response) {
      if (response.status !== 200) {
        console.log('Looks like there was a problem. Status Code: ' +
          response.status);
        return;
      }
      // Examine the text in the response
      response.json().then(function(data) {
        console.log(data);
        render(data.data,action);
      });
    }
  )
  .catch(function(err) {
    console.log('Fetch Error :-S', err);
  });


  function render(data,action){
    var wrapper = document.getElementById('Contenido');
    console.log(wrapper);
    var html = data.map(function(item,index){
        return(  `<div class="'+help+' col-12 pl-0" id="ScrollRes_'+id+'" data-type="'+help+'" style="">
        <div class="col-12 pl-4 multi-rest">
        <div class="card-box p-4 subgrid" column="2" row="'+id_serv+'">
        <h1>${item.name}</h1>
        <div class="info">
        <img src="${item.imgUrl}" class="rest-img">
        <div class="rest-info pl-4">
        <p>${item.description}</p>
        </div>
        <div class="rest-infoDiv">
        <button onclick="InfoRedirect()" class="btn btn-primary more-info">${action}</a>
        </div>
        </div>
        </div>
        </div>
        </div>`) 
    }).join(" ");
    
    wrapper.innerHTML = html;
}
