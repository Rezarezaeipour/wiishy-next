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
  title: string;
  image: string;
  time: string;
}

export interface User {
  name: string | null | undefined;
  family: string | null | undefined;
  userId : string | null | undefined;
  location : string | null | undefined;
  age : number | null | undefined;
  token : string | null | undefined;
}
