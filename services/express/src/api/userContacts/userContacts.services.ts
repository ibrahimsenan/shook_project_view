/* Created and developed by Ibrahim senan (ibrahimsenan). 
 *
 * What this is about: 
 * interact with database documents and the created model
 * implementing the structure of the created modal to get database response 
 * 
*/


import EXCLUDED_KEY from '../utils/excluded_keys';
import ContactDetail, { IContactDetail } from './userContacts.model';


class userContactsService {

  /**
   * Store user contact data
   * @param contactDetails 
   * @callback IContactDetail saved object with auto generated id
   */
  public static async storeUserContact(
    contactDetails: Object,
  ): Promise<IContactDetail> {
    return new Promise<IContactDetail>((resolve, reject) => {
      ContactDetail.create(contactDetails, (error, success) => {
        if (error || !success) {
          reject(error)
        } else if (success) {
          resolve(success)
        }
      });
    });
  }

  /**
   * get all saved contacts from contactDetails table
   * @callback IContactDetail[] array of contacts 
   */
  public static async getContactsDetails(): Promise<any> {
    return new Promise<IContactDetail[]>((resolve, reject) => {
      ContactDetail.find()
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

  public static async getContactDetailsByUserID(userID: number): Promise<any> {
    return new Promise<IContactDetail[]>((resolve, reject) => {
      ContactDetail.find({ user_id: userID })
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

  public static async getOneContact(contact_id: number): Promise<any> {
    return new Promise<IContactDetail>((resolve, reject) => {
      ContactDetail.findOne({ contact_id: contact_id })
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


  public static async patchOneContact(contact_id: number, payload: object): Promise<any> {
    return new Promise<IContactDetail>((resolve, reject) => {
      ContactDetail.findOneAndUpdate({ contact_id: contact_id }, payload,
        { returnOriginal: false })
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


  public static async deleteOneContact(contact_id: number): Promise<any> {
    return new Promise<IContactDetail>((resolve, reject) => {
      ContactDetail.findOneAndDelete({ contact_id: contact_id }, { returnOriginal: false })
        .select(EXCLUDED_KEY.id_ver)
        .exec((error, success) => {
          console.log("error, success", error, success)
          if (error || !success) {
            reject(error)
          } else if (success) {
            resolve(success)
          }
        })
    })
  }

}

export default userContactsService;
