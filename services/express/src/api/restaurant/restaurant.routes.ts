/* Created and developed by Ibrahim senan (ibrahimsenan). 
 *
 * What this is about: 
 * Contains route handlers that map HTTP requests to the corresponding controllers 
 * 
*/


import { Router } from 'express';
import RestaurantController from './restaurant.controller';
const restaurantRouters = Router();


const RESTAURANT_ROUTE = '/restaurant';
const RESTAURANT_ROUTE_ID = '/restaurant/:restaurant_id';

/**
 * Express post connected to Controller
 */
restaurantRouters.post(RESTAURANT_ROUTE, RestaurantController.postRestaurant);
/**
 * Express get all documents
 */
restaurantRouters.get(RESTAURANT_ROUTE, RestaurantController.getAllRestaurants);
/**
 * Express get a document per service id
 */
restaurantRouters.get(RESTAURANT_ROUTE_ID, RestaurantController.getRestaurantById)
/**
 * Express patch one or more keys in a document per service id
 */
restaurantRouters.patch(RESTAURANT_ROUTE_ID, RestaurantController.patchRestaurantById)
/**
 * Express delete a document per service id
 */
restaurantRouters.delete(RESTAURANT_ROUTE_ID, RestaurantController.deleteRestaurantById)



// we need to convert to es export module 
// export default restaurantRouters
module.exports = restaurantRouters;
