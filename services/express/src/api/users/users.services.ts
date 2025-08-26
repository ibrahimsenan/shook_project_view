/* Created and developed by Ibrahim senan (ibrahimsenan). 
 *
 * What this is about: 
 * interact with database documents and the created model
 * implementing the structure of the created modal to get database response 
 * 
*/


import EXCLUDED_KEY from '../utils/excluded_keys';
import User, { IUser } from './users.model';

class UsersService {

    /**
 * Store user data
 * @function storeUser
 * @param User user object needed to be stored.
 * @callback IUser saved object with auto generated id
 */
    public static async storeUser(user: IUser): Promise<IUser> {
        return new Promise<IUser>((resolve, reject) => {
            User.findOne({ userName: user.userName }, (error, success) => {
                if (success) {
                    reject(false)
                } else {
                    User.create(user, (error, success) => {
                        if (error || !success) {
                            reject(error)
                        } else if (success) {
                            resolve(success)
                        }
                    });
                }
            })
        });
    }

    /**
       * get all saved users from contactDetails table
       * @function getAllUsers
       * @callback IUser[] array of users 
       */
    public static async getAllUsers(): Promise<any> {
        return new Promise<IUser[]>((resolve, reject) => {
            User.find()
                .select(EXCLUDED_KEY.id_ver_pass)
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
     * get user details by user id (profile user)
     * @function getUserById 
     * @param userID targeted user id
     * @returns Object of user details
     */
    public static async getUserById(userID: number): Promise<any> {
        return new Promise<IUser>((resolve, reject) => {
            User.findOne({ user_id: userID })
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
 * get user details by user name or user email (profile user)
 * @function getUserByName 
 * @param userName targeted userName is unique
 * @param email targeted user email is unique
 * @returns Object of user details
 */
    public static async getUserByNameOrEmail(userName?: string, email?: string): Promise<any> {
        return new Promise<IUser>((resolve, reject) => {
            User.findOne(userName ? { userName: userName } : { email: email })
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
     * We update only some parameters in the user object 
     * @function patchOneUser 
     * @param userID the targeted user to be updated 
     * @param payload the parameters that need to be updated
     * @returns the updated user object
     */
    public static async patchOneUser(userID: number, payload: object): Promise<any> {
        return new Promise<IUser>((resolve, reject) => {
            User.findOneAndUpdate({ user_id: userID }, payload,
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
     * @function DeleteOneUser
     * @param userID user id that should be deleted
     * @returns object of deleted user 
     */
    public static async deleteOneUser(userID: number): Promise<any> {
        return new Promise<IUser>((resolve, reject) => {
            User.findOneAndDelete({ user_id: userID }, { returnOriginal: false })
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

export default UsersService