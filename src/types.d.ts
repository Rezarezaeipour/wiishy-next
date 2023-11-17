import { type } from "os";

export interface Product {

  gift_id?: number,
  gift_view?: number,
  gift_like?: number,
  desire_rate?: number,
  created_at?: Date,
  gift_name?: string,
  gift_price?: string,
  gift_desc?: string,
  gift_url?: string,
  islike?: boolean
  gift_image_url?:string
}

export interface ProductComplete {
  id?:number,
  gift_id?: number,
  gift_view?: number,
  gift_like?: number,
  desire_rate?: number,
  created_at?: Date,
  gift_name?: string,
  gift_price?: string,
  gift_desc?: string,
  gift_url?: string,
  islike?: boolean
  gift_image_url?:string,
  name:string,
  family:string,
  user_image_url:string
  user_id:number

}

export interface Event {
  id?:number;
  name: string,
  family: string,
  gender: number,
  relationship : number,
  // eventtype : number,
  time : string,
  event_type : string,
  event_type_id : number,
  remaining_days : number
}

export interface User {
  name: string | null | undefined;
  family: string | null | undefined;
  userId : string | null | undefined;
  location? : string | null | undefined;
  age : number | null | undefined;
  token : string | null | undefined;
  age? : number;
  user_image_url? : string;
  id? : number;
}
