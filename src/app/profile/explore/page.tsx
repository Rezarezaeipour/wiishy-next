"use client"
import { explore } from "@/app/api-client/gifts";
import MyFollowingsProductList from "@/app/components/myFollowingsProductList/myFollowingsProductList";
import ProductList from "@/app/components/productList/productList";
import { Skeleton } from "antd";

import { useEffect, useState } from "react";

function Explore() {
  const [count, setCount] = useState(0);
  const [giftlist, setGiftlist] = useState();

  useEffect(() => {
    (async () => {
      const res = await explore();
      setCount(res.followings_gifts_coun);
      setGiftlist(res.followings_gifts);
      console.log('hiii',res)
    })();
  }, []);
  return (
    <>
      <div className="py-5 px-2 w-full h-screen">
        <h1 className="main-head">Explore</h1>
        <h4>Explore among last gift people like you wish to have, moreover, find thousands of gift ideas
          that are provided by Wiishy AI agent that helps you to choose better gift for your family and friends.
        </h4>
        {giftlist ? (
          <div className="grid grid-cols-2 gap-0 mt-7 mb-10 ">
            <MyFollowingsProductList productList={giftlist} />
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-0 mt-7 mb-10 ">
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

export default Explore;
