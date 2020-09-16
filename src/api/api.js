/** Handler request **/
async function get(url,headers){
    try{
        const response = await fetch(url, headers);
        const data = await response.json();
        return data;
    }catch(e){
        console.log(e)
    }
}

async function post(url, body){
    const response = await fetch(url, {method: "POST", body: JSON.stringify(body),headers: {"Content-Type": "application/json"}});
    const data = await response.json();
    return data;
}
