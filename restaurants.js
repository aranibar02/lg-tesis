var currentUrl = window.location.href;
var params = currentUrl.split("?");
console.log(params);
console.log(`this a endpoint services : ${ENDPOINT_GET_RESTAURANTS}`);

var restaurantName = params[1];
console.log(restaurantName);
var serviceUrl = '';
if(params.length > 1){
  serviceUrl = `https://ires2-tesis-backend.herokuapp.com/api/v1/restaurants?name=${restaurantName}`;
}else{
  serviceUrl = `https://ires2-tesis-backend.herokuapp.com/api/v1/restaurants`;
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
        </div>
        <div class="rest-infoDiv">
        <button onclick="InfoRedirect()" class="btn btn-primary more-info">Reservar</a>
        </div>
        </div>
        </div>
        </div>
        </div>`) 
    }).join(" ");
    
    wrapper.innerHTML = html;
}




/*<div class="modal fade" id="acceptModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
<div class="modal-dialog modal-lg" role="document">
    <div class="modal-content">
        <div class="modal-body">
            <img src="icons/confirm-icon.svg"/>
            <p id="reservationSuccededTxt" class="mt-5">¡Tu reserva se realizó con éxito!</p>
        </div>
    </div>
</div>
</div>



function generarReserva(parametros) {
    $.ajax({
        url: URL_API_RESERVATION_POST_BY_BOOKING,
        type: 'POST',
        dataType:'json',
        contentType: 'application/json',
        async: false,
        data:  JSON.stringify({
            bookingId : bookingId,
            serviceId:parametros.servicioId,
            reservationDate:parametros.fechaReserva,
            dishId:parametros.platoId
        }),
        success: function (msg, status, jqXHR) {
            $('#acceptModal').modal('show');
           var delay = 2000;
            setTimeout(function () {
                window.location = "servicios.html";
            },delay)
        },
        error: function (errorThrown) {
            console.log(errorThrown);
            $("#msjConfirmacion").text("Ocurrió un error, intentalo de nuevo");
            $('#confirmModal').modal('show');
            var delay = 3500;
            setTimeout(function () {
                $('#confirmModal').modal('hide');
                window.location = window.location.href;
            },delay)
        }
    });
}
*/