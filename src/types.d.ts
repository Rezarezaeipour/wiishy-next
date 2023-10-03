import { type } from "os";

export interface Product {
  title: string;
  image: string;
  price: string;
  rate: number;
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
