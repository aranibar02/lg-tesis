/** Handler request **/
async function get(url,headers){
    const response = await fetch(url, config);
    const data = await response.json();
    return data;
}

async function post(url, body){
    const response = await fetch(url, {method: "POST", body: JSON.stringify(body),headers: {"Content-Type": "application/json"}});
    const data = await response.json();
    return data;
}
