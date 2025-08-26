/* Created and developed by Ibrahim senan (ibrahimsenan). 
 *
 * What this is about: 
 * Contains data models or database schemas and all interfaces required
 * to create the document in the database
 * 
*/

import { Document, Schema, model } from 'mongoose';
import { IFullAddress, ILocationSchema } from 'services/express/src/shared/interfaces';

export interface IContactDetail extends Document {
  contact_id: number;
  user_id: number;
  phone_number: number;
  full_address: IFullAddress[];
  current_geoLocation: ILocationSchema;
  mobile_number: number;
  created_date: Date;
  can_delete: boolean;
  can_update: boolean;
  can_view: boolean;
}

var ContactDetailSchema = new Schema<IContactDetail>({
  contact_id: { type: Number, unique: true },
  user_id: { type: Number, required: true },
  phone_number: { type: Number, required: false, unique: true },
  full_address: [{} as IFullAddress],
  current_geoLocation: {} as ILocationSchema,
  mobile_number: { type: Number, required: false, unique: true },
  created_date: {
    type: Date,
    required: [true, 'date and time required'],
    default: Date.now,
  },
  can_delete: { type: Boolean, default: true },
  can_update: { type: Boolean, default: true },
  can_view: { type: Boolean, default: true },
});

export default model<IContactDetail>('ContactDetail', ContactDetailSchema);
