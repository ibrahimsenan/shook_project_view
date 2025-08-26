/* Created and developed by Ibrahim senan (ibrahimsenan).
 *
 * What this is about:
 * Contains data models or database schemas and all interfaces required
 * to create the document in the database
 *
 */

import { Schema, model } from 'mongoose';

const LocationSchema = new Schema({
  lng: { type: String, required: [true, 'lng location is required'] },
  lat: { type: String, required: [true, 'lat location is required'] },
});

var validateEmail = function (email) {
  var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email);
};

export interface IUser extends Document {
  user_id: number;
  lastName: string;
  firstName: string;
  userName: string;
  email_address: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  user_type: string;
  age: number;
  birthDate: Date;
  gender: string;
  image_path: string;
  created_date: Date;
  can_delete: boolean;
  can_update: boolean;
  can_view: boolean;
  is_user_customer: boolean;
  is_user_restaurant: boolean;
  is_user_driver: boolean;
  is_admin: boolean;
  is_system_admin: boolean;
}
var UserSchema = new Schema<IUser>({
  user_id: { type: Number, required: true, unique: true },
  lastName: {
    type: String,
    required: [true, 'last name is required'],
  },
  firstName: {
    type: String,
    required: [true, 'first name is required'],
  },
  userName: {
    type: String,
    required: [true, 'user name is required'],
    unique: true,
  },
  email_address: {
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
    required: [false, 'Email is required'],
    validate: [validateEmail, 'Please fill a valid email address'],
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please fill a valid email address',
    ],
  },

  password: { type: String, required: [true, 'password is required'] },
  user_type: { type: String, required: [true, 'user type is required'] },
  age: { type: Number },
  birthDate: {
    type: Date,
    default: Date.now,
  },

  gender: { type: String, default: 'Non' },
  image_path: { type: String, default: 'photoDir' },
  created_date: {
    type: Date,
    required: [true, 'date and time required'],
    default: Date.now,
  },

  can_delete: { type: Boolean, default: true },
  can_update: { type: Boolean, default: true },
  can_view: { type: Boolean, default: true },
  is_user_customer: { type: Boolean, default: false },
  is_user_restaurant: { type: Boolean, default: false },
  is_user_driver: { type: Boolean, default: false },
  is_admin: { type: Boolean, default: false },
  is_system_admin: { type: Boolean, default: false },
});

export default model<IUser>('User', UserSchema);
