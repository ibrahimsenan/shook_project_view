/* Created and developed by Ibrahim senan (ibrahimsenan). 
 *
 * What this is about: 
 * interact with database documents and the created model
 * implementing the structure of the created modal to get database response 
 * 
*/


import EXCLUDED_KEY from '../utils/excluded_keys';
import Restaurant, { IRestaurant } from './restaurant.model';
class RestaurantService {

    /**
 * Store restaurant data
 * @memberof RestaurantService
 * @function storeRestaurant
 * @param restaurant user object needed to be stored.
 * @callback IRestaurant saved object with auto generated id
 */
    public static async storeRestaurant(restaurant: IRestaurant): Promise<IRestaurant> {
        return new Promise<IRestaurant>((resolve, reject) => {
            Restaurant.findOne({ restaurant_name: restaurant.restaurant_name },
                (error, success) => {
                    if (success) {
                        reject(false)
                    } else {
                        Restaurant.create(restaurant, (error, success) => {
                            if (error || !success) {
                                reject(error)
                            } else if (success) {
                                resolve(success)
                            }
                        });
                    }
                });
        });
    }



    /**
   * get all saved restaurant from Restaurant table
   * @memberof RestaurantService
   * @function getAllRestaurant
   * @callback IRestaurant[] array of users 
   */
    public static async getAllRestaurant(): Promise<any> {
        return new Promise<IRestaurant[]>((resolve, reject) => {
            Restaurant.find()
                .select(EXCLUDED_KEY.id_ver)
                .exec((error, success) => {
                    if (error || !success) {
                        reject(error)
                    } else if (success) {
                        resolve(success)
                    }
                });
        });

    }

    /**
     * get restaurant details by restaurant id (profile restaurant)
     * @memberof RestaurantService
     * @function getRestaurantById 
     * @param restaurantId targeted restaurant id
     * @returns Object of restaurant details
     */
    public static async getRestaurantById(restaurantId: number): Promise<any> {
        return new Promise<IRestaurant>((resolve, reject) => {
            Restaurant.findOne({ restaurant_id: restaurantId })
                .select(EXCLUDED_KEY.id_ver)
                .exec((error, success) => {
                    if (error || !success) {
                        reject(error)
                    } else if (success) {
                        resolve(success)
                    }
                })
        })
    }

    /**
     * We update only some parameters in the restaurant object 
     * @memberof RestaurantService
     * @function patchOneRestaurant 
     * @param restaurantId the targeted restaurant to be updated 
     * @param payload the parameters that need to be updated
     * @returns the updated restaurant object
     */
    public static async patchOneRestaurant(restaurantId: number, payload: object): Promise<any> {
        return new Promise<IRestaurant>((resolve, reject) => {
            Restaurant.findOneAndUpdate({ restaurant_id: restaurantId }, payload,
                { returnOriginal: false })
                .select(EXCLUDED_KEY.id_ver_pass)
                .exec((error, success) => {
                    if (error || !success) {
                        reject(error)
                    } else if (success) {
                        resolve(success)
                    }
                })
        })
    }

    /**
     * @memberof RestaurantService
     * @function deleteOneRestaurant
     * @param restaurantId Restaurant id that should be deleted
     * @returns object of deleted Restaurant 
     */
    public static async deleteOneRestaurant(restaurantId: number): Promise<any> {
        return new Promise<IRestaurant>((resolve, reject) => {
            Restaurant.findOneAndDelete({ restaurant_id: restaurantId }, { returnOriginal: false })
                .select(EXCLUDED_KEY.id_ver_pass)
                .exec((error, success) => {
                    if (error || !success) {
                        reject(error)
                    } else if (success) {
                        resolve(success)
                    }
                })
        })
    }

}


export default RestaurantService