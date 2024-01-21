"use client";
import { home } from "@/app/api-client/gifts";
import HomeProductList from "@/app/components/productComponents/homeProductList/homeProductList";
import { Skeleton } from "antd";
import { useEffect, useState } from "react";

function Home() {
 
  const [giftlist, setGiftlist] = useState();

  useEffect(() => {
    (async () => {
      const res = await home();
      setGiftlist(res.followings_gifts);
     
    })();
  }, []);
 
  return (
    <>
      <div className="py-5 px-4 w-full h-screen">
        <h1 className="main-head">Home</h1>
        
        {giftlist ? (
          <div className="grid grid-cols-1 gap-0 mt-7 mb-10" style={{marginBottom:"50px !important"}}>
            <HomeProductList productList={giftlist} />
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-0 mt-7 pb-10 ">
            <Skeleton className="mb-2"  avatar paragraph={{ rows: 3 }} />
            <Skeleton className="mb-2"  avatar paragraph={{ rows: 3 }} />
            <Skeleton className="mb-2"  avatar paragraph={{ rows: 3 }} />
            <Skeleton className="mb-2"  avatar paragraph={{ rows: 3 }} />
            <Skeleton className="mb-2"  avatar paragraph={{ rows: 3 }} />
            <Skeleton className="mb-2"  avatar paragraph={{ rows: 3 }} />
          </div>
        )}
      </div>
    </>
  );
}

export default Home;
