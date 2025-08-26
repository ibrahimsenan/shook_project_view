export interface IFullAddress {
  address_id: number; // { type: Number, required: true, unique: true },
  user_id: number; //{ type: Number, required: true },
  full_address: string; //  { type: String },
  zip_code: string; //{ type: String },
  postal_code: string; //{ type: String },
  house_number: string; //{ type: String },
  street_number: string; //{ type: String },
  street_name: string; //{ type: String },
  coordinates_location: ILocationSchema
}

export interface ILocationSchema {
  lng: string;
  lat: string;
}


export interface IResponse {
  statusMessage: string,
  status: number,
  message: string,
  reason: object,
  total: number,
  response: object
}