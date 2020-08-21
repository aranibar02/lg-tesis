var currentUrl = window.location.href;
var params = currentUrl.split("?");
var showModal = params[1];
console.log(params[1]);
var serviceUrl = 'https://ires2-tesis-backend.herokuapp.com/api/v1/reservation';

if(showModal){
    $('#acceptModal').modal('show');
}

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
        render(data.data);
      });
    }
  )
  .catch(function(err) {
    console.log('Fetch Error :-S', err);
  });


  function render(data){
    var wrapper = document.getElementById('Contenido');
    console.log(wrapper);
    var html = data.map(function(item,index){
        return(  `<div class="'+help+' col-12 pl-0" id="ScrollRes_'+id+'" data-type="'+help+'" style="">
        <div class="col-12 pl-4 multi-rest">
        <div class="card-box p-4 subgrid" column="2" row="'+id_serv+'">
        <h1>${item.name}</h1>
        <div class="info">
        <img src="https://www.eltiempo.com/files/image_640_428/uploads/2019/10/18/5daa48b453c19.jpeg" class="rest-img">
        <div class="rest-info pl-4">
        <p>${item.description}</p>
        <p>${item.start_time}</p>
        <p>${item.end_time}</p>
        </div>
        </div>
        </div>
        <div class="card-box row subgrid" column="1" style="height: 150px;">
        <h1 style="width: 100%"></h1>
        <div class="info">
        </div>
        </div>
        </div>
        </div>`) 
    }).join(" ");
    
    wrapper.innerHTML = html;
}




