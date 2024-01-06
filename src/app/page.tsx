"use client";

import Image from "next/image";
import logo from "../../public/logo/wiishy-little.png";
import { cookies } from "next/headers";
import { isNew } from "./api-client/users";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // setTimeout(async() => {
    //   const token = await isNew();
    //   token ? router.push("/profile/explore") : router.push("/steps");
    // }, 1000);

    setTimeout(async() => {
       router.push("/profile/explore");
    }, 1000);
  
  }, [router]);
  

  
  return (
    <>
      <div className="h-full">
        <>
          <div className="w-full h-full flex flex-col justify-center items-center ">
            <Image
              width={300}
              height={100}
              alt="Wiishy, an ultimate wishlist"
              src={logo}
            ></Image>
            <p className="text-center font-bold text-xl">
              An ultimate wishlist
            </p>
          </div>
        </>
      </div>
    </>
  );
}
