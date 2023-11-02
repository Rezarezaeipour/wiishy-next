"use client"
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();

    useEffect(() => { 
      setTimeout(  () => {
        session ? 
        router.push("/profile/explore")
         :
         router.push("/steps")
        }, 1000);
    }, [session,router]);
 
  return (
    <>
      <div className="h-full">
        <>
          <div className="w-full h-full flex flex-col justify-center items-center ">
            <Image
              width={300}
              height={100}
              alt="Wiishy, an ultimate wishlist"
              src="/wisshy.png"
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
