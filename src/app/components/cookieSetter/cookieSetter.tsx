'use client'
import { cookies } from "next/headers";
import { User } from "@/types";

function CookieSetter(props : User) {
 
    cookies().set({
    name: "w-user",
    value: JSON.stringify({ name: props.name, family: props.family, id: props.userId, age: props.age }),
    httpOnly: true,
    maxAge: 60 * 6 * 24,
  });


  return <></>;
}

export default CookieSetter;
