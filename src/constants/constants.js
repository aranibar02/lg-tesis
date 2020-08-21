/*
export const WS_BASE_URL = "https://ires2-tesis-backend.herokuapp.com/api/v1";
export const SOCKET_URL = ""; 
*/
var WS_BASE_URL = "https://ires2-tesis-backend.herokuapp.com/api/v1";
var SOCKET_URL = "wss://ires2-tesis-backend.herokuapp.com";
/**  api endpoints **/
var ENDPOINT_GET_RESTAURANTS = `${WS_BASE_URL}/restaurants`;
function ENDPOINT_GET_RESTAURANT(id){return `${WS_BASE_URL}/restaurants/${id}`};
var ENDPOINT_GET_GYMS = `${WS_BASE_URL}/gyms`;
function ENDPOINT_GET_GYM(id){return `${WS_BASE_URL}/gyms/${id}`};
var ENDPOINT_GET_SPAS = `${WS_BASE_URL}/spas`;
function ENDPOINT_GET_SPA(id){return `${WS_BASE_URL}/spas/${id}`};
var ENDPOINT_GET_EVENTS = `${WS_BASE_URL}/events`;
function ENDPOINT_GET_EVENT(id){return `${WS_BASE_URL}/events/${id}`};

/** externals api **/
var NEWS_BASE_URL = "https://newscatcher.p.rapidapi.com/v1";
var NEWS_API_HOST = "newscatcher.p.rapidapi.com";
var NEWS_API_KEY = "249159a8c0msh2af1f7282c3f09bp10c0a1jsn049b89e7ebf3";
function LATEST_HEADLINES (params){return `${NEWS_BASE_URL}/latest_headlines?${params}`};
function SEARCH_FREE (params){return `${NEWS_BASE_URL}/search_free?${params}`};





