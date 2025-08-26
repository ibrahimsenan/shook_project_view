// const USER_API = require('@api/usersApi/UserApi');
const USER_AUTH_API = require('@api/auth/userAuth/userAuth.routes');
// const USER_CONTACT = require('@api/usersApi/ContactDetailsAPI');
const USER_ADDRESS = require('@api/usersApi/FullAddressAPI');
const USER_TYPES = require('@api/usersApi/UserTypes');
// const RESTAURANT_API = require('@api/restaurantAPIs/restaurant/RestaurantApi');
const MENU_API = require('@api/restaurantAPIs/menus/MenuAPI');
const MENUITEMS_API = require('@api/restaurantAPIs/menus/MenuItemsApi');
const EXTRAS_API = require('@api/restaurantAPIs/menus/ExtrasApi.js');
const SUB_MENU_API = require('@api/restaurantAPIs/menus/SubMenuAPI');
const ORDER_API = require('@api/restaurantAPIs/orders/ordersAPIs');

const USER_CONTACTS = require('@api/userContacts/userContacts.routes');
const USER_API = require('@api/users/users.routes');
const RESTAURANT_API = require('@api/restaurant/restaurant.routes');
// import USER_CONTACTS from '../api/userContacts/userContacts.routes';
// import USER_API from '../api/users/users.routes';

const APP_ROUTES = [
  USER_API,
  USER_AUTH_API,
  // USER_CONTACT,
  USER_ADDRESS,
  USER_TYPES,
  RESTAURANT_API,
  MENU_API,
  SUB_MENU_API,
  MENUITEMS_API,
  EXTRAS_API,
  ORDER_API,
  USER_CONTACTS,
];

module.exports = APP_ROUTES;
