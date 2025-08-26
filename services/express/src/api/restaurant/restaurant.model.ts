/* Created and developed by Ibrahim senan (ibrahimsenan). 
 *
 * What this is about: 
 * Contains data models or database schemas and all interfaces required
 * to create the document in the database
 * 
*/


import { Schema, model } from "mongoose";
import { IFullAddress } from "services/express/src/shared/interfaces";

interface IBranchDetails {
    is_main_branch: boolean;
    main_branch_id?: number | null; //? means optional
    branch_code: string;
    branch_name: string;
}
export interface IRestaurant {
    restaurant_id: number;
    user_id: number;
    delivery_id: number;
    contact_id: number;
    delivery_status_id: number;
    restaurant_name: string;
    branch_details: IBranchDetails;
    draft_menu: object;
    live_menu: object;
    branch_code: string;
    available_language: string;
    restaurant_status: string;
    restaurant_image: string | null;
    restaurant_logo: string
    restaurant_locations: IFullAddress[];
    can_delete: boolean;
    accepts_reservations: boolean;
    can_update: boolean;
    can_view: boolean;
    is_restaurant_admin: boolean;
    is_admin: boolean;
    is_restaurant_account: boolean;
}
const RestaurantSchema = new Schema<IRestaurant>({
    restaurant_id: { type: Number, required: true, unique: true },
    user_id: { type: Number, required: true },
    delivery_id: { type: Number, required: true },

    contact_id: { type: Number, required: true },
    delivery_status_id: { type: Number, required: true },
    restaurant_name: {
        type: String,
        required: [true, "name is required"],
        unique: true,
    },
    branch_details: {
        is_main_branch: { type: Boolean, default: false },
        main_branch_id: { type: Number, required: false },
        branch_code: { type: String, required: true },
        branch_name: { type: String, required: false },
    },
    draft_menu: { type: Object },
    live_menu: { type: Object },
    branch_code: { type: String, required: true },
    available_language: { type: String, default: "EN" },
    restaurant_status: { type: String },
    restaurant_image: { type: String, default: "Non" },
    restaurant_logo: { type: String, default: "photoDir" },
    restaurant_locations: [{} as IFullAddress],
    can_delete: { type: Boolean, default: true },
    accepts_reservations: { type: Boolean, default: true },
    can_update: { type: Boolean, default: true },
    can_view: { type: Boolean, default: true },
    is_restaurant_admin: { type: Boolean, default: false },
    is_admin: { type: Boolean, default: false },
    is_restaurant_account: { type: Boolean, default: false },

});

export default model<IRestaurant>("Restaurant", RestaurantSchema)
