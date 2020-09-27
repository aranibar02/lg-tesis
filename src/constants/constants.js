/*
export const WS_BASE_URL = "https://ires2-tesis-backend.herokuapp.com/api/v1";
export const SOCKET_URL = ""; 
*/

var GUEST_ID = 1;
var USD = 0.279278;
var EUR = 0.240071;
var USD_SYMBOL = '$';
var EURO_SYMBOL = '€';
var SOL_SYMBOL = 'S/';
//$13.95
//28,06 €
//S/ 825


var WS_BASE_URL = "https://ires2-tesis-backend.herokuapp.com/api/v1";
https://ires2-tesis-backend.herokuapp.com/api/v1/products
var SOCKET_URL = "wss://ires2-tesis-backend.herokuapp.com";
/**  api endpoints **/
var ENDPOINT_GET_RESTAURANTS = `${WS_BASE_URL}/restaurants`;
function ENDPOINT_GET_RESTAURANT(id){return `${WS_BASE_URL}/restaurants/${id}`};
var ENDPOINT_GET_GYMS = `${WS_BASE_URL}/gyms`;
function ENDPOINT_GET_GYM(id){return `${WS_BASE_URL}/gyms/${id}`};
var ENDPOINT_GET_SPAS = `${WS_BASE_URL}/spas`;
function ENDPOINT_GET_SPA(id){return `${WS_BASE_URL}/spas/${id}`};
var ENDPOINT_GET_EVENTS = `${WS_BASE_URL}/events`;
function ENDPOINT_GET_EVENT_BY_TYPE(type){return `${WS_BASE_URL}/events?type=${type}`}
function ENDPOINT_GET_EVENT(id){return `${WS_BASE_URL}/events/${id}`};
var ENDPOINT_GET_PRODUCTS = `${WS_BASE_URL}/products`;
var ENDPOINT_FACILITIES = `${WS_BASE_URL}/locals`;
var ENDPOINT_GET_PRODUCT_CATEGORIES = `${WS_BASE_URL}/product-categories`;
function ENDPOINT_GET_PRODUCT_BY_CATEGORY(id){return `${WS_BASE_URL}/products?category_id=${id}`};
var ENDPOINT_GET_ACCOUNTS = `${WS_BASE_URL}/accounts`;
var ENDPOINT_TOURISTICPLACES = `${WS_BASE_URL}/touristic-places`;
var ENDPOINT_PLACES_TYPES = `${WS_BASE_URL}/touristic-places-types`;
var ENDPOINT_GET_HIGHSPEED = `${WS_BASE_URL}/hsia-packages`;
var ENDPOINT_TRANSACTIONS = `${WS_BASE_URL}/transactions`;
function ENDPOINT_GET_TRANSACTIONS_BY_GUEST(id){return `${WS_BASE_URL}/transactions?guest_id=${id}`};
var ENDPOINT_GET_DISH_TYPES = `${WS_BASE_URL}/dish-types`;
var ENDPOINT_GET_DISHES = `${WS_BASE_URL}/dishes`; 
var ENDPOINT_BOOKING_RESTAURANTS = `${WS_BASE_URL}/reservation-restaurants`;
var ENDPOINT_BOOKING_SPAS = `${WS_BASE_URL}/reservation-spas`;
var ENDPOINT_BOOKING_GYMS = `${WS_BASE_URL}/reservation-gyms`;
var ENDPOINT_ACCOUNT = `${WS_BASE_URL}/accounts`;
function ENDPOINT_ACCOUNT_BY_GUEST(guestId){return `${WS_BASE_URL}/accounts?guest_id=${guestId}`};
function ENDPOINT_CHECK_IN(guestId){return `${WS_BASE_URL}/check-ins?guest_id=${guestId}`};
var ENDPOINT_CONFIGURATION = `${WS_BASE_URL}/configurations`;
function toDollars(amount){return amount*USD};
function toEuros(amount){return amount*EUR};

/** externals api **/
var NEWS_BASE_URL = "https://newscatcher.p.rapidapi.com/v1";
var NEWS_API_HOST = "newscatcher.p.rapidapi.com";
var NEWS_API_KEY = "249159a8c0msh2af1f7282c3f09bp10c0a1jsn049b89e7ebf3";
function LATEST_HEADLINES (params){return `${NEWS_BASE_URL}/latest_headlines?${params}`};
function SEARCH_FREE (params){return `${NEWS_BASE_URL}/search_free?${params}`};
var INSTRUCTIONS = [
    {
        event: "screen-news",
        location: ""
    }, 
];







