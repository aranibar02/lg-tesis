var mockData = {
  status: "ok",
  plans: [
    {
      name: "Basico",
      internet_speed: 10,
      unit_measure: "Mbps",
      total_amount: 0.0,
      total_amount_measure: "dolares",
      frecuency: "diario",
    },
    {
      name: "Normal",
      internet_speed: 50,
      unit_measure: "Mbps",
      total_amount: 20.0,
      total_amount_measure: "dolares",
      frecuency: "diario",
    },
    {
      name: "Premium",
      internet_speed: 200,
      unit_measure: "Mbps",
      total_amount: 50.0,
      total_amount_measure: "dolares",
      frecuency: "diario",
    },
  ],
};

(async function () {
  const location = window.location.href;
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
  const data = mockData;
  render(data);
})();

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
        <div class="card shadow-lg" style="width:20rem">
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
              <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#${showHighSpeedModalId}">Obtener</button>
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
