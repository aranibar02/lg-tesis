var mockData = {
  status: "ok",
  plans: [
    {
      name: "Basico",
      internet_speed: 10,
      unit_measure: "Mbps",
      total_amount: 0.0,
      total_amount_measure: "dolares",
      frecuency: "anual",
    },
    {
      name: "Normal",
      internet_speed: 50,
      unit_measure: "Mbps",
      total_amount: 20.0,
      total_amount_measure: "dolares",
      frecuency: "mensual",
    },
    {
      name: "Premium",
      internet_speed: 200,
      unit_measure: "Mbps",
      total_amount: 50.0,
      total_amount_measure: "dolares",
      frecuency: "mensual",
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
  var contentHtml = data.plans
    .map((item) => {
      return `
        <div class="card selectedshadow-lg" style="width:20rem">
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
              <button type="button" class="btn btn-primary">Obtener</button>
            </div>
        </div>
      `;
    })
    .join(" ");

  var getHtml = (html) => `
    <div class="highSpeed__container">
      ${html} 
    </div>
  `;
  wrapper.innerHTML = getHtml(contentHtml);
}
