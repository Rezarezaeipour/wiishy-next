import { type } from "os";

export interface Product {
  // title: string;
  // image: string;
  // price: string;
  // rate: number;

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
