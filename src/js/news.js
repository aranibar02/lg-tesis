
(async function(){
    const location = window.location.href;
    const q = location.split("?");
    const topic = q.length > 1 ? q[1] : "world";
    config = {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": `${NEWS_API_HOST}`,
            "x-rapidapi-key": `${NEWS_API_KEY}`
        }
    };
    const data = await get(SEARCH_FREE(`page_size=10&lang=es&media=True&q=${topic}`, config));
    render(data);
})();


function render(data){
    var wrapper = document.getElementById('Contenido');
    var html = data.articles.map((item,index) => {
        return(`
        <div class="media col-xs-12">
            <div class="row">
                <div class="col-sm-4">
                    <img class="mr-3 img-fluid" src="${item.media}" alt="${item.author}"/>    
                </div>
                <div class="col-sm-8">
                    <div class="media-body">
                        <h5 class="mt-0">${item.title}</h5>
                        ${item.summary}
                    </div>
                </div>
            </div> 
        </div>
        `);
    }).join(" ");
    wrapper.innerHTML = html;
}



